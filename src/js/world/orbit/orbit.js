import { ReplaySubject } from 'rxjs';
import { filter, startWith, switchMap, tap } from 'rxjs/operators';
import * as THREE from 'three';
import DragService, { DragDownEvent, DragMoveEvent, DragUpEvent } from '../../drag/drag.service';
import { EDITOR } from '../../environment';

export const OrbitMode = {
	Panorama: 'panorama',
	PanoramaGrid: 'panorama-grid',
	Model: 'model',
};

export class OrbitEvent { }
export class OrbitDragEvent extends OrbitEvent { }
export class OrbitMoveEvent extends OrbitEvent { }
const orbitMoveEvent = new OrbitMoveEvent();
const orbitDragEvent = new OrbitDragEvent();

export const USE_DOLLY = false;
export const DOLLY_MIN = 15;
export const DOLLY_MAX = 75;
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
			this.update();
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
			this.update();
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
			this.update();
		}
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
			this.update();
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

	setDragListener(container) {
		let longitude, latitude;
		const dragListener = new DragListener(this.container, (event) => {
			longitude = this.longitude;
			latitude = this.latitude;
		}, (event) => {
			const flip = this.mode_ === OrbitMode.Model ? -1 : 1;
			const direction = event.distance.x ? (event.distance.x / Math.abs(event.distance.x) * -1) : 1;
			this.direction = direction;
			const lon = longitude - event.distance.x * 0.1 * flip;
			const lat = latitude + event.distance.y * 0.1;
			this.setInertia(lon, lat);
			this.setLongitudeLatitude(lon, lat);
			// console.log('longitude', this.longitude, 'latitude', this.latitude, 'direction', this.direction);
		}, (event) => {
			// this.speed = Math.abs(event.strength.x) * 100;
			// console.log('speed', this.speed);
		});
		dragListener.move = () => { };
		this.dragListener = dragListener;
		return dragListener;
	}

	setInertia(longitude, latitude) {
		const inertia = this.inertia;
		inertia.x = (longitude - this.longitude) * 1;
		inertia.y = (latitude - this.latitude) * 1;
		this.inertia = inertia;
		// console.log(this.inertia);
	}

	updateInertia() {
		const inertia = this.inertia;
		inertia.multiplyScalar(0.95);
		this.inertia = inertia;
		/*
		let speed = this.speed;
		speed = Math.max(1, speed * 0.95);
		this.speed = speed;
		*/
	}

	update_() {
		if (this.dragListener && !this.dragListener.dragging) {
			this.setLongitudeLatitude(this.longitude + this.inertia.x, this.latitude + this.inertia.y);
			this.updateInertia();
		}
	}

	observe$(node) {
		const camera = this.camera;
		let latitude, longitude;
		return DragService.events$(node).pipe(
			tap((event) => {
				// const group = this.objects.children[this.index];
				if (event instanceof DragDownEvent) {
					latitude = this.latitude;
					longitude = this.longitude;
				} else if (event instanceof DragMoveEvent) {
					if (EDITOR && event.shiftKey) {
						// console.log('shifting!');
						this.events$.next(orbitDragEvent);
					} else {
						const flip = this.mode_ === OrbitMode.Model ? -1 : 1;
						this.setLongitudeLatitude(longitude - event.distance.x * 0.1 * flip, latitude + event.distance.y * 0.1);
					}
				} else if (event instanceof DragUpEvent) {

				}
			}),
			filter(event => event instanceof DragMoveEvent),
			startWith({ latitude: this.latitude, longitude: this.longitude }),
			tap(event => this.update()),
			switchMap(event => this.events$),
		);
	}

	update() {
		let radius, position = this.updatePosition, target = this.updateTarget;
		const zoom = this.getZoomValue();
		const dolly = this.getDollyValue();
		// console.log('dolly', dolly);
		const phi = THREE.MathUtils.degToRad(90 - this.latitude);
		const theta = THREE.MathUtils.degToRad(this.longitude);
		const camera = this.camera;
		switch (this.mode_) {
			case OrbitMode.Model:
				radius = USE_DOLLY ? 3 + 3 * dolly : 3;
				position.copy(this.position);
				target.x = this.position.x + radius * Math.sin(phi) * Math.cos(theta);
				target.y = this.position.y + radius * Math.cos(phi);
				target.z = this.position.z + radius * Math.sin(phi) * Math.sin(theta);
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
				camera.position.copy(position);
				camera.target.copy(target);
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
		this.events$.next(orbitMoveEvent);
	}

	inverse() {
		let position, radius;
		switch (this.mode_) {
			case OrbitMode.Model:
				radius = 3;
				position = this.camera.position;
				break;
			default:
				radius = this.radius;
				position = this.camera.target;
		}
		radius = Math.sqrt(position.x * position.x + position.y * position.y + position.z * position.z);
		const phi = Math.acos(position.y / radius);
		const theta = Math.atan2(position.z, position.x);
		// console.log('phi', phi, 'theta', theta);
	}

	render() {
		this.longitude += 0.025;
		this.update();
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
		gsap.to(from, 0.7, {
			tween: 1,
			delay: 0,
			ease: Power2.easeInOut,
			onUpdate: () => {
				this.setLongitudeLatitude(longitude + differenceLongitude * from.tween, latitude + differenceLatitude * from.tween);
				this.position.set(position.x * from.tween, 0, position.y * from.tween);
				this.update();
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
		this.update();
	}

}
