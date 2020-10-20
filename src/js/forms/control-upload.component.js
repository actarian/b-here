import { takeUntil } from 'rxjs/operators';
import { environment } from '../environment';
import ControlComponent from './control.component';
import FlowService from './upload/flow.service';

/*
export interface Transfer {
	id: string;
	name: string;
	flowFile: flowjs.FlowFile;
	progress: number;
	error: boolean;
	paused: boolean;
	success: boolean;
	complete: boolean;
	currentSpeed: number;
	averageSpeed: number;
	size: number;
	timeRemaining: number;
}
*/

export default class ControlUploadComponent extends ControlComponent {

	onInit() {
		this.label = 'label';
		this.required = false;
		this.uploadAttributes = { accept: 'image/*', multiple: this.multiple };
		this.uploader = new FlowService({ target: '/api/upload_', singleFile: !this.multiple });
		this.uploader.events$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(event => {
			// console.log('ControlUploadComponent', event.type);
			switch (event.type) {
				case 'filesAdded':
				case 'fileAdded':
				case 'fileRemoved':
				case 'fileError':
				case 'complete':
					this.pushChanges();
					break;
				case 'uploadStart':
					break;
				case 'filesSubmitted':
					// return this.uploader.upload();
					break;
				case 'newFlowJsInstance':
					// this.pushChanges();
					break;
			}
		});
		this.totalProgress = 0;
		this.transfers = [];
		this.uploader.transfers$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(data => {
			this.totalProgress = data.totalProgress;
			this.transfers = data.transfers;
			console.log('ControlUploadComponent.transfers$', data);
			if (data.totalProgress === 1) {
				const completed = data.transfers.filter(x => x.complete).map(x => {
					// !!! retrieve correct url
					return `${window.location.origin}${environment.href}uploads/${x.id}_${x.name}`;
				});
				if (this.multiple) {
					this.control.value = completed;
				} else {
					this.control.value = completed[0];
				}
			}
			this.pushChanges();
		});
		this.hasItems = false;
		this.uploader.hasItems$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(hasItems => {
			this.hasItems = hasItems;
			this.pushChanges();
		});
		// console.log('ControlUploadComponent.onInit');
	}

	onPause(item) {
		console.log('ControlUploadComponent.onPause', item);
		this.uploader.pauseFile(item);
	}

	onResume(item) {
		console.log('ControlUploadComponent.onResume', item);
		this.uploader.resumeFile(item);
	}

	onCancel(item) {
		console.log('ControlUploadComponent.onCancel', item);
		this.uploader.cancelFile(item);
	}

	onRemove(item) {
		console.log('ControlUploadComponent.onRemove', item);
		this.uploader.removeFile(item);
	}
}

ControlUploadComponent.meta = {
	selector: '[control-upload]',
	inputs: ['control', 'label', 'multiple'],
	template: /* html */ `
		<div class="group--form" [class]="{ required: control.validators.length }">
			<div class="control--head">
				<label [innerHTML]="label"></label>
				<span class="required__badge">required</span>
			</div>
			<div class="listing--assets">
				<div class="listing__item" *for="let item of transfers">
					<div [uploadItem]="uploader" [item]="item" (pause)="onPause($event)" (resume)="onResume($event)" (cancel)="onCancel($event)" (remove)="onRemove($event)"></div>
				</div>
			</div>
			<!--
			<p *if="uploader.flow.support">✅ FlowJS is supported by your browser</p>
			<p *if="!uploader.flow.support">🛑 FlowJS is NOT supported by your browser</p>
			-->
			<div class="group--cta">
				<span class="btn--browse" [uploadButton]="uploader" [attributes]="uploadAttributes">Browse</span>
				<span class="btn--upload" (click)="uploader.upload()" *if="hasItems">Upload</span>
				<span class="btn--cancel" (click)="uploader.cancel()" *if="hasItems">Cancel</span>
				<!-- <span class="btn--cancel" (click)="uploader.cancel()" [class]="{ disabled: !transfers.length }">Cancel</span> -->
			</div>
			<div class="upload-drop" [uploadDrop]="uploader">
    			<span>Drag And Drop your images here</span>
			</div>
			<!-- <input type="file" class="btn btn--upload" [uploadButton]="uploader" [attributes]="uploadAttributes" /> -->
		</div>
		<errors-component [control]="control"></errors-component>
	`
};

/*
<p *ngIf="flow.flowJs?.support; else notSupported">
  ✅ FlowJS is supported by your browser
</p>
<ng-template #notSupported>
  <p>
	🛑 FlowJS is NOT supported by your browser
  </p>
</ng-template>

<ng-container #flow="flow" [flowConfig]="{target: 'http://localhost:3000/upload'}"></ng-container>
<input type="file"
	   flowButton
	   [flow]="flow.flowJs"
	   [flowAttributes]="{accept: 'image/*'}">

<div class="drop-area"
	 flowDrop
	 [flow]="flow.flowJs">
	 Drop a file here
</div>

<div class="transfers">
  <div class="transfer"
	   [ngClass]="{'transfer--error': transfer.error, 'transfer--success': transfer.success}"
	   *ngFor="let transfer of (flow.transfers$ | async).transfers; trackBy: trackTransfer">
	<div class="name">name: {{transfer.name}}</div>
	<div>progress: {{transfer.progress | percent}}</div>
	<div>size: {{transfer.size | number: '1.0'}} bytes</div>
	<div>current speed: {{transfer.currentSpeed | number: '1.0'}} bytes/s</div>
	<div>average speed: {{transfer.averageSpeed | number: '1.0'}} bytes/s</div>
	<div>time ramining: {{transfer.timeRemaining}}s</div>
	<div>paused: {{transfer.paused}}</div>
	<div>success: {{transfer.success}}</div>
	<div>complete: {{transfer.complete}}</div>
	<div>error: {{transfer.error}}</div>

	<img [flowSrc]="transfer">

	<button (click)="flow.pauseFile(transfer)">pause</button>
	<button (click)="flow.resumeFile(transfer)">resume</button>
	<button (click)="flow.cancelFile(transfer)">cancel</button>
  </div>
</div>
<button type="button" (click)="flow.upload()" [disabled]="!(flow.somethingToUpload$ | async)">Start upload</button>
<button type="button" (click)="flow.cancel()" [disabled]="!(flow.transfers$ | async).transfers.length">Cancel all</button>
Total progress: {{(flow.transfers$ | async).totalProgress | percent}}
*/
