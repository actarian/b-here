const fs = require('fs');
const path = require('path');

/*
const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-access-token');

app.post('/api/token/rtc', function(request, response) {
	const payload = request.body || {};
	const duration = 3600;
	const timestamp = Math.floor(Date.now() / 1000);
	const expirationTime = timestamp + duration;
	const uid = payload.uid ? String(payload.uid) : timestamp.toString();
	const role = RtcRole.PUBLISHER;
	const token = RtcTokenBuilder.buildTokenWithUid(environment.appKey, environment.appCertificate, environment.channelName, uid, role, expirationTime);
	response.send(JSON.stringify({
		token: token,
	}));
});

app.post('/api/token/rtm', function(request, response) {
	const payload = request.body || {};
	const duration = 3600;
	const timestamp = Math.floor(Date.now() / 1000);
	const expirationTime = timestamp + duration;
	const uid = payload.uid ? String(payload.uid) : timestamp.toString();
	const role = RtmRole.PUBLISHER;
	const token = RtmTokenBuilder.buildToken(environment.appKey, environment.appCertificate, uid, role, expirationTime);
	response.send(JSON.stringify({
		token: token,
	}));
});
*/

let db = { views: [], assets: [] };

const pathname = path.join(__dirname, `../../docs/api/editor.json`);
readStore();

function useApi() {
	return null;
}

function readStore() {
	fs.readFile(pathname, 'utf8', (error, data) => {
		if (error) {
			console.log('NodeJs.Api.readStore.error', error, pathname);
		} else {
			try {
				db = Object.assign(db, JSON.parse(data));
			} catch (error) {
				console.log('NodeJs.Api.readStore.error', error, pathname);
			}
		}
	});
}

function saveStore() {
	const data = JSON.stringify(db, null, 2);
	fs.writeFile(pathname, data, 'utf8', (error, data) => {
		if (error) {
			console.log('NodeJs.Api.saveStore.error', error, pathname);
		}
	});
}

function sendError(response, status, message) {
	response.status(status).send(JSON.stringify({ status, message }));
}

function doCreate(request, response, params, items) {
	const body = request.body;
	const id = new Date().getTime();
	const item = Object.assign({}, body, { id });
	items.push(item);
	saveStore();
	response.send(JSON.stringify(item));
}

function doUpdate(request, response, params, items) {
	const body = request.body;
	const item = items.find(x => x.id === body.id);
	if (item) {
		Object.assign(item, body);
		saveStore();
		response.send(JSON.stringify(item));
	} else {
		sendError(response, 404, 'Not Found');
	}
}

function doDelete(request, response, params, items) {
	const index = items.reduce((p, x, i) => x.id === params.id ? i : p, -1);
	if (index !== -1) {
		const item = items[index];
		items.splice(index, 1);
		saveStore();
		response.send(JSON.stringify(item));
	} else {
		sendError(response, 404, 'Not Found');
	}
}

function doGet(request, response, params, items) {
	let item = items.find(x => x.id === params.id);
	if (!item) {
		sendError(response, 404, 'Not Found');
	}
	return item;
}

// /api/upload
const ROUTES = [{
	path: '/api/view', method: 'GET', callback: function(request, response, params) {
		response.send(JSON.stringify(db));
	}
}, {
	path: '/api/view', method: 'POST', callback: function(request, response, params) {
		doCreate(request, response, params, db.views);
	}
}, {
	path: '/api/view/:viewId', method: 'PUT', callback: function(request, response, params) {
		doUpdate(request, response, params, db.views);
	}
}, {
	path: '/api/view/:viewId', method: 'DELETE', callback: function(request, response, params) {
		doDelete(request, response, { id: params.viewId }, db.views);
	}
}, {
	path: '/api/view/:viewId/item', method: 'POST', callback: function(request, response, params) {
		const view = doGet(request, response, { id: params.viewId }, db.views);
		if (view) {
			view.items = view.items || [];
			doCreate(request, response, params, view.items);
		}
	}
}, {
	path: '/api/view/:viewId/item/:viewItemId', method: 'PUT', callback: function(request, response, params) {
		const view = doGet(request, response, { id: params.viewId }, db.views);
		if (view) {
			view.items = view.items || [];
			doUpdate(request, response, params, view.items);
		}
	}
}, {
	path: '/api/view/:viewId/item/:viewItemId', method: 'DELETE', callback: function(request, response, params) {
		const view = doGet(request, response, { id: params.viewId }, db.views);
		if (view) {
			doDelete(request, response, { id: params.viewItemId }, view.items);
		}
	}
}, {
	path: '/api/asset', method: 'POST', callback: function(request, response, params) {
		doCreate(request, response, params, db.assets);
	}
}, {
	path: '/api/asset/:assetId', method: 'PUT', callback: function(request, response, params) {
		doUpdate(request, response, params, db.assets);
	}
}, {
	path: '/api/asset/:assetId', method: 'DELETE', callback: function(request, response, params) {
		doDelete(request, response, { id: params.assetId }, db.assets);
	}
}];
ROUTES.forEach(route => {
	const segments = [];
	if (route.path === '**') {
		segments.push(route.path);
		route.matcher = new RegExp('^.*$');
	} else {
		const matchers = [`^`];
		const regExp = /(^\.\.\/|\.\/|\/\/|\/)|([^:|\/]+)\/?|\:([^\/]+)\/?/g;
		const matches = route.path.matchAll(regExp);
		for (let match of matches) {
			const g1 = match[1];
			const g2 = match[2];
			const g3 = match[3];
			if (g1) {
				this.relative = !(g1 === '//' || g1 === '/');
			} else if (g2) {
				matchers.push(`\/(${g2})`);
				segments.push({ name: g2, param: null, value: null });
			} else if (g3) {
				matchers.push('\/([^\/]+)');
				const params = {};
				params[g3] = null;
				route.params = params;
				segments.push({ name: '', param: g3, value: null });
			}
		}
		matchers.push('$');
		const regexp = matchers.join('');
		console.log(regexp)
		route.matcher = new RegExp(regexp);
	}
	route.segments = segments;
})

function apiMiddleware(vars) {
	if (!vars.root) {
		throw new Error('missing Vars.root!');
	}
	if (!vars.baseHref) {
		throw new Error('missing Vars.baseHref!');
	}
	return (request, response, next) => {
		const url = request.baseUrl.replace(/\\/g, '/');
		const params = {};
		const method = ROUTES.find(route => {
			if (route.method.toLowerCase() === request.method.toLowerCase()) {
				const match = url.match(route.matcher);
				if (match) {
					route.segments.forEach((x, i) => {
						if (x.param) {
							let value = match[i + 1];
							if (parseInt(value).toString() === value) {
								value = parseInt(value);
							}
							params[x.param] = value;
						}
					});
					// console.log('match', match, route);
					return true;
				}
			}
		});
		if (method) {
			console.log('apiMiddleware.url', url, method.path, method.method, params);
			method.callback(request, response, params);
		} else {
			next();
		}
	};
};

module.exports = {
	apiMiddleware: apiMiddleware,
	useApi: useApi,
};
