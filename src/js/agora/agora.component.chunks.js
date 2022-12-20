export const CHUNK_REMOTE = /* html */`
<!-- remote sidebar -->
<div class="group--remote" [class]="remoteClass" *if="state.live">
	<div class="agora-stream" (toggleControl)="onToggleControl($event)" (toggleSpy)="onToggleSpy($event)" agora-stream [stream]="remote" type="remote" *for="let remote of remotes">
		<div class="agora-stream__player"></div>
		<div class="agora-stream__info" [class]="{ spyed: state.spying == streamId, controlling: state.controlling == streamId }">
			<svg class="cam-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#cam-muted"></use></svg>
			<svg class="mic-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic-muted"></use></svg>
			<div class="id" [innerHTML]="stream.clientInfo.name || streamId" *if="stream.clientInfo"></div>
			<button type="button" class="btn--control" [title]="'title_control' | label" (click)="onToggleControl(streamId)" *if="state.role === 'publisher'">
				<svg class="control" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#control"></use></svg>
			</button>
			<button type="button" class="btn--spy" [title]="'title_spy' | label" (click)="onToggleSpy(streamId)" *if="state.role === 'publisher'">
				<svg class="spy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#spy"></use></svg>
			</button>
		</div>
	</div>
	<div class="group--members" *if="state.mode == 'virtual-tour'">
		<div class="members">
			<svg class="spy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#users"></use></svg>
			<span class="members__count" [innerHTML]="state.membersCount"></span>
		</div>
		<div class="credits">
			<a class="btn--credits" href="https://www.websolute.com/" target="_blank" rel="noopener">
				<svg viewBox="0 0 270 98"><use xlink:href="#b-here"></use></svg>
			</a>
		</div>
	</div>
</div>
<!-- remote screen -->
<div class="group--remote-screen" *if="remoteScreen">
	<div class="agora-stream" agora-stream [stream]="remoteScreen" type="remote">
		<div class="agora-stream__player"></div>
		<div class="agora-stream__info">
			<div class="id" [innerHTML]="stream.clientInfo.name || streamId" *if="stream.clientInfo"></div>
		</div>
	</div>
</div>
`;

export const CHUNK_SERVICE = /* html */`
<!-- service -->
<div class="group--service">
	<button type="button" class="btn--back" [title]="'title_back' | label" (click)="onBack($event)" *if="isBackButtonVisible">
		<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#arrow-prev"></use></svg>
	</button>
	<button type="button" class="btn--view-mode" [title]="'title_view_mode' | label" (click)="toggleMode($event)" *if="state.mode != 'embed'">
		<svg width="24" height="24" viewBox="0 0 24 24" *if="state.mode == 'virtual-tour'"><use xlink:href="#live-meeting"></use></svg>
		<svg width="24" height="24" viewBox="0 0 24 24" *if="state.mode == 'live-meeting'"><use xlink:href="#virtual-tour"></use></svg>
	</button>
	<button type="button" class="btn--volume" [title]="'title_volume' | label" [class]="{ muted: state.volumeMuted }" (click)="toggleVolume($event)">
		<svg width="24" height="24" viewBox="0 0 24 24" *if="!state.volumeMuted"><use xlink:href="#volume-on"></use></svg>
		<svg width="24" height="24" viewBox="0 0 24 24" *if="state.volumeMuted"><use xlink:href="#volume-off"></use></svg>
	</button>
	<button type="button" class="btn--fullscreen" [title]="'title_fullscreen' | label" [class]="{ muted: state.fullScreen }" (click)="toggleFullScreen($event)">
		<svg width="24" height="24" viewBox="0 0 24 24" *if="!state.fullScreen"><use xlink:href="#fullscreen-on"></use></svg>
		<svg width="24" height="24" viewBox="0 0 24 24" *if="state.fullScreen"><use xlink:href="#fullscreen-off"></use></svg>
	</button>
	<button type="button" class="btn--navmap" [title]="'title_navmap' | label" [class]="{ active: state.showNavmap }" (click)="toggleNavmap($event)" *if="navmap && state.mode != 'live-meeting'">
		<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#navmap"></use></svg>
	</button>
</div>
`;

