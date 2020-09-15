const https = require('https');
const fs = require('fs');
const serveStatic = require('serve-static');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const { upload } = require('./upload/upload.js');
const uploader = upload(path.join(__dirname, '../docs/temp/'));
const { staticMiddleware } = require('./static/static.js');
// const { spaMiddleware } = require('./spa/spa.js');
const { apiMiddleware, useApi } = require('./api/api.js');
// const router = express.Router();
// const https = require('https');
const BASE_HREF = '/b-here/';
const ASSETS = `assets/`;
const ROOT = `../docs/`;
const PORT = process.env.PORT || 5000;

const Vars = {
	port: PORT,
	host: `http://localhost:${PORT}`,
	charset: 'utf8',
	assets: ASSETS,
	baseHref: BASE_HREF,
	cacheMode: 'file',
	cache: path.join(__dirname, `../cache/`),
	root: ROOT,
	template: path.join(__dirname, `${ROOT}index.html`),
	accessControlAllowOrigin: true,
};

const staticMiddleware_ = staticMiddleware(Vars);
const apiMiddleware_ = apiMiddleware(Vars);
// const spaMiddleware_ = spaMiddleware(Vars);
const app = express();
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use('*', staticMiddleware_);
app.use('*', apiMiddleware_);
// Handle uploads through Flow.js
app.post('/api/upload', multipartMiddleware, function(request, response) {
	uploader.post(request, function(status, filename, original_filename, identifier) {
		console.log('POST', status, original_filename, identifier);
		if (Vars.accessControlAllowOrigin) {
			response.header('Access-Control-Allow-Origin', '*');
		}
		if (status === 'done') {
			filename = identifier + '_' + filename;
			const stream = fs.createWriteStream(path.join(__dirname, '../docs/uploads/', filename));
			stream.on('finish', function() {
				response.status(200).send(JSON.stringify({
					filename,
					url: `/uploads/${filename}`,
				}));
			});
			uploader.write(identifier, stream, { end: true });
		} else {
			response.status(/^(partly_done|done)$/.test(status) ? 200 : 500).send();
		}
	});
});
app.options('/api/upload', function(request, response) {
	console.log('OPTIONS');
	if (Vars.accessControlAllowOrigin) {
		response.header('Access-Control-Allow-Origin', '*');
	}
	response.status(200).send();
});
// Handle status checks on chunks through Flow.js
app.get('/api/upload', function(request, response) {
	uploader.get(request, function(status, filename, original_filename, identifier) {
		console.log('GET', status);
		if (Vars.accessControlAllowOrigin) {
			response.header('Access-Control-Allow-Origin', '*');
		}
		if (status == 'found') {
			status = 200;
		} else {
			status = 204;
		}
		response.status(status).send();
	});
});
app.get('/api/download/:identifier', function(request, response) {
	uploader.write(request.params.identifier, response);
});
// Handle uploads through Flow.js
// app.get('*', spaMiddleware_);
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname, '../docs/index.html'));
	// response.render('docs/index');
});
app.listen(Vars.port, () => {
	console.log(`NodeJs Running server at ${Vars.host}`);
});
