import { CoreModule, Module } from 'rxcomp';
import { FormModule } from 'rxcomp-form';
import AccessCodeComponent from './access/access-code.component';
import AccessComponent from './access/access.component';
import AgoraChatEmojiComponent from './agora/agora-chat-emoji.component';
import AgoraChatComponent from './agora/agora-chat.component';
import AgoraCheckComponent from './agora/agora-check.component';
import AgoraChecklistComponent from './agora/agora-checklist.component';
import AgoraConfigureFirewallModalComponent from './agora/agora-configure-firewall-modal.component';
import AgoraDevicePreviewComponent from './agora/agora-device-preview.component';
import AgoraDeviceComponent from './agora/agora-device.component';
import AgoraLinkComponent from './agora/agora-link.component';
import AgoraLoginComponent from './agora/agora-login.component';
import AgoraNameComponent from './agora/agora-name.component';
import AgoraStreamComponent from './agora/agora-stream.component';
import AgoraComponent from './agora/agora.component';
import AgoraService from './agora/agora.service';
import AppComponent from './app.component';
import AssetPipe from './asset/asset.pipe';
import ControlRequestModalComponent from './control-request/control-request-modal.component';
import DropDirective from './drop/drop.directive';
import DropdownItemDirective from './dropdown/dropdown-item.directive';
import DropdownDirective from './dropdown/dropdown.directive';
import { EditorModule } from './editor/editor.module';
import IframeModalComponent from './editor/modals/iframe-modal.component';
import EnvPipe from './env/env.pipe';
import FlagPipe from './flag/flag.pipe';
import ControlAssetComponent from './forms/control-asset.component';
import ControlAssetsComponent from './forms/control-assets.component';
import ControlCheckboxComponent from './forms/control-checkbox.component';
import ControlCustomSelectComponent from './forms/control-custom-select.component';
import ControlLinkComponent from './forms/control-link.component';
import ControlLocalizedAssetComponent from './forms/control-localized-asset.component';
import ControlMenuComponent from './forms/control-menu.component';
import ControlModelComponent from './forms/control-model.component';
import ControlNumberComponent from './forms/control-number.component';
import ControlPasswordComponent from './forms/control-password.component';
import ControlSelectComponent from './forms/control-select.component';
import ControlTextComponent from './forms/control-text.component';
import ControlTextareaComponent from './forms/control-textarea.component';
import ControlVectorComponent from './forms/control-vector.component';
import ControlsComponent from './forms/controls.component';
import DisabledDirective from './forms/disabled.directive';
import ErrorsComponent from './forms/errors.component';
import InputValueComponent from './forms/input-value.component';
import TestComponent from './forms/test.component';
import ValueDirective from './forms/value.directive';
import { GenericModalComponent } from './generic/generic-modal.component';
import { GenericComponent } from './generic/generic.component';
import HtmlPipe from './html/html.pipe';
import IdDirective from './id/id.directive';
import { LabelPipe } from './label/label.pipe';
import LanguageComponent from './language/language.component';
import LayoutComponent from './layout/layout.component';
import LazyDirective from './lazy/lazy.directive';
import MessagePipe from './message/message.pipe';
import ModalOutletComponent from './modal/modal-outlet.component';
import ModalComponent from './modal/modal.component';
import { RoutePipe } from './router/route.pipe';
import { RouterLinkDirective } from './router/router-link.directive';
import { RouterOutletStructure } from './router/router-outlet.structure';
import SupportRequestModalComponent from './support-request/support-request-modal.component';
import SvgIconStructure from './svg/svg-icon.structure';
import TitleDirective from './title/title.directive';
import TryInARModalComponent from './try-in-ar/try-in-ar-modal.component';
import TryInARComponent from './try-in-ar/try-in-ar.component';
import UploadItemComponent from './upload/upload-item.component';
import HlsDirective from './video/hls.directive';
import VirtualStructure from './virtual/virtual.structure';
import MediaPlayerComponent from './world/media/media-player.component';
import ModelBannerComponent from './world/model/model-banner.component';
import ModelCurvedPlaneComponent from './world/model/model-curved-plane.component';
import ModelDebugComponent from './world/model/model-debug.component';
import ModelGridComponent from './world/model/model-grid.component';
import ModelMenuComponent from './world/model/model-menu.component';
import ModelModelComponent from './world/model/model-model.component';
import ModelNavComponent from './world/model/model-nav.component';
import ModelPanelComponent from './world/model/model-panel.component';
import ModelPictureComponent from './world/model/model-picture.component';
import ModelPlaneComponent from './world/model/model-plane.component';
import ModelProgressComponent from './world/model/model-progress.component';
import ModelRoomComponent from './world/model/model-room.component';
import ModelTextComponent from './world/model/model-text.component';
import ModelComponent from './world/model/model.component';
import WorldComponent from './world/world.component';

AgoraService.fixLegacy();

export class AppModule extends Module { }

AppModule.meta = {
	imports: [
		CoreModule,
		FormModule,
		EditorModule,
	],
	declarations: [
		AccessCodeComponent,
		AccessComponent,
		AgoraChatComponent,
		AgoraChatEmojiComponent,
		AgoraCheckComponent,
		AgoraChecklistComponent,
		AgoraComponent,
		AgoraConfigureFirewallModalComponent,
		AgoraDeviceComponent,
		AgoraDevicePreviewComponent,
		AgoraLinkComponent,
		AgoraLoginComponent,
		AgoraNameComponent,
		AgoraStreamComponent,
		AssetPipe,
		ControlAssetComponent,
		ControlAssetsComponent,
		ControlCheckboxComponent,
		ControlCustomSelectComponent,
		ControlLinkComponent,
		ControlLocalizedAssetComponent,
		ControlMenuComponent,
		ControlModelComponent,
		ControlNumberComponent,
		ControlPasswordComponent,
		ControlRequestModalComponent,
		ControlsComponent,
		ControlSelectComponent,
		ControlTextareaComponent,
		ControlTextComponent,
		ControlVectorComponent,
		DisabledDirective,
		DropDirective,
		DropdownDirective,
		DropdownItemDirective,
		EnvPipe,
		ErrorsComponent,
		FlagPipe,
		GenericComponent,
		GenericModalComponent,
		HlsDirective,
		HtmlPipe,
		IframeModalComponent,
		IdDirective,
		InputValueComponent,
		LabelPipe,
		LanguageComponent,
		LayoutComponent,
		LazyDirective,
		MediaPlayerComponent,
		MessagePipe,
		ModalComponent,
		ModalOutletComponent,
		ModelBannerComponent,
		ModelComponent,
		ModelCurvedPlaneComponent,
		ModelDebugComponent,
		ModelGridComponent,
		ModelMenuComponent,
		ModelModelComponent,
		ModelNavComponent,
		ModelPanelComponent,
		ModelPictureComponent,
		ModelPlaneComponent,
		ModelProgressComponent,
		ModelRoomComponent,
		ModelTextComponent,
		RoutePipe,
		SupportRequestModalComponent,
		SvgIconStructure,
		TestComponent,
		TitleDirective,
		TryInARComponent,
		TryInARModalComponent,
		UploadItemComponent,
		ValueDirective,
		VirtualStructure,
		WorldComponent,
		RouterOutletStructure,
		RouterLinkDirective,
	],
	bootstrap: AppComponent,
};
