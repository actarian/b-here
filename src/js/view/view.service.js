import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import HttpService from "../http/http.service";

export class View {

	constructor(options) {
		if (options) {
			Object.assign(this, options);
			if (options.items) {
				options.items.forEach((item, index) => {
					item.index = index;
				});
			}
		}
	}

}

export class PanoramaView extends View {

	constructor(options) {
		super(options);
	}

}

export class PanoramaGridView extends View {

	set index(index) {
		if (this.index_ !== index) {
			this.index_ = index;
			this.index$.next(index);
		}
	}

	get index() {
		return this.index_;
	}

	constructor(options) {
		if (options.items) {
			options.items = options.items.map((mapFile, i) => {
				const indices = new THREE.Vector2();
				mapFile.replace(/_x([-|\d]+)_y([-|\d]+)/g, (a, b, c) => {
					const flipAxes = options.flipAxes ? -1 : 1;
					if (options.invertAxes) {
						indices.y = parseInt(b);
						indices.x = parseInt(c) * flipAxes;
					} else {
						indices.x = parseInt(b);
						indices.y = parseInt(c) * flipAxes;
					}
					console.log('PanoramaGridView', mapFile, indices);
				});
				return {
					id: i + 1,
					envMapFolder: options.envMapFolder,
					envMapFile: mapFile,
					indices,
				};
			});
		}
		super(options);
		this.index_ = 0;
		this.index$ = new Subject();
	}

	getTileIndex(x, y) {
		return this.items.reduce((p, c, i) => {
			if (c.indices.x === x && c.indices.y === y) {
				return i;
			} else {
				return p;
			}
		}, -1);
	}

	hasTile(x, y) {
		return this.getTileIndex(x, y) !== -1;
	}

	getTile(x, y) {
		const index = this.getTileIndex(x, y);
		if (index !== -1) {
			this.index = index;
			return this.items[index];
		}
	}

}

export class ModelView extends View {

	constructor(options) {
		super(options);
	}

}

export const ViewType = {
	Panorama: 'panorama',
	PanoramaGrid: 'panorama-grid',
	Model: 'model',
};

export default class ViewService {

	static data$() {
		return HttpService.get$('./api/data.json').pipe(
			map(data => {
				data.views = data.views.map(view => {
					switch (view.type) {
						case ViewType.Panorama:
							view = new PanoramaView(view);
							break;
						case ViewType.PanoramaGrid:
							view = new PanoramaGridView(view);
							break;
						case ViewType.Model:
							view = new ModelView(view);
							break;
						default:
							view = new View(view);
					}
					return view;
				});
				return data;
			}),
		);
	}

}
