import { Component } from 'rxcomp';
import { first } from 'rxjs/operators';
import { environment } from '../../environment';
import ModalService, { ModalResolveEvent } from '../../modal/modal.service';
import NavmapService from './navmap.service';

export default class NavmapBuilderComponent extends Component {

	onInit() {
		this.navmap = null;
		this.navmaps = [];
		NavmapService.navmapGet$().pipe(
			first(),
		).subscribe(navmaps => {
			this.navmaps = navmaps;
			console.log(navmaps);
			this.pushChanges();
		});
	}

	onBack(event) {
		this.navmap = null;
		this.pushChanges();
	}

	onAdd() {
		ModalService.open$({ src: environment.template.modal.navmap }).pipe(
			first(),
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				this.navmaps.push(event.data);
				this.navmap = event.data;
				this.pushChanges();
			}
		});
	}

	onSet(item) {
		this.navmap = this.navmaps.find(x => x.id === item.id);
		this.pushChanges();
	}

	onAddItem(navmap, hit) {
		ModalService.open$({ src: environment.template.modal.navmapItem, data: { navmap, hit } }).pipe(
			first(),
		).subscribe(event => {
			if (event instanceof ModalResolveEvent) {
				const items = navmap.items || [];
				items.push(event.data);
				Object.assign(navmap, { items });
				this.pushChanges();
			}
		});
	}

}

NavmapBuilderComponent.meta = {
	selector: '[navmap-builder]',
	inputs: ['views'],
};
