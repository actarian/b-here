import { combineLatest, ReplaySubject } from 'rxjs';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
// import * as THREE from 'three';
import DragService, { DragDownEvent, DragMoveEvent, DragUpEvent } from '../../drag/drag.service';
import KeyboardService from '../../keyboard/keyboard.service';
import StateService from '../../state/state.service';
import { RoleType } from '../../user/user';
import { ViewType } from '../../view/view';
import { ViewService } from '../../view/view.service';

// https://github.com/google/model-viewer/blob/master/packages/model-viewer/src/three-components/SmoothControls.ts

export const OrbitMode = {
	Panorama: 'panorama',
	PanoramaGrid: 'panorama-grid',
	Model: 'model',
};

export class OrbitEvent { }
export class OrbitDragEvent extends OrbitEvent { }
export class OrbitResizeEvent extends OrbitEvent { }
export class OrbitMoveEvent extends OrbitEvent { }
const orbitMoveEvent = new OrbitMoveEvent();
const orbitDragEvent = new OrbitDragEvent();
const orbitResizeEvent = new OrbitResizeEvent();

export const USE_DOLLY = false;
export const DOLLY_MIN = 15;
export const DOLLY_MAX = 75; // 115
export const ZOOM_MIN = 15;
export const ZOOM_MAX = 75;

export default class OrbitService {

	get dolly() {
		return this.dolly_;
	}
	set dolly(dolly) {
		const clampedDolly = THREE.Math.clamp(dolly, DOLLY_MIN, DOLLY_MAX);
		if (this.dolly_ !== clampedDolly) {
			this.dolly_ = clampedDolly;
			this.markAsDirty();
		}
	}
	getDollyValue() {
		return (1 - (this.dolly_ - DOLLY_MIN) / (DOLLY_MAX - DOLLY_MIN)) - 0.5;
	}

	get zoom() {
		return this.zoom_;
	}
	set zoom(zoom) {
		const clampedDolly = THREE.Math.clamp(zoom, DOLLY_MIN, DOLLY_MAX);
		if (this.zoom_ !== clampedDolly) {
			this.zoom_ = clampedDolly;
			this.markAsDirty();
		}
	}
	getZoomValue() {
		return 1 + 1 - (this.zoom_ - ZOOM_MIN) / (ZOOM_MAX - ZOOM_MIN);
	}

	get mode() {
		return this.mode_;
	}
	set mode(mode) {
		if (this.mode_ !== mode) {
			this.mode_ = mode;
			OrbitService.mode = mode;
			this.markAsDirty();
		}
	}

	get controlled() {
		return (StateService.state.controlling && StateService.state.controlling !== StateService.state.uid);
	}

	get controlling() {
		return (StateService.state.controlling && StateService.state.controlling === StateService.state.uid);
	}

	get silencing() {
		return StateService.state.silencing;
	}

	get silenced() {
		return (StateService.state.silencing && StateService.state.role === RoleType.Streamer);
	}

	get spyed() {
		return (StateService.state.spying && StateService.state.spying === StateService.state.uid);
	}

	get spying() {
		return (StateService.state.spying && StateService.state.spying !== StateService.state.uid);
	}

	get isMediaView() {
		const currentView = ViewService.currentView;
		return currentView && currentView.type.name === ViewType.Media.name;
	}

	get locked() {
		return this.controlled || this.spying || this.isMediaView;
	}

	constructor(camera) {
		this.mode_ = OrbitService.mode = OrbitMode.Panorama;
		this.dolly_ = 70;
		this.zoom_ = 70;
		this.longitude = 0;
		this.latitude = 0;
		this.direction = 1;
		this.radius = 101;
		this.position = new THREE.Vector3();
		// this.speed = 1;
		this.inertia = new THREE.Vector2();
		this.rotation = new THREE.Euler(0, 0, 0, 'XYZ');
		this.target = new THREE.Vector3();
		this.updatePosition = new THREE.Vector3();
		this.updateTarget = new THREE.Vector3();
		this.camera = camera;
		this.setLongitudeLatitude(0, 0);
		this.events$ = new ReplaySubject(1);
	}

	setOrientation(orientation) {
		if (orientation) {
			this.setLongitudeLatitude(orientation.longitude, orientation.latitude);
			this.markAsDirty();
		}
	}

