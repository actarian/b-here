const fs = require('fs');
const path = require('path');
const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-access-token');

const APP_KEY = process.env.APP_KEY || null;
const APP_SECURE_KEY = process.env.APP_SECURE_KEY || null;

const RoleType = {
	Publisher: 'publisher',
	Attendee: 'attendee',
	Streamer: 'streamer',
	Viewer: 'viewer',
	SmartDevice: 'smart-device',
	SelfService: 'self-service',
	Embed: 'embed',
};

let db = {
	views: [], menu: [], navmaps: [], paths: [], assets: [], users: [
		{
			id: '1601892639985',
			username: 'publisher',
			password: 'publisher',
			type: 'publisher',
			firstName: 'Jhon',
			lastName: 'Appleseed',
		}, {
			id: '1601892639986',
			username: 'attendee',
			password: 'attendee',
			type: 'attendee',
			firstName: 'Jhon',
			lastName: 'Appleseed',
		}
	]
};

let pathname;

function uuid() {
	// return new Date().getTime();
	return parseInt(process.hrtime.bigint().toString());
}

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
	response.status(status).set('Content-Type', 'application/json').send(JSON.stringify({ status, message }));
}

function sendOk(response, data) {
	if (data) {
		response.status(200).set('Content-Type', 'application/json').send(JSON.stringify(data));
	} else {
		response.status(200).set('Content-Type', 'text/plain').send();
	}
}

function doCreate(request, response, params, items) {
	const body = request.body;
	const id = uuid();
	const item = Object.assign({}, body, { id });
	if (item.items) {
		item.items.forEach(x => x.id = uuid());
	}
	if (item.tiles) {
		item.tiles.forEach(x => x.id = uuid());
	}
	if (item.navs) {
		item.navs.forEach(x => x.id = uuid());
	}
	doSetLocale(item, params);
	items.push(item);
	saveStore();
	sendOk(response, item);
}

function doUpdate(request, response, params, items) {
	const body = request.body;
	const item = items.find(x => x.id === body.id);
	if (item) {
		Object.assign(item, body);
		doSetLocale(item, params);
		saveStore();
		sendOk(response, item);
	} else {
		sendError(response, 404, 'Not Found');
	}
}

