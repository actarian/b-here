import { Component } from 'rxcomp';

export default class UploadItemComponent extends Component {

	set UploadItem(uploader) {
		this.uploader = uploader;
	}

	onInit() {
		console.log('UploadItemComponent.onInit', this.item, this.uploader);
	}

	onPause() {
		this.pause.next(this.item);
	}

	onResume() {
		this.resume.next(this.item);
	}

	onCancel() {
		this.cancel.next(this.item);
	}

	onRemove() {
		this.remove.next(this.item);
	}
}

UploadItemComponent.meta = {
	selector: '[uploadItem]',
	outputs: ['pause', 'resume', 'cancel', 'remove'],
	inputs: ['uploadItem', 'item'],
	template: /* html */`
	<div class="upload-item" [class]="{ 'error': item.error, 'success': item.success }">
		<div class="picture">
			<img [uploadSrc]="item" />
		</div>
		<div class="name">{{item.name}}</div>
		<!--
		<div class="group--info">
			<div>progress: {{item.progress}}</div>
			<div>size: {{item.size}} bytes</div>
			<div>current speed: {{item.currentSpeed}} bytes/s</div>
			<div>average speed: {{item.averageSpeed}} bytes/s</div>
			<div>time ramining: {{item.timeRemaining}}s</div>
			<div>paused: {{item.paused}}</div>
			<div>success: {{item.success}}</div>
			<div>complete: {{item.complete}}</div>
			<div>error: {{item.error}}</div>
		</div>
		-->
		<div class="group--cta" *if="!item.complete && item.progress > 0">
			<div class="btn--pause" (click)="onPause()">pause</div>
			<div class="btn--resume" (click)="onResume()">resume</div>
			<div class="btn--cancel" (click)="onCancel()">cancel</div>
		</div>
		<div class="group--cta" *if="item.complete">
			<div class="btn--remove" (click)="onRemove()">remove</div>
		</div>
	</div>
	`,
};