	getOrientation() {
		return {
			latitude: this.latitude,
			longitude: this.longitude,
		};
	}

	setLongitudeLatitude(longitude, latitude) {
		latitude = Math.max(-80, Math.min(80, latitude));
		this.longitude = (longitude < 0 ? 360 + longitude : longitude) % 360;
		this.latitude = latitude;
		// console.log(this.longitude);
		const phi = THREE.Math.degToRad(90 - latitude);
		const theta = THREE.Math.degToRad(longitude);
		this.phi = phi;
		this.theta = theta;
	}

	observe$(node) {
		// const camera = this.camera;
		let latitude, longitude;
		return combineLatest([KeyboardService.keys$(), DragService.observe$(node)]).pipe(
			filter(event => !this.locked),
			map((datas) => {
				const keys = datas[0];
				const event = datas[1];
				// const group = this.objects.children[this.index];
				if (event instanceof DragDownEvent) {
					latitude = this.latitude;
					longitude = this.longitude;
				} else if (event instanceof DragMoveEvent) {
					if (keys.Shift) {
						this.events$.next(orbitDragEvent);
					} else if (keys.Control) {
						this.events$.next(orbitResizeEvent);
					} else {
						const flip = this.mode_ === OrbitMode.Model ? -1 : 1;
						this.setLongitudeLatitude(longitude - event.distance.x * 0.1 * flip, latitude + event.distance.y * 0.1);
					}
				} else if (event instanceof DragUpEvent) {

				}
				return event;
			}),
			filter(event => event instanceof DragMoveEvent),
			startWith({ latitude: this.latitude, longitude: this.longitude }),
			tap(event => this.markAsDirty()),
			switchMap(event => this.events$),
		);
	}

	walk(position, callback) {
		let radius;
		switch (this.mode_) {
			case OrbitMode.Model:
				radius = 3;
				break;
			default:
				radius = this.radius;
		}
		const heading = new THREE.Vector2(position.x, position.y).normalize().multiplyScalar(radius);
		const headingTheta = Math.atan2(heading.y, heading.x);
		let headingLongitude = THREE.MathUtils.radToDeg(headingTheta);
		headingLongitude = (headingLongitude < 0 ? 360 + headingLongitude : headingLongitude) % 360;
		const headingLatitude = 0;
		const latitude = this.latitude;
		const longitude = this.longitude;
		let differenceLongitude = (headingLongitude - longitude);
		differenceLongitude = Math.abs(differenceLongitude) > 180 ? (differenceLongitude - 360 * (differenceLongitude / Math.abs(differenceLongitude))) : differenceLongitude;
		let differenceLatitude = (headingLatitude - latitude);
		differenceLatitude = Math.abs(differenceLatitude) > 90 ? (differenceLatitude - 90 * (differenceLatitude / Math.abs(differenceLatitude))) : differenceLatitude;
		// console.log('headingTheta', headingTheta, 'headingLongitude', headingLongitude, 'differenceLongitude', differenceLongitude);
		const from = { tween: 0 };
		gsap.to(from, {
			duration: 0.7,
			tween: 1,
			delay: 0,
			ease: Power2.easeInOut,
			onUpdate: () => {
				this.setLongitudeLatitude(longitude + differenceLongitude * from.tween, latitude + differenceLatitude * from.tween);
				this.position.set(position.x * from.tween, 0, position.y * from.tween);
				this.markAsDirty();
			},
			onComplete: () => {
				// this.walkComplete(headingLongitude, headingLatitude);
				if (typeof callback === 'function') {
					callback(headingLongitude, headingLatitude);
				}
			}
		});
	}

	walkComplete(headingLongitude, headingLatitude) {
		this.setLongitudeLatitude(headingLongitude, headingLatitude);
		this.position.set(0, 0, 0);
		this.markAsDirty();
	}

