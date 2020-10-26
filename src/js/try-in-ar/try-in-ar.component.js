import { Component, getContext } from 'rxcomp';
import { first } from 'rxjs/operators';
import { DevicePlatform, DeviceService } from '../device/device.service';
import { environment } from '../environment';
import LocationService from '../location/location.service';
import ViewService from '../view/view.service';

export default class TryInARComponent extends Component {

	onInit() {
		this.platform = DeviceService.platform;
		this.missingAr = false;
		this.missingUsdz = false;
		this.missingGltf = false;
		const viewId = this.viewId = this.getViewId();
		// console.log('TryInARComponent.viewId', viewId);
		if (viewId) {
			ViewService.view$(viewId).pipe(
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
				} else {
					this.missingGltf = true;
					this.pushChanges();
				}
			});
		}
	}

	getUsdzSrc(view) {
		return (view.ar && view.ar.usdz) ? environment.getPath(view.ar.usdz.folder + view.ar.usdz.file) : null;
	}

	getGltfSrc(view) {
		return (view.ar && view.ar.gltf) ? environment.getPath(view.ar.gltf.folder + view.ar.gltf.file) : null;
	}

	getViewId() {
		let viewId = LocationService.get('viewId') || null;
		if (viewId) {
			viewId = parseInt(viewId);
		}
		return viewId;
	}

	getModelViewerNode(view) {
		const panorama = environment.getPath(view.asset.folder + view.asset.file);
		const usdzSrc = this.getUsdzSrc(view);
		const gltfSrc = this.getGltfSrc(view);
		const template = /* html */`
			<model-viewer alt="${view.name}" skybox-image="${panorama}" ios-src="${usdzSrc}" src="${gltfSrc}" ar ar-modes="webxr scene-viewer quick-look" ar-scale="auto" camera-controls></model-viewer>
		`;
		const div = document.createElement("div");
		div.innerHTML = template;
		const node = div.firstElementChild;
		return node;
	}

}

TryInARComponent.meta = {
	selector: '[try-in-ar]'
};
