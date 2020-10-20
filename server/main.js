const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { staticMiddleware } = require('./static/static.js');
const { apiMiddleware, useApi, uuid } = require('./api/api.js');
// const serveStatic = require('serve-static');
// const { upload } = require('./upload/upload.js');
// const uploader = upload(path.join(__dirname, '../docs/temp/'));
// const { spaMiddleware } = require('./spa/spa.js');
// const router = express.Router();
const BASE_HREF = '/b-here/';
const ASSETS = `assets/`;
const ROOT = `../docs/`;
const PORT = process.env.PORT || 5000;
const PORT_HTTPS = 6443;

const Vars = {
	port: PORT,
	portHttps: PORT_HTTPS,
	host: `http://localhost:${PORT}`,
	hostHttps: `https://localhost:${PORT_HTTPS}`,
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

const app = express();
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use('*', staticMiddleware_);
app.use('*', apiMiddleware_);

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname, '../docs/access.html'));
});
app.get('/self-service-tour', function(request, response) {
	response.sendFile(path.join(__dirname, '../docs/b-here.html'));
});
app.get('/guided-tour', function(request, response) {
	response.sendFile(path.join(__dirname, '../docs/b-here.html'));
});
app.get('/b-here', function(request, response) {
	response.sendFile(path.join(__dirname, '../docs/b-here.html'));
});
app.get('/editor', function(request, response) {
	response.sendFile(path.join(__dirname, '../docs/editor.html'));
});

app.listen(Vars.port, () => {
	console.log(`NodeJs Running server at ${Vars.host}`);
});
