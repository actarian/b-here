import { CoreModule, Module } from 'rxcomp';
import { FormModule } from 'rxcomp-form';
import AgoraDevicePreviewComponent from './agora/agora-device-preview.component';
import AgoraDeviceComponent from './agora/agora-device.component';
import AgoraLinkComponent from './agora/agora-link.component';
import AgoraNameComponent from './agora/agora-name.component';
import AgoraStreamComponent from './agora/agora-stream.component';
import AgoraComponent from './agora/agora.component';
import AppComponent from './app.component';
import AssetPipe from './asset/asset.pipe';
import ControlRequestModalComponent from './control-request/control-request-modal.component';
import DropDirective from './drop/drop.directive';
import DropdownItemDirective from './dropdown/dropdown-item.directive';
import DropdownDirective from './dropdown/dropdown.directive';
import EditorComponent from './editor/editor.component';
import NavModalComponent from './editor/modals/nav-modal.component';
import PanoramaModalComponent from './editor/modals/panorama-modal.component';
import ControlCustomSelectComponent from './forms/control-custom-select.component';
import ControlSelectComponent from './forms/control-select.component';
import ControlTextComponent from './forms/control-text.component';
import ControlUploadComponent from './forms/control-upload.component';
import UploadButtonDirective from './forms/upload/upload-button.directive';
import UploadDropDirective from './forms/upload/upload-drop.directive';
import UploadItemComponent from './forms/upload/upload-item.component';
import UploadSrcDirective from './forms/upload/upload-src.directive';
import IdDirective from './id/id.directive';
import ModalOutletComponent from './modal/modal-outlet.component';
import ModalComponent from './modal/modal.component';
import SliderDirective from './slider/slider.directive';
import TryInARModalComponent from './try-in-ar/try-in-ar-modal.component';
import TryInARComponent from './try-in-ar/try-in-ar.component';
import ValueDirective from './value/value.directive';
import HlsDirective from './video/hls.directive';
import ModelBannerComponent from './world/model/model-banner.component';
import ModelCurvedPlaneComponent from './world/model/model-curved-plane.component';
import ModelDebugComponent from './world/model/model-debug.component';
import ModelGltfComponent from './world/model/model-gltf.component';
import ModelGridComponent from './world/model/model-grid.component';
import ModelMenuComponent from './world/model/model-menu.component';
import ModelNavComponent from './world/model/model-nav.component';
import ModelPanelComponent from './world/model/model-panel.component';
import ModelPictureComponent from './world/model/model-picture.component';
import ModelPlaneComponent from './world/model/model-plane.component';
import ModelRoomComponent from './world/model/model-room.component-2';
import ModelTextComponent from './world/model/model-text.component';
import ModelComponent from './world/model/model.component';
import WorldComponent from './world/world.component';

export class AppModule extends Module { }

AppModule.meta = {
	imports: [
		CoreModule,
		FormModule,
	],
	declarations: [
		AgoraComponent,
		AgoraDeviceComponent,
		AgoraDevicePreviewComponent,
		AgoraLinkComponent,
		AgoraNameComponent,
		AgoraStreamComponent,
		AssetPipe,
		ControlCustomSelectComponent,
		ControlRequestModalComponent,
		ControlTextComponent,
		ControlUploadComponent,
		ControlSelectComponent,
		DropDirective,
		DropdownDirective,
		DropdownItemDirective,
		EditorComponent,
		HlsDirective,
		IdDirective,
		ModalComponent,
		ModalOutletComponent,
		ModelBannerComponent,
		ModelComponent,
		ModelCurvedPlaneComponent,
		ModelDebugComponent,
		ModelGltfComponent,
		ModelGridComponent,
		ModelMenuComponent,
		ModelNavComponent,
		ModelPanelComponent,
		ModelPictureComponent,
		ModelPlaneComponent,
		ModelRoomComponent,
		ModelTextComponent,
		PanoramaModalComponent,
		NavModalComponent,
		SliderDirective,
		TryInARComponent,
		TryInARModalComponent,
		UploadButtonDirective,
		UploadDropDirective,
		UploadSrcDirective,
		UploadItemComponent,
		ValueDirective,
		WorldComponent,
	],
	bootstrap: AppComponent,
};
