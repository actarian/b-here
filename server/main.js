const https = require('https');
const fs = require('fs');
const serveStatic = require('serve-static');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: path.join(__dirname, '../docs/temp/') });
const { upload } = require('./upload/upload.js');
const uploader = upload(path.join(__dirname, '../docs/temp/'));
const { staticMiddleware } = require('./static/static.js');
// const { spaMiddleware } = require('./spa/spa.js');
const { apiMiddleware, useApi, uuid } = require('./api/api.js');
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
// const spaMiddleware_ = spaMiddleware(Vars);
const app = express();
app.use(session({
	secret: 'b-here-secret-keyword',
	saveUninitialized: true,
	resave: true
}));
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use('*', staticMiddleware_);
app.use('*', apiMiddleware_);

app.post('/api/upload', multipartMiddleware, function(request, response) {
	if (Vars.accessControlAllowOrigin) {
		response.header('Access-Control-Allow-Origin', '*');
	}
	console.log(request.body, request.files);
	/*
	file: {
		fieldName: 'file',
		originalFilename: 'ambiente1_x3_y3.jpg',
		path: 'C:\\WORK\\GIT\\TFS\\Websolute\\b-here\\docs\\temp\\CVvHZ4YYkiQdWmiAtTjhb6kF.jpg',
		headers: {
		  'content-disposition': 'form-data; name="file"; filename="ambiente1_x3_y3.jpg"',
		  'content-type': 'image/jpeg'
		},
		size: 3888620,
		name: 'ambiente1_x3_y3.jpg',
		type: 'image/jpeg'
	  }
	*/
	const file = request.files.file;
	const id = uuid();
	const fileName = `${id}_${file.name}`;
	const folder = `/uploads/`; // `uploads/`;
	const input = file.path;
	const output = path.join(__dirname, Vars.root, folder, fileName);
	const upload = {
		id,
		fileName,
		type: file.type,
		originalFileName: file.name,
		url: `${folder}${fileName}`,
		// url: `${request.protocol === 'https' ? Vars.hostHttps : Vars.host}${Vars.baseHref}${folder}${fileName}`,
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
	if (Vars.accessControlAllowOrigin) {
		response.header('Access-Control-Allow-Origin', '*');
	}
	response.status(200).send();
});

// Handle uploads through Flow.js
app.post('/api/upload_', multipartMiddleware, function(request, response) {
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
app.options('/api/upload_', function(request, response) {
	console.log('OPTIONS');
	if (Vars.accessControlAllowOrigin) {
		response.header('Access-Control-Allow-Origin', '*');
	}
	response.status(200).send();
});
// Handle status checks on chunks through Flow.js
app.get('/api/upload_', function(request, response) {
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
	response.sendFile(path.join(__dirname, '../docs/access.html'));
	// response.sendFile(path.join(__dirname, '../docs/index.html'));
	// response.render('docs/index');
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
/*
app.listen(Vars.port, () => {
	console.log(`NodeJs Running server at ${Vars.host}`);
});
*/

/*
const serverHttp = http.createServer(app);
serverHttp.listen(Vars.port, () => {
	console.log(`NodeJs Running server at ${Vars.host}`);
});
*/

app.listen(Vars.port, () => {
	console.log(`NodeJs Running server at ${Vars.host}`);
});

const heroku = (process.env._ && process.env._.indexOf('heroku'));
if (!heroku) {
	const privateKey = fs.readFileSync('certs/server.key', 'utf8');
	const certificate = fs.readFileSync('certs/server.crt', 'utf8');
	const credentials = { key: privateKey, cert: certificate };
	const serverHttps = https.createServer(credentials, app);
	serverHttps.listen(Vars.portHttps, () => {
		console.log(`NodeJs Running server at ${Vars.hostHttps}`);
	});
}
