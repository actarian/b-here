import AgoraService from "../../agora/agora.service";

export const W = 6;
export const H = 13.5;
export const D = 0.5;
export const R = 4 / 3;
export const COLORS = [0xffffff, 0xffcc00, 0x00ffcc, 0x00ccff, 0xccff00, 0xcc00ff];

export class PhoneStreamElement {

	static get geometry() {
		const geometry = new THREE.PlaneBufferGeometry(0.01 * W, 0.01 * W / R, 2, 2);
		return geometry;
	}

	setRemote(remote, i, total) {
		this.remote = remote;
		let s, c, r, w, h, sx, sy, sz = 0.01 * D * 0.5 * 1.01;
		if (total < 4) {
			s = 1;
			c = 0;
			r = i;
			w = 0.01 * W * s;
			h = w / R;
			sx = 0;
			sy = h / 2 - (total * h) / 2;
			this.plane.position.set(sx, sy + h * i, sz);
		} else {
			s = 0.5;
			c = i % 2;
			r = Math.floor(i / 2);
			w = 0.01 * W * s;
			h = w / R;
			sx = -w / 2;
			sy = h / 2 - (Math.ceil(total / 2) * h) / 2;
			this.plane.position.set(sx + c * w, sy + r * h, sz);
		}
		this.plane.scale.set(s, s, s);
		// console.log(this.plane.position);
		if (typeof remote === 'number') {
			this.plane.material.color.set(COLORS[i % COLORS.length]);
		} else {
			if (remote.texture) {
				this.plane.material.map = remote.texture;
				this.plane.material.needsUpdate = true;
			} else {
				this.addStreamTexture(remote.getId(), (texture) => {
					remote.texture = texture;
					this.plane.material.map = texture;
					this.plane.material.needsUpdate = true;
				});
			}
		}
	}

	addStreamTexture(streamId, callback) {
		const target = `#stream-${streamId}`;
		const video = document.querySelector(`${target} video`);
		if (!video) {
			return;
		}
		const onPlaying = () => {
			const texture = new THREE.VideoTexture(video);
			texture.minFilter = THREE.LinearFilter;
			texture.magFilter = THREE.LinearFilter;
			texture.format = THREE.RGBFormat;
			texture.needsUpdate = true;
			if (typeof callback === 'function') {
				callback(texture);
			}
		};
		video.crossOrigin = 'anonymous';
		if (video.readyState >= video.HAVE_FUTURE_DATA) {
			onPlaying();
		} else {
			video.oncanplay = () => {
				onPlaying();
			};
		}
	}

	constructor() {
		const geometry = PhoneStreamElement.geometry;
		const material = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			side: THREE.DoubleSide,
		});
		const plane = this.plane = new THREE.Mesh(geometry, material);
	}

}

export default class PhoneElement {

	set remotes(remotes) {
		console.log('PhoneElement', remotes);
		remotes.forEach((remote, i) => {
			let stream = this.streams[i];
			if (!stream) {
				stream = new PhoneStreamElement();
			}
			stream.setRemote(remote, i, remotes.length);
			this.phone.add(stream.plane);
			this.streams[i] = stream;
		});
		for (let i = remotes.length; i < this.streams.length; i++) {
			this.phone.remove(this.streams[i].plane);
		}
		this.streams.length = remotes.length;
	}

	constructor() {
		const mesh = this.mesh = new THREE.Group();
		const phone = this.phone = this.create();
		mesh.add(phone);
		const streams = this.streams = [];
		const agora = this.agora = AgoraService.getSingleton();
		if (agora) {
			/*
			pipe(
				takeUntil(this.unsubscribe$)
			)
			*/
			agora.remotes$.subscribe(remotes => {
				this.remotes = remotes;
			});
		} else {
			this.remotes = [
				1, 2, 3, 4
			];
		}
	}

	create() {
		const geometry = new THREE.BoxBufferGeometry(0.01 * W, 0.01 * H, 0.01 * D, 2, 2, 1);
		const material = new THREE.MeshStandardMaterial({
			color: 0x202020,
		});
		const phone = new THREE.Mesh(geometry, material);
		phone.rotation.set(-Math.PI / 4, 0, 0);
		return phone;
	}

}
