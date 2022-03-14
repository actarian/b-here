const express = require('express');
const fs = require('fs');
const https = require('https');
const multipart = require('connect-multiparty');
const path = require('path');
const session = require('express-session');
const { staticMiddleware } = require('./static/static.js');
const { apiMiddleware, uuid, setSessionUser, RoleType } = require('./api/api.js');

function serve(options) {
	options = options || {};
	options.dirname = options.dirname || path.join(__dirname, '../');
	options.baseHref = options.baseHref || '/b-here/';
	console.log('serve', options.dirname);

	const dirname = options.dirname;
	const multipartMiddleware = multipart({ uploadDir: path.join(dirname, '/docs/temp/') });
	const ASSETS = `assets/`;
	const ROOT = `/docs/`;
	const PORT = process.env.PORT || 5000;
	const PORT_HTTPS = 6443;

	options = Object.assign({
		port: PORT,
		portHttps: PORT_HTTPS,
		host: `http://localhost:${PORT}`,
		hostHttps: `https://localhost:${PORT_HTTPS}`,
		charset: 'utf8',
		assets: ASSETS,
		cacheMode: 'file',
		cache: path.join(dirname, `/cache/`),
		root: ROOT,
		template: path.join(dirname, `${ROOT}index.html`),
		accessControlAllowOrigin: true,
	}, options);

	const staticMiddleware_ = staticMiddleware(options);
	const apiMiddleware_ = apiMiddleware(options);

	const app = express();
	app.use(session({
		secret: 'b-here-secret-keyword',
		saveUninitialized: true,
		resave: true
	}));
	app.disable('x-powered-by');
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(express.raw());
	app.use('*', staticMiddleware_);
	app.use('*', apiMiddleware_);

	app.post('/api/upload', multipartMiddleware, function(request, response) {
		if (options.accessControlAllowOrigin) {
			response.header('Access-Control-Allow-Origin', '*');
		}
		console.log(request.body, request.files);
		const file = request.files.file;
		const id = uuid();
		const fileName = `${id}_${file.name}`;
		const folder = `/uploads/`;
		const input = file.path;
		const output = path.join(dirname, options.root, folder, fileName);
		const upload = {
			id,
			fileName,
			type: file.type,
			originalFileName: file.name,
			url: `${folder}${fileName}`,
		};
		const uploads = [upload];
		fs.copyFile(input, output, (error) => {
			fs.unlink(input, () => { });
			if (error) {
				throw error;
			} else {
				response.status(200).send(JSON.stringify(uploads));
			}
		});
	});
	app.options('/api/upload', function(request, response) {
		console.log('OPTIONS');
		if (options.accessControlAllowOrigin) {
			response.header('Access-Control-Allow-Origin', '*');
		}
		response.status(200).send();
	});

	const isDist = process.env.npm_config_dist;
	console.log('isDist', isDist);

	app.get('/', function(request, response) {
		response.sendFile(path.join(dirname, isDist ? `/docs/bhere__it.html` : '/docs/index__it.html'));
	});

	app.get('/:lang/', function(request, response) {
		console.log(request.params);
		response.sendFile(path.join(dirname, isDist ? `/docs/bhere__${request.params.lang}.html` : '/docs/index__it.html'));
	});

	app.get('/:lang/:path/', function(request, response) {
		console.log(request.params);
		response.sendFile(path.join(dirname, isDist ? `/docs/bhere__${request.params.lang}.html` : '/docs/index__it.html'));
	});

	app.listen(options.port, () => {
		console.log(`NodeJs Running server at ${options.host}`);
	});

	const heroku = (process.env._ && process.env._.indexOf('heroku'));
	if (!heroku) {
		const privateKey = fs.readFileSync('certs/server.key', 'utf8');
		const certificate = fs.readFileSync('certs/server.crt', 'utf8');
		const credentials = { key: privateKey, cert: certificate };
		const serverHttps = https.createServer(credentials, app);
		serverHttps.listen(options.portHttps, () => {
			console.log(`NodeJs Running server at ${options.hostHttps}`);
		});
	}

	return app;
}

module.exports = {
	serve,
};
