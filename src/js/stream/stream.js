import { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';
import { Logger } from '../logger/logger';

export class Stream {

	/**
	 *
	 * @param {IAgoraRTCRemoteUser} user
	 * @param {'audio' | 'video'} mediaType
	 * @param {boolean} isLocal
	 */
	constructor(user, mediaType, isLocal = false) {
		this.user = user;
		this.mediaType = mediaType;
		this.isLocal = isLocal;
		this.clientInfo = null;
		this.texture = null;
		this.element = null;
		this.parentNode = null;
	}

	get streamId() {
		return this.user?.uid.toString();
	}

	get hasVideo() {
		return this.user?.hasVideo;
	}

	get hasAudio() {
		return this.user?.hasAudio;
	}

	get videoTrack() {
		return this.user?.videoTrack;
	}

	get audioTrack() {
		return this.user?.audioTrack;
	}

	get video() {
		return this.videoTrack ? true : false;
	}

	get audio() {
		return this.audioTrack ? true : false;
	}

	get userMuteVideo() {
		// return this.videoTrack ? !this.videoTrack.enabled : false;
		return this.videoTrack ? this.videoTrack.muted : false;
	}

	get userMuteAudio() {
		// return this.audioTrack ? !this.audioTrack.enabled : false;
		return this.audioTrack ? this.audioTrack.muted : false;
	}

	getTracks() {
		const tracks = [];
		if (this.user.hasVideo) {
			tracks.push(this.videoTrack);
		}
		if (this.user.hasAudio) {
			tracks.push(this.audioTrack);
		}
		return tracks;
	}

	async muteVideo() {
		if (this.videoTrack) {
			// await this.videoTrack.setEnabled(true);
			await this.videoTrack.setMuted(true);
		}
	}

	async unmuteVideo() {
		if (this.videoTrack) {
			// await this.videoTrack.setEnabled(false);
			await this.videoTrack.setMuted(false);
		}
	}

	async muteAudio() {
		if (this.audioTrack) {
			// await this.audioTrack.setEnabled(true);
			await this.audioTrack.setMuted(true);
		}
	}

	async unmuteAudio() {
		if (this.audioTrack) {
			// await this.audioTrack.setEnabled(false);
			await this.audioTrack.setMuted(false);
		}
	}

	/*
	getIsSpeakingUser() {
		return this.getAudioLevel() > 0.6 ? 1 : 0;
	}
	*/

	getAudioLevel() {
		return this.audioTrack ? this.audioTrack.getVolumeLevel() : 0;
	}

	isPlaying() {
		return this.videoTrack?.isPlaying || this.audioTrack?.isPlaying;
	}

	play(parentNode) {
		while (parentNode.childElementCount > 0) {
			parentNode.removeChild(parentNode.firstElementChild);
		}
		this.parentNode = parentNode;
		if (this.mediaType === 'video') {
			this.videoTrack.play(parentNode, {
				fit: 'cover',
				mirror: undefined,
			});
			this.element = parentNode.firstElementChild;
			Logger.log('Stream.play.videoTrack', parentNode, this.element);
		} else if (this.audioTrack && !this.isLocal) {
			this.audioTrack.play();
		}
	}

	stop() {
		if (this.videoTrack && this.videoTrack.isPlaying) {
			this.videoTrack.stop();
		}
		if (this.audioTrack && this.audioTrack.isPlaying) {
			this.audioTrack.stop();
		}
	}

	close() {
		if (this.videoTrack) {
			this.videoTrack.close();
		}
		if (this.audioTrack) {
			this.audioTrack.close();
		}
	}

	update(stream) {
		this.user = stream.user;
		this.mediaType = stream.mediaType;
		/*
		if (this.parentNode) {
			this.play(this.parentNode);
		}
		*/
	}

	resume(parentNode) {
		Logger.log('Stream.resume', parentNode, this.element);
		if (this.element) {
			parentNode.appendChild(this.element);
		}
	}

}
