// import * as THREE from 'three';

export const PANORAMA_RADIUS = 101;

export class Geometry {

	static get defaultGeometry() {
		return Geometry.defaultGeometry_ || (Geometry.defaultGeometry_ = new THREE.BoxBufferGeometry(1, 1, 1));
	}

	static get planeGeometry() {
		return Geometry.planeGeometry_ || (Geometry.planeGeometry_ = new THREE.PlaneBufferGeometry(1, 1, 2, 2));
	}

	static get sphereGeometry() {
		return Geometry.sphereGeometry_ || (Geometry.sphereGeometry_ = new THREE.SphereBufferGeometry(3, 12, 12));
	}

	static get panoramaGeometry() {
		return Geometry.panoramaGeometry_ || (Geometry.panoramaGeometry_ = new THREE.SphereBufferGeometry(PANORAMA_RADIUS, 36, 36)); // 101, 44, 30
		// return Geometry.panoramaGeometry_ || (Geometry.panoramaGeometry_ = new THREE.IcosahedronBufferGeometry(PANORAMA_RADIUS, 4)); // 101, 44, 30
		// return Geometry.panoramaGeometry_ || (Geometry.panoramaGeometry_ = new THREE.SphereBufferGeometry(PANORAMA_RADIUS, 40, 40)); // 101, 44, 30
	}

}
