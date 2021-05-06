// import * as THREE from 'three';

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

}
