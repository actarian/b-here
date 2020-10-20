import { Component } from 'rxcomp';
import { ViewItemType, ViewType } from '../../view/view';
import { EditorLocale } from '../editor.locale';

export const DISABLED_VIEW_TYPES = [ViewType.WaitingRoom.name, ViewType.Room3d.name, ViewType.Model.name];
export const DISABLED_VIEW_ITEM_TYPES = [ViewItemType.Gltf.name, ViewItemType.Texture.name];

export default class AsideComponent extends Component {

	onInit() {
		this.mode = 1;
		this.viewTypes = Object.keys(ViewType).map(key => {
			const type = ViewType[key];
			return {
				type: type,
				name: EditorLocale[type.name],
				disabled: DISABLED_VIEW_TYPES.indexOf(type.name) !== -1,
			};
		});
		this.viewItemTypes = Object.keys(ViewItemType).map(key => {
			const type = ViewItemType[key];
			return {
				type: type,
				name: EditorLocale[type.name],
				disabled: DISABLED_VIEW_ITEM_TYPES.indexOf(type.name) !== -1,
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
		this.supportedViewTypes = this.viewTypes.filter(x => this.supportedViewType(x.type.name));
	}

	setSupportedViewItemTypes() {
		if (this.view) {
			this.supportedViewItemTypes = this.viewItemTypes.filter(x => this.supportedViewItemType(this.view.type.name, x.type.name));
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

	supportedViewType(viewTypeName) {
		let supported = [ViewType.Panorama.name, ViewType.PanoramaGrid.name, ViewType.Room3d.name, ViewType.Model.name].indexOf(viewTypeName) !== -1; // ViewType.WaitingRoom,
		// console.log('supportedViewType', viewType, supported);
		return supported;
	}

	supportedViewItemType(viewTypeName, viewItemTypeName) {
		let supported;
		switch (viewTypeName) {
			case ViewType.WaitingRoom.name:
				supported = false;
				break;
			case ViewType.Panorama.name:
				supported = [ViewItemType.Nav.name, ViewItemType.Gltf.name, ViewItemType.Plane.name, ViewItemType.CurvedPlane.name].indexOf(viewItemTypeName) !== -1;
				break;
			case ViewType.PanoramaGrid.name:
				supported = [ViewItemType.Nav.name, ViewItemType.Gltf.name, ViewItemType.Plane.name, ViewItemType.CurvedPlane.name].indexOf(viewItemTypeName) !== -1;
				break;
			case ViewType.Room3d.name:
				supported = [ViewItemType.Nav.name, ViewItemType.Gltf.name, ViewItemType.Texture.name].indexOf(viewItemTypeName) !== -1;
				break;
			case ViewType.Model.name:
				supported = [ViewItemType.Nav.name, ViewItemType.Gltf.name, ViewItemType.Plane.name, ViewItemType.CurvedPlane.name, ViewItemType.Texture.name].indexOf(viewItemTypeName) !== -1;
				break;
		}
		// console.log('supportedViewItemType', viewTypeName, viewItemTypeName, supported);
		return supported;
	}

	onSelect(event) {
		this.select.next(event);
	}

	onUpdate(event) {
		this.update.next(event);
	}

	onDelete(event) {
		this.delete.next(event);
	}
}

AsideComponent.meta = {
	selector: '[aside]',
	outputs: ['select', 'update', 'delete'],
	inputs: ['view'],
};
