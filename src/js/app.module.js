import { CoreModule, Module } from 'rxcomp';
import { FormModule } from 'rxcomp-form';
import AccessComponent from './access/access.component';
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
import { EditorModule } from './editor/editor.module';
import AssetItemComponent from './forms/asset/asset-item.component';
import ControlAssetComponent from './forms/control-asset.component';
import ControlAssetsComponent from './forms/control-assets.component';
import ControlCheckboxComponent from './forms/control-checkbox.component';
import ControlCustomSelectComponent from './forms/control-custom-select.component';
import ControlLinkComponent from './forms/control-link.component';
import ControlModelComponent from './forms/control-model.component';
import ControlNumberComponent from './forms/control-number.component';
import ControlPasswordComponent from './forms/control-password.component';
import ControlSelectComponent from './forms/control-select.component';
import ControlTextComponent from './forms/control-text.component';
import ControlUploadComponent from './forms/control-upload.component';
import ControlVectorComponent from './forms/control-vector.component';
import DisabledDirective from './forms/disabled.directive';
import ErrorsComponent from './forms/errors.component';
import InputValueComponent from './forms/input-value.component';
import TestComponent from './forms/test.component';
import ValueDirective from './forms/value.directive';
import HtmlPipe from './html/html.pipe';
import IdDirective from './id/id.directive';
import LabelPipe from './label/label.pipe';
import LazyDirective from './lazy/lazy.directive';
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
		AccessComponent,
		AgoraComponent,
		AgoraDeviceComponent,
		AgoraDevicePreviewComponent,
		AgoraLinkComponent,
		AgoraNameComponent,
		AgoraStreamComponent,
		AssetPipe,
		AssetItemComponent,
		ControlAssetComponent,
		ControlModelComponent,
		ControlAssetsComponent,
		ControlCheckboxComponent,
		ControlCustomSelectComponent,
		ControlLinkComponent,
		ControlNumberComponent,
		ControlPasswordComponent,
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
		HtmlPipe,
		HlsDirective,
		IdDirective,
		InputValueComponent,
		LabelPipe,
		LazyDirective,
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
		SliderDirective,
		SvgIconStructure,
		TestComponent,
		TryInARComponent,
		TryInARModalComponent,
		ValueDirective,
		WorldComponent
	],
	bootstrap: AppComponent,
};
