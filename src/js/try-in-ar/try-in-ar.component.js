import { Component, getContext } from 'rxcomp';
import { first } from 'rxjs/operators';
import { DeviceService } from '../device/device.service';
import { environment } from '../environment';
import LocationService from '../location/location.service';
import ViewService from '../view/view.service';

export default class TryInARComponent extends Component {

	onInit() {
		this.platform = DeviceService.platform;
		this.view = null;
		const viewId = this.viewId = this.getViewId();
		// console.log('TryInARComponent.viewId', viewId);
		if (viewId) {
			ViewService.view$(viewId).pipe(
				first()
			).subscribe(view => {
				// console.log('TryInARComponent.view', view);
				const modelViewerNode = this.getModelViewerNode(view);
				const { node } = getContext(this);
				node.appendChild(modelViewerNode);
				/*
				if (this.platform === DevicePlatform.Android) {
					const modelViewerNode = this.getModelViewerNode(view);
					const { node } = getContext(this);
					node.appendChild(modelViewerNode);
				} else if (this.platform === DevicePlatform.IOS) {
					const usdzSrc = environment.getPath(view.ar.usdz);
					window.location.href = usdzSrc;
				}
				*/
			});
		}
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
		const gltfSrc = environment.getPath(view.ar.gltf);
		const usdzSrc = environment.getPath(view.ar.usdz);
		const template = /* html */`
			<model-viewer alt="${view.name}" skybox-image="${panorama}" ios-src="${usdzSrc}" src="${gltfSrc}" ar ar-modes="webxr scene-viewer quick-look" ar-scale="auto" camera-controls></model-viewer>
		`;
		// const template = `<model-viewer alt="${view.name}" src="${gltfSrc}" ios-src="${usdzSrc}" magic-leap ar ar_preferred></model-viewer>`;
		const div = document.createElement("div");
		div.innerHTML = template;
		const node = div.firstElementChild;
		return node;
	}

}

TryInARComponent.meta = {
	selector: '[try-in-ar]'
};
