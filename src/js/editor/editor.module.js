import { Module } from 'rxcomp';
import UploadButtonDirective from '../forms/upload/upload-button.directive';
import UploadDropDirective from '../forms/upload/upload-drop.directive';
import UploadItemComponent from '../forms/upload/upload-item.component';
import UploadSrcDirective from '../forms/upload/upload-src.directive';
import ToastOutletComponent from '../toast/toast-outlet.component';
import AsideComponent from './aside/aside.component';
import EditorComponent from './editor.component';
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
	NavModalComponent,
	PanoramaModalComponent,
	PanoramaGridModalComponent,
	PlaneModalComponent,
	RemoveModalComponent,
	ToastOutletComponent,
	UpdateViewItemComponent,
	UpdateViewTileComponent,
	UpdateViewComponent,
	UploadButtonDirective,
	UploadDropDirective,
	UploadItemComponent,
	UploadSrcDirective,
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
