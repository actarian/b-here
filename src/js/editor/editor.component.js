import { Component, getContext } from 'rxcomp';
import { Subject } from 'rxjs';
import { delay, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AgoraStatus } from '../agora/agora.types';
import { AssetService } from '../asset/asset.service';
import { environment } from '../environment';
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

export default class EditorComponent extends Component {

	onInit() {
		const { node } = getContext(this);
		node.classList.remove('hidden');
		this.flags = environment.flags;
		this.aside = false;
		this.settings = false;
		this.state = {};
		this.data = null;
		this.views = null;
		this.view = null;
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
				window.location.href = environment.url.access;
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
			link: null,
			channelName: environment.channelName,
			uid: null,
			status: AgoraStatus.Connected,
			connecting: false,
			connected: true,
			locked: false,
			control: false,
			spyed: false,
			hosted: true,
			live: false,
			cameraMuted: false,
			audioMuted: false,
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

	/*
	getUserMedia() {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			const body = document.querySelector('body');
			const media = document.createElement('div');
			const video = document.createElement('video');
			media.setAttribute('id', 'stream-editor');
			media.setAttribute('style', 'position:absolute; top: 5000px; line-height: 0;');
			media.appendChild(video);
			body.appendChild(media);
			navigator.mediaDevices.getUserMedia({
				video: { width: 800, height: 450 },
			}).then((stream) => {
				// console.log(stream);
				if ('srcObject' in video) {
					video.srcObject = stream;
				} else {
					video.src = window.URL.createObjectURL(stream);
				}
				video.play();
				const fakePublisherStream = {
					getId: () => 'editor',
					clientInfo: {
						role: RoleType.Publisher,
					}
				};
				const fakeAttendeeStream = {
					getId: () => 'editor',
					clientInfo: {
						role: RoleType.Attendee,
					}
				};
				StreamService.editorStreams = [fakePublisherStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream];
			}).catch((error) => {
				console.log('EditorComponent.getUserMedia.error', error.name, error.message);
			});
		}
	}
	*/

	viewObserver$() {
		return EditorService.data$().pipe(
			switchMap(data => {
				this.data = data;
				this.views = data.views.filter(x => x.type.name !== 'waiting-room');
				return ViewService.editorView$(data);
			}),
			tap(view => {
				this.view = null;
				this.pushChanges();
			}),
			delay(1),
			tap(view => {
				this.view = view;
				this.pushChanges();
			}),
		);
	}

	onNavTo(navItem) {
		// console.log('EditorComponent.onNavTo', navItem);
		const viewId = navItem.viewId;
		const view = this.data.views.find(x => x.id === viewId);
		if (view) {
			ViewService.action = { viewId, keepOrientation: navItem.keepOrientation };
		}
	}

	onRemoteControlRequest(message) {
		ModalService.open$({ src: environment.template.modal.controlRequest, data: null }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				this.patchState({ control: true, spying: false });
			} else {
				this.patchState({ control: false, spying: false });
			}
		});
	}

	patchState(state) {
		this.state = Object.assign({}, this.state, state);
		this.pushChanges();
		// console.log(this.state);
	}

	tryInAr() {
		ModalService.open$({ src: environment.template.modal.tryInAr, data: this.view }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			// this.pushChanges();
		});
	}

	/*
	onPrevent(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
	}
	*/

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

	onToggleSettings() {
		this.settings = !this.settings;
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
			).subscribe(position => callback(position))
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
		console.log('EditorComponent.onResizeEnd');
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
				console.log('EditorComponent.onOpenModal.resolve', event);
				switch(modal.type) {
					case 'view':
						switch (modal.value) {
							case ViewType.Panorama.name:
							case ViewType.PanoramaGrid.name:
							case ViewType.Model.name:
								this.data.views.push(event.data);
								ViewService.viewId = event.data.id;
								this.pushChanges(); // !!!
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
								const tile = EditorService.getTile(this.view);
								if (tile) {
									const navs = tile.navs || [];
									navs.push(event.data);
									Object.assign(tile, { navs });
									this.view.updateCurrentItems();
								} else {
									const items = this.view.items || [];
									items.push(event.data);
									Object.assign(this.view, { items });
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
					this.onViewHitted((position) => {
						this.onOpenModal(event, { view: this.view, position });
					});
					ToastService.open$({ message: 'Click a point on the view' });
					break;
				case ViewItemType.Model.name:
					if (event.type === 'viewItem') {
						if (this.view.type.name === ViewType.Model.name) {
							return;
						}
						this.onViewHitted((position) => {
							this.onOpenModal(event, { view: this.view, position });
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
			this.pushChanges();
		} else if (event.view && (event.tile || event.tile === null)) {
			event.view.selected = false;
			event.view.tiles.forEach(tile => tile.selected = tile === event.tile);
			/*
			// if tile selected
			// send ChangeTile message to world component
			this.orbit.walk(event.position, (headingLongitude, headingLatitude) => {
				const item = this.view.getTile(event.indices.x, event.indices.y);
				if (item) {
					this.panorama.crossfade(item, this.renderer, (envMap, texture, rgbe) => {
						// this.scene.background = envMap;
						this.scene.environment = envMap;
						this.orbit.walkComplete(headingLongitude, headingLatitude);
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
		console.log('onAsideDelete', event);
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
				const index = this.data.views.indexOf(event.view);
				if (index !== -1) {
					this.data.views.splice(index, 1);
				}
				this.views = this.data.views.slice();
				ViewService.viewId = this.views[0].id;
				// this.pushChanges();
			}, error => console.log('EditorComponent.onAsideDelete.viewDelete$.error', error));
		}
	}

}

EditorComponent.meta = {
	selector: '[editor-component]',
};
