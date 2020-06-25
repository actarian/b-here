/**
 * @license b-here v1.0.0
 * (c) 2020 Luca Zampetti <lzampetti@gmail.com>
 * License: MIT
 */

'use strict';

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var NODE = typeof module !== 'undefined' && module.exports;
var PARAMS = NODE ? {
  get: function get() {}
} : new URLSearchParams(window.location.search);
var DEBUG =  PARAMS.get('debug') != null;
var BASE_HREF = NODE ? null : document.querySelector('base').getAttribute('href');
var DEVELOPMENT = NODE ? false : window && ['localhost', '127.0.0.1', '0.0.0.0'].indexOf(window.location.host.split(':')[0]) !== -1;
var Environment = /*#__PURE__*/function () {
  var _proto = Environment.prototype;

  _proto.getModelPath = function getModelPath(path) {
    return this.href + this.paths.models + path;
  };

  _proto.getTexturePath = function getTexturePath(path) {
    return this.href + this.paths.textures + path;
  };

  _proto.getFontPath = function getFontPath(path) {
    return this.href + this.paths.fonts + path;
  };

  _createClass(Environment, [{
    key: "href",
    get: function get() {
      if (window.location.host.indexOf('herokuapp') !== -1) {
        return 'https://raw.githack.com/actarian/b-here/master/docs/';
      } else {
        return BASE_HREF;
      }
    }
  }, {
    key: "host",
    get: function get() {
      var host = window.location.host.replace('127.0.0.1', '192.168.1.2'); // let host = window.location.host;

      if (host.substr(host.length - 1, 1) === '/') {
        host = host.substr(0, host.length - 1);
      }

      return window.location.protocol + "//" + host + BASE_HREF;
    }
  }]);

  function Environment(options) {
    if (options) {
      Object.assign(this, options);
    }
  }

  return Environment;
}();
var environment = new Environment({
  appKey: '8b0cae93d47a44e48e97e7fd0404be4e',
  appCertificate: '',
  channelName: 'BHere',
  publisherId: '999',
  debugMeetingId: '1591366622325',
  port: 5000,
  apiEnabled: false,
  paths: {
    models: 'models/',
    textures: 'textures/',
    fonts: 'fonts/'
  }
});

var express = require('express');

var https = require('https');

var fs = require('fs');

var bodyParser = require('body-parser');

var serveStatic = require('serve-static');

var path = require('path');

var _require = require('agora-access-token'),
    RtcTokenBuilder = _require.RtcTokenBuilder,
    RtmTokenBuilder = _require.RtmTokenBuilder,
    RtcRole = _require.RtcRole,
    RtmRole = _require.RtmRole;
var PORT = process.env.PORT || environment.port;
var app = express();
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '../../docs/')));
app.use('/b-here', serveStatic(path.join(__dirname, '../../docs/')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.raw()); // app.use(express.favicon());

/*
app.get('/', function(request, response) {
	response.send('Hello World!');
});
*/

/*
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (request, response) => response.render('pages/index'));
*/
// app.set('view engine', 'handlebars');

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '../../docs/index.html')); // response.render('docs/index');
});
app.post('/api/token/rtc', function (request, response) {
  var payload = request.body || {};
  var duration = 3600;
  var timestamp = Math.floor(Date.now() / 1000);
  var expirationTime = timestamp + duration;
  var uid = payload.uid ? String(payload.uid) : timestamp.toString();
  var role = RtcRole.PUBLISHER;
  var token = RtcTokenBuilder.buildTokenWithUid(environment.appKey, environment.appCertificate, environment.channelName, uid, role, expirationTime);
  response.send(JSON.stringify({
    token: token
  }));
});
app.post('/api/token/rtm', function (request, response) {
  var payload = request.body || {};
  var duration = 3600;
  var timestamp = Math.floor(Date.now() / 1000);
  var expirationTime = timestamp + duration;
  var uid = payload.uid ? String(payload.uid) : timestamp.toString();
  var role = RtmRole.PUBLISHER;
  var token = RtmTokenBuilder.buildToken(environment.appKey, environment.appCertificate, uid, role, expirationTime);
  response.send(JSON.stringify({
    token: token
  }));
});
/*
app.listen(PORT, () => {
	console.log(`Listening on ${ PORT }`);
});
*/

https.createServer({
  cert: fs.readFileSync(path.join(__dirname, '../../certs/server.crt'), 'utf8'),
  key: fs.readFileSync(path.join(__dirname, '../../certs/server.key'), 'utf8')
}, app).listen(PORT, function () {
  console.log("Example app listening on port " + PORT + "! Go to https://192.168.1.2:" + PORT + "/");
}); // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.
// Build token with uid
// const token = RtcTokenBuilder.buildTokenWithUid(environment.appKey, environment.appCertificate, environment.channelName, uid, role, expirationTime);
// Build token with user account
// const token = RtcTokenBuilder.buildTokenWithAccount(environment.appKey, environment.appCertificate, environment.channelName, account, role, expirationTime);
//# sourceMappingURL=main.js.map
