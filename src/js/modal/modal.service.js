import { from, of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

export class ModalEvent {

	constructor(data) {
		this.data = data;
	}

}

export class ModalResolveEvent extends ModalEvent { }
export class ModalRejectEvent extends ModalEvent { }

export class ModalService {

	static get hasModal() {
		return this.hasModal_;
	}
	static set hasModal(hasModal) {
		if (this.hasModal_ !== hasModal) {
			this.hasModal_ = hasModal;
			const body = document.querySelector('body');
			hasModal ? body.classList.add('modal-open') : body.classList.remove('modal-open');
		}
	}

	static open$(modal) {
		this.busy$.next(true);
		return (
			modal.iframe ? of(/* html */`<div class="iframe-modal" iframe-modal src="${modal.iframe}"></div>`) : this.getTemplate$(modal)
		).pipe(
			// startWith(new ModalLoadEvent(Object.assign({}, modal.data, { $src: modal.src }))),
			map(template => {
				return { node: this.getNode(template), data: modal.data, modal: modal };
			}),
			tap(node => {
				this.modal$.next(node);
				this.hasModal = true;
				this.busy$.next(false);
				// this.events$.next(new ModalLoadedEvent(Object.assign({}, modal.data, { $src: modal.src })));
			}),
			switchMap(node => this.events$),
			tap(_ => this.hasModal = false)
		)
	}

	static getTemplate$(modal) {
		if (modal.src) {
			return from(fetch(modal.src).then(response => {
				return response.text();
			}));
		} else if (modal.template) {
			return of(modal.template);
		} else {
			return EMPTY;
		}
	}

	static getNode(template) {
		const div = document.createElement('div');
		div.innerHTML = template;
		const node = div.firstElementChild;
		return node;
	}

	static reject(data) {
		this.modal$.next(null);
		this.events$.next(new ModalRejectEvent(data));
	}

	static resolve(data) {
		this.modal$.next(null);
		this.events$.next(new ModalResolveEvent(data));
	}

}

ModalService.modal$ = new Subject();
ModalService.events$ = new Subject();
ModalService.busy$ = new Subject();
