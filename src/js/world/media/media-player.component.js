import { Component, getContext } from 'rxcomp';
import { filter, takeUntil, tap } from 'rxjs/operators';
import DragService, { DragDownEvent, DragMoveEvent, DragUpEvent } from '../../drag/drag.service';
import MediaLoader, { MediaLoaderDisposeEvent, MediaLoaderPauseEvent, MediaLoaderPlayEvent, MediaLoaderTimeUpdateEvent } from './media-loader';

export default class MediaPlayerComponent extends Component {

	onInit() {
		// console.log('MediaPlayerComponent', this.media);
		this.playing = false;
		this.progress = 0;
		this.media$().pipe(
			takeUntil(this.unsubscribe$),
		).subscribe();
		this.drag$().pipe(
			takeUntil(this.unsubscribe$),
		).subscribe();
	}

	media$() {
		const { node } = getContext(this);
		const page = document.querySelector('.page');
		return MediaLoader.events$.pipe(
			// filter(event => event.loader.item.id === this.media.item.id),
			tap(event => {
				if (event instanceof MediaLoaderPlayEvent) {
					this.media = event.loader;
					this.playing = true;
					node.classList.add('active');
					page.classList.add('media-player-active');
					this.pushChanges();
				} else if (this.media === event.loader) {
					if (event instanceof MediaLoaderPauseEvent) {
						this.playing = false;
						this.pushChanges();
					} else if (event instanceof MediaLoaderTimeUpdateEvent) {
						if (!this.dragging) {
							this.progress = this.media.progress;
							this.pushChanges();
						}
					} else if (event instanceof MediaLoaderDisposeEvent) {
						this.media = null;
						node.classList.remove('active');
						page.classList.remove('media-player-active');
						this.pushChanges();
					}
				}
				// console.log('MediaPlayerComponent.MediaLoader.events$', event);
			}),
		);
	}

	drag$() {
		const { node } = getContext(this);
		const track = node.querySelector('.track');
		let initialProgress;
		return DragService.observe$(track).pipe(
			filter(_ => this.media),
			tap((event) => {
				if (event instanceof DragDownEvent) {
					const rect = track.getBoundingClientRect();
					initialProgress = Math.max(0, Math.min(1, (event.down.x - rect.left) / rect.width));
					this.dragging = true;
				} else if (event instanceof DragMoveEvent) {
					const rect = track.getBoundingClientRect();
					const progress = Math.max(0, Math.min(1, initialProgress + event.distance.x / rect.width));
					this.progress = progress;
					this.pushChanges();
				} else if (event instanceof DragUpEvent) {
					this.media.progress = this.progress;
					this.dragging = false;
				}
			})
		);
	}

	onPlay() {
		this.media.play();
	}

	onPause() {
		this.media.pause();
	}

	onTrack(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		const progress = (event.screenX - rect.left) / rect.width;
		this.media.progress = progress;
		// console.log(rect.left, event.screenX);
	}
}

MediaPlayerComponent.meta = {
	selector: '[media-player]',
};
