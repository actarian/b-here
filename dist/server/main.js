/**
 * @license b-here v1.0.0
 * (c) 2020 Luca Zampetti <lzampetti@gmail.com>
 * License: MIT
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var https = _interopDefault(require('https'));
var fs = _interopDefault(require('fs'));
var express = _interopDefault(require('express'));
var expressSession = _interopDefault(require('express-session'));
var bodyParser = _interopDefault(require('body-parser'));
var path = _interopDefault(require('path'));
var connectMultiparty = _interopDefault(require('connect-multiparty'));

// const serveStatic = require('serve-static');

var MIME_CONTENT_TYPES = {
  "css": "text/css",
  // Cascading Style Sheets (CSS)
  "csv": "text/csv",
  // Comma-separated values (CSV)
  "htm": "text/html",
  // HyperText Markup Language (HTML)
  "html": "text/html",
  // HyperText Markup Language (HTML)
  "ics": "text/calendar",
  // iCalendar format
  "js": "text/javascript",
  // per the following specifications: https://html.spec.whatwg.org/multipage/#scriptingLanguages, https://html.spec.whatwg.org/multipage/#dependencies:willful-violation, https://datatracker.ietf.org/doc/draft-ietf-dispatch-javascript-mjs/ JavaScript
  "mjs": "text/javascript",
  // JavaScript module
  "txt": "text/plain",
  // Text, (generally ASCII or ISO 8859-n)
  "xml": "text/xml",
  // if readable from casual users (RFC 3023, section 3) "application/xml" if not readable from casual users (RFC 3023, section 3)", // XML
  "bmp": "image/bmp",
  // Windows OS/2 Bitmap Graphics
  "gif": "image/gif",
  // Graphics Interchange Format (GIF)
  "ico": "image/vnd.microsoft.icon",
  // Icon format
  "jpeg": "image/jpeg",
  // JPEG images
  "jpg": "image/jpeg",
  // JPEG images
  "png": "image/png",
  // Portable Network Graphics
  "svg": "image/svg+xml",
  // Scalable Vector Graphics (SVG)
  "tif": "image/tiff",
  // Tagged Image File Format (TIFF)
  "tiff": "image/tiff",
  // Tagged Image File Format (TIFF)
  "webp": "image/webp",
  // WEBP image
  "otf": "font/otf",
  // OpenType font
  "ttf": "font/ttf",
  // TrueType Font
  "woff": "font/woff",
  // Web Open Font Format (WOFF)
  "woff2": "font/woff2",
  // Web Open Font Format (WOFF)
  "aac": "audio/aac",
  // AAC audio
  "mid": "audio/midi audio/x-midi",
  // Musical Instrument Digital Interface (MIDI)
  "midi": "audio/midi audio/x-midi",
  // Musical Instrument Digital Interface (MIDI)
  "mp3": "audio/mpeg",
  // MP3 audio
  "mp4": "audio/mp4",
  // MP4 video
  "oga": "audio/ogg",
  // OGG audio
  "opus": "audio/opus",
  // Opus audio
  "wav": "audio/wav",
  // Waveform Audio Format
  "weba": "audio/webm",
  // WEBM audio
  "avi": "video/x-msvideo",
  // AVI: Audio Video Interleave
  "mpeg": "video/mpeg",
  // MPEG Video
  "ogv": "video/ogg",
  // OGG video
  "ts": "video/mp2t",
  // MPEG transport stream
  "webm": "video/webm",
  // WEBM video
  "3gp": "video/3gpp",
  //	audio/3gpp if it doesn't contain video", // 3GPP audio/video container
  "3g2": "video/3gpp2",
  // audio/3gpp2 if it doesn't contain video", // 3GPP2 audio/video container
  "abw": "application/x-abiword",
  // AbiWord document
  "arc": "application/x-freearc",
  // Archive document (multiple files embedded)
  "azw": "application/vnd.amazon.ebook",
  // Amazon Kindle eBook format
  "bin": "application/octet-stream",
  // Any kind of binary data
  "bz": "application/x-bzip",
  // BZip archive
  "bz2": "application/x-bzip2",
  // BZip2 archive
  "csh": "application/x-csh",
  // C-Shell script
  "doc": "application/msword",
  // Microsoft Word
  "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Microsoft Word (OpenXML)
  "eot": "application/vnd.ms-fontobject",
  // MS Embedded OpenType fonts
  "epub": "application/epub+zip",
  // Electronic publication (EPUB)
  "gz": "application/gzip",
  // GZip Compressed Archive
  "jar": "application/java-archive",
  // Java Archive (JAR)
  "json": "application/json",
  // JSON format
  "jsonld": "application/ld+json",
  // JSON-LD format
  "map": "application/ld+json",
  // sourcemaps
  "mpkg": "application/vnd.apple.installer+xml",
  // Apple Installer Package
  "odp": "application/vnd.oasis.opendocument.presentation",
  // OpenDocument presentation document
  "ods": "application/vnd.oasis.opendocument.spreadsheet",
  // OpenDocument spreadsheet document
  "odt": "application/vnd.oasis.opendocument.text",
  // OpenDocument text document
  "ogx": "application/ogg",
  // OGG
  "pdf": "application/pdf",
  // Adobe Portable Document Format (PDF)
  "php": "application/x-httpd-php",
  // Hypertext Preprocessor (Personal Home Page)
  "ppt": "application/vnd.ms-powerpoint",
  // Microsoft PowerPoint
  "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  // Microsoft PowerPoint (OpenXML)
  "rar": "application/vnd.rar",
  // RAR archive
  "rtf": "application/rtf",
  // Rich Text Format (RTF)
  "sh": "application/x-sh",
  // Bourne shell script
  "swf": "application/x-shockwave-flash",
  // Small web format (SWF) or Adobe Flash document
  "tar": "application/x-tar",
  // Tape Archive (TAR)
  "vsd": "application/vnd.visio",
  // Microsoft Visio
  "webmanifest": "application/json",
  // webmanifest
  "xhtml": "application/xhtml+xml",
  // XHTML
  "xls": "application/vnd.ms-excel",
  // Microsoft Excel
  "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // Microsoft Excel (OpenXML)
  "xul": "application/vnd.mozilla.xul+xml",
  // XUL
  "zip": "application/zip",
  // ZIP archive
  "7z": "application/x-7z-compressed",
  // 7-zip archive,
  "glb": "application/octet-stream",
  // Glb
  "gltf": "application/octet-stream",
  // Gltf
  "fbx": "application/octet-stream",
  // Fbx
  "usdz": "application/octet-stream" // Usdz

};
var MIME_TEXT = ['css', 'csv', 'htm', 'html', 'ics', 'js', 'mjs', 'txt', 'xml'];
var MIME_IMAGE = ['bmp', 'gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'tif', 'tiff', 'webp'];
var MIME_FONTS = ['otf', 'ttf', 'woff', 'woff2'];
var MIME_AUDIO = ['aac', 'mid', 'midi', 'mp3', 'oga', 'opus', 'wav', 'weba'];
var MIME_VIDEO = ['mp4', 'avi', 'mpeg', 'ogv', 'ts', 'webm', '3gp', '3g2'];
var MIME_APPLICATION = ['abw', 'arc', 'azw', 'bin', 'bz', 'bz2', 'csh', 'doc', 'docx', 'eot', 'epub', 'gz', 'jar', 'json', 'jsonld', 'map', 'mpkg', 'odp', 'ods', 'odt', 'ogx', 'pdf', 'php', 'ppt', 'pptx', 'rar', 'rtf', 'sh', 'swf', 'tar', 'vsd', 'webmanifest', 'xhtml', 'xls', 'xlsx', 'xul', 'zip', '7z', 'glb', 'gltf', 'fbx', 'usdz'];
var MIME_TYPES = [].concat(MIME_TEXT, MIME_IMAGE, MIME_FONTS, MIME_AUDIO, MIME_VIDEO, MIME_APPLICATION);

function staticMiddleware(vars) {
  if (!vars.root) {
    throw new Error('missing Vars.root!');
  }

  if (!vars.baseHref) {
    throw new Error('missing Vars.baseHref!');
  }

  return function (request, response, next) {
    var url = unescape(request.baseUrl.replace(/\\/g, '/'));
    var baseHref = vars.baseHref.substr(0, vars.baseHref.length - 1).replace(/\\/g, '/');
    var regExpText = "^(" + baseHref + ")?(\\/[^\\?\\#]+)(\\.(" + MIME_TYPES.join('|') + "))(\\?.+)?(\\#.+)?$"; // console.log('regExpText', url, regExpText);

    var regExp = new RegExp(regExpText); // console.log('NodeJs.regExp', regExp);

    var matches = regExp.exec(url); // console.log(request.url, request.baseUrl, request.originalUrl, match);

    if (matches) {
      var extension = matches[4];
      var file = path.join(matches[2] + '.' + extension);
      var filePath = path.join(__dirname, '../', vars.root, file);
      fs.readFile(filePath, {}, function (error, data) {
        if (error) {
          console.log('NodeJs.staticMiddleware.notFound', file);
          return next();
        }

        console.log('NodeJs.staticMiddleware.serving', file);
        response.set('Content-Type', MIME_CONTENT_TYPES[extension]);
        response.send(data);
      });
    } else {
      // console.log('NodeJs.staticMiddleware.unmatch', file);
      next();
    }
  };
}
// app.use(express.static('/', { index: false, extensions: MIME_TYPES }));
// app.use(STATIC_REGEXP, serveStatic(path.join(__dirname, `${ROOT}`)));
// app.use('/', serveStatic(path.join(__dirname, `${ROOT}`)));
// app.use(express.static(path.join(__dirname, ROOT)));

var _static = {
  mimeContentTypes: MIME_CONTENT_TYPES,
  mimeText: MIME_TEXT,
  mimeImage: MIME_IMAGE,
  mimeFonts: MIME_FONTS,
  mimeAudio: MIME_AUDIO,
  mimeVideo: MIME_VIDEO,
  mimeApplication: MIME_APPLICATION,
  staticMiddleware: staticMiddleware
};

var RoleType = {
  Publisher: 'publisher',
  Attendee: 'attendee',
  Streamer: 'streamer',
  Viewer: 'viewer',
  SelfService: 'self-service'
};
/*
const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-access-token');
const appCertificate = '';

app.post('/api/token/rtc', function(request, response) {
	const payload = request.body || {};
	const duration = 3600;
	const timestamp = Math.floor(Date.now() / 1000);
	const expirationTime = timestamp + duration;
	const uid = payload.uid ? String(payload.uid) : timestamp.toString();
	const role = RtcRole.PUBLISHER;
	const token = RtcTokenBuilder.buildTokenWithUid(environment.appKey, appCertificate, environment.channelName, uid, role, expirationTime);
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
	const token = RtmTokenBuilder.buildToken(environment.appKey, appCertificate, uid, role, expirationTime);
	response.send(JSON.stringify({
		token: token,
	}));
});
*/

