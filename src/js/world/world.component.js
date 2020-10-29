import { Component, getContext } from 'rxcomp';
import { auditTime, filter, shareReplay, takeUntil } from 'rxjs/operators';
import { MessageType } from '../agora/agora.types';
import { DEBUG } from '../environment';
import KeyboardService from '../keyboard/keyboard.service';
import MessageService from '../message/message.service';
import { Rect } from '../rect/rect';
import StateService from '../state/state.service';
import { PanoramaGridView } from '../view/view';
import AvatarElement from './avatar/avatar-element';
import Camera from './camera/camera';
import Interactive from './interactive/interactive';
import OrbitService, { OrbitMoveEvent } from './orbit/orbit';
import Panorama from './panorama/panorama';
import PhoneElement from './phone/phone.element';
import PointerElement from './pointer/pointer.element';
import VRService from './vr.service';
// import * as THREE from 'three';
import { XRControllerModelFactory } from './webxr/xr-controller-model-factory';

const ORIGIN = new THREE.Vector3();
const USE_SHADOW = false;
const USE_PHONE = true;

const loadingBanner = { title: 'loading' };
const waitingBanner = { title: 'waiting host' };

export default class WorldComponent extends Component {

	get error() {
		return this.error_;
	}
	set error(error) {
		if (this.error_ !== error) {
			this.error_ = error;
			this.pushChanges();
		}
	}
	get view() {
		return this.view_;
	}
	set view(view) {
		if (this.view_ !== view) {
			this.view_ = view;
			this.setView();
		}
	}
	get debugging() {
		return DEBUG;
	}
	get locked() {
		return this.state.locked || this.state.spying;
	}
	get lockedOrXR() {
		return this.locked || this.renderer.xr.isPresenting;
	}

	onInit() {
		// console.log('WorldComponent.onInit');
		this.index = 0;
		this.error_ = null;
		this.loading = null;
		this.waiting = null;
		this.avatars = {};
		this.createScene();
		this.setView();
		this.addListeners();
		this.animate(); // !!! no
		KeyboardService.keys$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(keys => {
			this.keys = keys;
			// console.log(keys);
		});
	}

	onChanges() {
		if (this.view) {
			const selected = this.view.items.find(item => item.selected);
			if (selected && selected.mesh) {
				this.orbit.lookAt(selected.mesh);
			}
		}
	}

	onDestroy() {
		this.removeListeners();
		const renderer = this.renderer;
		renderer.setAnimationLoop(() => { });
	}