function doDelete(request, response, params, items) {
	const index = items.reduce((p, x, i) => x.id === params.id ? i : p, -1);
	if (index !== -1) {
		// const item = items[index];
		items.splice(index, 1);
		saveStore();
		// sendOk(response, item);
		sendOk(response);
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

function doSetLocale(item, params) {
	const language = params.languageCode;
	if (language) {
		const localized = Object.assign({}, item);
		delete localized.locale;
		const locale = item.locale = (item.locale || {});
		locale[language] = localized;
		console.log('doSetLocale.languageCode', language);
	}
	return item;
}

const ROUTES = [{
	path: '/api/view', method: 'GET', callback: function(request, response, params) {
		sendOk(response, { views: db.views });
	}
}, {
	path: '/api/view/:viewId', method: 'GET', callback: function(request, response, params) {
		const view = doGet(request, response, { id: params.viewId }, db.views);
		if (view) {
			sendOk(response, view);
		}
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
	path: '/api/view/:viewId/tile/:tileId/item', method: 'POST', callback: function(request, response, params) {
		const view = doGet(request, response, { id: params.viewId }, db.views);
		if (view) {
			const tile = view.tiles.find(x => x.id === params.tileId);
			if (tile) {
				tile.navs = tile.navs || [];
				doCreate(request, response, params, tile.navs);
			} else {
				sendError(response, 404, 'Not Found');
			}
		}
	}
}, {
	path: '/api/view/:viewId/tile/:tileId/item/:viewItemId', method: 'PUT', callback: function(request, response, params) {
		const view = doGet(request, response, { id: params.viewId }, db.views);
		if (view) {
			const tile = view.tiles.find(x => x.id === params.tileId);
			if (tile) {
				tile.navs = tile.navs || [];
				doUpdate(request, response, params, tile.navs);
			} else {
				sendError(response, 404, 'Not Found');
			}
		}
	}
}, {
	path: '/api/view/:viewId/tile/:tileId/item/:viewItemId', method: 'DELETE', callback: function(request, response, params) {
		const view = doGet(request, response, { id: params.viewId }, db.views);
		if (view) {
			const tile = view.tiles.find(x => x.id === params.tileId);
			if (tile) {
				tile.navs = tile.navs || [];
				doDelete(request, response, { id: params.viewItemId }, tile.navs);
			} else {
				sendError(response, 404, 'Not Found');
			}
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
}, {
	path: '/api/:languageCode/asset', method: 'POST', callback: function(request, response, params) {
		doCreate(request, response, params, db.assets);
	}
}, {
	path: '/api/:languageCode/asset/:assetId', method: 'PUT', callback: function(request, response, params) {
		doUpdate(request, response, params, db.assets);
	}
}, {
	path: '/api/menu', method: 'GET', callback: function(request, response, params) {
		sendOk(response, { menu: db.menu });
	}
}, {
	path: '/api/menu', method: 'PUT', callback: function(request, response, params) {
		const menu = request.body;
		db.menu = menu;
		saveStore();
		sendOk(response, menu);
	}
}, {
	path: '/api/menu', method: 'POST', callback: function(request, response, params) {
		doCreate(request, response, params, db.menu);
	}
}, {
	path: '/api/menu/:menuId', method: 'DELETE', callback: function(request, response, params) {
		doDelete(request, response, { id: params.menuId }, db.menu);
	}
}, {
	path: '/api/menu/:menuId', method: 'PUT', callback: function(request, response, params) {
		doUpdate(request, response, params, db.menu);
	}
},
// navmap
{
	path: '/api/navmap', method: 'GET', callback: function(request, response, params) {
		sendOk(response, { navmaps: db.navmaps });
	}
}, {
	path: '/api/navmap/:navmapId', method: 'GET', callback: function(request, response, params) {
		const navmap = doGet(request, response, { id: params.navmapId }, db.navmaps);
		if (navmap) {
			sendOk(response, navmap);
		}
	}
}, {
	path: '/api/navmap', method: 'POST', callback: function(request, response, params) {
		doCreate(request, response, params, db.navmaps);
	}
}, {
	path: '/api/navmap/:navmapId', method: 'PUT', callback: function(request, response, params) {
		doUpdate(request, response, params, db.navmaps);
	}
}, {
	path: '/api/navmap/:navmapId', method: 'DELETE', callback: function(request, response, params) {
		doDelete(request, response, { id: params.navmapId }, db.navmaps);
	}
}, {
	path: '/api/navmap/:navmapId/item', method: 'POST', callback: function(request, response, params) {
		const navmap = doGet(request, response, { id: params.navmapId }, db.navmaps);
		if (navmap) {
			navmap.items = navmap.items || [];
			doCreate(request, response, params, navmap.items);
		}
	}
}, {
	path: '/api/navmap/:navmapId/item/:itemId', method: 'PUT', callback: function(request, response, params) {
		const navmap = doGet(request, response, { id: params.navmapId }, db.navmaps);
		if (navmap) {
			navmap.items = navmap.items || [];
			doUpdate(request, response, params, navmap.items);
		}
	}
}, {
	path: '/api/navmap/:navmapId/item/:itemId', method: 'DELETE', callback: function(request, response, params) {
		const navmap = doGet(request, response, { id: params.navmapId }, db.navmaps);
		if (navmap) {
			doDelete(request, response, { id: params.itemId }, navmap.items);
		}
	}
},
// path
{
	path: '/api/path', method: 'GET', callback: function(request, response, params) {
		sendOk(response, { paths: db.paths });
	}
}, {
	path: '/api/path/:pathId', method: 'GET', callback: function(request, response, params) {
		const path = doGet(request, response, { id: params.pathId }, db.paths);
		if (path) {
			sendOk(response, path);
		}
	}
}, {
	path: '/api/path', method: 'POST', callback: function(request, response, params) {
		doCreate(request, response, params, db.paths);
	}
}, {
	path: '/api/path/:pathId', method: 'PUT', callback: function(request, response, params) {
		doUpdate(request, response, params, db.paths);
	}
}, {
	path: '/api/path/:pathId', method: 'DELETE', callback: function(request, response, params) {
		doDelete(request, response, { id: params.pathId }, db.paths);
	}
},
/*
{
	path: '/api/path/:pathId/item', method: 'POST', callback: function(request, response, params) {
		const path = doGet(request, response, { id: params.pathId }, db.paths);
		if (path) {
			path.items = path.items || [];
			doCreate(request, response, params, path.items);
		}
	}
}, {
	path: '/api/path/:pathId/item/:itemId', method: 'PUT', callback: function(request, response, params) {
		const path = doGet(request, response, { id: params.pathId }, db.paths);
		if (path) {
			path.items = path.items || [];
			doUpdate(request, response, params, path.items);
		}
	}
}, {
	path: '/api/path/:pathId/item/:itemId', method: 'DELETE', callback: function(request, response, params) {
		const path = doGet(request, response, { id: params.pathId }, db.paths);
		if (path) {
			doDelete(request, response, { id: params.itemId }, path.items);
		}
	}
},
*/
{
	path: '/api/user/me', method: 'GET', callback: function(request, response, params) {
		const user = request.session.user;
		if (!user) {
			sendError(response, 404, 'Not Found');
		} else {
			sendOk(response, user);
		}
	}
}, {
	path: '/api/user/login', method: 'POST', callback: function(request, response, params) {
		const body = request.body;
		const user = db.users.find(x => x.username === body.username && x.password === body.password);
		if (!user) {
			sendError(response, 404, 'Not Found');
		} else {
			request.session.user = user;
			sendOk(response, user);
		}
	}
}, {
	path: '/api/user/logout', method: 'GET', callback: function(request, response, params) {
		const user = request.session.user;
		request.session.user = null;
		sendOk(response);
	}
}, {
	path: '/api/user/guided-tour', method: 'POST', callback: function(request, response, params) {
		const body = request.body;
		const id = uuid();
		const user = Object.assign({ type: RoleType.Streamer }, body, { id });
		request.session.user = null;
		db.users.push(user);
		saveStore();
		sendOk(response, user);
	}
}, {
	path: '/api/user/self-service-tour', method: 'POST', callback: function(request, response, params) {
		const body = request.body;
		const id = uuid();
		const user = Object.assign({ type: RoleType.SelfService }, body, { id });
		request.session.user = user;
		db.users.push(user);
		saveStore();
		sendOk(response, user);
	}
}, {
	path: '/api/user/self-service-support-request', method: 'POST', callback: function(request, response, params) {
		const body = request.body;
		sendOk(response, body);
	}
}, {
	path: '/api/user/log', method: 'POST', callback: function(request, response, params) {
		// do nothing
		/*
		{
			meetingId: string,
			sharedMeetingId: string,
			fullName: string,
			userType: string
		}
		*/
		sendOk(response);
	}
}, {
	path: '/api/token/rtc', method: 'POST', callback: function(request, response, params) {
		if (!APP_KEY || !APP_SECURE_KEY) {
			sendError(response, 400, 'appKey and appSecureKey required');
		}
		const body = request.body || {};
		const channelName = body.channelName ? String(body.channelName) : 0;
		if (!channelName) {
			sendError(response, 400, 'channelName required');
		}
		// use 0 if uid is not specified
		const uid = body.uid ? String(body.uid) : 0;
		const duration = 3600 * 12;
		const timestamp = Math.floor(Date.now() / 1000);
		const expirationTime = timestamp + duration;
		const role = RtcRole.PUBLISHER;
		const token = RtcTokenBuilder.buildTokenWithUid(APP_KEY, APP_SECURE_KEY, channelName, uid, role, expirationTime);
		// response.header('Access-Control-Allow-Origin', 'http://ip:port')
		sendOk(response.header('Access-Control-Allow-Origin', '*'), { token: token });
	}
}, {
	path: '/api/token/rtm', method: 'POST', callback: function(request, response, params) {
		if (!APP_KEY || !APP_SECURE_KEY) {
			sendError(response, 400, 'appKey and appSecureKey required');
		}
		const body = request.body || {};
		const uid = body.uid ? String(body.uid) : timestamp.toString();
		if (!uid) {
			return response.status(400).json({ 'error': 'uid required' }).send();
		}
		const duration = 3600 * 12;
		const timestamp = Math.floor(Date.now() / 1000);
		const expirationTime = timestamp + duration;
		const role = RtmRole.Rtm_User;
		const token = RtmTokenBuilder.buildToken(APP_KEY, APP_SECURE_KEY, uid, role, expirationTime);
		// response.header('Access-Control-Allow-Origin', 'http://ip:port')
		sendOk(response.header('Access-Control-Allow-Origin', '*'), { token: token });
	}
}];

/*{
	path: '/api/:lang/labels', method: 'GET', callback: function(request, response, params) {
		const pathname = path.join(dirname, `/docs/api/${params.lang}/labels.json`);
		fs.readFile(pathname, 'utf8', (error, data) => {
			if (error) {
				sendError(response, 500, error);
			} else {
				try {
					const labels = JSON.parse(data)
					if (labels) {
						sendOk(response, labels);
					} else {
						sendError(response, 404, 'Not Found');
					}
				} catch (error) {
					sendError(response, 500, 'Invalid Data');
				}
			}
		});
	}
}, */

ROUTES.forEach(route => {
	const segments = [];
	if (route.path === '**') {
		segments.push(route.path);
		route.matcher = new RegExp('^.*$');
	} else {
		const matchers = [`^`];
		const regExp = /(^\.\.\/|\.\/|\/\/|\/)|([^:|\/]+)\/?|\:([^\/]+)\/?/g;
		let relative;
		let match;
		while ((match = regExp.exec(route.path)) !== null) {
			const g1 = match[1];
			const g2 = match[2];
			const g3 = match[3];
			if (g1) {
				relative = !(g1 === '//' || g1 === '/');
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
		/*
		const matches = route.path.matchAll(regExp);
		for (let match of matches) {
			const g1 = match[1];
			const g2 = match[2];
			const g3 = match[3];
			if (g1) {
				relative = !(g1 === '//' || g1 === '/');
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
		*/
		matchers.push('$');
		const regexp = matchers.join('');
		console.log(regexp)
		route.matcher = new RegExp(regexp);
	}
	route.segments = segments;
});

function apiMiddleware(options) {
	if (!options.root) {
		throw new Error('missing Vars.root!');
	}
	if (!options.baseHref) {
		throw new Error('missing Vars.baseHref!');
	}

	pathname = path.join(options.dirname, `/docs/api/editor.json`);

	readStore();

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

function setSessionUser(request, userType) {
	userType = userType || RoleType.SelfService;
	const id = uuid();
	const user = {
		id,
		type: userType,
		username: userType,
		password: '****',
		firstName: 'Jhon',
		lastName: 'Appleseed',
	};
	request.session.user = user;
}

module.exports = {
	apiMiddleware,
	useApi,
	uuid,
	RoleType,
	setSessionUser,
};

/*
const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-access-token');
const appSecureKey = '';

app.post('/api/token/rtc', function(request, response) {
	const payload = request.body || {};
	const duration = 3600;
	const timestamp = Math.floor(Date.now() / 1000);
	const expirationTime = timestamp + duration;
	const uid = payload.uid ? String(payload.uid) : timestamp.toString();
	const role = RtcRole.PUBLISHER;
	const token = RtcTokenBuilder.buildTokenWithUid(environment.appKey, appSecureKey, environment.channelName, uid, role, expirationTime);
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
	const token = RtmTokenBuilder.buildToken(environment.appKey, appSecureKey, uid, role, expirationTime);
	response.send(JSON.stringify({
		token: token,
	}));
});
*/
