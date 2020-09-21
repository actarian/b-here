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
import AsideComponent from './editor/aside/aside.component';
import { EditorModule } from './editor/editor.module';
import RemoveModalComponent from './editor/modals/remove-modal.component';
import UpdateViewItemComponent from './editor/update/update-view-item.component';
import UpdateViewComponent from './editor/update/update-view.component';
import ControlCustomSelectComponent from './forms/control-custom-select.component';
import ControlSelectComponent from './forms/control-select.component';
import ControlTextComponent from './forms/control-text.component';
import ControlUploadComponent from './forms/control-upload.component';
import ControlVectorComponent from './forms/control-vector.component';
import DisabledDirective from './forms/disabled.directive';
import ErrorsComponent from './forms/errors.component';
import InputValueComponent from './forms/input-value.component';
import ValueDirective from './forms/value.directive';
import IdDirective from './id/id.directive';
import ModalOutletComponent from './modal/modal-outlet.component';
import ModalComponent from './modal/modal.component';
import SliderDirective from './slider/slider.directive';
import SvgIconStructure from './svg/svg-icon.structure';
import TryInARModalComponent from './try-in-ar/try-in-ar-modal.component';
import TryInARComponent from './try-in-ar/try-in-ar.component';
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
		EditorModule,
	],
	declarations: [
		AgoraComponent,
		AgoraDeviceComponent,
		AgoraDevicePreviewComponent,
		AgoraLinkComponent,
		AgoraNameComponent,
		AgoraStreamComponent,
		AsideComponent,
		AssetPipe,
		ControlCustomSelectComponent,
		ControlRequestModalComponent,
		ControlSelectComponent,
		ControlTextComponent,
		ControlUploadComponent,
		ControlVectorComponent,
		DisabledDirective,
		DropDirective,
		DropdownDirective,
		DropdownItemDirective,
		ErrorsComponent,
		HlsDirective,
		IdDirective,
		InputValueComponent,
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
		RemoveModalComponent,
		SliderDirective,
		SvgIconStructure,
		TryInARComponent,
		TryInARModalComponent,
		UpdateViewComponent,
		UpdateViewItemComponent,
		ValueDirective,
		WorldComponent
	],
	bootstrap: AppComponent,
};
