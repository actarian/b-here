import { Component, getContext } from 'rxcomp';
import { ReplaySubject } from 'rxjs';
import { auditTime, filter, shareReplay, takeUntil, tap } from 'rxjs/operators';
import { MessageType, UIMode } from '../agora/agora.types';
import { DEBUG, environment } from '../environment';
import KeyboardService from '../keyboard/keyboard.service';
import MessageService from '../message/message.service';
import PrefetchService from '../prefetch/prefetch.service';
import { Rect } from '../rect/rect';
import StateService from '../state/state.service';
import { RoleType } from '../user/user';
import { PanoramaGridView, ViewType } from '../view/view';
import ViewService from '../view/view.service';
import AvatarElement from './avatar/avatar-element';
import Camera from './camera/camera';
import Interactive from './interactive/interactive';
import MediaMesh from './media/media-mesh';
import OrbitService, { OrbitMoveEvent } from './orbit/orbit.service';
import Panorama from './panorama/panorama';
import PhoneElement from './phone/phone.element';
import PointerElement from './pointer/pointer.element';
import VRService from './vr.service';
import { Gamepad } from './webxr/gamepad';
import { XRControllerModelFactory } from './webxr/xr-controller-model-factory';

const ORIGIN = new THREE.Vector3();
const DOWN = new THREE.Vector3(0, -1, 0);
const USE_SHADOW = false;
const USE_PHONE = true;

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
		// return STATIC || DEBUG;
		return DEBUG;
	}

	get controlled() {
		return (StateService.state.controlling && StateService.state.controlling !== StateService.state.uid);
	}

	get controlling() {
		return (StateService.state.controlling && StateService.state.controlling === StateService.state.uid);
	}

	get spyed() {
		return (StateService.state.spying && StateService.state.spying === StateService.state.uid);
	}

	get spying() {
		return (StateService.state.spying && StateService.state.spying !== StateService.state.uid);
	}

	get locked() {
		return this.controlled || this.spying;
	}

	get lockedOrXR() {
		return this.locked || this.renderer.xr.isPresenting;
	}

	get showPointer() {
		return this.pointer.mesh.parent != null;
	}
	set showPointer(showPointer) {
		if (this.showPointer !== showPointer) {
			showPointer ? this.scene.add(this.pointer.mesh) : this.scene.remove(this.pointer.mesh);
			// console.log('showPointer', showPointer);
		}
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
		this.animate(); // !!!
		KeyboardService.keys$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(keys => {
			this.keys = keys;
			// console.log(keys);
		});
	}

	/*
	onChanges() {
		if (this.view) {
			const selected = this.view.items.find(item => item.selected);
			if (selected && selected.mesh) {
				if (this.view.type.name !== 'model') {
					this.orbitService.lookAt(selected.mesh);
				}
			}
		}
	}
	*/

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

		const container = this.container = node;
		const info = this.info = node.querySelector('.world__info');

		const worldRect = this.worldRect = Rect.fromNode(container);
		const cameraRect = this.cameraRect = new Rect();

		// !!! eliminabile?
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

		const orbitService = this.orbitService = new OrbitService(camera);

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

		// this.addEnvironment();

		const objects = this.objects = new THREE.Group();
		objects.name = '[objects]';
		scene.add(objects);

		const panorama = this.panorama = new Panorama();
		this.panoramaIntersectObjects = [panorama.mesh];
		this.intersectObjects = this.panoramaIntersectObjects;
		objects.add(panorama.mesh);

		const indicator = this.indicator = new PointerElement();

		const pointer = this.pointer = new PointerElement('#ff4332');

		/*
		const mainLight = new THREE.PointLight(0xffffff);
		mainLight.position.set(-50, 0, -50);
		objects.add(mainLight);

		const light2 = new THREE.DirectionalLight(0xffe699, 1.5);
		light2.position.set(40, -40, 40);
		light2.target.position.set(0, 0, 0);
		scene.add(light2);

		const light3 = new THREE.DirectionalLight(0xffe699, 1);
		light3.position.set(0, 50, 0);
		light3.target.position.set(0, 0, 0);
		scene.add(light3);

		const light = new THREE.AmbientLight(0x101010);
		*/

		const ambient = this.ambient = new THREE.AmbientLight(0xffffff, 1);
		objects.add(ambient);

		const direct = this.direct = new THREE.DirectionalLight(0xffffff, 1);
		direct.position.set(-40, -40, -40);
		direct.target.position.set(0, 0, 0);
		objects.add(direct);

		this.addControllers();
		this.resize();

		console.log('WorldComponent.createScene', this);
	}

	addEnvironment() {
		const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
		pmremGenerator.compileEquirectangularShader();
		const segments = environment.textures.envMap.split('/');
		const filename = segments.pop();
		const folder = segments.join('/');
		const loader = new THREE.RGBELoader()
			.setDataType(THREE.UnsignedByteType)
			.setPath(environment.getPath(folder))
			.load(filename, (texture) => {
				const envMap = this.envMap = pmremGenerator.fromEquirectangular(texture).texture;
				texture.dispose();
				pmremGenerator.dispose();
				this.scene.environment = envMap;
				// this.scene.background = envMap;
			});
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

	setView() {
		if (!this.panorama) {
			return;
		}
		const view = this.view_;
		if (view) {
			if (this.views) {
				this.views.forEach(view => delete view.onUpdateAsset);
			}
			const message = this.requestInfoResult;
			if (message) {
				if (view instanceof PanoramaGridView && message.gridIndex !== undefined) {
					view.index_ = message.gridIndex;
				}
			}
			view.ready = false;
			this.cameraGroup.position.set(0, 0, 0);
			// console.log(this.cameraGroup.position);
			if (view.type.name === ViewType.Room3d.name) {
				this.renderer.setClearColor(0x000000, 1);
				// this.renderer.setClearColor(0x7dc1fc, 1); // !!!
				this.objects.remove(this.panorama.mesh);
			} else {
				this.renderer.setClearColor(0x000000, 1);
				this.objects.add(this.panorama.mesh);
			}
			// this.loading = LOADING_BANNER;
			// this.waiting = null;
			this.pushChanges();
			PrefetchService.cancel();
			this.panorama.change(view, this.renderer, (envMap, texture, rgbe) => {
				// this.scene.background = envMap;
				this.scene.environment = envMap || this.envMap;
				view.ready = true;
				view.onUpdateAsset = () => {
					this.onViewAssetDidChange();
				};
				// this.waiting = (view && view.type.name === 'waiting-room') ? WAITING_BANNER : null;
				this.pushChanges();
				// this.render();
			}, (view) => {
				this.setViewOrientation(view);
				PrefetchService.prefetch(view.prefetchAssets);
				// this.loading = null;
				// this.pushChanges();
			});
		}
	}

	onViewAssetDidChange() {
		if (this.panorama) {
			this.panorama.crossfade(this.view, this.renderer, (envMap, texture, rgbe) => {
				this.scene.environment = envMap || this.envMap;
			});
		}
	}

	setViewOrientation(view) {
		const message = this.requestInfoResult;
		this.requestInfoResult = null;
		if (this.orbitService) {
			this.orbitService.mode = view.type.name;
			if (!this.renderer.xr.isPresenting) {
				if (message) {
					this.orbitService.setOrientation(message.orientation);
					this.orbitService.zoom = message.zoom;
					this.camera.updateProjectionMatrix();
				} else if (!view.keepOrientation) {
					this.orbitService.setOrientation(view.orientation);
					this.orbitService.zoom = view.zoom;
					this.camera.updateProjectionMatrix();
				}
			}
		}
	}

	addControllers() {
		const controllerGroup = this.controllerGroup = new THREE.Group();
		this.controllers = [];
		this.controllerModelFactory = new XRControllerModelFactory();
		this.addController(0);
		this.addController(1);
		this.cameraGroup.add(controllerGroup);
	}

	addController(index) {
		const showPhone = USE_PHONE && StateService.state.live;
		const renderer = this.renderer;
		const controllerGroup = this.controllerGroup;
		const controller = renderer.xr.getController(index);
		const controllerModelFactory = this.controllerModelFactory;
		controller.name = `[controller${index + 1}]`;
		controllerGroup.add(controller);
		const setController = (controller) => {
			// console.log('setController', this);
			this.controller = controller;
		}
		const onSelectStart = (event) => {
			controller.userData.isSelecting = true;
			setController(controller);
		};
		const onSelectEnd = (event) => {
			controller.userData.isSelecting = false;
		};
		// const debugService = DebugService.getService();
		// debugService.setMessage('DebugService 1001');
		const onPress = (event) => {
			// console.log('Gamepad.onPress', event, controller);
			// debugService.setMessage('Gamepad.onPress ' + event.index);
			// 0: select
			// 1: squeeze
			// 4: x / a
			// 5: y / b
			switch (event.index) {
				case 0:
					// select
					break;
				case 1:
					// squeeze
					break;
				case 4:
					// x / a
					MessageService.send({
						type: MessageType.MenuToggle,
					});
					break;
			}
		};
		const onRelease = (event) => {
			this.onModelUp();
		};
		const onLeft = (event) => {
			// console.log('Gamepad.onLeft', event, controller);
			// debugService.setMessage('Gamepad.onLeft');
			this.cameraGroup.rotation.y += Math.PI / 180 * 45;
		};
		const onRight = (event) => {
			// console.log('Gamepad.onRight', event, controller);
			// debugService.setMessage('Gamepad.onRight');
			this.cameraGroup.rotation.y -= Math.PI / 180 * 45;
		};
		/*
		const onAxis = (event) => {
			// console.log('Gamepad.onAxis', event, controller);
			// debugService.setMessage('Gamepad.onAxis');
			this.cameraGroup.rotation.y += (Math.PI / 180 * event.x);
		};
		*/
		const onAxis = (event) => {
			// console.log('Gamepad.onAxis', event, controller);
			// debugService.setMessage('Gamepad.onAxis');
			this.onModelDistance(event.y);
		};
		/*
		const onUp = (event) => {
			// console.log('Gamepad.onUp', event, controller);
			// debugService.setMessage('Gamepad.onUp');
			this.cameraGroup.position.y += 1;
		};
		const onDown = (event) => {
			// console.log('Gamepad.onDown', event, controller);
			// debugService.setMessage('Gamepad.onDown');
			this.cameraGroup.position.y -= 1;
		};
		*/
		/*
		const onUp = (event) => {
			this.onModelDistance(1);
		};
		const onDown = (event) => {
			this.onModelDistance(-1);
		};
		*/
		const onConnected = (event) => {
			controller.add(this.buildController(event.data));
			if (showPhone && event.data.handedness === 'left') {
				const phone = this.phone = new PhoneElement();
				controller.add(phone.mesh);
			}
			if (!showPhone || event.data.handedness === 'right') {
				const controllerGrip = renderer.xr.getControllerGrip(index);
				controllerGrip.name = `[controller-grip${index + 1}]`;
				controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
				controllerGroup.add(controllerGrip);
			}
			const gamepad = new Gamepad(event.data.gamepad);
			gamepad.on('press', onPress);
			gamepad.on('release', onRelease);
			gamepad.on('left', onLeft);
			gamepad.on('right', onRight);
			gamepad.on('axis', onAxis);
			// gamepad.on('up', onUp);
			// gamepad.on('down', onDown);
			controller.userData.gamepad = gamepad;
		}
		const onDisconnected = (event) => {
			while (controller.children.length) {
				controller.remove(controller.children[0]);
			}
			const controllerGrip = renderer.xr.getControllerGrip(index);
			while (controllerGrip.children.length) {
				controllerGrip.remove(controllerGrip.children[0]);
			}
			controllerGroup.remove(controllerGrip);
			const gamepad = controller.userData.gamepad;
			gamepad.off('press', onPress);
			gamepad.off('release', onRelease);
			gamepad.off('left', onLeft);
			gamepad.off('right', onRight);
			gamepad.off('axis', onAxis);
			// gamepad.off('up', onUp);
			// gamepad.off('down', onDown);
		}
		controller.addEventListener('selectstart', onSelectStart);
		controller.addEventListener('selectend', onSelectEnd);
		controller.addEventListener('connected', onConnected);
		controller.addEventListener('disconnected', onDisconnected);
		const controllers = this.controllers;
		controllers.push(controller);
	}

	buildController(data) {
		// console.log('buildController', data);
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

	onModelDown(event) {
		// vr controller model grab
		const controller = this.controller;
		if (controller && this.renderer.xr.isPresenting) {
			const target = this.tempTarget = event.mesh;
			// console.log('WorldComponent.onModelDown', target);
			// DebugService.getService().setMessage('onModelDown ', target.name);
			const parent = this.tempParent = target.parent;
			const position = new THREE.Vector3();
			target.localToWorld(position);
			controller.worldToLocal(position);
			controller.add(target);
			target.position.copy(position);
		}
	}

	onModelDistance(direction) {
		// vr controller model distance
		const controller = this.controller;
		const target = this.tempTarget;
		if (controller && target && this.renderer.xr.isPresenting) {
			let position = new THREE.Vector3();
			position = position.copy(target.position);
			const distance = Math.max(1, Math.min(8, position.distanceTo(ORIGIN) + 0.02 * direction));
			position.normalize();
			position = position.multiplyScalar(distance);
			// DebugService.getService().setMessage('onModelDistance ' + distance);
			target.position.copy(position);
		}
	}

	onModelUp() {
		// vr controller model release
		const target = this.tempTarget;
		const parent = this.tempParent;
		if (target && parent) {
			// console.log('WorldComponent.onModelUp', target, parent);
			const position = new THREE.Vector3();
			target.localToWorld(position);
			parent.worldToLocal(position);
			parent.add(target);
			target.position.copy(position);
			this.tempTarget = null;
			this.tempParent = null;
		}
	}

	onTween() {
		// this.render();
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
					this.indicator.update();
					/*
					if (hit && hit !== this.panorama.mesh) {
						// controllers.feedback();
					}
					*/
				}
			} else if (!this.dragItem && !this.resizeItem) {
				return; // !!!
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
			const isPresenting = renderer.xr.isPresenting;
			if (!isPresenting && (StateService.state.mode === UIMode.LiveMeeting)) {
				// !!! || (StateService.state.remoteScreen !== null)
				return;
			}
			const time = performance.now();
			const tick = this.tick_ ? ++this.tick_ : this.tick_ = 1;
			this.raycasterXRHitTest();
			this.scene.traverse((child) => {
				if (typeof child.userData.render === 'function') {
					child.userData.render(time, tick);
				}
			});
			this.vrService.updateState(this);
			Object.keys(this.avatars).forEach(key => {
				this.avatars[key].render();
			});
			if (isPresenting) {
				gsap.ticker.tick();
				this.controllers.forEach(controller => {
					controller.userData.gamepad.update();
				});
			} else {
				this.navWithKeys();
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
				this.orbitService.render();
			}
		} catch (error) {
			this.error = error;
			// throw (error);
		}
	}

	navWithKeys() {
		if (this.view && this.view.type.name === ViewType.Room3d.name && this.view.mesh) {
			this.intersectObjects = this.view.intersectObjects;
			const velocity = this.velocity || (this.velocity = new THREE.Vector3());
			const direction = this.direction || (this.direction = new THREE.Vector3());
			const camera = this.camera;
			const speed = 0.1;
			if (this.keys.w) {
				camera.getWorldDirection(direction);
				direction.multiplyScalar(speed);
				velocity.copy(direction);
			} else if (this.keys.s) {
				camera.getWorldDirection(direction);
				direction.multiplyScalar(-speed);
				velocity.copy(direction);
			} else if (this.keys.d) {
				camera.getWorldDirection(direction);
				direction.multiplyScalar(speed);
				const axisY = this.axisY || (this.direction = new THREE.Vector3(0, 1, 0));
				const angle = -Math.PI / 2;
				direction.applyAxisAngle(axisY, angle);
				velocity.copy(direction);
			} else if (this.keys.a) {
				camera.getWorldDirection(direction);
				direction.multiplyScalar(-speed);
				const axisY = this.axisY || (this.direction = new THREE.Vector3(0, 1, 0));
				const angle = -Math.PI / 2;
				direction.applyAxisAngle(axisY, angle);
				velocity.copy(direction);
			}
			const manhattanLength = velocity.manhattanLength();
			if (manhattanLength > 0.00001) {
				// console.log(velocity.x, velocity.y, velocity.z);
				direction.copy(this.cameraGroup.position);
				direction.add(velocity);
				direction.y = 0;
				const raycaster = this.raycaster;
				raycaster.set(direction, DOWN);
				const intersects = raycaster.intersectObjects(this.view.navIntersectObjects);
				if (intersects.length) {
					// console.log(manhattanLength, intersects);
					this.cameraGroup.position.add(velocity);
					this.cameraGroup.position.y = 0;
				}
				velocity.lerp(ORIGIN, 0.1);
			}
		} else {
			this.intersectObjects = this.panoramaIntersectObjects;
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

	raycasterXRHitTest() {
		if (this.renderer.xr.isPresenting) {
			const raycaster = this.updateRaycasterXR(this.controller, this.raycaster);
			if (raycaster) {
				const hit = Interactive.hittest(raycaster, this.controller.userData.isSelecting);
				this.indicator.update();
				/*
				if (hit && hit !== this.panorama.mesh) {
					// controllers.feedback();
				}
				*/
			}
		}
	}

	raycasterDesktopHitTest(event) {
		const raycaster = this.updateRaycasterMouse(event);
		if (this.lockedOrXR) {
			return;
		}
		if (this.dragItem) {
			if (typeof this.dragItem.onDragMove === 'function') {
				const intersections = raycaster.intersectObjects(this.intersectObjects);
				if (intersections.length) {
					const intersection = intersections[0];
					// this.panorama.mesh.intersection = intersection;
					const intersectionPoint = this.intersectionPoint || (this.intersectionPoint = new THREE.Vector3());
					const intersectionNormal = this.intersectionNormal || (this.intersectionNormal = new THREE.Vector3());
					const position = intersectionPoint.copy(intersection.point);
					const normal = intersectionNormal.copy(intersection.face.normal);
					this.dragItem.onDragMove(position, normal, this.intersectObjects === this.panoramaIntersectObjects);
				}
			}
		} else if (this.resizeItem) {
			if (typeof this.resizeItem.onResizeMove === 'function') {
				/*
				// calc arc x & y as scale;
				const intersections = raycaster.intersectObjects(this.intersectObjects);
				if (intersections.length) {
					const intersection = intersections[0];
					// this.panorama.mesh.intersection = intersection;
					const position = new THREE.Vector3().copy(intersection.point).normalize();
					this.resizeItem.onResizeMove(position);
				}
				*/
			}
		} else {
			const hit = Interactive.hittest(raycaster);
			/*
			if (hit && hit !== this.panorama.mesh) {
				// console.log('hit', hit);
			}
			*/
			this.controlEvent$.next(this.control);
		}
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
					const intersections = raycaster.intersectObjects(this.intersectObjects);
					if (intersections.length) {
						const intersection = intersections[0];
						const intersectionPoint = this.intersectionPoint || (this.intersectionPoint = new THREE.Vector3());
						const intersectionNormal = this.intersectionNormal || (this.intersectionNormal = new THREE.Vector3());
						const position = intersectionPoint.copy(intersection.point);
						const normal = intersectionNormal.copy(intersection.face.normal);
						this.viewHit.next({ position, normal, spherical: this.intersectObjects === this.panoramaIntersectObjects });
					}
					/*
					if (this.panorama.mesh.intersection) {
						const position = new THREE.Vector3().copy(this.panorama.mesh.intersection.point).normalize();
						console.log(JSON.stringify({ position: position.toArray() }));
						this.viewHit.next(position);
					}
					*/
				}
			}
		} catch (error) {
			this.error = error;
			// throw (error);
		}
	}

	onMouseMove(event) {
		try {
			this.raycasterDesktopHitTest(event);
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
			const raycaster = this.updateRaycasterMouse(event);
			const hit = Interactive.hittest(raycaster, false);
			this.checkSelectedItem();
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
			const deltaY = event.deltaY * (event.wheelDeltaY !== undefined ? 1 : 37);
			const orbitService = this.orbitService;
			gsap.to(orbitService, {
				duration: 0.5,
				zoom: orbitService.zoom + deltaY * 0.1,
				ease: Power4.easeOut,
				overwrite: true,
			});
		} catch (error) {
			this.error = error;
			// throw (error);
		}
	}

	onOrientationDidChange() {
		this.controlEvent$.next(this.control);
	}

	checkSelectedItem() {
		if (this.view) {
			const selected = this.view.items.find(item => item.selected);
			if (selected && selected.mesh) {
				if (this.view.type.name !== 'model') {
					this.orbitService.lookAt(selected.mesh);
				}
			}
		}
	}

	onVRStarted() {
		// this.objects.rotation.y = - Math.PI / 2;
		this.objects.position.y = 1.3;
		this.scene.add(this.indicator.mesh);
		MessageService.send({
			type: MessageType.VRStarted,
		});
	}

	onVREnded() {
		// this.objects.rotation.y = 0;
		this.objects.position.y = 0;
		this.cameraGroup.rotation.y = 0;
		this.cameraGroup.position.y = 0;
		this.scene.remove(this.indicator.mesh);
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
		this.navTo.next({ viewId: event.id });
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

	onNavOver(nav) {
		// console.log('WorldComponent.onNavOver', nav);
		if (this.menu) {
			return;
			// this.menu.removeMenu();
		}
		this.view.items.forEach(item => item.showPanel = false);
		nav.item.showPanel = nav.shouldShowPanel();
		this.pushChanges();
		MessageService.send({
			type: MessageType.ShowPanel,
			itemId: nav.item.showPanel ? nav.item.id : null,
		});
	}

	onNavOut(nav) {
		// console.log('WorldComponent.onNavOut', nav);
		// nav.item.showPanel = false;
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
			this.navTo.next(event.item);
		}
	}

	onObjectDown(event) {
		// console.log('WorldComponent.onObjectDown', this.keys);
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

	onPlayMedia(event) {
		MessageService.send({
			type: MessageType.PlayMedia,
			itemId: event.itemId,
			playing: event.playing,
		});
	}

	onPlayModel(event) {
		MessageService.send({
			type: MessageType.PlayModel,
			itemId: event.itemId,
			actionIndex: event.actionIndex,
		});
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
		this.view.items = [];
		// this.loading = LOADING_BANNER;
		this.pushChanges();
		this.orbitService.walk(event.position, (headingLongitude, headingLatitude) => {
			const tile = this.view.getTile(event.indices.x, event.indices.y);
			if (tile) {
				this.panorama.crossfade(tile, this.renderer, (envMap, texture, rgbe) => {
					// this.scene.background = envMap;
					this.scene.environment = envMap || this.envMap;
					this.orbitService.walkComplete(headingLongitude, headingLatitude);
					this.view.updateCurrentItems();
					// this.loading = null;
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

	control$() {
		return this.controlEvent$.pipe(
			filter(() => this.controlling || this.spyed || this.editor),
			auditTime(40),
			tap((control) => {
				control.orientation.latitude = this.orbitService.latitude;
				control.orientation.longitude = this.orbitService.longitude;
				control.zoom = this.orbitService.zoom;
				const intersections = this.raycaster.intersectObjects(this.intersectObjects);
				const point = intersections.length ? intersections[0].point.normalize() : null;
				if (point) {
					control.pointer[0] = point.x;
					control.pointer[1] = point.y;
					control.pointer[2] = point.z;
				}
				MessageService.send(control);
			}),
		);
	}

	addListeners() {
		this.control = {
			type: MessageType.ControlInfo,
			orientation: { latitude: 0, longitude: 0 },
			zoom: 1,
			pointer: [0, 0, 0],
		};
		this.controlEvent$ = new ReplaySubject(1);
		this.control$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe();
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
		const orbit$ = this.orbitService.observe$(this.container).pipe(
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
				case MessageType.RequestInfo:
					message.type = MessageType.RequestInfoResult;
					message.viewId = this.view.id;
					message.orientation = this.orbitService.getOrientation();
					message.zoom = this.orbitService.zoom;
					if (this.view instanceof PanoramaGridView) {
						message.gridIndex = this.view.index;
					}
					// console.log('WorldComponent', 'MessageType.RequestInfo', 'from', message.clientId, 'to', StateService.state.uid, message.orientation);
					MessageService.sendBack(message);
					if (StateService.state.role !== RoleType.Publisher) {
						StateService.patchState({ spying: message.remoteId });
						// console.log('WorldComponent.MessageService.out$.RequestInfo', StateService.state.spying, message.remoteId);
					}
					break;
				case MessageType.RequestInfoResult:
					// console.log('WorldComponent', 'MessageType.RequestInfoResult', 'from', message.clientId, 'to', StateService.state.uid, message.orientation);
					if (ViewService.viewId !== message.viewId) {
						ViewService.viewId = message.viewId;
						this.requestInfoResult = message;
					} else {
						this.orbitService.setOrientation(message.orientation);
						if (!this.renderer.xr.isPresenting) {
							this.orbitService.zoom = message.zoom;
							this.camera.updateProjectionMatrix();
						}
						if (this.view instanceof PanoramaGridView && message.gridIndex) {
							this.view.index = message.gridIndex;
						}
						if (!this.view || !this.view.ready) {
							this.requestInfoResult = message;
						}
					}
					break;
				case MessageType.ShowPanel:
					if (this.menu) {
						this.menu.removeMenu();
					}
					this.view.items.forEach(item => item.showPanel = (item.id === message.itemId));
					this.pushChanges();
					break;
				case MessageType.PlayMedia: {
					// !!! uniformare a PlayModel
					const item = this.view.items.find(item => item.id === message.itemId);
					if (item && item.mesh instanceof MediaMesh) {
						item.mesh.setPlayingState(message.playing);
					}
					break;
				}
				case MessageType.PlayModel: {
					const item = this.view.items.find(item => item.id === message.itemId);
					if (item) {
						item.onMessage(message);
					}
					break;
				}
				case MessageType.NavToGrid:
					// console.log('WorldComponent.NavToGrid', this.view.id, message);
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
					if (StateService.state.spying === message.clientId) {
						this.orbitService.setVRCamera(message.camera);
					}
					break;
				case MessageType.ControlInfo:
					if (!this.renderer.xr.isPresenting) {
						this.orbitService.setOrientation(message.orientation);
						this.orbitService.zoom = message.zoom;
						// this.camera.updateProjectionMatrix();
						// this.render();
					}
					this.pointer.setPosition(message.pointer[0], message.pointer[1], message.pointer[2]);
					break;
			}
		});
		MessageService.in$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(message => {
			switch (message.type) {
				case MessageType.SelectItem:
					this.checkSelectedItem();
					break;
			}
		});
		StateService.state$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(state => {
			this.state = state;
			this.showPointer = this.locked;
			// console.log(state);
			// this.pushChanges();
		});
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
	outputs: ['navTo', 'viewHit', 'dragEnd', 'resizeEnd', 'select'],
};
