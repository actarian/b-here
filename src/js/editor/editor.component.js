import { Component, getContext } from 'rxcomp';
import { Subject } from 'rxjs';
import { delay, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { RouterService } from '../../../../../../rxcomp-router';
import { AgoraStatus, MessageType, UIMode } from '../agora/agora.types';
import { AssetService } from '../asset/asset.service';
import { environment } from '../environment';
import LocationService from '../location/location.service';
import MessageService from '../message/message.service';
import ModalService, { ModalResolveEvent } from '../modal/modal.service';
import StateService from '../state/state.service';
import StreamService, { StreamServiceMode } from '../stream/stream.service';
import ToastService from '../toast/toast.service';
import { RoleType } from '../user/user';
import { UserService } from '../user/user.service';
import { ViewItemType, ViewType } from '../view/view';
import ViewService from '../view/view.service';
import VRService from '../world/vr.service';
import EditorService from './editor.service';
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
				RouterService.setRouterLink(environment.url.access);
				// window.location.href = environment.url.access;
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
				const pathId = LocationService.has('pathId') ? parseInt(LocationService.get('pathId')) : null;
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
				this.view = view;
				// console.log('viewObserver$', view);
				this.pushChanges();
			}),
		);
	}

	onAddPath() {
		// console.log('EditorComponent.onAddPath');
		ModalService.open$({ src: environment.template.modal.pathAdd }).pipe(
			first(),
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				PathService.addPath(event.data);
			}
		});
	}

	onEditPath(item) {
		// console.log('EditorComponent.onEditPath', item);
		ModalService.open$({ src: environment.template.modal.pathEdit, data: { item: item, views: ViewService.validViews } }).pipe(
			first(),
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				PathService.editPath(event.data);
			}
		});
	}

	onDuplicatePath(item) {
		// console.log('EditorComponent.onDuplicatePath', item);
		ModalService.open$({ src: environment.template.modal.pathAdd, data: { item } }).pipe(
			first(),
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				PathService.addPath(event.data);
			}
		});
	}

	onDeletePath(item) {
		// console.log('EditorComponent.onDeletePath', item);
		ModalService.open$({ src: environment.template.modal.remove, data: { item: item } }).pipe(
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

	onNavLink(item) {
		// console.log('EditorComponent.onNavLink', item);
		ModalService.open$({ iframe: item.link.href }).pipe(
			first(),
		).subscribe(event => {
			MessageService.send({
				type: MessageType.NavLinkClose,
				itemId: item.id,
			});
		});
	}

	patchState(state) {
		this.state = Object.assign({}, this.state, state);
		this.pushChanges();
		// console.log(this.state);
	}

	tryInAr() {
		ModalService.open$({ src: environment.template.modal.tryInAr, data: this.view }).pipe(
			first(),
		).subscribe(event => {
			// this.pushChanges();
		});
	}

	replaceUrl() {
		if ('history' in window) {
			const params = new URLSearchParams(window.location.search);
			const debug = params.get('debug') || null;
			const editor = params.get('editor') || null;
			const role = params.get('role') || null;
			const link = params.get('link') || null;
			const name = params.get('name') || null;
			const url = `${window.location.origin}${window.location.pathname}?link=${link}${name ? `&name=${name}` : ''}${role ? `&role=${role}` : ''}${debug ? `&debug` : ''}${editor ? `&editor` : ''}`;
			// console.log('AgoraNameComponent.url', url);
			window.history.replaceState({ 'pageTitle': window.pageTitle }, '', url);
		}
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
		}, error => console.log('EditorComponent.onDragEnd.inferItemUpdate$.error', error));
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
		ModalService.open$({ src: environment.template.modal[modal.type][modal.value], data }).pipe(
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
								const item = Object.assign({}, event.data);
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
				<div class="world" world [view]="view" [views]="pathViews" [editor]="true" (navTo)="onNavTo($event)" (viewHit)="onViewHit($event)" (dragEnd)="onDragEnd($event)" (select)="onWorldSelect($event)">
					<div class="world__view" *if="view">
						<div class="grid" model-grid *if="view.type.name === 'panorama-grid'" [view]="view" (move)="onGridMove($event)" (nav)="onGridNav($event)"></div>
						<div *if="view.ready">
							<div model-room [view]="view" *if="view.type.name === 'room-3d'"></div>
							<div class="world__item" *for="let item of view.pathItems; let index = index;">
								<div model-nav [item]="item" [view]="view" [editor]="true" (over)="onNavOver($event)" (out)="onNavOut($event)" (down)="onNavDown($event)" *if="item.type.name == 'nav'"></div>
								<div model-plane [item]="item" [view]="view" (zoom)="onZoomMedia($event)" (down)="onObjectDown($event)" *if="item.type.name == 'plane'"></div>
								<div model-curved-plane [item]="item" [view]="view" (zoom)="onZoomMedia($event)" (down)="onObjectDown($event)" *if="item.type.name == 'curved-plane'"></div>
								<div class="model-viewer__item" model-model [item]="item" [view]="view" (down)="onObjectDown($event)" *if="item.type.name == 'model'">
									<!-- <div class="banner loading" model-banner [item]="progress" *if="progress"></div> -->
									<!-- <div class="progress" [innerHTML]="progress.title" *if="progress"></div> -->
								</div>
								<div class="panel" [class]="{ 'panel--lg': item.asset != null }" model-panel [item]="item" (down)="onPanelDown($event)" *if="item.showPanel">
									<div class="panel__title" [innerHTML]="item.title"></div>
									<div class="panel__abstract" [innerHTML]="item.abstract"></div>
									<img class="panel__picture" [src]="item.asset | asset" *if="item.asset">
									<a class="panel__link" [href]="item.link.href" target="_blank" rel="noopener" *if="item.link" [innerHTML]="item.link.title"></a>
								</div>
							</div>
						</div>
						<!--
						<div class="banner loading" model-banner [item]="loading" *if="loading">
							<div class="banner__title" [innerHTML]="item.title"></div>
						</div>
						<div class="banner waiting" model-banner [item]="waiting" *if="waiting">
							<div class="banner__title" [innerHTML]="item.title"></div>
						</div>
						-->
					</div>
					<div class="progress-indicator" model-progress [view]="view">
						<div class="inner"></div>
					</div>
					<div model-menu [views]="views" [editor]="true" (nav)="onMenuNav($event)" (toggle)="onMenuToggle($event)">
						<div class="btn--menu" (mousedown)="onToggle($event)">
							<div class="spinner"></div>
							<svg class="bullets" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#menu"></use></svg>
							<svg class="progress" width="50" height="50" viewBox="0 0 50 50">
								<circle id="circle" r="23" cx="25" cy="25" fill="transparent"></circle>
							</svg>
						</div>
					</div>
					<div model-debug *if="debugging"></div>
					<div class="world__info" *if="error" [innerHTML]="error"></div>
				</div>
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
				<div class="group--content" menu-builder [views]="dataViews" *if="settings.current === 'menu'">
					<div class="group--head">
						<div class="title" [innerHTML]="'editor_menu' | label"></div>
					</div>
					<div class="group--main">
						<div class="nav--tree" *if="form">
							<form class="form" [formGroup]="form" (submit)="isValid() && onSubmit()" name="form" role="form" novalidate autocomplete="off">
								<div class="abstract" *if="controls.items.controls.length == 0" [innerHTML]="'editor_add_item' | label"></div>
								<div *for="let control of controls.items.controls">
									<div control-menu [control]="control" (remove)="onRemoveControl($event)" (link)="onLinkControl($event)" (up)="onUpControl($event)" (down)="onDownControl($event)"></div>
								</div>
							</form>
						</div>
					</div>
					<div class="group--foot">
						<button type="button" class="btn--mode" (click)="onAddItem($event)" [innerHTML]="'editor_add' | label"></button>
						<button type="button" class="btn--mode" (click)="isValid() && onSubmit()" *if="changes > 1" [innerHTML]="'editor_save' | label"></button>
					</div>
				</div>
				<!-- navmaps -->
				<div class="group--content" navmap-builder [views]="dataViews" *if="settings.current === 'navmaps'">
					<div class="group--head">
						<div class="title" [innerHTML]="'editor_navmaps' | label"></div>
					</div>
					<div class="group--main">
						<!-- listing navmaps -->
						<div class="listing--navmaps" *if="!navmap">
							<div class="abstract" *if="navmaps.length == 0" [innerHTML]="'editor_add_item' | label"></div>
							<div class="listing__item" *for="let item of navmaps">
								<div class="card--navmap" (click)="onSet(item)">
									<div class="card__picture">
										<img [src]="item.asset | asset" *if="item.asset" />
									</div>
									<div class="card__content">
										<div class="card__name" [innerHTML]="item.name"></div>
									</div>
								</div>
							</div>
						</div>
						<!-- navmap edit -->
						<div class="navmap" navmap-edit [navmap]="navmap" (delete)="onDelete($event)" *if="navmap">
							<form class="form" [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off">
								<div class="title"><span [innerHTML]="navmap.name"></span> <span [innerHTML]="navmap.id"></span></div>
								<div class="form-controls">
									<div control-text [control]="controls.name" label="Name"></div>
									<!--
									<div control-asset [control]="controls.asset" label="Image" accept="image/png"></div>
									-->
								</div>
								<div class="group--cta">
									<button type="submit" class="btn--accept">
										<span [innerHTML]="'editor_save' | label"></span>
									</button>
									<button type="button" class="btn--remove" (click)="onRemove($event)">
										<span [innerHTML]="'editor_remove' | label"></span>
									</button>
								</div>
								<div class="navmap-control" [class]="mode">
									<div class="navmap-control__image">
										<img draggable="false" [src]="navmap.asset | asset" *if="navmap.asset" />
										<div class="navmap__item" [style]="{ left: item.position[0] * 100 + '%', top: item.position[1] * 100 + '%' }" (mousedown)="onMoveItem($event, item)" (click)="onRemoveItem(item)" *for="let item of navmap.items">
											<img draggable="false" [src]="'textures/ui/nav-point.png' | asset" />
											<div class="title" [innerHTML]="item.title"></div>
										</div>
									</div>
									<ul class="navmap-control__toolbar">
										<li class="nav__item"><span [class]="{ active: mode === 'insert' }" (click)="onToggleMode('insert')"><svg class="pencil" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#pencil"></use></svg></span></li>
										<li class="nav__item"><span [class]="{ active: mode === 'move' }" (click)="onToggleMode('move')"><svg class="move" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#move"></use></svg></span></li>
										<li class="nav__item"><span [class]="{ active: mode === 'remove' }" (click)="onToggleMode('remove')"><svg class="erase" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#erase"></use></svg></span></li>
									</ul>
								</div>
							</form>
						</div>
					</div>
					<div class="group--foot">
						<button type="button" class="btn--mode" (click)="onAdd($event)" [innerHTML]="'editor_add' | label" *if="!navmap"></button>
						<button type="button" class="btn--mode" (click)="onBack($event)" [innerHTML]="'editor_back' | label" *if="navmap"></button>
					</div>
				</div>
			</div>
		</div>
		<div class="aside" [class]="{ active: aside }" aside [view]="view" (select)="onAsideSelect($event)" (update)="onAsideUpdate($event)" (delete)="onAsideDelete($event)" *if="view && aside">
			<div class="headline">
				<ul class="nav--tab">
					<li [class]="{ active: mode === 1 }" (click)="setMode(1)" [innerHTML]="'editor_properties' | label"></li>
					<li [class]="{ active: mode === 2 }" (click)="setMode(2)" [innerHTML]="'editor_views' | label"></li>
					<li [class]="{ active: mode === 3 }" (click)="setMode(3)" [innerHTML]="'editor_view_items' | label"></li>
				</ul>
				<!--
				<div class="btn--mode" [class]="{ active: mode === 1 }" (click)="setMode(1)" [innerHTML]="'editor_properties' | label"></div>
				<div class="btn--mode" [class]="{ active: mode === 2 }" (click)="setMode(2)" [innerHTML]="'editor_views' | label"></div>
				<div class="btn--mode" [class]="{ active: mode === 3 }" (click)="setMode(3)" [innerHTML]="'editor_view_items' | label"></div>
				-->
			</div>
			<div class="scrollable">
				<ul class="nav--editor" *if="mode === 1">
					<li>
						<div class="title" [innerHTML]="'editor_properties' | label"></div>
						<update-view [view]="view" (select)="onSelect($event)" (update)="onUpdate($event)" (delete)="onDelete($event)"></update-view>
					</li>
					<li *if="view.type.name != 'panorama-grid'">
						<div class="title" [innerHTML]="'editor_items' | label"></div>
						<update-view-item [view]="view" [item]="item" (select)="onSelect($event)" (update)="onUpdate($event)" (delete)="onDelete($event)" *for="let item of view.pathItems"></update-view-item>
						<div class="abstract" *if="view.pathItems.length == 0" [innerHTML]="'editor_no_items' | label"></div>
						<div class="btn--mode" (click)="setMode(3)" [innerHTML]="'editor_add_item' | label"></div>
					</li>
					<li *if="view.type.name == 'panorama-grid'">
						<div class="title" [innerHTML]="'editor_tiles' | label"></div>
						<div *for="let tile of view.tiles">
							<div *if="tile.selected">
								<update-view-tile [view]="view" [tile]="tile" (update)="onUpdate($event)" (delete)="onDelete($event)"></update-view-tile>
								<ul class="nav--editor">
									<li>
										<update-view-item [view]="view" [item]="item" (select)="onSelect($event)" (update)="onUpdate($event)" (delete)="onDelete($event)" *for="let item of tile.navs"></update-view-item>
										<div class="abstract" *if="tile.navs.length == 0" [innerHTML]="'editor_no_navs' | label"></div>
										<div class="btn--mode" (click)="onSelect({ type:'viewItem', value: 'nav', tile: tile })" [innerHTML]="'editor_add_nav' | label"></div>
									</li>
									<!--
									<li>
										<div class="btn" (click)="onSelect({ type:'viewItem', value: 'nav', tile: tile })">
											<div class="icon">
												<svg-icon name="nav"></svg-icon>
											</div>
											<div class="title" [innerHTML]="'editor_add_nav' | label"></div>
										</div>
									</li>
									-->
								</ul>
							</div>
						</div>
						<div class="abstract" *if="view.tiles.length == 0" [innerHTML]="'editor_no_tiles' | label"></div>
						<!-- <div class="btn--mode" (click)="setMode(3)">Add Tile</div> -->
					</li>
					<!--
					<li *if="false">
						<div class="title">Icons</div>
						<ul class="nav--editor">
							<li>
								<div class="btn" (click)="onSelect('animated-tabs')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.3"></path><path d="M 2 8.4 L 12 8.4 L 12 2 L 6 2 C 3.791 2 2 3.791 2 6 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 12 8.4 L 22 8.4 L 22 6 C 22 3.791 20.209 2 18 2 L 12 2 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Animated Tabs</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('card-list')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.3"></path><path d="M 6.8 13.6 C 6.8 13.158 7.158 12.8 7.6 12.8 L 16.8 12.8 C 17.242 12.8 17.6 13.158 17.6 13.6 L 17.6 16.8 C 17.6 17.242 17.242 17.6 16.8 17.6 L 7.6 17.6 C 7.158 17.6 6.8 17.242 6.8 16.8 Z" fill="var(--svg-icon-tint)"></path><path d="M 6.8 7.2 C 6.8 6.758 7.158 6.4 7.6 6.4 L 16.8 6.4 C 17.242 6.4 17.6 6.758 17.6 7.2 L 17.6 10.4 C 17.6 10.842 17.242 11.2 16.8 11.2 L 7.6 11.2 C 7.158 11.2 6.8 10.842 6.8 10.4 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Card List</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('container-transitions')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 15.667 13 C 17.139 13 18.333 14.194 18.333 15.667 C 18.333 17.139 17.139 18.333 15.667 18.333 C 14.194 18.333 13 17.139 13 15.667 C 13 14.194 14.194 13 15.667 13 Z" fill="var(--svg-icon-tint)"></path></svg></svg></div>
									<div class="title">Container Transitions</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('dynamic-grid')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.3"></path><g transform="translate(6.6 6.6)"><path d="M 6.048 0.8 C 6.048 0.358 6.406 0 6.848 0 L 10 0 C 10.442 0 10.8 0.358 10.8 0.8 L 10.8 3.952 C 10.8 4.394 10.442 4.752 10 4.752 L 6.848 4.752 C 6.406 4.752 6.048 4.394 6.048 3.952 Z" fill="var(--svg-icon-tint)" opacity="0.5"></path><path d="M 6.048 6.848 C 6.048 6.406 6.406 6.048 6.848 6.048 L 10 6.048 C 10.442 6.048 10.8 6.406 10.8 6.848 L 10.8 10 C 10.8 10.442 10.442 10.8 10 10.8 L 6.848 10.8 C 6.406 10.8 6.048 10.442 6.048 10 Z" fill="var(--svg-icon-tint)"></path><path d="M 0 0.8 C 0 0.358 0.358 0 0.8 0 L 3.952 0 C 4.394 0 4.752 0.358 4.752 0.8 L 4.752 3.952 C 4.752 4.394 4.394 4.752 3.952 4.752 L 0.8 4.752 C 0.358 4.752 0 4.394 0 3.952 Z" fill="var(--svg-icon-tint)"></path><path d="M 0 6.848 C 0 6.406 0.358 6.048 0.8 6.048 L 3.952 6.048 C 4.394 6.048 4.752 6.406 4.752 6.848 L 4.752 10 C 4.752 10.442 4.394 10.8 3.952 10.8 L 0.8 10.8 C 0.358 10.8 0 10.442 0 10 Z" fill="var(--svg-icon-tint)" opacity="0.5"></path></g></svg></div>
									<div class="title">Dynamic Grid</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('expand-on-tap')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 0 0 L 7.833 0" transform="translate(8.583 11.583) rotate(270 3.917 0.5)" fill="transparent" stroke-width="1.67" stroke="var(--svg-icon-tint)" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 14.667 9.333 L 12 6.667 L 9.333 9.333" stroke="var(--svg-icon-tint)" fill="transparent" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 14.667 14.667 L 12 17.333 L 9.333 14.667" stroke="var(--svg-icon-tint)" fill="transparent" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"></path> </svg></div>
									<div class="title">Expand on Tap</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('image-gallery-2')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 7.333 8.333 C 7.333 7.781 7.781 7.333 8.333 7.333 L 10.333 7.333 C 10.886 7.333 11.333 7.781 11.333 8.333 L 11.333 10.333 C 11.333 10.886 10.886 11.333 10.333 11.333 L 8.333 11.333 C 7.781 11.333 7.333 10.886 7.333 10.333 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 12.333 8.333 C 12.333 7.781 12.781 7.333 13.333 7.333 L 15.333 7.333 C 15.886 7.333 16.333 7.781 16.333 8.333 L 16.333 10.333 C 16.333 10.886 15.886 11.333 15.333 11.333 L 13.333 11.333 C 12.781 11.333 12.333 10.886 12.333 10.333 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 7.333 13.667 C 7.333 13.114 7.781 12.667 8.333 12.667 L 15.333 12.667 C 15.886 12.667 16.333 13.114 16.333 13.667 L 16.333 15.667 C 16.333 16.219 15.886 16.667 15.333 16.667 L 8.333 16.667 C 7.781 16.667 7.333 16.219 7.333 15.667 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Image Gallery 2</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('stories-ui')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.3"></path><path d="M 6.8 4.8 C 7.905 4.8 8.8 5.695 8.8 6.8 C 8.8 7.905 7.905 8.8 6.8 8.8 C 5.695 8.8 4.8 7.905 4.8 6.8 C 4.8 5.695 5.695 4.8 6.8 4.8 Z" fill="var(--svg-icon-tint)"></path><path d="M 12 4.8 C 13.105 4.8 14 5.695 14 6.8 C 14 7.905 13.105 8.8 12 8.8 C 10.895 8.8 10 7.905 10 6.8 C 10 5.695 10.895 4.8 12 4.8 Z" fill="var(--svg-icon-tint)"></path><path d="M 17.2 4.8 C 18.305 4.8 19.2 5.695 19.2 6.8 C 19.2 7.905 18.305 8.8 17.2 8.8 C 16.095 8.8 15.2 7.905 15.2 6.8 C 15.2 5.695 16.095 4.8 17.2 4.8 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Stories UI</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('todo-list')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 8 12.333 L 10.5 14.833 L 16 9.333" stroke="var(--svg-icon-tint)" fill="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
									<div class="title">To-Do List</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('toggle-menu')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 17.333 15.333 C 18.438 15.333 19.333 16.229 19.333 17.333 C 19.333 18.438 18.438 19.333 17.333 19.333 C 16.229 19.333 15.333 18.438 15.333 17.333 C 15.333 16.229 16.229 15.333 17.333 15.333 Z" fill="var(--svg-icon-tint)"></path><path d="M 17.333 10 C 18.438 10 19.333 10.895 19.333 12 C 19.333 13.105 18.438 14 17.333 14 C 16.229 14 15.333 13.105 15.333 12 C 15.333 10.895 16.229 10 17.333 10 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 17.333 4.667 C 18.438 4.667 19.333 5.562 19.333 6.667 C 19.333 7.771 18.438 8.667 17.333 8.667 C 16.229 8.667 15.333 7.771 15.333 6.667 C 15.333 5.562 16.229 4.667 17.333 4.667 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path></svg></div>
									<div class="title">Toggle Menu</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('bottom-sheet')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 10.333 C 22 10.886 21.552 11.333 21 11.333 L 3 11.333 C 2.448 11.333 2 10.886 2 10.333 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 2 13.333 C 2 12.781 2.448 12.333 3 12.333 L 21 12.333 C 21.552 12.333 22 12.781 22 13.333 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Bottom Sheet</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('draggable-sheet')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 2 14 C 2 12.895 2.895 12 4 12 L 20 12 C 21.105 12 22 12.895 22 14 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z M 10.667 15.333 L 13.333 15.333 C 13.702 15.333 14 15.035 14 14.667 C 14 14.298 13.702 14 13.333 14 L 10.667 14 C 10.298 14 10 14.298 10 14.667 C 10 15.035 10.298 15.333 10.667 15.333 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Draggable Sheet</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('modal-box')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 7.333 9.333 C 7.333 8.229 8.229 7.333 9.333 7.333 L 14.667 7.333 C 15.771 7.333 16.667 8.229 16.667 9.333 L 16.667 14.667 C 16.667 15.771 15.771 16.667 14.667 16.667 L 9.333 16.667 C 8.229 16.667 7.333 15.771 7.333 14.667 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Modal Box</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('side-menu')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 11 2 C 11.552 2 12 2.448 12 3 L 12 21 C 12 21.552 11.552 22 11 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Side Menu</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('input-form')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 7.333 8.333 C 7.333 7.781 7.781 7.333 8.333 7.333 L 11.667 7.333 C 11.667 7.333 11.667 7.333 11.667 7.333 L 15.667 7.333 C 16.219 7.333 16.667 7.781 16.667 8.333 L 16.667 9 C 16.667 9.552 16.219 10 15.667 10 L 13.333 10 L 13.333 15.667 C 13.333 16.219 12.886 16.667 12.333 16.667 L 11.667 16.667 C 11.114 16.667 10.667 16.219 10.667 15.667 L 10.667 10 L 8.333 10 C 7.781 10 7.333 9.552 7.333 9 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Input Form</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('loading-indicator')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.3"></path><path d="M 16.4 10.4 C 17.284 10.4 18 11.116 18 12 C 18 12.884 17.284 13.6 16.4 13.6 C 15.516 13.6 14.8 12.884 14.8 12 C 14.8 11.116 15.516 10.4 16.4 10.4 Z" fill="var(--svg-icon-tint)"></path><path d="M 12 10.4 C 12.884 10.4 13.6 11.116 13.6 12 C 13.6 12.884 12.884 13.6 12 13.6 C 11.116 13.6 10.4 12.884 10.4 12 C 10.4 11.116 11.116 10.4 12 10.4 Z" fill="var(--svg-icon-tint)"></path><path d="M 7.6 10.4 C 8.484 10.4 9.2 11.116 9.2 12 C 9.2 12.884 8.484 13.6 7.6 13.6 C 6.716 13.6 6 12.884 6 12 C 6 11.116 6.716 10.4 7.6 10.4 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Loading Indicator</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('radio-button-form')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 9.833 8.167 L 14.167 8.167 C 16.284 8.167 18 9.883 18 12 C 18 14.117 16.284 15.833 14.167 15.833 L 9.833 15.833 C 7.716 15.833 6 14.117 6 12 C 6 9.883 7.716 8.167 9.833 8.167 Z M 11.333 12 C 11.333 13.473 12.527 14.667 14 14.667 C 15.473 14.667 16.667 13.473 16.667 12 C 16.667 10.527 15.473 9.333 14 9.333 C 12.527 9.333 11.333 10.527 11.333 12 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Radio Button Form</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('checkbox-form')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 8.651 6.931 C 7.911 6.738 7.238 7.411 7.431 8.151 L 9.363 15.558 C 9.592 16.435 10.775 16.58 11.208 15.784 L 13 12.5 L 16.284 10.708 C 17.08 10.275 16.935 9.092 16.058 8.863 Z" fill="var(--svg-icon-tint)"></path><path d="M 16 15.5 L 11 10.5" fill="transparent" stroke-width="1.67" stroke="var(--svg-icon-tint)" stroke-linecap="round"></path></svg></div>
									<div class="title">Checkbox Form</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('splash-screen')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 7.757 13.414 C 6.976 12.633 6.976 11.367 7.757 10.586 L 10.586 7.757 C 11.367 6.976 12.633 6.976 13.414 7.757 L 16.243 10.586 C 17.024 11.367 17.024 12.633 16.243 13.414 L 13.414 16.243 C 12.633 17.024 11.367 17.024 10.586 16.243 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Splash Screen</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('timeout-transition')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 1 5.8 C 1 3.149 3.149 1 5.8 1 L 18.2 1 C 20.851 1 23 3.149 23 5.8 L 23 18.2 C 23 20.851 20.851 23 18.2 23 L 5.8 23 C 3.149 23 1 20.851 1 18.2 Z" fill="var(--svg-icon-tint)" opacity="0.3"></path><path d="M 12 6.72 C 14.916 6.72 17.28 9.084 17.28 12 C 17.28 14.916 14.916 17.28 12 17.28 C 9.084 17.28 6.72 14.916 6.72 12 C 6.72 9.084 9.084 6.72 12 6.72 Z M 11.34 12 C 11.34 12.365 11.635 12.66 12 12.66 L 14.2 12.66 C 14.565 12.66 14.86 12.365 14.86 12 C 14.86 11.635 14.565 11.34 14.2 11.34 L 12.66 11.34 L 12.66 9.8 C 12.66 9.435 12.365 9.14 12 9.14 C 11.635 9.14 11.34 9.435 11.34 9.8 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Timeout Transition</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('accordion-menu')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 16 10.667 L 12 14.667 L 8 10.667" fill="transparent" stroke-width="2" stroke="var(--svg-icon-tint)" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
									<div class="title">Accordion Menu</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('drop-on-scroll')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 0 0 L 8 0" transform="translate(8.5 11.5) rotate(270 4 0.5)" fill="transparent" stroke-width="1.67" stroke="var(--svg-icon-tint)" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 15.333 11.333 L 12 8 L 8.667 11.333" fill="transparent" stroke-width="1.67" stroke="var(--svg-icon-tint)" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
									<div class="title">Drop on Scroll</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('nested-scroll')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 1.82 6 C 1.82 3.791 3.61 2 5.82 2 L 17.82 2 C 20.029 2 21.82 3.791 21.82 6 L 21.82 7 C 21.82 7.552 21.372 8 20.82 8 L 2.82 8 C 2.267 8 1.82 7.552 1.82 7 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 1.82 17 C 1.82 16.448 2.267 16 2.82 16 L 20.82 16 C 21.372 16 21.82 16.448 21.82 17 L 21.82 18 C 21.82 20.209 20.029 22 17.82 22 L 5.82 22 C 3.61 22 1.82 20.209 1.82 18 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 8.82 10 C 8.82 9.448 9.267 9 9.82 9 L 20.82 9 C 21.372 9 21.82 9.448 21.82 10 L 21.82 14 C 21.82 14.552 21.372 15 20.82 15 L 9.82 15 C 9.267 15 8.82 14.552 8.82 14 Z" fill="var(--svg-icon-tint)"></path><path d="M 1.82 10 C 1.82 9.448 2.267 9 2.82 9 L 6.82 9 C 7.372 9 7.82 9.448 7.82 10 L 7.82 14 C 7.82 14.552 7.372 15 6.82 15 L 2.82 15 C 2.267 15 1.82 14.552 1.82 14 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Nested Scroll</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('star-rating')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 11.399 6.884 C 11.645 6.386 12.355 6.386 12.601 6.884 L 13.705 9.122 C 13.803 9.32 13.992 9.457 14.21 9.489 L 16.68 9.848 C 17.229 9.928 17.449 10.603 17.051 10.99 L 15.264 12.733 C 15.106 12.887 15.034 13.108 15.071 13.326 L 15.493 15.786 C 15.587 16.333 15.013 16.75 14.521 16.492 L 12.312 15.331 C 12.117 15.228 11.883 15.228 11.688 15.331 L 9.479 16.492 C 8.987 16.75 8.413 16.333 8.507 15.786 L 8.929 13.326 C 8.966 13.108 8.894 12.887 8.736 12.733 L 6.949 10.99 C 6.551 10.603 6.771 9.928 7.32 9.848 L 9.79 9.489 C 10.008 9.457 10.197 9.32 10.295 9.122 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Star Rating</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('swipe-menu')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 17.33 C 2 16.595 2.595 16 3.33 16 L 21 16 C 21.552 16 22 16.448 22 17 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 2 10 C 2 9.448 2.448 9 3 9 L 14 9 C 14.552 9 15 9.448 15 10 L 15 14 C 15 14.552 14.552 15 14 15 L 3 15 C 2.448 15 2 14.552 2 14 Z M 19 9 C 20.657 9 22 10.343 22 12 C 22 13.657 20.657 15 19 15 C 17.343 15 16 13.657 16 12 C 16 10.343 17.343 9 19 9 Z" fill="var(--svg-icon-tint)"></path><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 7 C 22 7.552 21.552 8 21 8 L 3 8 C 2.448 8 2 7.552 2 7 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path></svg></div>
									<div class="title">Swipe Menu</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('switch-sheet')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 15.667 13.333 C 17.139 13.333 18.333 14.527 18.333 16 C 18.333 17.473 17.139 18.667 15.667 18.667 C 14.194 18.667 13 17.473 13 16 C 13 14.527 14.194 13.333 15.667 13.333 Z" fill="var(--svg-icon-tint)"></path><path d="M 8.333 13.333 C 9.806 13.333 11 14.527 11 16 C 11 17.473 9.806 18.667 8.333 18.667 C 6.861 18.667 5.667 17.473 5.667 16 C 5.667 14.527 6.861 13.333 8.333 13.333 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path></svg></div>
									<div class="title">Switch Sheet</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('tab-menu')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 10 15.333 L 14 15.333 L 14 18.667 L 10 18.667 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 5.333 16.333 C 5.333 15.781 5.781 15.333 6.333 15.333 L 9.333 15.333 L 9.333 18.667 L 6.333 18.667 C 5.781 18.667 5.333 18.219 5.333 17.667 Z" fill="var(--svg-icon-tint)"></path><path d="M 18.667 16.333 C 18.667 15.781 18.219 15.333 17.667 15.333 L 14.667 15.333 L 14.667 18.667 L 17.667 18.667 C 18.219 18.667 18.667 18.219 18.667 17.667 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path></svg></div>
									<div class="title">Tab Menu</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('wheel-picker')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 3.667 6 C 3.667 3.791 5.458 2 7.667 2 L 16.333 2 C 18.542 2 20.333 3.791 20.333 6 L 20.333 7 C 20.333 7.552 19.886 8 19.333 8 L 4.667 8 C 4.114 8 3.667 7.552 3.667 7 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 2 11 C 2 9.895 2.895 9 4 9 L 20 9 C 21.105 9 22 9.895 22 11 L 22 13 C 22 14.105 21.105 15 20 15 L 4 15 C 2.895 15 2 14.105 2 13 Z" fill="var(--svg-icon-tint)"></path><path d="M 3.667 17 C 3.667 16.448 4.114 16 4.667 16 L 19.333 16 C 19.886 16 20.333 16.448 20.333 17 L 20.333 18 C 20.333 20.209 18.542 22 16.333 22 L 7.667 22 C 5.458 22 3.667 20.209 3.667 18 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path></svg></div>
									<div class="title">Wheel Picker</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('cover-flow')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 11.333 17.962 C 11.333 18.385 11.068 18.762 10.67 18.904 L 4.673 21.045 C 3.37 21.511 2 20.545 2 19.162 L 2 4.838 C 2 3.455 3.37 2.489 4.673 2.955 L 10.67 5.096 C 11.068 5.238 11.333 5.615 11.333 6.038 Z" fill="var(--svg-icon-tint)"></path><path d="M 22 4.838 C 22 3.455 20.63 2.489 19.327 2.955 L 13.33 5.096 C 12.932 5.238 12.667 5.615 12.667 6.038 L 12.667 17.962 C 12.667 18.385 12.932 18.762 13.33 18.904 L 19.327 21.045 C 20.63 21.511 22 20.545 22 19.162 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path></svg></div>
									<div class="title">Cover Flow</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('cube-effect')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6.743 C 2 5.898 2.531 5.144 3.327 4.859 L 9.997 2.477 C 10.648 2.245 11.333 2.727 11.333 3.419 L 11.333 20.581 C 11.333 21.273 10.648 21.755 9.997 21.523 L 3.327 19.141 C 2.531 18.856 2 18.102 2 17.257 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 12.667 3.419 C 12.667 2.727 13.352 2.245 14.003 2.477 L 20.673 4.859 C 21.469 5.144 22 5.898 22 6.743 L 22 17.257 C 22 18.102 21.469 18.856 20.673 19.141 L 14.003 21.523 C 13.352 21.755 12.667 21.273 12.667 20.581 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Cube Effect</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('flip-effect')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 11.333 4.667 C 11.333 4.114 10.886 3.667 10.333 3.667 L 4 3.667 C 2.895 3.667 2 4.562 2 5.667 L 2 18.333 C 2 19.438 2.895 20.333 4 20.333 L 10.333 20.333 C 10.886 20.333 11.333 19.886 11.333 19.333 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 20 4.167 C 20 3.891 20.224 3.667 20.5 3.667 L 20.5 3.667 C 21.328 3.667 22 4.338 22 5.167 L 22 18.833 C 22 19.662 21.328 20.333 20.5 20.333 L 20.5 20.333 C 20.224 20.333 20 20.109 20 19.833 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 18.667 4.631 C 18.667 3.309 17.406 2.35 16.131 2.704 L 13.399 3.463 C 12.966 3.583 12.667 3.978 12.667 4.427 L 12.667 19.573 C 12.667 20.022 12.966 20.417 13.399 20.537 L 16.131 21.296 C 17.406 21.65 18.667 20.691 18.667 19.369 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Flip Effect</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('parallax-scroll')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 12 6.667 C 12 5.562 12.895 4.667 14 4.667 L 17.333 4.667 C 18.438 4.667 19.333 5.562 19.333 6.667 L 19.333 10 C 19.333 11.105 18.438 12 17.333 12 L 14 12 C 12.895 12 12 11.105 12 10 Z" fill="var(--svg-icon-tint)"></path><path d="M 4.667 14 C 4.667 12.895 5.562 12 6.667 12 L 10 12 C 11.105 12 12 12.895 12 14 L 12 17.333 C 12 18.438 11.105 19.333 10 19.333 L 6.667 19.333 C 5.562 19.333 4.667 18.438 4.667 17.333 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Parallax Scroll</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('pile-effect')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 6.5 4 C 6.224 4 6 3.776 6 3.5 L 6 3.5 C 6 2.672 6.672 2 7.5 2 L 16.5 2 C 17.328 2 18 2.672 18 3.5 L 18 3.5 C 18 3.776 17.776 4 17.5 4 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 4.5 7 C 4.224 7 4 6.776 4 6.5 L 4 6.5 C 4 5.672 4.672 5 5.5 5 L 18.5 5 C 19.328 5 20 5.672 20 6.5 L 20 6.5 C 20 6.776 19.776 7 19.5 7 Z" fill="var(--svg-icon-tint)" opacity="0.7"></path><path d="M 0 2.67 C 0 1.195 1.195 0 2.67 0 L 11.33 0 C 12.805 0 14 1.195 14 2.67 L 14 17.33 C 14 18.805 12.805 20 11.33 20 L 2.67 20 C 1.195 20 0 18.805 0 17.33 Z" transform="translate(5 5) rotate(-90 7 10)" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Pile Effect</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('shuffle')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 15.174 10.452 L 16.708 9.06 L 15.174 7.667" fill="transparent" stroke-width="1.33" stroke="var(--svg-icon-tint)" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 15.174 16.333 L 16.708 14.94 L 15.174 13.548" fill="transparent" stroke-width="1.33" stroke="var(--svg-icon-tint)" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 16.145 9.06 C 16.145 9.06 13.982 8.542 12.617 9.679 C 11.252 10.815 11.829 12.213 10.776 13.548 C 9.724 14.882 7.708 14.94 7.708 14.94" fill="transparent" stroke-width="1.33" stroke="var(--svg-icon-tint)" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 16.145 14.823 C 16.145 14.823 13.982 15.34 12.617 14.204 C 11.252 13.068 11.829 11.669 10.776 10.335 C 9.724 9.001 7.708 8.942 7.708 8.942" fill="transparent" stroke-width="1.33" stroke="var(--svg-icon-tint)" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
									<div class="title">Shuffle</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('svg-animation')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 8 12.333 L 10.5 14.833 L 16 9.333" stroke="var(--svg-icon-tint)" fill="transparent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
									<div class="title">SVG Animation</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('google-sheets')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 7 8.667 C 7 8.206 7.373 7.833 7.833 7.833 L 7.833 7.833 C 8.294 7.833 8.667 8.206 8.667 8.667 L 8.667 8.667 C 8.667 9.127 8.294 9.5 7.833 9.5 L 7.833 9.5 C 7.373 9.5 7 9.127 7 8.667 Z" fill="var(--svg-icon-tint)"></path><path d="M 7 12 C 7 11.54 7.373 11.167 7.833 11.167 L 7.833 11.167 C 8.294 11.167 8.667 11.54 8.667 12 L 8.667 12 C 8.667 12.46 8.294 12.833 7.833 12.833 L 7.833 12.833 C 7.373 12.833 7 12.46 7 12 Z" fill="var(--svg-icon-tint)"></path><path d="M 7 15.333 C 7 14.873 7.373 14.5 7.833 14.5 L 7.833 14.5 C 8.294 14.5 8.667 14.873 8.667 15.333 L 8.667 15.333 C 8.667 15.794 8.294 16.167 7.833 16.167 L 7.833 16.167 C 7.373 16.167 7 15.794 7 15.333 Z" fill="var(--svg-icon-tint)"></path><path d="M 9.778 8.667 C 9.778 8.206 10.151 7.833 10.611 7.833 L 16.167 7.833 C 16.627 7.833 17 8.206 17 8.667 L 17 8.667 C 17 9.127 16.627 9.5 16.167 9.5 L 10.611 9.5 C 10.151 9.5 9.778 9.127 9.778 8.667 Z" fill="var(--svg-icon-tint)"></path><path d="M 9.778 12 C 9.778 11.54 10.151 11.167 10.611 11.167 L 16.167 11.167 C 16.627 11.167 17 11.54 17 12 L 17 12 C 17 12.46 16.627 12.833 16.167 12.833 L 10.611 12.833 C 10.151 12.833 9.778 12.46 9.778 12 Z" fill="var(--svg-icon-tint)"></path><path d="M 9.778 15.333 C 9.778 14.873 10.151 14.5 10.611 14.5 L 16.167 14.5 C 16.627 14.5 17 14.873 17 15.333 L 17 15.333 C 17 15.794 16.627 16.167 16.167 16.167 L 10.611 16.167 C 10.151 16.167 9.778 15.794 9.778 15.333 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Google Sheets</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('map')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 1.82 6 C 1.82 3.791 3.61 2 5.82 2 L 17.82 2 C 20.029 2 21.82 3.791 21.82 6 L 21.82 18 C 21.82 20.209 20.029 22 17.82 22 L 5.82 22 C 3.61 22 1.82 20.209 1.82 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 11.82 6.504 C 14.029 6.504 15.82 8.282 15.82 10.476 C 15.82 10.698 15.801 10.915 15.766 11.127 C 15.359 14.488 13.033 16.581 12.155 17.261 C 12.051 17.341 11.976 17.437 11.82 17.437 C 11.663 17.437 11.586 17.34 11.481 17.258 C 10.6 16.576 8.28 14.483 7.873 11.127 C 7.838 10.915 7.82 10.698 7.82 10.476 C 7.82 8.282 9.61 6.504 11.82 6.504 Z M 9.486 10.644 C 9.486 11.933 10.531 12.977 11.82 12.977 C 13.108 12.977 14.153 11.933 14.153 10.644 C 14.153 9.355 13.108 8.311 11.82 8.311 C 10.531 8.311 9.486 9.355 9.486 10.644 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Map</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('signature-pad')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 8.82 13.068 C 8.56 12.807 8.56 12.385 8.82 12.125 L 13.733 7.212 C 13.993 6.952 14.415 6.952 14.676 7.212 L 16.788 9.324 C 17.048 9.585 17.048 10.007 16.788 10.267 L 11.875 15.18 C 11.615 15.44 11.193 15.44 10.932 15.18 Z" fill="var(--svg-icon-tint)"></path><path d="M 3.096 0.303 C 3.318 0.17 3.6 0.33 3.6 0.589 L 3.6 3.732 C 3.6 3.991 3.318 4.151 3.096 4.018 L 0.953 2.732 C 0.521 2.473 0.521 1.848 0.953 1.589 Z" transform="translate(6.24 13.8) rotate(-45 1.8 2.16)" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Signature Pad</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('sound-effects')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 14.225 10.793 C 14.471 11.102 14.623 11.529 14.623 12 C 14.623 12.471 14.471 12.898 14.225 13.207" fill="transparent" stroke-width="1.33" stroke="var(--svg-icon-tint)" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 16.224 9.185 C 16.96 9.911 17.417 10.905 17.417 12 C 17.417 13.095 16.96 14.09 16.224 14.816" fill="transparent" stroke-width="1.33" stroke="var(--svg-icon-tint)" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 6.083 10.656 C 6.083 10.288 6.382 9.989 6.75 9.989 L 7.674 9.989 L 11.021 7.835 C 11.464 7.549 12.048 7.868 12.048 8.396 L 12.048 15.604 C 12.048 16.132 11.464 16.451 11.021 16.165 L 7.674 14.011 L 6.75 14.011 C 6.382 14.011 6.083 13.712 6.083 13.344 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Sound Effects</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('card-swipe')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 3.423 7.423 C 3.423 5.214 5.214 3.423 7.423 3.423 L 16.756 3.423 C 18.965 3.423 20.756 5.214 20.756 7.423 L 20.756 16.756 C 20.756 18.965 18.965 20.756 16.756 20.756 L 7.423 20.756 C 5.214 20.756 3.423 18.965 3.423 16.756 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 9.172 3.377 C 10.734 1.815 13.266 1.815 14.828 3.377 L 20.721 9.269 C 22.283 10.831 22.283 13.364 20.721 14.926 L 14.828 20.819 C 13.266 22.381 10.734 22.381 9.172 20.819 L 3.279 14.926 C 1.717 13.364 1.717 10.831 3.279 9.269 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Card Swipe</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('custom-effect')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6.2 C 2 5.673 2.31 5.195 2.792 4.981 L 7.063 3.083 C 7.503 2.887 8 3.21 8 3.693 L 8 20.307 C 8 20.79 7.503 21.113 7.063 20.917 L 2.792 19.019 C 2.31 18.805 2 18.327 2 17.8 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 9.333 3.297 C 9.333 2.642 9.954 2.163 10.588 2.33 L 20.509 4.941 C 21.388 5.172 22 5.967 22 6.875 L 22 17.125 C 22 18.033 21.388 18.828 20.509 19.059 L 10.588 21.67 C 9.954 21.837 9.333 21.358 9.333 20.703 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Custom Effect</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('drag-handle')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 5.333 2.667 L 2.667 0 L 0 2.667" transform="translate(5.667 10.667) rotate(-90 2.667 1.333)" fill="transparent" stroke-width="1.67" stroke="var(--svg-icon-tint)" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 5.333 0 L 2.667 2.667 L 0 0" transform="translate(13 10.667) rotate(-90 2.667 1.333)" fill="transparent" stroke-width="1.67" stroke="var(--svg-icon-tint)" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>
									<div class="title">Drag Handle</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('dynamic-header')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 8 L 2 8 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Dynamic Header</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('image-panning')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 12 14 C 12 12.895 12.895 12 14 12 L 20 12 C 21.105 12 22 12.895 22 14 L 22 18 C 22 20.209 20.209 22 18 22 L 14 22 C 12.895 22 12 21.105 12 20 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Image Panning</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('input-data')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 7.333 8.333 C 7.333 7.781 7.781 7.333 8.333 7.333 L 15.667 7.333 C 16.219 7.333 16.667 7.781 16.667 8.333 L 16.667 10.333 C 16.667 10.886 16.219 11.333 15.667 11.333 L 8.333 11.333 C 7.781 11.333 7.333 10.886 7.333 10.333 Z" fill="var(--svg-icon-tint)"></path><path d="M 7.333 13.667 C 7.333 13.114 7.781 12.667 8.333 12.667 L 15.667 12.667 C 16.219 12.667 16.667 13.114 16.667 13.667 L 16.667 15.667 C 16.667 16.219 16.219 16.667 15.667 16.667 L 8.333 16.667 C 7.781 16.667 7.333 16.219 7.333 15.667 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path></svg></div>
									<div class="title">Input Data</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('input-validation')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 7.333 8.333 C 7.333 7.781 7.781 7.333 8.333 7.333 L 15.667 7.333 C 16.219 7.333 16.667 7.781 16.667 8.333 L 16.667 10.333 C 16.667 10.886 16.219 11.333 15.667 11.333 L 8.333 11.333 C 7.781 11.333 7.333 10.886 7.333 10.333 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 7.333 13.667 C 7.333 13.114 7.781 12.667 8.333 12.667 L 15.667 12.667 C 16.219 12.667 16.667 13.114 16.667 13.667 L 16.667 15.667 C 16.667 16.219 16.219 16.667 15.667 16.667 L 8.333 16.667 C 7.781 16.667 7.333 16.219 7.333 15.667 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Input Validation</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('like-animation')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 5.28 0 C 7.017 0 7.747 2.366 6.357 3.755 C 4.968 5.144 3.543 5.905 3.543 5.905 C 3.543 5.905 2.118 5.144 0.728 3.755 C -0.661 2.365 0.069 -0 1.806 0 C 3.543 0 3.543 1.701 3.543 1.701 C 3.543 1.701 3.543 0 5.28 0 Z" transform="translate(11.213 11.787) rotate(15 3.543 2.953)" fill="var(--svg-icon-tint)"></path><path d="M 5.28 0 C 7.017 -0 7.747 2.365 6.357 3.755 C 4.968 5.144 3.543 5.905 3.543 5.905 C 3.543 5.905 2.118 5.144 0.728 3.755 C -0.661 2.366 0.069 0 1.806 0 C 3.543 0 3.543 1.701 3.543 1.701 C 3.543 1.701 3.543 0 5.28 0 Z" transform="translate(5.701 6.669) rotate(-15 3.543 2.953)" fill="var(--svg-icon-tint)" opacity="0.4"></path></svg></div>
									<div class="title">Like Animation</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('like-counter')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 14.778 7.333 C 17.556 7.333 18.724 11.072 16.502 13.268 C 14.279 15.464 12 16.667 12 16.667 C 12 16.667 9.721 15.464 7.498 13.268 C 5.276 11.072 6.444 7.333 9.222 7.333 C 12 7.333 12 10.022 12 10.022 C 12 10.022 12 7.333 14.778 7.333 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Like Counter</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('lock-screen')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 7.333 11 C 7.333 10.448 7.781 10 8.333 10 L 15.667 10 C 16.219 10 16.667 10.448 16.667 11 L 16.667 15.667 C 16.667 16.219 16.219 16.667 15.667 16.667 L 8.333 16.667 C 7.781 16.667 7.333 16.219 7.333 15.667 Z" fill="var(--svg-icon-tint)"></path><path d="M 12 7.333 C 13.289 7.333 14.333 8.378 14.333 9.667 C 14.333 10.955 13.289 12 12 12 C 10.711 12 9.667 10.955 9.667 9.667 C 9.667 8.378 10.711 7.333 12 7.333 Z" fill="transparent" stroke-width="1.67" stroke="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Lock Screen</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('long-press-menu')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 16.667 10.667 C 17.771 10.667 18.667 11.562 18.667 12.667 C 18.667 13.771 17.771 14.667 16.667 14.667 C 15.562 14.667 14.667 13.771 14.667 12.667 C 14.667 11.562 15.562 10.667 16.667 10.667 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 12 8 C 13.105 8 14 8.895 14 10 C 14 11.105 13.105 12 12 12 C 10.895 12 10 11.105 10 10 C 10 8.895 10.895 8 12 8 Z" fill="var(--svg-icon-tint)"></path><path d="M 7.333 10.667 C 8.438 10.667 9.333 11.562 9.333 12.667 C 9.333 13.771 8.438 14.667 7.333 14.667 C 6.229 14.667 5.333 13.771 5.333 12.667 C 5.333 11.562 6.229 10.667 7.333 10.667 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path></svg></div>
									<div class="title">Long Press Menu</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('perspective-3d')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 6.913 22 C 5.987 22 5.182 21.364 4.967 20.463 L 2.586 10.463 C 2.287 9.206 3.24 8 4.532 8 L 19.468 8 C 20.76 8 21.713 9.206 21.414 10.463 L 19.033 20.463 C 18.818 21.364 18.013 22 17.087 22 Z" fill="var(--svg-icon-tint)"></path><path d="M 3.833 7 C 3.557 7 3.333 6.776 3.333 6.5 L 3.333 6.5 C 3.333 5.672 4.005 5 4.833 5 L 19.167 5 C 19.995 5 20.667 5.672 20.667 6.5 L 20.667 6.5 C 20.667 6.776 20.443 7 20.167 7 Z" fill="var(--svg-icon-tint)" opacity="0.7"></path><path d="M 5.167 4 C 4.891 4 4.667 3.776 4.667 3.5 L 4.667 3.5 C 4.667 2.672 5.338 2 6.167 2 L 17.833 2 C 18.662 2 19.333 2.672 19.333 3.5 L 19.333 3.5 C 19.333 3.776 19.109 4 18.833 4 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path></svg></div>
									<div class="title">Perspective 3D</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('progress-bar')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 1.82 6 C 1.82 3.791 3.61 2 5.82 2 L 17.82 2 C 20.029 2 21.82 3.791 21.82 6 L 21.82 18 C 21.82 20.209 20.029 22 17.82 22 L 5.82 22 C 3.61 22 1.82 20.209 1.82 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 5.153 17 C 5.153 16.08 5.899 15.333 6.82 15.333 L 16.82 15.333 C 17.74 15.333 18.486 16.08 18.486 17 L 18.486 17 C 18.486 17.92 17.74 18.667 16.82 18.667 L 6.82 18.667 C 5.899 18.667 5.153 17.92 5.153 17 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 5.153 17 C 5.153 16.08 5.899 15.333 6.82 15.333 L 11.486 15.333 C 12.407 15.333 13.153 16.08 13.153 17 L 13.153 17 C 13.153 17.92 12.407 18.667 11.486 18.667 L 6.82 18.667 C 5.899 18.667 5.153 17.92 5.153 17 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Progress Bar</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('scroll-progress')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 7.333 10.333 C 7.333 9.781 7.781 9.333 8.333 9.333 L 15.667 9.333 C 16.219 9.333 16.667 9.781 16.667 10.333 L 16.667 11.667 C 16.667 12.219 16.219 12.667 15.667 12.667 L 8.333 12.667 C 7.781 12.667 7.333 12.219 7.333 11.667 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 7.333 14.667 C 7.333 14.114 7.781 13.667 8.333 13.667 L 15.667 13.667 C 16.219 13.667 16.667 14.114 16.667 14.667 L 16.667 16 C 16.667 16.552 16.219 17 15.667 17 L 8.333 17 C 7.781 17 7.333 16.552 7.333 16 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 7.333 7.667 C 7.333 7.298 7.632 7 8 7 L 16 7 C 16.368 7 16.667 7.298 16.667 7.667 L 16.667 7.667 C 16.667 8.035 16.368 8.333 16 8.333 L 8 8.333 C 7.632 8.333 7.333 8.035 7.333 7.667 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 7.333 7.667 C 7.333 7.298 7.632 7 8 7 L 12.667 7 C 13.035 7 13.333 7.298 13.333 7.667 L 13.333 7.667 C 13.333 8.035 13.035 8.333 12.667 8.333 L 8 8.333 C 7.632 8.333 7.333 8.035 7.333 7.667 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Scroll Progress</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('show-password')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 10.6 12 C 10.6 11.227 11.227 10.6 12 10.6 L 12 10.6 C 12.773 10.6 13.4 11.227 13.4 12 L 13.4 12 C 13.4 12.773 12.773 13.4 12 13.4 L 12 13.4 C 11.227 13.4 10.6 12.773 10.6 12 Z" fill="var(--svg-icon-tint)"></path><path d="M 12.166 7.833 C 14.892 7.833 17.161 9.42 17.811 12 C 17.161 14.58 14.892 16.167 12.166 16.167 C 9.44 16.167 7.127 14.58 6.478 12 C 7.127 9.42 9.44 7.833 12.166 7.833 Z M 9.333 12 C 9.333 13.473 10.527 14.667 12 14.667 C 13.473 14.667 14.667 13.473 14.667 12 C 14.667 10.527 13.473 9.333 12 9.333 C 10.527 9.333 9.333 10.527 9.333 12 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Show Password</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('slider')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 5.667 12 L 18.333 12" stroke="var(--svg-icon-tint)" fill="transparent" opacity="0.4" stroke-width="2.67" stroke-linecap="round" stroke-linejoin="round"></path><path d="M 12 8.333 C 14.025 8.333 15.667 9.975 15.667 12 C 15.667 14.025 14.025 15.667 12 15.667 C 9.975 15.667 8.333 14.025 8.333 12 C 8.333 9.975 9.975 8.333 12 8.333 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Slider</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('stories-drag')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 5.333 6.667 C 5.333 5.93 5.93 5.333 6.667 5.333 L 10 5.333 C 10.736 5.333 11.333 5.93 11.333 6.667 L 11.333 6.667 C 11.333 7.403 10.736 8 10 8 L 6.667 8 C 5.93 8 5.333 7.403 5.333 6.667 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path><path d="M 12.667 6.667 C 12.667 5.93 13.264 5.333 14 5.333 L 17.333 5.333 C 18.07 5.333 18.667 5.93 18.667 6.667 L 18.667 6.667 C 18.667 7.403 18.07 8 17.333 8 L 14 8 C 13.264 8 12.667 7.403 12.667 6.667 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Stories: Drag</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('stories-tap')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18 C 22 20.209 20.209 22 18 22 L 6 22 C 3.791 22 2 20.209 2 18 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 5.333 6.667 C 5.333 5.93 5.93 5.333 6.667 5.333 L 10 5.333 C 10.736 5.333 11.333 5.93 11.333 6.667 L 11.333 6.667 C 11.333 7.403 10.736 8 10 8 L 6.667 8 C 5.93 8 5.333 7.403 5.333 6.667 Z" fill="var(--svg-icon-tint)"></path><path d="M 12.667 6.667 C 12.667 5.93 13.264 5.333 14 5.333 L 17.333 5.333 C 18.07 5.333 18.667 5.93 18.667 6.667 L 18.667 6.667 C 18.667 7.403 18.07 8 17.333 8 L 14 8 C 13.264 8 12.667 7.403 12.667 6.667 Z" fill="var(--svg-icon-tint)" opacity="0.4"></path></svg></div>
									<div class="title">Stories: Tap</div>
								</div>
							</li>
							<li>
								<div class="btn" (click)="onSelect('toast-prompt')">
									<div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 2 6 C 2 3.791 3.791 2 6 2 L 18 2 C 20.209 2 22 3.791 22 6 L 22 18.333 C 22 20.542 20.209 22.333 18 22.333 L 6 22.333 C 3.791 22.333 2 20.542 2 18.333 Z" fill="var(--svg-icon-tint)" opacity="0.2"></path><path d="M 12 6.333 C 15.13 6.333 17.667 8.87 17.667 12 C 17.667 15.13 15.13 17.667 12 17.667 C 8.87 17.667 6.333 15.13 6.333 12 C 6.333 8.87 8.87 6.333 12 6.333 Z" fill="transparent" stroke-width="1.33" stroke="var(--svg-icon-tint)"></path><path d="M 12 13 C 12.552 13 13 13.448 13 14 C 13 14.552 12.552 15 12 15 C 11.448 15 11 14.552 11 14 C 11 13.448 11.448 13 12 13 Z" fill="var(--svg-icon-tint)"></path><path d="M 11.06 9.998 C 11.027 9.457 11.458 9 12 9 L 12 9 C 12.542 9 12.973 9.457 12.94 9.998 L 12.848 11.535 C 12.821 11.983 12.449 12.333 12 12.333 L 12 12.333 C 11.551 12.333 11.179 11.983 11.152 11.535 Z" fill="var(--svg-icon-tint)"></path></svg></div>
									<div class="title">Toast Prompt</div>
								</div>
							</li>
						</ul>
					</li>
					-->
				</ul>
				<ul class="nav--editor" *if="mode === 2">
					<li>
						<div class="title" [innerHTML]="'editor_views' | label"></div>
						<ul class="nav--editor">
							<li *for="let item of supportedViewTypes">
								<div class="btn" [class]="{ disabled: item.disabled }" (click)="onSelect({ type:'view', value: item.type.name })">
									<div class="icon">
										<svg-icon [name]="item.type.name"></svg-icon>
									</div>
									<div class="title" [innerHTML]="item.name"></div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
				<ul class="nav--editor" *if="mode === 3">
					<li>
						<div class="title" [innerHTML]="'editor_view_items' | label"></div>
						<ul class="nav--editor">
							<li *for="let item of supportedViewItemTypes">
								<div class="btn" [class]="{ disabled: item.disabled }" (click)="onSelect({ type:'viewItem', value: item.type.name })" [title]="item.id">
									<div class="icon">
										<svg-icon [name]="item.type.name"></svg-icon>
									</div>
									<div class="title" [innerHTML]="item.name"></div>
								</div>
							</li>
						</ul>
						<div class="abstract" *if="supportedViewItemTypes.length == 0" [innerHTML]="'editor_type_no_items' | label"></div>
					</li>
				</ul>
			</div>
		</div>
	</div>
	`
};
