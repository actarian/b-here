// import * as THREE from 'three';
import { environment } from '../../environment';

const LINE_SEGMENTS = 10;

export class TeleportElement {

	constructor() {
		const gravity = this.gravity = new THREE.Vector3(0, -9.8, 0);
		const controllerPosition = this.controllerPosition = new THREE.Vector3();
		const controllerDirection = this.controllerDirection = new THREE.Vector3();
		const currentPosition = this.currentPosition = new THREE.Vector3();
		const targetPosition = this.targetPosition = new THREE.Vector3();
		const geometry = new THREE.BufferGeometry();
		const vertices = this.vertices = new Float32Array((LINE_SEGMENTS + 1) * 3);
		vertices.fill(0);
		const colors = new Float32Array((LINE_SEGMENTS + 1) * 3);
		colors.fill(0.5);
		geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
		const lineMaterial = new THREE.LineBasicMaterial({ vertexColors: true, blending: THREE.AdditiveBlending });
		const line = this.line = new THREE.Line(geometry, lineMaterial);
		// const light = this.light = new THREE.PointLight(0xffeeaa, 0, 2);
		const loader = new THREE.TextureLoader();
		const texture = loader.load(environment.getPath('textures/ui/nav-point.png'));
		const target = this.target = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(0.3, 0.3, 1, 1),
			new THREE.MeshBasicMaterial({
				map: texture,
				blending: THREE.AdditiveBlending,
				color: 0x555555,
				transparent: true
			})
		);
		target.rotation.x = -Math.PI / 2;
	}

	addToController(controller, scene) {
		this.currentController = controller;
		// this.light.intensity = 1;
		controller.add(this.line);
		scene.add(this.target);
	}

	removeFromController(controller, scene, renderer, camera, cameraGroup) {
		const currentController = this.currentController;
		if (currentController === controller) {
			const gravity = this.gravity;
			const currentPosition = this.currentPosition;
			const controllerPosition = this.controllerPosition;
			const controllerDirection = this.controllerDirection;
			renderer.xr.getCamera(camera).getWorldPosition(currentPosition);
			currentPosition.y = 0;
			currentController.getWorldPosition(controllerPosition);
			currentController.getWorldDirection(controllerDirection);
			controllerDirection.multiplyScalar(6);
			const T = (-controllerDirection.y + Math.sqrt(controllerDirection.y ** 2 - 2 * controllerPosition.y * gravity.y)) / gravity.y;
			const targetPosition = this.getPositionT(this.targetPosition, T, controllerPosition, controllerDirection, gravity);
			targetPosition.addScaledVector(currentPosition, -1);
			cameraGroup.position.add(targetPosition);
			// this.teleport(targetPosition, cameraGroup);
			this.currentController = null;
			// this.light.intensity = 0;
			currentController.remove(this.line);
			scene.remove(this.target);
		}
	}

	update() {
		const currentController = this.currentController;
		if (currentController) {
			const gravity = this.gravity;
			const controllerPosition = this.controllerPosition;
			const controllerDirection = this.controllerDirection;
			const targetPosition = this.targetPosition;
			// Controller start position
			currentController.getWorldPosition(controllerPosition);
			// Set Vector V to the direction of the controller, at 1m/s
			currentController.getWorldDirection(controllerDirection);
			// Scale the initial velocity to 6m/s
			controllerDirection.multiplyScalar(6);
			// Time for tele ball to hit ground
			const T = (-controllerDirection.y + Math.sqrt(controllerDirection.y ** 2 - 2 * controllerPosition.y * gravity.y)) / gravity.y;
			const vertex = targetPosition.set(0, 0, 0);
			for (let i = 1; i <= LINE_SEGMENTS; i++) {
				// set vertex to current position of the virtual ball at time t
				this.getPositionT(vertex, i * T / LINE_SEGMENTS, controllerPosition, controllerDirection, gravity);
				currentController.worldToLocal(vertex);
				vertex.toArray(this.vertices, i * 3);
			}
			this.line.geometry.attributes.position.needsUpdate = true;
			// Place the light and sprite near the end of the poing
			// this.getPositionT(this.light.position, T * 0.98, controllerPosition, controllerDirection, gravity);
			this.getPositionT(this.target.position, T * 0.98, controllerPosition, controllerDirection, gravity);
		}
	}

	getPositionT(position, T, controllerPosition, controllerDirection, gravity) {
		position.copy(controllerPosition);
		position.addScaledVector(controllerDirection, T);
		position.addScaledVector(gravity, 0.5 * T ** 2);
		return position;
	}

	/*
	teleport(offsetPosition, cameraGroup) {
		const position = new THREE.Vector3();
		position.copy(cameraGroup.position);
		position.add(offsetPosition);
		// const distance = offsetPosition.length();
		cameraGroup.position.copy(position);
	}
	*/

}
