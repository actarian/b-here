import { Module } from 'rxcomp';
import UploadButtonDirective from '../forms/upload/upload-button.directive';
import UploadDropDirective from '../forms/upload/upload-drop.directive';
import UploadItemComponent from '../forms/upload/upload-item.component';
import UploadSrcDirective from '../forms/upload/upload-src.directive';
import ToastOutletComponent from '../toast/toast-outlet.component';
import EditorComponent from './editor.component';
import NavModalComponent from './modals/nav-modal.component';
import PanoramaModalComponent from './modals/panorama-modal.component';
import PlaneModalComponent from './modals/plane-modal.component';

const factories = [
	EditorComponent,
	NavModalComponent,
	PanoramaModalComponent,
	PlaneModalComponent,
	ToastOutletComponent,
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
