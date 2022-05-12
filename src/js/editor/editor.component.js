import { Component, getContext } from 'rxcomp';
import { Subject } from 'rxjs';
import { delay, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AgoraStatus, MessageType, UIMode } from '../agora/agora.types';
import { AssetService } from '../asset/asset.service';
import { environment } from '../environment';
import { MeetingUrl } from '../meeting/meeting-url';
import { MessageService } from '../message/message.service';
import { ModalResolveEvent, ModalService } from '../modal/modal.service';
import { RoutePipe } from '../router/route.pipe';
import { RouterOutletStructure } from '../router/router-outlet.structure';
import { RouterService } from '../router/router.service';
import StateService from '../state/state.service';
import StreamService, { StreamServiceMode } from '../stream/stream.service';
import ToastService from '../toast/toast.service';
import TryInARModalComponent from '../try-in-ar/try-in-ar-modal.component';
import { RoleType } from '../user/user';
import { UserService } from '../user/user.service';
import { ViewItemType, ViewType } from '../view/view';
import { ViewService } from '../view/view.service';
import VRService from '../world/vr.service';
import { EditorService } from './editor.service';
import CurvedPlaneModalComponent from './modals/curved-plane-modal.component';
import ItemModelModalComponent from './modals/item-model-modal.component';
import MediaModalComponent from './modals/media-modal.component';
import ModelModalComponent from './modals/model-modal.component';
import NavModalComponent from './modals/nav-modal.component';
import PanoramaGridModalComponent from './modals/panorama-grid-modal.component';
import PanoramaModalComponent from './modals/panorama-modal.component';
import PathAddModalComponent from './modals/path-add-modal.component';
import PathEditModalComponent from './modals/path-edit-modal.component';
import PlaneModalComponent from './modals/plane-modal.component';
import RemoveModalComponent from './modals/remove-modal.component';
import Room3DModalComponent from './modals/room-3d-modal.component';
import PathService from './path/path.service';

export const SETTINGS = {
	menu: [{
		id: 'menu',
		title: 'editor_menu',
		active: true,
	}, {
		id: 'navmaps',
		title: 'editor_navmaps',
		active: true,
	}],
	current: null,
	active: false,
};

export default class EditorComponent extends Component {

	get dataViews() {
		return ViewService.dataViews;
	}

	get pathViews() {
		return ViewService.pathViews;
	}

	onInit() {
		const { node } = getContext(this);
		node.classList.remove('hidden');
		this.settings = this.getSettings();
		this.aside = false;
		this.state = {};
		this.view = null;
		this.paths = null;
		this.path = null;
		this.form = null;
		this.local = null;
		this.remotes = [];
		this.viewHit = new Subject();
		const vrService = this.vrService = VRService.getService();
		vrService.status$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(status => this.pushChanges());
		this.resolveUser();
	}

	resolveUser() {
		UserService.me$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(user => {
			if (user && user.type === RoleType.Publisher) {
				this.user = user;
				this.initState();
			} else {
				RouterService.setRouterLink(RoutePipe.transform(':lang.access'));
			}
		});
	}

	initState() {
		const user = this.user;
		const role = user.type;
		const name = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null;
		const state = {
			user: user,
			role: role,
			name: name,
			mode: UIMode.VirtualTour,
			link: null,
			channelName: environment.channelName,
			uid: null,
			status: AgoraStatus.Connected,
			connecting: false,
			connected: true,
			controlling: false,
			spying: false,
			silencing: false,
			hosted: true,
			live: false,
			navigable: true,
			cameraMuted: false,
			audioMuted: false,
			showNavInfo: true,
		};
		StateService.state = state;
		StateService.state$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(state => {
			this.state = state;
			this.hosted = state.hosted;
			this.pushChanges();
		});
		this.viewObserver$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(view => {
			// console.log('EditorComponent.viewObserver$', view);
		});
		StreamService.mode = StreamServiceMode.Editor;
		// this.getUserMedia();
	}