var db = {
  views: [],
  assets: [],
  users: [{
    id: '1601892639985',
    username: 'publisher',
    password: 'publisher',
    type: 'publisher',
    firstName: 'Jhon',
    lastName: 'Appleseed'
  }, {
    id: '1601892639986',
    username: 'attendee',
    password: 'attendee',
    type: 'attendee',
    firstName: 'Jhon',
    lastName: 'Appleseed'
  }]
};
var pathname = path.join(__dirname, "../../docs/api/editor.json");
readStore();

function uuid() {
  // return new Date().getTime();
  return parseInt(process.hrtime.bigint().toString());
}

function useApi() {
  return null;
}

function readStore() {
  fs.readFile(pathname, 'utf8', function (error, data) {
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
  var data = JSON.stringify(db, null, 2);
  fs.writeFile(pathname, data, 'utf8', function (error, data) {
    if (error) {
      console.log('NodeJs.Api.saveStore.error', error, pathname);
    }
  });
}

function sendError(response, status, message) {
  response.status(status).set('Content-Type', 'application/json').send(JSON.stringify({
    status: status,
    message: message
  }));
}

function sendOk(response, data) {
  if (data) {
    response.status(200).set('Content-Type', 'application/json').send(JSON.stringify(data));
  } else {
    response.status(200).set('Content-Type', 'text/plain').send();
  }
}

function doCreate(request, response, params, items) {
  var body = request.body;
  var id = uuid();
  var item = Object.assign({}, body, {
    id: id
  });

  if (item.items) {
    item.items.forEach(function (x) {
      return x.id = uuid();
    });
  }

  if (item.tiles) {
    item.tiles.forEach(function (x) {
      return x.id = uuid();
    });
  }

  if (item.navs) {
    item.navs.forEach(function (x) {
      return x.id = uuid();
    });
  }

  items.push(item);
  saveStore();
  sendOk(response, item);
}

function doUpdate(request, response, params, items) {
  var body = request.body;
  var item = items.find(function (x) {
    return x.id === body.id;
  });

  if (item) {
    Object.assign(item, body);
    saveStore();
    sendOk(response, item);
  } else {
    sendError(response, 404, 'Not Found');
  }
}

function doDelete(request, response, params, items) {
  var index = items.reduce(function (p, x, i) {
    return x.id === params.id ? i : p;
  }, -1);

  if (index !== -1) {
    // const item = items[index];
    items.splice(index, 1);
    saveStore(); // sendOk(response, item);

    sendOk(response);
  } else {
    sendError(response, 404, 'Not Found');
  }
}

function doGet(request, response, params, items) {
  var item = items.find(function (x) {
    return x.id === params.id;
  });

  if (!item) {
    sendError(response, 404, 'Not Found');
  }

  return item;
} // /api/upload


var ROUTES = [{
  path: '/api/view',
  method: 'GET',
  callback: function callback(request, response, params) {
    sendOk(response, db);
  }
}, {
  path: '/api/view/:viewId',
  method: 'GET',
  callback: function callback(request, response, params) {
    var view = doGet(request, response, {
      id: params.viewId
    }, db.views);

    if (view) {
      sendOk(response, view);
    }
  }
}, {
  path: '/api/view',
  method: 'POST',
  callback: function callback(request, response, params) {
    doCreate(request, response, params, db.views);
  }
}, {
  path: '/api/view/:viewId',
  method: 'PUT',
  callback: function callback(request, response, params) {
    doUpdate(request, response, params, db.views);
  }
}, {
  path: '/api/view/:viewId',
  method: 'DELETE',
  callback: function callback(request, response, params) {
    doDelete(request, response, {
      id: params.viewId
    }, db.views);
  }
}, {
  path: '/api/view/:viewId/item',
  method: 'POST',
  callback: function callback(request, response, params) {
    var view = doGet(request, response, {
      id: params.viewId
    }, db.views);

    if (view) {
      view.items = view.items || [];
      doCreate(request, response, params, view.items);
    }
  }
}, {
  path: '/api/view/:viewId/item/:viewItemId',
  method: 'PUT',
  callback: function callback(request, response, params) {
    var view = doGet(request, response, {
      id: params.viewId
    }, db.views);

    if (view) {
      view.items = view.items || [];
      doUpdate(request, response, params, view.items);
    }
  }
}, {
  path: '/api/view/:viewId/item/:viewItemId',
  method: 'DELETE',
  callback: function callback(request, response, params) {
    var view = doGet(request, response, {
      id: params.viewId
    }, db.views);

    if (view) {
      doDelete(request, response, {
        id: params.viewItemId
      }, view.items);
    }
  }
}, {
  path: '/api/view/:viewId/tile/:tileId/item',
  method: 'POST',
  callback: function callback(request, response, params) {
    var view = doGet(request, response, {
      id: params.viewId
    }, db.views);

    if (view) {
      var tile = view.tiles.find(function (x) {
        return x.id === params.tileId;
      });

      if (tile) {
        tile.navs = tile.navs || [];
        doCreate(request, response, params, tile.navs);
      } else {
        sendError(response, 404, 'Not Found');
      }
    }
  }
}, {
  path: '/api/view/:viewId/tile/:tileId/item/:viewItemId',
  method: 'PUT',
  callback: function callback(request, response, params) {
    var view = doGet(request, response, {
      id: params.viewId
    }, db.views);

    if (view) {
      var tile = view.tiles.find(function (x) {
        return x.id === params.tileId;
      });

      if (tile) {
        tile.navs = tile.navs || [];
        doUpdate(request, response, params, tile.navs);
      } else {
        sendError(response, 404, 'Not Found');
      }
    }
  }
}, {
  path: '/api/view/:viewId/tile/:tileId/item/:viewItemId',
  method: 'DELETE',
  callback: function callback(request, response, params) {
    var view = doGet(request, response, {
      id: params.viewId
    }, db.views);

    if (view) {
      var tile = view.tiles.find(function (x) {
        return x.id === params.tileId;
      });

      if (tile) {
        tile.navs = tile.navs || [];
        doDelete(request, response, {
          id: params.viewItemId
        }, tile.navs);
      } else {
        sendError(response, 404, 'Not Found');
      }
    }
  }
}, {
  path: '/api/asset',
  method: 'POST',
  callback: function callback(request, response, params) {
    doCreate(request, response, params, db.assets);
  }
}, {
  path: '/api/asset/:assetId',
  method: 'PUT',
  callback: function callback(request, response, params) {
    doUpdate(request, response, params, db.assets);
  }
}, {
  path: '/api/asset/:assetId',
  method: 'DELETE',
  callback: function callback(request, response, params) {
    doDelete(request, response, {
      id: params.assetId
    }, db.assets);
  }
}, {
  path: '/api/user/me',
  method: 'GET',
  callback: function callback(request, response, params) {
    var user = request.session.user;

    if (!user) {
      sendError(response, 404, 'Not Found');
    } else {
      sendOk(response, user);
    }
  }
}, {
  path: '/api/user/login',
  method: 'POST',
  callback: function callback(request, response, params) {
    var body = request.body;
    var user = db.users.find(function (x) {
      return x.username === body.username && x.password === body.password;
    });

    if (!user) {
      sendError(response, 404, 'Not Found');
    } else {
      request.session.user = user;
      sendOk(response, user);
    }
  }
}, {
  path: '/api/user/logout',
  method: 'GET',
  callback: function callback(request, response, params) {
    var user = request.session.user;
    request.session.user = null;
    sendOk(response);
  }
}, {
  path: '/api/user/guided-tour',
  method: 'POST',
  callback: function callback(request, response, params) {
    var body = request.body;
    var id = uuid();
    var user = Object.assign({
      type: RoleType.Streamer
    }, body, {
      id: id
    });
    request.session.user = null;
    db.users.push(user);
    saveStore();
    sendOk(response, user);
  }
}, {
  path: '/api/user/self-service-tour',
  method: 'POST',
  callback: function callback(request, response, params) {
    var body = request.body;
    var id = uuid();
    var user = Object.assign({
      type: RoleType.SelfService
    }, body, {
      id: id
    });
    request.session.user = user;
    db.users.push(user);
    saveStore();
    sendOk(response, user);
  }
}];
ROUTES.forEach(function (route) {
  var segments = [];

  if (route.path === '**') {
    segments.push(route.path);
    route.matcher = new RegExp('^.*$');
  } else {
    var matchers = ["^"];
    var regExp = /(^\.\.\/|\.\/|\/\/|\/)|([^:|\/]+)\/?|\:([^\/]+)\/?/g;
    var match;

    while ((match = regExp.exec(route.path)) !== null) {
      var g1 = match[1];
      var g2 = match[2];
      var g3 = match[3];

      if (g1) ; else if (g2) {
        matchers.push("/(" + g2 + ")");
        segments.push({
          name: g2,
          param: null,
          value: null
        });
      } else if (g3) {
        matchers.push('\/([^\/]+)');
        var params = {};
        params[g3] = null;
        route.params = params;
        segments.push({
          name: '',
          param: g3,
          value: null
        });
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
    var regexp = matchers.join('');
    console.log(regexp);
    route.matcher = new RegExp(regexp);
  }

  route.segments = segments;
});

function apiMiddleware(vars) {
  if (!vars.root) {
    throw new Error('missing Vars.root!');
  }

  if (!vars.baseHref) {
    throw new Error('missing Vars.baseHref!');
  }

  return function (request, response, next) {
    var url = request.baseUrl.replace(/\\/g, '/');
    var params = {};
    var method = ROUTES.find(function (route) {
      if (route.method.toLowerCase() === request.method.toLowerCase()) {
        var match = url.match(route.matcher);

        if (match) {
          route.segments.forEach(function (x, i) {
            if (x.param) {
              var value = match[i + 1];

              if (parseInt(value).toString() === value) {
                value = parseInt(value);
              }

              params[x.param] = value;
            }
          }); // console.log('match', match, route);

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
}
var api = {
  apiMiddleware: apiMiddleware,
  useApi: useApi,
  uuid: uuid
};

var staticMiddleware$1 = _static.staticMiddleware;
var apiMiddleware$1 = api.apiMiddleware,
    uuid$1 = api.uuid;
var multipartMiddleware = connectMultiparty({
  uploadDir: path.join(__dirname, '../docs/temp/')
}); // const serveStatic = require('serve-static');
// const { upload } = require('./upload/upload.js');
// const uploader = upload(path.join(__dirname, '../docs/temp/'));
// const { spaMiddleware } = require('./spa/spa.js');
// const router = express.Router();

var BASE_HREF = '/b-here/';
var ASSETS = "assets/";
var ROOT = "../docs/";
var PORT = process.env.PORT || 5000;
var PORT_HTTPS = 6443;
var Vars = {
  port: PORT,
  portHttps: PORT_HTTPS,
  host: "http://localhost:" + PORT,
  hostHttps: "https://localhost:" + PORT_HTTPS,
  charset: 'utf8',
  assets: ASSETS,
  baseHref: BASE_HREF,
  cacheMode: 'file',
  cache: path.join(__dirname, "../cache/"),
  root: ROOT,
  template: path.join(__dirname, ROOT + "index.html"),
  accessControlAllowOrigin: true
};
var staticMiddleware_ = staticMiddleware$1(Vars);
var apiMiddleware_ = apiMiddleware$1(Vars);
var app = express();
app.use(expressSession({
  secret: 'b-here-secret-keyword',
  saveUninitialized: true,
  resave: true
}));
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use('*', staticMiddleware_);
app.use('*', apiMiddleware_);
app.post('/api/upload', multipartMiddleware, function (request, response) {
  if (Vars.accessControlAllowOrigin) {
    response.header('Access-Control-Allow-Origin', '*');
  }

  console.log(request.body, request.files);
  var file = request.files.file;
  var id = uuid$1();
  var fileName = id + "_" + file.name;
  var folder = "/uploads/";
  var input = file.path;
  var output = path.join(__dirname, Vars.root, folder, fileName);
  var upload = {
    id: id,
    fileName: fileName,
    type: file.type,
    originalFileName: file.name,
    url: "" + folder + fileName
  };
  var uploads = [upload];
  fs.copyFile(input, output, function (error) {
    fs.unlink(input, function () {});

    if (error) {
      throw error;
    } else {
      response.status(200).send(JSON.stringify(uploads));
    }
  });
});
app.options('/api/upload', function (request, response) {
  console.log('OPTIONS');

  if (Vars.accessControlAllowOrigin) {
    response.header('Access-Control-Allow-Origin', '*');
  }

  response.status(200).send();
});
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '../docs/access.html'));
});
app.get('/self-service-tour', function (request, response) {
  response.sendFile(path.join(__dirname, '../docs/b-here.html'));
});
app.get('/guided-tour', function (request, response) {
  response.sendFile(path.join(__dirname, '../docs/b-here.html'));
});
app.get('/b-here', function (request, response) {
  response.sendFile(path.join(__dirname, '../docs/b-here.html'));
});
app.get('/editor', function (request, response) {
  response.sendFile(path.join(__dirname, '../docs/editor.html'));
});
app.listen(Vars.port, function () {
  console.log("NodeJs Running server at " + Vars.host);
});

var heroku = process.env._ && process.env._.indexOf('heroku');

if (!heroku) {
  var privateKey = fs.readFileSync('certs/server.key', 'utf8');
  var certificate = fs.readFileSync('certs/server.crt', 'utf8');
  var credentials = {
    key: privateKey,
    cert: certificate
  };
  var serverHttps = https.createServer(credentials, app);
  serverHttps.listen(Vars.portHttps, function () {
    console.log("NodeJs Running server at " + Vars.hostHttps);
  });
}
//# sourceMappingURL=main.js.map