	lookAt(object) {
		// console.log('OrbitService.lookAt', object);
		if (object) {
			let position = object.position.clone();
			const camera = this.camera;
			const cameraGroup = camera.parent;
			position = cameraGroup.worldToLocal(position);
			let radius;
			switch (this.mode_) {
				case OrbitMode.Model:
					radius = 3;
					break;
				default:
					radius = this.radius;
			}
			const heading = new THREE.Vector3(position.x, position.z, position.y).normalize().multiplyScalar(radius);
			const theta = Math.atan2(heading.y, heading.x);
			const phi = Math.acos(heading.z / radius);
			let longitude = THREE.MathUtils.radToDeg(theta);
			longitude = (longitude < 0 ? 360 + longitude : longitude) % 360;
			let latitude = 90 - THREE.MathUtils.radToDeg(phi);
			latitude = Math.max(-80, Math.min(80, latitude));
			this.setLongitudeLatitude(longitude, latitude);
			this.markAsDirty();
		}
	}

	setVRCamera(camera) {
		if (camera) {
			const radius = this.radius;
			const position = new THREE.Vector3(0, 0, -radius);
			const quaternion = new THREE.Quaternion(camera[3], camera[4], camera[5], camera[6]);
			position.applyQuaternion(quaternion);
			const heading = new THREE.Vector3(position.x, position.z, position.y).normalize().multiplyScalar(radius);
			const theta = Math.atan2(heading.y, heading.x);
			const phi = Math.acos(heading.z / radius);
			let longitude = THREE.MathUtils.radToDeg(theta);
			longitude = (longitude < 0 ? 360 + longitude : longitude) % 360;
			let latitude = 90 - THREE.MathUtils.radToDeg(phi);
			latitude = Math.max(-80, Math.min(80, latitude));
			this.setLongitudeLatitude(longitude, latitude);
			this.markAsDirty();
		}
	}

	render() {
		// slowly rotate scene when not hosted
		if (!StateService.state.hosted) {
			this.longitude += 0.025;
			this.isDirty = true;
		}
		if (this.isDirty) {
			this.isDirty = false;
			this.update();
		}
	}

	markAsDirty() {
		this.isDirty = true;
	}

	update() {
		let radius, position = this.updatePosition, target = this.updateTarget;
		const zoom = this.getZoomValue();
		const dolly = this.getDollyValue();
		// console.log('dolly', dolly);
		const phi = THREE.MathUtils.degToRad(90 - this.latitude);
		const theta = THREE.MathUtils.degToRad(this.longitude);
		const camera = this.camera;
		const cameraGroup = camera.parent;
		switch (this.mode_) {
			case OrbitMode.Model:
				radius = USE_DOLLY ? 3 + 3 * dolly : 3;
				position.copy(this.position);
				target.x = this.position.x + radius * Math.sin(phi) * Math.cos(theta);
				target.y = this.position.y + radius * Math.cos(phi);
				target.z = this.position.z + radius * Math.sin(phi) * Math.sin(theta);
				// position = cameraGroup.worldToLocal(position);
				target = cameraGroup.worldToLocal(target);
				camera.target.copy(position);
				camera.position.copy(target);
				break;
			default:
				radius = this.radius;
				target.x = this.position.x + radius * Math.sin(phi) * Math.cos(theta);
				target.y = this.position.y + radius * Math.cos(phi);
				target.z = this.position.z + radius * Math.sin(phi) * Math.sin(theta);
				if (USE_DOLLY) {
					position.copy(target).position.multiplyScalar(-1 * dolly);
				} else {
					position.copy(this.position);
				}
				// !!! position for walking panorama-grid
				// position = cameraGroup.worldToLocal(position);
				target = cameraGroup.worldToLocal(target);
				// camera.position.copy(position);
				camera.target.copy(target);
				camera.position.copy(position);
		}
		// console.log(camera.position.x, camera.position.y, camera.position.z);
		// console.log(camera.target.x, camera.target.y, camera.target.z);
		// console.log('phi', phi, 'theta', theta);
		// this.inverse();
		if (!USE_DOLLY) {
			camera.zoom = zoom;
		}
		camera.lookAt(camera.target);
		camera.updateProjectionMatrix();
		const currentView = ViewService.currentView;
		if (currentView) {
			currentView.lastOrientation.longitude = this.longitude;
			currentView.lastOrientation.latitude = this.latitude;
		}
		this.events$.next(orbitMoveEvent);
	}

}

OrbitService.orbitMoveEvent = orbitMoveEvent;
