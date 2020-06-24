import { environment } from "../../../environment/environment";
import { BASE_HREF } from "../../const";
import InteractiveMesh from "../interactive/interactive.mesh";
import { PANORAMA_RADIUS } from "../panorama/panorama";

const POINTER_RADIUS = PANORAMA_RADIUS - 0.01;
const ORIGIN = new THREE.Vector3();

export default class PointerElement {

	constructor() {
		const geometry = new THREE.PlaneBufferGeometry(1.2, 1.2, 2, 2);
		const loader = new THREE.TextureLoader();
		const texture = loader.load(BASE_HREF + environment.paths.textures + 'ui/wall-nav.png');
		const material = new THREE.MeshBasicMaterial({
			depthTest: false,
			map: texture,
			transparent: true,
			opacity: 0.9,
		});
		const mesh = this.mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(-100000, -100000, -100000);
		/*
		const panorama = this.panorama.mesh;
		panorama.on('down', (panorama) => {
			mesh.material.color.setHex(0x0099ff);
			mesh.material.opacity = 1.0;
			mesh.material.needsUpdate = true;
		});
		panorama.on('up', (panorama) => {
			mesh.material.color.setHex(0xffffff);
			mesh.material.opacity = 0.9;
			mesh.material.needsUpdate = true;
		});
		*/
	}

	update() {
		if (InteractiveMesh.lastIntersectedObject) {
			const mesh = this.mesh;
			const position = InteractiveMesh.lastIntersectedObject.intersection.point.multiplyScalar(0.99);
			mesh.position.set(position.x, position.y, position.z);
			const s = mesh.position.length() / 80;
			mesh.scale.set(s, s, s);
			mesh.lookAt(ORIGIN);
		}
		/*
		if (this.panorama.mesh.intersection) {
			const pointer = this.pointer;
			const position = this.panorama.mesh.intersection.point.normalize().multiplyScalar(POINTER_RADIUS);
			pointer.position.set(position.x, position.y, position.z);
			pointer.lookAt(ORIGIN);
		}
		*/
	}

}
