import { Component, getContext } from 'rxcomp';
import { first, map } from 'rxjs/operators';
import { DevicePlatform, DeviceService } from '../device/device.service';
import { environment } from '../environment';
import HttpService from '../http/http.service';
import LocationService from '../location/location.service';

export default class TryInARComponent extends Component {

	onInit() {
		this.platform = DeviceService.platform;
		this.view = null;
		const viewId = this.viewId = this.getViewId();
		// console.log('TryInARComponent.viewId', viewId);
		if (viewId) {
			this.load$().pipe(
				first()
			).subscribe(data => {
				const view = data.views.find(x => x.id === viewId);
				// console.log('TryInARComponent.view', view);
				if (this.platform === DevicePlatform.Android) {
					const modelViewerNode = this.getModelViewerNode(view);
					const { node } = getContext(this);
					node.appendChild(modelViewerNode);
				} else if (this.platform === DevicePlatform.IOS) {
					const usdzSrc = environment.getPath(view.ar.usdz);
					window.location.href = usdzSrc;
				}
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
		const gltfSrc = environment.getPath(view.ar.gltf);
		const usdzSrc = environment.getPath(view.ar.usdz);
		const template = `<model-viewer alt="${view.name}" src="${gltfSrc}" ios-src="${usdzSrc}" magic-leap ar ar_preferred></model-viewer>`;
		const div = document.createElement("div");
		div.innerHTML = template;
		const node = div.firstElementChild;
		return node;
	}

	load$() {
		return HttpService.get$('./api/data.json').pipe(
			map(data => {
				data.views.forEach(view => {
					view.items.forEach((item, index) => {
						item.index = index;
					});
				});
				return data;
			})
		);
	}

}

TryInARComponent.meta = {
	selector: '[try-in-ar]'
};