	viewObserver$() {
		return EditorService.data$().pipe(
			switchMap(data => {
				// console.log('viewObserver$', data);
				const meetingUrl = new MeetingUrl();
				const pathId = meetingUrl.pathId;
				return PathService.getCurrentPath$(pathId).pipe(
					switchMap(path => {
						this.paths = PathService.paths;
						this.path = path;
						return ViewService.editorView$(data, path);
					}),
				);
			}),
			tap(view => {
				this.view = null;
				this.pushChanges();
			}),
			delay(1),
			tap(view => {
				// console.log('EditorComponent.viewObserver$', view, ViewService.pathViews, ViewService.dataViews);
				this.view = view;
				this.pushChanges();
			}),
		);
	}

	onAddPath() {
		// console.log('EditorComponent.onAddPath');
		ModalService.open$({ template: PathAddModalComponent.chunk() }).pipe(
			first(),
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				PathService.addPath(event.data);
			}
		});
	}

	onEditPath(item) {
		// console.log('EditorComponent.onEditPath', item);
		ModalService.open$({ template: PathEditModalComponent.chunk(), data: { item: item, views: ViewService.validViews } }).pipe(
			first(),
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				PathService.editPath(event.data);
			}
		});
	}

	onDuplicatePath(item) {
		// console.log('EditorComponent.onDuplicatePath', item);
		ModalService.open$({ template: PathAddModalComponent.chunk(), data: { item } }).pipe(
			first(),
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				PathService.addPath(event.data);
			}
		});
	}

	onDeletePath(item) {
		// console.log('EditorComponent.onDeletePath', item);
		ModalService.open$({ template: RemoveModalComponent.chunk(), data: { item: item } }).pipe(
			first(),
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				PathService.pathDelete$(item).pipe(
					first(),
				).subscribe(_ => {
					PathService.deletePath(item);
				});
			}
		});
	}

	onSelectPath(item) {
		// console.log('EditorComponent.onSelectPath', item);
		PathService.path = item;
	}

	isPathSelected(item) {
		// console.log('EditorComponent.isPathSelected', item);
		return PathService.path.id === item.id;
	}

	onNavTo(item) {
		// console.log('EditorComponent.onNavTo', item);
		const viewId = item.viewId;
		const view = ViewService.pathViews.find(x => x.id === viewId);
		if (view) {
			ViewService.action = { viewId, keepOrientation: item.keepOrientation, useLastOrientation: item.useLastOrientation };
		}
	}

	onNavLink(event) {
		// console.log('EditorComponent.onNavLink', event);
		ModalService.open$({ iframe: event.link.href }).pipe(
			first(),
		).subscribe(_ => {
			MessageService.send({
				type: MessageType.NavLinkClose,
				itemId: event.item.id,
			});
		});
	}

	patchState(state) {
		this.state = Object.assign({}, this.state, state);
		this.pushChanges();
		// console.log(this.state);
	}

	tryInAr() {
		ModalService.open$({ template: TryInARModalComponent.chunk(), data: this.view }).pipe(
			first(),
		).subscribe(event => {
			// this.pushChanges();
		});
	}

	onToggleAside() {
		this.aside = !this.aside;
		this.pushChanges();
		window.dispatchEvent(new Event('resize'));
	}

	getSettings() {
		const settings = Object.assign({}, SETTINGS);
		settings.menu = settings.menu.filter(x => environment.flags[x.id]);
		settings.current = settings.menu.length ? settings.menu[0].id : null;
		return settings;
	}

	onToggleSettings() {
		const settings = this.settings;
		settings.active = !settings.active;
		this.pushChanges();
	}

	onSelectSetting(item) {
		this.settings.current = item.id;
		this.pushChanges();
	}

	// editor

	onViewHit(event) {
		// console.log('onViewHit');
		this.viewHit.next(event);
	}

	onViewHitted(callback) {
		if (this.viewHitSubscription) {
			this.viewHitSubscription.unsubscribe();
			this.viewHitSubscription = null;
		}
		if (typeof callback === 'function') {
			this.viewHitSubscription = this.viewHit.pipe(
				first(),
			).subscribe(event => callback(event))
		}
	}

	onDragEnd(event) {
		EditorService.inferItemUpdate$(this.view, event.item).pipe(
			first(),
		).subscribe(response => {
			// console.log('EditorComponent.onDragEnd.inferItemUpdate$.success', response);
			this.pushChanges();
		}, error => console.log('EditorComponent.onDragEnd.inferItemUpdate$.error', error, this.view, event.item, event.item.payload));
	}

	onResizeEnd(event) {
		// console.log('EditorComponent.onResizeEnd');
		/*
		EditorService.inferItemUpdate$(this.view, event.item).pipe(
			first(),
		).subscribe(response => {
			// console.log('EditorComponent.onResizeEnd.inferItemUpdate$.success', response);
			this.pushChanges();
		}, error => console.log('EditorComponent.onResizeEnd.inferItemUpdate$.error', error));
		*/
	}

	onWorldSelect(event) {
		// console.log('EditorComponent.onWorldSelect', this.view);
		if (this.view) {
			let selectedItem;
			this.view.items.forEach(item => item.showPanel = false);
			this.view.items.forEach(item => {
				item.selected = item === event.item;
				selectedItem = item.selected ? item : selectedItem;
			});
			this.view.selected = !selectedItem;
			this.pushChanges();
			if (selectedItem) {
				this.aside = true;
				this.pushChanges();
				window.dispatchEvent(new Event('resize'));
			}
		}
	}

	onOpenModal(modal, data) {
		let template = null;
		switch (modal.type) {
			case 'view':
				switch (modal.value) {
					case ViewType.Panorama.name:
						template = PanoramaModalComponent.chunk();
						break;
					case ViewType.PanoramaGrid.name:
						template = PanoramaGridModalComponent.chunk();
						break;
					case ViewType.Model.name:
						template = ModelModalComponent.chunk();
						break;
					case ViewType.Room3d.name:
						template = Room3DModalComponent.chunk();
						break;
					case ViewType.Media.name:
						template = MediaModalComponent.chunk();
						break;
				}
				break;
			case 'viewItem':
				switch (modal.value) {
					case ViewItemType.Nav.name:
						template = NavModalComponent.chunk();
						break;
					case ViewItemType.Plane.name:
						template = PlaneModalComponent.chunk();
						break;
					case ViewItemType.CurvedPlane.name:
						template = CurvedPlaneModalComponent.chunk();
						break;
					case ViewItemType.Model.name:
						template = ItemModelModalComponent.chunk();
						break;
				}
				break;
		}
		if (!template) {
			return;
		}
		ModalService.open$({ template, data }).pipe(
			first(),
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				// console.log('EditorComponent.onOpenModal.resolve', event);
				switch (modal.type) {
					case 'view':
						switch (modal.value) {
							case ViewType.Panorama.name:
							case ViewType.PanoramaGrid.name:
							case ViewType.Model.name:
							case ViewType.Room3d.name:
							case ViewType.Media.name:
								ViewService.addView(event.data);
								break;
							default:
						}
						break;
					case 'viewItem':
						switch (modal.value) {
							case ViewItemType.Nav.name:
							case ViewItemType.Plane.name:
							case ViewItemType.CurvedPlane.name:
							case ViewItemType.Model.name:
								const item = event.data; // Object.assign({}, event.data);
								const tile = EditorService.getTile(this.view);
								if (tile) {
									const navs = tile.navs || [];
									navs.push(item);
									tile.navs = navs;
									this.view.updateCurrentItems();
								} else {
									item.path = true;
									const items = this.view.items || [];
									items.push(item);
									this.view.items = items;
								}
								this.pushChanges();
								break;
							default:
						}
						break;
					default:
				}
			}
			this.pushChanges();
		});
	}

	onAsideSelect(event) {
		// console.log('onAsideSelect', event);
		if (event.value) {
			switch (event.value) {
				case ViewItemType.Nav.name:
				case ViewItemType.Plane.name:
				case ViewItemType.CurvedPlane.name:
					this.onViewHitted((hit) => {
						this.onOpenModal(event, { view: this.view, hit });
					});
					ToastService.open$({ message: 'Click a point on the view' });
					break;
				case ViewItemType.Model.name:
					if (event.type === 'viewItem') {
						if (this.view.type.name === ViewType.Model.name) {
							return;
						}
						this.onViewHitted((hit) => {
							this.onOpenModal(event, { view: this.view, hit });
						});
						ToastService.open$({ message: 'Click a point on the view' });
					} else {
						this.onOpenModal(event, { view: this.view });
					}
					break;
				default:
					this.onOpenModal(event, { view: this.view });
			}
		} else if (event.view && (event.item || event.item === null)) {
			event.view.selected = false;
			event.view.items.forEach(item => item.selected = item === event.item);
			MessageService.send({
				type: MessageType.SelectItem,
			});
			this.pushChanges();
		} else if (event.view && (event.tile || event.tile === null)) {
			event.view.selected = false;
			event.view.tiles.forEach(tile => tile.selected = tile === event.tile);
			MessageService.send({
				type: MessageType.SelectItem,
			});
			/*
			// if tile selected
			// send ChangeTile message to world component
			this.orbitService.walk(event.position, (headingLongitude, headingLatitude) => {
				const item = this.view.getTile(event.indices.x, event.indices.y);
				if (item) {
					this.panorama.crossfade(item, this.renderer, (envMap, texture, rgbe) => {
						// this.scene.background = envMap;
						this.scene.environment = envMap;
						this.orbitService.walkComplete(headingLongitude, headingLatitude);
						// this.render();
						// this.pushChanges();
					});
				}
			});
			*/
			this.pushChanges();
		} else if (event.view || event.view === null) {
			this.view.selected = (this.view === event.view);
			this.view.items.forEach(item => item.selected = false);
			const currentTile = EditorService.getTile(this.view);
			if (currentTile) {
				this.view.tiles.forEach(tile => tile.selected = tile === currentTile);
			}
			MessageService.send({
				type: MessageType.SelectItem,
			});
			this.pushChanges();
		}
	}

	onAsideUpdate(event) {
		// console.log('onAsideUpdate', event);
		if (event.item && event.view) {
			this.pushChanges();
		} else if (event.tile && event.view) {
			/*
			EditorService.tileUpdate$...
			*/
		} else if (event.view) {
			if (ViewService.viewId !== event.view.id) {
				ViewService.viewId = event.view.id;
			} else {
				const assetDidChange = AssetService.assetDidChange(this.view.asset, event.view.asset);
				Object.assign(this.view, event.view);
				if (assetDidChange) {
					if (typeof this.view.onUpdateAsset === 'function') {
						this.view.onUpdateAsset();
					}
				}
				this.pushChanges();
			}
		}
	}

	onAsideDelete(event) {
		// console.log('onAsideDelete', event);
		if (event.item && event.view) {
			EditorService.inferItemDelete$(event.view, event.item).pipe(
				first(),
			).subscribe(response => {
				// console.log('EditorComponent.onAsideDelete.inferItemDelete$.success', response);
				EditorService.inferItemDeleteResult$(event.view, event.item);
				this.pushChanges();
			}, error => console.log('EditorComponent.onAsideDelete.inferItemDelete$.error', error));
		} else if (event.view) {
			EditorService.viewDelete$(event.view).pipe(
				first(),
			).subscribe(response => {
				// console.log('EditorComponent.onAsideDelete.viewDelete$.success', response);
				ViewService.deleteView(event.view);
			}, error => console.log('EditorComponent.onAsideDelete.viewDelete$.error', error));
		}
	}
}

