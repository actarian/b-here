import { Module } from 'rxcomp';
import ToastOutletComponent from '../toast/toast-outlet.component';
import AsideComponent from './aside/aside.component';
import EditorComponent from './editor.component';
import MenuBuilderComponent from './menu/menu-builder.component';
import CurvedPlaneModalComponent from './modals/curved-plane-modal.component';
import ItemModelModalComponent from './modals/item-model-modal.component';
import MediaModalComponent from './modals/media-modal.component';
import ModelModalComponent from './modals/model-modal.component';
import NavModalComponent from './modals/nav-modal.component';
import NavmapItemModalComponent from './modals/navmap-item-modal.component';
import NavmapModalComponent from './modals/navmap-modal.component';
import PanoramaGridModalComponent from './modals/panorama-grid-modal.component';
import PanoramaModalComponent from './modals/panorama-modal.component';
import PathAddModalComponent from './modals/path-add-modal.component';
import PathEditModalComponent from './modals/path-edit-modal.component';
import PlaneModalComponent from './modals/plane-modal.component';
import RemoveModalComponent from './modals/remove-modal.component';
import Room3DModalComponent from './modals/room-3d-modal.component';
import NavmapBuilderComponent from './navmap/navmap-builder.component';
import NavmapEditComponent from './navmap/navmap-edit.component';
import UpdateViewItemComponent from './update/update-view-item.component';
import UpdateViewTileComponent from './update/update-view-tile.component';
import UpdateViewComponent from './update/update-view.component';

const factories = [
	AsideComponent,
	CurvedPlaneModalComponent,
	EditorComponent,
	ItemModelModalComponent,
	NavmapBuilderComponent,
	NavmapEditComponent,
	NavmapModalComponent,
	NavmapItemModalComponent,
	MediaModalComponent,
	MenuBuilderComponent,
	ModelModalComponent,
	NavModalComponent,
	PanoramaModalComponent,
	PanoramaGridModalComponent,
	PathAddModalComponent,
	PathEditModalComponent,
	PlaneModalComponent,
	RemoveModalComponent,
	Room3DModalComponent,
	ToastOutletComponent,
	UpdateViewItemComponent,
	UpdateViewTileComponent,
	UpdateViewComponent,
];

const pipes = [];

export class EditorModule extends Module { }

EditorModule.meta = {
	imports: [],
	declarations: [
		...factories,
		...pipes,
	],
	exports: [
		...factories,
		...pipes,
	]
};
