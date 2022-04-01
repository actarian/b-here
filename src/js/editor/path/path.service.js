import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environment';
import { HttpService } from '../../http/http.service';
import { mapPath } from './path';

export const DEFAULT_PATH = {
	id: null,
	name: "Principale",
	items: [],
};

export default class PathService {

	static paths$ = new BehaviorSubject([DEFAULT_PATH]);
	static set paths(paths) {
		this.paths$.next(paths);
	}
	static get paths() {
		return this.paths$.getValue();
	}

	static path$ = new BehaviorSubject(DEFAULT_PATH);
	static set path(path) {
		this.path$.next(path);
	}
	static get path() {
		return this.path$.getValue();
	}

	static getCurrentPath$(pathId = null) {
		return this.pathGet$().pipe(
			switchMap(paths => {
				this.paths = paths;
				let path = DEFAULT_PATH;
				if (pathId) {
					const selectedPath = paths.find(x => x.id === pathId);
					if (selectedPath) {
						path = selectedPath;
					}
				}
				this.path = path;
				return this.path$;
			}),
		)
	}

	static pathGet$() {
		if (environment.flags.usePaths) {
			return HttpService.get$(`/api/path`).pipe(
				map(data => {
					data.paths = data.paths.map(path => mapPath(path));
					data.paths.unshift(DEFAULT_PATH);
					return data.paths;
				}),
			);
		} else {
			return of([]);
		}
	}

	static addPath(path) {
		const paths = this.paths.slice();
		paths.push(path);
		this.paths = paths;
		this.path = path;
	}

	static editPath(path) {
		// console.log('PathService.editPath', path);
		const paths = this.paths.slice();
		const index = paths.reduce((p, c, i) => {
			return c.id === path.id ? i : p;
		}, -1);
		// console.log('PathService.editPath', paths, index);
		if (index > 0) {
			let currentPath = this.path;
			if (currentPath.id === path.id) {
				currentPath = path;
			}
			// console.log('PathService.editPath', currentPath);
			paths.splice(index, 1, path);
			this.paths = paths;
			this.path = currentPath;
		}
	}

	static deletePath(path) {
		const paths = this.paths.slice();
		const index = paths.indexOf(path);
		if (index > 0) {
			paths.splice(index, 1);
			this.paths = paths;
			let currentPath = this.path;
			if (currentPath.id === path.id) {
				currentPath = paths[0];
			}
			this.path = currentPath;
		}
	}

	static pathCreate$(path) {
		return HttpService.post$(`/api/path`, path).pipe(
			map(path => mapPath(path)),
		);
	}

	static pathUpdate$(path) {
		return HttpService.put$(`/api/path/${path.id}`, path).pipe(
			map(x => mapPath(x)),
		);
	}

	static pathDelete$(path) {
		return HttpService.delete$(`/api/path/${path.id}`);
	}

	/*
	static itemCreate$(path, item) {
		return HttpService.post$(`/api/path/${path.id}/item`, item).pipe(
			map(item => mapViewItem(item)),
		);
	}

	static itemUpdate$(path, item) {
		item = mapViewItem(item); // !!! ??
		return HttpService.put$(`/api/path/${path.id}/item/${item.id}`, item.payload).pipe(
			map(item => mapViewItem(item)),
		);
	}

	static itemDelete$(path, item) {
		return HttpService.delete$(`/api/path/${path.id}/item/${item.id}`);
	}
	*/
}