EditorComponent.meta = {
	selector: '[editor-component]',
	hosts: { host: RouterOutletStructure },
	template: /* html */`
	<div class="page page--editor">
		<div class="ui" [class]="{ open: aside }" *if="dataViews.length">
			<div class="ui__navbar">
				<div class="btn--settings" [class]="{ active: settings.active }" (click)="onToggleSettings($event)" *if="settings.menu.length > 0">
					<svg class="settings" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#settings-full"></use></svg>
				</div>
				<div class="headline" *if="view">
					<div class="headline__id" [innerHTML]="view.id"></div>
					<div class="headline__icon">
						<svg-icon [name]="view.type.name"></svg-icon>
					</div>
					<div class="headline__name" [innerHTML]="view.name"></div>
				</div>
				<div class="group--path" *if="('usePaths' | flag) && path">
					<div class="group--path__select">
						<div class="group--form--select" [dropdown]="'path'">
							<label>Percorso</label>
							<span class="control--custom-select" [innerHTML]="path.name"></span>
							<svg class="icon--caret-down"><use xlink:href="#caret-down"></use></svg>
						</div>
						<div class="dropdown dropdown-item" [dropdown-item]="'path'">
							<div class="category">Percorso</div>
							<ul class="nav--dropdown">
								<li [class]="{ active: isPathSelected(item) }" *for="let item of paths">
									<span [innerHTML]="item.name" (click)="onSelectPath(item)"></span>
									<div class="check">
										<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#check"></use></svg>
									</div>
									<div class="btn--flags" (click)="onEditPath(item)" title="Edit" *if="item.id">
										<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#flags"></use></svg>
									</div>
									<div class="btn--duplicate" (click)="onDuplicatePath(item)" title="Duplicate" *if="item.id">
										<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#duplicate"></use></svg>
									</div>
									<div class="btn--trash" (click)="onDeletePath(item)" title="Delete" *if="item.id">
										<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#trash"></use></svg>
									</div>
								</li>
							</ul>
							<div class="btn--mode" (click)="onAddPath()">Aggiungi un percorso</div>
						</div>
					</div>
				</div>
				<div class="btn--edit" [class]="{ active: aside }" (click)="onToggleAside($event)">
					<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#edit"></use></svg>
				</div>
			</div>
			<div class="ui__body">
				<div class="world" world [view]="view" [views]="pathViews" [editor]="true" (navTo)="onNavTo($event)" (viewHit)="onViewHit($event)" (dragEnd)="onDragEnd($event)" (select)="onWorldSelect($event)"></div>
			</div>
			<!-- footer -->
			<div class="group--footer">
				<div class="group--ar-vr">
					<button type="button" class="btn--ar" [href]="view?.ar" (click)="tryInAr()" *if="view?.ar">
						<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#ar"></use></svg> <span>Try in AR</span>
					</button>
					<button type="button" class="btn--vr" [class]="{ disabled: vrService.isDisabled() }" (click)="vrService.toggleVR()">
						<svg width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#vr"></use></svg> <span [innerHTML]="vrService.getLabel()"></span>
					</button>
				</div>
			</div>
			<div class="ui__settings" *if="settings.active">
				<!-- settings navs -->
				<div class="group--nav">
					<ul class="nav--menu">
						<li class="nav__item" *for="let item of settings.menu" [class]="{ active: settings.current === item.id }" (click)="onSelectSetting(item)"><span class="title" [innerHTML]="item.title | label"></span></li>
					</ul>
				</div>
				<!-- menu -->
				<div class="group--content" menu-builder [views]="dataViews" *if="settings.current === 'menu'"></div>
				<!-- navmaps -->
				<div class="group--content" navmap-builder [views]="dataViews" *if="settings.current === 'navmaps'"></div>
			</div>
		</div>
		<div class="aside" [class]="{ active: aside }" aside [view]="view" (select)="onAsideSelect($event)" (update)="onAsideUpdate($event)" (delete)="onAsideDelete($event)" *if="view && aside"></div>
	</div>
	`
};