export const CHUNK_LOCAL = /* html */`
<!-- local streams -->
<div class="group--local" [class]="{ publisher: state.role == 'publisher', viewer: state.role == 'viewer' }" *if="state.live">
	<button type="button" class="btn--silence" [title]="'title_silence' | label" [class]="{ active: state.silencing }" (click)="onToggleSilence()" *if="state.role === 'publisher'">
		<svg class="mic-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic-muted"></use></svg>
	</button>
	<button type="button" class="btn--control" [title]="'title_control' | label" [class]="{ active: state.controlling == state.uid }" (click)="onToggleControl(state.uid)" *if="state.role == 'publisher'">
		<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#control"></use></svg>
	</button>
	<div class="agora-stream" *if="!local"></div>
	<div class="agora-stream" agora-stream [stream]="local" type="local" *if="local">
		<div class="agora-stream__player"></div>
		<div class="agora-stream__info">
			<svg class="cam-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#cam-muted"></use></svg>
			<svg class="mic-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic-muted"></use></svg>
		</div>
	</div>
	<div class="agora-stream agora-stream--screen" agora-stream [stream]="screen" type="local" *if="screen && hasScreenViewItem">
		<div class="agora-stream__player"></div>
	</div>
</div>
`;

export const CHUNK_LOCAL_SMART_DEVICE = /* html */`
<!-- local streams -->
<div class="group--local" [class]="{ publisher: state.role == 'publisher', viewer: state.role == 'viewer' }" *if="state.live">
	<div class="agora-stream" agora-stream [stream]="local" type="local" *if="local">
		<div class="agora-stream__player"></div>
		<div class="agora-stream__info">
			<svg class="cam-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#cam-muted"></use></svg>
			<svg class="mic-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic-muted"></use></svg>
		</div>
	</div>
</div>
`;

export const CHUNK_CONTROLS = /* html */`
<!-- controls -->
<div class="group--controls" *if="state.live">
	<div class="group--actions">
		<button type="button" class="btn--call" [title]="'title_disconnect' | label" (click)="disconnect()">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#call"></use></svg>
		</button>
		<button type="button" class="btn--cam" [title]="'title_mute_camera' | label" [class]="{ muted: state.cameraMuted, disabled: !local }" (click)="toggleCamera()">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#cam"></use></svg>
		</button>
		<button type="button" class="btn--mic" [title]="'title_mute_mic' | label" [class]="{ muted: state.audioMuted, disabled: !local || silenced }" (click)="toggleAudio()">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic"></use></svg>
		</button>
		<button type="button" class="btn--screen" [title]="'title_share_screen' | label" [class]="{ active: screen }" (click)="toggleScreen()" *if="('screenShare' | flag) && (state.role == 'publisher' || state.role == 'attendee' || controlling)">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#screen"></use></svg>
		</button>
		<button type="button" class="btn--chat" [title]="'title_chat' | label" [class]="{ active: state.chatDirty }" (click)="toggleChat()" *if="('chat' | flag)">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#chat"></use></svg>
		</button>
		<button type="button" class="btn--navinfo" [title]="'title_navinfo' | label" [class]="{ active: state.showNavInfo }" (click)="toggleNavInfo()" *if="showNavInfoToggler">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#navinfo"></use></svg>
		</button>
	</div>
</div>
`;

export const CHUNK_CONTROLS_SMART_DEVICE = /* html */`
<!-- controls -->
<div class="group--controls" *if="state.live">
	<div class="group--actions">
		<button type="button" class="btn--call" [title]="'title_disconnect' | label" (click)="disconnect()">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#call"></use></svg>
		</button>
		<button type="button" class="btn--cam" [title]="'title_mute_camera' | label" [class]="{ muted: state.cameraMuted, disabled: !local }" (click)="toggleCamera()">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#cam"></use></svg>
		</button>
		<button type="button" class="btn--mic" [title]="'title_mute_mic' | label" [class]="{ muted: state.audioMuted, disabled: !local || silenced }" (click)="toggleAudio()">
			<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic"></use></svg>
		</button>
	</div>
</div>
`;

export const CHUNK_MEMBERS = /* html */`
<!-- members -->
<div class="group--members" *if="state.mode == 'live-meeting'">
	<div class="members">
		<svg class="spy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#users"></use></svg>
		<span class="members__count" [innerHTML]="state.membersCount"></span>
	</div>
	<div class="credits">
		<a class="btn--credits" href="https://www.websolute.com/" target="_blank" rel="noopener">
			<svg viewBox="0 0 270 98"><use xlink:href="#b-here"></use></svg>
		</a>
	</div>
</div>
`;

