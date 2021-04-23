import { Component } from 'rxcomp';
import { environment } from '../../environment';
import LabelPipe from '../../label/label.pipe';
import { ViewItemType, ViewType } from '../../view/view';

export default class AsideComponent extends Component {

	onInit() {
		this.mode = 1;
		this.viewTypes = Object.keys(ViewType).map(key => {
			const type = ViewType[key];
			return {
				type: type,
				name: LabelPipe.getKeys('editor', type.name),
				disabled: environment.editor.disabledViewTypes.indexOf(type.name) !== -1,
			};
		});
		this.viewItemTypes = Object.keys(ViewItemType).map(key => {
			const type = ViewItemType[key];
			return {
				type: type,
				name: LabelPipe.getKeys('editor', type.name),
				disabled: environment.editor.disabledViewItemTypes.indexOf(type.name) !== -1,
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
		this.supportedViewTypes = this.viewTypes.filter(x => this.supportedViewType(x.type.name)).sort((a, b) => {
			if (a.disabled === b.disabled) {
				return 0; // (a.type.name < b.type.name) ? -1 : (a.type.name > b.type.name) ? 1 : 0;
			} else {
				return a.disabled ? 1 : -1;
			}
		});
	}

	setSupportedViewItemTypes() {
		if (this.view) {
			this.supportedViewItemTypes = this.viewItemTypes.filter(x => this.supportedViewItemType(this.view.type.name, x.type.name)).sort((a, b) => {
				if (a.disabled === b.disabled) {
					return 0; // (a.type.name < b.type.name) ? -1 : (a.type.name > b.type.name) ? 1 : 0;
				} else {
					return a.disabled ? 1 : -1;
				}
			});
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
				supported = [ViewItemType.Nav.name, ViewItemType.Model.name, ViewItemType.Plane.name, ViewItemType.CurvedPlane.name].indexOf(viewItemTypeName) !== -1;
				break;
			case ViewType.PanoramaGrid.name:
				supported = [ViewItemType.Nav.name, ViewItemType.Model.name, ViewItemType.Plane.name, ViewItemType.CurvedPlane.name].indexOf(viewItemTypeName) !== -1;
				break;
			case ViewType.Room3d.name:
				supported = [ViewItemType.Nav.name, ViewItemType.Model.name, ViewItemType.Plane.name, ViewItemType.Texture.name].indexOf(viewItemTypeName) !== -1;
				break;
			case ViewType.Model.name:
				supported = [ViewItemType.Nav.name, ViewItemType.Model.name, ViewItemType.Plane.name, ViewItemType.CurvedPlane.name].indexOf(viewItemTypeName) !== -1;
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
