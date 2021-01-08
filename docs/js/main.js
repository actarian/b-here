/**
 * @license b-here v1.0.0
 * (c) 2021 Luca Zampetti <lzampetti@gmail.com>
 * License: MIT
 */

(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(require('rxcomp'),require('rxcomp-form'),require('rxjs/operators'),require('rxjs'),require('three'),require('html2canvas')):typeof define==='function'&&define.amd?define(['rxcomp','rxcomp-form','rxjs/operators','rxjs','three','html2canvas'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f(g.rxcomp,g.rxcomp.form,g.rxjs.operators,g.rxjs,g.THREE,g.html2canvas));}(this,(function(rxcomp, rxcompForm, operators, rxjs, three, html2canvas){'use strict';html2canvas=html2canvas&&Object.prototype.hasOwnProperty.call(html2canvas,'default')?html2canvas['default']:html2canvas;function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _readOnlyError(name) {
  throw new Error("\"" + name + "\" is read-only");
}var environmentServed = {
  appKey: '8b0cae93d47a44e48e97e7fd0404be4e',
  channelName: 'BHere',
  flags: {
    production: true,
    useProxy: false,
    useToken: false,
    selfService: true,
    guidedTourRequest: true,
    editor: false,
    ar: true,
    menu: true,
    attendee: true,
    streamer: true,
    viewer: true,
    maxQuality: false
  },
  logo: null,
  background: {
    image: '/Modules/B-Here/Client/docs/img/background.jpg',
    video: '/Modules/B-Here/Client/docs/img/background.mp4'
  },
  colors: {
    menuBackground: '#000000',
    menuForeground: '#ffffff',
    menuOverBackground: '#0099ff',
    menuOverForeground: '#ffffff',
    menuBackBackground: '#0099ff',
    menuBackForeground: '#000000',
    menuBackOverBackground: '#0099ff',
    menuBackOverForeground: '#ffffff'
  },
  editor: {
    disabledViewTypes: ['waiting-room', 'room-3d'],
    disabledViewItemTypes: ['texture']
  },
  assets: '/Modules/B-Here/Client/docs/',
  worker: '/Modules/B-Here/Client/docs/js/workers/image.service.worker.js',
  githubDocs: 'https://raw.githubusercontent.com/actarian/b-here/b-here-demo/docs/',
  language: '/it',
  market: '/it',
  url: {
    index: '/',
    access: '/',
    editor: '/editor',
    selfServiceTour: '/self-service-tour',
    guidedTour: '/guided-tour'
  },
  template: {
    tryInAr: '/template/modules/b-here/try-in-ar.cshtml?viewId=$viewId',
    modal: {
      controlRequest: '/template/modules/b-here/control-request-modal.cshtml',
      tryInAr: '/template/modules/b-here/try-in-ar-modal.cshtml',
      view: {
        'panorama': '/template/modules/b-here/panorama-modal.cshtml',
        'panorama-grid': '/template/modules/b-here/panorama-grid-modal.cshtml',
        'room-3d': '/template/modules/b-here/room-3d-modal.cshtml',
        'model': '/template/modules/b-here/model-modal.cshtml'
      },
      viewItem: {
        'nav': '/template/modules/b-here/nav-modal.cshtml',
        'plane': '/template/modules/b-here/plane-modal.cshtml',
        'curved-plane': '/template/modules/b-here/curved-plane-modal.cshtml',
        'texture': '/template/modules/b-here/texture-modal.cshtml',
        'model': '/template/modules/b-here/item-model-modal.cshtml'
      },
      remove: '/template/modules/b-here/remove-modal.cshtml'
    }
  }
};var environmentStatic = {
  appKey: '8b0cae93d47a44e48e97e7fd0404be4e',
  channelName: 'BHere',
  flags: {
    production: false,
    useProxy: false,
    useToken: false,
    selfService: true,
    guidedTourRequest: true,
    editor: true,
    ar: true,
    menu: true,
    attendee: true,
    streamer: true,
    viewer: true,
    maxQuality: false
  },
  logo: null,
  background: {
    image: '/b-here/img/background.jpg',
    video: '/b-here/img/background.mp4'
  },
  colors: {
    menuBackground: '#000000',
    menuForeground: '#ffffff',
    menuOverBackground: '#0099ff',
    menuOverForeground: '#ffffff',
    menuBackBackground: '#0099ff',
    menuBackForeground: '#000000',
    menuBackOverBackground: '#0099ff',
    menuBackOverForeground: '#ffffff'
  },
  editor: {
    disabledViewTypes: ['waiting-room', 'room-3d'],
    disabledViewItemTypes: ['texture']
  },
  assets: './',
  worker: './js/workers/image.service.worker.js',
  githubDocs: 'https://raw.githubusercontent.com/actarian/b-here/b-here-demo/docs/',
  language: '',
  market: '',
  url: {
    index: '/',
    access: '/',
    editor: '/editor',
    selfServiceTour: '/self-service-tour',
    guidedTour: '/guided-tour'
  },
  template: {
    tryInAr: '/try-in-ar.html?viewId=$viewId',
    modal: {
      controlRequest: '/control-request-modal.html',
      tryInAr: '/try-in-ar-modal.html',
      view: {
        'panorama': '/panorama-modal.html',
        'panorama-grid': '/panorama-grid-modal.html',
        'room-3d': '/room-3d-modal.html',
        'model': '/model-modal.html'
      },
      viewItem: {
        'nav': '/nav-modal.html',
        'plane': '/plane-modal.html',
        'curved-plane': '/curved-plane-modal.html',
        'texture': '/texture-modal.html',
        'model': '/item-model-modal.html'
      },
      remove: '/remove-modal.html'
    }
  }
};var Utils = /*#__PURE__*/function () {
  function Utils() {}

  Utils.merge = function merge(target, source) {
    var _this = this;

    if (typeof source === 'object') {
      Object.keys(source).forEach(function (key) {
        var value = source[key];

        if (typeof value === 'object' && !Array.isArray(value)) {
          target[key] = _this.merge(target[key], value);
        } else {
          target[key] = value;
        }
      });
    }

    return target;
  };

  return Utils;
}();var NODE = typeof module !== 'undefined' && module.exports;
var PARAMS = NODE ? {
  get: function get() {}
} : new URLSearchParams(window.location.search);
var DEBUG =  PARAMS.get('debug') != null;
var BASE_HREF = NODE ? null : document.querySelector('base').getAttribute('href');
var HEROKU = NODE ? false : window && window.location.host.indexOf('herokuapp') !== -1;
var STATIC = NODE ? false : HEROKU || window && (window.location.port === '41789' || window.location.port === '5000' || window.location.port === '6443' || window.location.host === 'actarian.github.io');
var DEVELOPMENT = NODE ? false : window && ['localhost', '127.0.0.1', '0.0.0.0'].indexOf(window.location.host.split(':')[0]) !== -1;
var PRODUCTION = !DEVELOPMENT;
var ENV = {
  STATIC: STATIC,
  DEVELOPMENT: DEVELOPMENT,
  PRODUCTION: PRODUCTION
};
var Environment = /*#__PURE__*/function () {
  var _proto = Environment.prototype;

  _proto.getAbsoluteUrl = function getAbsoluteUrl(path, params) {
    var url = "" + window.location.origin + path; // let url = `${window.location.protocol}//${window.location.host}${path}`;

    Object.keys(params).forEach(function (key) {
      url = url.replace("$" + key, params[key]);
    });
    return url;
  };

  _proto.getPath = function getPath(path) {
    return this.isLocal(path) ? this.href + path : path;
  };

  _proto.isLocal = function isLocal(path) {
    return path.indexOf('://') === -1;
  };

  _createClass(Environment, [{
    key: "STATIC",
    get: function get() {
      return ENV.STATIC;
    },
    set: function set(STATIC) {
      ENV.STATIC = STATIC === true || STATIC === 'true';
      console.log('Environment.STATIC.set', ENV.STATIC);
    }
  }, {
    key: "href",
    get: function get() {
      if (HEROKU) {
        return this.githubDocs;
      } else {
        return BASE_HREF;
      }
    }
  }]);

  function Environment(options) {
    if (options) {
      if (typeof options.url === 'object') {
        var language = options.language || '';
        var market = options.market || '';
        Object.keys(options.url).forEach(function (key) {
          options.url[key] = language + market + options.url[key];
        });
      }

      Object.assign(this, options);
    }
  }

  return Environment;
}();
var defaultOptions = {
  port: 5000,
  fontFamily: 'GT Walsheim, sans-serif',
  colors: {
    menuBackground: '#000000',
    menuForeground: '#ffffff',
    menuOverBackground: '#0099ff',
    menuOverForeground: '#ffffff',
    menuBackBackground: '#0099ff',
    menuBackForeground: '#000000',
    menuBackOverBackground: '#0099ff',
    menuBackOverForeground: '#ffffff'
  },
  editor: {
    disabledViewTypes: ['waiting-room', 'room-3d'],
    disabledViewItemTypes: ['texture']
  },
  renderOrder: {
    panorama: 0,
    model: 10,
    plane: 20,
    tile: 30,
    banner: 40,
    nav: 50,
    panel: 60,
    menu: 70,
    debug: 80,
    pointer: 90
  }
};
var defaultAppOptions = {
  channelName: 'BHere',
  flags: {
    production: false,
    useProxy: false,
    useToken: false,
    selfService: true,
    guidedTourRequest: true,
    editor: true,
    ar: true,
    menu: true,
    attendee: true,
    streamer: true,
    viewer: true,
    maxQuality: false
  }
};
var environmentOptions = window.STATIC ? environmentStatic : environmentServed;
var options = Object.assign(defaultOptions, defaultAppOptions, environmentOptions);
options = Utils.merge(options, window.bhere);
var environment = new Environment(options);
console.log('environment', environment);var _Utils$merge;
var LABELS = Utils.merge((_Utils$merge = {
  browse: 'Browse',
  cancel: 'Cancel',
  drag_and_drop_images: 'Drag And Drop your images here',
  error_email: 'Invalid email',
  error_match: 'Fields do not match',
  error_required: 'Field is required',
  loading: 'loading',
  remove: 'Remove',
  required: 'Required',
  select: 'Select',
  select_file: 'Select a file...',
  update: 'Update',
  upload: 'Upload',
  waiting_host: 'waiting host',
  // editor
  editor_image: 'Image',
  editor_video: 'Video',
  editor_model: 'Model',
  editor_publisher_stream: 'Publisher Stream',
  editor_next_attendee_stream: 'Next Attendee Stream',
  editor_waiting_room: 'Waiting Room',
  editor_panorama: 'Panorama',
  editor_panorama_grid: 'Panorama Grid',
  editor_room_3d: 'Room 3D'
}, _Utils$merge["editor_model"] = 'Model', _Utils$merge.editor_nav = 'Nav Tooltip', _Utils$merge.editor_gltf = 'Gltf Model', _Utils$merge.editor_plane = 'Plane', _Utils$merge.editor_curved_plane = 'Curved Plane', _Utils$merge.editor_texture = 'Texture', _Utils$merge), window.labels);

var LabelPipe = /*#__PURE__*/function (_Pipe) {
  _inheritsLoose(LabelPipe, _Pipe);

  function LabelPipe() {
    return _Pipe.apply(this, arguments) || this;
  }

  LabelPipe.transform = function transform(key) {
    var labels = LABELS;
    return labels[key] || "#" + key + "#";
  };

  LabelPipe.getKeys = function getKeys() {
    for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
      keys[_key] = arguments[_key];
    }

    return this.transform(keys.map(function (x) {
      return x.replace('-', '_');
    }).join('_'));
  };

  return LabelPipe;
}(rxcomp.Pipe);
LabelPipe.meta = {
  name: 'label'
};var HttpService = /*#__PURE__*/function () {
  function HttpService() {}

  HttpService.http$ = function http$(method, url, data, format) {
    var _this = this;

    var methods = ['POST', 'PUT', 'PATCH'];
    var response_ = null; // url = this.getUrl(url, format);

    return rxjs.from(fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: methods.indexOf(method) !== -1 ? JSON.stringify(data) : undefined
    }).then(function (response) {
      response_ = response; // console.log(response);

      try {
        var contentType = response.headers.get('content-type');
        var typedResponse;

        if (contentType && contentType.indexOf('application/json') !== -1) {
          typedResponse = response.json();
        } else {
          typedResponse = response.text();
        }

        if (response.ok) {
          return typedResponse;
        } else {
          return typedResponse.then(function (data) {
            return Promise.reject(data);
          });
        }
      } catch (error) {
        if (response.ok) {
          console.warn('HttpService.http$', 'Cannot parse response');
          return Promise.resolve();
        } else {
          return Promise.reject(error);
        }
      }
    })).pipe(operators.catchError(function (error) {
      return rxjs.throwError(_this.getError(error, response_));
    }));
  }
  /*
  // !!! todo mapping response.data
  static http$(method, url, data, format = 'json') {
  	const methods = ['POST', 'PUT', 'PATCH'];
  	const body = (data && methods.indexOf(method) !== -1) ? JSON.stringify(data) : undefined;
  	const queryString = (data && methods.indexOf(method) !== -1) ? Object.keys(data).map(function(key) {
  	    return key + '=' + encodeURI(data[key]);
  	}).join('&') : undefined;
  	if (queryString) {
  		url = `${url}?${queryString}`;
  	}
  	let response_ = null;
  	return from(fetch(url, {
  		method: method,
  		headers: {
  			'Accept': 'application/json',
  			'Content-Type': 'application/json',
  		},
  		body: body,
  	}).then((response) => {
  		response_ = new HttpResponse(response);
  		try {
  			const contentType = response.headers.get('content-type');
  			let typedResponse;
  			if (contentType && format === 'json' && contentType.indexOf('application/json') !== -1) {
  				typedResponse = response.json();
  			} else if (format === 'blob') {
  				typedResponse = response.blob();
  			} else {
  				typedResponse = response.text();
  			}
  			return typedResponse.then(data => {
  				response_.data = data;
  				if (response.ok) {
  					return Promise.resolve(response_);
  				} else {
  					return Promise.reject(response_);
  				}
  			});
  		} catch(error) {
  			if (response.ok) {
  				console.warn('HttpService.http$', 'Cannot parse response');
  				return Promise.resolve(response_);
  			} else {
  				return Promise.reject(this.getError(error, response_));
  			}
  		}
  	})).pipe(
  		catchError(error => {
  			return throwError(this.getError(error, response_));
  		}),
  	);
  }
  */
  ;

  HttpService.get$ = function get$(url, data, format) {
    var query = this.query(data);
    return this.http$('GET', "" + url + query, undefined, format);
  };

  HttpService.delete$ = function delete$(url) {
    return this.http$('DELETE', url);
  };

  HttpService.post$ = function post$(url, data) {
    return this.http$('POST', url, data);
  };

  HttpService.put$ = function put$(url, data) {
    return this.http$('PUT', url, data);
  };

  HttpService.patch$ = function patch$(url, data) {
    return this.http$('PATCH', url, data);
  };

  HttpService.query = function query(data) {
    return ''; // todo
  };

  HttpService.getError = function getError(object, response) {
    var error = typeof object === 'object' ? object : {};

    if (!error.status) {
      error.status = response ? response.status : 0;
    }

    if (!error.statusCode) {
      error.statusCode = response ? response.status : 0;
    }

    if (!error.statusMessage) {
      error.statusMessage = response ? response.statusText : object;
    } // console.log('HttpService.getError', error, object);


    return error;
  };

  return HttpService;
}();var RoleType = {
  Publisher: 'publisher',
  Attendee: 'attendee',
  Streamer: 'streamer',
  Viewer: 'viewer',
  SelfService: 'self-service'
};
var User = function User(options) {
  if (options) {
    Object.assign(this, options);
  }
};var UserService = /*#__PURE__*/function () {
  function UserService() {}

  UserService.setUser = function setUser(user) {
    this.user$.next(user);
  };

  UserService.me$ = function me$() {
    var _this = this;

    return HttpService.get$('/api/user/me').pipe(operators.map(function (user) {
      return _this.mapUser(user);
    }), operators.catchError(function (error) {
      // console.log('UserService.me$.error', error);
      if (error.status === 404 || error.statusCode === 404) {
        return rxjs.of(null);
      } else {
        throw error;
      }
    }), operators.switchMap(function (user) {
      _this.setUser(user);

      return _this.user$;
    }));
  };

  UserService.login$ = function login$(payload) {
    var _this2 = this;

    return HttpService.post$('/api/user/login', payload).pipe(operators.map(function (user) {
      return _this2.mapUser(user);
    }), operators.tap(function (user) {
      return _this2.setUser(user);
    }));
  };

  UserService.logout$ = function logout$() {
    var _this3 = this;

    return HttpService.get$('/api/user/logout').pipe(operators.map(function (user) {
      return _this3.mapUser(user);
    }), operators.tap(function (user) {
      return _this3.setUser(null);
    }));
  };

  UserService.guidedTour$ = function guidedTour$(payload) {
    var _this4 = this;

    return HttpService.post$('/api/user/guided-tour', payload).pipe(operators.map(function (user) {
      return _this4.mapUser(user);
    }), operators.tap(function (user) {
      return _this4.setUser(user);
    }));
  };

  UserService.selfServiceTour$ = function selfServiceTour$(payload) {
    var _this5 = this;

    return HttpService.post$('/api/user/self-service-tour', payload).pipe(operators.map(function (user) {
      return _this5.mapUser(user);
    }), operators.tap(function (user) {
      return _this5.setUser(user);
    }));
  };

  UserService.resolve$ = function resolve$(payload, status) {
    if (status === 'login') {
      return this.login$(payload);
    }

    if (status === 'guided-tour') {
      return this.guidedTour$(payload);
    }

    if (status === 'self-service-tour') {
      return this.selfServiceTour$(payload);
    }
  };

  UserService.log$ = function log$(payload) {
    return HttpService.post$('/api/user/log', payload);
  }
  /*
  static retrieve$(payload) {
  	return HttpService.post$('/api/user/retrievepassword', payload).pipe(
  		map((user) => this.mapUser(user)),
  	);
  }
  
  static register$(payload) {
  	return HttpService.post$('/api/user/register', payload).pipe(
  		map((user) => this.mapUser(user)),
  	);
  }
  
  static update(payload) {
  	return HttpService.post$('/api/user/updateprofile', payload).pipe(
  		map((user) => this.mapUser(user)),
  	);
  }
  */
  ;

  UserService.mapUser = function mapUser(user) {
    return new User(user);
  };

  return UserService;
}();
UserService.user$ = new rxjs.BehaviorSubject(null);var AccessComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AccessComponent, _Component);

  function AccessComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AccessComponent.prototype;

  _proto.onInit = function onInit() {
    this.env = environment;
    this.state = {
      status: 'access'
    };
    /*
    StateService.state$.pipe(
    	takeUntil(this.unsubscribe$)
    ).subscribe(state => {
    	console.log('AccessComponent.state', state);
    	this.state = state;
    	this.pushChanges();
    });
    */
  };

  _proto.onSelfServiceTourRequest = function onSelfServiceTourRequest() {
    this.initRequestForm();
    this.state.status = 'self-service-tour';
    this.pushChanges();
  };

  _proto.onGuidedTourRequest = function onGuidedTourRequest() {
    this.initRequestForm();
    this.state.status = 'guided-tour';
    this.pushChanges();
  };

  _proto.onGuidedTourAccess = function onGuidedTourAccess() {
    UserService.logout$().pipe(operators.first()).subscribe(function () {
      window.location.href = environment.url.guidedTour;
    });
  };

  _proto.onLogin = function onLogin() {
    this.initLoginForm();
    this.state.status = 'login';
    this.pushChanges();
  };

  _proto.initRequestForm = function initRequestForm() {
    var _this = this;

    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }

    var form = this.form = new rxcompForm.FormGroup({
      firstName: new rxcompForm.FormControl(null, rxcompForm.Validators.RequiredValidator()),
      lastName: new rxcompForm.FormControl(null, rxcompForm.Validators.RequiredValidator()),
      email: new rxcompForm.FormControl(null, [rxcompForm.Validators.RequiredValidator(), rxcompForm.Validators.EmailValidator()]),
      role: new rxcompForm.FormControl(null, rxcompForm.Validators.RequiredValidator()),
      privacy: new rxcompForm.FormControl(null, rxcompForm.Validators.RequiredTrueValidator()),
      checkRequest: window.antiforgery || '',
      checkField: ''
    });
    var data = this.data = window.data || {
      roles: [{
        id: 1,
        name: 'Show room'
      }, {
        id: 2,
        name: 'Architetto'
      }, {
        id: 3,
        name: 'Interior designer'
      }, {
        id: 4,
        name: 'Privato'
      }, {
        id: 5,
        name: 'Altro'
      }]
    };
    var controls = this.controls = form.controls;
    var options = data.roles.slice();
    options.unshift({
      id: null,
      name: LabelPipe.transform('select')
    });
    controls.role.options = options;
    this.formSubscription = form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (changes) {
      _this.pushChanges();
    });
    this.error = null;
  };

  _proto.initLoginForm = function initLoginForm() {
    var _this2 = this;

    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }

    var form = this.form = new rxcompForm.FormGroup({
      username: new rxcompForm.FormControl(null, rxcompForm.Validators.RequiredValidator()),
      password: new rxcompForm.FormControl(null, rxcompForm.Validators.RequiredValidator()),
      checkRequest: window.antiforgery || '',
      checkField: ''
    });
    var controls = this.controls = form.controls;
    this.formSubscription = form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (changes) {
      _this2.pushChanges();
    });
    this.error = null;
  };

  _proto.test = function test() {
    if (this.state.status === 'login') {
      this.form.patch({
        username: 'publisher',
        password: 'publisher',
        checkRequest: window.antiforgery || '',
        checkField: ''
      });
    } else {
      this.form.patch({
        firstName: 'Jhon',
        lastName: 'Appleseed',
        email: 'jhonappleseed@gmail.com',
        role: this.controls.role.options.find(function (x) {
          return x.id !== null;
        }).id,
        privacy: true,
        checkRequest: window.antiforgery || '',
        checkField: ''
      });
    }
  };

  _proto.reset = function reset() {
    this.form.reset();
  };

  _proto.onBack = function onBack() {
    this.state.status = 'access';
    this.pushChanges();
  };

  _proto.onSubmit = function onSubmit() {
    var _this3 = this;

    if (this.form.valid) {
      this.form.submitted = true;
      var payload = this.form.value;
      var status = this.state.status;
      UserService.resolve$(payload, status).pipe(operators.first()).subscribe(function (response) {
        console.log('AccessComponent.onSubmit', response);

        switch (status) {
          case 'guided-tour':
            _this3.state.status = 'guided-tour-success';

            _this3.pushChanges();

            break;

          case 'self-service-tour':
            window.location.href = environment.url.selfServiceTour;
            break;

          case 'login':
            window.location.href = environment.url.guidedTour;
            break;
        }

        _this3.form.reset();
      }, function (error) {
        console.log('AccessComponent.error', error);
        _this3.error = error;

        _this3.pushChanges();
      });
    } else {
      this.form.touched = true;
    }
  };

  _proto.isValid = function isValid() {
    var isValid = this.form.valid;
    return isValid;
  };

  return AccessComponent;
}(rxcomp.Component);
AccessComponent.meta = {
  selector: '[access-component]'
};var AudioStreamService = /*#__PURE__*/function () {
  function AudioStreamService() {}

  AudioStreamService.addSource = function addSource(streamOrElement) {
    var key = streamOrElement instanceof MediaStream ? streamOrElement.id : streamOrElement;

    if (!this.sources_[key]) {
      if (streamOrElement instanceof MediaStream) {
        this.sources_[key] = this.context.createMediaStreamSource(streamOrElement.clone());
      } else {
        this.sources_[key] = this.context.createMediaElementSource(streamOrElement);
      } // this.sources_[key] = streamOrElement instanceof MediaStream ? this.context.createMediaStreamSource(streamOrElement) : this.context.createMediaElementSource(streamOrElement);

    }

    return this.sources_[key];
  };

  AudioStreamService.removeSource = function removeSource(streamOrElement) {
    var key = streamOrElement instanceof MediaStream ? streamOrElement.id : streamOrElement;
    return this.removeSourceKey(key);
  };

  AudioStreamService.removeSourceKey = function removeSourceKey(key) {
    // console.log('AudioStreamService.removeSourceKey', key);
    var source;

    if (this.sources_[key]) {
      source = this.sources_[key];
      /*
      if (source.mediaStream) {
      	source.mediaStream.stop();
      }
      source.stop();
      */

      if (this.analyser) {
        source.disconnect(this.analyser);
      }

      source.disconnect();
      delete this.sources_[key];
    }

    return source;
  };

  AudioStreamService.frequency$ = function frequency$(streamOrElement, fftSize) {
    var _this = this;

    if (fftSize === void 0) {
      fftSize = 64;
    }

    if (fftSize % 2 === 1) {
      throw fftSize;
    }

    var state = new Uint8Array(fftSize / 2);
    var context = this.context;

    if (context) {
      var analyser = this.analyser; // Connect the output of the analyser to the destination
      // analyser.connect(context.destination); // no audio !
      // console.log(analyser.fftSize); // 2048 by default
      // console.log(analyser.frequencyBinCount); // will give us 1024 data points

      analyser.fftSize = fftSize; // 64
      // console.log(analyser.frequencyBinCount); // fftSize/2 = 32 data points

      var source = this.addSource(streamOrElement); // source.connect(context.destination); // no audio!
      // Connect the output of the source to the input of the analyser

      source.connect(analyser);
      var state$ = new rxjs.BehaviorSubject(state);
      return AudioStreamService.frame$.pipe(operators.withLatestFrom(state$), operators.map(function (_ref) {
        var deltaTime = _ref[0],
            state = _ref[1];
        // Get the new frequency data
        analyser.getByteFrequencyData(state);
        /*
        const max = state.reduce((p, c, i) => {
        	return Math.max(c, p);
        }, 0);
        if (max > 0) {
        	// console.log(max);
        }
        */
        // Update the visualisation

        return state;
      }), operators.tap(function (state) {
        return state$.next(state);
      }), operators.finalize(function () {
        _this.removeSource(streamOrElement);
      }));
    } else {
      return rxjs.of(state);
    }
  } // unused
  ;

  AudioStreamService.volume$ = function volume$(streamOrElement) {
    var _this2 = this;

    var state = {
      volume: 0,
      clipped: false
    };
    var context = this.context; // console.log('AudioStreamService.volume$', context, state);

    if (context) {
      var source = this.addSource(streamOrElement);
      var meter = AudioStreamService.audioMeterCreate();
      source.connect(meter);
      var state$ = new rxjs.BehaviorSubject(state);
      return AudioStreamService.frame$.pipe(operators.withLatestFrom(state$), operators.map(function (_ref2) {
        var deltaTime = _ref2[0],
            state = _ref2[1];
        state.clipped = meter.checkClipping();
        state.volume = meter.volume;
        return state;
      }), operators.tap(function (state) {
        return state$.next(state);
      }), operators.finalize(function () {
        _this2.removeSource(streamOrElement);
      }));
    } else {
      return rxjs.of(state);
    }
  } // unused
  ;

  AudioStreamService.audioMeterCreate = function audioMeterCreate(clipLevel, averaging, clipLag) {
    if (clipLevel === void 0) {
      clipLevel = 0.98;
    }

    if (averaging === void 0) {
      averaging = 0.95;
    }

    if (clipLag === void 0) {
      clipLag = 750;
    }

    var context = this.context;

    if (context) {
      var processor = context.createScriptProcessor(512);
      processor.onaudioprocess = this.audioMeterProcess;
      processor.checkClipping = this.audioMeterClip;
      processor.dispose = this.audioMeterDispose;
      processor.clipping = false;
      processor.lastClip = 0;
      processor.volume = 0;
      processor.clipLevel = clipLevel;
      processor.averaging = averaging;
      processor.clipLag = clipLag; // this will have no effect, since we don't copy the input to the output,
      // but works around a current Chrome bug.

      processor.connect(context.destination);
      return processor;
    }
  };

  AudioStreamService.audioMeterProcess = function audioMeterProcess(event) {
    var buffer = event.inputBuffer.getChannelData(0);
    var bufferLength = buffer.length;
    var sum = 0;
    var x; // Do a root-mean-square on the samples: sum up the squares...

    for (var i = 0; i < bufferLength; i++) {
      x = buffer[i];

      if (Math.abs(x) >= this.clipLevel) {
        this.clipping = true;
        this.lastClip = window.performance.now();
      }

      sum += x * x;
    } // ... then take the square root of the sum.


    var rms = Math.sqrt(sum / bufferLength); // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."

    this.volume = Math.max(rms, this.volume * this.averaging);
  };

  AudioStreamService.audioMeterClip = function audioMeterClip() {
    if (!this.clipping) {
      return false;
    }

    if (this.lastClip + this.clipLag < window.performance.now()) {
      this.clipping = false;
    }

    return this.clipping;
  };

  AudioStreamService.audioMeterDispose = function audioMeterDispose() {
    this.disconnect();
    this.onaudioprocess = null;
  };

  AudioStreamService.step$ = function step$(previous) {
    /**
     * This function returns an observable that will emit the next frame once the
     * browser has returned an animation frame step. Given the previous frame it calculates
     * the delta time, and we also clamp it to 30FPS in case we get long frames.
     */
    return rxjs.Observable.create(function (observer) {
      requestAnimationFrame(function (startTime) {
        // Millis to seconds
        var deltaTime = previous ? (startTime - previous.startTime) / 1000 : 0;
        observer.next({
          startTime: startTime,
          deltaTime: deltaTime
        });
      });
    }).pipe(operators.map(function (frame) {
      if (frame.deltaTime > 1 / 30) {
        frame.deltaTime = 1 / 30;
      }

      return frame;
    }));
  };

  AudioStreamService.dispose = function dispose() {
    var _this3 = this;

    var analyser = this.analyser;
    Object.keys(this.sources_).forEach(function (key) {
      _this3.removeSourceKey(key);
    });
    analyser.disconnect();
    this.sources_ = {}; // this.context_.close().then(() => console.log('AudioStreamService.dispose'));
    // this.context_ = null;
  };

  _createClass(AudioStreamService, null, [{
    key: "context",
    get: function get() {
      if (!this.context_ && 'AudioContext' in window) {
        this.context_ = new AudioContext();
      }

      return this.context_;
    }
    /*
    static get processorNode() {
    	if (!this.processorNode_) {
    		this.processorNode_ = this.context.createScriptProcessor(BUFF_SIZE, 1, 1);
    	}
    	return this.processorNode_;
    }
    */

    /*
    static get gain() {
    	if (!this.gain_) {
    		this.gain_ = this.context.createGain();
    	}
    	return this.gain_;
    }
    */

  }, {
    key: "analyser",
    get: function get() {
      if (!this.analyser_) {
        this.analyser_ = this.context.createAnalyser();
      }

      return this.analyser_;
    }
  }]);

  return AudioStreamService;
}();
AudioStreamService.sources_ = {};
AudioStreamService.frame$ = rxjs.of(undefined).pipe(operators.expand(function (value) {
  return AudioStreamService.step$(value);
}), // Expand emits the first value provided to it, and in this
//  case we just want to ignore the undefined input frame
operators.filter(function (frame) {
  return frame !== undefined;
}), operators.map(function (frame) {
  return frame.deltaTime;
}), operators.share());var DevicePlatform = {
  Unknown: 'unknown',
  IOS: 'ios',
  Android: 'android',
  WindowsPhone: 'windowsPhone',
  VRHeadset: 'vrHeadset'
};
var DeviceService = /*#__PURE__*/function () {
  function DeviceService() {}

  DeviceService.getDevicePlatform = function getDevicePlatform() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera; // Windows Phone must come first because its UA also contains 'Android'

    if (/windows phone/i.test(userAgent)) {
      return DevicePlatform.WindowsPhone;
    }

    if (/android/i.test(userAgent)) {
      return DevicePlatform.Android;
    } // iOS detection from: http://stackoverflow.com/a/9039885/177710
    // if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {


    if (this.isIOS) {
      return DevicePlatform.IOS;
    }

    if (this.isVRHeadset) {
      return DevicePlatform.VRHeadset;
    }

    return DevicePlatform.Unknown;
  };

  _createClass(DeviceService, null, [{
    key: "platform",
    get: function get() {
      if (!this.platform_) {
        this.platform_ = this.getDevicePlatform();
      }

      return this.platform_;
    }
  }, {
    key: "isIOS",
    get: function get() {
      return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) !== -1 // iPad on iOS 13 detection
      || navigator.userAgent.indexOf('Mac') !== -1 && 'ontouchend' in document;
    }
  }, {
    key: "isVRHeadset",
    get: function get() {
      return navigator.userAgent.indexOf('VR') !== -1 || navigator.userAgent.indexOf('Quest') !== -1 || navigator.userAgent.indexOf('Oculus') !== -1;
    }
  }]);

  return DeviceService;
}();var StateService = /*#__PURE__*/function () {
  function StateService() {}

  StateService.patchState = function patchState(state) {
    state = Object.assign({}, this.state, state);
    this.state = state;
  };

  _createClass(StateService, null, [{
    key: "state",
    set: function set(state) {
      this.state$.next(state);
    },
    get: function get() {
      return this.state$.getValue();
    }
  }]);

  return StateService;
}();

_defineProperty(StateService, "state$", new rxjs.BehaviorSubject({}));var StreamQualities = [{
  // id: 1,
  // name: '4K 2160p 3840x2160',
  profile: '4K',
  resolution: {
    width: 3840,
    height: 2160
  },
  frameRate: {
    min: 15,
    max: 30
  },
  bitrate: {
    min: 8910,
    max: 13500
  }
}, {
  // id: 2,
  // name: 'HD 1440p 2560×1440',
  profile: '1440p',
  resolution: {
    width: 2560,
    height: 1440
  },
  frameRate: {
    min: 15,
    max: 30
  },
  bitrate: {
    min: 4850,
    max: 7350
  }
}, {
  // id: 3,
  // name: 'HD 1080p 1920x1080',
  profile: '1080p',
  resolution: {
    width: 1920,
    height: 1080
  },
  frameRate: {
    min: 15,
    max: 30
  },
  bitrate: {
    min: 2080,
    max: 4780
  }
}, {
  // id: 4,
  // name: 'LOW 720p 1280x720',
  profile: '720p_3',
  resolution: {
    width: 1280,
    height: 720
  },
  frameRate: {
    min: 15,
    max: 30
  },
  bitrate: {
    min: 1130,
    max: 1710
  }
}, {
  // id: 5,
  // name: 'LOWEST 240p 320x240',
  profile: '240p_1',
  resolution: {
    width: 320,
    height: 240
  },
  frameRate: {
    min: 15,
    max: 15
  },
  bitrate: {
    min: 140,
    max: 200
  }
}];
function getStreamQuality(state) {
  var lowestQuality = StreamQualities[StreamQualities.length - 1];
  var highestQuality = environment.flags.maxQuality ? StreamQualities[0] : StreamQualities[StreamQualities.length - 2];
  return state.role === RoleType.Publisher ? highestQuality : lowestQuality;
}
var AgoraStatus = {
  Link: 'link',
  Name: 'name',
  Device: 'device',
  ShouldConnect: 'should-connect',
  Connecting: 'connecting',
  Connected: 'connected',
  Disconnected: 'disconnected'
};
var MessageType = {
  AgoraEvent: 'agoraEvent',
  Ping: 'ping',
  RequestControl: 'requestControl',
  RequestControlAccepted: 'requestControlAccepted',
  RequestControlRejected: 'requestControlRejected',
  RequestControlDismiss: 'requestControlDismiss',
  RequestControlDismissed: 'requestControlDismissed',
  RequestPeerInfo: 'requestPeerInfo',
  RequestPeerInfoResult: 'requestPeerInfoResult',
  RequestInfo: 'requestInfo',
  RequestInfoResult: 'requestInfoResult',
  RequestInfoDismiss: 'requestInfoDismiss',
  RequestInfoDismissed: 'requestInfoDismissed',
  RequestInfoRejected: 'requestInfoRejected',
  SlideChange: 'slideChange',
  ControlInfo: 'controlInfo',
  AddLike: 'addLike',
  ShowPanel: 'showPanel',
  PlayMedia: 'playMedia',
  NavToView: 'navToView',
  NavToGrid: 'navToGrid',
  VRStarted: 'vrStarted',
  VREnded: 'vrEnded',
  VRState: 'vrState'
};
var AgoraEvent = function AgoraEvent(options) {
  Object.assign(this, options);
};
var AgoraPeerEvent = /*#__PURE__*/function (_AgoraEvent) {
  _inheritsLoose(AgoraPeerEvent, _AgoraEvent);

  function AgoraPeerEvent() {
    return _AgoraEvent.apply(this, arguments) || this;
  }

  return AgoraPeerEvent;
}(AgoraEvent);
var AgoraRemoteEvent = /*#__PURE__*/function (_AgoraEvent2) {
  _inheritsLoose(AgoraRemoteEvent, _AgoraEvent2);

  function AgoraRemoteEvent() {
    return _AgoraEvent2.apply(this, arguments) || this;
  }

  return AgoraRemoteEvent;
}(AgoraEvent);
var AgoraMuteVideoEvent = /*#__PURE__*/function (_AgoraEvent3) {
  _inheritsLoose(AgoraMuteVideoEvent, _AgoraEvent3);

  function AgoraMuteVideoEvent() {
    return _AgoraEvent3.apply(this, arguments) || this;
  }

  return AgoraMuteVideoEvent;
}(AgoraEvent);
var AgoraUnmuteVideoEvent = /*#__PURE__*/function (_AgoraEvent4) {
  _inheritsLoose(AgoraUnmuteVideoEvent, _AgoraEvent4);

  function AgoraUnmuteVideoEvent() {
    return _AgoraEvent4.apply(this, arguments) || this;
  }

  return AgoraUnmuteVideoEvent;
}(AgoraEvent);
var AgoraMuteAudioEvent = /*#__PURE__*/function (_AgoraEvent5) {
  _inheritsLoose(AgoraMuteAudioEvent, _AgoraEvent5);

  function AgoraMuteAudioEvent() {
    return _AgoraEvent5.apply(this, arguments) || this;
  }

  return AgoraMuteAudioEvent;
}(AgoraEvent);
var AgoraUnmuteAudioEvent = /*#__PURE__*/function (_AgoraEvent6) {
  _inheritsLoose(AgoraUnmuteAudioEvent, _AgoraEvent6);

  function AgoraUnmuteAudioEvent() {
    return _AgoraEvent6.apply(this, arguments) || this;
  }

  return AgoraUnmuteAudioEvent;
}(AgoraEvent);
var AgoraVolumeLevelsEvent = /*#__PURE__*/function (_AgoraEvent7) {
  _inheritsLoose(AgoraVolumeLevelsEvent, _AgoraEvent7);

  function AgoraVolumeLevelsEvent() {
    return _AgoraEvent7.apply(this, arguments) || this;
  }

  return AgoraVolumeLevelsEvent;
}(AgoraEvent);var AgoraDevicePreviewComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AgoraDevicePreviewComponent, _Component);

  function AgoraDevicePreviewComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AgoraDevicePreviewComponent.prototype;

  _proto.onInit = function onInit() {
    this.platform = DeviceService.platform;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var preview = this.preview = node.querySelector('video');
    this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
    preview.addEventListener('loadedmetadata', this.onLoadedMetadata);
    var audio = node.querySelector('.audio');

    if (this.hasPreview) {
      var bars = this.bars = new Array(32).fill(0).map(function (x) {
        var bar = document.createElement('div');
        bar.classList.add('bar');
        audio.appendChild(bar);
        return bar;
      });
    }
  };

  _proto.onDestroy = function onDestroy() {
    var preview = this.preview;
    preview.removeEventListener('loadedmetadata', this.onLoadedMetadata);

    if (this.hasPreview) {
      AudioStreamService.dispose();
    }
  };

  _proto.initStream = function initStream() {
    var _this = this;

    var preview = this.preview;

    if (!this.preview) {
      return;
    } // console.log(this.video_, this.audio_);


    if (this.video_ || this.audio_) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        var state = StateService.state;
        var quality = getStreamQuality(state);
        var options = {
          video: this.video_ ? {
            deviceId: this.video_,
            width: {
              ideal: quality.resolution.width
            },
            height: {
              ideal: quality.resolution.height
            },
            frameRate: {
              ideal: quality.frameRate.min,
              max: quality.frameRate.max
            }
          } : false,
          audio: this.audio_ ? {
            deviceId: this.audio_
          } : false
        };
        console.log('AgoraDevicePreviewComponent.initStream.getUserMedia', options);
        navigator.mediaDevices.getUserMedia(options).then(function (stream) {
          if (_this.hasPreview) {
            if ('srcObject' in preview) {
              preview.srcObject = stream;
            } else {
              preview.src = window.URL.createObjectURL(stream);
            }

            if (_this.audio_) {
              _this.analyzeData(stream);
            }

            _this.loadingStream_ = stream;
          } else {
            _this.stream.next(stream);
          }
        }).catch(function (error) {
          console.log('AgoraDevicePreviewComponent.initStream.error', error.name, error.message);

          _this.stream.next(null);
        });
      }
    } else {
      if (this.hasPreview) {
        if ('srcObject' in preview) {
          preview.srcObject = null;
        } else {
          preview.src = null;
        }

        this.analyzeData(null);
      }

      this.stream.next(null);
    }
  };

  _proto.onLoadedMetadata = function onLoadedMetadata(event) {
    this.preview.play();
    this.stream.next(this.loadingStream_);
  };

  _proto.analyzeData = function analyzeData(stream) {
    var _this2 = this;

    if (this.frequencySubscription) {
      this.frequencySubscription.unsubscribe();
    } // console.log('AgoraDevicePreviewComponent.analyzeData', stream);


    if (stream) {
      this.frequencySubscription = AudioStreamService.frequency$(stream, 64).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (frequency) {
        // 32 data points
        // console.log(frequency);
        var spacing = 100 / 32;
        var bars = _this2.bars;
        bars.forEach(function (bar, i) {
          var pow = Math.min(100, 5 + frequency[i]) / 100;
          bar.style.left = i * spacing + '%';
          bar.style.transform = "scale(1," + pow + ")";
          bar.style.opacity = pow;
        });
      });
    }
  };

  _createClass(AgoraDevicePreviewComponent, [{
    key: "video",
    get: function get() {
      return this.video_;
    },
    set: function set(video) {
      if (this.video_ !== video) {
        this.video_ = video;

        if (this.change) {
          this.change.next();
          this.initStream();
        }
      }
    }
  }, {
    key: "audio",
    get: function get() {
      return this.audio_;
    },
    set: function set(audio) {
      if (this.audio_ !== audio) {
        this.audio_ = audio;

        if (this.change) {
          this.change.next();
          this.initStream();
        }
      }
    }
  }, {
    key: "hasPreview",
    get: function get() {
      return this.platform !== DevicePlatform.IOS && this.platform !== DevicePlatform.VRHeadset;
    }
  }]);

  return AgoraDevicePreviewComponent;
}(rxcomp.Component);
AgoraDevicePreviewComponent.meta = {
  selector: '[agora-device-preview]',
  outputs: ['stream', 'change'],
  inputs: ['video', 'audio']
};var Emittable = /*#__PURE__*/function () {
  function Emittable() {
    this.events = {};
  }

  var _proto = Emittable.prototype;

  _proto.on = function on(type, callback) {
    var _this = this;

    var event = this.events[type] = this.events[type] || [];
    event.push(callback);
    return function () {
      _this.events[type] = event.filter(function (x) {
        return x !== callback;
      });
    };
  };

  _proto.off = function off(type, callback) {
    var event = this.events[type];

    if (event) {
      this.events[type] = event.filter(function (x) {
        return x !== callback;
      });
    }
  };

  _proto.once = function once(type, callback) {
    var _this2 = this;

    var once = function once(data) {
      callback(data);

      _this2.off(type, once);
    };

    this.on(type, once);
  };

  _proto.emit = function emit(type, data) {
    var event = this.events[type];

    if (event) {
      event.forEach(function (callback) {
        // callback.call(this, data);
        callback(data);
      });
    }

    var broadcast = this.events.broadcast;

    if (broadcast) {
      broadcast.forEach(function (callback) {
        callback(type, data);
      });
    }
  };

  _proto.has = function has(type) {
    var callbacks = this.events[type];
    return callbacks && callbacks.length;
  };

  return Emittable;
}();var MessageService = /*#__PURE__*/function () {
  function MessageService() {}

  MessageService.message = function message(_message) {
    this.message$.next(_message);
  };

  MessageService.in = function _in(message) {
    this.in$.next(message);
  };

  MessageService.sendBack = function sendBack(message) {
    message = Object.assign({}, message, {
      remoteId: message.clientId
    }); // console.log('MessageService.sendBack', message);

    this.in$.next(message);
  };

  MessageService.out = function out(message) {
    this.out$.next(message);
  };

  return MessageService;
}();

_defineProperty(MessageService, "message$", new rxjs.ReplaySubject(1));

_defineProperty(MessageService, "in$", new rxjs.ReplaySubject(1));

_defineProperty(MessageService, "send", MessageService.in);

_defineProperty(MessageService, "out$", new rxjs.ReplaySubject(1));var StreamServiceMode = {
  Client: 'client',
  Editor: 'editor'
};

var StreamService = /*#__PURE__*/function () {
  function StreamService() {}

  StreamService.orderedRemotes$ = function orderedRemotes$() {
    return rxjs.combineLatest([StreamService.remotes$, rxjs.interval(1000)]).pipe(operators.map(function (datas) {
      var remotes = [];
      datas[0].forEach(function (remote) {
        // const audioLevel = remote.getAudioLevel();
        // console.log('audioLevel', audioLevel, remote);
        if (remote.clientInfo) {
          remote.clientInfo.audioLevel = remote.getAudioLevel();
          remote.clientInfo.peekAudioLevel = Math.max(remote.clientInfo.audioLevel, 0.2);
        }

        remotes.push(remote);
      });
      remotes.sort(function (a, b) {
        if (a.clientInfo && b.clientInfo) {
          if (a.clientInfo.role === RoleType.Publisher) {
            return -1;
          } else if (b.clientInfo.role === RoleType.Publisher) {
            return 1;
          } else {
            // sort on audioLevel or lastOrder
            return b.clientInfo.peekAudioLevel - a.clientInfo.peekAudioLevel || (a.clientInfo.order || 0) - (b.clientInfo.order || 0);
          }
        } else {
          return 0;
        }
      });
      remotes.forEach(function (remote, i) {
        if (remote.clientInfo) {
          remote.clientInfo.order = i;
        }
      }); // !!! hard limit max 8 visible stream

      remotes.length = Math.min(remotes.length, 8);
      return remotes;
    }), operators.distinctUntilChanged(function (a, b) {
      return a.map(function (remote) {
        return remote.clientInfo ? remote.clientInfo.uid : '';
      }).join('|') === b.map(function (remote) {
        return remote.clientInfo ? remote.clientInfo.uid : '';
      }).join('|');
    }));
  };

  StreamService.editorStreams$ = function editorStreams$() {
    var _this = this;

    return rxjs.of(null).pipe(operators.switchMap(function () {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && _this.mode === StreamServiceMode.Editor) {
        var body = document.querySelector('body');
        var media = document.createElement('div');
        var video = document.createElement('video');
        media.setAttribute('id', 'stream-editor');
        media.setAttribute('style', 'position:absolute; top: 5000px; line-height: 0;');
        media.appendChild(video);
        body.appendChild(media);
        navigator.mediaDevices.getUserMedia({
          video: {
            width: 800,
            height: 450
          }
        }).then(function (stream) {
          // console.log(stream);
          if ('srcObject' in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream);
          }

          video.oncanplay = function () {
            var fakePublisherStream = {
              getId: function getId() {
                return 'editor';
              },
              clientInfo: {
                role: RoleType.Publisher
              }
            };
            var fakeAttendeeStream = {
              getId: function getId() {
                return 'editor';
              },
              clientInfo: {
                role: RoleType.Attendee
              }
            };

            _this.editor$.next([fakePublisherStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream]); // StreamService.editor = [fakePublisherStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream];

          };

          video.play();
        }).catch(function (error) {
          console.log('EditorComponent.getUserMedia.error', error.name, error.message);
        });
      }

      return _this.editor$;
    }), operators.shareReplay(1));
  };

  StreamService.getPublisherStreamId$ = function getPublisherStreamId$() {
    var _this2 = this;

    var publisherStreamId = this.publisherStreamId;

    if (publisherStreamId) {
      return rxjs.of(publisherStreamId);
    } else {
      return this.streams$.pipe(operators.map(function () {
        return _this2.publisherStreamId;
      }), operators.filter(function (x) {
        return x;
      }));
    }
  };

  StreamService.getRemoteById = function getRemoteById(streamId) {
    // console.log('StreamService.getRemoteById', streamId);
    var remotes = StreamService.remotes;
    var remote = remotes.find(function (x) {
      return x.getId() === streamId;
    });

    if (remote) {
      return remote;
    }
  };

  _createClass(StreamService, null, [{
    key: "editor",
    set: function set(editor) {
      this.editor$.next(editor);
    },
    get: function get() {
      return this.editor$.getValue();
    }
  }, {
    key: "local",
    set: function set(local) {
      this.local$.next(local);
    },
    get: function get() {
      return this.local$.getValue();
    }
  }, {
    key: "remotes",
    set: function set(remotes) {
      this.remotes$.next(remotes);
    },
    get: function get() {
      return this.remotes$.getValue();
    }
  }, {
    key: "peers",
    set: function set(peers) {
      this.peers$.next(peers);
    },
    get: function get() {
      return this.peers$.getValue();
    }
  }, {
    key: "publisherStreamId",
    get: function get() {
      var streams = this.remotes.slice();
      var local = this.local;

      if (local) {
        streams.unshift(local);
      }

      var publisherStream = streams.find(function (x) {
        return x.clientInfo && x.clientInfo.role === RoleType.Publisher;
      });

      if (publisherStream) {
        return publisherStream.getId();
      }

      return null;
    }
  }]);

  return StreamService;
}();

_defineProperty(StreamService, "mode", StreamServiceMode.Client);

_defineProperty(StreamService, "editor$", new rxjs.BehaviorSubject(null));

_defineProperty(StreamService, "local$", new rxjs.BehaviorSubject(null));

_defineProperty(StreamService, "remotes$", new rxjs.BehaviorSubject([]));

_defineProperty(StreamService, "peers$", new rxjs.BehaviorSubject([]));

_defineProperty(StreamService, "streams$", rxjs.combineLatest([StreamService.local$, StreamService.remotes$, StreamService.editorStreams$()]).pipe(operators.map(function (data) {
  var local = data[0];
  var remotes = data[1];
  var editor = data[2];
  var streams = remotes;

  if (local) {
    streams = streams.slice();
    streams.push(local);
  }

  if (editor) {
    var _streams;

    (_streams = streams).push.apply(_streams, editor);
  }

  return streams;
}), operators.shareReplay(1)));var AgoraService = /*#__PURE__*/function (_Emittable) {
  _inheritsLoose(AgoraService, _Emittable);

  AgoraService.getSingleton = function getSingleton(defaultDevices) {
    if (DEBUG) {
      return;
    }

    if (!this.AGORA) {
      this.AGORA = new AgoraService(defaultDevices);
    }

    return this.AGORA;
  };

  function AgoraService(defaultDevices) {
    var _this;

    if (AgoraService.AGORA) {
      throw 'AgoraService is a singleton';
    }

    _this = _Emittable.call(this) || this;
    _this.onStreamPublished = _this.onStreamPublished.bind(_assertThisInitialized(_this));
    _this.onStreamUnpublished = _this.onStreamUnpublished.bind(_assertThisInitialized(_this));
    _this.onStreamAdded = _this.onStreamAdded.bind(_assertThisInitialized(_this));
    _this.onStreamRemoved = _this.onStreamRemoved.bind(_assertThisInitialized(_this));
    _this.onStreamSubscribed = _this.onStreamSubscribed.bind(_assertThisInitialized(_this));
    _this.onMuteVideo = _this.onMuteVideo.bind(_assertThisInitialized(_this));
    _this.onUnmuteVideo = _this.onUnmuteVideo.bind(_assertThisInitialized(_this));
    _this.onMuteAudio = _this.onMuteAudio.bind(_assertThisInitialized(_this));
    _this.onUnmuteAudio = _this.onUnmuteAudio.bind(_assertThisInitialized(_this));
    _this.onVolumeIndicator = _this.onVolumeIndicator.bind(_assertThisInitialized(_this));
    _this.onPeerConnect = _this.onPeerConnect.bind(_assertThisInitialized(_this));
    _this.onPeerLeaved = _this.onPeerLeaved.bind(_assertThisInitialized(_this));
    _this.onConnectionStateChange = _this.onConnectionStateChange.bind(_assertThisInitialized(_this));
    _this.onTokenPrivilegeWillExpire = _this.onTokenPrivilegeWillExpire.bind(_assertThisInitialized(_this));
    _this.onTokenPrivilegeDidExpire = _this.onTokenPrivilegeDidExpire.bind(_assertThisInitialized(_this));
    _this.onMessage = _this.onMessage.bind(_assertThisInitialized(_this));
    var state = StateService.state;
    StateService.patchState({
      devices: state.role !== RoleType.Attendee && defaultDevices ? defaultDevices : {
        videos: [],
        audios: []
      },
      quality: getStreamQuality(state),
      membersCount: 0
    });
    return _this;
  }
  /*
  getInitialStatus(role, link, name) {
  	if (!link) {
  		return AgoraStatus.Link;
  	}
  	if (!name) {
  		return AgoraStatus.Name;
  	}
  	if (role !== RoleType.Viewer) {
  		return AgoraStatus.Device;
  	}
  	return AgoraStatus.ShouldConnect;
  }
  */


  var _proto = AgoraService.prototype;

  _proto.addStreamDevice = function addStreamDevice(src) {
    this.removeStreamDevice();
    var video = {
      deviceId: 'video-stream',
      label: 'videostream',
      kind: 'videostream',
      src: src
    };
    var audio = {
      deviceId: 'audio-stream',
      label: 'videostream',
      kind: 'videostream',
      src: src
    };
    var devices = StateService.state.devices;
    devices.videos.push(video);
    devices.audios.push(audio);
    StateService.patchState({
      devices: devices
    });
  };

  _proto.removeStreamDevice = function removeStreamDevice() {
    var devices = StateService.state.devices;
    devices.videos = devices.videos.filter(function (x) {
      return x.kind !== 'videostream';
    });
    devices.audios = devices.audios.filter(function (x) {
      return x.kind !== 'videostream';
    });
    StateService.patchState({
      devices: devices
    });
  };

  _proto.devices$ = function devices$() {
    var inputs = StateService.state.devices;
    var defaultVideos = this.defaultVideos = this.defaultVideos || inputs.videos.slice();
    var defaultAudios = this.defaultAudios = this.defaultAudios || inputs.videos.slice();
    inputs.videos = defaultVideos.slice();
    inputs.audios = defaultAudios.slice();
    return rxjs.from(new Promise(function (resolve, reject) {
      var getDevices = function getDevices() {
        AgoraRTC.getDevices(function (devices) {
          // console.log('AgoraRTC.getDevices', devices);
          tempStream.close();

          for (var i = 0; i < devices.length; i++) {
            var device = devices[i]; // console.log('device', device.deviceId);

            if (device.kind === 'videoinput' && device.deviceId) {
              inputs.videos.push({
                label: device.label || 'camera-' + inputs.videos.length,
                deviceId: device.deviceId,
                kind: device.kind
              });
            }

            if (device.kind === 'audioinput' && device.deviceId) {
              inputs.audios.push({
                label: device.label || 'microphone-' + inputs.audios.length,
                deviceId: device.deviceId,
                kind: device.kind
              });
            }
          }

          if (inputs.videos.length > 0 || inputs.audios.length > 0) {
            resolve(inputs);
          } else {
            reject(inputs);
          }
        });
      };

      var tempStream = AgoraRTC.createStream({
        audio: true,
        video: true
      });
      tempStream.init(function () {
        getDevices();
      }, function () {
        getDevices();
      });
    }));
  };

  _proto.connect$ = function connect$(preferences) {
    var _this2 = this;

    var devices = StateService.state.devices;

    if (preferences) {
      devices.video = preferences.video;
      devices.audio = preferences.audio;
    } // console.log('AgoraService.connect$', preferences, devices);


    if (!StateService.state.connecting) {
      StateService.patchState({
        status: AgoraStatus.Connecting,
        connecting: true,
        devices: devices
      });
      setTimeout(function () {
        _this2.createClient(function () {
          var channelNameLink = _this2.getChannelNameLink();

          _this2.rtcToken$(channelNameLink).subscribe(function (token) {
            // console.log('AgoraService.rtcToken$', token);
            _this2.join(token.token, channelNameLink);
          });
        });
      }, 250);
    }

    return StateService.state$;
  };

  _proto.membersCount$ = function membersCount$(channelId) {
    var messageClient = this.messageClient;
    return rxjs.interval(2000).pipe(operators.switchMap(function () {
      return rxjs.from(messageClient.getChannelMemberCount([channelId]));
    }), operators.map(function (counters) {
      return counters[channelId];
    }), operators.distinctUntilChanged());
  };

  _proto.observeMemberCount = function observeMemberCount() {
    this.unobserveMemberCount();
    this.membersCountSubscription = this.membersCount$(StateService.state.channelNameLink).subscribe(function (membersCount) {
      StateService.patchState({
        membersCount: membersCount
      });
    });
  };

  _proto.unobserveMemberCount = function unobserveMemberCount() {
    if (this.membersCountSubscription) {
      this.membersCountSubscription.unsubscribe();
      this.membersCountSubscription = null;
      StateService.patchState({
        membersCount: 0
      });
    }
  };

  _proto.rtcToken$ = function rtcToken$(channelNameLink) {
    if (environment.flags.useToken) {
      return HttpService.post$('/api/token/rtc', {
        channelName: channelNameLink,
        uid: null
      });
    } else {
      return rxjs.of({
        token: null
      });
    }
  };

  _proto.rtmToken$ = function rtmToken$(uid) {
    if (environment.flags.useToken) {
      return HttpService.post$('/api/token/rtm', {
        uid: uid
      });
    } else {
      return rxjs.of({
        token: null
      });
    }
  };

  _proto.createClient = function createClient(next) {
    var _this3 = this;

    if (this.client) {
      next();
    } // console.log('agora rtc sdk version: ' + AgoraRTC.VERSION + ' compatible: ' + AgoraRTC.checkSystemRequirements());
    // AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.ERROR);


    AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.NONE);
    var client = this.client = AgoraRTC.createClient({
      mode: 'live',
      codec: 'h264'
    }); // rtc

    var clientInit = function clientInit() {
      if (environment.flags.useProxy) {
        client.startProxyServer();
      }

      client.init(environment.appKey, function () {
        // console.log('AgoraRTC client initialized');
        next();
      }, function (error) {
        // console.log('AgoraRTC client init failed', error);
        _this3.client = null;
      });
    };

    if (StateService.state.role === RoleType.Viewer) {
      client.setClientRole('audience', function (error) {
        if (!error) {
          clientInit();
        }
      });
    } else {
      clientInit();
    }

    client.on('stream-published', this.onStreamPublished);
    client.on('stream-unpublished', this.onStreamUnpublished); //subscribe remote stream

    client.on('stream-added', this.onStreamAdded);
    client.on('stream-subscribed', this.onStreamSubscribed);
    client.on('mute-video', this.onMuteVideo);
    client.on('unmute-video', this.onUnmuteVideo);
    client.on('mute-audio', this.onMuteAudio);
    client.on('unmute-audio', this.onUnmuteAudio);

    client.on('error', this.onError);
    client.on('peer-online', this.onPeerConnect); // Occurs when the peer user leaves the channel; for example, the peer user calls Client.leave.

    client.on('peer-leave', this.onPeerLeaved); // client.on('connection-state-change', this.onConnectionStateChange);

    client.on('stream-removed', this.onStreamRemoved);
    client.on('onTokenPrivilegeWillExpire', this.onTokenPrivilegeWillExpire);
    client.on('onTokenPrivilegeDidExpire', this.onTokenPrivilegeDidExpire); // console.log('agora rtm sdk version: ' + AgoraRTM.VERSION + ' compatible');

    {
      /*
      AgoraRTM.LOG_FILTER_OFF
      AgoraRTM.LOG_FILTER_ERROR
      AgoraRTM.LOG_FILTER_INFO (Default)
      AgoraRTM.LOG_FILTER_WARNING
      */
      var messageClient = this.messageClient = AgoraRTM.createInstance(environment.appKey, {
        logFilter: AgoraRTM.LOG_FILTER_OFF
      }); // LOG_FILTER_DEBUG

      messageClient.setParameters({
        logFilter: AgoraRTM.LOG_FILTER_OFF
      }); // messageClient.on('ConnectionStateChanged', console.warn);
      // messageClient.on('MessageFromPeer', console.log);
    }
  };

  _proto.getChannelNameLink = function getChannelNameLink() {
    var link = StateService.state.link || '';
    var match = link.match(/(\d{9})-(\d{4})-(\d{13})/);

    if (match) {
      link = match[1] + "-" + match[3];
    }

    var channelName = StateService.state.channelName;
    var channelNameLink = channelName + "-" + link; // console.log('AgoraService.getChannelNameLink', channelNameLink);

    return channelNameLink;
  };

  _proto.join = function join(token, channelNameLink) {
    var _this4 = this;

    this.channel = null;
    var client = this.client;
    var clientId = null; // console.log('AgoraService.join', { token, channelNameLink, clientId });

    client.join(token, channelNameLink, clientId, function (uid) {
      // console.log('AgoraService.join', uid);
      StateService.patchState({
        status: AgoraStatus.Connected,
        channelNameLink: channelNameLink,
        connected: true,
        uid: uid
      });

      {
        _this4.rtmToken$(uid).subscribe(function (token) {
          // console.log('AgoraService.rtmToken$', token);
          _this4.joinMessageChannel(token.token, uid).then(function (success) {
            // console.log('joinMessageChannel.success', success);
            if (StateService.state.role !== RoleType.Viewer) {
              _this4.autoDetectDevice();

              _this4.createMediaStream(uid, StateService.state.devices.video, StateService.state.devices.audio);
            }

            _this4.observeMemberCount();
          }, function (error) {
            console.log('joinMessageChannel.error', error);
          });
        });
      }
    }, function (error) {
      console.log('AgoraService.join.error', error);

      if (error === 'DYNAMIC_KEY_EXPIRED') {
        _this4.rtcToken$(channelNameLink).subscribe(function (token) {
          _this4.join(token.token, channelNameLink);
        });
      }
    }); // https://console.agora.io/invite?sign=YXBwSWQlM0RhYjQyODlhNDZjZDM0ZGE2YTYxZmQ4ZDY2Nzc0YjY1ZiUyNm5hbWUlM0RaYW1wZXR0aSUyNnRpbWVzdGFtcCUzRDE1ODY5NjM0NDU=// join link expire in 30 minutes
  };

  _proto.joinMessageChannel = function joinMessageChannel(token, uid) {
    var _this5 = this;

    var channel;
    return new Promise(function (resolve, reject) {
      var messageClient = _this5.messageClient;
      messageClient.login({
        token: token,
        uid: uid.toString()
      }).then(function () {
        // console.log('AgoraService.messageClient.login.success');
        channel = messageClient.createChannel(StateService.state.channelNameLink);
        return channel.join();
      }).then(function () {
        channel.on('ChannelMessage', _this5.onMessage);
        _this5.channel = channel;

        _this5.emit('channel', channel); // console.log('AgoraService.joinMessageChannel.success');


        resolve(uid);
      }).catch(reject);
    });
  };

  _proto.detectDevices = function detectDevices(next) {
    AgoraRTC.getDevices(function (devices) {
      var videos = [];
      var audios = [];

      for (var i = 0; i < devices.length; i++) {
        var device = devices[i];

        if ('videoinput' == device.kind) {
          videos.push({
            label: device.label || 'camera-' + videos.length,
            deviceId: device.deviceId,
            kind: device.kind
          });
        }

        if ('audioinput' == device.kind) {
          audios.push({
            label: device.label || 'microphone-' + videos.length,
            deviceId: device.deviceId,
            kind: device.kind
          });
        }
      }

      next({
        videos: videos,
        audios: audios
      });
    });
  };

  _proto.getVideoOptions = function getVideoOptions(options, video) {
    return new Promise(function (resolve, reject) {
      if (video) {
        if (video.kind === 'videostream') {
          var element = document.querySelector('#' + video.deviceId);
          element.crossOrigin = 'anonymous';
          var hls = new Hls();
          hls.attachMedia(element);
          hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            hls.loadSource(video.src);
            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
              // console.log('HlsDirective', data.levels);
              element.play().then(function (success) {
                var stream = element.captureStream();
                options.videoSource = stream.getVideoTracks()[0]; // console.log('AgoraService.getVideoOptions', element, stream, stream.getVideoTracks());

                resolve(options);
              }, function (error) {
                console.log('AgoraService.getVideoOptions.error', error);
              });
            });
          });
        } else if (video.kind === 'videoplayer' || video.kind === 'videostream') {
          var _element = document.querySelector('#' + video.deviceId);

          _element.crossOrigin = 'anonymous'; // element.oncanplay = () => {

          var stream = _element.captureStream();

          options.videoSource = stream.getVideoTracks()[0]; // console.log('getVideoOptions', element, stream, stream.getVideoTracks());

          resolve(options); // };

          /*
          element.play().then(success => {
          	const stream = element.captureStream();
          	options.videoSource = stream.getVideoTracks()[0];
          	// console.log('getVideoOptions', element, stream, stream.getVideoTracks());
          	resolve(options);
          }, error => {
          	// console.log('AgoraService.getVideoOptions.error', error);
          });
          */
        } else {
          options.cameraId = video.deviceId;
          resolve(options);
        }
      } else {
        resolve(options);
      }
    });
  };

  _proto.getAudioOptions = function getAudioOptions(options, audio) {
    return new Promise(function (resolve, reject) {
      if (audio) {
        if (audio.kind === 'videostream') {
          var element = document.querySelector('#' + audio.deviceId);
          element.crossOrigin = 'anonymous'; // !!! try hls.service;

          var hls = new Hls();
          hls.attachMedia(element);
          hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            hls.loadSource(audio.src);
            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
              // console.log('HlsDirective', data.levels);
              hls.loadLevel = data.levels.length - 1;
              element.play().then(function (success) {
                var stream = element.captureStream();
                options.audioSource = stream.getAudioTracks()[0]; // console.log('AgoraService.getAudioOptions', element, stream, stream.getAudioTracks());

                resolve(options);
              }, function (error) {
                console.log('AgoraService.getAudioOptions.error', error);
              });
            });
          });
        } else if (audio.kind === 'videoplayer' || audio.kind === 'videostream') {
          var _element2 = document.querySelector('#' + audio.deviceId);

          _element2.crossOrigin = 'anonymous'; // element.oncanplay = () => {

          var stream = _element2.captureStream();

          options.audioSource = stream.getAudioTracks()[0]; // console.log('AgoraService.getAudioOptions', element, stream, stream.getAudioTracks());

          resolve(options); // };

          /*
          element.play().then(success => {
          	const stream = element.captureStream();
          	options.audioSource = stream.getAudioTracks()[0];
          	// console.log('AgoraService.getAudioOptions', element, stream, stream.getAudioTracks());
          	resolve(options);
          }, error => {
          	// console.log('AgoraService.getAudioOptions.error', error);
          });
          */
        } else {
          options.microphoneId = audio.deviceId;
          resolve(options);
        }
      } else {
        resolve(options);
      }
    });
  };

  _proto.autoDetectDevice = function autoDetectDevice() {
  };

  _proto.createMediaStream = function createMediaStream(uid, video, audio) {
    var _this6 = this;

    // this.releaseStream('_mediaVideoStream')
    var options = {
      streamID: uid,
      video: Boolean(video),
      audio: Boolean(audio),
      screen: false
    };
    Promise.all([this.getVideoOptions(options, video), this.getAudioOptions(options, audio)]).then(function (success) {
      var quality = Object.assign({}, StateService.state.quality);

      _this6.createLocalStreamWithOptions(options, quality);
    });
  };

  _proto.createLocalStreamWithOptions = function createLocalStreamWithOptions(options, quality) {
    var _this7 = this;

    /*
    const getUserMedia = navigator.mediaDevices.getUserMedia;
    navigator.mediaDevices.getUserMedia = function(options) {
    	if (options.video) {
    		options.video.width = { ideal: 4096 };
    		options.video.height = { ideal: 2160 };
    		console.log('getUserMedia', options.video.width.ideal, options.video.height.ideal);
    	}
    	console.log('getUserMedia', options);
    	return getUserMedia.call(navigator.mediaDevices, options);
    }
    */
    var local = AgoraRTC.createStream(options);
    /*
    // force video quality
    quality = {
    	resolution: {
    		width: 1920,
    		height: 1080
    	},
    	frameRate: {
    		min: 30,
    		max: 30
    	},
    	bitrate: {
    		min: 2000,
    		max: 4000
    	}
    };
    */

    if (quality) {
      local.setVideoProfile(quality.profile);
      local.setVideoEncoderConfiguration(quality);
    } // console.log('local', local.attributes);


    local.init(function () {
      StreamService.local = local;
      setTimeout(function () {
        _this7.publishLocalStream();
      }, 1);
    }, function (error) {
      console.log('AgoraService.initLocalStream.init.error', error);
    });
  };

  _proto.initLocalStream = function initLocalStream() {
    var _this8 = this;

    var local = StreamService.local;
    local.init(function () {
      _this8.publishLocalStream();
    }, function (error) {
      console.log('AgoraService.initLocalStream.init.error', error);
    });
  }
  /*
  createMediaVideoStream(video, callback) {
  	const videoStream = video.captureStream(60);
  	const stream = AgoraRTC.createStream({
  		audio: true,
  		video: true,
  		videoSource: videoStream.getVideoTracks()[0],
  		audioSource: videoStream.getAudioTracks()[0],
  	});
  	stream.init(() => {
  		callback(stream.getVideoTrack(), stream.getAudioTrack());
  	});
  }
  */
  ;

  _proto.publishLocalStream = function publishLocalStream() {
    var client = this.client;
    var local = StreamService.local; // publish local stream

    client.publish(local, function (error) {
      console.log('AgoraService.publishLocalStream.error', local.getId(), error);
    });
    local.clientInfo = {
      role: StateService.state.role,
      name: StateService.state.name,
      uid: StateService.state.uid
    };
    StreamService.local = local;
  };

  _proto.unpublishLocalStream = function unpublishLocalStream() {
    var client = this.client;
    var local = StreamService.local;

    if (local) {
      client.unpublish(local, function (error) {
        console.log('AgoraService.unpublishLocalStream.error', local.getId(), error);
      });
    }

    StreamService.local = null;
  };

  _proto.leaveChannel = function leaveChannel() {
    var _this9 = this;

    StateService.patchState({
      connecting: false
    });
    this.unpublishLocalStream();
    StreamService.remotes = [];
    StreamService.peers = [];
    return new Promise(function (resolve, reject) {
      _this9.leaveMessageChannel().then(function () {
        var client = _this9.client;
        client.leave(function () {
          _this9.client = null; // console.log('Leave channel successfully');

          if (environment.flags.useProxy) {
            client.stopProxyServer();
          }

          resolve();
        }, function (error) {
          console.log('AgoraService.leaveChannel.error', error);
          reject(error);
        });
      }, reject);
    });
  };

  _proto.leaveMessageChannel = function leaveMessageChannel() {
    var _this10 = this;

    return new Promise(function (resolve, reject) {
      {
        _this10.unobserveMemberCount();

        var channel = _this10.channel;
        var messageClient = _this10.messageClient;
        channel.leave().then(function () {
          _this10.channel = null;
          messageClient.logout().then(function () {
            _this10.messageClient = null;
            resolve();
          }, reject);
        }, reject);
      }
    });
  };

  _proto.toggleCamera = function toggleCamera() {
    var local = StreamService.local; // console.log('toggleCamera', local);

    if (local && local.video) {
      if (local.userMuteVideo) {
        local.unmuteVideo();
        StateService.patchState({
          cameraMuted: false
        });
        this.broadcastEvent(new AgoraUnmuteVideoEvent({
          streamId: local.getId()
        }));
      } else {
        local.muteVideo();
        StateService.patchState({
          cameraMuted: true
        });
        this.broadcastEvent(new AgoraMuteVideoEvent({
          streamId: local.getId()
        }));
      }
    }
  };

  _proto.toggleAudio = function toggleAudio() {
    var local = StreamService.local; // console.log(local);

    if (local && local.audio) {
      if (local.userMuteAudio) {
        local.unmuteAudio();
        StateService.patchState({
          audioMuted: false
        });
        this.broadcastEvent(new AgoraUnmuteAudioEvent({
          streamId: local.getId()
        }));
      } else {
        local.muteAudio();
        StateService.patchState({
          audioMuted: true
        });
        this.broadcastEvent(new AgoraMuteAudioEvent({
          streamId: local.getId()
        }));
      }
    }
  };

  _proto.toggleControl = function toggleControl() {
    var _this11 = this;

    if (StateService.state.control) {
      this.sendRemoteControlDismiss().then(function (control) {
        // console.log('AgoraService.sendRemoteControlDismiss', control);
        StateService.patchState({
          control: !control
        });
      });
    } else if (StateService.state.spying) {
      this.sendRemoteInfoDismiss(StateService.state.spying).then(function (spying) {
        // console.log('AgoraService.sendRemoteInfoDismiss', spying);
        StateService.patchState({
          spying: false
        });

        _this11.sendRemoteControlRequest().then(function (control) {
          // console.log('AgoraService.sendRemoteControlRequest', control);
          StateService.patchState({
            control: control
          });
        });
      });
    } else {
      this.sendRemoteControlRequest().then(function (control) {
        // console.log('AgoraService.sendRemoteControlRequest', control);
        StateService.patchState({
          control: control
        });
      });
    }
  };

  _proto.toggleSpy = function toggleSpy(remoteId) {
    var _this12 = this;

    if (StateService.state.control) {
      this.sendRemoteControlDismiss().then(function (control) {
        StateService.patchState({
          control: false
        });

        _this12.sendSpyRemoteRequestInfo(remoteId).then(function (info) {
          StateService.patchState({
            spying: remoteId
          });
        });
      });
    } else if (StateService.state.spying) {
      this.sendRemoteInfoDismiss(StateService.state.spying).then(function (spying) {
        // console.log('AgoraService.sendRemoteInfoDismiss', spying);
        // StateService.patchState({ spying: !spying });
        if (StateService.state.spying !== remoteId) {
          _this12.sendSpyRemoteRequestInfo(remoteId).then(function (info) {
            StateService.patchState({
              spying: remoteId
            });
          });
        } else {
          StateService.patchState({
            spying: false
          });
        }
      });
    } else {
      this.sendSpyRemoteRequestInfo(remoteId).then(function (info) {
        StateService.patchState({
          spying: remoteId
        });
      });
    }
  };

  _proto.newMessageId = function newMessageId() {
    return StateService.state.uid + "-" + Date.now().toString();
  };

  _proto.sendRemoteControlDismiss = function sendRemoteControlDismiss() {
    var _this13 = this;

    return new Promise(function (resolve, reject) {
      _this13.sendMessage({
        type: MessageType.RequestControlDismiss,
        messageId: _this13.newMessageId()
      }).then(function (message) {
        // console.log('AgoraService.sendRemoteControlDismiss return', message);
        if (message.type === MessageType.RequestControlDismissed) {
          resolve(true);
        } else if (message.type === MessageType.RequestControlRejected) {
          resolve(false);
        }
      });
    });
  };

  _proto.sendRemoteControlRequest = function sendRemoteControlRequest() {
    var _this14 = this;

    return new Promise(function (resolve, reject) {
      _this14.sendMessage({
        type: MessageType.RequestControl,
        messageId: _this14.newMessageId()
      }).then(function (message) {
        // console.log('AgoraService.sendRemoteControlRequest.response', message);
        if (message.type === MessageType.RequestControlAccepted) {
          resolve(true);
        } else if (message.type === MessageType.RequestControlRejected) {
          // this.remoteDeviceInfo = undefined
          resolve(false);
        }
      });
    });
  };

  _proto.sendRemoteRequestPeerInfo = function sendRemoteRequestPeerInfo(remoteId) {
    var _this15 = this;

    // console.log('AgoraService.sendRemoteRequestPeerInfo', remoteId);
    return new Promise(function (resolve, reject) {
      _this15.sendMessage({
        type: MessageType.RequestPeerInfo,
        messageId: _this15.newMessageId(),
        remoteId: remoteId
      }).then(function (message) {
        // console.log('AgoraService.sendRemoteRequestPeerInfo.response', message);
        if (message.type === MessageType.RequestPeerInfoResult) {
          if (message.clientInfo.role === RoleType.Publisher) {
            var state = {
              hosted: true
            };

            if (message.clientInfo.control === true) {
              state.locked = true;

              _this15.sendControlRemoteRequestInfo(message.clientInfo.uid);
            }

            StateService.patchState(state);
          }

          resolve(message);
        }
      });
    });
  };

  _proto.sendControlRemoteRequestInfo = function sendControlRemoteRequestInfo(remoteId) {
    var _this16 = this;

    // console.log('AgoraService.sendControlRemoteRequestInfo', remoteId);
    return new Promise(function (resolve, reject) {
      _this16.sendMessage({
        type: MessageType.RequestInfo,
        messageId: _this16.newMessageId(),
        remoteId: remoteId
      }).then(function (message) {
        if (message.type === MessageType.RequestInfoResult) {
          resolve(message);
        }
      });
    });
  };

  _proto.sendSpyRemoteRequestInfo = function sendSpyRemoteRequestInfo(remoteId) {
    var _this17 = this;

    return new Promise(function (resolve, reject) {
      _this17.sendMessage({
        type: MessageType.RequestInfo,
        messageId: _this17.newMessageId(),
        remoteId: remoteId
      }).then(function (message) {
        // console.log('AgoraService.sendSpyRemoteRequestInfo.response', message);
        if (message.type === MessageType.RequestInfoResult) {
          StateService.patchState({
            spying: remoteId
          });
          resolve(message);
        }
      });
    });
  };

  _proto.sendRemoteInfoDismiss = function sendRemoteInfoDismiss(remoteId) {
    var _this18 = this;

    return new Promise(function (resolve, reject) {
      _this18.sendMessage({
        type: MessageType.RequestInfoDismiss,
        messageId: _this18.newMessageId(),
        remoteId: remoteId
      }).then(function (message) {
        // console.log('AgoraService.sendRemoteInfoDismiss.response', message);
        if (message.type === MessageType.RequestInfoDismissed) {
          resolve(true);
        } else if (message.type === MessageType.RequestInfoRejected) {
          resolve(false);
        }
      });
    });
  };

  _proto.navToView = function navToView(viewId) {
    if (StateService.state.control || StateService.state.spyed) {
      this.sendMessage({
        type: MessageType.NavToView,
        viewId: viewId
      });
    }
  };

  _proto.getSessionStats = function getSessionStats() {
    var client = this.client;
    client.getSessionStats(function (stats) {
      console.log("Current Session Duration: " + stats.Duration);
      console.log("Current Session UserCount: " + stats.UserCount);
      console.log("Current Session SendBytes: " + stats.SendBytes);
      console.log("Current Session RecvBytes: " + stats.RecvBytes);
      console.log("Current Session SendBitrate: " + stats.SendBitrate);
      console.log("Current Session RecvBitrate: " + stats.RecvBitrate);
    });
  };

  _proto.getSystemStats = function getSystemStats() {
    var client = this.client;
    client.getSystemStats(function (stats) {
      console.log("Current battery level: " + stats.BatteryLevel);
    });
  };

  _proto.sendMessage = function sendMessage(message) {
    var _this19 = this;

    return new Promise(function (resolve, reject) {
      if (StateService.state.connected) {
        message.clientId = StateService.state.uid;

        switch (message.type) {
          case MessageType.ControlInfo:
          case MessageType.NavToGrid:
          case MessageType.ShowPanel:
          case MessageType.PlayMedia:
            if (!StateService.state.control && !StateService.state.spyed) {
              return;
            }

            break;
        } // message.wrc_version = 'beta';
        // message.uid = StateService.state.uid;


        var send = function send(message, channel) {
          try {
            var text = JSON.stringify(message);

            if (message.messageId) {
              _this19.once("message-" + message.messageId, function (message) {
                resolve(message);
              });
            } // console.log('AgoraService.sendMessage.sending', message.type);


            channel.sendMessage({
              text: text
            }).then(function () {
              // console.log('AgoraService.sendMessage', text);
              if (!message.messageId) {
                resolve(message);
              }
            }).catch(function (error) {
              console.log('AgoraService.sendMessage.error', error);
            });
          } catch (error) {
            console.log('AgoraService.sendMessage.error', error); // reject(error);
          }
        };

        var channel = _this19.channel;

        if (channel) {
          send(message, channel);
        } else {
          try {
            _this19.once("channel", function (channel) {
              send(message, channel);
            });
          } catch (error) {
            reject(error);
          }
        }
      }
    });
  };

  _proto.checkBroadcastMessage = function checkBroadcastMessage(message) {
    // filter for broadcast
    // !!! filter events here
    switch (message.type) {
      case MessageType.RequestControlDismiss:
        StateService.patchState({
          locked: false
        });
        this.sendMessage({
          type: MessageType.RequestControlDismissed,
          messageId: message.messageId
        });
        break;

      case MessageType.RequestInfoDismiss:
        // console.log('checkBroadcastMessage.RequestInfoDismiss', message);
        StateService.patchState({
          spyed: false
        });
        this.sendMessage({
          type: MessageType.RequestInfoDismissed,
          messageId: message.messageId,
          remoteId: message.remoteId
        });
        break;

      case MessageType.RequestInfoResult:
        // console.log('checkBroadcastMessage.RequestInfoResult', message);
        if (StateService.state.role === RoleType.Publisher) {
          this.broadcastMessage(message);
        } else if (StateService.state.locked) {
          this.broadcastMessage(message);
        }

        break;

      case MessageType.ControlInfo:
      case MessageType.ShowPanel:
      case MessageType.PlayMedia:
      case MessageType.NavToView:
      case MessageType.NavToGrid:
        if (StateService.state.locked || StateService.state.spying && StateService.state.spying === message.clientId) {
          this.broadcastMessage(message);
        }

        break;

      default:
        this.broadcastMessage(message);
    }
  };

  _proto.broadcastMessage = function broadcastMessage(message) {
    MessageService.out(message);
  };

  _proto.broadcastEvent = function broadcastEvent(event) {
    MessageService.out({
      type: MessageType.AgoraEvent,
      event: event
    });
  };

  _proto.onMessage = function onMessage(data, uid) {
    // console.log('AgoraService.onMessage', data.text, uid, StateService.state.uid);
    // discard message delivered by current state uid;
    if (uid !== StateService.state.uid) {
      // console.log('AgoraService.onMessage', data.text);
      var message = JSON.parse(data.text);

      if (message.messageId && this.has("message-" + message.messageId)) {
        // !!! removed return
        this.emit("message-" + message.messageId, message);
      } // discard message delivered to specific remoteId when differs from current state uid;


      if (message.remoteId && message.remoteId !== StateService.state.uid) {
        return;
      } // !!! check position !!!


      if (message.type === MessageType.VRStarted) {
        var container = document.createElement('div');
        container.classList.add('player__vr');
        message.container = container;
      }
      /*
      if (message.type === MessageType.VRStarted || message.type === MessageType.VREnded) {
      	console.log('AgoraService.onMessage', message.type, message);
      }
      */


      this.checkBroadcastMessage(message);
    }
  };

  _proto.onError = function onError(error) {
    console.log('AgoraService.onError', error);
  };

  _proto.onStreamPublished = function onStreamPublished(event) {
    // console.log('AgoraService.onStreamPublished');
    var local = StreamService.local;
    local.clientInfo = {
      role: StateService.state.role,
      name: StateService.state.name,
      uid: StateService.state.uid
    };
    StreamService.local = local;
  };

  _proto.onStreamUnpublished = function onStreamUnpublished(event) {
    // console.log('AgoraService.onStreamUnpublished');
    StreamService.local = null;
  };

  _proto.onStreamAdded = function onStreamAdded(event) {
    var client = this.client;
    var stream = event.stream;

    if (!stream) {
      return;
    }

    var streamId = stream.getId();

    if (streamId !== StateService.state.uid) {
      // console.log('AgoraService.onStreamAdded', streamId, StateService.state.uid);
      client.subscribe(stream, function (error) {
        console.log('AgoraService.onStreamAdded.subscribe.error', error);
      });
    }
  };

  _proto.onStreamRemoved = function onStreamRemoved(event) {
    var stream = event.stream;
    var streamId = stream.getId();

    if (streamId !== StateService.state.uid) {
      // !!! this happen on oculus removed timeout
      // console.log('AgoraService.onStreamRemoved', streamId);
      this.remoteRemove(streamId);
    }
  };

  _proto.onStreamSubscribed = function onStreamSubscribed(event) {
    // console.log('AgoraService.onStreamSubscribed', event.stream.getId());
    this.remoteAdd(event.stream);
  };

  _proto.onPeerConnect = function onPeerConnect(event) {
    // console.log('AgoraService.onPeerConnect', event);
    this.peerAdd(event);
  };

  _proto.onPeerLeaved = function onPeerLeaved(event) {
    var clientId = event.uid;

    if (clientId !== StateService.state.uid) {
      // console.log('AgoraService.onPeerLeaved', event.uid);
      var remote = this.remoteRemove(clientId);

      if (remote.clientInfo) {
        if (remote.clientInfo.role === RoleType.Publisher) {
          StateService.patchState({
            hosted: false,
            locked: false,
            control: false,
            spyed: false
          });
        } else if (StateService.state.spying === clientId) {
          StateService.patchState({
            spying: false
          });
        }
      }
    }

    this.peerRemove(clientId);
  };

  _proto.peerAdd = function peerAdd(event) {
    // console.log('AgoraService.peerAdd', event);
    var peer = {
      uid: event.uid
    };
    var peers = StreamService.peers;
    peers.push(peer);
    StreamService.peers = peers;
    this.broadcastEvent(new AgoraPeerEvent({
      peer: peer
    }));
  };

  _proto.peerRemove = function peerRemove(peerId) {
    // console.log('AgoraService.peerRemove', peerId);
    var peers = StreamService.peers;
    var peer = peers.find(function (x) {
      return x.uid === peerId;
    });

    if (peer) {
      peers.splice(peers.indexOf(peer), 1);
      StreamService.peers = peers;
    }
  };

  _proto.remoteAdd = function remoteAdd(stream) {
    // console.log('AgoraService.remoteAdd', stream);
    var remotes = StreamService.remotes;
    remotes.push(stream);
    StreamService.remotes = remotes;
    this.broadcastEvent(new AgoraRemoteEvent({
      stream: stream
    }));
    var remoteId = stream.getId();
    this.sendRemoteRequestPeerInfo(remoteId).then(function (message) {
      var remotes = StreamService.remotes;
      var remote = remotes.find(function (x) {
        return x.getId() === remoteId;
      });

      if (remote) {
        remote.clientInfo = message.clientInfo;
      }

      StreamService.remotes = remotes;
    });
  };

  _proto.remoteRemove = function remoteRemove(streamId) {
    // console.log('AgoraService.remoteRemove', streamId);
    var remotes = StreamService.remotes;
    var remote = remotes.find(function (x) {
      return x.getId() === streamId;
    });

    if (remote) {
      if (remote.isPlaying()) {
        remote.stop();
      }

      remotes.splice(remotes.indexOf(remote), 1);
      StreamService.remotes = remotes;

      if (remote.clientInfo && remote.clientInfo.role === RoleType.Publisher) {
        StateService.patchState({
          hosted: false
        });
      }
    }

    return remote;
  };

  _proto.onMuteVideo = function onMuteVideo(event) {
    // console.log('AgoraService.onMuteVideo', event);
    this.broadcastEvent(new AgoraMuteVideoEvent({
      streamId: event.uid
    }));
  };

  _proto.onUnmuteVideo = function onUnmuteVideo(event) {
    // console.log('AgoraService.onUnmuteVideo', event);
    this.broadcastEvent(new AgoraUnmuteVideoEvent({
      streamId: event.uid
    }));
  };

  _proto.onMuteAudio = function onMuteAudio(event) {
    // console.log('AgoraService.onMuteAudio', event);
    this.broadcastEvent(new AgoraMuteAudioEvent({
      streamId: event.uid
    }));
  };

  _proto.onUnmuteAudio = function onUnmuteAudio(event) {
    // console.log('AgoraService.onUnmuteAudio', event);
    this.broadcastEvent(new AgoraUnmuteAudioEvent({
      streamId: event.uid
    }));
  };

  _proto.onVolumeIndicator = function onVolumeIndicator(event) {
    // console.log('AgoraService.onVolumeIndicator', event);
    var streams = event.attr.map(function (x) {
      return {
        streamId: x.uid,
        level: x.level
      };
    });
    this.broadcastEvent(new AgoraVolumeLevelsEvent({
      streams: streams
    }));
  };

  _proto.onConnectionStateChange = function onConnectionStateChange(event) {
    console.log('AgoraService.onConnectionStateChange', event);
  };

  _proto.onTokenPrivilegeWillExpire = function onTokenPrivilegeWillExpire(event) {
    console.log('AgoraService.onTokenPrivilegeWillExpire');
    var client = this.client;
    var channelNameLink = this.getChannelNameLink();
    this.rtcToken$(channelNameLink).subscribe(function (token) {
      if (token.token) {
        client.renewToken(token.token);
        console.log('AgoraService.onTokenPrivilegeWillExpire.renewed');
      }
    });
  };

  _proto.onTokenPrivilegeDidExpire = function onTokenPrivilegeDidExpire(event) {
    console.log('AgoraService.onTokenPrivilegeDidExpire');
    var client = this.client;
    var channelNameLink = this.getChannelNameLink();
    this.rtcToken$(channelNameLink).subscribe(function (token) {
      if (token.token) {
        client.renewToken(token.token);
        console.log('AgoraService.onTokenPrivilegeDidExpire.renewed');
      }
    });
  };

  return AgoraService;
}(Emittable);var AgoraDeviceComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AgoraDeviceComponent, _Component);

  function AgoraDeviceComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AgoraDeviceComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.platform = DeviceService.platform;
    this.isHttps = window.location.protocol === 'https:';
    this.state = {};
    this.devices = {
      videos: [],
      audios: []
    };
    this.stream = null;
    this.form = null;

    if (this.isHttps) {
      var agora = this.agora = AgoraService.getSingleton();
      StateService.state$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (state) {
        // console.log('AgoraDeviceComponent.state', state);
        _this.state = state;

        _this.pushChanges();
      });

      if (agora) {
        agora.devices$().subscribe(function (devices) {
          // console.log(devices);
          _this.devices = devices;

          _this.initForm(devices);

          _this.pushChanges();
        });
      }
    }
  };

  _proto.openHttps = function openHttps(event) {
    window.location.href = window.location.href.replace('http://', 'https://').replace(':5000', ':6443');
  };

  _proto.initForm = function initForm(devices) {
    var _this2 = this;

    var form = this.form = new rxcompForm.FormGroup({
      video: new rxcompForm.FormControl(null, devices.videos.length ? rxcompForm.Validators.RequiredValidator() : undefined),
      audio: new rxcompForm.FormControl(null, devices.audios.length ? rxcompForm.Validators.RequiredValidator() : undefined)
    });
    var controls = this.controls = form.controls;
    var videoOptions = devices.videos.map(function (x) {
      return {
        id: x.deviceId,
        name: x.label
      };
    });

    if (videoOptions.length > 0) {
      videoOptions.unshift({
        id: null,
        name: LabelPipe.transform('bhere_select_video')
      });
    }

    controls.video.options = videoOptions;
    var audioOptions = devices.audios.map(function (x) {
      return {
        id: x.deviceId,
        name: x.label
      };
    });

    if (audioOptions.length > 0) {
      audioOptions.unshift({
        id: null,
        name: LabelPipe.transform('bhere_select_audio')
      });
    }

    controls.audio.options = audioOptions;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (changes) {
      // console.log('AgoraDeviceComponent.changes$', form.value);
      _this2.pushChanges();
    });
  };

  _proto.onStreamDidChange = function onStreamDidChange(event) {
    this.stream = null;
    this.pushChanges();
  };

  _proto.onStream = function onStream(stream) {
    this.stream = stream;
    this.pushChanges();
  };

  _proto.isValid = function isValid() {
    var isValid = this.form.valid && (this.stream || !this.hasPreview);
    return isValid;
  };

  _proto.onEnter = function onEnter(event) {
    var preferences = this.form.value;
    var devices = this.devices;
    devices.video = devices.videos.find(function (x) {
      return x.deviceId === preferences.video;
    });
    devices.audio = devices.audios.find(function (x) {
      return x.deviceId === preferences.audio;
    });
    this.enter.next(devices);
  };

  _createClass(AgoraDeviceComponent, [{
    key: "hasPreview",
    get: function get() {
      return this.platform !== DevicePlatform.IOS && this.platform !== DevicePlatform.VRHeadset;
    }
  }]);

  return AgoraDeviceComponent;
}(rxcomp.Component);
AgoraDeviceComponent.meta = {
  selector: '[agora-device]',
  outputs: ['enter']
};var LocationService = /*#__PURE__*/function () {
  function LocationService() {}

  LocationService.has = function has(key) {
    var params = new URLSearchParams(window.location.search); // console.log('LocationService.has', params);

    return params.has(key);
  };

  LocationService.get = function get(key) {
    var params = new URLSearchParams(window.location.search); // console.log('LocationService.get', params);

    return params.get(key);
  };

  LocationService.set = function set(keyOrValue, value) {
    var params = new URLSearchParams(window.location.search);

    if (typeof keyOrValue === 'string') {
      params.set(keyOrValue, value);
    } else {
      params.set(keyOrValue, '');
    }

    this.replace(params); // console.log('LocationService.set', params, keyOrValue, value);
  };

  LocationService.replace = function replace(params) {
    if (window.history && window.history.pushState) {
      var title = document.title;
      var url = window.location.href.split('?')[0] + "?" + params.toString();
      window.history.pushState(params.toString(), title, url);
    }
  };

  LocationService.deserialize = function deserialize(key) {
    var encoded = this.get('params');
    return this.decode(key, encoded);
  };

  LocationService.serialize = function serialize(keyOrValue, value) {
    var params = this.deserialize();
    var encoded = this.encode(keyOrValue, value, params);
    this.set('params', encoded);
  };

  LocationService.decode = function decode(key, encoded) {
    var decoded = null;

    if (encoded) {
      var json = window.atob(encoded);
      decoded = JSON.parse(json);
    }

    if (key && decoded) {
      decoded = decoded[key];
    }

    return decoded || null;
  };

  LocationService.encode = function encode(keyOrValue, value, params) {
    params = params || {};
    var encoded = null;

    if (typeof keyOrValue === 'string') {
      params[keyOrValue] = value;
    } else {
      params = keyOrValue;
    }

    var json = JSON.stringify(params);
    encoded = window.btoa(json);
    return encoded;
  };

  return LocationService;
}();var AgoraLinkComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AgoraLinkComponent, _Component);

  function AgoraLinkComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AgoraLinkComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.flags = environment.flags;
    this.editorLink = environment.url.editor;
    this.state = {};
    var form = this.form = new rxcompForm.FormGroup({
      link: new rxcompForm.FormControl(null, [rxcompForm.Validators.PatternValidator(/^\d{9}-\d{4}-\d{13}$/), rxcompForm.Validators.RequiredValidator()]),
      linkAttendee: null,
      linkStreamer: null,
      linkViewer: null // link: new FormControl(null),

    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (changes) {
      // console.log('AgoraLinkComponent.changes$', form.value);
      _this.pushChanges();
    });
    StateService.state$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (state) {
      // console.log('AgoraLinkComponent.state', state);
      _this.state = state;

      _this.pushChanges();
    });
  };

  _proto.onGenerateMeetingId = function onGenerateMeetingId($event) {
    // const timestamp = (performance.now() * 10000000000000).toString();
    var timestamp = new Date().valueOf().toString();
    this.form.patch({
      link: this.getRoleMeetingId(timestamp, RoleType.Publisher),
      linkAttendee: this.getRoleMeetingId(timestamp, RoleType.Attendee),
      linkStreamer: this.getRoleMeetingId(timestamp, RoleType.Streamer),
      linkViewer: this.getRoleMeetingId(timestamp, RoleType.Viewer)
    });
  };

  _proto.replaceRoleMeetingId = function replaceRoleMeetingId(meetingId, role) {
    var components = meetingId.split('-');
    components[1] = this.padded(this.getRoleIndex(role), 4);
    return components.join('-');
  };

  _proto.onInputDidChange = function onInputDidChange($event) {
    var _this2 = this;

    // console.log('onInputDidChange', this.form.get('link').value, this.form.get('link').valid);
    if (this.state.role !== 'publisher') {
      return;
    }

    setTimeout(function () {
      if (_this2.form.get('link').valid) {
        var value = _this2.form.get('link').value;

        _this2.form.patch({
          link: _this2.setRoleMeetingId(value, RoleType.Publisher),
          linkAttendee: _this2.setRoleMeetingId(value, RoleType.Attendee),
          linkStreamer: _this2.setRoleMeetingId(value, RoleType.Streamer),
          linkViewer: _this2.setRoleMeetingId(value, RoleType.Viewer)
        });
      } else {
        _this2.form.get('linkAttendee').reset();

        _this2.form.get('linkStreamer').reset();

        _this2.form.get('linkViewer').reset();
      }
    }, 1);
  };

  _proto.setRoleMeetingId = function setRoleMeetingId(meetingId, role) {
    var meetingIdSegments = meetingId.split('-');
    return meetingIdSegments[0] + "-" + this.padded(this.getRoleIndex(role), 4) + "-" + meetingIdSegments[2];
  };

  _proto.getRoleMeetingId = function getRoleMeetingId(timestamp, role) {
    return this.padded(this.state.user.id, 9) + "-" + this.padded(this.getRoleIndex(role), 4) + "-" + timestamp;
  };

  _proto.getRoleIndex = function getRoleIndex(role) {
    return Object.keys(RoleType).reduce(function (p, c, i) {
      return RoleType[c] === role ? i : p;
    }, -1);
  };

  _proto.onCopyToClipBoard = function onCopyToClipBoard(meetingId) {
    var input = document.createElement('input');
    input.style.position = 'absolute';
    input.style.top = '1000vh'; // input.style.visibility = 'hidden';

    document.querySelector('body').appendChild(input);
    input.value = this.getUrl(meetingId, true);
    input.focus();
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand('copy');
    input.parentNode.removeChild(input);
    alert("link copiato!\n " + input.value);
  };

  _proto.isValid = function isValid() {
    var isValid = this.form.valid;
    return isValid;
  };

  _proto.onNext = function onNext(event) {
    var meetingId = this.controls.link.value;
    /*
    if (this.state.role === RoleType.Publisher) {
    	meetingId = this.replaceRoleMeetingId(meetingId, RoleType.Publisher);
    }
    */

    this.replaceUrl(meetingId);
    this.link.next(meetingId);
  };

  _proto.getUrl = function getUrl(meetingId, shareable) {
    if (shareable === void 0) {
      shareable = false;
    }

    var role = LocationService.get('role') || null;
    var name = LocationService.get('name') || null;
    var url = "" + window.location.origin + window.location.pathname + "?link=" + meetingId + (name ? "&name=" + name : '') + (role && !shareable ? "&role=" + role : '');
    return url;
  };

  _proto.replaceUrl = function replaceUrl(meetingId) {
    if ('history' in window) {
      var url = this.getUrl(meetingId); // console.log('AgoraLinkComponent.url', url);

      window.history.replaceState({
        'pageTitle': window.pageTitle
      }, '', url);
    }
  };

  _proto.padded = function padded(num, size) {
    var s = '000000000' + num;
    return s.substr(s.length - size);
  };

  _createClass(AgoraLinkComponent, [{
    key: "heroku",
    get: function get() {
      return HEROKU;
    }
  }]);

  return AgoraLinkComponent;
}(rxcomp.Component);
AgoraLinkComponent.meta = {
  selector: '[agora-link]',
  outputs: ['link']
};var AgoraNameComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AgoraNameComponent, _Component);

  function AgoraNameComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AgoraNameComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var name = LocationService.get('name') || null;
    this.state = {};
    var form = this.form = new rxcompForm.FormGroup({
      name: new rxcompForm.FormControl(name, [rxcompForm.Validators.PatternValidator(/^\w{2,}\s\w{2,}/), rxcompForm.Validators.RequiredValidator()])
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (changes) {
      // console.log('AgoraNameComponent.changes$', form.value);
      _this.pushChanges();
    });
    StateService.state$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (state) {
      // console.log('AgoraNameComponent.state', state);
      _this.state = state;

      _this.pushChanges();
    });
  };

  _proto.isValid = function isValid() {
    var isValid = this.form.valid;
    return isValid;
  };

  _proto.onNext = function onNext(event) {
    this.replaceUrl();
    this.name.next(this.controls.name.value);
  };

  _proto.replaceUrl = function replaceUrl() {
    if ('history' in window) {
      var role = LocationService.get('role') || null;
      var link = LocationService.get('link') || null;
      var url = "" + window.location.origin + window.location.pathname + "?link=" + link + "&name=" + this.controls.name.value + (role ? "&role=" + role : ''); // console.log('AgoraNameComponent.url', url);

      window.history.replaceState({
        'pageTitle': window.pageTitle
      }, '', url);
    }
  };

  return AgoraNameComponent;
}(rxcomp.Component);
AgoraNameComponent.meta = {
  selector: '[agora-name]',
  outputs: ['name']
};var AgoraStreamComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AgoraStreamComponent, _Component);

  function AgoraStreamComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AgoraStreamComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.videoMuted = false;
    this.audioMuted = false;
    this.shouldUseResumeGesture = false;
    this.state = {};
    StateService.state$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (state) {
      _this.state = state;

      _this.pushChanges(); // console.log('AgoraStreamComponent.StateService.state$', this.streamId, state);

    });
    MessageService.out$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (message) {
      // console.log('AgoraStreamComponent.MessageService.out$', this.streamId, message);
      switch (message.type) {
        case MessageType.AgoraEvent:
          var event = message.event; // console.log('AgoraStreamComponent.AgoraEvent', message.event);

          if (_this.streamId && event.streamId === _this.streamId) {
            if (event instanceof AgoraMuteVideoEvent) {
              _this.videoMuted = true;
            }

            if (event instanceof AgoraUnmuteVideoEvent) {
              _this.videoMuted = false;
            }

            if (event instanceof AgoraMuteAudioEvent) {
              _this.audioMuted = true;
            }

            if (event instanceof AgoraUnmuteAudioEvent) {
              _this.audioMuted = false;
            }
          }

          break;

        case MessageType.VRStarted:
          // console.log('AgoraStreamComponent.VRStarted', this.streamId, message.clientId, message.container);
          if (_this.streamId === message.clientId) {
            _this.vrContainer = message.container;
          }

          break;

        case MessageType.VREnded:
          // console.log('AgoraStreamComponent.VREnded', this.streamId, message.clientId);
          if (_this.streamId === message.clientId) {
            _this.vrContainer = null;
          }

          break;
      }
    });
  };

  _proto.setMediaStream = function setMediaStream(mediaStream) {
    var videoNode = this.videoNode;

    if ('srcObject' in videoNode) {
      videoNode.srcObject = mediaStream;
    } else {
      videoNode.src = mediaStream ? window.URL.createObjectURL(mediaStream) : null;
    }
  };

  _proto.onLoadedMetadata = function onLoadedMetadata(event) {
    // console.log('AgoraStreamComponent.onLoadedMetadata', event);
    this.videoNode.play().then(function (success) {// console.log('AgoraStreamComponent.play.success', success);
    }, function (error) {
      console.log('AgoraStreamComponent.play.error', error);
    });
  };

  _proto.onToggleSpy = function onToggleSpy($event) {
    this.toggleSpy.next($event);
  };

  _createClass(AgoraStreamComponent, [{
    key: "videoMuted",
    set: function set(videoMuted) {
      if (this.videoMuted_ !== videoMuted) {
        this.videoMuted_ = videoMuted;

        var _getContext = rxcomp.getContext(this),
            node = _getContext.node;

        videoMuted ? node.classList.add('video--muted') : node.classList.remove('video--muted');
      }
    }
  }, {
    key: "audioMuted",
    set: function set(audioMuted) {
      if (this.audioMuted_ !== audioMuted) {
        this.audioMuted_ = audioMuted;

        var _getContext2 = rxcomp.getContext(this),
            node = _getContext2.node;

        audioMuted ? node.classList.add('audio--muted') : node.classList.remove('audio--muted');
      }
    }
  }, {
    key: "streamId",
    get: function get() {
      return this.streamId_;
    },
    set: function set(streamId) {
      this.streamId_ = streamId;
    }
  }, {
    key: "stream",
    get: function get() {
      return this.stream_;
    },
    set: function set(stream) {
      if (this.stream_ !== stream) {
        // console.log('AgoraStreamComponent set stream', stream);
        var _getContext3 = rxcomp.getContext(this),
            node = _getContext3.node;

        var player = this.player = node.querySelector('.agora-stream__player');

        while (player.childElementCount > 0) {
          player.removeChild(player.firstElementChild);
        } // player.textContent = '';


        if (this.stream_ && this.stream_.isPlaying() && this.stream_.player.div.parentNode === player) {
          // console.log('AgoraStreamComponent stopping stream', this.stream_.getId(), 'on', this.stream_.player.div.parentNode);
          this.stream_.stop();
        }

        this.stream_ = stream;

        if (stream) {
          this.videoMuted = stream.userMuteVideo;
          this.audioMuted = stream.userMuteAudio;
        }

        var streamId = stream ? stream.getId() : null;
        this.streamId = streamId; // console.log('AgoraStreamComponent streamId', streamId);

        if (streamId) {
          var name = "stream-" + streamId;
          player.setAttribute('id', name);
          var self = this;

          if (stream.isPlaying()) {
            player.appendChild(stream.player.div);
          } else {
            this.shouldUseResumeGesture = false;
            stream.play(name, {
              fit: 'cover'
            }, function (error) {
              if (error && error.status !== 'aborted') {
                // The playback fails, probably due to browser policy. You can resume the playback by user gesture.
                self.shouldUseResumeGesture = true;
                self.pushChanges();
              }
            });
          }
        } else {
          player.removeAttribute('id');
        }
      }
    }
  }, {
    key: "vrContainer",
    set: function set(vrContainer) {
      if (this.vrContainer_ !== vrContainer) {
        this.vrContainer_ = vrContainer;

        if (vrContainer) {
          this.stream_.vrContainer = vrContainer;
          this.player.appendChild(vrContainer);
        } else if (this.stream_.vrContainer && this.stream_.vrContainer.parentNode) {
          this.stream_.vrContainer.parentNode.removeChild(this.stream_.vrContainer);
          this.stream_.vrContainer = null;
        }
      }
    }
  }, {
    key: "videoNode",
    get: function get() {
      var videoNode = this.videoNode_;

      if (!videoNode) {
        var player = rxcomp.getContext(this).node.querySelector('.agora-stream__player');
        videoNode = document.createElement('video');
        this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
        videoNode.addEventListener('loadedmetadata', this.onLoadedMetadata);
        player.appendChild(videoNode);
        this.videoNode_ = videoNode;
      }

      return videoNode;
    }
  }]);

  return AgoraStreamComponent;
}(rxcomp.Component);
AgoraStreamComponent.meta = {
  selector: '[agora-stream]',
  outputs: ['toggleSpy'],
  inputs: ['stream']
};function push_(event) {
  var dataLayer = window.dataLayer || [];
  dataLayer.push(event);
  console.log('GtmService.dataLayer', event);
}

var GtmService = /*#__PURE__*/function () {
  function GtmService() {}

  GtmService.push = function push(event) {
    return push_(event);
  };

  return GtmService;
}();var ModalEvent = function ModalEvent(data) {
  this.data = data;
};
var ModalResolveEvent = /*#__PURE__*/function (_ModalEvent) {
  _inheritsLoose(ModalResolveEvent, _ModalEvent);

  function ModalResolveEvent() {
    return _ModalEvent.apply(this, arguments) || this;
  }

  return ModalResolveEvent;
}(ModalEvent);
var ModalRejectEvent = /*#__PURE__*/function (_ModalEvent2) {
  _inheritsLoose(ModalRejectEvent, _ModalEvent2);

  function ModalRejectEvent() {
    return _ModalEvent2.apply(this, arguments) || this;
  }

  return ModalRejectEvent;
}(ModalEvent);

var ModalService = /*#__PURE__*/function () {
  function ModalService() {}

  ModalService.open$ = function open$(modal) {
    var _this = this;

    return this.getTemplate$(modal.src).pipe(operators.map(function (template) {
      return {
        node: _this.getNode(template),
        data: modal.data,
        modal: modal
      };
    }), operators.tap(function (node) {
      return _this.modal$.next(node);
    }), operators.switchMap(function (node) {
      return _this.events$;
    }));
  };

  ModalService.load$ = function load$(modal) {};

  ModalService.getTemplate$ = function getTemplate$(url) {
    return rxjs.from(fetch(url).then(function (response) {
      return response.text();
    }));
  };

  ModalService.getNode = function getNode(template) {
    var div = document.createElement('div');
    div.innerHTML = template;
    var node = div.firstElementChild;
    return node;
  };

  ModalService.reject = function reject(data) {
    this.modal$.next(null);
    this.events$.next(new ModalRejectEvent(data));
  };

  ModalService.resolve = function resolve(data) {
    this.modal$.next(null);
    this.events$.next(new ModalResolveEvent(data));
  };

  return ModalService;
}();
ModalService.modal$ = new rxjs.Subject();
ModalService.events$ = new rxjs.Subject();var ModalOutletComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ModalOutletComponent, _Component);

  function ModalOutletComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ModalOutletComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    this.modalNode = node.querySelector('.modal-outlet__modal');
    ModalService.modal$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (modal) {
      _this.modal = modal;
    });
  };

  _proto.reject = function reject(event) {
    ModalService.reject();
  };

  _createClass(ModalOutletComponent, [{
    key: "modal",
    get: function get() {
      return this.modal_;
    },
    set: function set(modal) {
      // console.log('ModalOutletComponent set modal', modal, this);
      var _getContext2 = rxcomp.getContext(this),
          module = _getContext2.module;

      if (this.modal_ && this.modal_.node) {
        module.remove(this.modal_.node, this);
        this.modalNode.removeChild(this.modal_.node);
      }

      if (modal && modal.node) {
        this.modal_ = modal;
        this.modalNode.appendChild(modal.node);
        var instances = module.compile(modal.node);
      }

      this.modal_ = modal;
      this.pushChanges();
    }
  }]);

  return ModalOutletComponent;
}(rxcomp.Component);
ModalOutletComponent.meta = {
  selector: '[modal-outlet]',
  template:
  /* html */
  "\n\t<div class=\"modal-outlet__container\" [class]=\"{ active: modal }\">\n\t\t<div class=\"modal-outlet__background\" (click)=\"reject($event)\"></div>\n\t\t<div class=\"modal-outlet__modal\"></div>\n\t</div>\n\t"
};var TryInARModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(TryInARModalComponent, _Component);

  function TryInARModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = TryInARModalComponent.prototype;

  _proto.onInit = function onInit() {
    _Component.prototype.onInit.call(this);

    var _getContext = rxcomp.getContext(this),
        parentInstance = _getContext.parentInstance,
        node = _getContext.node;

    if (parentInstance instanceof ModalOutletComponent) {
      var data = this.data = parentInstance.modal.data; // console.log('data', data);

      if (data && data.ar) {
        var url = TryInARModalComponent.getUrl(data);
        var qrcode = new QRious({
          element: node.querySelector('.qrcode'),
          value: url,
          size: 256
        });
      }
    }
  };

  _proto.close = function close() {
    ModalService.reject();
  };

  TryInARModalComponent.getUrl = function getUrl(data) {
    var url = environment.getAbsoluteUrl(environment.template.tryInAr, {
      viewId: data.id
    });
    console.log('TryInARModalComponent.getUrl', url);
    return url;
  };

  TryInARModalComponent.openInAR = function openInAR(data) {
    var url = this.getUrl(data);
    window.open(url, '_blank');
  };

  return TryInARModalComponent;
}(rxcomp.Component);
TryInARModalComponent.meta = {
  selector: '[try-in-ar-modal]'
};var ViewType = {
  WaitingRoom: {
    id: 1,
    name: 'waiting-room'
  },
  Panorama: {
    id: 2,
    name: 'panorama'
  },
  PanoramaGrid: {
    id: 3,
    name: 'panorama-grid'
  },
  Room3d: {
    id: 4,
    name: 'room-3d'
  },
  Model: {
    id: 5,
    name: 'model'
  }
};
var ViewItemType = {
  Nav: {
    id: 1,
    name: 'nav'
  },
  Plane: {
    id: 2,
    name: 'plane'
  },
  CurvedPlane: {
    id: 3,
    name: 'curved-plane'
  },
  Model: {
    id: 4,
    name: 'model'
  },
  Texture: {
    id: 5,
    name: 'texture'
  }
};
var View = /*#__PURE__*/function () {
  // 'liked'
  function View(options) {
    if (options) {
      Object.assign(this, options);
      this.updateIndices(options.items);
    }

    this.items = (this.items || []).map(function (item) {
      return mapViewItem(item);
    });

    if (this.tiles) {
      this.tiles = this.tiles.map(function (tile) {
        return mapViewTile(tile);
      });
    }

    this.originalItems = this.items.slice();
  }

  var _proto = View.prototype;

  _proto.updateIndices = function updateIndices(items) {
    if (items) {
      var nextAttendeeStreamIndex = 0;
      items.forEach(function (item, index) {
        item.index = index;

        if (item.asset && item.asset.file === 'nextAttendeeStream') {
          item.asset.index = nextAttendeeStreamIndex++;
        }
      });
    }
  };

  _createClass(View, [{
    key: "payload",
    get: function get() {
      var _this = this;

      var payload = {};
      Object.keys(this).forEach(function (key) {
        if (View.allowedProps.indexOf(key) !== -1) {
          switch (key) {
            case 'items':
              payload[key] = _this[key].map(function (item) {
                return mapViewItem(item).payload;
              });
              break;

            case 'tiles':
              payload[key] = _this[key].map(function (tile) {
                return mapViewTile(tile).payload;
              });
              break;

            default:
              payload[key] = _this[key];
          }
        }
      });
      return payload;
    }
  }, {
    key: "shortType",
    get: function get() {
      return this.type ? this.type.split('-').map(function (x) {
        return x.substring(0, 1).toUpperCase();
      }).join('') : '??';
    }
  }]);

  return View;
}();

_defineProperty(View, "allowedProps", ['id', 'type', 'name', 'hidden', 'likes', 'asset', 'items', 'orientation', 'zoom', 'ar', 'tiles', 'invertAxes', 'flipAxes']);

var PanoramaView = /*#__PURE__*/function (_View) {
  _inheritsLoose(PanoramaView, _View);

  function PanoramaView(options) {
    return _View.call(this, options) || this;
  }

  return PanoramaView;
}(View);
var PanoramaGridView = /*#__PURE__*/function (_View2) {
  _inheritsLoose(PanoramaGridView, _View2);

  PanoramaGridView.mapTiles = function mapTiles(tiles, flipAxes, invertAxes, folder) {
    if (tiles === void 0) {
      tiles = [];
    }

    if (flipAxes === void 0) {
      flipAxes = false;
    }

    if (invertAxes === void 0) {
      invertAxes = false;
    }

    if (folder === void 0) {
      folder = '';
    }

    var axes = flipAxes ? -1 : 1;
    return tiles.map(function (tile, i) {
      var indices = new THREE.Vector2();
      tile = typeof tile === 'string' ? {
        id: i + 1,
        asset: {
          folder: folder,
          file: tile
        },
        navs: []
      } : tile;
      tile.asset.file.replace(/_x([-|\d]+)_y([-|\d]+)/g, function (a, b, c) {
        if (invertAxes) {
          indices.y = parseInt(b);
          indices.x = parseInt(c) * axes;
        } else {
          indices.x = parseInt(b);
          indices.y = parseInt(c) * axes;
        }
      });
      return {
        id: tile.id,
        asset: tile.asset,
        navs: tile.navs || [],
        indices: indices
      };
    });
  };

  _createClass(PanoramaGridView, [{
    key: "index",
    set: function set(index) {
      if (this.index_ !== index) {
        this.index_ = index;
        this.tiles.forEach(function (tile, i) {
          return tile.selected = i === index;
        });
        this.updateCurrentItems(); // console.log('PanoramaGridView.index.set', index, this.items);

        this.index$.next(index);
      }
    },
    get: function get() {
      return this.index_;
    }
  }]);

  function PanoramaGridView(options) {
    var _this2;

    options.tiles = PanoramaGridView.mapTiles(options.tiles, options.flipAxes, options.invertAxes, options.asset ? options.asset.folder : '');
    _this2 = _View2.call(this, options) || this;
    /*
    if (!this.tiles.length) {
    	throw new Error('PanoramaGridView.constructor tile list is empty!');
    }
    */

    _this2.index_ = 0;
    _this2.index$ = new rxjs.Subject();

    _this2.tiles.forEach(function (tile, i) {
      return tile.selected = i === 0;
    });

    if (_this2.tiles.length) {
      _this2.items = _this2.originalItems.concat(_this2.tiles[0].navs);
      _this2.asset = _this2.tiles[0].asset;
    }

    return _this2;
  }

  var _proto2 = PanoramaGridView.prototype;

  _proto2.updateCurrentItems = function updateCurrentItems() {
    this.items = this.originalItems.concat(this.tiles[this.index_].navs);
  };

  _proto2.getTileIndex = function getTileIndex(x, y) {
    return this.tiles.reduce(function (p, c, i) {
      if (c.indices.x === x && c.indices.y === y) {
        return i;
      } else {
        return p;
      }
    }, -1);
  };

  _proto2.hasTile = function hasTile(x, y) {
    return this.getTileIndex(x, y) !== -1;
  };

  _proto2.getTile = function getTile(x, y) {
    var index = this.getTileIndex(x, y);

    if (index !== -1) {
      this.index = index;
      return this.tiles[index];
    }
  };

  return PanoramaGridView;
}(View);
var ModelView = /*#__PURE__*/function (_View3) {
  _inheritsLoose(ModelView, _View3);

  function ModelView(options) {
    return _View3.call(this, options) || this;
  }

  return ModelView;
}(View);
var ViewItem = /*#__PURE__*/function () {
  function ViewItem(options) {
    if (options) {
      Object.assign(this, options);
    }
  }

  _createClass(ViewItem, [{
    key: "payload",
    get: function get() {
      var _this3 = this;

      var payload = {};
      Object.keys(this).forEach(function (key) {
        if (ViewItem.allowedProps.indexOf(key) !== -1) {
          payload[key] = _this3[key];
        }
      });

      if (payload.link && (!payload.link.title || !payload.link.href)) {
        delete payload.link;
      }

      return payload;
    }
  }, {
    key: "hasPanel",
    get: function get() {
      return this.type.name === ViewItemType.Nav.name && (this.title && this.title !== '' || this.abstract && this.abstract !== '' || this.asset || this.link);
    }
  }]);

  return ViewItem;
}();

_defineProperty(ViewItem, "allowedProps", ['id', 'type', 'title', 'abstract', 'asset', 'link', 'viewId', 'keepOrientation', 'position', 'rotation', 'scale', 'radius', 'height', 'arc']);

var NavViewItem = /*#__PURE__*/function (_ViewItem) {
  _inheritsLoose(NavViewItem, _ViewItem);

  function NavViewItem() {
    return _ViewItem.apply(this, arguments) || this;
  }

  return NavViewItem;
}(ViewItem);
var ViewTile = /*#__PURE__*/function () {
  function ViewTile(options) {
    if (options) {
      Object.assign(this, options);
    }

    this.navs = (this.navs || []).map(function (nav) {
      return mapViewItem(nav);
    });
    this.originalItems = this.navs.slice();
  }

  _createClass(ViewTile, [{
    key: "payload",
    get: function get() {
      var _this4 = this;

      var payload = {};
      Object.keys(this).forEach(function (key) {
        if (ViewTile.allowedProps.indexOf(key) !== -1) {
          switch (key) {
            case 'navs':
              payload[key] = _this4[key].map(function (nav) {
                return mapViewItem(nav).payload;
              });
              break;

            default:
              payload[key] = _this4[key];
          }
        }
      });
      return payload;
    }
  }]);

  return ViewTile;
}();

_defineProperty(ViewTile, "allowedProps", ['id', 'asset', 'navs']);

function mapView(view) {
  switch (view.type.name) {
    case ViewType.Panorama.name:
      view = new PanoramaView(view);
      break;

    case ViewType.PanoramaGrid.name:
      view = new PanoramaGridView(view);
      break;

    case ViewType.Model.name:
      view = new ModelView(view);
      break;

    default:
      view = new View(view);
  }

  return view;
}
function mapViewItem(item) {
  switch (item.type.name) {
    case ViewItemType.Nav.name:
      item = new NavViewItem(item);
      break;

    default:
      item = new ViewItem(item);
  }

  return item;
}
function mapViewTile(tile) {
  return new ViewTile(tile);
}var ViewService = /*#__PURE__*/function () {
  function ViewService() {}

  ViewService.data$ = function data$() {
    if (!this.data$_) {
      var dataUrl = environment.flags.production ? '/api/view' : './api/data.json';
      this.data$_ = HttpService.get$(dataUrl).pipe(operators.map(function (data) {
        data.views = data.views.map(function (view) {
          return mapView(view);
        });
        return data;
      }), // tap(data => console.log('ViewService.data$', data)),
      operators.shareReplay(1));
    }

    return this.data$_;
  };

  ViewService.view$ = function view$(data, editor) {
    var _this = this;

    var views = editor ? data.views : data.views.filter(function (x) {
      return x.type.name !== 'waiting-room';
    });
    var initialViewId = LocationService.has('viewId') ? parseInt(LocationService.get('viewId')) : views.length ? views[0].id : null;
    this.viewId$_.next(initialViewId);
    return this.viewId$_.pipe(operators.distinctUntilChanged(), operators.map(function (viewId) {
      var view = data.views.find(function (view) {
        return view.id === viewId;
      });
      return view || _this.getWaitingRoom(data);
    }));
  };

  ViewService.hostedView$ = function hostedView$(data) {
    var waitingRoom = this.getWaitingRoom(data);
    return rxjs.combineLatest([this.view$(data), this.hosted$()]).pipe(operators.map(function (datas) {
      var view = datas[0];
      var hosted = datas[1];
      return hosted ? view : waitingRoom;
    }), operators.tap(function (view) {
      if (view.id !== waitingRoom.id) {
        LocationService.set('viewId', view.id);
      }
    }));
  };

  ViewService.editorView$ = function editorView$(data) {
    var waitingRoom = this.getWaitingRoom(data);
    return this.view$(data, true).pipe(operators.tap(function (view) {
      if (view.id !== waitingRoom.id) {
        LocationService.set('viewId', view.id);
      }
    }));
  };

  ViewService.hosted$ = function hosted$() {
    return StateService.state$.pipe(operators.map(function (state) {
      return state.hosted;
    }), operators.distinctUntilChanged());
  };

  ViewService.viewById$ = function viewById$(viewId) {
    return this.data$().pipe(operators.map(function (data) {
      return data.views.find(function (x) {
        return x.id === viewId;
      });
    }));
  };

  ViewService.viewLike$ = function viewLike$(view) {
    if (!view.liked) {
      view.liked = true;

      if (environment.flags.production) {
        return HttpService.get$("/api/view/" + view.id + "/like");
      } else {
        view.likes = view.likes || 0;
        view.likes++;
        return rxjs.of(view);
      }
    } else {
      return rxjs.of(null);
    }
  };

  ViewService.setViewLike$ = function setViewLike$(message) {
    return this.viewById$(message.viewId).pipe(operators.tap(function (view) {
      if (view) {
        view.likes = message.likes;
      }
    }));
  };

  ViewService.getWaitingRoom = function getWaitingRoom(data) {
    return data && data.views.find(function (x) {
      return x.type.name === 'waiting-room';
    }) || {
      id: 'waiting-room',
      type: {
        id: 1,
        name: 'waiting-room'
      },
      name: 'Waiting Room',
      likes: 0,
      liked: false,
      asset: {
        type: {
          id: 1,
          name: 'image'
        },
        folder: '/textures/waiting-room/',
        file: 'waiting-room.jpg'
      },
      items: [],
      orientation: {
        latitude: 0,
        longitude: 0
      }
    };
  };

  _createClass(ViewService, null, [{
    key: "viewId",
    set: function set(viewId) {
      this.viewId$_.next(viewId);
    },
    get: function get() {
      return this.viewId$_.getValue();
    }
  }]);

  return ViewService;
}();

_defineProperty(ViewService, "viewId$_", new rxjs.BehaviorSubject(null));var XRStatus = {
  Waiting: 'waiting',
  Enabled: 'enabled',
  Ended: 'ended',
  Started: 'started',
  Disabled: 'disabled',
  NeedsHttps: 'needs-https',
  Unavailable: 'unavailable'
};

var VRService = /*#__PURE__*/function () {
  VRService.getService = function getService() {
    if (!this.service_) {
      this.service_ = new VRService();
    }

    return this.service_;
  };

  _createClass(VRService, [{
    key: "status",
    get: function get() {
      return this.status$.getValue();
    }
  }, {
    key: "state",
    get: function get() {
      return this.state$.getValue();
    }
  }]);

  function VRService() {
    var _this = this;

    if (VRService.service_) {
      throw 'VRService is a singleton class!';
    }

    var state = this.state_ = {
      camera: {
        position: new THREE.Vector3(),
        quaternion: new THREE.Quaternion(),
        scale: new THREE.Vector3(),
        array: new Array(3 + 4 + 3).fill(0)
      }
    };
    this.onSessionStarted = this.onSessionStarted.bind(this);
    this.onSessionEnded = this.onSessionEnded.bind(this);
    this.status$ = new rxjs.BehaviorSubject(XRStatus.Waiting);
    this.session$ = new rxjs.Subject();
    this.state$ = new rxjs.BehaviorSubject(state);
    this.currentSession = null;

    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-vr').then(function (supported) {
        if (supported) {
          _this.status$.next(XRStatus.Enabled);
        } else {
          _this.status$.next(XRStatus.Disabled);
        }
      });
    } else {
      if (window.isSecureContext === false) {
        this.status$.next(XRStatus.NeedsHttps);
      } else {
        this.status$.next(XRStatus.Unavailable); // 'https://immersiveweb.dev/';
      }
    }
  }

  var _proto = VRService.prototype;

  _proto.onSessionStarted = function onSessionStarted(session) {
    session.addEventListener('end', this.onSessionEnded);
    this.currentSession = session;
    this.session$.next(session);
    this.status$.next(XRStatus.Started);
  };

  _proto.onSessionEnded = function onSessionEnded()
  /*event*/
  {
    this.currentSession.removeEventListener('end', this.onSessionEnded);
    this.currentSession = null;
    this.session$.next(null);
    this.status$.next(XRStatus.Ended);
  };

  _proto.toggleVR = function toggleVR(event) {
    if (this.currentSession === null) {
      // WebXR's requestReferenceSpace only works if the corresponding feature
      // was requested at session creation time. For simplicity, just ask for
      // the interesting ones as optional features, but be aware that the
      // requestReferenceSpace call will fail if it turns out to be unavailable.
      // ('local' is always available for immersive sessions and doesn't need to
      // be requested separately.)
      var sessionInit = {
        optionalFeatures: ['local-floor', 'bounded-floor']
      };
      navigator.xr.requestSession('immersive-vr', sessionInit).then(this.onSessionStarted);
    } else {
      this.currentSession.end();
    }
  };

  _proto.isDisabled = function isDisabled() {
    var status = this.status$.getValue();

    switch (status) {
      case XRStatus.Waiting:
      case XRStatus.Disabled:
      case XRStatus.NeedsHttps:
      case XRStatus.Unavailable:
        return true;

      default:
        return false;
    }
  };

  _proto.getLabel = function getLabel() {
    var label;
    var status = this.status$.getValue();

    switch (status) {
      case XRStatus.Waiting:
        label = 'Waiting VR';
        break;

      case XRStatus.Enabled:
      case XRStatus.Ended:
        label = 'Enter VR';
        break;

      case XRStatus.Started:
        label = 'Exit VR';
        break;

      case XRStatus.Disabled:
        label = 'VR Disabled';
        break;

      case XRStatus.NeedsHttps:
        label = 'VR Needs Https';
        break;

      case XRStatus.Unavailable:
        label = 'VR Unavailable';
        break;
    }

    return label;
  };

  _proto.updateState = function updateState(world) {
    if (this.status === XRStatus.Started) {
      var renderer = world.renderer,
          scene = world.scene,
          camera = world.camera,
          state = this.state_;
      camera.matrixWorld.decompose(state.camera.position, state.camera.quaternion, state.camera.scale);
      state.camera.array[0] = state.camera.position.x;
      state.camera.array[1] = state.camera.position.y;
      state.camera.array[2] = state.camera.position.z;
      state.camera.array[3] = state.camera.quaternion.x;
      state.camera.array[4] = state.camera.quaternion.y;
      state.camera.array[5] = state.camera.quaternion.z;
      state.camera.array[6] = state.camera.quaternion.w;
      state.camera.array[7] = state.camera.scale.x;
      state.camera.array[8] = state.camera.scale.y;
      state.camera.array[9] = state.camera.scale.z;
      this.state$.next(state);
    }
  };

  return VRService;
}();var AgoraComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AgoraComponent, _Component);

  function AgoraComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AgoraComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    node.classList.remove('hidden');
    this.env = environment;
    this.platform = DeviceService.platform;
    this.state = {};
    this.hosted = null;
    this.data = null;
    this.views = null;
    this.view = null;
    this.form = null;
    this.local = null;
    this.remotes = [];
    var vrService = this.vrService = VRService.getService();
    vrService.status$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (status) {
      return _this.pushChanges();
    });
    this.resolveUser();
  };

  _proto.getLinkRole = function getLinkRole() {
    var linkRole = null;
    var match = (LocationService.get('link') || '').match(/\d{9}-(\d{4})-\d{13}/);

    if (match) {
      var index = parseInt(match[1]);
      linkRole = Object.keys(RoleType).reduce(function (p, c, i) {
        return i === index ? RoleType[c] : p;
      }, null);
    }

    return linkRole;
  };

  _proto.resolveUser = function resolveUser() {
    var _this2 = this;

    UserService.me$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (user) {
      var linkRole = _this2.getLinkRole();

      if (user && (!linkRole || linkRole === user.type)) {
        _this2.initWithUser(user);
      } else if (linkRole === RoleType.Publisher || linkRole === RoleType.Attendee) {
        window.location.href = environment.url.access;
      } else {
        _this2.initWithUser({
          type: linkRole
        });
      }
    });
  };

  _proto.initWithUser = function initWithUser(user) {
    var _this3 = this;

    console.log('AgoraComponent.initWithUser', user);
    var userName = user.firstName && user.lastName ? user.firstName + " " + user.lastName : null;
    var role = LocationService.get('role') || user.type;
    var name = LocationService.get('name') || userName;
    var link = LocationService.get('link') || null;
    var hosted = role === RoleType.Publisher ? true : false;
    var live = DEBUG || role === RoleType.SelfService ? false : true;
    var state = {
      user: user,
      role: role,
      name: name,
      link: link,
      channelName: environment.channelName,
      uid: null,
      status: 'idle',
      connecting: false,
      connected: false,
      locked: false,
      control: false,
      spyed: false,
      hosted: hosted,
      live: live,
      cameraMuted: false,
      audioMuted: false
    };
    StateService.state = state;
    StateService.state$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (state) {
      _this3.state = state;
      _this3.hosted = state.hosted;

      _this3.pushChanges(); // console.log(state);

    });
    this.loadView();
  };

  _proto.loadView = function loadView() {
    var _this4 = this;

    this.initAgora();
    ViewService.data$().pipe(operators.switchMap(function (data) {
      _this4.data = data;
      _this4.views = data.views.filter(function (x) {
        return x.type.name !== 'waiting-room';
      });
      return ViewService.hostedView$(data);
    }), operators.takeUntil(this.unsubscribe$),
    /*
    tap(view => {
    	this.view = null;
    	this.pushChanges();
    }),
    delay(1),
    */
    operators.tap(function (view) {
      if (_this4.agora) {
        _this4.agora.navToView(view.id);
      }

      _this4.view = view;

      _this4.pushChanges();
    })).subscribe(function (view) {
      console.log('AgoraComponent.hostedView$', view);
    });
  };

  _proto.initAgora = function initAgora() {
    var _this5 = this;

    var agora = null;

    if (DEBUG || this.state.role === RoleType.SelfService) {
      StateService.patchState({
        status: AgoraStatus.Connected,
        hosted: true
      });
    } else {
      agora = this.agora = AgoraService.getSingleton();
      var status;

      if (!this.state.link) {
        status = AgoraStatus.Link;
      } else if (!this.state.name) {
        status = AgoraStatus.Name;
      } else if (this.state.role !== RoleType.Viewer) {
        status = AgoraStatus.Device;
      } else {
        status = AgoraStatus.ShouldConnect;
      }

      StateService.patchState({
        status: status
      });
    }

    StreamService.local$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (local) {
      // console.log('AgoraComponent.local', local);
      _this5.local = local;

      _this5.pushChanges();
    });
    StreamService.orderedRemotes$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (remotes) {
      // console.log('AgoraComponent.remotes', remotes);
      _this5.remotes = remotes;

      _this5.pushChanges();
    });
    MessageService.out$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (message) {
      // console.log('AgoraComponent.message', message);
      switch (message.type) {
        case MessageType.RequestPeerInfo:
          message.type = MessageType.RequestPeerInfoResult;
          message.clientInfo = {
            role: StateService.state.role,
            name: StateService.state.name,
            uid: StateService.state.uid,
            control: StateService.state.control
          };
          MessageService.sendBack(message);
          break;

        case MessageType.RequestControl:
          console.log('AgoraComponent', 'MessageType.RequestControlAccepted');
          message.type = MessageType.RequestControlAccepted;
          MessageService.sendBack(message);
          StateService.patchState({
            locked: true
          });

          if (_this5.agora) {
            _this5.agora.sendControlRemoteRequestInfo(message.clientId);
          } // !!! control request permission not required
          // this.onRemoteControlRequest(message);


          break;
        // !!! moved to WorldComponent

        /*
        case MessageType.RequestInfo:
        	if (StateService.state.role !== RoleType.Publisher) {
        		StateService.patchState({ spyed: true });
        	}
        	break;
        case MessageType.RequestInfoResult:
        	console.log('AgoraComponent.RequestInfoResult', ViewService.viewId, message.viewId);
        	ViewService.viewId = message.viewId;
        	// console.log('AgoraComponent.RequestInfoResult', message.viewId);
        	break;
        */

        case MessageType.NavToView:
          if (message.viewId) {
            if (ViewService.viewId !== message.viewId) {
              ViewService.viewId = message.viewId;

              if (message.gridIndex !== undefined) {
                var view = _this5.data.views.find(function (x) {
                  return x.id === message.viewId;
                });

                if (view instanceof PanoramaGridView) {
                  view.index = message.gridIndex;
                }
              } // console.log('AgoraComponent.NavToView', message.viewId);

            }
          }

          break;

        case MessageType.AddLike:
          ViewService.setViewLike$(message).pipe(operators.first()).subscribe(function (view) {
            return _this5.showLove(view);
          });
          break;
      }
    });
    MessageService.in$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (message) {
      if (agora) {
        agora.sendMessage(message);
      }
    });

    if (agora && StateService.state.status === AgoraStatus.ShouldConnect) {
      this.connect();
    }
  };

  _proto.onLink = function onLink(link) {
    if (StateService.state.name) {
      if (StateService.state.role === RoleType.Viewer) {
        this.connect();
      } else {
        StateService.patchState({
          link: link,
          status: AgoraStatus.Device
        });
      }
    } else {
      StateService.patchState({
        link: link,
        status: AgoraStatus.Name
      });
    }
  };

  _proto.onName = function onName(name) {
    if (StateService.state.role === RoleType.Viewer) {
      this.connect();
    } else {
      StateService.patchState({
        name: name,
        status: AgoraStatus.Device
      });
    }
  };

  _proto.onEnter = function onEnter(preferences) {
    this.connect(preferences);
  };

  _proto.connect = function connect(preferences) {
    this.agora.connect$(preferences).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(); // console.log('AgoraComponent.connect', this.state.role);

    if (this.state.role !== RoleType.SelfService) {
      var sharedMeetingId = this.state.link.replace(/-\d+-/, '-');
      var log = {
        meetingId: this.state.link,
        sharedMeetingId: sharedMeetingId,
        fullName: this.state.name,
        userType: this.state.role
      }; // console.log('AgoraComponent.connect', log);

      UserService.log$(log).pipe(operators.first()).subscribe();
      GtmService.push({
        action: 'b-here-meeting',
        meetingId: this.state.link,
        sharedMeetingId: sharedMeetingId,
        userType: this.state.role
      });
    }
  };

  _proto.disconnect = function disconnect() {
    if (this.agora) {
      this.agora.leaveChannel().then(function () {
        // StateService.patchState({ status: AgoraStatus.Disconnected, connected: false });
        window.location.href = window.location.href;
      }, console.log);
    } else {
      this.patchState({
        connecting: false,
        connected: false
      });
    }
  };

  _proto.onNavTo = function onNavTo(viewId) {
    ViewService.viewId = viewId;
  }
  /*
  onRemoteControlRequest(message) {
  	ModalService.open$({ src: environment.template.modal.controlRequest, data: null }).pipe(
  		takeUntil(this.unsubscribe$)
  	).subscribe(event => {
  		if (!DEBUG) {
  			if (event instanceof ModalResolveEvent) {
  				message.type = MessageType.RequestControlAccepted;
  				this.state.locked = true;
  			} else {
  				message.type = MessageType.RequestControlRejected;
  				this.state.locked = false;
  			}
  			MessageService.sendBack(message);
  			this.pushChanges();
  		} else {
  			if (event instanceof ModalResolveEvent) {
  				this.patchState({ control: true, spying: false });
  			} else {
  				this.patchState({ control: false, spying: false });
  			}
  		}
  	});
  }
  */
  // !!! why locally?
  ;

  _proto.patchState = function patchState(state) {
    this.state = Object.assign({}, this.state, state);
    this.pushChanges(); // console.log(this.state);
  };

  _proto.toggleCamera = function toggleCamera() {
    if (this.agora) {
      this.agora.toggleCamera();
    } else {
      this.patchState({
        cameraMuted: !this.state.cameraMuted
      });
    }
  };

  _proto.toggleAudio = function toggleAudio() {
    if (this.agora) {
      this.agora.toggleAudio();
    } else {
      this.patchState({
        audioMuted: !this.state.audioMuted
      });
    }
  };

  _proto.onToggleVolume = function onToggleVolume() {
    var volumeMuted = !this.state.volumeMuted;
    StateService.patchState({
      volumeMuted: volumeMuted
    });
  };

  _proto.onToggleControl = function onToggleControl() {
    if (this.agora) {
      this.agora.toggleControl();
    } else if (this.state.control) {
      this.patchState({
        control: false
      });
    }
    /* else {
    this.onRemoteControlRequest({});
    }
    */

  };

  _proto.onToggleSpy = function onToggleSpy(remoteId) {
    if (this.agora) {
      this.agora.toggleSpy(remoteId);
    } else {
      this.patchState({
        spying: !this.state.spying,
        control: false
      });
    }
  };

  _proto.addLike = function addLike() {
    var _this6 = this;

    ViewService.viewLike$(this.view).pipe(operators.first()).subscribe(function (view) {
      if (view) {
        _this6.view.liked = true; // view.liked;

        _this6.showLove(view); // this.view.likes = view.likes;
        // this.pushChanges();


        MessageService.send({
          type: MessageType.AddLike,
          viewId: _this6.view.id,
          likes: _this6.view.likes
        });
      }
    });
  };

  _proto.showLove = function showLove(view) {
    var _this7 = this;

    if (view && this.view.id === view.id) {
      var skipTimeout = this.view.showLove;
      this.view.likes = view.likes;
      this.view.showLove = true;
      this.pushChanges();

      if (!skipTimeout) {
        setTimeout(function () {
          _this7.view.showLove = false;

          _this7.pushChanges();
        }, 3100);
      }
    }
  };

  _proto.tryInAr = function tryInAr() {
    if (this.platform === DevicePlatform.IOS || this.platform === DevicePlatform.Android) {
      TryInARModalComponent.openInAR(this.view);
    } else {
      ModalService.open$({
        src: environment.template.modal.tryInAr,
        data: this.view
      }).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {// this.pushChanges();
      });
    }
  }
  /*
  onPrevent(event) {
  	event.preventDefault();
  	event.stopImmediatePropagation();
  }
  */
  ;

  return AgoraComponent;
}(rxcomp.Component);
AgoraComponent.meta = {
  selector: '[agora-component]'
};var AppComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AppComponent, _Component);

  function AppComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AppComponent.prototype;

  _proto.onInit = function onInit() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    node.classList.remove('hidden');
  };

  return AppComponent;
}(rxcomp.Component);
AppComponent.meta = {
  selector: '[app-component]'
};var EXT_IMAGE = ['jpeg', 'jpg', 'png'];
var EXT_VIDEO = ['mp4', 'webm'];
var EXT_MODEL = ['fbx', 'gltf', 'glb', 'usdz'];
var AssetType = {
  Image: {
    id: 1,
    name: 'image'
  },
  // jpg, png, ...
  Video: {
    id: 2,
    name: 'video'
  },
  // mp4, webm, ...
  Model: {
    id: 3,
    name: 'model'
  },
  // fbx, gltf, glb, usdz ...
  PublisherStream: {
    id: 4,
    name: 'publisher-stream'
  },
  // valore fisso di file a ‘publisherStream’ e folder string.empty
  NextAttendeeStream: {
    id: 5,
    name: 'next-attendee-stream'
  } // valore fisso di file a ‘nextAttendeeStream’ e folder string.empty

};
var AssetGroupType = {
  ImageOrVideo: {
    id: 1,
    name: 'Image or Video',
    ids: [1, 2]
  },
  // Model: { id: 2, name: 'Model 3D', ids: [3] },
  Publisher: {
    id: 3,
    name: 'Publisher',
    ids: [4]
  },
  Attendee: {
    id: 4,
    name: 'Attendee',
    ids: [5]
  }
};
function assetGroupTypeFromItem(item) {
  var key;

  if (item && item.asset) {
    key = Object.keys(AssetGroupType).find(function (key) {
      // console.log(key, AssetGroupType[key].ids, item.asset.type.id);
      return AssetGroupType[key].ids.indexOf(item.asset.type.id) !== -1;
    });
  }

  return AssetGroupType[key || 'ImageOrVideo'];
}
function assetPayloadFromGroupTypeId(groupTypeId) {
  var type = groupTypeId === AssetGroupType.Publisher.id ? AssetType.PublisherStream : AssetType.NextAttendeeStream;
  var file = groupTypeId === AssetGroupType.Publisher.id ? 'publisherStream' : 'nextAttendeeStream';
  var asset = {
    type: type,
    folder: '',
    file: file
  };
  return new Asset(asset);
}
function assetTypeFromPath(path) {
  var extension = path.split('.').pop().toLowerCase();

  if (EXT_IMAGE.indexOf(extension) !== -1) {
    return AssetType.Image;
  } else if (EXT_VIDEO.indexOf(extension) !== -1) {
    return AssetType.Video;
  } else if (EXT_MODEL.indexOf(extension) !== -1) {
    return AssetType.Model;
  }
}
var Asset = /*#__PURE__*/function () {
  function Asset(options) {
    if (options) {
      Object.assign(this, options);
    }
  }

  Asset.fromUrl = function fromUrl(url) {
    var segments = url.split('/');
    var file = segments.pop();
    var folder = segments.join('/') + '/';
    var type = assetTypeFromPath(file);
    return new Asset({
      type: type,
      folder: folder,
      file: file
    });
  };

  _createClass(Asset, [{
    key: "payload",
    get: function get() {
      var _this = this;

      var payload = {};
      Object.keys(this).forEach(function (key) {
        if (Asset.allowedProps.indexOf(key) !== -1) {
          payload[key] = _this[key];
        }
      });
      return payload;
    }
  }]);

  return Asset;
}();

_defineProperty(Asset, "allowedProps", ['id', 'type', 'folder', 'file', 'linkedPlayId', 'chromaKeyColor']);

function mapAsset(asset) {
  switch (asset.type) {
    default:
      asset = new Asset(asset);
  }

  return asset;
}var MIME_IMAGE = ['bmp', 'gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'tif', 'tiff', 'webp'];
var MIME_VIDEO = ['mp4', 'avi', 'mpeg', 'ogv', 'ts', 'webm', '3gp', '3g2'];
var MIME_MODEL = ['fbx', 'gltf', 'glb', 'obj', 'usdz'];
var MIME_STREAM = ['publisherStream', 'nextAttendeeStream'];
function isImage(path) {
  return new RegExp("/.(" + MIME_IMAGE.join('|') + ")$/i").test(path);
}
function isVideo(path) {
  return new RegExp("/.(" + MIME_VIDEO.join('|') + ")$/i").test(path);
}
function isModel(path) {
  return new RegExp("/.(" + MIME_MODEL.join('|') + ")$/i").test(path);
}
function isStream(path) {
  return MIME_STREAM.indexOf(path) !== -1;
}

var AssetPipe = /*#__PURE__*/function (_Pipe) {
  _inheritsLoose(AssetPipe, _Pipe);

  function AssetPipe() {
    return _Pipe.apply(this, arguments) || this;
  }

  AssetPipe.transform = function transform(asset, type) {
    if (type === void 0) {
      type = null;
    }

    if (type != null) {
      // keep loose equality
      asset = asset.type.name === type ? asset : null;
    }

    if (asset) {
      // console.log(asset.type.name, AssetType.Image.name);
      switch (asset.type.name) {
        case AssetType.Image.name:
        case AssetType.Video.name:
          asset = asset.folder + asset.file;
          asset = environment.getPath(asset);
          break;

        case AssetType.Model.name:
          asset = asset.folder + asset.file;
          asset = environment.getPath(asset);
          break;

        case AssetType.PublisherStream.name:
        case AssetType.NextAttendeeStream.name:
          asset = environment.getPath(asset.file);
          break;

        default:
          if (isImage(asset.file) || isVideo(asset.file)) {
            asset = asset.folder + asset.file;
            asset = environment.getPath(asset);
          } else if (isModel(asset.file)) {
            asset = asset.folder + asset.file;
            asset = environment.getPath(asset);
          } else if (isStream(asset.file)) {
            asset = asset.file;
          }

      }

      asset = asset;
    } else {
      asset = null;
    } // console.log('AssetPipe.transform', asset);


    return asset;
  };

  return AssetPipe;
}(rxcomp.Pipe);
AssetPipe.meta = {
  name: 'asset'
};var ControlRequestModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ControlRequestModalComponent, _Component);

  function ControlRequestModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ControlRequestModalComponent.prototype;

  _proto.onInit = function onInit() {
    _Component.prototype.onInit.call(this);

    var _getContext = rxcomp.getContext(this),
        parentInstance = _getContext.parentInstance;

    if (parentInstance instanceof ModalOutletComponent) {
      this.data = parentInstance.modal.data;
    }
  };

  _proto.onAccept = function onAccept(user) {
    ModalService.resolve();
  };

  _proto.onReject = function onReject(user) {
    ModalService.reject();
  }
  /*
  onDestroy() {
  	// console.log('ControlRequestModalComponent.onDestroy');
  }
  */
  ;

  _proto.close = function close() {
    ModalService.reject();
  };

  return ControlRequestModalComponent;
}(rxcomp.Component);
ControlRequestModalComponent.meta = {
  selector: '[control-request-modal]'
};var DropDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(DropDirective, _Directive);

  function DropDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = DropDirective.prototype;

  _proto.onInit = function onInit() {
    var _getContext = rxcomp.getContext(this),
        module = _getContext.module,
        node = _getContext.node,
        parentInstance = _getContext.parentInstance,
        selector = _getContext.selector;

    var event = 'drop';
    var event$ = rxjs.fromEvent(node, event).pipe(operators.shareReplay(1));
    var expression = node.getAttribute("(" + event + ")");

    if (expression) {
      var outputFunction = module.makeFunction(expression, ['$event']);
      event$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
        module.resolve(outputFunction, parentInstance, event);
      });
      rxjs.fromEvent(node, 'dragover').pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
        return event.preventDefault();
      });
    } else {
      parentInstance[event + "$"] = event$;
    } // console.log('DropDirective.onInit', 'selector', selector, 'event', event);

  };

  return DropDirective;
}(rxcomp.Directive);
DropDirective.meta = {
  selector: "[(drop)]"
};var DROPDOWN_ID = 1000000;

var DropdownDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(DropdownDirective, _Directive);

  function DropdownDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = DropdownDirective.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var trigger = node.getAttribute('dropdown-trigger');
    this.trigger = trigger ? node.querySelector(trigger) : node;
    this.opened = null;
    this.onClick = this.onClick.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.addListeners();
    DropdownDirective.dropdown$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (id) {
      // console.log('DropdownDirective', id, this['dropdown-item']);
      if (_this.id === id) {
        node.classList.add('dropped');
      } else {
        node.classList.remove('dropped');
      }
    });
  };

  _proto.onClick = function onClick(event) {
    var _getContext2 = rxcomp.getContext(this),
        node = _getContext2.node;

    if (this.opened === null) {
      this.openDropdown();
    } else {
      var dropdownItemNode = node.querySelector('[dropdown-item]'); // console.log('dropdownItemNode', dropdownItemNode);

      if (!dropdownItemNode) {
        // if (this.trigger !== node) {
        this.closeDropdown();
      }
    }
  };

  _proto.onDocumentClick = function onDocumentClick(event) {
    var _getContext3 = rxcomp.getContext(this),
        node = _getContext3.node;

    var clickedInside = node === event.target || node.contains(event.target);

    if (!clickedInside) {
      this.closeDropdown();
    }
  };

  _proto.openDropdown = function openDropdown() {
    if (this.opened === null) {
      this.opened = true;
      this.addDocumentListeners();
      DropdownDirective.dropdown$.next(this.id);
      this.dropped.next(this.id);
    }
  };

  _proto.closeDropdown = function closeDropdown() {
    if (this.opened !== null) {
      this.removeDocumentListeners();
      this.opened = null;

      if (DropdownDirective.dropdown$.getValue() === this.id) {
        DropdownDirective.dropdown$.next(null);
        this.dropped.next(null);
      }
    }
  };

  _proto.addListeners = function addListeners() {
    this.trigger.addEventListener('click', this.onClick);
  };

  _proto.addDocumentListeners = function addDocumentListeners() {
    document.addEventListener('click', this.onDocumentClick);
  };

  _proto.removeListeners = function removeListeners() {
    this.trigger.removeEventListener('click', this.onClick);
  };

  _proto.removeDocumentListeners = function removeDocumentListeners() {
    document.removeEventListener('click', this.onDocumentClick);
  };

  _proto.onDestroy = function onDestroy() {
    this.removeListeners();
    this.removeDocumentListeners();
  };

  DropdownDirective.nextId = function nextId() {
    return DROPDOWN_ID++;
  };

  _createClass(DropdownDirective, [{
    key: "id",
    get: function get() {
      return this.dropdown || this.id_ || (this.id_ = DropdownDirective.nextId());
    }
  }]);

  return DropdownDirective;
}(rxcomp.Directive);
DropdownDirective.meta = {
  selector: '[dropdown]',
  inputs: ['dropdown', 'dropdown-trigger'],
  outputs: ['dropped']
};
DropdownDirective.dropdown$ = new rxjs.BehaviorSubject(null);var DropdownItemDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(DropdownItemDirective, _Directive);

  function DropdownItemDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = DropdownItemDirective.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    node.classList.add('dropdown-item');
    DropdownDirective.dropdown$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (id) {
      // console.log('DropdownItemDirective', id, this['dropdown-item']);
      if (_this.id === id) {
        node.classList.add('dropped');
      } else {
        node.classList.remove('dropped');
      }
    });
  };

  _createClass(DropdownItemDirective, [{
    key: "id",
    get: function get() {
      return this['dropdown-item'];
    }
  }]);

  return DropdownItemDirective;
}(rxcomp.Directive);
DropdownItemDirective.meta = {
  selector: '[dropdown-item], [[dropdown-item]]',
  inputs: ['dropdown-item']
};var ToastEvent = function ToastEvent(toast) {
  this.toast = toast;
};
var ToastResolveEvent = /*#__PURE__*/function (_ToastEvent) {
  _inheritsLoose(ToastResolveEvent, _ToastEvent);

  function ToastResolveEvent() {
    return _ToastEvent.apply(this, arguments) || this;
  }

  return ToastResolveEvent;
}(ToastEvent);

var ToastService = /*#__PURE__*/function () {
  function ToastService() {}

  ToastService.open$ = function open$(toast) {
    var _this = this;

    toast.id = new Date().getTime();
    this.toast$.next(toast);
    setTimeout(function () {
      _this.resolve(toast);
    }, toast.duration || 3000);
    return this.events$;
    /*
    return of(toast).pipe(
    	tap(toast => this.toast$.next(toast)),
    	switchMap(toast => this.events$),
    );
    */
  };

  ToastService.resolve = function resolve(toast) {
    this.toast$.next(null);
    this.events$.next(new ToastResolveEvent(toast));
  };

  return ToastService;
}();
ToastService.toast$ = new rxjs.Subject();
ToastService.events$ = new rxjs.Subject();var ToastOutletComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ToastOutletComponent, _Component);

  function ToastOutletComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ToastOutletComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.toast = null;
    this.lastMessage = '';
    ToastService.toast$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (toast) {
      if (toast) {
        _this.lastMessage = toast.message;
      }

      _this.toast = toast;

      _this.pushChanges();
    }); // console.log('ToastOutletComponent.onInit');
  };

  return ToastOutletComponent;
}(rxcomp.Component);
ToastOutletComponent.meta = {
  selector: '[toast-outlet]',
  template:
  /* html */
  "\n\t<div class=\"toast-outlet__container\" [class]=\"{ active: toast }\">\n\t\t<div class=\"toast-outlet__toast\" [innerHTML]=\"lastMessage\"></div>\n\t</div>\n\t"
};var AsideComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AsideComponent, _Component);

  function AsideComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AsideComponent.prototype;

  _proto.onInit = function onInit() {
    this.mode = 1;
    this.viewTypes = Object.keys(ViewType).map(function (key) {
      var type = ViewType[key];
      return {
        type: type,
        name: LabelPipe.getKeys('editor', type.name),
        disabled: environment.editor.disabledViewTypes.indexOf(type.name) !== -1
      };
    });
    this.viewItemTypes = Object.keys(ViewItemType).map(function (key) {
      var type = ViewItemType[key];
      return {
        type: type,
        name: LabelPipe.getKeys('editor', type.name),
        disabled: environment.editor.disabledViewItemTypes.indexOf(type.name) !== -1
      };
    });
    this.setSupportedViewTypes();
    this.setSupportedViewItemTypes();
  };

  _proto.onChanges = function onChanges() {
    this.setSupportedViewTypes();
    this.setSupportedViewItemTypes();
  };

  _proto.setSupportedViewTypes = function setSupportedViewTypes() {
    var _this = this;

    this.supportedViewTypes = this.viewTypes.filter(function (x) {
      return _this.supportedViewType(x.type.name);
    }).sort(function (a, b) {
      if (a.disabled === b.disabled) {
        return 0; // (a.type.name < b.type.name) ? -1 : (a.type.name > b.type.name) ? 1 : 0;
      } else {
        return a.disabled ? 1 : -1;
      }
    });
  };

  _proto.setSupportedViewItemTypes = function setSupportedViewItemTypes() {
    var _this2 = this;

    if (this.view) {
      this.supportedViewItemTypes = this.viewItemTypes.filter(function (x) {
        return _this2.supportedViewItemType(_this2.view.type.name, x.type.name);
      }).sort(function (a, b) {
        if (a.disabled === b.disabled) {
          return 0; // (a.type.name < b.type.name) ? -1 : (a.type.name > b.type.name) ? 1 : 0;
        } else {
          return a.disabled ? 1 : -1;
        }
      });
    } else {
      this.supportedViewItemTypes = [];
    }
  };

  _proto.setMode = function setMode(mode) {
    if (this.mode !== mode) {
      this.mode = mode;
      this.pushChanges();
    }
  };

  _proto.supportedViewType = function supportedViewType(viewTypeName) {
    var supported = [ViewType.Panorama.name, ViewType.PanoramaGrid.name, ViewType.Room3d.name, ViewType.Model.name].indexOf(viewTypeName) !== -1; // ViewType.WaitingRoom,
    // console.log('supportedViewType', viewType, supported);

    return supported;
  };

  _proto.supportedViewItemType = function supportedViewItemType(viewTypeName, viewItemTypeName) {
    var supported;

    switch (viewTypeName) {
      case ViewType.WaitingRoom.name:
        supported = false;
        break;

      case ViewType.Panorama.name:
        supported = [ViewItemType.Nav.name, ViewItemType.Model.name, ViewItemType.Plane.name, ViewItemType.CurvedPlane.name].indexOf(viewItemTypeName) !== -1;
        break;

      case ViewType.PanoramaGrid.name:
        supported = [ViewItemType.Nav.name, ViewItemType.Model.name, ViewItemType.Plane.name, ViewItemType.CurvedPlane.name].indexOf(viewItemTypeName) !== -1;
        break;

      case ViewType.Room3d.name:
        supported = [ViewItemType.Nav.name, ViewItemType.Model.name, ViewItemType.Texture.name].indexOf(viewItemTypeName) !== -1;
        break;

      case ViewType.Model.name:
        supported = [ViewItemType.Nav.name, ViewItemType.Model.name, ViewItemType.Plane.name, ViewItemType.CurvedPlane.name].indexOf(viewItemTypeName) !== -1;
        break;
    } // console.log('supportedViewItemType', viewTypeName, viewItemTypeName, supported);


    return supported;
  };

  _proto.onSelect = function onSelect(event) {
    this.select.next(event);
  };

  _proto.onUpdate = function onUpdate(event) {
    this.update.next(event);
  };

  _proto.onDelete = function onDelete(event) {
    this.delete.next(event);
  };

  return AsideComponent;
}(rxcomp.Component);
AsideComponent.meta = {
  selector: '[aside]',
  outputs: ['select', 'update', 'delete'],
  inputs: ['view']
};var EditorService = /*#__PURE__*/function () {
  function EditorService() {}

  EditorService.data$ = function data$() {
    if (!this.data$_) {
      this.data$_ = HttpService.get$("/api/view").pipe(operators.map(function (data) {
        data.views = data.views.map(function (view) {
          return mapView(view);
        });
        return data;
      }), operators.shareReplay(1));
    }

    return this.data$_;
  };

  EditorService.viewIdOptions$ = function viewIdOptions$() {
    return this.data$().pipe(operators.map(function (data) {
      var options = data.views.map(function (view) {
        return {
          id: view.id,
          name: view.name
        };
      });
      options.unshift({
        id: null,
        name: LabelPipe.transform('select')
      });
      return options;
    }));
  };

  EditorService.viewCreate$ = function viewCreate$(view) {
    return HttpService.post$("/api/view", view).pipe(operators.map(function (view) {
      return mapView(view);
    }));
  };

  EditorService.viewUpdate$ = function viewUpdate$(view) {
    return HttpService.put$("/api/view/" + view.id, view.payload).pipe(operators.map(function (view) {
      return mapView(view);
    }));
  };

  EditorService.viewDelete$ = function viewDelete$(view) {
    return HttpService.delete$("/api/view/" + view.id);
  };

  EditorService.getTile = function getTile(view) {
    var tile;

    if (view.type.name === ViewType.PanoramaGrid.name) {
      tile = view.tiles[view.index];
    }

    return tile;
  };

  EditorService.inferItemCreate$ = function inferItemCreate$(view, item) {
    var tile = this.getTile(view);

    if (tile) {
      return this.tileItemCreate$(view, tile, item);
    } else {
      return this.itemCreate$(view, item);
    }
  };

  EditorService.inferItemUpdate$ = function inferItemUpdate$(view, item) {
    var tile = this.getTile(view);

    if (tile) {
      return this.tileItemUpdate$(view, tile, item);
    } else {
      return this.itemUpdate$(view, item);
    }
  };

  EditorService.inferItemDelete$ = function inferItemDelete$(view, item) {
    var tile = this.getTile(view);

    if (tile) {
      return this.tileItemDelete$(view, tile, item);
    } else {
      return this.itemDelete$(view, item);
    }
  };

  EditorService.inferItemUpdateResult$ = function inferItemUpdateResult$(view, item) {
    var tile = this.getTile(view);
    var currentItem;

    if (tile) {
      currentItem = tile.navs.find(function (i) {
        return i.id === item.id;
      });
    } else {
      currentItem = view.items.find(function (i) {
        return i.id === item.id;
      });
    }

    if (currentItem) {
      Object.assign(currentItem, item);
    }
  };

  EditorService.inferItemDeleteResult$ = function inferItemDeleteResult$(view, item) {
    var tile = this.getTile(view);
    var items;

    if (tile) {
      items = tile.navs;
    } else {
      items = view.items;
    }

    if (items) {
      var index = items.indexOf(item);

      if (index !== -1) {
        items.splice(index, 1);
      }

      if (tile) {
        view.updateCurrentItems();
      }
    }
  };

  EditorService.itemCreate$ = function itemCreate$(view, item) {
    return HttpService.post$("/api/view/" + view.id + "/item", item).pipe(operators.map(function (item) {
      return mapViewItem(item);
    }));
  };

  EditorService.itemUpdate$ = function itemUpdate$(view, item) {
    return HttpService.put$("/api/view/" + view.id + "/item/" + item.id, item.payload).pipe(operators.map(function (item) {
      return mapViewItem(item);
    }));
  };

  EditorService.itemDelete$ = function itemDelete$(view, item) {
    return HttpService.delete$("/api/view/" + view.id + "/item/" + item.id);
  };

  EditorService.tileItemCreate$ = function tileItemCreate$(view, tile, item) {
    return HttpService.post$("/api/view/" + view.id + "/tile/" + tile.id + "/item", item).pipe(operators.map(function (item) {
      return mapViewItem(item);
    }));
  };

  EditorService.tileItemUpdate$ = function tileItemUpdate$(view, tile, item) {
    return HttpService.put$("/api/view/" + view.id + "/tile/" + tile.id + "/item/" + item.id, item.payload).pipe(operators.map(function (item) {
      return mapViewItem(item);
    }));
  };

  EditorService.tileItemDelete$ = function tileItemDelete$(view, tile, item) {
    return HttpService.delete$("/api/view/" + view.id + "/tile/" + tile.id + "/item/" + item.id);
  };

  return EditorService;
}();var EditorComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(EditorComponent, _Component);

  function EditorComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = EditorComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    node.classList.remove('hidden');
    this.flags = environment.flags;
    this.aside = false;
    this.settings = false;
    this.state = {};
    this.data = null;
    this.views = null;
    this.view = null;
    this.form = null;
    this.local = null;
    this.remotes = [];
    this.viewHit = new rxjs.Subject();
    var vrService = this.vrService = VRService.getService();
    vrService.status$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (status) {
      return _this.pushChanges();
    });
    this.resolveUser();
  };

  _proto.resolveUser = function resolveUser() {
    var _this2 = this;

    UserService.me$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (user) {
      if (user && user.type === RoleType.Publisher) {
        _this2.user = user;

        _this2.initState();
      } else {
        window.location.href = environment.url.access;
      }
    });
  };

  _proto.initState = function initState() {
    var _this3 = this;

    var user = this.user;
    var role = user.type;
    var name = user.firstName && user.lastName ? user.firstName + " " + user.lastName : null;
    var state = {
      user: user,
      role: role,
      name: name,
      link: null,
      channelName: environment.channelName,
      uid: null,
      status: AgoraStatus.Connected,
      connecting: false,
      connected: true,
      locked: false,
      control: false,
      spyed: false,
      hosted: true,
      live: false,
      cameraMuted: false,
      audioMuted: false
    };
    StateService.state = state;
    StateService.state$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (state) {
      _this3.state = state;
      _this3.hosted = state.hosted;

      _this3.pushChanges();
    });
    this.loadView();
    StreamService.mode = StreamServiceMode.Editor; // this.getUserMedia();
  };

  _proto.getUserMedia = function getUserMedia() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      var body = document.querySelector('body');
      var media = document.createElement('div');
      var video = document.createElement('video');
      media.setAttribute('id', 'stream-editor');
      media.setAttribute('style', 'position:absolute; top: 5000px; line-height: 0;');
      media.appendChild(video);
      body.appendChild(media);
      navigator.mediaDevices.getUserMedia({
        video: {
          width: 800,
          height: 450
        }
      }).then(function (stream) {
        // console.log(stream);
        if ('srcObject' in video) {
          video.srcObject = stream;
        } else {
          video.src = window.URL.createObjectURL(stream);
        }

        video.play();
        var fakePublisherStream = {
          getId: function getId() {
            return 'editor';
          },
          clientInfo: {
            role: RoleType.Publisher
          }
        };
        var fakeAttendeeStream = {
          getId: function getId() {
            return 'editor';
          },
          clientInfo: {
            role: RoleType.Attendee
          }
        };
        StreamService.editor = [fakePublisherStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream];
      }).catch(function (error) {
        console.log('EditorComponent.getUserMedia.error', error.name, error.message);
      });
    }
  };

  _proto.loadView = function loadView() {
    var _this4 = this;

    EditorService.data$().pipe(operators.switchMap(function (data) {
      _this4.data = data;
      _this4.views = data.views.filter(function (x) {
        return x.type.name !== 'waiting-room';
      });
      return ViewService.editorView$(data);
    }), operators.takeUntil(this.unsubscribe$), operators.tap(function (view) {
      _this4.view = null;

      _this4.pushChanges();
    }), operators.delay(1), operators.tap(function (view) {
      _this4.view = view;

      _this4.pushChanges();
    })).subscribe(function (view) {// console.log('EditorComponent.view$', view);
    });
  };

  _proto.onNavTo = function onNavTo(viewId) {
    var view = this.data.views.find(function (x) {
      return x.id === viewId;
    });

    if (view) {
      ViewService.viewId = viewId;
    }
  };

  _proto.onRemoteControlRequest = function onRemoteControlRequest(message) {
    var _this5 = this;

    ModalService.open$({
      src: environment.template.modal.controlRequest,
      data: null
    }).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      if (event instanceof ModalResolveEvent) {
        _this5.patchState({
          control: true,
          spying: false
        });
      } else {
        _this5.patchState({
          control: false,
          spying: false
        });
      }
    });
  };

  _proto.patchState = function patchState(state) {
    this.state = Object.assign({}, this.state, state);
    this.pushChanges(); // console.log(this.state);
  };

  _proto.tryInAr = function tryInAr() {
    ModalService.open$({
      src: environment.template.modal.tryInAr,
      data: this.view
    }).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {// this.pushChanges();
    });
  }
  /*
  onPrevent(event) {
  	event.preventDefault();
  	event.stopImmediatePropagation();
  }
  */
  ;

  _proto.replaceUrl = function replaceUrl() {
    if ('history' in window) {
      var params = new URLSearchParams(window.location.search);
      var debug = params.get('debug') || null;
      var editor = params.get('editor') || null;
      var role = params.get('role') || null;
      var link = params.get('link') || null;
      var name = params.get('name') || null;
      var url = "" + window.location.origin + window.location.pathname + "?link=" + link + (name ? "&name=" + name : '') + (role ? "&role=" + role : '') + (debug ? "&debug" : '') + (editor ? "&editor" : ''); // console.log('AgoraNameComponent.url', url);

      window.history.replaceState({
        'pageTitle': window.pageTitle
      }, '', url);
    }
  };

  _proto.onToggleAside = function onToggleAside() {
    this.aside = !this.aside;
    this.pushChanges();
    window.dispatchEvent(new Event('resize'));
  };

  _proto.onToggleSettings = function onToggleSettings() {
    this.settings = !this.settings;
    this.pushChanges();
  } // editor
  ;

  _proto.onViewHit = function onViewHit(event) {
    // console.log('onViewHit');
    this.viewHit.next(event);
  };

  _proto.onViewHitted = function onViewHitted(callback) {
    if (this.viewHitSubscription) {
      this.viewHitSubscription.unsubscribe();
      this.viewHitSubscription = null;
    }

    if (typeof callback === 'function') {
      this.viewHitSubscription = this.viewHit.pipe(operators.first()).subscribe(function (position) {
        return callback(position);
      });
    }
  };

  _proto.onDragEnd = function onDragEnd(event) {
    var _this6 = this;

    EditorService.inferItemUpdate$(this.view, event.item).pipe(operators.first()).subscribe(function (response) {
      // console.log('EditorComponent.onDragEnd.inferItemUpdate$.success', response);
      _this6.pushChanges();
    }, function (error) {
      return console.log('EditorComponent.onDragEnd.inferItemUpdate$.error', error);
    });
  };

  _proto.onResizeEnd = function onResizeEnd(event) {
    console.log('EditorComponent.onResizeEnd');
    /*
    EditorService.inferItemUpdate$(this.view, event.item).pipe(
    	first(),
    ).subscribe(response => {
    	// console.log('EditorComponent.onResizeEnd.inferItemUpdate$.success', response);
    	this.pushChanges();
    }, error => console.log('EditorComponent.onResizeEnd.inferItemUpdate$.error', error));
    */
  };

  _proto.onWorldSelect = function onWorldSelect(event) {
    // console.log('EditorComponent.onWorldSelect', this.view);
    if (this.view) {
      this.view.items.forEach(function (item) {
        return item.showPanel = false;
      });
      this.view.items.forEach(function (item) {
        return item.selected = item === event.item;
      });
      this.view.selected = this.view.items.find(function (item) {
        return item.selected;
      }) === undefined;
      this.pushChanges();
    }
  };

  _proto.onOpenModal = function onOpenModal(modal, data) {
    var _this7 = this;

    ModalService.open$({
      src: environment.template.modal[modal.type][modal.value],
      data: data
    }).pipe(operators.first()).subscribe(function (event) {
      if (event instanceof ModalResolveEvent) {
        console.log('EditorComponent.onOpenModal.resolve', event);

        switch (modal.value) {
          case ViewItemType.Nav.name:
          case ViewItemType.Plane.name:
          case ViewItemType.CurvedPlane.name:
          case ViewItemType.Model.name:
            var tile = EditorService.getTile(_this7.view);

            if (tile) {
              var navs = tile.navs || [];
              navs.push(event.data);
              Object.assign(tile, {
                navs: navs
              });

              _this7.view.updateCurrentItems();
            } else {
              var items = _this7.view.items || [];
              items.push(event.data);
              Object.assign(_this7.view, {
                items: items
              });
            }

            _this7.pushChanges();

            break;

          case ViewType.Panorama.name:
          case ViewType.PanoramaGrid.name:
          case ViewType.Model.name:
            _this7.data.views.push(event.data);

            ViewService.viewId = event.data.id;

            _this7.pushChanges(); // !!!


            break;
        }
      }

      _this7.pushChanges();
    });
  };

  _proto.onAsideSelect = function onAsideSelect(event) {
    var _this8 = this;

    // console.log('onAsideSelect', event);
    if (event.value) {
      switch (event.value) {
        case ViewItemType.Nav.name:
        case ViewItemType.Plane.name:
        case ViewItemType.CurvedPlane.name:
        case ViewItemType.Model.name:
          if (event.value === ViewItemType.Model.name && this.view.type.name === ViewType.Model.name) {
            return;
          }

          this.onViewHitted(function (position) {
            _this8.onOpenModal(event, {
              view: _this8.view,
              position: position
            });
          });
          ToastService.open$({
            message: 'Click a point on the view'
          });
          break;

        default:
          this.onOpenModal(event, {
            view: this.view
          });
      }
    } else if (event.view && (event.item || event.item === null)) {
      event.view.selected = false;
      event.view.items.forEach(function (item) {
        return item.selected = item === event.item;
      });
      this.pushChanges();
    } else if (event.view && (event.tile || event.tile === null)) {
      event.view.selected = false;
      event.view.tiles.forEach(function (tile) {
        return tile.selected = tile === event.tile;
      });
      /*
      // if tile selected
      // send ChangeTile message to world component
      this.orbit.walk(event.position, (headingLongitude, headingLatitude) => {
      	const item = this.view.getTile(event.indices.x, event.indices.y);
      	if (item) {
      		this.panorama.crossfade(item, this.renderer, (envMap, texture, rgbe) => {
      			// this.scene.background = envMap;
      			this.scene.environment = envMap;
      			this.orbit.walkComplete(headingLongitude, headingLatitude);
      			// this.render();
      			// this.pushChanges();
      		});
      	}
      });
      */

      this.pushChanges();
    } else if (event.view || event.view === null) {
      this.view.selected = this.view === event.view;
      this.view.items.forEach(function (item) {
        return item.selected = false;
      });
      var currentTile = EditorService.getTile(this.view);

      if (currentTile) {
        this.view.tiles.forEach(function (tile) {
          return tile.selected = tile === currentTile;
        });
      }

      this.pushChanges();
    }
  };

  _proto.onAsideUpdate = function onAsideUpdate(event) {
    // console.log('onAsideUpdate', event);
    if (event.item && event.view) {
      this.pushChanges();
    } else if (event.tile && event.view) ; else if (event.view) {
      var assetDidChange = this.view.asset.id !== event.view.asset.id;
      Object.assign(this.view, event.view);

      if (assetDidChange) {
        ViewService.viewId = event.view.id;
      } else {
        this.pushChanges();
      }
    }
  };

  _proto.onAsideDelete = function onAsideDelete(event) {
    var _this9 = this;

    console.log('onAsideDelete', event);

    if (event.item && event.view) {
      EditorService.inferItemDelete$(event.view, event.item).pipe(operators.first()).subscribe(function (response) {
        // console.log('EditorComponent.onAsideDelete.inferItemDelete$.success', response);
        EditorService.inferItemDeleteResult$(event.view, event.item);

        _this9.pushChanges();
      }, function (error) {
        return console.log('EditorComponent.onAsideDelete.inferItemDelete$.error', error);
      });
    } else if (event.view) {
      EditorService.viewDelete$(event.view).pipe(operators.first()).subscribe(function (response) {
        // console.log('EditorComponent.onAsideDelete.viewDelete$.success', response);
        var index = _this9.data.views.indexOf(event.view);

        if (index !== -1) {
          _this9.data.views.splice(index, 1);
        }

        _this9.views = _this9.data.views.slice();
        ViewService.viewId = _this9.views[0].id; // this.pushChanges();
      }, function (error) {
        return console.log('EditorComponent.onAsideDelete.viewDelete$.error', error);
      });
    }
  };

  return EditorComponent;
}(rxcomp.Component);
EditorComponent.meta = {
  selector: '[editor-component]'
};var MENU_UID = 0;

var MenuService = /*#__PURE__*/function () {
  function MenuService() {}

  MenuService.menu$ = function menu$() {
    var _this = this;

    return this.getMenu$().pipe(operators.switchMap(function (menu) {
      _this.menu$_.next(menu);

      return _this.menu$_;
    }));
  };

  MenuService.getMenu$ = function getMenu$() {
    return HttpService.get$("/api/menu").pipe(operators.map(function (data) {
      data.menu.sort(function (a, b) {
        return a.order - b.order;
      });
      return data.menu;
    }));
  };

  MenuService.updateMenu$ = function updateMenu$(menu) {
    return HttpService.put$("/api/menu", menu);
  };

  MenuService.createMenuItem$ = function createMenuItem$(parentId, order) {
    if (parentId === void 0) {
      parentId = null;
    }

    if (order === void 0) {
      order = 0;
    }

    var payload = {
      parentId: parentId,
      viewId: null,
      order: order * 10,
      name: 'Folder ' + ++MENU_UID
    };
    return HttpService.post$("/api/menu", payload);
  };

  MenuService.updateMenuItem$ = function updateMenuItem$(item) {
    return HttpService.put$("/api/menu/" + item.id, item);
  };

  MenuService.deleteMenuItem$ = function deleteMenuItem$(item) {
    return HttpService.delete$("/api/menu/" + item.id);
  };

  MenuService.getModelMenu$ = function getModelMenu$(views, editor) {
    var _this2 = this;

    if (editor === void 0) {
      editor = false;
    }

    return this.menu$().pipe(operators.map(function (menu) {
      if (menu && menu.length) {
        return _this2.mapMenuItems(menu);
      } else {
        var keys = {};
        views.forEach(function (item) {
          if (item.type.name !== ViewType.WaitingRoom.name && (!item.hidden || editor)) {
            var group = keys[item.type.name];

            if (!group) {
              group = keys[item.type.name] = [];
            }

            group.push(item);
          }
        });

        var _menu = Object.keys(keys).map(function (typeName) {
          var name = 'Button';

          switch (typeName) {
            case ViewType.WaitingRoom.name:
              name = 'Waiting Room';
              break;

            case ViewType.Panorama.name:
              name = 'Experience';
              break;

            case ViewType.PanoramaGrid.name:
              name = 'Virtual Tour';
              break;

            case ViewType.Room3d.name:
              name = 'Stanze 3D';
              break;

            case ViewType.Model.name:
              name = 'Modelli 3D';
              break;
          }

          return {
            name: name,
            type: {
              name: 'menu-group'
            },
            items: views.filter(function (x) {
              return x.type.name === typeName && (!x.hidden || editor);
            })
          };
        });

        return _menu;
      }
    }));
  };

  MenuService.mapMenuItem = function mapMenuItem(item, items) {
    if (item.viewId) {
      return {
        id: item.viewId,
        name: item.name,
        type: {
          name: 'panorama'
        }
      };
    } else {
      return {
        name: item.name,
        type: {
          name: 'menu-group'
        },
        items: this.mapMenuItems(items, item.id)
      };
    }
  };

  MenuService.mapMenuItems = function mapMenuItems(items, parentId) {
    var _this3 = this;

    if (parentId === void 0) {
      parentId = null;
    }

    return items.filter(function (item) {
      return (item.parentId || null) === parentId;
    }).map(function (item) {
      return _this3.mapMenuItem(item, items);
    });
  };

  return MenuService;
}();

_defineProperty(MenuService, "menu$_", new rxjs.BehaviorSubject([]));var AssetService = /*#__PURE__*/function () {
  function AssetService() {}

  AssetService.assetCreate$ = function assetCreate$(asset) {
    return HttpService.post$("/api/asset", asset).pipe(operators.map(function (asset) {
      return mapAsset(asset);
    }));
  };

  AssetService.assetUpdate$ = function assetUpdate$(asset) {
    return HttpService.put$("/api/asset/" + asset.id, asset).pipe(operators.map(function (asset) {
      return mapAsset(asset);
    }));
  };

  AssetService.assetDelete$ = function assetDelete$(asset) {
    if (asset && asset.id) {
      return HttpService.delete$("/api/asset/" + asset.id).pipe(operators.map(function () {
        return null;
      }));
    } else {
      return rxjs.of(null);
    }
  };

  AssetService.upload$ = function upload$(files) {
    var formData = new FormData();
    files.forEach(function (file) {
      return formData.append('file', file, file.name);
    });
    var xhr = new XMLHttpRequest();
    var events$ = rxjs.merge(rxjs.fromEvent(xhr.upload, 'loadstart'), rxjs.fromEvent(xhr.upload, 'progress'), rxjs.fromEvent(xhr.upload, 'load'), rxjs.fromEvent(xhr, 'readystatechange')).pipe(operators.map(function (event) {
      switch (event.type) {
        case 'readystatechange':
          if (xhr.readyState === 4) {
            return JSON.parse(xhr.responseText);
          } else {
            return null;
          }

        default:
          return null;
      }
    }), operators.filter(function (event) {
      return event !== null;
    }));
    xhr.open('POST', "/api/upload/", true);
    xhr.send(formData);
    return events$;
  };

  return AssetService;
}();var ControlComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ControlComponent, _Component);

  function ControlComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ControlComponent.prototype;

  _proto.onChanges = function onChanges() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node; // console.log(this, node, this.control);


    var control = this.control;
    var flags = control.flags;
    Object.keys(flags).forEach(function (key) {
      flags[key] ? node.classList.add(key) : node.classList.remove(key);
    });
  };

  return ControlComponent;
}(rxcomp.Component);
ControlComponent.meta = {
  selector: '[control]',
  inputs: ['control']
};var ControlAssetComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlAssetComponent, _ControlComponent);

  function ControlAssetComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlAssetComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.label = this.label || 'label';
    this.disabled = this.disabled || false;
    this.accept = this.accept || 'image/png, image/jpeg';
    this.previews = [];

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var input = node.querySelector('input');
    input.setAttribute('accept', this.accept);
    this.drop$(input).pipe(operators.takeUntil(this.unsubscribe$)).subscribe();
    this.change$(input).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (assets) {
      // console.log('ControlAssetComponent.change$', assets);
      _this.control.value = assets[0];
    });
  };

  _proto.change$ = function change$(input) {
    var _this2 = this;

    if (rxcomp.isPlatformBrowser && input) {
      return rxjs.fromEvent(input, 'change').pipe(operators.filter(function (event) {
        return input.files && input.files.length;
      }), operators.switchMap(function (event) {
        // console.log('ControlAssetComponent.change$', input.files);
        var fileArray = Array.from(input.files);
        _this2.previews = fileArray.map(function () {
          return null;
        });
        var uploads$ = fileArray.map(function (file, i) {
          return _this2.read$(file, i).pipe(operators.switchMap(function () {
            return AssetService.upload$([file]);
          }), // tap(uploads => console.log('upload', uploads)),
          operators.switchMap(function (uploads) {
            var upload = uploads[0];
            /*
            id: 1601303293569
            type: "image/jpeg"
            file: "1601303293569_ambiente1_x0_y2.jpg"
            originalFileName: "ambiente1_x0_y2.jpg"
            url: "/uploads/1601303293569_ambiente1_x0_y2.jpg"
            */

            var asset = Asset.fromUrl(upload.url);
            return AssetService.assetCreate$(asset);
          }));
        });
        return rxjs.combineLatest(uploads$);
      }));
    } else {
      return rxjs.EMPTY;
    }
  };

  _proto.read$ = function read$(file, i) {
    var _this3 = this;

    var reader = new FileReader();
    var reader$ = rxjs.fromEvent(reader, 'load').pipe(operators.tap(function (event) {
      var blob = event.target.result;

      _this3.resize_(blob, function (resized) {
        _this3.previews[i] = resized;

        _this3.pushChanges();
      });
    }));
    reader.readAsDataURL(file);
    return reader$;
  };

  _proto.drop$ = function drop$(input) {
    if (rxcomp.isPlatformBrowser && input) {
      var body = document.querySelector('body');
      return rxjs.merge(rxjs.fromEvent(body, 'drop'), rxjs.fromEvent(body, 'dragover')).pipe(operators.map(function (event) {
        console.log('ControlAssetComponent.drop$', event);
        event.preventDefault();

        if (event.target === input) {
          input.files = event.dataTransfer.files;
        }

        return;
      }));
    } else {
      return rxjs.EMPTY;
    }
  };

  _proto.resize_ = function resize_(blob, callback) {
    if (typeof callback === 'function') {
      var img = document.createElement('img');

      img.onload = function () {
        var MAX_WIDTH = 320;
        var MAX_HEIGHT = 240;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var width = img.width;
        var height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        callback(dataUrl);
      };

      img.src = blob;
    }
  };

  _createClass(ControlAssetComponent, [{
    key: "image",
    get: function get() {
      var image = null;

      if (this.control.value) {
        image = "" + this.control.value.folder + this.control.value.file;
      } else if (this.previews && this.previews.length) {
        image = this.previews[0];
      }

      return image;
    }
  }]);

  return ControlAssetComponent;
}(ControlComponent);
ControlAssetComponent.meta = {
  selector: '[control-asset]',
  inputs: ['control', 'label', 'disabled', 'accept'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form\" [class]=\"{ required: control.validators.length, disabled: disabled }\">\n\t\t\t<div class=\"control--head\">\n\t\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t\t</div>\n\t\t\t<div class=\"group--picture\">\n\t\t\t\t<div class=\"group--picture__info\">\n\t\t\t\t\t<!-- <svg class=\"icon--image\"><use xlink:href=\"#image\"></use></svg> -->\n\t\t\t\t\t<span [innerHTML]=\"'browse' | label\"></span>\n\t\t\t\t</div>\n\t\t\t\t<img [lazy]=\"control.value | asset\" [size]=\"{ width: 320, height: 240 }\" *if=\"control.value && control.value.type.name === 'image'\" />\n\t\t\t\t<video [src]=\"control.value | asset\" *if=\"control.value && control.value.type.name === 'video'\"></video>\n\t\t\t\t<input type=\"file\">\n\t\t\t</div>\n\t\t\t<div class=\"file-name\" *if=\"control.value\" [innerHTML]=\"control.value.file\"></div>\n\t\t\t<!--\n\t\t\t<input type=\"text\" class=\"control--text\" [formControl]=\"control\" [placeholder]=\"label\" [disabled]=\"disabled\" />\n\t\t\t-->\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var ControlMenuComponent = /*#__PURE__*/function (_ControlAssetComponen) {
  _inheritsLoose(ControlMenuComponent, _ControlAssetComponen);

  function ControlMenuComponent() {
    return _ControlAssetComponen.apply(this, arguments) || this;
  }

  ControlMenuComponent.itemToFormGroup = function itemToFormGroup(item) {
    return new rxcompForm.FormGroup({
      id: item.id,
      parentId: item.parentId,
      viewId: item.viewId,
      name: item.name,
      items: new rxcompForm.FormArray()
    });
  }
  /*
  static newFormGroup(parentId = null) {
  	return new FormGroup({
  		id: null,
  		parentId: parentId,
  		viewId: null,
  		name: 'Folder ' + (++MENU_UID),
  		items: new FormArray(),
  	});
  }
  */
  ;

  var _proto = ControlMenuComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.dropdownId = DropdownDirective.nextId();
    this.controls = this.control.controls;
    EditorService.viewIdOptions$().pipe(operators.first()).subscribe(function (options) {
      _this.controls.viewId.options = options;
    });
  };

  _proto.onAddItem = function onAddItem() {
    var _this2 = this;

    MenuService.createMenuItem$(this.controls.id.value, this.controls.items.length).pipe(operators.first()).subscribe(function (item) {
      _this2.controls.items.push(ControlMenuComponent.itemToFormGroup(item));
    }); // this.controls.items.push(ControlMenuComponent.newFormGroup(this.controls.id.value));
  };

  _proto.onRemoveItem = function onRemoveItem() {
    this.remove.next(this.control);
  };

  _proto.onRemoveControl = function onRemoveControl(control) {
    var _this3 = this;

    MenuService.deleteMenuItem$(control.value).pipe(operators.first()).subscribe(function () {
      _this3.controls.items.remove(control);
    }); // this.controls.items.remove(control);
  };

  _proto.onLinkItem = function onLinkItem() {
    this.link.next(this.control);
  };

  _proto.onLinkControl = function onLinkControl(control) {
    this.link.next(control);
  };

  _proto.onItemUp = function onItemUp() {
    this.up.next(this.control);
  };

  _proto.onItemDown = function onItemDown() {
    this.down.next(this.control);
  };

  _proto.onUpControl = function onUpControl(control) {
    var items = this.controls.items;
    var length = items.controls.length;
    var index = items.controls.indexOf(control);
    items.controls.splice(index, 1);

    if (index > 0) {
      index--;
    } else {
      index = length - 1;
    }

    items.insert(control, index);
  };

  _proto.onDownControl = function onDownControl(control) {
    var items = this.controls.items;
    var length = items.controls.length;
    var index = items.controls.indexOf(control);
    items.controls.splice(index, 1);

    if (index < length - 1) {
      index++;
    } else {
      index = 0;
    }

    items.insert(control, index);
  };

  _proto.setView = function setView(view) {
    var _this4 = this;

    console.log('ControlMenuComponent.setView', view.id);
    var payload = Object.assign({}, this.control.value);
    payload.viewId = view.id;

    if (view.id) {
      payload.name = view.name;
    }

    MenuService.updateMenuItem$(payload).pipe(operators.first()).subscribe(function () {
      _this4.controls.viewId.value = view.id;

      if (view.id) {
        _this4.controls.name.value = view.name; // clear sub items

        _this4.controls.items.controls = [];

        _this4.controls.items.switchSubjects_();
      } // this.change.next(value);

    });
  };

  _proto.onTextDidChange = function onTextDidChange(event) {
    console.log('ControlMenuComponent.onTextDidChange', this.controls.name.value);
    MenuService.updateMenuItem$(this.control.value).pipe(operators.first()).subscribe();
  };

  _proto.hasOption = function hasOption(item) {
    return this.controls.viewId.value === item.id;
  };

  _proto.onDropped = function onDropped(id) {// console.log('ControlMenuComponent.onDropped', id);
  };

  return ControlMenuComponent;
}(ControlAssetComponent);
ControlMenuComponent.meta = {
  selector: '[control-menu]',
  outputs: ['remove', 'link', 'up', 'down'],
  inputs: ['control'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form\">\n\t\t\t<button type=\"button\" class=\"control-menu__link\" [class]=\"{ active: control.controls.viewId.value }\" (click)=\"onLinkItem($event)\" [dropdown]=\"dropdownId\" (dropped)=\"onDropped($event)\">\n\t\t\t\t<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><use xlink:href=\"#link\"></use></svg>\n\t\t\t\t<div class=\"dropdown\" [dropdown-item]=\"dropdownId\">\n\t\t\t\t\t<div class=\"category\">View</div>\n\t\t\t\t\t<ul class=\"nav--dropdown\">\n\t\t\t\t\t\t<li (click)=\"setView(item)\" [class]=\"{ empty: item.id == null }\" *for=\"let item of control.controls.viewId.options\">\n\t\t\t\t\t\t\t<span [class]=\"{ active: hasOption(item) }\" [innerHTML]=\"item.name\"></span>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t</button>\n\t\t\t<input type=\"text\" class=\"control--text\" [formControl]=\"control.controls.name\" placeholder=\"Name\" (change)=\"onTextDidChange($event)\" />\n\t\t\t<!--\n\t\t\t<button type=\"button\" class=\"control-menu__add\" (click)=\"onAddItem($event)\">\n\t\t\t\t<span [innerHTML]=\"control.controls.viewId.value\"></span>\n\t\t\t</button>\n\t\t\t-->\n\t\t\t<!--\n\t\t\t<select class=\"control--select\" [formControl]=\"control.controls.viewId\">\n\t\t\t\t<option [value]=\"item.id\" *for=\"let item of control.controls.viewId.options\" [innerHTML]=\"item.name\"></option>\n\t\t\t</select>\n\t\t\t-->\n\t\t\t<button type=\"button\" class=\"control-menu__up\" (click)=\"onItemUp($event)\">\n\t\t\t\t<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><use xlink:href=\"#up\"></use></svg>\n\t\t\t</button>\n\t\t\t<button type=\"button\" class=\"control-menu__down\" (click)=\"onItemDown($event)\">\n\t\t\t\t<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><use xlink:href=\"#down\"></use></svg>\n\t\t\t</button>\n\t\t\t<button type=\"button\" class=\"control-menu__add\" (click)=\"onAddItem($event)\" *if=\"!control.controls.viewId.value\">\n\t\t\t\t<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><use xlink:href=\"#add\"></use></svg>\n\t\t\t</button>\n\t\t\t<button type=\"button\" class=\"control-menu__remove\" (click)=\"onRemoveItem($event)\">\n\t\t\t\t<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><use xlink:href=\"#remove\"></use></svg>\n\t\t\t</button>\n\t\t</div>\n\t\t<div class=\"group--items\">\n\t\t\t<div control-menu *for=\"let sub of control.controls.items.controls\" [control]=\"sub\" (remove)=\"onRemoveControl($event)\" (link)=\"onLinkControl($event)\" (up)=\"onUpControl($event)\" (down)=\"onDownControl($event)\"></div>\n\t\t</div>\n\t"
};var MenuBuilderComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(MenuBuilderComponent, _Component);

  function MenuBuilderComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = MenuBuilderComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.changes = 0;
    this.form = null;
    MenuService.getMenu$().pipe(operators.first()).subscribe(function (menu) {
      return _this.initForm(menu);
    });
  };

  _proto.initForm = function initForm(menu) {
    var _this2 = this;

    if (menu === void 0) {
      menu = [];
    }

    var items = this.menuToControls(menu); // console.log('MenuBuilderComponent', items);

    var form = this.form = new rxcompForm.FormGroup({
      items: items
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (changes) {
      // console.log('MenuBuilderComponent', changes);
      _this2.changes++;

      _this2.pushChanges();
    });
  };

  _proto.onLinkControl = function onLinkControl(control) {};

  _proto.onUpControl = function onUpControl(control) {
    var items = this.controls.items;
    var length = items.controls.length;
    var index = items.controls.indexOf(control);
    items.controls.splice(index, 1);

    if (index > 0) {
      index--;
    } else {
      index = length - 1;
    }

    items.insert(control, index);
  };

  _proto.onDownControl = function onDownControl(control) {
    var items = this.controls.items;
    var length = items.controls.length;
    var index = items.controls.indexOf(control);
    items.controls.splice(index, 1);

    if (index < length - 1) {
      index++;
    } else {
      index = 0;
    }

    items.insert(control, index);
  };

  _proto.onAddItem = function onAddItem() {
    var _this3 = this;

    MenuService.createMenuItem$(null, this.controls.items.length).pipe(operators.first()).subscribe(function (item) {
      _this3.controls.items.push(ControlMenuComponent.itemToFormGroup(item));
    }); // this.controls.items.push(ControlMenuComponent.newFormGroup());
  };

  _proto.onRemoveControl = function onRemoveControl(control) {
    var _this4 = this;

    MenuService.deleteMenuItem$(control.value).pipe(operators.first()).subscribe(function () {
      _this4.controls.items.remove(control);
    }); // this.controls.items.remove(control);
  };

  _proto.isValid = function isValid() {
    var isValid = this.form.valid;
    return isValid;
  };

  _proto.onSubmit = function onSubmit(event) {
    if (this.form.valid) {
      var changes = this.form.value;
      var menu = this.controlsToMenu(changes);
      MenuService.updateMenu$(menu);
    } else {
      this.form.touched = true;
    }
  };

  _proto.menuToControls = function menuToControls(menu, parentId) {
    var _this5 = this;

    if (parentId === void 0) {
      parentId = null;
    }

    var items = new rxcompForm.FormArray(menu.filter(function (x) {
      return (x.parentId || null) === parentId;
    }).map(function (x) {
      var subitems = _this5.menuToControls(menu, x.id);

      return new rxcompForm.FormGroup({
        id: x.id,
        parentId: x.parentId,
        viewId: x.viewId,
        name: x.name,
        items: subitems
      });
    }));
    return items;
  };

  _proto.controlsToMenu = function controlsToMenu(changes) {
    var menu = [];

    var pushItem = function pushItem(items) {
      if (items) {
        items.forEach(function (item, i) {
          var menuItem = Object.assign({}, item);
          menuItem.order = i * 10;
          delete menuItem.items;
          menu.push(menuItem);
          pushItem(item.items);
        });
      }
    };

    pushItem(changes.items);
    return menu;
  };

  return MenuBuilderComponent;
}(rxcomp.Component);
MenuBuilderComponent.meta = {
  selector: '[menu-builder]',
  inputs: ['views']
};var CurvedPlaneModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(CurvedPlaneModalComponent, _Component);

  function CurvedPlaneModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = CurvedPlaneModalComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var object = new THREE.Object3D();
    object.position.copy(this.position);
    object.lookAt(CurvedPlaneModalComponent.ORIGIN);
    var form = this.form = new rxcompForm.FormGroup({
      type: ViewItemType.CurvedPlane,
      position: new rxcompForm.FormControl(this.position.multiplyScalar(20).toArray(), rxcompForm.RequiredValidator()),
      rotation: new rxcompForm.FormControl(object.rotation.toArray(), rxcompForm.RequiredValidator()),
      // [0, -Math.PI / 2, 0],
      scale: new rxcompForm.FormControl([1, 1, 1], rxcompForm.RequiredValidator()),
      radius: new rxcompForm.FormControl(35, rxcompForm.RequiredValidator()),
      height: new rxcompForm.FormControl(20, rxcompForm.RequiredValidator()),
      arc: new rxcompForm.FormControl(90, rxcompForm.RequiredValidator()),
      asset: null
    });
    this.controls = form.controls;
    form.changes$.subscribe(function (changes) {
      // console.log('CurvedPlaneModalComponent.form.changes$', changes, form.valid, form);
      _this.pushChanges();
    });
  };

  _proto.onSubmit = function onSubmit() {
    if (this.form.valid) {
      var item = Object.assign({}, this.form.value); // item.viewId = parseInt(item.viewId);

      console.log('CurvedPlaneModalComponent.onSubmit', this.view, item);
      EditorService.inferItemCreate$(this.view, item).pipe(operators.first()).subscribe(function (response) {
        console.log('CurvedPlaneModalComponent.onSubmit.success', response);
        ModalService.resolve(response);
      }, function (error) {
        return console.log('CurvedPlaneModalComponent.onSubmit.error', error);
      });
    } else {
      this.form.touched = true;
    }
  };

  _proto.close = function close() {
    ModalService.reject();
  };

  _createClass(CurvedPlaneModalComponent, [{
    key: "data",
    get: function get() {
      var data = null;

      var _getContext = rxcomp.getContext(this),
          parentInstance = _getContext.parentInstance;

      if (parentInstance instanceof ModalOutletComponent) {
        data = parentInstance.modal.data;
      }

      return data;
    }
  }, {
    key: "view",
    get: function get() {
      var view = null;
      var data = this.data;

      if (data) {
        view = data.view;
      }

      return view;
    }
  }, {
    key: "position",
    get: function get() {
      var position = null;
      var data = this.data;

      if (data) {
        position = data.position;
      }

      return position;
    }
  }]);

  return CurvedPlaneModalComponent;
}(rxcomp.Component);
CurvedPlaneModalComponent.ORIGIN = new THREE.Vector3();
CurvedPlaneModalComponent.meta = {
  selector: '[curved-plane-modal]'
};var ItemModelModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ItemModelModalComponent, _Component);

  function ItemModelModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ItemModelModalComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var object = new THREE.Object3D();
    object.position.copy(this.position);
    object.lookAt(ItemModelModalComponent.ORIGIN);
    var form = this.form = new rxcompForm.FormGroup({
      type: ViewItemType.Model,
      position: new rxcompForm.FormControl(this.position.multiplyScalar(4).toArray(), rxcompForm.RequiredValidator()),
      rotation: new rxcompForm.FormControl(object.rotation.toArray(), rxcompForm.RequiredValidator()),
      // [0, -Math.PI / 2, 0],
      scale: new rxcompForm.FormControl([1, 1, 1], rxcompForm.RequiredValidator()),
      asset: new rxcompForm.FormControl(null, rxcompForm.RequiredValidator())
    });
    this.controls = form.controls;
    form.changes$.subscribe(function (changes) {
      // console.log('ItemModelModalComponent.form.changes$', changes, form.valid, form);
      _this.pushChanges();
    });
  };

  _proto.onSubmit = function onSubmit() {
    if (this.form.valid) {
      var item = Object.assign({}, this.form.value); // item.viewId = parseInt(item.viewId);

      console.log('ItemModelModalComponent.onSubmit', this.view, item);
      EditorService.inferItemCreate$(this.view, item).pipe(operators.first()).subscribe(function (response) {
        console.log('ItemModelModalComponent.onSubmit.success', response);
        ModalService.resolve(response);
      }, function (error) {
        return console.log('ItemModelModalComponent.onSubmit.error', error);
      });
    } else {
      this.form.touched = true;
    }
  };

  _proto.close = function close() {
    ModalService.reject();
  };

  _createClass(ItemModelModalComponent, [{
    key: "data",
    get: function get() {
      var data = null;

      var _getContext = rxcomp.getContext(this),
          parentInstance = _getContext.parentInstance;

      if (parentInstance instanceof ModalOutletComponent) {
        data = parentInstance.modal.data;
      }

      return data;
    }
  }, {
    key: "view",
    get: function get() {
      var view = null;
      var data = this.data;

      if (data) {
        view = data.view;
      }

      return view;
    }
  }, {
    key: "position",
    get: function get() {
      var position = null;
      var data = this.data;

      if (data) {
        position = data.position;
      }

      return position;
    }
  }]);

  return ItemModelModalComponent;
}(rxcomp.Component);
ItemModelModalComponent.ORIGIN = new THREE.Vector3();
ItemModelModalComponent.meta = {
  selector: '[item-model-modal]'
};var ModelModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ModelModalComponent, _Component);

  function ModelModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ModelModalComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.error = null;
    var form = this.form = new rxcompForm.FormGroup({
      type: ViewType.Model,
      name: new rxcompForm.FormControl(null, rxcompForm.RequiredValidator()),
      asset: new rxcompForm.FormControl(null, rxcompForm.RequiredValidator()),
      model: new rxcompForm.FormControl(null, rxcompForm.RequiredValidator())
    });
    this.controls = form.controls;
    form.changes$.subscribe(function (changes) {
      // console.log('ModelModalComponent.form.changes$', changes, form.valid, form);
      _this.pushChanges();
    });
  };

  _proto.onSubmit = function onSubmit() {
    var _this2 = this;

    if (this.form.valid) {
      this.form.submitted = true;
      var values = this.form.value;
      var view = {
        type: values.type,
        name: values.name,
        asset: values.asset,
        orientation: {
          latitude: 0,
          longitude: 0
        },
        zoom: 75
      };
      console.log('ModelModalComponent.onSubmit.view', view);
      return EditorService.viewCreate$(view).pipe(operators.switchMap(function (view) {
        var item = {
          type: ViewItemType.Model,
          asset: values.model
        };
        return EditorService.itemCreate$(view, item).pipe(operators.map(function (item) {
          view.items = [item];
          return view;
        }));
      }), operators.first()).subscribe(function (response) {
        console.log('ModelModalComponent.onSubmit.success', response);
        ModalService.resolve(response);
      }, function (error) {
        console.log('ModelModalComponent.onSubmit.error', error);
        _this2.error = error;

        _this2.form.reset();
      });
    } else {
      this.form.touched = true;
    }
  };

  _proto.close = function close() {
    ModalService.reject();
  };

  return ModelModalComponent;
}(rxcomp.Component);
ModelModalComponent.meta = {
  selector: '[model-modal]'
};var NavModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(NavModalComponent, _Component);

  function NavModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = NavModalComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.error = null;
    var form = this.form = new rxcompForm.FormGroup({
      type: ViewItemType.Nav,
      title: null,
      abstract: null,
      viewId: new rxcompForm.FormControl(null, rxcompForm.RequiredValidator()),
      // keepOrientation: false,
      position: this.position.toArray(),
      asset: null,
      link: new rxcompForm.FormGroup({
        title: new rxcompForm.FormControl(null),
        href: new rxcompForm.FormControl(null),
        target: '_blank'
      }) // upload: new FormControl(null, RequiredValidator()),
      // items: new FormArray([null, null, null], RequiredValidator()),

    });
    this.controls = form.controls;
    /*
    this.controls.viewId.options = [{
    	name: "Name",
    	id: 2,
    }];
    */

    form.changes$.subscribe(function (changes) {
      // console.log('NavModalComponent.form.changes$', changes, form.valid, form);
      _this.pushChanges();
    });
    EditorService.viewIdOptions$().pipe(operators.first()).subscribe(function (options) {
      _this.controls.viewId.options = options;

      _this.pushChanges();
    });
  };

  _proto.onSubmit = function onSubmit() {
    var _this2 = this;

    if (this.form.valid) {
      this.form.submitted = true;
      var item = Object.assign({}, this.form.value);
      item.viewId = parseInt(item.viewId);

      if (item.link && (!item.link.title || !item.link.href)) {
        item.link = null;
      } // console.log('NavModalComponent.onSubmit', this.view, item);


      EditorService.inferItemCreate$(this.view, item).pipe(operators.first()).subscribe(function (response) {
        console.log('NavModalComponent.onSubmit.success', response);
        ModalService.resolve(response);
      }, function (error) {
        console.log('NavModalComponent.onSubmit.error', error);
        _this2.error = error;
        _this2.form.submitted = false; // this.form.reset();
      });
    } else {
      this.form.touched = true;
    }
  };

  _proto.close = function close() {
    ModalService.reject();
  };

  _createClass(NavModalComponent, [{
    key: "data",
    get: function get() {
      var data = null;

      var _getContext = rxcomp.getContext(this),
          parentInstance = _getContext.parentInstance;

      if (parentInstance instanceof ModalOutletComponent) {
        data = parentInstance.modal.data;
      }

      return data;
    }
  }, {
    key: "view",
    get: function get() {
      var view = null;
      var data = this.data;

      if (data) {
        view = data.view;
      }

      return view;
    }
  }, {
    key: "position",
    get: function get() {
      var position = null;
      var data = this.data;

      if (data) {
        position = data.position;
      }

      return position;
    }
  }]);

  return NavModalComponent;
}(rxcomp.Component);
NavModalComponent.meta = {
  selector: '[nav-modal]'
};var PanoramaGridModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(PanoramaGridModalComponent, _Component);

  function PanoramaGridModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = PanoramaGridModalComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.error = null;
    var form = this.form = new rxcompForm.FormGroup({
      type: ViewType.PanoramaGrid,
      name: new rxcompForm.FormControl(null, rxcompForm.RequiredValidator()),
      assets: new rxcompForm.FormControl(null, rxcompForm.RequiredValidator())
    });
    this.controls = form.controls;
    form.changes$.subscribe(function (changes) {
      // console.log('PanoramaGridModalComponent.form.changes$', changes, form.valid, form);
      _this.pushChanges();
    });
  };

  _proto.onSubmit = function onSubmit() {
    var _this2 = this;

    if (this.form.valid) {
      this.form.submitted = true;
      console.log('PanoramaGridModalComponent.onSubmit', this.form.value);
      var assets = this.form.value.assets;
      var tiles = PanoramaGridView.mapTiles(assets.map(function (asset) {
        return {
          asset: asset,
          navs: []
        };
      }), false, true);
      tiles.sort(function (a, b) {
        var ai = a.indices.x * 10000 + a.indices.y;
        var bi = b.indices.x * 10000 + b.indices.y;
        return ai - bi;
      });
      console.log('PanoramaGridModalComponent.onSubmit', tiles);
      var asset = tiles[0].asset;
      var view = {
        type: this.form.value.type,
        name: this.form.value.name,
        asset: asset,
        tiles: tiles,
        invertAxes: true,
        flipAxes: false,
        orientation: {
          latitude: 0,
          longitude: 0
        },
        zoom: 75
      };
      EditorService.viewCreate$(view).pipe(operators.first()).subscribe(function (response) {
        console.log('PanoramaGridModalComponent.onSubmit.success', response);
        ModalService.resolve(response);
      }, function (error) {
        console.log('PanoramaGridModalComponent.onSubmit.error', error);
        _this2.error = error;

        _this2.form.reset();
      });
    } else {
      this.form.touched = true;
    }
  };

  _proto.close = function close() {
    ModalService.reject();
  };

  return PanoramaGridModalComponent;
}(rxcomp.Component);
PanoramaGridModalComponent.meta = {
  selector: '[panorama-grid-modal]'
};var PanoramaModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(PanoramaModalComponent, _Component);

  function PanoramaModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = PanoramaModalComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.error = null;
    var form = this.form = new rxcompForm.FormGroup({
      type: ViewType.Panorama,
      name: new rxcompForm.FormControl(null, rxcompForm.RequiredValidator()),
      asset: new rxcompForm.FormControl(null, rxcompForm.RequiredValidator()) // upload: new FormControl(null, RequiredValidator()),
      // items: new FormArray([null, null, null], RequiredValidator()),

    });
    this.controls = form.controls;
    form.changes$.subscribe(function (changes) {
      // console.log('PanoramaModalComponent.form.changes$', changes, form.valid, form);
      _this.pushChanges();
    });
  };

  _proto.onSubmit = function onSubmit() {
    var _this2 = this;

    if (this.form.valid) {
      this.form.submitted = true;
      var values = this.form.value;
      var view = {
        type: values.type,
        name: values.name,
        asset: values.asset,
        orientation: {
          latitude: 0,
          longitude: 0
        },
        zoom: 75
      };
      console.log('PanoramaModalComponent.onSubmit.view', view);
      return EditorService.viewCreate$(view).pipe(operators.first()).subscribe(function (response) {
        console.log('PanoramaModalComponent.onSubmit.success', response);
        ModalService.resolve(response);
      }, function (error) {
        console.log('PanoramaModalComponent.onSubmit.error', error);
        _this2.error = error;

        _this2.form.reset();
      });
      /*
      const asset = Asset.fromUrl(this.form.value.upload);
      console.log('PanoramaModalComponent.onSubmit.asset', asset);
      AssetService.assetCreate$(asset).pipe(
      	first(),
      	switchMap(response => {
      		const view = {
      			type: this.form.value.type,
      			name: this.form.value.name,
      			asset: response,
      			orientation: {
      				latitude: 0,
      				longitude: 0
      			},
      			zoom: 75
      		};
      		console.log('PanoramaModalComponent.onSubmit.view', view);
      		return EditorService.viewCreate$(view).pipe(
      			first(),
      		);
      	})
      ).subscribe(response => {
      	console.log('PanoramaModalComponent.onSubmit.success', response);
      	ModalService.resolve(response);
      }, error => {
      	console.log('PanoramaModalComponent.onSubmit.error', error);
      	this.error = error;
      	this.form.reset();
      });
      */
    } else {
      this.form.touched = true;
    }
    /*
    EditorService.viewCreate$({
    	"id": 1,
    	"type": "panorama",
    	"name": "Welcome Room",
    	"likes": 134,
    	"liked": false,
    	"asset": {
    		"type": "image",
    		"folder": "waiting-room/",
    		"file": "mod2.jpg"
    	},
    	"items": [
    		{
    			"id": 110,
    			"type": "nav",
    			"title": "Barilla Experience",
    			"abstract": "Abstract",
    			"asset": {
    				"type": "image",
    				"folder": "barilla/",
    				"file": "logo-barilla.jpg"
    			},
    			"link": {
    				"title": "Scopri di più...",
    				"href": "https://www.barilla.com/it-it/",
    				"target": "_blank"
    			},
    			"position": [
    				0.9491595148619703,
    				-0.3147945860255039,
    				0
    			],
    			"viewId": 23
    		}
    	],
    	"orientation": {
    		"latitude": -10,
    		"longitude": 360
    	},
    	"zoom": 75
    }).pipe(
    	first(),
    ).subscribe(data => {
    	console.log('EditorService.viewCreate$', data);
    });
    	*/

  };

  _proto.close = function close() {
    ModalService.reject();
  };

  return PanoramaModalComponent;
}(rxcomp.Component);
PanoramaModalComponent.meta = {
  selector: '[panorama-modal]'
};
/*
{
	"id": 1,
	"type": "panorama",
	"name": "Welcome Room",
	"likes": 134,
	"liked": false,
	"asset": {
		"type": "image",
		"folder": "waiting-room/",
		"file": "mod2.jpg"
	},
	"items": [{
		"id": 110,
		"type": "nav",
		"title": "Barilla Experience",
		"abstract": "Abstract",
		"asset": {
			"type": "image",
			"folder": "barilla/",
			"file": "logo-barilla.jpg"
		},
		"link": {
			"title": "Scopri di più...",
			"href": "https://www.barilla.com/it-it/",
			"target": "_blank"
		},
		"position": [0.9491595148619703,-0.3147945860255039,0],
		"viewId": 23
	}],
	"orientation": {
		"latitude": -10,
		"longitude": 360
	},
	"zoom": 75
}
*/var PlaneModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(PlaneModalComponent, _Component);

  function PlaneModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = PlaneModalComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var object = new THREE.Object3D();
    object.position.copy(this.position);
    object.lookAt(PlaneModalComponent.ORIGIN);
    var form = this.form = new rxcompForm.FormGroup({
      type: ViewItemType.Plane,
      position: new rxcompForm.FormControl(this.position.multiplyScalar(20).toArray(), rxcompForm.RequiredValidator()),
      rotation: new rxcompForm.FormControl(object.rotation.toArray(), rxcompForm.RequiredValidator()),
      // [0, -Math.PI / 2, 0],
      scale: new rxcompForm.FormControl([12, 6.75, 1], rxcompForm.RequiredValidator()),
      asset: null
    });
    this.controls = form.controls;
    form.changes$.subscribe(function (changes) {
      // console.log('PlaneModalComponent.form.changes$', changes, form.valid, form);
      _this.pushChanges();
    });
  };

  _proto.onSubmit = function onSubmit() {
    if (this.form.valid) {
      var item = Object.assign({}, this.form.value); // item.viewId = parseInt(item.viewId);

      console.log('PlaneModalComponent.onSubmit', this.view, item);
      EditorService.inferItemCreate$(this.view, item).pipe(operators.first()).subscribe(function (response) {
        console.log('PlaneModalComponent.onSubmit.success', response);
        ModalService.resolve(response);
      }, function (error) {
        return console.log('PlaneModalComponent.onSubmit.error', error);
      });
    } else {
      this.form.touched = true;
    }
  };

  _proto.close = function close() {
    ModalService.reject();
  };

  _createClass(PlaneModalComponent, [{
    key: "data",
    get: function get() {
      var data = null;

      var _getContext = rxcomp.getContext(this),
          parentInstance = _getContext.parentInstance;

      if (parentInstance instanceof ModalOutletComponent) {
        data = parentInstance.modal.data;
      }

      return data;
    }
  }, {
    key: "view",
    get: function get() {
      var view = null;
      var data = this.data;

      if (data) {
        view = data.view;
      }

      return view;
    }
  }, {
    key: "position",
    get: function get() {
      var position = null;
      var data = this.data;

      if (data) {
        position = data.position;
      }

      return position;
    }
  }]);

  return PlaneModalComponent;
}(rxcomp.Component);
PlaneModalComponent.ORIGIN = new THREE.Vector3();
PlaneModalComponent.meta = {
  selector: '[plane-modal]'
};var RemoveModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(RemoveModalComponent, _Component);

  function RemoveModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = RemoveModalComponent.prototype;

  _proto.onRemove = function onRemove() {
    ModalService.resolve();
  };

  _proto.onCancel = function onCancel() {
    ModalService.reject();
  };

  _proto.close = function close() {
    ModalService.reject();
  };

  _createClass(RemoveModalComponent, [{
    key: "data",
    get: function get() {
      var data = null;

      var _getContext = rxcomp.getContext(this),
          parentInstance = _getContext.parentInstance;

      if (parentInstance instanceof ModalOutletComponent) {
        data = parentInstance.modal.data;
      }

      return data;
    }
  }, {
    key: "item",
    get: function get() {
      var item = null;
      var data = this.data;

      if (data) {
        item = data.item;
      }

      return item;
    }
  }]);

  return RemoveModalComponent;
}(rxcomp.Component);
RemoveModalComponent.meta = {
  selector: '[remove-modal]'
};var UpdateViewItemComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(UpdateViewItemComponent, _Component);

  function UpdateViewItemComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = UpdateViewItemComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.busy = false;
    this.active = false;
    var form = this.form = new rxcompForm.FormGroup();
    this.controls = form.controls;
    var item = this.item;
    this.originalItem = Object.assign({}, item);
    item.hasChromaKeyColor = item.asset && item.asset.chromaKeyColor ? true : false;
    item.assetType = assetGroupTypeFromItem(item).id;
    this.doUpdateForm();
    form.changes$.subscribe(function (changes) {
      // console.log('UpdateViewItemComponent.form.changes$', changes);
      _this.doUpdateItem(changes);

      _this.pushChanges();
    });
  };

  _proto.getAssetDidChange = function getAssetDidChange(changes) {
    var item = this.item;
    var itemAssetId = item.asset ? item.asset.id : null;
    var changesAssetId = changes.asset ? changes.asset.id : null;
    var itemHasChromaKeyColor = item.hasChromaKeyColor === true;
    var changesHasChromaKeyColor = changes.hasChromaKeyColor === true; // console.log('UpdateViewItemComponent.getAssetDidChange', itemAssetId, changesAssetId, item, changes);

    if (itemAssetId !== changesAssetId || itemHasChromaKeyColor !== changesHasChromaKeyColor) {
      return true;
    } else {
      return false;
    }
  };

  _proto.doUpdateItem = function doUpdateItem(changes) {
    var _this2 = this;

    var item = this.item;
    var assetDidChange = this.getAssetDidChange(changes); // console.log('doUpdateItem.assetDidChange', assetDidChange);

    Object.assign(item, changes);

    if (item.asset) {
      item.asset.chromaKeyColor = item.hasChromaKeyColor ? [0.0, 1.0, 0.0] : null;
    }

    if (assetDidChange) {
      var asset$ = item.asset ? AssetService.assetUpdate$(item.asset) : rxjs.of(null);
      asset$.pipe(operators.switchMap(function () {
        return EditorService.inferItemUpdate$(_this2.view, item);
      }), operators.first()).subscribe(); // !!! create indices for nextAttendeeStream

      this.view.updateIndices(this.view.items);

      if (typeof item.onUpdateAsset === 'function') {
        item.onUpdateAsset();
      }
    }

    if (typeof item.onUpdate === 'function') {
      item.onUpdate();
    }
  };

  _proto.doUpdateForm = function doUpdateForm() {
    var _this3 = this;

    var item = this.item;
    var form = this.form;

    if (!this.type || this.type.name !== item.type.name) {
      this.type = item.type;
      Object.keys(this.controls).forEach(function (key) {
        form.removeKey(key);
      });
      var keys;

      switch (item.type.name) {
        case ViewItemType.Nav.name:
          keys = ['id', 'type', 'title?', 'abstract?', 'viewId', 'keepOrientation?', 'position', 'asset?', 'link?'];
          break;

        case ViewItemType.Plane.name:
          keys = ['id', 'type', 'position', 'rotation', 'scale', 'assetType?', 'asset?', 'hasChromaKeyColor?'];
          break;

        case ViewItemType.CurvedPlane.name:
          keys = ['id', 'type', 'position', 'rotation', 'scale', 'radius', 'height', 'arc', 'assetType?', 'asset?', 'hasChromaKeyColor?'];
          break;

        case ViewItemType.Texture.name:
          keys = ['id', 'type', 'assetType?', 'asset?', 'hasChromaKeyColor?']; // asset, key no id!!

          break;

        case ViewItemType.Model.name:
          if (this.view.type.name === ViewType.Model) {
            keys = ['id', 'type', 'asset?'];
          } else {
            keys = ['id', 'type', 'position', 'rotation', 'asset?'];
          }

          break;

        default:
          keys = ['id', 'type'];
      }

      keys.forEach(function (key) {
        var optional = key.indexOf('?') !== -1;
        key = key.replace('?', '');
        var value = item[key] != null ? item[key] : null;
        var control;

        switch (key) {
          case 'viewId':
            control = new rxcompForm.FormControl(value, optional ? undefined : rxcompForm.RequiredValidator());
            EditorService.viewIdOptions$().pipe(operators.first()).subscribe(function (options) {
              control.options = options;
              control.value = control.value || null;

              _this3.pushChanges();
            });
            break;

          case 'assetType':
            control = new rxcompForm.FormControl(value, optional ? undefined : rxcompForm.RequiredValidator());
            control.options = Object.keys(AssetGroupType).map(function (x) {
              return AssetGroupType[x];
            });
            break;

          case 'link':
            var title = item.link ? item.link.title : null;
            var href = item.link ? item.link.href : null;
            var target = '_blank';
            control = new rxcompForm.FormGroup({
              title: new rxcompForm.FormControl(title),
              href: new rxcompForm.FormControl(href),
              target: target
            });
            break;

          default:
            control = new rxcompForm.FormControl(value, optional ? undefined : rxcompForm.RequiredValidator());
        }

        form.add(control, key);
      });
      this.controls = form.controls;
    } else {
      Object.keys(this.controls).forEach(function (key) {
        switch (key) {
          case 'link':
            var title = item.link ? item.link.title : null;
            var href = item.link ? item.link.href : null;
            var target = '_blank';
            _this3.controls[key].value = {
              title: title,
              href: href,
              target: target
            };
            break;

          case 'hasChromaKeyColor':
            _this3.controls[key].value = item.asset && item.asset.chromaKeyColor ? true : false;
            break;

          case 'assetType':
            _this3.controls[key].value = assetGroupTypeFromItem(item).id;
            break;

          default:
            _this3.controls[key].value = item[key] != null ? item[key] : null;
        }
      });
    }
  };

  _proto.onAssetTypeDidChange = function onAssetTypeDidChange(assetType) {
    var _this4 = this;

    var item = this.item;
    var currentType = assetGroupTypeFromItem(item).id; // console.log('UpdateViewItemComponent.onAssetTypeDidChange', assetType, currentType);

    if (assetType !== currentType) {
      item.assetType = assetType;
      var asset$ = rxjs.of(null); // AssetService.assetDelete$(item.asset);

      if (assetType !== AssetGroupType.ImageOrVideo.id) {
        asset$ = asset$.pipe(operators.switchMap(function () {
          var asset = assetPayloadFromGroupTypeId(assetType);
          return AssetService.assetCreate$(asset);
        }));
      }

      asset$.pipe(operators.first()).subscribe(function (asset) {
        // console.log('UpdateViewItemComponent.asset$', asset);
        _this4.controls.asset.value = asset;
      });
      /*
      asset$.pipe(
      	tap(asset => {
      		item.asset = asset;
      		if (typeof item.onUpdateAsset === 'function') {
      			item.onUpdateAsset();
      		}
      	}),
      	switchMap(() => EditorService.inferItemUpdate$(this.view, item)),
      	first()
      ).subscribe();
      */
    }
  };

  _proto.onChanges = function onChanges(changes) {
    // console.log('UpdateViewItemComponent.onChanges', changes);
    this.doUpdateForm();
  };

  _proto.onSubmit = function onSubmit() {
    var _this5 = this;

    if (!this.busy && this.form.valid) {
      this.busy = true;
      this.pushChanges();
      var changes = this.form.value;
      var payload = Object.assign({}, changes);
      var view = this.view;
      var item = new ViewItem(payload);
      EditorService.inferItemUpdate$(view, item).pipe(operators.first()).subscribe(function (response) {
        // console.log('UpdateViewItemComponent.onSubmit.inferItemUpdate$.success', response);
        EditorService.inferItemUpdateResult$(view, item);

        _this5.update.next({
          view: view,
          item: item
        });

        setTimeout(function () {
          _this5.busy = false;

          _this5.pushChanges();
        }, 300);
      }, function (error) {
        return console.log('UpdateViewItemComponent.onSubmit.inferItemUpdate$.error', error);
      }); // this.update.next({ view: this.view, item: new ViewItem(payload) });
    } else {
      this.form.touched = true;
    }
  };

  _proto.onRemove = function onRemove(event) {
    var _this6 = this;

    ModalService.open$({
      src: environment.template.modal.remove,
      data: {
        item: this.item
      }
    }).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      if (event instanceof ModalResolveEvent) {
        _this6.delete.next({
          view: _this6.view,
          item: _this6.item
        });
      }
    });
  };

  _proto.onSelect = function onSelect(event) {
    this.select.next({
      view: this.view,
      item: this.item.selected ? null : this.item
    });
    /*
    this.item.active = !this.item.active;
    this.pushChanges();
    */
  };

  _proto.getTitle = function getTitle(item) {
    return LabelPipe.getKeys('editor', item.type.name);
  };

  return UpdateViewItemComponent;
}(rxcomp.Component);
UpdateViewItemComponent.meta = {
  selector: 'update-view-item',
  outputs: ['select', 'update', 'delete'],
  inputs: ['view', 'item'],
  template:
  /* html */
  "\n\t\t<div class=\"group--headline\" [class]=\"{ active: item.selected }\" (click)=\"onSelect($event)\">\n\t\t\t<!-- <div class=\"id\" [innerHTML]=\"item.id\"></div> -->\n\t\t\t<div class=\"icon\">\n\t\t\t\t<svg-icon [name]=\"item.type.name\"></svg-icon>\n\t\t\t</div>\n\t\t\t<div class=\"title\" [innerHTML]=\"getTitle(item)\"></div>\n\t\t\t<svg class=\"icon--caret-down\"><use xlink:href=\"#caret-down\"></use></svg>\n\t\t</div>\n\t\t<form [formGroup]=\"form\" (submit)=\"onSubmit()\" name=\"form\" role=\"form\" novalidate autocomplete=\"off\" *if=\"item.selected\">\n\t\t\t<div class=\"form-controls\">\n\t\t\t\t<div control-text [control]=\"controls.id\" label=\"Id\" [disabled]=\"true\"></div>\n\t\t\t\t<!-- <div control-text [control]=\"controls.type\" label=\"Type\" [disabled]=\"true\"></div> -->\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"item.type.name == 'nav'\">\n\t\t\t\t<div control-text [control]=\"controls.title\" label=\"Title\"></div>\n\t\t\t\t<div control-textarea [control]=\"controls.abstract\" label=\"Abstract\"></div>\n\t\t\t\t<div control-custom-select [control]=\"controls.viewId\" label=\"NavToView\"></div>\n\t\t\t\t<!-- <div control-checkbox [control]=\"controls.keepOrientation\" label=\"Keep Orientation\"></div> -->\n\t\t\t\t<div control-vector [control]=\"controls.position\" label=\"Position\" [precision]=\"3\"></div>\n\t\t\t\t<div control-asset [control]=\"controls.asset\" label=\"Image\" accept=\"image/jpeg, image/png\"></div>\n\t\t\t\t<div control-text [control]=\"controls.link.controls.title\" label=\"Link Title\"></div>\n\t\t\t\t<div control-text [control]=\"controls.link.controls.href\" label=\"Link Url\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"item.type.name == 'plane'\">\n\t\t\t\t<div control-vector [control]=\"controls.position\" label=\"Position\" [precision]=\"1\"></div>\n\t\t\t\t<div control-vector [control]=\"controls.rotation\" label=\"Rotation\" [precision]=\"3\" [increment]=\"Math.PI / 360\"></div>\n\t\t\t\t<div control-vector [control]=\"controls.scale\" label=\"Scale\" [precision]=\"2\"></div>\n\t\t\t\t<div control-custom-select [control]=\"controls.assetType\" label=\"Asset\" (change)=\"onAssetTypeDidChange($event)\"></div>\n\t\t\t\t<div control-asset [control]=\"controls.asset\" label=\"Image or Video\" accept=\"image/jpeg, video/mp4\" *if=\"controls.assetType.value == 1\"></div>\n\t\t\t\t<div control-checkbox [control]=\"controls.hasChromaKeyColor\" label=\"Use Green Screen\" *if=\"item.asset\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"item.type.name == 'curved-plane'\">\n\t\t\t\t<div control-vector [control]=\"controls.position\" label=\"Position\" [precision]=\"1\"></div>\n\t\t\t\t<div control-vector [control]=\"controls.rotation\" label=\"Rotation\" [precision]=\"3\" [increment]=\"Math.PI / 360\"></div>\n\t\t\t\t<!-- <div control-vector [control]=\"controls.scale\" label=\"Scale\" [precision]=\"2\" [disabled]=\"true\"></div> -->\n\t\t\t\t<div control-number [control]=\"controls.radius\" label=\"Radius\" [precision]=\"2\"></div>\n\t\t\t\t<div control-number [control]=\"controls.height\" label=\"Height\" [precision]=\"2\"></div>\n\t\t\t\t<div control-number [control]=\"controls.arc\" label=\"Arc\" [precision]=\"0\"></div>\n\t\t\t\t<div control-custom-select [control]=\"controls.assetType\" label=\"Asset\" (change)=\"onAssetTypeDidChange($event)\"></div>\n\t\t\t\t<div control-asset [control]=\"controls.asset\" label=\"Image or Video\" accept=\"image/jpeg, video/mp4\" *if=\"controls.assetType.value == 1\"></div>\n\t\t\t\t<div control-checkbox [control]=\"controls.hasChromaKeyColor\" label=\"Use Green Screen\" *if=\"item.asset\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"item.type.name == 'model'\">\n\t\t\t\t<div control-vector [control]=\"controls.position\" label=\"Position\" [precision]=\"1\" *if=\"view.type.name !== 'model'\"></div>\n\t\t\t\t<div control-vector [control]=\"controls.rotation\" label=\"Rotation\" [precision]=\"3\" [increment]=\"Math.PI / 360\" *if=\"view.type.name !== 'model'\"></div>\n\t\t\t\t<div control-model [control]=\"controls.asset\" label=\"Model (.glb)\" accept=\".glb\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"item.type.name == 'texture'\">\n\t\t\t\t<div control-custom-select [control]=\"controls.assetType\" label=\"Asset\" (change)=\"onAssetTypeDidChange($event)\"></div>\n\t\t\t\t<div control-asset [control]=\"controls.asset\" label=\"Image or Video\" accept=\"image/jpeg, video/mp4\" *if=\"controls.assetType.value == 1\"></div>\n\t\t\t\t<div control-checkbox [control]=\"controls.hasChromaKeyColor\" label=\"Use Green Screen\" *if=\"item.asset\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"group--cta\">\n\t\t\t\t<button type=\"submit\" class=\"btn--update\" [class]=\"{ busy: busy }\">\n\t\t\t\t\t<span [innerHTML]=\"'update' | label\"></span>\n\t\t\t\t</button>\n\t\t\t\t<button type=\"button\" class=\"btn--remove\" (click)=\"onRemove($event)\">\n\t\t\t\t\t<span [innerHTML]=\"'remove' | label\"></span>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</form>\n\t"
};var UpdateViewTileComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(UpdateViewTileComponent, _Component);

  function UpdateViewTileComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = UpdateViewTileComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.busy = false;
    this.active = false;
    var form = this.form = new rxcompForm.FormGroup({
      id: new rxcompForm.FormControl(this.tile.id, rxcompForm.RequiredValidator()),
      asset: new rxcompForm.FormControl(this.tile.asset, rxcompForm.RequiredValidator()),
      navs: new rxcompForm.FormControl(this.tile.navs, rxcompForm.RequiredValidator())
    });
    this.controls = form.controls;
    form.changes$.subscribe(function (changes) {
      // console.log('UpdateViewTileComponent.form.changes$', changes);
      var tile = _this.tile;
      Object.assign(tile, changes);

      if (typeof tile.onUpdate === 'function') {
        tile.onUpdate();
      }

      _this.pushChanges();
    });
    console.log('UpdateViewTileComponent.onInit', this.view, this.tile);
  };

  _proto.onSubmit = function onSubmit() {
    var _this2 = this;

    if (!this.busy && this.form.valid) {
      this.busy = true;
      this.pushChanges();
      var payload = Object.assign({}, this.form.value);
      var view = this.view;
      var tile = payload;
      /*
      EditorService.tileUpdate$...
      */

      this.update.next({
        view: view,
        tile: tile
      });
      setTimeout(function () {
        _this2.busy = false;

        _this2.pushChanges();
      }, 300);
    } else {
      this.form.touched = true;
    }
  };

  _proto.onRemove = function onRemove(event) {
    var _this3 = this;

    ModalService.open$({
      src: environment.template.modal.remove,
      data: {
        tile: this.tile
      }
    }).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      if (event instanceof ModalResolveEvent) {
        _this3.delete.next({
          view: _this3.view,
          tile: _this3.tile
        });
      }
    });
  };

  _proto.onSelect = function onSelect(event) {
    this.select.next({
      view: this.view,
      tile: this.tile.selected ? null : this.tile
    });
  };

  return UpdateViewTileComponent;
}(rxcomp.Component);
UpdateViewTileComponent.meta = {
  selector: 'update-view-tile',
  outputs: ['select', 'update', 'delete'],
  inputs: ['view', 'tile'],
  template:
  /* html */
  "\n\t\t<div class=\"group--headline\" [class]=\"{ active: tile.selected }\" (click)=\"onSelect($event)\">\n\t\t\t<div class=\"icon\">\n\t\t\t\t<svg-icon name=\"tile\"></svg-icon>\n\t\t\t</div>\n\t\t\t<div class=\"title\">Tile {{tile.id}}</div>\n\t\t\t<svg class=\"icon--caret-down\"><use xlink:href=\"#caret-down\"></use></svg>\n\t\t</div>\n\t\t<form [formGroup]=\"form\" (submit)=\"onSubmit()\" name=\"form\" role=\"form\" novalidate autocomplete=\"off\" *if=\"tile.selected\">\n\t\t\t<div class=\"form-controls\">\n\t\t\t\t<div control-text [control]=\"controls.id\" label=\"Id\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-asset [control]=\"controls.asset\" label=\"Image\" accept=\"image/jpeg, image/png\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"group--cta\">\n\t\t\t\t<button type=\"submit\" class=\"btn--update\" [class]=\"{ busy: busy }\">\n\t\t\t\t\t<span [innerHTML]=\"'update' | label\"></span>\n\t\t\t\t</button>\n\t\t\t\t<!--\n\t\t\t\t<button type=\"button\" class=\"btn--remove\" (click)=\"onRemove($event)\">\n\t\t\t\t\t<span [innerHTML]=\"'remove' | label\"></span>\n\t\t\t\t</button>\n\t\t\t\t-->\n\t\t\t</div>\n\t\t</form>\n\t"
};var UpdateViewComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(UpdateViewComponent, _Component);

  function UpdateViewComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = UpdateViewComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.busy = false;
    this.flags = environment.flags;
    var form = this.form = new rxcompForm.FormGroup();
    this.controls = form.controls;
    form.changes$.subscribe(function (changes) {
      // console.log('UpdateViewComponent.form.changes$', changes, form.valid, form);
      _this.pushChanges();
    });
    this.doUpdateForm();
    MessageService.in$.pipe(operators.auditTime(500), operators.takeUntil(this.unsubscribe$)).subscribe(function (message) {
      switch (message.type) {
        case MessageType.ControlInfo:
          switch (_this.view.type.name) {
            case ViewType.Panorama.name:
            case ViewType.PanoramaGrid.name:
            case ViewType.Model.name:
              _this.form.patch({
                latitude: message.orientation.latitude,
                longitude: message.orientation.longitude,
                zoom: message.zoom
              });

              break;
          }

          break;
      }
    });
  };

  _proto.doUpdateForm = function doUpdateForm() {
    var view = this.view;

    if (!this.type || this.type.name !== view.type.name) {
      this.type = view.type;
      var form = this.form;
      Object.keys(this.controls).forEach(function (key) {
        form.removeKey(key);
      });
      var keys;

      switch (view.type.name) {
        case ViewType.WaitingRoom.name:
          keys = ['id', 'type', 'name', 'latitude', 'longitude', 'zoom', 'asset'];
          break;

        case ViewType.Panorama.name:
          keys = ['id', 'type', 'name', 'hidden?', 'latitude', 'longitude', 'zoom', 'asset'];
          break;

        case ViewType.PanoramaGrid.name:
          keys = ['id', 'type', 'name', 'hidden?', 'latitude', 'longitude', 'zoom'];
          break;

        case ViewType.Model.name:
          keys = ['id', 'type', 'name', 'hidden?', 'latitude', 'longitude', 'zoom', 'asset'];
          break;

        default:
          keys = ['id', 'type', 'name'];
      }

      if (view.type.name !== ViewType.WaitingRoom.name && environment.flags.ar) {
        keys.push('usdz?');
        keys.push('gltf?');
      }

      keys.forEach(function (key) {
        var optional = key.indexOf('?') !== -1;
        key = key.replace('?', '');

        switch (key) {
          case 'latitude':
          case 'longitude':
            var orientation = view.orientation || {
              latitude: 0,
              longitude: 0
            };
            form.add(new rxcompForm.FormControl(orientation[key], rxcompForm.RequiredValidator()), key);
            break;

          case 'usdz':
          case 'gltf':
            form.add(new rxcompForm.FormControl(view.ar ? view.ar[key] || null : null, optional ? undefined : rxcompForm.RequiredValidator()), key);
            break;

          default:
            form.add(new rxcompForm.FormControl(view[key] != null ? view[key] : null, optional ? undefined : rxcompForm.RequiredValidator()), key);
        }
      });
      this.controls = form.controls;
    }
  };

  _proto.onChanges = function onChanges(changes) {
    this.doUpdateForm();
  };

  _proto.onSubmit = function onSubmit() {
    var _this2 = this;

    if (!this.busy && this.form.valid) {
      this.busy = true;
      this.pushChanges();
      var payload = Object.assign({}, this.view, this.form.value);

      if (payload.latitude != null) {
        // !!! keep loose inequality
        payload.orientation = {
          latitude: payload.latitude,
          longitude: payload.longitude
        };
        delete payload.latitude;
        delete payload.longitude;
      }

      if (payload.usdz != null || payload.gltf != null) {
        // !!! keep loose inequality
        payload.ar = {
          usdz: payload.usdz || null,
          gltf: payload.gltf || null
        };
        delete payload.usdz;
        delete payload.gltf;
      }

      var view = new View(payload);
      EditorService.viewUpdate$(view).pipe(operators.first()).subscribe(function (response) {
        // console.log('UpdateViewComponent.onSubmit.viewUpdate$.success', response);
        _this2.update.next({
          view: view
        });

        setTimeout(function () {
          _this2.busy = false;

          _this2.pushChanges();
        }, 300);
      }, function (error) {
        return console.log('UpdateViewComponent.onSubmit.viewUpdate$.error', error);
      }); // this.update.next({ view: new View(payload) });
    } else {
      this.form.touched = true;
    }
  };

  _proto.onRemove = function onRemove(event) {
    var _this3 = this;

    ModalService.open$({
      src: environment.template.modal.remove,
      data: {
        item: this.item
      }
    }).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      if (event instanceof ModalResolveEvent) {
        _this3.delete.next({
          view: _this3.view
        });
      }
    });
  };

  _proto.onSelect = function onSelect(event) {
    this.select.next({
      view: this.view.selected ? null : this.view
    });
  };

  _proto.getTitle = function getTitle(view) {
    return LabelPipe.getKeys('editor', view.type.name);
  };

  return UpdateViewComponent;
}(rxcomp.Component);
UpdateViewComponent.meta = {
  selector: 'update-view',
  outputs: ['select', 'update', 'delete'],
  inputs: ['view'],
  template:
  /* html */
  "\n\t\t<div class=\"group--headline\" [class]=\"{ active: view.selected }\" (click)=\"onSelect($event)\">\n\t\t\t<!-- <div class=\"id\" [innerHTML]=\"view.id\"></div> -->\n\t\t\t<div class=\"icon\">\n\t\t\t\t<svg-icon [name]=\"view.type.name\"></svg-icon>\n\t\t\t</div>\n\t\t\t<div class=\"title\" [innerHTML]=\"getTitle(view)\"></div>\n\t\t\t<svg class=\"icon--caret-down\"><use xlink:href=\"#caret-down\"></use></svg>\n\t\t</div>\n\t\t<form [formGroup]=\"form\" (submit)=\"onSubmit()\" name=\"form\" role=\"form\" novalidate autocomplete=\"off\" *if=\"view.selected\">\n\t\t\t<div class=\"form-controls\">\n\t\t\t\t<div control-text [control]=\"controls.id\" label=\"Id\" [disabled]=\"true\"></div>\n\t\t\t\t<!-- <div control-text [control]=\"controls.type\" label=\"Type\" [disabled]=\"true\"></div> -->\n\t\t\t\t<div control-text [control]=\"controls.name\" label=\"Name\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"view.type.name == 'waiting-room'\">\n\t\t\t\t<div control-asset [control]=\"controls.asset\" label=\"Image\" accept=\"image/jpeg\"></div>\n\t\t\t\t<div control-text [control]=\"controls.latitude\" label=\"Latitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.longitude\" label=\"Longitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.zoom\" label=\"Zoom\" [disabled]=\"true\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"view.type.name == 'panorama'\">\n\t\t\t\t<div control-checkbox [control]=\"controls.hidden\" label=\"Hide from menu\"></div>\n\t\t\t\t<div control-asset [control]=\"controls.asset\" label=\"Image\" accept=\"image/jpeg, video/mp4\"></div>\n\t\t\t\t<div control-text [control]=\"controls.latitude\" label=\"Latitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.longitude\" label=\"Longitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.zoom\" label=\"Zoom\" [disabled]=\"true\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"view.type.name == 'panorama-grid'\">\n\t\t\t\t<div control-checkbox [control]=\"controls.hidden\" label=\"Hide from menu\"></div>\n\t\t\t\t<div control-text [control]=\"controls.latitude\" label=\"Latitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.longitude\" label=\"Longitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.zoom\" label=\"Zoom\" [disabled]=\"true\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"view.type.name == 'model'\">\n\t\t\t\t<div control-checkbox [control]=\"controls.hidden\" label=\"Hide from menu\"></div>\n\t\t\t\t<div control-asset [control]=\"controls.asset\" label=\"Image\" accept=\"image/jpeg\"></div>\n\t\t\t\t<div control-text [control]=\"controls.latitude\" label=\"Latitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.longitude\" label=\"Longitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.zoom\" label=\"Zoom\" [disabled]=\"true\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"view.type.name != 'waiting-room' && flags.ar\">\n\t\t\t\t<div control-model [control]=\"controls.usdz\" label=\"AR IOS (.usdz)\" accept=\".usdz\"></div>\n\t\t\t\t<div control-model [control]=\"controls.gltf\" label=\"AR Android (.glb)\" accept=\".glb\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"group--cta\">\n\t\t\t\t<button type=\"submit\" class=\"btn--update\" [class]=\"{ busy: busy }\">\n\t\t\t\t\t<span [innerHTML]=\"'update' | label\"></span>\n\t\t\t\t</button>\n\t\t\t\t<button type=\"button\" class=\"btn--remove\" *if=\"view.type.name != 'waiting-room'\" (click)=\"onRemove($event)\">\n\t\t\t\t\t<span [innerHTML]=\"'remove' | label\"></span>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</form>\n\t"
};var factories = [AsideComponent, CurvedPlaneModalComponent, EditorComponent, ItemModelModalComponent, MenuBuilderComponent, ModelModalComponent, NavModalComponent, PanoramaModalComponent, PanoramaGridModalComponent, PlaneModalComponent, RemoveModalComponent, ToastOutletComponent, UpdateViewItemComponent, UpdateViewTileComponent, UpdateViewComponent];
var pipes = [];
var EditorModule = /*#__PURE__*/function (_Module) {
  _inheritsLoose(EditorModule, _Module);

  function EditorModule() {
    return _Module.apply(this, arguments) || this;
  }

  return EditorModule;
}(rxcomp.Module);
EditorModule.meta = {
  imports: [],
  declarations: [].concat(factories, pipes),
  exports: [].concat(factories, pipes)
};var UploadItem = function UploadItem(file) {
  this.file = file;
  this.name = file.name;
  this.type = assetTypeFromPath(file.name);
  this.progress = 0;
  this.size = file.size;
  this.uploading = false;
  this.paused = false;
  this.success = false;
  this.complete = false;
  this.error = null;
  this.preview = null;
};
var UploadEvent = function UploadEvent(options) {
  if (options) {
    Object.assign(this, options);
  }
};
var UploadStartEvent = /*#__PURE__*/function (_UploadEvent) {
  _inheritsLoose(UploadStartEvent, _UploadEvent);

  function UploadStartEvent() {
    return _UploadEvent.apply(this, arguments) || this;
  }

  return UploadStartEvent;
}(UploadEvent);
var UploadCompleteEvent = /*#__PURE__*/function (_UploadEvent2) {
  _inheritsLoose(UploadCompleteEvent, _UploadEvent2);

  function UploadCompleteEvent() {
    return _UploadEvent2.apply(this, arguments) || this;
  }

  return UploadCompleteEvent;
}(UploadEvent);
var UploadAssetEvent = /*#__PURE__*/function (_UploadEvent3) {
  _inheritsLoose(UploadAssetEvent, _UploadEvent3);

  function UploadAssetEvent() {
    return _UploadEvent3.apply(this, arguments) || this;
  }

  return UploadAssetEvent;
}(UploadEvent);
var UploadService = /*#__PURE__*/function () {
  function UploadService() {
    this.concurrent$ = new rxjs.BehaviorSubject(0);
    this.items$ = new rxjs.BehaviorSubject([]);
    this.events$ = new rxjs.ReplaySubject(1);
  }

  var _proto = UploadService.prototype;

  _proto.upload$ = function upload$() {
    var _this = this;

    var items = this.items$.getValue();
    var uploadItems = items.filter(function (item) {
      return !item.uploading;
    });
    return rxjs.combineLatest(uploadItems.map(function (item) {
      return _this.uploadItem$(item);
    }));
  };

  _proto.uploadItem$ = function uploadItem$(item) {
    var _this2 = this;

    // max 4 concurrent upload
    item.uploading = true;
    this.events$.next(new UploadStartEvent({
      item: item
    }));
    var files = [item.file];
    return rxjs.of(files).pipe(operators.delayWhen(function () {
      return _this2.concurrent$.pipe(operators.filter(function (x) {
        return x < 4;
      }));
    }), operators.tap(function () {
      return _this2.concurrent$.next(_this2.concurrent$.getValue() + 1);
    }), operators.first(), operators.switchMap(function (files) {
      return AssetService.upload$(files);
    }), operators.switchMap(function (uploads) {
      var upload = uploads[0];
      item.uploading = false;
      item.complete = true;
      var asset = Asset.fromUrl(upload.url);

      _this2.events$.next(new UploadCompleteEvent({
        item: item,
        asset: asset
      }));

      return AssetService.assetCreate$(asset).pipe(operators.tap(function (asset) {
        _this2.remove(item);

        _this2.events$.next(new UploadAssetEvent({
          item: item,
          asset: asset
        }));

        _this2.concurrent$.next(_this2.concurrent$.getValue() - 1);
      }));
    }));
    /*
    // concurrent upload
    return AssetService.upload$([item.file]).pipe(
    	// tap(upload => console.log('upload', upload)),
    	switchMap((uploads) => {
    		const upload = uploads[0];
    		item.uploading = false;
    		item.complete = true;
    		const asset = Asset.fromUrl(upload.url);
    		this.events$.next(new UploadCompleteEvent({ item, asset }));
    		return AssetService.assetCreate$(asset).pipe(
    			tap(asset => {
    				this.remove(item);
    				this.events$.next(new UploadAssetEvent({ item, asset }));
    			}),
    		);
    	}),
    );
    */
  };

  _proto.addItems = function addItems(files) {
    if (files && files.length) {
      // console.log('addItems', files);
      var items = this.items$.getValue();
      var newItems = Array.from(files).map(function (file) {
        return new UploadItem(file);
      });
      items.push.apply(items, newItems);
      this.items$.next(items);
    }
  };

  _proto.remove = function remove(item) {
    var items = this.items$.getValue();
    var index = items.indexOf(item);

    if (index !== -1) {
      items.splice(index, 1);
    }

    this.items$.next(items);
  };

  _proto.removeAll = function removeAll() {
    // !!!
    this.items$.next([]);
  };

  _proto.drop$ = function drop$(input, dropArea) {
    var _this3 = this;

    if (rxcomp.isPlatformBrowser && input) {
      dropArea = dropArea || input;
      var body = document.querySelector('body');
      return rxjs.merge(rxjs.fromEvent(body, 'drop'), rxjs.fromEvent(body, 'dragover')).pipe(operators.map(function (event) {
        // console.log('UploadService.drop$', event);
        event.preventDefault();

        if (event.target === dropArea) {
          _this3.addItems(event.dataTransfer.files);
        }

        return _this3.items$;
      }));
    } else {
      return rxjs.EMPTY;
    }
  };

  _proto.change$ = function change$(input) {
    var _this4 = this;

    if (rxcomp.isPlatformBrowser && input) {
      return rxjs.fromEvent(input, 'change').pipe(operators.switchMap(function (event) {
        if (input.files.length) {
          _this4.addItems(input.files);

          input.value = '';
        }

        return _this4.items$;
      }));
    } else {
      return rxjs.EMPTY;
    }
  };

  _proto.files$ = function files$(files) {
    var _this5 = this;

    return rxjs.combineLatest(Array.from(files).map(function (file, i) {
      return _this5.file$(file, i);
    }));
  };

  _proto.file$ = function file$(file, i) {
    var _this6 = this;

    return this.read$(file, i).pipe(operators.switchMap(function () {
      return _this6.uploadFile$(file);
    }));
  }
  /*
  static files$(files) {
  	const fileArray = Array.from(files);
  	this.previews = fileArray.map(() => null);
  	const uploads$ = fileArray.map((file, i) => this.read$(file, i).pipe(
  		switchMap(() => this.uploadFile$(file)),
  	));
  	return combineLatest(uploads$);
  }
  */
  ;

  _proto.read$ = function read$(file, i) {
    var _this7 = this;

    var reader = new FileReader();
    var reader$ = rxjs.fromEvent(reader, 'load').pipe(operators.tap(function (event) {
      var blob = event.target.result;

      _this7.resize(blob, function (resized) {
        _this7.previews[i] = resized; // console.log('resized', resized);

        _this7.pushChanges();
      });
    }));
    reader.readAsDataURL(file);
    return reader$;
  };

  _proto.uploadFile$ = function uploadFile$(file) {
    return AssetService.upload$([file]).pipe( // tap(upload => console.log('upload', upload)),
    operators.switchMap(function (uploads) {
      var upload = uploads[0];
      /*
      id: 1601303293569
      type: "image/jpeg"
      file: "1601303293569_ambiente1_x0_y2.jpg"
      originalFileName: "ambiente1_x0_y2.jpg"
      url: "/uploads/1601303293569_ambiente1_x0_y2.jpg"
      */

      var asset = Asset.fromUrl(upload.url);
      return AssetService.assetCreate$(asset);
    }));
  };

  _proto.resize = function resize(blob, callback) {
    if (typeof callback === 'function') {
      var img = document.createElement('img');

      img.onload = function () {
        var MAX_WIDTH = 320;
        var MAX_HEIGHT = 240;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var width = img.width;
        var height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        callback(dataUrl);
      };

      img.src = blob;
    }
  };

  _proto.supported = function supported() {
    return supportFileAPI() && supportAjaxUploadProgressEvents() && supportFormData();

    function supportFileAPI() {
      var input = document.createElement('input');
      input.type = 'file';
      return 'files' in input;
    }

    function supportAjaxUploadProgressEvents() {
      var xhr = new XMLHttpRequest();
      return !!(xhr && 'upload' in xhr && 'onprogress' in xhr.upload);
    }

    function supportFormData() {
      return !!window.FormData;
    }
  };

  return UploadService;
}();var ControlAssetsComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlAssetsComponent, _ControlComponent);

  function ControlAssetsComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlAssetsComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.label = this.label || 'label';
    this.accept = this.accept || 'image/png, image/jpeg';
    this.multiple = this.multiple !== false;
    this.items = [];
    this.assets = this.control.value || [];
    this.hasFiles = false;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var input = node.querySelector('input');
    input.setAttribute('accept', this.accept);
    var dropArea = node.querySelector('.upload-drop');
    var service = this.service = new UploadService();
    service.drop$(input, dropArea).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (items) {
      // console.log('ControlAssetComponent.drop$', items);
      _this.items = items;

      _this.pushChanges();
    });
    service.change$(input).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (items) {
      // console.log('ControlAssetComponent.change$', items);
      _this.items = items;

      _this.pushChanges();
    });
    service.events$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      // console.log('ControlAssetComponent.events$', event);
      if (event instanceof UploadAssetEvent) {
        _this.assets.push(event.asset);

        _this.control.value = _this.assets;
      }

      _this.items = _this.items;

      _this.pushChanges(); // this.control.value = assets;

    });
  };

  _proto.onUpload = function onUpload() {
    // console.log('ControlAssetsComponent.onUpload');
    this.service.upload$().pipe(operators.first()).subscribe();
  };

  _proto.onCancel = function onCancel() {
    // console.log('ControlAssetsComponent.onCancel');
    this.service.removeAll();
  };

  _proto.onItemPause = function onItemPause(item) {// console.log('ControlAssetsComponent.onPause', item);
  };

  _proto.onItemResume = function onItemResume(item) {// console.log('ControlAssetsComponent.onResume', item);
  };

  _proto.onItemCancel = function onItemCancel(item) {// console.log('ControlAssetsComponent.onCancel', item);
  };

  _proto.onItemRemove = function onItemRemove(item) {
    // console.log('ControlAssetsComponent.onRemove', item);
    this.service.remove(item);
  };

  _createClass(ControlAssetsComponent, [{
    key: "items",
    get: function get() {
      return this.items_;
    },
    set: function set(items) {
      this.items_ = items;
      this.uploadCount = items.reduce(function (p, c) {
        return p + (c.uploading || c.completed ? 0 : 1);
      }, 0);
    }
  }]);

  return ControlAssetsComponent;
}(ControlComponent);
ControlAssetsComponent.meta = {
  selector: '[control-assets]',
  inputs: ['control', 'label', 'multiple'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form\" [class]=\"{ required: control.validators.length }\">\n\t\t\t<div class=\"control--head\">\n\t\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t\t</div>\n\t\t\t<div class=\"listing--assets\">\n\t\t\t\t<div class=\"listing__item\" *for=\"let item of assets\">\n\t\t\t\t\t<div class=\"upload-item\">\n\t\t\t\t\t\t<div class=\"picture\">\n\t\t\t\t\t\t\t<img [lazy]=\"item | asset\" [size]=\"{ width: 320, height: 240 }\" *if=\"item.type.name === 'image'\" />\n\t\t\t\t\t\t\t<video [src]=\"item | asset\" *if=\"item.type.name === 'video'\"></video>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"name\" [innerHTML]=\"item.file\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"listing__item\" *for=\"let item of items\">\n\t\t\t\t\t<div upload-item [item]=\"item\" (pause)=\"onItemPause($event)\" (resume)=\"onItemResume($event)\" (cancel)=\"onItemCancel($event)\" (remove)=\"onItemRemove($event)\"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"group--cta\">\n\t\t\t\t<div class=\"btn--browse\">\n\t\t\t\t\t<span [innerHTML]=\"'browse' | label\"></span>\n\t\t\t\t\t<input type=\"file\" accept=\"image/jpeg\" multiple />\n\t\t\t\t</div>\n\t\t\t\t<div class=\"btn--upload\" (click)=\"onUpload()\" *if=\"uploadCount > 0\" [innerHTML]=\"'upload' | label\"></div>\n\t\t\t\t<div class=\"btn--cancel\" (click)=\"onCancel()\" *if=\"uploadCount > 0\" [innerHTML]=\"'cancel' | label\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"upload-drop\">\n    \t\t\t<span [innerHTML]=\"'drag_and_drop_images' | label\"></span>\n\t\t\t</div>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var ControlCheckboxComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlCheckboxComponent, _ControlComponent);

  function ControlCheckboxComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlCheckboxComponent.prototype;

  _proto.onInit = function onInit() {
    this.label = this.label || 'label';
  };

  return ControlCheckboxComponent;
}(ControlComponent);
ControlCheckboxComponent.meta = {
  selector: '[control-checkbox]',
  inputs: ['control', 'label'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form--checkbox\" [class]=\"{ required: control.validators.length }\">\n\t\t\t<label>\n\t\t\t\t<input type=\"checkbox\" class=\"control--checkbox\" [formControl]=\"control\" [value]=\"true\" />\n\t\t\t\t<span [innerHTML]=\"label | html\"></span>\n\t\t\t</label>\n\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var KeyboardService = /*#__PURE__*/function () {
  function KeyboardService() {}

  KeyboardService.keydown$ = function keydown$() {
    if (!this.keydown$_) {
      this.keydown$_ = rxjs.fromEvent(window, 'keydown').pipe(operators.shareReplay(1));
    }

    return this.keydown$_;
  };

  KeyboardService.keyup$ = function keyup$() {
    if (!this.keyup$_) {
      this.keyup$_ = rxjs.fromEvent(window, 'keyup').pipe(operators.shareReplay(1));
    }

    return this.keyup$_;
  };

  KeyboardService.keys$ = function keys$() {
    var _this = this;

    if (!this.keys$_) {
      this.keys$_ = rxjs.merge(this.keydown$(), this.keyup$()).pipe(operators.map(function (event) {
        var keys = _this.keys;

        if (event.type === 'keydown') {
          keys[event.key] = true;
        } else {
          delete keys[event.key];
        }

        return _this.keys;
      }), operators.startWith(this.keys), operators.shareReplay(1));
    }

    return this.keys$_;
  };

  KeyboardService.key$ = function key$() {
    if (!this.key$_) {
      var regexp = /\w/;
      this.key$_ = this.keydown$().pipe(operators.filter(function (event) {
        return event.key && event.key.match(regexp);
      }), operators.map(function (event) {
        return event.key;
      }), operators.shareReplay(1));
    }

    return this.key$_;
  };

  KeyboardService.typing$ = function typing$() {
    if (!this.typing$_) {
      var typing = '',
          to;
      this.typing$_ = this.key$().pipe(operators.map(function (key) {
        if (to) {
          clearTimeout(to);
        }

        typing += key;
        to = setTimeout(function () {
          typing = '';
        }, 1500);
        return typing;
      }), operators.shareReplay(1));
    }

    return this.typing$_;
  };

  return KeyboardService;
}();

_defineProperty(KeyboardService, "keys", {});var ControlCustomSelectComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlCustomSelectComponent, _ControlComponent);

  function ControlCustomSelectComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlCustomSelectComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.label = this.label || 'label';
    this.dropped = false;
    this.dropdownId = DropdownDirective.nextId();
    KeyboardService.typing$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (word) {
      _this.scrollToWord(word);
    });
    /*
    KeyboardService.key$().pipe(
    	takeUntil(this.unsubscribe$)
    ).subscribe(key => {
    	this.scrollToKey(key);
    });
    */
  };

  _proto.scrollToWord = function scrollToWord(word) {
    // console.log('ControlCustomSelectComponent.scrollToWord', word);
    var items = this.control.options || [];
    var index = -1;

    for (var i = 0; i < items.length; i++) {
      var x = items[i];

      if (x.name.toLowerCase().indexOf(word.toLowerCase()) === 0) {
        // console.log(word, x.name);
        index = i;
        break;
      }
    }

    if (index !== -1) {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      var dropdown = node.querySelector('.dropdown');
      var navDropdown = node.querySelector('.nav--dropdown');
      var item = navDropdown.children[index];
      dropdown.scrollTo(0, item.offsetTop);
    }
  };

  _proto.setOption = function setOption(item) {
    // console.log('setOption', item, this.isMultiple);
    var value;

    if (this.isMultiple) {
      var _value = this.control.value || [];

      var index = _value.indexOf(item.id);

      if (index !== -1) {
        // if (value.length > 1) {
        _value.splice(index, 1); // }

      } else {
        _value.push(item.id);
      }

      _value = (_readOnlyError("value"), _value.length ? _value.slice() : null);
    } else {
      value = item.id; // DropdownDirective.dropdown$.next(null);
    }

    this.control.value = value;
    this.change.next(value);
  };

  _proto.hasOption = function hasOption(item) {
    if (this.isMultiple) {
      var values = this.control.value || [];
      return values.indexOf(item.id) !== -1;
    } else {
      return this.control.value === item.id;
    }
  };

  _proto.getLabel = function getLabel() {
    var value = this.control.value;
    var items = this.control.options || [];

    if (this.isMultiple) {
      value = value || [];

      if (value.length) {
        return value.map(function (v) {
          var item = items.find(function (x) {
            return x.id === v || x.name === v;
          });
          return item ? item.name : '';
        }).join(', ');
      } else {
        return LabelPipe.transform('select');
      }
    } else {
      var item = items.find(function (x) {
        return x.id === value || x.name === value;
      });

      if (item) {
        return item.name;
      } else {
        return LabelPipe.transform('select');
      }
    }
  };

  _proto.onDropped = function onDropped($event) {
    // console.log('ControlCustomSelectComponent.onDropped', id);
    if (this.dropped && $event === null) {
      this.control.touched = true;
    }

    this.dropped = $event === this.dropdownId;
  };

  _createClass(ControlCustomSelectComponent, [{
    key: "isMultiple",
    get: function get() {
      return this.multiple && this.multiple !== false && this.multiple !== 'false';
    }
  }]);

  return ControlCustomSelectComponent;
}(ControlComponent);
ControlCustomSelectComponent.meta = {
  selector: '[control-custom-select]',
  outputs: ['change'],
  inputs: ['control', 'label', 'multiple'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form--select\" [class]=\"{ required: control.validators.length, multiple: isMultiple }\" [dropdown]=\"dropdownId\" (dropped)=\"onDropped($event)\">\n\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t<span class=\"control--custom-select\" [innerHTML]=\"getLabel()\"></span>\n\t\t\t<svg class=\"icon--caret-down\"><use xlink:href=\"#caret-down\"></use></svg>\n\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t\t<div class=\"dropdown\" [dropdown-item]=\"dropdownId\">\n\t\t\t<div class=\"category\" [innerHTML]=\"label\"></div>\n\t\t\t<ul class=\"nav--dropdown\" [class]=\"{ multiple: isMultiple }\">\n\t\t\t\t<li (click)=\"setOption(item)\" [class]=\"{ empty: item.id == null }\" *for=\"let item of control.options\">\n\t\t\t\t\t<span [class]=\"{ active: hasOption(item) }\" [innerHTML]=\"item.name\"></span>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\n\t"
};var ControlLinkComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlLinkComponent, _ControlComponent);

  function ControlLinkComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlLinkComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.label = this.label || 'label';
    this.disabled = this.disabled || false;

    var _getContext = getContext(this),
        node = _getContext.node;

    var input = this.input = node.querySelector('input');
    merge(fromEvent(input, 'input')).pipe(takeUntil(this.unsubscribe$)).subscribe(function (event) {
      return _this.onInputDidChange(event);
    });
    fromEvent(input, 'blur').pipe(takeUntil(this.unsubscribe$)).subscribe(function (event) {
      return _this.onInputDidBlur(event);
    });
  };

  _proto.onInputDidChange = function onInputDidChange(event) {
    console.log('ControlLinkComponent.onInputDidChange', event.target.value); // event.target.value = event.target.value.replace(/[^\d|\.]/g, '');

    /*
    const value = parseFloat(event.target.value);
    if (this.value !== value) {
    	if (value !== NaN) {
    		this.value = value;
    		this.update.next(this.value);
    	}
    }
    */
  };

  _proto.onInputDidBlur = function onInputDidBlur(event) {
    console.log('ControlLinkComponent.onInputDidBlur', event.target.value);
    this.control.touched = true;
    this.value = this.input.value;
  };

  return ControlLinkComponent;
}(ControlComponent);
ControlLinkComponent.meta = {
  selector: '[control-link]',
  inputs: ['control', 'label', 'disabled'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form\" [class]=\"{ required: control.validators.length, disabled: disabled }\">\n\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t<input type=\"text\" class=\"control--text\" [formControl]=\"control\" [placeholder]=\"label\" [disabled]=\"disabled\" />\n\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var ControlModelComponent = /*#__PURE__*/function (_ControlAssetComponen) {
  _inheritsLoose(ControlModelComponent, _ControlAssetComponen);

  function ControlModelComponent() {
    return _ControlAssetComponen.apply(this, arguments) || this;
  }

  var _proto = ControlModelComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.label = this.label || 'label';
    this.disabled = this.disabled || false;
    this.accept = this.accept || '.glb';

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var input = this.input = node.querySelector('input');
    input.setAttribute('accept', this.accept);
    /*
    this.click$(input).pipe(
    	takeUntil(this.unsubscribe$)
    ).subscribe();
    */

    this.change$(input).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (assets) {
      console.log('ControlModelComponent.change$', assets);
      _this.control.value = assets[0];
    });
  };

  _proto.onRemove = function onRemove(event) {
    this.control.value = null;
    this.input.value = null;
  }
  /*
  click$(input) {
  	if (isPlatformBrowser && input) {
  		return fromEvent(input, 'click').pipe(
  			tap(() => input.value = null),
  		);
  	} else {
  		return EMPTY;
  	}
  }
  */
  ;

  _proto.read$ = function read$(file, i) {
    return rxjs.of(file);
  };

  return ControlModelComponent;
}(ControlAssetComponent);
ControlModelComponent.meta = {
  selector: '[control-model]',
  inputs: ['control', 'label', 'disabled', 'accept'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form\" [class]=\"{ required: control.validators.length, disabled: disabled }\">\n\t\t\t<div class=\"control--head\">\n\t\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t\t</div>\n\t\t\t<div class=\"group--model\">\n\t\t\t\t<div class=\"file-name\" *if=\"!control.value\" [innerHTML]=\"'select_file' | label\"></div>\n\t\t\t\t<div class=\"file-name\" *if=\"control.value\" [innerHTML]=\"control.value.file\"></div>\n\t\t\t\t<div class=\"btn--upload\"><input type=\"file\"><span [innerHTML]=\"'browse' | label\"></span></div>\n\t\t\t\t<div class=\"btn--remove\" *if=\"control.value\" (click)=\"onRemove($event)\"><span [innerHTML]=\"'remove' | label\"></span></div>\n\t\t\t</div>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var ControlNumberComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlNumberComponent, _ControlComponent);

  function ControlNumberComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlNumberComponent.prototype;

  _proto.onInit = function onInit() {
    this.label = this.label || 'label';
    this.precision = this.precision || 3;
    this.increment = this.increment || 1 / Math.pow(10, this.precision);
    this.disabled = this.disabled || false;
  };

  _proto.updateValue = function updateValue(value) {
    this.control.value = value;
  };

  return ControlNumberComponent;
}(ControlComponent);
ControlNumberComponent.meta = {
  selector: '[control-number]',
  inputs: ['control', 'label', 'precision', 'increment', 'disabled'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form\" [class]=\"{ required: control.validators.length }\">\n\t\t\t<div class=\"control--head\">\n\t\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t\t</div>\n\t\t\t<div class=\"control--content control--number\">\n\t\t\t\t<input-value label=\"\" [precision]=\"precision\" [increment]=\"increment\" [disabled]=\"disabled\" [value]=\"control.value\" (update)=\"updateValue($event)\"></input-value>\n\t\t\t</div>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var ControlPasswordComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlPasswordComponent, _ControlComponent);

  function ControlPasswordComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlPasswordComponent.prototype;

  _proto.onInit = function onInit() {
    this.label = this.label || 'label';
  };

  return ControlPasswordComponent;
}(ControlComponent);
ControlPasswordComponent.meta = {
  selector: '[control-password]',
  inputs: ['control', 'label'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form\" [class]=\"{ required: control.validators.length }\">\n\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t<input type=\"password\" class=\"control--text\" [formControl]=\"control\" [placeholder]=\"label\" />\n\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var ControlSelectComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlSelectComponent, _ControlComponent);

  function ControlSelectComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlSelectComponent.prototype;

  _proto.onInit = function onInit() {
    this.label = this.label || 'label';
  };

  return ControlSelectComponent;
}(ControlComponent);
ControlSelectComponent.meta = {
  selector: '[control-select]',
  inputs: ['control', 'label'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form--select\" [class]=\"{ required: control.validators.length }\">\n\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t<select class=\"control--select\" [formControl]=\"control\" required>\n\t\t\t\t<option [value]=\"null\" [innerHTML]=\"'select' | label\"></option>\n\t\t\t\t<option [value]=\"item.id\" *for=\"let item of control.options\" [innerHTML]=\"item.name\"></option>\n\t\t\t</select>\n\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t\t<svg class=\"icon--caret-down\"><use xlink:href=\"#caret-down\"></use></svg>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var ControlTextComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlTextComponent, _ControlComponent);

  function ControlTextComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlTextComponent.prototype;

  _proto.onInit = function onInit() {
    this.label = this.label || 'label';
    this.disabled = this.disabled || false;
  };

  return ControlTextComponent;
}(ControlComponent);
ControlTextComponent.meta = {
  selector: '[control-text]',
  inputs: ['control', 'label', 'disabled'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form\" [class]=\"{ required: control.validators.length, disabled: disabled }\">\n\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t\t<input type=\"text\" class=\"control--text\" [formControl]=\"control\" [placeholder]=\"label\" [disabled]=\"disabled\" />\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var ControlTextareaComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlTextareaComponent, _ControlComponent);

  function ControlTextareaComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlTextareaComponent.prototype;

  _proto.onInit = function onInit() {
    this.label = this.label || 'label';
    this.disabled = this.disabled || false;
  };

  return ControlTextareaComponent;
}(ControlComponent);
ControlTextareaComponent.meta = {
  selector: '[control-textarea]',
  inputs: ['control', 'label', 'disabled'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form--textarea\" [class]=\"{ required: control.validators.length, disabled: disabled }\">\n\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t<textarea class=\"control--text\" [formControl]=\"control\" [placeholder]=\"label\" [innerHTML]=\"label\" rows=\"6\" [disabled]=\"disabled\"></textarea>\n\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var ControlVectorComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlVectorComponent, _ControlComponent);

  function ControlVectorComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlVectorComponent.prototype;

  _proto.onInit = function onInit() {
    this.label = this.label || 'label';
    this.precision = this.precision || 3;
    this.increment = this.increment || 1 / Math.pow(10, this.precision);
    this.disabled = this.disabled || false;
  };

  _proto.updateValue = function updateValue(index, value) {
    var values = this.control.value;
    values[index] = value;
    this.control.value = values.slice();
  };

  return ControlVectorComponent;
}(ControlComponent);
ControlVectorComponent.meta = {
  selector: '[control-vector]',
  inputs: ['control', 'label', 'precision', 'increment', 'disabled'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form\" [class]=\"{ required: control.validators.length }\">\n\t\t\t<div class=\"control--head\">\n\t\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t\t</div>\n\t\t\t<div class=\"control--content control--vector\">\n\t\t\t\t<input-value label=\"x\" [precision]=\"precision\" [increment]=\"increment\" [disabled]=\"disabled\" [value]=\"control.value[0]\" (update)=\"updateValue(0, $event)\"></input-value>\n\t\t\t\t<input-value label=\"y\" [precision]=\"precision\" [increment]=\"increment\" [disabled]=\"disabled\" [value]=\"control.value[1]\" (update)=\"updateValue(1, $event)\"></input-value>\n\t\t\t\t<input-value label=\"z\" [precision]=\"precision\" [increment]=\"increment\" [disabled]=\"disabled\" [value]=\"control.value[2]\" (update)=\"updateValue(2, $event)\"></input-value>\n\t\t\t</div>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
};var DisabledDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(DisabledDirective, _Directive);

  function DisabledDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = DisabledDirective.prototype;

  _proto.onChanges = function onChanges() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node; // console.log('DisabledDirective.onChanges', this.disabled);


    if (this.disabled === true) {
      node.disabled = this.disabled;
      node.setAttribute('disabled', this.disabled);
    } else {
      delete node.disabled;
      node.removeAttribute('disabled');
    }
  };

  return DisabledDirective;
}(rxcomp.Directive);
DisabledDirective.meta = {
  selector: 'input[disabled],textarea[disabled]',
  inputs: ['disabled']
};var ErrorsComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ErrorsComponent, _ControlComponent);

  function ErrorsComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ErrorsComponent.prototype;

  _proto.getLabel = function getLabel(key, value) {
    var label = LabelPipe.transform("error_" + key);
    return label;
  };

  return ErrorsComponent;
}(ControlComponent);
ErrorsComponent.meta = {
  selector: 'errors-component',
  inputs: ['control'],
  template:
  /* html */
  "\n\t<div class=\"inner\" [style]=\"{ display: control.invalid && control.touched ? 'block' : 'none' }\">\n\t\t<div class=\"error\" *for=\"let [key, value] of control.errors\">\n\t\t\t<span [innerHTML]=\"getLabel(key, value)\"></span>\n\t\t\t<!-- <span class=\"key\" [innerHTML]=\"key\"></span> <span class=\"value\" [innerHTML]=\"value | json\"></span> -->\n\t\t</div>\n\t</div>\n\t"
};var InputValueComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(InputValueComponent, _Component);

  function InputValueComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = InputValueComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.label = this.label || 'label';
    this.value = this.value || 0;
    this.precision = this.precision || 3;
    this.increment = this.increment || 1 / Math.pow(10, this.precision);
    this.disabled = this.disabled || false;
    this.increment$('.btn--more', 1).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      // console.log('InputValueComponent.increment$', event);
      _this.value += event;

      _this.update.next(_this.value);

      _this.pushChanges();
    });
    this.increment$('.btn--less', -1).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      // console.log('InputValueComponent.increment$', event);
      _this.value += event;

      _this.update.next(_this.value);

      _this.pushChanges();
    });

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var input = this.input = node.querySelector('input'); // fromEvent(input, 'change')

    rxjs.merge(rxjs.fromEvent(input, 'input')).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      return _this.onInputDidChange(event);
    });
    rxjs.fromEvent(input, 'blur').pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      return _this.onInputDidBlur(event);
    }); // fromEvent(node, 'focus').pipe(takeUntil(this.unsubscribe$)).subscribe(event => this.onFocus(event));
  };

  _proto.onInputDidChange = function onInputDidChange(event) {
    // const node = getContext(this).node;
    // const value = node.value === '' ? null : node.value;
    event.target.value = event.target.value.replace(/[^\d|\.]/g, ''); // console.log('InputValueComponent.onInputDidChange', event.target.value);

    /*
    const value = parseFloat(event.target.value);
    if (this.value !== value) {
    	if (value !== NaN) {
    		this.value = value;
    		this.update.next(this.value);
    	}
    }
    */
  };

  _proto.onInputDidBlur = function onInputDidBlur(event) {
    // this.control.touched = true;
    // console.log('InputValueComponent.onInputDidBlur', event.target.value);
    var value = parseFloat(this.input.value);

    if (this.value !== value) {
      if (value !== NaN) {
        this.value = value;
        this.update.next(this.value);
      } else {
        this.input.value = this.getValue();
      }
    }
  };

  _proto.increment$ = function increment$(selector, sign) {
    var _this2 = this;

    var _getContext2 = rxcomp.getContext(this),
        node = _getContext2.node;

    var element = node.querySelector(selector);
    var m, increment;
    return rxjs.race(rxjs.fromEvent(element, 'mousedown'), rxjs.fromEvent(element, 'touchstart')).pipe(operators.tap(function () {
      increment = _this2.increment;
      m = 32;
    }), operators.switchMap(function (e) {
      return rxjs.interval(30).pipe(operators.filter(function (i) {
        return i % m === 0;
      }), operators.map(function () {
        var i = increment * sign; // increment = Math.min(this.increment * 100, increment * 2);

        m = Math.max(1, Math.floor(m * 0.85));
        return i;
      }), // startWith(increment * sign),
      operators.takeUntil(rxjs.race(rxjs.fromEvent(element, 'mouseup'), rxjs.fromEvent(element, 'touchend'))));
    }));
  };

  _proto.getValue = function getValue() {
    return this.value.toFixed(this.precision);
  };

  _proto.setValue = function setValue(sign) {
    this.value += this.increment * sign;
    this.update.next(this.value);
    this.pushChanges();
  };

  return InputValueComponent;
}(rxcomp.Component);
InputValueComponent.meta = {
  selector: 'input-value',
  outputs: ['update'],
  inputs: ['value', 'label', 'precision', 'increment', 'disabled'],
  template:
  /* html */
  "\n\t\t<div class=\"group--control\" [class]=\"{ disabled: disabled }\">\n\t\t\t<input type=\"text\" class=\"control--text\" [placeholder]=\"label\" [value]=\"getValue()\" [disabled]=\"disabled\" />\n\t\t\t<div class=\"control--trigger\">\n\t\t\t\t<div class=\"btn--more\" (click)=\"setValue(1)\">+</div>\n\t\t\t\t<div class=\"btn--less\" (click)=\"setValue(-1)\">-</div>\n\t\t\t</div>\n\t\t</div>\n\t"
};var TestComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(TestComponent, _Component);

  function TestComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = TestComponent.prototype;

  _proto.onInit = function onInit() {
    this.env = ENV;
  };

  _proto.onTest = function onTest(event) {
    this.test.next(event);
  };

  _proto.onReset = function onReset(event) {
    this.reset.next(event);
  };

  return TestComponent;
}(rxcomp.Component);
TestComponent.meta = {
  selector: 'test-component',
  inputs: ['form'],
  outputs: ['test', 'reset'],
  template:
  /* html */
  "\n\t<div class=\"group--form--results\" *if=\"env.DEVELOPMENT\">\n\t\t<code [innerHTML]=\"form.value | json\"></code>\n\t\t<button type=\"button\" class=\"btn--mode\" (click)=\"onTest($event)\"><span>test</span></button>\n\t\t<button type=\"button\" class=\"btn--mode\" (click)=\"onReset($event)\"><span>reset</span></button>\n\t</div>\n\t"
};var ValueDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(ValueDirective, _Directive);

  function ValueDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = ValueDirective.prototype;

  _proto.onChanges = function onChanges(changes) {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node; // console.log('ValueDirective.onChanges', this.value);


    node.value = this.value;
    node.setAttribute('value', this.value);
  };

  return ValueDirective;
}(rxcomp.Directive);
ValueDirective.meta = {
  selector: '[value]',
  inputs: ['value']
};/*
['quot', 'amp', 'apos', 'lt', 'gt', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'AElig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'amp', 'bull', 'deg', 'infin', 'permil', 'sdot', 'plusmn', 'dagger', 'mdash', 'not', 'micro', 'perp', 'par', 'euro', 'pound', 'yen', 'cent', 'copy', 'reg', 'trade', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega'];
['"', '&', ''', '<', '>', ' ', '¡', '¢', '£', '¤', '¥', '¦', '§', '¨', '©', 'ª', '«', '¬', '­', '®', '¯', '°', '±', '²', '³', '´', 'µ', '¶', '·', '¸', '¹', 'º', '»', '¼', '½', '¾', '¿', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', '×', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'Þ', 'ß', 'à', 'á', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', '÷', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'þ', 'ÿ', '&', '•', '°', '∞', '‰', '⋅', '±', '†', '—', '¬', 'µ', '⊥', '∥', '€', '£', '¥', '¢', '©', '®', '™', 'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω'];
*/

var HtmlPipe = /*#__PURE__*/function (_Pipe) {
  _inheritsLoose(HtmlPipe, _Pipe);

  function HtmlPipe() {
    return _Pipe.apply(this, arguments) || this;
  }

  HtmlPipe.transform = function transform(value) {
    if (value) {
      value = value.replace(/&#(\d+);/g, function (m, n) {
        return String.fromCharCode(parseInt(n));
      });
      var escapes = ['quot', 'amp', 'apos', 'lt', 'gt', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'AElig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'amp', 'bull', 'deg', 'infin', 'permil', 'sdot', 'plusmn', 'dagger', 'mdash', 'not', 'micro', 'perp', 'par', 'euro', 'pound', 'yen', 'cent', 'copy', 'reg', 'trade', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega'];
      var unescapes = ['"', '&', '\'', '<', '>', ' ', '¡', '¢', '£', '¤', '¥', '¦', '§', '¨', '©', 'ª', '«', '¬', '­', '®', '¯', '°', '±', '²', '³', '´', 'µ', '¶', '·', '¸', '¹', 'º', '»', '¼', '½', '¾', '¿', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', '×', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'Þ', 'ß', 'à', 'á', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', '÷', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'þ', 'ÿ', '&', '•', '°', '∞', '‰', '⋅', '±', '†', '—', '¬', 'µ', '⊥', '∥', '€', '£', '¥', '¢', '©', '®', '™', 'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω'];
      var rx = new RegExp("(&" + escapes.join(';)|(&') + ";)", 'g');
      value = value.replace(rx, function () {
        for (var i = 1; i < arguments.length; i++) {
          if (arguments[i]) {
            // console.log(arguments[i], unescapes[i - 1]);
            return unescapes[i - 1];
          }
        }
      }); // console.log(value);

      return value;
    }
  };

  return HtmlPipe;
}(rxcomp.Pipe);
HtmlPipe.meta = {
  name: 'html'
};var IdDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(IdDirective, _Directive);

  function IdDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = IdDirective.prototype;

  _proto.onChanges = function onChanges() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    node.setAttribute('id', this.id);
  };

  return IdDirective;
}(rxcomp.Directive);
IdDirective.meta = {
  selector: '[id]',
  inputs: ['id']
};var UID = 0;
var ImageServiceEvent = {
  Progress: 'progress',
  Complete: 'complete'
};

var ImageService = /*#__PURE__*/function () {
  function ImageService() {}

  ImageService.worker = function worker() {
    if (!this.worker_) {
      this.worker_ = new Worker(environment.worker);
    }

    return this.worker_;
  };

  ImageService.events$ = function events$(src, size) {
    if (!('Worker' in window) || this.isBlob(src) || this.isCors(src)) {
      return rxjs.of({
        type: ImageServiceEvent.Complete,
        data: src
      });
    }

    var id = ++UID;
    var worker = this.worker();
    worker.postMessage({
      src: src,
      id: id,
      size: size
    });
    return rxjs.fromEvent(worker, 'message').pipe(operators.map(function (event) {
      return event.data;
    }), operators.filter(function (event) {
      return event.src === src;
    }), operators.auditTime(100), operators.map(function (event) {
      // console.log('ImageService', event);
      if (event.type === ImageServiceEvent.Complete && event.data instanceof Blob) {
        var url = URL.createObjectURL(event.data);
        event.data = url;
      }
      return event;
    }), operators.takeWhile(function (event) {
      return event.type !== ImageServiceEvent.Complete;
    }, true), operators.finalize(function () {
      // console.log('ImageService.finalize', lastEvent);
      worker.postMessage({
        id: id
      });
      /*
      if (lastEvent && lastEvent.type === ImageServiceEvent.Complete && lastEvent.data) {
      	URL.revokeObjectURL(lastEvent.data);
      }
      */
    }));
  };

  ImageService.load$ = function load$(src, size) {
    return this.events$(src, size).pipe(operators.filter(function (event) {
      return event.type === ImageServiceEvent.Complete;
    }), operators.map(function (event) {
      return event.data;
    }));
  };

  ImageService.isCors = function isCors(src) {
    // !!! handle cors environment flag
    return false;
  };

  ImageService.isBlob = function isBlob(src) {
    return src.indexOf('blob:') === 0;
  };

  return ImageService;
}();var IntersectionService = /*#__PURE__*/function () {
  function IntersectionService() {}

  IntersectionService.observer = function observer() {
    var _this = this;

    if (!this.observer_) {
      this.readySubject_ = new rxjs.BehaviorSubject(false);
      this.observerSubject_ = new rxjs.Subject();
      this.observer_ = new IntersectionObserver(function (entries) {
        _this.observerSubject_.next(entries);
      });
    }

    return this.observer_;
  };

  IntersectionService.intersection$ = function intersection$(node) {
    if ('IntersectionObserver' in window) {
      var observer = this.observer();
      observer.observe(node);
      return this.observerSubject_.pipe( // tap(entries => console.log(entries.length)),
      operators.map(function (entries) {
        return entries.find(function (entry) {
          return entry.target === node;
        });
      }), // tap(entry => console.log('IntersectionService.intersection$', entry)),
      operators.filter(function (entry) {
        return entry !== undefined && entry.isIntersecting;
      }), // entry.intersectionRatio > 0
      operators.first(), operators.finalize(function () {
        return observer.unobserve(node);
      }));
    } else {
      return rxjs.of({
        target: node
      });
    }
    /*
    function observer() {
    	if ('IntersectionObserver' in window) {
    		return new IntersectionObserver(entries => {
    			entries.forEach(function(entry) {
    				if (entry.isIntersecting) {
    					entry.target.classList.add('appear');
    				}
    			})
    		});
    	} else {
    		return { observe: function(node) { node.classList.add('appear')}, unobserve: function() {} };
    	}
    }
    observer.observe(node);
    observer.unobserve(node);
    */

  };

  return IntersectionService;
}();var LazyCache = /*#__PURE__*/function () {
  function LazyCache() {}

  LazyCache.get = function get(src) {
    return this.cache[src];
  };

  LazyCache.set = function set(src, blob) {
    this.cache[src] = blob;
    var keys = Object.keys(this.cache);

    if (keys.length > 100) {
      this.remove(keys[0]);
    }
  };

  LazyCache.remove = function remove(src) {
    delete this.cache[src];
  };

  _createClass(LazyCache, null, [{
    key: "cache",
    get: function get() {
      if (!this.cache_) {
        this.cache_ = {};
      }

      return this.cache_;
    }
  }]);

  return LazyCache;
}();var LazyDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(LazyDirective, _Directive);

  function LazyDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = LazyDirective.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    node.classList.add('lazy');
    this.input$ = new rxjs.Subject().pipe(operators.distinctUntilChanged(), operators.switchMap(function (input) {
      var src = LazyCache.get(input);

      if (src) {
        return rxjs.of(src);
      }

      node.classList.remove('lazyed');
      return _this.lazy$(input);
    }), operators.takeUntil(this.unsubscribe$));
    this.input$.subscribe(function (src) {
      LazyCache.set(_this.lazy, src);
      node.setAttribute('src', src);
      node.classList.add('lazyed');
    });
  };

  _proto.onChanges = function onChanges() {
    this.input$.next(this.lazy);
  };

  _proto.lazy$ = function lazy$(input) {
    var _this2 = this;

    var _getContext2 = rxcomp.getContext(this),
        node = _getContext2.node;

    return IntersectionService.intersection$(node).pipe( // first(),
    operators.switchMap(function () {
      return ImageService.load$(input, _this2.size);
    }), operators.first() // takeUntil(this.unsubscribe$),
    );
  };

  return LazyDirective;
}(rxcomp.Directive);
LazyDirective.meta = {
  selector: '[lazy],[[lazy]]',
  inputs: ['lazy', 'size']
};var ModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ModalComponent, _Component);

  function ModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ModalComponent.prototype;

  _proto.onInit = function onInit() {
    var _getContext = rxcomp.getContext(this),
        parentInstance = _getContext.parentInstance;

    if (parentInstance instanceof ModalOutletComponent) {
      this.data = parentInstance.modal.data;
    }
  };

  _proto.close = function close() {
    ModalService.reject();
  };

  return ModalComponent;
}(rxcomp.Component);
ModalComponent.meta = {
  selector: '[modal]'
};var SvgIconStructure = /*#__PURE__*/function (_Structure) {
  _inheritsLoose(SvgIconStructure, _Structure);

  function SvgIconStructure() {
    return _Structure.apply(this, arguments) || this;
  }

  var _proto = SvgIconStructure.prototype;

  _proto.onInit = function onInit() {
    this.update();
  };

  _proto.onChanges = function onChanges() {
    this.update();
  };

  _proto.update = function update() {
    if (this.name_ !== this.name) {
      this.name_ = this.name;

      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      if (node.parentNode) {
        var _element$classList;

        var xmlns = 'http://www.w3.org/2000/svg';
        var element = document.createElementNS(xmlns, "svg");
        var w = this.width || 24;
        var h = this.height || 24;
        element.setAttribute('class', "icon--" + this.name); // element.setAttributeNS(null, 'width', w);
        // element.setAttributeNS(null, 'height', h);

        element.setAttributeNS(null, 'viewBox', "0 0 " + w + " " + h);
        element.innerHTML = "<use xlink:href=\"#" + this.name + "\"></use>";
        element.rxcompId = node.rxcompId;

        (_element$classList = element.classList).add.apply(_element$classList, node.classList);

        node.parentNode.replaceChild(element, node);
      }
    }
  };

  return SvgIconStructure;
}(rxcomp.Structure);
SvgIconStructure.meta = {
  selector: 'svg-icon',
  inputs: ['name', 'width', 'height']
};
/*
<svg class="copy" width="24" height="24" viewBox="0 0 24 24"><use xlink:href="#copy"></use></svg>
*/var TryInARComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(TryInARComponent, _Component);

  function TryInARComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = TryInARComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.platform = DeviceService.platform;
    this.missingAr = false;
    this.missingUsdz = false;
    this.missingGltf = false;
    var viewId = this.viewId = this.getViewId(); // console.log('TryInARComponent.viewId', viewId);

    if (viewId) {
      ViewService.viewById$(viewId).pipe(operators.first()).subscribe(function (view) {
        if (!view.ar) {
          _this.missingAr = true;

          _this.pushChanges();

          return;
        } // console.log('TryInARComponent.view', view);


        if (_this.platform === DevicePlatform.IOS) {
          var usdzSrc = _this.getUsdzSrc(view);

          if (usdzSrc) {
            window.location.href = usdzSrc;
          } else {
            _this.missingUsdz = true;

            _this.pushChanges();
          }
        } else if (_this.getGltfSrc(view) !== null) {
          var modelViewerNode = _this.getModelViewerNode(view);

          var _getContext = rxcomp.getContext(_this),
              node = _getContext.node;

          node.appendChild(modelViewerNode);
        } else {
          _this.missingGltf = true;

          _this.pushChanges();
        }
      });
    }
  };

  _proto.getUsdzSrc = function getUsdzSrc(view) {
    return view.ar && view.ar.usdz ? environment.getPath(view.ar.usdz.folder + view.ar.usdz.file) : null;
  };

  _proto.getGltfSrc = function getGltfSrc(view) {
    return view.ar && view.ar.gltf ? environment.getPath(view.ar.gltf.folder + view.ar.gltf.file) : null;
  };

  _proto.getViewId = function getViewId() {
    var viewId = LocationService.get('viewId') || null;

    if (viewId) {
      viewId = parseInt(viewId);
    }

    return viewId;
  };

  _proto.getModelViewerNode = function getModelViewerNode(view) {
    var panorama = environment.getPath(view.asset.folder + view.asset.file);
    var usdzSrc = this.getUsdzSrc(view);
    var gltfSrc = this.getGltfSrc(view);
    var template =
    /* html */
    "\n\t\t\t<model-viewer alt=\"" + view.name + "\" skybox-image=\"" + panorama + "\" ios-src=\"" + usdzSrc + "\" src=\"" + gltfSrc + "\" ar ar-modes=\"webxr scene-viewer quick-look\" ar-scale=\"auto\" camera-controls></model-viewer>\n\t\t";
    var div = document.createElement("div");
    div.innerHTML = template;
    var node = div.firstElementChild;
    return node;
  };

  return TryInARComponent;
}(rxcomp.Component);
TryInARComponent.meta = {
  selector: '[try-in-ar]'
};var UploadItemComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(UploadItemComponent, _Component);

  function UploadItemComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = UploadItemComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    // console.log('UploadItemComponent.onInit', this.item);
    if (this.item.preview === null) {
      this.read$(this.item.file).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (preview) {
        _this.item.preview = preview;

        _this.pushChanges();
      });
    }
  };

  _proto.read$ = function read$(file) {
    var _this2 = this;

    var reader = new FileReader();
    var reader$ = rxjs.fromEvent(reader, 'load').pipe(operators.switchMap(function (event) {
      var blob = event.target.result;

      if (_this2.item.type.name === AssetType.Image.name) {
        return _this2.resize$(blob);
      } else {
        return rxjs.of(blob);
      }
    }));
    reader.readAsDataURL(file);
    return reader$;
  };

  _proto.resize$ = function resize$(blob) {
    return new Promise(function (resolve, reject) {
      var img = document.createElement('img');

      img.onload = function () {
        var MAX_WIDTH = 320;
        var MAX_HEIGHT = 240;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var width = img.width;
        var height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        resolve(dataUrl);
      };

      img.onerror = function (error) {
        reject(error);
      };

      img.src = blob;
    });
  };

  _proto.onPause = function onPause() {
    this.pause.next(this.item);
  };

  _proto.onResume = function onResume() {
    this.resume.next(this.item);
  };

  _proto.onCancel = function onCancel() {
    this.cancel.next(this.item);
  };

  _proto.onRemove = function onRemove() {
    this.remove.next(this.item);
  };

  return UploadItemComponent;
}(rxcomp.Component);
UploadItemComponent.meta = {
  selector: '[upload-item]',
  outputs: ['pause', 'resume', 'cancel', 'remove'],
  inputs: ['item'],
  template:
  /* html */
  "\n\t<div class=\"upload-item\" [class]=\"{ 'error': item.error, 'success': item.success }\">\n\t\t<div class=\"picture\">\n\t\t\t<img [lazy]=\"item.preview\" [size]=\"{ width: 320, height: 240 }\" *if=\"item.preview && item.type.name === 'image'\" />\n\t\t\t<video [src]=\"item.preview\" *if=\"item.preview && item.type.name === 'video'\"></video>\n\t\t\t<svg class=\"spinner\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" [class]=\"{ uploading: item.uploading }\" *if=\"item.uploading\"><use xlink:href=\"#spinner\"></use></svg>\n\t\t</div>\n\t\t<div class=\"name\">{{item.name}}</div>\n\t\t<!--\n\t\t<div class=\"group--info\">\n\t\t\t<div>progress: {{item.progress}}</div>\n\t\t\t<div>size: {{item.size}} bytes</div>\n\t\t\t<div>current speed: {{item.currentSpeed}} bytes/s</div>\n\t\t\t<div>average speed: {{item.averageSpeed}} bytes/s</div>\n\t\t\t<div>time ramining: {{item.timeRemaining}}s</div>\n\t\t\t<div>paused: {{item.paused}}</div>\n\t\t\t<div>success: {{item.success}}</div>\n\t\t\t<div>complete: {{item.complete}}</div>\n\t\t\t<div>error: {{item.error}}</div>\n\t\t</div>\n\t\t-->\n\t\t<!--\n\t\t<div class=\"group--cta\" *if=\"!item.complete && item.uploading\">\n\t\t\t<div class=\"btn--pause\" (click)=\"onPause()\">pause</div>\n\t\t\t<div class=\"btn--resume\" (click)=\"onResume()\">resume</div>\n\t\t\t<div class=\"btn--cancel\" (click)=\"onCancel()\">cancel</div>\n\t\t</div>\n\t\t-->\n\t\t<div class=\"group--cta\">\n\t\t\t<div class=\"btn--remove\" (click)=\"onRemove()\" *if=\"!item.complete\">remove</div>\n\t\t</div>\n\t</div>\n\t"
};var HlsDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(HlsDirective, _Directive);

  function HlsDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = HlsDirective.prototype;

  _proto.play = function play(src) {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    if (Hls.isSupported()) {
      var hls = new Hls(); // bind them together

      hls.attachMedia(node);
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        hls.loadSource(src);
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          // console.log('HlsDirective', data.levels);
          node.play();
        });
      });
    }
  };

  _createClass(HlsDirective, [{
    key: "hls",
    set: function set(hls) {
      if (this.hls_ !== hls) {
        this.hls_ = hls;
        this.play(hls);
      }
    },
    get: function get() {
      return this.hls_;
    }
  }]);

  return HlsDirective;
}(rxcomp.Directive);
HlsDirective.meta = {
  selector: '[[hls]]',
  inputs: ['hls']
};var LOADER_UID = 0;

var LoaderService = /*#__PURE__*/function () {
  function LoaderService() {}

  // merge(this.statusSubject, this.validatorsSubject)
  LoaderService.switchLoaders = function switchLoaders() {
    var _this = this;

    var items = Object.keys(this.items).map(function (key) {
      return _this.items[key];
    });
    var items$ = items.length ? rxjs.combineLatest(items) : rxjs.of(items);
    this.progress$.next(items$);
  };

  LoaderService.getRef = function getRef() {
    var ref = ++LOADER_UID;
    this.items[ref] = new rxjs.BehaviorSubject({
      loaded: 0,
      total: 1
    });
    this.switchLoaders();
    return ref;
  };

  LoaderService.setProgress = function setProgress(ref, loaded, total) {
    var _this2 = this;

    if (total === void 0) {
      total = 1;
    }

    var item = this.items[ref];

    if (item) {
      item.next({
        loaded: loaded,
        total: total
      });
    }

    if (loaded >= total) {
      setTimeout(function () {
        delete _this2.items[ref];

        _this2.switchLoaders();
      }, 300);
    }

    this.switchLoaders();
  };

  return LoaderService;
}();

_defineProperty(LoaderService, "progress", {
  value: 0,
  loaded: 0,
  total: 0,
  count: 0,
  title: ''
});

_defineProperty(LoaderService, "items", {});

_defineProperty(LoaderService, "progress$", new rxjs.ReplaySubject(1).pipe(operators.switchAll(), operators.map(function () {
  var items = Object.keys(LoaderService.items).map(function (key) {
    return LoaderService.items[key];
  });
  var progress = items.reduce(function (progress, subject, i, items) {
    var item = subject.getValue();
    var loaded = item.loaded || 0;
    var total = item.total || 1;
    var value = loaded / total;
    progress.value += value;
    progress.loaded += loaded;
    progress.total += total;
    return progress;
  }, {
    value: 0,
    loaded: 0,
    total: 0
  });
  progress.count = items.length;

  if (items.length) {
    progress.value /= progress.count;
  }

  progress.title = Math.round(progress.value * 100) + "%";
  LoaderService.progress = progress;
  return progress;
})));var DebugService = /*#__PURE__*/function () {
  DebugService.getService = function getService() {
    if (!this.service_) {
      this.service_ = new DebugService();
    }

    return this.service_;
  };

  _createClass(DebugService, [{
    key: "message",
    get: function get() {
      return this.message$.getValue();
    }
  }]);

  function DebugService() {
    if (DebugService.service_) {
      throw 'DebugService is a singleton class!';
    }

    this.message$ = new rxjs.BehaviorSubject(null);
  }

  var _proto = DebugService.prototype;

  _proto.setMessage = function setMessage(message) {
    if (this.message !== message) {
      this.message$.next(message);
    }
  };

  return DebugService;
}();var EnvMapLoader = /*#__PURE__*/function () {
  function EnvMapLoader() {}

  EnvMapLoader.load = function load(item, renderer, callback) {
    this.video = null;

    if (!item.asset) {
      return;
    }

    if (item.asset.type.name === AssetType.PublisherStream.name) {
      return this.loadPublisherStreamBackground(renderer, callback);
    } else if (item.asset.file.indexOf('.mp4') !== -1 || item.asset.file.indexOf('.webm') !== -1) {
      return this.loadVideoBackground(environment.getPath(item.asset.folder), item.asset.file, renderer, callback);
    } else if (item.asset.file.indexOf('.m3u8') !== -1) {
      return this.loadHlslVideoBackground(item.asset.file, renderer, callback);
    } else if (item.asset.file.indexOf('.hdr') !== -1) {
      return this.loadRgbeBackground(environment.getPath(item.asset.folder), item.asset.file, renderer, callback);
    } else {
      return this.loadBackgroundImageService(environment.getPath(item.asset.folder), item.asset.file, renderer, callback);
    }
  };

  EnvMapLoader.loadBackground = function loadBackground(folder, file, renderer, callback) {
    var pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    var progressRef = LoaderService.getRef(); // console.log('loadBackground.progressRef');

    var loader = new THREE.TextureLoader();
    loader.setPath(folder).load(file, function (texture) {
      var envMap = pmremGenerator.fromEquirectangular(texture).texture;
      pmremGenerator.dispose();

      if (typeof callback === 'function') {
        callback(envMap, texture, false);
      }

      LoaderService.setProgress(progressRef, 1);
    }, function (request) {
      console.log(request.loaded, request.total);
      LoaderService.setProgress(progressRef, request.loaded, request.total);
    });
    return loader;
  };

  EnvMapLoader.loadBackgroundImageService = function loadBackgroundImageService(folder, file, renderer, callback) {
    var pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    var progressRef = LoaderService.getRef();
    var image = new Image();
    ImageService.events$(folder + file).pipe(operators.tap(function (event) {
      if (event.type === ImageServiceEvent.Progress) {
        LoaderService.setProgress(progressRef, event.data.loaded, event.data.total);
      }
    }), operators.filter(function (event) {
      return event.type === ImageServiceEvent.Complete;
    }), operators.switchMap(function (event) {
      var load = rxjs.fromEvent(image, 'load');
      image.crossOrigin = 'anonymous';
      image.src = event.data;
      return load;
    }), operators.takeWhile(function (event) {
      return event.type !== ImageServiceEvent.Complete;
    }, true)).subscribe(function (event) {
      URL.revokeObjectURL(event.data);
      var texture = new THREE.Texture(image);
      var envMap = pmremGenerator.fromEquirectangular(texture).texture;
      pmremGenerator.dispose();

      if (typeof callback === 'function') {
        callback(envMap, texture, false);
      }

      LoaderService.setProgress(progressRef, 1);
    });
  };

  EnvMapLoader.loadRgbeBackground = function loadRgbeBackground(folder, file, renderer, callback) {
    var pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    var progressRef = LoaderService.getRef();
    var loader = new THREE.RGBELoader();
    loader.setDataType(THREE.UnsignedByteType) // .setDataType(THREE.FloatType)
    .setPath(folder).load(file, function (texture) {
      var envMap = pmremGenerator.fromEquirectangular(texture).texture; // texture.dispose();

      pmremGenerator.dispose();

      if (typeof callback === 'function') {
        callback(envMap, texture, true);
      }

      LoaderService.setProgress(progressRef, 1);
    }, function (request) {
      LoaderService.setProgress(progressRef, request.loaded, request.total);
    });
    return loader;
  };

  EnvMapLoader.loadHlslVideoBackground = function loadHlslVideoBackground(src, renderer, callback) {
    var progressRef = LoaderService.getRef();
    var video = document.createElement('video');

    var onPlaying = function onPlaying() {
      video.oncanplay = null;
      var texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.mapping = THREE.UVMapping;
      texture.format = THREE.RGBFormat;
      texture.needsUpdate = true; // const envMap = new THREE.VideoTexture(video);

      var cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, {
        generateMipmaps: true,
        // minFilter: THREE.LinearMipmapLinearFilter,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        mapping: THREE.UVMapping,
        format: THREE.RGBFormat
      }).fromEquirectangularTexture(renderer, texture); // texture.dispose();

      if (typeof callback === 'function') {
        callback(cubeRenderTarget.texture, texture, false);
      }

      LoaderService.setProgress(progressRef, 1);
    };

    video.oncanplay = function () {
      // console.log('videoReady', videoReady);
      onPlaying();
    };

    if (Hls.isSupported()) {
      var hls = new Hls(); // bind them together

      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        hls.loadSource(src);
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          // console.log('HlsDirective', data.levels);
          video.play();
        });
      });
    }
  };

  EnvMapLoader.loadVideoBackground = function loadVideoBackground(folder, file, renderer, callback) {
    var _this = this;

    var progressRef = LoaderService.getRef();
    var debugService = DebugService.getService();
    this.video = true;
    var video = this.video;

    var onPlaying = function onPlaying() {
      video.oncanplay = null;
      var texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.mapping = THREE.UVMapping;
      texture.format = THREE.RGBFormat;
      texture.needsUpdate = true; // const envMap = new THREE.VideoTexture(video);

      var cubeRenderTarget = _this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, {
        generateMipmaps: true,
        // minFilter: THREE.LinearMipmapLinearFilter,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        mapping: THREE.UVMapping,
        format: THREE.RGBFormat
      }).fromEquirectangularTexture(renderer, texture); // texture.dispose();

      if (typeof callback === 'function') {
        callback(cubeRenderTarget.texture, texture, false);
      }

      LoaderService.setProgress(progressRef, 1);
    }; // video.addEventListener('playing', onPlaying);


    video.oncanplay = function () {
      // console.log('EnvMapLoader.loadVideoBackground.oncanplay');
      onPlaying();
    };

    video.src = folder + file;
    video.load();
    video.play().then(function () {
      // console.log('EnvMapLoader.loadVideoBackground.play');
      debugService.setMessage("play " + video.src);
    }, function (error) {
      console.log('EnvMapLoader.loadVideoBackground.play.error', error);
      debugService.setMessage("play.error " + video.src);
    });
  };

  EnvMapLoader.loadPublisherStreamBackground = function loadPublisherStreamBackground(renderer, callback) {
    var _this2 = this;

    var onPublisherStreamId = function onPublisherStreamId(publisherStreamId) {
      // const target = StateService.state.role === RoleType.Publisher ? '.video--local' : '.video--remote';
      var target = "#stream-" + publisherStreamId;
      var video = document.querySelector(target + " video");

      if (!video) {
        return;
      }

      var onPlaying = function onPlaying() {
        var texture = _this2.texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.mapping = THREE.UVMapping;
        texture.format = THREE.RGBFormat;
        texture.needsUpdate = true;
        var cubeRenderTarget = _this2.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, {
          generateMipmaps: true,
          // minFilter: THREE.LinearMipmapLinearFilter,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          mapping: THREE.UVMapping,
          format: THREE.RGBFormat
        }).fromEquirectangularTexture(renderer, texture); // texture.dispose();

        if (typeof callback === 'function') {
          callback(cubeRenderTarget.texture, texture, false);
        }
      };

      video.crossOrigin = 'anonymous';

      if (video.readyState >= video.HAVE_FUTURE_DATA) {
        onPlaying();
      } else {
        video.oncanplay = function () {
          onPlaying();
        };
      }
    };

    StreamService.getPublisherStreamId$().pipe(operators.first()).subscribe(function (publisherStreamId) {
      return onPublisherStreamId(publisherStreamId);
    });
  };

  _createClass(EnvMapLoader, null, [{
    key: "video",
    get: function get() {
      return this.video_;
    },
    set: function set(video) {
      if (this.video_) {
        this.video_.muted = true;
        this.video_.pause();

        if (this.video_.parentNode) {
          this.video_.parentNode.removeChild(this.video_);
        }

        this.video_ = null;
      }

      if (video) {
        var _video = this.video_ = document.createElement('video');

        _video.loop = true; // video.muted = true;

        _video.playsInline = true;
        _video.crossOrigin = 'anonymous'; // document.querySelector('body').appendChild(video);
      }
    }
  }, {
    key: "muted",
    get: function get() {
      return this.muted_;
    },
    set: function set(muted) {
      this.muted_ = muted; // console.log('EnvMapLoader.muted', muted, this.video);

      if (this.video) {
        this.video.muted = muted === true;
      }
    }
  }, {
    key: "cubeRenderTarget",
    set: function set(cubeRenderTarget) {
      if (this.cubeRenderTarget_) {
        this.cubeRenderTarget_.texture.dispose();
        this.cubeRenderTarget_.dispose();
      }

      this.cubeRenderTarget_ = cubeRenderTarget;
    }
  }, {
    key: "texture",
    set: function set(texture) {
      if (this.texture_) {
        this.texture_.dispose();
      }

      this.texture_ = texture;
    }
  }]);

  return EnvMapLoader;
}();var FreezableMesh = /*#__PURE__*/function (_THREE$Mesh) {
  _inheritsLoose(FreezableMesh, _THREE$Mesh);

  _createClass(FreezableMesh, [{
    key: "freezed",
    get: function get() {
      return this.freezed_;
    },
    set: function set(freezed) {
      // !!! cycle through freezable and not freezable
      this.freezed_ = freezed;
      this.children.filter(function (x) {
        return x.__lookupGetter__('freezed');
      }).forEach(function (x) {
        return x.freezed = freezed;
      });
    }
  }]);

  function FreezableMesh(geometry, material) {
    var _this;

    geometry = geometry || new THREE.BoxBufferGeometry(5, 5, 5);
    material = material || new THREE.MeshBasicMaterial({
      color: 0xff00ff // opacity: 1,
      // transparent: true,

    });
    _this = _THREE$Mesh.call(this, geometry, material) || this;
    _this.freezed = false;
    return _this;
  }

  var _proto = FreezableMesh.prototype;

  _proto.freeze = function freeze() {
    this.freezed = true;
  };

  _proto.unfreeze = function unfreeze() {
    this.freezed = false;
  };

  return FreezableMesh;
}(THREE.Mesh);var EmittableMesh = /*#__PURE__*/function (_FreezableMesh) {
  _inheritsLoose(EmittableMesh, _FreezableMesh);

  function EmittableMesh(geometry, material) {
    var _this;

    geometry = geometry || new THREE.BoxBufferGeometry(5, 5, 5);
    material = material || new THREE.MeshBasicMaterial({
      color: 0xff00ff // opacity: 1,
      // transparent: true,

    });
    _this = _FreezableMesh.call(this, geometry, material) || this;
    _this.events = {};
    return _this;
  }

  var _proto = EmittableMesh.prototype;

  _proto.on = function on(type, callback) {
    var _this2 = this;

    var event = this.events[type] = this.events[type] || [];
    event.push(callback);
    return function () {
      _this2.events[type] = event.filter(function (x) {
        return x !== callback;
      });
    };
  };

  _proto.off = function off(type, callback) {
    var event = this.events[type];

    if (event) {
      this.events[type] = event.filter(function (x) {
        return x !== callback;
      });
    }
  };

  _proto.emit = function emit(type, data) {
    var event = this.events[type];

    if (event) {
      event.forEach(function (callback) {
        // callback.call(this, data);
        callback(data);
      });
    }

    var broadcast = this.events.broadcast;

    if (broadcast) {
      broadcast.forEach(function (callback) {
        callback(type, data);
      });
    }
  };

  return EmittableMesh;
}(FreezableMesh);var Interactive = function Interactive() {};
Interactive.items = [];
Interactive.hittest = interactiveHittest.bind(Interactive);
Interactive.dispose = interactiveDispose.bind(Interactive);
function interactiveHittest(raycaster, down, event) {
  var _this = this;

  if (down === void 0) {
    down = false;
  }

  var debugService = DebugService.getService();
  var dirty = false;

  if (this.down !== down) {
    this.down = down;
    this.lock = false;
    dirty = true;
  }

  var items = this.items.filter(function (x) {
    return !x.freezed;
  });
  var intersections = raycaster.intersectObjects(items);
  var key, hit;
  var hash = {};
  intersections.forEach(function (intersection, i) {
    var object = intersection.object;
    key = object.uuid;

    if (i === 0) {
      if (_this.lastIntersectedObject !== object || dirty) {
        _this.lastIntersectedObject = object;
        hit = object;
        debugService.setMessage(hit.name || hit.id); // haptic feedback
      } else if (object.intersection && (Math.abs(object.intersection.point.x - intersection.point.x) > 0.01 || Math.abs(object.intersection.point.y - intersection.point.y) > 0.01)) {
        object.intersection = intersection;
        object.emit('move', object);
      }
    }

    hash[key] = intersection;
  });

  if (intersections.length === 0) {
    this.lastIntersectedObject = null;
  }

  items.forEach(function (x) {
    x.intersection = hash[x.uuid];
    x.over = x === _this.lastIntersectedObject || x.intersection && !x.depthTest && (!_this.lastIntersectedObject || _this.lastIntersectedObject.depthTest);
    x.down = down && x.over && !_this.lock;

    if (x.down) {
      _this.lock = true;
    }
  });
  return hit;
}
function interactiveDispose(object) {
  if (object) {
    var index = this.items.indexOf(object);

    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}var InteractiveMesh = /*#__PURE__*/function (_EmittableMesh) {
  _inheritsLoose(InteractiveMesh, _EmittableMesh);

  function InteractiveMesh(geometry, material) {
    var _this;

    _this = _EmittableMesh.call(this, geometry, material) || this;
    _this.depthTest = true;
    _this.over_ = false;
    _this.down_ = false;
    Interactive.items.push(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(InteractiveMesh, [{
    key: "over",
    get: function get() {
      return this.over_;
    },
    set: function set(over) {
      if (this.over_ != over) {
        this.over_ = over;
        /*
        if (over) {
        	this.emit('hit', this);
        }
        */

        if (over) {
          this.emit('over', this);
        } else {
          this.emit('out', this);
        }
      }
    }
  }, {
    key: "down",
    get: function get() {
      return this.down_;
    },
    set: function set(down) {
      down = down && this.over;

      if (this.down_ != down) {
        this.down_ = down;

        if (down) {
          this.emit('down', this);
        } else {
          this.emit('up', this);
        }
      }
    }
  }]);

  return InteractiveMesh;
}(EmittableMesh);function VideoTexture(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
  three.Texture.call(this, video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
  this.format = format !== undefined ? format : THREE.RGBFormat;
  this.minFilter = minFilter !== undefined ? minFilter : THREE.LinearFilter;
  this.magFilter = magFilter !== undefined ? magFilter : THREE.LinearFilter;
  this.mapping = THREE.UVMapping;
  this.generateMipmaps = false;
}

VideoTexture.prototype = Object.assign(Object.create(three.Texture.prototype), {
  constructor: VideoTexture,
  isVideoTexture: true,
  update: function update() {
    var video = this.image;

    if (video.readyState >= video.HAVE_CURRENT_DATA) {
      this.needsUpdate = true;
    }
  }
});var PANORAMA_RADIUS = 101;
var VERTEX_SHADER = "\n#extension GL_EXT_frag_depth : enable\n\nvarying vec2 vUv;\nvoid main() {\n\tvUv = uv;\n\t// gl_PointSize = 8.0;\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
var FRAGMENT_SHADER = "\n#extension GL_EXT_frag_depth : enable\n\nvarying vec2 vUv;\nuniform vec2 resolution;\nuniform float tween;\nuniform bool rgbe;\nuniform sampler2D texture;\n\nvec3 ACESFilmicToneMapping_( vec3 color ) {\n\tcolor *= 1.8;\n\treturn saturate( ( color * ( 2.51 * color + 0.03 ) ) / ( color * ( 2.43 * color + 0.59 ) + 0.14 ) );\n}\n\nvec4 getColor(vec2 p) {\n\treturn texture2D(texture, p);\n}\n\nvec3 encodeColor(vec4 color) {\n\treturn ACESFilmicToneMapping_(RGBEToLinear(color).rgb);\n}\n\nfloat rand(vec2 co){\n    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvec4 Blur(vec2 st, vec4 color) {\n\tconst float directions = 16.0;\n\tconst float quality = 3.0;\n\tfloat size = 16.0;\n\tconst float PI2 = 6.28318530718;\n\tconst float qq = 1.0;\n\tconst float q = 1.0 / quality;\n\tvec2 radius = size / resolution.xy;\n\tfor (float d = 0.0; d < PI2; d += PI2 / directions) {\n\t\tfor (float i = q; i <= qq; i += q) {\n\t\t\tvec2 dUv = vec2(cos(d), sin(d)) * radius * i;\n\t\t\tcolor += getColor(st + dUv);\n        }\n\t}\n\treturn color /= quality * directions - 15.0 + rand(st) * 4.0;\n}\n\nvoid main() {\n\tvec4 color = texture2D(texture, vUv);\n\t// color = Blur(vUv, color);\n\tif (rgbe) {\n\t\tcolor = vec4(encodeColor(color) * tween + rand(vUv) * 0.01, 1.0);\n\t} else {\n\t\tcolor = vec4(color.rgb * tween + rand(vUv) * 0.01, 1.0);\n\t}\n\tgl_FragColor = color;\n}\n";

var Panorama = /*#__PURE__*/function () {
  function Panorama() {
    this.muted_ = false;
    this.subscription = StateService.state$.subscribe(function (state) {
      return EnvMapLoader.muted = state.volumeMuted;
    });
    this.tween = 0;
    this.create();
  }

  var _proto = Panorama.prototype;

  _proto.create = function create() {
    var geometry = new THREE.SphereBufferGeometry(PANORAMA_RADIUS, 60, 40);
    geometry.scale(-1, 1, 1);
    geometry.rotateY(Math.PI);
    var material = new THREE.ShaderMaterial({
      // depthTest: false,
      depthWrite: false,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        texture: {
          type: "t",
          value: null
        },
        resolution: {
          value: new THREE.Vector2()
        },
        tween: {
          value: 0
        },
        rgbe: {
          value: false
        }
      }
    });
    /*
    const material = new THREE.MeshBasicMaterial({
    	transparent: true,
    	opacity: 0,
    });
    */

    var mesh = this.mesh = new InteractiveMesh(geometry, material); // mesh.renderOrder = environment.renderOrder.panorama;

    mesh.name = '[panorama]';
  }
  /*
  swap(view, renderer, callback, onexit) {
  	const item = view instanceof PanoramaGridView ? view.tiles[view.index_] : view;
  	const material = this.mesh.material;
  	if (this.tween > 0) {
  		gsap.to(this, {
  			duration: 0.5,
  			tween: 0,
  			ease: Power2.easeInOut,
  			onUpdate: () => {
  				material.uniforms.tween.value = this.tween;
  				material.needsUpdate = true;
  			},
  			onComplete: () => {
  				if (typeof onexit === 'function') {
  					onexit(view);
  				}
  				this.load(item, renderer, (envMap, texture, rgbe) => {
  					gsap.to(this, {
  						duration: 0.5,
  						tween: 1,
  						ease: Power2.easeInOut,
  						onUpdate: () => {
  							material.uniforms.tween.value = this.tween;
  							material.needsUpdate = true;
  						}
  					});
  					if (typeof callback === 'function') {
  						callback(envMap, texture, rgbe);
  					}
  				});
  			}
  		});
  	} else {
  		if (typeof onexit === 'function') {
  			onexit(view);
  		}
  		this.load(item, renderer, (envMap, texture, rgbe) => {
  			gsap.to(this, {
  				duration: 0.5,
  				tween: 1,
  				ease: Power2.easeInOut,
  				onUpdate: () => {
  					material.uniforms.tween.value = this.tween;
  					material.needsUpdate = true;
  				}
  			});
  			if (typeof callback === 'function') {
  				callback(envMap, texture, rgbe);
  			}
  		});
  	}
  }
  */
  ;

  _proto.change = function change(view, renderer, callback, onexit) {
    var item = view instanceof PanoramaGridView ? view.tiles[view.index_] : view;
    var material = this.mesh.material; // setTimeout(() => {

    this.load(item, renderer, function (envMap, texture, rgbe) {
      // setTimeout(() => {
      if (typeof onexit === 'function') {
        onexit(view);
      }

      material.uniforms.tween.value = 1;
      material.needsUpdate = true;
      setTimeout(function () {
        if (typeof callback === 'function') {
          callback(envMap, texture, rgbe);
        }
      }, 100); // !!! delay

      /*
      gsap.to(this, {
      	duration: 0.5,
      	tween: 1,
      	ease: Power2.easeInOut,
      	onUpdate: () => {
      		material.uniforms.tween.value = this.tween;
      		material.needsUpdate = true;
      	},
      	onComplete: () => {
      		setTimeout(function () {
      			if (typeof callback === 'function') {
      				callback(envMap, texture, rgbe);
      			}
      		}, 100); // !!! delay
      	},
      });
      */
      // }, 100); // !!! delay
    }); // }, 300); // !!! delay
  };

  _proto.crossfade = function crossfade(item, renderer, callback) {
    var material = this.mesh.material;
    this.load(item, renderer, function (envMap, texture, rgbe) {
      material.uniforms.tween.value = 1;
      material.needsUpdate = true;

      if (typeof callback === 'function') {
        callback(envMap, texture, rgbe);
      }
    });
  };

  _proto.load = function load(item, renderer, callback) {
    var _this = this;

    if (!item.asset) {
      return;
    }

    this.currentAsset = item.asset.folder + item.asset.file;
    var material = this.mesh.material;
    EnvMapLoader.load(item, renderer, function (envMap, texture, rgbe, video, pmremGenerator) {
      if (item.asset.folder + item.asset.file !== _this.currentAsset) {
        texture.dispose();
        return;
      }

      if (material.uniforms.texture.value) {
        material.uniforms.texture.value.dispose();
        material.uniforms.texture.value = null;
      }

      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.mapping = THREE.UVMapping;
      texture.needsUpdate = true; // material.map = texture;

      material.uniforms.texture.value = texture;
      material.uniforms.resolution.value = new THREE.Vector2(texture.width, texture.height);
      material.uniforms.tween.value = 0;
      material.uniforms.rgbe.value = rgbe;
      material.needsUpdate = true;

      if (typeof callback === 'function') {
        callback(envMap, texture, rgbe);
      }
    });
  };

  _proto.loadVideo = function loadVideo(src) {
    var video = document.createElement('video');
    video.src = src;
    video.volume = 0.8;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    video.play();
    this.setVideo(video);
  };

  _proto.setVideo = function setVideo(video) {
    var _this2 = this;

    // console.log('Panorama.setVideo', video);
    if (video) {
      var onPlaying = function onPlaying() {
        var texture = new VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.mapping = THREE.UVMapping;
        texture.format = THREE.RGBFormat;
        texture.needsUpdate = true;
        var material = _this2.mesh.material;
        material.map = texture;
        material.uniforms.texture.value = texture;
        material.uniforms.resolution.value = new THREE.Vector2(texture.width, texture.height);
        material.needsUpdate = true;
      }; // video.addEventListener('canplay', onPlaying);


      video.crossOrigin = 'anonymous';

      video.oncanplay = function () {
        onPlaying();
      };
    }
  };

  _proto.dispose = function dispose() {
    this.subscription.unsubscribe();
  };

  return Panorama;
}();var Rect = /*#__PURE__*/function () {
  function Rect(rect) {
    this.x = 0;
    this.y = 0;
    this.top = 0;
    this.right = 0;
    this.bottom = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
    this.set(rect);
  }

  Rect.contains = function contains(rect, left, top) {
    return rect.top <= top && top <= rect.bottom && rect.left <= left && left <= rect.right;
  };

  Rect.intersectRect = function intersectRect(r1, r2) {
    return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
  };

  Rect.fromNode = function fromNode(node) {
    if (!node) {
      return;
    }

    var rect = node.rect_ || (node.rect_ = new Rect());
    var rects = node.getClientRects();

    if (!rects.length) {
      // console.log(rects, node);
      return rect;
    }

    var boundingRect = node.getBoundingClientRect(); // rect.top: boundingRect.top + defaultView.pageYOffset,
    // rect.left: boundingRect.left + defaultView.pageXOffset,

    rect.x = boundingRect.left;
    rect.y = boundingRect.top;
    rect.top = boundingRect.top;
    rect.left = boundingRect.left;
    rect.width = boundingRect.width;
    rect.height = boundingRect.height;
    rect.right = rect.left + rect.width;
    rect.bottom = rect.top + rect.height;
    rect.setCenter();
    return rect;
  };

  var _proto = Rect.prototype;

  _proto.set = function set(rect) {
    if (rect) {
      Object.assign(this, rect);
      this.right = this.left + this.width;
      this.bottom = this.top + this.height;
    }

    this.setCenter();
  };

  _proto.setSize = function setSize(w, h) {
    this.width = w;
    this.height = h;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
    this.setCenter(); // console.log(w, h);
  };

  _proto.setCenter = function setCenter() {
    var center = this.center || (this.center = {});
    center.top = this.top + this.height / 2;
    center.left = this.left + this.width / 2;
    center.x = center.left;
    center.y = center.top;
  };

  _proto.contains = function contains(left, top) {
    return Rect.contains(this, left, top);
  };

  _proto.intersect = function intersect(rect) {
    return Rect.intersectRect(this, rect);
  };

  _proto.intersection = function intersection(rect) {
    var intersection = this.intersection_ || (this.intersection_ = {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      pow: {
        x: -1,
        y: -1
      },
      offset: function offset(_offset) {
        _offset = _offset || 0;
        var pow = (this.top - this.rect.height / 2 + _offset) / -this.height;
        return pow;
      },
      scroll: function scroll(offset) {
        offset = offset || 0;
        var pow = (this.top - this.rect.height / 2 + offset) / -this.height;
        return pow;
      }
    });
    intersection.left = this.left;
    intersection.top = this.top;
    intersection.width = this.width;
    intersection.height = this.height;
    intersection.x = this.left + this.width / 2;
    intersection.y = this.top + this.height / 2;
    intersection.rect = rect;
    var pow = intersection.offset(0);
    intersection.pow.y = pow;
    return intersection;
  };

  return Rect;
}();var W = 320;
var H = 240;
var COLORS = [0xffcc00, 0x00ffcc, 0x00ccff, 0xccff00, 0xcc00ff, 0xffffff];

var AvatarElement = /*#__PURE__*/function () {
  _createClass(AvatarElement, null, [{
    key: "headGeometry",
    get: function get() {
      if (!this.headGeometry_) {
        this.headGeometry_ = new THREE.SphereBufferGeometry(0.2, 48, 48);
      }

      return this.headGeometry_;
    }
  }]);

  function AvatarElement(message) {
    var clientId = this.clientId = message.clientId;
    var container = this.container = message.container;
    var renderer = this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      premultipliedAlpha: true // physicallyCorrectLights: true,

    });
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(W, H);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);
    var camera = this.camera = new THREE.PerspectiveCamera(70, W / H, 0.01, 1000);
    camera.position.set(0, 0, -0.5);
    camera.target = new THREE.Vector3();
    camera.lookAt(camera.target);
    var scene = this.scene = new THREE.Scene();
    /*
    const ambient = this.ambient = new THREE.AmbientLight(0x202020);
    scene.add(ambient);
    */

    var light = this.light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 2, -2);
    scene.add(light);
    var head = this.head = this.addHead();
    scene.add(head);
    var remote = this.remote = StreamService.getRemoteById(clientId);
    /*
    if (remote) {
    	this.subscription = AudioStreamService.volume$(remote.stream).pipe(
    		auditTime(Math.floor(1000 / 15)),
    		tap(meter => {
    			this.chalk(meter.volume);
    		})
    	);
    }
    */
  }

  var _proto = AvatarElement.prototype;

  _proto.addHead = function addHead() {
    var geometry = AvatarElement.headGeometry;
    var canvas = this.canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    var ctx = this.ctx = this.canvas.getContext('2d');
    var map = this.map = new THREE.CanvasTexture(canvas);
    map.offset.x = -0.25;
    var color = COLORS[this.clientId % COLORS.length];
    var material = new THREE.MeshStandardMaterial({
      map: map,
      color: color
    });
    this.chalk(0);
    return new THREE.Mesh(geometry, material);
  };

  _proto.render = function render() {
    var tick = this.tick_ ? ++this.tick_ : this.tick_ = 1; // if (tick % 2 === 1) {

    if (this.remote) {
      var audioLevel = this.remote.getAudioLevel() * 12;
      this.chalk(audioLevel);
    }

    var renderer = this.renderer,
        scene = this.scene,
        camera = this.camera;
    renderer.render(scene, camera); // }
  };

  _proto.update = function update(message) {
    var camera = message.camera;
    var head = this.head;
    head.quaternion.set(camera[3], camera[4], camera[5], camera[6]);
    /*
    head.position.set(camera[0], camera[1], camera[2]);
    */
  };

  _proto.dispose = function dispose() {
    // !!! dispose threejs
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  };

  _proto.chalk = function chalk(i) {
    i = (i + Math.PI * 0.5) % (Math.PI * 2);
    var vol = Math.sin(i) * 30;
    var smile = Math.cos(i) * 10;
    var x = 512;
    var y = 256;
    var ctx = this.ctx;
    ctx.fillStyle = '#888888';
    ctx.fillRect(0, 0, 1024, 512);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x - 40, y - 50, 7, 0, 2 * Math.PI);
    ctx.arc(x + 40, y - 50, 7, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath(); // ctx.quadraticCurveTo(x - 30, y + 30, x - 30, y + 30);
    // ctx.quadraticCurveTo(x - 30, y + 60, x, y + 60);
    // ctx.quadraticCurveTo(x + 30, y + 60, x + 30, y + 30);
    // ctx.quadraticCurveTo(x + 30, y, x, y);

    ctx.moveTo(x - 40 - smile, y + 30);
    ctx.bezierCurveTo(x - 40 - smile, y + 60, x + 40 + smile, y + 60, x + 40 + smile, y + 30);
    ctx.bezierCurveTo(x + 40 + smile, y + vol, x - 40 - smile, y + vol, x - 40 - smile, y + 30); // ctx.arc(x, 256 + 50, 50, 0, 2 * Math.PI);

    ctx.closePath();
    ctx.fill();
    this.map.needsUpdate = true;
  };

  return AvatarElement;
}();var Camera = /*#__PURE__*/function (_THREE$PerspectiveCam) {
  _inheritsLoose(Camera, _THREE$PerspectiveCam);

  function Camera(fov, aspect, near, far, dolly) {
    var _this;

    if (fov === void 0) {
      fov = 70;
    }

    if (aspect === void 0) {
      aspect = 1;
    }

    if (near === void 0) {
      near = 0.01;
    }

    if (far === void 0) {
      far = 1000;
    }

    _this = _THREE$PerspectiveCam.call(this, fov, aspect, near, far) || this;
    _this.target = new THREE.Vector3();
    _this.box = new THREE.Group();

    _this.add(_this.box);

    return _this;
  }

  return Camera;
}(THREE.PerspectiveCamera);var MediaLoaderEvent = function MediaLoaderEvent(src, id) {
  this.src = src;
  this.id = id;
};
var MediaLoaderPlayEvent = /*#__PURE__*/function (_MediaLoaderEvent) {
  _inheritsLoose(MediaLoaderPlayEvent, _MediaLoaderEvent);

  function MediaLoaderPlayEvent() {
    return _MediaLoaderEvent.apply(this, arguments) || this;
  }

  return MediaLoaderPlayEvent;
}(MediaLoaderEvent);
var MediaLoaderPauseEvent = /*#__PURE__*/function (_MediaLoaderEvent2) {
  _inheritsLoose(MediaLoaderPauseEvent, _MediaLoaderEvent2);

  function MediaLoaderPauseEvent() {
    return _MediaLoaderEvent2.apply(this, arguments) || this;
  }

  return MediaLoaderPauseEvent;
}(MediaLoaderEvent);

var MediaLoader = /*#__PURE__*/function () {
  MediaLoader.getLoader = function getLoader() {
    return MediaLoader.loader || (MediaLoader.loader = new THREE.TextureLoader());
  };

  MediaLoader.getPath = function getPath(item) {
    return environment.getPath(item.asset.folder + item.asset.file);
  };

  MediaLoader.loadTexture = function loadTexture(item, callback) {
    var path = MediaLoader.getPath(item);
    return MediaLoader.getLoader().load(path, callback);
  };

  MediaLoader.isVideo = function isVideo(item) {
    return item.asset && item.asset.file && (item.asset.file.indexOf('.mp4') !== -1 || item.asset.file.indexOf('.webm') !== -1);
  };

  MediaLoader.isPublisherStream = function isPublisherStream(item) {
    return item.asset && item.asset.type.name === AssetType.PublisherStream.name;
  };

  MediaLoader.isNextAttendeeStream = function isNextAttendeeStream(item) {
    return item.asset && item.asset.type.name === AssetType.NextAttendeeStream.name;
  };

  _createClass(MediaLoader, [{
    key: "isVideo",
    get: function get() {
      return MediaLoader.isVideo(this.item);
    }
  }, {
    key: "isPublisherStream",
    get: function get() {
      return MediaLoader.isPublisherStream(this.item);
    }
  }, {
    key: "isNextAttendeeStream",
    get: function get() {
      return MediaLoader.isNextAttendeeStream(this.item);
    }
  }, {
    key: "isPlayableVideo",
    get: function get() {
      return this.isVideo && !this.item.asset.autoplay;
    }
  }, {
    key: "isAutoplayVideo",
    get: function get() {
      return this.isPublisherStream || this.isNextAttendeeStream || this.isVideo && this.item.asset.autoplay != null;
    }
  }, {
    key: "muted",
    get: function get() {
      return this.muted_;
    },
    set: function set(muted) {
      this.muted_ = muted; // console.log('MediaLoader.muted', muted, this.video);

      if (this.video) {
        this.video.muted = muted === true;
      }
    }
  }]);

  function MediaLoader(item) {
    var _this = this;

    this.item = item;
    this.toggle = this.toggle.bind(this);
    this.muted_ = false;
    this.subscription = StateService.state$.subscribe(function (state) {
      return _this.muted = state.volumeMuted;
    });
  }

  var _proto = MediaLoader.prototype;

  _proto.load = function load(callback) {
    var _this2 = this;

    var item = this.item;
    var texture; // console.log('MediaLoader.load', item, this.isPublisherStream);

    if ((this.isPublisherStream || this.isNextAttendeeStream) && item.streamId) {
      var streamId = item.streamId;
      var target = "#stream-" + streamId;
      var video = document.querySelector(target + " video");

      if (!video) {
        return;
      }

      var onCanPlay = function onCanPlay() {
        video.removeEventListener('canplay', onCanPlay);
        texture = _this2.texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.mapping = THREE.UVMapping;
        texture.format = THREE.RGBFormat; // texture.image.width = video.videoWidth;
        // texture.image.height = video.videoHeight;

        texture.needsUpdate = true;

        if (typeof callback === 'function') {
          callback(texture, _this2);
        }
      };

      video.crossOrigin = 'anonymous';

      if (video.readyState >= video.HAVE_FUTURE_DATA) {
        onCanPlay();
      } else {
        video.addEventListener('canplay', onCanPlay);
      }
    } else if (this.isVideo) {
      // create the video element
      var _video = this.video = document.createElement('video');

      _video.preload = 'metadata';
      _video.volume = 0.8;
      _video.muted = true;
      _video.playsInline = true;
      _video.crossOrigin = 'anonymous';

      if (item.asset && item.asset.autoplay) {
        _video.loop = true;
      }

      var _onCanPlay = function _onCanPlay() {
        _video.oncanplay = null;
        texture = new THREE.VideoTexture(_video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.mapping = THREE.UVMapping;
        texture.format = THREE.RGBFormat; // texture.image.width = video.videoWidth;
        // texture.image.height = video.videoHeight;

        texture.needsUpdate = true;

        if (!item.asset || !item.asset.autoplay) {
          _video.pause();
        }

        if (typeof callback === 'function') {
          callback(texture, _this2);
        }
      };

      _video.oncanplay = _onCanPlay;
      _video.src = MediaLoader.getPath(item);

      _video.load(); // must call after setting/changing source


      this.play(true);
    } else if (item.asset) {
      MediaLoader.loadTexture(item, function (texture) {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.mapping = THREE.UVMapping; // texture.format = THREE.RGBFormat;

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        if (typeof callback === 'function') {
          callback(texture, _this2);
        }
      });
    } else {
      callback(null, this);
    }

    return this;
  };

  _proto.play = function play(silent) {
    var _this3 = this;

    // console.log('MediaLoader.play');
    if (this.video) {
      this.video.play().then(function () {// console.log('MediaLoader.play.success', this.item.asset.file);
      }, function (error) {
        console.log('MediaLoader.play.error', _this3.item.asset.file, error);
      });

      if (!silent) {
        MediaLoader.events$.next(new MediaLoaderPlayEvent(this.video.src, this.item.id));
      }
    }
  };

  _proto.pause = function pause(silent) {
    // console.log('MediaLoader.pause');
    if (this.video) {
      this.video.muted = true;
      this.video.pause();

      if (!silent) {
        MediaLoader.events$.next(new MediaLoaderPauseEvent(this.video.src, this.item.id));
      }
    }
  };

  _proto.toggle = function toggle() {
    // console.log('MediaLoader.toggle', this.video);
    if (this.video) {
      if (this.video.paused) {
        this.video.muted = this.muted_;
        this.play();
        return true;
      } else {
        this.pause();
        return false;
      }
    }
  };

  _proto.dispose = function dispose() {
    this.subscription.unsubscribe();
    this.pause();
    delete this.video;
  };

  return MediaLoader;
}();
MediaLoader.events$ = new rxjs.ReplaySubject(1);var VERTEX_SHADER$1 = "\n#extension GL_EXT_frag_depth : enable\n\nvarying vec2 vUv;\nvoid main() {\n\tvUv = uv;\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
var FRAGMENT_SHADER$1 = "\n#extension GL_EXT_frag_depth : enable\n\nvarying vec2 vUv;\nuniform bool video;\nuniform float opacity;\nuniform float overlay;\nuniform float tween;\nuniform sampler2D textureA;\nuniform sampler2D textureB;\nuniform vec2 resolutionA;\nuniform vec2 resolutionB;\nuniform vec3 overlayColor;\n\nvoid main() {\n\tvec4 color;\n\tvec4 colorA = texture2D(textureA, vUv);\n\tif (video) {\n\t\tvec4 colorB = texture2D(textureB, vUv);\n\t\tcolor = vec4(colorA.rgb + (overlayColor * overlay * 0.2) + (colorB.rgb * tween * colorB.a), opacity);\n\t} else {\n\t\tcolor = vec4(colorA.rgb + (overlayColor * overlay * 0.2), opacity);\n\t}\n\tgl_FragColor = color;\n}\n";
/*
const FRAGMENT_SHADER_BAK = `
#extension GL_EXT_frag_depth : enable

varying vec2 vUv;
uniform bool video;
uniform float opacity;
uniform float overlay;
uniform float tween;
uniform sampler2D textureA;
uniform sampler2D textureB;
uniform vec2 resolutionA;
uniform vec2 resolutionB;
uniform vec3 overlayColor;

mat3 rotate(float a) {
	return mat3(
		cos(a), sin(a), 0.0,
		-sin(a), cos(a), 0.0,
		0.0, 0.0, 1.0
	);
}

mat3 translate(vec2 t) {
	return mat3(
		1.0, 0.0, 0.0,
		0.0, 1.0, 0.0,
		t.x, t.y, 1.0
	);
}

mat3 scale(vec2 s) {
	return mat3(
		s.x, 0.0, 0.0,
		0.0, s.y, 0.0,
		0.0, 0.0, 1.0
	);
}

vec2 getUV2(vec2 vUv, vec2 t, vec2 s, float a) {
	mat3 transform = scale(s) * rotate(a);
	return (vec3(vUv + t, 0.0) * transform).xy;
}

void main() {
	vec4 color;
	vec4 colorA = texture2D(textureA, vUv);
	if (video) {
		float rA = resolutionA.x / resolutionA.y;
		float rB = resolutionB.x / resolutionB.y;
		float aspect = 1.0 / rA * rB;
		vec2 s = vec2(3.0 / aspect, 3.0);
		vec2 t = vec2(
			-(resolutionA.x - resolutionB.x / s.x) * 0.5 / resolutionA.x,
			-(resolutionA.y - resolutionB.y / s.y) * 0.5 / resolutionA.y
		);
		t = vec2(
			-(resolutionA.x - resolutionB.x / s.y) * 0.5 / resolutionA.x,
			-(resolutionA.y - resolutionB.y / s.y) * 0.5 / resolutionA.y
		);
		// float dx = (resolutionA.x - resolutionB.x) / resolutionA.x * 0.5;
		// float dy = (resolutionA.y - resolutionB.y) / resolutionA.y * 0.5;
		// t = vec2(-0.5 + dx, -0.5 - dy);
		vec2 uv2 = clamp(
			getUV2(vUv, t, s, 0.0),
			vec2(0.0,0.0),
			vec2(1.0,1.0)
		);
		vec4 colorB = texture2D(textureB, uv2);
		colorB = texture2D(textureB, vUv);
		color = vec4(colorA.rgb + (overlayColor * overlay * 0.2) + (colorB.rgb * tween * colorB.a), opacity);
	} else {
		color = vec4(colorA.rgb + (overlayColor * overlay * 0.2), opacity);
	}
	gl_FragColor = color;
}
`;
*/

var FRAGMENT_CHROMA_KEY_SHADER = "\n#extension GL_EXT_frag_depth : enable\n\n#define threshold 0.55\n#define padding 0.05\n\nvarying vec2 vUv;\nuniform bool video;\nuniform float opacity;\nuniform float overlay;\nuniform float tween;\nuniform sampler2D textureA;\nuniform sampler2D textureB;\nuniform vec2 resolutionA;\nuniform vec2 resolutionB;\nuniform vec3 chromaKeyColor;\nuniform vec3 overlayColor;\n\nvoid main() {\n\tvec4 color;\n\tvec4 colorA = texture2D(textureA, vUv);\n\tvec4 chromaKey = vec4(chromaKeyColor, 1.0);\n    vec3 chromaKeyDiff = colorA.rgb - chromaKey.rgb;\n    float chromaKeyValue = smoothstep(threshold - padding, threshold + padding, dot(chromaKeyDiff, chromaKeyDiff));\n\tcolor = vec4(colorA.rgb + (overlayColor * overlay * 0.2), opacity * chromaKeyValue);\n\tgl_FragColor = color;\n}\n";

var MediaMesh = /*#__PURE__*/function (_InteractiveMesh) {
  _inheritsLoose(MediaMesh, _InteractiveMesh);

  MediaMesh.getMaterial = function getMaterial(useChromaKey) {
    var material = new THREE.ShaderMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      vertexShader: VERTEX_SHADER$1,
      fragmentShader: useChromaKey ? FRAGMENT_CHROMA_KEY_SHADER : FRAGMENT_SHADER$1,
      uniforms: {
        video: {
          value: false
        },
        textureA: {
          type: "t",
          value: null
        },
        textureB: {
          type: "t",
          value: null
        },
        resolutionA: {
          value: new THREE.Vector2()
        },
        resolutionB: {
          value: new THREE.Vector2()
        },
        overlayColor: {
          value: new THREE.Color('#000000')
        },
        overlay: {
          value: 0
        },
        tween: {
          value: 1
        },
        opacity: {
          value: 0
        }
      } // side: THREE.DoubleSide

    });
    return material;
  };

  MediaMesh.getChromaKeyMaterial = function getChromaKeyMaterial(chromaKeyColor) {
    if (chromaKeyColor === void 0) {
      chromaKeyColor = [0.0, 1.0, 0.0];
    }

    var material = new THREE.ShaderMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      vertexShader: VERTEX_SHADER$1,
      fragmentShader: FRAGMENT_CHROMA_KEY_SHADER,
      uniforms: {
        video: {
          value: false
        },
        textureA: {
          type: "t",
          value: null
        },
        textureB: {
          type: "t",
          value: null
        },
        resolutionA: {
          value: new THREE.Vector2()
        },
        resolutionB: {
          value: new THREE.Vector2()
        },
        chromaKeyColor: {
          value: new THREE.Vector3(chromaKeyColor[0], chromaKeyColor[1], chromaKeyColor[2])
        },
        overlayColor: {
          value: new THREE.Color('#000000')
        },
        overlay: {
          value: 0
        },
        tween: {
          value: 1
        },
        opacity: {
          value: 0
        }
      },
      side: THREE.DoubleSide
    });
    return material;
  };

  MediaMesh.getStreamId$ = function getStreamId$(item) {
    if (!item.asset) {
      return rxjs.of(null);
    }

    var assetType = item.asset.type;
    var file = item.asset.file;

    if (assetType.name !== AssetType.PublisherStream.name && assetType.name !== AssetType.NextAttendeeStream.name) {
      return rxjs.of(file);
    }

    return StreamService.streams$.pipe(operators.map(function (streams) {
      // console.log('MediaMesh.getStreamId$', streams, item.asset);
      var stream;

      if (assetType.name === AssetType.PublisherStream.name) {
        stream = streams.find(function (x) {
          return x.clientInfo && x.clientInfo.role === RoleType.Publisher;
        });
      } else if (assetType.name === AssetType.NextAttendeeStream.name) {
        var i = 0;
        streams.forEach(function (x) {
          if (x.clientInfo && x.clientInfo.role === RoleType.Attendee) {
            if (i === item.asset.index) {
              stream = x;
            }

            i++;
          }
        });
      }

      if (stream) {
        return stream.getId();
      } else {
        return null;
      }
    }));
  };

  MediaMesh.getMaterialByItem = function getMaterialByItem(item) {
    var material;

    if (item.asset && item.asset.chromaKeyColor) {
      material = MediaMesh.getChromaKeyMaterial(item.asset.chromaKeyColor);
    } else if (item.asset) {
      material = MediaMesh.getMaterial();
    } else {
      material = new THREE.MeshBasicMaterial({
        color: 0x888888
      });
    }

    return material;
  };

  MediaMesh.getUniformsByItem = function getUniformsByItem(item) {
    var uniforms = null;

    if (item.asset) {
      uniforms = {
        overlay: 0,
        tween: 1,
        opacity: 0
      };
    }

    return uniforms;
  };

  function MediaMesh(item, items, geometry) {
    var _this;

    var material = MediaMesh.getMaterialByItem(item);
    _this = _InteractiveMesh.call(this, geometry, material) || this;
    _this.item = item;
    _this.items = items;
    _this.renderOrder = environment.renderOrder.plane;
    _this.uniforms = MediaMesh.getUniformsByItem(item);
    var mediaLoader = _this.mediaLoader = new MediaLoader(item);
    /*
    if (item.asset && !mediaLoader.isVideo) {
    	this.freeze();
    }
    */

    return _this;
  }

  var _proto = MediaMesh.prototype;

  _proto.load = function load(callback) {
    var _this2 = this;

    if (!this.item.asset) {
      this.onAppear();

      if (typeof callback === 'function') {
        callback(this);
      }

      return;
    }

    var material = this.material;
    var mediaLoader = this.mediaLoader;
    mediaLoader.load(function (textureA) {
      // console.log('MediaMesh.textureA', textureA);
      if (textureA) {
        material.uniforms.textureA.value = textureA; // material.uniforms.resolutionA.value.x = textureA.image.width;
        // material.uniforms.resolutionA.value.y = textureA.image.height;

        material.uniforms.resolutionA.value = new THREE.Vector2(textureA.image.width || textureA.image.videoWidth, textureA.image.height || textureA.image.videoHeight);
        material.needsUpdate = true;

        if (mediaLoader.isPlayableVideo) {
          _this2.createTextureB(textureA, function (textureB) {
            // console.log('MediaMesh.textureB', textureB);
            textureB.minFilter = THREE.LinearFilter;
            textureB.magFilter = THREE.LinearFilter;
            textureB.mapping = THREE.UVMapping; // textureB.format = THREE.RGBFormat;

            textureB.wrapS = THREE.RepeatWrapping;
            textureB.wrapT = THREE.RepeatWrapping;
            material.uniforms.textureB.value = textureB; // material.uniforms.resolutionB.value.x = textureB.image.width;
            // material.uniforms.resolutionB.value.y = textureB.image.height;

            material.uniforms.resolutionB.value = new THREE.Vector2(textureB.image.width, textureB.image.height); // console.log(material.uniforms.resolutionB.value, textureB);

            material.needsUpdate = true;
          });
        }
      }

      _this2.onAppear();

      if (mediaLoader.isPlayableVideo) {
        material.uniforms.video.value = true;
        _this2.onOver = _this2.onOver.bind(_this2);
        _this2.onOut = _this2.onOut.bind(_this2);
        _this2.onToggle = _this2.onToggle.bind(_this2);

        _this2.on('over', _this2.onOver);

        _this2.on('out', _this2.onOut);

        _this2.on('down', _this2.onToggle);
      }

      if (typeof callback === 'function') {
        callback(_this2);
      }
    });
  };

  _proto.createTextureB = function createTextureB(textureA, callback) {
    var aw = textureA.image.width || textureA.image.videoWidth;
    var ah = textureA.image.height || textureA.image.videoHeight;
    var ar = aw / ah;
    var scale = 0.32;
    var canvas = document.createElement('canvas'); // document.querySelector('body').appendChild(canvas);

    canvas.width = aw;
    canvas.height = ah;
    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    var image = new Image();

    image.onload = function () {
      var bw = image.width;
      var bh = image.height;
      var br = bw / bh;
      var w;
      var h;

      if (ar > br) {
        w = ah * scale;
        h = w / br;
      } else {
        h = aw * scale;
        w = h * br;
      }

      ctx.drawImage(image, aw / 2 - w / 2, ah / 2 - h / 2, w, h);
      var textureB = new THREE.CanvasTexture(canvas);

      if (typeof callback === 'function') {
        callback(textureB);
      }
    };

    image.crossOrigin = 'anonymous';
    image.src = environment.getPath('textures/ui/play.png');
  };

  _proto.events$ = function events$() {
    var _this3 = this;

    var item = this.item;
    var items = this.items;

    if (item.asset && item.asset.linkedPlayId) {
      this.freeze();
    }

    return MediaLoader.events$.pipe(operators.map(function (event) {
      if (item.asset && item.asset.linkedPlayId) {
        var eventItem = items.find(function (x) {
          return x.asset && event.src.indexOf(x.asset.file) !== -1 && event.id === item.asset.linkedPlayId;
        });

        if (eventItem) {
          // console.log('MediaLoader.events$.eventItem', event, eventItem);
          if (event instanceof MediaLoaderPlayEvent) {
            _this3.play();
          } else if (event instanceof MediaLoaderPauseEvent) {
            _this3.pause();
          }
        }
      }

      return event;
    }));
  };

  _proto.onAppear = function onAppear() {
    var uniforms = this.uniforms;
    var material = this.material;

    if (material.uniforms) {
      gsap.to(uniforms, {
        duration: 0.4,
        opacity: 1,
        ease: Power2.easeInOut,
        onUpdate: function onUpdate() {
          material.uniforms.opacity.value = uniforms.opacity;
          material.needsUpdate = true;
        }
      });
    }
  };

  _proto.onDisappear = function onDisappear() {
    var uniforms = this.uniforms;
    var material = this.material;

    if (material.uniforms) {
      gsap.to(uniforms, {
        duration: 0.4,
        opacity: 0,
        ease: Power2.easeInOut,
        onUpdate: function onUpdate() {
          material.uniforms.opacity.value = uniforms.opacity;
          material.needsUpdate = true;
        }
      });
    }
  };

  _proto.onOver = function onOver() {
    var uniforms = this.uniforms;
    var material = this.material;

    if (material.uniforms) {
      gsap.to(uniforms, {
        duration: 0.4,
        overlay: 1,
        tween: this.playing ? 0 : 1,
        opacity: 1,
        ease: Power2.easeInOut,
        overwrite: true,
        onUpdate: function onUpdate() {
          material.uniforms.overlay.value = uniforms.overlay;
          material.uniforms.tween.value = uniforms.tween;
          material.uniforms.opacity.value = uniforms.opacity;
          material.needsUpdate = true;
        }
      });
    }
  };

  _proto.onOut = function onOut() {
    var uniforms = this.uniforms;
    var material = this.material;

    if (material.uniforms) {
      gsap.to(uniforms, {
        duration: 0.4,
        overlay: 0,
        tween: this.playing ? 0 : 1,
        opacity: 1,
        ease: Power2.easeInOut,
        overwrite: true,
        onUpdate: function onUpdate() {
          material.uniforms.overlay.value = uniforms.overlay;
          material.uniforms.tween.value = uniforms.tween;
          material.uniforms.opacity.value = uniforms.opacity;
          material.needsUpdate = true;
        }
      });
    }
  };

  _proto.onToggle = function onToggle() {
    this.playing = this.mediaLoader.toggle();
    this.emit('playing', this.playing);
    this.onOut();
  };

  _proto.play = function play() {
    this.mediaLoader.play();
    this.playing = true;
    this.emit('playing', true);
    this.onOut();
  };

  _proto.pause = function pause() {
    this.mediaLoader.pause();
    this.playing = false;
    this.emit('playing', false);
    this.onOut();
  };

  _proto.setPlayingState = function setPlayingState(playing) {
    if (this.playing !== playing) {
      this.playing = playing;
      playing ? this.mediaLoader.play() : this.mediaLoader.pause();
      this.onOut();
    }
  };

  _proto.updateByItem = function updateByItem(item) {
    this.disposeMaterial();
    this.disposeMediaLoader();
    this.material = MediaMesh.getMaterialByItem(item);
    this.uniforms = MediaMesh.getUniformsByItem(item);
    this.mediaLoader = new MediaLoader(item);
  };

  _proto.disposeMaterial = function disposeMaterial() {
    if (this.material) {
      if (this.material.map && this.material.map.disposable !== false) {
        this.material.map.dispose();
      }

      this.material.dispose();
      this.material = null;
    }
  };

  _proto.disposeMediaLoader = function disposeMediaLoader() {
    var mediaLoader = this.mediaLoader;

    if (mediaLoader) {
      if (mediaLoader.isPlayableVideo) {
        this.off('over', this.onOver);
        this.off('out', this.onOut);
        this.off('down', this.onToggle);
      }

      mediaLoader.dispose();
      this.mediaLoader = null;
    }
  };

  _proto.dispose = function dispose() {
    this.disposeMediaLoader();
  };

  return MediaMesh;
}(InteractiveMesh);var DragPoint = function DragPoint() {
  this.x = 0;
  this.y = 0;
};
var DragEvent = function DragEvent(options) {
  if (options) {
    Object.assign(this, options);
  }
};
var DragDownEvent = /*#__PURE__*/function (_DragEvent) {
  _inheritsLoose(DragDownEvent, _DragEvent);

  function DragDownEvent(options) {
    var _this;

    _this = _DragEvent.call(this, options) || this;
    _this.distance = new DragPoint();
    _this.strength = new DragPoint();
    _this.speed = new DragPoint();
    return _this;
  }

  return DragDownEvent;
}(DragEvent);
var DragMoveEvent = /*#__PURE__*/function (_DragEvent2) {
  _inheritsLoose(DragMoveEvent, _DragEvent2);

  function DragMoveEvent(options) {
    var _this2;

    _this2 = _DragEvent2.call(this, options) || this;
    _this2.distance = new DragPoint();
    _this2.strength = new DragPoint();
    _this2.speed = new DragPoint();
    return _this2;
  }

  return DragMoveEvent;
}(DragEvent);
var DragUpEvent = /*#__PURE__*/function (_DragEvent3) {
  _inheritsLoose(DragUpEvent, _DragEvent3);

  function DragUpEvent(options) {
    return _DragEvent3.call(this, options) || this;
  }

  return DragUpEvent;
}(DragEvent);
var upEvent;

var DragService = /*#__PURE__*/function () {
  function DragService() {}

  DragService.getPosition = function getPosition(event, point) {
    if (event instanceof MouseEvent) {
      point ? (point.x = event.clientX, point.y = event.clientY) : point = {
        x: event.clientX,
        y: event.clientY
      };
    } else if (window.TouchEvent && event instanceof TouchEvent) {
      if (event.touches.length > 0) {
        point ? (point.x = event.touches[0].pageX, point.y = event.touches[0].pageY) : point = {
          x: event.touches[0].pageX,
          y: event.touches[0].pageY
        };
      }
    }

    return point;
  };

  DragService.down$ = function down$(target, events$) {
    var _this3 = this;

    var downEvent;
    return rxjs.merge(rxjs.fromEvent(target, 'mousedown').pipe(operators.filter(function (event) {
      return event.button === 0;
    })), rxjs.fromEvent(target, 'touchstart')).pipe(operators.map(function (event) {
      downEvent = downEvent || new DragDownEvent();
      downEvent.node = target;
      downEvent.target = event.target;
      downEvent.originalEvent = event;
      downEvent.down = _this3.getPosition(event, downEvent.down);

      if (downEvent.down) {
        downEvent.distance = new DragPoint();
        downEvent.strength = new DragPoint();
        downEvent.speed = new DragPoint();
        events$.next(downEvent);
        return downEvent;
      }
    }), operators.filter(function (event) {
      return event !== undefined;
    }));
  };

  DragService.move$ = function move$(target, events$, dismiss$, downEvent) {
    var _this4 = this;

    var moveEvent;
    return rxjs.fromEvent(document, downEvent.originalEvent instanceof MouseEvent ? 'mousemove' : 'touchmove').pipe(operators.startWith(downEvent), operators.map(function (event) {
      moveEvent = moveEvent || new DragMoveEvent();
      moveEvent.node = target;
      moveEvent.target = event.target;
      moveEvent.originalEvent = event;
      moveEvent.position = _this4.getPosition(event, moveEvent.position);
      var dragging = downEvent.down !== undefined && moveEvent.position !== undefined;

      if (dragging) {
        moveEvent.distance.x = moveEvent.position.x - downEvent.down.x;
        moveEvent.distance.y = moveEvent.position.y - downEvent.down.y;
        moveEvent.strength.x = moveEvent.distance.x / window.innerWidth * 2;
        moveEvent.strength.y = moveEvent.distance.y / window.innerHeight * 2;
        moveEvent.speed.x = downEvent.speed.x + (moveEvent.strength.x - downEvent.strength.x) * 0.1;
        moveEvent.speed.y = downEvent.speed.y + (moveEvent.strength.y - downEvent.strength.y) * 0.1;
        downEvent.distance.x = moveEvent.distance.x;
        downEvent.distance.y = moveEvent.distance.y;
        downEvent.speed.x = moveEvent.speed.x;
        downEvent.speed.y = moveEvent.speed.y;
        downEvent.strength.x = moveEvent.strength.x;
        downEvent.strength.y = moveEvent.strength.y;
        events$.next(moveEvent);
        return moveEvent;
      }
    }));
  };

  DragService.dismissEvent = function dismissEvent(event, events$, dismiss$, downEvent) {
    // console.log('DragService.dismissEvent', event);
    upEvent = upEvent || new DragUpEvent();
    events$.next(upEvent);
    dismiss$.next(); // console.log(downEvent.distance);

    if (downEvent && Math.abs(downEvent.distance.x) > 10) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    return upEvent;
  };

  DragService.up$ = function up$(target, events$, dismiss$, downEvent) {
    var _this5 = this;

    return rxjs.fromEvent(document, downEvent.originalEvent instanceof MouseEvent ? 'mouseup' : 'touchend').pipe(operators.map(function (event) {
      return _this5.dismissEvent(event, events$, dismiss$, downEvent);
    }));
  };

  DragService.observe$ = function observe$(target) {
    var _this6 = this;

    target = target || document;
    var events$ = DragService.events$ = new rxjs.ReplaySubject(1);
    var dismiss$ = DragService.dismiss$ = new rxjs.Subject();
    return this.down$(target, events$).pipe(operators.switchMap(function (downEvent) {
      DragService.downEvent = downEvent;
      return rxjs.merge(_this6.move$(target, events$, dismiss$, downEvent), _this6.up$(target, events$, dismiss$, downEvent)).pipe(operators.takeUntil(dismiss$));
    }), operators.switchMap(function () {
      return events$;
    }));
  };

  return DragService;
}();var OrbitMode = {
  Panorama: 'panorama',
  PanoramaGrid: 'panorama-grid',
  Model: 'model'
};
var OrbitEvent = function OrbitEvent() {};
var OrbitDragEvent = /*#__PURE__*/function (_OrbitEvent) {
  _inheritsLoose(OrbitDragEvent, _OrbitEvent);

  function OrbitDragEvent() {
    return _OrbitEvent.apply(this, arguments) || this;
  }

  return OrbitDragEvent;
}(OrbitEvent);
var OrbitResizeEvent = /*#__PURE__*/function (_OrbitEvent2) {
  _inheritsLoose(OrbitResizeEvent, _OrbitEvent2);

  function OrbitResizeEvent() {
    return _OrbitEvent2.apply(this, arguments) || this;
  }

  return OrbitResizeEvent;
}(OrbitEvent);
var OrbitMoveEvent = /*#__PURE__*/function (_OrbitEvent3) {
  _inheritsLoose(OrbitMoveEvent, _OrbitEvent3);

  function OrbitMoveEvent() {
    return _OrbitEvent3.apply(this, arguments) || this;
  }

  return OrbitMoveEvent;
}(OrbitEvent);
var orbitMoveEvent = new OrbitMoveEvent();
var orbitDragEvent = new OrbitDragEvent();
var orbitResizeEvent = new OrbitResizeEvent();
var DOLLY_MIN = 15;
var DOLLY_MAX = 75;
var ZOOM_MIN = 15;
var ZOOM_MAX = 75;

var OrbitService = /*#__PURE__*/function () {
  var _proto = OrbitService.prototype;

  _proto.getDollyValue = function getDollyValue() {
    return 1 - (this.dolly_ - DOLLY_MIN) / (DOLLY_MAX - DOLLY_MIN) - 0.5;
  };

  _proto.getZoomValue = function getZoomValue() {
    return 1 + 1 - (this.zoom_ - ZOOM_MIN) / (ZOOM_MAX - ZOOM_MIN);
  };

  _createClass(OrbitService, [{
    key: "dolly",
    get: function get() {
      return this.dolly_;
    },
    set: function set(dolly) {
      var clampedDolly = THREE.Math.clamp(dolly, DOLLY_MIN, DOLLY_MAX);

      if (this.dolly_ !== clampedDolly) {
        this.dolly_ = clampedDolly;
        this.update();
      }
    }
  }, {
    key: "zoom",
    get: function get() {
      return this.zoom_;
    },
    set: function set(zoom) {
      var clampedDolly = THREE.Math.clamp(zoom, DOLLY_MIN, DOLLY_MAX);

      if (this.zoom_ !== clampedDolly) {
        this.zoom_ = clampedDolly;
        this.update();
      }
    }
  }, {
    key: "mode",
    get: function get() {
      return this.mode_;
    },
    set: function set(mode) {
      if (this.mode_ !== mode) {
        this.mode_ = mode;
        OrbitService.mode = mode;
        this.update();
      }
    }
  }]);

  function OrbitService(camera) {
    this.mode_ = OrbitService.mode = OrbitMode.Panorama;
    this.dolly_ = 70;
    this.zoom_ = 70;
    this.longitude = 0;
    this.latitude = 0;
    this.direction = 1;
    this.radius = 101;
    this.position = new THREE.Vector3(); // this.speed = 1;

    this.inertia = new THREE.Vector2();
    this.rotation = new THREE.Euler(0, 0, 0, 'XYZ');
    this.target = new THREE.Vector3();
    this.updatePosition = new THREE.Vector3();
    this.updateTarget = new THREE.Vector3();
    this.camera = camera;
    this.setLongitudeLatitude(0, 0);
    this.events$ = new rxjs.ReplaySubject(1);
  }

  _proto.setOrientation = function setOrientation(orientation) {
    if (orientation) {
      this.setLongitudeLatitude(orientation.longitude, orientation.latitude);
      this.update();
    }
  };

  _proto.getOrientation = function getOrientation() {
    return {
      latitude: this.latitude,
      longitude: this.longitude
    };
  };

  _proto.setLongitudeLatitude = function setLongitudeLatitude(longitude, latitude) {
    latitude = Math.max(-80, Math.min(80, latitude));
    this.longitude = (longitude < 0 ? 360 + longitude : longitude) % 360;
    this.latitude = latitude; // console.log(this.longitude);

    var phi = THREE.Math.degToRad(90 - latitude);
    var theta = THREE.Math.degToRad(longitude);
    this.phi = phi;
    this.theta = theta;
  };

  _proto.observe$ = function observe$(node) {
    var _this = this;

    // const camera = this.camera;
    var latitude, longitude;
    return rxjs.combineLatest([KeyboardService.keys$(), DragService.observe$(node)]).pipe(operators.filter(function (event) {
      return !StateService.state.locked && !StateService.state.spying;
    }), operators.map(function (datas) {
      var keys = datas[0];
      var event = datas[1]; // const group = this.objects.children[this.index];

      if (event instanceof DragDownEvent) {
        latitude = _this.latitude;
        longitude = _this.longitude;
      } else if (event instanceof DragMoveEvent) {
        if (keys.Shift) {
          _this.events$.next(orbitDragEvent);
        } else if (keys.Control) {
          _this.events$.next(orbitResizeEvent);
        } else {
          var flip = _this.mode_ === OrbitMode.Model ? -1 : 1;

          _this.setLongitudeLatitude(longitude - event.distance.x * 0.1 * flip, latitude + event.distance.y * 0.1);
        }
      }

      return event;
    }), operators.filter(function (event) {
      return event instanceof DragMoveEvent;
    }), operators.startWith({
      latitude: this.latitude,
      longitude: this.longitude
    }), operators.tap(function (event) {
      return _this.update();
    }), operators.switchMap(function (event) {
      return _this.events$;
    }));
  };

  _proto.update = function update() {
    var radius,
        position = this.updatePosition,
        target = this.updateTarget;
    var zoom = this.getZoomValue();
    var dolly = this.getDollyValue(); // console.log('dolly', dolly);

    var phi = THREE.MathUtils.degToRad(90 - this.latitude);
    var theta = THREE.MathUtils.degToRad(this.longitude);
    var camera = this.camera;

    switch (this.mode_) {
      case OrbitMode.Model:
        radius =  3;
        position.copy(this.position);
        target.x = this.position.x + radius * Math.sin(phi) * Math.cos(theta);
        target.y = this.position.y + radius * Math.cos(phi);
        target.z = this.position.z + radius * Math.sin(phi) * Math.sin(theta);
        camera.target.copy(position);
        camera.position.copy(target);
        break;

      default:
        radius = this.radius;
        target.x = this.position.x + radius * Math.sin(phi) * Math.cos(theta);
        target.y = this.position.y + radius * Math.cos(phi);
        target.z = this.position.z + radius * Math.sin(phi) * Math.sin(theta);

        {
          position.copy(this.position);
        }

        camera.position.copy(position);
        camera.target.copy(target);
    } // console.log(camera.position.x, camera.position.y, camera.position.z);
    // console.log(camera.target.x, camera.target.y, camera.target.z);
    // console.log('phi', phi, 'theta', theta);
    // this.inverse();


    {
      camera.zoom = zoom;
    }

    camera.lookAt(camera.target);
    camera.updateProjectionMatrix();
    this.events$.next(orbitMoveEvent);
  }
  /*
  inverse() {
  	let position, radius;
  	switch (this.mode_) {
  		case OrbitMode.Model:
  			radius = 3;
  			position = this.camera.position;
  			break;
  		default:
  			radius = this.radius;
  			position = this.camera.target;
  	}
  	radius = Math.sqrt(position.x * position.x + position.y * position.y + position.z * position.z);
  	const phi = Math.acos(position.y / radius);
  	const theta = Math.atan2(position.z, position.x);
  	// console.log('phi', phi, 'theta', theta);
  }
  */
  ;

  _proto.render = function render() {
    this.longitude += 0.025;
    this.update();
  };

  _proto.walk = function walk(position, callback) {
    var _this2 = this;

    var radius;

    switch (this.mode_) {
      case OrbitMode.Model:
        radius = 3;
        break;

      default:
        radius = this.radius;
    }

    var heading = new THREE.Vector2(position.x, position.y).normalize().multiplyScalar(radius);
    var headingTheta = Math.atan2(heading.y, heading.x);
    var headingLongitude = THREE.MathUtils.radToDeg(headingTheta);
    headingLongitude = (headingLongitude < 0 ? 360 + headingLongitude : headingLongitude) % 360;
    var headingLatitude = 0;
    var latitude = this.latitude;
    var longitude = this.longitude;
    var differenceLongitude = headingLongitude - longitude;
    differenceLongitude = Math.abs(differenceLongitude) > 180 ? differenceLongitude - 360 * (differenceLongitude / Math.abs(differenceLongitude)) : differenceLongitude;
    var differenceLatitude = headingLatitude - latitude;
    differenceLatitude = Math.abs(differenceLatitude) > 90 ? differenceLatitude - 90 * (differenceLatitude / Math.abs(differenceLatitude)) : differenceLatitude; // console.log('headingTheta', headingTheta, 'headingLongitude', headingLongitude, 'differenceLongitude', differenceLongitude);

    var from = {
      tween: 0
    };
    gsap.to(from, {
      duration: 0.7,
      tween: 1,
      delay: 0,
      ease: Power2.easeInOut,
      onUpdate: function onUpdate() {
        _this2.setLongitudeLatitude(longitude + differenceLongitude * from.tween, latitude + differenceLatitude * from.tween);

        _this2.position.set(position.x * from.tween, 0, position.y * from.tween);

        _this2.update();
      },
      onComplete: function onComplete() {
        // this.walkComplete(headingLongitude, headingLatitude);
        if (typeof callback === 'function') {
          callback(headingLongitude, headingLatitude);
        }
      }
    });
  };

  _proto.walkComplete = function walkComplete(headingLongitude, headingLatitude) {
    this.setLongitudeLatitude(headingLongitude, headingLatitude);
    this.position.set(0, 0, 0);
    this.update();
  };

  _proto.lookAt = function lookAt(object3d) {
    // !!! fix
    if (object3d) {
      /*
      const camera = this.camera;
      camera.target.copy(object3d.position);
      camera.lookAt(camera.target);
      camera.updateProjectionMatrix();
      */
      var position = object3d.position;
      var radius;

      switch (this.mode_) {
        case OrbitMode.Model:
          radius = 3;
          break;

        default:
          radius = this.radius;
      }

      var heading = new THREE.Vector3(position.x, position.z, position.y).normalize().multiplyScalar(radius);
      var theta = Math.atan2(heading.y, heading.x);
      var phi = Math.acos(heading.z / radius);
      var longitude = THREE.MathUtils.radToDeg(theta);
      longitude = (longitude < 0 ? 360 + longitude : longitude) % 360;
      var latitude = 90 - THREE.MathUtils.radToDeg(phi);
      latitude = Math.max(-80, Math.min(80, latitude));
      this.setLongitudeLatitude(longitude, latitude);
      this.update(); // this.events$.next(orbitMoveEvent);
    }
    /*
    let radius, position = this.updatePosition, target = this.updateTarget;
    const zoom = this.getZoomValue();
    const dolly = this.getDollyValue();
    // console.log('dolly', dolly);
    const phi = THREE.MathUtils.degToRad(90 - this.latitude);
    const theta = THREE.MathUtils.degToRad(this.longitude);
    const camera = this.camera;
    switch (this.mode_) {
    	case OrbitMode.Model:
    		radius = USE_DOLLY ? 3 + 3 * dolly : 3;
    		position.copy(this.position);
    		target.x = this.position.x + radius * Math.sin(phi) * Math.cos(theta);
    		target.y = this.position.y + radius * Math.cos(phi);
    		target.z = this.position.z + radius * Math.sin(phi) * Math.sin(theta);
    		camera.target.copy(position);
    		camera.position.copy(target);
    		break;
    	default:
    		radius = this.radius;
    		target.x = this.position.x + radius * Math.sin(phi) * Math.cos(theta);
    		target.y = this.position.y + radius * Math.cos(phi);
    		target.z = this.position.z + radius * Math.sin(phi) * Math.sin(theta);
    		if (USE_DOLLY) {
    			position.copy(target).position.multiplyScalar(-1 * dolly);
    		} else {
    			position.copy(this.position);
    		}
    		camera.position.copy(position);
    		camera.target.copy(target);
    }
    // console.log(camera.position.x, camera.position.y, camera.position.z);
    // console.log(camera.target.x, camera.target.y, camera.target.z);
    // console.log('phi', phi, 'theta', theta);
    // this.inverse();
    if (!USE_DOLLY) {
    	camera.zoom = zoom;
    }
    camera.lookAt(camera.target);
    camera.updateProjectionMatrix();
    this.events$.next(orbitMoveEvent);
    */

  };

  _proto.setVRCamera = function setVRCamera(camera) {
    if (camera) {
      // head.quaternion.set(camera[3], camera[4], camera[5], camera[6]);
      // head.position.set(camera[0], camera[1], camera[2]);
      var radius = this.radius;
      var position = new THREE.Vector3(0, 0, -radius);
      var quaternion = new THREE.Quaternion(camera[3], camera[4], camera[5], camera[6]);
      position.applyQuaternion(quaternion);
      var heading = new THREE.Vector3(position.x, position.z, position.y).normalize().multiplyScalar(radius);
      var theta = Math.atan2(heading.y, heading.x);
      var phi = Math.acos(heading.z / radius);
      var longitude = THREE.MathUtils.radToDeg(theta);
      longitude = (longitude < 0 ? 360 + longitude : longitude) % 360;
      var latitude = 90 - THREE.MathUtils.radToDeg(phi);
      latitude = Math.max(-80, Math.min(80, latitude));
      this.setLongitudeLatitude(longitude, latitude);
      this.update();
    }
  };

  return OrbitService;
}();var W$1 = 12;
var H$1 = 27;
var D = 0.5;
var R = 4 / 3;
var COLORS$1 = [0xffffff, 0xffcc00, 0x00ffcc, 0x00ccff, 0xccff00, 0xcc00ff];
var PhoneStreamElement = /*#__PURE__*/function () {
  var _proto = PhoneStreamElement.prototype;

  _proto.setRemote = function setRemote(remote, i, total) {
    var _this = this;

    this.remote = remote;
    var s,
        c,
        r,
        w,
        h,
        sx,
        sy,
        sz = 0.01 * D; // !!! double distance

    if (total < 4) {
      s = 1;
      c = 0;
      r = i;
      w = 0.01 * W$1 * s;
      h = w / R;
      sx = 0;
      sy = h / 2 - total * h / 2;
      this.plane.position.set(sx, sy + h * i, sz);
    } else {
      s = 0.5;
      c = i % 2;
      r = Math.floor(i / 2);
      w = 0.01 * W$1 * s;
      h = w / R;
      sx = -w / 2;
      sy = h / 2 - Math.ceil(total / 2) * h / 2;
      this.plane.position.set(sx + c * w, sy + r * h, sz);
    }

    this.plane.scale.set(s, s, s); // console.log(this.plane.position);

    if (typeof remote === 'number') {
      this.plane.material.color.set(COLORS$1[i % COLORS$1.length]);
    } else {
      if (remote.texture) {
        this.plane.material.map = remote.texture;
        this.plane.material.needsUpdate = true;
      } else {
        this.addStreamTexture(remote.getId(), function (texture) {
          remote.texture = texture;
          _this.plane.material.map = texture;
          _this.plane.material.needsUpdate = true;
        });
      }
    }
  };

  _proto.addStreamTexture = function addStreamTexture(streamId, callback) {
    var target = "#stream-" + streamId;
    var video = document.querySelector(target + " video");

    if (!video) {
      return;
    }

    var onPlaying = function onPlaying() {
      var texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.mapping = THREE.UVMapping;
      texture.format = THREE.RGBFormat;
      texture.needsUpdate = true;

      if (typeof callback === 'function') {
        callback(texture);
      }
    };

    video.crossOrigin = 'anonymous';

    if (video.readyState >= video.HAVE_FUTURE_DATA) {
      onPlaying();
    } else {
      video.oncanplay = function () {
        onPlaying();
      };
    }
  };

  _createClass(PhoneStreamElement, null, [{
    key: "geometry",
    get: function get() {
      var geometry = new THREE.PlaneBufferGeometry(0.01 * W$1, 0.01 * W$1 / R, 2, 2);
      return geometry;
    }
  }]);

  function PhoneStreamElement() {
    var geometry = PhoneStreamElement.geometry;
    var material = new THREE.MeshStandardMaterial({
      // depthTest: false,
      color: 0xffffff,
      side: THREE.DoubleSide
    });
    var plane = this.plane = new THREE.Mesh(geometry, material);
  }

  return PhoneStreamElement;
}();

var PhoneElement = /*#__PURE__*/function () {
  _createClass(PhoneElement, [{
    key: "remotes",
    set: function set(remotes) {
      var _this2 = this;

      // console.log('PhoneElement', remotes);
      remotes.forEach(function (remote, i) {
        var stream = _this2.streams[i];

        if (!stream) {
          stream = new PhoneStreamElement();
        }

        stream.setRemote(remote, i, remotes.length);

        _this2.phone.add(stream.plane);

        _this2.streams[i] = stream;
      });

      for (var i = remotes.length; i < this.streams.length; i++) {
        this.phone.remove(this.streams[i].plane);
      }

      this.streams.length = remotes.length;
    }
  }]);

  function PhoneElement() {
    var _this3 = this;

    var mesh = this.mesh = new THREE.Group();
    var phone = this.phone = this.create();
    mesh.add(phone);
    var streams = this.streams = [];
    StreamService.remotes$.subscribe(function (remotes) {
      _this3.remotes = remotes;
    });
  }

  var _proto2 = PhoneElement.prototype;

  _proto2.create = function create() {
    var geometry = new THREE.BoxBufferGeometry(0.01 * W$1, 0.01 * H$1, 0.01 * D, 2, 2, 1);
    var material = new THREE.MeshStandardMaterial({
      // depthTest: false,
      color: 0x202020
    });
    var phone = new THREE.Mesh(geometry, material);
    phone.rotation.set(-Math.PI / 4, 0, 0);
    return phone;
  };

  return PhoneElement;
}();var ORIGIN = new THREE.Vector3();

var PointerElement = /*#__PURE__*/function () {
  function PointerElement(color) {
    if (color === void 0) {
      color = '#ffffff';
    }

    var geometry = new THREE.PlaneBufferGeometry(1.2, 1.2, 2, 2);
    var loader = new THREE.TextureLoader();
    var texture = loader.load(environment.getPath('textures/ui/nav-point.png'));
    var material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      depthTest: false,
      depthWrite: false,
      map: texture,
      transparent: true,
      opacity: 0.9
    });
    var mesh = this.mesh = new THREE.Mesh(geometry, material);
    mesh.renderOrder = environment.renderOrder.pointer;
    mesh.position.set(-100000, -100000, -100000);
  }

  var _proto = PointerElement.prototype;

  _proto.update = function update() {
    if (Interactive.lastIntersectedObject) {
      var mesh = this.mesh;
      var position = Interactive.lastIntersectedObject.intersection.point.multiplyScalar(0.99);
      mesh.position.set(position.x, position.y, position.z);
      var s = mesh.position.length() / 80;
      mesh.scale.set(s, s, s);
      mesh.lookAt(ORIGIN);
    }
  };

  _proto.setPosition = function setPosition(x, y, z) {
    var mesh = this.mesh;
    mesh.position.set(x, y, z).multiplyScalar(80);
    var s = mesh.position.length() / 80;
    mesh.scale.set(s, s, s);
    mesh.lookAt(ORIGIN); // console.log('PointerElement.setPosition', x, y, z);
  };

  return PointerElement;
}();/**
 * @webxr-input-profiles/motion-controllers 1.0.0 https://github.com/immersive-web/webxr-input-profiles
 */
var Constants = {
  Handedness: Object.freeze({
    NONE: 'none',
    LEFT: 'left',
    RIGHT: 'right'
  }),
  ComponentState: Object.freeze({
    DEFAULT: 'default',
    TOUCHED: 'touched',
    PRESSED: 'pressed'
  }),
  ComponentProperty: Object.freeze({
    BUTTON: 'button',
    X_AXIS: 'xAxis',
    Y_AXIS: 'yAxis',
    STATE: 'state'
  }),
  ComponentType: Object.freeze({
    TRIGGER: 'trigger',
    SQUEEZE: 'squeeze',
    TOUCHPAD: 'touchpad',
    THUMBSTICK: 'thumbstick',
    BUTTON: 'button'
  }),
  ButtonTouchThreshold: 0.05,
  AxisTouchThreshold: 0.1,
  VisualResponseProperty: Object.freeze({
    TRANSFORM: 'transform',
    VISIBILITY: 'visibility'
  })
};
/**
 * @description Static helper function to fetch a JSON file and turn it into a JS object
 * @param {string} path - Path to JSON file to be fetched
 */

function fetchJsonFile(_x) {
  return _fetchJsonFile.apply(this, arguments);
}

function _fetchJsonFile() {
  _fetchJsonFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(path);

          case 2:
            response = _context.sent;

            if (response.ok) {
              _context.next = 7;
              break;
            }

            throw new Error(response.statusText);

          case 7:
            return _context.abrupt("return", response.json());

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchJsonFile.apply(this, arguments);
}

function fetchProfilesList(_x2) {
  return _fetchProfilesList.apply(this, arguments);
}

function _fetchProfilesList() {
  _fetchProfilesList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(basePath) {
    var profileListFileName, profilesList;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (basePath) {
              _context2.next = 2;
              break;
            }

            throw new Error('No basePath supplied');

          case 2:
            profileListFileName = 'profilesList.json';
            _context2.next = 5;
            return fetchJsonFile(basePath + "/" + profileListFileName);

          case 5:
            profilesList = _context2.sent;
            return _context2.abrupt("return", profilesList);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _fetchProfilesList.apply(this, arguments);
}

function fetchProfile(_x3, _x4, _x5, _x6) {
  return _fetchProfile.apply(this, arguments);
}
/** @constant {Object} */


function _fetchProfile() {
  _fetchProfile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(xrInputSource, basePath, defaultProfile, getAssetPath) {
    var supportedProfilesList, match, supportedProfile, profile, assetPath, layout;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (defaultProfile === void 0) {
              defaultProfile = null;
            }

            if (getAssetPath === void 0) {
              getAssetPath = true;
            }

            if (xrInputSource) {
              _context3.next = 4;
              break;
            }

            throw new Error('No xrInputSource supplied');

          case 4:
            if (basePath) {
              _context3.next = 6;
              break;
            }

            throw new Error('No basePath supplied');

          case 6:
            _context3.next = 8;
            return fetchProfilesList(basePath);

          case 8:
            supportedProfilesList = _context3.sent;
            xrInputSource.profiles.some(function (profileId) {
              var supportedProfile = supportedProfilesList[profileId];

              if (supportedProfile) {
                match = {
                  profileId: profileId,
                  profilePath: basePath + "/" + supportedProfile.path,
                  deprecated: !!supportedProfile.deprecated
                };
              }

              return !!match;
            });

            if (match) {
              _context3.next = 17;
              break;
            }

            if (defaultProfile) {
              _context3.next = 13;
              break;
            }

            throw new Error('No matching profile name found');

          case 13:
            supportedProfile = supportedProfilesList[defaultProfile];

            if (supportedProfile) {
              _context3.next = 16;
              break;
            }

            throw new Error("No matching profile name found and default profile \"" + defaultProfile + "\" missing.");

          case 16:
            match = {
              profileId: defaultProfile,
              profilePath: basePath + "/" + supportedProfile.path,
              deprecated: !!supportedProfile.deprecated
            };

          case 17:
            _context3.next = 19;
            return fetchJsonFile(match.profilePath);

          case 19:
            profile = _context3.sent;

            if (!getAssetPath) {
              _context3.next = 25;
              break;
            }

            if (xrInputSource.handedness === 'any') {
              layout = profile.layouts[Object.keys(profile.layouts)[0]];
            } else {
              layout = profile.layouts[xrInputSource.handedness];
            }

            if (layout) {
              _context3.next = 24;
              break;
            }

            throw new Error("No matching handedness, " + xrInputSource.handedness + ", in profile " + match.profileId);

          case 24:
            if (layout.assetPath) {
              assetPath = match.profilePath.replace('profile.json', layout.assetPath);
            }

          case 25:
            return _context3.abrupt("return", {
              profile: profile,
              assetPath: assetPath
            });

          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _fetchProfile.apply(this, arguments);
}

var defaultComponentValues = {
  xAxis: 0,
  yAxis: 0,
  button: 0,
  state: Constants.ComponentState.DEFAULT
};
/**
 * @description Converts an X, Y coordinate from the range -1 to 1 (as reported by the Gamepad
 * API) to the range 0 to 1 (for interpolation). Also caps the X, Y values to be bounded within
 * a circle. This ensures that thumbsticks are not animated outside the bounds of their physical
 * range of motion and touchpads do not report touch locations off their physical bounds.
 * @param {number} x The original x coordinate in the range -1 to 1
 * @param {number} y The original y coordinate in the range -1 to 1
 */

function normalizeAxes(x, y) {
  if (x === void 0) {
    x = 0;
  }

  if (y === void 0) {
    y = 0;
  }

  var xAxis = x;
  var yAxis = y; // Determine if the point is outside the bounds of the circle
  // and, if so, place it on the edge of the circle

  var hypotenuse = Math.sqrt(x * x + y * y);

  if (hypotenuse > 1) {
    var theta = Math.atan2(y, x);
    xAxis = Math.cos(theta);
    yAxis = Math.sin(theta);
  } // Scale and move the circle so values are in the interpolation range.  The circle's origin moves
  // from (0, 0) to (0.5, 0.5). The circle's radius scales from 1 to be 0.5.


  var result = {
    normalizedXAxis: xAxis * 0.5 + 0.5,
    normalizedYAxis: yAxis * 0.5 + 0.5
  };
  return result;
}
/**
 * Contains the description of how the 3D model should visually respond to a specific user input.
 * This is accomplished by initializing the object with the name of a node in the 3D model and
 * property that need to be modified in response to user input, the name of the nodes representing
 * the allowable range of motion, and the name of the input which triggers the change. In response
 * to the named input changing, this object computes the appropriate weighting to use for
 * interpolating between the range of motion nodes.
 */


var VisualResponse = /*#__PURE__*/function () {
  function VisualResponse(visualResponseDescription) {
    this.componentProperty = visualResponseDescription.componentProperty;
    this.states = visualResponseDescription.states;
    this.valueNodeName = visualResponseDescription.valueNodeName;
    this.valueNodeProperty = visualResponseDescription.valueNodeProperty;

    if (this.valueNodeProperty === Constants.VisualResponseProperty.TRANSFORM) {
      this.minNodeName = visualResponseDescription.minNodeName;
      this.maxNodeName = visualResponseDescription.maxNodeName;
    } // Initializes the response's current value based on default data


    this.value = 0;
    this.updateFromComponent(defaultComponentValues);
  }
  /**
   * Computes the visual response's interpolation weight based on component state
   * @param {Object} componentValues - The component from which to update
   * @param {number} xAxis - The reported X axis value of the component
   * @param {number} yAxis - The reported Y axis value of the component
   * @param {number} button - The reported value of the component's button
   * @param {string} state - The component's active state
   */


  var _proto = VisualResponse.prototype;

  _proto.updateFromComponent = function updateFromComponent(_ref) {
    var xAxis = _ref.xAxis,
        yAxis = _ref.yAxis,
        button = _ref.button,
        state = _ref.state;

    var _normalizeAxes = normalizeAxes(xAxis, yAxis),
        normalizedXAxis = _normalizeAxes.normalizedXAxis,
        normalizedYAxis = _normalizeAxes.normalizedYAxis;

    switch (this.componentProperty) {
      case Constants.ComponentProperty.X_AXIS:
        this.value = this.states.includes(state) ? normalizedXAxis : 0.5;
        break;

      case Constants.ComponentProperty.Y_AXIS:
        this.value = this.states.includes(state) ? normalizedYAxis : 0.5;
        break;

      case Constants.ComponentProperty.BUTTON:
        this.value = this.states.includes(state) ? button : 0;
        break;

      case Constants.ComponentProperty.STATE:
        if (this.valueNodeProperty === Constants.VisualResponseProperty.VISIBILITY) {
          this.value = this.states.includes(state);
        } else {
          this.value = this.states.includes(state) ? 1.0 : 0.0;
        }

        break;

      default:
        throw new Error("Unexpected visualResponse componentProperty " + this.componentProperty);
    }
  };

  return VisualResponse;
}();

var Component = /*#__PURE__*/function () {
  /**
   * @param {Object} componentId - Id of the component
   * @param {Object} componentDescription - Description of the component to be created
   */
  function Component(componentId, componentDescription) {
    var _this = this;

    if (!componentId || !componentDescription || !componentDescription.visualResponses || !componentDescription.gamepadIndices || Object.keys(componentDescription.gamepadIndices).length === 0) {
      throw new Error('Invalid arguments supplied');
    }

    this.id = componentId;
    this.type = componentDescription.type;
    this.rootNodeName = componentDescription.rootNodeName;
    this.touchPointNodeName = componentDescription.touchPointNodeName; // Build all the visual responses for this component

    this.visualResponses = {};
    Object.keys(componentDescription.visualResponses).forEach(function (responseName) {
      var visualResponse = new VisualResponse(componentDescription.visualResponses[responseName]);
      _this.visualResponses[responseName] = visualResponse;
    }); // Set default values

    this.gamepadIndices = Object.assign({}, componentDescription.gamepadIndices);
    this.values = {
      state: Constants.ComponentState.DEFAULT,
      button: this.gamepadIndices.button !== undefined ? 0 : undefined,
      xAxis: this.gamepadIndices.xAxis !== undefined ? 0 : undefined,
      yAxis: this.gamepadIndices.yAxis !== undefined ? 0 : undefined
    };
  }

  var _proto2 = Component.prototype;

  /**
   * @description Poll for updated data based on current gamepad state
   * @param {Object} gamepad - The gamepad object from which the component data should be polled
   */
  _proto2.updateFromGamepad = function updateFromGamepad(gamepad) {
    var _this2 = this;

    // Set the state to default before processing other data sources
    this.values.state = Constants.ComponentState.DEFAULT; // Get and normalize button

    if (this.gamepadIndices.button !== undefined && gamepad.buttons.length > this.gamepadIndices.button) {
      var gamepadButton = gamepad.buttons[this.gamepadIndices.button];
      this.values.button = gamepadButton.value;
      this.values.button = this.values.button < 0 ? 0 : this.values.button;
      this.values.button = this.values.button > 1 ? 1 : this.values.button; // Set the state based on the button

      if (gamepadButton.pressed || this.values.button === 1) {
        this.values.state = Constants.ComponentState.PRESSED;
      } else if (gamepadButton.touched || this.values.button > Constants.ButtonTouchThreshold) {
        this.values.state = Constants.ComponentState.TOUCHED;
      }
    } // Get and normalize x axis value


    if (this.gamepadIndices.xAxis !== undefined && gamepad.axes.length > this.gamepadIndices.xAxis) {
      this.values.xAxis = gamepad.axes[this.gamepadIndices.xAxis];
      this.values.xAxis = this.values.xAxis < -1 ? -1 : this.values.xAxis;
      this.values.xAxis = this.values.xAxis > 1 ? 1 : this.values.xAxis; // If the state is still default, check if the xAxis makes it touched

      if (this.values.state === Constants.ComponentState.DEFAULT && Math.abs(this.values.xAxis) > Constants.AxisTouchThreshold) {
        this.values.state = Constants.ComponentState.TOUCHED;
      }
    } // Get and normalize Y axis value


    if (this.gamepadIndices.yAxis !== undefined && gamepad.axes.length > this.gamepadIndices.yAxis) {
      this.values.yAxis = gamepad.axes[this.gamepadIndices.yAxis];
      this.values.yAxis = this.values.yAxis < -1 ? -1 : this.values.yAxis;
      this.values.yAxis = this.values.yAxis > 1 ? 1 : this.values.yAxis; // If the state is still default, check if the yAxis makes it touched

      if (this.values.state === Constants.ComponentState.DEFAULT && Math.abs(this.values.yAxis) > Constants.AxisTouchThreshold) {
        this.values.state = Constants.ComponentState.TOUCHED;
      }
    } // Update the visual response weights based on the current component data


    Object.values(this.visualResponses).forEach(function (visualResponse) {
      visualResponse.updateFromComponent(_this2.values);
    });
  };

  _createClass(Component, [{
    key: "data",
    get: function get() {
      var data = _objectSpread2({
        id: this.id
      }, this.values);

      return data;
    }
  }]);

  return Component;
}();
/**
  * @description Builds a motion controller with components and visual responses based on the
  * supplied profile description. Data is polled from the xrInputSource's gamepad.
  * @author Nell Waliczek / https://github.com/NellWaliczek
*/


var MotionController = /*#__PURE__*/function () {
  /**
   * @param {Object} xrInputSource - The XRInputSource to build the MotionController around
   * @param {Object} profile - The best matched profile description for the supplied xrInputSource
   * @param {Object} assetUrl
   */
  function MotionController(xrInputSource, profile, assetUrl) {
    var _this3 = this;

    if (!xrInputSource) {
      throw new Error('No xrInputSource supplied');
    }

    if (!profile) {
      throw new Error('No profile supplied');
    }

    this.xrInputSource = xrInputSource;
    this.assetUrl = assetUrl;
    this.id = profile.profileId; // Build child components as described in the profile description

    this.layoutDescription = profile.layouts[xrInputSource.handedness];
    this.components = {};
    Object.keys(this.layoutDescription.components).forEach(function (componentId) {
      var componentDescription = _this3.layoutDescription.components[componentId];
      _this3.components[componentId] = new Component(componentId, componentDescription);
    }); // Initialize components based on current gamepad state

    this.updateFromGamepad();
  }

  var _proto3 = MotionController.prototype;

  /**
   * @description Poll for updated data based on current gamepad state
   */
  _proto3.updateFromGamepad = function updateFromGamepad() {
    var _this4 = this;

    Object.values(this.components).forEach(function (component) {
      component.updateFromGamepad(_this4.xrInputSource.gamepad);
    });
  };

  _createClass(MotionController, [{
    key: "gripSpace",
    get: function get() {
      return this.xrInputSource.gripSpace;
    }
  }, {
    key: "targetRaySpace",
    get: function get() {
      return this.xrInputSource.targetRaySpace;
    }
    /**
     * @description Returns a subset of component data for simplified debugging
     */

  }, {
    key: "data",
    get: function get() {
      var data = [];
      Object.values(this.components).forEach(function (component) {
        data.push(component.data);
      });
      return data;
    }
  }]);

  return MotionController;
}();// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
var DEFAULT_PROFILES_PATH = 'https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles';
var DEFAULT_PROFILE = 'generic-trigger';

function XRControllerModel() {
  THREE.Object3D.call(this);
  this.motionController = null;
  this.envMap = null;
}

XRControllerModel.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
  constructor: XRControllerModel,
  setEnvironmentMap: function setEnvironmentMap(envMap) {
    var _this = this;

    if (this.envMap == envMap) {
      return this;
    }

    this.envMap = envMap;
    this.traverse(function (child) {
      if (child.isMesh) {
        child.material.envMap = _this.envMap;
        child.material.needsUpdate = true;
      }
    });
    return this;
  },

  /**
   * Polls data from the XRInputSource and updates the model's components to match
   * the real world data
   */
  updateMatrixWorld: function updateMatrixWorld(force) {
    THREE.Object3D.prototype.updateMatrixWorld.call(this, force);
    if (!this.motionController) return; // Cause the MotionController to poll the Gamepad for data

    this.motionController.updateFromGamepad(); // Update the 3D model to reflect the button, thumbstick, and touchpad state

    Object.values(this.motionController.components).forEach(function (component) {
      // Update node data based on the visual responses' current states
      Object.values(component.visualResponses).forEach(function (visualResponse) {
        var valueNode = visualResponse.valueNode,
            minNode = visualResponse.minNode,
            maxNode = visualResponse.maxNode,
            value = visualResponse.value,
            valueNodeProperty = visualResponse.valueNodeProperty; // Skip if the visual response node is not found. No error is needed,
        // because it will have been reported at load time.

        if (!valueNode) return; // Calculate the new properties based on the weight supplied

        if (valueNodeProperty === Constants.VisualResponseProperty.VISIBILITY) {
          valueNode.visible = value;
        } else if (valueNodeProperty === Constants.VisualResponseProperty.TRANSFORM) {
          THREE.Quaternion.slerp(minNode.quaternion, maxNode.quaternion, valueNode.quaternion, value);
          valueNode.position.lerpVectors(minNode.position, maxNode.position, value);
        }
      });
    });
  }
});
/**
 * Walks the model's tree to find the nodes needed to animate the components and
 * saves them to the motionContoller components for use in the frame loop. When
 * touchpads are found, attaches a touch dot to them.
 */

function findNodes(motionController, scene) {
  // Loop through the components and find the nodes needed for each components' visual responses
  Object.values(motionController.components).forEach(function (component) {
    var type = component.type,
        touchPointNodeName = component.touchPointNodeName,
        visualResponses = component.visualResponses;

    if (type === Constants.ComponentType.TOUCHPAD) {
      component.touchPointNode = scene.getObjectByName(touchPointNodeName);

      if (component.touchPointNode) {
        // Attach a touch dot to the touchpad.
        var sphereGeometry = new THREE.SphereBufferGeometry(0.001);
        var material = new THREE.MeshBasicMaterial({
          color: 0x0000FF
        });
        var sphere = new THREE.Mesh(sphereGeometry, material);
        component.touchPointNode.add(sphere);
      } else {
        console.warn("Could not find touch dot, " + component.touchPointNodeName + ", in touchpad component " + component.id);
      }
    } // Loop through all the visual responses to be applied to this component


    Object.values(visualResponses).forEach(function (visualResponse) {
      var valueNodeName = visualResponse.valueNodeName,
          minNodeName = visualResponse.minNodeName,
          maxNodeName = visualResponse.maxNodeName,
          valueNodeProperty = visualResponse.valueNodeProperty; // If animating a transform, find the two nodes to be interpolated between.

      if (valueNodeProperty === Constants.VisualResponseProperty.TRANSFORM) {
        visualResponse.minNode = scene.getObjectByName(minNodeName);
        visualResponse.maxNode = scene.getObjectByName(maxNodeName); // If the extents cannot be found, skip this animation

        if (!visualResponse.minNode) {
          console.warn("Could not find " + minNodeName + " in the model");
          return;
        }

        if (!visualResponse.maxNode) {
          console.warn("Could not find " + maxNodeName + " in the model");
          return;
        }
      } // If the target node cannot be found, skip this animation


      visualResponse.valueNode = scene.getObjectByName(valueNodeName);

      if (!visualResponse.valueNode) {
        console.warn("Could not find " + valueNodeName + " in the model");
      }
    });
  });
}

function addAssetSceneToControllerModel(controllerModel, scene) {
  // Find the nodes needed for animation and cache them on the motionController.
  findNodes(controllerModel.motionController, scene); // Apply any environment map that the mesh already has set.

  if (controllerModel.envMap) {
    scene.traverse(function (child) {
      if (child.isMesh) {
        child.material.envMap = controllerModel.envMap;
        child.material.needsUpdate = true;
      }
    });
  } // Add the glTF scene to the controllerModel.


  controllerModel.add(scene);
}

var XRControllerModelFactory = function () {
  function XRControllerModelFactory(gltfLoader) {
    if (gltfLoader === void 0) {
      gltfLoader = null;
    }

    this.gltfLoader = gltfLoader;
    this.path = DEFAULT_PROFILES_PATH;
    this._assetCache = {}; // If a GLTFLoader wasn't supplied to the constructor create a new one.

    if (!this.gltfLoader) {
      this.gltfLoader = new THREE.GLTFLoader();
    }
  }

  XRControllerModelFactory.prototype = {
    constructor: XRControllerModelFactory,
    createControllerModel: function createControllerModel(controller) {
      var _this2 = this;

      var controllerModel = new XRControllerModel();
      var scene = null;
      controller.addEventListener('connected', function (event) {
        var xrInputSource = event.data;
        if (xrInputSource.targetRayMode !== 'tracked-pointer' || !xrInputSource.gamepad) return;
        fetchProfile(xrInputSource, _this2.path, DEFAULT_PROFILE).then(function (_ref) {
          var profile = _ref.profile,
              assetPath = _ref.assetPath;
          controllerModel.motionController = new MotionController(xrInputSource, profile, assetPath);
          var cachedAsset = _this2._assetCache[controllerModel.motionController.assetUrl];

          if (cachedAsset) {
            scene = cachedAsset.scene.clone();
            addAssetSceneToControllerModel(controllerModel, scene);
          } else {
            if (!_this2.gltfLoader) {
              throw new Error("GLTFLoader not set.");
            }

            _this2.gltfLoader.setPath('');

            _this2.gltfLoader.load(controllerModel.motionController.assetUrl, function (asset) {
              _this2._assetCache[controllerModel.motionController.assetUrl] = asset;
              scene = asset.scene.clone();
              addAssetSceneToControllerModel(controllerModel, scene);
            }, null, function () {
              throw new Error("Asset " + controllerModel.motionController.assetUrl + " missing or malformed.");
            });
          }
        }).catch(function (err) {
          console.warn(err);
        });
      });
      controller.addEventListener('disconnected', function () {
        controllerModel.motionController = null;
        controllerModel.remove(scene);
        scene = null;
      });
      return controllerModel;
    }
  };
  return XRControllerModelFactory;
}();var ORIGIN$1 = new THREE.Vector3();
var loadingBanner = {
  title: LabelPipe.transform('loading')
};
var waitingBanner = {
  title: LabelPipe.transform('waiting_host')
};

var WorldComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(WorldComponent, _Component);

  function WorldComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = WorldComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    // console.log('WorldComponent.onInit');
    this.index = 0;
    this.error_ = null;
    this.loading = null;
    this.waiting = null;
    this.avatars = {};
    this.createScene();
    this.setView();
    this.addListeners();
    this.animate(); // !!!

    KeyboardService.keys$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (keys) {
      _this.keys = keys; // console.log(keys);
    });
  };

  _proto.onChanges = function onChanges() {
    if (this.view) {
      var selected = this.view.items.find(function (item) {
        return item.selected;
      });

      if (selected && selected.mesh) {
        if (this.view.type.name !== 'model') {
          this.orbit.lookAt(selected.mesh);
        }
      }
    }
  };

  _proto.onDestroy = function onDestroy() {
    this.removeListeners();
    var renderer = this.renderer;
    renderer.setAnimationLoop(function () {});
  };

  _proto.createScene = function createScene() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    this.size = {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      aspect: 0
    };
    this.mouse = new THREE.Vector2();
    this.controllerMatrix_ = new THREE.Matrix4();
    this.controllerWorldPosition_ = new THREE.Vector3();
    this.controllerWorldDirection_ = new THREE.Vector3();
    var container = this.container = node;
    var info = this.info = node.querySelector('.world__info');
    var worldRect = this.worldRect = Rect.fromNode(container);
    var cameraRect = this.cameraRect = new Rect(); // !!! eliminabile?

    var cameraGroup = this.cameraGroup = new THREE.Group(); // new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, ROOM_RADIUS * 2);
    // const camera = this.camera = new THREE.PerspectiveCamera(70, container.offsetWidth / container.offsetHeight, 0.01, 1000);

    var camera = this.camera = new Camera(70, container.offsetWidth / container.offsetHeight, 0.01, 1000);
    /*
    camera.position.set(0, 20, 20);
    camera.lookAt(camera.target);
    */

    cameraGroup.add(camera);
    cameraGroup.target = new THREE.Vector3();
    var orbit = this.orbit = new OrbitService(camera);
    var renderer = this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      premultipliedAlpha: true,
      logarithmicDepthBuffer: true // physicallyCorrectLights: true,

    });
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.xr.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    renderer.outputEncoding = THREE.sRGBEncoding;

    if (container.childElementCount > 0) {
      container.insertBefore(renderer.domElement, container.children[0]);
    } else {
      container.appendChild(renderer.domElement);
    }

    var raycaster = this.raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(this.mouse, camera);
    var scene = this.scene = new THREE.Scene();
    scene.add(cameraGroup);
    var objects = this.objects = new THREE.Group();
    objects.name = '[objects]';
    scene.add(objects);
    var panorama = this.panorama = new Panorama();
    objects.add(panorama.mesh);
    var indicator = this.indicator = new PointerElement();
    var pointer = this.pointer = new PointerElement('#ff4332');
    var mainLight = new THREE.PointLight(0xffffff);
    mainLight.position.set(-50, 0, -50);
    objects.add(mainLight);
    var light2 = new THREE.DirectionalLight(0xffe699, 1.5);
    light2.position.set(40, -40, 40);
    light2.target.position.set(0, 0, 0);
    scene.add(light2);
    var light3 = new THREE.DirectionalLight(0xffe699, 1);
    light3.position.set(0, 50, 0);
    light3.target.position.set(0, 0, 0);
    scene.add(light3);
    var light = new THREE.AmbientLight(0x101010);
    objects.add(light);
    this.addControllers(); //

    this.resize(); //
    // console.log('WorldComponent.createScene');
  };

  _proto.addOffCanvasScene = function addOffCanvasScene(message) {
    var avatar = new AvatarElement(message);
    this.avatars[message.clientId] = avatar; // avatar.container.appendChild(avatar.element);
  };

  _proto.removeOffCanvasScene = function removeOffCanvasScene(message) {
    var avatar = this.avatars[message.clientId];
    /*
    if (avatar && avatar.element.parentNode) {
    	avatar.element.parentNode.removeChild(avatar.element);
    }
    */

    delete this.avatars[message.clientId];
  };

  _proto.updateOffCanvasScene = function updateOffCanvasScene(message) {
    var avatar = this.avatars[message.clientId];

    if (avatar) {
      avatar.update(message);
    }
  };

  _proto.setView = function setView() {
    var _this2 = this;

    if (!this.panorama) {
      return;
    }

    var view = this.view_;

    if (view) {
      var message = this.requestInfoResult;

      if (message) {
        if (view instanceof PanoramaGridView && message.gridIndex !== undefined) {
          view.index_ = message.gridIndex;
        }
      }

      view.ready = false; // this.loading = loadingBanner;
      // this.waiting = null;

      this.pushChanges();
      this.panorama.change(view, this.renderer, function (envMap, texture, rgbe) {
        // this.scene.background = envMap;
        _this2.scene.environment = envMap;
        view.ready = true; // this.waiting = (view && view.type.name === 'waiting-room') ? waitingBanner : null;

        _this2.pushChanges(); // this.render();

      }, function (view) {
        _this2.setViewOrientation(view); // this.loading = null;
        // this.pushChanges();

      });
    }
  };

  _proto.setViewOrientation = function setViewOrientation(view) {
    var message = this.requestInfoResult;
    this.requestInfoResult = null;

    if (this.orbit) {
      this.orbit.mode = view.type.name;

      if (!this.renderer.xr.isPresenting) {
        if (message) {
          this.orbit.setOrientation(message.orientation);
          this.orbit.zoom = message.zoom;
          this.camera.updateProjectionMatrix();
        } else {
          this.orbit.setOrientation(view.orientation);
          this.orbit.zoom = view.zoom;
          this.camera.updateProjectionMatrix();
        }
      }
    }
  };

  _proto.addControllers = function addControllers() {
    var _this3 = this;

    var renderer = this.renderer;
    var scene = this.scene;
    var controllerGroup = this.controllerGroup = new THREE.Group();
    var controller1 = this.controller1 = renderer.xr.getController(0);
    controller1.name = '[controller1]';
    this.onSelect1Start = this.onSelect1Start.bind(this);
    this.onSelect1End = this.onSelect1End.bind(this);
    controller1.addEventListener('selectstart', this.onSelect1Start);
    controller1.addEventListener('selectend', this.onSelect1End);
    controller1.addEventListener('connected', function (event) {
      controller1.add(_this3.buildController(event.data));
    });
    controller1.addEventListener('disconnected', function () {
      while (controller1.children.length) {
        controller1.remove(controller1.children[0]);
      }
    });
    controllerGroup.add(controller1);
    var controller2 = this.controller2 = renderer.xr.getController(1);
    controller2.name = '[controller2]';
    this.onSelect2Start = this.onSelect2Start.bind(this);
    this.onSelect2End = this.onSelect2End.bind(this);
    controller2.addEventListener('selectstart', this.onSelect2Start);
    controller2.addEventListener('selectend', this.onSelect2End);
    controller2.addEventListener('connected', function (event) {
      controller2.add(_this3.buildController(event.data));

      {
        var phone = _this3.phone = new PhoneElement();
        controller2.add(phone.mesh);
      }
    });
    controller2.addEventListener('disconnected', function () {
      while (controller2.children.length) {
        controller2.remove(controller2.children[0]);
      }
    });
    controllerGroup.add(controller2);
    this.controllers = [this.controller1, this.controller2]; // The XRControllerModelFactory will automatically fetch controller models
    // that match what the user is holding as closely as possible. The models
    // should be attached to the object returned from getControllerGrip in
    // order to match the orientation of the held device.

    var controllerModelFactory = new XRControllerModelFactory();
    var controllerGrip1 = this.controllerGrip1 = renderer.xr.getControllerGrip(0);
    controllerGrip1.name = '[controller-grip1]';
    controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
    controllerGroup.add(controllerGrip1);

    this.cameraGroup.add(controllerGroup);
  };

  _proto.buildController = function buildController(data) {
    var geometry, material;

    switch (data.targetRayMode) {
      case 'tracked-pointer':
        geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, -1], 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3));
        material = new THREE.LineBasicMaterial({
          vertexColors: true,
          blending: THREE.AdditiveBlending
        });
        return new THREE.Line(geometry, material);

      case 'gaze':
        geometry = new THREE.RingBufferGeometry(0.02, 0.04, 32).translate(0, 0, -1);
        material = new THREE.MeshBasicMaterial({
          opacity: 0.5,
          transparent: true
        });
        return new THREE.Mesh(geometry, material);
    }
  };

  _proto.onSelect1Start = function onSelect1Start() {
    this.controller1.userData.isSelecting = true;
    this.controller = this.controller1;
  };

  _proto.onSelect1End = function onSelect1End() {
    this.controller1.userData.isSelecting = false;
  };

  _proto.onSelect2Start = function onSelect2Start() {
    this.controller2.userData.isSelecting = true;
    this.controller = this.controller2;
  };

  _proto.onSelect2End = function onSelect2End() {
    this.controller2.userData.isSelecting = false;
  };

  _proto.onTween = function onTween() {// this.render();
  };

  _proto.updateRaycasterXR = function updateRaycasterXR(controller, raycaster) {
    if (controller) {
      this.controllerMatrix_.identity().extractRotation(controller.matrixWorld);
      raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
      raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this.controllerMatrix_); // raycaster.camera = this.host.renderer.xr.getCamera(this.camera);

      return raycaster;
    }
  };

  _proto.raycasterHitTest = function raycasterHitTest() {
    try {
      if (this.renderer.xr.isPresenting) {
        var raycaster = this.updateRaycasterXR(this.controller, this.raycaster);

        if (raycaster) {
          var hit = Interactive.hittest(raycaster, this.controller.userData.isSelecting);
          this.indicator.update();
          /*
          if (hit && hit !== this.panorama.mesh) {
          	// controllers.feedback();
          }
          */
        }
      } else if (!this.dragItem && !this.resizeItem) {
        return; // !!!

        var _raycaster = this.raycaster;

        if (_raycaster) {
          var _hit = Interactive.hittest(_raycaster);
          /*
          if (hit && hit !== this.panorama.mesh) {
          	// console.log('hit', hit);
          }
          */

        }
      }
    } catch (error) {
      this.error = error; // throw (error);
    }
  };

  _proto.repos = function repos(object, rect) {
    var worldRect = this.worldRect;
    var sx = 0.8; // const sx = rect.width / worldRect.width;
    // const sy = rect.height / worldRect.height;

    object.scale.set(sx, sx, sx); // const tx = ((rect.x + rect.width / 2) - worldRect.width / 2) / worldRect.width * 2.0 * this.camera.aspect; // * cameraRect.width / worldRect.width - cameraRect.width / 2;
    // const ty = ((rect.y + rect.height / 2) - worldRect.height / 2) / worldRect.height * 2.0 * this.camera.aspect; // * cameraRect.height / worldRect.height - cameraRect.height / 2;

    var tx = (rect.x + rect.width / 2 - worldRect.width / 2) / worldRect.width * 2.0 * this.camera.aspect;
    var ty = (rect.y + rect.height / 2 - worldRect.height / 2) / worldRect.height * 2.0 * this.camera.aspect; // console.log(tx);
    // const position = new THREE.Vector3(tx, ty, 0).unproject(this.camera);

    object.position.set(tx, -ty, 0); // console.log(tx, -ty, 0);
  };

  _proto.render = function render(delta) {
    var _this4 = this;

    try {
      var renderer = this.renderer,
          scene = this.scene,
          camera = this.camera;
      var time = performance.now();
      var tick = this.tick_ ? ++this.tick_ : this.tick_ = 1;
      this.raycasterXRHitTest();
      this.scene.traverse(function (child) {
        if (typeof child.userData.render === 'function') {
          child.userData.render(time, tick);
        }
      });
      this.vrService.updateState(this);
      Object.keys(this.avatars).forEach(function (key) {
        _this4.avatars[key].render();
      });

      if (renderer.xr.isPresenting) {
        gsap.ticker.tick();
      }
      /*
      const objects = this.objects;
      for (let i = 0; i < objects.children.length; i++) {
      	const x = objects.children[i];
      	if (typeof x.userData.render === 'function') {
      		x.userData.render(time, tick);
      	}
      }
      */


      renderer.render(this.scene, this.camera);

      if (this.state && !this.state.hosted) {
        this.orbit.render();
      }
    } catch (error) {
      this.error = error; // throw (error);
    }
  };

  _proto.animate = function animate() {
    var renderer = this.renderer;
    renderer.setAnimationLoop(this.render);
  };

  _proto.resize = function resize() {
    try {
      var container = this.container,
          renderer = this.renderer,
          camera = this.camera;
      var size = this.size;
      var rect = container.getBoundingClientRect();
      size.left = Math.floor(rect.left);
      size.top = Math.floor(rect.top);
      size.width = Math.ceil(rect.width);
      size.height = Math.ceil(rect.height);
      size.aspect = size.width / size.height;
      var worldRect = this.worldRect;
      worldRect.setSize(size.width, size.height);

      if (!renderer.xr.isPresenting) {
        renderer.setSize(size.width, size.height);

        if (camera) {
          camera.aspect = size.width / size.height;
          var angle = camera.fov * Math.PI / 180;
          var height = Math.abs(camera.position.z * Math.tan(angle / 2) * 2);
          var cameraRect = this.cameraRect;
          cameraRect.width = height * camera.aspect;
          cameraRect.height = height; // console.log('position', camera.position.z, 'angle', angle, 'height', height, 'aspect', camera.aspect, cameraRect);

          camera.updateProjectionMatrix();
        }
      } // this.render();

    } catch (error) {
      this.error = error; // throw (error);
    }
  };

  _proto.updateRaycasterMouse = function updateRaycasterMouse(event) {
    var w2 = this.size.width / 2;
    var h2 = this.size.height / 2;
    this.mouse.x = (event.clientX - this.size.left - w2) / w2;
    this.mouse.y = -(event.clientY - this.size.top - h2) / h2;
    var raycaster = this.raycaster;
    raycaster.setFromCamera(this.mouse, this.camera);
    return raycaster;
  };

  _proto.onMouseDown = function onMouseDown(event) {
    try {
      if (event.button !== 0) {
        return;
      }

      var raycaster = this.updateRaycasterMouse(event);
      var hit = Interactive.hittest(raycaster, true);

      if (this.editor || DEBUG) {
        if (this.keys.Shift || this.keys.Control) {} else {
          this.select.next({
            item: null
          });

          if (this.panorama.mesh.intersection) {
            var position = new THREE.Vector3().copy(this.panorama.mesh.intersection.point).normalize();
            console.log(JSON.stringify({
              position: position.toArray()
            }));
            this.viewHit.next(position);
          }
        }
      }
    } catch (error) {
      this.error = error; // throw (error);
    }
  };

  _proto.raycasterXRHitTest = function raycasterXRHitTest() {
    if (this.renderer.xr.isPresenting) {
      var raycaster = this.updateRaycasterXR(this.controller, this.raycaster);

      if (raycaster) {
        var hit = Interactive.hittest(raycaster, this.controller.userData.isSelecting);
        this.indicator.update();
        /*
        if (hit && hit !== this.panorama.mesh) {
        	// controllers.feedback();
        }
        */
      }
    }
  };

  _proto.raycasterDesktopHitTest = function raycasterDesktopHitTest(event) {
    var raycaster = this.updateRaycasterMouse(event);

    if (this.lockedOrXR) {
      return;
    }

    if (this.dragItem) {
      if (typeof this.dragItem.onDragMove === 'function') {
        var intersections = raycaster.intersectObjects([this.panorama.mesh]);

        if (intersections.length) {
          var intersection = intersections[0]; // this.panorama.mesh.intersection = intersection;

          var position = new THREE.Vector3().copy(intersection.point).normalize();
          this.dragItem.onDragMove(position);
        }
      }
    } else if (this.resizeItem) {
      if (typeof this.resizeItem.onResizeMove === 'function') ;
    } else {
      var hit = Interactive.hittest(raycaster);
      /*
      if (hit && hit !== this.panorama.mesh) {
      	// console.log('hit', hit);
      }
      */

      this.controlEvent$.next(this.control);
    }
  };

  _proto.onMouseMove = function onMouseMove(event) {
    try {
      this.raycasterDesktopHitTest(event);
    } catch (error) {
      this.error = error; // throw (error);
    }
  };

  _proto.onMouseUp = function onMouseUp(event) {
    try {
      if (this.lockedOrXR) {
        return;
      }

      if (this.dragItem) {
        if (typeof this.dragItem.onDragEnd === 'function') {
          this.dragItem.onDragEnd();
          this.dragEnd.next(this.dragItem);
        }
      }

      this.dragItem = null;

      if (this.resizeItem) {
        if (typeof this.resizeItem.onResizeEnd === 'function') {
          this.resizeItem.onResizeEnd();
          this.resizeEnd.next(this.resizeItem);
        }
      }

      this.resizeItem = null;
      /*
      if (NavPointDragging) {
      	stopDragging
      }
      */

      var raycaster = this.updateRaycasterMouse(event);
      var hit = Interactive.hittest(raycaster, false);
    } catch (error) {
      this.error = error; // throw (error);
    }
  };

  _proto.onMouseWheel = function onMouseWheel(event) {
    try {
      if (this.lockedOrXR) {
        return;
      }

      var deltaY = event.deltaY * (event.wheelDeltaY !== undefined ? 1 : 37);
      var orbit = this.orbit;
      gsap.to(orbit, {
        duration: 0.5,
        zoom: orbit.zoom + deltaY * 0.1,
        ease: Power4.easeOut,
        overwrite: true
      });
    } catch (error) {
      this.error = error; // throw (error);
    }
  };

  _proto.onOrientationDidChange = function onOrientationDidChange() {
    this.controlEvent$.next(this.control);
  };

  _proto.onVRStarted = function onVRStarted() {
    // this.objects.rotation.y = - Math.PI / 2;
    this.objects.position.y = 1.5;
    this.scene.add(this.indicator.mesh);
    MessageService.send({
      type: MessageType.VRStarted
    });
  };

  _proto.onVREnded = function onVREnded() {
    // this.objects.rotation.y = 0;
    this.objects.position.y = 0;
    this.scene.remove(this.indicator.mesh);
    MessageService.send({
      type: MessageType.VREnded
    });
  };

  _proto.onVRStateDidChange = function onVRStateDidChange(state) {
    MessageService.send({
      type: MessageType.VRState,
      camera: state.camera.array
    });
  };

  _proto.onMenuNav = function onMenuNav(event) {
    // console.log('WorldComponent.onMenuNav', event.id, event);
    this.menu = undefined;
    this.navTo.next(event.id);
  };

  _proto.onMenuToggle = function onMenuToggle(event) {
    // console.log('WorldComponent.onMenuToggle', event.id, event);
    if (this.locked) {
      return;
    }

    this.menu = event;
    this.view.items.forEach(function (item) {
      return item.showPanel = false;
    });
    this.pushChanges();
  };

  _proto.onNavOver = function onNavOver(nav) {
    // console.log('WorldComponent.onNavOver', nav);
    if (this.menu) {
      return; // this.menu.removeMenu();
    }

    this.view.items.forEach(function (item) {
      return item.showPanel = false;
    });
    nav.item.showPanel = nav.shouldShowPanel();
    this.pushChanges();
    MessageService.send({
      type: MessageType.ShowPanel,
      itemId: nav.item.showPanel ? nav.item.id : null
    });
  };

  _proto.onNavOut = function onNavOut(nav) {
    // console.log('WorldComponent.onNavOut', nav);
    // nav.item.showPanel = false;
    this.pushChanges();
  };

  _proto.onNavDown = function onNavDown(event) {
    event.item.showPanel = false; // console.log('WorldComponent.onNavDown', this.keys);

    if (this.locked) {
      return;
    }

    if (this.editor && this.keys.Shift) {
      this.dragItem = event;
      this.select.next(event);
    } else if (this.editor && this.keys.Control) {
      this.resizeItem = event;
      this.select.next(event);
    } else {
      this.navTo.next(event.item.viewId);
    }
  };

  _proto.onObjectDown = function onObjectDown(event) {
    // console.log('WorldComponent.onObjectDown', this.keys);
    if (this.lockedOrXR) {
      return;
    }

    if (this.editor && this.keys.Shift) {
      this.dragItem = event;
      this.select.next(event);
    } else if (this.editor && this.keys.Control) {
      this.resizeItem = event;
      this.select.next(event);
    }
  };

  _proto.onPlayMedia = function onPlayMedia(event) {
    MessageService.send({
      type: MessageType.PlayMedia,
      itemId: event.itemId,
      playing: event.playing
    });
  };

  _proto.onPanelDown = function onPanelDown(event) {
    // console.log('WorldComponent.onPanelDown', href, target);
    var href = event.getAttribute('href');
    var target = event.getAttribute('target') || '_self';

    if (href) {
      window.open(href, '_blank');
    }
  };

  _proto.onGridMove = function onGridMove(event) {
    var _this5 = this;

    // console.log('WorldComponent.onGridMove', event, this.view);
    this.view.items = []; // this.loading = loadingBanner;

    this.pushChanges();
    this.orbit.walk(event.position, function (headingLongitude, headingLatitude) {
      var tile = _this5.view.getTile(event.indices.x, event.indices.y);

      if (tile) {
        _this5.panorama.crossfade(tile, _this5.renderer, function (envMap, texture, rgbe) {
          // this.scene.background = envMap;
          _this5.scene.environment = envMap;

          _this5.orbit.walkComplete(headingLongitude, headingLatitude);

          _this5.view.updateCurrentItems(); // this.loading = null;


          _this5.pushChanges(); // this.render();
          // this.pushChanges();

        });
      }
    });
  };

  _proto.onGridNav = function onGridNav(event) {
    // console.log('WorldComponent.onGridNav', event);
    if (this.locked) {
      return;
    }

    MessageService.send({
      type: MessageType.NavToGrid,
      viewId: this.view.id,
      gridIndex: event
    });
    this.pushChanges();
  };

  _proto.control$ = function control$() {
    var _this6 = this;

    return this.controlEvent$.pipe(operators.filter(function () {
      return StateService.state.control || StateService.state.spyed || _this6.editor;
    }), operators.auditTime(40), operators.tap(function (control) {
      control.orientation.latitude = _this6.orbit.latitude;
      control.orientation.longitude = _this6.orbit.longitude;
      control.zoom = _this6.orbit.zoom;

      var intersections = _this6.raycaster.intersectObjects([_this6.panorama.mesh]);

      var point = intersections.length ? intersections[0].point.normalize() : null;

      if (point) {
        control.pointer[0] = point.x;
        control.pointer[1] = point.y;
        control.pointer[2] = point.z;
      }

      MessageService.send(control);
    }));
  };

  _proto.addListeners = function addListeners() {
    var _this7 = this;

    this.control = {
      type: MessageType.ControlInfo,
      orientation: {
        latitude: 0,
        longitude: 0
      },
      zoom: 1,
      pointer: [0, 0, 0]
    };
    this.controlEvent$ = new rxjs.ReplaySubject(1);
    this.control$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe();
    var vrService = this.vrService = VRService.getService();
    vrService.session$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (session) {
      _this7.renderer.xr.setSession(session);

      if (session) {
        _this7.onVRStarted();
      } else {
        _this7.onVREnded();
      }
    });
    vrService.state$.pipe(operators.takeUntil(this.unsubscribe$), operators.auditTime(Math.floor(1000 / 15))).subscribe(function (state) {
      _this7.onVRStateDidChange(state);
    });
    var orbit$ = this.orbit.observe$(this.container).pipe(operators.shareReplay(1));
    /*
    const drag$ = orbit$.pipe(
    	filter(event => event instanceof OrbitDragEvent),
    );
    */

    var orientation$ = orbit$.pipe(operators.filter(function (event) {
      return event instanceof OrbitMoveEvent;
    }), operators.auditTime(Math.floor(1000 / 15)));
    orientation$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      // this.render();
      _this7.onOrientationDidChange();
    });
    MessageService.out$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (message) {
      switch (message.type) {
        case MessageType.RequestInfo:
          message.type = MessageType.RequestInfoResult;
          message.viewId = _this7.view.id;
          message.orientation = _this7.orbit.getOrientation();
          message.zoom = _this7.orbit.zoom;

          if (_this7.view instanceof PanoramaGridView) {
            message.gridIndex = _this7.view.index;
          } // console.log('WorldComponent', 'MessageType.RequestInfo', 'from', message.clientId, 'to', StateService.state.uid, message.orientation);


          MessageService.sendBack(message);

          if (StateService.state.role !== RoleType.Publisher) {
            StateService.patchState({
              spyed: true
            });
          }

          break;

        case MessageType.RequestInfoResult:
          // console.log('WorldComponent', 'MessageType.RequestInfoResult', 'from', message.clientId, 'to', StateService.state.uid, message.orientation);
          if (ViewService.viewId !== message.viewId) {
            ViewService.viewId = message.viewId;
            _this7.requestInfoResult = message;
          } else {
            _this7.orbit.setOrientation(message.orientation);

            if (!_this7.renderer.xr.isPresenting) {
              _this7.orbit.zoom = message.zoom;

              _this7.camera.updateProjectionMatrix();
            }

            if (_this7.view instanceof PanoramaGridView && message.gridIndex) {
              _this7.view.index = message.gridIndex;
            }

            if (!_this7.view || !_this7.view.ready) {
              _this7.requestInfoResult = message;
            }
          }
          /*
          if (this.view && this.view.id === message.viewId) {
          	this.orbit.setOrientation(message.orientation);
          	if (!this.renderer.xr.isPresenting) {
          		this.orbit.zoom = message.zoom;
          		this.camera.updateProjectionMatrix();
          	}
          	if (this.view instanceof PanoramaGridView && message.gridIndex) {
          		this.view.index = message.gridIndex;
          	}
          } else {
          	this.requestInfoResult = message;
          }
          */
          // console.log('WorldComponent', 'MessageType.RequestInfoResult', message, StateService.state);


          break;
        // !!! old control accepted message

        /*
        case MessageType.RequestControlAccepted:
        	message = {
        		type: MessageType.NavToView,
        		viewId: this.view.id,
        	};
        	if (this.view instanceof PanoramaGridView) {
        		message.gridIndex = this.view.index;
        	}
        	MessageService.send(message);
        	break;
        */

        case MessageType.ShowPanel:
          if (_this7.menu) {
            _this7.menu.removeMenu();
          }

          _this7.view.items.forEach(function (item) {
            return item.showPanel = item.id === message.itemId;
          });

          _this7.pushChanges();

          break;

        case MessageType.PlayMedia:
          var item = _this7.view.items.find(function (item) {
            return item.id === message.itemId;
          });

          if (item && item.mesh instanceof MediaMesh) {
            item.mesh.setPlayingState(message.playing);
          }

          break;

        case MessageType.NavToGrid:
          // console.log('WorldComponent.NavToGrid', this.view.id, message);
          if (_this7.view.id === message.viewId) {
            _this7.view.index = message.gridIndex;
          }

          break;

        case MessageType.VRStarted:
          _this7.addOffCanvasScene(message);

          break;

        case MessageType.VREnded:
          _this7.removeOffCanvasScene(message);

          break;

        case MessageType.VRState:
          _this7.updateOffCanvasScene(message);

          if (StateService.state.spying === message.clientId) {
            _this7.orbit.setVRCamera(message.camera);
          }

          break;

        case MessageType.ControlInfo:
          if (!_this7.renderer.xr.isPresenting) {
            _this7.orbit.setOrientation(message.orientation);

            _this7.orbit.zoom = message.zoom; // this.camera.updateProjectionMatrix();
            // this.render();
          }

          _this7.pointer.setPosition(message.pointer[0], message.pointer[1], message.pointer[2]);

          break;
      }
    });
    StateService.state$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (state) {
      _this7.state = state;
      _this7.showPointer = StateService.state.locked || StateService.state.spying; // console.log(state);
      // this.pushChanges();
    });
    this.resize = this.resize.bind(this);
    this.render = this.render.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseWheel = this.onMouseWheel.bind(this); // this.controls.addEventListener('change', this.render); // use if there is no animation loop

    window.addEventListener('resize', this.resize, false);
    this.container.addEventListener('wheel', this.onMouseWheel, false);
    this.container.addEventListener('mousedown', this.onMouseDown, false);
    this.container.addEventListener('mouseup', this.onMouseUp, false);
    document.addEventListener('mousemove', this.onMouseMove, false);
  };

  _proto.removeListeners = function removeListeners() {
    window.removeEventListener('resize', this.resize, false);
    window.removeEventListener('resize', this.resize, false);
    document.removeEventListener('mousemove', this.onMouseMove, false);
    document.removeEventListener('wheel', this.onMouseWheel, false);
    this.container.removeEventListener('mousedown', this.onMouseDown, false);
    this.container.removeEventListener('mouseup', this.onMouseUp, false);
  };

  _createClass(WorldComponent, [{
    key: "error",
    get: function get() {
      return this.error_;
    },
    set: function set(error) {
      if (this.error_ !== error) {
        this.error_ = error;
        this.pushChanges();
      }
    }
  }, {
    key: "view",
    get: function get() {
      return this.view_;
    },
    set: function set(view) {
      if (this.view_ !== view) {
        this.view_ = view;
        this.setView();
      }
    }
  }, {
    key: "debugging",
    get: function get() {
      return DEBUG;
    }
  }, {
    key: "locked",
    get: function get() {
      return this.state.locked || this.state.spying;
    }
  }, {
    key: "lockedOrXR",
    get: function get() {
      return this.locked || this.renderer.xr.isPresenting;
    }
  }, {
    key: "showPointer",
    get: function get() {
      return this.pointer.mesh.parent != null;
    },
    set: function set(showPointer) {
      if (this.showPointer !== showPointer) {
        showPointer ? this.scene.add(this.pointer.mesh) : this.scene.remove(this.pointer.mesh); // console.log('showPointer', showPointer);
      }
    }
  }]);

  return WorldComponent;
}(rxcomp.Component);
WorldComponent.meta = {
  selector: '[world]',
  inputs: ['view', 'views', 'editor'],
  outputs: ['navTo', 'viewHit', 'dragEnd', 'resizeEnd', 'select']
};var FreezableSprite = /*#__PURE__*/function (_THREE$Sprite) {
  _inheritsLoose(FreezableSprite, _THREE$Sprite);

  _createClass(FreezableSprite, [{
    key: "freezed",
    get: function get() {
      return this.freezed_;
    },
    set: function set(freezed) {
      // !!! cycle through freezable and not freezable
      this.freezed_ = freezed;
      this.children.filter(function (x) {
        return x.__lookupGetter__('freezed');
      }).forEach(function (x) {
        return x.freezed = freezed;
      });
    }
  }]);

  function FreezableSprite(material) {
    var _this;

    material = material || new THREE.SpriteMaterial({
      color: 0xff00ff // opacity: 1,
      // transparent: true,

    });
    _this = _THREE$Sprite.call(this, material) || this;
    _this.freezed = false;
    return _this;
  }

  var _proto = FreezableSprite.prototype;

  _proto.freeze = function freeze() {
    this.freezed = true;
  };

  _proto.unfreeze = function unfreeze() {
    this.freezed = false;
  };

  return FreezableSprite;
}(THREE.Sprite);var EmittableSprite = /*#__PURE__*/function (_FreezableSprite) {
  _inheritsLoose(EmittableSprite, _FreezableSprite);

  function EmittableSprite(material) {
    var _this;

    material = material || new THREE.SpriteMaterial({
      color: 0xff00ff // opacity: 1,
      // transparent: true,

    });
    _this = _FreezableSprite.call(this, material) || this;
    _this.events = {};
    return _this;
  }

  var _proto = EmittableSprite.prototype;

  _proto.on = function on(type, callback) {
    var _this2 = this;

    var event = this.events[type] = this.events[type] || [];
    event.push(callback);
    return function () {
      _this2.events[type] = event.filter(function (x) {
        return x !== callback;
      });
    };
  };

  _proto.off = function off(type, callback) {
    var event = this.events[type];

    if (event) {
      this.events[type] = event.filter(function (x) {
        return x !== callback;
      });
    }
  };

  _proto.emit = function emit(type, data) {
    var event = this.events[type];

    if (event) {
      event.forEach(function (callback) {
        // callback.call(this, data);
        callback(data);
      });
    }

    var broadcast = this.events.broadcast;

    if (broadcast) {
      broadcast.forEach(function (callback) {
        callback(type, data);
      });
    }
  };

  return EmittableSprite;
}(FreezableSprite);var InteractiveSprite = /*#__PURE__*/function (_EmittableSprite) {
  _inheritsLoose(InteractiveSprite, _EmittableSprite);

  function InteractiveSprite(material) {
    var _this;

    _this = _EmittableSprite.call(this, material) || this;
    _this.depthTest = true;
    _this.over_ = false;
    _this.down_ = false;
    Interactive.items.push(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(InteractiveSprite, [{
    key: "over",
    get: function get() {
      return this.over_;
    },
    set: function set(over) {
      if (this.over_ != over) {
        this.over_ = over;
        /*
        if (over) {
        	this.emit('hit', this);
        }
        */

        if (over) {
          this.emit('over', this);
        } else {
          this.emit('out', this);
        }
      }
    }
  }, {
    key: "down",
    get: function get() {
      return this.down_;
    },
    set: function set(down) {
      down = down && this.over;

      if (this.down_ != down) {
        this.down_ = down;

        if (down) {
          this.emit('down', this);
        } else {
          this.emit('up', this);
        }
      }
    }
  }]);

  return InteractiveSprite;
}(EmittableSprite);var deg = THREE.Math.degToRad;
var GEOMETRY = new THREE.BoxBufferGeometry(1, 1, 1); // const GEOMETRY = new THREE.IcosahedronBufferGeometry(0.5, 1);

var ModelComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ModelComponent, _Component);

  function ModelComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ModelComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    // console.log('ModelComponent.onInit');
    // console.log('item', this.item, 'host', this.host);
    if (!this.host) {
      throw 'ModelComponent host is undefined';
    }

    this.scale = new THREE.Vector3(1.0, 1.0, 1.0);
    this.position = new THREE.Vector3();
    var group = this.group = new THREE.Group();
    group.name = this.getName();

    group.userData.render = function (time, tick) {
      // if (this.intersection) {
      _this.render(_this, time, tick); // }

    };

    this.host.objects.add(group);
    this.onCreate(function (mesh, item) {
      return _this.onMount(mesh, item);
    }, function (mesh, item) {
      return _this.onDismount(mesh, item);
    });
  };

  _proto.onDestroy = function onDestroy() {
    var group = this.group;
    this.host.objects.remove(group);
    delete group.userData.render;
    this.disposeObject(group);
    this.group = null;
  };

  _proto.getName = function getName(name) {
    return this.constructor.meta.selector + "-" + this.rxcompId + (name ? "-" + name : '');
  };

  _proto.onCreate = function onCreate(mounth, dismount) {
    var material = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffcc00'),
      roughness: 0.4,
      metalness: 0.01,
      flatShading: true,
      transparent: true,
      opacity: 0.9
    });
    var mesh = new THREE.Mesh(GEOMETRY, material);

    if (typeof mounth === 'function') {
      mounth(mesh);
    }

    return mesh;
  };

  _proto.onMount = function onMount(mesh, item) {
    var _this2 = this;

    if (this.mesh) {
      // console.log('ModelComponent.dismount.mesh');
      this.onDismount(this.mesh);
    }

    mesh.name = this.getName('mesh');
    this.mesh = mesh;

    if (item) {
      item.mesh = mesh;

      item.onUpdate = function () {
        _this2.onUpdate(item, mesh);
      };

      item.onUpdateAsset = function () {
        _this2.onUpdateAsset(item, mesh);
      };
    }

    this.group.add(mesh); // this.host.render(); !!!

    /*
    const node = this.node;
    DomService.scrollIntersection$(node).subscribe(event => {
    	this.scroll = event.scroll;
    	this.intersection = event.intersection;
    	this.calculateScaleAndPosition();
    });
    */
    // console.log('Model.loaded', mesh);
  };

  _proto.onDismount = function onDismount(mesh, item) {
    this.group.remove(mesh);

    if (typeof mesh.dispose === 'function') {
      mesh.dispose();
    }

    this.disposeObject(mesh);
    this.mesh = null;

    if (item) {
      delete item.mesh;
      delete item.onUpdate;
      delete item.onUpdateAsset;
    }
  };

  _proto.disposeObject = function disposeObject(object) {
    object.traverse(function (child) {
      if (child instanceof InteractiveMesh || child instanceof InteractiveSprite) {
        Interactive.dispose(child);
      }

      if (child.isMesh) {
        if (child.material.map && child.material.map.disposable !== false) {
          child.material.map.dispose();
        }

        child.material.dispose();
        child.geometry.dispose();
      } else if (child.isSprite) {
        if (child.material.map && child.material.map.disposable !== false) {
          child.material.map.dispose();
        }

        child.material.dispose();
      }
    }); // console.log('ModelComponent.disposeObject', object);
  };

  _proto.calculateScaleAndPosition = function calculateScaleAndPosition() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    this.host.repos(this, node.getBoundingClientRect());
  };

  _proto.render = function render(time, tick) {
    /*
    this.calculateScaleAndPosition();
    const group = this.group;
    const scale = this.scale;
    // group.scale.set(scale.x, scale.y, scale.z);
    const position = this.position;
    group.position.set(position.x, 0, 0);
    // const tween = this.tween();
    // group.rotation.x = deg(180) * tween;
    // group.rotation.y = deg(360) * tween;
    */
  };

  _proto.getScroll = function getScroll(offset) {
    var scroll = this.intersection.scroll(offset); // console.log(scroll);

    return scroll;
  };

  _proto.getTween = function getTween(offset) {
    var tween = Math.min(0.0, this.intersection.offset(offset)) + 1;
    tween = Math.max(0.0, tween); // tween = Ease.Sine.InOut(tween);

    tween -= 1;
    return tween;
  } // called by UpdateViewItemComponent
  ;

  _proto.onUpdate = function onUpdate(item, mesh) {} // called by UpdateViewItemComponent
  ;

  _proto.onUpdateAsset = function onUpdateAsset(item, mesh) {};

  _createClass(ModelComponent, [{
    key: "renderOrder",
    set: function set(renderOrder) {
      this.group.renderOrder = renderOrder;
    }
  }]);

  return ModelComponent;
}(rxcomp.Component);
ModelComponent.meta = {
  selector: '[model]',
  hosts: {
    host: WorldComponent
  },
  inputs: ['item']
};var PANEL_RADIUS = PANORAMA_RADIUS - 0.01;
var ORIGIN$2 = new THREE.Vector3();

var ModelBannerComponent = /*#__PURE__*/function (_ModelComponent) {
  _inheritsLoose(ModelBannerComponent, _ModelComponent);

  function ModelBannerComponent() {
    return _ModelComponent.apply(this, arguments) || this;
  }

  var _proto = ModelBannerComponent.prototype;

  /*
  onInit() {
  	super.onInit();
  	console.log('ModelBannerComponent.onInit', this.item);
  }
  
  onView() {
  	console.log('ModelBannerComponent.onView', this.item);
  	if (this.viewed) {
  		return;
  	}
  	this.viewed = true;
  	// this.createBanner();
  }
  */
  _proto.onChanges = function onChanges() {
    // console.log('ModelBannerComponent.onChanges', this.item);
    this.title = this.item.title;
  };

  _proto.createBanner = function createBanner() {
    var _this = this;

    this.getCanvasTexture().then(function (result) {
      var texture = result.texture;
      var repeat = 24;
      texture.wrapS = texture.wrapY = THREE.RepeatWrapping;
      texture.repeat.x = repeat;
      texture.encoding = THREE.sRGBEncoding;
      var aspect = result.width * repeat / result.height;
      var arc = Math.PI / 180 * 360;
      var width = PANEL_RADIUS * arc;
      var height = width / aspect;
      var geometry = new THREE.CylinderBufferGeometry(PANEL_RADIUS, PANEL_RADIUS, height, 80, 2, true, 0, arc);
      geometry.scale(-1, 1, 1);
      var material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0 // side: THREE.DoubleSide,

      });
      var mesh = _this.mesh;
      var banners = _this.banners = new Array(1).fill(0).map(function (x) {
        return new THREE.Mesh(geometry, material);
      });
      banners.forEach(function (banner, i) {
        banner.rotation.y = Math.PI / 2 * i; // !!!
        // mesh.add(banner);
      });
      var from = {
        value: 0
      };
      gsap.to(from, {
        duration: 0.5,
        value: 1,
        delay: 0.0,
        ease: Power2.easeInOut,
        onUpdate: function onUpdate() {
          material.opacity = from.value;
          material.needsUpdate = true;
        }
      });
      mesh.userData = {
        render: function render() {
          mesh.rotation.y += Math.PI / 180 * 0.02; // texture.offset.x = (texture.offset.x - 0.01) % 1;

          material.needsUpdate = true;
        }
      };
    });
  };

  _proto.updateBanner = function updateBanner() {
    this.getCanvasTexture().then(function (result) {// console.log('ModelBannerComponent.updateBanner', result);
    });
  }
  /*
  onViewBak() {
  	if (this.viewed) {
  		return;
  	}
  	this.viewed = true;
  	this.getCanvasTexture().then(result => {
  		const texture = result.texture;
  		const repeat = 3;
  		texture.wrapS = texture.wrapY = THREE.RepeatWrapping;
  		texture.repeat.x = repeat;
  		texture.encoding = THREE.sRGBEncoding;
  		const aspect = (result.width * repeat) / result.height;
  		const arc = Math.PI / 180 * 45;
  		const width = PANEL_RADIUS * arc;
  		const height = width / aspect;
  		const geometry = new THREE.CylinderBufferGeometry(PANEL_RADIUS, PANEL_RADIUS, height, 20, 2, true, 0, arc);
  		geometry.scale(-1, 1, 1);
  		const material = new THREE.MeshBasicMaterial({
  			map: texture,
  			transparent: true,
  			opacity: 0,
  			// side: THREE.DoubleSide,
  		});
  		const mesh = this.mesh;
  		const banners = this.banners = new Array(4).fill(0).map(x => new THREE.Mesh(geometry, material));
  		banners.forEach((banner, i) => {
  			banner.rotation.y = Math.PI / 2 * i;
  			mesh.add(banner);
  		});
  		const from = { value: 0 };
  		gsap.to(from, {
  			duration: 0.5,
  			value: 1,
  			delay: 0.0,
  			ease: Power2.easeInOut,
  			onUpdate: () => {
  				material.opacity = from.value;
  				material.needsUpdate = true;
  			}
  		});
  		mesh.userData = {
  			render: () => {
  				mesh.rotation.y += Math.PI / 180 * 0.2;
  				texture.offset.x = (texture.offset.x - 0.01) % 1;
  				material.needsUpdate = true;
  			}
  		};
  	});
  }
  */
  ;

  _proto.onCreate = function onCreate(mount, dismount) {
    var mesh = new THREE.Group();

    if (typeof mount === 'function') {
      mount(mesh);
    }
  };

  _proto.getCanvasTexture = function getCanvasTexture() {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      var MIN_W = 512;
      var W = MIN_W;
      var H = 128;
      var F = Math.floor(H * 0.8);
      var L = Math.floor(H * 0.075);
      var canvas;

      if (_this2.canvas) {
        canvas = _this2.canvas;
      } else {
        canvas = _this2.canvas = document.createElement('canvas'); // canvas.classList.add('canvas--debug');
        // document.querySelector('body').appendChild(canvas);
      }

      canvas.width = W;
      canvas.height = H;
      var text = _this2.item.title;
      var ctx = canvas.getContext('2d'); // const ctx = text.material.map.image.getContext('2d');

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.font = F + "px " + environment.fontFamily;
      var metrics = ctx.measureText(text);
      W = metrics.width + 8;
      W = Math.max(MIN_W, Math.pow(2, Math.ceil(Math.log(W) / Math.log(2)))); // const x = W / 2;
      // const y = 16;

      canvas.width = W;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0000005A'; // 35% // '#000000C0'; // 75%

      ctx.fillRect(0, 0, W, H);
      ctx.font = F + "px " + environment.fontFamily;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = L;
      ctx.lineJoin = 'round'; // Experiment with "bevel" & "round" for the effect you want!

      ctx.miterLimit = 2;
      ctx.strokeText(text, W / 2, H / 2);
      ctx.fillStyle = 'white';
      ctx.fillText(text, W / 2, H / 2, W); // text.material.map.needsUpdate = true;

      var texture;

      if (_this2.texture) {
        texture = _this2.texture;
        texture.needsUpdate = true;
      } else {
        texture = _this2.texture = new THREE.CanvasTexture(canvas);
      } // console.log(F, L, W, H);


      resolve({
        texture: texture,
        width: W,
        height: H
      });
    });
  }
  /*
  getCanvasTexture_() {
  	return new Promise((resolve, reject) => {
  		if (this.item.bannerTexture) {
  			resolve(this.item.bannerTexture);
  		} else {
  			const { node } = getContext(this);
  			setTimeout(() => {
  				html2canvas(node, {
  					backgroundColor: '#00000000', // '#000000ff',
  					scale: 2,
  				}).then(canvas => {
  					// !!!
  					// document.body.appendChild(canvas);
  					// const alpha = this.getAlphaFromCanvas(canvas);
  					// document.body.appendChild(alpha);
  					const texture = new THREE.CanvasTexture(canvas);
  					// const alphaMap = new THREE.CanvasTexture(alpha);
  					this.item.bannerTexture = {
  						texture: texture,
  						width: canvas.width,
  						height: canvas.height,
  					};
  					resolve(this.item.bannerTexture);
  				}, error => {
  					reject(error);
  				});
  			}, 1);
  		}
  	});
  }
  */
  ;

  _createClass(ModelBannerComponent, [{
    key: "title",
    get: function get() {
      return this.title_;
    },
    set: function set(title) {
      if (this.title_ !== title) {
        var init = this.title_ != null;
        this.title_ = title;

        if (!init) {
          this.createBanner();
        } else {
          this.updateBanner();
        }
      }
    }
  }]);

  return ModelBannerComponent;
}(ModelComponent);
ModelBannerComponent.ORIGIN = new THREE.Vector3();
ModelBannerComponent.meta = {
  selector: '[model-banner]',
  hosts: {
    host: WorldComponent
  },
  inputs: ['item']
};var ModelEditableComponent = /*#__PURE__*/function (_ModelComponent) {
  _inheritsLoose(ModelEditableComponent, _ModelComponent);

  function ModelEditableComponent() {
    return _ModelComponent.apply(this, arguments) || this;
  }

  var _proto = ModelEditableComponent.prototype;

  _proto.onInit = function onInit() {
    _ModelComponent.prototype.onInit.call(this);

    this.RADIUS = 100;
  };

  _proto.onDestroy = function onDestroy() {
    this.editing = false;

    _ModelComponent.prototype.onDestroy.call(this);
  };

  _proto.setHelper = function setHelper(showHelper) {
    if (showHelper) {
      if (!this.helper) {
        this.helper = new THREE.BoxHelper(this.mesh, 0x00ff00);
      }

      this.host.scene.add(this.helper);
    } else if (this.helper) {
      this.host.scene.remove(this.helper);
    }
  };

  _proto.updateHelper = function updateHelper() {
    if (this.helper) {
      this.helper.setFromObject(this.mesh); // this.helper.update();
    }
  };

  _createClass(ModelEditableComponent, [{
    key: "editing",
    get: function get() {
      return this.editing_;
    },
    set: function set(editing) {
      if (this.editing_ !== editing) {
        this.editing_ = editing;
        this.setHelper(editing);
      }
    }
  }]);

  return ModelEditableComponent;
}(ModelComponent);
ModelEditableComponent.meta = {
  selector: '[model-editable]',
  hosts: {
    host: WorldComponent
  },
  inputs: ['item']
};var ModelCurvedPlaneComponent = /*#__PURE__*/function (_ModelEditableCompone) {
  _inheritsLoose(ModelCurvedPlaneComponent, _ModelEditableCompone);

  function ModelCurvedPlaneComponent() {
    return _ModelEditableCompone.apply(this, arguments) || this;
  }

  var _proto = ModelCurvedPlaneComponent.prototype;

  _proto.onInit = function onInit() {
    _ModelEditableCompone.prototype.onInit.call(this); // console.log('ModelCurvedPlaneComponent.onInit');

  };

  _proto.onChanges = function onChanges() {
    this.editing = this.item.selected;
  };

  _proto.onCreate = function onCreate(mount, dismount) {
    var _this = this;

    var item = this.item;
    var items = this.items;
    var geometry = this.getCurvedPanelGeometry(item);
    var mesh;
    var subscription;
    MediaMesh.getStreamId$(item).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (streamId) {
      if (_this.streamId !== streamId) {
        _this.streamId = streamId; // !!! called by ModelComponent

        /*
        if (mesh) {
        	dismount(mesh, item);
        }
        */

        if (subscription) {
          subscription.unsubscribe();
          subscription = null;
        } // console.log('ModelCurvedPanel', streamId, item.asset)


        if (streamId || !item.asset) {
          item.streamId = streamId;
          mesh = new MediaMesh(item, items, geometry);
          mesh.name = 'curved-plane';

          if (item.position) {
            mesh.position.fromArray(item.position);
          }

          if (item.rotation) {
            mesh.rotation.fromArray(item.rotation);
          }

          if (item.scale) {
            mesh.scale.fromArray(item.scale);
          }

          mesh.load(function () {
            if (typeof mount === 'function') {
              mount(mesh, item);
            }

            subscription = mesh.events$().pipe(operators.takeUntil(_this.unsubscribe$)).subscribe(function () {});
          });
          mesh.on('down', function () {
            // console.log('ModelCurvedPanelComponent.down');
            _this.down.next(_this);
          });
          mesh.on('playing', function (playing) {
            // console.log('ModelCurvedPanelComponent.playing', playing);
            _this.play.next({
              itemId: _this.item.id,
              playing: playing
            });
          });
        } // console.log('streamId', streamId, mesh);

      }
    });
  };

  _proto.onDestroy = function onDestroy() {
    _ModelEditableCompone.prototype.onDestroy.call(this);

    if (this.mesh) {
      this.mesh.dispose();
    }
  } // called by UpdateViewItemComponent
  ;

  _proto.onUpdate = function onUpdate(item, mesh) {
    // console.log('ModelCurvedPlaneComponent.onUpdate', item);
    if (item.position) {
      mesh.position.fromArray(item.position);
    }

    if (item.rotation) {
      mesh.rotation.fromArray(item.rotation);
    }

    if (item.scale) {
      mesh.scale.fromArray(item.scale);
    } // !!! deactivated


    if ( (item.radius !== this.radius_ || item.height !== this.height_ || item.arc !== this.arc_)) {
      this.mesh.geometry.dispose();
      var geometry = this.getCurvedPanelGeometry(item);
      this.mesh.geometry = geometry;
    }

    this.updateHelper();
  } // called by UpdateViewItemComponent
  ;

  _proto.onUpdateAsset = function onUpdateAsset(item, mesh) {
    var _this2 = this;

    // console.log('ModelCurvedPlaneComponent.onUpdateAsset', item);
    this.mesh.updateByItem(item);
    MediaMesh.getStreamId$(item).pipe(operators.filter(function (streamId) {
      return streamId !== null;
    }), operators.take(1)).subscribe(function (streamId) {
      item.streamId = streamId;

      _this2.mesh.load(function () {// console.log('ModelCurvedPlaneComponent.mesh.load.complete');
      });
    });
  } // called by WorldComponent
  ;

  _proto.onDragMove = function onDragMove(position) {
    this.item.showPanel = false;
    this.editing = true;
    this.mesh.position.set(position.x, position.y, position.z).multiplyScalar(20);
    this.mesh.lookAt(ModelCurvedPlaneComponent.ORIGIN);
    this.updateHelper();
  } // called by WorldComponent
  ;

  _proto.onDragEnd = function onDragEnd() {
    this.item.position = this.mesh.position.toArray();
    this.item.rotation = this.mesh.rotation.toArray();
    this.item.scale = this.mesh.scale.toArray();
    this.editing = false;
  };

  _proto.getCurvedPanelGeometry = function getCurvedPanelGeometry(item) {
    this.radius_ = item.radius;
    this.height_ = item.height;
    this.arc_ = item.arc;
    var arc = Math.PI / 180 * item.arc;
    var geometry = new THREE.CylinderBufferGeometry(item.radius, item.radius, item.height, 36, 2, true, 0, arc);
    geometry.rotateY(-Math.PI - arc / 2);
    geometry.scale(-1, 1, 1);
    return geometry;
  };

  return ModelCurvedPlaneComponent;
}(ModelEditableComponent);
ModelCurvedPlaneComponent.ORIGIN = new THREE.Vector3();
ModelCurvedPlaneComponent.textures = {};
ModelCurvedPlaneComponent.meta = {
  selector: '[model-curved-plane]',
  hosts: {
    host: WorldComponent
  },
  outputs: ['down', 'play'],
  inputs: ['item', 'items']
};var ModelDebugComponent = /*#__PURE__*/function (_ModelComponent) {
  _inheritsLoose(ModelDebugComponent, _ModelComponent);

  function ModelDebugComponent() {
    return _ModelComponent.apply(this, arguments) || this;
  }

  ModelDebugComponent.getLoader = function getLoader() {
    return ModelDebugComponent.loader || (ModelDebugComponent.loader = new THREE.FontLoader());
  };

  ModelDebugComponent.getFontLoader = function getFontLoader(callback) {
    return ModelDebugComponent.fontLoader || (ModelDebugComponent.fontLoader = ModelDebugComponent.getLoader().load(environment.getPath('fonts/helvetiker/helvetiker_regular.typeface.json'), callback));
  };

  var _proto = ModelDebugComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    _ModelComponent.prototype.onInit.call(this); // console.log('ModelDebugComponent.onInit');
    // this.loadFont();


    var vrService = this.vrService = VRService.getService();
    vrService.session$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (session) {
      if (session) {
        if (_this.text) {
          _this.textGroup.add(_this.text);
        }
      } else {
        if (_this.text) {
          _this.text.parent.remove(_this.text);
        }
      }
    });
    var debugService = this.debugService = DebugService.getService();
    debugService.message$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (message) {
      return _this.message = message;
    });
  };

  _proto.createText = function createText() {
    var canvas = document.createElement('canvas'); // document.querySelector('body').appendChild(canvas);

    canvas.width = ModelDebugComponent.W;
    canvas.height = ModelDebugComponent.H;
    var texture = new THREE.CanvasTexture(canvas);
    texture.encoding = THREE.sRGBEncoding;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.mapping = THREE.UVMapping;
    texture.needsUpdate = true;
    var geometry = new THREE.PlaneBufferGeometry(4, 1, 2, 2);
    var material = new THREE.MeshBasicMaterial({
      depthTest: false,
      depthWrite: false,
      map: texture,
      color: 0xffffff,
      // 0x33c5f6,
      transparent: true,
      opacity: 1 // blending: THREE.AdditiveBlending,
      // side: THREE.DoubleSide

    });
    var text = new THREE.Mesh(geometry, material);
    text.renderer = environment.renderOrder.debug;
    text.position.y = 2;
    return text;
  };

  _proto.loadFont = function loadFont() {
    var _this2 = this;

    this.fontLoader = ModelDebugComponent.getFontLoader(function (font) {
      _this2.font = font;

      if (_this2.message_) {
        _this2.setText(_this2.message_);
      }
    });
  };

  _proto.onCreate = function onCreate(mount, dismount) {
    var textGroup = this.textGroup = new THREE.Group();
    var material = this.material = new THREE.MeshBasicMaterial({
      depthTest: false,
      color: 0xffffff,
      // 0x33c5f6,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide
    });
    var text = this.text = this.createText();

    if (typeof mount === 'function') {
      mount(textGroup);
    }
  } // onView() { const context = getContext(this); }
  // onChanges() {}
  ;

  _proto.render = function render(time, tick) {
    var group = this.group;
    var camera = this.host.camera;
    var position = this.position;

    if (this.host.renderer.xr.isPresenting) {
      camera = this.host.renderer.xr.getCamera(camera); // camera.updateMatrixWorld(); // make sure the camera matrix is updated
      // camera.matrixWorldInverse.getInverse(camera.matrixWorld);
    }

    camera.getWorldDirection(position); // console.log(position);
    // if (position.lengthSq() > 0.01) {
    // normalize so we can get a constant speed
    // position.normalize();

    position.multiplyScalar(3); // move body, not the camera
    // VR.body.position.add(lookDirection);
    // console.log(position.x + '|' + position.y + '|' + position.z);

    group.position.copy(position);
    group.lookAt(ModelDebugComponent.ORIGIN); // }
  };

  _proto.setText = function setText(message) {
    var text = this.text;

    if (text) {
      if (this.host.renderer.xr.isPresenting && message != null) {
        // draw
        var ctx = text.material.map.image.getContext('2d');
        ctx.clearRect(0, 0, ModelDebugComponent.W, ModelDebugComponent.H); // ctx.fillRect(0, 0, 10, 10);
        // ctx.fillRect(ModelDebugComponent.W - 10, ModelDebugComponent.H - 10, 10, 10);

        ctx.font = "30px " + environment.fontFamily;
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 5;
        ctx.fillText(message, ModelDebugComponent.W / 2, ModelDebugComponent.H / 2, ModelDebugComponent.W - 20);
        text.material.map.needsUpdate = true; // draw

        this.textGroup.add(text);
      } else if (text.parent) {
        text.parent.remove(text);
      }
    }
  };

  _createClass(ModelDebugComponent, [{
    key: "message",
    get: function get() {
      return this.message_;
    },
    set: function set(message) {
      message = message && message !== '' ? message : null;

      if (this.message_ !== message) {
        this.message_ = message; // console.log('ModelDebugComponent.set.message', message);

        this.setText(message);
        /*
        if (this.font) {
        	this.setText(message);
        }
        */
      }
    }
  }]);

  return ModelDebugComponent;
}(ModelComponent);
ModelDebugComponent.ORIGIN = new THREE.Vector3();
ModelDebugComponent.W = 1024;
ModelDebugComponent.H = 256;
ModelDebugComponent.meta = {
  selector: '[model-debug]',
  hosts: {
    host: WorldComponent
  }
};var VERTEX_SHADER$2 = "\n#extension GL_EXT_frag_depth : enable\n\nvarying vec2 vUv;\nvoid main() {\n\tvUv = uv;\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
var FRAGMENT_SHADER$2 = "\n#extension GL_EXT_frag_depth : enable\n\nvarying vec2 vUv;\nuniform sampler2D textureA;\nuniform sampler2D textureB;\nuniform float opacity;\nuniform float tween;\n\nvoid main() {\n\tvec4 colorA = texture2D(textureA, vUv);\n\tvec4 colorB = texture2D(textureB, vUv);\n\tvec4 color = mix(colorA, colorB, tween);\n\tcolor.a = clamp(color.a * opacity, 0.0, 1.0);\n\tcolor.rgb /= color.a;\n\tgl_FragColor = color;\n}\n";

var ModelGridComponent = /*#__PURE__*/function (_ModelComponent) {
  _inheritsLoose(ModelGridComponent, _ModelComponent);

  function ModelGridComponent() {
    return _ModelComponent.apply(this, arguments) || this;
  }

  ModelGridComponent.getLoader = function getLoader() {
    return ModelGridComponent.loader || (ModelGridComponent.loader = new THREE.TextureLoader());
  };

  ModelGridComponent.getTexture = function getTexture() {
    return ModelGridComponent.texture || (ModelGridComponent.texture = ModelGridComponent.getLoader().load(environment.getPath('textures/ui/floor-nav.png')));
  };

  ModelGridComponent.getOverTexture = function getOverTexture() {
    return ModelGridComponent.textureOver || (ModelGridComponent.textureOver = ModelGridComponent.getLoader().load(environment.getPath('textures/ui/floor-nav-over.png')));
  };

  var _proto = ModelGridComponent.prototype;

  _proto.getCoords = function getCoords(point) {
    var outerTileSize = ModelGridComponent.RADIUS / 10; // assume room is 20m x 20m

    var col = Math.ceil((point.x + outerTileSize / 2) / outerTileSize) - 1;
    var row = Math.ceil((point.z + outerTileSize / 2) / outerTileSize) - 1;
    var dx = Math.floor(ModelGridComponent.COLS / 2);
    var dy = Math.floor(ModelGridComponent.ROWS / 2);
    var ci = Math.min(dx, Math.abs(col)) * (col ? Math.abs(col) / col : 1);
    var ri = Math.min(dy, Math.abs(row)) * (row ? Math.abs(row) / row : 1);

    if (this.view.hasTile(this.indices.x + ci, this.indices.y + ri)) {
      // console.log('col', col, 'row', row, 'ci', ci, 'ri', ri);
      return new THREE.Vector2(ci, ri);
    }
  };

  _proto.onInit = function onInit() {
    var _this = this;

    _ModelComponent.prototype.onInit.call(this);

    this.indices = new THREE.Vector2(); // console.log('ModelGridComponent.onInit', this.view);

    this.view.index$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (index) {
      _this.moveToIndex(index);
    });
  };

  _proto.addTiles = function addTiles(mesh) {
    var _this2 = this;

    // console.log('addTiles');
    var outerTileSize = ModelGridComponent.RADIUS / 10; // assume room is 20m x 20m

    var innerTileSize = outerTileSize * 0.9;
    var geometry = new THREE.PlaneBufferGeometry(innerTileSize, innerTileSize, 2, 2);
    geometry.rotateX(-Math.PI / 2);
    var map = ModelGridComponent.getTexture();
    map.disposable = false;
    map.encoding = THREE.sRGBEncoding;
    var mapOver = ModelGridComponent.getOverTexture();
    mapOver.disposable = false;
    mapOver.encoding = THREE.sRGBEncoding; // geometry.scale(-1, 1, 1);

    var tileMap = this.tileMap = {};
    var tiles = this.tiles = new Array(ModelGridComponent.COLS * ModelGridComponent.ROWS).fill(0).map(function (x, i) {
      var material = new THREE.ShaderMaterial({
        depthTest: false,
        depthWrite: false,
        transparent: true,
        vertexShader: VERTEX_SHADER$2,
        fragmentShader: FRAGMENT_SHADER$2,
        uniforms: {
          textureA: {
            type: "t",
            value: map
          },
          textureB: {
            type: "t",
            value: mapOver
          },
          tween: {
            value: 0
          },
          opacity: {
            value: 0
          }
        } // side: THREE.DoubleSide

      });
      /*
      const material = new THREE.MeshBasicMaterial({
      	depthTest: false,
      	depthWrite: false,
      	map: map,
      	transparent: true,
      	opacity: 0,
      	// side: THREE.DoubleSide,
      });
      */

      var tile = new THREE.Mesh(geometry, material);
      var dx = Math.floor(ModelGridComponent.COLS / 2);
      var dy = Math.floor(ModelGridComponent.ROWS / 2);
      var row = Math.floor(i / ModelGridComponent.COLS);
      var col = i % ModelGridComponent.COLS;
      var ci = -dx + col;
      var ri = -dy + row; // console.log(ci, ri);

      tile.position.set(ci * outerTileSize, -ModelGridComponent.RADIUS * 0.15, ri * outerTileSize);
      tile.name = _this2.getName("tile_" + ci + "_" + ri);
      var uniforms = tile.uniforms = {
        tween: 0,
        opacity: 0,
        ci: ci,
        ri: ri
      };
      tileMap[ci + "_" + ri] = tile;
      mesh.add(tile);
      return tile;
    });
    this.showTiles();
  };

  _proto.showTiles = function showTiles() {
    var _this3 = this;

    this.tiles.forEach(function (tile, i) {
      var ix = _this3.indices ? _this3.indices.x : 0;
      var iy = _this3.indices ? _this3.indices.y : 0;

      var visible = _this3.view.hasTile(ix + tile.uniforms.ci, iy + tile.uniforms.ri);

      var uniforms = tile.uniforms;
      gsap.to(uniforms, {
        opacity: visible ? 1 : 0,
        duration: 0.4,
        // delay: 0 + i * 0.02,
        ease: Power2.easeInOut,
        onUpdate: function onUpdate() {
          tile.material.uniforms.opacity.value = uniforms.opacity;
          tile.material.needsUpdate = true;
        }
      });
    });
  };

  _proto.addHitArea = function addHitArea(mesh) {
    this.onGroundOver = this.onGroundOver.bind(this);
    this.onGroundMove = this.onGroundMove.bind(this);
    this.onGroundDown = this.onGroundDown.bind(this);
    this.onGroundOut = this.onGroundOut.bind(this);
    var geometry = new THREE.PlaneBufferGeometry(ModelGridComponent.RADIUS, ModelGridComponent.RADIUS, 20, 20);
    geometry.rotateX(-Math.PI / 2); // geometry.scale(-1, 1, 1);

    var material = new THREE.MeshBasicMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      opacity: 0 // side: THREE.DoubleSide,

    });
    var ground = this.ground = new InteractiveMesh(geometry, material);
    ground.name = this.getName('ground');
    ground.position.set(0, -ModelGridComponent.RADIUS * 0.15, 0);
    ground.on('over', this.onGroundOver);
    ground.on('move', this.onGroundMove);
    ground.on('out', this.onGroundOut);
    ground.on('down', this.onGroundDown);
    mesh.add(ground);
  };

  _proto.onGroundOver = function onGroundOver() {
    var ground = this.ground;
    var coords = this.getCoords(ground.intersection.point);
    this.coords = coords;
  };

  _proto.onGroundMove = function onGroundMove() {
    var ground = this.ground;
    var coords = this.getCoords(ground.intersection.point);
    this.coords = coords;
  };

  _proto.onGroundDown = function onGroundDown() {
    var ground = this.ground;
    var coords = this.getCoords(ground.intersection.point);
    this.coords = coords;

    if (coords) {
      var index = this.view.getTileIndex(this.indices.x + coords.x, this.indices.y + coords.y);
      this.view.index = index;
      this.nav.next(index);
      /*
      this.indices.x += coords.x;
      this.indices.y += coords.y;
      const outerTileSize = ModelGridComponent.RADIUS / 10; // assume room is 20m x 20m
      this.move.next({
      	indices: this.indices,
      	coords,
      	position: coords.clone().multiplyScalar(outerTileSize)
      });
      */
    }
  };

  _proto.onGroundOut = function onGroundOut() {
    this.coords = null;
  };

  _proto.moveToIndex = function moveToIndex(index) {
    // console.log('ModelGridComponent.moveToIndex', index);
    this.coords = null;
    var tile = this.view.tiles[index];
    var coords = new THREE.Vector2(tile.indices.x - this.indices.x, tile.indices.y - this.indices.y);
    this.indices.x = tile.indices.x;
    this.indices.y = tile.indices.y;
    this.showTiles();
    var outerTileSize = ModelGridComponent.RADIUS / 10; // assume room is 20m x 20m

    this.move.next({
      indices: this.indices,
      coords: coords,
      position: coords.clone().multiplyScalar(outerTileSize)
    });
  };

  _proto.onCreate = function onCreate(mount, dismount) {
    // this.renderOrder = environment.renderOrder.tile;
    var mesh = new THREE.Group();
    this.addTiles(mesh);
    this.addHitArea(mesh);
    /*
    mesh.userData = {
    	render: () => {
    			}
    };
    */

    if (typeof mount === 'function') {
      mount(mesh);
    }
  };

  _proto.onDestroy = function onDestroy() {
    _ModelComponent.prototype.onDestroy.call(this);

    var ground = this.ground;
    ground.off('over', this.onGroundOver);
    ground.off('move', this.onGroundMove);
    ground.off('down', this.onGroundDown);
    ground.off('out', this.onGroundOut);
  };

  _createClass(ModelGridComponent, [{
    key: "coords",
    set: function set(coords) {
      if (!coords && this.coords_ !== coords || !this.coords_ || coords.x !== this.coords_.x || coords.y !== this.coords_.y) {
        // changed!
        var tileMap = this.tileMap;

        if (this.coords_) {
          var previousTile = tileMap[this.coords_.x + "_" + this.coords_.y];
          var previousUniforms = previousTile.uniforms;
          gsap.to(previousUniforms, {
            tween: 0,
            duration: 0.4,
            delay: 0,
            ease: Power2.easeInOut,
            onUpdate: function onUpdate() {
              previousTile.material.uniforms.tween.value = previousUniforms.tween;
              previousTile.material.needsUpdate = true;
            }
          });
        }

        if (coords) {
          var currentTile = this.currentTile = tileMap[coords.x + "_" + coords.y];
          var currentUniforms = currentTile.uniforms;
          gsap.to(currentUniforms, {
            tween: 1,
            duration: 0.4,
            delay: 0,
            ease: Power2.easeInOut,
            onUpdate: function onUpdate() {
              currentTile.material.uniforms.tween.value = currentUniforms.tween;
              currentTile.material.needsUpdate = true;
            }
          }); // console.log(currentTile, `${coords.x}_${coords.y}`);
        }

        this.coords_ = coords;
      }
    }
  }, {
    key: "coords__",
    set: function set(coords) {
      if (!coords && this.coords_ !== coords || !this.coords_ || coords.x !== this.coords_.x || coords.y !== this.coords_.y) {
        // changed!
        var tileMap = this.tileMap;

        if (this.coords_) {
          var previousTile = tileMap[this.coords_.x + "_" + this.coords_.y];
          var from = {
            tween: 1
          };
          gsap.to(from, {
            duration: 0.4,
            tween: 0,
            delay: 0,
            ease: Power2.easeInOut,
            onUpdate: function onUpdate() {
              previousTile.material.opacity = from.tween; // previousTile.material.needsUpdate = true;
            }
          });
        }

        if (coords) {
          var currentTile = this.currentTile = tileMap[coords.x + "_" + coords.y];
          var _from = {
            tween: 0
          };
          gsap.to(_from, {
            duration: 0.4,
            tween: 1,
            delay: 0,
            ease: Power2.easeInOut,
            onUpdate: function onUpdate() {
              currentTile.material.opacity = _from.tween; // currentTile.material.needsUpdate = true;
            }
          }); // console.log(currentTile, `${coords.x}_${coords.y}`);
        }

        this.coords_ = coords;
      }
    }
  }]);

  return ModelGridComponent;
}(ModelComponent);
ModelGridComponent.ORIGIN = new THREE.Vector3();
ModelGridComponent.RADIUS = 101;
ModelGridComponent.COLS = 11;
ModelGridComponent.ROWS = 11;
ModelGridComponent.meta = {
  selector: '[model-grid]',
  hosts: {
    host: WorldComponent
  },
  outputs: ['move', 'nav'],
  inputs: ['view']
};var MenuButton = /*#__PURE__*/function (_InteractiveMesh) {
  _inheritsLoose(MenuButton, _InteractiveMesh);

  MenuButton.getGrid = function getGrid(total) {
    var cols = Math.ceil(total / MenuButton.ROWS);
    var rows = Math.ceil(total / cols);
    return [rows, cols];
  };

  MenuButton.getX = function getX(index, total) {
    var cols = Math.ceil(total / MenuButton.ROWS);
    var c = index % cols;
    var w = 1 / MenuButton.W * (MenuButton.W + MenuButton.G);
    return w / 2 - cols * w / 2 + c * w;
  };

  MenuButton.getY = function getY(index, total) {
    var cols = Math.ceil(total / MenuButton.ROWS);
    var rows = Math.ceil(total / cols);
    var r = Math.floor(index / cols);
    var h = 1 / MenuButton.W * (MenuButton.H + MenuButton.G);
    return rows * h / 2 - h / 2 + r * -h; // y flipped
  };

  _createClass(MenuButton, null, [{
    key: "geometry",
    get: function get() {
      if (this.geometry_) {
        return this.geometry_;
      }

      var geometry = new THREE.PlaneBufferGeometry(1, 1 / MenuButton.W * MenuButton.H, 2, 2); // geometry.rotateX(-Math.PI);
      // geometry.scale(-1, 1, 1);

      this.geometry_ = geometry;
      return geometry;
    }
  }, {
    key: "material",
    get: function get() {
      var material = new THREE.ShaderMaterial({
        depthTest: false,
        transparent: true,
        vertexShader: ModelMenuComponent.VERTEX_SHADER,
        fragmentShader: ModelMenuComponent.FRAGMENT_SHADER,
        uniforms: {
          textureA: {
            type: "t",
            value: null
          },
          textureB: {
            type: "t",
            value: null
          },
          resolutionA: {
            value: new THREE.Vector2()
          },
          resolutionB: {
            value: new THREE.Vector2()
          },
          tween: {
            value: 0
          },
          opacity: {
            value: 0
          }
        }
      });
      /*
      const material = new THREE.MeshBasicMaterial({
      	// depthTest: false,
      	transparent: true,
      	opacity: 0.8,
      	// side: THREE.DoubleSide,
      });
      */

      return material;
    }
  }]);

  function MenuButton(item, index, total) {
    var _this;

    var geometry = MenuButton.geometry;
    var material = MenuButton.material;
    _this = _InteractiveMesh.call(this, geometry, material) || this; // this.userData.item = item;
    // this.userData.index = index;

    _this.renderOrder = environment.renderOrder.menu;
    _this.name = item.name;
    _this.item = item;
    _this.index = index;
    _this.total = total;
    _this.tween = 0;
    _this.opacity = 0;

    var textureA = _this.textureA = _this.getTextureA(item.name); // material.map = textureA;


    material.uniforms.textureA.value = textureA;
    material.uniforms.resolutionA.value = new THREE.Vector2(textureA.width, textureA.height);

    var textureB = _this.textureB = _this.getTextureB(item.name); // material.map = textureB;


    material.uniforms.textureB.value = textureB;
    material.uniforms.resolutionA.value = new THREE.Vector2(textureB.width, textureB.height);
    material.uniforms.tween.value = _this.tween;
    material.uniforms.opacity.value = _this.opacity;
    material.needsUpdate = true;

    _this.position.set(MenuButton.getX(index, total), MenuButton.getY(index, total), 0);

    _this.onOver = _this.onOver.bind(_assertThisInitialized(_this));
    _this.onOut = _this.onOut.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = MenuButton.prototype;

  _proto.getTextureA = function getTextureA(text) {
    var w = MenuButton.W;
    var h = MenuButton.H;
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = environment.colors.menuBackground;
    ctx.fillRect(0, 0, w, h);
    ctx.font = "20px " + environment.fontFamily;
    ctx.fillStyle = environment.colors.menuForeground;
    ctx.fillText(text, 10, 50, w - 20);
    var texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.mapping = THREE.UVMapping;
    texture.encoding = THREE.sRGBEncoding;
    texture.needsUpdate = true;
    return texture;
  };

  _proto.getTextureB = function getTextureB(text) {
    var w = MenuButton.W;
    var h = MenuButton.H;
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = environment.colors.menuOverBackground;
    ctx.fillRect(0, 0, w, h);
    ctx.font = "20px " + environment.fontFamily;
    ctx.fillStyle = environment.colors.menuOverForeground;
    ctx.fillText(text, 10, 50, w - 20);
    var texture = new THREE.CanvasTexture(canvas);
    texture.encoding = THREE.sRGBEncoding;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  };

  _proto.onOver = function onOver() {
    var _this2 = this;

    /*
    const debugService = DebugService.getService();
    debugService.setMessage('over ' + this.name);
    */
    gsap.to(this, {
      duration: 0.4,
      tween: 1,
      ease: Power2.easeOut,
      onUpdate: function onUpdate() {
        _this2.position.z = 0.1 * _this2.tween;
        _this2.material.uniforms.tween.value = _this2.tween;
        _this2.material.needsUpdate = true;
      }
    });
  };

  _proto.onOut = function onOut() {
    var _this3 = this;

    gsap.to(this, {
      duration: 0.4,
      tween: 0,
      ease: Power2.easeOut,
      onUpdate: function onUpdate() {
        _this3.position.z = 0.1 * _this3.tween;
        _this3.material.uniforms.tween.value = _this3.tween;
        _this3.material.needsUpdate = true;
      }
    });
  };

  _proto.dispose = function dispose() {
    Interactive.dispose(this);
    this.textureA.dispose();
    this.textureB.dispose();
    this.material.dispose();
    this.geometry.dispose();
  };

  return MenuButton;
}(InteractiveMesh);
MenuButton.W = 256;
MenuButton.H = 64;
MenuButton.G = 2;
MenuButton.ROWS = 6;
var BackButton = /*#__PURE__*/function (_MenuButton) {
  _inheritsLoose(BackButton, _MenuButton);

  function BackButton(item, index, total) {
    return _MenuButton.call(this, item, index, total) || this;
  }

  var _proto2 = BackButton.prototype;

  _proto2.getTextureA = function getTextureA(text) {
    var w = MenuButton.W;
    var h = MenuButton.H;
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = environment.colors.menuBackBackground;
    ctx.fillRect(0, 0, w, h);
    ctx.font = "20px " + environment.fontFamily;
    ctx.fillStyle = environment.colors.menuBackForeground;
    ctx.fillText(text, 10, 50, w - 20);
    var texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.mapping = THREE.UVMapping;
    texture.needsUpdate = true;
    return texture;
  };

  _proto2.getTextureB = function getTextureB(text) {
    var w = MenuButton.W;
    var h = MenuButton.H;
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = environment.colors.menuBackOverBackground;
    ctx.fillRect(0, 0, w, h);
    ctx.font = "20px " + environment.fontFamily;
    ctx.fillStyle = environment.colors.menuBackOverForeground;
    ctx.fillText(text, 10, 50, w - 20);
    var texture = new THREE.CanvasTexture(canvas);
    texture.encoding = THREE.sRGBEncoding;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  };

  return BackButton;
}(MenuButton);

var ModelMenuComponent = /*#__PURE__*/function (_ModelComponent) {
  _inheritsLoose(ModelMenuComponent, _ModelComponent);

  function ModelMenuComponent() {
    return _ModelComponent.apply(this, arguments) || this;
  }

  var _proto3 = ModelMenuComponent.prototype;

  _proto3.onInit = function onInit() {
    var _this4 = this;

    _ModelComponent.prototype.onInit.call(this);

    this.onDown = this.onDown.bind(this);
    this.onToggle = this.onToggle.bind(this); // console.log('ModelMenuComponent.onInit');

    var vrService = this.vrService = VRService.getService();
    vrService.session$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (session) {
      if (session) {
        _this4.addToggler();
      } else {
        _this4.removeMenu();
      }
    });
  };

  _proto3.onChanges = function onChanges() {// this.buildMenu();
  };

  _proto3.buildMenu = function buildMenu() {
    var _this5 = this;

    if (!this.items) {
      return;
    }

    MenuService.getModelMenu$(this.items, this.editor).pipe(operators.first()).subscribe(function (menu) {
      return _this5.groups = menu;
    });
    /*
    const menu = {};
    this.items.forEach(item => {
    	if (item.type.name !== ViewType.WaitingRoom.name && (!item.hidden || this.editor)) {
    		let group = menu[item.type.name];
    		if (!group) {
    			group = menu[item.type.name] = [];
    		}
    		group.push(item);
    	}
    });
    this.groups = Object.keys(menu).map(typeName => {
    	let name = 'Button';
    	switch (typeName) {
    		case ViewType.WaitingRoom.name:
    			name = 'Waiting Room';
    			break;
    		case ViewType.Panorama.name:
    			name = 'Experience';
    			break;
    		case ViewType.PanoramaGrid.name:
    			name = 'Virtual Tour';
    			break;
    		case ViewType.Room3d.name:
    			name = 'Stanze 3D';
    			break;
    		case ViewType.Model.name:
    			name = 'Modelli 3D';
    			break;
    	}
    	return { name, type: { name: 'menu-group' }, items: this.items.filter(x => x.type.name === typeName && (!x.hidden || this.editor)) };
    });
    */
  };

  _proto3.onDestroy = function onDestroy() {
    if (this.buttons) {
      this.buttons.forEach(function (x) {
        return Interactive.dispose(x);
      });
    }

    _ModelComponent.prototype.onDestroy.call(this);
  };

  _proto3.onCreate = function onCreate(mount, dismount) {
    // this.renderOrder = environment.renderOrder.menu;
    var menuGroup = this.menuGroup = new THREE.Group(); // menuGroup.lookAt(ModelMenuComponent.ORIGIN);

    if (typeof mount === 'function') {
      mount(menuGroup);
    }
  };

  _proto3.render = function render(time, tick) {
    var group = this.group;
    var camera = this.host.camera;
    var position = this.position;

    if (this.host.renderer.xr.isPresenting) {
      camera = this.host.renderer.xr.getCamera(camera);
      camera.getWorldDirection(position);
      group.position.set(position.x, position.y - 0.3, position.z);
      group.position.multiplyScalar(3);
      group.scale.set(1, 1, 1);
      group.lookAt(ModelMenuComponent.ORIGIN);
    } else {
      camera.getWorldDirection(position);

      if (OrbitService.mode === OrbitMode.Model) {
        position.multiplyScalar(0.01);
      } else {
        position.multiplyScalar(3);
      }

      group.position.copy(position);
      var s = 1 / camera.zoom;
      group.scale.set(s, s, s);
      group.lookAt(ModelMenuComponent.ORIGIN);
    }
  };

  _proto3.onToggle = function onToggle() {
    if (StateService.state.locked || StateService.state.spying) {
      return;
    }

    if (this.buttons) {
      this.removeMenu();
      this.toggle.next();
    } else {
      this.addMenu();
      this.toggle.next(this);
    }
  };

  _proto3.onDown = function onDown(button) {
    // this.down.next(this.item);
    if (button.item && button.item.type.name === 'back') {
      this.removeMenu();

      if (button.item.backItem) {
        this.addMenu(button.item.backItem.backItem);
      } else {
        if (this.host.renderer.xr.isPresenting) {
          this.addToggler();
        }

        this.toggle.next();
      }
    } else {
      this.addMenu(button.item);
    }
  };

  _proto3.items$ = function items$(item) {
    if (item === void 0) {
      item = null;
    }

    if (item) {
      return rxjs.of(item.items);
    } else {
      return MenuService.getModelMenu$(this.items, this.editor).pipe(operators.first());
    }
  };

  _proto3.addMenu = function addMenu(item) {
    var _this6 = this;

    if (item === void 0) {
      item = null;
    }

    this.removeMenu(); // nav to view

    if (item && item.type.name !== 'menu-group') {
      if (this.host.renderer.xr.isPresenting) {
        this.addToggler();
      }

      this.nav.next(item);
      return;
    }

    this.items$(item).subscribe(function (items) {
      if (items) {
        items = items.slice();
        var back = {
          type: {
            name: 'back'
          },
          name: item ? 'Back' : 'Close',
          backItem: item
        };
        items.push(back);
        var buttons = _this6.buttons = items.map(function (x, i, a) {
          x.backItem = item;
          return x.type.name === 'back' ? new BackButton(x, i, a.length) : new MenuButton(x, i, a.length);
        });
        buttons.forEach(function (button) {
          button.depthTest = false;
          button.on('over', button.onOver);
          button.on('out', button.onOut);
          button.on('down', _this6.onDown);

          _this6.menuGroup.add(button);
          /*
          var box = new THREE.BoxHelper(button, 0xffff00);
          this.host.scene.add(box);
          */

        });
        gsap.to(buttons, {
          duration: 0.3,
          opacity: 0.8,
          ease: Power2.easeOut,
          stagger: {
            grid: MenuButton.getGrid(buttons.length),
            from: 0,
            // index
            amount: 0.02 * buttons.length
          },
          onUpdate: function onUpdate() {
            buttons.forEach(function (button) {
              button.material.uniforms.opacity.value = button.opacity * (button.item.hidden ? 0.5 : 1); // button.material.needsUpdate = true;
            });
          }
        });
      }
    });
  };

  _proto3.removeMenu = function removeMenu() {
    this.removeButtons();
    this.removeToggler();
  };

  _proto3.removeButtons = function removeButtons() {
    var _this7 = this;

    var buttons = this.buttons;

    if (buttons) {
      buttons.forEach(function (button) {
        _this7.menuGroup.remove(button);

        button.off('over', button.onOver);
        button.off('out', button.onOut);
        button.off('down', _this7.onDown);
        button.dispose();
      });
    }

    this.buttons = null;
  };

  _proto3.addToggler = function addToggler() {
    this.removeMenu();
    var toggler = this.toggler = new MenuButton({
      type: {
        name: 'menu'
      },
      name: 'Menu'
    }, 0, 1); // toggler.position.y = -0.5;

    toggler.opacity = 0.8;
    toggler.material.uniforms.opacity.value = toggler.opacity;
    toggler.material.needsUpdate = true;
    toggler.on('over', toggler.onOver);
    toggler.on('out', toggler.onOut);
    toggler.on('down', this.onToggle);
    this.menuGroup.add(toggler);
  };

  _proto3.removeToggler = function removeToggler() {
    var toggler = this.toggler;

    if (toggler) {
      this.menuGroup.remove(toggler);
      toggler.off('over', toggler.onOver);
      toggler.off('out', toggler.onOut);
      toggler.off('down', this.onToggle);
      toggler.dispose();
    }

    this.toggler = null;
  };

  return ModelMenuComponent;
}(ModelComponent);
ModelMenuComponent.ORIGIN = new THREE.Vector3();
ModelMenuComponent.VERTEX_SHADER = "\n#extension GL_EXT_frag_depth : enable\n\nvarying vec2 vUv;\nvoid main() {\n\tvUv = uv;\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
ModelMenuComponent.FRAGMENT_SHADER = "\n#extension GL_EXT_frag_depth : enable\n\nvarying vec2 vUv;\nuniform float opacity;\nuniform float tween;\nuniform sampler2D textureA;\nuniform sampler2D textureB;\nuniform vec2 resolutionA;\nuniform vec2 resolutionB;\n\nvoid main() {\n\tvec4 colorA = texture2D(textureA, vUv);\n\tvec4 colorB = texture2D(textureB, vUv);\n\tvec4 color = vec4(mix(colorA.rgb, colorB.rgb, tween), opacity);\n\tgl_FragColor = color;\n}\n";
ModelMenuComponent.meta = {
  selector: '[model-menu]',
  hosts: {
    host: WorldComponent
  },
  // outputs: ['over', 'out', 'down', 'nav'],
  outputs: ['nav', 'toggle'],
  inputs: ['items', 'editor']
};var ModelModelComponent = /*#__PURE__*/function (_ModelEditableCompone) {
  _inheritsLoose(ModelModelComponent, _ModelEditableCompone);

  function ModelModelComponent() {
    return _ModelEditableCompone.apply(this, arguments) || this;
  }

  var _proto = ModelModelComponent.prototype;

  /*
  static getInteractiveGeometry() {
  	return ModelModelComponent.interactiveGeometry || (ModelModelComponent.interactiveGeometry = new THREE.SphereBufferGeometry(1, 8, 8));
  }
  */
  _proto.onInit = function onInit() {
    var _this = this;

    _ModelEditableCompone.prototype.onInit.call(this);

    this.progress = null;

    if (this.view.type.name === ViewType.Model.name) {
      var vrService = this.vrService = VRService.getService();
      vrService.session$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (session) {
        var group = _this.group;

        if (session) {
          group.position.z = -2;
        } else {
          group.position.z = 0;
        }
      });
    } // console.log('ModelModelComponent.onInit');

  };

  _proto.onChanges = function onChanges() {
    this.editing = this.item.selected;
  };

  _proto.createStand = function createStand() {
    var geometry = new THREE.BoxBufferGeometry(3, 3, 3);
    var material = new THREE.MeshBasicMaterial();
    /*
    const material = new THREE.ShaderMaterial({
    	vertexShader: VERTEX_SHADER,
    	fragmentShader: FRAGMENT_SHADER,
    	uniforms: {
    		texture: { type: "t", value: null },
    		resolution: { value: new THREE.Vector2() }
    	},
    });
    */

    var stand = this.stand = new THREE.Mesh(geometry, material);
  };

  _proto.onCreate = function onCreate(mount, dismount) {
    var _this2 = this;

    // this.renderOrder = environment.renderOrder.model;
    this.loadGltfModel(environment.getPath(this.item.asset.folder), this.item.asset.file, function (mesh) {
      _this2.onGltfModelLoaded(mesh, mount, dismount);
    });
  };

  _proto.loadGltfModel = function loadGltfModel(path, file, callback) {
    var renderer = this.host.renderer; // const roughnessMipmapper = new RoughnessMipmapper(renderer); // optional

    var progressRef = LoaderService.getRef(); // console.log('progressRef');

    var loader = new THREE.GLTFLoader().setPath(path);
    loader.load(file, function (gltf) {
      /*
      gltf.scene.traverse((child) => {
      	if (child.isMesh) {
      		// roughnessMipmapper.generateMipmaps(child.material);
      	}
      });
      */
      if (typeof callback === 'function') {
        callback(gltf.scene);
      }

      LoaderService.setProgress(progressRef, 1); // this.progress = null;
      // this.pushChanges();
      // roughnessMipmapper.dispose();
    }, function (progressEvent) {
      /*
      let value = this.progress ? this.progress.value : 0;
      if (progressEvent.lengthComputable) {
      	value = Math.round(progressEvent.loaded / progressEvent.total * 100);
      } else {
      	value = Math.floor(Math.min(100, value + 0.1));
      }
      this.progress = { value, title: `${value}%` };
      // console.log('progressEvent', progressEvent.loaded, progressEvent.total);
      this.pushChanges();
      */
      LoaderService.setProgress(progressRef, progressEvent.loaded, progressEvent.total);
    });
  };

  _proto.onGltfModelLoaded = function onGltfModelLoaded(mesh, mount, dismount) {
    var _this3 = this;

    // scale
    var box = new THREE.Box3().setFromObject(mesh);
    var size = box.max.clone().sub(box.min);
    var max = Math.max(size.x, size.y, size.z);
    var scale = 1.7 / max;
    mesh.scale.set(scale, scale, scale); // repos

    var dummy;
    var view = this.view;
    var item = this.item;

    if (view.type.name === ViewType.Model.name) {
      dummy = new THREE.Group();
      dummy.add(mesh);
      box.setFromObject(dummy);
      var center = box.getCenter(new THREE.Vector3());
      dummy.position.set(mesh.position.x - center.x, mesh.position.y - center.y, // mesh.position.z - center.z + (this.host.renderer.xr.isPresenting ? -2 : 0),
      mesh.position.z - center.z);
      var endY = dummy.position.y;
      var from = {
        tween: 1
      };

      var onUpdate = function onUpdate() {
        dummy.position.y = endY + 3 * from.tween;
        dummy.rotation.y = 0 + Math.PI * from.tween;
      };

      onUpdate();
      gsap.to(from, {
        duration: 1.5,
        tween: 0,
        delay: 0.1,
        ease: Power2.easeInOut,
        onUpdate: onUpdate,
        onComplete: function onComplete() {
          _this3.updateHelper();
        }
      });
    } else {
      // dummy = new InteractiveGroup();
      box.setFromObject(mesh);

      var _center = box.getCenter(new THREE.Vector3());

      mesh.position.set(-_center.x, -_center.y, -_center.z);
      dummy = new THREE.Group();
      dummy.add(mesh);

      if (item.position) {
        dummy.position.fromArray(item.position);
      }

      if (item.rotation) {
        dummy.rotation.fromArray(item.rotation);
      }

      if (item.scale) {
        dummy.scale.fromArray(item.scale);
      }

      this.makeInteractive(mesh);
      /*
      const geometry = ModelModelComponent.getInteractiveGeometry();
      const sphere = new InteractiveMesh(geometry, new THREE.MeshBasicMaterial({
      	depthTest: false,
      	depthWrite: false,
      	transparent: true,
      	// wireframe: true,
      	// opacity: 1.0,
      	opacity: 0.0,
      	color: 0x00ffff,
      }));
      const radius = max * scale / 1.7;
      sphere.scale.set(radius, radius, radius);
      sphere.name = `[model] ${this.item.id}`;
      // sphere.depthTest = false;
      sphere.renderOrder = 0;
      dummy.add(sphere);
      sphere.on('down', () => {
      	// console.log('ModelModelComponent.down');
      	this.down.next(this);
      });
      */

      this.updateHelper();
    }

    if (typeof mount === 'function') {
      mount(dummy, this.item);
    }
    /*
    this.progress = null;
    this.pushChanges();
    */

  } // called by UpdateViewItemComponent
  ;

  _proto.onUpdate = function onUpdate(item, mesh) {
    // console.log('ModelModelComponent.onUpdate', item);
    var view = this.view;

    if (view.type.name !== ViewType.Model.name) {
      if (item.position) {
        mesh.position.fromArray(item.position);
      }

      if (item.rotation) {
        mesh.rotation.fromArray(item.rotation);
      }

      if (item.scale) {
        mesh.scale.fromArray(item.scale);
      }
    }

    this.updateHelper();
  } // called by UpdateViewItemComponent
  ;

  _proto.onUpdateAsset = function onUpdateAsset(item, mesh) {
    var _this4 = this;

    // console.log('ModelModelComponent.onUpdateAsset', item);
    this.loadGltfModel(environment.getPath(item.asset.folder), item.asset.file, function (mesh) {
      _this4.onGltfModelLoaded(mesh, function (mesh, item) {
        return _this4.onMount(mesh, item);
      }, function (mesh, item) {
        return _this4.onDismount(mesh, item);
      });
    });
    /*
    this.mesh.updateByItem(item);
    this.mesh.load(() => {
    	// console.log('ModelModelComponent.mesh.load.complete');
    });
    */
  } // called by WorldComponent
  ;

  _proto.onDragMove = function onDragMove(position) {
    // console.log('ModelModelComponent.onDragMove', position);
    this.editing = true;
    var view = this.view;

    if (view.type.name !== ViewType.Model.name) {
      this.mesh.position.set(position.x, position.y, position.z).multiplyScalar(4); // this.mesh.lookAt(ModelModelComponent.ORIGIN);
    }

    this.updateHelper();
  } // called by WorldComponent
  ;

  _proto.onDragEnd = function onDragEnd() {
    // console.log('ModelModelComponent.onDragEnd');
    var view = this.view;

    if (view.type.name !== ViewType.Model.name) {
      this.item.position = this.mesh.position.toArray();
      this.item.rotation = this.mesh.rotation.toArray();
      this.item.scale = this.mesh.scale.toArray();
    }

    this.editing = false;
  };

  _proto.makeInteractive = function makeInteractive(mesh) {
    var _this5 = this;

    var newChild = null;
    mesh.traverse(function (child) {
      if (newChild === null && child.isMesh && !(child instanceof InteractiveMesh)) {
        // roughnessMipmapper.generateMipmaps(child.material);
        var parent = child.parent;
        newChild = new InteractiveMesh(child.geometry, child.material); // newChild.depthTest = true;
        // newChild.renderOrder = 0;

        newChild.name = child.name;
        newChild.position.copy(child.position);
        newChild.rotation.copy(child.rotation);
        newChild.scale.copy(child.scale);
        newChild.on('down', function () {
          // console.log('ModelModelComponent.down');
          _this5.down.next(_this5);
        });
        parent.remove(child);
        parent.add(newChild);
      }
    });

    if (newChild !== null) {
      this.makeInteractive(mesh);
    }
  };

  return ModelModelComponent;
}(ModelEditableComponent);
ModelModelComponent.ORIGIN = new THREE.Vector3();
ModelModelComponent.meta = {
  selector: '[model-model]',
  hosts: {
    host: WorldComponent
  },
  outputs: ['down'],
  inputs: ['item', 'view']
};var NavModeType = {
  None: 'none',
  Move: 'move',
  Info: 'info',
  Point: 'point',
  Title: 'title'
};

var ModelNavComponent = /*#__PURE__*/function (_ModelEditableCompone) {
  _inheritsLoose(ModelNavComponent, _ModelEditableCompone);

  function ModelNavComponent() {
    return _ModelEditableCompone.apply(this, arguments) || this;
  }

  ModelNavComponent.getNavGeometry = function getNavGeometry() {
    // const geometry = new THREE.PlaneBufferGeometry(3, 2, 2, 2);
    // const geometry = new THREE.SphereBufferGeometry(3, 12, 12);
    return ModelNavComponent.navGeometry || (ModelNavComponent.navGeometry = new THREE.SphereBufferGeometry(3, 12, 12));
  };

  ModelNavComponent.getLoader = function getLoader() {
    return ModelNavComponent.loader || (ModelNavComponent.loader = new THREE.TextureLoader());
  };

  ModelNavComponent.getTexturePoint = function getTexturePoint() {
    return ModelNavComponent.texturePoint || (ModelNavComponent.texturePoint = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-point.png')));
  };

  ModelNavComponent.getTextureMove = function getTextureMove() {
    return ModelNavComponent.textureMove || (ModelNavComponent.textureMove = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-more.png')));
  };

  ModelNavComponent.getTextureInfo = function getTextureInfo() {
    return ModelNavComponent.textureInfo || (ModelNavComponent.textureInfo = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-info.png')));
  };

  ModelNavComponent.getTexture = function getTexture(mode) {
    var texture;

    switch (mode) {
      case NavModeType.Move:
        texture = this.getTextureMove();
        break;

      case NavModeType.Info:
        texture = this.getTextureInfo();
        break;

      case NavModeType.Point:
      case NavModeType.Title:
        texture = this.getTexturePoint();
        break;
    }

    return texture;
  };

  ModelNavComponent.getTitleTexture = function getTitleTexture(item, mode) {
    var texture;

    if (mode === NavModeType.Title) {
      var text = item.title;
      var canvas = document.createElement('canvas'); // document.querySelector('body').appendChild(canvas);

      canvas.width = 512;
      canvas.height = 32;
      var ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.font = "28px " + environment.fontFamily;
      var metrics = ctx.measureText(text);
      var w = metrics.width + 8;
      w = Math.pow(2, Math.ceil(Math.log(w) / Math.log(2)));
      var x = w / 2;
      var y = 16;
      canvas.width = w;
      ctx.font = "28px " + environment.fontFamily;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 6;
      ctx.lineJoin = 'round'; // Experiment with "bevel" & "round" for the effect you want!

      ctx.miterLimit = 2;
      ctx.strokeText(text, x, y);
      ctx.fillStyle = 'white';
      ctx.fillText(text, x, y);
      texture = new THREE.CanvasTexture(canvas);
    }

    return texture;
  };

  ModelNavComponent.getNavMode = function getNavMode(item, view) {
    var mode = NavModeType.None;

    if (item.viewId !== view.id) {
      mode = NavModeType.Move;

      if (this.isValidText(item.title)) {
        mode = NavModeType.Title;
      }

      if (this.isValidText(item.abstract) || item.asset && item.asset.id || item.link && item.link.href) {
        mode = NavModeType.Point;
      }
    } else if (this.isValidText(item.title) || this.isValidText(item.abstract) || item.asset && item.asset.id || item.link && item.link.href) {
      mode = NavModeType.Info;
    }

    return mode;
  };

  ModelNavComponent.isValidText = function isValidText(text) {
    return text && text.length > 0;
  };

  var _proto = ModelNavComponent.prototype;

  _proto.onInit = function onInit() {
    _ModelEditableCompone.prototype.onInit.call(this);
    /*
    this.debouncedOver$ = new ReplaySubject(1).pipe(
    	auditTime(250),
    	tap(event => this.over.next(event)),
    	takeUntil(this.unsubscribe$),
    );
    this.debouncedOver$.subscribe();
    */
    // console.log('ModelNavComponent.onInit');

  };

  _proto.onChanges = function onChanges() {
    this.editing = this.item.selected;
  };

  _proto.onCreate = function onCreate(mount, dismount) {
    var _THREE$Vector,
        _this = this;

    // this.renderOrder = environment.renderOrder.nav;
    var mode = this.mode = ModelNavComponent.getNavMode(this.item, this.view);

    if (mode === NavModeType.None) {
      return;
    }

    var nav = new THREE.Group();

    var position = (_THREE$Vector = new THREE.Vector3()).set.apply(_THREE$Vector, this.item.position).normalize().multiplyScalar(ModelNavComponent.RADIUS);

    nav.position.set(position.x, position.y, position.z);
    this.onCreateSprites(nav);
    var geometry = ModelNavComponent.getNavGeometry();
    var sphere = new InteractiveMesh(geometry, new THREE.MeshBasicMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      opacity: 0.0,
      color: 0x00ffff
    }));
    sphere.name = "[nav] " + this.item.id;
    sphere.lookAt(ModelNavComponent.ORIGIN);
    sphere.depthTest = false;
    sphere.renderOrder = 0;
    nav.add(sphere);
    sphere.on('over', function () {
      // console.log('ModelNavComponent.over');

      /*
      if ((mode !== NavModeType.Move && mode !== NavModeType.Title) && !this.editing) {
      	this.over.next(this);
      }
      */
      _this.over.next(_this);

      var icon = _this.icon;
      var from = {
        scale: icon.scale.x
      };
      gsap.to(from, {
        duration: 0.35,
        scale: 0.04,
        delay: 0,
        ease: Power2.easeOut,
        overwrite: true,
        onUpdate: function onUpdate() {
          icon.scale.set(from.scale, from.scale, from.scale);
        },
        onComplete: function onComplete() {
          /*
          if (!this.editing) {
          	this.over.next(this);
          }
          */
        }
      });
    });
    sphere.on('out', function () {
      _this.out.next(_this);

      var icon = _this.icon;
      var from = {
        scale: icon.scale.x
      };
      gsap.to(from, {
        duration: 0.35,
        scale: 0.03,
        delay: 0,
        ease: Power2.easeOut,
        overwrite: true,
        onUpdate: function onUpdate() {
          icon.scale.set(from.scale, from.scale, from.scale);
        },
        onComplete: function onComplete() {
          /*
          this.out.next(this);
          */
        }
      });
    });
    sphere.on('down', function () {
      _this.down.next(_this);
    });
    var from = {
      opacity: 0
    };
    gsap.to(from, {
      duration: 0.7,
      opacity: 1,
      delay: 0.5 + 0.1 * this.item.index,
      ease: Power2.easeInOut,
      overwrite: true,
      onUpdate: function onUpdate() {
        _this.materials.forEach(function (material) {
          material.opacity = from.opacity;
          material.needsUpdate = true;
        });
      }
    });

    if (typeof mount === 'function') {
      mount(nav, this.item);
    }
  };

  _proto.onCreateSprites = function onCreateSprites(mesh, opacity) {
    if (opacity === void 0) {
      opacity = 0;
    }

    this.onRemoveSprite(this.icon);
    this.onRemoveSprite(this.title);
    var mode = this.mode = ModelNavComponent.getNavMode(this.item, this.view);

    if (mode === NavModeType.None) {
      return;
    }

    var map = ModelNavComponent.getTexture(mode);
    map.disposable = false;
    map.encoding = THREE.sRGBEncoding;
    var material = new THREE.SpriteMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      map: map,
      sizeAttenuation: false,
      opacity: opacity // color: 0xff0000,

    });
    var materials = [material];
    var icon = this.icon = new THREE.Sprite(material);
    icon.scale.set(0.03, 0.03, 0.03);
    mesh.add(icon);
    var titleMaterial;
    var titleTexture = ModelNavComponent.getTitleTexture(this.item, mode);

    if (titleTexture) {
      titleMaterial = new THREE.SpriteMaterial({
        depthTest: false,
        depthWrite: false,
        transparent: true,
        map: titleTexture,
        sizeAttenuation: false,
        opacity: opacity // color: 0xff0000,

      }); // console.log(titleTexture);

      var image = titleTexture.image;
      var title = this.title = new THREE.Sprite(titleMaterial);
      title.scale.set(0.03 * image.width / image.height, 0.03, 0.03);
      title.position.set(0, -3.5, 0);
      mesh.add(title);
      materials.push(titleMaterial);
    }

    this.materials = materials;
  };

  _proto.onRemoveSprite = function onRemoveSprite(sprite) {
    if (sprite) {
      if (sprite.parent) {
        sprite.parent.remove(sprite);
      }

      if (sprite.material.map && sprite.material.map.disposable !== false) {
        sprite.material.map.dispose();
      }

      sprite.material.dispose();
    }
  };

  _proto.onDestroy = function onDestroy() {
    Interactive.dispose(this.sphere);

    _ModelEditableCompone.prototype.onDestroy.call(this);
  };

  _proto.shouldShowPanel = function shouldShowPanel() {
    return !this.editing && this.mode !== NavModeType.Move && this.mode !== NavModeType.Title;
  } // called by UpdateViewItemComponent
  ;

  _proto.onUpdate = function onUpdate(item, mesh) {
    var _THREE$Vector2;

    this.item = item;
    this.onCreateSprites(this.mesh, 1);

    var position = (_THREE$Vector2 = new THREE.Vector3()).set.apply(_THREE$Vector2, item.position).normalize().multiplyScalar(ModelNavComponent.RADIUS);

    mesh.position.set(position.x, position.y, position.z); // console.log('onUpdate', item, mesh.position);

    this.updateHelper();
    /*
    this.onCreate(
    	(mesh, item) => this.onMount(mesh, item),
    	(mesh, item) => this.onDismount(mesh, item)
    );
    */
  } // called by WorldComponent
  ;

  _proto.onDragMove = function onDragMove(position) {
    this.editing = true;
    this.item.showPanel = false;
    this.mesh.position.set(position.x, position.y, position.z).multiplyScalar(ModelNavComponent.RADIUS);
    this.updateHelper();
  } // called by WorldComponent
  ;

  _proto.onDragEnd = function onDragEnd() {
    this.item.position = new THREE.Vector3().copy(this.mesh.position).normalize().toArray();
    this.editing = false;
  };

  return ModelNavComponent;
}(ModelEditableComponent);
ModelNavComponent.ORIGIN = new THREE.Vector3();
ModelNavComponent.RADIUS = 100;
ModelNavComponent.meta = {
  selector: '[model-nav]',
  hosts: {
    host: WorldComponent
  },
  outputs: ['over', 'out', 'down'],
  inputs: ['item', 'view']
};var ModelPanelComponent = /*#__PURE__*/function (_ModelComponent) {
  _inheritsLoose(ModelPanelComponent, _ModelComponent);

  function ModelPanelComponent() {
    return _ModelComponent.apply(this, arguments) || this;
  }

  var _proto = ModelPanelComponent.prototype;

  _proto.onInit = function onInit() {
    _ModelComponent.prototype.onInit.call(this); // console.log('ModelPanelComponent.onInit', this.item);

  };

  _proto.onView = function onView() {
    var _this = this;

    if (this.viewed) {
      return;
    }

    this.viewed = true;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    this.getCanvasTexture(node).then(function (texture) {
      if (_this.mesh) {
        var scale = 0.2 * (_this.item.asset ? 1.5 : 1.0);
        var aspect = texture.width / texture.height;
        var width = ModelPanelComponent.PANEL_RADIUS * scale;
        var height = ModelPanelComponent.PANEL_RADIUS * scale / aspect;
        var dy = width * 0.25;

        var position = _this.item.mesh.position.normalize().multiplyScalar(ModelPanelComponent.PANEL_RADIUS);

        var material = new THREE.SpriteMaterial({
          depthTest: false,
          transparent: true,
          opacity: 0,
          map: texture.map,
          sizeAttenuation: false
        });
        var panel = _this.panel = new InteractiveSprite(material);
        panel.renderOrder = environment.renderOrder.panel;
        panel.scale.set(0.02 * width, 0.02 * height, 1);
        panel.position.set(position.x, position.y + (height + dy * 2), position.z);
        panel.on('down', function (event) {
          var xy = {
            x: parseInt(event.intersection.uv.x * node.offsetWidth),
            y: parseInt((1 - event.intersection.uv.y) * node.offsetHeight)
          }; // console.log('ModelPanelComponent.down.xy', xy);

          var link = Array.prototype.slice.call(node.querySelectorAll('.panel__link')).find(function (link) {
            return xy.x >= link.offsetLeft && xy.y >= link.offsetTop && xy.x <= link.offsetLeft + link.offsetWidth && xy.y <= link.offsetTop + link.offsetHeight;
          }); // console.log('ModelPanelComponent.down.link', link);

          if (link) {
            _this.down.next(link);

            var rect = node.getBoundingClientRect();

            var _event = new MouseEvent('mouseup', {
              button: 0,
              buttons: 0,
              clientX: xy.x + rect.left,
              clientY: xy.y + rect.top,
              movementX: 0,
              movementY: 0,
              relatedTarget: link,
              screenX: xy.x,
              screenY: xy.y
            }); // console.log('ModelPanelComponent.dispatchEvent', event);


            link.dispatchEvent(_event);
            setTimeout(function () {
              DragService.dismissEvent(_event, DragService.events$, DragService.dismiss$, DragService.downEvent);
            }, 1);
          }
        });

        _this.mesh.add(panel);

        var from = {
          value: 0
        };
        gsap.to(from, {
          duration: 0.5,
          value: 1,
          delay: 0.0,
          ease: Power2.easeInOut,
          onUpdate: function onUpdate() {
            panel.position.set(position.x, position.y + (height + dy * 2) - dy * from.value, position.z);
            panel.lookAt(ModelPanelComponent.ORIGIN);
            panel.material.opacity = from.value;
            panel.material.needsUpdate = true;
          }
        });
      }
    }, function (error) {
      console.log('ModelPanelComponent.getCanvasTexture.error', error);
    });
  };

  _proto.onCreate = function onCreate(mount, dismount) {
    var mesh = new THREE.Group();

    if (typeof mount === 'function') {
      mount(mesh);
    }
  };

  _proto.onDestroy = function onDestroy() {
    // console.log('ModelPanelComponent.onDestroy');
    _ModelComponent.prototype.onDestroy.call(this);
  };

  _proto.imagesLoaded = function imagesLoaded() {
    var _getContext2 = rxcomp.getContext(this),
        node = _getContext2.node;

    if (node) {
      var images = Array.prototype.slice.call(node.querySelectorAll('img'));
      var promises = images.map(function (x) {
        return new Promise(function (resolve, reject) {
          var cors = x.src && x.src.indexOf(location.origin) === -1;

          if (x.complete) {
            return setTimeout(function () {
              resolve(cors);
            }, 10);
          }

          var removeListeners = function removeListeners() {
            x.removeEventListener('load', onLoad);
            x.removeEventListener('error', onError);
          };

          var onLoad = function onLoad() {
            // console.log('loaded!');
            removeListeners();
            setTimeout(function () {
              resolve(cors);
            }, 10);
          };

          var onError = function onError() {
            // console.log('error!');
            removeListeners();
            resolve(false);
          };

          var addListeners = function addListeners() {
            x.addEventListener('load', onLoad);
            x.addEventListener('error', onError);
          };

          addListeners();
        });
      });

      if (promises.length) {
        return Promise.all(promises);
      } else {
        return Promise.resolve();
      }
    }
  };

  _proto.getCanvasTexture = function getCanvasTexture(node) {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (_this2.item.panelTexture) {
          resolve(_this2.item.panelTexture);
        } else {
          _this2.imagesLoaded().then(function (results) {
            var context = rxcomp.getContext(_this2);

            if (context && context.node) {
              node = context.node;
              var useCORS = results && results.find(function (x) {
                return x === true;
              }) != null; // !!! keep loose equality
              // console.log('ModelPanelComponent.getCanvasTexture.useCORS', useCORS);

              html2canvas(node, {
                backgroundColor: '#ffffff00',
                scale: 2,
                useCORS: useCORS // logging: true,

              }).then(function (canvas) {
                // !!!
                // document.body.appendChild(canvas);
                // const alpha = this.getAlphaFromCanvas(canvas);
                // document.body.appendChild(alpha);
                var map = new THREE.CanvasTexture(canvas); // const alphaMap = new THREE.CanvasTexture(alpha);
                // console.log(canvas.width, canvas.height);

                _this2.item.panelTexture = {
                  map: map,
                  width: canvas.width,
                  height: canvas.height
                };
                resolve(_this2.item.panelTexture);
              }, function (error) {
                reject(error);
              });
            }
          });
        }
      }, 1); // keep it for childnode images to be compiled
    });
  };

  return ModelPanelComponent;
}(ModelComponent);
ModelPanelComponent.ORIGIN = new THREE.Vector3();
ModelPanelComponent.PANEL_RADIUS = 99;
ModelPanelComponent.meta = {
  selector: '[model-panel]',
  hosts: {
    host: WorldComponent
  },
  outputs: ['over', 'out', 'down'],
  inputs: ['item']
};var ModelPictureComponent = /*#__PURE__*/function (_ModelComponent) {
  _inheritsLoose(ModelPictureComponent, _ModelComponent);

  function ModelPictureComponent() {
    return _ModelComponent.apply(this, arguments) || this;
  }

  var _proto = ModelPictureComponent.prototype;

  _proto.onInit = function onInit() {
    _ModelComponent.prototype.onInit.call(this); // console.log('ModelPictureComponent.onInit');

  };

  _proto.onCreate = function onCreate(mount, dismount) {
    var mesh = new THREE.Group();

    if (typeof mount === 'function') {
      mount(mesh);
    }
  } // onView() { const context = getContext(this); }
  // onChanges() {}
  ;

  return ModelPictureComponent;
}(ModelComponent);
ModelPictureComponent.meta = {
  selector: '[model-picture]',
  hosts: {
    host: WorldComponent
  },
  inputs: ['item']
};var ModelPlaneComponent = /*#__PURE__*/function (_ModelEditableCompone) {
  _inheritsLoose(ModelPlaneComponent, _ModelEditableCompone);

  function ModelPlaneComponent() {
    return _ModelEditableCompone.apply(this, arguments) || this;
  }

  var _proto = ModelPlaneComponent.prototype;

  _proto.onInit = function onInit() {
    _ModelEditableCompone.prototype.onInit.call(this); // console.log('ModelPlaneComponent.onInit');

  };

  _proto.onChanges = function onChanges() {
    this.editing = this.item.selected;
  };

  _proto.onCreate = function onCreate(mount, dismount) {
    var _this = this;

    var item = this.item;
    var items = this.items;
    var geometry = new THREE.PlaneBufferGeometry(1, 1, 2, 2);
    var mesh;
    var subscription;
    MediaMesh.getStreamId$(item).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (streamId) {
      if (_this.streamId !== streamId) {
        _this.streamId = streamId; // !!! called by ModelComponent

        /*
        if (mesh) {
        	dismount(mesh, item);
        }
        */

        if (subscription) {
          subscription.unsubscribe();
          subscription = null;
        }

        if (streamId || !item.asset) {
          item.streamId = streamId;
          mesh = new MediaMesh(item, items, geometry);

          if (item.position) {
            mesh.position.fromArray(item.position);
          }

          if (item.rotation) {
            mesh.rotation.fromArray(item.rotation);
          }

          if (item.scale) {
            mesh.scale.fromArray(item.scale);
          }

          mesh.load(function () {
            if (typeof mount === 'function') {
              mount(mesh, item);
            }

            subscription = mesh.events$().pipe(operators.takeUntil(_this.unsubscribe$)).subscribe(function () {});
          });
          mesh.on('down', function () {
            // console.log('ModelPanelComponent.down');
            _this.down.next(_this);
          });
          mesh.on('playing', function (playing) {
            // console.log('ModelPanelComponent.playing', playing);
            _this.play.next({
              itemId: _this.item.id,
              playing: playing
            });
          });
        } // console.log('streamId', streamId, mesh);

      }
    });
  };

  _proto.onDestroy = function onDestroy() {
    _ModelEditableCompone.prototype.onDestroy.call(this);

    if (this.mesh) {
      this.mesh.dispose();
    }
  } // called by UpdateViewItemComponent
  ;

  _proto.onUpdate = function onUpdate(item, mesh) {
    // console.log('ModelPlaneComponent.onUpdate', item);
    if (item.position) {
      mesh.position.fromArray(item.position);
    }

    if (item.rotation) {
      mesh.rotation.fromArray(item.rotation);
    }

    if (item.scale) {
      mesh.scale.fromArray(item.scale);
    }

    this.updateHelper();
  } // called by UpdateViewItemComponent
  ;

  _proto.onUpdateAsset = function onUpdateAsset(item, mesh) {
    var _this2 = this;

    // console.log('ModelPlaneComponent.onUpdateAsset', item);
    this.mesh.updateByItem(item);
    MediaMesh.getStreamId$(item).pipe(operators.filter(function (streamId) {
      return streamId !== null;
    }), operators.take(1)).subscribe(function (streamId) {
      item.streamId = streamId;

      _this2.mesh.load(function () {// console.log('ModelPlaneComponent.mesh.load.complete');
      });
    });
  } // called by WorldComponent
  ;

  _proto.onDragMove = function onDragMove(position) {
    // console.log('ModelPlaneComponent.onDragMove', position);
    this.item.showPanel = false;
    this.editing = true;
    this.mesh.position.set(position.x, position.y, position.z).multiplyScalar(20);
    this.mesh.lookAt(ModelPlaneComponent.ORIGIN);
    this.updateHelper();
  } // called by WorldComponent
  ;

  _proto.onDragEnd = function onDragEnd() {
    // console.log('ModelPlaneComponent.onDragEnd');
    this.item.position = this.mesh.position.toArray();
    this.item.rotation = this.mesh.rotation.toArray();
    this.item.scale = this.mesh.scale.toArray();
    this.editing = false;
  };

  return ModelPlaneComponent;
}(ModelEditableComponent);
ModelPlaneComponent.ORIGIN = new THREE.Vector3();
ModelPlaneComponent.textures = {};
ModelPlaneComponent.meta = {
  selector: '[model-plane]',
  hosts: {
    host: WorldComponent
  },
  outputs: ['down', 'play'],
  inputs: ['item', 'items']
};var PANEL_RADIUS$1 = PANORAMA_RADIUS - 0.01;

var ModelProgressComponent = /*#__PURE__*/function (_ModelComponent) {
  _inheritsLoose(ModelProgressComponent, _ModelComponent);

  function ModelProgressComponent() {
    return _ModelComponent.apply(this, arguments) || this;
  }

  var _proto = ModelProgressComponent.prototype;

  _proto.onInit = function onInit() {
    this.title_ = '';

    _ModelComponent.prototype.onInit.call(this);

    this.progress = LoaderService.progress;
  };

  _proto.onCreate = function onCreate(mount, dismount) {
    var _this = this;

    // console.log('ModelProgressComponent.onCreate');
    this.getCanvasTexture().then(function (result) {
      var mesh = _this.createMesh(result);

      if (typeof mount === 'function') {
        mount(mesh);
      }

      LoaderService.progress$.pipe(operators.takeUntil(_this.unsubscribe$)).subscribe(function (progress) {
        if (progress.count) {
          _this.title = progress.value === 0 ? LabelPipe.transform('loading') : progress.title;
        } else {
          _this.title = _this.getTitle();
        }
      });
    });
  };

  _proto.getTitle = function getTitle() {
    if (this.view && this.view.type.name === ViewType.WaitingRoom.name) {
      return LabelPipe.transform('waiting_host');
    } else {
      return '';
    }
  };

  _proto.show = function show() {
    this.mesh.add(this.banner);
    this.material.opacity = 1;
    this.material.needsUpdate = true;
    /*
    const material = this.material;
    const from = { value: material.opacity };
    gsap.to(from, {
    	duration: 0.5,
    	value: 1,
    	delay: 0.0,
    	ease: Power2.easeInOut,
    	overwrite: 'all',
    	onUpdate: () => {
    		material.opacity = from.value;
    		material.needsUpdate = true;
    	}
    });
    */
  };

  _proto.hide = function hide() {
    var material = this.material;
    this.material.opacity = 0;
    this.material.needsUpdate = true;
    /*
    const from = { value: material.opacity };
    gsap.to(from, {
    	duration: 0.5,
    	value: 0,
    	delay: 0.0,
    	ease: Power2.easeInOut,
    	overwrite: 'all',
    	onUpdate: () => {
    		material.opacity = from.value;
    		material.needsUpdate = true;
    	},
    	onComplete: () => {
    		this.mesh.remove(this.banner);
    	}
    });
    */
  };

  _proto.createMesh = function createMesh(result) {
    var mesh = new THREE.Group(); // const repeat = 24;
    // const aspect = (result.width * repeat) / result.height;

    var arc = Math.PI / 180 * 360;
    var width = PANEL_RADIUS$1 * arc;
    var height = width / 360 * 2.4;
    var w = result.width * height / result.height;
    var repeat = width / w;
    var geometry = new THREE.CylinderBufferGeometry(PANEL_RADIUS$1, PANEL_RADIUS$1, height, 80, 2, true, 0, arc);
    geometry.scale(-1, 1, 1);
    var texture = result.texture;
    texture.wrapS = texture.wrapY = THREE.RepeatWrapping;
    texture.repeat.x = repeat;
    texture.encoding = THREE.sRGBEncoding;
    var material = this.material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0 // side: THREE.DoubleSide,

    });
    var banner = this.banner = new THREE.Mesh(geometry, material);
    mesh.userData = {
      render: function render() {
        mesh.rotation.y += Math.PI / 180 * 0.02; // texture.offset.x = (texture.offset.x - 0.01) % 1;
        // material.needsUpdate = true;
      }
    };
    return mesh;
  };

  _proto.updateProgress = function updateProgress() {
    var _this2 = this;

    this.getCanvasTexture().then(function (result) {
      // console.log('ModelProgressComponent.updateProgress', result);
      var arc = Math.PI / 180 * 360;
      var width = PANEL_RADIUS$1 * arc;
      var height = width / 360 * 2.4;
      var w = result.width * height / result.height;
      var repeat = width / w;
      _this2.texture.repeat.x = repeat;
    });
  };

  _proto.getCanvasTexture = function getCanvasTexture() {
    var _this3 = this;

    return new Promise(function (resolve, reject) {
      var MIN_W = 512;
      var W = MIN_W;
      var H = 64;
      var F = Math.floor(H * 0.75);
      var L = Math.floor(H * 0.05);
      var canvas;

      if (_this3.canvas) {
        canvas = _this3.canvas;
      } else {
        canvas = _this3.canvas = document.createElement('canvas'); // canvas.classList.add('canvas--debug');
        // document.querySelector('body').appendChild(canvas);
      }

      canvas.width = W;
      canvas.height = H;
      var text = _this3.title_; // console.log('ModelProgressComponent.getCanvasTexture', text);

      var ctx = canvas.getContext('2d'); // const ctx = text.material.map.image.getContext('2d');

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.font = "300 " + F + "px " + environment.fontFamily;
      var metrics = ctx.measureText(text);
      W = metrics.width + 8;
      W = Math.max(MIN_W, Math.pow(2, Math.ceil(Math.log(W) / Math.log(2)))); // const x = W / 2;
      // const y = 16;

      canvas.width = W;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0000005A'; // 35% // '#000000C0'; // 75%

      ctx.fillRect(0, 0, W, H);
      ctx.font = "300 " + F + "px " + environment.fontFamily;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.lineWidth = L;
      ctx.lineJoin = 'round'; // Experiment with "bevel" & "round" for the effect you want!

      ctx.miterLimit = 2;
      ctx.strokeText(text, W / 2, H / 2);
      ctx.fillStyle = 'white';
      ctx.fillText(text, W / 2, H / 2, W); // text.material.map.needsUpdate = true;

      var texture;

      if (_this3.texture) {
        texture = _this3.texture;
        texture.needsUpdate = true;
      } else {
        texture = _this3.texture = new THREE.CanvasTexture(canvas);
      } // console.log(F, L, W, H);


      resolve({
        texture: texture,
        width: W,
        height: H
      });
    });
  };

  _createClass(ModelProgressComponent, [{
    key: "title",
    get: function get() {
      return this.title_;
    },
    set: function set(title) {
      if (this.title_ !== title) {
        this.title_ = title;

        if (title !== '') {
          this.updateProgress();
          this.show();
        } else {
          this.hide();
        }
      }
    }
  }]);

  return ModelProgressComponent;
}(ModelComponent);
ModelProgressComponent.meta = {
  selector: '[model-progress]',
  hosts: {
    host: WorldComponent
  },
  inputs: ['view']
};var ModelRoomComponent = /*#__PURE__*/function (_ModelComponent) {
  _inheritsLoose(ModelRoomComponent, _ModelComponent);

  function ModelRoomComponent() {
    return _ModelComponent.apply(this, arguments) || this;
  }

  var _proto = ModelRoomComponent.prototype;

  _proto.onInit = function onInit() {
    _ModelComponent.prototype.onInit.call(this);

    this.progress = 0; // console.log('ModelRoomComponent.onInit');
  };

  _proto.onCreate = function onCreate(mount, dismount) {
    var _this = this;

    this.loadModel(environment.getPath(this.item.modelFolder), this.item.modelFile, function (mesh) {
      if (typeof mount === 'function') {
        mount(mesh);
      }

      _this.progress = 0;

      _this.pushChanges();
    });
  } // onView() { const context = getContext(this); }
  // onChanges() {}
  ;

  _proto.getLoader = function getLoader(path, file) {
    var loader;

    if (file.indexOf('.fbx') !== -1) {
      loader = new THREE.FBXLoader();
    } else {
      loader = new THREE.GLTFLoader();
    }

    loader.setPath(path);
    return loader;
  };

  _proto.loadModel = function loadModel(path, file, callback) {
    var _this2 = this;

    // const renderer = this.host.renderer;
    // const roughnessMipmapper = new RoughnessMipmapper(renderer); // optional
    var loader = this.getLoader(path, file);
    loader.load(file, function (model) {
      var mesh;
      var scene = model.scene;

      if (scene) {
        mesh = scene;
      } else {
        mesh = model;
      }

      var items = _this2.item.items;
      mesh.scale.set(0.05, 0.05, 0.05); // mesh.scale.set(10, 10, 10);

      mesh.traverse(function (child) {
        if (child.isMesh) {
          // roughnessMipmapper.generateMipmaps(child.material);
          var item = items.find(function (x) {
            return x.id === child.name;
          });

          if (item) {
            item.mesh = child;
          } else {
            /*
            if (USE_SHADOW) {
            	child.castShadow = true;
            	child.receiveShadow = true;
            }
            */
            child.material.dispose(); // child.renderOrder = environment.renderOrder.model;

            var material = new THREE.MeshStandardMaterial({
              color: 0x111111,
              roughness: 0.6
            });
            child.material = material;
          }
        }
      });
      mesh.position.y = -1.66 * 3;
      items.forEach(function (item) {
        var previous = item.mesh;

        if (previous) {
          if (previous.material) {
            previous.material.color.setHex(0x000000);
          }

          var parent = previous.parent;

          var _mesh = item.mesh = new MediaMesh(item, items, previous.geometry);

          _mesh.depthTest = false;
          _mesh.renderOrder = 0;
          _mesh.name = previous.name;

          _mesh.position.copy(previous.position);

          _mesh.rotation.copy(previous.rotation);

          _mesh.scale.copy(previous.scale);

          _mesh.load(function () {
            // mesh.material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
            parent.add(_mesh);
            parent.remove(previous);

            if (previous.material) {
              previous.material.dispose();
            }
          });

          _mesh.on('down', function () {
            console.log('ModelRoomComponent.down');

            _this2.down.next(_this2);
          });

          _mesh.on('playing', function (playing) {
            console.log('ModelRoomComponent.playing', playing);

            _this2.play.next({
              itemId: item.id,
              playing: playing
            });
          });
        }
      });
      var lights = new Array(3).fill(0).map(function (x, i) {
        var light = new THREE.PointLight(0xffffff, 0.1, 1000, 2);

        var radians = Math.PI / 180 * 45 + Math.PI / 180 * 120 * i;
        light.position.set(Math.cos(radians) * 5, 1, Math.sin(radians) * 5);
        /*
        const helper = new THREE.PointLightHelper(light, 0.1);
        this.group.add(helper);
        */

        _this2.group.add(light);

        return light;
      });

      if (typeof callback === 'function') {
        callback(mesh);
      }

      _this2.progress = 0;

      _this2.pushChanges(); // roughnessMipmapper.dispose();

    }, function (progressEvent) {
      if (progressEvent.lengthComputable) {
        _this2.progress = Math.round(progressEvent.loaded / progressEvent.total * 100);
      } else {
        _this2.progress = _this2.progress || 0;
        _this2.progress = Math.min(100, _this2.progress + 1);
      } // console.log('progressEvent', progressEvent.loaded, progressEvent.total);


      _this2.pushChanges();
    });
  };

  _proto.onDestroy = function onDestroy() {
    _ModelComponent.prototype.onDestroy.call(this);

    var item = this.item;

    if (item) {
      var items = item.items;

      if (items) {
        items.forEach(function (item) {
          if (item.mesh) {
            item.mesh.dispose();
            delete item.mesh;
          }
        });
      }
    }
  };

  return ModelRoomComponent;
}(ModelComponent);
ModelRoomComponent.textures = {};
ModelRoomComponent.meta = {
  selector: '[model-room]',
  hosts: {
    host: WorldComponent
  },
  outputs: ['down', 'play'],
  inputs: ['item']
};var ModelTextComponent = /*#__PURE__*/function (_ModelComponent) {
  _inheritsLoose(ModelTextComponent, _ModelComponent);

  function ModelTextComponent() {
    return _ModelComponent.apply(this, arguments) || this;
  }

  var _proto = ModelTextComponent.prototype;

  _proto.onInit = function onInit() {
    _ModelComponent.prototype.onInit.call(this); // console.log('ModelTextComponent.onInit');

  };

  _proto.onCreate = function onCreate(mount, dismount) {
    var mesh = new THREE.Group();

    if (typeof mount === 'function') {
      mount(mesh);
    }
  } // onView() { const context = getContext(this); }
  // onChanges() {}
  ;

  return ModelTextComponent;
}(ModelComponent);
ModelTextComponent.meta = {
  selector: '[model-text]',
  hosts: {
    host: WorldComponent
  },
  inputs: ['item']
};var AppModule = /*#__PURE__*/function (_Module) {
  _inheritsLoose(AppModule, _Module);

  function AppModule() {
    return _Module.apply(this, arguments) || this;
  }

  return AppModule;
}(rxcomp.Module);
AppModule.meta = {
  imports: [rxcomp.CoreModule, rxcompForm.FormModule, EditorModule],
  declarations: [AccessComponent, AgoraComponent, AgoraDeviceComponent, AgoraDevicePreviewComponent, AgoraLinkComponent, AgoraNameComponent, AgoraStreamComponent, AssetPipe, ControlAssetComponent, ControlMenuComponent, ControlModelComponent, ControlAssetsComponent, ControlCheckboxComponent, ControlCustomSelectComponent, ControlLinkComponent, ControlNumberComponent, ControlPasswordComponent, ControlRequestModalComponent, ControlSelectComponent, ControlTextComponent, ControlTextareaComponent, ControlVectorComponent, DisabledDirective, DropDirective, DropdownDirective, DropdownItemDirective, ErrorsComponent, HtmlPipe, HlsDirective, IdDirective, InputValueComponent, LabelPipe, LazyDirective, ModalComponent, ModalOutletComponent, ModelBannerComponent, ModelComponent, ModelCurvedPlaneComponent, ModelDebugComponent, ModelModelComponent, ModelGridComponent, ModelMenuComponent, ModelNavComponent, ModelPanelComponent, ModelPictureComponent, ModelPlaneComponent, ModelProgressComponent, ModelRoomComponent, ModelTextComponent, SvgIconStructure, TestComponent, TryInARComponent, TryInARModalComponent, UploadItemComponent, ValueDirective, WorldComponent],
  bootstrap: AppComponent
};rxcomp.Browser.bootstrap(AppModule);})));