export const CHUNK_MEMBERS_SMART_DEVICE = /* html */`
<!-- members -->
<div class="group--members">
	<div class="members">
		<svg class="spy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#users"></use></svg>
		<span class="members__count" [innerHTML]="state.membersCount"></span>
	</div>
	<div class="credits">
		<a class="btn--credits" href="https://www.websolute.com/" target="_blank" rel="noopener">
			<svg viewBox="0 0 270 98"><use xlink:href="#b-here"></use></svg>
		</a>
	</div>
</div>
`;

export const CHUNK_MEDIA = /* html */`
<!-- media -->
<div class="group--media" media-player>
	<button type="button" class="btn--play" [title]="'title_play' | label" (click)="onPlay()" *if="!playing">
		<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#play"></use></svg>
	</button>
	<button type="button" class="btn--pause" [title]="'title_pause' | label" (click)="onPause()" *if="playing">
		<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#pause"></use></svg>
	</button>
	<div class="track" (click)="onTrack($event)">
		<div class="track__progress" [style]="{ transform: 'scale(' + this.progress + ', 1)'}"></div>
	</div>
</div>
`;

export const CHUNK_AR_VR = /* html */`
<!-- ar-vr -->
<div class="group--ar-vr">
	<button type="button" class="btn--ar" [title]="'title_ar' | label" [href]="view?.ar" (click)="tryInAr()" *if="view?.ar">
		<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#ar"></use></svg> <span>Try in AR</span>
	</button>
	<button type="button" class="btn--vr" [title]="'title_vr' | label" [class]="{ disabled: vrService.isDisabled() }" (click)="vrService.toggleVR()">
		<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#vr"></use></svg> <span [innerHTML]="vrService.getLabel()"></span>
	</button>
</div>
`;

export const CHUNK_LIKE = /* html */`
<!-- like -->
<div class="group--heart" *if="view && ('like' | flag)">
	<svg class="love" [class]="{ active: view.showLove }" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#heart"></use></svg>
	<button type="button" class="btn--heart" [class]="{ active: view.showLove }" (click)="addLike($event)">
		<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#heart"></use></svg>
		<span class="badge" [innerHTML]="view.likes" *if="view.likes"></span>
	</button>
</div>
<div class="group--spacer" *if="!view || !('like' | flag)"></div>
`;

export const CHUNK_CHAT = /* html */`
<!-- chat -->
<div class="group--chat" *if="state.chat" agora-chat (close)="onChatClose()"></div>
`;

export const CHUNK_LOCK = /* html */`
<!-- lock -->
<div class="ui__lock" [class]="{ spying: spying }" *if="locked || controlling"></div>
`;

export const CHUNK_NAVMAP = /* html */`
<!-- navmap -->
<div class="group--navmap" *if="navmap && state.showNavmap && state.mode != 'live-meeting'">
	<img draggable="false" [src]="navmap.asset | asset" *if="navmap.asset" />
	<div class="navmap__item" [style]="{ left: item.position[0] * 100 + '%', top: item.position[1] * 100 + '%' }" (click)="onNavmapItem(item)" *for="let item of navmap.items">
		<img draggable="false" [src]="'textures/ui/nav-point.png' | asset" />
		<div class="title" [innerHTML]="item.title" *if="item.title"></div>
	</div>
</div>
`;

export const CHUNK_BACKGROUND = /* html */`
<!-- background -->
<div class="background" [class]="{ 'background--image': ('background.image' | env), 'background--video': ('background.video' | env) }" *if="state.status != 'connected'">
	<img [src]="'background.image' | env | asset" *if="'background.image' | env" />
	<video [src]="'background.video' | env | asset" *if="'background.video' | env" oncanplay="this.muted = true; this.classList.add('ready');" playsinline autoplay muted loop></video>
</div>
`;

export const CHUNK_LOGO = /* html */`
<!-- logo -->
<a class="btn--logo" [routerLink]="':lang.access' | route" *if="state.status != 'connected'">
	<img [src]="'logo' | env" *if="'logo' | env" />
	<svg viewBox="0 0 270 98" *if="!('logo' | env)"><use xlink:href="#b-here"></use></svg>
</a>
`;

export const CHUNK_CREDITS = /* html */`
<!-- credits -->
<a class="btn--credits" href="https://www.websolute.com/" target="_blank" rel="noopener" *if="state.status != 'connected'">
	<svg viewBox="0 0 270 98"><use xlink:href="#b-here"></use></svg>
</a>
`;