	createScene() {
		const { node } = getContext(this);
		this.size = { left: 0, top: 0, width: 0, height: 0, aspect: 0 };
		this.mouse = new THREE.Vector2();
		this.controllerMatrix_ = new THREE.Matrix4();
		this.controllerWorldPosition_ = new THREE.Vector3();
		this.controllerWorldDirection_ = new THREE.Vector3();
		// this.showNavPoints = false;

		const container = this.container = node;
		const info = this.info = node.querySelector('.world__info');

		const worldRect = this.worldRect = Rect.fromNode(container);
		const cameraRect = this.cameraRect = new Rect();

		const cameraGroup = this.cameraGroup = new THREE.Group();
		// new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, ROOM_RADIUS * 2);
		// const camera = this.camera = new THREE.PerspectiveCamera(70, container.offsetWidth / container.offsetHeight, 0.01, 1000);
		const camera = this.camera = new Camera(70, container.offsetWidth / container.offsetHeight, 0.01, 1000);
		/*
		camera.position.set(0, 20, 20);
		camera.lookAt(camera.target);
		*/
		cameraGroup.add(camera);
		cameraGroup.target = new THREE.Vector3();

		const orbit = this.orbit = new OrbitService(camera);

		const renderer = this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: false,
			premultipliedAlpha: true,
			logarithmicDepthBuffer: true,
			// physicallyCorrectLights: true,
		});
		renderer.setClearColor(0x000000, 1);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(container.offsetWidth, container.offsetHeight);
		renderer.xr.enabled = true;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 0.8;
		renderer.outputEncoding = THREE.sRGBEncoding;
		if (USE_SHADOW) {
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFShadowMap; // THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
		}
		if (container.childElementCount > 0) {
			container.insertBefore(renderer.domElement, container.children[0]);
		} else {
			container.appendChild(renderer.domElement);
		}

		const raycaster = this.raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(this.mouse, camera);

		const scene = this.scene = new THREE.Scene();
		scene.add(cameraGroup);

		const panorama = this.panorama = new Panorama();
		scene.add(panorama.mesh);

		const pointer = this.pointer = new PointerElement();

		const mainLight = new THREE.PointLight(0xffffff);
		mainLight.position.set(-50, 0, -50);
		scene.add(mainLight);

		const light2 = new THREE.DirectionalLight(0xffe699, 5);
		light2.position.set(5, -5, 5);
		light2.target.position.set(0, 0, 0);
		scene.add(light2);

		const light = new THREE.AmbientLight(0x101010);
		scene.add(light);

		const objects = this.objects = new THREE.Group();
		objects.name = '[objects]';
		scene.add(objects);

		this.addControllers();
		//
		this.resize();
	}

	addOffCanvasScene(message) {
		const avatar = new AvatarElement(message);
		this.avatars[message.clientId] = avatar;
		// avatar.container.appendChild(avatar.element);
	}

	removeOffCanvasScene(message) {
		const avatar = this.avatars[message.clientId];
		/*
		if (avatar && avatar.element.parentNode) {
			avatar.element.parentNode.removeChild(avatar.element);
		}
		*/
		delete this.avatars[message.clientId];
	}

	updateOffCanvasScene(message) {
		const avatar = this.avatars[message.clientId];
		if (avatar) {
			avatar.update(message);
		}
	}

	setViewOrientation(view) {
		if (this.orbit) {
			this.orbit.mode = view.type.name;
			if (!this.renderer.xr.isPresenting) {
				if (this.infoResultMessage) {
					this.orbit.setOrientation(this.infoResultMessage.orientation);
					this.orbit.zoom = this.infoResultMessage.zoom;
					this.camera.updateProjectionMatrix();
				} else {
					this.orbit.setOrientation(view.orientation);
					this.orbit.zoom = view.zoom;
					this.camera.updateProjectionMatrix();
				}
			}
		}
	}

	setView() {
		const view = this.view_;
		if (view) {
			if (this.panorama) {
				if (this.infoResultMessage) {
					if (view instanceof PanoramaGridView && message.gridIndex) {
						view.index_ = message.gridIndex;
					}
				}
				view.ready = false;
				this.loading = loadingBanner;
				this.waiting = null;
				this.pushChanges();
				this.panorama.swap(view, this.renderer, (envMap, texture, rgbe) => {
					// this.scene.background = envMap;
					this.scene.environment = envMap;
					view.ready = true;
					this.loading = null;
					this.waiting = (view && view.type.name === 'waiting-room') ? waitingBanner : null;
					this.pushChanges();
					// this.render();
				}, (view) => {
					this.setViewOrientation(view);
					// this.showNavPoints = true;
					// this.pushChanges();
				});
			} else {
				this.setViewOrientation(view);
			}
			this.infoResultMessage = null;
		}
	}

	addControllers() {
		const renderer = this.renderer;
		const scene = this.scene;
		const controllerGroup = this.controllerGroup = new THREE.Group();
		const controller1 = this.controller1 = renderer.xr.getController(0);
		controller1.name = '[controller1]';
		this.onSelect1Start = this.onSelect1Start.bind(this);
		this.onSelect1End = this.onSelect1End.bind(this);
		controller1.addEventListener('selectstart', this.onSelect1Start);
		controller1.addEventListener('selectend', this.onSelect1End);
		controller1.addEventListener('connected', (event) => {
			controller1.add(this.buildController(event.data));
		});
		controller1.addEventListener('disconnected', () => {
			while (controller1.children.length) {
				controller1.remove(controller1.children[0]);
			}
		});
		controllerGroup.add(controller1);
		const controller2 = this.controller2 = renderer.xr.getController(1);
		controller2.name = '[controller2]';
		this.onSelect2Start = this.onSelect2Start.bind(this);
		this.onSelect2End = this.onSelect2End.bind(this);
		controller2.addEventListener('selectstart', this.onSelect2Start);
		controller2.addEventListener('selectend', this.onSelect2End);
		controller2.addEventListener('connected', (event) => {
			controller2.add(this.buildController(event.data));
			if (USE_PHONE) {
				const phone = this.phone = new PhoneElement();
				controller2.add(phone.mesh);
			}
		});
		controller2.addEventListener('disconnected', () => {
			while (controller2.children.length) {
				controller2.remove(controller2.children[0]);
			}
		});
		controllerGroup.add(controller2);
		this.controllers = [this.controller1, this.controller2];
		// The XRControllerModelFactory will automatically fetch controller models
		// that match what the user is holding as closely as possible. The models
		// should be attached to the object returned from getControllerGrip in
		// order to match the orientation of the held device.
		const controllerModelFactory = new XRControllerModelFactory();
		const controllerGrip1 = this.controllerGrip1 = renderer.xr.getControllerGrip(0);
		controllerGrip1.name = '[controller-grip1]';
		controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
		controllerGroup.add(controllerGrip1);
		if (!USE_PHONE) {
			const controllerGrip2 = this.controllerGrip2 = renderer.xr.getControllerGrip(1);
			controllerGrip2.name = '[controller-grip2]';
			controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
			controllerGroup.add(controllerGrip2);
		}
		scene.add(controllerGroup);
	}

	buildController(data) {
		let geometry, material;
		switch (data.targetRayMode) {
			case 'tracked-pointer':
				geometry = new THREE.BufferGeometry();
				geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, -1], 3));
				geometry.setAttribute('color', new THREE.Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3));
				material = new THREE.LineBasicMaterial({
					vertexColors: true,
					blending: THREE.AdditiveBlending
				});
				return new THREE.Line(geometry, material);
			case 'gaze':
				geometry = new THREE.RingBufferGeometry(0.02, 0.04, 32).translate(0, 0, -1);
				material = new THREE.MeshBasicMaterial({
					opacity: 0.5,
					transparent: true
				});
				return new THREE.Mesh(geometry, material);
		}
	}

	onSelect1Start() {
		this.controller1.userData.isSelecting = true;
		this.controller = this.controller1;
	}

	onSelect1End() {
		this.controller1.userData.isSelecting = false;
	}

	onSelect2Start() {
		this.controller2.userData.isSelecting = true;
		this.controller = this.controller2;
	}

	onSelect2End() {
		this.controller2.userData.isSelecting = false;
	}

	onTween() {
		// this.render();
	}

	onSlideChange(index) {
		this.index = index;
		this.slideChange.next(index);
	}

	updateRaycasterXR(controller, raycaster) {
		if (controller) {
			this.controllerMatrix_.identity().extractRotation(controller.matrixWorld);
			raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
			raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this.controllerMatrix_);
			// raycaster.camera = this.host.renderer.xr.getCamera(this.camera);
			return raycaster;
		}
	}

	raycasterHitTest() {
		try {
			if (this.renderer.xr.isPresenting) {
				const raycaster = this.updateRaycasterXR(this.controller, this.raycaster);
				if (raycaster) {
					const hit = Interactive.hittest(raycaster, this.controller.userData.isSelecting);
					this.pointer.update();
					/*
					if (hit && hit !== this.panorama.mesh) {
						// controllers.feedback();
					}
					*/
				}
			} else if (!this.dragItem && !this.resizeItem) {
				const raycaster = this.raycaster;
				if (raycaster) {
					const hit = Interactive.hittest(raycaster);
					/*
					if (hit && hit !== this.panorama.mesh) {
						// console.log('hit', hit);
					}
					*/
				}
			}
		} catch (error) {
			this.error = error;
			// throw (error);
		}
	}

	repos(object, rect) {
		const worldRect = this.worldRect;
		const sx = 0.8;
		// const sx = rect.width / worldRect.width;
		// const sy = rect.height / worldRect.height;
		object.scale.set(sx, sx, sx);
		// const tx = ((rect.x + rect.width / 2) - worldRect.width / 2) / worldRect.width * 2.0 * this.camera.aspect; // * cameraRect.width / worldRect.width - cameraRect.width / 2;
		// const ty = ((rect.y + rect.height / 2) - worldRect.height / 2) / worldRect.height * 2.0 * this.camera.aspect; // * cameraRect.height / worldRect.height - cameraRect.height / 2;
		const tx = ((rect.x + rect.width / 2) - worldRect.width / 2) / worldRect.width * 2.0 * this.camera.aspect;
		const ty = ((rect.y + rect.height / 2) - worldRect.height / 2) / worldRect.height * 2.0 * this.camera.aspect;
		// console.log(tx);
		// const position = new THREE.Vector3(tx, ty, 0).unproject(this.camera);
		object.position.set(tx, -ty, 0);
		// console.log(tx, -ty, 0);
	}

	render(delta) {
		try {
			const renderer = this.renderer,
				scene = this.scene,
				camera = this.camera;
			const time = performance.now();
			const tick = this.tick_ ? ++this.tick_ : this.tick_ = 1;
			this.raycasterHitTest();
			this.scene.traverse((child) => {
				if (typeof child.userData.render === 'function') {
					child.userData.render(time, tick);
				}
			});
			this.vrService.updateState(this);
			Object.keys(this.avatars).forEach(key => {
				this.avatars[key].render();
			});
			if (renderer.xr.isPresenting) {
				gsap.ticker.tick();
			}
			/*
			const objects = this.objects;
			for (let i = 0; i < objects.children.length; i++) {
				const x = objects.children[i];
				if (typeof x.userData.render === 'function') {
					x.userData.render(time, tick);
				}
			}
			*/
			renderer.render(this.scene, this.camera);
			if (this.state && !this.state.hosted) {
				this.orbit.render();
			}
		} catch (error) {
			this.error = error;
			// throw (error);
		}
	}

	animate() {
		const renderer = this.renderer;
		renderer.setAnimationLoop(this.render);
	}

	resize() {
		try {
			const container = this.container,
				renderer = this.renderer,
				camera = this.camera;
			const size = this.size;
			const rect = container.getBoundingClientRect();
			size.left = Math.floor(rect.left);
			size.top = Math.floor(rect.top);
			size.width = Math.ceil(rect.width);
			size.height = Math.ceil(rect.height);
			size.aspect = size.width / size.height;
			const worldRect = this.worldRect;
			worldRect.setSize(size.width, size.height);
			if (!renderer.xr.isPresenting) {
				renderer.setSize(size.width, size.height);
				if (camera) {
					camera.aspect = size.width / size.height;
					const angle = camera.fov * Math.PI / 180;
					const height = Math.abs(camera.position.z * Math.tan(angle / 2) * 2);
					const cameraRect = this.cameraRect;
					cameraRect.width = height * camera.aspect;
					cameraRect.height = height;
					// console.log('position', camera.position.z, 'angle', angle, 'height', height, 'aspect', camera.aspect, cameraRect);
					camera.updateProjectionMatrix();
				}
			}
			// this.render();
		} catch (error) {
			this.error = error;
			// throw (error);
		}
	}

	updateRaycasterMouse(event) {
		const w2 = this.size.width / 2;
		const h2 = this.size.height / 2;
		this.mouse.x = (event.clientX - this.size.left - w2) / w2;
		this.mouse.y = -(event.clientY - this.size.top - h2) / h2;
		const raycaster = this.raycaster;
		raycaster.setFromCamera(this.mouse, this.camera);
		return raycaster;
	}

	onMouseDown(event) {
		try {
			if (event.button !== 0) {
				return;
			}
			const raycaster = this.updateRaycasterMouse(event);
			const hit = Interactive.hittest(raycaster, true);
			if (this.editor || DEBUG) {
				if (this.keys.Shift || this.keys.Control) {
				} else {
					this.select.next({ item: null });
					if (this.panorama.mesh.intersection) {
						const position = new THREE.Vector3().copy(this.panorama.mesh.intersection.point).normalize();
						console.log(JSON.stringify({ position: position.toArray() }));
						this.viewHit.next(position);
					}
				}
			}
		} catch (error) {
			this.error = error;
			// throw (error);
		}
	}

	onMouseMove(event) {
		try {
			const raycaster = this.updateRaycasterMouse(event);
			if (this.lockedOrXR) {
				return;
			}
			if (this.dragItem) {
				if (typeof this.dragItem.onDragMove === 'function') {
					const intersections = raycaster.intersectObjects([this.panorama.mesh]);
					if (intersections.length) {
						const intersection = intersections[0];
						// this.panorama.mesh.intersection = intersection;
						const position = new THREE.Vector3().copy(intersection.point).normalize();
						this.dragItem.onDragMove(position);
					}
				}
			} else if (this.resizeItem) {
				if (typeof this.resizeItem.onResizeMove === 'function') {
					/*
					// calc arc x & y as scale;
					const intersections = raycaster.intersectObjects([this.panorama.mesh]);
					if (intersections.length) {
						const intersection = intersections[0];
						// this.panorama.mesh.intersection = intersection;
						const position = new THREE.Vector3().copy(intersection.point).normalize();
						this.resizeItem.onResizeMove(position);
					}
					*/
				}
			}
		} catch (error) {
			this.error = error;
			// throw (error);
		}
	}

	onMouseUp(event) {
		try {
			if (this.lockedOrXR) {
				return;
			}
			if (this.dragItem) {
				if (typeof this.dragItem.onDragEnd === 'function') {
					this.dragItem.onDragEnd();
					this.dragEnd.next(this.dragItem);
				}
			}
			this.dragItem = null;
			if (this.resizeItem) {
				if (typeof this.resizeItem.onResizeEnd === 'function') {
					this.resizeItem.onResizeEnd();
					this.resizeEnd.next(this.resizeItem);
				}
			}
			this.resizeItem = null;
			/*
			if (NavPointDragging) {
				stopDragging
			}
			*/
		} catch (error) {
			this.error = error;
			// throw (error);
		}
	}

	onMouseWheel(event) {
		try {
			if (this.lockedOrXR) {
				return;
			}
			const orbit = this.orbit;
			gsap.to(orbit, {
				duration: 0.5,
				zoom: orbit.zoom + event.deltaY * 0.1,
				ease: Power4.easeOut,
				overwrite: true,
			});
		} catch (error) {
			this.error = error;
			// throw (error);
		}
	}

	onOrientationDidChange() {
		MessageService.send({
			type: MessageType.CameraOrientation,
			orientation: this.orbit.getOrientation(),
			zoom: this.orbit.zoom,
		});
	}

	onVRStarted() {
		this.scene.add(this.pointer.mesh);
		MessageService.send({
			type: MessageType.VRStarted,
		});
	}

	onVREnded() {
		this.scene.remove(this.pointer.mesh);
		MessageService.send({
			type: MessageType.VREnded,
		});
	}

	onVRStateDidChange(state) {
		MessageService.send({
			type: MessageType.VRState,
			camera: state.camera.array,
		});
	}

	onMenuNav(event) {
		// console.log('WorldComponent.onMenuNav', event.id, event);
		this.menu = undefined;
		this.navTo.next(event.id);
	}

	onMenuToggle(event) {
		// console.log('WorldComponent.onMenuToggle', event.id, event);
		if (this.locked) {
			return;
		}
		this.menu = event;
		this.view.items.forEach(item => item.showPanel = false);
		this.pushChanges();
	}

	onNavOver(event) {
		// console.log('WorldComponent.onNavOver', event);
		if (this.menu) {
			return;
			// this.menu.removeMenu();
		}
		this.view.items.forEach(item => item.showPanel = false);
		event.item.showPanel = event.item.hasPanel;
		this.pushChanges();
	}

	onNavOut(event) {
		// console.log('WorldComponent.onNavOut', event);
		// event.item.showPanel = false;
		this.pushChanges();
	}

	onNavDown(event) {
		event.item.showPanel = false;
		// console.log('WorldComponent.onNavDown', this.keys);
		if (this.locked) {
			return;
		}
		if (this.editor && this.keys.Shift) {
			this.dragItem = event;
			this.select.next(event);
		} else if (this.editor && this.keys.Control) {
			this.resizeItem = event;
			this.select.next(event);
		} else {
			this.navTo.next(event.item.viewId);
		}
	}

	onPlaneDown(event) {
		// console.log('WorldComponent.onPlaneDown', this.keys);
		if (this.lockedOrXR) {
			return;
		}
		if (this.editor && this.keys.Shift) {
			this.dragItem = event;
			this.select.next(event);
		} else if (this.editor && this.keys.Control) {
			this.resizeItem = event;
			this.select.next(event);
		}
	}

	onPanelDown(event) {
		// console.log('WorldComponent.onPanelDown', href, target);
		const href = event.getAttribute('href');
		const target = event.getAttribute('target') || '_self';
		if (href) {
			window.open(href, '_blank');
		}
	}

	onGridMove(event) {
		// console.log('WorldComponent.onGridMove', event, this.view);
		if (this.locked) {
			return;
		}
		this.view.items = [];
		this.pushChanges();
		this.orbit.walk(event.position, (headingLongitude, headingLatitude) => {
			const tile = this.view.getTile(event.indices.x, event.indices.y);
			if (tile) {
				this.panorama.crossfade(tile, this.renderer, (envMap, texture, rgbe) => {
					// this.scene.background = envMap;
					this.scene.environment = envMap;
					this.orbit.walkComplete(headingLongitude, headingLatitude);
					this.view.updateCurrentItems();
					this.pushChanges();
					// this.render();
					// this.pushChanges();
				});
			}
		});
	}

	onGridNav(event) {
		// console.log('WorldComponent.onGridNav', event);
		if (this.locked) {
			return;
		}
		MessageService.send({
			type: MessageType.NavToGrid,
			viewId: this.view.id,
			gridIndex: event,
		});
		this.pushChanges();
	}

	addListeners() {
		this.resize = this.resize.bind(this);
		this.render = this.render.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseWheel = this.onMouseWheel.bind(this);
		// this.controls.addEventListener('change', this.render); // use if there is no animation loop
		window.addEventListener('resize', this.resize, false);
		this.container.addEventListener('wheel', this.onMouseWheel, false);
		this.container.addEventListener('mousedown', this.onMouseDown, false);
		this.container.addEventListener('mouseup', this.onMouseUp, false);
		document.addEventListener('mousemove', this.onMouseMove, false);
		const vrService = this.vrService = VRService.getService();
		vrService.session$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe((session) => {
			this.renderer.xr.setSession(session);
			if (session) {
				this.onVRStarted();
			} else {
				this.onVREnded();
			}
		});
		vrService.state$.pipe(
			takeUntil(this.unsubscribe$),
			auditTime(Math.floor(1000 / 15)),
		).subscribe((state) => {
			this.onVRStateDidChange(state);
		});
		const orbit$ = this.orbit.observe$(this.container).pipe(
			shareReplay(1)
		);
		/*
		const drag$ = orbit$.pipe(
			filter(event => event instanceof OrbitDragEvent),
		);
		*/
		const orientation$ = orbit$.pipe(
			filter(event => event instanceof OrbitMoveEvent),
			auditTime(Math.floor(1000 / 15)),
		);
		orientation$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(event => {
			// this.render();
			this.onOrientationDidChange();
		});
		MessageService.out$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(message => {
			switch (message.type) {
				case MessageType.AgoraEvent:
					/*
					if (message.event instanceof AgoraRemoteEvent) {
						setTimeout(() => {
							this.panorama.setVideo(event.element.querySelector('video'));
						}, 500);
					}
					*/
					break;
				case MessageType.RequestInfo:
					message.type = MessageType.RequestInfoResult;
					message.viewId = this.view.id;
					message.orientation = this.orbit.getOrientation();
					message.zoom = this.orbit.zoom;
					if (this.view instanceof PanoramaGridView) {
						message.gridIndex = this.view.index;
					}
					MessageService.sendBack(message);
					break;
				case MessageType.RequestControlAccepted:
					message = {
						type: MessageType.NavToView,
						viewId: this.view.id,
					};
					if (this.view instanceof PanoramaGridView) {
						message.gridIndex = this.view.index;
					}
					MessageService.send(message);
					break;
				case MessageType.RequestInfoResult:
					if (message.viewId === this.view.id) {
						this.orbit.setOrientation(message.orientation);
						if (!this.renderer.xr.isPresenting) {
							this.orbit.zoom = message.zoom;
							this.camera.updateProjectionMatrix();
						}
						if (this.view instanceof PanoramaGridView && message.gridIndex) {
							this.view.index = message.gridIndex;
						}
					} else {
						this.infoResultMessage = message;
					}
					break;
				case MessageType.CameraOrientation:
					this.orbit.setOrientation(message.orientation);
					if (!this.renderer.xr.isPresenting) {
						this.orbit.zoom = message.zoom;
						// this.camera.updateProjectionMatrix();
					}
					// this.render();
					break;
				case MessageType.CameraRotate:
					if (!this.renderer.xr.isPresenting) {
						const camera = this.camera;
						camera.position.set(message.coords[0], message.coords[1], message.coords[2]);
						camera.lookAt(ORIGIN);
						// this.render();
					}
					break;
				case MessageType.NavToGrid:
					if (this.view.id === message.viewId) {
						this.view.index = message.gridIndex;
					}
					break;
				case MessageType.VRStarted:
					this.addOffCanvasScene(message);
					break;
				case MessageType.VREnded:
					this.removeOffCanvasScene(message);
					break;
				case MessageType.VRState:
					this.updateOffCanvasScene(message);
					break;
			}
		});
		StateService.state$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(state => {
			this.state = state;
			// console.log(state);
			// this.pushChanges();
		});
	}

	removeListeners() {
		window.removeEventListener('resize', this.resize, false);
		window.removeEventListener('resize', this.resize, false);
		document.removeEventListener('mousemove', this.onMouseMove, false);
		document.removeEventListener('wheel', this.onMouseWheel, false);
		this.container.removeEventListener('mousedown', this.onMouseDown, false);
		this.container.removeEventListener('mouseup', this.onMouseUp, false);
	}
}

WorldComponent.meta = {
	selector: '[world]',
	inputs: ['view', 'views', 'editor'],
	outputs: ['slideChange', 'navTo', 'viewHit', 'dragEnd', 'resizeEnd', 'select'],
};
