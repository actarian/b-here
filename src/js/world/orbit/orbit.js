import { ReplaySubject } from 'rxjs';
import { filter, startWith, switchMap, tap } from 'rxjs/operators';
import DragService, { DragDownEvent, DragMoveEvent, DragUpEvent } from '../../drag/drag.service';

export const OrbitMode = {
	Panorama: 'panorama',
	PanoramaGrid: 'panorama-grid',
	Model: 'model',
};

export default class OrbitService {

	get mode() {
		return this.mode_;
	}

	set mode(mode) {
		if (this.mode_ !== mode) {
			this.mode_ = mode;
			this.update();
		}
	}

	constructor(camera) {
		this.mode_ = OrbitMode.Panorama;
		this.longitude = 0;
		this.latitude = 0;
		this.direction = 1;
		this.radius = 500;
		this.position = new THREE.Vector3();
		// this.speed = 1;
		this.inertia = new THREE.Vector2();
		this.rotation = new THREE.Euler(0, 0, 0, 'XYZ');
		this.target = new THREE.Vector3();
		this.camera = camera;
		this.set(0, 0);
		this.events$ = new ReplaySubject(1);
	}

	setOrientation(orientation) {
		if (orientation) {
			this.set(orientation.longitude, orientation.latitude);
			this.update();
		}
	}

	getOrientation() {
		return {
			latitude: this.latitude,
			longitude: this.longitude,
		};
	}

	set(longitude, latitude) {
		latitude = Math.max(-80, Math.min(80, latitude));
		this.longitude = longitude;
		this.latitude = latitude;
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
			const flip = this.mode_ === OrbitMode.Panorama ? 1 : -1;
			const direction = event.distance.x ? (event.distance.x / Math.abs(event.distance.x) * -1) : 1;
			this.direction = direction;
			const lon = longitude - event.distance.x * 0.1 * flip;
			const lat = latitude + event.distance.y * 0.1;
			this.setInertia(lon, lat);
			this.set(lon, lat);
			// console.log('longitude', this.longitude, 'latitude', this.latitude, 'direction', this.direction);
		}, (event) => {
			// this.speed = Math.abs(event.strength.x) * 100;
			// console.log('speed', this.speed);
		});
		dragListener.move = () => {};
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
			this.set(this.longitude + this.inertia.x, this.latitude + this.inertia.y);
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
					const flip = this.mode_ === OrbitMode.Panorama ? 1 : -1;
					this.set(longitude - event.distance.x * 0.1 * flip, latitude + event.distance.y * 0.1);
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
		let radius;
		const phi = THREE.MathUtils.degToRad(90 - this.latitude);
		const theta = THREE.MathUtils.degToRad(this.longitude);
		const camera = this.camera;
		switch(this.mode_) {
			case OrbitMode.Model:
				radius = 3;
				camera.target.copy(this.position);
				camera.position.x = this.position.x + radius * Math.sin(phi) * Math.cos(theta);
				camera.position.y = this.position.y + radius * Math.cos(phi);
				camera.position.z = this.position.z + radius * Math.sin(phi) * Math.sin(theta);
				break;
			default:
				radius = this.radius;
				camera.position.copy(this.position);
				camera.target.x = this.position.x + radius * Math.sin(phi) * Math.cos(theta);
				camera.target.y = this.position.y + radius * Math.cos(phi);
				camera.target.z = this.position.z + radius * Math.sin(phi) * Math.sin(theta);
		}
		camera.lookAt(camera.target);
		this.events$.next(this);
	}

	render() {
		this.longitude += 0.025;
		this.update();
	}

}
