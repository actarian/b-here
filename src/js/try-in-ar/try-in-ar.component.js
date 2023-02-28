import { Component, getContext } from 'rxcomp';
import { first } from 'rxjs/operators';
import { DevicePlatform, DeviceService } from '../device/device.service';
import { environment } from '../environment';
import { MeetingUrl } from '../meeting/meeting-url';
import { RouterOutletStructure } from '../router/router-outlet.structure';
import { ViewService } from '../view/view.service';

export default class TryInARComponent extends Component {

	get viewId() {
		if (this.route) {
			const viewId = this.route.params.viewId;
			return viewId ? parseInt(viewId) : null;
		}
	}

	onInit() {
		this.platform = DeviceService.platform;
		this.route = this.host ? this.host.route : null;
		this.missingAr = false;
		this.missingUsdz = false;
		this.missingGltf = false;
		const viewId = this.viewId;
		// console.log('TryInARComponent.viewId', viewId);
		if (viewId) {
			ViewService.viewById$(viewId).pipe(
				first()
			).subscribe(view => {
				if (!view.ar) {
					this.missingAr = true;
					this.pushChanges();
					return;
				}
				// console.log('TryInARComponent.view', view);
				if (this.platform === DevicePlatform.IOS) {
					const usdzSrc = this.getUsdzSrc(view);
					if (usdzSrc) {
						window.location.href = usdzSrc;
					} else {
						this.missingUsdz = true;
						this.pushChanges();
					}
				} else if (this.getGltfSrc(view) !== null) {
					const modelViewerNode = this.getModelViewerNode(view);
					const { node } = getContext(this);
					node.appendChild(modelViewerNode);
					this.addARScripts();
				} else {
					this.missingGltf = true;
					this.pushChanges();
				}
			});
		}
	}

	addARScripts() {
		let script = document.createElement('script');
		script.setAttribute('type', 'module');
		script.setAttribute('src', 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js');
		document.head.appendChild(script);
		script = document.createElement('script');
		script.setAttribute('nomodule', '');
		script.setAttribute('src', 'https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js');
		document.head.appendChild(script);
	}

	getUsdzSrc(view) {
		return (view.ar && view.ar.usdz) ? environment.getPath(view.ar.usdz.folder + view.ar.usdz.file) : null;
	}

	getGltfSrc(view) {
		return (view.ar && view.ar.gltf) ? environment.getPath(view.ar.gltf.folder + view.ar.gltf.file) : null;
	}

	getViewId() {
		const meetingUrl = new MeetingUrl();
		let viewId = null;
		if (meetingUrl.viewId) {
			viewId = parseInt(meetingUrl.viewId);
		}
		return viewId;
	}

	getModelViewerNode(view) {
		const environmentImage = environment.getPath(environment.textures.envMap);
		const skyboxImage = environment.getPath(view.asset.folder + view.asset.file);
		const usdzSrc = this.getUsdzSrc(view);
		const gltfSrc = this.getGltfSrc(view);
		const template = /* html */`
			<model-viewer alt="${view.name}" environment-image="${environmentImage}" skybox-image="${skyboxImage}" ios-src="${usdzSrc}" src="${gltfSrc}" ar ar-modes="webxr scene-viewer quick-look" ar-scale="auto" camera-controls></model-viewer>
		`;
		const div = document.createElement("div");
		div.innerHTML = template;
		const node = div.firstElementChild;
		return node;
	}

}

TryInARComponent.meta = {
	selector: '[try-in-ar]',
	hosts: { host: RouterOutletStructure },
	template: /* html */`
		<div class="page page--try-in-ar">
			<!--
			<div *if="platform != 'ios'">
				<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
				<script nomodule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"></script>
			</div>
			-->
			<div class="ui" *if="!viewId">
				<div class="group--info">
					<div class="group--info__content">
						<div class="info">Unknown url.</div>
					</div>
				</div>
			</div>
			<div class="ui" *if="missingAr">
				<div class="group--info">
					<div class="group--info__content">
						<div class="info">Missing AR in view.</div>
					</div>
				</div>
			</div>
			<div class="ui" *if="missingUsdz">
				<div class="group--info">
					<div class="group--info__content">
						<div class="info">Missing .usdz in ar.</div>
					</div>
				</div>
			</div>
			<div class="ui" *if="missingGltf">
				<div class="group--info">
					<div class="group--info__content">
						<div class="info">Missing .gltf in ar.</div>
					</div>
				</div>
			</div>
		</div>
	`,
};
