import { CoreModule, Module } from 'rxcomp';
import { FormModule } from 'rxcomp-form';
import AgoraDevicePreviewComponent from './agora/agora-device-preview.component';
import AgoraDeviceComponent from './agora/agora-device.component';
import AgoraLinkComponent from './agora/agora-link.component';
import AgoraStreamComponent from './agora/agora-stream.component';
import AgoraComponent from './agora/agora.component';
import AppComponent from './app.component';
import ControlRequestModalComponent from './control-request/control-request-modal.component';
import DropDirective from './drop/drop.directive';
import DropdownItemDirective from './dropdown/dropdown-item.directive';
import DropdownDirective from './dropdown/dropdown.directive';
import ControlCustomSelectComponent from './forms/control-custom-select.component';
import ControlTextComponent from './forms/control-text.component';
import IdDirective from './id/id.directive';
import ModalOutletComponent from './modal/modal-outlet.component';
import ModalComponent from './modal/modal.component';
import SliderDirective from './slider/slider.directive';
import TryInARModalComponent from './try-in-ar/try-in-ar-modal.component';
import TryInARComponent from './try-in-ar/try-in-ar.component';
import ValueDirective from './value/value.directive';
import HlsDirective from './video/hls.directive';
import ModelBannerComponent from './world/model/model-banner.component';
import ModelGltfComponent from './world/model/model-gltf.component';
import ModelNavComponent from './world/model/model-nav.component';
import ModelPanelComponent from './world/model/model-panel.component';
import ModelPictureComponent from './world/model/model-picture.component';
import ModelTextComponent from './world/model/model-text.component';
import ModelComponent from './world/model/model.component';
import WorldComponent from './world/world.component';

export class AppModule extends Module {}

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
		AgoraStreamComponent,
		ControlCustomSelectComponent,
		ControlRequestModalComponent,
		ControlTextComponent,
		DropDirective,
		DropdownDirective,
		DropdownItemDirective,
		HlsDirective,
		IdDirective,
		ModalComponent,
		ModalOutletComponent,
		ModelBannerComponent,
		ModelComponent,
		ModelGltfComponent,
		ModelPictureComponent,
		ModelTextComponent,
		ModelNavComponent,
		ModelPanelComponent,
		SliderDirective,
		TryInARComponent,
		TryInARModalComponent,
		ValueDirective,
		WorldComponent,
	],
	bootstrap: AppComponent,
};
