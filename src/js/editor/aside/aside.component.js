import { Component } from 'rxcomp';
import { ViewItemType, ViewType } from '../../view/view';

export const EditorLocale = {
	'image': 'Image',
	'video': 'Video',
	'model': 'Model',
	'publisher-stream': 'Publisher Stream',
	'next-attendee-stream': 'Next Attendee Stream',
	'waiting-room': 'Waiting Room',
	'panorama': 'Panorama',
	'panorama-grid': 'Panorama Grid',
	'room-3d': 'Room 3D',
	'model': 'Model',
	'nav': 'Nav with tooltip',
	'gltf': 'Gltf Model',
	'plane': 'Plane',
	'curved-plane': 'CurvedPlane',
	'texture': 'Texture',
};

export default class AsideComponent extends Component {

	onInit() {
		this.mode = 1;
		this.viewTypes = Object.keys(ViewType).map(key => {
			const value = ViewType[key];
			return {
				type: value,
				name: EditorLocale[value],
			};
		});
		this.viewItemTypes = Object.keys(ViewItemType).map(key => {
			const value = ViewItemType[key];
			return {
				type: value,
				name: EditorLocale[value],
			};
		});
		this.setSupportedViewTypes();
		this.setSupportedViewItemTypes();
	}

	onChanges() {
		this.setSupportedViewTypes();
		this.setSupportedViewItemTypes();
	}

	setSupportedViewTypes() {
		this.supportedViewTypes = this.viewTypes.filter(x => this.supportedViewType(x.type));
	}

	setSupportedViewItemTypes() {
		if (this.view) {
			this.supportedViewItemTypes = this.viewItemTypes.filter(x => this.supportedViewItemType(this.view.type, x.type));
		} else {
			this.supportedViewItemTypes = [];
		}
	}

	setMode(mode) {
		if (this.mode !== mode) {
			this.mode = mode;
			this.pushChanges();
		}
	}

	supportedViewType(viewType) {
		let supported = [ViewType.Panorama, ViewType.PanoramaGrid, ViewType.Room3d, ViewType.Model].indexOf(viewType) !== -1; // ViewType.WaitingRoom,
		// console.log('supportedViewType', viewType, supported);
		return supported;
	}

	supportedViewItemType(viewType, viewItemType) {
		let supported;
		switch (viewType) {
			case ViewType.WaitingRoom:
				supported = false;
				break;
			case ViewType.Panorama:
				supported = [ViewItemType.Nav, ViewItemType.Gltf, ViewItemType.Plane, ViewItemType.CurvedPlane].indexOf(viewItemType) !== -1;
				break;
			case ViewType.PanoramaGrid:
				supported = [ViewItemType.Nav, ViewItemType.Gltf, ViewItemType.Plane, ViewItemType.CurvedPlane].indexOf(viewItemType) !== -1;
				break;
			case ViewType.Room3d:
				supported = [ViewItemType.Nav, ViewItemType.Gltf, ViewItemType.Texture].indexOf(viewItemType) !== -1;
				break;
			case ViewType.Model:
				supported = [ViewItemType.Nav, ViewItemType.Gltf, ViewItemType.Plane, ViewItemType.CurvedPlane, ViewItemType.Texture].indexOf(viewItemType) !== -1;
				break;
		}
		// console.log('supportedViewItemType', viewType, viewItemType, supported);
		return supported;
	}

	onSelect(event) {
		this.select.next(event);
	}

}

AsideComponent.meta = {
	selector: '[aside]',
	outputs: ['select'],
	inputs: ['view'],
};