export const CHUNK_COPYRIGHT = /* html */`
<!-- copyright -->
<span *if="'gdprRoutes' | flag"> <span [innerHTML]="'copyright' | label"></span> <span *if="'privacy_policy' | label">-</span> <a [routerLink]="':lang.privacy' | route" class="btn--colophon" [innerHTML]="'privacy_policy' | label"></a> <span *if="'terms_of_service' | label">-</span> <a [routerLink]="':lang.terms' | route" class="btn--colophon" [innerHTML]="'terms_of_service' | label"></a></span>
`;

export const CHUNK_LANGUAGE = /* html */`
<!-- language -->
<div class="group--language" language *if="state.status != 'connected'"></div>
`;

export const CHUNK_VIRTUAL_TOUR = /* html */`
<!-- Virtual Tour -->
<div class="ui virtual-tour" [class]="uiClass" *if="state.status == 'connected' && isVirtualTourUser">
	<!-- world -->
	<div class="ui__body">
		<div class="world" world [view]="view" [views]="pathViews" (navTo)="onNavTo($event)" (navLink)="onNavLink($event)"></div>
	</div>
	${CHUNK_REMOTE}
	<div class="group--header">
		${CHUNK_SERVICE}
		${CHUNK_LOCAL}
	</div>
	<div class="group--footer">
		${CHUNK_CONTROLS}
		${CHUNK_MEDIA}
		${CHUNK_AR_VR}
		${CHUNK_LIKE}
	</div>
	${CHUNK_MEMBERS}
	${CHUNK_CHAT}
	${CHUNK_LOCK}
	${CHUNK_NAVMAP}
</div>
`;

export const CHUNK_SMART_DEVICE = /* html */`
<!-- Smart Device -->
<div class="ui remotes" [class]="uiClass" *if="state.status == 'connected' && state.role == 'smart-device'">
	<div class="ui__body"></div>
	<!-- remote sidebar -->
	<div class="group--remote" [class]="'group--remote--' + remotes.length" *if="state.live">
		<div class="agora-stream" (toggleSpy)="onToggleSpy($event)" agora-stream [stream]="remote" type="remote" *for="let remote of remotes">
			<div class="agora-stream__player"></div>
			<div class="agora-stream__info">
				<svg class="cam-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#cam-muted"></use></svg>
				<svg class="mic-muted" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#mic-muted"></use></svg>
				<div class="id" [innerHTML]="stream.clientInfo.name || streamId" *if="stream.clientInfo"></div>
			</div>
		</div>
	</div>
	<!-- remote screen -->
	<div class="group--remote-screen" *if="remoteScreen && !hasScreenViewItem">
		<div class="agora-stream" agora-stream [stream]="remoteScreen" type="remote">
			<div class="agora-stream__player"></div>
			<div class="agora-stream__info">
				<div class="id" [innerHTML]="stream.clientInfo.name || streamId" *if="stream.clientInfo"></div>
			</div>
		</div>
	</div>
	<div class="group--header">
		${CHUNK_LOCAL_SMART_DEVICE}
	</div>
	<div class="group--footer">
		${CHUNK_CONTROLS_SMART_DEVICE}
	</div>
	${CHUNK_MEMBERS_SMART_DEVICE}
</div>
`;

export const CHUNK_SELF_SERVICE_TOUR = /* html */`
<!-- Self Service Tour -->
<div class="ui" [class]="uiClass" *if="state.status == 'connected' && state.mode == 'self-service-tour'">
	<!-- world -->
	<div class="ui__body">
		<div class="world" world [view]="view" [views]="pathViews" (navTo)="onNavTo($event)" (navLink)="onNavLink($event)"></div>
	</div>
	<div class="group--header">
		${CHUNK_SERVICE}
	</div>
	<div class="group--footer">
		<div class="group--spacer"></div>
		${CHUNK_MEDIA}
		${CHUNK_AR_VR}
		${CHUNK_LIKE}
	</div>
	${CHUNK_NAVMAP}
</div>
`;

export const CHUNK_EMBED = /* html */`
<!-- Embed -->
<div class="ui" [class]="uiClass" *if="state.status == 'connected' && state.mode == 'embed'">
	<!-- world -->
	<div class="ui__body">
		<div class="world" world [view]="view" [views]="pathViews" (navTo)="onNavTo($event)" (navLink)="onNavLink($event)"></div>
	</div>
	<div class="group--header">
		${CHUNK_SERVICE}
	</div>
	<div class="group--footer">
		<div class="group--spacer"></div>
		${CHUNK_MEDIA}
		${CHUNK_AR_VR}
		${CHUNK_LIKE}
	</div>
</div>
`;
