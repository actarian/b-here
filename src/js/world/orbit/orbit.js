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
		this.radius = 101;
		this.position = new THREE.Vector3();
		// this.speed = 1;
		this.inertia = new THREE.Vector2();
		this.rotation = new THREE.Euler(0, 0, 0, 'XYZ');
		this.target = new THREE.Vector3();
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
					const flip = this.mode_ === OrbitMode.Model ? -1 : 1;
					this.setLongitudeLatitude(longitude - event.distance.x * 0.1 * flip, latitude + event.distance.y * 0.1);
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
		switch (this.mode_) {
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
		// console.log('phi', phi, 'theta', theta);
		// this.inverse();
		camera.lookAt(camera.target);
		this.events$.next(this);
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
		console.log('phi', phi, 'theta', theta);
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
		const from = { pow: 0 };
		gsap.to(from, 0.7, {
			pow: 1,
			delay: 0,
			ease: Power2.easeInOut,
			onUpdate: () => {
				this.setLongitudeLatitude(longitude + differenceLongitude * from.pow, latitude + differenceLatitude * from.pow);
				this.position.set(position.x * from.pow, 0, position.y * from.pow);
				this.update();
			},
			onComplete: () => {
				this.setLongitudeLatitude(headingLongitude, headingLatitude);
				this.position.set(0, 0, 0);
				this.update();
				if (typeof callback === 'function') {
					callback();
				}
			}
		});
	}

}
