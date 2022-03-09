import { Component } from 'rxcomp';
import { first } from 'rxjs/operators';
import ModalService, { ModalResolveEvent } from '../../modal/modal.service';
import NavmapItemModalComponent from '../modals/navmap-item-modal.component';
import NavmapModalComponent from '../modals/navmap-modal.component';
import NavmapService from './navmap.service';

export default class NavmapBuilderComponent extends Component {

	onInit() {
		this.navmap = null;
		this.navmaps = [];
		NavmapService.navmapGet$().pipe(
			first(),
		).subscribe(navmaps => {
			this.navmaps = navmaps;
			this.pushChanges();
		});
	}

	onBack(event) {
		this.navmap = null;
		this.pushChanges();
	}

	onAdd() {
		ModalService.open$({ template: NavmapModalComponent.chunk() }).pipe(
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
		ModalService.open$({ template: NavmapItemModalComponent.chunk(), data: { navmap, hit } }).pipe(
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

	onDelete(navmap) {
		const index = this.navmaps.indexOf(navmap);
		if (index !== -1) {
			this.navmaps.splice(index, 1);
		}
		this.navmap = null;
		this.pushChanges();
	}

}

NavmapBuilderComponent.meta = {
	selector: '[navmap-builder]',
	inputs: ['views'],
};
