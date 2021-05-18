// import * as THREE from 'three';

export const ORIGIN = new THREE.Vector3();

export class Host {

	static origin_ = new THREE.Vector3();
	static get origin() {
		const host = this.host;
		if (host) {
			const origin = this.origin_;
			origin.set(0, 0, 0);
			const camera = host.renderer.xr.isPresenting ? host.renderer.xr.getCamera(host.camera) : host.camera;
			camera.localToWorld(origin);
			// return host.cameraGroup.position;
		}
		return this.origin_;
	}

}
