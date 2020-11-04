import { Module } from 'rxcomp';
import ToastOutletComponent from '../toast/toast-outlet.component';
import AsideComponent from './aside/aside.component';
import EditorComponent from './editor.component';
import MenuBuilderComponent from './menu/menu-builder.component';
import CurvedPlaneModalComponent from './modals/curved-plane-modal.component';
import NavModalComponent from './modals/nav-modal.component';
import PanoramaGridModalComponent from './modals/panorama-grid-modal.component';
import PanoramaModalComponent from './modals/panorama-modal.component';
import PlaneModalComponent from './modals/plane-modal.component';
import RemoveModalComponent from './modals/remove-modal.component';
import UpdateViewItemComponent from './update/update-view-item.component';
import UpdateViewTileComponent from './update/update-view-tile.component';
import UpdateViewComponent from './update/update-view.component';

const factories = [
	AsideComponent,
	CurvedPlaneModalComponent,
	EditorComponent,
	MenuBuilderComponent,
	NavModalComponent,
	PanoramaModalComponent,
	PanoramaGridModalComponent,
	PlaneModalComponent,
	RemoveModalComponent,
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
