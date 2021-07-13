/**
 * @license b-here v1.0.0
 * (c) 2021 Luca Zampetti <lzampetti@gmail.com>
 * License: MIT
 */

(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(require('rxcomp'),require('rxcomp-form'),require('rxjs/operators'),require('rxjs'),require('html2canvas')):typeof define==='function'&&define.amd?define(['rxcomp','rxcomp-form','rxjs/operators','rxjs','html2canvas'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f(g.rxcomp,g.rxcomp.form,g.rxjs.operators,g.rxjs,g.html2canvas));}(this,(function(rxcomp, rxcompForm, operators, rxjs, html2canvas){'use strict';html2canvas=html2canvas&&Object.prototype.hasOwnProperty.call(html2canvas,'default')?html2canvas['default']:html2canvas;function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
    editorAssetScreen: false,
    menu: true,
    chat: false,
    ar: true,
    like: true,
    hideNavInfo: true,
    attendee: true,
    streamer: true,
    viewer: true,
    smartDevice: true,
    maxQuality: false
  },
  logo: null,
  background: {
    // image: '/Modules/B-Here/Client/docs/img/background.jpg',
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
    disabledViewTypes: ['waiting-room', 'room-3d', 'media'],
    disabledViewItemTypes: ['texture']
  },
  assets: '/Modules/B-Here/Client/docs/',
  workers: {
    image: '/Modules/B-Here/Client/docs/js/workers/image.service.worker.js',
    prefetch: '/Modules/B-Here/Client/docs/js/workers/prefetch.service.worker.js'
  },
  textures: {
    envMap: 'textures/envMap/flower_road_1k.hdr',
    grid: 'textures/grid/grid.jpg'
  },
  githubDocs: 'https://raw.githubusercontent.com/actarian/b-here/b-here-demo/docs/',
  template: {
    tryInAr: '/template/modules/b-here/try-in-ar.cshtml?viewId=$viewId',
    modal: {
      configureFirewall: '/template/modules/b-here/configure-firewall-modal.cshtml',
      controlRequest: '/template/modules/b-here/control-request-modal.cshtml',
      tryInAr: '/template/modules/b-here/try-in-ar-modal.cshtml',
      view: {
        'panorama': '/template/modules/b-here/panorama-modal.cshtml',
        'panorama-grid': '/template/modules/b-here/panorama-grid-modal.cshtml',
        'room-3d': '/template/modules/b-here/room-3d-modal.cshtml',
        'model': '/template/modules/b-here/model-modal.cshtml',
        'media': '/template/modules/b-here/media-modal.cshtml'
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
    useProxy: true,
    useToken: false,
    selfService: true,
    guidedTourRequest: true,
    editor: true,
    editorAssetScreen: true,
    menu: true,
    chat: true,
    ar: true,
    like: true,
    hideNavInfo: true,
    attendee: true,
    streamer: true,
    viewer: true,
    smartDevice: true,
    maxQuality: false
  },
  logo: null,
  background: {
    // image: '/b-here/img/background.jpg',
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
    disabledViewTypes: ['waiting-room'],
    disabledViewItemTypes: ['texture']
  },
  assets: '/b-here/',
  workers: {
    image: './js/workers/image.service.worker.js',
    prefetch: './js/workers/prefetch.service.worker.js'
  },
  textures: {
    envMap: 'textures/envMap/flower_road_1k.hdr',
    grid: 'textures/grid/grid.jpg'
  },
  githubDocs: 'https://raw.githubusercontent.com/actarian/b-here/b-here-demo/docs/',
  template: {
    tryInAr: '/try-in-ar.html?viewId=$viewId',
    modal: {
      configureFirewall: '/configure-firewall-modal.html',
      controlRequest: '/control-request-modal.html',
      tryInAr: '/try-in-ar-modal.html',
      view: {
        'panorama': '/panorama-modal.html',
        'panorama-grid': '/panorama-grid-modal.html',
        'room-3d': '/room-3d-modal.html',
        'model': '/model-modal.html',
        'media': '/media-modal.html'
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
      Object.assign(this, options);
    }
  }

  return Environment;
}();
var defaultOptions = {
  port: 5000,
  // fontFamily: 'GT Walsheim, sans-serif',
  fontFamily: 'Work Sans, sans-serif',
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
    disabledViewTypes: ['waiting-room', 'room-3d', 'media'],
    disabledViewItemTypes: ['texture']
  },
  renderOrder: {
    panorama: 0,
    room: 10,
    plane: 20,
    tile: 30,
    model: 40,
    banner: 50,
    nav: 60,
    panel: 70,
    menu: 80,
    debug: 90,
    pointer: 100
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
    menu: true,
    chat: true,
    ar: true,
    like: true,
    hideNavInfo: true,
    attendee: true,
    streamer: true,
    viewer: true,
    smartDevice: true,
    maxQuality: false,
    heroku: HEROKU
  },
  url: {},
  languages: ['it', 'en'],
  defaultLanguage: 'it'
};
var environmentOptions = window.STATIC ? environmentStatic : environmentServed;
var options = Object.assign(defaultOptions, defaultAppOptions, environmentOptions);
options = Utils.merge(options, window.bhere);
var environment = new Environment(options);
console.log('environment', environment);var LocationService = /*#__PURE__*/function () {
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

    this.pushParams(params); // console.log('LocationService.set', params, keyOrValue, value);
  };

  LocationService.pushParams = function pushParams(params) {
    if (window.history && window.history.pushState) {
      var title = document.title;
      var url = window.location.href.split('?')[0] + "?" + params.toString();
      window.history.pushState(params.toString(), title, url);
    }
  };

  LocationService.replace = function replace(from, to) {
    var history = window.history;

    if (history && history.replaceState) {
      var location = window.location;
      var title = document.title;

      if (location.pathname === '/') {
        var url = location.origin + to + location.search;
        history.replaceState(history.state, title, url);
      } else if (location.href.indexOf(from) !== -1) {
        var _url = location.href.replace(from, to);

        history.replaceState(history.state, title, _url);
      }
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
}();var AccessCodeComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AccessCodeComponent, _Component);

  function AccessCodeComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AccessCodeComponent.prototype;

  _proto.onInit = function onInit() {
    this.state = {};
    var link = LocationService.get('link');

    if (!link) {
      window.location.href = "" + window.location.origin + environment.url.guidedTour;
    }

    var url = "" + window.location.origin + environment.url.guidedTour + "?link=" + link;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var qrcode = new QRious({
      element: node.querySelector('.qrcode'),
      value: url,
      size: 256
    });
  };

  return AccessCodeComponent;
}(rxcomp.Component);
AccessCodeComponent.meta = {
  selector: '[access-code-component]'
};var ControlsComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ControlsComponent, _Component);

  function ControlsComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ControlsComponent.prototype;

  _proto.getControl = function getControl(name) {
    return this.group.get(name);
  };

  _createClass(ControlsComponent, [{
    key: "group",
    get: function get() {
      if (this.formGroup) {
        return this.formGroup;
      } else {
        if (!this.host) {
          throw 'missing form collection';
        }

        return this.host.control;
      }
    }
  }]);

  return ControlsComponent;
}(rxcomp.Component);
ControlsComponent.meta = {
  selector: '[controls]',
  inputs: ['formGroup', 'fields'],
  hosts: {
    host: rxcompForm.FormAbstractCollectionDirective
  },
  template:
  /* html */
  "\n\t\t<div *for=\"let field of fields\">\n\t\t\t<div *if=\"['text', 'email', 'url'].indexOf(field.type) !== -1\" control-text [control]=\"getControl(field.name)\" [label]=\"field.label | label\"></div>\n\t\t\t<div *if=\"field.type == 'select'\" control-select [control]=\"getControl(field.name)\" [label]=\"field.label | label\"></div>\n\t\t\t<div *if=\"field.type == 'custom-select'\" control-custom-select [control]=\"getControl(field.name)\" [label]=\"field.label | label\"></div>\n\t\t\t<div *if=\"field.type == 'textarea'\" control-textarea [control]=\"getControl(field.name)\" [label]=\"field.label | label\"></div>\n\t\t\t<div *if=\"field.type == 'checkbox'\" control-checkbox [control]=\"getControl(field.name)\" [label]=\"field.label | label\"></div>\n\t\t\t<input *if=\"field.type == 'hidden'\" [name]=\"field.name\" [formControl]=\"getControl(field.name)\" value=\"\" type=\"text\" style=\"display:none !important;\" />\n\t\t</div>\n\t"
};
function fieldsToFormControls(fields) {
  var controls = fields.reduce(function (p, c, i) {
    var validators = [];

    if (c.required) {
      validators.push(c.type === 'checkbox' ? rxcompForm.Validators.RequiredTrueValidator() : rxcompForm.Validators.RequiredValidator());
    }

    if (c.type === 'email') {
      validators.push(rxcompForm.Validators.EmailValidator());
    }

    if (c.type === 'url') {
      validators.push(rxcompForm.Validators.PatternValidator('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})'));
    }

    if (c.pattern != null) {
      validators.push(rxcompForm.Validators.PatternValidator(c.pattern));
    }

    p[c.name] = new rxcompForm.FormControl(c.value != null ? c.value : null, validators);

    if (c.type === 'select' || c.type === 'custom-select') {
      var options = (c.options || []).slice();
      options.unshift({
        id: null,
        name: 'select'
      }); // LabelPipe.transform('select')

      p[c.name].options = options;
    }

    return p;
  }, {});
  return controls;
}
function fieldsToFormGroup(fields) {
  return new rxcompForm.FormGroup(fieldsToFormControls(fields));
}
function patchFields(fields, form) {
  var testValues = fields.reduce(function (p, c, i) {
    if (c.test) {
      p[c.name] = c.test;
    }

    return p;
  }, {});
  form.patch(testValues);
}var RoleType = {
  Publisher: 'publisher',
  Attendee: 'attendee',
  Streamer: 'streamer',
  Viewer: 'viewer',
  SmartDevice: 'smart-device',
  SelfService: 'self-service',
  Embed: 'embed'
};
var User = function User(options) {
  if (options) {
    Object.assign(this, options);
  }
};var USE_AUTODETECT = false;
var StreamQualities = [{
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
  return state.role === RoleType.Publisher || state.role === RoleType.SmartDevice ? highestQuality : lowestQuality;
}
var AgoraStatus = {
  Idle: 'idle',
  Checklist: 'checklist',
  Link: 'link',
  Login: 'login',
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
  RemoteSilencing: 'remoteSilencing',
  SlideChange: 'slideChange',
  ControlInfo: 'controlInfo',
  AddLike: 'addLike',
  ShowPanel: 'showPanel',
  PlayMedia: 'playMedia',
  ZoomMedia: 'zoomMedia',
  CurrentTimeMedia: 'currentTimeMedia',
  PlayModel: 'playModel',
  NavInfo: 'navInfo',
  NavToView: 'navToView',
  NavToGrid: 'navToGrid',
  VRStarted: 'vrStarted',
  VREnded: 'vrEnded',
  VRState: 'vrState',
  MenuToggle: 'menuToggle',
  ChatMessage: 'chatMessage',
  ChatTypingBegin: 'chatTypingBegin',
  ChatTypingEnd: 'chatTypingEnd',
  SelectItem: 'selectItem'
};
var UIMode = {
  VirtualTour: 'virtual-tour',
  LiveMeeting: 'live-meeting',
  SelfServiceTour: 'self-service-tour',
  Embed: 'embed',
  None: 'none'
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
}(AgoraEvent);var HttpService = /*#__PURE__*/function () {
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
}();var UserService = /*#__PURE__*/function () {
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
  };

  UserService.temporaryUser$ = function temporaryUser$(roleType) {
    var _this6 = this;

    if (roleType === void 0) {
      roleType = RoleType.Embed;
    }

    return rxjs.of({
      id: this.uuid(),
      type: roleType,
      username: roleType,
      firstName: 'Jhon',
      lastName: 'Appleseed'
    }).pipe(operators.map(function (user) {
      return _this6.mapUser(user);
    }), operators.switchMap(function (user) {
      // console.log('UserService.temporaryUser$', user);
      _this6.setUser(user);

      return _this6.user$;
    }));
  };

  UserService.uuid = function uuid() {
    return new Date().getTime(); // return parseInt(process.hrtime.bigint().toString());
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

  UserService.getMode = function getMode(role) {
    var mode;

    switch (role) {
      case RoleType.Publisher:
      case RoleType.Attendee:
      case RoleType.Streamer:
      case RoleType.Viewer:
      case RoleType.Publisher:
      case RoleType.Publisher:
        mode = UIMode.VirtualTour;
        break;

      case RoleType.SelfService:
        mode = UIMode.SelfServiceTour;
        break;

      case RoleType.SmartDevice:
        mode = UIMode.LiveMeeting;
        break;

      case RoleType.Embed:
        mode = UIMode.Embed;
        break;

      default:
        mode = UIMode.None;
    } // console.log('UserService.getMode', role, mode);


    return mode;
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
    this.state = {
      status: 'access'
    };
    /*
    StateService.state$.pipe(
    	takeUntil(this.unsubscribe$)
    ).subscribe(state => {
    	// console.log('AccessComponent.state', state);
    	this.state = state;
    	this.pushChanges();
    });
    */
  };

  _proto.onSelfServiceTourRequest = function onSelfServiceTourRequest() {
    this.initRequestForm();
    this.state.status = 'self-service-tour';
    this.pushChanges();

    if (STATIC && window.navigator.userAgent.indexOf('OculusBrowser') !== -1) {
      this.test();
      this.onSubmit();
    }
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
    var fields = this.fields = window.fields || [{
      type: 'text',
      name: 'firstName',
      label: 'access_first_name',
      required: true,
      test: 'Jhon'
    }, {
      type: 'text',
      name: 'lastName',
      label: 'access_last_name',
      required: true,
      test: 'Appleseed'
    }, {
      type: 'email',
      name: 'email',
      label: 'access_email',
      required: true,
      test: 'jhonappleseed@gmail.com'
    }, {
      type: 'custom-select',
      name: 'role',
      label: 'access_role',
      required: true,
      options: window.data.roles,
      test: window.data.roles[0].id
    }, {
      type: 'checkbox',
      name: 'privacy',
      label: 'access_privacy_disclaimer',
      required: true,
      test: true
    }];
    fields.push({
      type: 'hidden',
      name: 'checkField',
      value: '',
      test: ''
    }, {
      type: 'none',
      name: 'checkRequest',
      value: window.antiforgery || '',
      test: window.antiforgery || ''
    });
    var form = this.form = fieldsToFormGroup(fields);
    /*
    const form = this.form = new FormGroup({
    	firstName: new FormControl(null, Validators.RequiredValidator()),
    	lastName: new FormControl(null, Validators.RequiredValidator()),
    	email: new FormControl(null, [Validators.RequiredValidator(), Validators.EmailValidator()]),
    	role: new FormControl(null, Validators.RequiredValidator()),
    	privacy: new FormControl(null, Validators.RequiredTrueValidator()),
    	checkRequest: window.antiforgery || '',
    	checkField: '',
    });
    */

    var controls = this.controls = form.controls;
    /*
    const options = data.roles.slice();
    options.unshift({ id: null, name: 'select', // LabelPipe.transform('select') });
    controls.role.options = options;
    */

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
      patchFields(this.fields, this.form);
      /*
      this.form.patch({
      	firstName: 'Jhon',
      	lastName: 'Appleseed',
      	email: 'jhonappleseed@gmail.com',
      	role: this.controls.role.options.find(x => x.id !== null).id,
      	privacy: true,
      	checkRequest: window.antiforgery || '',
      	checkField: ''
      });
      */
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
        // console.log('AccessComponent.onSubmit', response);
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
};var MessageService = /*#__PURE__*/function () {
  function MessageService() {}

  MessageService.message = function message(_message) {
    this.message$.next(_message);
  };

  MessageService.in = function _in(message) {
    // console.log('MessageService.in', message);
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

_defineProperty(MessageService, "out$", new rxjs.ReplaySubject(1));var StateService = /*#__PURE__*/function () {
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

_defineProperty(StateService, "state$", new rxjs.BehaviorSubject({}));var DevicePlatform = {
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
}();var Emittable = /*#__PURE__*/function () {
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
}();var SessionStorageService = /*#__PURE__*/function () {
  function SessionStorageService() {}

  SessionStorageService.delete = function _delete(name) {
    if (this.isSessionStorageSupported()) {
      window.sessionStorage.removeItem(name);
    }
  };

  SessionStorageService.exist = function exist(name) {
    if (this.isSessionStorageSupported()) {
      return window.sessionStorage[name] !== undefined;
    }
  };

  SessionStorageService.get = function get(name) {
    var value = null;

    if (this.isSessionStorageSupported() && window.sessionStorage[name] !== undefined) {
      try {
        value = JSON.parse(window.sessionStorage[name]);
      } catch (e) {
        console.log('SessionStorageService.get.error parsing', name, e);
      }
    }

    return value;
  };

  SessionStorageService.set = function set(name, value) {
    if (this.isSessionStorageSupported()) {
      try {
        var cache = [];
        var json = JSON.stringify(value, function (key, value) {
          if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
            }

            cache.push(value);
          }

          return value;
        });
        window.sessionStorage.setItem(name, json);
      } catch (e) {
        console.log('SessionStorageService.set.error serializing', name, value, e);
      }
    }
  };

  SessionStorageService.isSessionStorageSupported = function isSessionStorageSupported() {
    if (this.supported) {
      return true;
    }

    var supported = false;

    try {
      supported = 'sessionStorage' in window && window.sessionStorage !== null;

      if (supported) {
        window.sessionStorage.setItem('test', '1');
        window.sessionStorage.removeItem('test');
      } else {
        supported = false;
      }
    } catch (e) {
      supported = false;
    }

    this.supported = supported;
    return supported;
  };

  return SessionStorageService;
}();var StreamServiceMode = {
  Client: 'client',
  Editor: 'editor'
};

var StreamService = /*#__PURE__*/function () {
  function StreamService() {}

  StreamService.orderedRemotes$ = function orderedRemotes$() {
    return rxjs.combineLatest([StreamService.remotes$, rxjs.interval(1000)]).pipe(operators.map(function (datas) {
      var orderedRemotes = [];
      var remotes = datas[0];
      remotes.forEach(function (remote) {
        // const audioLevel = remote.getAudioLevel();
        // console.log('audioLevel', audioLevel, remote);
        var role = null,
            uid = null,
            screenUid = null,
            audioLevel = 0,
            peekAudioLevel = 0,
            order = 0;

        if (remote.clientInfo) {
          audioLevel = remote.clientInfo.audioLevel = remote.getAudioLevel();
          peekAudioLevel = remote.clientInfo.peekAudioLevel = Math.max(remote.clientInfo.audioLevel, 0.2);
          order = remote.clientInfo.order;
          role = remote.clientInfo.role || null;
          uid = remote.clientInfo.uid || null;
          screenUid = remote.clientInfo.screenUid || null;
          /*
          if (remote.clientInfo.screenUid !== remote.getId()) {
          	orderedRemotes.push(remote);
          }
          */
        }

        orderedRemotes.push({
          role: role,
          uid: uid,
          screenUid: screenUid,
          audioLevel: audioLevel,
          peekAudioLevel: peekAudioLevel,
          order: order,
          remote: remote
        });
      });
      orderedRemotes.sort(function (a, b) {
        var av = a.role === RoleType.Publisher ? 2 : a.role === RoleType.Attendee ? 1 : 0;
        var bv = b.role === RoleType.Publisher ? 2 : b.role === RoleType.Attendee ? 1 : 0;
        return bv - av || b.peekAudioLevel - a.peekAudioLevel || (a.order || 0) - (b.order || 0);
      });
      orderedRemotes.forEach(function (x, i) {
        if (x.remote.clientInfo) {
          x.remote.clientInfo.order = i;
        }
      }); // !!! hard limit max visible stream
      // orderedRemotes.length = Math.min(orderedRemotes.length, MAX_VISIBLE_STREAMS);
      // console.log('StreamService.orderedRemotes$', orderedRemotes);

      return orderedRemotes;
    }), operators.distinctUntilChanged(function (a, b) {
      var auid = a.map(function (x) {
        return x.uid + "-" + x.screenUid;
      }).join('|');
      var buid = b.map(function (x) {
        return x.uid + "-" + x.screenUid;
      }).join('|'); // console.log('StreamService.orderedRemotes$', auid, buid);

      return auid === buid;
    }), operators.map(function (remotes) {
      return remotes.map(function (x) {
        return x.remote;
      });
    }));
  };

  StreamService.getEditorStreams$ = function getEditorStreams$() {
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
                role: RoleType.Publisher,
                uid: 'editor'
              }
            };
            var fakeAttendeeStream = {
              getId: function getId() {
                return 'editor';
              },
              clientInfo: {
                role: RoleType.Attendee,
                uid: 'editor'
              }
            };
            var fakeSmartDeviceStream = {
              getId: function getId() {
                return 'editor';
              },
              clientInfo: {
                role: RoleType.SmartDevice,
                uid: 'editor'
              }
            };

            _this.editorStreams$.next([fakePublisherStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream, fakeSmartDeviceStream]); // StreamService.editorStreams = [fakePublisherStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream, fakeAttendeeStream];

          };

          video.play();
        }).catch(function (error) {
          console.log('EditorComponent.getUserMedia.error', error.name, error.message);
        });
      }

      return _this.editorStreams$;
    }), operators.shareReplay(1));
  };

  StreamService.getEditorScreens$ = function getEditorScreens$() {
    var _this2 = this;

    return rxjs.of(null).pipe(operators.switchMap(function () {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia && _this2.mode === StreamServiceMode.Editor) {
        var body = document.querySelector('body');
        var media = document.createElement('div');
        var video = document.createElement('video');
        media.setAttribute('id', 'stream-editor-screen');
        media.setAttribute('style', 'position:absolute; top: 5000px; line-height: 0;');
        media.appendChild(video);
        body.appendChild(media);
        navigator.mediaDevices.getDisplayMedia({
          screen: {
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
            var fakePublisherScreen = {
              getId: function getId() {
                return 'editor-screen';
              },
              clientInfo: {
                role: RoleType.Publisher,
                uid: 'editor',
                screenUid: 'editor-screen'
              }
            };
            var fakeAttendeeScreen = {
              getId: function getId() {
                return 'editor-screen';
              },
              clientInfo: {
                role: RoleType.Attendee,
                uid: 'editor',
                screenUid: 'editor-screen'
              }
            };

            _this2.editorScreens$.next([fakePublisherScreen, fakeAttendeeScreen]);
          };

          video.play();
        }).catch(function (error) {
          console.log('EditorComponent.getUserMedia.error', error.name, error.message);
        });
      }

      return _this2.editorScreens$;
    }), operators.shareReplay(1));
  };

  StreamService.getPublisherStreamId$ = function getPublisherStreamId$() {
    var _this3 = this;

    var publisherStreamId = this.publisherStreamId;

    if (publisherStreamId) {
      return rxjs.of(publisherStreamId);
    } else {
      return this.streams$.pipe(operators.map(function () {
        return _this3.publisherStreamId;
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

  StreamService.remoteAdd = function remoteAdd(stream) {
    var remotes = this.remotes.slice();
    remotes.push(stream);
    this.remotes = remotes;
  };

  StreamService.remoteRemove = function remoteRemove(streamId) {
    var remotes = this.remotes.slice();
    var remote = remotes.find(function (x) {
      return x.getId() === streamId;
    }); // console.log('StreamService.remoteRemove', streamId, remote);

    if (remote) {
      if (remote.isPlaying()) {
        remote.stop();
      }

      remotes.splice(remotes.indexOf(remote), 1);
      this.remotes = remotes;
    }

    return remote;
  };

  StreamService.remoteSetClientInfo = function remoteSetClientInfo(remoteId, clientInfo) {
    var remotes = this.remotes;
    var remote = remotes.find(function (x) {
      return x.getId() === remoteId;
    });

    if (remote) {
      remote.clientInfo = clientInfo;
    }

    this.remotes = remotes;
  };

  _createClass(StreamService, null, [{
    key: "editorStreams",
    set: function set(editorStreams) {
      this.editorStreams$.next(editorStreams);
    },
    get: function get() {
      return this.editorStreams$.getValue();
    }
  }, {
    key: "editorScreens",
    set: function set(editorScreens) {
      this.editorScreens$.next(editorScreens);
    },
    get: function get() {
      return this.editorScreens$.getValue();
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
    key: "screen",
    set: function set(screen) {
      this.screen$.next(screen);
    },
    get: function get() {
      return this.screen$.getValue();
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
        return x.clientInfo && x.clientInfo.role === RoleType.Publisher && x.clientInfo.uid === x.getId();
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

_defineProperty(StreamService, "editorStreams$", new rxjs.BehaviorSubject(null));

_defineProperty(StreamService, "editorScreens$", new rxjs.BehaviorSubject(null));

_defineProperty(StreamService, "local$", new rxjs.BehaviorSubject(null));

_defineProperty(StreamService, "screen$", new rxjs.BehaviorSubject(null));

_defineProperty(StreamService, "remotes$", new rxjs.BehaviorSubject([]));

_defineProperty(StreamService, "peers$", new rxjs.BehaviorSubject([]));

_defineProperty(StreamService, "streams$", rxjs.combineLatest([StreamService.local$, StreamService.screen$, StreamService.remotes$, StreamService.getEditorStreams$(), StreamService.getEditorScreens$()]).pipe(operators.map(function (data) {
  var local = data[0];
  var screen = data[1];
  var remotes = data[2];
  var editorStreams = data[3];
  var editorScreens = data[4];
  var streams = remotes;

  if (local) {
    // my stream
    streams = streams.slice();
    streams.push(local);
  }

  if (screen) {
    // my screen
    streams = streams.slice();
    streams.push(screen);
  }

  if (editorStreams) {
    var _streams;

    // editor streams
    (_streams = streams).push.apply(_streams, editorStreams);
  }

  if (editorScreens) {
    var _streams2;

    // editor screens
    (_streams2 = streams).push.apply(_streams2, editorScreens);
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

    _defineProperty(_assertThisInitialized(_this), "previousMuteAudio_", false);

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
  	if (role !== RoleType.Viewer && role !== RoleType.SmartDevice) {
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
        AgoraService.getDevices().then(function (devices) {
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
        }).catch(function (error) {
          reject(error);
        });
        /*
        AgoraRTC.getDevices((devices) => {
        	// console.log('AgoraRTC.getDevices', devices);
        	tempStream.close();
        	for (let i = 0; i < devices.length; i++) {
        		const device = devices[i];
        		// console.log('device', device.deviceId);
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
        */
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

          AgoraService.rtcToken$(channelNameLink).subscribe(function (token) {
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
        client.startProxyServer(3);
        console.log('AgoraService.client.startProxyServer');
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

    client.on('error', this.onError);
    client.on('stream-published', this.onStreamPublished);
    client.on('stream-unpublished', this.onStreamUnpublished); //subscribe remote stream

    client.on('stream-added', this.onStreamAdded);
    client.on('stream-removed', this.onStreamRemoved);
    client.on('stream-subscribed', this.onStreamSubscribed);
    client.on('mute-video', this.onMuteVideo);
    client.on('unmute-video', this.onUnmuteVideo);
    client.on('mute-audio', this.onMuteAudio);
    client.on('unmute-audio', this.onUnmuteAudio);

    client.on('peer-online', this.onPeerConnect); // Occurs when the peer user leaves the channel; for example, the peer user calls Client.leave.

    client.on('peer-leave', this.onPeerLeaved); // client.on('connection-state-change', this.onConnectionStateChange);

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

  AgoraService.getUniqueUserId = function getUniqueUserId() {
    var mult = 10000000000000;
    var a = (1 + Math.floor(Math.random() * 8)) * 100;
    var b = (1 + Math.floor(Math.random() * 8)) * 10;
    var c = (1 + Math.floor(Math.random() * 8)) * 1;
    var combo = a + b + c;
    var date = Date.now();
    var uid = combo * mult + date; // console.log(combo);
    // console.log(date);
    // console.log(m);
    // console.log('AgoraService.getUniqueUserId', uid);

    return uid.toString();
  };

  _proto.join = function join(token, channelNameLink) {
    var _this4 = this;

    this.channel = null;
    var client = this.client;
    var clientId = SessionStorageService.get('bHereClientId') || AgoraService.getUniqueUserId(); // console.log('AgoraService.join', { token, channelNameLink, clientId });

    client.join(token, channelNameLink, clientId, function (uid) {
      // console.log('AgoraService.join', uid);
      StateService.patchState({
        status: AgoraStatus.Connected,
        channelNameLink: channelNameLink,
        connected: true,
        uid: uid
      });
      SessionStorageService.set('bHereClientId', uid);

      {
        AgoraService.rtmToken$(uid).subscribe(function (token) {
          // console.log('AgoraService.rtmToken$', token);
          _this4.joinMessageChannel(token.token, uid).then(function (success) {
            // console.log('joinMessageChannel.success', success);
            if (StateService.state.role !== RoleType.Viewer) {
              _this4.autoDetectDevice().then(function (devices) {
                _this4.createMediaStream(uid, devices.video, devices.audio);
              });
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
        AgoraService.rtcToken$(channelNameLink).subscribe(function (token) {
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
        _this5.channel = channel;
        channel.on('ChannelMessage', _this5.onMessage);

        _this5.emit('channel', channel); // console.log('AgoraService.joinMessageChannel.success');


        resolve(uid);
      }).catch(reject);
    });
  };

  _proto.detectDevices = function detectDevices(next) {
    AgoraService.getDevices().then(function (devices) {
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
    }).catch(function (error) {
      console.log('AgoraService.detectDevices', error);
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
    return new Promise(function (resolve, reject) {
      var state = StateService.state;

      if (state.role === RoleType.SmartDevice || USE_AUTODETECT) {
        AgoraService.getDevices().then(function (inputDevices) {
          var devices = {
            videos: [],
            audios: [],
            video: null,
            audio: null
          };
          inputDevices.forEach(function (x) {
            if (x.kind === 'videoinput') {
              devices.videos.push(x);
            } else if (x.kind === 'audioinput') {
              devices.audios.push(x);
            }
          }); // console.log(inputDevices);
          // console.log(devices);

          devices.video = devices.videos[0] || null;
          devices.audio = devices.audios[0] || null;
          StateService.patchState({
            devices: devices
          });
          resolve(devices);
        }).catch(function (error) {
          reject(error);
        });
      } else {
        resolve(state.devices);
      }
    });
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
    		// console.log('getUserMedia', options.video.width.ideal, options.video.height.ideal);
    	}
    	// console.log('getUserMedia', options);
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
    } // console.log('AgoraService.createLocalStreamWithOptions', options, quality, local.attributes);


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
      uid: StateService.state.uid,
      screenUid: StateService.state.screenUid
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
    this.unpublishScreenStream();
    StreamService.remotes = [];
    StreamService.peers = [];
    return new Promise(function (resolve, reject) {
      _this9.leaveMessageChannel().then(function () {
        return Promise.all([_this9.leaveClient(), _this9.leaveScreenClient()]);
      }, reject);
    });
  };

  _proto.leaveClient = function leaveClient() {
    var _this10 = this;

    return new Promise(function (resolve, reject) {
      var client = _this10.client;

      if (client) {
        client.leave(function () {
          _this10.client = null; // console.log('Leave channel successfully');

          if (environment.flags.useProxy) {
            client.stopProxyServer();
            console.log('AgoraService.client.stopProxyServer');
          }

          resolve();
        }, function (error) {
          console.log('AgoraService.leaveClient.error', error);
          reject(error);
        });
      } else {
        resolve();
      }
    });
  };

  _proto.leaveMessageChannel = function leaveMessageChannel() {
    var _this11 = this;

    return new Promise(function (resolve, reject) {
      {
        _this11.unobserveMemberCount();

        var channel = _this11.channel;

        if (!channel) {
          return resolve();
        }

        var messageClient = _this11.messageClient;
        channel.leave().then(function () {
          _this11.channel = null;
          messageClient.logout().then(function () {
            _this11.messageClient = null;
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

  _proto.setAudio = function setAudio(audioMuted) {
    var local = StreamService.local;

    if (local && local.audio) {
      if (audioMuted) {
        this.previousMuteAudio_ = local.userMuteAudio;

        if (!local.userMuteAudio) {
          local.muteAudio();
          StateService.patchState({
            audioMuted: true
          });
          this.broadcastEvent(new AgoraMuteAudioEvent({
            streamId: local.getId()
          }));
        }
      } else {
        if (local.userMuteAudio && !this.previousMuteAudio_) {
          local.unmuteAudio();
          StateService.patchState({
            audioMuted: false
          });
          this.broadcastEvent(new AgoraUnmuteAudioEvent({
            streamId: local.getId()
          }));
        }
      }
    }
  };

  _proto.toggleNavInfo = function toggleNavInfo() {
    var showNavInfo = !StateService.state.showNavInfo;
    StateService.patchState({
      showNavInfo: showNavInfo
    });
    MessageService.send({
      type: MessageType.NavInfo,
      showNavInfo: showNavInfo
    });
  };

  _proto.dismissControl = function dismissControl() {
    var _this12 = this;

    return new Promise(function (resolve, _) {
      var controllingId = StateService.state.controlling;

      if (controllingId) {
        _this12.sendRemoteControlDismiss(controllingId).then(function () {
          StateService.patchState({
            controlling: false
          });
          resolve(controllingId);
        });
      } else {
        resolve(false);
      }
    });
  };

  _proto.requestControl = function requestControl(controllingId) {
    var _this13 = this;

    return new Promise(function (resolve, _) {
      _this13.sendRemoteControlRequest(controllingId).then(function (controllingId) {
        StateService.patchState({
          controlling: controllingId
        });
        resolve(controllingId);
      });
    });
  };

  _proto.toggleControl = function toggleControl(controllingId) {
    var _this14 = this;

    this.dismissSpy().then(function () {
      _this14.dismissControl().then(function (dismissedControllingId) {
        if (dismissedControllingId !== controllingId) {
          _this14.requestControl(controllingId).then(function (controllingId) {// console.log('AgoraService.toggleControl', controllingId);
          });
        }
      });
    });
  };

  _proto.toggleSilence = function toggleSilence() {
    var silencing = !StateService.state.silencing;
    this.sendMessage({
      type: MessageType.RemoteSilencing,
      silencing: silencing
    });
    StateService.patchState({
      silencing: silencing
    });
  };

  _proto.dismissSpy = function dismissSpy() {
    var _this15 = this;

    return new Promise(function (resolve, _) {
      var spyingId = StateService.state.spying;

      if (spyingId) {
        _this15.sendRemoteSpyDismiss(spyingId).then(function () {
          StateService.patchState({
            spying: false
          });
          resolve(spyingId);
        });
      } else {
        resolve(false);
      }
    });
  };

  _proto.requestSpy = function requestSpy(spyingId) {
    var _this16 = this;

    return new Promise(function (resolve, _) {
      _this16.sendSpyRemoteRequestInfo(spyingId).then(function () {
        StateService.patchState({
          spying: spyingId
        });
        resolve(spyingId);
      });
    });
  };

  _proto.toggleSpy = function toggleSpy(spyingId) {
    var _this17 = this;

    this.dismissControl().then(function () {
      _this17.dismissSpy().then(function (dismissedSpyingId) {
        if (dismissedSpyingId !== spyingId) {
          _this17.requestSpy(spyingId).then(function (spyingId) {
            console.log('AgoraService.toggleSpy', spyingId);
          });
        }
      });
    });
  };

  _proto.sendRemoteRequestPeerInfo = function sendRemoteRequestPeerInfo(remoteId) {
    var _this18 = this;

    // console.log('AgoraService.sendRemoteRequestPeerInfo', remoteId);
    return new Promise(function (resolve, reject) {
      _this18.sendMessage({
        type: MessageType.RequestPeerInfo,
        messageId: _this18.newMessageId(),
        remoteId: remoteId
      }).then(function (message) {
        // console.log('AgoraService.sendRemoteRequestPeerInfo.response', message);
        if (message.type === MessageType.RequestPeerInfoResult) {
          // !!! RequestPeerInfoResult Publisher
          if (message.clientInfo.role === RoleType.Publisher) {
            var state = {
              hosted: true
            };

            if (message.clientInfo.controllingId) {
              state.controlling = message.clientInfo.controllingId;

              _this18.sendControlRemoteRequestInfo(message.clientInfo.controllingId);
            }

            StateService.patchState(state);
          }

          resolve(message);
        }
      });
    });
  };

  _proto.sendRemoteControlRequest = function sendRemoteControlRequest(controllingId) {
    var _this19 = this;

    return new Promise(function (resolve, _) {
      _this19.sendMessage({
        type: MessageType.RequestControl,
        messageId: _this19.newMessageId(),
        controllingId: controllingId
      }).then(function (message) {
        // console.log('AgoraService.sendRemoteControlRequest.response', message);
        // !!! always accepted
        if (message.type === MessageType.RequestControlAccepted) {
          resolve(controllingId);
        } else if (message.type === MessageType.RequestControlRejected) {
          // this.remoteDeviceInfo = undefined
          resolve(false);
        }
      });
    });
  };

  _proto.sendRemoteControlDismiss = function sendRemoteControlDismiss(controllingId) {
    var _this20 = this;

    return new Promise(function (resolve, _) {
      _this20.sendMessage({
        type: MessageType.RequestControlDismiss,
        messageId: _this20.newMessageId(),
        controllingId: controllingId
      }).then(function (message) {
        // console.log('AgoraService.sendRemoteControlDismiss return', message);
        if (message.type === MessageType.RequestControlDismissed) {
          resolve(controllingId);
        } else if (message.type === MessageType.RequestControlRejected) {
          resolve(false);
        }
      });
    });
  };

  _proto.sendControlRemoteRequestInfo = function sendControlRemoteRequestInfo(controllingId) {
    var _this21 = this;

    return new Promise(function (resolve, reject) {
      _this21.sendMessage({
        type: MessageType.RequestInfo,
        messageId: _this21.newMessageId(),
        remoteId: controllingId
      }).then(function (message) {
        // console.log('AgoraService.sendControlRemoteRequestInfo.response', message);
        if (message.type === MessageType.RequestInfoResult) {
          StateService.patchState({
            controlling: controllingId
          });
          resolve(message);
        }
      });
    });
  };

  _proto.sendSpyRemoteRequestInfo = function sendSpyRemoteRequestInfo(spyingId) {
    var _this22 = this;

    return new Promise(function (resolve, reject) {
      _this22.sendMessage({
        type: MessageType.RequestInfo,
        messageId: _this22.newMessageId(),
        remoteId: spyingId
      }).then(function (message) {
        // console.log('AgoraService.sendSpyRemoteRequestInfo.response', message);
        if (message.type === MessageType.RequestInfoResult) {
          StateService.patchState({
            spying: spyingId
          });
          resolve(message);
        }
      });
    });
  };

  _proto.sendRemoteSpyDismiss = function sendRemoteSpyDismiss(spyingId) {
    var _this23 = this;

    return new Promise(function (resolve, reject) {
      _this23.sendMessage({
        type: MessageType.RequestInfoDismiss,
        messageId: _this23.newMessageId(),
        remoteId: spyingId
      }).then(function (message) {
        // console.log('AgoraService.sendRemoteSpyDismiss.response', message);
        if (message.type === MessageType.RequestInfoDismissed) {
          resolve(spyingId);
        } else if (message.type === MessageType.RequestInfoRejected) {
          resolve(false);
        }
      });
    });
  };

  _proto.newMessageId = function newMessageId() {
    return StateService.state.uid + "-" + Date.now().toString();
  };

  _proto.navToView = function navToView(viewId, keepOrientation) {
    if (keepOrientation === void 0) {
      keepOrientation = false;
    }

    if (StateService.state.controlling === StateService.state.uid || StateService.state.spying === StateService.state.uid) {
      this.sendMessage({
        type: MessageType.NavToView,
        viewId: viewId,
        keepOrientation: keepOrientation
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
    var _this24 = this;

    return new Promise(function (resolve, reject) {
      if (StateService.state.connected) {
        message.clientId = StateService.state.uid;

        switch (message.type) {
          case MessageType.ControlInfo:
          case MessageType.NavToGrid:
          case MessageType.ShowPanel:
          case MessageType.PlayMedia:
          case MessageType.ZoomMedia:
          case MessageType.CurrentTimeMedia:
          case MessageType.PlayModel:
          case MessageType.NavInfo:
            // console.log('AgoraService.sendMessage', StateService.state.uid, StateService.state.controlling, StateService.state.spying, StateService.state.controlling !== StateService.state.uid && StateService.state.spying !== StateService.state.uid);
            if (StateService.state.controlling !== StateService.state.uid && StateService.state.spying !== StateService.state.uid) {
              return;
            }

            break;
        } // message.wrc_version = 'beta';
        // message.uid = StateService.state.uid;


        var send = function send(message, channel) {
          try {
            var text = JSON.stringify(message);

            if (message.messageId) {
              _this24.once("message-" + message.messageId, function (message) {
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

        var channel = _this24.channel;

        if (channel) {
          send(message, channel);
        } else {
          try {
            _this24.once("channel", function (channel) {
              send(message, channel);
            });
          } catch (error) {
            reject(error);
          }
        }
      }
    });
  };

  _proto.addOrUpdateChannelAttributes = function addOrUpdateChannelAttributes(messages) {
    var messageClient = this.messageClient;

    if (messageClient) {
      var attributes = {};
      messages.forEach(function (message) {
        var key = message.date.toString();
        attributes[key] = JSON.stringify(message);
      });

      if (Object.keys(attributes).length) {
        // console.log('AgoraService.setChannelAttributes', attributes);
        var promise = messageClient.addOrUpdateChannelAttributes(StateService.state.channelNameLink, attributes, {
          enableNotificationToChannelMembers: false
        });
        return rxjs.from(promise);
      } else {
        return rxjs.of(null);
      }
    } else {
      return rxjs.of(null);
    }
  };

  _proto.getChannelAttributes = function getChannelAttributes() {
    var messageClient = this.messageClient;

    if (messageClient) {
      var promise = messageClient.getChannelAttributes(StateService.state.channelNameLink);
      return rxjs.from(promise).pipe(operators.map(function (attributes) {
        return Object.keys(attributes).map(function (key) {
          return attributes[key];
        });
      }), operators.map(function (attributes) {
        attributes.sort(function (a, b) {
          return a.lastUpdateTs - b.lastUpdateTs;
        });
        var messages = attributes.map(function (attribute) {
          var message = JSON.parse(attribute.value); // console.log('AgoraService.getChannelAttributes.attribute', attribute, message);

          return message;
        }); // console.log('AgoraService.getChannelAttributes', messages);

        return messages;
      }));
    } else {
      return rxjs.of(null);
    }
  };

  _proto.checkBroadcastMessage = function checkBroadcastMessage(message) {
    // filter for broadcast
    // !!! filter events here
    switch (message.type) {
      case MessageType.RequestControlDismiss:
        StateService.patchState({
          controlling: false
        });

        if (message.controllingId === StateService.state.uid) {
          this.unpublishScreenStream();
        }

        this.sendMessage({
          type: MessageType.RequestControlDismissed,
          messageId: message.messageId
        });
        break;

      case MessageType.RequestInfoDismiss:
        // console.log('checkBroadcastMessage.RequestInfoDismiss', message);
        StateService.patchState({
          spying: false
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
        } else if (StateService.state.controlling && StateService.state.controlling !== StateService.state.uid) {
          this.broadcastMessage(message);
        }

        break;

      case MessageType.RemoteSilencing:
        // only streamers can be silenced
        if (StateService.state.role === RoleType.Streamer) {
          this.broadcastMessage(message);
        }

        break;

      case MessageType.ControlInfo:
      case MessageType.ShowPanel:
      case MessageType.PlayMedia:
      case MessageType.ZoomMedia:
      case MessageType.CurrentTimeMedia:
      case MessageType.PlayModel:
      case MessageType.NavInfo:
      case MessageType.NavToView:
      case MessageType.NavToGrid:
        if (StateService.state.controlling && StateService.state.controlling !== StateService.state.uid || StateService.state.spying && StateService.state.spying !== StateService.state.uid) {
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


      if (message.remoteId && message.remoteId !== StateService.state.uid && message.remoteId !== StateService.state.screenUid) {
        return;
      } // !!! check position !!!


      if (message.type === MessageType.VRStarted) {
        var container = document.createElement('div');
        container.classList.add('player__vr');
        message.container = container;
      }
      /*
      if (message.type === MessageType.VRStarted || message.type === MessageType.VREnded) {
      	// console.log('AgoraService.onMessage', message.type, message);
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
      uid: StateService.state.uid,
      screenUid: StateService.state.screenUid
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

    var streamId = stream.getId(); // console.log('AgoraService.onStreamAdded', streamId, StateService.state.uid, StateService.state.screenUid);

    if (streamId !== StateService.state.uid && streamId !== StateService.state.screenUid) {
      client.subscribe(stream, function (error) {
        console.log('AgoraService.onStreamAdded.subscribe.error', error);
      });
    }
  };

  _proto.onStreamRemoved = function onStreamRemoved(event) {
    var stream = event.stream;
    var streamId = stream.getId();

    if (streamId !== StateService.state.uid && streamId !== StateService.state.screenUid) {
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
    var remoteId = event.uid;

    if (remoteId !== StateService.state.uid) {
      // console.log('AgoraService.onPeerLeaved', event.uid);
      var remote = this.remoteRemove(remoteId);

      if (remote.clientInfo) {
        // !!! remove screenRemote?
        if (remote.clientInfo.role === RoleType.Publisher) {
          StateService.patchState({
            hosted: false,
            controlling: false,
            spying: false,
            silencing: false
          });
        } else {
          if (StateService.state.controlling === remoteId) {
            StateService.patchState({
              controlling: false
            });
          }

          if (StateService.state.spying === remoteId) {
            StateService.patchState({
              spying: false
            });
          }
        }
      }
    }

    this.peerRemove(remoteId);
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
    StreamService.remoteAdd(stream);
    this.broadcastEvent(new AgoraRemoteEvent({
      stream: stream
    }));
    var remoteId = stream.getId();
    this.sendRemoteRequestPeerInfo(remoteId).then(function (message) {
      StreamService.remoteSetClientInfo(remoteId, message.clientInfo);
    });
  };

  _proto.remoteRemove = function remoteRemove(streamId) {
    // console.log('AgoraService.remoteRemove', streamId);
    var remote = StreamService.remoteRemove(streamId);

    if (remote && remote.clientInfo && remote.clientInfo.role === RoleType.Publisher && remote.clientInfo.screenUid !== streamId) {
      StateService.patchState({
        hosted: false
      });
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
    AgoraService.rtcToken$(channelNameLink).subscribe(function (token) {
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
    AgoraService.rtcToken$(channelNameLink).subscribe(function (token) {
      if (token.token) {
        client.renewToken(token.token);
        console.log('AgoraService.onTokenPrivilegeDidExpire.renewed');
      }
    });
  } // screen
  ;

  _proto.toggleScreen = function toggleScreen() {
    var _this25 = this;

    var screen = StreamService.screen;

    if (screen) {
      this.unpublishScreenStream();
    } else {
      if (this.screenClient) {
        this.createScreenStream(StateService.state.screenUid);
      } else {
        this.createScreenClient(function () {
          var channelNameLink = _this25.getChannelNameLink();

          AgoraService.rtcToken$(channelNameLink).subscribe(function (token) {
            // console.log('AgoraService.rtcToken$', token);
            _this25.screenJoin(token.token, channelNameLink);
          });
        });
      }
    } // console.log(screen);

  };

  _proto.createScreenClient = function createScreenClient(next) {
    var _this26 = this;

    if (this.screenClient) {
      next();
    }

    var screenClient = this.screenClient = AgoraRTC.createClient({
      mode: 'live',
      codec: 'h264'
    }); // rtc, vp8

    var clientInit = function clientInit() {
      if (environment.flags.useProxy) {
        screenClient.startProxyServer(3);
        console.log('AgoraService.screenClient.startProxyServer');
      }

      screenClient.init(environment.appKey, function () {
        // console.log('AgoraRTC screenClient initialized');
        next();
      }, function (error) {
        // console.log('AgoraRTC client init failed', error);
        _this26.screenClient = null;
      });
    };

    clientInit();
    screenClient.on('error', this.onScreenError);
    screenClient.on('stream-published', this.onScreenStreamPublished);
    screenClient.on('stream-unpublished', this.onScreenStreamUnpublished); // only for remotes
    // screenClient.on('stream-added', this.onScreenStreamAdded);
    // screenClient.on('stream-removed', this.onScreenStreamRemoved);
    // screenClient.on('stream-subscribed', this.onScreenStreamSubscribed);
    // screenClient.on('peer-online', this.onScreenPeerConnect);
    // screenClient.on('peer-leave', this.onScreenPeerLeaved);
    // screenClient.on('onTokenPrivilegeWillExpire', this.onScreenTokenPrivilegeWillExpire);
    // screenClient.on('onTokenPrivilegeDidExpire', this.onScreenTokenPrivilegeDidExpire);
  };

  _proto.screenJoin = function screenJoin(token, channelNameLink) {
    var _this27 = this;

    var screenClient = this.screenClient;
    var screenClientId = AgoraService.getUniqueUserId(); // const screenClientId = SessionStorageService.get('bHereClientId') || AgoraService.getUniqueUserId();
    // console.log('AgoraService.screenJoin', { token, channelNameLink, screenClientId });

    screenClient.join(token, channelNameLink, screenClientId, function (screenUid) {
      // console.log('AgoraService.join', screenUid);
      StateService.patchState({
        screenUid: screenUid
      });

      _this27.createScreenStream(screenUid);
    }, function (error) {
      console.log('AgoraService.screenJoin.error', error);

      if (error === 'DYNAMIC_KEY_EXPIRED') {
        AgoraService.rtcToken$(channelNameLink).subscribe(function (token) {
          _this27.screenJoin(token.token, channelNameLink);
        });
      }
    });
  };

  _proto.createScreenStream = function createScreenStream(screenUid) {
    var _this28 = this;

    var options = {
      streamID: screenUid,
      audio: false,
      video: false,
      screen: true
    };
    /*
    // Set relevant properties according to the browser.
    // Note that you need to implement isFirefox and isCompatibleChrome.
    if (isFirefox()) {
    	options.mediaSource = 'window';
    } else if (!isCompatibleChrome()) {
    	options.extensionId = 'minllpmhdgpndnkomcoccfekfegnlikg';
    }
    */

    var quality = Object.assign({}, StateService.state.quality);
    var stream = AgoraRTC.createStream(options);

    if (quality) {
      stream.setScreenProfile('720p_1'); // stream.setVideoProfile(quality.profile);
      // stream.setVideoEncoderConfiguration(quality);
    }

    console.log('AgoraService.createScreenStream', screenUid, options, quality);

    var onStopScreenSharing = function onStopScreenSharing() {
      _this28.unpublishScreenStream();
    }; // Initialize the stream.


    stream.init(function () {
      StreamService.screen = stream;
      stream.on('stopScreenSharing', onStopScreenSharing);
      stream.muteAudio();
      setTimeout(function () {
        _this28.publishScreenStream();
      }, 1);
    }, function (error) {
      console.log('AgoraService.createScreenStream.screen.init.error', error);
    });
  };

  _proto.publishScreenStream = function publishScreenStream() {
    var screenClient = this.screenClient;
    var screen = StreamService.screen; // publish screen stream

    screenClient.publish(screen, function (error) {
      console.log('AgoraService.publishScreenStream.error', screen.getId(), error);
    });
    screen.clientInfo = {
      role: StateService.state.role,
      name: StateService.state.name,
      uid: StateService.state.uid,
      screenUid: StateService.state.screenUid
    };
    StreamService.screen = screen;
  };

  _proto.unpublishScreenStream = function unpublishScreenStream() {
    var screenClient = this.screenClient;
    var screen = StreamService.screen; // console.log('AgoraService.unpublishScreenStream', screen, screenClient);

    if (screenClient && screen) {
      screenClient.unpublish(screen, function (error) {
        console.log('AgoraService.unpublishScreenStream.error', screen.getId(), error);
      });
    }

    StreamService.screen = null;
  };

  _proto.leaveScreenClient = function leaveScreenClient() {
    var _this29 = this;

    return new Promise(function (resolve, reject) {
      var screenClient = _this29.screenClient;

      if (screenClient) {
        screenClient.leave(function () {
          _this29.screenClient = null; // console.log('Leave channel successfully');

          if (environment.flags.useProxy) {
            screenClient.stopProxyServer();
            console.log('AgoraService.screenClient.stopProxyServer');
          }

          resolve();
        }, function (error) {
          console.log('AgoraService.leaveScreenClient.error', error);
          reject(error);
        });
      } else {
        resolve();
      }
    });
  };

  _proto.onScreenError = function onScreenError(error) {
    console.log('AgoraService.onScreenError', error);
  };

  _proto.onScreenStreamPublished = function onScreenStreamPublished(event) {
    // console.log('AgoraService.onScreenStreamPublished');
    var screen = StreamService.screen;
    screen.clientInfo = {
      role: StateService.state.role,
      name: StateService.state.name,
      uid: StateService.state.uid,
      screenUid: StateService.state.screenUid
    };
    StreamService.screen = screen;
  };

  _proto.onScreenStreamUnpublished = function onScreenStreamUnpublished(event) {
    // console.log('AgoraService.onScreenStreamUnpublished');
    StreamService.screen = null;
  } // tokens
  ;

  AgoraService.rtcToken$ = function rtcToken$(channelNameLink) {
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

  AgoraService.rtmToken$ = function rtmToken$(uid) {
    if (environment.flags.useToken) {
      return HttpService.post$('/api/token/rtm', {
        uid: uid
      });
    } else {
      return rxjs.of({
        token: null
      });
    }
  } // checks
  ;

  AgoraService.checkRtcConnection = function checkRtcConnection() {
    return new Promise(function (resolve, reject) {
      try {
        var client = AgoraRTC.createClient({
          mode: 'live',
          codec: 'h264'
        });

        if (environment.flags.useProxy) {
          client.startProxyServer(3);
        }

        client.init(environment.appKey, function () {
          AgoraService.checkRtcTryJoin(client).then(function (uid) {
            resolve(uid);
          }).catch(function (error) {
            reject(error);
          }).finally(function () {
            // clear
            client.leave(function () {
              if (environment.flags.useProxy) {
                client.stopProxyServer();
              }
            }, function () {});
          });
        }, function (error) {
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  AgoraService.checkRtcTryJoin = function checkRtcTryJoin(client) {
    return new Promise(function (resolve, reject) {
      var channelName = 'checkRtcConnection';
      AgoraService.rtcToken$(channelName).subscribe(function (token) {
        client.join(token.token, channelName, null, function (uid) {
          // this.createMediaStream(uid, StateService.state.devices.video, StateService.state.devices.audio);
          resolve(uid);
        }, function (error) {
          if (error === 'DYNAMIC_KEY_EXPIRED') {
            return AgoraService.checkRtcTryJoin(client);
          } else {
            console.log('AgoraService.checkRtcConnection.error', error);
            reject(error);
          }
        });
      }, function (error) {
        return reject(error);
      });
    });
  };

  AgoraService.checkRtmConnection = function checkRtmConnection(uid) {
    return new Promise(function (resolve, reject) {

      try {
        var client = AgoraRTM.createInstance(environment.appKey, {
          logFilter: AgoraRTM.LOG_FILTER_OFF
        });
        client.setParameters({
          logFilter: AgoraRTM.LOG_FILTER_OFF
        });
        var channel;
        AgoraService.rtmToken$(uid).subscribe(function (token) {
          // console.log('AgoraService.rtmToken$', token);
          var channelName = 'checkRtcConnection';
          client.login({
            token: token.token,
            uid: uid.toString()
          }).then(function () {
            channel = client.createChannel(channelName);
            channel.join().then(function () {
              resolve(uid);
              channel.leave();
            }).catch(function (error) {
              reject(error);
            }).finally(function () {
              // clear
              channel.leave().then(function () {
                channel = null;
                client.logout().then(function () {
                  client = null;
                }).catch(function () {});
              }).catch(function () {});
            });
          }).catch(function (error) {
            reject(error);
          }).finally(function () {
            // clear
            if (client) {
              client.logout().then(function () {
                client = null;
              }).catch(function () {});
            }
          });
        }, function (error) {
          return reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  AgoraService.getDevices = function getDevices() {
    return new Promise(function (resolve, reject) {
      var devices_ = AgoraService.devices_;

      if (devices_) {
        resolve(devices_);
      } else {
        devices_ = AgoraService.devices_ = [];
        var constraints = {
          audio: true,
          video: true
        };

        if (DeviceService.platform === DevicePlatform.IOS) {
          constraints.video = {
            facingMode: 'user'
          };
        }

        if (DeviceService.platform === DevicePlatform.VRHeadset) {
          constraints.video = false;
        }

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            navigator.mediaDevices.enumerateDevices().then(function (devices) {
              stream.getTracks().forEach(function (track) {
                track.stop();
              });
              devices.forEach(function (device) {
                devices_.push(device);
              });
              resolve(devices_);
            }).catch(function (error) {
              reject(error);
            });
          }).catch(function (error) {
            reject(error);
          });
        } else {
          reject('Media device not available');
        }
      }
    });
  };

  return AgoraService;
}(Emittable);var ChatMessage = /*#__PURE__*/function () {
  function ChatMessage(message, clientId, name) {
    this.type = MessageType.ChatMessage;
    this.clientId_ = clientId;

    if (typeof message === 'string') {
      this.date = Date.now();
      this.clientId = clientId;
      this.name = name;
      this.message = message;
    } else if (typeof message === 'object') {
      this.date = message.date;
      this.clientId = message.clientId;
      this.name = message.name;
      this.message = message.message;
    }

    var names = this.name.split(' ');
    this.shortName = names[0].substr(0, 1).toUpperCase() + (names.length > 1 ? names[1] : names[0]).substr(0, 1).toUpperCase();
  }

  var _proto = ChatMessage.prototype;

  _proto.getPayload = function getPayload() {
    return {
      date: this.date,
      clientId: this.clientId,
      name: this.name,
      message: this.message
    };
  };

  _proto.getCopy = function getCopy() {
    return new ChatMessage({
      date: this.date,
      clientId: this.clientId,
      name: this.name,
      message: this.message
    }, this.clientId_);
  };

  _createClass(ChatMessage, [{
    key: "me",
    get: function get() {
      return this.clientId === this.clientId_;
    }
  }]);

  return ChatMessage;
}();

var AgoraChatComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AgoraChatComponent, _Component);

  function AgoraChatComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto2 = AgoraChatComponent.prototype;

  _proto2.onInit = function onInit() {
    var _this = this;

    var form = this.form = new rxcompForm.FormGroup({
      message: null
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (changes) {
      // console.log('AgoraChatComponent.changes$', form.value);
      _this.checkTypings(changes);

      _this.pushChanges();
    });
    StateService.state$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (state) {// console.log('AgoraChatComponent.state', state);
    });
    MessageService.out$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (message) {
      // console.log('AgoraChatComponent.MessageService', message);
      switch (message.type) {
        case MessageType.ChatMessage:
          _this.pushMessage(new ChatMessage(message, StateService.state.uid, StateService.state.name));

          break;

        case MessageType.ChatTypingBegin:
          _this.typingBegin(message);

          break;

        case MessageType.ChatTypingEnd:
          _this.typingEnd(message);

          break;
      }
    });
    this.messages = [];
    this.groupedMessages = [];

    if (this.demo) {
      // !!! only for demo
      var messages = AgoraChatComponent.getFakeList().map(function (x) {
        return new ChatMessage(x, StateService.state.uid, StateService.state.name);
      });
      this.updateMessages(messages.slice(0, 5));
      MessageService.in$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (message) {
        message.clientId = message.clientId || StateService.state.uid; // console.log('AgoraChatComponent.MessageService.in$', message);

        switch (message.type) {
          case MessageType.ChatMessage:
            break;

          case MessageType.ChatTypingBegin:
            MessageService.out(message);
            break;

          case MessageType.ChatTypingEnd:
            MessageService.out(message);
            break;
        }
      });
      AgoraChatComponent.randomMessage(this, messages); // !!! only for demo
    } else {
      var agora = this.agora = AgoraService.getSingleton();

      if (agora) {
        agora.getChannelAttributes().pipe(operators.first()).subscribe(function (messages) {
          messages = messages.map(function (x) {
            return new ChatMessage(x, StateService.state.uid, StateService.state.name);
          }); // console.log('AgoraChatComponent.getChannelAttributes.messages', messages);

          _this.updateMessages(messages);
        });
      }
    }
  };

  _proto2.onView = function onView() {// this.scrollToBottom();
  };

  _proto2.onChanges = function onChanges() {// this.scrollToBottom();
  };

  _proto2.onDestroy = function onDestroy() {
    if (AgoraChatComponent.to) {
      clearTimeout(AgoraChatComponent.to);
      AgoraChatComponent.to = null;
    }
  };

  _proto2.onSubmit = function onSubmit() {
    var message = this.createMessage(this.form.value.message);
    this.sendMessage(message);
    this.form.get('message').value = null;

    if (this.demo) {
      this.randomMessage();
    }
  };

  _proto2.createMessage = function createMessage(text) {
    var message = new ChatMessage(text, StateService.state.uid, StateService.state.name);
    return message;
  };

  _proto2.sendMessage = function sendMessage(message) {
    this.pushMessage(message);
    var agora = this.agora;

    if (agora) {
      agora.addOrUpdateChannelAttributes([message.getPayload()]).pipe(operators.first()).subscribe();
    }

    MessageService.send(message);
  };

  _proto2.onClose = function onClose(event) {
    this.close.next();
  };

  _proto2.scrollToBottom = function scrollToBottom() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var scrollView = node.querySelector('.group--scrollview');
    scrollView.scrollTop = scrollView.scrollHeight;
  };

  _proto2.pushMessage = function pushMessage(message) {
    var messages = this.messages ? this.messages.slice() : [];
    this.removeTyping({
      type: MessageType.ChatTypingBegin,
      clientId: message.clientId
    }, this.messages);
    messages.push(message);
    this.updateMessages(messages);
  };

  _proto2.typingBegin = function typingBegin(message) {
    // console.log('AgoraChatComponent.typingBegin', message);
    var messages = this.messages ? this.messages.slice() : [];
    messages.push(message);
    this.updateMessages(messages);
  };

  _proto2.typingEnd = function typingEnd(message) {
    // console.log('AgoraChatComponent.typingEnd', message);
    var messages = this.messages ? this.messages.slice() : [];
    this.removeTyping({
      type: MessageType.ChatTypingBegin,
      clientId: message.clientId
    }, messages);
    this.updateMessages(messages);
  };

  _proto2.removeTyping = function removeTyping(message, messages, recursive) {
    if (recursive === void 0) {
      recursive = true;
    }

    var index = messages.reduce(function (p, c, i) {
      return c.type === message.type && c.clientId === message.clientId ? i : p;
    }, -1);

    if (index !== -1) {
      messages.splice(index, 1);

      if (recursive === true) {
        this.removeTyping(message, messages, true);
      }
    }

    return index;
  };

  _proto2.checkTypings = function checkTypings(changes) {
    var typings = changes.message && changes.message.length > 0; // console.log('AgoraChatComponent.checkTypings', typings);

    if (this.typings_ !== typings) {
      this.typings_ = typings;

      if (typings) {
        MessageService.send({
          type: MessageType.ChatTypingBegin
        });
      } else {
        MessageService.send({
          type: MessageType.ChatTypingEnd
        });
      }
    }
  };

  _proto2.updateMessages = function updateMessages(messages) {
    var _this2 = this;

    this.messages = messages;

    {
      this.groupedMessages = [];
      this.pushChanges();
    }

    var groupedMessages = [];
    messages.forEach(function (message) {
      if (message.type === MessageType.ChatMessage) {
        // ChatMessage
        var lastMessage = groupedMessages.length ? groupedMessages[groupedMessages.length - 1] : null;

        if (lastMessage && lastMessage.clientId === message.clientId) {
          lastMessage.message += "<p>" + message.message + "</p>";
        } else {
          groupedMessages.push(message.getCopy());
        }
      } else if (message.type === MessageType.ChatTypingBegin) {
        // ChatTypingBegin
        var _lastMessage = groupedMessages.reduce(function (p, c, i) {
          return c.clientId === message.clientId ? c : p;
        }, null);

        if (_lastMessage) {
          _lastMessage.typing = true;
        } // console.log('MessageType.ChatTypingBegin', lastMessage, message);

      }
    }); // setTimeout(() => {

    this.groupedMessages = groupedMessages;
    this.pushChanges(); // console.log('AgoraChatComponent.updateMessages', messages, groupedMessages);

    setTimeout(function () {
      _this2.scrollToBottom();
    }, 1); // }, 1);
  };

  _proto2.isValid = function isValid() {
    var isValid = this.form.valid;
    return isValid && this.form.value.message && this.form.value.message.length > 0;
  } // demo
  ;

  _proto2.randomMessage = function randomMessage() {
    var _this3 = this;

    if (AgoraChatComponent.to) {
      clearTimeout(AgoraChatComponent.to);
      AgoraChatComponent.to = null;
    }

    AgoraChatComponent.to = setTimeout(function () {
      var message = AgoraChatComponent.createRandomMessage();

      _this3.sendMessage(message);
    }, (2 + Math.random() * 6) * 1000);
  };

  return AgoraChatComponent;
}(rxcomp.Component);
AgoraChatComponent.meta = {
  selector: '[agora-chat]',
  outputs: ['close'],
  inputs: ['demo']
};

AgoraChatComponent.getFakeList = function () {
  var messages = [{
    "date": 1614592230000,
    "name": "Jhon Appleseed",
    "message": "Function-based web-enabled benchmark",
    "clientId": "7341614597544882"
  }, {
    "date": 1614592240000,
    "name": "Jhon Appleseed",
    "message": "Customizable exuding superstructure",
    "clientId": "7341614597544882"
  }, {
    "date": 1614592250000,
    "name": "Gilles Pitkins",
    "message": "Synergistic interactive archive",
    "clientId": "cfe9ff5b-f7da-449d-bf5a-3184b5eba6ea"
  }, {
    "date": 1614592260000,
    "name": "Jhon Appleseed",
    "message": "Digitized client-server initiative",
    "clientId": "7341614597544882"
  }, {
    "date": 1614592270000,
    "name": "Jhon Appleseed",
    "message": "Quality-focused tertiary open system",
    "clientId": "7341614597544882"
  }, {
    "date": 1614592280000,
    "name": "Jhon Appleseed",
    "message": "Exclusive uniform middleware",
    "clientId": "7341614597544882"
  }, {
    "date": 1614592290000,
    "name": "John Pruckner",
    "message": "Decentralized disintermediate extranet",
    "clientId": "ae51e846-d043-41e9-bb5c-3189181e5b43"
  }, {
    "date": 1614592300000,
    "name": "Lamont Georgievski",
    "message": "Enhanced static approach",
    "clientId": "1961cd9e-93aa-4bd0-b96a-89fcbd36b257"
  }, {
    "date": 1614592310000,
    "name": "Jhon Appleseed",
    "message": "Ergonomic clear-thinking info-mediaries",
    "clientId": "7341614597544882"
  }, {
    "date": 1614592320000,
    "name": "Jeri Pedroni",
    "message": "Grass-roots dynamic encryption",
    "clientId": "13d69bba-3656-449b-8fe3-d7a87062b044"
  }, {
    "date": 1614592330000,
    "name": "Frederik Dechelle",
    "message": "Compatible disintermediate policy",
    "clientId": "9151ebe0-efa8-40b4-a341-b8fd489e9c88"
  }, {
    "date": 1614592340000,
    "name": "Jhon Appleseed",
    "message": "Inverse user-facing adapter",
    "clientId": "7341614597544882"
  }, {
    "date": 1614592350000,
    "name": "Jhon Appleseed",
    "message": "Future-proofed even-keeled application",
    "clientId": "7341614597544882"
  }, {
    "date": 1614592360000,
    "name": "Cassie Jonathon",
    "message": "Profit-focused content-based budgetary management",
    "clientId": "5b3dc6f3-2a3d-493d-aac5-66ddfce2d709"
  }, {
    "date": 1614592370000,
    "name": "Jhon Appleseed",
    "message": "Managed intermediate monitoring",
    "clientId": "7341614597544882"
  }, {
    "date": 1614592380000,
    "name": "Jhon Appleseed",
    "message": "Exclusive client-server encoding",
    "clientId": "7341614597544882"
  }, {
    "date": 1614592390000,
    "name": "Jhon Appleseed",
    "message": "Cross-group system-worthy matrices",
    "clientId": "7341614597544882"
  }, {
    "date": 1614592400000,
    "name": "Jhon Appleseed",
    "message": "Upgradable encompassing benchmark",
    "clientId": "7341614597544882"
  }, {
    "date": 1614592410000,
    "name": "Emelen Beevors",
    "message": "Function-based full-range knowledge base",
    "clientId": "c93aea47-ebd8-4e5e-88fd-52053dd35cd1"
  }, {
    "date": 1614592420000,
    "name": "Jhon Appleseed",
    "message": "Synergistic system-worthy capability",
    "clientId": "7341614597544882"
  }];

  while (messages.length < 100) {
    messages = messages.concat(messages);
  }

  return messages; // return messages.slice(0, 5);
};

AgoraChatComponent.createRandomMessage = function (text) {
  var message = new ChatMessage({
    date: Date.now(),
    clientId: '9fe0e1b9-6a6b-418b-b916-4bbff3eeb123',
    name: 'Herman frederick',
    message: 'Lorem ipsum dolor'
  }, StateService.state.uid, StateService.state.name);
  return message;
};

AgoraChatComponent.randomMessage = function (instance, messages) {
  var getRandomMessage = function getRandomMessage() {
    var others = messages.filter(function (x) {
      return x.id !== '7341614597544882';
    });
    var message = others[Math.floor(others.length * Math.random())];
    message = new ChatMessage({
      date: Date.now(),
      clientId: '9fe0e1b9-6a6b-418b-b916-4bbff3eeb123',
      name: message.name,
      message: message.message
    }, StateService.state.uid, StateService.state.name);
    return message;
  };

  if (AgoraChatComponent.to) {
    clearTimeout(AgoraChatComponent.to);
    AgoraChatComponent.to = null;
  }

  AgoraChatComponent.to = setTimeout(function () {
    var message = getRandomMessage();
    instance.sendMessage(message);
    AgoraChatComponent.randomMessage(instance, messages);
  }, (2 + Math.random() * 6) * 1000);
};var AgoraCheckComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AgoraCheckComponent, _Component);

  function AgoraCheckComponent() {
    return _Component.apply(this, arguments) || this;
  }

  return AgoraCheckComponent;
}(rxcomp.Component);
AgoraCheckComponent.meta = {
  selector: '[agora-check]',
  inputs: ['value'],
  template:
  /* html */
  "\n\t\t<svg *if=\"value == null\" class=\"checkmark idle\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 52 52\">\n\t\t\t<circle class=\"checkmark__circle\" cx=\"26\" cy=\"26\" r=\"25\" fill=\"none\"/>\n\t\t</svg>\n\t\t<svg *if=\"value === true\" class=\"checkmark success\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 52 52\">\n\t\t\t<circle class=\"checkmark__circle\" cx=\"26\" cy=\"26\" r=\"25\" fill=\"none\"/>\n\t\t\t<path class=\"checkmark__icon\" fill=\"none\" d=\"M14.1 27.2l7.1 7.2 16.7-16.8\" stroke-linecap=\"round\"/>\n\t\t</svg>\n\t\t<svg *if=\"value === false\" class=\"checkmark error\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 52 52\">\n\t\t\t<circle class=\"checkmark__circle\" cx=\"26\" cy=\"26\" r=\"25\" fill=\"none\"/>\n\t\t\t<path class=\"checkmark__icon\" stroke-linecap=\"round\" fill=\"none\" d=\"M16 16 36 36 M36 16 16 36\"/>\n\t\t</svg>\n\t"
};var LabelPipe = /*#__PURE__*/function (_Pipe) {
  _inheritsLoose(LabelPipe, _Pipe);

  function LabelPipe() {
    return _Pipe.apply(this, arguments) || this;
  }

  LabelPipe.transform = function transform(key) {
    var labels = LabelPipe.labels_;
    return labels[key] || key; // `#${key}#`;
  };

  LabelPipe.getKeys = function getKeys() {
    for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
      keys[_key] = arguments[_key];
    }

    return LabelPipe.transform(keys.map(function (x) {
      return x.replace('-', '_');
    }).join('_'));
  };

  LabelPipe.setLabels = function setLabels() {
    var _Utils$merge;

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
    this.labels_ = LABELS;
  };

  return LabelPipe;
}(rxcomp.Pipe);
LabelPipe.setLabels();
LabelPipe.meta = {
  name: 'label'
};var LocalStorageService = /*#__PURE__*/function () {
  function LocalStorageService() {}

  LocalStorageService.delete = function _delete(name) {
    if (this.isLocalStorageSupported()) {
      window.localStorage.removeItem(name);
    }
  };

  LocalStorageService.exist = function exist(name) {
    if (this.isLocalStorageSupported()) {
      return window.localStorage[name] !== undefined;
    }
  };

  LocalStorageService.get = function get(name) {
    var value = null;

    if (this.isLocalStorageSupported() && window.localStorage[name] !== undefined) {
      try {
        value = JSON.parse(window.localStorage[name]);
      } catch (e) {
        console.log('LocalStorageService.get.error parsing', name, e);
      }
    }

    return value;
  };

  LocalStorageService.set = function set(name, value) {
    if (this.isLocalStorageSupported()) {
      try {
        var cache = [];
        var json = JSON.stringify(value, function (key, value) {
          if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
            }

            cache.push(value);
          }

          return value;
        });
        window.localStorage.setItem(name, json);
      } catch (e) {
        console.log('LocalStorageService.set.error serializing', name, value, e);
      }
    }
  };

  LocalStorageService.isLocalStorageSupported = function isLocalStorageSupported() {
    if (this.supported) {
      return true;
    }

    var supported = false;

    try {
      supported = 'localStorage' in window && window.localStorage !== null;

      if (supported) {
        window.localStorage.setItem('test', '1');
        window.localStorage.removeItem('test');
      } else {
        supported = false;
      }
    } catch (e) {
      supported = false;
    }

    this.supported = supported;
    return supported;
  };

  return LocalStorageService;
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
      _this.modal$.next(node);

      _this.hasModal = true;
    }), operators.switchMap(function (node) {
      return _this.events$;
    }), operators.tap(function (_) {
      return _this.hasModal = false;
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

_defineProperty(ModalService, "hasModal", false);
ModalService.modal$ = new rxjs.Subject();
ModalService.events$ = new rxjs.Subject();var TIMEOUT = 100;

var AgoraChecklistComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AgoraChecklistComponent, _Component);

  function AgoraChecklistComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AgoraChecklistComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.platform = DeviceService.platform;
    this.checklist = {};
    this.errors = {};
    this.state = {};
    this.busy = true;
    this.shouldCheckAudio = true;
    this.shouldCheckVideo = true;
    LocalStorageService.set('checklist', false);
    StateService.state$.pipe(operators.first()).subscribe(function (state) {
      // console.log('AgoraChecklistComponent', state);
      _this.state = state;

      if (state.role === RoleType.Viewer) {
        _this.shouldCheckAudio = false;
        _this.shouldCheckVideo = false;
      }

      if (_this.platform === DevicePlatform.VRHeadset) {
        _this.shouldCheckAudio = true;
        _this.shouldCheckVideo = false;
      }

      _this.pushChanges();

      setTimeout(function () {
        _this.checkBrowser();
      }, 1000);
    });
  };

  _proto.checkBrowser = function checkBrowser() {
    var _this2 = this;

    var browser = AgoraRTC.checkSystemRequirements();
    this.checklist.browser = browser;

    if (browser) {
      setTimeout(function () {
        _this2.checkHttps();
      }, TIMEOUT);
    } else {
      this.errors.browser = LabelPipe.transform('bhere_browser_error');
      this.checkHttps(true);
      this.checkAudio(true);
      this.checkVideo(true);
      this.checkRtc(true);
      this.checkRtm(true);
    }

    this.pushChanges();
  };

  _proto.checkHttps = function checkHttps(skip) {
    var _this3 = this;

    var https = window.location.protocol === 'https:';
    this.checklist.https = https;

    if (skip) {
      if (!https) {
        this.errors.https = LabelPipe.transform('bhere_https_error');
      }
    } else if (https) {
      setTimeout(function () {
        _this3.checkAudio();
      }, TIMEOUT);
      this.pushChanges();
    } else {
      this.errors.https = LabelPipe.transform('bhere_https_error');
      this.checkAudio(true);
      this.checkVideo(true);
      this.checkRtc(true);
      this.checkRtm(true);
      this.pushChanges();
    }
  };

  _proto.checkAudio = function checkAudio(skip) {
    var _this4 = this;

    if (skip) {
      this.checklist.audio = false;
    } else if (this.shouldCheckAudio) {
      AgoraService.getDevices().then(function (devices) {
        // console.log('checkAudio', devices);
        var audioinput = devices.find(function (x) {
          return x.kind === 'audioinput' && x.deviceId;
        });
        _this4.checklist.audio = audioinput != null;

        _this4.pushChanges();

        setTimeout(function () {
          _this4.checkVideo();
        }, TIMEOUT);
      }).catch(function (error) {
        _this4.checklist.audio = false;
        _this4.errors.audio = LabelPipe.transform('bhere_audio_error', error);

        _this4.pushChanges();

        setTimeout(function () {
          _this4.checkVideo();
        }, TIMEOUT);
      });
    } else {
      this.checkVideo();
    }
  };

  _proto.checkVideo = function checkVideo(skip) {
    var _this5 = this;

    if (skip) {
      this.checklist.video = false;
    } else if (this.shouldCheckVideo) {
      AgoraService.getDevices().then(function (devices) {
        // console.log('checkVideo', devices);
        var videoinput = devices.find(function (x) {
          return x.kind === 'videoinput' && x.deviceId;
        });
        _this5.checklist.video = videoinput != null;
        setTimeout(function () {
          _this5.checkRtc();
        }, TIMEOUT);

        _this5.pushChanges();
      }).catch(function (error) {
        _this5.checklist.video = false;
        _this5.errors.video = LabelPipe.transform('bhere_video_error', error);
        setTimeout(function () {
          _this5.checkRtc();
        }, TIMEOUT);

        _this5.pushChanges();
      });
    } else {
      this.checkRtc();
    }
  };

  _proto.checkRtc = function checkRtc(skip) {
    var _this6 = this;

    if (skip) {
      this.checklist.rtc = false;
    } else {
      AgoraService.checkRtcConnection().then(function (uid) {
        _this6.checklist.rtc = true;

        _this6.pushChanges();

        setTimeout(function () {
          _this6.checkRtm(false, uid);
        }, TIMEOUT);
      }).catch(function (error) {
        _this6.checklist.rtc = false;
        _this6.errors.rtc = LabelPipe.transform('bhere_rtc_error', error);

        _this6.checkRtm(true);

        _this6.pushChanges();
      });
    }
  };

  _proto.checkRtm = function checkRtm(skip, uid) {
    var _this7 = this;

    if (skip) {
      this.checklist.rtm = false;
      this.onComplete();
    } else {
      AgoraService.checkRtmConnection(uid).then(function (_) {
        _this7.checklist.rtm = true;
      }).catch(function (error) {
        _this7.checklist.rtm = false;
        _this7.errors.rtm = LabelPipe.transform('bhere_rtm_error', error);
      }).finally(function () {
        _this7.onComplete();
      });
    }
  };

  _proto.onComplete = function onComplete() {
    var _this8 = this;

    // console.log('AgoraChecklistComponent.onComplete');
    var success = Object.keys(this.checklist).reduce(function (p, c) {
      return p && _this8.checklist[c];
    }, true);
    this.checklist.success = success;
    this.checklist.error = !success;
    this.busy = false;
    this.pushChanges();

    if (this.state.role === RoleType.SmartDevice) {
      this.onNext();
    }
  };

  _proto.onNext = function onNext() {
    if (this.checklist.success) {
      LocalStorageService.set('checklist', true);
    }

    this.checked.next(this.checklist);
  };

  _proto.openHttps = function openHttps() {
    window.location.href = window.location.href.replace('http://', 'https://').replace(':5000', ':6443');
  };

  _proto.showFirewallConfiguration = function showFirewallConfiguration() {
    ModalService.open$({
      src: environment.template.modal.configureFirewall
    }).pipe(operators.takeUntil(this.unsubscribe$)).subscribe();
  };

  return AgoraChecklistComponent;
}(rxcomp.Component);
AgoraChecklistComponent.meta = {
  selector: '[agora-checklist]',
  outputs: ['checked']
};var AgoraConfigureFirewallModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AgoraConfigureFirewallModalComponent, _Component);

  function AgoraConfigureFirewallModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AgoraConfigureFirewallModalComponent.prototype;

  _proto.onClose = function onClose() {
    ModalService.resolve();
  };

  return AgoraConfigureFirewallModalComponent;
}(rxcomp.Component);
AgoraConfigureFirewallModalComponent.meta = {
  selector: '[agora-configure-firewall-modal]'
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
      var analyser = this.analyser;

      if (analyser) {
        // Connect the output of the analyser to the destination
        // analyser.connect(context.destination); // no audio !
        // console.log(analyser.fftSize); // 2048 by default
        // console.log(analyser.frequencyBinCount); // will give us 1024 data points
        analyser.fftSize = fftSize; // 64
        // console.log(analyser.frequencyBinCount); // fftSize/2 = 32 data points

        var source = this.addSource(streamOrElement); // source.connect(context.destination); // no audio!
        // Connect the output of the source to the input of the analyser

        source.connect(analyser);
      }

      var state$ = new rxjs.BehaviorSubject(state);
      return AudioStreamService.frame$.pipe(operators.withLatestFrom(state$), operators.map(function (_ref) {
        var deltaTime = _ref[0],
            state = _ref[1];

        if (analyser) {
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
        }

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
    // want 'fast attack, slow release.'

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

    Object.keys(this.sources_).forEach(function (key) {
      _this3.removeSourceKey(key);
    });
    var analyser = this.analyser;

    if (analyser) {
      analyser.disconnect();
    }

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
        try {
          this.analyser_ = this.context.createAnalyser();
        } catch (error) {
          console.log('AudioStreamService.analyser', error);
        }
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
}), operators.share());var AgoraDevicePreviewComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AgoraDevicePreviewComponent, _Component);

  function AgoraDevicePreviewComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AgoraDevicePreviewComponent.prototype;

  _proto.onInit = function onInit() {
    this.init();
  };

  _proto.init = function init() {
    if (this.initialized_) {
      return;
    }

    this.initialized_ = true;
    this.platform = DeviceService.platform;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
    var preview = this.preview = node.querySelector('video');
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
      // const { node } = getContext(this);
      // node.classList.remove('ready');
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

        if (this.platform === DevicePlatform.IOS) {
          options.video.facingMode = 'user';
        } // console.log('AgoraDevicePreviewComponent.initStream.getUserMedia', options);


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
    // console.log('AgoraDevicePreview.onLoadedMetadata', event);
    var _getContext2 = rxcomp.getContext(this),
        node = _getContext2.node;

    node.classList.add('ready');
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
          this.init();
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
          this.init();
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
};var AgoraDeviceComponent = /*#__PURE__*/function (_Component) {
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
        }, function (error) {
          console.log('AgoraDeviceComponent.devices$.error', error); // alert('AgoraDeviceComponent ' + error); // !!!
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
        name: 'bhere_select_video' // LabelPipe.transform('bhere_select_video')

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
        name: 'bhere_select_audio' // LabelPipe.transform('bhere_select_audio')

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
      return this.platform !== DevicePlatform.IOS && this.platform !== DevicePlatform.VRHeadset; // && this.form && this.form.value.video;
    }
  }]);

  return AgoraDeviceComponent;
}(rxcomp.Component);
AgoraDeviceComponent.meta = {
  selector: '[agora-device]',
  outputs: ['enter']
};var AgoraLinkComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AgoraLinkComponent, _Component);

  function AgoraLinkComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AgoraLinkComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.state = {};
    var form = this.form = new rxcompForm.FormGroup({
      link: new rxcompForm.FormControl(null, [rxcompForm.Validators.PatternValidator(/^\d{9}-\d{4}-\d{13}$/), rxcompForm.Validators.RequiredValidator()]),
      linkAttendee: null,
      linkStreamer: null,
      linkViewer: null,
      linkSmartDevice: null // link: new FormControl(null),

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
      linkViewer: this.getRoleMeetingId(timestamp, RoleType.Viewer),
      linkSmartDevice: this.getRoleMeetingId(timestamp, RoleType.SmartDevice)
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
          linkViewer: _this2.setRoleMeetingId(value, RoleType.Viewer),
          linkSmartDevice: _this2.setRoleMeetingId(value, RoleType.SmartDevice)
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

  _proto.onCopyToClipBoard = function onCopyToClipBoard(meetingId, asAccessCode) {
    if (asAccessCode === void 0) {
      asAccessCode = false;
    }

    var input = document.createElement('input');
    input.style.position = 'absolute';
    input.style.top = '1000vh'; // input.style.visibility = 'hidden';

    document.querySelector('body').appendChild(input);
    input.value = asAccessCode ? this.getAccessCodeUrl(meetingId, true) : this.getUrl(meetingId, true);
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

  _proto.getAccessCodeUrl = function getAccessCodeUrl(meetingId, shareable) {
    if (shareable === void 0) {
      shareable = false;
    }

    var role = LocationService.get('role') || null;
    var name = LocationService.get('name') || null;
    var url = "" + window.location.origin + environment.url.accessCode + "?link=" + meetingId + (name ? "&name=" + name : '') + (role && !shareable ? "&role=" + role : '');
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

  return AgoraLinkComponent;
}(rxcomp.Component);
AgoraLinkComponent.meta = {
  selector: '[agora-link]',
  outputs: ['link']
};var AgoraLoginComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(AgoraLoginComponent, _Component);

  function AgoraLoginComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = AgoraLoginComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var form = this.form = new rxcompForm.FormGroup({
      username: new rxcompForm.FormControl(null, rxcompForm.Validators.RequiredValidator()),
      password: new rxcompForm.FormControl(null, rxcompForm.Validators.RequiredValidator()),
      checkRequest: window.antiforgery || '',
      checkField: ''
    });
    var controls = this.controls = form.controls;
    form.changes$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (changes) {
      _this.pushChanges();
    });
    this.error = null;
  };

  _proto.test = function test() {
    this.form.patch({
      username: 'publisher',
      password: 'publisher',
      checkRequest: window.antiforgery || '',
      checkField: ''
    });
  };

  _proto.reset = function reset() {
    this.form.reset();
  };

  _proto.onSubmit = function onSubmit() {
    var _this2 = this;

    if (this.form.valid) {
      var payload = this.form.value;
      this.form.submitted = true;
      this.error = null;
      this.pushChanges();
      UserService.login$(payload).pipe(operators.first()).subscribe(function (user) {
        if (StateService.state.role === user.type) {
          // this.login.next(user);
          _this2.onNext(user);

          _this2.form.reset();
        } else {
          _this2.error = {
            friendlyMessage: LabelPipe.transform('error_credentials')
          };

          _this2.pushChanges();
        }
      }, function (error) {
        console.log('AccessComponent.error', error);
        _this2.error = error;

        _this2.pushChanges();
      });
    } else {
      this.form.touched = true;
    }
  };

  _proto.isValid = function isValid() {
    var isValid = this.form.valid;
    return isValid;
  };

  _proto.onNext = function onNext(user) {
    this.replaceUrl(user);
    this.login.next(user);
  };

  _proto.replaceUrl = function replaceUrl(user) {
    if ('history' in window) {
      var role = LocationService.get('role') || null;
      var link = LocationService.get('link') || null;
      var name = LocationService.get('name') || (user.firstName && user.lastName ? user.firstName + " " + user.lastName : null);
      var url = "" + window.location.origin + window.location.pathname + "?link=" + link + (name ? "&name=" + name : '') + (role ? "&role=" + role : ''); // console.log('AgoraLoginComponent.url', url);

      window.history.replaceState({
        'pageTitle': window.pageTitle
      }, '', url);
    }
  };

  return AgoraLoginComponent;
}(rxcomp.Component);
AgoraLoginComponent.meta = {
  selector: '[agora-login]',
  outputs: ['login']
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

  _proto.onToggleControl = function onToggleControl($event) {
    this.toggleControl.next($event);
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
        // !!!


        if (this.stream_ && this.stream_.isPlaying() && this.stream_.player.div.parentNode === player) {
          console.log('AgoraStreamComponent stopping stream', this.stream_.getId(), 'on', this.stream_.player.div.parentNode);
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
          // const name = `stream-${node.getAttribute('type')}-${streamId}`;
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
  outputs: ['toggleControl', 'toggleSpy'],
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
}();var ModalOutletComponent = /*#__PURE__*/function (_Component) {
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

  _proto.onClose = function onClose() {
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
  },
  Media: {
    id: 6,
    name: 'media'
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

    this.items = (this.items || []).filter(function (item) {
      return filterViewItem(item);
    }).map(function (item) {
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
      var publisherStreamIndex = 0;
      var attendeeStreamIndex = 0;
      var smartDeviceStream = 0;
      var publisherScreenIndex = 0;
      var attendeeScreenIndex = 0;
      items.forEach(function (item, index) {
        item.index = index;

        if (item.asset) {
          switch (item.asset.file) {
            case 'publisherStream':
              item.asset.index = publisherStreamIndex++;
              break;

            case 'nextAttendeeStream':
              item.asset.index = attendeeStreamIndex++;
              break;

            case 'smartDeviceStream':
              item.asset.index = smartDeviceStream++;
              break;

            case 'publisherScreen':
              item.asset.index = publisherScreenIndex++;
              break;

            case 'attendeeScreen':
              item.asset.index = attendeeScreenIndex++;
              break;
          }
        }
        /*
        if (item.asset && item.asset.file === 'publisherStream') {
        	item.asset.index = publisherStreamIndex++;
        }
        if (item.asset && item.asset.file === 'nextAttendeeStream') {
        	item.asset.index = attendeeStreamIndex++;
        }
        */

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
        type: Object.assign({}, ViewType.PanoramaGrid),
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
var Room3DView = /*#__PURE__*/function (_View3) {
  _inheritsLoose(Room3DView, _View3);

  function Room3DView(options) {
    return _View3.call(this, options) || this;
  }

  return Room3DView;
}(View);
var ModelView = /*#__PURE__*/function (_View4) {
  _inheritsLoose(ModelView, _View4);

  function ModelView(options) {
    return _View4.call(this, options) || this;
  }

  return ModelView;
}(View);
var MediaView = /*#__PURE__*/function (_View5) {
  _inheritsLoose(MediaView, _View5);

  function MediaView(options) {
    return _View5.call(this, options) || this;
  }

  return MediaView;
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

_defineProperty(ViewItem, "allowedProps", ['id', 'type', 'title', 'abstract', 'asset', 'link', 'viewId', 'keepOrientation', 'important', 'position', 'rotation', 'scale', 'radius', 'height', 'arc']);

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

    case ViewType.Room3d.name:
      view = new Room3DView(view);
      break;

    case ViewType.Model.name:
      view = new ModelView(view);
      break;

    case ViewType.Media.name:
      view = new MediaView(view);
      break;

    default:
      view = new View(view);
  }

  return view;
}
function filterViewItem(item) {
  var flag;

  switch (item.type.name) {
    case ViewItemType.Nav.name:
      flag = item.viewId == null || isNavMove(item) || StateService.state.navigable;
      break;

    default:
      flag = true;
  }

  return flag;
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
}
function isNavMove(item) {
  return !isValidText(item.title) && !isValidText(item.abstract);
}
function isValidText(text) {
  return text && text.length > 0;
}var EXT_IMAGE = ['jpeg', 'jpg', 'png', 'hdr'];
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
    name: 'publisher-stream',
    file: 'publisherStream'
  },
  // valore fisso di file a ‘publisherStream’ e folder string.empty
  AttendeeStream: {
    id: 5,
    name: 'next-attendee-stream',
    file: 'nextAttendeeStream'
  },
  // valore fisso di file a ‘nextAttendeeStream’ e folder string.empty
  PublisherScreen: {
    id: 6,
    name: 'publisher-screen',
    file: 'publisherScreen'
  },
  // valore fisso di file a ‘publisherScreen’ e folder string.empty
  AttendeeScreen: {
    id: 7,
    name: 'attendee-screen',
    file: 'attendeeScreen'
  },
  // valore fisso di file a ‘attendeeScreen’ e folder string.empty
  SmartDeviceStream: {
    id: 8,
    name: 'smart-device-stream',
    file: 'smartDeviceStream'
  } // valore fisso di file a smartDeviceStream e folder string.empty

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
  } // PublisherScreen: { id: 5, name: 'PublisherScreen', ids: [6] },
  // AttendeeScreen: { id: 6, name: 'AttendeeScreen', ids: [7] },

};

if (environment.flags.editorAssetScreen) {
  AssetGroupType.PublisherScreen = {
    id: 5,
    name: 'PublisherScreen',
    ids: [6]
  };
  AssetGroupType.AttendeeScreen = {
    id: 6,
    name: 'AttendeeScreen',
    ids: [7]
  };
}

AssetGroupType.SmartDevice = {
  id: 7,
  name: 'Smart Device',
  ids: [8]
};
var STREAM_TYPES = [AssetType.PublisherStream.name, AssetType.AttendeeStream.name, AssetType.PublisherScreen.name, AssetType.AttendeeScreen.name, AssetType.SmartDeviceStream.name];
function assetIsStream(asset) {
  return asset && STREAM_TYPES.indexOf(asset.type.name) !== -1;
}
function assetTypeById(id) {
  var type = Object.keys(AssetType).reduce(function (p, key) {
    var type = AssetType[key];
    return type.id === id ? type : p;
  }, null);
  return type; // return Object.keys(AssetType).map(x => AssetType[x]).find(x => x.id === id);
}
function assetGroupTypeById(id) {
  var type = Object.keys(AssetGroupType).reduce(function (p, key) {
    var type = AssetGroupType[key];
    return type.id === id ? type : p;
  }, null);
  return type; // return Object.keys(AssetGroupType).map(x => AssetGroupType[x]).find(x => x.id === id);
}
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
  var groupType = assetGroupTypeById(groupTypeId);
  var type = assetTypeById(groupType.ids[0]);
  var file = type.file;
  var asset = {
    type: type,
    folder: '',
    file: file
  }; // console.log('assetPayloadFromGroupTypeId', asset);

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
  }], [{
    key: "defaultMediaAsset",
    get: function get() {
      var asset = {
        id: -1,
        type: {
          id: AssetType.Image,
          name: 'image'
        },
        folder: '/textures/grid/',
        file: 'grid.jpg'
      };
      return asset;
    }
  }]);

  return Asset;
}();

_defineProperty(Asset, "allowedProps", ['id', 'type', 'folder', 'file', 'linkedPlayId', 'chromaKeyColor', 'autoplay', 'loop']);

function mapAsset(asset) {
  switch (asset.type.name) {
    default:
      asset = new Asset(asset);
  }

  return asset;
}var LanguageService = /*#__PURE__*/function () {
  function LanguageService() {}

  LanguageService.getDefaultLanguages = function getDefaultLanguages() {
    return environment.alternates || [];
  };

  LanguageService.getDefaultLanguage = function getDefaultLanguage() {
    return environment.defaultLanguage || (this.languages ? this.languages[0].lang : null);
  };

  LanguageService.setLanguage = function setLanguage(language) {
    this.selectedLanguage = language.lang;
  };

  LanguageService.setLanguage$ = function setLanguage$(language) {
    var _this = this;

    return rxjs.from(fetch(language.href).then(function (response) {
      return response.text();
    })).pipe(operators.tap(function (html) {
      // console.log('html', html);
      var labelsMatch = /(window\.labels[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*=[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\n*[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\{((\{[\s\S]+?\})|[\s\S])+?\})/gm.exec(html);

      if (labelsMatch) {
        // console.log('labels', labelsMatch[0]);
        new Function(labelsMatch[0]).call(window);
        LabelPipe.setLabels();
      }

      var bhereMatch = /(window\.bhere[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*=[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\n*[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\{((\{[\s\S]+?\})|[\s\S])+?\})/gm.exec(html);

      if (bhereMatch) {
        // console.log('bhere', bhereMatch[0]);
        var data = {};
        new Function(bhereMatch[0].replace('window', 'this')).call(data);

        if (data.bhere) {
          Utils.merge(environment, data.bhere);
        }
      }

      LocationService.replace(_this.activeLanguage.href, language.href); // console.log(window.labels);

      _this.selectedLanguage = language.lang;
    }));
  };

  LanguageService.toggleLanguages = function toggleLanguages() {
    this.showLanguages = !this.showLanguages;
    this.pushChanges();
  };

  _createClass(LanguageService, null, [{
    key: "hasLanguages",
    get: function get() {
      return this.languages.length > 1;
    }
  }, {
    key: "activeLanguage",
    get: function get() {
      var _this2 = this;

      return this.languages.find(function (language) {
        return language.lang === _this2.selectedLanguage;
      });
    }
  }]);

  return LanguageService;
}();

_defineProperty(LanguageService, "languages", LanguageService.getDefaultLanguages());

_defineProperty(LanguageService, "defaultLanguage", LanguageService.getDefaultLanguage());

_defineProperty(LanguageService, "selectedLanguage", LanguageService.defaultLanguage);var ViewService = /*#__PURE__*/function () {
  function ViewService() {}

  ViewService.data$ = function data$() {
    if (!this.data$_) {
      var dataUrl = (environment.flags.production ? '/api/view' : './api/data.json') + '?lang=' + LanguageService.selectedLanguage;
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
    var viewId = LocationService.has('viewId') ? parseInt(LocationService.get('viewId')) : null;
    var embedViewId = LocationService.has('embedViewId') ? parseInt(LocationService.get('embedViewId')) : null;
    var firstViewId = views.length ? views[0].id : null;
    var initialViewId = embedViewId || viewId || firstViewId;
    this.action$_.next({
      viewId: initialViewId
    });
    return this.action$_.pipe(operators.distinctUntilChanged(function (a, b) {
      return a.viewId === b.viewId;
    }), operators.map(function (action) {
      var view = data.views.find(function (view) {
        return view.id === action.viewId;
      });

      if (view) {
        view.keepOrientation = action.keepOrientation || false;
      } // console.log('ViewService.view$', action.viewId, action.keepOrientation);


      return view || _this.getWaitingRoom(data);
    }));
  };

  ViewService.hostedView$ = function hostedView$(data) {
    var _this2 = this;

    var waitingRoom = this.getWaitingRoom(data);
    return rxjs.combineLatest([this.view$(data), this.hosted$()]).pipe(operators.map(function (datas) {
      var view = datas[0];
      var hosted = datas[1];
      return hosted ? view : waitingRoom;
    }), operators.tap(function (view) {
      _this2.view = view;

      if (view.id !== waitingRoom.id) {
        LocationService.set('viewId', view.id);
        var prefetchAssets = ViewService.getPrefetchAssets(view, data);
        view.prefetchAssets = prefetchAssets;
      }
    }));
  };

  ViewService.editorView$ = function editorView$(data) {
    var _this3 = this;

    var waitingRoom = this.getWaitingRoom(data);
    return this.view$(data, true).pipe(operators.tap(function (view) {
      _this3.view = view;

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

  ViewService.getPrefetchAssets = function getPrefetchAssets(view, data) {
    var assets = view.items // filter nav items
    .filter(function (x) {
      return x.type.name === ViewItemType.Nav.name && x.viewId != null;
    }) // map to view
    .map(function (x) {
      return data.views.find(function (v) {
        return v.id === x.viewId;
      });
    }) // filter view with image
    .filter(function (v) {
      return v && v.asset && v.asset.type.name === AssetType.Image.name;
    }) // map to asset
    .map(function (v) {
      return environment.getPath(v.asset.folder + v.asset.file);
    }); // console.log('ViewService.getPrefetchAssets', assets);

    return assets;
  };

  _createClass(ViewService, null, [{
    key: "action",
    // action: { viewId:number, keepOrientation:boolean };
    set: function set(action) {
      this.action$_.next(action);
    },
    get: function get() {
      return this.action$_.getValue();
    } // static viewId$_ = new BehaviorSubject(null);

  }, {
    key: "viewId",
    set: function set(viewId) {
      this.action$_.next({
        viewId: viewId,
        keepOrientation: false
      });
    },
    get: function get() {
      var action = this.action$_.getValue();
      return action ? action.viewId : null;
    }
  }, {
    key: "view",
    get: function get() {
      return this.view_;
    },
    set: function set(view) {
      this.view_ = view;
    }
  }]);

  return ViewService;
}();

_defineProperty(ViewService, "action$_", new rxjs.BehaviorSubject(null));

_defineProperty(ViewService, "view_", null);var MediaLoaderEvent = function MediaLoaderEvent(loader) {
  this.loader = loader;
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
var MediaLoaderDisposeEvent = /*#__PURE__*/function (_MediaLoaderEvent3) {
  _inheritsLoose(MediaLoaderDisposeEvent, _MediaLoaderEvent3);

  function MediaLoaderDisposeEvent() {
    return _MediaLoaderEvent3.apply(this, arguments) || this;
  }

  return MediaLoaderDisposeEvent;
}(MediaLoaderEvent);
var MediaLoaderTimeUpdateEvent = /*#__PURE__*/function (_MediaLoaderEvent4) {
  _inheritsLoose(MediaLoaderTimeUpdateEvent, _MediaLoaderEvent4);

  function MediaLoaderTimeUpdateEvent() {
    return _MediaLoaderEvent4.apply(this, arguments) || this;
  }

  return MediaLoaderTimeUpdateEvent;
}(MediaLoaderEvent);
var MediaLoaderTimeSetEvent = /*#__PURE__*/function (_MediaLoaderEvent5) {
  _inheritsLoose(MediaLoaderTimeSetEvent, _MediaLoaderEvent5);

  function MediaLoaderTimeSetEvent() {
    return _MediaLoaderEvent5.apply(this, arguments) || this;
  }

  return MediaLoaderTimeSetEvent;
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

  MediaLoader.isStream = function isStream(item) {
    return assetIsStream(item.asset);
  };

  MediaLoader.isMutedStream = function isMutedStream(item) {
    var isMutedStream = false;

    switch (item.asset.type.name) {
      case AssetType.PublisherStream.name:
        isMutedStream = StateService.state.role === RoleType.Publisher;
        break;

      case AssetType.AttendeeStream.name:
        isMutedStream = StateService.state.role === RoleType.Attendee;
        break;

      case AssetType.PublisherScreen.name:
        isMutedStream = true;
        break;

      case AssetType.AttendeeScreen.name:
        isMutedStream = true;
        break;

      case AssetType.SmartDeviceStream.name:
        isMutedStream = StateService.state.role === RoleType.SmartDevice;
        break;
    } // console.log('isMutedStream', isMutedStream, item.asset.type.name, AssetType.PublisherStream.name, StateService.state.role, RoleType.Publisher);


    return isMutedStream;
  };

  MediaLoader.isPublisherStream = function isPublisherStream(item) {
    return item.asset && item.asset.type.name === AssetType.PublisherStream.name;
  };

  MediaLoader.isAttendeeStream = function isAttendeeStream(item) {
    return item.asset && item.asset.type.name === AssetType.AttendeeStream.name;
  };

  MediaLoader.isSmartDeviceStream = function isSmartDeviceStream(item) {
    return item.asset && item.asset.type.name === AssetType.SmartDeviceStream.name;
  };

  MediaLoader.isPublisherScreen = function isPublisherScreen(item) {
    return item.asset && item.asset.type.name === AssetType.PublisherScreen.name;
  };

  MediaLoader.isAttendeeScreen = function isAttendeeScreen(item) {
    return item.asset && item.asset.type.name === AssetType.AttendeeScreen.name;
  };

  _createClass(MediaLoader, [{
    key: "isVideo",
    get: function get() {
      return MediaLoader.isVideo(this.item);
    }
  }, {
    key: "isStream",
    get: function get() {
      return MediaLoader.isStream(this.item);
    }
  }, {
    key: "isMutedStream",
    get: function get() {
      return MediaLoader.isMutedStream(this.item);
    }
  }, {
    key: "isPublisherStream",
    get: function get() {
      return MediaLoader.isPublisherStream(this.item);
    }
  }, {
    key: "isAttendeeStream",
    get: function get() {
      return MediaLoader.isAttendeeStream(this.item);
    }
  }, {
    key: "isSmartDeviceStream",
    get: function get() {
      return MediaLoader.isSmartDeviceStream(this.item);
    }
  }, {
    key: "isPublisherScreen",
    get: function get() {
      return MediaLoader.isPublisherScreen(this.item);
    }
  }, {
    key: "isAttendeeScreen",
    get: function get() {
      return MediaLoader.isAttendeeScreen(this.item);
    }
  }, {
    key: "isPlayableVideo",
    get: function get() {
      return this.isVideo; // && !this.item.asset.autoplay;
    }
  }, {
    key: "isAutoplayVideo",
    get: function get() {
      return this.isStream; // || (this.isVideo && (this.item.asset.autoplay != null));
    }
  }, {
    key: "muted",
    get: function get() {
      return this.muted_;
    },
    set: function set(muted) {
      this.muted_ = muted; // console.log('MediaLoader.muted', muted, this.video);

      if (this.video && this.isVideo) {
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
    var texture; // console.log('MediaLoader.load', item, this.isStream);

    if (this.isStream && item.streamId) {
      var streamId = item.streamId;
      var video = document.querySelector("#stream-" + streamId + " video"); // document.querySelector(`#stream-remote-${streamId} video`) || document.querySelector(`#stream-local-${streamId} video`);

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

      var isMutedStream = this.isMutedStream;
      video.crossOrigin = 'anonymous';
      video.volume = isMutedStream ? 0 : 1;
      video.muted = isMutedStream;

      if (video.readyState >= video.HAVE_FUTURE_DATA) {
        onCanPlay();
      } else {
        video.addEventListener('canplay', onCanPlay);
      }
    } else if (this.isVideo) {
      // create the video element
      var autoplay = item.asset && item.asset.autoplay || false;
      var loop = item.asset && item.asset.loop || false;

      var _video = this.video = document.createElement('video');

      _video.crossOrigin = 'anonymous';
      _video.preload = 'metadata';
      _video.volume = 0.8;
      _video.muted = autoplay;
      _video.playsInline = true;
      _video.loop = loop;

      var _onCanPlay = function _onCanPlay() {
        // console.log('MediaLoader', 'onCanPlay');
        _video.oncanplay = null;
        texture = new THREE.VideoTexture(_video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.mapping = THREE.UVMapping;
        texture.format = THREE.RGBFormat; // texture.image.width = video.videoWidth;
        // texture.image.height = video.videoHeight;

        texture.needsUpdate = true;

        if (typeof callback === 'function') {
          callback(texture, _this2);
        }

        if (autoplay) {
          _this2.play();
        } else {
          _video.pause();
        }
      };

      var onTimeUpdate = function onTimeUpdate() {
        MediaLoader.events$.next(new MediaLoaderTimeUpdateEvent(_this2));
      };

      var onEnded = function onEnded() {
        if (!loop) {
          MediaLoader.events$.next(new MediaLoaderPauseEvent(_this2));
        }
      };

      _video.oncanplay = _onCanPlay;
      _video.ontimeupdate = onTimeUpdate;
      _video.onended = onEnded;
      _video.src = MediaLoader.getPath(item);

      _video.load(); // must call after setting/changing source

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
      this.video.muted = this.muted_;
      this.video.play().then(function () {
        // console.log('MediaLoader.play.success', this.item.asset.file);
        if (!silent) {
          MediaLoader.events$.next(new MediaLoaderPlayEvent(_this3));
        }
      }, function (error) {
        console.log('MediaLoader.play.error', _this3.item.asset.file, error);
      });
    }
  };

  _proto.pause = function pause(silent) {
    // console.log('MediaLoader.pause');
    if (this.video && this.isVideo) {
      this.video.muted = true;
      this.video.pause();

      if (!silent) {
        MediaLoader.events$.next(new MediaLoaderPauseEvent(this));
      }
    }
  };

  _proto.toggle = function toggle() {
    // console.log('MediaLoader.toggle', this.video);
    if (this.video && this.isVideo) {
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
    this.pause(true);

    if (this.isVideo && this.video) {
      this.video.ontimeupdate = null;
      this.video.onended = null;
      MediaLoader.events$.next(new MediaLoaderDisposeEvent(this));
    }

    delete this.video;
  };

  _createClass(MediaLoader, [{
    key: "progress",
    get: function get() {
      if (this.video) {
        return this.video.currentTime / this.video.duration;
      } else {
        return 0;
      }
    },
    set: function set(progress) {
      if (this.video) {
        var currentTime = this.video.duration * progress;

        if (this.video.seekable.length > progress && this.video.currentTime !== currentTime) {
          // console.log('MediaLoader', 'progress', progress, 'currentTime', currentTime, 'duration', this.video.duration, 'seekable', this.video.seekable);
          this.video.currentTime = currentTime;
          MediaLoader.events$.next(new MediaLoaderTimeSetEvent(this));
        }
      }
    }
  }]);

  return MediaLoader;
}();
MediaLoader.events$ = new rxjs.ReplaySubject(1);var XRStatus = {
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
    this.platform = DeviceService.platform;
    this.state = {};
    this.hosted = null;
    this.data = null;
    this.views = null;
    this.view = null;
    this.form = null;
    this.local = null;
    this.screen = null;
    this.remoteScreen_ = null; // this.media = null;

    this.hasScreenViewItem = false;
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

    if (this.isEmbed) {
      UserService.temporaryUser$(RoleType.Embed).pipe(operators.first()).subscribe(function (user) {
        _this2.initWithUser(user);
      });
    } else {
      UserService.me$().pipe(operators.first()).subscribe(function (user) {
        _this2.initWithUser(user); // this.userGuard(user);

      });
    }
  };

  _proto.userGuard = function userGuard(user) {
    var linkRole = this.getLinkRole();

    if (user && (!linkRole || user.type === linkRole)) {
      this.initWithUser(user);
    } else {
      this.initWithUser({
        type: linkRole
      });
    }
  };

  _proto.userGuardRedirect = function userGuardRedirect(user) {
    var linkRole = this.getLinkRole();

    if (user && (!linkRole || linkRole === user.type)) {
      this.initWithUser(user);
    } else if (linkRole === RoleType.Publisher || linkRole === RoleType.Attendee) {
      window.location.href = environment.url.access;
    } else {
      this.initWithUser({
        type: linkRole
      });
    }
  };

  _proto.setNextStatus = function setNextStatus() {
    var status = AgoraStatus.Idle;
    var state = StateService.state;

    if (state.role === RoleType.SmartDevice) {
      state.name = state.name || 'Smart Device';
    }

    if (!state.checklist) {
      status = AgoraStatus.Checklist;
    } else if (!state.link) {
      status = AgoraStatus.Link;
    } else if (!state.user.id && (state.role === RoleType.Publisher || state.role === RoleType.Attendee)) {
      status = AgoraStatus.Login;
    } else if (!state.name) {
      status = AgoraStatus.Name;
    } else if (state.role !== RoleType.Viewer && state.role !== RoleType.SmartDevice) {
      status = AgoraStatus.Device;
    } else {
      status = AgoraStatus.ShouldConnect;
    }

    StateService.patchState({
      status: status
    });
    return status;
  };

  _proto.initWithUser = function initWithUser(user) {
    var _this3 = this;

    console.log('initWithUser', user);
    var link = LocationService.get('link') || null;
    var role = this.getLinkRole() || (user ? user.type : null);
    user = user || {
      type: role
    };

    if (role !== user.type) {
      user = {
        type: role
      };
    }

    var mode = UserService.getMode(role);
    var name = LocationService.get('name') || (user.firstName && user.lastName ? user.firstName + " " + user.lastName : null);
    var checklist = LocalStorageService.get('checklist') || null;
    var hosted = role === RoleType.Publisher ? true : false;
    var live = role === RoleType.SelfService || role === RoleType.Embed || DEBUG ? false : true;
    var navigable = this.isNavigable;
    var state = {
      user: user,
      role: role,
      mode: mode,
      name: name,
      checklist: checklist,
      link: link,
      channelName: environment.channelName,
      uid: null,
      status: AgoraStatus.Idle,
      connecting: false,
      connected: false,
      controlling: false,
      spying: false,
      silencing: false,
      hosted: hosted,
      live: live,
      navigable: navigable,
      cameraMuted: false,
      audioMuted: false
    };
    StateService.state = state;
    StateService.state$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (state) {
      _this3.state = state;
      _this3.hosted = state.hosted;

      _this3.pushChanges(); // console.log(state);

    });
    this.initAgora();
  };

  _proto.viewObserver$ = function viewObserver$() {
    var _this4 = this;

    return ViewService.data$().pipe(operators.switchMap(function (data) {
      _this4.data = data;
      _this4.views = data.views.filter(function (x) {
        return x.type.name !== 'waiting-room';
      });
      return ViewService.hostedView$(data);
    }),
    /*
    tap(view => {
    	this.view = null;
    	this.pushChanges();
    }),
    delay(1),
    */
    operators.tap(function (view) {
      // console.log('AgoraComponent.viewObserver$', view);
      // !!! move navToView to user action?
      if (_this4.agora) {
        _this4.agora.navToView(view.id, view.keepOrientation);
      }

      _this4.view = view;
      _this4.hasScreenViewItem = view.items.find(function (x) {
        return MediaLoader.isPublisherScreen(x) || MediaLoader.isAttendeeScreen(x);
      }) != null;

      _this4.pushChanges();
    }));
  };

  _proto.load = function load(callback) {
    this.viewObserver$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (view) {
      console.log('AgoraComponent.viewObserver$', view);

      if (typeof callback === 'function') {
        callback();
      }
    });
  };

  _proto.loadAndConnect = function loadAndConnect(preferences) {
    var _this5 = this;

    this.load(function () {
      _this5.connect(preferences);
    });
  };

  _proto.initAgora = function initAgora() {
    var _this6 = this;

    var agora = null;

    if (this.state.role === RoleType.SelfService || this.state.role === RoleType.Embed || DEBUG) {
      this.load(function () {
        StateService.patchState({
          status: AgoraStatus.Connected,
          hosted: true
        });
      });
    } else {
      agora = this.agora = AgoraService.getSingleton();
      var role = this.getLinkRole();
      var status = this.setNextStatus(); // console.log('initAgora', status, role);
    }

    StreamService.local$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (local) {
      // console.log('AgoraComponent.local', local);
      _this6.local = local;

      _this6.pushChanges();
    });
    StreamService.screen$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (screen) {
      // console.log('AgoraComponent.screen', screen);
      if (_this6.screen === _this6.remoteScreen) {
        _this6.remoteScreen = null;
      }

      _this6.screen = screen;
      _this6.remoteScreen = screen || _this6.remoteScreen;

      _this6.pushChanges();
    });
    StreamService.orderedRemotes$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (remotes) {
      _this6.remotes = [];
      _this6.remoteScreen = _this6.screen;
      remotes.forEach(function (x) {
        if (x.clientInfo && x.clientInfo.screenUid === x.getId()) {
          _this6.remoteScreen = x;
        } else {
          _this6.remotes.push(x);
        }
      }); // console.log('AgoraComponent.remotes', this.remotes, this.remoteScreen, remotes.map(x => `${x.clientInfo ? x.clientInfo.uid : 'null'}-${x.clientInfo ? x.clientInfo.screenUid : 'null'}`).join(','));

      _this6.pushChanges();
    });
    /*
    MediaLoader.events$.pipe(
    	tap(event => {
    		if (event instanceof MediaLoaderPlayEvent) {
    			this.media = event.loader;
    			// this.pushChanges();
    		} else if (event instanceof MediaLoaderDisposeEvent) {
    			if (this.media === event.loader) {
    				this.media = null;
    				// this.pushChanges();
    			}
    		}
    		// console.log('AgoraComponent.MediaLoader.events$', event);
    	}),
    	takeUntil(this.unsubscribe$)
    ).subscribe();
    */

    MessageService.out$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (message) {
      // console.log('AgoraComponent.message', message);
      switch (message.type) {
        case MessageType.RequestPeerInfo:
          message.type = MessageType.RequestPeerInfoResult;
          message.clientInfo = {
            role: StateService.state.role,
            name: StateService.state.name,
            uid: StateService.state.uid,
            screenUid: StateService.state.screenUid,
            controllingId: StateService.state.controlling
          };
          MessageService.sendBack(message);
          break;

        case MessageType.RequestControl:
          // console.log('AgoraComponent', 'MessageType.RequestControlAccepted');
          message.type = MessageType.RequestControlAccepted;
          MessageService.sendBack(message);
          StateService.patchState({
            controlling: message.controllingId
          });

          if (_this6.agora) {
            _this6.agora.sendControlRemoteRequestInfo(message.controllingId);
          }

          break;

        case MessageType.RemoteSilencing:
          StateService.patchState({
            silencing: message.silencing
          });

          _this6.setAudio(message.silencing);

          break;

        case MessageType.NavToView:
          _this6.onRemoteNavTo(message);

          break;

        case MessageType.NavInfo:
          _this6.hidePanels();

          StateService.patchState({
            showNavInfo: message.showNavInfo
          });
          break;

        case MessageType.AddLike:
          ViewService.setViewLike$(message).pipe(operators.first()).subscribe(function (view) {
            return _this6.showLove(view);
          });
          break;

        case MessageType.ChatMessage:
          if (!StateService.state.chat) {
            StateService.patchState({
              chatDirty: true
            });
          }

          break;
      }
    });
    MessageService.in$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (message) {
      if (agora) {
        agora.sendMessage(message);
      }
    });
    this.fullscreen$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe();

    if (agora && StateService.state.status === AgoraStatus.ShouldConnect) {
      this.loadAndConnect();
    }
  };

  _proto.onChecked = function onChecked(checklist) {
    // console.log('AgoraComponent.onChecked', checklist);
    StateService.patchState({
      checklist: true
    });
    this.setNextStatus();
  };

  _proto.onLink = function onLink(link) {
    var role = this.getLinkRole();
    var mode = UserService.getMode(role);
    var user = StateService.state.user;

    if ((role === RoleType.Publisher || role === RoleType.Attendee) && (!user.id || user.type !== role)) {
      StateService.patchState({
        link: link,
        role: role,
        mode: mode,
        status: AgoraStatus.Login
      });
    } else if (StateService.state.name) {
      if (role === RoleType.Viewer || role === RoleType.SmartDevice) {
        StateService.patchState({
          link: link,
          role: role,
          mode: mode
        });
        this.loadAndConnect();
      } else {
        StateService.patchState({
          link: link,
          role: role,
          mode: mode,
          status: AgoraStatus.Device
        });
      }
    } else {
      StateService.patchState({
        link: link,
        role: role,
        mode: mode,
        status: AgoraStatus.Name
      });
    }
  };

  _proto.onLogin = function onLogin(user) {
    var name = StateService.state.name || (user.firstName && user.lastName ? user.firstName + " " + user.lastName : null);

    if (name) {
      StateService.patchState({
        user: user,
        name: name,
        status: AgoraStatus.Device
      });
    } else {
      StateService.patchState({
        user: user,
        status: AgoraStatus.Name
      });
    }
  };

  _proto.onName = function onName(name) {
    if (StateService.state.role === RoleType.Viewer || StateService.state.role === RoleType.SmartDevice) {
      StateService.patchState({
        name: name
      });
      this.loadAndConnect();
    } else {
      StateService.patchState({
        name: name,
        status: AgoraStatus.Device
      });
    }
  };

  _proto.onEnter = function onEnter(preferences) {
    this.loadAndConnect(preferences);
  };

  _proto.connect = function connect(preferences) {
    this.agora.connect$(preferences).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(); // console.log('AgoraComponent.connect', this.state.role);

    if (this.state.role === RoleType.SelfService) {
      GtmService.push({
        action: 'b-here-tour',
        userType: this.state.role
      });
    } else if (this.state.role === RoleType.Embed) {
      GtmService.push({
        action: 'b-here-embed',
        userType: this.state.role
      });
    } else {
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
        // window.location.href = window.location.href;
        window.location.replace(window.location.href);
      }, console.log);
    } else {
      this.patchState({
        connecting: false,
        connected: false
      });
    }
  };

  _proto.onNavTo = function onNavTo(navItem) {
    var viewId = navItem.viewId;
    var view = this.data.views.find(function (x) {
      return x.id === viewId;
    });

    if (view) {
      // console.log('AgoraComponent.onNavTo', navItem, view);
      ViewService.action = {
        viewId: viewId,
        keepOrientation: navItem.keepOrientation
      };
    }
  };

  _proto.onRemoteNavTo = function onRemoteNavTo(message) {
    var viewId = message.viewId;
    var gridIndex = message.gridIndex;

    if (viewId && ViewService.viewId !== viewId) {
      var view = this.data.views.find(function (x) {
        return x.id === viewId;
      });

      if (view) {
        // console.log('AgoraComponent.onRemoteNavTo', message, view);
        ViewService.action = {
          viewId: viewId,
          keepOrientation: message.keepOrientation
        };

        if (gridIndex != null && view instanceof PanoramaGridView) {
          view.index = gridIndex;
        }
      } // console.log('AgoraComponent.onRemoteNavTo', viewId, gridIndex);

    }
  } // !!! why locally?
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

  _proto.setAudio = function setAudio(audioMuted) {
    if (this.agora) {
      this.agora.setAudio(audioMuted);
    } else {
      this.patchState({
        audioMuted: audioMuted
      });
    }
  };

  _proto.toggleScreen = function toggleScreen() {
    if (this.agora) {
      this.agora.toggleScreen();
    } else {
      this.patchState({
        screen: !this.state.screen
      });
    }

    window.dispatchEvent(new Event('resize'));
  };

  _proto.toggleVolume = function toggleVolume() {
    var volumeMuted = !this.state.volumeMuted;
    StateService.patchState({
      volumeMuted: volumeMuted
    });
  };

  _proto.toggleMode = function toggleMode() {
    var mode = this.state.mode === UIMode.VirtualTour ? UIMode.LiveMeeting : UIMode.VirtualTour;
    StateService.patchState({
      mode: mode
    });
    window.dispatchEvent(new Event('resize'));
  };

  _proto.toggleFullScreen = function toggleFullScreen() {
    var _getContext2 = rxcomp.getContext(this),
        node = _getContext2.node;

    var fullScreen = !this.state.fullScreen;

    if (fullScreen) {
      if (node.requestFullscreen) {
        node.requestFullscreen();
      } else if (node.webkitRequestFullscreen) {
        node.webkitRequestFullscreen();
      } else if (node.msRequestFullscreen) {
        node.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } // StateService.patchState({ fullScreen });

  };

  _proto.fullscreen$ = function fullscreen$() {
    return rxjs.fromEvent(document, 'fullscreenchange').pipe(operators.tap(function (_) {
      var fullScreen = document.fullscreenElement != null; // console.log('fullscreen$', fullScreen);

      StateService.patchState({
        fullScreen: fullScreen
      });
    }));
  };

  _proto.toggleChat = function toggleChat() {
    StateService.patchState({
      chat: !this.state.chat,
      chatDirty: false
    });
    window.dispatchEvent(new Event('resize'));
  };

  _proto.toggleNavInfo = function toggleNavInfo() {
    this.hidePanels();

    if (this.agora) {
      this.agora.toggleNavInfo();
    } else {
      this.patchState({
        showNavInfo: !this.state.showNavInfo
      });
    }
  };

  _proto.hidePanels = function hidePanels() {
    this.view.items.forEach(function (item) {
      return item.showPanel = false;
    });
  };

  _proto.onChatClose = function onChatClose() {
    this.patchState({
      chat: false
    });
    window.dispatchEvent(new Event('resize'));
  };

  _proto.onToggleControl = function onToggleControl(remoteId) {
    if (this.agora) {
      this.agora.toggleControl(remoteId);
    } else {
      var controlling = this.state.controlling === remoteId ? null : remoteId;
      this.patchState({
        controlling: controlling,
        spying: false
      });
    }
    /* else {
    this.onRemoteControlRequest({});
    }
    */

  };

  _proto.onToggleSilence = function onToggleSilence() {
    if (this.agora) {
      this.agora.toggleSilence();
    } else {
      this.patchState({
        silencing: !this.state.silencing
      });
    }
  };

  _proto.onToggleSpy = function onToggleSpy(remoteId) {
    if (this.agora) {
      this.agora.toggleSpy(remoteId);
    } else {
      var spying = this.state.spying === remoteId ? null : remoteId;
      this.patchState({
        spying: spying,
        controlling: false
      });
    }
  };

  _proto.addLike = function addLike() {
    var _this7 = this;

    ViewService.viewLike$(this.view).pipe(operators.first()).subscribe(function (view) {
      if (view) {
        _this7.view.liked = true; // view.liked;

        _this7.showLove(view); // this.view.likes = view.likes;
        // this.pushChanges();


        MessageService.send({
          type: MessageType.AddLike,
          viewId: _this7.view.id,
          likes: _this7.view.likes
        });
      }
    });
  };

  _proto.showLove = function showLove(view) {
    var _this8 = this;

    if (view && this.view.id === view.id) {
      var skipTimeout = this.view.showLove;
      this.view.likes = view.likes;
      this.view.showLove = true;
      this.pushChanges();

      if (!skipTimeout) {
        setTimeout(function () {
          _this8.view.showLove = false;

          _this8.pushChanges();
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

  _createClass(AgoraComponent, [{
    key: "isVirtualTourUser",
    get: function get() {
      return [RoleType.Publisher, RoleType.Attendee, RoleType.Streamer, RoleType.Viewer].indexOf(this.state.role) !== -1;
    }
  }, {
    key: "isEmbed",
    get: function get() {
      var isEmbed = window.location.href.indexOf(environment.url.embed) !== -1;
      return isEmbed;
    }
  }, {
    key: "isNavigable",
    get: function get() {
      var embedViewId = LocationService.has('embedViewId') ? parseInt(LocationService.get('embedViewId')) : null;
      var navigable = embedViewId == null;
      return navigable;
    }
  }, {
    key: "uiClass",
    get: function get() {
      var uiClass = {};
      uiClass[this.state.role] = true; // uiClass[this.state.mode] = true;

      uiClass.chat = this.state.chat;
      uiClass.remotes = this.state.mode === UIMode.LiveMeeting;
      uiClass.remoteScreen = this.remoteScreen != null && !this.hasScreenViewItem;
      uiClass.locked = this.locked; // uiClass.media = !uiClass.remotes && this.media;

      return uiClass;
    }
  }, {
    key: "controlled",
    get: function get() {
      return StateService.state.controlling && StateService.state.controlling !== StateService.state.uid;
    }
  }, {
    key: "controlling",
    get: function get() {
      return StateService.state.controlling && StateService.state.controlling === StateService.state.uid;
    }
  }, {
    key: "silencing",
    get: function get() {
      return StateService.state.silencing;
    }
  }, {
    key: "silenced",
    get: function get() {
      return StateService.state.silencing && StateService.state.role === RoleType.Streamer;
    }
  }, {
    key: "spyed",
    get: function get() {
      return StateService.state.spying && StateService.state.spying === StateService.state.uid;
    }
  }, {
    key: "spying",
    get: function get() {
      return StateService.state.spying && StateService.state.spying !== StateService.state.uid;
    }
  }, {
    key: "locked",
    get: function get() {
      return this.controlled || this.spying;
    }
  }, {
    key: "remoteScreen",
    get: function get() {
      return this.remoteScreen_;
    },
    set: function set(remoteScreen) {
      if (this.remoteScreen_ !== remoteScreen) {
        this.remoteScreen_ = remoteScreen;
        setTimeout(function () {
          window.dispatchEvent(new Event('resize'));
        }, 1);
      }
    }
  }]);

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
};var MIME_IMAGE = ['bmp', 'gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'tif', 'tiff', 'webp', 'hdr'];
var MIME_VIDEO = ['mp4', 'avi', 'mpeg', 'ogv', 'ts', 'webm', '3gp', '3g2'];
var MIME_MODEL = ['fbx', 'gltf', 'glb', 'obj', 'usdz'];
var MIME_STREAM = ['publisherStream', 'nextAttendeeStream', 'publisherScreen', 'attendeeScreen'];
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
        case AssetType.AttendeeStream.name:
        case AssetType.PublisherScreen.name:
        case AssetType.AttendeeScreen.name:
        case AssetType.SmartDeviceStream.name:
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

  _proto.onClose = function onClose() {
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
    var supported = [ViewType.Panorama.name, ViewType.PanoramaGrid.name, ViewType.Room3d.name, ViewType.Model.name, ViewType.Media.name].indexOf(viewTypeName) !== -1; // ViewType.WaitingRoom,
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
        supported = [ViewItemType.Nav.name, ViewItemType.Model.name, ViewItemType.Plane.name, ViewItemType.Texture.name].indexOf(viewItemTypeName) !== -1;
        break;

      case ViewType.Model.name:
        supported = [ViewItemType.Nav.name, ViewItemType.Model.name, ViewItemType.Plane.name, ViewItemType.CurvedPlane.name].indexOf(viewItemTypeName) !== -1;
        break;

      case ViewType.Media.name:
        supported = [].indexOf(viewItemTypeName) !== -1;
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
};var AssetService = /*#__PURE__*/function () {
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

  AssetService.localizedAssetCreate$ = function localizedAssetCreate$(lg, asset) {
    return HttpService.post$("/api/" + lg + "/asset", asset).pipe(operators.map(function (asset) {
      return mapAsset(asset);
    }));
  };

  AssetService.localizedAssetUpdate$ = function localizedAssetUpdate$(lg, asset) {
    return HttpService.put$("/api/" + lg + "/asset/" + asset.id, asset).pipe(operators.map(function (asset) {
      return mapAsset(asset);
    }));
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

  AssetService.createOrUpdateAsset$ = function createOrUpdateAsset$(uploads, control) {
    var upload = uploads[0];
    var asset = Asset.fromUrl(upload.url);

    if (control.value && control.value.id) {
      // !!! must check for id
      asset.id = control.value.id;
      return AssetService.assetUpdate$(asset);
    } else {
      return AssetService.assetCreate$(asset);
    }
  };

  AssetService.createOrUpdateLocalizedAsset$ = function createOrUpdateLocalizedAsset$(uploads, control, lg) {
    var upload = uploads[0];
    var asset = Asset.fromUrl(upload.url);

    if (control.value && control.value.id) {
      // !!! must check for id
      asset.id = control.value.id;
      return AssetService.localizedAssetUpdate$(lg, asset);
    } else {
      return AssetService.localizedAssetCreate$(lg, asset);
    }
  };

  AssetService.assetDidChange = function assetDidChange(previous, current) {
    var previousId = null;
    var previousFile = null;
    var currentId = null;
    var currentFile = null;

    if (previous) {
      previousId = previous.id;
      previousFile = previous.file;
    }

    if (current) {
      currentId = current.id;
      currentFile = current.file;
    }

    return previousId !== currentId || previousFile !== currentFile;
  };

  return AssetService;
}();var EditorService = /*#__PURE__*/function () {
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
        name: 'select'
      }); // LabelPipe.transform('select')

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
      mode: UIMode.VirtualTour,
      link: null,
      channelName: environment.channelName,
      uid: null,
      status: AgoraStatus.Connected,
      connecting: false,
      connected: true,
      controlling: false,
      spying: false,
      silencing: false,
      hosted: true,
      live: false,
      navigable: true,
      cameraMuted: false,
      audioMuted: false
    };
    StateService.state = state;
    StateService.state$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (state) {
      _this3.state = state;
      _this3.hosted = state.hosted;

      _this3.pushChanges();
    });
    this.viewObserver$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (view) {// console.log('EditorComponent.viewObserver$', view);
    });
    StreamService.mode = StreamServiceMode.Editor; // this.getUserMedia();
  };

  _proto.viewObserver$ = function viewObserver$() {
    var _this4 = this;

    return EditorService.data$().pipe(operators.switchMap(function (data) {
      _this4.data = data;
      _this4.views = data.views.filter(function (x) {
        return x.type.name !== 'waiting-room';
      });
      return ViewService.editorView$(data);
    }), operators.tap(function (view) {
      _this4.view = null;

      _this4.pushChanges();
    }), operators.delay(1), operators.tap(function (view) {
      _this4.view = view;

      _this4.pushChanges();
    }));
  };

  _proto.onNavTo = function onNavTo(navItem) {
    // console.log('EditorComponent.onNavTo', navItem);
    var viewId = navItem.viewId;
    var view = this.data.views.find(function (x) {
      return x.id === viewId;
    });

    if (view) {
      ViewService.action = {
        viewId: viewId,
        keepOrientation: navItem.keepOrientation
      };
    }
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
  };

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
      this.viewHitSubscription = this.viewHit.pipe(operators.first()).subscribe(function (event) {
        return callback(event);
      });
    }
  };

  _proto.onDragEnd = function onDragEnd(event) {
    var _this5 = this;

    EditorService.inferItemUpdate$(this.view, event.item).pipe(operators.first()).subscribe(function (response) {
      // console.log('EditorComponent.onDragEnd.inferItemUpdate$.success', response);
      _this5.pushChanges();
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
      var selectedItem;
      this.view.items.forEach(function (item) {
        return item.showPanel = false;
      });
      this.view.items.forEach(function (item) {
        item.selected = item === event.item;
        selectedItem = item.selected ? item : selectedItem;
      });
      this.view.selected = !selectedItem;
      this.pushChanges();

      if (selectedItem) {
        this.aside = true;
        this.pushChanges();
        window.dispatchEvent(new Event('resize'));
      }
    }
  };

  _proto.onOpenModal = function onOpenModal(modal, data) {
    var _this6 = this;

    ModalService.open$({
      src: environment.template.modal[modal.type][modal.value],
      data: data
    }).pipe(operators.first()).subscribe(function (event) {
      if (event instanceof ModalResolveEvent) {
        console.log('EditorComponent.onOpenModal.resolve', event);

        switch (modal.type) {
          case 'view':
            switch (modal.value) {
              case ViewType.Panorama.name:
              case ViewType.PanoramaGrid.name:
              case ViewType.Model.name:
              case ViewType.Room3d.name:
              case ViewType.Media.name:
                _this6.data.views.push(event.data);

                _this6.views = _this6.data.views.slice();
                ViewService.viewId = event.data.id;

                _this6.pushChanges();

                break;
            }

            break;

          case 'viewItem':
            switch (modal.value) {
              case ViewItemType.Nav.name:
              case ViewItemType.Plane.name:
              case ViewItemType.CurvedPlane.name:
              case ViewItemType.Model.name:
                var tile = EditorService.getTile(_this6.view);

                if (tile) {
                  var navs = tile.navs || [];
                  navs.push(event.data);
                  Object.assign(tile, {
                    navs: navs
                  });

                  _this6.view.updateCurrentItems();
                } else {
                  var items = _this6.view.items || [];
                  items.push(event.data);
                  Object.assign(_this6.view, {
                    items: items
                  });
                }

                _this6.pushChanges();

                break;
            }

            break;
        }
      }

      _this6.pushChanges();
    });
  };

  _proto.onAsideSelect = function onAsideSelect(event) {
    var _this7 = this;

    // console.log('onAsideSelect', event);
    if (event.value) {
      switch (event.value) {
        case ViewItemType.Nav.name:
        case ViewItemType.Plane.name:
        case ViewItemType.CurvedPlane.name:
          this.onViewHitted(function (hit) {
            _this7.onOpenModal(event, {
              view: _this7.view,
              hit: hit
            });
          });
          ToastService.open$({
            message: 'Click a point on the view'
          });
          break;

        case ViewItemType.Model.name:
          if (event.type === 'viewItem') {
            if (this.view.type.name === ViewType.Model.name) {
              return;
            }

            this.onViewHitted(function (hit) {
              _this7.onOpenModal(event, {
                view: _this7.view,
                hit: hit
              });
            });
            ToastService.open$({
              message: 'Click a point on the view'
            });
          } else {
            this.onOpenModal(event, {
              view: this.view
            });
          }

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
      MessageService.send({
        type: MessageType.SelectItem
      });
      this.pushChanges();
    } else if (event.view && (event.tile || event.tile === null)) {
      event.view.selected = false;
      event.view.tiles.forEach(function (tile) {
        return tile.selected = tile === event.tile;
      });
      MessageService.send({
        type: MessageType.SelectItem
      });
      /*
      // if tile selected
      // send ChangeTile message to world component
      this.orbitService.walk(event.position, (headingLongitude, headingLatitude) => {
      	const item = this.view.getTile(event.indices.x, event.indices.y);
      	if (item) {
      		this.panorama.crossfade(item, this.renderer, (envMap, texture, rgbe) => {
      			// this.scene.background = envMap;
      			this.scene.environment = envMap;
      			this.orbitService.walkComplete(headingLongitude, headingLatitude);
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

      MessageService.send({
        type: MessageType.SelectItem
      });
      this.pushChanges();
    }
  };

  _proto.onAsideUpdate = function onAsideUpdate(event) {
    // console.log('onAsideUpdate', event);
    if (event.item && event.view) {
      this.pushChanges();
    } else if (event.tile && event.view) ; else if (event.view) {
      if (ViewService.viewId !== event.view.id) {
        ViewService.viewId = event.view.id;
      } else {
        var assetDidChange = AssetService.assetDidChange(this.view.asset, event.view.asset);
        Object.assign(this.view, event.view);

        if (assetDidChange) {
          if (typeof this.view.onUpdateAsset === 'function') {
            this.view.onUpdateAsset();
          }
        }

        this.pushChanges();
      }
    }
  };

  _proto.onAsideDelete = function onAsideDelete(event) {
    var _this8 = this;

    // console.log('onAsideDelete', event);
    if (event.item && event.view) {
      EditorService.inferItemDelete$(event.view, event.item).pipe(operators.first()).subscribe(function (response) {
        // console.log('EditorComponent.onAsideDelete.inferItemDelete$.success', response);
        EditorService.inferItemDeleteResult$(event.view, event.item);

        _this8.pushChanges();
      }, function (error) {
        return console.log('EditorComponent.onAsideDelete.inferItemDelete$.error', error);
      });
    } else if (event.view) {
      EditorService.viewDelete$(event.view).pipe(operators.first()).subscribe(function (response) {
        // console.log('EditorComponent.onAsideDelete.viewDelete$.success', response);
        var views = _this8.data.views;
        var index = views.indexOf(event.view);

        if (index !== -1) {
          views.splice(index, 1);
        }

        _this8.data.views = views;
        _this8.views = views.slice();
        ViewService.viewId = _this8.views[0].id; // this.pushChanges();
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
        // console.log('MenuService.getModelMenu$.Views', views);
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

            case ViewType.Media.name:
              name = 'Media';
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

  _createClass(MenuService, null, [{
    key: "active",
    set: function set(active) {
      this.active$.next(active);
    },
    get: function get() {
      return this.active$.getValue();
    }
  }]);

  return MenuService;
}();

_defineProperty(MenuService, "active$", new rxjs.BehaviorSubject(false));

_defineProperty(MenuService, "menu$_", new rxjs.BehaviorSubject([]));var DropService = /*#__PURE__*/function () {
  function DropService() {}

  DropService.drop$ = function drop$(input) {
    if (rxcomp.isPlatformBrowser && input) {
      var body = document.querySelector('body');
      return rxjs.merge(rxjs.fromEvent(body, 'drop'), rxjs.fromEvent(body, 'dragover')).pipe(operators.map(function (event) {
        // console.log('DropService.drop$', event);
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

  DropService.change$ = function change$(input) {
    if (rxcomp.isPlatformBrowser && input) {
      return rxjs.fromEvent(input, 'change').pipe(operators.filter(function (event) {
        return input.files && input.files.length;
      }), operators.map(function (event) {
        return Array.from(input.files);
      }));
    } else {
      return rxjs.EMPTY;
    }
  };

  DropService.asset$ = function asset$(input, previews) {
    var _this = this;

    if (previews === void 0) {
      previews = [];
    }

    return this.change$(input).pipe(operators.switchMap(function (files) {
      previews.length = files.length;
      previews.fill(null); // output.previews = files.map(() => null);

      var uploads$ = files.map(function (file, i) {
        return _this.read$(file, i, previews).pipe(operators.map(function () {
          return file;
        }), operators.switchMap(function (file) {
          return AssetService.upload$([file]);
        }), operators.switchMap(function (uploads) {
          var upload = uploads[0];
          var asset = Asset.fromUrl(upload.url);
          return AssetService.assetCreate$(asset);
        }));
      });
      return rxjs.combineLatest(uploads$);
    }));
  };

  DropService.read$ = function read$(file, i, previews) {
    var _this2 = this;

    if (previews === void 0) {
      previews = [];
    }

    var reader = new FileReader();
    var reader$ = rxjs.fromEvent(reader, 'load').pipe(operators.switchMap(function (event) {
      var blob = event.target.result;
      return _this2.resize$(blob);
    }), operators.tap(function (resized) {
      previews[i] = resized;
    }));
    reader.readAsDataURL(file);
    return reader$;
  };

  DropService.resize$ = function resize$(blob) {
    return rxjs.from(this.resize_(blob));
  };

  DropService.resize_ = function resize_(blob) {
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

      img.onerror = function () {
        reject(blob);
      };

      img.src = blob;
    });
  };

  return DropService;
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

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var input = node.querySelector('input');
    input.setAttribute('accept', this.accept);
    DropService.drop$(input).pipe(operators.takeUntil(this.unsubscribe$)).subscribe();
    DropService.change$(input).pipe(operators.switchMap(function (files) {
      var uploads$ = files.map(function (file, i) {
        return AssetService.upload$([file]).pipe(operators.switchMap(function (uploads) {
          return AssetService.createOrUpdateAsset$(uploads, _this.control);
        }));
      });
      return rxjs.combineLatest(uploads$);
    }), operators.takeUntil(this.unsubscribe$)).subscribe(function (assets) {
      // console.log('ControlAssetComponent.change$', assets);
      _this.control.value = assets[0];
    });
  };

  return ControlAssetComponent;
}(ControlComponent);
ControlAssetComponent.meta = {
  selector: '[control-asset]',
  inputs: ['control', 'label', 'disabled', 'accept'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form\" [class]=\"{ required: control.validators.length, disabled: disabled }\">\n\t\t\t<div class=\"control--head\">\n\t\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t\t</div>\n\t\t\t<div class=\"group--picture\">\n\t\t\t\t<div class=\"group--picture__info\">\n\t\t\t\t\t<span [innerHTML]=\"'browse' | label\"></span>\n\t\t\t\t</div>\n\t\t\t\t<img [lazy]=\"control.value | asset\" [size]=\"{ width: 320, height: 240 }\" *if=\"control.value && control.value.type.name === 'image'\" />\n\t\t\t\t<video [src]=\"control.value | asset\" *if=\"control.value && control.value.type.name === 'video'\"></video>\n\t\t\t\t<input type=\"file\">\n\t\t\t</div>\n\t\t\t<div class=\"file-name\" *if=\"control.value\" [innerHTML]=\"control.value.file\"></div>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
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

    // console.log('ControlMenuComponent.setView', view.id);
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
    // console.log('ControlMenuComponent.onTextDidChange', this.controls.name.value);
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
};// import * as THREE from 'three';
var ORIGIN = new THREE.Vector3();
var Host = /*#__PURE__*/function () {
  function Host() {}

  Host.getDistanceToCamera = function getDistanceToCamera(camera, fov, aspect, size, fitOffset) {
    if (fitOffset === void 0) {
      fitOffset = 0.88;
    }

    var factor = 2 * Math.atan(Math.PI * fov / 360);
    var heightDistance = size.y * camera.zoom / factor;
    var widthDistance = size.x * camera.zoom / factor / aspect;
    var distance = fitOffset * Math.max(heightDistance, widthDistance);
    return distance;
  };

  _createClass(Host, null, [{
    key: "origin",
    get: function get() {
      var host = this.host;

      if (host) {
        var origin = this.origin_;
        origin.set(0, 0, 0);
        var camera = host.renderer.xr.isPresenting ? host.renderer.xr.getCamera(host.camera) : host.camera;
        camera.localToWorld(origin); // return host.cameraGroup.position;
      }

      return this.origin_;
    }
  }]);

  return Host;
}();

_defineProperty(Host, "origin_", new THREE.Vector3());var CurvedPlaneModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(CurvedPlaneModalComponent, _Component);

  function CurvedPlaneModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = CurvedPlaneModalComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var object = this.object;
    var form = this.form = new rxcompForm.FormGroup({
      type: ViewItemType.CurvedPlane,
      position: new rxcompForm.FormControl(object.position.toArray(), rxcompForm.RequiredValidator()),
      rotation: new rxcompForm.FormControl(object.rotation.toArray(), rxcompForm.RequiredValidator()),
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
      // console.log('CurvedPlaneModalComponent.onSubmit', this.view, item);

      EditorService.inferItemCreate$(this.view, item).pipe(operators.first()).subscribe(function (response) {
        // console.log('CurvedPlaneModalComponent.onSubmit.success', response);
        ModalService.resolve(response);
      }, function (error) {
        return console.log('CurvedPlaneModalComponent.onSubmit.error', error);
      });
    } else {
      this.form.touched = true;
    }
  };

  _proto.onClose = function onClose() {
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
    key: "object",
    get: function get() {
      var object = new THREE.Object3D();
      var data = this.data;

      if (data) {
        var position = data.hit.position.clone();
        var normal = data.hit.normal.clone();
        var spherical = data.hit.spherical;

        if (spherical) {
          position.normalize().multiplyScalar(20);
          object.position.copy(position);
          object.lookAt(Host.origin);
        } else {
          object.lookAt(normal);
          object.position.set(position.x, position.y, position.z);
          object.position.add(normal.multiplyScalar(0.01));
        }
      }

      return object;
    }
  }]);

  return CurvedPlaneModalComponent;
}(rxcomp.Component);
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

    var object = this.object;
    var form = this.form = new rxcompForm.FormGroup({
      type: ViewItemType.Model,
      position: new rxcompForm.FormControl(object.position.toArray(), rxcompForm.RequiredValidator()),
      rotation: new rxcompForm.FormControl([0, 0, 0], rxcompForm.RequiredValidator()),
      // [0, -Math.PI / 2, 0],
      // rotation: new FormControl(object.rotation.toArray(), RequiredValidator()), // [0, -Math.PI / 2, 0],
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
      // console.log('ItemModelModalComponent.onSubmit', this.view, item);

      EditorService.inferItemCreate$(this.view, item).pipe(operators.first()).subscribe(function (response) {
        // console.log('ItemModelModalComponent.onSubmit.success', response);
        ModalService.resolve(response);
      }, function (error) {
        return console.log('ItemModelModalComponent.onSubmit.error', error);
      });
    } else {
      this.form.touched = true;
    }
  };

  _proto.onClose = function onClose() {
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
    key: "object",
    get: function get() {
      var object = new THREE.Object3D();
      var data = this.data;

      if (data) {
        var position = data.hit.position.clone();
        var normal = data.hit.normal.clone();
        var spherical = data.hit.spherical;

        if (spherical) {
          position.normalize().multiplyScalar(4);
          object.position.copy(position);
          object.lookAt(Host.origin);
        } else {
          object.lookAt(normal);
          object.position.set(position.x, position.y, position.z);
          object.position.add(normal.multiplyScalar(0.01));
        }
      }

      return object;
    }
  }]);

  return ItemModelModalComponent;
}(rxcomp.Component);
ItemModelModalComponent.meta = {
  selector: '[item-model-modal]'
};var MediaModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(MediaModalComponent, _Component);

  function MediaModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = MediaModalComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.error = null;
    var form = this.form = new rxcompForm.FormGroup({
      type: ViewType.Media,
      name: new rxcompForm.FormControl(null, rxcompForm.RequiredValidator()),
      asset: new rxcompForm.FormControl(null, rxcompForm.RequiredValidator())
    });
    this.controls = form.controls;
    form.changes$.subscribe(function (changes) {
      // console.log('MediaModalComponent.form.changes$', changes, form.valid, form);
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
      }; // console.log('MediaModalComponent.onSubmit.view', view);

      return EditorService.viewCreate$(view).pipe(operators.switchMap(function (view) {
        var item = {
          type: ViewItemType.Plane,
          position: [20, 0, 0],
          rotation: [0, -Math.PI / 2, 0],
          scale: [12, 6.75, 1],
          asset: values.asset
        };
        return EditorService.itemCreate$(view, item).pipe(operators.map(function (item) {
          view.items = [item];
          return view;
        }));
      }), operators.first()).subscribe(function (response) {
        // console.log('MediaModalComponent.onSubmit.success', response);
        ModalService.resolve(response);
      }, function (error) {
        console.log('MediaModalComponent.onSubmit.error', error);
        _this2.error = error;

        _this2.form.reset();
      });
    } else {
      this.form.touched = true;
    }
  };

  _proto.onClose = function onClose() {
    ModalService.reject();
  };

  return MediaModalComponent;
}(rxcomp.Component);
MediaModalComponent.meta = {
  selector: '[media-modal]'
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
      }; // console.log('ModelModalComponent.onSubmit.view', view);

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
        // console.log('ModelModalComponent.onSubmit.success', response);
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

  _proto.onClose = function onClose() {
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

    var object = this.object;
    this.error = null;
    var form = this.form = new rxcompForm.FormGroup({
      type: ViewItemType.Nav,
      title: null,
      abstract: null,
      viewId: new rxcompForm.FormControl(null, rxcompForm.RequiredValidator()),
      keepOrientation: false,
      important: false,
      position: object.position.toArray(),
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
    	name: 'Name',
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
        // console.log('NavModalComponent.onSubmit.success', response);
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

  _proto.onClose = function onClose() {
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
        position = data.hit.position;
      }

      return position;
    }
  }, {
    key: "object",
    get: function get() {
      var object = new THREE.Object3D();
      var data = this.data;

      if (data) {
        var position = data.hit.position.clone();
        var normal = data.hit.normal.clone();
        var spherical = data.hit.spherical;

        if (spherical) {
          // position.normalize().multiplyScalar(4);
          position.normalize();
          object.position.copy(position);
          object.lookAt(Host.origin);
        } else {
          object.lookAt(normal);
          object.position.set(position.x, position.y, position.z);
          object.position.add(normal.multiplyScalar(0.01));
        }
      }

      return object;
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
      this.form.submitted = true; // console.log('PanoramaGridModalComponent.onSubmit', this.form.value);

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
      }); // console.log('PanoramaGridModalComponent.onSubmit', tiles);

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
        // console.log('PanoramaGridModalComponent.onSubmit.success', response);
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

  _proto.onClose = function onClose() {
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
      }; // console.log('PanoramaModalComponent.onSubmit.view', view);

      return EditorService.viewCreate$(view).pipe(operators.first()).subscribe(function (response) {
        // console.log('PanoramaModalComponent.onSubmit.success', response);
        ModalService.resolve(response);
      }, function (error) {
        console.log('PanoramaModalComponent.onSubmit.error', error);
        _this2.error = error;

        _this2.form.reset();
      });
      /*
      const asset = Asset.fromUrl(this.form.value.upload);
      // console.log('PanoramaModalComponent.onSubmit.asset', asset);
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
      		// console.log('PanoramaModalComponent.onSubmit.view', view);
      		return EditorService.viewCreate$(view).pipe(
      			first(),
      		);
      	})
      ).subscribe(response => {
      	// console.log('PanoramaModalComponent.onSubmit.success', response);
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
    	// console.log('EditorService.viewCreate$', data);
    });
    	*/

  };

  _proto.onClose = function onClose() {
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

    var object = this.object;
    var form = this.form = new rxcompForm.FormGroup({
      type: ViewItemType.Plane,
      position: new rxcompForm.FormControl(object.position.toArray(), rxcompForm.RequiredValidator()),
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

  _proto.onClose = function onClose() {
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
    key: "object",
    get: function get() {
      var object = new THREE.Object3D();
      var data = this.data;

      if (data) {
        var position = data.hit.position.clone();
        var normal = data.hit.normal.clone();
        var spherical = data.hit.spherical;

        if (spherical) {
          position.normalize().multiplyScalar(20);
          object.position.copy(position);
          object.lookAt(Host.origin);
        } else {
          object.lookAt(normal);
          object.position.set(position.x, position.y, position.z);
          object.position.add(normal.multiplyScalar(0.01));
        }
      }

      return object;
    }
  }]);

  return PlaneModalComponent;
}(rxcomp.Component);
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

  _proto.onClose = function onClose() {
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
};var Room3DModalComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Room3DModalComponent, _Component);

  function Room3DModalComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Room3DModalComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.error = null;
    var form = this.form = new rxcompForm.FormGroup({
      type: ViewType.Room3d,
      name: new rxcompForm.FormControl(null, rxcompForm.RequiredValidator()),
      asset: new rxcompForm.FormControl(null, rxcompForm.RequiredValidator()) // model: new FormControl(null, RequiredValidator()),

    });
    this.controls = form.controls;
    form.changes$.subscribe(function (changes) {
      // console.log('Room3DModalComponent.form.changes$', changes, form.valid, form);
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
      }; // console.log('Room3DModalComponent.onSubmit.view', view);

      return EditorService.viewCreate$(view).pipe(
      /*
      switchMap(view => {
      	const item = {
      		type: ViewItemType.Model,
      		asset: values.model,
      	};
      	return EditorService.itemCreate$(view, item).pipe(
      		map(item => {
      			view.items = [item];
      			return view;
      		})
      	);
      }),
      */
      operators.first()).subscribe(function (response) {
        // console.log('Room3DModalComponent.onSubmit.success', response);
        ModalService.resolve(response);
      }, function (error) {
        console.log('Room3DModalComponent.onSubmit.error', error);
        _this2.error = error;

        _this2.form.reset();
      });
    } else {
      this.form.touched = true;
    }
  };

  _proto.onClose = function onClose() {
    ModalService.reject();
  };

  return Room3DModalComponent;
}(rxcomp.Component);
Room3DModalComponent.meta = {
  selector: '[room-3d-modal]'
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
    item.autoplay = item.asset && item.asset.type.name === AssetType.Video.name ? item.asset.autoplay : undefined;
    item.loop = item.asset && item.asset.type.name === AssetType.Video.name ? item.asset.loop : undefined;
    item.assetType = assetGroupTypeFromItem(item).id;
    this.doUpdateForm();
    form.changes$.subscribe(function (changes) {
      // console.log('UpdateViewItemComponent.form.changes$', changes);
      _this.doUpdateItem(changes);

      _this.pushChanges();
    });
  };

  _proto.getKeysDidChange = function getKeysDidChange(item, changes) {
    var keys = ['hasChromaKeyColor', 'autoplay', 'loop'];
    return keys.reduce(function (p, c) {
      return p || changes[c] !== item[c];
    }, false);
  };

  _proto.getAssetDidChange = function getAssetDidChange(item, changes) {
    // console.log('UpdateViewItemComponent.getAssetDidChange', item.asset, changes.asset);
    return AssetService.assetDidChange(item.asset, changes.asset);
  };

  _proto.doUpdateItem = function doUpdateItem(changes) {
    var _this2 = this;

    var item = this.item;
    var assetDidChange = this.getAssetDidChange(item, changes) || this.getKeysDidChange(item, changes); // console.log('doUpdateItem.assetDidChange', assetDidChange);

    Object.assign(item, changes);

    if (item.asset) {
      item.asset.chromaKeyColor = item.hasChromaKeyColor ? [0.0, 1.0, 0.0] : null;
      item.asset.autoplay = item.autoplay;
      item.asset.loop = item.loop;
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
          keys = ['id', 'type', 'title?', 'abstract?', 'viewId', 'keepOrientation?', 'important?', 'position', 'asset?', 'link?'];
          break;

        case ViewItemType.Plane.name:
          keys = ['id', 'type', 'position', 'rotation', 'scale', 'assetType?', 'asset?', 'hasChromaKeyColor?', 'autoplay?', 'loop?'];
          break;

        case ViewItemType.CurvedPlane.name:
          keys = ['id', 'type', 'position', 'rotation', 'scale', 'radius', 'height', 'arc', 'assetType?', 'asset?', 'hasChromaKeyColor?', 'autoplay?', 'loop?'];
          break;

        case ViewItemType.Texture.name:
          keys = ['id', 'type', 'assetType?', 'asset?', 'hasChromaKeyColor?', 'autoplay?', 'loop?']; // asset, key no id!!

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
            }); // console.log(control.options);

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

          case 'autoplay':
            _this3.controls[key].value = item.asset && item.asset.autoplay ? true : false;
            break;

          case 'loop':
            _this3.controls[key].value = item.asset && item.asset.loop ? true : false;
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
        console.log('UpdateViewItemComponent.onSubmit.inferItemUpdate$.success', response);
        EditorService.inferItemUpdateResult$(view, item);

        _this5.update.next({
          view: view,
          item: item
        });

        _this5.setTimeout(function () {
          _this5.busy = false;

          _this5.pushChanges();
        });
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

  _proto.clearTimeout = function (_clearTimeout) {
    function clearTimeout() {
      return _clearTimeout.apply(this, arguments);
    }

    clearTimeout.toString = function () {
      return _clearTimeout.toString();
    };

    return clearTimeout;
  }(function () {
    if (this.to) {
      clearTimeout(this.to);
    }
  });

  _proto.setTimeout = function (_setTimeout) {
    function setTimeout(_x) {
      return _setTimeout.apply(this, arguments);
    }

    setTimeout.toString = function () {
      return _setTimeout.toString();
    };

    return setTimeout;
  }(function (callback, msec) {
    if (msec === void 0) {
      msec = 300;
    }

    this.clearTimeout();

    if (typeof callback === 'function') {
      this.to = setTimeout(callback, msec);
    }
  });

  _proto.onDestroy = function onDestroy() {
    this.clearTimeout();
  };

  return UpdateViewItemComponent;
}(rxcomp.Component);
UpdateViewItemComponent.meta = {
  selector: 'update-view-item',
  outputs: ['select', 'update', 'delete'],
  inputs: ['view', 'item'],
  template:
  /* html */
  "\n\t\t<div class=\"group--headline\" [class]=\"{ active: item.selected }\" (click)=\"onSelect($event)\">\n\t\t\t<!-- <div class=\"id\" [innerHTML]=\"item.id\"></div> -->\n\t\t\t<div class=\"icon\">\n\t\t\t\t<svg-icon [name]=\"item.type.name\"></svg-icon>\n\t\t\t</div>\n\t\t\t<div class=\"title\" [innerHTML]=\"getTitle(item)\"></div>\n\t\t\t<svg class=\"icon--caret-down\"><use xlink:href=\"#caret-down\"></use></svg>\n\t\t</div>\n\t\t<form [formGroup]=\"form\" (submit)=\"onSubmit()\" name=\"form\" role=\"form\" novalidate autocomplete=\"off\" *if=\"item.selected\">\n\t\t\t<div class=\"form-controls\">\n\t\t\t\t<div control-text [control]=\"controls.id\" label=\"Id\" [disabled]=\"true\"></div>\n\t\t\t\t<!-- <div control-text [control]=\"controls.type\" label=\"Type\" [disabled]=\"true\"></div> -->\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"item.type.name == 'nav'\">\n\t\t\t\t<div control-text [control]=\"controls.title\" label=\"Title\"></div>\n\t\t\t\t<div control-textarea [control]=\"controls.abstract\" label=\"Abstract\"></div>\n\t\t\t\t<div control-custom-select [control]=\"controls.viewId\" label=\"NavToView\"></div>\n\t\t\t\t<div control-checkbox [control]=\"controls.keepOrientation\" label=\"Keep Orientation\"></div>\n\t\t\t\t<div control-checkbox [control]=\"controls.important\" label=\"Important\"></div>\n\t\t\t\t<div control-vector [control]=\"controls.position\" label=\"Position\" [precision]=\"3\"></div>\n\t\t\t\t<div control-localized-asset [control]=\"controls.asset\" label=\"Image\" accept=\"image/jpeg, image/png\"></div>\n\t\t\t\t<div control-text [control]=\"controls.link.controls.title\" label=\"Link Title\"></div>\n\t\t\t\t<div control-text [control]=\"controls.link.controls.href\" label=\"Link Url\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"item.type.name == 'plane' && view.type.name != 'media'\">\n\t\t\t\t<div control-vector [control]=\"controls.position\" label=\"Position\" [precision]=\"2\"></div>\n\t\t\t\t<div control-vector [control]=\"controls.rotation\" label=\"Rotation\" [precision]=\"3\" [increment]=\"Math.PI / 360\"></div>\n\t\t\t\t<div control-vector [control]=\"controls.scale\" label=\"Scale\" [precision]=\"2\"></div>\n\t\t\t\t<div control-custom-select [control]=\"controls.assetType\" label=\"Asset\" (change)=\"onAssetTypeDidChange($event)\"></div>\n\t\t\t\t<div control-localized-asset [control]=\"controls.asset\" label=\"Localized Image or Video\" accept=\"image/jpeg, video/mp4\" *if=\"controls.assetType.value == 1\"></div>\n\t\t\t\t<div control-checkbox [control]=\"controls.hasChromaKeyColor\" label=\"Use Green Screen\" *if=\"item.asset\"></div>\n\t\t\t\t<div control-checkbox [control]=\"controls.autoplay\" label=\"Autoplay\" *if=\"item.asset && item.asset.type.name === 'video'\"></div>\n\t\t\t\t<div control-checkbox [control]=\"controls.loop\" label=\"Loop\" *if=\"item.asset && item.asset.type.name === 'video'\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"item.type.name == 'plane' && view.type.name == 'media'\">\n\t\t\t\t<div control-vector [control]=\"controls.scale\" label=\"Scale\" [precision]=\"2\"></div>\n\t\t\t\t<div control-localized-asset [control]=\"controls.asset\" label=\"Localized Image or Video\" accept=\"image/jpeg, video/mp4\"></div>\n\t\t\t\t<div control-checkbox [control]=\"controls.autoplay\" label=\"Autoplay\" *if=\"item.asset && item.asset.type.name === 'video'\"></div>\n\t\t\t\t<div control-checkbox [control]=\"controls.loop\" label=\"Loop\" *if=\"item.asset && item.asset.type.name === 'video'\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"item.type.name == 'curved-plane'\">\n\t\t\t\t<div control-vector [control]=\"controls.position\" label=\"Position\" [precision]=\"2\"></div>\n\t\t\t\t<div control-vector [control]=\"controls.rotation\" label=\"Rotation\" [precision]=\"3\" [increment]=\"Math.PI / 360\"></div>\n\t\t\t\t<!-- <div control-vector [control]=\"controls.scale\" label=\"Scale\" [precision]=\"2\" [disabled]=\"true\"></div> -->\n\t\t\t\t<div control-number [control]=\"controls.radius\" label=\"Radius\" [precision]=\"2\"></div>\n\t\t\t\t<div control-number [control]=\"controls.height\" label=\"Height\" [precision]=\"2\"></div>\n\t\t\t\t<div control-number [control]=\"controls.arc\" label=\"Arc\" [precision]=\"0\"></div>\n\t\t\t\t<div control-custom-select [control]=\"controls.assetType\" label=\"Asset\" (change)=\"onAssetTypeDidChange($event)\"></div>\n\t\t\t\t<div control-localized-asset [control]=\"controls.asset\" label=\"Image or Video\" accept=\"image/jpeg, video/mp4\" *if=\"controls.assetType.value == 1\"></div>\n\t\t\t\t<div control-checkbox [control]=\"controls.hasChromaKeyColor\" label=\"Use Green Screen\" *if=\"item.asset\"></div>\n\t\t\t\t<div control-checkbox [control]=\"controls.autoplay\" label=\"Autoplay\" *if=\"item.asset && item.asset.type.name === 'video'\"></div>\n\t\t\t\t<div control-checkbox [control]=\"controls.loop\" label=\"Loop\" *if=\"item.asset && item.asset.type.name === 'video'\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"item.type.name == 'texture'\">\n\t\t\t\t<div control-custom-select [control]=\"controls.assetType\" label=\"Asset\" (change)=\"onAssetTypeDidChange($event)\"></div>\n\t\t\t\t<div control-localized-asset [control]=\"controls.asset\" label=\"Image or Video\" accept=\"image/jpeg, video/mp4\" *if=\"controls.assetType.value == 1\"></div>\n\t\t\t\t<div control-checkbox [control]=\"controls.hasChromaKeyColor\" label=\"Use Green Screen\" *if=\"item.asset\"></div>\n\t\t\t\t<div control-checkbox [control]=\"controls.autoplay\" label=\"Autoplay\" *if=\"item.asset && item.asset.type.name === 'video'\"></div>\n\t\t\t\t<div control-checkbox [control]=\"controls.loop\" label=\"Loop\" *if=\"item.asset && item.asset.type.name === 'video'\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"item.type.name == 'model'\">\n\t\t\t\t<div control-vector [control]=\"controls.position\" label=\"Position\" [precision]=\"2\" *if=\"view.type.name !== 'model'\"></div>\n\t\t\t\t<div control-vector [control]=\"controls.rotation\" label=\"Rotation\" [precision]=\"3\" [increment]=\"Math.PI / 360\" *if=\"view.type.name !== 'model'\"></div>\n\t\t\t\t<div control-model [control]=\"controls.asset\" label=\"Model (.glb)\" accept=\".glb\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"group--cta\">\n\t\t\t\t<button type=\"submit\" class=\"btn--update\" [class]=\"{ busy: busy }\">\n\t\t\t\t\t<span [innerHTML]=\"'update' | label\"></span>\n\t\t\t\t</button>\n\t\t\t\t<button type=\"button\" class=\"btn--remove\" (click)=\"onRemove($event)\">\n\t\t\t\t\t<span [innerHTML]=\"'remove' | label\"></span>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</form>\n\t"
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
    }); // console.log('UpdateViewTileComponent.onInit', this.view, this.tile);
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
      this.setTimeout(function () {
        _this2.busy = false;

        _this2.pushChanges();
      });
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

  _proto.clearTimeout = function (_clearTimeout) {
    function clearTimeout() {
      return _clearTimeout.apply(this, arguments);
    }

    clearTimeout.toString = function () {
      return _clearTimeout.toString();
    };

    return clearTimeout;
  }(function () {
    if (this.to) {
      clearTimeout(this.to);
    }
  });

  _proto.setTimeout = function (_setTimeout) {
    function setTimeout(_x) {
      return _setTimeout.apply(this, arguments);
    }

    setTimeout.toString = function () {
      return _setTimeout.toString();
    };

    return setTimeout;
  }(function (callback, msec) {
    if (msec === void 0) {
      msec = 300;
    }

    this.clearTimeout();

    if (typeof callback === 'function') {
      this.to = setTimeout(callback, msec);
    }
  });

  _proto.onDestroy = function onDestroy() {
    this.clearTimeout();
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
    var form = this.form = new rxcompForm.FormGroup();
    this.controls = form.controls;
    this.doUpdateForm();
    form.changes$.subscribe(function (changes) {
      // console.log('UpdateViewComponent.form.changes$', changes);
      _this.doUpdateView(changes);

      _this.pushChanges();
    });
    this.orbit$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (message) {
      switch (_this.view.type.name) {
        case ViewType.Panorama.name:
        case ViewType.PanoramaGrid.name:
        case ViewType.Room3d.name:
        case ViewType.Model.name:
        case ViewType.Media.name:
          _this.form.patch({
            latitude: message.orientation.latitude,
            longitude: message.orientation.longitude,
            zoom: message.zoom
          });

          break;
      }
    });
  };

  _proto.orbit$ = function orbit$() {
    var latitude,
        longitude,
        zoom = null;
    return MessageService.in$.pipe(operators.filter(function (message) {
      return message.type === MessageType.ControlInfo;
    }), operators.auditTime(65), operators.distinctUntilChanged(function (previous, current) {
      var didChange = latitude !== current.orientation.latitude || longitude !== current.orientation.longitude || zoom !== current.zoom;
      latitude = current.orientation.latitude;
      longitude = current.orientation.longitude;
      zoom = current.zoom;
      return !didChange;
    }));
  };

  _proto.getAssetDidChange = function getAssetDidChange(changes) {
    var view = this.view;

    if (view.type.name === ViewType.PanoramaGrid.name) {
      return false;
    }

    var assetDidChange = AssetService.assetDidChange(view.asset, changes.asset);
    var usdzDidChange = AssetService.assetDidChange(view.ar ? view.ar.usdz : null, changes.usdz);
    var gltfDidChange = AssetService.assetDidChange(view.ar ? view.ar.gltf : null, changes.gltf);

    if (assetDidChange || usdzDidChange || gltfDidChange) {
      // console.log('UpdateViewComponent.getAssetDidChange', assetDidChange, usdzDidChange, gltfDidChange);
      return true;
    } else {
      return false;
    }
  };

  _proto.doUpdateView = function doUpdateView(changes) {
    var assetDidChange = this.getAssetDidChange(changes); // console.log('doUpdateItem.assetDidChange', assetDidChange);

    if (assetDidChange) {
      this.onSubmit();
    }
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

        case ViewType.Room3d.name:
          keys = ['id', 'type', 'name', 'hidden?', 'latitude', 'longitude', 'zoom', 'asset'];
          break;

        case ViewType.Model.name:
          keys = ['id', 'type', 'name', 'hidden?', 'latitude', 'longitude', 'zoom', 'asset'];
          break;

        case ViewType.Media.name:
          keys = ['id', 'type', 'name', 'hidden?', 'asset'];
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
    // console.log('UpdateViewComponent.onChanges');
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

      var usdz = payload.usdz || null;
      var gltf = payload.gltf || null;
      delete payload.usdz;
      delete payload.gltf;
      payload.ar = usdz || gltf ? {
        usdz: usdz,
        gltf: gltf
      } : null;
      var view = new View(payload);
      EditorService.viewUpdate$(view).pipe(operators.first()).subscribe(function (response) {
        // console.log('UpdateViewComponent.onSubmit.viewUpdate$.success', response);
        _this2.update.next({
          view: view
        });

        _this2.setTimeout(function () {
          _this2.busy = false;

          _this2.pushChanges();
        });
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

  _proto.clearTimeout = function (_clearTimeout) {
    function clearTimeout() {
      return _clearTimeout.apply(this, arguments);
    }

    clearTimeout.toString = function () {
      return _clearTimeout.toString();
    };

    return clearTimeout;
  }(function () {
    if (this.to) {
      clearTimeout(this.to);
    }
  });

  _proto.setTimeout = function (_setTimeout) {
    function setTimeout(_x) {
      return _setTimeout.apply(this, arguments);
    }

    setTimeout.toString = function () {
      return _setTimeout.toString();
    };

    return setTimeout;
  }(function (callback, msec) {
    if (msec === void 0) {
      msec = 300;
    }

    this.clearTimeout();

    if (typeof callback === 'function') {
      this.to = setTimeout(callback, msec);
    }
  });

  _proto.onDestroy = function onDestroy() {
    this.clearTimeout();
  };

  return UpdateViewComponent;
}(rxcomp.Component);
UpdateViewComponent.meta = {
  selector: 'update-view',
  outputs: ['select', 'update', 'delete'],
  inputs: ['view'],
  template:
  /* html */
  "\n\t\t<div class=\"group--headline\" [class]=\"{ active: view.selected }\" (click)=\"onSelect($event)\">\n\t\t\t<!-- <div class=\"id\" [innerHTML]=\"view.id\"></div> -->\n\t\t\t<div class=\"icon\">\n\t\t\t\t<svg-icon [name]=\"view.type.name\"></svg-icon>\n\t\t\t</div>\n\t\t\t<div class=\"title\" [innerHTML]=\"getTitle(view)\"></div>\n\t\t\t<svg class=\"icon--caret-down\"><use xlink:href=\"#caret-down\"></use></svg>\n\t\t</div>\n\t\t<form [formGroup]=\"form\" (submit)=\"onSubmit()\" name=\"form\" role=\"form\" novalidate autocomplete=\"off\" *if=\"view.selected\">\n\t\t\t<div class=\"form-controls\">\n\t\t\t\t<div control-text [control]=\"controls.id\" label=\"Id\" [disabled]=\"true\"></div>\n\t\t\t\t<!-- <div control-text [control]=\"controls.type\" label=\"Type\" [disabled]=\"true\"></div> -->\n\t\t\t\t<div control-text [control]=\"controls.name\" label=\"Name\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"view.type.name == 'waiting-room'\">\n\t\t\t\t<div control-asset [control]=\"controls.asset\" label=\"Image\" accept=\"image/jpeg\"></div>\n\t\t\t\t<div control-text [control]=\"controls.latitude\" label=\"Latitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.longitude\" label=\"Longitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.zoom\" label=\"Zoom\" [disabled]=\"true\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"view.type.name == 'panorama'\">\n\t\t\t\t<div control-checkbox [control]=\"controls.hidden\" label=\"Hide from menu\"></div>\n\t\t\t\t<div control-asset [control]=\"controls.asset\" label=\"Image or Video\" accept=\"image/jpeg, video/mp4\"></div>\n\t\t\t\t<div control-text [control]=\"controls.latitude\" label=\"Latitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.longitude\" label=\"Longitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.zoom\" label=\"Zoom\" [disabled]=\"true\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"view.type.name == 'panorama-grid'\">\n\t\t\t\t<div control-checkbox [control]=\"controls.hidden\" label=\"Hide from menu\"></div>\n\t\t\t\t<div control-text [control]=\"controls.latitude\" label=\"Latitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.longitude\" label=\"Longitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.zoom\" label=\"Zoom\" [disabled]=\"true\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"view.type.name == 'room-3d'\">\n\t\t\t\t<div control-checkbox [control]=\"controls.hidden\" label=\"Hide from menu\"></div>\n\t\t\t\t<div control-model [control]=\"controls.asset\" label=\"Model (.glb)\" accept=\".glb\"></div>\n\t\t\t\t<div control-text [control]=\"controls.latitude\" label=\"Latitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.longitude\" label=\"Longitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.zoom\" label=\"Zoom\" [disabled]=\"true\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"view.type.name == 'model'\">\n\t\t\t\t<div control-checkbox [control]=\"controls.hidden\" label=\"Hide from menu\"></div>\n\t\t\t\t<div control-asset [control]=\"controls.asset\" label=\"Image\" accept=\"image/jpeg\"></div>\n\t\t\t\t<div control-text [control]=\"controls.latitude\" label=\"Latitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.longitude\" label=\"Longitude\" [disabled]=\"true\"></div>\n\t\t\t\t<div control-text [control]=\"controls.zoom\" label=\"Zoom\" [disabled]=\"true\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"form-controls\" *if=\"view.type.name != 'waiting-room' && ('ar' | flag)\">\n\t\t\t\t<div control-model [control]=\"controls.usdz\" label=\"AR IOS (.usdz)\" accept=\".usdz\"></div>\n\t\t\t\t<div control-model [control]=\"controls.gltf\" label=\"AR Android (.glb)\" accept=\".glb\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"group--cta\">\n\t\t\t\t<button type=\"submit\" class=\"btn--update\" [class]=\"{ busy: busy }\">\n\t\t\t\t\t<span [innerHTML]=\"'update' | label\"></span>\n\t\t\t\t</button>\n\t\t\t\t<button type=\"button\" class=\"btn--remove\" *if=\"view.type.name != 'waiting-room'\" (click)=\"onRemove($event)\">\n\t\t\t\t\t<span [innerHTML]=\"'remove' | label\"></span>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</form>\n\t"
};var factories = [AsideComponent, CurvedPlaneModalComponent, EditorComponent, ItemModelModalComponent, MediaModalComponent, MenuBuilderComponent, ModelModalComponent, NavModalComponent, PanoramaModalComponent, PanoramaGridModalComponent, PlaneModalComponent, RemoveModalComponent, Room3DModalComponent, ToastOutletComponent, UpdateViewItemComponent, UpdateViewTileComponent, UpdateViewComponent];
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
};var EnvPipe = /*#__PURE__*/function (_Pipe) {
  _inheritsLoose(EnvPipe, _Pipe);

  function EnvPipe() {
    return _Pipe.apply(this, arguments) || this;
  }

  EnvPipe.transform = function transform(keypath) {
    var env = environment;
    var keys = keypath.split('.');
    var k = keys.shift();

    while (keys.length > 0 && env[k]) {
      env = env[k];
      k = keys.shift();
    }

    var value = env[k] || null;
    return value;
  };

  return EnvPipe;
}(rxcomp.Pipe);
EnvPipe.meta = {
  name: 'env'
};var FlagPipe = /*#__PURE__*/function (_Pipe) {
  _inheritsLoose(FlagPipe, _Pipe);

  function FlagPipe() {
    return _Pipe.apply(this, arguments) || this;
  }

  FlagPipe.transform = function transform(key) {
    var flags = environment.flags;
    return flags[key] || false;
  };

  return FlagPipe;
}(rxcomp.Pipe);
FlagPipe.meta = {
  name: 'flag'
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
      type: 'image/jpeg'
      file: '1601303293569_ambiente1_x0_y2.jpg'
      originalFileName: 'ambiente1_x0_y2.jpg'
      url: '/uploads/1601303293569_ambiente1_x0_y2.jpg'
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
  }
  /*
  onChanges() {
  	// console.log('ControlCustomSelectComponent.onChanges');
  }
  */
  ;

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
        return 'select'; // LabelPipe.transform('select');
      }
    } else {
      var item = items.find(function (x) {
        return x.id === value || x.name === value;
      });

      if (item) {
        return item.name;
      } else {
        return 'select'; // LabelPipe.transform('select');
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
  "\n\t\t<div class=\"group--form--select\" [class]=\"{ required: control.validators.length, multiple: isMultiple }\" [dropdown]=\"dropdownId\" (dropped)=\"onDropped($event)\">\n\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t<span class=\"control--custom-select\" [innerHTML]=\"getLabel() | label\"></span>\n\t\t\t<svg class=\"icon--caret-down\"><use xlink:href=\"#caret-down\"></use></svg>\n\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t\t<div class=\"dropdown\" [dropdown-item]=\"dropdownId\">\n\t\t\t<div class=\"category\" [innerHTML]=\"label\"></div>\n\t\t\t<ul class=\"nav--dropdown\" [class]=\"{ multiple: isMultiple }\">\n\t\t\t\t<li (click)=\"setOption(item)\" [class]=\"{ empty: item.id == null }\" *for=\"let item of control.options\">\n\t\t\t\t\t<span [class]=\"{ active: hasOption(item) }\" [innerHTML]=\"item.name | label\"></span>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\n\t"
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
    // console.log('ControlLinkComponent.onInputDidBlur', event.target.value);
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
};var ControlLocalizedAssetComponent = /*#__PURE__*/function (_ControlComponent) {
  _inheritsLoose(ControlLocalizedAssetComponent, _ControlComponent);

  function ControlLocalizedAssetComponent() {
    return _ControlComponent.apply(this, arguments) || this;
  }

  var _proto = ControlLocalizedAssetComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.label = this.label || 'label';
    this.disabled = this.disabled || false;
    this.accept = this.accept || 'image/png, image/jpeg';
    this.languages = environment.languages;
    this.currentLanguage = environment.defaultLanguage;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var input = node.querySelector('input');
    input.setAttribute('accept', this.accept);
    DropService.drop$(input).pipe(operators.takeUntil(this.unsubscribe$)).subscribe();
    DropService.change$(input).pipe(operators.switchMap(function (files) {
      var uploads$ = files.map(function (file, i) {
        return AssetService.upload$([file]).pipe(operators.switchMap(function (uploads) {
          return (_this.languages.length > 1 ? AssetService.createOrUpdateLocalizedAsset$ : AssetService.createOrUpdateAsset$)(uploads, _this.control, _this.currentLanguage);
        }));
      });
      return rxjs.combineLatest(uploads$);
    }), operators.takeUntil(this.unsubscribe$)).subscribe(function (assets) {
      // console.log('ControlLocalizedAssetComponent.change$', assets);
      _this.control.value = assets[0];
    });
  };

  _proto.setLanguage = function setLanguage(language) {
    this.currentLanguage = language;
    this.pushChanges();
  };

  _createClass(ControlLocalizedAssetComponent, [{
    key: "localizedValue",
    get: function get() {
      var asset = this.control.value;

      if (asset && asset.locale) {
        var localizedAsset = asset.locale[this.currentLanguage];

        if (localizedAsset) {
          asset = localizedAsset;
        }
      }

      return asset;
    }
  }]);

  return ControlLocalizedAssetComponent;
}(ControlComponent);
ControlLocalizedAssetComponent.meta = {
  selector: '[control-localized-asset]',
  inputs: ['control', 'label', 'disabled', 'accept'],
  template:
  /* html */
  "\n\t\t<div class=\"group--form\" [class]=\"{ required: control.validators.length, disabled: disabled }\">\n\t\t\t<div class=\"control--head\">\n\t\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t\t</div>\n\t\t\t<div class=\"group--picture\">\n\t\t\t\t<div class=\"group--picture__info\">\n\t\t\t\t\t<span [innerHTML]=\"'browse' | label\"></span>\n\t\t\t\t</div>\n\t\t\t\t<img [lazy]=\"localizedValue | asset\" [size]=\"{ width: 320, height: 240 }\" *if=\"localizedValue && localizedValue.type.name === 'image'\" />\n\t\t\t\t<video [src]=\"localizedValue | asset\" *if=\"localizedValue && localizedValue.type.name === 'video'\"></video>\n\t\t\t\t<input type=\"file\">\n\t\t\t</div>\n\t\t\t<div class=\"file-name\" *if=\"localizedValue\" [innerHTML]=\"localizedValue.file\"></div>\n\t\t\t<ul class=\"nav--languages\" *if=\"languages.length > 1\">\n\t\t\t\t<li class=\"nav__item\" [class]=\"{ active: lang == currentLanguage }\" (click)=\"setLanguage(lang)\" [innerHTML]=\"lang\" *for=\"let lang of languages\"></li>\n\t\t\t</ul>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
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

    DropService.change$(input).pipe(operators.switchMap(function (files) {
      var uploads$ = files.map(function (file, i) {
        return AssetService.upload$([file]).pipe(operators.switchMap(function (uploads) {
          return AssetService.createOrUpdateAsset$(uploads, _this.control);
        }));
      });
      return rxjs.combineLatest(uploads$);
    }), operators.takeUntil(this.unsubscribe$)).subscribe(function (assets) {
      // console.log('ControlModelComponent.change$', assets);
      _this.control.value = assets[0];
    });
  };

  _proto.onRemove = function onRemove(event) {
    var _this2 = this;

    AssetService.assetDelete$(this.control.value).pipe(operators.first()).subscribe(function () {
      _this2.control.value = null;
      _this2.input.value = null;
      _this2.control.touched = true; // !!!
    }); // !!! delete upload
    // !!! delete asset
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
  "\n\t\t<div class=\"group--form--textarea\" [class]=\"{ required: control.validators.length, disabled: disabled }\">\n\t\t\t<label [innerHTML]=\"label\"></label>\n\t\t\t<textarea class=\"control--text\" [formControl]=\"control\" [placeholder]=\"label\" [innerHTML]=\"label\" rows=\"4\" [disabled]=\"disabled\"></textarea>\n\t\t\t<span class=\"required__badge\" [innerHTML]=\"'required' | label\"></span>\n\t\t</div>\n\t\t<errors-component [control]=\"control\"></errors-component>\n\t"
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
    rxjs.merge(rxjs.fromEvent(input, 'blur'), rxjs.fromEvent(input, 'keydown').pipe(operators.filter(function (event) {
      return event.key === 'Enter' || event.keyCode === 13;
    }))).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      return _this.onInputDidBlur(event);
    }); // fromEvent(node, 'focus').pipe(takeUntil(this.unsubscribe$)).subscribe(event => this.onFocus(event));
  };

  _proto.onInputDidChange = function onInputDidChange(event) {
    // const node = getContext(this).node;
    // const value = node.value === '' ? null : node.value;
    event.target.value = event.target.value.replace(/[^\d|\.|-]/g, ''); // console.log('InputValueComponent.onInputDidChange', event.target.value);

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
      m = 16;
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
};var LanguageComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(LanguageComponent, _Component);

  function LanguageComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = LanguageComponent.prototype;

  _proto.onInit = function onInit() {
    this.showLanguages = false;
    this.languageService = LanguageService;
  };

  _proto.setLanguage = function setLanguage(language) {
    var _this = this;

    this.languageService.setLanguage$(language).pipe(operators.first()).subscribe(function (_) {
      _this.showLanguages = false;

      _this.pushChanges();

      _this.set.next();
    });
  };

  _proto.toggleLanguages = function toggleLanguages() {
    this.showLanguages = !this.showLanguages;
    this.pushChanges();
  };

  return LanguageComponent;
}(rxcomp.Component);
LanguageComponent.meta = {
  selector: '[language]',
  outputs: ['set'],
  template:
  /* html */
  "\n\t\t<button type=\"button\" class=\"btn--language\" (click)=\"toggleLanguages()\" *if=\"languageService.hasLanguages\"><span [innerHTML]=\"languageService.activeLanguage.title\"></span> <svg viewBox=\"0 0 8 5\"><use xlink:href=\"#caret-down\"></use></svg></button>\n\t\t<ul class=\"nav--language\" *if=\"showLanguages\">\n\t\t\t<li (click)=\"setLanguage(language)\" *for=\"let language of languageService.languages\"><span [innerHTML]=\"language.title\"></span></li>\n\t\t</ul>\n\t"
};var LayoutComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(LayoutComponent, _Component);

  function LayoutComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = LayoutComponent.prototype;

  _proto.onInit = function onInit() {
    this.state = {
      status: LocationService.get('status') || AgoraStatus.Connected,
      role: LocationService.get('role') || RoleType.Publisher,
      // Publisher, Attendee, Streamer, Viewer, SmartDevice, SelfService, Embed
      membersCount: 3,
      controlling: false,
      spying: false,
      silencing: false,
      hosted: true,
      chat: false,
      chatDirty: true,
      name: 'Jhon Appleseed',
      uid: '7341614597544882'
    };
    this.state.live = this.state.role === RoleType.SelfService || this.state.role === RoleType.Embed || DEBUG ? false : true;
    var embedViewId = LocationService.has('embedViewId') ? parseInt(LocationService.get('embedViewId')) : null;
    this.state.navigable = embedViewId == null;
    this.state.mode = UserService.getMode(this.state.role);
    this.view = {
      likes: 41
    };
    this.local = {};
    this.screen = null;
    this.remoteScreen_ = null;
    this.media = null;
    this.hasScreenViewItem = false;
    this.media = true;
    this.remotes = new Array(8).fill(0).map(function (x, i) {
      return {
        id: i + 1
      };
    });
    this.languageService = LanguageService;
    this.showLanguages = false;
    StateService.patchState(this.state);
    this.fullscreen$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe();
    var vrService = this.vrService = VRService.getService();
    console.log('LayoutComponent', this); // console.log(AgoraService.getUniqueUserId());
  };

  _proto.setLanguage = function setLanguage(language) {
    var _this = this;

    this.languageService.setLanguage$(language).pipe(first()).subscribe(function (_) {
      _this.showLanguages = false;

      _this.pushChanges();
    });
  };

  _proto.toggleLanguages = function toggleLanguages() {
    this.showLanguages = !this.showLanguages;
    this.pushChanges();
  };

  _proto.patchState = function patchState(state) {
    this.state = Object.assign({}, this.state, state);
    this.screen = this.state.screen || null;
    this.remoteScreen = this.screen;
    this.pushChanges();
  };

  _proto.toggleCamera = function toggleCamera() {
    this.patchState({
      cameraMuted: !this.state.cameraMuted
    });
  };

  _proto.toggleAudio = function toggleAudio() {
    this.patchState({
      audioMuted: !this.state.audioMuted
    });
  };

  _proto.toggleScreen = function toggleScreen() {
    this.patchState({
      screen: !this.state.screen
    });
    window.dispatchEvent(new Event('resize'));
  };

  _proto.toggleVolume = function toggleVolume() {
    this.patchState({
      volumeMuted: !this.state.volumeMuted
    });
  };

  _proto.toggleMode = function toggleMode() {
    var mode = this.state.mode === UIMode.VirtualTour ? UIMode.LiveMeeting : UIMode.VirtualTour;
    this.patchState({
      mode: mode
    }); // this.pushChanges();
  };

  _proto.toggleFullScreen = function toggleFullScreen() {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var fullScreen = !this.state.fullScreen;

    if (fullScreen) {
      if (node.requestFullscreen) {
        node.requestFullscreen();
      } else if (node.webkitRequestFullscreen) {
        node.webkitRequestFullscreen();
      } else if (node.msRequestFullscreen) {
        node.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } // this.patchState({ fullScreen });

  };

  _proto.fullscreen$ = function fullscreen$() {
    var _this2 = this;

    return rxjs.fromEvent(document, 'fullscreenchange').pipe(operators.tap(function (_) {
      var fullScreen = document.fullscreenElement != null; // console.log('fullscreen$', fullScreen);

      _this2.patchState({
        fullScreen: fullScreen
      });
    }));
  };

  _proto.toggleChat = function toggleChat() {
    this.patchState({
      chat: !this.state.chat,
      chatDirty: false
    });
    window.dispatchEvent(new Event('resize'));
  };

  _proto.toggleNavInfo = function toggleNavInfo() {
    this.patchState({
      showNavInfo: !this.state.showNavInfo
    });
  };

  _proto.onChatClose = function onChatClose() {
    this.patchState({
      chat: false
    });
    window.dispatchEvent(new Event('resize'));
  };

  _proto.onToggleControl = function onToggleControl(remoteId) {
    var controlling = this.state.controlling === remoteId ? null : remoteId;
    this.patchState({
      controlling: controlling,
      spying: false
    });
  };

  _proto.onToggleSilence = function onToggleSilence() {
    this.patchState({
      silencing: !this.state.silencing
    });
  };

  _proto.onToggleSpy = function onToggleSpy(remoteId) {
    var spying = this.state.spying === remoteId ? null : remoteId;
    this.patchState({
      spying: spying,
      controlling: false
    });
  };

  _proto.addLike = function addLike() {
    this.view.liked = true; // view.liked;

    this.showLove(this.view);
  };

  _proto.showLove = function showLove(view) {
    var _this3 = this;

    if (view && this.view.id === view.id) {
      var skipTimeout = this.view.showLove;
      this.view.likes = view.likes;
      this.view.showLove = true;
      this.pushChanges();

      if (!skipTimeout) {
        setTimeout(function () {
          _this3.view.showLove = false;

          _this3.pushChanges();
        }, 3100);
      }
    }
  };

  _proto.disconnect = function disconnect() {};

  _createClass(LayoutComponent, [{
    key: "isVirtualTourUser",
    get: function get() {
      return [RoleType.Publisher, RoleType.Attendee, RoleType.Streamer, RoleType.Viewer].indexOf(this.state.role) !== -1;
    }
  }, {
    key: "isEmbed",
    get: function get() {
      var isEmbed = window.location.href.indexOf(environment.url.embed) !== -1;
      return isEmbed;
    }
  }, {
    key: "isNavigable",
    get: function get() {
      var embedViewId = LocationService.has('embedViewId') ? parseInt(LocationService.get('embedViewId')) : null;
      var navigable = embedViewId == null;
      return navigable;
    }
  }, {
    key: "uiClass",
    get: function get() {
      var uiClass = {};
      uiClass[this.state.role] = true; // uiClass[this.state.mode] = true;

      uiClass.chat = this.state.chat;
      uiClass.remotes = this.state.mode === UIMode.LiveMeeting;
      uiClass.remoteScreen = this.remoteScreen != null && !this.hasScreenViewItem;
      uiClass.media = !uiClass.remotes && this.media;
      uiClass.locked = this.locked;
      return uiClass;
    }
  }, {
    key: "controlled",
    get: function get() {
      return this.state.controlling && this.state.controlling !== this.state.uid;
    }
  }, {
    key: "controlling",
    get: function get() {
      return this.state.controlling && this.state.controlling === this.state.uid;
    }
  }, {
    key: "silencing",
    get: function get() {
      return StateService.state.silencing;
    }
  }, {
    key: "silenced",
    get: function get() {
      return StateService.state.silencing && StateService.state.role === RoleType.Streamer;
    }
  }, {
    key: "spyed",
    get: function get() {
      return this.state.spying && this.state.spying === this.state.uid;
    }
  }, {
    key: "spying",
    get: function get() {
      return this.state.spying && this.state.spying !== this.state.uid;
    }
  }, {
    key: "locked",
    get: function get() {
      return this.controlled || this.spying;
    }
  }, {
    key: "remoteScreen",
    get: function get() {
      return this.remoteScreen_;
    },
    set: function set(remoteScreen) {
      if (this.remoteScreen_ !== remoteScreen) {
        this.remoteScreen_ = remoteScreen;
        window.dispatchEvent(new Event('resize'));
      }
    }
  }]);

  return LayoutComponent;
}(rxcomp.Component);
LayoutComponent.meta = {
  selector: '[layout-component]'
};var UID = 0;
var ImageServiceEvent = {
  Progress: 'progress',
  Complete: 'complete'
};

var ImageService = /*#__PURE__*/function () {
  function ImageService() {}

  ImageService.worker = function worker() {
    if (!this.worker_) {
      this.worker_ = new Worker(environment.workers.image);
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

  _proto.onClose = function onClose() {
    ModalService.reject();
  };

  return ModalComponent;
}(rxcomp.Component);
ModalComponent.meta = {
  selector: '[modal]'
};var SlugPipe = /*#__PURE__*/function (_Pipe) {
  _inheritsLoose(SlugPipe, _Pipe);

  function SlugPipe() {
    return _Pipe.apply(this, arguments) || this;
  }

  SlugPipe.transform = function transform(key) {
    var url = environment.url;
    return url[key] || "#" + key;
  };

  return SlugPipe;
}(rxcomp.Pipe);
SlugPipe.meta = {
  name: 'slug'
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
*/var TitleDirective = /*#__PURE__*/function (_Directive) {
  _inheritsLoose(TitleDirective, _Directive);

  function TitleDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  _createClass(TitleDirective, [{
    key: "title",
    set: function set(title) {
      if (this.title_ !== title) {
        this.title_ = title;

        var _getContext = rxcomp.getContext(this),
            node = _getContext.node;

        title ? node.setAttribute('title', title) : node.removeAttribute('title');
      }
    },
    get: function get() {
      return this.title_;
    }
  }]);

  return TitleDirective;
}(rxcomp.Directive);
TitleDirective.meta = {
  selector: '[[title]]',
  inputs: ['title']
};var TryInARComponent = /*#__PURE__*/function (_Component) {
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
};var VirtualItem = /*#__PURE__*/function (_Context) {
  _inheritsLoose(VirtualItem, _Context);

  function VirtualItem(key, $key, value, $value, index, count, parentInstance) {
    var _this;

    _this = _Context.call(this, parentInstance) || this;
    _this[key] = $key;
    _this[value] = $value;
    _this.index = index;
    _this.count = count;
    return _this;
  }

  _createClass(VirtualItem, [{
    key: "first",
    get: function get() {
      return this.index === 0;
    }
  }, {
    key: "last",
    get: function get() {
      return this.index === this.count - 1;
    }
  }, {
    key: "even",
    get: function get() {
      return this.index % 2 === 0;
    }
  }, {
    key: "odd",
    get: function get() {
      return !this.even;
    }
  }]);

  return VirtualItem;
}(rxcomp.Context);var VirtualMode = {
  Responsive: 1,
  Grid: 2,
  Centered: 3,
  List: 4
};

var VirtualStructure = /*#__PURE__*/function (_Structure) {
  _inheritsLoose(VirtualStructure, _Structure);

  function VirtualStructure() {
    return _Structure.apply(this, arguments) || this;
  }

  var _proto = VirtualStructure.prototype;

  _proto.onInit = function onInit() {
    var _getContext = rxcomp.getContext(this),
        module = _getContext.module,
        node = _getContext.node;

    var template = node.firstElementChild;
    var expression = node.getAttribute('*virtual');
    node.removeAttribute('*virtual');
    node.removeChild(template);
    var tokens = this.tokens = this.getExpressionTokens(expression);
    this.virtualFunction = module.makeFunction(tokens.iterable);
    this.container = node;
    this.template = template;
    this.mode = this.mode || 1;
    this.width = this.width || 250;
    this.gutter = this.gutter !== undefined ? this.gutter : 20;
    this.reverse = this.reverse === true ? true : false;
    this.options = {
      width: this.width,
      gutter: this.gutter,
      reverse: this.reverse,
      containerWidth: 0,
      containerHeight: 0,
      top: 0,
      cols: [0]
    };
    this.cachedRects = {};
    this.cachedInstances = [];
    this.cacheNodes = [];
    this.items$ = new rxjs.BehaviorSubject([]);
    this.update$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (visibleItems) {// console.log(visibleItems.length);
    });
  };

  _proto.onChanges = function onChanges(changes) {
    var context = rxcomp.getContext(this);
    var module = context.module; // resolve

    var items = module.resolve(this.virtualFunction, context.parentInstance, this) || [];
    this.mode = this.mode || 1;
    this.width = this.width || 250;
    this.gutter = this.gutter !== undefined ? this.gutter : 20;
    this.options.width = this.width;
    this.updateView(true);
    this.items$.next(items); // console.log('VirtualStructure', 'items.length', items.length);
  };

  _proto.update$ = function update$() {
    var _this = this;

    return rxjs.merge(this.scroll$(), this.resize$(), this.items$.pipe(operators.distinctUntilChanged())).pipe(operators.map(function (_) {
      var visibleItems = _this.updateForward();

      return visibleItems;
    }));
  };

  _proto.updateForward = function updateForward() {
    var _this2 = this;

    var options = this.options;
    var items = this.items$.getValue(); // console.log('VirtualStructure', 'items.length', items.length);

    var total = items.length;
    this.container.position = 'relative';
    var highestHeight = 0;
    var width = this.getWidth();
    var gutter = this.getGutter(width);
    var visibleItems = [];

    for (var i = 0, len = items.length; i < len; i++) {
      var item = items[i];
      var col = void 0,
          height = void 0,
          top = void 0,
          left = void 0,
          bottom = void 0;
      var rect = this.cachedRects[i];

      if (rect) {
        col = rect.col;
        height = rect.height;
        left = rect.left; // top = rect.top;
        // bottom = rect.bottom;
      } else {
        col = this.getCol();
        height = this.getHeight(width, item);
      }

      top = options.cols[col];

      if (this.intersect(top + options.top, top + height + options.top, options.top, options.top + options.containerHeight)) {
        if (!rect) {
          left = this.getLeft(col, width, gutter);
        }

        var node = this.cachedNode(i, i, item, total);
        node.style.position = 'absolute';
        node.style.top = top + 'px';
        node.style.left = left + 'px';
        node.style.width = width + 'px';

        if (height !== node.offsetHeight) {
          height = node.offsetHeight;
        }

        bottom = top + height + options.gutter;
        highestHeight = Math.max(highestHeight, bottom);
        options.cols[col] = bottom;

        if (!rect) {
          this.cachedRects[i] = {
            col: col,
            width: width,
            height: height,
            left: left,
            top: top,
            bottom: bottom
          };
        } else {
          rect.height = height;
          rect.bottom = bottom;
        }

        visibleItems.push(item);
      } else {
        this.removeNode(i);
        bottom = top + height + options.gutter;
        options.cols[col] = bottom;
        highestHeight = Math.max(highestHeight, bottom);
      }
    }

    var removeIndex = items.length;

    while (removeIndex < this.cacheNodes.length) {
      this.removeNode(removeIndex);
      removeIndex++;
    }

    this.cacheNodes.length = items.length;
    var parentContainer = this.container.parentNode;

    if (this.reverse && highestHeight < parentContainer.offsetHeight - 1) {
      var diff = parentContainer.offsetHeight - 1 - highestHeight;
      items.forEach(function (item, i) {
        if (visibleItems.indexOf(item) !== -1) {
          var _rect = _this2.cachedRects[i];

          var _node = _this2.cachedNode(i, i, item, total);

          _node.style.top = _rect.top + diff + 'px';
        }
      });
      this.container.style.height = parentContainer.offsetHeight - 1 + "px";
    } else {
      this.container.style.height = highestHeight + "px";
    }

    return visibleItems;
  }
  /*
  updateForward__() {
  	const options = this.options;
  	const items = this.items$.getValue();
  	// console.log('VirtualStructure', 'items.length', items.length);
  	const total = items.length;
  	this.container.position = 'relative';
  	let highestHeight = 0;
  	const width = this.getWidth();
  	const gutter = this.getGutter(width);
  	const visibleItems = items.filter((item, i) => {
  		let col, height, top, left, bottom;
  		let rect = this.cachedRects[i];
  		if (rect) {
  			col = rect.col;
  			height = rect.height;
  			left = rect.left;
  			// top = rect.top;
  			// bottom = rect.bottom;
  		} else {
  			col = this.getCol();
  			height = this.getHeight(width, item);
  		}
  		top = options.cols[col];
  		if (this.intersect(top + options.top, top + height + options.top, options.top, options.top + options.containerHeight)) {
  			if (!rect) {
  				left = this.getLeft(col, width, gutter);
  			}
  			const node = this.cachedNode(i, i, item, total);
  			node.style.position = 'absolute';
  			node.style.top = top + 'px';
  			node.style.left = left + 'px';
  			node.style.width = width + 'px';
  			if (height !== node.offsetHeight) {
  				height = node.offsetHeight;
  			}
  			bottom = top + height + options.gutter;
  			highestHeight = Math.max(highestHeight, bottom);
  			options.cols[col] = bottom;
  			if (!rect) {
  				this.cachedRects[i] = { col, width, height, left, top, bottom };
  			} else {
  				rect.height = height;
  				rect.bottom = bottom;
  			}
  			return true;
  		} else {
  			this.removeNode(i);
  			bottom = top + height + options.gutter;
  			options.cols[col] = bottom;
  			highestHeight = Math.max(highestHeight, bottom);
  			return false;
  		}
  	});
  	let removeIndex = items.length;
  	while (removeIndex < this.cacheNodes.length) {
  		this.removeNode(removeIndex);
  		removeIndex++;
  	}
  	this.cacheNodes.length = items.length;
  	this.container.style.height = `${highestHeight}px`;
  	return visibleItems;
  }
  
  updateBackward__() {
  	const options = this.options;
  	const items = this.items$.getValue();
  	// console.log('VirtualStructure', 'items.length', items.length);
  	const total = items.length;
  	this.container.position = 'relative';
  	let lowestHeight = 0;
  	const width = this.getWidth();
  	const gutter = this.getGutter(width);
  	const visibleItems = [];
  	for (let i = items.length - 1; i >= 0; i--) {
  		const item = items[i];
  		let col, height, top, left, bottom;
  		let rect = this.cachedRects[i];
  		if (rect) {
  			col = rect.col;
  			height = rect.height;
  			left = rect.left;
  			// top = rect.top;
  			// bottom = rect.bottom;
  		} else {
  			col = this.getCol();
  			height = this.getHeight(width, item);
  		}
  		bottom = options.cols[col];
  		if (this.intersect(bottom - height + options.top, bottom + options.top, options.top, options.top + options.containerHeight)) {
  			if (!rect) {
  				left = this.getLeft(col, width, gutter);
  			}
  			const node = this.cachedNode(i, i, item, total);
  			node.style.position = 'absolute';
  			node.style.top = top + 'px';
  			node.style.left = left + 'px';
  			node.style.width = width + 'px';
  			if (height !== node.offsetHeight) {
  				height = node.offsetHeight;
  			}
  			top = bottom - height - options.gutter;
  			lowestHeight = Math.min(lowestHeight, -top);
  			options.cols[col] = top;
  			if (!rect) {
  				this.cachedRects[i] = { col, width, height, left, top, bottom: bottom };
  			} else {
  				rect.height = height;
  				rect.top = top;
  			}
  			visibleItems.push(item);
  		} else {
  			this.removeNode(i);
  			top = bottom - height - options.gutter;
  			options.cols[col] = top;
  			lowestHeight = Math.min(lowestHeight, top);
  		}
  	}
  	let removeIndex = items.length;
  	while (removeIndex < this.cacheNodes.length) {
  		this.removeNode(removeIndex);
  		removeIndex++;
  	}
  	this.cacheNodes.length = items.length;
  	this.container.style.height = `${-lowestHeight}px`;
  	return visibleItems;
  }
  */
  ;

  _proto.getCols = function getCols() {
    var options = this.options;
    var cols = Math.floor((options.containerWidth + options.gutter) / (options.width + options.gutter)) || 1;
    return new Array(cols).fill(0);
  };

  _proto.getCol = function getCol() {
    var options = this.options;
    var col;

    switch (this.mode) {
      case VirtualMode.Grid:
      case VirtualMode.Centered:
      case VirtualMode.Responsive:
        col = options.cols.reduce(function (p, c, i, a) {
          return c < a[p] ? i : p;
        }, 0);
        break;

      case VirtualMode.List:
      default:
        col = 0;
    }

    return col;
  };

  _proto.getWidth = function getWidth() {
    var options = this.options;
    var width;

    switch (this.mode) {
      case VirtualMode.Grid:
      case VirtualMode.Centered:
        width = options.width;
        break;

      case VirtualMode.Responsive:
        width = (options.containerWidth - (options.cols.length - 1) * options.gutter) / options.cols.length;
        break;

      case VirtualMode.List:
      default:
        width = options.containerWidth;
    }

    return width;
  };

  _proto.getHeight = function getHeight(width, item) {
    var options = this.options;
    var height;

    switch (this.mode) {
      case VirtualMode.Grid:
      case VirtualMode.Centered:
      case VirtualMode.Responsive:
        height = options.width;
        break;

      case VirtualMode.List:
      default:
        height = 80;
    }

    return height;
  };

  _proto.getGutter = function getGutter(width) {
    var options = this.options;
    var gutter;

    switch (this.mode) {
      case VirtualMode.Grid:
      case VirtualMode.Centered:
        gutter = options.gutter;
        break;

      case VirtualMode.Responsive:
        gutter = (options.containerWidth - options.cols.length * width) / (options.cols.length - 1);
        break;

      case VirtualMode.List:
      default:
        gutter = 0;
    }

    return gutter;
  };

  _proto.getLeft = function getLeft(index, width, gutter) {
    var options = this.options;
    var left;

    switch (this.mode) {
      case VirtualMode.Grid:
      case VirtualMode.Responsive:
        left = index * (width + gutter);
        break;

      case VirtualMode.Centered:
        left = (options.containerWidth - options.cols.length * (width + gutter) + gutter) / 2 + index * (width + gutter);
        break;

      case VirtualMode.List:
      default:
        left = 0;
    }

    return left;
  };

  _proto.cachedNode = function cachedNode(index, i, value, total) {
    if (this.cacheNodes[index]) {
      return this.updateNode(index, i, value);
    } else {
      return this.createNode(index, i, value, total);
    }
  };

  _proto.createNode = function createNode(index, i, value, total) {
    var clonedNode = this.template.cloneNode(true);
    delete clonedNode.rxcompId;
    this.container.appendChild(clonedNode);
    this.cacheNodes[index] = clonedNode;
    var context = rxcomp.getContext(this);
    var module = context.module;
    var tokens = this.tokens;
    var args = [tokens.key, i, tokens.value, value, i, total, context.parentInstance];
    var instance = module.makeInstance(clonedNode, VirtualItem, context.selector, context.parentInstance, args);
    var forItemContext = rxcomp.getContext(instance);
    module.compile(clonedNode, forItemContext.instance);
    this.cachedInstances[index] = instance;
    return clonedNode;
  };

  _proto.updateNode = function updateNode(index, i, value) {
    var instance = this.cachedInstances[index];
    var tokens = this.tokens;

    if (instance[tokens.key] !== i) {
      instance[tokens.key] = i;
      instance[tokens.value] = value;
      instance.pushChanges();
    } // console.log(index, i, value);


    return this.cacheNodes[index];
  };

  _proto.removeNode = function removeNode(index) {
    this.cachedInstances[index] = undefined;
    var node = this.cacheNodes[index];

    if (node) {
      var context = rxcomp.getContext(this);
      var module = context.module;
      node.parentNode.removeChild(node);
      module.remove(node);
    }

    this.cacheNodes[index] = undefined;
    return node;
  };

  _proto.intersect = function intersect(top1, bottom1, top2, bottom2) {
    return top2 < bottom1 && bottom2 > top1;
  };

  _proto.resize$ = function resize$() {
    var _this3 = this;

    return rxjs.fromEvent(window, 'resize').pipe(operators.auditTime(100), operators.startWith(null), operators.tap(function () {
      return _this3.updateView(true);
    }));
  };

  _proto.scroll$ = function scroll$() {
    var _this4 = this;

    var _getContext2 = rxcomp.getContext(this),
        node = _getContext2.node; // console.log(node.parentNode, getComputedStyle(node.parentNode).overflowY, node.parentNode.style.overflowY);


    if (node.parentNode && getComputedStyle(node.parentNode).overflowY === 'auto') {
      return rxjs.fromEvent(node.parentNode, 'scroll').pipe(operators.tap(function () {
        _this4.updateView();
      }));
    } else {
      return rxjs.fromEvent(window, 'scroll').pipe(operators.tap(function () {
        return _this4.updateView();
      }));
    }
  };

  _proto.updateView = function updateView(reset) {
    var rect = this.container.getBoundingClientRect();
    var options = this.options;
    options.top = rect.top;
    options.containerWidth = rect.width;
    options.containerHeight = rect.height; // window.innerHeight;

    options.cols = this.getCols();

    if (reset) {
      this.cachedRects = {};
    }
  };

  _proto.getExpressionTokens = function getExpressionTokens(expression) {
    if (expression === null) {
      throw new Error('invalid virtual');
    }

    if (expression.trim().indexOf('let ') === -1 || expression.trim().indexOf(' of ') === -1) {
      throw new Error('invalid virtual');
    }

    var expressions = expression.split(';').map(function (x) {
      return x.trim();
    }).filter(function (x) {
      return x !== '';
    });
    var virtualExpressions = expressions[0].split(' of ').map(function (x) {
      return x.trim();
    });
    var value = virtualExpressions[0].replace(/\s*let\s*/, '');
    var iterable = virtualExpressions[1];
    var key = 'index';
    var keyValueMatches = value.match(/\[(.+)\s*,\s*(.+)\]/);

    if (keyValueMatches) {
      key = keyValueMatches[1];
      value = keyValueMatches[2];
    }

    if (expressions.length > 1) {
      var indexExpressions = expressions[1].split(/\s*let\s*|\s*=\s*index/).map(function (x) {
        return x.trim();
      });

      if (indexExpressions.length === 3) {
        key = indexExpressions[1];
      }
    }

    return {
      key: key,
      value: value,
      iterable: iterable
    };
  };

  return VirtualStructure;
}(rxcomp.Structure);
VirtualStructure.meta = {
  selector: '[*virtual]',
  inputs: ['mode', 'width', 'gutter', 'reverse']
};var DragPoint = function DragPoint() {
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
}();var MediaPlayerComponent = /*#__PURE__*/function (_Component) {
  _inheritsLoose(MediaPlayerComponent, _Component);

  function MediaPlayerComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = MediaPlayerComponent.prototype;

  _proto.onInit = function onInit() {
    // console.log('MediaPlayerComponent', this.media);
    this.playing = false;
    this.progress = 0;
    this.media$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe();
    this.drag$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe();
  };

  _proto.media$ = function media$() {
    var _this = this;

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var page = document.querySelector('.page');
    return MediaLoader.events$.pipe( // filter(event => event.loader.item.id === this.media.item.id),
    operators.tap(function (event) {
      if (event instanceof MediaLoaderPlayEvent) {
        _this.media = event.loader;
        _this.playing = true;
        node.classList.add('active');
        page.classList.add('media-player-active');

        _this.pushChanges();
      } else if (_this.media === event.loader) {
        if (event instanceof MediaLoaderPauseEvent) {
          _this.playing = false;

          _this.pushChanges();
        } else if (event instanceof MediaLoaderTimeUpdateEvent) {
          if (!_this.dragging) {
            _this.progress = _this.media.progress;

            _this.pushChanges();
          }
        } else if (event instanceof MediaLoaderDisposeEvent) {
          _this.media = null;
          node.classList.remove('active');
          page.classList.remove('media-player-active');

          _this.pushChanges();
        }
      } // console.log('MediaPlayerComponent.MediaLoader.events$', event);

    }));
  };

  _proto.drag$ = function drag$() {
    var _this2 = this;

    var _getContext2 = rxcomp.getContext(this),
        node = _getContext2.node;

    var track = node.querySelector('.track');
    var initialProgress;
    return DragService.observe$(track).pipe(operators.filter(function (_) {
      return _this2.media;
    }), operators.tap(function (event) {
      if (event instanceof DragDownEvent) {
        var rect = track.getBoundingClientRect();
        initialProgress = Math.max(0, Math.min(1, (event.down.x - rect.left) / rect.width));
        _this2.dragging = true;
      } else if (event instanceof DragMoveEvent) {
        var _rect = track.getBoundingClientRect();

        var progress = Math.max(0, Math.min(1, initialProgress + event.distance.x / _rect.width));
        _this2.progress = progress;

        _this2.pushChanges();
      } else if (event instanceof DragUpEvent) {
        _this2.media.progress = _this2.progress;
        _this2.dragging = false;
      }
    }));
  };

  _proto.onPlay = function onPlay() {
    this.media.play();
  };

  _proto.onPause = function onPause() {
    this.media.pause();
  };

  _proto.onTrack = function onTrack(event) {
    var rect = event.currentTarget.getBoundingClientRect();
    var progress = (event.screenX - rect.left) / rect.width;
    this.media.progress = progress; // console.log(rect.left, event.screenX);
  };

  return MediaPlayerComponent;
}(rxcomp.Component);
MediaPlayerComponent.meta = {
  selector: '[media-player]'
};// import * as THREE from 'three';
var PANORAMA_RADIUS = 101;
var Geometry = /*#__PURE__*/function () {
  function Geometry() {}

  _createClass(Geometry, null, [{
    key: "defaultGeometry",
    get: function get() {
      return Geometry.defaultGeometry_ || (Geometry.defaultGeometry_ = new THREE.BoxBufferGeometry(1, 1, 1));
    }
  }, {
    key: "planeGeometry",
    get: function get() {
      return Geometry.planeGeometry_ || (Geometry.planeGeometry_ = new THREE.PlaneBufferGeometry(1, 1, 2, 2));
    }
  }, {
    key: "sphereGeometry",
    get: function get() {
      return Geometry.sphereGeometry_ || (Geometry.sphereGeometry_ = new THREE.SphereBufferGeometry(3, 12, 12));
    }
  }, {
    key: "panoramaGeometry",
    get: function get() {
      return Geometry.panoramaGeometry_ || (Geometry.panoramaGeometry_ = new THREE.SphereBufferGeometry(PANORAMA_RADIUS, 36, 36)); // 101, 44, 30
      // return Geometry.panoramaGeometry_ || (Geometry.panoramaGeometry_ = new THREE.IcosahedronBufferGeometry(PANORAMA_RADIUS, 4)); // 101, 44, 30
      // return Geometry.panoramaGeometry_ || (Geometry.panoramaGeometry_ = new THREE.SphereBufferGeometry(PANORAMA_RADIUS, 40, 40)); // 101, 44, 30
    }
  }]);

  return Geometry;
}();var LOADER_UID = 0;

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

    // console.log('LoaderService.setProgress');
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
})));var UID$1 = 0;
var PrefetchServiceEvent = {
  Progress: 'progress',
  Complete: 'complete'
};

var PrefetchService = /*#__PURE__*/function () {
  function PrefetchService() {}

  PrefetchService.worker = function worker() {
    if (!this.worker_) {
      this.worker_ = new Worker(environment.workers.prefetch);
    }

    return this.worker_;
  };

  PrefetchService.events$ = function events$(assets) {
    if (!('Worker' in window)) {
      return rxjs.of({
        type: PrefetchServiceEvent.Complete,
        data: assets
      });
    }

    var worker = this.worker();
    worker.postMessage({
      id: UID$1
    });
    var id = ++UID$1;
    worker.postMessage({
      id: id,
      assets: assets
    });
    return rxjs.fromEvent(worker, 'message').pipe(operators.map(function (event) {
      return event.data;
    }), operators.filter(function (event) {
      return event.assets === assets;
    }), operators.tap(function (event) {
    }), operators.takeWhile(function (event) {
      return event.type !== PrefetchServiceEvent.Complete;
    }, true), operators.finalize(function () {
      // console.log('PrefetchService.finalize', lastEvent);
      worker.postMessage({
        id: id
      });
    }));
  };

  PrefetchService.load$ = function load$(assets) {
    return this.events$(assets).pipe(operators.filter(function (event) {
      return event.type === PrefetchServiceEvent.Complete;
    }), operators.map(function (event) {
      return event.data;
    }));
  };

  PrefetchService.prefetch = function prefetch(assets) {
    this.load$(assets).subscribe(function (event) {
      console.log('PrefetchService.prefetch', event);
    });
  };

  PrefetchService.cancel = function cancel() {
    if (!('Worker' in window)) {
      return null;
    }

    var worker = this.worker();
    worker.postMessage({
      id: UID$1
    });
    return worker;
  };

  return PrefetchService;
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
        this.headGeometry_ = new THREE.SphereBufferGeometry(0.2, 36, 24);
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
}();// import DebugService from '../debug.service';

var Interactive = function Interactive() {};
Interactive.items = [];
Interactive.hittest = interactiveHittest.bind(Interactive);
Interactive.dispose = interactiveDispose.bind(Interactive);
function interactiveHittest(raycaster, down, event) {
  var _this = this;

  if (down === void 0) {
    down = false;
  }

  // const debugService = DebugService.getService();
  var dirty = false;

  if (this.down !== down) {
    this.down = down;
    this.lock = false;
    dirty = true;
  }

  var items = this.items.filter(function (x) {
    return x.parent && !x.freezed;
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
        hit = object; // debugService.setMessage(hit.name || hit.id);
        // haptic feedback
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
}// import { DataTextureLoader, DataUtils, FloatType, HalfFloatType, LinearEncoding, LinearFilter, NearestFilter, RGBEEncoding, RGBEFormat, RGBFormat, UnsignedByteType } from 'three';
var _THREE = THREE,
    DataTextureLoader = _THREE.DataTextureLoader,
    DataUtils = _THREE.DataUtils,
    FloatType = _THREE.FloatType,
    HalfFloatType = _THREE.HalfFloatType,
    LinearEncoding = _THREE.LinearEncoding,
    LinearFilter = _THREE.LinearFilter,
    NearestFilter = _THREE.NearestFilter,
    RGBEEncoding = _THREE.RGBEEncoding,
    RGBEFormat = _THREE.RGBEFormat,
    RGBFormat = _THREE.RGBFormat,
    UnsignedByteType = _THREE.UnsignedByteType; // https://github.com/mrdoob/three.js/issues/5552
// http://en.wikipedia.org/wiki/RGBE_image_format

var RGBELoader = /*#__PURE__*/function (_DataTextureLoader) {
  _inheritsLoose(RGBELoader, _DataTextureLoader);

  function RGBELoader(manager) {
    var _this;

    _this = _DataTextureLoader.call(this, manager) || this;
    _this.type = UnsignedByteType;
    return _this;
  } // adapted from http://www.graphics.cornell.edu/~bjw/rgbe.html


  var _proto = RGBELoader.prototype;

  _proto.parse = function parse(buffer) {
    var
    /* return codes for rgbe routines */
    //RGBE_RETURN_SUCCESS = 0,
    RGBE_RETURN_FAILURE = -1,

    /* default error routine.  change this to change error handling */
    rgbe_read_error = 1,
        rgbe_write_error = 2,
        rgbe_format_error = 3,
        rgbe_memory_error = 4,
        rgbe_error = function rgbe_error(rgbe_error_code, msg) {
      switch (rgbe_error_code) {
        case rgbe_read_error:
          console.error('THREE.RGBELoader Read Error: ' + (msg || ''));
          break;

        case rgbe_write_error:
          console.error('THREE.RGBELoader Write Error: ' + (msg || ''));
          break;

        case rgbe_format_error:
          console.error('THREE.RGBELoader Bad File Format: ' + (msg || ''));
          break;

        default:
        case rgbe_memory_error:
          console.error('THREE.RGBELoader: Error: ' + (msg || ''));
      }

      return RGBE_RETURN_FAILURE;
    },

    /* offsets to red, green, and blue components in a data (float) pixel */
    //RGBE_DATA_RED = 0,
    //RGBE_DATA_GREEN = 1,
    //RGBE_DATA_BLUE = 2,

    /* number of floats per pixel, use 4 since stored in rgba image format */
    //RGBE_DATA_SIZE = 4,

    /* flags indicating which fields in an rgbe_header_info are valid */
    RGBE_VALID_PROGRAMTYPE = 1,
        RGBE_VALID_FORMAT = 2,
        RGBE_VALID_DIMENSIONS = 4,
        NEWLINE = '\n',
        fgets = function fgets(buffer, lineLimit, consume) {
      var chunkSize = 128;
      lineLimit = !lineLimit ? 1024 : lineLimit;
      var p = buffer.pos,
          i = -1,
          len = 0,
          s = '',
          chunk = String.fromCharCode.apply(null, new Uint16Array(buffer.subarray(p, p + chunkSize)));

      while (0 > (i = chunk.indexOf(NEWLINE)) && len < lineLimit && p < buffer.byteLength) {
        s += chunk;
        len += chunk.length;
        p += chunkSize;
        chunk += String.fromCharCode.apply(null, new Uint16Array(buffer.subarray(p, p + chunkSize)));
      }

      if (-1 < i) {
        /*for (i=l-1; i>=0; i--) {
        	byteCode = m.charCodeAt(i);
        	if (byteCode > 0x7f && byteCode <= 0x7ff) byteLen++;
        	else if (byteCode > 0x7ff && byteCode <= 0xffff) byteLen += 2;
        	if (byteCode >= 0xDC00 && byteCode <= 0xDFFF) i--; //trail surrogate
        }*/
        if (false !== consume) buffer.pos += len + i + 1;
        return s + chunk.slice(0, i);
      }

      return false;
    },

    /* minimal header reading.  modify if you want to parse more information */
    RGBE_ReadHeader = function RGBE_ReadHeader(buffer) {
      // regexes to parse header info fields
      var magic_token_re = /^#\?(\S+)/,
          gamma_re = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,
          exposure_re = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,
          format_re = /^\s*FORMAT=(\S+)\s*$/,
          dimensions_re = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,
          // RGBE format header struct
      header = {
        valid: 0,

        /* indicate which fields are valid */
        string: '',

        /* the actual header string */
        comments: '',

        /* comments found in header */
        programtype: 'RGBE',

        /* listed at beginning of file to identify it after "#?". defaults to "RGBE" */
        format: '',

        /* RGBE format, default 32-bit_rle_rgbe */
        gamma: 1.0,

        /* image has already been gamma corrected with given gamma. defaults to 1.0 (no correction) */
        exposure: 1.0,

        /* a value of 1.0 in an image corresponds to <exposure> watts/steradian/m^2. defaults to 1.0 */
        width: 0,
        height: 0
        /* image dimensions, width/height */

      };
      var line, match;

      if (buffer.pos >= buffer.byteLength || !(line = fgets(buffer))) {
        return rgbe_error(rgbe_read_error, 'no header found');
      }
      /* if you want to require the magic token then uncomment the next line */


      if (!(match = line.match(magic_token_re))) {
        return rgbe_error(rgbe_format_error, 'bad initial token');
      }

      header.valid |= RGBE_VALID_PROGRAMTYPE;
      header.programtype = match[1];
      header.string += line + '\n';

      while (true) {
        line = fgets(buffer);
        if (false === line) break;
        header.string += line + '\n';

        if ('#' === line.charAt(0)) {
          header.comments += line + '\n';
          continue; // comment line
        }

        if (match = line.match(gamma_re)) {
          header.gamma = parseFloat(match[1], 10);
        }

        if (match = line.match(exposure_re)) {
          header.exposure = parseFloat(match[1], 10);
        }

        if (match = line.match(format_re)) {
          header.valid |= RGBE_VALID_FORMAT;
          header.format = match[1]; //'32-bit_rle_rgbe';
        }

        if (match = line.match(dimensions_re)) {
          header.valid |= RGBE_VALID_DIMENSIONS;
          header.height = parseInt(match[1], 10);
          header.width = parseInt(match[2], 10);
        }

        if (header.valid & RGBE_VALID_FORMAT && header.valid & RGBE_VALID_DIMENSIONS) break;
      }

      if (!(header.valid & RGBE_VALID_FORMAT)) {
        return rgbe_error(rgbe_format_error, 'missing format specifier');
      }

      if (!(header.valid & RGBE_VALID_DIMENSIONS)) {
        return rgbe_error(rgbe_format_error, 'missing image size specifier');
      }

      return header;
    },
        RGBE_ReadPixels_RLE = function RGBE_ReadPixels_RLE(buffer, w, h) {
      var scanline_width = w;

      if ( // run length encoding is not allowed so read flat
      scanline_width < 8 || scanline_width > 0x7fff || // this file is not run length encoded
      2 !== buffer[0] || 2 !== buffer[1] || buffer[2] & 0x80) {
        // return the flat buffer
        return new Uint8Array(buffer);
      }

      if (scanline_width !== (buffer[2] << 8 | buffer[3])) {
        return rgbe_error(rgbe_format_error, 'wrong scanline width');
      }

      var data_rgba = new Uint8Array(4 * w * h);

      if (!data_rgba.length) {
        return rgbe_error(rgbe_memory_error, 'unable to allocate buffer space');
      }

      var offset = 0,
          pos = 0;
      var ptr_end = 4 * scanline_width;
      var rgbeStart = new Uint8Array(4);
      var scanline_buffer = new Uint8Array(ptr_end);
      var num_scanlines = h; // read in each successive scanline

      while (num_scanlines > 0 && pos < buffer.byteLength) {
        if (pos + 4 > buffer.byteLength) {
          return rgbe_error(rgbe_read_error);
        }

        rgbeStart[0] = buffer[pos++];
        rgbeStart[1] = buffer[pos++];
        rgbeStart[2] = buffer[pos++];
        rgbeStart[3] = buffer[pos++];

        if (2 != rgbeStart[0] || 2 != rgbeStart[1] || (rgbeStart[2] << 8 | rgbeStart[3]) != scanline_width) {
          return rgbe_error(rgbe_format_error, 'bad rgbe scanline format');
        } // read each of the four channels for the scanline into the buffer
        // first red, then green, then blue, then exponent


        var ptr = 0,
            count = void 0;

        while (ptr < ptr_end && pos < buffer.byteLength) {
          count = buffer[pos++];
          var isEncodedRun = count > 128;
          if (isEncodedRun) count -= 128;

          if (0 === count || ptr + count > ptr_end) {
            return rgbe_error(rgbe_format_error, 'bad scanline data');
          }

          if (isEncodedRun) {
            // a (encoded) run of the same value
            var byteValue = buffer[pos++];

            for (var i = 0; i < count; i++) {
              scanline_buffer[ptr++] = byteValue;
            } //ptr += count;

          } else {
            // a literal-run
            scanline_buffer.set(buffer.subarray(pos, pos + count), ptr);
            ptr += count;
            pos += count;
          }
        } // now convert data from buffer into rgba
        // first red, then green, then blue, then exponent (alpha)


        var l = scanline_width; //scanline_buffer.byteLength;

        for (var _i = 0; _i < l; _i++) {
          var off = 0;
          data_rgba[offset] = scanline_buffer[_i + off];
          off += scanline_width; //1;

          data_rgba[offset + 1] = scanline_buffer[_i + off];
          off += scanline_width; //1;

          data_rgba[offset + 2] = scanline_buffer[_i + off];
          off += scanline_width; //1;

          data_rgba[offset + 3] = scanline_buffer[_i + off];
          offset += 4;
        }

        num_scanlines--;
      }

      return data_rgba;
    };

    var RGBEByteToRGBFloat = function RGBEByteToRGBFloat(sourceArray, sourceOffset, destArray, destOffset) {
      var e = sourceArray[sourceOffset + 3];
      var scale = Math.pow(2.0, e - 128.0) / 255.0;
      destArray[destOffset + 0] = sourceArray[sourceOffset + 0] * scale;
      destArray[destOffset + 1] = sourceArray[sourceOffset + 1] * scale;
      destArray[destOffset + 2] = sourceArray[sourceOffset + 2] * scale;
    };

    var RGBEByteToRGBHalf = function RGBEByteToRGBHalf(sourceArray, sourceOffset, destArray, destOffset) {
      var e = sourceArray[sourceOffset + 3];
      var scale = Math.pow(2.0, e - 128.0) / 255.0;
      destArray[destOffset + 0] = DataUtils.toHalfFloat(sourceArray[sourceOffset + 0] * scale);
      destArray[destOffset + 1] = DataUtils.toHalfFloat(sourceArray[sourceOffset + 1] * scale);
      destArray[destOffset + 2] = DataUtils.toHalfFloat(sourceArray[sourceOffset + 2] * scale);
    };

    var byteArray = new Uint8Array(buffer);
    byteArray.pos = 0;
    var rgbe_header_info = RGBE_ReadHeader(byteArray);

    if (RGBE_RETURN_FAILURE !== rgbe_header_info) {
      var w = rgbe_header_info.width,
          h = rgbe_header_info.height,
          image_rgba_data = RGBE_ReadPixels_RLE(byteArray.subarray(byteArray.pos), w, h);

      if (RGBE_RETURN_FAILURE !== image_rgba_data) {
        var data, format, type;
        var numElements;

        switch (this.type) {
          case UnsignedByteType:
            data = image_rgba_data;
            format = RGBEFormat; // handled as THREE.RGBAFormat in shaders

            type = UnsignedByteType;
            break;

          case FloatType:
            numElements = image_rgba_data.length / 4 * 3;
            var floatArray = new Float32Array(numElements);

            for (var j = 0; j < numElements; j++) {
              RGBEByteToRGBFloat(image_rgba_data, j * 4, floatArray, j * 3);
            }

            data = floatArray;
            format = RGBFormat;
            type = FloatType;
            break;

          case HalfFloatType:
            numElements = image_rgba_data.length / 4 * 3;
            var halfArray = new Uint16Array(numElements);

            for (var _j = 0; _j < numElements; _j++) {
              RGBEByteToRGBHalf(image_rgba_data, _j * 4, halfArray, _j * 3);
            }

            data = halfArray;
            format = RGBFormat;
            type = HalfFloatType;
            break;

          default:
            console.error('THREE.RGBELoader: unsupported type: ', this.type);
            break;
        }

        return {
          width: w,
          height: h,
          data: data,
          header: rgbe_header_info.string,
          gamma: rgbe_header_info.gamma,
          exposure: rgbe_header_info.exposure,
          format: format,
          type: type
        };
      }
    }

    return null;
  };

  _proto.setDataType = function setDataType(value) {
    this.type = value;
    return this;
  };

  _proto.load = function load(url, onLoad, onProgress, onError) {
    function onLoadCallback(texture, texData) {
      switch (texture.type) {
        case UnsignedByteType:
          texture.encoding = RGBEEncoding;
          texture.minFilter = NearestFilter;
          texture.magFilter = NearestFilter;
          texture.generateMipmaps = false;
          texture.flipY = true;
          break;

        case FloatType:
          texture.encoding = LinearEncoding;
          texture.minFilter = LinearFilter;
          texture.magFilter = LinearFilter;
          texture.generateMipmaps = false;
          texture.flipY = true;
          break;

        case HalfFloatType:
          texture.encoding = LinearEncoding;
          texture.minFilter = LinearFilter;
          texture.magFilter = LinearFilter;
          texture.generateMipmaps = false;
          texture.flipY = true;
          break;
      }

      if (onLoad) onLoad(texture, texData);
    }

    return _DataTextureLoader.prototype.load.call(this, url, onLoadCallback, onProgress, onError);
  };

  return RGBELoader;
}(DataTextureLoader);var FreezableMesh = /*#__PURE__*/function (_THREE$Mesh) {
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

    geometry = geometry || Geometry.defaultGeometry;
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

    geometry = geometry || Geometry.defaultGeometry;
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
}(FreezableMesh);var InteractiveMesh = /*#__PURE__*/function (_EmittableMesh) {
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
    key: "isInteractiveMesh",
    get: function get() {
      return true;
    }
  }, {
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
}(EmittableMesh);var Texture = /*#__PURE__*/function () {
  function Texture() {}

  _createClass(Texture, null, [{
    key: "defaultTexture",
    get: function get() {
      return Texture.defaultTexture_ || (Texture.defaultTexture_ = new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDA2IDc5LjE2NDc1MywgMjAyMS8wMi8xNS0xMTo1MjoxMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjcyODFGQkE0QUMxODExRUJBQkRBQTEyMzUzMjUxRjg2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjcyODFGQkE1QUMxODExRUJBQkRBQTEyMzUzMjUxRjg2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzI4MUZCQTJBQzE4MTFFQkFCREFBMTIzNTMyNTFGODYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzI4MUZCQTNBQzE4MTFFQkFCREFBMTIzNTMyNTFGODYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz55AlN+AAAAZUlEQVR42uzQAQEAAAQDMPTvfD3YIqyT1GdTzwkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgAtWgAEAVbYDfaostxgAAAAASUVORK5CYII='));
    }
  }, {
    key: "gridTexture",
    get: function get() {
      return Texture.gridTexture_ || (Texture.gridTexture_ = new THREE.TextureLoader().load(environment.getPath(environment.textures.grid)));
    }
  }]);

  return Texture;
}();var MediaPlayMesh = /*#__PURE__*/function (_InteractiveMesh) {
  _inheritsLoose(MediaPlayMesh, _InteractiveMesh);

  MediaPlayMesh.getLoader = function getLoader() {
    return MediaPlayMesh.loader || (MediaPlayMesh.loader = new THREE.TextureLoader());
  };

  MediaPlayMesh.getTextureOff = function getTextureOff() {
    return MediaPlayMesh.textureOff || (MediaPlayMesh.textureOff = MediaPlayMesh.getLoader().load(environment.getPath('textures/ui/play-off.png')));
  };

  MediaPlayMesh.getTextureOn = function getTextureOn() {
    return MediaPlayMesh.textureOn || (MediaPlayMesh.textureOn = MediaPlayMesh.getLoader().load(environment.getPath('textures/ui/play-on.png')));
  };

  MediaPlayMesh.getMaterial = function getMaterial() {
    var material = new THREE.MeshBasicMaterial({
      map: MediaPlayMesh.getTextureOff(),
      color: 0xffffff,
      opacity: 1,
      transparent: true
    });
    return material;
  };

  _createClass(MediaPlayMesh, [{
    key: "playing",
    get: function get() {
      return this.playing_;
    },
    set: function set(playing) {
      if (this.playing_ !== playing) {
        this.playing_ = playing;
        var material = this.material;
        material.map = playing ? MediaPlayMesh.getTextureOn() : MediaPlayMesh.getTextureOff();
        this.onOut(); // material.needsUpdate = true;
        // this.emit('playing', playing);
        // console.log('MediaPlayMesh.playing', playing);
      }
    }
  }]);

  function MediaPlayMesh(host) {
    var _this;

    var geometry = Geometry.planeGeometry;
    var material = MediaPlayMesh.getMaterial();
    _this = _InteractiveMesh.call(this, geometry, material) || this;

    _defineProperty(_assertThisInitialized(_this), "playing_", false);

    _this.material = material;
    _this.host = host; // this.color = new THREE.Color(material.color.getHex());

    _this.colorOff = new THREE.Color(material.color.getHex());
    _this.colorOn = new THREE.Color('#888888'); // new THREE.Color('#0099ff');

    _this.addEventListener();

    return _this;
  }

  var _proto = MediaPlayMesh.prototype;

  _proto.update = function update(parent) {
    var scale = this.scale;
    var parentRatio = parent.scale.x / parent.scale.y;
    var size = 0.3;
    scale.set(size / parentRatio, size, 1); // console.log('MediaPlayMesh.setParentScale', parent.scale, scale, position);
  };

  _proto.disposeMaterial = function disposeMaterial() {
    if (this.material) {
      if (this.material.map && this.material.map.disposable !== false) {
        this.material.map.dispose();
      }

      this.material.dispose(); // this.material = null;
    }
  };

  _proto.dispose = function dispose() {
    this.removeEventListener();
    this.disposeMaterial();
  };

  _proto.onOver = function onOver() {
    var color = this.material.color;
    var target = this.colorOn;
    var material = this.material; // console.log('MediaPlayMesh.onOver');

    gsap.to(color, {
      r: target.r,
      g: target.g,
      b: target.b,
      duration: 0.2,
      ease: Power2.easeInOut
    });
    gsap.to(material, {
      opacity: 1,
      duration: 0.2,
      ease: Power2.easeInOut
    });
  };

  _proto.onOut = function onOut() {
    var color = this.material.color;
    var target = this.colorOff;
    var material = this.material; // console.log('MediaPlayMesh.onOut');

    gsap.to(color, {
      r: target.r,
      g: target.g,
      b: target.b,
      duration: 0.2,
      ease: Power2.easeInOut
    });
    gsap.to(material, {
      opacity: this.playing ? 0 : 1,
      duration: 0.2,
      ease: Power2.easeInOut
    });
  };

  _proto.addEventListener = function addEventListener() {
    this.onOver = this.onOver.bind(this);
    this.onOut = this.onOut.bind(this);
    this.on('over', this.onOver);
    this.on('out', this.onOut);
  };

  _proto.removeEventListener = function removeEventListener() {
    this.off('over', this.onOver);
    this.off('out', this.onOut);
  };

  return MediaPlayMesh;
}(InteractiveMesh);var MediaZoomMesh = /*#__PURE__*/function (_InteractiveMesh) {
  _inheritsLoose(MediaZoomMesh, _InteractiveMesh);

  MediaZoomMesh.getLoader = function getLoader() {
    return MediaZoomMesh.loader || (MediaZoomMesh.loader = new THREE.TextureLoader());
  };

  MediaZoomMesh.getTextureOff = function getTextureOff() {
    return MediaZoomMesh.textureOff || (MediaZoomMesh.textureOff = MediaZoomMesh.getLoader().load(environment.getPath('textures/ui/zoom-off.png')));
  };

  MediaZoomMesh.getTextureOn = function getTextureOn() {
    return MediaZoomMesh.textureOn || (MediaZoomMesh.textureOn = MediaZoomMesh.getLoader().load(environment.getPath('textures/ui/zoom-on.png')));
  };

  MediaZoomMesh.getMaterial = function getMaterial() {
    var material = new THREE.MeshBasicMaterial({
      map: MediaZoomMesh.getTextureOff(),
      color: 0xffffff,
      opacity: 1,
      transparent: true
    });
    return material;
  };

  _createClass(MediaZoomMesh, [{
    key: "zoomed",
    get: function get() {
      return this.zoomed_;
    },
    set: function set(zoomed) {
      if (this.zoomed_ !== zoomed) {
        this.zoomed_ = zoomed;
        var material = this.material;
        material.map = zoomed ? MediaZoomMesh.getTextureOn() : MediaZoomMesh.getTextureOff(); // material.needsUpdate = true;

        /*
        if (zoomed) {
        	// this.originalPosition = this.parent.position.clone();
        	// this.originalQuaternion = this.parent.rotation.clone();
        	// this.originalScale = this.parent.scale.clone();
        } else {
        	this.object.position.copy(this.originalPosition);
        	this.object.scale.copy(this.originalScale);
        	this.object.quaternion.copy(this.originalQuaternion);
        }
        this.updateObjectMatrix();
        */
        // console.log('MediaZoomMesh.zoomed', zoomed);
      }
    }
  }]);

  function MediaZoomMesh(host) {
    var _this;

    var geometry = Geometry.planeGeometry;
    var material = MediaZoomMesh.getMaterial();
    _this = _InteractiveMesh.call(this, geometry, material) || this;

    _defineProperty(_assertThisInitialized(_this), "zoomed_", false);

    _this.material = material;
    _this.host = host; // this.color = new THREE.Color(material.color.getHex());

    _this.colorOff = new THREE.Color(material.color.getHex());
    _this.colorOn = new THREE.Color('#888888'); // new THREE.Color('#0099ff');

    _this.object = new THREE.Object3D();

    _this.addEventListener();

    return _this;
  }

  var _proto = MediaZoomMesh.prototype;

  _proto.disposeMaterial = function disposeMaterial() {
    if (this.material) {
      if (this.material.map && this.material.map.disposable !== false) {
        this.material.map.dispose();
      }

      this.material.dispose(); // this.material = null;
    }
  };

  _proto.dispose = function dispose() {
    this.removeEventListener();
    this.disposeMaterial();
  };

  _proto.onOver = function onOver() {
    var color = this.material.color;
    var target = this.colorOn;
    var material = this.material; // console.log('MediaZoomMesh.onOver');

    gsap.to(color, {
      r: target.r,
      g: target.g,
      b: target.b,
      duration: 0.2,
      ease: Power2.easeInOut
      /*
      onUpdate: () => {
      	material.needsUpdate = true;
      },
      */

    }); // this.innerVisible = true;
  };

  _proto.onOut = function onOut() {
    var color = this.material.color;
    var target = this.colorOff;
    var material = this.material; // console.log('MediaZoomMesh.onOut');

    gsap.to(color, {
      r: target.r,
      g: target.g,
      b: target.b,
      duration: 0.2,
      ease: Power2.easeInOut
      /*
      onUpdate: () => {
      	material.needsUpdate = true;
      },
      */

    }); // this.innerVisible = false;
  };

  _proto.onToggle = function onToggle() {
    // console.log('MediaZoomMesh.onToggle', !this.zoomed);
    // this.zoomed = !this.zoomed;
    this.emit('zoomed', !this.zoomed);
  };

  _proto.addEventListener = function addEventListener() {
    this.onOver = this.onOver.bind(this);
    this.onOut = this.onOut.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.on('over', this.onOver);
    this.on('out', this.onOut);
    this.on('down', this.onToggle);
  };

  _proto.removeEventListener = function removeEventListener() {
    this.off('over', this.onOver);
    this.off('out', this.onOut);
    this.off('down', this.onToggle);
  };

  return MediaZoomMesh;
}(InteractiveMesh);var VERTEX_SHADER = "\nvarying vec2 vUvShader;\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\tvUvShader = uv;\n\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}\n";
var FRAGMENT_SHADER = "\n#define USE_MAP\n\nvarying vec2 vUvShader;\nuniform vec3 diffuse;\nuniform float opacity;\n\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\n// uniform sampler2D map;\nuniform sampler2D playMap;\nuniform vec2 mapResolution;\nuniform vec2 playMapResolution;\nuniform float mapTween;\nuniform float playMapTween;\nuniform vec3 playMapColor;\nuniform bool isVideo;\n\nvoid main() {\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4(vec3(1.0), opacity);\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\n\t// main\n\tvec4 mapRgba = texture2D(map, vUvShader);\n\tmapRgba = mapTexelToLinear(mapRgba);\n\tif (isVideo) {\n\t\tvec4 playMapRgba = texture2D(playMap, vUvShader);\n\t\tplayMapRgba = mapTexelToLinear(playMapRgba);\n\t\tdiffuseColor = vec4(mapRgba.rgb + (playMapColor * playMapTween * 0.2) + (playMapRgba.rgb * mapTween * playMapRgba.a), opacity);\n\t} else {\n\t\tdiffuseColor = vec4(mapRgba.rgb + (playMapColor * playMapTween * 0.2), opacity);\n\t}\n\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\n\tReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\n\n\t// accumulation (baked indirect lighting only)\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapRgba = texture2D(lightMap, vUv2);\n\t\treflectedLight.indirectDiffuse += lightMapTexelToLinear(lightMapRgba).rgb * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3(1.0);\n\t#endif\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\n\t#include <envmap_fragment>\n\n\tgl_FragColor = vec4(outgoingLight, diffuseColor.a);\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n";
var FRAGMENT_CHROMA_KEY_SHADER = "\n#define USE_MAP\n#define threshold 0.55\n#define padding 0.05\n\nvarying vec2 vUvShader;\nuniform vec3 diffuse;\nuniform float opacity;\n\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\n// uniform sampler2D map;\nuniform sampler2D playMap;\nuniform vec2 mapResolution;\nuniform vec2 playMapResolution;\nuniform float mapTween;\nuniform float playMapTween;\nuniform vec3 playMapColor;\nuniform vec3 chromaKeyColor;\nuniform bool isVideo;\n\nvoid main() {\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4(vec3(1.0), opacity);\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\n\t// main\n\tvec4 mapRgba = texture2D(map, vUvShader);\n\tvec4 chromaKey = vec4(chromaKeyColor, 1.0);\n    vec3 chromaKeyDiff = mapRgba.rgb - chromaKey.rgb;\n    float chromaKeyValue = smoothstep(threshold - padding, threshold + padding, dot(chromaKeyDiff, chromaKeyDiff));\n\tmapRgba = mapTexelToLinear(mapRgba);\n\t/*\n\tif (isVideo) {\n\t\tvec4 playMapRgba = texture2D(playMap, vUvShader);\n\t\tplayMapRgba = mapTexelToLinear(playMapRgba);\n\t\tdiffuseColor = vec4(mapRgba.rgb + (playMapColor * playMapTween * 0.2) + (playMapRgba.rgb * mapTween * playMapRgba.a), opacity * chromaKeyValue);\n\t} else {\n\t\tdiffuseColor = vec4(mapRgba.rgb + (playMapColor * playMapTween * 0.2), opacity * chromaKeyValue);\n\t}\n\t*/\n\t// diffuseColor = vec4(mapRgba.rgb + (playMapColor * playMapTween * 0.2), opacity * chromaKeyValue);\n\tdiffuseColor = vec4(mapRgba.rgb, opacity * chromaKeyValue);\n\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\n\tReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\n\n\t// accumulation (baked indirect lighting only)\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapRgba = texture2D(lightMap, vUv2);\n\t\treflectedLight.indirectDiffuse += lightMapTexelToLinear(lightMapRgba).rgb * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3(1.0);\n\t#endif\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\n\t#include <envmap_fragment>\n\n\tgl_FragColor = vec4(outgoingLight, diffuseColor.a);\n\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n";

var MediaMesh = /*#__PURE__*/function (_InteractiveMesh) {
  _inheritsLoose(MediaMesh, _InteractiveMesh);

  MediaMesh.getMaterial = function getMaterial(useChromaKey) {
    var material = new THREE.ShaderMaterial({
      depthTest: true,
      // !!!
      depthWrite: true,
      transparent: true,
      // side: THREE.DoubleSide,
      // blending: THREE.AdditiveBlending,
      vertexShader: VERTEX_SHADER,
      fragmentShader: useChromaKey ? FRAGMENT_CHROMA_KEY_SHADER : FRAGMENT_SHADER,
      uniforms: {
        map: {
          type: 't',
          value: Texture.defaultTexture
        },
        mapResolution: {
          value: new THREE.Vector2()
        },
        mapTween: {
          value: 1
        },
        color: {
          value: new THREE.Color('#FFFFFF')
        },
        playMap: {
          type: 't',
          value: Texture.defaultTexture
        },
        playMapResolution: {
          value: new THREE.Vector2()
        },
        playMapTween: {
          value: 0
        },
        playMapColor: {
          value: new THREE.Color('#000000')
        },
        opacity: {
          value: 0
        },
        isVideo: {
          value: false
        }
      },
      extensions: {
        fragDepth: true
      }
    });
    return material;
  };

  MediaMesh.getChromaKeyMaterial = function getChromaKeyMaterial(chromaKeyColor) {
    if (chromaKeyColor === void 0) {
      chromaKeyColor = [0.0, 1.0, 0.0];
    }

    var material = new THREE.ShaderMaterial({
      depthTest: true,
      // !!!
      depthWrite: true,
      transparent: true,
      // side: THREE.DoubleSide,
      // blending: THREE.AdditiveBlending,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_CHROMA_KEY_SHADER,
      uniforms: {
        map: {
          type: 't',
          value: null
        },
        // Texture.defaultTexture
        mapResolution: {
          value: new THREE.Vector2()
        },
        mapTween: {
          value: 1
        },
        color: {
          value: new THREE.Color('#FFFFFF')
        },
        chromaKeyColor: {
          value: new THREE.Color(chromaKeyColor[0], chromaKeyColor[1], chromaKeyColor[2])
        },
        playMap: {
          type: 't',
          value: Texture.defaultTexture
        },
        playMapResolution: {
          value: new THREE.Vector2()
        },
        playMapTween: {
          value: 0
        },
        playMapColor: {
          value: new THREE.Color('#000000')
        },
        opacity: {
          value: 0
        },
        isVideo: {
          value: false
        }
      },
      extensions: {
        fragDepth: true
      }
    });
    material.map = true;
    return material;
  };

  MediaMesh.isPublisherStream = function isPublisherStream(stream) {
    return stream.clientInfo && stream.clientInfo.role === RoleType.Publisher && stream.clientInfo.uid === stream.getId();
  };

  MediaMesh.isAttendeeStream = function isAttendeeStream(stream) {
    return stream.clientInfo && stream.clientInfo.role === RoleType.Attendee && stream.clientInfo.uid === stream.getId();
  };

  MediaMesh.isSmartDeviceStream = function isSmartDeviceStream(stream) {
    return stream.clientInfo && stream.clientInfo.role === RoleType.SmartDevice && stream.clientInfo.uid === stream.getId();
  };

  MediaMesh.isPublisherScreen = function isPublisherScreen(stream) {
    // console.log(stream.clientInfo, stream.clientInfo ? [stream.clientInfo.role, stream.clientInfo.screenUid, stream.getId()] : null);
    return stream.clientInfo && stream.clientInfo.role === RoleType.Publisher && stream.clientInfo.screenUid === stream.getId();
  };

  MediaMesh.isAttendeeScreen = function isAttendeeScreen(stream) {
    return stream.clientInfo && stream.clientInfo.role === RoleType.Attendee && stream.clientInfo.screenUid === stream.getId();
  };

  MediaMesh.getTypeMatcher = function getTypeMatcher(assetType) {
    var matcher;

    switch (assetType.name) {
      case AssetType.PublisherStream.name:
        matcher = this.isPublisherStream;
        break;

      case AssetType.AttendeeStream.name:
        matcher = this.isAttendeeStream;
        break;

      case AssetType.SmartDeviceStream.name:
        matcher = this.isSmartDeviceStream;
        break;

      case AssetType.PublisherScreen.name:
        matcher = this.isPublisherScreen;
        break;

      case AssetType.AttendeeScreen.name:
        matcher = this.isAttendeeScreen;
        break;

      default:
        matcher = function matcher(stream) {
          return false;
        };

    }

    return matcher;
  };

  MediaMesh.getStreamId$ = function getStreamId$(item) {
    var _this2 = this;

    if (!item.asset) {
      return rxjs.of(null);
    }

    var assetType = item.asset.type;
    var file = item.asset.file; // console.log(item.asset, assetIsStream(item.asset));

    if (assetIsStream(item.asset)) {
      // console.log('MediaMesh.getStreamId$', item.asset.type.name);
      return StreamService.streams$.pipe(operators.map(function (streams) {
        var stream;
        var i = 0;

        var matchType = _this2.getTypeMatcher(assetType);

        streams.forEach(function (x) {
          // console.log('MediaMesh.getStreamId$', x.clientInfo, x.clientInfo ? [x.clientInfo.screenUid, x.getId()] : null);
          if (matchType(x)) {
            if (i === item.asset.index) {
              stream = x;
            }

            i++;
          }
        });

        if (stream) {
          // console.log('MediaMesh.getStreamId$', assetType.name, stream.clientInfo.role, stream.getId());
          return stream.getId();
        } else {
          // console.log('MediaMesh.getStreamId$.notfound', assetType.name);
          return null;
        }
      }));
    } else {
      return rxjs.of(file);
    }
  };

  MediaMesh.getMaterialByItem = function getMaterialByItem(item) {
    var material;

    if (item.asset && item.asset.chromaKeyColor) {
      material = MediaMesh.getChromaKeyMaterial(item.asset.chromaKeyColor);
    } else if (item.asset) {
      material = new THREE.MeshBasicMaterial({
        color: 0x888888
      }); // MediaMesh.getMaterial();
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
        mapTween: 1,
        playMapTween: 0,
        opacity: 0
      };
    }

    return uniforms;
  };

  _createClass(MediaMesh, [{
    key: "editing",
    get: function get() {
      return this.editing_;
    },
    set: function set(editing) {
      if (this.editing_ !== editing) {
        this.editing_ = editing; // this.zoomed = editing ? false : (this.view.type.name === 'media' ? true : this.zoomed);

        this.zoomed = this.view.type.name === 'media' ? true : editing ? false : this.zoomed;
      }
    }
  }]);

  function MediaMesh(item, view, geometry, host) {
    var _this;

    var material = MediaMesh.getMaterialByItem(item);
    _this = _InteractiveMesh.call(this, geometry, material) || this; // this.renderOrder = environment.renderOrder.plane;

    _defineProperty(_assertThisInitialized(_this), "zoomed_", false);

    _this.item = item;
    _this.view = view;
    _this.items = view.items;
    _this.host = host;
    _this.uniforms = MediaMesh.getUniformsByItem(item);
    _this.object = new THREE.Object3D();
    _this.tempPosition = new THREE.Vector3();
    _this.tempRotation = new THREE.Vector3();
    var mediaLoader = _this.mediaLoader = new MediaLoader(item);
    _this.onOver = _this.onOver.bind(_assertThisInitialized(_this));
    _this.onOut = _this.onOut.bind(_assertThisInitialized(_this));
    _this.onToggle = _this.onToggle.bind(_assertThisInitialized(_this));
    _this.onZoomed = _this.onZoomed.bind(_assertThisInitialized(_this));

    if (_this.view.type.name !== 'media') {
      _this.addZoomBtn();
    }

    _this.addPlayBtn();

    _this.userData.render = function (time, tick) {
      _this.render(_assertThisInitialized(_this), time, tick);
    };

    return _this;
  }

  var _proto = MediaMesh.prototype;

  _proto.load = function load(callback) {
    var _this3 = this;

    this.remove(this.playBtn);

    if (this.zoomBtn) {
      this.remove(this.zoomBtn);
    }

    if (!this.item.asset) {
      this.onAppear();

      if (typeof callback === 'function') {
        callback(this);
      }

      return;
    }

    var material = this.material;
    var mediaLoader = this.mediaLoader;
    mediaLoader.load(function (texture) {
      // console.log('MediaMesh.texture', texture);
      if (texture) {
        texture.encoding = THREE.sRGBEncoding;
        material.map = texture; // !!! Enables USE_MAP

        if (material.uniforms) {
          material.uniforms.map.value = texture; // material.uniforms.mapResolution.value.x = texture.image.width;
          // material.uniforms.mapResolution.value.y = texture.image.height;

          material.uniforms.mapResolution.value = new THREE.Vector2(texture.image.width || texture.image.videoWidth, texture.image.height || texture.image.videoHeight);

          if (mediaLoader.isPlayableVideo) {
            _this3.makePlayMap(texture, function (playMap) {
              // console.log('MediaMesh.playMap', playMap);
              playMap.minFilter = THREE.LinearFilter;
              playMap.magFilter = THREE.LinearFilter;
              playMap.mapping = THREE.UVMapping; // playMap.format = THREE.RGBFormat;

              playMap.wrapS = THREE.RepeatWrapping;
              playMap.wrapT = THREE.RepeatWrapping;
              material.uniforms.playMap.value = playMap; // material.uniforms.playMapResolution.value.x = playMap.image.width;
              // material.uniforms.playMapResolution.value.y = playMap.image.height;

              material.uniforms.playMapResolution.value = new THREE.Vector2(playMap.image.width, playMap.image.height); // console.log(material.uniforms.playMapResolution.value, playMap);

              material.needsUpdate = true;
            });
          }
        }
      }

      material.needsUpdate = true;

      _this3.onAppear();

      if (mediaLoader.isPlayableVideo) {
        if (material.uniforms) {
          material.uniforms.isVideo.value = true;
        }

        _this3.on('over', _this3.onOver);

        _this3.on('out', _this3.onOut);

        _this3.on('down', _this3.onToggle);

        _this3.add(_this3.playBtn);
      }

      if (_this3.zoomBtn) {
        _this3.add(_this3.zoomBtn);
      }

      if (typeof callback === 'function') {
        callback(_this3);
      }
    });
  };

  _proto.makePlayMap = function makePlayMap(texture, callback) {
    var aw = texture.image.width || texture.image.videoWidth;
    var ah = texture.image.height || texture.image.videoHeight;
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
      var playMap = new THREE.CanvasTexture(canvas);

      if (typeof callback === 'function') {
        callback(playMap);
      }
    };

    image.crossOrigin = 'anonymous';
    image.src = environment.getPath('textures/ui/play.png');
  };

  _proto.events$ = function events$() {
    var _this4 = this;

    var item = this.item;
    var items = this.items;

    if (item.asset && item.asset.linkedPlayId) {
      this.freeze();
    }

    return MediaLoader.events$.pipe(operators.filter(function (event) {
      return event.loader.item && event.loader.item.id === item.id;
    }), operators.map(function (event) {
      if (event instanceof MediaLoaderPlayEvent) {
        _this4.playing = true;

        if (_this4.playBtn) {
          _this4.playBtn.playing = true;
        }

        _this4.emit('playing', true);

        _this4.onOut();
      } else if (event instanceof MediaLoaderPauseEvent) {
        _this4.playing = false;

        if (_this4.playBtn) {
          _this4.playBtn.playing = false;
        }

        _this4.emit('playing', false);

        _this4.onOut();
      } else if (event instanceof MediaLoaderTimeSetEvent) {
        _this4.emit('currentTime', event.loader.video.currentTime);
      } // console.log('MediaMesh', this.playing);


      if (item.asset && item.asset.linkedPlayId) {
        var eventItem = items.find(function (x) {
          return x.asset && event.src.indexOf(x.asset.file) !== -1 && event.id === item.asset.linkedPlayId;
        });

        if (eventItem) {
          // console.log('MediaLoader.events$.eventItem', event, eventItem);
          if (event instanceof MediaLoaderPlayEvent) {
            _this4.play();
          } else if (event instanceof MediaLoaderPauseEvent) {
            _this4.pause();
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
          material.uniforms.opacity.value = uniforms.opacity; // material.needsUpdate = true;
        }
      });
    }

    this.zoomed = this.view.type.name === 'media' ? true : this.editing ? false : this.zoomed;
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
          material.uniforms.opacity.value = uniforms.opacity; // material.needsUpdate = true;
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
        mapTween: this.playing ? 0 : 1,
        playMapTween: 1,
        opacity: 1,
        ease: Power2.easeInOut,
        overwrite: true,
        onUpdate: function onUpdate() {
          material.uniforms.mapTween.value = uniforms.mapTween;
          material.uniforms.playMapTween.value = uniforms.playMapTween;
          material.uniforms.opacity.value = uniforms.opacity; // material.needsUpdate = true;
        }
      });
    }

    if (this.playBtn) {
      this.playBtn.onOver();
    }
  };

  _proto.onOut = function onOut() {
    var uniforms = this.uniforms;
    var material = this.material;

    if (material.uniforms) {
      gsap.to(uniforms, {
        duration: 0.4,
        mapTween: this.playing ? 0 : 1,
        playMapTween: 0,
        opacity: 1,
        ease: Power2.easeInOut,
        overwrite: true,
        onUpdate: function onUpdate() {
          material.uniforms.mapTween.value = uniforms.mapTween;
          material.uniforms.playMapTween.value = uniforms.playMapTween;
          material.uniforms.opacity.value = uniforms.opacity; // material.needsUpdate = true;
        }
      });
    }

    if (this.playBtn) {
      this.playBtn.onOut();
    }
  };

  _proto.onToggle = function onToggle() {
    this.playing = this.mediaLoader.toggle();

    if (this.playBtn) {
      this.playBtn.playing = this.playing;
    }

    this.emit('playing', this.playing);
    this.onOut();
  };

  _proto.play = function play() {
    this.mediaLoader.play();
  };

  _proto.pause = function pause() {
    this.mediaLoader.pause();
  };

  _proto.setPlayingState = function setPlayingState(playing) {
    if (this.playing !== playing) {
      this.playing = playing;
      playing ? this.mediaLoader.play() : this.mediaLoader.pause();
      this.onOut();

      if (this.playBtn) {
        this.playBtn.playing = playing;
      }
    }
  };

  _proto.setZoomedState = function setZoomedState(zoomed) {
    this.zoomed = zoomed;
  };

  _proto.setCurrentTime = function setCurrentTime(currentTime) {
    // !!!
    if (this.mediaLoader.video) {
      this.mediaLoader.video.currentTime = currentTime;
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

      this.material.dispose(); // this.material = null;
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
    this.removePlayBtn();
    this.removeZoomBtn();
    this.disposeMediaLoader();
  };

  _proto.addPlayBtn = function addPlayBtn() {
    var playBtn = this.playBtn = new MediaPlayMesh(this.host);
    playBtn.on('over', this.onOver);
    playBtn.on('out', this.onOut);
    playBtn.on('down', this.onToggle);
    playBtn.position.z = 0.01;
  };

  _proto.removePlayBtn = function removePlayBtn() {
    if (this.playBtn) {
      this.playBtn.off('over', this.onOver);
      this.playBtn.off('out', this.onOut);
      this.playBtn.off('down', this.onToggle);
      this.playBtn.dispose();
      delete this.playBtn;
    }
  };

  _proto.onZoomed = function onZoomed(zoomed) {
    this.zoomed = zoomed;
    this.emit('zoomed', zoomed);
  };

  _proto.addZoomBtn = function addZoomBtn() {
    var zoomBtn = this.zoomBtn = new MediaZoomMesh(this.host);
    zoomBtn.on('zoomed', this.onZoomed);
  };

  _proto.removeZoomBtn = function removeZoomBtn() {
    if (this.zoomBtn) {
      this.zoomBtn.off('zoomed', this.onZoomed);
      this.zoomBtn.dispose();
      delete this.zoomBtn;
    }
  };

  _proto.updateFromItem = function updateFromItem(item) {
    // console.log('MediaMesh.updateFromItem', item);
    if (item.position) {
      this.position.fromArray(item.position);
    }

    if (item.rotation) {
      this.rotation.fromArray(item.rotation);
    }

    if (item.scale) {
      this.scale.fromArray(item.scale);
    }

    if (this.playBtn) {
      this.playBtn.update(this);
    }
    /*
    if (this.zoomBtn) {
    	this.zoomBtn.update(this);
    }
    */


    this.updateZoom();
  };

  _proto.updateZoom = function updateZoom() {
    this.originalPosition = this.position.clone();
    this.originalScale = this.scale.clone();
    this.originalQuaternion = this.quaternion.clone();
    this.object.position.copy(this.originalPosition);
    this.object.scale.copy(this.originalScale);
    this.object.quaternion.copy(this.originalQuaternion);

    if (this.zoomBtn) {
      var scale = this.zoomBtn.scale;
      var position = this.zoomBtn.position;
      var ratio = this.scale.x / this.scale.y;
      var size = 0.1;
      scale.set(size / ratio, size, 1);
      position.x = 0.5 - size / ratio / 2;
      position.y = 0.5 - size / 2;
      position.z = 0.01;
    } // console.log('MediaMesh.updateZoom', this.scale);

  } // zoom
  ;

  _proto.render = function render(time, tick) {
    /*
    if (this.zoomBtn && !this.editing) {
    	this.zoomBtn.render(time, tick);
    }
    */
    if (!this.editing) {
      var object = this.object;
      /*
      parent.position.lerp(object.position, 0.2);
      parent.scale.lerp(object.scale, 0.2);
      parent.quaternion.slerp(object.quaternion, 0.2);
      */

      if (this.zoomed && !this.host.renderer.xr.isPresenting) {
        this.updateObjectMatrix();
      }

      this.position.copy(object.position);
      this.scale.copy(object.scale);
      this.quaternion.copy(object.quaternion);
    }
  };

  _proto.updateObjectMatrix = function updateObjectMatrix() {
    var object = this.object;
    var host = this.host;

    if (this.zoomed) {
      // const cameraGroup = host.cameraGroup;
      var originalScale = this.originalScale;
      var camera = host.camera,
          fov = camera.fov,
          aspect = camera.aspect,
          scale;
      var position = this.tempPosition;
      var rotation = this.tempRotation; // const aspect = originalScale.x / originalScale.y;

      scale = 0.01; // 0.01;

      var xr = host.renderer.xr;

      if (xr.isPresenting) {
        camera = xr.getCamera(camera);
        var mat = camera.projectionMatrix.elements;
        var a = mat[0];
        var b = mat[5]; // const c = mat[10];
        // const d = mat[14];

        aspect = b / a; // const k = (c - 1) / (c + 1);
        // const clip_min = (d * (1 - k)) / (2 * k);
        // const clip_max = k * clip_min;

        var RAD2DEG = 180 / 3.14159265358979323846;
        fov = RAD2DEG * (2 * Math.atan(1 / b));
        scale = 1;
      }

      object.scale.copy(originalScale).multiplyScalar(scale);
      var distance = Host.getDistanceToCamera(camera, fov, aspect, object.scale);
      camera.getWorldDirection(rotation);
      rotation.multiplyScalar(distance);
      position.set(0, 0, 0);
      camera.localToWorld(position);
      position.add(rotation);
      object.position.copy(position);
      object.lookAt(Host.origin);

      if (xr.isPresenting) {
        object.position.y -= object.scale.y / 2;
      }
    }
  };

  _createClass(MediaMesh, [{
    key: "zoomed",
    get: function get() {
      return this.zoomed_;
    },
    set: function set(zoomed) {
      if (this.zoomed_ !== zoomed) {
        this.zoomed_ = zoomed;

        if (zoomed) {
          this.renderOrder = environment.renderOrder.panel + 5;
          this.material.depthTest = false; // this.originalPosition = this.position.clone();
          // this.originalQuaternion = this.rotation.clone();
          // this.originalScale = this.scale.clone();
        } else {
          this.renderOrder = 0;
          this.material.depthTest = true;
          this.object.position.copy(this.originalPosition);
          this.object.scale.copy(this.originalScale);
          this.object.quaternion.copy(this.originalQuaternion);
        }

        this.material.needsUpdate = true;
        this.updateObjectMatrix();

        if (this.zoomBtn) {
          this.zoomBtn.zoomed = zoomed;
        }
      }
    }
  }]);

  return MediaMesh;
}(InteractiveMesh);var OrbitMode = {
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
var DOLLY_MAX = 75; // 115

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
        this.markAsDirty();
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
        this.markAsDirty();
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
        this.markAsDirty();
      }
    }
  }, {
    key: "controlled",
    get: function get() {
      return StateService.state.controlling && StateService.state.controlling !== StateService.state.uid;
    }
  }, {
    key: "controlling",
    get: function get() {
      return StateService.state.controlling && StateService.state.controlling === StateService.state.uid;
    }
  }, {
    key: "silencing",
    get: function get() {
      return StateService.state.silencing;
    }
  }, {
    key: "silenced",
    get: function get() {
      return StateService.state.silencing && StateService.state.role === RoleType.Streamer;
    }
  }, {
    key: "spyed",
    get: function get() {
      return StateService.state.spying && StateService.state.spying === StateService.state.uid;
    }
  }, {
    key: "spying",
    get: function get() {
      return StateService.state.spying && StateService.state.spying !== StateService.state.uid;
    }
  }, {
    key: "isMediaView",
    get: function get() {
      return ViewService.view && ViewService.view.type.name === ViewType.Media.name;
    }
  }, {
    key: "locked",
    get: function get() {
      return this.controlled || this.spying || this.isMediaView;
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
      this.markAsDirty();
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
      return !_this.locked;
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
      return _this.markAsDirty();
    }), operators.switchMap(function (event) {
      return _this.events$;
    }));
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

        _this2.markAsDirty();
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
    this.markAsDirty();
  };

  _proto.lookAt = function lookAt(object) {
    // console.log('OrbitService.lookAt', object);
    if (object) {
      var position = object.position.clone();
      var camera = this.camera;
      var cameraGroup = camera.parent;
      position = cameraGroup.worldToLocal(position);
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
      this.markAsDirty();
    }
  };

  _proto.setVRCamera = function setVRCamera(camera) {
    if (camera) {
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
      this.markAsDirty();
    }
  };

  _proto.render = function render() {
    // slowly rotate scene when not hosted
    if (!StateService.state.hosted) {
      this.longitude += 0.025;
      this.isDirty = true;
    }

    if (this.isDirty) {
      this.isDirty = false;
      this.update();
    }
  };

  _proto.markAsDirty = function markAsDirty() {
    this.isDirty = true;
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
    var cameraGroup = camera.parent;

    switch (this.mode_) {
      case OrbitMode.Model:
        radius =  3;
        position.copy(this.position);
        target.x = this.position.x + radius * Math.sin(phi) * Math.cos(theta);
        target.y = this.position.y + radius * Math.cos(phi);
        target.z = this.position.z + radius * Math.sin(phi) * Math.sin(theta); // position = cameraGroup.worldToLocal(position);

        target = cameraGroup.worldToLocal(target);
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
        } // !!! position for walking panorama-grid
        // position = cameraGroup.worldToLocal(position);


        target = cameraGroup.worldToLocal(target); // camera.position.copy(position);

        camera.target.copy(target);
        camera.position.copy(position);
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
  };

  return OrbitService;
}();
OrbitService.orbitMoveEvent = orbitMoveEvent;var PanoramaLoader = /*#__PURE__*/function () {
  function PanoramaLoader() {}

  PanoramaLoader.load = function load(asset, renderer, callback) {
    MediaLoader.events$.next(new MediaLoaderDisposeEvent(this));
    this.video = null;

    if (!asset) {
      return;
    }

    if (asset.type.name === AssetType.PublisherStream.name) {
      return this.loadPublisherStreamBackground(renderer, callback);
    } else if (asset.file.indexOf('.mp4') !== -1 || asset.file.indexOf('.webm') !== -1) {
      return this.loadVideoBackground(environment.getPath(asset.folder), asset.file, renderer, callback);
    } else if (asset.file.indexOf('.m3u8') !== -1) {
      return this.loadHlslVideoBackground(asset.file, renderer, callback);
    } else if (asset.file.indexOf('.hdr') !== -1) {
      return this.loadRgbeBackground(environment.getPath(asset.folder), asset.file, renderer, callback);
    } else {
      return this.loadBackgroundImageService(environment.getPath(asset.folder), asset.file, renderer, callback);
    }
  };

  PanoramaLoader.loadBackground = function loadBackground(folder, file, renderer, callback) {
    var progressRef = LoaderService.getRef();
    var loader = new THREE.TextureLoader();
    loader.setPath(folder).load(file, function (texture) {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.mapping = THREE.UVMapping;
      texture.format = THREE.RGBFormat;
      texture.needsUpdate = true;

      if (typeof callback === 'function') {
        callback(texture);
      }

      LoaderService.setProgress(progressRef, 1);
    }, function (request) {
      LoaderService.setProgress(progressRef, request.loaded, request.total);
    });
    return loader;
  };

  PanoramaLoader.loadBackgroundImageService = function loadBackgroundImageService(folder, file, renderer, callback) {
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
      var texture = new THREE.Texture(image);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.mapping = THREE.UVMapping;
      texture.format = THREE.RGBFormat;
      texture.needsUpdate = true;

      if (typeof callback === 'function') {
        callback(texture);
        URL.revokeObjectURL(event.data);
      }

      LoaderService.setProgress(progressRef, 1);
    });
  };

  PanoramaLoader.loadRgbeBackground = function loadRgbeBackground(folder, file, renderer, callback) {
    var progressRef = LoaderService.getRef();
    var loader = new RGBELoader();
    loader.setDataType(THREE.UnsignedByteType).setPath(folder).load(file, function (texture) {
      if (typeof callback === 'function') {
        callback(texture, true);
      }

      LoaderService.setProgress(progressRef, 1);
    }, function (request) {
      LoaderService.setProgress(progressRef, request.loaded, request.total);
    });
    return loader;
  };

  PanoramaLoader.loadHlslVideoBackground = function loadHlslVideoBackground(src, renderer, callback) {
    var progressRef = LoaderService.getRef();
    var video = document.createElement('video');

    var onPlaying = function onPlaying() {
      video.oncanplay = null;
      var texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.mapping = THREE.UVMapping;
      texture.format = THREE.RGBFormat;
      texture.needsUpdate = true;

      if (typeof callback === 'function') {
        callback(texture);
      }

      LoaderService.setProgress(progressRef, 1);
    };

    video.oncanplay = function () {
      // console.log('videoReady', videoReady);
      onPlaying();
    };

    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        hls.loadSource(src);
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          video.play();
        });
      });
    }
  } // !!! implementing medialoader interface
  // static get progress
  // static set progress
  // static play
  // static pause
  ;

  PanoramaLoader.play = function play(silent) {
    var _this = this;

    // console.log('PanoramaLoader.play');
    var video = this.video;

    if (video) {
      video.muted = this.muted_;
      video.play().then(function () {
        // console.log('PanoramaLoader.play.success', this.video.src);
        if (!silent) {
          MediaLoader.events$.next(new MediaLoaderPlayEvent(_this));
        }
      }, function (error) {
        console.log('PanoramaLoader.play.error', video.src, error);
      });
    }
  };

  PanoramaLoader.pause = function pause(silent) {
    // console.log('PanoramaLoader.pause');
    var video = this.video;

    if (video) {
      video.muted = true;
      video.pause();

      if (!silent) {
        MediaLoader.events$.next(new MediaLoaderPauseEvent(this));
      }
    }
  };

  PanoramaLoader.loadVideoBackground = function loadVideoBackground(folder, file, renderer, callback) {
    var _this2 = this;

    var progressRef = LoaderService.getRef();
    this.video = true;
    var video = this.video;

    var onCanPlay = function onCanPlay() {
      // console.log('PanoramaLoader', 'onPlaying');
      video.oncanplay = null;
      var texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.mapping = THREE.UVMapping;
      texture.format = THREE.RGBFormat;
      texture.needsUpdate = true;

      if (typeof callback === 'function') {
        callback(texture);
      } // console.log('loadVideoBackground.loaded');


      LoaderService.setProgress(progressRef, 1);

      {
        _this2.play();
      }
    };

    var onTimeUpdate = function onTimeUpdate() {
      MediaLoader.events$.next(new MediaLoaderTimeUpdateEvent(_this2));
    };

    var onEnded = function onEnded() {
    };

    video.oncanplay = onCanPlay;
    video.ontimeupdate = onTimeUpdate;
    video.onended = onEnded;
    video.crossOrigin = 'anonymous';
    video.src = folder + file;
    video.load();
  };

  PanoramaLoader.loadPublisherStreamBackground = function loadPublisherStreamBackground(renderer, callback) {
    var _this3 = this;

    var onPublisherStreamId = function onPublisherStreamId(publisherStreamId) {
      var video = document.querySelector("#stream-" + publisherStreamId + " video");

      if (!video) {
        return;
      }

      var onPlaying = function onPlaying() {
        var texture = _this3.texture = new THREE.VideoTexture(video);
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

    StreamService.getPublisherStreamId$().pipe(operators.first()).subscribe(function (publisherStreamId) {
      return onPublisherStreamId(publisherStreamId);
    });
  };

  _createClass(PanoramaLoader, null, [{
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

        _video.loop = true;
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
      this.muted_ = muted; // console.log('PanoramaLoader.muted', muted, this.video);

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
  }, {
    key: "progress",
    get: function get() {
      var video = this.video;

      if (video) {
        return video.currentTime / video.duration;
      } else {
        return 0;
      }
    },
    set: function set(progress) {
      var video = this.video;

      if (video) {
        var currentTime = video.duration * progress;

        if (video.seekable.length > progress && video.currentTime !== currentTime) {
          // console.log('PanoramaLoader', 'progress', progress, 'currentTime', currentTime, 'duration', this.video.duration, 'seekable', this.video.seekable);
          video.currentTime = currentTime;
          MediaLoader.events$.next(new MediaLoaderTimeSetEvent(this));
        }
      }
    }
  }]);

  return PanoramaLoader;
}();// import * as THREE from 'three';

var Panorama = /*#__PURE__*/function () {
  function Panorama(renderer) {
    this.muted_ = false;
    this.subscription = StateService.state$.subscribe(function (state) {
      return PanoramaLoader.muted = state.volumeMuted;
    });
    this.tween = 0;
    this.create(renderer);
  }

  var _proto = Panorama.prototype;

  _proto.create = function create(renderer) {
    var _this = this;

    this.renderer = renderer;
    this.onCubeMapDispose = this.onCubeMapDispose.bind(this);
    var geometry = new THREE.BoxGeometry(202, 202, 202);
    var material = this.getBlackMaterial();
    var mesh = new InteractiveMesh(geometry, material);
    mesh.userData = {
      render: function render(time, tick, renderer, scene, camera) {
        mesh.matrixWorld.copyPosition(camera.matrixWorld);
        var cubeMap = _this.cubeMap;
        var texture = _this.texture;

        if (cubeMap && texture && texture.isVideoTexture) {
          _this.updateCubeMapEquirectangularTexture(cubeMap, renderer, texture);
        }
      }
    };
    mesh.name = '[panorama]';
    this.mesh = mesh;
  };

  _proto.getBlackMaterial = function getBlackMaterial() {
    return new THREE.MeshBasicMaterial({
      name: 'PanoramaStandardMaterial',
      color: 0x000000,
      side: THREE.BackSide,
      depthTest: false,
      depthWrite: false,
      fog: false
    });
  };

  _proto.getShaderMaterial = function getShaderMaterial(texture) {
    var material = new THREE.ShaderMaterial({
      name: 'PanoramaCubeMaterial',
      uniforms: this.cloneUniforms(THREE.ShaderLib.cube.uniforms),
      vertexShader: THREE.ShaderLib.cube.vertexShader,
      fragmentShader: THREE.ShaderLib.cube.fragmentShader,
      side: THREE.BackSide,
      depthTest: false,
      depthWrite: false,
      fog: false
    });
    texture.mapping = THREE.EquirectangularReflectionMapping;
    var cubeMap = this.toCubeMap(texture, this.renderer);
    material.map = cubeMap;
    material.uniforms.envMap.value = cubeMap;
    material.uniforms.flipEnvMap.value = cubeMap.isCubeTexture && cubeMap._needsFlipEnvMap ? -1 : 1;
    material.needsUpdate = true;
    this.mesh.geometry.deleteAttribute('normal');
    this.mesh.geometry.deleteAttribute('uv');
    Object.defineProperty(material, 'envMap', {
      get: function get() {
        return this.uniforms.envMap.value;
      },
      configurable: true
    });
    return material;
  };

  _proto.makeEnvMap = function makeEnvMap(texture) {
    var material = this.mesh.material;

    if (!material.uniforms) {
      material.dispose();
      material = this.getShaderMaterial(texture);
      this.mesh.material = material;
    } else {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      var cubeMap = this.toCubeMap(texture, this.renderer);
      material.map = cubeMap;
      material.uniforms.envMap.value = cubeMap;
      material.uniforms.flipEnvMap.value = cubeMap.isCubeTexture && cubeMap._needsFlipEnvMap ? -1 : 1;
      material.needsUpdate = true;
    } // console.log('Panorama.makeEnvMap', this.texture, this.cubeMap);

  };

  _proto.toCubeMap = function toCubeMap(texture, renderer) {
    if (this.cubeMap) {
      this.cubeMap.dispose();
    }

    var image = texture.image;
    var height = image.height || image.videoHeight;
    var cubeMap = new THREE.WebGLCubeRenderTarget(height / 2, {
      generateMipmaps: true,
      // minFilter: THREE.LinearMipmapLinearFilter,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      // mapping: THREE.CubeReflectionMapping,
      // mapping: THREE.EquirectangularReflectionMapping,
      mapping: THREE.CubeUVReflectionMapping,
      // mapping: THREE.UVMapping,
      format: THREE.RGBFormat
    });
    cubeMap.addEventListener('dispose', this.onCubeMapDispose);
    this.setCubeMapEquirectangularTexture(cubeMap, texture);
    this.updateCubeMapEquirectangularTexture(cubeMap, renderer, texture);
    this.cubeMap = cubeMap;
    this.texture = texture;
    return this.mapTextureMapping(cubeMap.texture, texture.mapping);
  };

  _proto.setCubeMapEquirectangularTexture = function setCubeMapEquirectangularTexture(cubeMap, texture) {
    cubeMap.texture.type = texture.type;
    cubeMap.texture.format = THREE.RGBFormat;
    cubeMap.texture.encoding = THREE.sRGBEncoding;
    cubeMap.texture.generateMipmaps = texture.generateMipmaps;
    cubeMap.texture.minFilter = texture.minFilter;
    cubeMap.texture.magFilter = texture.magFilter;
    cubeMap.texture.needsUpdate = true;
    var shader = {
      uniforms: {
        tEquirect: {
          value: null
        }
      },
      vertexShader:
      /* glsl */
      "\n\t\t\t\t\tvarying vec3 vWorldDirection;\n\t\t\t\t\tvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\t\t\t\t\t\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\t\t\t\t\t}\n\t\t\t\t\tvoid main() {\n\t\t\t\t\t\tvWorldDirection = transformDirection( position, modelMatrix );\n\t\t\t\t\t\t#include <begin_vertex>\n\t\t\t\t\t\t#include <project_vertex>\n\t\t\t\t\t}\n\t\t\t\t",
      fragmentShader:
      /* glsl */
      "\n\t\t\t\t\tuniform sampler2D tEquirect;\n\t\t\t\t\tvarying vec3 vWorldDirection;\n\t\t\t\t\t#include <common>\n\t\t\t\t\tvoid main() {\n\t\t\t\t\t\tvec3 direction = normalize( vWorldDirection );\n\t\t\t\t\t\tvec2 sampleUV = equirectUv( direction );\n\t\t\t\t\t\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\t\t\t\t\t}\n\t\t\t\t"
    };
    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.ShaderMaterial({
      name: 'CubemapFromEquirect',
      uniforms: this.cloneUniforms(shader.uniforms),
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      side: THREE.BackSide,
      blending: THREE.NoBlending
    });
    material.uniforms.tEquirect.value = texture;
    var mesh = new THREE.Mesh(geometry, material);
    var camera = new THREE.CubeCamera(1, 10, cubeMap);
    cubeMap.camera = camera;
    cubeMap.mesh = mesh;
    return cubeMap;
  };

  _proto.updateCubeMapEquirectangularTexture = function updateCubeMapEquirectangularTexture(cubeMap, renderer, texture) {
    var previousMinFilter = texture.minFilter; // Avoid blurred poles

    if (texture.minFilter === THREE.LinearMipmapLinearFilter) {
      texture.minFilter = THREE.LinearFilter;
    }

    cubeMap.camera.update(renderer, cubeMap.mesh);
    texture.minFilter = previousMinFilter; // console.log('updateCubeMapEquirectangularTexture');
  };

  _proto.cloneUniforms = function cloneUniforms(src) {
    var dst = {};

    for (var u in src) {
      dst[u] = {};

      for (var p in src[u]) {
        var property = src[u][p];

        if (property && (property.isColor || property.isMatrix3 || property.isMatrix4 || property.isVector2 || property.isVector3 || property.isVector4 || property.isTexture || property.isQuaternion)) {
          dst[u][p] = property.clone();
        } else if (Array.isArray(property)) {
          dst[u][p] = property.slice();
        } else {
          dst[u][p] = property;
        }
      }
    }

    return dst;
  };

  _proto.mapTextureMapping = function mapTextureMapping(texture, mapping) {
    if (mapping === THREE.EquirectangularReflectionMapping) {
      texture.mapping = THREE.CubeReflectionMapping;
    } else if (mapping === THREE.EquirectangularRefractionMapping) {
      texture.mapping = THREE.CubeRefractionMapping;
    }

    return texture;
  };

  _proto.onCubeMapDispose = function onCubeMapDispose() {
    var cubeMap = this.cubeMap;

    if (cubeMap) {
      // console.log('Panorama.onCubeMapDispose', cubeMap);
      cubeMap.removeEventListener('dispose', this.onCubeMapDispose);
      cubeMap.texture.dispose();
      cubeMap.mesh.geometry.dispose();
      cubeMap.mesh.material.dispose();

      if (cubeMap !== undefined) {
        this.cubeMap = null;
      }
    }
  };

  _proto.change = function change(view, renderer, callback, onexit) {
    var item = view instanceof PanoramaGridView ? view.tiles[view.index_] : view;
    var material = this.mesh.material;
    this.load(item, renderer, function (envMap) {
      if (typeof onexit === 'function') {
        onexit(view);
      }

      if (material.uniforms && material.uniforms.uTween) {
        material.uniforms.uTween.value = 1;
        material.needsUpdate = true;
      }

      if (typeof callback === 'function') {
        callback(envMap);
      }
    });
  };

  _proto.crossfade = function crossfade(item, renderer, callback) {
    var material = this.mesh.material;
    this.load(item, renderer, function (envMap) {
      if (material.uniforms && material.uniforms.uTween) {
        material.uniforms.uTween.value = 1;
        material.needsUpdate = true;
      }

      if (typeof callback === 'function') {
        callback(envMap);
      }
    });
  };

  _proto.load = function load(item, renderer, callback) {
    var _this2 = this;

    var asset = item.type.name === ViewType.Media.name ? Asset.defaultMediaAsset : item.asset;

    if (!asset) {
      return;
    }

    if (asset.type.name === AssetType.Model.name) {
      if (typeof callback === 'function') {
        callback(null);
      }

      return;
    }

    this.currentAsset = asset.folder + asset.file;
    PanoramaLoader.load(asset, renderer, function (texture, rgbe) {
      if (asset.folder + asset.file !== _this2.currentAsset) {
        texture.dispose();
        return;
      }

      var envMap = _this2.makeEnvMap(texture);

      if (typeof callback === 'function') {
        callback(envMap);
      }
    });
  };

  _proto.dispose = function dispose() {
    this.subscription.unsubscribe();

    if (this.cubeMap) {
      this.cubeMap.dispose();
    }
  };

  return Panorama;
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
    var target = "#stream-" + streamId; // `#stream-remote-${streamId}`;

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
      texture.encoding = THREE.sRGBEncoding;
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
    var material = new THREE.MeshBasicMaterial({
      // depthTest: false,
      color: 0xffffff // side: THREE.DoubleSide,

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
      color: 0x000000,
      transparent: true,
      opacity: 0.6
    });
    var phone = new THREE.Mesh(geometry, material);
    phone.rotation.set(-Math.PI / 4, 0, 0);
    return phone;
  };

  return PhoneElement;
}();// import * as THREE from 'three';

var PointerElement = /*#__PURE__*/function () {
  function PointerElement(color) {
    if (color === void 0) {
      color = '#ffffff';
    }

    var position = this.position = new THREE.Vector3(); // const targetPosition = this.targetPosition = new THREE.Vector3();

    var geometry = Geometry.planeGeometry; // new THREE.PlaneBufferGeometry(1.2, 1.2, 2, 2);

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

  _proto.update = function update(camera) {
    if (Interactive.lastIntersectedObject) {
      var position = this.position;
      position.copy(Interactive.lastIntersectedObject.intersection.point);
      position.multiplyScalar(0.99);
      var mesh = this.mesh;
      mesh.position.set(position.x, position.y, position.z);
      position.sub(camera.position);
      var s = position.length() / 80;
      mesh.scale.set(s, s, s);
      /*
      const targetPosition = this.targetPosition;
      targetPosition.set(0, 0, 0);
      camera.localToWorld(targetPosition);
      */

      mesh.lookAt(Host.origin);
    }
  };

  _proto.setPosition = function setPosition(x, y, z, camera) {
    var position = this.position;
    position.set(x, y, z).multiplyScalar(80);
    var mesh = this.mesh;
    mesh.position.copy(position);
    position.sub(camera.position);
    var s = position.length() / 80;
    mesh.scale.set(s, s, s);
    /*
    const targetPosition = this.targetPosition;
    targetPosition.set(0, 0, 0);
    camera.localToWorld(targetPosition);
    */

    mesh.lookAt(Host.origin);
  };

  return PointerElement;
}();// import * as THREE from 'three';
var LINE_SEGMENTS = 10;
var TeleportElement = /*#__PURE__*/function () {
  function TeleportElement() {
    var gravity = this.gravity = new THREE.Vector3(0, -9.8, 0);
    var controllerPosition = this.controllerPosition = new THREE.Vector3();
    var controllerDirection = this.controllerDirection = new THREE.Vector3();
    var currentPosition = this.currentPosition = new THREE.Vector3();
    var targetPosition = this.targetPosition = new THREE.Vector3();
    var geometry = new THREE.BufferGeometry();
    var vertices = this.vertices = new Float32Array((LINE_SEGMENTS + 1) * 3);
    vertices.fill(0);
    var colors = new Float32Array((LINE_SEGMENTS + 1) * 3);
    colors.fill(0.5);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    var lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });
    var line = this.line = new THREE.Line(geometry, lineMaterial); // const light = this.light = new THREE.PointLight(0xffeeaa, 0, 2);

    var loader = new THREE.TextureLoader();
    var texture = loader.load(environment.getPath('textures/ui/nav-point.png'));
    var target = this.target = new THREE.Mesh(new THREE.PlaneBufferGeometry(0.3, 0.3, 1, 1), new THREE.MeshBasicMaterial({
      map: texture,
      blending: THREE.AdditiveBlending,
      color: 0x555555,
      transparent: true
    }));
    target.rotation.x = -Math.PI / 2;
  }

  var _proto = TeleportElement.prototype;

  _proto.addToController = function addToController(controller, scene) {
    this.currentController = controller; // this.light.intensity = 1;

    controller.add(this.line);
    scene.add(this.target);
  };

  _proto.removeFromController = function removeFromController(controller, scene, renderer, camera, cameraGroup) {
    var currentController = this.currentController;

    if (currentController === controller) {
      var gravity = this.gravity;
      var currentPosition = this.currentPosition;
      var controllerPosition = this.controllerPosition;
      var controllerDirection = this.controllerDirection;
      renderer.xr.getCamera(camera).getWorldPosition(currentPosition);
      currentPosition.y = 0;
      currentController.getWorldPosition(controllerPosition);
      currentController.getWorldDirection(controllerDirection);
      controllerDirection.multiplyScalar(6);
      var T = (-controllerDirection.y + Math.sqrt(Math.pow(controllerDirection.y, 2) - 2 * controllerPosition.y * gravity.y)) / gravity.y;
      var targetPosition = this.getPositionT(this.targetPosition, T, controllerPosition, controllerDirection, gravity);
      targetPosition.addScaledVector(currentPosition, -1);
      cameraGroup.position.add(targetPosition); // this.teleport(targetPosition, cameraGroup);

      this.currentController = null; // this.light.intensity = 0;

      currentController.remove(this.line);
      scene.remove(this.target);
    }
  };

  _proto.update = function update() {
    var currentController = this.currentController;

    if (currentController) {
      var gravity = this.gravity;
      var controllerPosition = this.controllerPosition;
      var controllerDirection = this.controllerDirection;
      var targetPosition = this.targetPosition; // Controller start position

      currentController.getWorldPosition(controllerPosition); // Set Vector V to the direction of the controller, at 1m/s

      currentController.getWorldDirection(controllerDirection); // Scale the initial velocity to 6m/s

      controllerDirection.multiplyScalar(6); // Time for tele ball to hit ground

      var T = (-controllerDirection.y + Math.sqrt(Math.pow(controllerDirection.y, 2) - 2 * controllerPosition.y * gravity.y)) / gravity.y;
      var vertex = targetPosition.set(0, 0, 0);

      for (var i = 1; i <= LINE_SEGMENTS; i++) {
        // set vertex to current position of the virtual ball at time t
        this.getPositionT(vertex, i * T / LINE_SEGMENTS, controllerPosition, controllerDirection, gravity);
        currentController.worldToLocal(vertex);
        vertex.toArray(this.vertices, i * 3);
      }

      this.line.geometry.attributes.position.needsUpdate = true; // Place the light and sprite near the end of the poing
      // this.getPositionT(this.light.position, T * 0.98, controllerPosition, controllerDirection, gravity);

      this.getPositionT(this.target.position, T * 0.98, controllerPosition, controllerDirection, gravity);
    }
  };

  _proto.getPositionT = function getPositionT(position, T, controllerPosition, controllerDirection, gravity) {
    position.copy(controllerPosition);
    position.addScaledVector(controllerDirection, T);
    position.addScaledVector(gravity, 0.5 * Math.pow(T, 2));
    return position;
  }
  /*
  teleport(offsetPosition, cameraGroup) {
  	const position = new THREE.Vector3();
  	position.copy(cameraGroup.position);
  	position.add(offsetPosition);
  	// const distance = offsetPosition.length();
  	cameraGroup.position.copy(position);
  }
  */
  ;

  return TeleportElement;
}();var Emittable$1 = /*#__PURE__*/function () {
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

  return Emittable;
}();var Gamepad = /*#__PURE__*/function (_Emittable) {
  _inheritsLoose(Gamepad, _Emittable);

  function Gamepad(gamepad) {
    var _this;

    _this = _Emittable.call(this) || this;
    _this.gamepad = gamepad;
    _this.buttons = {};
    _this.axes = {};
    return _this;
  }

  var _proto = Gamepad.prototype;

  _proto.update = function update() {
    this.updateButtons();
    this.updateAxes();
  };

  _proto.updateButtons = function updateButtons() {
    var _this2 = this;

    this.gamepad.buttons.forEach(function (x, i) {
      var pressed = x.pressed;
      var button = _this2.buttons[i] || (_this2.buttons[i] = new GamepadButton(i, _this2));

      if (button.pressed !== pressed) {
        button.pressed = pressed;

        if (pressed) {
          _this2.emit('press', button);
        } else if (status !== undefined) {
          _this2.emit('release', button);
        }
      }
    });
  };

  _proto.updateAxes = function updateAxes() {
    var axes = this.gamepad.axes;

    for (var i = 0; i < axes.length; i += 2) {
      var index = Math.floor(i / 2);
      var axis = this.axes[index] || (this.axes[index] = new GamepadAxis(index, this));
      var x = axes[i];
      var y = axes[i + 1];

      if (axis.x !== x || axis.y !== y) {
        axis.x = x;
        axis.y = y;

        if (Math.abs(x) > Math.abs(y)) {
          var left = x < -0.85;
          var right = x > 0.85;

          if (axis.left !== left) {
            axis.left = left;
            this.emit(left ? 'left' : 'none', axis); // console.log(`${axis.gamepad.hand} ${axis.gamepad.index} left ${left}`);
          }

          if (axis.right !== right) {
            axis.right = right;
            this.emit(right ? 'right' : 'none', axis); // console.log(`${axis.gamepad.hand} ${axis.gamepad.index} right ${right}`);
          }
        } else {
          var up = y < -0.85;
          var down = y > 0.85;

          if (axis.up !== up) {
            axis.up = up;
            this.emit(up ? 'up' : 'none', axis); // console.log(`${axis.gamepad.hand} ${axis.gamepad.index} up ${up}`);
          }

          if (axis.down !== down) {
            axis.down = down;
            this.emit(down ? 'down' : 'none', axis); // console.log(`${axis.gamepad.hand} ${axis.gamepad.index} down ${down}`);
          }
        }

        this.emit('axis', axis);
      }
    }
  };

  _proto.feedback = function feedback(strength, duration) {
    if (strength === void 0) {
      strength = 0.1;
    }

    if (duration === void 0) {
      duration = 50;
    }

    // !!! care for battery
    var actuators = this.gamepad.hapticActuators;

    if (actuators && actuators.length) {
      return actuators[0].pulse(strength, duration);
    } else {
      return Promise.reject();
    }
  };

  return Gamepad;
}(Emittable$1);

var GamepadButton = function GamepadButton(index, gamepad) {
  this.index = index;
  this.gamepad = gamepad;
  this.pressed = false;
};

var GamepadAxis = /*#__PURE__*/function (_THREE$Vector) {
  _inheritsLoose(GamepadAxis, _THREE$Vector);

  function GamepadAxis(index, gamepad) {
    var _this3;

    _this3 = _THREE$Vector.call(this) || this;
    _this3.index = index;
    _this3.gamepad = gamepad;
    _this3.left = _this3.right = _this3.up = _this3.down = false;
    return _this3;
  }

  return GamepadAxis;
}(THREE.Vector2);// import { AnimationClip, Bone, Box3, BufferAttribute, BufferGeometry, CanvasTexture, ClampToEdgeWrapping, Color, DirectionalLight, DoubleSide, FileLoader, FrontSide, Group, ImageBitmapLoader, InterleavedBuffer, InterleavedBufferAttribute, Interpolant, InterpolateDiscrete, InterpolateLinear, Line, LineBasicMaterial, LineLoop, LineSegments, LinearFilter, LinearMipmapLinearFilter, LinearMipmapNearestFilter, Loader, LoaderUtils, Material, MathUtils, Matrix4, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MirroredRepeatWrapping, NearestFilter, NearestMipmapLinearFilter, NearestMipmapNearestFilter, NumberKeyframeTrack, Object3D, OrthographicCamera, PerspectiveCamera, PointLight, Points, PointsMaterial, PropertyBinding, QuaternionKeyframeTrack, RGBFormat, RepeatWrapping, Skeleton, SkinnedMesh, Sphere, SpotLight, TangentSpaceNormalMap, TextureLoader, TriangleFanDrawMode, TriangleStripDrawMode, Vector2, Vector3, VectorKeyframeTrack, sRGBEncoding } from 'three';
var _THREE$1 = THREE,
    AnimationClip = _THREE$1.AnimationClip,
    Bone = _THREE$1.Bone,
    Box3 = _THREE$1.Box3,
    BufferAttribute = _THREE$1.BufferAttribute,
    BufferGeometry = _THREE$1.BufferGeometry,
    CanvasTexture = _THREE$1.CanvasTexture,
    ClampToEdgeWrapping = _THREE$1.ClampToEdgeWrapping,
    Color = _THREE$1.Color,
    DirectionalLight = _THREE$1.DirectionalLight,
    DoubleSide = _THREE$1.DoubleSide,
    FileLoader = _THREE$1.FileLoader,
    FrontSide = _THREE$1.FrontSide,
    Group = _THREE$1.Group,
    ImageBitmapLoader = _THREE$1.ImageBitmapLoader,
    InterleavedBuffer = _THREE$1.InterleavedBuffer,
    InterleavedBufferAttribute = _THREE$1.InterleavedBufferAttribute,
    Interpolant = _THREE$1.Interpolant,
    InterpolateDiscrete = _THREE$1.InterpolateDiscrete,
    InterpolateLinear = _THREE$1.InterpolateLinear,
    Line = _THREE$1.Line,
    LineBasicMaterial = _THREE$1.LineBasicMaterial,
    LineLoop = _THREE$1.LineLoop,
    LineSegments = _THREE$1.LineSegments,
    LinearFilter$1 = _THREE$1.LinearFilter,
    LinearMipmapLinearFilter = _THREE$1.LinearMipmapLinearFilter,
    LinearMipmapNearestFilter = _THREE$1.LinearMipmapNearestFilter,
    Loader = _THREE$1.Loader,
    LoaderUtils = _THREE$1.LoaderUtils,
    Material = _THREE$1.Material,
    MathUtils = _THREE$1.MathUtils,
    Matrix4 = _THREE$1.Matrix4,
    Mesh = _THREE$1.Mesh,
    MeshBasicMaterial = _THREE$1.MeshBasicMaterial,
    MeshPhysicalMaterial = _THREE$1.MeshPhysicalMaterial,
    MeshStandardMaterial = _THREE$1.MeshStandardMaterial,
    MirroredRepeatWrapping = _THREE$1.MirroredRepeatWrapping,
    NearestFilter$1 = _THREE$1.NearestFilter,
    NearestMipmapLinearFilter = _THREE$1.NearestMipmapLinearFilter,
    NearestMipmapNearestFilter = _THREE$1.NearestMipmapNearestFilter,
    NumberKeyframeTrack = _THREE$1.NumberKeyframeTrack,
    Object3D = _THREE$1.Object3D,
    OrthographicCamera = _THREE$1.OrthographicCamera,
    PerspectiveCamera = _THREE$1.PerspectiveCamera,
    PointLight = _THREE$1.PointLight,
    Points = _THREE$1.Points,
    PointsMaterial = _THREE$1.PointsMaterial,
    PropertyBinding = _THREE$1.PropertyBinding,
    QuaternionKeyframeTrack = _THREE$1.QuaternionKeyframeTrack,
    RGBFormat$1 = _THREE$1.RGBFormat,
    RepeatWrapping = _THREE$1.RepeatWrapping,
    Skeleton = _THREE$1.Skeleton,
    SkinnedMesh = _THREE$1.SkinnedMesh,
    Sphere = _THREE$1.Sphere,
    SpotLight = _THREE$1.SpotLight,
    TangentSpaceNormalMap = _THREE$1.TangentSpaceNormalMap,
    TextureLoader = _THREE$1.TextureLoader,
    TriangleFanDrawMode = _THREE$1.TriangleFanDrawMode,
    TriangleStripDrawMode = _THREE$1.TriangleStripDrawMode,
    Vector2 = _THREE$1.Vector2,
    Vector3 = _THREE$1.Vector3,
    VectorKeyframeTrack = _THREE$1.VectorKeyframeTrack,
    sRGBEncoding = _THREE$1.sRGBEncoding;

var GLTFLoader = /*#__PURE__*/function (_Loader) {
  _inheritsLoose(GLTFLoader, _Loader);

  function GLTFLoader(manager) {
    var _this;

    _this = _Loader.call(this, manager) || this;
    _this.dracoLoader = null;
    _this.ktx2Loader = null;
    _this.meshoptDecoder = null;
    _this.pluginCallbacks = [];

    _this.register(function (parser) {
      return new GLTFMaterialsClearcoatExtension(parser);
    });

    _this.register(function (parser) {
      return new GLTFTextureBasisUExtension(parser);
    });

    _this.register(function (parser) {
      return new GLTFTextureWebPExtension(parser);
    });

    _this.register(function (parser) {
      return new GLTFMaterialsTransmissionExtension(parser);
    });

    _this.register(function (parser) {
      return new GLTFLightsExtension(parser);
    });

    _this.register(function (parser) {
      return new GLTFMeshoptCompression(parser);
    });

    return _this;
  }

  var _proto = GLTFLoader.prototype;

  _proto.load = function load(url, onLoad, onProgress, onError) {
    var scope = this;
    var resourcePath;

    if (this.resourcePath !== '') {
      resourcePath = this.resourcePath;
    } else if (this.path !== '') {
      resourcePath = this.path;
    } else {
      resourcePath = LoaderUtils.extractUrlBase(url);
    } // Tells the LoadingManager to track an extra item, which resolves after
    // the model is fully loaded. This means the count of items loaded will
    // be incorrect, but ensures manager.onLoad() does not fire early.


    this.manager.itemStart(url);

    var _onError = function _onError(e) {
      if (onError) {
        onError(e);
      } else {
        console.error(e);
      }

      scope.manager.itemError(url);
      scope.manager.itemEnd(url);
    };

    var loader = new FileLoader(this.manager);
    loader.setPath(this.path);
    loader.setResponseType('arraybuffer');
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, function (data) {
      try {
        scope.parse(data, resourcePath, function (gltf) {
          onLoad(gltf);
          scope.manager.itemEnd(url);
        }, _onError);
      } catch (e) {
        _onError(e);
      }
    }, onProgress, _onError);
  };

  _proto.setDRACOLoader = function setDRACOLoader(dracoLoader) {
    this.dracoLoader = dracoLoader;
    return this;
  };

  _proto.setDDSLoader = function setDDSLoader() {
    throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".');
  };

  _proto.setKTX2Loader = function setKTX2Loader(ktx2Loader) {
    this.ktx2Loader = ktx2Loader;
    return this;
  };

  _proto.setMeshoptDecoder = function setMeshoptDecoder(meshoptDecoder) {
    this.meshoptDecoder = meshoptDecoder;
    return this;
  };

  _proto.register = function register(callback) {
    if (this.pluginCallbacks.indexOf(callback) === -1) {
      this.pluginCallbacks.push(callback);
    }

    return this;
  };

  _proto.unregister = function unregister(callback) {
    if (this.pluginCallbacks.indexOf(callback) !== -1) {
      this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(callback), 1);
    }

    return this;
  };

  _proto.parse = function parse(data, path, onLoad, onError) {
    var content;
    var extensions = {};
    var plugins = {};

    if (typeof data === 'string') {
      content = data;
    } else {
      var magic = LoaderUtils.decodeText(new Uint8Array(data, 0, 4));

      if (magic === BINARY_EXTENSION_HEADER_MAGIC) {
        try {
          extensions[EXTENSIONS.KHR_BINARY_GLTF] = new GLTFBinaryExtension(data);
        } catch (error) {
          if (onError) onError(error);
          return;
        }

        content = extensions[EXTENSIONS.KHR_BINARY_GLTF].content;
      } else {
        content = LoaderUtils.decodeText(new Uint8Array(data));
      }
    }

    var json = JSON.parse(content);

    if (json.asset === undefined || json.asset.version[0] < 2) {
      if (onError) onError(new Error('THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.'));
      return;
    }

    var parser = new GLTFParser(json, {
      path: path || this.resourcePath || '',
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    parser.fileLoader.setRequestHeader(this.requestHeader);

    for (var i = 0; i < this.pluginCallbacks.length; i++) {
      var plugin = this.pluginCallbacks[i](parser);
      plugins[plugin.name] = plugin; // Workaround to avoid determining as unknown extension
      // in addUnknownExtensionsToUserData().
      // Remove this workaround if we move all the existing
      // extension handlers to plugin system

      extensions[plugin.name] = true;
    }

    if (json.extensionsUsed) {
      for (var _i = 0; _i < json.extensionsUsed.length; ++_i) {
        var extensionName = json.extensionsUsed[_i];
        var extensionsRequired = json.extensionsRequired || [];

        switch (extensionName) {
          case EXTENSIONS.KHR_MATERIALS_UNLIT:
            extensions[extensionName] = new GLTFMaterialsUnlitExtension();
            break;

          case EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
            extensions[extensionName] = new GLTFMaterialsPbrSpecularGlossinessExtension();
            break;

          case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
            extensions[extensionName] = new GLTFDracoMeshCompressionExtension(json, this.dracoLoader);
            break;

          case EXTENSIONS.KHR_TEXTURE_TRANSFORM:
            extensions[extensionName] = new GLTFTextureTransformExtension();
            break;

          case EXTENSIONS.KHR_MESH_QUANTIZATION:
            extensions[extensionName] = new GLTFMeshQuantizationExtension();
            break;

          default:
            if (extensionsRequired.indexOf(extensionName) >= 0 && plugins[extensionName] === undefined) {
              console.warn('THREE.GLTFLoader: Unknown extension "' + extensionName + '".');
            }

        }
      }
    }

    parser.setExtensions(extensions);
    parser.setPlugins(plugins);
    parser.parse(onLoad, onError);
  };

  return GLTFLoader;
}(Loader);
/* GLTFREGISTRY */


function GLTFRegistry() {
  var objects = {};
  return {
    get: function get(key) {
      return objects[key];
    },
    add: function add(key, object) {
      objects[key] = object;
    },
    remove: function remove(key) {
      delete objects[key];
    },
    removeAll: function removeAll() {
      objects = {};
    }
  };
}
/*********************************/

/********** EXTENSIONS ***********/

/*********************************/


var EXTENSIONS = {
  KHR_BINARY_GLTF: 'KHR_binary_glTF',
  KHR_DRACO_MESH_COMPRESSION: 'KHR_draco_mesh_compression',
  KHR_LIGHTS_PUNCTUAL: 'KHR_lights_punctual',
  KHR_MATERIALS_CLEARCOAT: 'KHR_materials_clearcoat',
  KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: 'KHR_materials_pbrSpecularGlossiness',
  KHR_MATERIALS_TRANSMISSION: 'KHR_materials_transmission',
  KHR_MATERIALS_UNLIT: 'KHR_materials_unlit',
  KHR_TEXTURE_BASISU: 'KHR_texture_basisu',
  KHR_TEXTURE_TRANSFORM: 'KHR_texture_transform',
  KHR_MESH_QUANTIZATION: 'KHR_mesh_quantization',
  EXT_TEXTURE_WEBP: 'EXT_texture_webp',
  EXT_MESHOPT_COMPRESSION: 'EXT_meshopt_compression'
};
/**
	 * Punctual Lights Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_lights_punctual
	 */

var GLTFLightsExtension = /*#__PURE__*/function () {
  function GLTFLightsExtension(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL; // Object3D instance caches

    this.cache = {
      refs: {},
      uses: {}
    };
  }

  var _proto2 = GLTFLightsExtension.prototype;

  _proto2._markDefs = function _markDefs() {
    var parser = this.parser;
    var nodeDefs = this.parser.json.nodes || [];

    for (var nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++) {
      var nodeDef = nodeDefs[nodeIndex];

      if (nodeDef.extensions && nodeDef.extensions[this.name] && nodeDef.extensions[this.name].light !== undefined) {
        parser._addNodeRef(this.cache, nodeDef.extensions[this.name].light);
      }
    }
  };

  _proto2._loadLight = function _loadLight(lightIndex) {
    var parser = this.parser;
    var cacheKey = 'light:' + lightIndex;
    var dependency = parser.cache.get(cacheKey);
    if (dependency) return dependency;
    var json = parser.json;
    var extensions = json.extensions && json.extensions[this.name] || {};
    var lightDefs = extensions.lights || [];
    var lightDef = lightDefs[lightIndex];
    var lightNode;
    var color = new Color(0xffffff);
    if (lightDef.color !== undefined) color.fromArray(lightDef.color);
    var range = lightDef.range !== undefined ? lightDef.range : 0;

    switch (lightDef.type) {
      case 'directional':
        lightNode = new DirectionalLight(color);
        lightNode.target.position.set(0, 0, -1);
        lightNode.add(lightNode.target);
        break;

      case 'point':
        lightNode = new PointLight(color);
        lightNode.distance = range;
        break;

      case 'spot':
        lightNode = new SpotLight(color);
        lightNode.distance = range; // Handle spotlight properties.

        lightDef.spot = lightDef.spot || {};
        lightDef.spot.innerConeAngle = lightDef.spot.innerConeAngle !== undefined ? lightDef.spot.innerConeAngle : 0;
        lightDef.spot.outerConeAngle = lightDef.spot.outerConeAngle !== undefined ? lightDef.spot.outerConeAngle : Math.PI / 4.0;
        lightNode.angle = lightDef.spot.outerConeAngle;
        lightNode.penumbra = 1.0 - lightDef.spot.innerConeAngle / lightDef.spot.outerConeAngle;
        lightNode.target.position.set(0, 0, -1);
        lightNode.add(lightNode.target);
        break;

      default:
        throw new Error('THREE.GLTFLoader: Unexpected light type: ' + lightDef.type);
    } // Some lights (e.g. spot) default to a position other than the origin. Reset the position
    // here, because node-level parsing will only override position if explicitly specified.


    lightNode.position.set(0, 0, 0);
    lightNode.decay = 2;
    if (lightDef.intensity !== undefined) lightNode.intensity = lightDef.intensity;
    lightNode.name = parser.createUniqueName(lightDef.name || 'light_' + lightIndex);
    dependency = Promise.resolve(lightNode);
    parser.cache.add(cacheKey, dependency);
    return dependency;
  };

  _proto2.createNodeAttachment = function createNodeAttachment(nodeIndex) {
    var self = this;
    var parser = this.parser;
    var json = parser.json;
    var nodeDef = json.nodes[nodeIndex];
    var lightDef = nodeDef.extensions && nodeDef.extensions[this.name] || {};
    var lightIndex = lightDef.light;
    if (lightIndex === undefined) return null;
    return this._loadLight(lightIndex).then(function (light) {
      return parser._getNodeRef(self.cache, lightIndex, light);
    });
  };

  return GLTFLightsExtension;
}();
/**
	 * Unlit Materials Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_unlit
	 */


var GLTFMaterialsUnlitExtension = /*#__PURE__*/function () {
  function GLTFMaterialsUnlitExtension() {
    this.name = EXTENSIONS.KHR_MATERIALS_UNLIT;
  }

  var _proto3 = GLTFMaterialsUnlitExtension.prototype;

  _proto3.getMaterialType = function getMaterialType() {
    return MeshBasicMaterial;
  };

  _proto3.extendParams = function extendParams(materialParams, materialDef, parser) {
    var pending = [];
    materialParams.color = new Color(1.0, 1.0, 1.0);
    materialParams.opacity = 1.0;
    var metallicRoughness = materialDef.pbrMetallicRoughness;

    if (metallicRoughness) {
      if (Array.isArray(metallicRoughness.baseColorFactor)) {
        var array = metallicRoughness.baseColorFactor;
        materialParams.color.fromArray(array);
        materialParams.opacity = array[3];
      }

      if (metallicRoughness.baseColorTexture !== undefined) {
        pending.push(parser.assignTexture(materialParams, 'map', metallicRoughness.baseColorTexture));
      }
    }

    return Promise.all(pending);
  };

  return GLTFMaterialsUnlitExtension;
}();
/**
	 * Clearcoat Materials Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_clearcoat
	 */


var GLTFMaterialsClearcoatExtension = /*#__PURE__*/function () {
  function GLTFMaterialsClearcoatExtension(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_CLEARCOAT;
  }

  var _proto4 = GLTFMaterialsClearcoatExtension.prototype;

  _proto4.getMaterialType = function getMaterialType(materialIndex) {
    var parser = this.parser;
    var materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  };

  _proto4.extendMaterialParams = function extendMaterialParams(materialIndex, materialParams) {
    var parser = this.parser;
    var materialDef = parser.json.materials[materialIndex];

    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }

    var pending = [];
    var extension = materialDef.extensions[this.name];

    if (extension.clearcoatFactor !== undefined) {
      materialParams.clearcoat = extension.clearcoatFactor;
    }

    if (extension.clearcoatTexture !== undefined) {
      pending.push(parser.assignTexture(materialParams, 'clearcoatMap', extension.clearcoatTexture));
    }

    if (extension.clearcoatRoughnessFactor !== undefined) {
      materialParams.clearcoatRoughness = extension.clearcoatRoughnessFactor;
    }

    if (extension.clearcoatRoughnessTexture !== undefined) {
      pending.push(parser.assignTexture(materialParams, 'clearcoatRoughnessMap', extension.clearcoatRoughnessTexture));
    }

    if (extension.clearcoatNormalTexture !== undefined) {
      pending.push(parser.assignTexture(materialParams, 'clearcoatNormalMap', extension.clearcoatNormalTexture));

      if (extension.clearcoatNormalTexture.scale !== undefined) {
        var scale = extension.clearcoatNormalTexture.scale; // https://github.com/mrdoob/three.js/issues/11438#issuecomment-507003995

        materialParams.clearcoatNormalScale = new Vector2(scale, -scale);
      }
    }

    return Promise.all(pending);
  };

  return GLTFMaterialsClearcoatExtension;
}();
/**
	 * Transmission Materials Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_transmission
	 * Draft: https://github.com/KhronosGroup/glTF/pull/1698
	 */


var GLTFMaterialsTransmissionExtension = /*#__PURE__*/function () {
  function GLTFMaterialsTransmissionExtension(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_MATERIALS_TRANSMISSION;
  }

  var _proto5 = GLTFMaterialsTransmissionExtension.prototype;

  _proto5.getMaterialType = function getMaterialType(materialIndex) {
    var parser = this.parser;
    var materialDef = parser.json.materials[materialIndex];
    if (!materialDef.extensions || !materialDef.extensions[this.name]) return null;
    return MeshPhysicalMaterial;
  };

  _proto5.extendMaterialParams = function extendMaterialParams(materialIndex, materialParams) {
    var parser = this.parser;
    var materialDef = parser.json.materials[materialIndex];

    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return Promise.resolve();
    }

    var pending = [];
    var extension = materialDef.extensions[this.name];

    if (extension.transmissionFactor !== undefined) {
      materialParams.transmission = extension.transmissionFactor;
    }

    if (extension.transmissionTexture !== undefined) {
      pending.push(parser.assignTexture(materialParams, 'transmissionMap', extension.transmissionTexture));
    }

    return Promise.all(pending);
  };

  return GLTFMaterialsTransmissionExtension;
}();
/**
	 * BasisU Texture Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_texture_basisu
	 */


var GLTFTextureBasisUExtension = /*#__PURE__*/function () {
  function GLTFTextureBasisUExtension(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.KHR_TEXTURE_BASISU;
  }

  var _proto6 = GLTFTextureBasisUExtension.prototype;

  _proto6.loadTexture = function loadTexture(textureIndex) {
    var parser = this.parser;
    var json = parser.json;
    var textureDef = json.textures[textureIndex];

    if (!textureDef.extensions || !textureDef.extensions[this.name]) {
      return null;
    }

    var extension = textureDef.extensions[this.name];
    var source = json.images[extension.source];
    var loader = parser.options.ktx2Loader;

    if (!loader) {
      if (json.extensionsRequired && json.extensionsRequired.indexOf(this.name) >= 0) {
        throw new Error('THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures');
      } else {
        // Assumes that the extension is optional and that a fallback texture is present
        return null;
      }
    }

    return parser.loadTextureImage(textureIndex, source, loader);
  };

  return GLTFTextureBasisUExtension;
}();
/**
	 * WebP Texture Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_texture_webp
	 */


var GLTFTextureWebPExtension = /*#__PURE__*/function () {
  function GLTFTextureWebPExtension(parser) {
    this.parser = parser;
    this.name = EXTENSIONS.EXT_TEXTURE_WEBP;
    this.isSupported = null;
  }

  var _proto7 = GLTFTextureWebPExtension.prototype;

  _proto7.loadTexture = function loadTexture(textureIndex) {
    var name = this.name;
    var parser = this.parser;
    var json = parser.json;
    var textureDef = json.textures[textureIndex];

    if (!textureDef.extensions || !textureDef.extensions[name]) {
      return null;
    }

    var extension = textureDef.extensions[name];
    var source = json.images[extension.source];
    var loader = parser.textureLoader;

    if (source.uri) {
      var handler = parser.options.manager.getHandler(source.uri);
      if (handler !== null) loader = handler;
    }

    return this.detectSupport().then(function (isSupported) {
      if (isSupported) return parser.loadTextureImage(textureIndex, source, loader);

      if (json.extensionsRequired && json.extensionsRequired.indexOf(name) >= 0) {
        throw new Error('THREE.GLTFLoader: WebP required by asset but unsupported.');
      } // Fall back to PNG or JPEG.


      return parser.loadTexture(textureIndex);
    });
  };

  _proto7.detectSupport = function detectSupport() {
    if (!this.isSupported) {
      this.isSupported = new Promise(function (resolve) {
        var image = new Image(); // Lossy test image. Support for lossy images doesn't guarantee support for all
        // WebP images, unfortunately.

        image.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';

        image.onload = image.onerror = function () {
          resolve(image.height === 1);
        };
      });
    }

    return this.isSupported;
  };

  return GLTFTextureWebPExtension;
}();
/**
	* meshopt BufferView Compression Extension
	*
	* Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/EXT_meshopt_compression
	*/


var GLTFMeshoptCompression = /*#__PURE__*/function () {
  function GLTFMeshoptCompression(parser) {
    this.name = EXTENSIONS.EXT_MESHOPT_COMPRESSION;
    this.parser = parser;
  }

  var _proto8 = GLTFMeshoptCompression.prototype;

  _proto8.loadBufferView = function loadBufferView(index) {
    var json = this.parser.json;
    var bufferView = json.bufferViews[index];

    if (bufferView.extensions && bufferView.extensions[this.name]) {
      var extensionDef = bufferView.extensions[this.name];
      var buffer = this.parser.getDependency('buffer', extensionDef.buffer);
      var decoder = this.parser.options.meshoptDecoder;

      if (!decoder || !decoder.supported) {
        if (json.extensionsRequired && json.extensionsRequired.indexOf(this.name) >= 0) {
          throw new Error('THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files');
        } else {
          // Assumes that the extension is optional and that fallback buffer data is present
          return null;
        }
      }

      return Promise.all([buffer, decoder.ready]).then(function (res) {
        var byteOffset = extensionDef.byteOffset || 0;
        var byteLength = extensionDef.byteLength || 0;
        var count = extensionDef.count;
        var stride = extensionDef.byteStride;
        var result = new ArrayBuffer(count * stride);
        var source = new Uint8Array(res[0], byteOffset, byteLength);
        decoder.decodeGltfBuffer(new Uint8Array(result), count, stride, source, extensionDef.mode, extensionDef.filter);
        return result;
      });
    } else {
      return null;
    }
  };

  return GLTFMeshoptCompression;
}();
/* BINARY EXTENSION */


var BINARY_EXTENSION_HEADER_MAGIC = 'glTF';
var BINARY_EXTENSION_HEADER_LENGTH = 12;
var BINARY_EXTENSION_CHUNK_TYPES = {
  JSON: 0x4E4F534A,
  BIN: 0x004E4942
};

var GLTFBinaryExtension = function GLTFBinaryExtension(data) {
  this.name = EXTENSIONS.KHR_BINARY_GLTF;
  this.content = null;
  this.body = null;
  var headerView = new DataView(data, 0, BINARY_EXTENSION_HEADER_LENGTH);
  this.header = {
    magic: LoaderUtils.decodeText(new Uint8Array(data.slice(0, 4))),
    version: headerView.getUint32(4, true),
    length: headerView.getUint32(8, true)
  };

  if (this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC) {
    throw new Error('THREE.GLTFLoader: Unsupported glTF-Binary header.');
  } else if (this.header.version < 2.0) {
    throw new Error('THREE.GLTFLoader: Legacy binary file detected.');
  }

  var chunkContentsLength = this.header.length - BINARY_EXTENSION_HEADER_LENGTH;
  var chunkView = new DataView(data, BINARY_EXTENSION_HEADER_LENGTH);
  var chunkIndex = 0;

  while (chunkIndex < chunkContentsLength) {
    var chunkLength = chunkView.getUint32(chunkIndex, true);
    chunkIndex += 4;
    var chunkType = chunkView.getUint32(chunkIndex, true);
    chunkIndex += 4;

    if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON) {
      var contentArray = new Uint8Array(data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength);
      this.content = LoaderUtils.decodeText(contentArray);
    } else if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN) {
      var byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
      this.body = data.slice(byteOffset, byteOffset + chunkLength);
    } // Clients must ignore chunks with unknown types.


    chunkIndex += chunkLength;
  }

  if (this.content === null) {
    throw new Error('THREE.GLTFLoader: JSON content not found.');
  }
};
/**
	 * DRACO Mesh Compression Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_draco_mesh_compression
	 */


var GLTFDracoMeshCompressionExtension = /*#__PURE__*/function () {
  function GLTFDracoMeshCompressionExtension(json, dracoLoader) {
    if (!dracoLoader) {
      throw new Error('THREE.GLTFLoader: No DRACOLoader instance provided.');
    }

    this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
    this.json = json;
    this.dracoLoader = dracoLoader;
    this.dracoLoader.preload();
  }

  var _proto9 = GLTFDracoMeshCompressionExtension.prototype;

  _proto9.decodePrimitive = function decodePrimitive(primitive, parser) {
    var json = this.json;
    var dracoLoader = this.dracoLoader;
    var bufferViewIndex = primitive.extensions[this.name].bufferView;
    var gltfAttributeMap = primitive.extensions[this.name].attributes;
    var threeAttributeMap = {};
    var attributeNormalizedMap = {};
    var attributeTypeMap = {};

    for (var attributeName in gltfAttributeMap) {
      var threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();
      threeAttributeMap[threeAttributeName] = gltfAttributeMap[attributeName];
    }

    for (var _attributeName in primitive.attributes) {
      var _threeAttributeName = ATTRIBUTES[_attributeName] || _attributeName.toLowerCase();

      if (gltfAttributeMap[_attributeName] !== undefined) {
        var accessorDef = json.accessors[primitive.attributes[_attributeName]];
        var componentType = WEBGL_COMPONENT_TYPES[accessorDef.componentType];
        attributeTypeMap[_threeAttributeName] = componentType;
        attributeNormalizedMap[_threeAttributeName] = accessorDef.normalized === true;
      }
    }

    return parser.getDependency('bufferView', bufferViewIndex).then(function (bufferView) {
      return new Promise(function (resolve) {
        dracoLoader.decodeDracoFile(bufferView, function (geometry) {
          for (var _attributeName2 in geometry.attributes) {
            var attribute = geometry.attributes[_attributeName2];
            var normalized = attributeNormalizedMap[_attributeName2];
            if (normalized !== undefined) attribute.normalized = normalized;
          }

          resolve(geometry);
        }, threeAttributeMap, attributeTypeMap);
      });
    });
  };

  return GLTFDracoMeshCompressionExtension;
}();
/**
	 * Texture Transform Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_texture_transform
	 */


var GLTFTextureTransformExtension = /*#__PURE__*/function () {
  function GLTFTextureTransformExtension() {
    this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM;
  }

  var _proto10 = GLTFTextureTransformExtension.prototype;

  _proto10.extendTexture = function extendTexture(texture, transform) {
    texture = texture.clone();

    if (transform.offset !== undefined) {
      texture.offset.fromArray(transform.offset);
    }

    if (transform.rotation !== undefined) {
      texture.rotation = transform.rotation;
    }

    if (transform.scale !== undefined) {
      texture.repeat.fromArray(transform.scale);
    }

    if (transform.texCoord !== undefined) {
      console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.');
    }

    texture.needsUpdate = true;
    return texture;
  };

  return GLTFTextureTransformExtension;
}();
/**
	 * Specular-Glossiness Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_pbrSpecularGlossiness
	 */

/**
	 * A sub class of StandardMaterial with some of the functionality
	 * changed via the `onBeforeCompile` callback
	 * @pailhead
	 */


var GLTFMeshStandardSGMaterial = /*#__PURE__*/function (_MeshStandardMaterial) {
  _inheritsLoose(GLTFMeshStandardSGMaterial, _MeshStandardMaterial);

  function GLTFMeshStandardSGMaterial(params) {
    var _this2;

    _this2 = _MeshStandardMaterial.call(this) || this;
    _this2.isGLTFSpecularGlossinessMaterial = true; //various chunks that need replacing

    var specularMapParsFragmentChunk = ['#ifdef USE_SPECULARMAP', '	uniform sampler2D specularMap;', '#endif'].join('\n');
    var glossinessMapParsFragmentChunk = ['#ifdef USE_GLOSSINESSMAP', '	uniform sampler2D glossinessMap;', '#endif'].join('\n');
    var specularMapFragmentChunk = ['vec3 specularFactor = specular;', '#ifdef USE_SPECULARMAP', '	vec4 texelSpecular = texture2D( specularMap, vUv );', '	texelSpecular = sRGBToLinear( texelSpecular );', '	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture', '	specularFactor *= texelSpecular.rgb;', '#endif'].join('\n');
    var glossinessMapFragmentChunk = ['float glossinessFactor = glossiness;', '#ifdef USE_GLOSSINESSMAP', '	vec4 texelGlossiness = texture2D( glossinessMap, vUv );', '	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture', '	glossinessFactor *= texelGlossiness.a;', '#endif'].join('\n');
    var lightPhysicalFragmentChunk = ['PhysicalMaterial material;', 'material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );', 'vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );', 'float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );', 'material.specularRoughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.', 'material.specularRoughness += geometryRoughness;', 'material.specularRoughness = min( material.specularRoughness, 1.0 );', 'material.specularColor = specularFactor;'].join('\n');
    var uniforms = {
      specular: {
        value: new Color().setHex(0xffffff)
      },
      glossiness: {
        value: 1
      },
      specularMap: {
        value: null
      },
      glossinessMap: {
        value: null
      }
    };
    _this2._extraUniforms = uniforms;

    _this2.onBeforeCompile = function (shader) {
      for (var uniformName in uniforms) {
        shader.uniforms[uniformName] = uniforms[uniformName];
      }

      shader.fragmentShader = shader.fragmentShader.replace('uniform float roughness;', 'uniform vec3 specular;').replace('uniform float metalness;', 'uniform float glossiness;').replace('#include <roughnessmap_pars_fragment>', specularMapParsFragmentChunk).replace('#include <metalnessmap_pars_fragment>', glossinessMapParsFragmentChunk).replace('#include <roughnessmap_fragment>', specularMapFragmentChunk).replace('#include <metalnessmap_fragment>', glossinessMapFragmentChunk).replace('#include <lights_physical_fragment>', lightPhysicalFragmentChunk);
    };

    Object.defineProperties(_assertThisInitialized(_this2), {
      specular: {
        get: function get() {
          return uniforms.specular.value;
        },
        set: function set(v) {
          uniforms.specular.value = v;
        }
      },
      specularMap: {
        get: function get() {
          return uniforms.specularMap.value;
        },
        set: function set(v) {
          uniforms.specularMap.value = v;

          if (v) {
            this.defines.USE_SPECULARMAP = ''; // USE_UV is set by the renderer for specular maps
          } else {
            delete this.defines.USE_SPECULARMAP;
          }
        }
      },
      glossiness: {
        get: function get() {
          return uniforms.glossiness.value;
        },
        set: function set(v) {
          uniforms.glossiness.value = v;
        }
      },
      glossinessMap: {
        get: function get() {
          return uniforms.glossinessMap.value;
        },
        set: function set(v) {
          uniforms.glossinessMap.value = v;

          if (v) {
            this.defines.USE_GLOSSINESSMAP = '';
            this.defines.USE_UV = '';
          } else {
            delete this.defines.USE_GLOSSINESSMAP;
            delete this.defines.USE_UV;
          }
        }
      }
    });
    delete _this2.metalness;
    delete _this2.roughness;
    delete _this2.metalnessMap;
    delete _this2.roughnessMap;

    _this2.setValues(params);

    return _this2;
  }

  var _proto11 = GLTFMeshStandardSGMaterial.prototype;

  _proto11.copy = function copy(source) {
    _MeshStandardMaterial.prototype.copy.call(this, source);

    this.specularMap = source.specularMap;
    this.specular.copy(source.specular);
    this.glossinessMap = source.glossinessMap;
    this.glossiness = source.glossiness;
    delete this.metalness;
    delete this.roughness;
    delete this.metalnessMap;
    delete this.roughnessMap;
    return this;
  };

  return GLTFMeshStandardSGMaterial;
}(MeshStandardMaterial);

var GLTFMaterialsPbrSpecularGlossinessExtension = /*#__PURE__*/function () {
  function GLTFMaterialsPbrSpecularGlossinessExtension() {
    this.name = EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS;
    this.specularGlossinessParams = ['color', 'map', 'lightMap', 'lightMapIntensity', 'aoMap', 'aoMapIntensity', 'emissive', 'emissiveIntensity', 'emissiveMap', 'bumpMap', 'bumpScale', 'normalMap', 'normalMapType', 'displacementMap', 'displacementScale', 'displacementBias', 'specularMap', 'specular', 'glossinessMap', 'glossiness', 'alphaMap', 'envMap', 'envMapIntensity', 'refractionRatio'];
  }

  var _proto12 = GLTFMaterialsPbrSpecularGlossinessExtension.prototype;

  _proto12.getMaterialType = function getMaterialType() {
    return GLTFMeshStandardSGMaterial;
  };

  _proto12.extendParams = function extendParams(materialParams, materialDef, parser) {
    var pbrSpecularGlossiness = materialDef.extensions[this.name];
    materialParams.color = new Color(1.0, 1.0, 1.0);
    materialParams.opacity = 1.0;
    var pending = [];

    if (Array.isArray(pbrSpecularGlossiness.diffuseFactor)) {
      var array = pbrSpecularGlossiness.diffuseFactor;
      materialParams.color.fromArray(array);
      materialParams.opacity = array[3];
    }

    if (pbrSpecularGlossiness.diffuseTexture !== undefined) {
      pending.push(parser.assignTexture(materialParams, 'map', pbrSpecularGlossiness.diffuseTexture));
    }

    materialParams.emissive = new Color(0.0, 0.0, 0.0);
    materialParams.glossiness = pbrSpecularGlossiness.glossinessFactor !== undefined ? pbrSpecularGlossiness.glossinessFactor : 1.0;
    materialParams.specular = new Color(1.0, 1.0, 1.0);

    if (Array.isArray(pbrSpecularGlossiness.specularFactor)) {
      materialParams.specular.fromArray(pbrSpecularGlossiness.specularFactor);
    }

    if (pbrSpecularGlossiness.specularGlossinessTexture !== undefined) {
      var specGlossMapDef = pbrSpecularGlossiness.specularGlossinessTexture;
      pending.push(parser.assignTexture(materialParams, 'glossinessMap', specGlossMapDef));
      pending.push(parser.assignTexture(materialParams, 'specularMap', specGlossMapDef));
    }

    return Promise.all(pending);
  };

  _proto12.createMaterial = function createMaterial(materialParams) {
    var material = new GLTFMeshStandardSGMaterial(materialParams);
    material.fog = true;
    material.color = materialParams.color;
    material.map = materialParams.map === undefined ? null : materialParams.map;
    material.lightMap = null;
    material.lightMapIntensity = 1.0;
    material.aoMap = materialParams.aoMap === undefined ? null : materialParams.aoMap;
    material.aoMapIntensity = 1.0;
    material.emissive = materialParams.emissive;
    material.emissiveIntensity = 1.0;
    material.emissiveMap = materialParams.emissiveMap === undefined ? null : materialParams.emissiveMap;
    material.bumpMap = materialParams.bumpMap === undefined ? null : materialParams.bumpMap;
    material.bumpScale = 1;
    material.normalMap = materialParams.normalMap === undefined ? null : materialParams.normalMap;
    material.normalMapType = TangentSpaceNormalMap;
    if (materialParams.normalScale) material.normalScale = materialParams.normalScale;
    material.displacementMap = null;
    material.displacementScale = 1;
    material.displacementBias = 0;
    material.specularMap = materialParams.specularMap === undefined ? null : materialParams.specularMap;
    material.specular = materialParams.specular;
    material.glossinessMap = materialParams.glossinessMap === undefined ? null : materialParams.glossinessMap;
    material.glossiness = materialParams.glossiness;
    material.alphaMap = null;
    material.envMap = materialParams.envMap === undefined ? null : materialParams.envMap;
    material.envMapIntensity = 1.0;
    material.refractionRatio = 0.98;
    return material;
  };

  return GLTFMaterialsPbrSpecularGlossinessExtension;
}();
/**
	 * Mesh Quantization Extension
	 *
	 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization
	 */


var GLTFMeshQuantizationExtension = function GLTFMeshQuantizationExtension() {
  this.name = EXTENSIONS.KHR_MESH_QUANTIZATION;
};
/*********************************/

/********** INTERPOLATION ********/

/*********************************/
// Spline Interpolation
// Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#appendix-c-spline-interpolation


var GLTFCubicSplineInterpolant = /*#__PURE__*/function (_Interpolant) {
  _inheritsLoose(GLTFCubicSplineInterpolant, _Interpolant);

  function GLTFCubicSplineInterpolant(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    return _Interpolant.call(this, parameterPositions, sampleValues, sampleSize, resultBuffer) || this;
  }

  var _proto13 = GLTFCubicSplineInterpolant.prototype;

  _proto13.copySampleValue_ = function copySampleValue_(index) {
    // Copies a sample value to the result buffer. See description of glTF
    // CUBICSPLINE values layout in interpolate_() function below.
    var result = this.resultBuffer,
        values = this.sampleValues,
        valueSize = this.valueSize,
        offset = index * valueSize * 3 + valueSize;

    for (var i = 0; i !== valueSize; i++) {
      result[i] = values[offset + i];
    }

    return result;
  };

  return GLTFCubicSplineInterpolant;
}(Interpolant);

GLTFCubicSplineInterpolant.prototype.beforeStart_ = GLTFCubicSplineInterpolant.prototype.copySampleValue_;
GLTFCubicSplineInterpolant.prototype.afterEnd_ = GLTFCubicSplineInterpolant.prototype.copySampleValue_;

GLTFCubicSplineInterpolant.prototype.interpolate_ = function (i1, t0, t, t1) {
  var result = this.resultBuffer;
  var values = this.sampleValues;
  var stride = this.valueSize;
  var stride2 = stride * 2;
  var stride3 = stride * 3;
  var td = t1 - t0;
  var p = (t - t0) / td;
  var pp = p * p;
  var ppp = pp * p;
  var offset1 = i1 * stride3;
  var offset0 = offset1 - stride3;
  var s2 = -2 * ppp + 3 * pp;
  var s3 = ppp - pp;
  var s0 = 1 - s2;
  var s1 = s3 - pp + p; // Layout of keyframe output values for CUBICSPLINE animations:
  //   [ inTangent_1, splineVertex_1, outTangent_1, inTangent_2, splineVertex_2, ... ]

  for (var i = 0; i !== stride; i++) {
    var p0 = values[offset0 + i + stride]; // splineVertex_k

    var m0 = values[offset0 + i + stride2] * td; // outTangent_k * (t_k+1 - t_k)

    var p1 = values[offset1 + i + stride]; // splineVertex_k+1

    var m1 = values[offset1 + i] * td; // inTangent_k+1 * (t_k+1 - t_k)

    result[i] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;
  }

  return result;
};
/*********************************/

/********** INTERNALS ************/

/*********************************/

/* CONSTANTS */


var WEBGL_CONSTANTS = {
  FLOAT: 5126,
  //FLOAT_MAT2: 35674,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
};
var WEBGL_COMPONENT_TYPES = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
var WEBGL_FILTERS = {
  9728: NearestFilter$1,
  9729: LinearFilter$1,
  9984: NearestMipmapNearestFilter,
  9985: LinearMipmapNearestFilter,
  9986: NearestMipmapLinearFilter,
  9987: LinearMipmapLinearFilter
};
var WEBGL_WRAPPINGS = {
  33071: ClampToEdgeWrapping,
  33648: MirroredRepeatWrapping,
  10497: RepeatWrapping
};
var WEBGL_TYPE_SIZES = {
  'SCALAR': 1,
  'VEC2': 2,
  'VEC3': 3,
  'VEC4': 4,
  'MAT2': 4,
  'MAT3': 9,
  'MAT4': 16
};
var ATTRIBUTES = {
  POSITION: 'position',
  NORMAL: 'normal',
  TANGENT: 'tangent',
  TEXCOORD_0: 'uv',
  TEXCOORD_1: 'uv2',
  COLOR_0: 'color',
  WEIGHTS_0: 'skinWeight',
  JOINTS_0: 'skinIndex'
};
var PATH_PROPERTIES = {
  scale: 'scale',
  translation: 'position',
  rotation: 'quaternion',
  weights: 'morphTargetInfluences'
};
var INTERPOLATION = {
  CUBICSPLINE: undefined,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: InterpolateLinear,
  STEP: InterpolateDiscrete
};
var ALPHA_MODES = {
  OPAQUE: 'OPAQUE',
  MASK: 'MASK',
  BLEND: 'BLEND'
};
/* UTILITY FUNCTIONS */

function resolveURL(url, path) {
  // Invalid URL
  if (typeof url !== 'string' || url === '') return ''; // Host Relative URL

  if (/^https?:\/\//i.test(path) && /^\//.test(url)) {
    path = path.replace(/(^https?:\/\/[^\/]+).*/i, '$1');
  } // Absolute URL http://,https://,//


  if (/^(https?:)?\/\//i.test(url)) return url; // Data URI

  if (/^data:.*,.*$/i.test(url)) return url; // Blob URL

  if (/^blob:.*$/i.test(url)) return url; // Relative URL

  return path + url;
}
/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#default-material
	 */


function createDefaultMaterial(cache) {
  if (cache['DefaultMaterial'] === undefined) {
    cache['DefaultMaterial'] = new MeshStandardMaterial({
      color: 0xFFFFFF,
      emissive: 0x000000,
      metalness: 1,
      roughness: 1,
      transparent: false,
      depthTest: true,
      side: FrontSide
    });
  }

  return cache['DefaultMaterial'];
}

function addUnknownExtensionsToUserData(knownExtensions, object, objectDef) {
  // Add unknown glTF extensions to an object's userData.
  for (var name in objectDef.extensions) {
    if (knownExtensions[name] === undefined) {
      object.userData.gltfExtensions = object.userData.gltfExtensions || {};
      object.userData.gltfExtensions[name] = objectDef.extensions[name];
    }
  }
}
/**
	 * @param {Object3D|Material|BufferGeometry} object
	 * @param {GLTF.definition} gltfDef
	 */


function assignExtrasToUserData(object, gltfDef) {
  if (gltfDef.extras !== undefined) {
    if (typeof gltfDef.extras === 'object') {
      Object.assign(object.userData, gltfDef.extras);
    } else {
      console.warn('THREE.GLTFLoader: Ignoring primitive type .extras, ' + gltfDef.extras);
    }
  }
}
/**
	 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#morph-targets
	 *
	 * @param {BufferGeometry} geometry
	 * @param {Array<GLTF.Target>} targets
	 * @param {GLTFParser} parser
	 * @return {Promise<BufferGeometry>}
	 */


function addMorphTargets(geometry, targets, parser) {
  var hasMorphPosition = false;
  var hasMorphNormal = false;

  for (var i = 0, il = targets.length; i < il; i++) {
    var target = targets[i];
    if (target.POSITION !== undefined) hasMorphPosition = true;
    if (target.NORMAL !== undefined) hasMorphNormal = true;
    if (hasMorphPosition && hasMorphNormal) break;
  }

  if (!hasMorphPosition && !hasMorphNormal) return Promise.resolve(geometry);
  var pendingPositionAccessors = [];
  var pendingNormalAccessors = [];

  for (var _i2 = 0, _il = targets.length; _i2 < _il; _i2++) {
    var _target = targets[_i2];

    if (hasMorphPosition) {
      var pendingAccessor = _target.POSITION !== undefined ? parser.getDependency('accessor', _target.POSITION) : geometry.attributes.position;
      pendingPositionAccessors.push(pendingAccessor);
    }

    if (hasMorphNormal) {
      var _pendingAccessor = _target.NORMAL !== undefined ? parser.getDependency('accessor', _target.NORMAL) : geometry.attributes.normal;

      pendingNormalAccessors.push(_pendingAccessor);
    }
  }

  return Promise.all([Promise.all(pendingPositionAccessors), Promise.all(pendingNormalAccessors)]).then(function (accessors) {
    var morphPositions = accessors[0];
    var morphNormals = accessors[1];
    if (hasMorphPosition) geometry.morphAttributes.position = morphPositions;
    if (hasMorphNormal) geometry.morphAttributes.normal = morphNormals;
    geometry.morphTargetsRelative = true;
    return geometry;
  });
}
/**
	 * @param {Mesh} mesh
	 * @param {GLTF.Mesh} meshDef
	 */


function updateMorphTargets(mesh, meshDef) {
  mesh.updateMorphTargets();

  if (meshDef.weights !== undefined) {
    for (var i = 0, il = meshDef.weights.length; i < il; i++) {
      mesh.morphTargetInfluences[i] = meshDef.weights[i];
    }
  } // .extras has user-defined data, so check that .extras.targetNames is an array.


  if (meshDef.extras && Array.isArray(meshDef.extras.targetNames)) {
    var targetNames = meshDef.extras.targetNames;

    if (mesh.morphTargetInfluences.length === targetNames.length) {
      mesh.morphTargetDictionary = {};

      for (var _i3 = 0, _il2 = targetNames.length; _i3 < _il2; _i3++) {
        mesh.morphTargetDictionary[targetNames[_i3]] = _i3;
      }
    } else {
      console.warn('THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.');
    }
  }
}

function createPrimitiveKey(primitiveDef) {
  var dracoExtension = primitiveDef.extensions && primitiveDef.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION];
  var geometryKey;

  if (dracoExtension) {
    geometryKey = 'draco:' + dracoExtension.bufferView + ':' + dracoExtension.indices + ':' + createAttributesKey(dracoExtension.attributes);
  } else {
    geometryKey = primitiveDef.indices + ':' + createAttributesKey(primitiveDef.attributes) + ':' + primitiveDef.mode;
  }

  return geometryKey;
}

function createAttributesKey(attributes) {
  var attributesKey = '';
  var keys = Object.keys(attributes).sort();

  for (var i = 0, il = keys.length; i < il; i++) {
    attributesKey += keys[i] + ':' + attributes[keys[i]] + ';';
  }

  return attributesKey;
}

function getNormalizedComponentScale(constructor) {
  // Reference:
  // https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization#encoding-quantized-data
  switch (constructor) {
    case Int8Array:
      return 1 / 127;

    case Uint8Array:
      return 1 / 255;

    case Int16Array:
      return 1 / 32767;

    case Uint16Array:
      return 1 / 65535;

    default:
      throw new Error('THREE.GLTFLoader: Unsupported normalized accessor component type.');
  }
}
/* GLTF PARSER */


var GLTFParser = /*#__PURE__*/function () {
  function GLTFParser(json, options) {
    if (json === void 0) {
      json = {};
    }

    if (options === void 0) {
      options = {};
    }

    this.json = json;
    this.extensions = {};
    this.plugins = {};
    this.options = options; // loader object cache

    this.cache = new GLTFRegistry(); // associations between Three.js objects and glTF elements

    this.associations = new Map(); // BufferGeometry caching

    this.primitiveCache = {}; // Object3D instance caches

    this.meshCache = {
      refs: {},
      uses: {}
    };
    this.cameraCache = {
      refs: {},
      uses: {}
    };
    this.lightCache = {
      refs: {},
      uses: {}
    }; // Track node names, to ensure no duplicates

    this.nodeNamesUsed = {}; // Use an ImageBitmapLoader if imageBitmaps are supported. Moves much of the
    // expensive work of uploading a texture to the GPU off the main thread.

    if (typeof createImageBitmap !== 'undefined' && /Firefox/.test(navigator.userAgent) === false) {
      this.textureLoader = new ImageBitmapLoader(this.options.manager);
    } else {
      this.textureLoader = new TextureLoader(this.options.manager);
    }

    this.textureLoader.setCrossOrigin(this.options.crossOrigin);
    this.textureLoader.setRequestHeader(this.options.requestHeader);
    this.fileLoader = new FileLoader(this.options.manager);
    this.fileLoader.setResponseType('arraybuffer');

    if (this.options.crossOrigin === 'use-credentials') {
      this.fileLoader.setWithCredentials(true);
    }
  }

  var _proto14 = GLTFParser.prototype;

  _proto14.setExtensions = function setExtensions(extensions) {
    this.extensions = extensions;
  };

  _proto14.setPlugins = function setPlugins(plugins) {
    this.plugins = plugins;
  };

  _proto14.parse = function parse(onLoad, onError) {
    var parser = this;
    var json = this.json;
    var extensions = this.extensions; // Clear the loader cache

    this.cache.removeAll(); // Mark the special nodes/meshes in json for efficient parse

    this._invokeAll(function (ext) {
      return ext._markDefs && ext._markDefs();
    });

    Promise.all(this._invokeAll(function (ext) {
      return ext.beforeRoot && ext.beforeRoot();
    })).then(function () {
      return Promise.all([parser.getDependencies('scene'), parser.getDependencies('animation'), parser.getDependencies('camera')]);
    }).then(function (dependencies) {
      var result = {
        scene: dependencies[0][json.scene || 0],
        scenes: dependencies[0],
        animations: dependencies[1],
        cameras: dependencies[2],
        asset: json.asset,
        parser: parser,
        userData: {}
      };
      addUnknownExtensionsToUserData(extensions, result, json);
      assignExtrasToUserData(result, json);
      Promise.all(parser._invokeAll(function (ext) {
        return ext.afterRoot && ext.afterRoot(result);
      })).then(function () {
        onLoad(result);
      });
    }).catch(onError);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  ;

  _proto14._markDefs = function _markDefs() {
    var nodeDefs = this.json.nodes || [];
    var skinDefs = this.json.skins || [];
    var meshDefs = this.json.meshes || []; // Nothing in the node definition indicates whether it is a Bone or an
    // Object3D. Use the skins' joint references to mark bones.

    for (var skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex++) {
      var joints = skinDefs[skinIndex].joints;

      for (var i = 0, il = joints.length; i < il; i++) {
        nodeDefs[joints[i]].isBone = true;
      }
    } // Iterate over all nodes, marking references to shared resources,
    // as well as skeleton joints.


    for (var nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++) {
      var nodeDef = nodeDefs[nodeIndex];

      if (nodeDef.mesh !== undefined) {
        this._addNodeRef(this.meshCache, nodeDef.mesh); // Nothing in the mesh definition indicates whether it is
        // a SkinnedMesh or Mesh. Use the node's mesh reference
        // to mark SkinnedMesh if node has skin.


        if (nodeDef.skin !== undefined) {
          meshDefs[nodeDef.mesh].isSkinnedMesh = true;
        }
      }

      if (nodeDef.camera !== undefined) {
        this._addNodeRef(this.cameraCache, nodeDef.camera);
      }
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   */
  ;

  _proto14._addNodeRef = function _addNodeRef(cache, index) {
    if (index === undefined) return;

    if (cache.refs[index] === undefined) {
      cache.refs[index] = cache.uses[index] = 0;
    }

    cache.refs[index]++;
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  ;

  _proto14._getNodeRef = function _getNodeRef(cache, index, object) {
    if (cache.refs[index] <= 1) return object;
    var ref = object.clone();
    ref.name += '_instance_' + cache.uses[index]++;
    return ref;
  };

  _proto14._invokeOne = function _invokeOne(func) {
    var extensions = Object.values(this.plugins);
    extensions.push(this);

    for (var i = 0; i < extensions.length; i++) {
      var result = func(extensions[i]);
      if (result) return result;
    }

    return null;
  };

  _proto14._invokeAll = function _invokeAll(func) {
    var extensions = Object.values(this.plugins);
    extensions.unshift(this);
    var pending = [];

    for (var i = 0; i < extensions.length; i++) {
      var result = func(extensions[i]);
      if (result) pending.push(result);
    }

    return pending;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  ;

  _proto14.getDependency = function getDependency(type, index) {
    var cacheKey = type + ':' + index;
    var dependency = this.cache.get(cacheKey);

    if (!dependency) {
      switch (type) {
        case 'scene':
          dependency = this.loadScene(index);
          break;

        case 'node':
          dependency = this.loadNode(index);
          break;

        case 'mesh':
          dependency = this._invokeOne(function (ext) {
            return ext.loadMesh && ext.loadMesh(index);
          });
          break;

        case 'accessor':
          dependency = this.loadAccessor(index);
          break;

        case 'bufferView':
          dependency = this._invokeOne(function (ext) {
            return ext.loadBufferView && ext.loadBufferView(index);
          });
          break;

        case 'buffer':
          dependency = this.loadBuffer(index);
          break;

        case 'material':
          dependency = this._invokeOne(function (ext) {
            return ext.loadMaterial && ext.loadMaterial(index);
          });
          break;

        case 'texture':
          dependency = this._invokeOne(function (ext) {
            return ext.loadTexture && ext.loadTexture(index);
          });
          break;

        case 'skin':
          dependency = this.loadSkin(index);
          break;

        case 'animation':
          dependency = this.loadAnimation(index);
          break;

        case 'camera':
          dependency = this.loadCamera(index);
          break;

        default:
          throw new Error('Unknown type: ' + type);
      }

      this.cache.add(cacheKey, dependency);
    }

    return dependency;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  ;

  _proto14.getDependencies = function getDependencies(type) {
    var dependencies = this.cache.get(type);

    if (!dependencies) {
      var parser = this;
      var defs = this.json[type + (type === 'mesh' ? 'es' : 's')] || [];
      dependencies = Promise.all(defs.map(function (def, index) {
        return parser.getDependency(type, index);
      }));
      this.cache.add(type, dependencies);
    }

    return dependencies;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  ;

  _proto14.loadBuffer = function loadBuffer(bufferIndex) {
    var bufferDef = this.json.buffers[bufferIndex];
    var loader = this.fileLoader;

    if (bufferDef.type && bufferDef.type !== 'arraybuffer') {
      throw new Error('THREE.GLTFLoader: ' + bufferDef.type + ' buffer type is not supported.');
    } // If present, GLB container is required to be the first buffer.


    if (bufferDef.uri === undefined && bufferIndex === 0) {
      return Promise.resolve(this.extensions[EXTENSIONS.KHR_BINARY_GLTF].body);
    }

    var options = this.options;
    return new Promise(function (resolve, reject) {
      loader.load(resolveURL(bufferDef.uri, options.path), resolve, undefined, function () {
        reject(new Error('THREE.GLTFLoader: Failed to load buffer "' + bufferDef.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  ;

  _proto14.loadBufferView = function loadBufferView(bufferViewIndex) {
    var bufferViewDef = this.json.bufferViews[bufferViewIndex];
    return this.getDependency('buffer', bufferViewDef.buffer).then(function (buffer) {
      var byteLength = bufferViewDef.byteLength || 0;
      var byteOffset = bufferViewDef.byteOffset || 0;
      return buffer.slice(byteOffset, byteOffset + byteLength);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  ;

  _proto14.loadAccessor = function loadAccessor(accessorIndex) {
    var parser = this;
    var json = this.json;
    var accessorDef = this.json.accessors[accessorIndex];

    if (accessorDef.bufferView === undefined && accessorDef.sparse === undefined) {
      // Ignore empty accessors, which may be used to declare runtime
      // information about attributes coming from another source (e.g. Draco
      // compression extension).
      return Promise.resolve(null);
    }

    var pendingBufferViews = [];

    if (accessorDef.bufferView !== undefined) {
      pendingBufferViews.push(this.getDependency('bufferView', accessorDef.bufferView));
    } else {
      pendingBufferViews.push(null);
    }

    if (accessorDef.sparse !== undefined) {
      pendingBufferViews.push(this.getDependency('bufferView', accessorDef.sparse.indices.bufferView));
      pendingBufferViews.push(this.getDependency('bufferView', accessorDef.sparse.values.bufferView));
    }

    return Promise.all(pendingBufferViews).then(function (bufferViews) {
      var bufferView = bufferViews[0];
      var itemSize = WEBGL_TYPE_SIZES[accessorDef.type];
      var TypedArray = WEBGL_COMPONENT_TYPES[accessorDef.componentType]; // For VEC3: itemSize is 3, elementBytes is 4, itemBytes is 12.

      var elementBytes = TypedArray.BYTES_PER_ELEMENT;
      var itemBytes = elementBytes * itemSize;
      var byteOffset = accessorDef.byteOffset || 0;
      var byteStride = accessorDef.bufferView !== undefined ? json.bufferViews[accessorDef.bufferView].byteStride : undefined;
      var normalized = accessorDef.normalized === true;
      var array, bufferAttribute; // The buffer is not interleaved if the stride is the item size in bytes.

      if (byteStride && byteStride !== itemBytes) {
        // Each "slice" of the buffer, as defined by 'count' elements of 'byteStride' bytes, gets its own InterleavedBuffer
        // This makes sure that IBA.count reflects accessor.count properly
        var ibSlice = Math.floor(byteOffset / byteStride);
        var ibCacheKey = 'InterleavedBuffer:' + accessorDef.bufferView + ':' + accessorDef.componentType + ':' + ibSlice + ':' + accessorDef.count;
        var ib = parser.cache.get(ibCacheKey);

        if (!ib) {
          array = new TypedArray(bufferView, ibSlice * byteStride, accessorDef.count * byteStride / elementBytes); // Integer parameters to IB/IBA are in array elements, not bytes.

          ib = new InterleavedBuffer(array, byteStride / elementBytes);
          parser.cache.add(ibCacheKey, ib);
        }

        bufferAttribute = new InterleavedBufferAttribute(ib, itemSize, byteOffset % byteStride / elementBytes, normalized);
      } else {
        if (bufferView === null) {
          array = new TypedArray(accessorDef.count * itemSize);
        } else {
          array = new TypedArray(bufferView, byteOffset, accessorDef.count * itemSize);
        }

        bufferAttribute = new BufferAttribute(array, itemSize, normalized);
      } // https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#sparse-accessors


      if (accessorDef.sparse !== undefined) {
        var itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
        var TypedArrayIndices = WEBGL_COMPONENT_TYPES[accessorDef.sparse.indices.componentType];
        var byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
        var byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;
        var sparseIndices = new TypedArrayIndices(bufferViews[1], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices);
        var sparseValues = new TypedArray(bufferViews[2], byteOffsetValues, accessorDef.sparse.count * itemSize);

        if (bufferView !== null) {
          // Avoid modifying the original ArrayBuffer, if the bufferView wasn't initialized with zeroes.
          bufferAttribute = new BufferAttribute(bufferAttribute.array.slice(), bufferAttribute.itemSize, bufferAttribute.normalized);
        }

        for (var i = 0, il = sparseIndices.length; i < il; i++) {
          var index = sparseIndices[i];
          bufferAttribute.setX(index, sparseValues[i * itemSize]);
          if (itemSize >= 2) bufferAttribute.setY(index, sparseValues[i * itemSize + 1]);
          if (itemSize >= 3) bufferAttribute.setZ(index, sparseValues[i * itemSize + 2]);
          if (itemSize >= 4) bufferAttribute.setW(index, sparseValues[i * itemSize + 3]);
          if (itemSize >= 5) throw new Error('THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.');
        }
      }

      return bufferAttribute;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture>}
   */
  ;

  _proto14.loadTexture = function loadTexture(textureIndex) {
    var json = this.json;
    var options = this.options;
    var textureDef = json.textures[textureIndex];
    var source = json.images[textureDef.source];
    var loader = this.textureLoader;

    if (source.uri) {
      var handler = options.manager.getHandler(source.uri);
      if (handler !== null) loader = handler;
    }

    return this.loadTextureImage(textureIndex, source, loader);
  };

  _proto14.loadTextureImage = function loadTextureImage(textureIndex, source, loader) {
    var parser = this;
    var json = this.json;
    var options = this.options;
    var textureDef = json.textures[textureIndex];
    var URL = self.URL || self.webkitURL;
    var sourceURI = source.uri;
    var isObjectURL = false;
    var hasAlpha = true;
    if (source.mimeType === 'image/jpeg') hasAlpha = false;

    if (source.bufferView !== undefined) {
      // Load binary image data from bufferView, if provided.
      sourceURI = parser.getDependency('bufferView', source.bufferView).then(function (bufferView) {
        if (source.mimeType === 'image/png') {
          // Inspect the PNG 'IHDR' chunk to determine whether the image could have an
          // alpha channel. This check is conservative — the image could have an alpha
          // channel with all values == 1, and the indexed type (colorType == 3) only
          // sometimes contains alpha.
          //
          // https://en.wikipedia.org/wiki/Portable_Network_Graphics#File_header
          var colorType = new DataView(bufferView, 25, 1).getUint8(0, false);
          hasAlpha = colorType === 6 || colorType === 4 || colorType === 3;
        }

        isObjectURL = true;
        var blob = new Blob([bufferView], {
          type: source.mimeType
        });
        sourceURI = URL.createObjectURL(blob);
        return sourceURI;
      });
    } else if (source.uri === undefined) {
      throw new Error('THREE.GLTFLoader: Image ' + textureIndex + ' is missing URI and bufferView');
    }

    return Promise.resolve(sourceURI).then(function (sourceURI) {
      return new Promise(function (resolve, reject) {
        var onLoad = resolve;

        if (loader.isImageBitmapLoader === true) {
          onLoad = function onLoad(imageBitmap) {
            resolve(new CanvasTexture(imageBitmap));
          };
        }

        loader.load(resolveURL(sourceURI, options.path), onLoad, undefined, reject);
      });
    }).then(function (texture) {
      // Clean up resources and configure Texture.
      if (isObjectURL === true) {
        URL.revokeObjectURL(sourceURI);
      }

      texture.flipY = false;
      if (textureDef.name) texture.name = textureDef.name; // When there is definitely no alpha channel in the texture, set RGBFormat to save space.

      if (!hasAlpha) texture.format = RGBFormat$1;
      var samplers = json.samplers || {};
      var sampler = samplers[textureDef.sampler] || {};
      texture.magFilter = WEBGL_FILTERS[sampler.magFilter] || LinearFilter$1;
      texture.minFilter = WEBGL_FILTERS[sampler.minFilter] || LinearMipmapLinearFilter;
      texture.wrapS = WEBGL_WRAPPINGS[sampler.wrapS] || RepeatWrapping;
      texture.wrapT = WEBGL_WRAPPINGS[sampler.wrapT] || RepeatWrapping;
      parser.associations.set(texture, {
        type: 'textures',
        index: textureIndex
      });
      return texture;
    });
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise}
   */
  ;

  _proto14.assignTexture = function assignTexture(materialParams, mapName, mapDef) {
    var parser = this;
    return this.getDependency('texture', mapDef.index).then(function (texture) {
      // Materials sample aoMap from UV set 1 and other maps from UV set 0 - this can't be configured
      // However, we will copy UV set 0 to UV set 1 on demand for aoMap
      if (mapDef.texCoord !== undefined && mapDef.texCoord != 0 && !(mapName === 'aoMap' && mapDef.texCoord == 1)) {
        console.warn('THREE.GLTFLoader: Custom UV set ' + mapDef.texCoord + ' for texture ' + mapName + ' not yet supported.');
      }

      if (parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM]) {
        var transform = mapDef.extensions !== undefined ? mapDef.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM] : undefined;

        if (transform) {
          var gltfReference = parser.associations.get(texture);
          texture = parser.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM].extendTexture(texture, transform);
          parser.associations.set(texture, gltfReference);
        }
      }

      materialParams[mapName] = texture;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   * @param  {Object3D} mesh Mesh, Line, or Points instance.
   */
  ;

  _proto14.assignFinalMaterial = function assignFinalMaterial(mesh) {
    var geometry = mesh.geometry;
    var material = mesh.material;
    var useVertexTangents = geometry.attributes.tangent !== undefined;
    var useVertexColors = geometry.attributes.color !== undefined;
    var useFlatShading = geometry.attributes.normal === undefined;
    var useSkinning = mesh.isSkinnedMesh === true;
    var useMorphTargets = Object.keys(geometry.morphAttributes).length > 0;
    var useMorphNormals = useMorphTargets && geometry.morphAttributes.normal !== undefined;

    if (mesh.isPoints) {
      var cacheKey = 'PointsMaterial:' + material.uuid;
      var pointsMaterial = this.cache.get(cacheKey);

      if (!pointsMaterial) {
        pointsMaterial = new PointsMaterial();
        Material.prototype.copy.call(pointsMaterial, material);
        pointsMaterial.color.copy(material.color);
        pointsMaterial.map = material.map;
        pointsMaterial.sizeAttenuation = false; // glTF spec says points should be 1px

        this.cache.add(cacheKey, pointsMaterial);
      }

      material = pointsMaterial;
    } else if (mesh.isLine) {
      var _cacheKey = 'LineBasicMaterial:' + material.uuid;

      var lineMaterial = this.cache.get(_cacheKey);

      if (!lineMaterial) {
        lineMaterial = new LineBasicMaterial();
        Material.prototype.copy.call(lineMaterial, material);
        lineMaterial.color.copy(material.color);
        this.cache.add(_cacheKey, lineMaterial);
      }

      material = lineMaterial;
    } // Clone the material if it will be modified


    if (useVertexTangents || useVertexColors || useFlatShading || useSkinning || useMorphTargets) {
      var _cacheKey2 = 'ClonedMaterial:' + material.uuid + ':';

      if (material.isGLTFSpecularGlossinessMaterial) _cacheKey2 += 'specular-glossiness:';
      if (useSkinning) _cacheKey2 += 'skinning:';
      if (useVertexTangents) _cacheKey2 += 'vertex-tangents:';
      if (useVertexColors) _cacheKey2 += 'vertex-colors:';
      if (useFlatShading) _cacheKey2 += 'flat-shading:';
      if (useMorphTargets) _cacheKey2 += 'morph-targets:';
      if (useMorphNormals) _cacheKey2 += 'morph-normals:';
      var cachedMaterial = this.cache.get(_cacheKey2);

      if (!cachedMaterial) {
        cachedMaterial = material.clone();
        if (useSkinning) cachedMaterial.skinning = true;
        if (useVertexColors) cachedMaterial.vertexColors = true;
        if (useFlatShading) cachedMaterial.flatShading = true;
        if (useMorphTargets) cachedMaterial.morphTargets = true;
        if (useMorphNormals) cachedMaterial.morphNormals = true;

        if (useVertexTangents) {
          cachedMaterial.vertexTangents = true; // https://github.com/mrdoob/three.js/issues/11438#issuecomment-507003995

          if (cachedMaterial.normalScale) cachedMaterial.normalScale.y *= -1;
          if (cachedMaterial.clearcoatNormalScale) cachedMaterial.clearcoatNormalScale.y *= -1;
        }

        this.cache.add(_cacheKey2, cachedMaterial);
        this.associations.set(cachedMaterial, this.associations.get(material));
      }

      material = cachedMaterial;
    } // workarounds for mesh and geometry


    if (material.aoMap && geometry.attributes.uv2 === undefined && geometry.attributes.uv !== undefined) {
      geometry.setAttribute('uv2', geometry.attributes.uv);
    }

    mesh.material = material;
  };

  _proto14.getMaterialType = function getMaterialType()
  /* materialIndex */
  {
    return MeshStandardMaterial;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  ;

  _proto14.loadMaterial = function loadMaterial(materialIndex) {
    var parser = this;
    var json = this.json;
    var extensions = this.extensions;
    var materialDef = json.materials[materialIndex];
    var materialType;
    var materialParams = {};
    var materialExtensions = materialDef.extensions || {};
    var pending = [];

    if (materialExtensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
      var sgExtension = extensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
      materialType = sgExtension.getMaterialType();
      pending.push(sgExtension.extendParams(materialParams, materialDef, parser));
    } else if (materialExtensions[EXTENSIONS.KHR_MATERIALS_UNLIT]) {
      var kmuExtension = extensions[EXTENSIONS.KHR_MATERIALS_UNLIT];
      materialType = kmuExtension.getMaterialType();
      pending.push(kmuExtension.extendParams(materialParams, materialDef, parser));
    } else {
      // Specification:
      // https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#metallic-roughness-material
      var metallicRoughness = materialDef.pbrMetallicRoughness || {};
      materialParams.color = new Color(1.0, 1.0, 1.0);
      materialParams.opacity = 1.0;

      if (Array.isArray(metallicRoughness.baseColorFactor)) {
        var array = metallicRoughness.baseColorFactor;
        materialParams.color.fromArray(array);
        materialParams.opacity = array[3];
      }

      if (metallicRoughness.baseColorTexture !== undefined) {
        pending.push(parser.assignTexture(materialParams, 'map', metallicRoughness.baseColorTexture));
      }

      materialParams.metalness = metallicRoughness.metallicFactor !== undefined ? metallicRoughness.metallicFactor : 1.0;
      materialParams.roughness = metallicRoughness.roughnessFactor !== undefined ? metallicRoughness.roughnessFactor : 1.0;

      if (metallicRoughness.metallicRoughnessTexture !== undefined) {
        pending.push(parser.assignTexture(materialParams, 'metalnessMap', metallicRoughness.metallicRoughnessTexture));
        pending.push(parser.assignTexture(materialParams, 'roughnessMap', metallicRoughness.metallicRoughnessTexture));
      }

      materialType = this._invokeOne(function (ext) {
        return ext.getMaterialType && ext.getMaterialType(materialIndex);
      });
      pending.push(Promise.all(this._invokeAll(function (ext) {
        return ext.extendMaterialParams && ext.extendMaterialParams(materialIndex, materialParams);
      })));
    }

    if (materialDef.doubleSided === true) {
      materialParams.side = DoubleSide;
    }

    var alphaMode = materialDef.alphaMode || ALPHA_MODES.OPAQUE;

    if (alphaMode === ALPHA_MODES.BLEND) {
      materialParams.transparent = true; // See: https://github.com/mrdoob/three.js/issues/17706

      materialParams.depthWrite = false;
    } else {
      materialParams.transparent = false;

      if (alphaMode === ALPHA_MODES.MASK) {
        materialParams.alphaTest = materialDef.alphaCutoff !== undefined ? materialDef.alphaCutoff : 0.5;
      }
    }

    if (materialDef.normalTexture !== undefined && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, 'normalMap', materialDef.normalTexture)); // https://github.com/mrdoob/three.js/issues/11438#issuecomment-507003995

      materialParams.normalScale = new Vector2(1, -1);

      if (materialDef.normalTexture.scale !== undefined) {
        materialParams.normalScale.set(materialDef.normalTexture.scale, -materialDef.normalTexture.scale);
      }
    }

    if (materialDef.occlusionTexture !== undefined && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, 'aoMap', materialDef.occlusionTexture));

      if (materialDef.occlusionTexture.strength !== undefined) {
        materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;
      }
    }

    if (materialDef.emissiveFactor !== undefined && materialType !== MeshBasicMaterial) {
      materialParams.emissive = new Color().fromArray(materialDef.emissiveFactor);
    }

    if (materialDef.emissiveTexture !== undefined && materialType !== MeshBasicMaterial) {
      pending.push(parser.assignTexture(materialParams, 'emissiveMap', materialDef.emissiveTexture));
    }

    return Promise.all(pending).then(function () {
      var material;

      if (materialType === GLTFMeshStandardSGMaterial) {
        material = extensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(materialParams);
      } else {
        material = new materialType(materialParams);
      }

      if (materialDef.name) material.name = materialDef.name; // baseColorTexture, emissiveTexture, and specularGlossinessTexture use sRGB encoding.

      if (material.map) material.map.encoding = sRGBEncoding;
      if (material.emissiveMap) material.emissiveMap.encoding = sRGBEncoding;
      assignExtrasToUserData(material, materialDef);
      parser.associations.set(material, {
        type: 'materials',
        index: materialIndex
      });
      if (materialDef.extensions) addUnknownExtensionsToUserData(extensions, material, materialDef);
      return material;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  ;

  _proto14.createUniqueName = function createUniqueName(originalName) {
    var sanitizedName = PropertyBinding.sanitizeNodeName(originalName || '');
    var name = sanitizedName;

    for (var i = 1; this.nodeNamesUsed[name]; ++i) {
      name = sanitizedName + '_' + i;
    }

    this.nodeNamesUsed[name] = true;
    return name;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  ;

  _proto14.loadGeometries = function loadGeometries(primitives) {
    var parser = this;
    var extensions = this.extensions;
    var cache = this.primitiveCache;

    function createDracoPrimitive(primitive) {
      return extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(primitive, parser).then(function (geometry) {
        return addPrimitiveAttributes(geometry, primitive, parser);
      });
    }

    var pending = [];

    for (var i = 0, il = primitives.length; i < il; i++) {
      var primitive = primitives[i];
      var cacheKey = createPrimitiveKey(primitive); // See if we've already created this geometry

      var cached = cache[cacheKey];

      if (cached) {
        // Use the cached geometry if it exists
        pending.push(cached.promise);
      } else {
        var geometryPromise = void 0;

        if (primitive.extensions && primitive.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]) {
          // Use DRACO geometry if available
          geometryPromise = createDracoPrimitive(primitive);
        } else {
          // Otherwise create a new geometry
          geometryPromise = addPrimitiveAttributes(new BufferGeometry(), primitive, parser);
        } // Cache this geometry


        cache[cacheKey] = {
          primitive: primitive,
          promise: geometryPromise
        };
        pending.push(geometryPromise);
      }
    }

    return Promise.all(pending);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  ;

  _proto14.loadMesh = function loadMesh(meshIndex) {
    var parser = this;
    var json = this.json;
    var extensions = this.extensions;
    var meshDef = json.meshes[meshIndex];
    var primitives = meshDef.primitives;
    var pending = [];

    for (var i = 0, il = primitives.length; i < il; i++) {
      var material = primitives[i].material === undefined ? createDefaultMaterial(this.cache) : this.getDependency('material', primitives[i].material);
      pending.push(material);
    }

    pending.push(parser.loadGeometries(primitives));
    return Promise.all(pending).then(function (results) {
      var materials = results.slice(0, results.length - 1);
      var geometries = results[results.length - 1];
      var meshes = [];

      for (var _i4 = 0, _il3 = geometries.length; _i4 < _il3; _i4++) {
        var geometry = geometries[_i4];
        var primitive = primitives[_i4]; // 1. create Mesh

        var mesh = void 0;
        var _material = materials[_i4];

        if (primitive.mode === WEBGL_CONSTANTS.TRIANGLES || primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP || primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN || primitive.mode === undefined) {
          // .isSkinnedMesh isn't in glTF spec. See ._markDefs()
          mesh = meshDef.isSkinnedMesh === true ? new SkinnedMesh(geometry, _material) : new Mesh(geometry, _material);

          if (mesh.isSkinnedMesh === true && !mesh.geometry.attributes.skinWeight.normalized) {
            // we normalize floating point skin weight array to fix malformed assets (see #15319)
            // it's important to skip this for non-float32 data since normalizeSkinWeights assumes non-normalized inputs
            mesh.normalizeSkinWeights();
          }

          if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP) {
            mesh.geometry = toTrianglesDrawMode(mesh.geometry, TriangleStripDrawMode);
          } else if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN) {
            mesh.geometry = toTrianglesDrawMode(mesh.geometry, TriangleFanDrawMode);
          }
        } else if (primitive.mode === WEBGL_CONSTANTS.LINES) {
          mesh = new LineSegments(geometry, _material);
        } else if (primitive.mode === WEBGL_CONSTANTS.LINE_STRIP) {
          mesh = new Line(geometry, _material);
        } else if (primitive.mode === WEBGL_CONSTANTS.LINE_LOOP) {
          mesh = new LineLoop(geometry, _material);
        } else if (primitive.mode === WEBGL_CONSTANTS.POINTS) {
          mesh = new Points(geometry, _material);
        } else {
          throw new Error('THREE.GLTFLoader: Primitive mode unsupported: ' + primitive.mode);
        }

        if (Object.keys(mesh.geometry.morphAttributes).length > 0) {
          updateMorphTargets(mesh, meshDef);
        }

        mesh.name = parser.createUniqueName(meshDef.name || 'mesh_' + meshIndex);
        assignExtrasToUserData(mesh, meshDef);
        if (primitive.extensions) addUnknownExtensionsToUserData(extensions, mesh, primitive);
        parser.assignFinalMaterial(mesh);
        meshes.push(mesh);
      }

      if (meshes.length === 1) {
        return meshes[0];
      }

      var group = new Group();

      for (var _i5 = 0, _il4 = meshes.length; _i5 < _il4; _i5++) {
        group.add(meshes[_i5]);
      }

      return group;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  ;

  _proto14.loadCamera = function loadCamera(cameraIndex) {
    var camera;
    var cameraDef = this.json.cameras[cameraIndex];
    var params = cameraDef[cameraDef.type];

    if (!params) {
      console.warn('THREE.GLTFLoader: Missing camera parameters.');
      return;
    }

    if (cameraDef.type === 'perspective') {
      camera = new PerspectiveCamera(MathUtils.radToDeg(params.yfov), params.aspectRatio || 1, params.znear || 1, params.zfar || 2e6);
    } else if (cameraDef.type === 'orthographic') {
      camera = new OrthographicCamera(-params.xmag, params.xmag, params.ymag, -params.ymag, params.znear, params.zfar);
    }

    if (cameraDef.name) camera.name = this.createUniqueName(cameraDef.name);
    assignExtrasToUserData(camera, cameraDef);
    return Promise.resolve(camera);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Object>}
   */
  ;

  _proto14.loadSkin = function loadSkin(skinIndex) {
    var skinDef = this.json.skins[skinIndex];
    var skinEntry = {
      joints: skinDef.joints
    };

    if (skinDef.inverseBindMatrices === undefined) {
      return Promise.resolve(skinEntry);
    }

    return this.getDependency('accessor', skinDef.inverseBindMatrices).then(function (accessor) {
      skinEntry.inverseBindMatrices = accessor;
      return skinEntry;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  ;

  _proto14.loadAnimation = function loadAnimation(animationIndex) {
    var json = this.json;
    var animationDef = json.animations[animationIndex];
    var pendingNodes = [];
    var pendingInputAccessors = [];
    var pendingOutputAccessors = [];
    var pendingSamplers = [];
    var pendingTargets = [];

    for (var i = 0, il = animationDef.channels.length; i < il; i++) {
      var channel = animationDef.channels[i];
      var sampler = animationDef.samplers[channel.sampler];
      var target = channel.target;
      var name = target.node !== undefined ? target.node : target.id; // NOTE: target.id is deprecated.

      var input = animationDef.parameters !== undefined ? animationDef.parameters[sampler.input] : sampler.input;
      var output = animationDef.parameters !== undefined ? animationDef.parameters[sampler.output] : sampler.output;
      pendingNodes.push(this.getDependency('node', name));
      pendingInputAccessors.push(this.getDependency('accessor', input));
      pendingOutputAccessors.push(this.getDependency('accessor', output));
      pendingSamplers.push(sampler);
      pendingTargets.push(target);
    }

    return Promise.all([Promise.all(pendingNodes), Promise.all(pendingInputAccessors), Promise.all(pendingOutputAccessors), Promise.all(pendingSamplers), Promise.all(pendingTargets)]).then(function (dependencies) {
      var nodes = dependencies[0];
      var inputAccessors = dependencies[1];
      var outputAccessors = dependencies[2];
      var samplers = dependencies[3];
      var targets = dependencies[4];
      var tracks = [];

      var _loop = function _loop(_i6, _il5) {
        var node = nodes[_i6];
        var inputAccessor = inputAccessors[_i6];
        var outputAccessor = outputAccessors[_i6];
        var sampler = samplers[_i6];
        var target = targets[_i6];
        if (node === undefined) return "continue";
        node.updateMatrix();
        node.matrixAutoUpdate = true;
        var TypedKeyframeTrack = void 0;

        switch (PATH_PROPERTIES[target.path]) {
          case PATH_PROPERTIES.weights:
            TypedKeyframeTrack = NumberKeyframeTrack;
            break;

          case PATH_PROPERTIES.rotation:
            TypedKeyframeTrack = QuaternionKeyframeTrack;
            break;

          case PATH_PROPERTIES.position:
          case PATH_PROPERTIES.scale:
          default:
            TypedKeyframeTrack = VectorKeyframeTrack;
            break;
        }

        var targetName = node.name ? node.name : node.uuid;
        var interpolation = sampler.interpolation !== undefined ? INTERPOLATION[sampler.interpolation] : InterpolateLinear;
        var targetNames = [];

        if (PATH_PROPERTIES[target.path] === PATH_PROPERTIES.weights) {
          // Node may be a Group (glTF mesh with several primitives) or a Mesh.
          node.traverse(function (object) {
            if (object.isMesh === true && object.morphTargetInfluences) {
              targetNames.push(object.name ? object.name : object.uuid);
            }
          });
        } else {
          targetNames.push(targetName);
        }

        var outputArray = outputAccessor.array;

        if (outputAccessor.normalized) {
          var scale = getNormalizedComponentScale(outputArray.constructor);
          var scaled = new Float32Array(outputArray.length);

          for (var j = 0, jl = outputArray.length; j < jl; j++) {
            scaled[j] = outputArray[j] * scale;
          }

          outputArray = scaled;
        }

        for (var _j = 0, _jl = targetNames.length; _j < _jl; _j++) {
          var track = new TypedKeyframeTrack(targetNames[_j] + '.' + PATH_PROPERTIES[target.path], inputAccessor.array, outputArray, interpolation); // Override interpolation with custom factory method.

          if (sampler.interpolation === 'CUBICSPLINE') {
            track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline(result) {
              // A CUBICSPLINE keyframe in glTF has three output values for each input value,
              // representing inTangent, splineVertex, and outTangent. As a result, track.getValueSize()
              // must be divided by three to get the interpolant's sampleSize argument.
              return new GLTFCubicSplineInterpolant(this.times, this.values, this.getValueSize() / 3, result);
            }; // Mark as CUBICSPLINE. `track.getInterpolation()` doesn't support custom interpolants.


            track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;
          }

          tracks.push(track);
        }
      };

      for (var _i6 = 0, _il5 = nodes.length; _i6 < _il5; _i6++) {
        var _ret = _loop(_i6);

        if (_ret === "continue") continue;
      }

      var name = animationDef.name ? animationDef.name : 'animation_' + animationIndex;
      return new AnimationClip(name, undefined, tracks);
    });
  };

  _proto14.createNodeMesh = function createNodeMesh(nodeIndex) {
    var json = this.json;
    var parser = this;
    var nodeDef = json.nodes[nodeIndex];
    if (nodeDef.mesh === undefined) return null;
    return parser.getDependency('mesh', nodeDef.mesh).then(function (mesh) {
      var node = parser._getNodeRef(parser.meshCache, nodeDef.mesh, mesh); // if weights are provided on the node, override weights on the mesh.


      if (nodeDef.weights !== undefined) {
        node.traverse(function (o) {
          if (!o.isMesh) return;

          for (var i = 0, il = nodeDef.weights.length; i < il; i++) {
            o.morphTargetInfluences[i] = nodeDef.weights[i];
          }
        });
      }

      return node;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  ;

  _proto14.loadNode = function loadNode(nodeIndex) {
    var json = this.json;
    var extensions = this.extensions;
    var parser = this;
    var nodeDef = json.nodes[nodeIndex]; // reserve node's name before its dependencies, so the root has the intended name.

    var nodeName = nodeDef.name ? parser.createUniqueName(nodeDef.name) : '';
    return function () {
      var pending = [];

      var meshPromise = parser._invokeOne(function (ext) {
        return ext.createNodeMesh && ext.createNodeMesh(nodeIndex);
      });

      if (meshPromise) {
        pending.push(meshPromise);
      }

      if (nodeDef.camera !== undefined) {
        pending.push(parser.getDependency('camera', nodeDef.camera).then(function (camera) {
          return parser._getNodeRef(parser.cameraCache, nodeDef.camera, camera);
        }));
      }

      parser._invokeAll(function (ext) {
        return ext.createNodeAttachment && ext.createNodeAttachment(nodeIndex);
      }).forEach(function (promise) {
        pending.push(promise);
      });

      return Promise.all(pending);
    }().then(function (objects) {
      var node; // .isBone isn't in glTF spec. See ._markDefs

      if (nodeDef.isBone === true) {
        node = new Bone();
      } else if (objects.length > 1) {
        node = new Group();
      } else if (objects.length === 1) {
        node = objects[0];
      } else {
        node = new Object3D();
      }

      if (node !== objects[0]) {
        for (var i = 0, il = objects.length; i < il; i++) {
          node.add(objects[i]);
        }
      }

      if (nodeDef.name) {
        node.userData.name = nodeDef.name;
        node.name = nodeName;
      }

      assignExtrasToUserData(node, nodeDef);
      if (nodeDef.extensions) addUnknownExtensionsToUserData(extensions, node, nodeDef);

      if (nodeDef.matrix !== undefined) {
        var matrix = new Matrix4();
        matrix.fromArray(nodeDef.matrix);
        node.applyMatrix4(matrix);
      } else {
        if (nodeDef.translation !== undefined) {
          node.position.fromArray(nodeDef.translation);
        }

        if (nodeDef.rotation !== undefined) {
          node.quaternion.fromArray(nodeDef.rotation);
        }

        if (nodeDef.scale !== undefined) {
          node.scale.fromArray(nodeDef.scale);
        }
      }

      parser.associations.set(node, {
        type: 'nodes',
        index: nodeIndex
      });
      return node;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  ;

  _proto14.loadScene = function loadScene(sceneIndex) {
    var json = this.json;
    var extensions = this.extensions;
    var sceneDef = this.json.scenes[sceneIndex];
    var parser = this; // Loader returns Group, not Scene.
    // See: https://github.com/mrdoob/three.js/issues/18342#issuecomment-578981172

    var scene = new Group();
    if (sceneDef.name) scene.name = parser.createUniqueName(sceneDef.name);
    assignExtrasToUserData(scene, sceneDef);
    if (sceneDef.extensions) addUnknownExtensionsToUserData(extensions, scene, sceneDef);
    var nodeIds = sceneDef.nodes || [];
    var pending = [];

    for (var i = 0, il = nodeIds.length; i < il; i++) {
      pending.push(buildNodeHierachy(nodeIds[i], scene, json, parser));
    }

    return Promise.all(pending).then(function () {
      return scene;
    });
  };

  return GLTFParser;
}();

function buildNodeHierachy(nodeId, parentObject, json, parser) {
  var nodeDef = json.nodes[nodeId];
  return parser.getDependency('node', nodeId).then(function (node) {
    if (nodeDef.skin === undefined) return node; // build skeleton here as well

    var skinEntry;
    return parser.getDependency('skin', nodeDef.skin).then(function (skin) {
      skinEntry = skin;
      var pendingJoints = [];

      for (var i = 0, il = skinEntry.joints.length; i < il; i++) {
        pendingJoints.push(parser.getDependency('node', skinEntry.joints[i]));
      }

      return Promise.all(pendingJoints);
    }).then(function (jointNodes) {
      node.traverse(function (mesh) {
        if (!mesh.isMesh) return;
        var bones = [];
        var boneInverses = [];

        for (var j = 0, jl = jointNodes.length; j < jl; j++) {
          var jointNode = jointNodes[j];

          if (jointNode) {
            bones.push(jointNode);
            var mat = new Matrix4();

            if (skinEntry.inverseBindMatrices !== undefined) {
              mat.fromArray(skinEntry.inverseBindMatrices.array, j * 16);
            }

            boneInverses.push(mat);
          } else {
            console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', skinEntry.joints[j]);
          }
        }

        mesh.bind(new Skeleton(bones, boneInverses), mesh.matrixWorld);
      });
      return node;
    });
  }).then(function (node) {
    // build node hierachy
    parentObject.add(node);
    var pending = [];

    if (nodeDef.children) {
      var children = nodeDef.children;

      for (var i = 0, il = children.length; i < il; i++) {
        var child = children[i];
        pending.push(buildNodeHierachy(child, node, json, parser));
      }
    }

    return Promise.all(pending);
  });
}
/**
 * @param {BufferGeometry} geometry
 * @param {GLTF.Primitive} primitiveDef
 * @param {GLTFParser} parser
 */


function computeBounds(geometry, primitiveDef, parser) {
  var attributes = primitiveDef.attributes;
  var box = new Box3();

  if (attributes.POSITION !== undefined) {
    var accessor = parser.json.accessors[attributes.POSITION];
    var min = accessor.min;
    var max = accessor.max; // glTF requires 'min' and 'max', but VRM (which extends glTF) currently ignores that requirement.

    if (min !== undefined && max !== undefined) {
      box.set(new Vector3(min[0], min[1], min[2]), new Vector3(max[0], max[1], max[2]));

      if (accessor.normalized) {
        var boxScale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[accessor.componentType]);
        box.min.multiplyScalar(boxScale);
        box.max.multiplyScalar(boxScale);
      }
    } else {
      console.warn('THREE.GLTFLoader: Missing min/max properties for accessor POSITION.');
      return;
    }
  } else {
    return;
  }

  var targets = primitiveDef.targets;

  if (targets !== undefined) {
    var maxDisplacement = new Vector3();
    var vector = new Vector3();

    for (var i = 0, il = targets.length; i < il; i++) {
      var target = targets[i];

      if (target.POSITION !== undefined) {
        var _accessor = parser.json.accessors[target.POSITION];
        var _min = _accessor.min;
        var _max = _accessor.max; // glTF requires 'min' and 'max', but VRM (which extends glTF) currently ignores that requirement.

        if (_min !== undefined && _max !== undefined) {
          // we need to get max of absolute components because target weight is [-1,1]
          vector.setX(Math.max(Math.abs(_min[0]), Math.abs(_max[0])));
          vector.setY(Math.max(Math.abs(_min[1]), Math.abs(_max[1])));
          vector.setZ(Math.max(Math.abs(_min[2]), Math.abs(_max[2])));

          if (_accessor.normalized) {
            var _boxScale = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[_accessor.componentType]);

            vector.multiplyScalar(_boxScale);
          } // Note: this assumes that the sum of all weights is at most 1. This isn't quite correct - it's more conservative
          // to assume that each target can have a max weight of 1. However, for some use cases - notably, when morph targets
          // are used to implement key-frame animations and as such only two are active at a time - this results in very large
          // boxes. So for now we make a box that's sometimes a touch too small but is hopefully mostly of reasonable size.


          maxDisplacement.max(vector);
        } else {
          console.warn('THREE.GLTFLoader: Missing min/max properties for accessor POSITION.');
        }
      }
    } // As per comment above this box isn't conservative, but has a reasonable size for a very large number of morph targets.


    box.expandByVector(maxDisplacement);
  }

  geometry.boundingBox = box;
  var sphere = new Sphere();
  box.getCenter(sphere.center);
  sphere.radius = box.min.distanceTo(box.max) / 2;
  geometry.boundingSphere = sphere;
}
/**
 * @param {BufferGeometry} geometry
 * @param {GLTF.Primitive} primitiveDef
 * @param {GLTFParser} parser
 * @return {Promise<BufferGeometry>}
 */


function addPrimitiveAttributes(geometry, primitiveDef, parser) {
  var attributes = primitiveDef.attributes;
  var pending = [];

  function assignAttributeAccessor(accessorIndex, attributeName) {
    return parser.getDependency('accessor', accessorIndex).then(function (accessor) {
      geometry.setAttribute(attributeName, accessor);
    });
  }

  for (var gltfAttributeName in attributes) {
    var threeAttributeName = ATTRIBUTES[gltfAttributeName] || gltfAttributeName.toLowerCase(); // Skip attributes already provided by e.g. Draco extension.

    if (threeAttributeName in geometry.attributes) continue;
    pending.push(assignAttributeAccessor(attributes[gltfAttributeName], threeAttributeName));
  }

  if (primitiveDef.indices !== undefined && !geometry.index) {
    var accessor = parser.getDependency('accessor', primitiveDef.indices).then(function (accessor) {
      geometry.setIndex(accessor);
    });
    pending.push(accessor);
  }

  assignExtrasToUserData(geometry, primitiveDef);
  computeBounds(geometry, primitiveDef, parser);
  return Promise.all(pending).then(function () {
    return primitiveDef.targets !== undefined ? addMorphTargets(geometry, primitiveDef.targets, parser) : geometry;
  });
}
/**
 * @param {BufferGeometry} geometry
 * @param {Number} drawMode
 * @return {BufferGeometry}
 */


function toTrianglesDrawMode(geometry, drawMode) {
  var index = geometry.getIndex(); // generate index if not present

  if (index === null) {
    var indices = [];
    var position = geometry.getAttribute('position');

    if (position !== undefined) {
      for (var i = 0; i < position.count; i++) {
        indices.push(i);
      }

      geometry.setIndex(indices);
      index = geometry.getIndex();
    } else {
      console.error('THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.');
      return geometry;
    }
  } //


  var numberOfTriangles = index.count - 2;
  var newIndices = [];

  if (drawMode === TriangleFanDrawMode) {
    // gl.TRIANGLE_FAN
    for (var _i7 = 1; _i7 <= numberOfTriangles; _i7++) {
      newIndices.push(index.getX(0));
      newIndices.push(index.getX(_i7));
      newIndices.push(index.getX(_i7 + 1));
    }
  } else {
    // gl.TRIANGLE_STRIP
    for (var _i8 = 0; _i8 < numberOfTriangles; _i8++) {
      if (_i8 % 2 === 0) {
        newIndices.push(index.getX(_i8));
        newIndices.push(index.getX(_i8 + 1));
        newIndices.push(index.getX(_i8 + 2));
      } else {
        newIndices.push(index.getX(_i8 + 2));
        newIndices.push(index.getX(_i8 + 1));
        newIndices.push(index.getX(_i8));
      }
    }
  }

  if (newIndices.length / 3 !== numberOfTriangles) {
    console.error('THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.');
  } // build final geometry


  var newGeometry = geometry.clone();
  newGeometry.setIndex(newIndices);
  return newGeometry;
}/**
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
/** @constant {Object} */

var defaultComponentValues = {
  xAxis: 0,
  yAxis: 0,
  button: 0,
  state: Constants.ComponentState.DEFAULT
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
/**
 * @description Converts an X, Y coordinate from the range -1 to 1 (as reported by the Gamepad
 * API) to the range 0 to 1 (for interpolation). Also caps the X, Y values to be bounded within
 * a circle. This ensures that thumbsticks are not animated outside the bounds of their physical
 * range of motion and touchpads do not report touch locations off their physical bounds.
 * @param {number} x The original x coordinate in the range -1 to 1
 * @param {number} y The original y coordinate in the range -1 to 1
 */

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
}();var DEFAULT_PROFILES_PATH = 'https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles';
var DEFAULT_PROFILE = 'generic-trigger';

var XRControllerModel = /*#__PURE__*/function (_THREE$Object3D) {
  _inheritsLoose(XRControllerModel, _THREE$Object3D);

  function XRControllerModel() {
    var _this;

    _this = _THREE$Object3D.call(this) || this;
    _this.motionController = null;
    _this.envMap = null;
    return _this;
  }

  var _proto = XRControllerModel.prototype;

  _proto.setEnvironmentMap = function setEnvironmentMap(envMap) {
    var _this2 = this;

    if (this.envMap == envMap) {
      return this;
    }

    this.envMap = envMap;
    this.traverse(function (child) {
      if (child.isMesh) {
        child.material.envMap = _this2.envMap;
        child.material.needsUpdate = true;
      }
    });
    return this;
  }
  /**
   * Polls data from the XRInputSource and updates the model's components to match
   * the real world data
   */
  ;

  _proto.updateMatrixWorld = function updateMatrixWorld(force) {
    _THREE$Object3D.prototype.updateMatrixWorld.call(this, force);

    if (!this.motionController) {
      return;
    } // Cause the MotionController to poll the Gamepad for data


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

        if (!valueNode) {
          return;
        } // Calculate the new properties based on the weight supplied


        if (valueNodeProperty === Constants.VisualResponseProperty.VISIBILITY) {
          valueNode.visible = value;
        } else if (valueNodeProperty === Constants.VisualResponseProperty.TRANSFORM) {
          valueNode.quaternion.slerpQuaternions(minNode.quaternion, maxNode.quaternion, value);
          valueNode.position.lerpVectors(minNode.position, maxNode.position, value);
        }
      });
    });
  };

  return XRControllerModel;
}(THREE.Object3D);
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
        var sphereGeometry = new THREE.SphereGeometry(0.001);
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

var XRControllerModelFactory = /*#__PURE__*/function () {
  function XRControllerModelFactory(gltfLoader) {
    if (gltfLoader === void 0) {
      gltfLoader = null;
    }

    this.gltfLoader = gltfLoader;
    this.path = DEFAULT_PROFILES_PATH;
    this._assetCache = {}; // If a GLTFLoader wasn't supplied to the constructor create a new one.

    if (!this.gltfLoader) {
      this.gltfLoader = new GLTFLoader();
    }
  }

  var _proto2 = XRControllerModelFactory.prototype;

  _proto2.createControllerModel = function createControllerModel(controller) {
    var _this3 = this;

    var controllerModel = new XRControllerModel();
    var scene = null;
    controller.addEventListener('connected', function (event) {
      var xrInputSource = event.data;

      if (xrInputSource.targetRayMode !== 'tracked-pointer' || !xrInputSource.gamepad) {
        return;
      }

      fetchProfile(xrInputSource, _this3.path, DEFAULT_PROFILE).then(function (_ref) {
        var profile = _ref.profile,
            assetPath = _ref.assetPath;
        controllerModel.motionController = new MotionController(xrInputSource, profile, assetPath);
        var cachedAsset = _this3._assetCache[controllerModel.motionController.assetUrl];

        if (cachedAsset) {
          scene = cachedAsset.scene.clone();
          addAssetSceneToControllerModel(controllerModel, scene);
        } else {
          if (!_this3.gltfLoader) {
            throw new Error('GLTFLoader not set.');
          }

          _this3.gltfLoader.setPath('');

          _this3.gltfLoader.load(controllerModel.motionController.assetUrl, function (asset) {
            _this3._assetCache[controllerModel.motionController.assetUrl] = asset;
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
  };

  return XRControllerModelFactory;
}();var ZERO = new THREE.Vector3();
var DOWN = new THREE.Vector3(0, -1, 0);
var CONTROL_INFO = {
  type: MessageType.ControlInfo,
  orientation: {
    latitude: 0,
    longitude: 0
  },
  zoom: 1,
  cameraGroup: {
    position: [0, 0, 0],
    rotation: [0, 0, 0]
  },
  pointer: [0, 0, 0]
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
    Host.host = this;
    this.defaultTexture = Texture.gridTexture;
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
  }
  /*
  onChanges() {
  	if (this.view) {
  		const selected = this.view.items.find(item => item.selected);
  		if (selected && selected.mesh) {
  			if (this.view.type.name !== 'model') {
  				this.orbitService.lookAt(selected.mesh);
  			}
  		}
  	}
  }
  */
  ;

  _proto.onDestroy = function onDestroy() {
    this.removeListeners();
    var renderer = this.renderer;
    renderer.setAnimationLoop(function () {});
  };

  _proto.createScene = function createScene() {
    var _this2 = this;

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
    var cameraRect = this.cameraRect = new Rect();
    var cameraGroup = this.cameraGroup = new THREE.Group(); // new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, ROOM_RADIUS * 2);
    // const camera = this.camera = new THREE.PerspectiveCamera(70, container.offsetWidth / container.offsetHeight, 0.01, 1000);

    var camera = this.camera = new THREE.PerspectiveCamera(70, container.offsetWidth / container.offsetHeight, 0.01, 1000);
    camera.target = new THREE.Vector3();
    cameraGroup.add(camera); // cameraGroup.target = new THREE.Vector3();

    var orbitService = this.orbitService = new OrbitService(camera);
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
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.NoToneMapping; // default
    // renderer.toneMapping = THREE.LinearToneMapping;
    // renderer.toneMapping = THREE.ReinhardToneMapping;
    // renderer.toneMapping = THREE.CineonToneMapping;
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;

    renderer.toneMappingExposure = 1;

    if (container.childElementCount > 0) {
      container.insertBefore(renderer.domElement, container.children[0]);
    } else {
      container.appendChild(renderer.domElement);
    }

    var raycaster = this.raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(this.mouse, camera);
    var scene = this.scene = new THREE.Scene();
    scene.add(cameraGroup); // this.addEnvironment();

    var objects = this.objects = new THREE.Group();
    objects.name = '[objects]';
    scene.add(objects);
    var panorama = this.panorama = new Panorama(renderer);
    this.panoramaIntersectObjects = [panorama.mesh];
    this.intersectObjects = this.panoramaIntersectObjects;
    objects.add(panorama.mesh);
    var indicator = this.indicator = new PointerElement();
    var pointer = this.pointer = new PointerElement('#ff4332');
    /*
    const mainLight = new THREE.PointLight(0xffffff);
    mainLight.position.set(-50, 0, -50);
    objects.add(mainLight);
    		const light2 = new THREE.DirectionalLight(0xffe699, 1.5);
    light2.position.set(40, -40, 40);
    light2.target.position.set(0, 0, 0);
    scene.add(light2);
    		const light3 = new THREE.DirectionalLight(0xffe699, 1);
    light3.position.set(0, 50, 0);
    light3.target.position.set(0, 0, 0);
    scene.add(light3);
    		const light = new THREE.AmbientLight(0x101010);
    */

    var ambient = this.ambient = new THREE.AmbientLight(0xffffff, 1);
    objects.add(ambient);
    var direct = this.direct = new THREE.DirectionalLight(0xffffff, 1);
    direct.position.set(-40, -40, -40);
    direct.target.position.set(0, 0, 0);
    objects.add(direct);
    this.addControllers();
    this.resize(); // show hide items

    LoaderService.progress$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (progress) {
      var complete = progress.count === 0;
      var view = _this2.view_; // this.panorama.mesh.visible = complete;

      if (view.items) {
        view.items.forEach(function (item) {
          item.visible = complete;
        });
      } // console.log(view, complete, progress);

    }); // console.log('WorldComponent.createScene', this);
  };

  _proto.addEnvironment = function addEnvironment() {
    var _this3 = this;

    var segments = environment.textures.envMap.split('/');
    var filename = segments.pop();
    var folder = segments.join('/') + '/';
    var loader = filename.indexOf('.hdr') !== -1 ? new RGBELoader().setDataType(THREE.UnsignedByteType) : new THREE.TextureLoader();
    loader.setPath(environment.getPath(folder)).load(filename, function (texture) {
      _this3.setBackground(texture);
    });
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

  _proto.setBackground = function setBackground(texture) {
    var background = texture || this.defaultTexture;
    background.mapping = THREE.EquirectangularReflectionMapping; // background.encoding = THREE.LinearEncoding;

    background.encoding = THREE.sRGBEncoding; // background.encoding = THREE.GammaEncoding;
    // background.encoding = THREE.RGBEEncoding;
    // background.encoding = THREE.LogLuvEncoding;
    // background.encoding = THREE.RGBM7Encoding;
    // background.encoding = THREE.RGBM16Encoding;
    // background.encoding = THREE.RGBDEncoding;
    // background.encoding = THREE.BasicDepthPacking;
    // background.encoding = THREE.RGBADepthPacking;
    // this.scene.background = background;

    this.scene.environment = background;
  };

  _proto.setView = function setView() {
    var _this4 = this;

    if (!this.panorama) {
      return;
    }

    var view = this.view_;

    if (view) {
      if (this.views) {
        this.views.forEach(function (view) {
          return delete view.onUpdateAsset;
        });
      }

      var message = this.requestInfoResult;

      if (message) {
        if (view instanceof PanoramaGridView && message.gridIndex !== undefined) {
          view.index_ = message.gridIndex;
        }
      }

      view.ready = false;
      this.cameraGroup.position.set(0, 0, 0);
      this.cameraGroup.rotation.set(0, 0, 0);

      if (view.type.name === ViewType.Room3d.name) {
        this.renderer.setClearColor(0x000000, 1);
        this.objects.remove(this.panorama.mesh);
      } else {
        this.renderer.setClearColor(0x000000, 1);
        this.objects.add(this.panorama.mesh);
      } // this.loading = LOADING_BANNER;
      // this.waiting = null;


      this.pushChanges();
      PrefetchService.cancel();
      this.panorama.change(view, this.renderer, function (texture) {
        // console.log('panorama.change', texture);
        _this4.setBackground(texture);

        view.ready = true;

        view.onUpdateAsset = function () {
          _this4.onViewAssetDidChange();
        }; // this.waiting = (view && view.type.name === 'waiting-room') ? WAITING_BANNER : null;


        _this4.pushChanges();
      }, function (view) {
        _this4.setViewOrientation(view);

        PrefetchService.prefetch(view.prefetchAssets); // this.loading = null;
        // this.pushChanges();
      });
    }
  };

  _proto.onViewAssetDidChange = function onViewAssetDidChange() {
    var _this5 = this;

    if (this.panorama) {
      this.panorama.crossfade(this.view, this.renderer, function (texture) {
        _this5.setBackground(texture);
      });
    }
  };

  _proto.setViewOrientation = function setViewOrientation(view) {
    var message = this.requestInfoResult;
    this.requestInfoResult = null;

    if (this.orbitService) {
      this.orbitService.mode = view.type.name;

      if (!this.renderer.xr.isPresenting) {
        if (message) {
          this.orbitService.setOrientation(message.orientation);
          this.orbitService.zoom = message.zoom;
          this.camera.updateProjectionMatrix();
        } else if (!view.keepOrientation) {
          this.orbitService.setOrientation(view.orientation);
          this.orbitService.zoom = view.zoom;
          this.camera.updateProjectionMatrix();
        }
      }
    }
  };

  _proto.addControllers = function addControllers() {
    var controllerGroup = this.controllerGroup = new THREE.Group();
    var teleport = this.teleport = new TeleportElement();
    this.controllers = [];
    this.controllerModelFactory = new XRControllerModelFactory();
    this.addController(0);
    this.addController(1);
    this.cameraGroup.add(controllerGroup);
  };

  _proto.addController = function addController(index) {
    var _this6 = this;

    var showPhone =  StateService.state.live;
    var renderer = this.renderer;
    var controllerGroup = this.controllerGroup;
    var controller = renderer.xr.getController(index);
    var controllerModelFactory = this.controllerModelFactory;
    var teleport = this.teleport;
    var scene = this.scene;
    var camera = this.camera;
    var cameraGroup = this.cameraGroup;
    controller.name = "[controller" + (index + 1) + "]";
    controllerGroup.add(controller);

    var setController = function setController(controller) {
      // console.log('setController', this);
      _this6.controller = controller;
    };

    var onSelectStart = function onSelectStart(event) {
      controller.userData.isSelecting = true;
      setController(controller);
    };

    var onSelectEnd = function onSelectEnd(event) {
      controller.userData.isSelecting = false;
    };

    var onSqueezeStart = function onSqueezeStart(event) {
      if (_this6.view && _this6.view.type.name === ViewType.Room3d.name) {
        teleport.addToController(controller, scene); // this.scene.remove(this.indicator.mesh);

        _this6.indicator.mesh.visible = false;
        controller.children[0].visible = false;
      }
    };

    var onSqueezeEnd = function onSqueezeEnd(event) {
      // if (this.view && this.view.type.name === ViewType.Room3d.name) {
      teleport.removeFromController(controller, scene, renderer, camera, cameraGroup); // this.scene.add(this.indicator.mesh);

      _this6.indicator.mesh.visible = true;
      controller.children[0].visible = true; // }
    }; // const debugService = DebugService.getService();
    // debugService.setMessage('DebugService 1001');


    var onPress = function onPress(event) {
      // console.log('Gamepad.onPress', event, controller);
      // debugService.setMessage('Gamepad.onPress ' + event.index);
      // 0: select
      // 1: squeeze
      // 4: x / a
      // 5: y / b
      switch (event.index) {
        case 0:
          // select
          break;

        case 1:
          // squeeze
          break;

        case 4:
          // x / a
          MessageService.send({
            type: MessageType.MenuToggle
          });
          break;
      }
    };

    var onRelease = function onRelease(event) {
      _this6.onModelUp();
    };

    var onLeft = function onLeft(event) {
      // console.log('Gamepad.onLeft', event, controller);
      // debugService.setMessage('Gamepad.onLeft');
      _this6.cameraGroup.rotation.y += Math.PI / 180 * 45;
    };

    var onRight = function onRight(event) {
      // console.log('Gamepad.onRight', event, controller);
      // debugService.setMessage('Gamepad.onRight');
      _this6.cameraGroup.rotation.y -= Math.PI / 180 * 45;
    };
    /*
    const onAxis = (event) => {
    	// console.log('Gamepad.onAxis', event, controller);
    	// debugService.setMessage('Gamepad.onAxis');
    	this.cameraGroup.rotation.y += (Math.PI / 180 * event.x);
    };
    */


    var onAxis = function onAxis(event) {
      // console.log('Gamepad.onAxis', event, controller);
      // debugService.setMessage('Gamepad.onAxis');
      _this6.onModelDistance(event.y);
    };
    /*
    const onUp = (event) => {
    	// console.log('Gamepad.onUp', event, controller);
    	// debugService.setMessage('Gamepad.onUp');
    	this.cameraGroup.position.y += 1;
    };
    const onDown = (event) => {
    	// console.log('Gamepad.onDown', event, controller);
    	// debugService.setMessage('Gamepad.onDown');
    	this.cameraGroup.position.y -= 1;
    };
    */

    /*
    const onUp = (event) => {
    	this.onModelDistance(1);
    };
    const onDown = (event) => {
    	this.onModelDistance(-1);
    };
    */


    var onConnected = function onConnected(event) {
      controller.add(_this6.buildController(event.data));

      if (showPhone && event.data.handedness === 'left') {
        var phone = _this6.phone = new PhoneElement();
        controller.add(phone.mesh);
      }

      if (!showPhone || event.data.handedness === 'right') {
        var controllerGrip = renderer.xr.getControllerGrip(index);
        controllerGrip.name = "[controller-grip" + (index + 1) + "]";
        var controllerModel = controllerModelFactory.createControllerModel(controllerGrip);
        controller.userData.model = controllerModel;
        controllerGrip.add(controllerModel);
        controllerGroup.add(controllerGrip);
      }

      var gamepad = new Gamepad(event.data.gamepad);
      gamepad.on('press', onPress);
      gamepad.on('release', onRelease);
      gamepad.on('left', onLeft);
      gamepad.on('right', onRight);
      gamepad.on('axis', onAxis); // gamepad.on('up', onUp);
      // gamepad.on('down', onDown);

      controller.userData.gamepad = gamepad;

      controller.userData.update = function () {
        gamepad.update();
      };
    };

    var onDisconnected = function onDisconnected(event) {
      while (controller.children.length) {
        controller.remove(controller.children[0]);
      }

      var controllerGrip = renderer.xr.getControllerGrip(index);

      while (controllerGrip.children.length) {
        controllerGrip.remove(controllerGrip.children[0]);
      }

      controllerGroup.remove(controllerGrip);

      controller.userData.update = function () {};

      var gamepad = controller.userData.gamepad;

      if (gamepad) {
        gamepad.off('press', onPress);
        gamepad.off('release', onRelease);
        gamepad.off('left', onLeft);
        gamepad.off('right', onRight);
        gamepad.off('axis', onAxis); // gamepad.off('up', onUp);
        // gamepad.off('down', onDown);

        delete controller.userData.gamepad;
      }

      teleport.removeFromController(controller, scene, renderer, camera, cameraGroup);
    };

    controller.userData.update = function () {};

    controller.addEventListener('selectstart', onSelectStart);
    controller.addEventListener('selectend', onSelectEnd);
    controller.addEventListener('connected', onConnected);
    controller.addEventListener('disconnected', onDisconnected);
    controller.addEventListener('squeezestart', onSqueezeStart);
    controller.addEventListener('squeezeend', onSqueezeEnd);
    var controllers = this.controllers;
    controllers.push(controller);
  };

  _proto.buildController = function buildController(data) {
    // console.log('buildController', data);
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

  _proto.onModelDown = function onModelDown(event) {
    // vr controller model grab
    var controller = this.controller;

    if (controller && this.renderer.xr.isPresenting) {
      var target = this.tempTarget = event.mesh; // console.log('WorldComponent.onModelDown', target);
      // DebugService.getService().setMessage('onModelDown ', target.name);

      var parent = this.tempParent = target.parent;
      var position = new THREE.Vector3();
      target.localToWorld(position);
      controller.worldToLocal(position);
      controller.add(target);
      target.position.copy(position);
    }
  };

  _proto.onModelDistance = function onModelDistance(direction) {
    // vr controller model distance
    var controller = this.controller;
    var target = this.tempTarget;

    if (controller && target && this.renderer.xr.isPresenting) {
      var position = new THREE.Vector3();
      position = position.copy(target.position);
      var distance = Math.max(1, Math.min(8, position.distanceTo(ZERO) + 0.02 * direction));
      position.normalize();
      position = position.multiplyScalar(distance); // DebugService.getService().setMessage('onModelDistance ' + distance);

      target.position.copy(position);
    }
  };

  _proto.onModelUp = function onModelUp() {
    // vr controller model release
    var target = this.tempTarget;
    var parent = this.tempParent;

    if (target && parent) {
      // console.log('WorldComponent.onModelUp', target, parent);
      var position = new THREE.Vector3();
      target.localToWorld(position);
      parent.worldToLocal(position);
      parent.add(target);
      target.position.copy(position);
      this.tempTarget = null;
      this.tempParent = null;
    }
  };

  _proto.updateRaycasterXR = function updateRaycasterXR(controller, raycaster) {
    if (controller) {
      this.controllerMatrix_.identity().extractRotation(controller.matrixWorld);
      raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
      raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this.controllerMatrix_); // raycaster.camera = this.host.renderer.xr.getCamera(this.camera);

      return raycaster;
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
    try {
      var renderer = this.renderer,
          scene = this.scene,
          camera = this.camera,
          avatars = this.avatars;
      var isPresenting = renderer.xr.isPresenting;

      if (!isPresenting && StateService.state.mode === UIMode.LiveMeeting) {
        // !!! || (StateService.state.remoteScreen !== null)
        return;
      }

      if (isPresenting) {
        gsap.ticker.tick();
        this.controllers.forEach(function (controller) {
          return controller.userData.update();
        });
        this.teleport.update();
      } else {
        this.navWithKeys();
      }

      this.orbitService.render();
      var time = performance.now();
      var tick = this.tick_ ? ++this.tick_ : this.tick_ = 1;
      scene.traverse(function (child) {
        var render = child.userData.render;

        if (typeof render === 'function') {
          render(time, tick, renderer, scene, camera);
        }
      });
      Object.keys(avatars).forEach(function (key) {
        avatars[key].render();
      });
      this.vrService.updateState(this);
      this.raycasterXRHitTest();
      renderer.render(scene, camera);
    } catch (error) {
      this.error = error; // throw (error);
    }
  };

  _proto.navWithKeys = function navWithKeys() {
    if (this.view && this.view.type.name === ViewType.Room3d.name && this.view.mesh && !this.locked && !ModalService.hasModal) {
      this.intersectObjects = this.view.intersectObjects;
      var velocity = this.velocity || (this.velocity = new THREE.Vector3());
      var direction = this.direction || (this.direction = new THREE.Vector3());
      var camera = this.camera;
      var speed = 0.1;

      if (this.keys.w || this.keys.ArrowUp) {
        camera.getWorldDirection(direction);
        direction.multiplyScalar(speed);
        velocity.copy(direction);
      } else if (this.keys.s || this.keys.ArrowDown) {
        camera.getWorldDirection(direction);
        direction.multiplyScalar(-speed);
        velocity.copy(direction);
      } else if (this.keys.d || this.keys.ArrowRight) {
        camera.getWorldDirection(direction);
        direction.multiplyScalar(speed);
        var axisY = this.axisY || (this.direction = new THREE.Vector3(0, 1, 0));
        var angle = -Math.PI / 2;
        direction.applyAxisAngle(axisY, angle);
        velocity.copy(direction);
      } else if (this.keys.a || this.keys.ArrowLeft) {
        camera.getWorldDirection(direction);
        direction.multiplyScalar(-speed);

        var _axisY = this.axisY || (this.direction = new THREE.Vector3(0, 1, 0));

        var _angle = -Math.PI / 2;

        direction.applyAxisAngle(_axisY, _angle);
        velocity.copy(direction);
      }

      var manhattanLength = velocity.manhattanLength();

      if (manhattanLength > 0.00001) {
        // console.log(velocity.x, velocity.y, velocity.z);
        direction.copy(this.cameraGroup.position);
        direction.add(velocity);
        direction.y = 0;
        var raycaster = this.raycaster;
        raycaster.set(direction, DOWN);
        var intersects = raycaster.intersectObjects(this.view.navIntersectObjects);

        if (intersects.length) {
          // console.log(manhattanLength, intersects);
          this.cameraGroup.position.add(velocity);
          this.cameraGroup.position.y = 0;
          this.orbitService.markAsDirty(); // this.orbitService.events$.next(OrbitService.orbitMoveEvent);
          // camera.updateProjectionMatrix();
        }

        velocity.lerp(ZERO, 0.1);
      } else {
        velocity.set(0, 0, 0);
      }
    } else {
      this.intersectObjects = this.panoramaIntersectObjects;
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

  _proto.raycasterXRHitTest = function raycasterXRHitTest() {
    if (this.renderer.xr.isPresenting && !this.locked) {
      var raycaster = this.updateRaycasterXR(this.controller, this.raycaster);

      if (raycaster) {
        var hit = Interactive.hittest(raycaster, this.controller.userData.isSelecting);
        this.indicator.update(this.renderer.xr.getCamera(this.camera));
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
        var intersections = raycaster.intersectObjects(this.intersectObjects);

        if (intersections.length) {
          var intersection = intersections[0]; // this.panorama.mesh.intersection = intersection;

          var intersectionPoint = this.intersectionPoint || (this.intersectionPoint = new THREE.Vector3());
          var intersectionNormal = this.intersectionNormal || (this.intersectionNormal = new THREE.Vector3());
          var position = intersectionPoint.copy(intersection.point);
          var normal = intersectionNormal.copy(intersection.face.normal);
          this.dragItem.onDragMove(position, normal, this.intersectObjects === this.panoramaIntersectObjects);
        }
      }
    } else if (this.resizeItem) ; else {
      var hit = Interactive.hittest(raycaster);
      this.controlEvent$.next(CONTROL_INFO);
    }
  };

  _proto.onMouseDown = function onMouseDown(event) {
    try {
      if (this.locked) {
        return;
      }

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
          var intersections = raycaster.intersectObjects(this.intersectObjects);

          if (intersections.length) {
            var intersection = intersections[0];
            var intersectionPoint = this.intersectionPoint || (this.intersectionPoint = new THREE.Vector3());
            var intersectionNormal = this.intersectionNormal || (this.intersectionNormal = new THREE.Vector3());
            var position = intersectionPoint.copy(intersection.point);
            var normal = intersectionNormal.copy(intersection.face.normal);
            this.viewHit.next({
              position: position,
              normal: normal,
              spherical: this.intersectObjects === this.panoramaIntersectObjects
            });
          }
          /*
          if (this.panorama.mesh.intersection) {
          	const position = new THREE.Vector3().copy(this.panorama.mesh.intersection.point).normalize();
          	console.log(JSON.stringify({ position: position.toArray() }));
          	this.viewHit.next(position);
          }
          */

        }
      }
    } catch (error) {
      this.error = error; // throw (error);
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
      var raycaster = this.updateRaycasterMouse(event);
      var hit = Interactive.hittest(raycaster, false);
      this.checkSelectedItem();
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
      var orbitService = this.orbitService;
      gsap.to(orbitService, {
        duration: 0.5,
        zoom: orbitService.zoom + deltaY * 0.1,
        ease: Power4.easeOut,
        overwrite: true
      });
    } catch (error) {
      this.error = error; // throw (error);
    }
  };

  _proto.onOrientationDidChange = function onOrientationDidChange() {
    this.controlEvent$.next(CONTROL_INFO);
  };

  _proto.checkSelectedItem = function checkSelectedItem() {
    if (this.view) {
      var selected = this.view.items.find(function (item) {
        return item.selected;
      });

      if (selected && selected.mesh) {
        if (this.view.type.name !== 'model') {
          this.orbitService.lookAt(selected.mesh);
        }
      }
    }
  };

  _proto.onVRStarted = function onVRStarted() {
    // this.objects.rotation.y = - Math.PI / 2;
    this.objects.position.y = 1.3;
    this.scene.add(this.indicator.mesh);
    MessageService.send({
      type: MessageType.VRStarted
    });
  };

  _proto.onVREnded = function onVREnded() {
    // this.objects.rotation.y = 0;
    this.objects.position.y = 0;
    this.cameraGroup.rotation.y = 0;
    this.cameraGroup.position.y = 0;
    this.scene.remove(this.indicator.mesh);
    this.orbitService.markAsDirty();
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
    this.navTo.next({
      viewId: event.id
    });
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
      this.navTo.next(event.item);
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

  _proto.onZoomMedia = function onZoomMedia(event) {
    if (event.zoomed) {
      this.view.items.forEach(function (item) {
        if (item.mesh instanceof MediaMesh) {
          // console.log(item.id, event.itemId, item.id !== event.itemId);
          if (item.id !== event.itemId) {
            item.mesh.setZoomedState(false);
          }
        }
      });
    }

    this.view.items.forEach(function (item) {
      return item.showPanel = false;
    });
    StateService.patchState({
      zoomedId: event.zoomed ? event.itemId : null
    });
    MessageService.send({
      type: MessageType.ZoomMedia,
      itemId: event.itemId,
      zoomed: event.zoomed
    });
  };

  _proto.onCurrentTimeMedia = function onCurrentTimeMedia(event) {
    MessageService.send({
      type: MessageType.CurrentTimeMedia,
      itemId: event.itemId,
      currentTime: event.currentTime
    });
  };

  _proto.onPlayModel = function onPlayModel(event) {
    MessageService.send({
      type: MessageType.PlayModel,
      itemId: event.itemId,
      actionIndex: event.actionIndex
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
    var _this7 = this;

    // console.log('WorldComponent.onGridMove', event, this.view);
    this.view.items = []; // this.loading = LOADING_BANNER;

    this.pushChanges();
    this.orbitService.walk(event.position, function (headingLongitude, headingLatitude) {
      var tile = _this7.view.getTile(event.indices.x, event.indices.y);

      if (tile) {
        _this7.panorama.crossfade(tile, _this7.renderer, function (texture) {
          _this7.setBackground(texture);

          _this7.orbitService.walkComplete(headingLongitude, headingLatitude);

          _this7.view.updateCurrentItems(); // this.loading = null;


          _this7.pushChanges(); // this.render();
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
    var _this8 = this;

    return this.controlEvent$.pipe(operators.filter(function () {
      return _this8.controlling || _this8.spyed || _this8.editor;
    }), operators.auditTime(40), operators.tap(function (control) {
      control.orientation.latitude = _this8.orbitService.latitude;
      control.orientation.longitude = _this8.orbitService.longitude;
      control.zoom = _this8.orbitService.zoom;
      control.cameraGroup = {
        position: _this8.cameraGroup.position.toArray(),
        rotation: _this8.cameraGroup.rotation.toArray()
      };

      var intersections = _this8.raycaster.intersectObjects(_this8.intersectObjects);

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
    var _this9 = this;

    this.controlEvent$ = new rxjs.ReplaySubject(1);
    this.control$().pipe(operators.takeUntil(this.unsubscribe$)).subscribe();
    var vrService = this.vrService = VRService.getService();
    vrService.session$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (session) {
      _this9.renderer.xr.setSession(session);

      if (session) {
        _this9.onVRStarted();
      } else {
        _this9.onVREnded();
      }
    });
    vrService.state$.pipe(operators.takeUntil(this.unsubscribe$), operators.auditTime(Math.floor(1000 / 15))).subscribe(function (state) {
      _this9.onVRStateDidChange(state);
    });
    var orbit$ = this.orbitService.observe$(this.container).pipe(operators.shareReplay(1));
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
      _this9.onOrientationDidChange();
    });
    MessageService.out$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (message) {
      switch (message.type) {
        case MessageType.RequestInfo:
          message.type = MessageType.RequestInfoResult;
          message.viewId = _this9.view.id;
          message.orientation = _this9.orbitService.getOrientation();
          message.zoom = _this9.orbitService.zoom;
          message.cameraGroup = {
            position: _this9.cameraGroup.position.toArray(),
            rotation: _this9.cameraGroup.rotation.toArray()
          };

          if (_this9.view instanceof PanoramaGridView) {
            message.gridIndex = _this9.view.index;
          } // console.log('WorldComponent', 'MessageType.RequestInfo', 'from', message.clientId, 'to', StateService.state.uid, message.orientation);


          MessageService.sendBack(message);

          if (StateService.state.role !== RoleType.Publisher) {
            StateService.patchState({
              spying: message.remoteId
            }); // console.log('WorldComponent.MessageService.out$.RequestInfo', StateService.state.spying, message.remoteId);
          }

          break;

        case MessageType.RequestInfoResult:
          // console.log('WorldComponent', 'MessageType.RequestInfoResult', 'from', message.clientId, 'to', StateService.state.uid, message.orientation);
          if (ViewService.viewId !== message.viewId) {
            ViewService.viewId = message.viewId;
            _this9.requestInfoResult = message;
          } else {
            if (!_this9.renderer.xr.isPresenting) {
              _this9.orbitService.setOrientation(message.orientation);

              _this9.orbitService.zoom = message.zoom;

              _this9.cameraGroup.position.set(message.cameraGroup.position[0], message.cameraGroup.position[1], message.cameraGroup.position[2]);

              _this9.cameraGroup.rotation.set(message.cameraGroup.rotation[0], message.cameraGroup.rotation[1], message.cameraGroup.rotation[2]); // this.camera.updateProjectionMatrix();

            }

            if (_this9.view instanceof PanoramaGridView && message.gridIndex) {
              _this9.view.index = message.gridIndex;
            }

            if (!_this9.view || !_this9.view.ready) {
              _this9.requestInfoResult = message;
            }
          }

          break;

        case MessageType.ShowPanel:
          if (_this9.menu) {
            _this9.menu.removeMenu();
          }

          _this9.view.items.forEach(function (item) {
            return item.showPanel = item.id === message.itemId;
          });

          _this9.pushChanges();

          break;

        case MessageType.PlayMedia:
          {
            // !!! uniformare a PlayModel
            var item = _this9.view.items.find(function (item) {
              return item.id === message.itemId;
            });

            if (item && item.mesh instanceof MediaMesh) {
              item.mesh.setPlayingState(message.playing);
            }

            break;
          }

        case MessageType.ZoomMedia:
          {
            _this9.view.items.forEach(function (item) {
              if (item.mesh instanceof MediaMesh) {
                if (item.id === message.itemId) {
                  item.mesh.setZoomedState(message.zoomed);
                } else {
                  item.mesh.setZoomedState(false);
                }
              }
            });

            break;
          }

        case MessageType.CurrentTimeMedia:
          {
            var _item = _this9.view.items.find(function (item) {
              return item.id === message.itemId;
            });

            if (_item && _item.mesh instanceof MediaMesh) {
              _item.mesh.setCurrentTime(message.currentTime);
            }

            break;
          }

        case MessageType.PlayModel:
          {
            var _item2 = _this9.view.items.find(function (item) {
              return item.id === message.itemId;
            });

            if (_item2) {
              _item2.onMessage(message);
            }

            break;
          }

        case MessageType.NavToGrid:
          // console.log('WorldComponent.NavToGrid', this.view.id, message);
          if (_this9.view.id === message.viewId) {
            _this9.view.index = message.gridIndex;
          }

          break;

        case MessageType.VRStarted:
          _this9.addOffCanvasScene(message);

          break;

        case MessageType.VREnded:
          _this9.removeOffCanvasScene(message);

          break;

        case MessageType.VRState:
          _this9.updateOffCanvasScene(message);

          if (StateService.state.spying === message.clientId || StateService.state.controlling === message.clientId) {
            _this9.orbitService.setVRCamera(message.camera);
          }

          break;

        case MessageType.ControlInfo:
          if (!_this9.renderer.xr.isPresenting) {
            _this9.orbitService.setOrientation(message.orientation);

            _this9.orbitService.zoom = message.zoom;

            _this9.cameraGroup.position.set(message.cameraGroup.position[0], message.cameraGroup.position[1], message.cameraGroup.position[2]);

            _this9.cameraGroup.rotation.set(message.cameraGroup.rotation[0], message.cameraGroup.rotation[1], message.cameraGroup.rotation[2]); // this.camera.updateProjectionMatrix();

          }

          _this9.pointer.setPosition(message.pointer[0], message.pointer[1], message.pointer[2], _this9.camera);

          break;
      }
    });
    MessageService.in$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (message) {
      switch (message.type) {
        case MessageType.SelectItem:
          _this9.checkSelectedItem();

          break;
      }
    });
    StateService.state$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (state) {
      _this9.state = state;
      _this9.showPointer = _this9.locked; // console.log(state);
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
      // return STATIC || DEBUG;
      return DEBUG;
    }
  }, {
    key: "controlled",
    get: function get() {
      return StateService.state.controlling && StateService.state.controlling !== StateService.state.uid;
    }
  }, {
    key: "controlling",
    get: function get() {
      return StateService.state.controlling && StateService.state.controlling === StateService.state.uid;
    }
  }, {
    key: "silencing",
    get: function get() {
      return StateService.state.silencing;
    }
  }, {
    key: "silenced",
    get: function get() {
      return StateService.state.silencing && StateService.state.role === RoleType.Streamer;
    }
  }, {
    key: "spyed",
    get: function get() {
      return StateService.state.spying && StateService.state.spying === StateService.state.uid;
    }
  }, {
    key: "spying",
    get: function get() {
      return StateService.state.spying && StateService.state.spying !== StateService.state.uid;
    }
  }, {
    key: "locked",
    get: function get() {
      return this.controlled || this.spying;
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
  }, {
    key: "menu",
    set: function set(menu) {
      if (this.menu_ !== menu) {
        this.menu_ = menu;
        this.scene.traverse(function (object) {
          if (object instanceof MediaMesh || object instanceof MediaPlayMesh) {
            object.freezed = menu != null;
          }
        });
      }
    },
    get: function get() {
      return this.menu_;
    }
  }]);

  return WorldComponent;
}(rxcomp.Component);
WorldComponent.meta = {
  selector: '[world]',
  inputs: ['view', 'views', 'editor'],
  outputs: ['navTo', 'viewHit', 'dragEnd', 'resizeEnd', 'select']
};var ModelComponent = /*#__PURE__*/function (_Component) {
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

    this.getContainer().add(group);
    this.onCreate(function (mesh, item) {
      return _this.onMount(mesh, item);
    }, function (mesh, item) {
      return _this.onDismount(mesh, item);
    });
  };

  _proto.onDestroy = function onDestroy() {
    // console.log('ModelComponent', this);
    var group = this.group;
    this.getContainer().remove(group);
    delete group.userData.render;
    this.disposeObject(group);
    this.group = null;
  };

  _proto.getContainer = function getContainer() {
    return this.host.objects;
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
    var mesh = new THREE.Mesh(Geometry.defaultGeometry, material);

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
      Object.defineProperty(item, 'visible', {
        get: function get() {
          return mesh.visible;
        },
        set: function set(visible) {
          _this2.setVisible(visible);
        },
        configurable: true
      });

      item.onUpdate = function () {
        _this2.onUpdate(item, mesh);
      };

      item.onUpdateAsset = function () {
        _this2.onUpdateAsset(item, mesh);
      };

      item.onMessage = function (message) {
        _this2.onMessage(message);
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
      delete item.onMessage;
    }
  };

  _proto.disposeObject = function disposeObject(object) {
    object.traverse(function (child) {
      if (child.isInteractiveMesh || child.isInteractiveSprite) {
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
    // group.rotation.x = THREE.Math.degToRad(180) * tween;
    // group.rotation.y = THREE.Math.degToRad(360) * tween;
    */
  };

  _proto.setVisible = function setVisible(visible) {
    if (this.mesh) {
      this.mesh.visible = visible;
    }
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

  _proto.onUpdateAsset = function onUpdateAsset(item, mesh) {} // called by remote events
  ;

  _proto.onMessage = function onMessage(message) {};

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

var ModelBannerComponent = /*#__PURE__*/function (_ModelComponent) {
  _inheritsLoose(ModelBannerComponent, _ModelComponent);

  function ModelBannerComponent() {
    return _ModelComponent.apply(this, arguments) || this;
  }

  var _proto = ModelBannerComponent.prototype;

  /*
  onInit() {
  	super.onInit();
  	// console.log('ModelBannerComponent.onInit', this.item);
  }
  
  onView() {
  	// console.log('ModelBannerComponent.onView', this.item);
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
      ctx.lineJoin = 'round'; // Experiment with 'bevel' & 'round' for the effect you want!

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
    // console.log('ModelEditableComponent', this);
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
    var selected = this.item.selected;
    this.editing = selected;

    if (this.mesh) {
      this.mesh.editing = selected;
    }
  };

  _proto.onCreate = function onCreate(mount, dismount) {
    var _this = this;

    var item = this.item;
    var view = this.view;
    var items = view.items;
    var geometry = this.getCurvedPanelGeometry(item);
    this.onMeshDown = this.onMeshDown.bind(this);
    this.onMeshPlaying = this.onMeshPlaying.bind(this);
    this.onMeshZoomed = this.onMeshZoomed.bind(this);
    this.onMeshCurrentTime = this.onMeshCurrentTime.bind(this);
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
          mesh = new MediaMesh(item, view, geometry, _this.host);
          mesh.updateFromItem(item);
          mesh.name = 'curved-plane';
          mesh.load(function () {
            if (typeof mount === 'function') {
              mount(mesh, item);
            }

            subscription = mesh.events$().pipe(operators.takeUntil(_this.unsubscribe$)).subscribe(function () {});
          });

          _this.addMeshListeners(mesh);
        } else if (_this.mesh) {
          dismount(_this.mesh, item);
        } // console.log('streamId', streamId, mesh);

      }
    });
  };

  _proto.addMeshListeners = function addMeshListeners(mesh) {
    mesh.on('down', this.onMeshDown);
    mesh.on('playing', this.onMeshPlaying);
    mesh.on('zoomed', this.onMeshZoomed);
    mesh.on('currentTime', this.onMeshCurrentTime);
  };

  _proto.removeMeshListeners = function removeMeshListeners(mesh) {
    mesh.off('down', this.onMeshDown);
    mesh.off('playing', this.onMeshPlaying);
    mesh.off('zoomed', this.onMeshZoomed);
    mesh.off('currentTime', this.onMeshCurrentTime);
  };

  _proto.onMeshDown = function onMeshDown() {
    // console.log('ModelCurvedPanelComponent.onMeshDown');
    this.down.next(this);
  };

  _proto.onMeshPlaying = function onMeshPlaying(playing) {
    // console.log('ModelCurvedPanelComponent.playing', playing);
    this.play.next({
      itemId: this.item.id,
      playing: playing
    });
  };

  _proto.onMeshZoomed = function onMeshZoomed(zoomed) {
    // console.log('ModelCurvedPanelComponent.zoomed', zoomed);
    this.zoom.next({
      itemId: this.item.id,
      zoomed: zoomed
    });
  };

  _proto.onMeshCurrentTime = function onMeshCurrentTime(currentTime) {
    // console.log('ModelCurvedPanelComponent.playing', playing);
    this.currentTime.next({
      itemId: this.item.id,
      currentTime: currentTime
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
    // !!! true
    if ( (item.radius !== this.radius_ || item.height !== this.height_ || item.arc !== this.arc_)) {
      mesh.geometry.dispose();
      var geometry = this.getCurvedPanelGeometry(item);
      mesh.geometry = geometry;
    }

    mesh.updateFromItem(item);
    this.updateHelper();
  } // called by UpdateViewItemComponent
  ;

  _proto.onUpdateAsset = function onUpdateAsset(item, mesh) {
    // console.log('ModelCurvedPlaneComponent.onUpdateAsset', item);
    mesh.updateByItem(item);
    MediaMesh.getStreamId$(item).pipe(operators.filter(function (streamId) {
      return streamId !== null;
    }), operators.take(1)).subscribe(function (streamId) {
      item.streamId = streamId;
      mesh.load(function () {// console.log('ModelCurvedPlaneComponent.mesh.load.complete');
      });
    });
  } // called by WorldComponent
  ;

  _proto.onDragMove = function onDragMove(position, normal, spherical) {
    // console.log('ModelCurvedPlaneComponent.onDragMove', position, normal, spherical);
    var item = this.item;
    var mesh = this.mesh;
    item.showPanel = false;
    this.editing = true;
    mesh.position.set(position.x, position.y, position.z);

    if (spherical) {
      position.normalize().multiplyScalar(20);
      mesh.lookAt(Host.origin);
    } else {
      mesh.position.set(0, 0, 0);
      mesh.lookAt(normal);
      mesh.position.set(position.x, position.y, position.z);
      mesh.position.add(normal.multiplyScalar(0.01));
    }

    this.updateHelper();
  } // called by WorldComponent
  ;

  _proto.onDragEnd = function onDragEnd() {
    var item = this.item;
    var mesh = this.mesh;
    item.position = mesh.position.toArray();
    item.rotation = mesh.rotation.toArray();
    item.scale = mesh.scale.toArray();
    mesh.updateFromItem(item);
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
ModelCurvedPlaneComponent.textures = {};
ModelCurvedPlaneComponent.meta = {
  selector: '[model-curved-plane]',
  hosts: {
    host: WorldComponent
  },
  outputs: ['down', 'play', 'zoom', 'currentTime'],
  inputs: ['item', 'view']
};var DebugService = /*#__PURE__*/function () {
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
}();var ModelDebugComponent = /*#__PURE__*/function (_ModelComponent) {
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
    text.renderOrder = environment.renderOrder.debug;
    text.position.y = 0;
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
    group.lookAt(Host.origin); // }
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
        ctx.textAlign = 'center';
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
ModelDebugComponent.W = 1024;
ModelDebugComponent.H = 256;
ModelDebugComponent.meta = {
  selector: '[model-debug]',
  hosts: {
    host: WorldComponent
  }
};var VERTEX_SHADER$1 = "\nvarying vec2 vUv;\nvoid main() {\n\tvUv = uv;\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
var FRAGMENT_SHADER$1 = "\nvarying vec2 vUv;\nuniform sampler2D textureA;\nuniform sampler2D textureB;\nuniform float opacity;\nuniform float tween;\n\nvoid main() {\n\tvec4 colorA = texture2D(textureA, vUv);\n\tvec4 colorB = texture2D(textureB, vUv);\n\tvec4 color = mix(colorA, colorB, tween);\n\tcolor.a = clamp(color.a * opacity, 0.0, 1.0);\n\tcolor.rgb /= color.a;\n\tgl_FragColor = color;\n}\n";

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
        vertexShader: VERTEX_SHADER$1,
        fragmentShader: FRAGMENT_SHADER$1,
        uniforms: {
          textureA: {
            type: 't',
            value: map
          },
          textureB: {
            type: 't',
            value: mapOver
          },
          tween: {
            value: 0
          },
          opacity: {
            value: 0
          }
        },
        extensions: {
          fragDepth: true
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
    var geometry = new THREE.PlaneBufferGeometry(ModelGridComponent.RADIUS, ModelGridComponent.RADIUS, 8, 8); // 20, 20

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

      var geometry = new THREE.PlaneBufferGeometry(1, 1 / MenuButton.W * MenuButton.H, 2, 2);
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
            type: 't',
            value: null
          },
          textureB: {
            type: 't',
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
        },
        extensions: {
          fragDepth: true
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

    // DebugService.getService().setMessage('over ' + this.name);
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

    /*
    const vrService = this.vrService = VRService.getService();
    vrService.session$.pipe(
    	takeUntil(this.unsubscribe$),
    ).subscribe((session) => {
    	if (session) {
    		this.addToggler();
    	} else {
    		this.removeMenu();
    	}
    });
    */

    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    this.progressIndicator = node.querySelector('.progress circle');
    LoaderService.progress$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (progress) {
      _this4.loading = progress.count > 0;
      var strokeDashoffset = 144.51;

      if (progress.count) {
        strokeDashoffset = 144.51 * (1 - progress.value);
      }

      gsap.set(_this4.progressIndicator, {
        'strokeDashoffset': strokeDashoffset
      });
    });
    MessageService.in$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (message) {
      // DebugService.getService().setMessage('ModelMenuComponent.MessageService ' + message.type);
      switch (message.type) {
        case MessageType.MenuToggle:
          _this4.onToggle();

          break;
      }
    });
  }
  /*
  buildMenu() {
  	if (!this.views) {
  		return;
  	}
  	MenuService.getModelMenu$(this.views, this.editor).pipe(
  		first(),
  	).subscribe(menu => this.groups = menu);
  }
  */
  ;

  _proto3.onDestroy = function onDestroy() {
    if (this.buttons) {
      this.buttons.forEach(function (x) {
        return Interactive.dispose(x);
      });
    }

    _ModelComponent.prototype.onDestroy.call(this);
  };

  _proto3.getContainer = function getContainer() {
    return this.host.cameraGroup;
  };

  _proto3.onCreate = function onCreate(mount, dismount) {
    // this.renderOrder = environment.renderOrder.menu;
    var menuGroup = this.menuGroup = new THREE.Group();

    if (typeof mount === 'function') {
      mount(menuGroup);
    }
  };

  _proto3.render = function render(time, tick) {
    var group = this.group;
    var cameraGroup = this.host.cameraGroup;
    var camera = this.host.camera;
    var position = this.position;

    if (this.host.renderer.xr.isPresenting) {
      camera = this.host.renderer.xr.getCamera(camera);
      camera.getWorldDirection(position);
      position.y += 0.5;
      position.multiplyScalar(3);
      this.host.cameraGroup.worldToLocal(position);
      position.y += this.host.cameraGroup.position.y;
      group.position.copy(position);
      group.scale.set(1, 1, 1);
      group.lookAt(Host.origin);
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
      group.lookAt(Host.origin);
    }
  };

  _proto3.items$ = function items$(item) {
    if (item === void 0) {
      item = null;
    }

    if (item) {
      return rxjs.of(item.items);
    } else {
      return MenuService.getModelMenu$(this.views, this.editor).pipe(operators.first());
    }
  };

  _proto3.addMenu = function addMenu(item) {
    var _this5 = this;

    if (item === void 0) {
      item = null;
    }

    this.removeMenu(); // nav to view

    if (item && item.type.name !== 'menu-group') {
      /*
      if (this.host.renderer.xr.isPresenting) {
      	this.addToggler();
      }
      */
      this.nav.next(item);
      return;
    }

    MenuService.active = true;
    this.items$(item).pipe(operators.first()).subscribe(function (items) {
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
        var buttons = _this5.buttons = items.map(function (x, i, a) {
          x.backItem = item;
          return x.type.name === 'back' ? new BackButton(x, i, a.length) : new MenuButton(x, i, a.length);
        });
        buttons.forEach(function (button) {
          button.depthTest = false;
          button.on('over', button.onOver);
          button.on('out', button.onOut);
          button.on('down', _this5.onDown);

          _this5.menuGroup.add(button);
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
    MenuService.active = false;
    this.removeButtons();
    this.removeToggler();
  };

  _proto3.removeButtons = function removeButtons() {
    var _this6 = this;

    var buttons = this.buttons;

    if (buttons) {
      buttons.forEach(function (button) {
        _this6.menuGroup.remove(button);

        button.off('over', button.onOver);
        button.off('out', button.onOut);
        button.off('down', _this6.onDown);
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

  _proto3.onDown = function onDown(button) {
    // this.down.next(this.item);
    if (button.item && button.item.type.name === 'back') {
      this.removeMenu();

      if (button.item.backItem) {
        this.addMenu(button.item.backItem.backItem);
      } else {
        /*
        if (this.host.renderer.xr.isPresenting) {
        	this.addToggler();
        }
        */
        this.toggle.next();
      }
    } else {
      this.addMenu(button.item);
    }
  };

  _proto3.onToggle = function onToggle() {
    if (this.locked) {
      return;
    }

    if (MenuService.active) {
      this.removeMenu();
      this.toggle.next();
    } else {
      this.addMenu();
      this.toggle.next(this);
    }
  };

  _createClass(ModelMenuComponent, [{
    key: "controlled",
    get: function get() {
      return StateService.state.controlling && StateService.state.controlling !== StateService.state.uid;
    }
  }, {
    key: "controlling",
    get: function get() {
      return StateService.state.controlling && StateService.state.controlling === StateService.state.uid;
    }
  }, {
    key: "silencing",
    get: function get() {
      return StateService.state.silencing;
    }
  }, {
    key: "silenced",
    get: function get() {
      return StateService.state.silencing && StateService.state.role === RoleType.Streamer;
    }
  }, {
    key: "spyed",
    get: function get() {
      return StateService.state.spying && StateService.state.spying === StateService.state.uid;
    }
  }, {
    key: "spying",
    get: function get() {
      return StateService.state.spying && StateService.state.spying !== StateService.state.uid;
    }
  }, {
    key: "locked",
    get: function get() {
      return this.controlled || this.spying;
    }
  }, {
    key: "loading",
    get: function get() {
      return this.loading_;
    },
    set: function set(loading) {
      // console.log('loading', loading);
      if (this.loading_ !== loading) {
        this.loading_ = loading;

        var _getContext2 = rxcomp.getContext(this),
            node = _getContext2.node;

        var btn = node.querySelector('.btn--menu');
        btn.classList.toggle('loading', loading);
      }
    }
  }]);

  return ModelMenuComponent;
}(ModelComponent);
ModelMenuComponent.VERTEX_SHADER = "\nvarying vec2 vUv;\nvoid main() {\n\tvUv = uv;\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
ModelMenuComponent.FRAGMENT_SHADER = "\nvarying vec2 vUv;\nuniform float opacity;\nuniform float tween;\nuniform sampler2D textureA;\nuniform sampler2D textureB;\nuniform vec2 resolutionA;\nuniform vec2 resolutionB;\n\nvoid main() {\n\tvec4 colorA = texture2D(textureA, vUv);\n\tvec4 colorB = texture2D(textureB, vUv);\n\tvec4 color = vec4(mix(colorA.rgb, colorB.rgb, tween), opacity);\n\tgl_FragColor = color;\n}\n";
ModelMenuComponent.meta = {
  selector: '[model-menu]',
  hosts: {
    host: WorldComponent
  },
  // outputs: ['over', 'out', 'down', 'nav'],
  outputs: ['nav', 'toggle'],
  inputs: ['views', 'editor']
};// import { BufferAttribute, BufferGeometry, FileLoader, Loader } from 'three';
var _THREE$2 = THREE,
    BufferAttribute$1 = _THREE$2.BufferAttribute,
    BufferGeometry$1 = _THREE$2.BufferGeometry,
    FileLoader$1 = _THREE$2.FileLoader,
    Loader$1 = _THREE$2.Loader;

var _taskCache = new WeakMap();

var DRACOLoader = /*#__PURE__*/function (_Loader) {
  _inheritsLoose(DRACOLoader, _Loader);

  function DRACOLoader(manager) {
    var _this;

    _this = _Loader.call(this, manager) || this;
    _this.decoderPath = '';
    _this.decoderConfig = {};
    _this.decoderBinary = null;
    _this.decoderPending = null;
    _this.workerLimit = 4;
    _this.workerPool = [];
    _this.workerNextTaskID = 1;
    _this.workerSourceURL = '';
    _this.defaultAttributeIDs = {
      position: 'POSITION',
      normal: 'NORMAL',
      color: 'COLOR',
      uv: 'TEX_COORD'
    };
    _this.defaultAttributeTypes = {
      position: 'Float32Array',
      normal: 'Float32Array',
      color: 'Float32Array',
      uv: 'Float32Array'
    };
    return _this;
  }

  var _proto = DRACOLoader.prototype;

  _proto.setDecoderPath = function setDecoderPath(path) {
    this.decoderPath = path;
    return this;
  };

  _proto.setDecoderConfig = function setDecoderConfig(config) {
    this.decoderConfig = config;
    return this;
  };

  _proto.setWorkerLimit = function setWorkerLimit(workerLimit) {
    this.workerLimit = workerLimit;
    return this;
  };

  _proto.load = function load(url, onLoad, onProgress, onError) {
    var _this2 = this;

    var loader = new FileLoader$1(this.manager);
    loader.setPath(this.path);
    loader.setResponseType('arraybuffer');
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(url, function (buffer) {
      var taskConfig = {
        attributeIDs: _this2.defaultAttributeIDs,
        attributeTypes: _this2.defaultAttributeTypes,
        useUniqueIDs: false
      };

      _this2.decodeGeometry(buffer, taskConfig).then(onLoad).catch(onError);
    }, onProgress, onError);
  }
  /** @deprecated Kept for backward-compatibility with previous DRACOLoader versions. */
  ;

  _proto.decodeDracoFile = function decodeDracoFile(buffer, callback, attributeIDs, attributeTypes) {
    var taskConfig = {
      attributeIDs: attributeIDs || this.defaultAttributeIDs,
      attributeTypes: attributeTypes || this.defaultAttributeTypes,
      useUniqueIDs: !!attributeIDs
    };
    this.decodeGeometry(buffer, taskConfig).then(callback);
  };

  _proto.decodeGeometry = function decodeGeometry(buffer, taskConfig) {
    var _this3 = this;

    // TODO: For backward-compatibility, support 'attributeTypes' objects containing
    // references (rather than names) to typed array constructors. These must be
    // serialized before sending them to the worker.
    for (var attribute in taskConfig.attributeTypes) {
      var type = taskConfig.attributeTypes[attribute];

      if (type.BYTES_PER_ELEMENT !== undefined) {
        taskConfig.attributeTypes[attribute] = type.name;
      }
    } //


    var taskKey = JSON.stringify(taskConfig); // Check for an existing task using this buffer. A transferred buffer cannot be transferred
    // again from this thread.

    if (_taskCache.has(buffer)) {
      var cachedTask = _taskCache.get(buffer);

      if (cachedTask.key === taskKey) {
        return cachedTask.promise;
      } else if (buffer.byteLength === 0) {
        // Technically, it would be possible to wait for the previous task to complete,
        // transfer the buffer back, and decode again with the second configuration. That
        // is complex, and I don't know of any reason to decode a Draco buffer twice in
        // different ways, so this is left unimplemented.
        throw new Error('THREE.DRACOLoader: Unable to re-decode a buffer with different ' + 'settings. Buffer has already been transferred.');
      }
    } //


    var worker;
    var taskID = this.workerNextTaskID++;
    var taskCost = buffer.byteLength; // Obtain a worker and assign a task, and construct a geometry instance
    // when the task completes.

    var geometryPending = this._getWorker(taskID, taskCost).then(function (_worker) {
      worker = _worker;
      return new Promise(function (resolve, reject) {
        worker._callbacks[taskID] = {
          resolve: resolve,
          reject: reject
        };
        worker.postMessage({
          type: 'decode',
          id: taskID,
          taskConfig: taskConfig,
          buffer: buffer
        }, [buffer]); // this.debug();
      });
    }).then(function (message) {
      return _this3._createGeometry(message.geometry);
    }); // Remove task from the task list.
    // Note: replaced '.finally()' with '.catch().then()' block - iOS 11 support (#19416)


    geometryPending.catch(function () {
      return true;
    }).then(function () {
      if (worker && taskID) {
        _this3._releaseTask(worker, taskID); // this.debug();

      }
    }); // Cache the task result.

    _taskCache.set(buffer, {
      key: taskKey,
      promise: geometryPending
    });

    return geometryPending;
  };

  _proto._createGeometry = function _createGeometry(geometryData) {
    var geometry = new BufferGeometry$1();

    if (geometryData.index) {
      geometry.setIndex(new BufferAttribute$1(geometryData.index.array, 1));
    }

    for (var i = 0; i < geometryData.attributes.length; i++) {
      var attribute = geometryData.attributes[i];
      var name = attribute.name;
      var array = attribute.array;
      var itemSize = attribute.itemSize;
      geometry.setAttribute(name, new BufferAttribute$1(array, itemSize));
    }

    return geometry;
  };

  _proto._loadLibrary = function _loadLibrary(url, responseType) {
    var loader = new FileLoader$1(this.manager);
    loader.setPath(this.decoderPath);
    loader.setResponseType(responseType);
    loader.setWithCredentials(this.withCredentials);
    return new Promise(function (resolve, reject) {
      loader.load(url, resolve, undefined, reject);
    });
  };

  _proto.preload = function preload() {
    this._initDecoder();

    return this;
  };

  _proto._initDecoder = function _initDecoder() {
    var _this4 = this;

    if (this.decoderPending) return this.decoderPending;
    var useJS = typeof WebAssembly !== 'object' || this.decoderConfig.type === 'js';
    var librariesPending = [];

    if (useJS) {
      librariesPending.push(this._loadLibrary('draco_decoder.js', 'text'));
    } else {
      librariesPending.push(this._loadLibrary('draco_wasm_wrapper.js', 'text'));
      librariesPending.push(this._loadLibrary('draco_decoder.wasm', 'arraybuffer'));
    }

    this.decoderPending = Promise.all(librariesPending).then(function (libraries) {
      var jsContent = libraries[0];

      if (!useJS) {
        _this4.decoderConfig.wasmBinary = libraries[1];
      }

      var fn = DRACOWorker.toString();
      var body = ['/* draco decoder */', jsContent, '', '/* worker */', fn.substring(fn.indexOf('{') + 1, fn.lastIndexOf('}'))].join('\n');
      _this4.workerSourceURL = URL.createObjectURL(new Blob([body]));
    });
    return this.decoderPending;
  };

  _proto._getWorker = function _getWorker(taskID, taskCost) {
    var _this5 = this;

    return this._initDecoder().then(function () {
      if (_this5.workerPool.length < _this5.workerLimit) {
        var _worker2 = new Worker(_this5.workerSourceURL);

        _worker2._callbacks = {};
        _worker2._taskCosts = {};
        _worker2._taskLoad = 0;

        _worker2.postMessage({
          type: 'init',
          decoderConfig: _this5.decoderConfig
        });

        _worker2.onmessage = function (e) {
          var message = e.data;

          switch (message.type) {
            case 'decode':
              _worker2._callbacks[message.id].resolve(message);

              break;

            case 'error':
              _worker2._callbacks[message.id].reject(message);

              break;

            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + message.type + '"');
          }
        };

        _this5.workerPool.push(_worker2);
      } else {
        _this5.workerPool.sort(function (a, b) {
          return a._taskLoad > b._taskLoad ? -1 : 1;
        });
      }

      var worker = _this5.workerPool[_this5.workerPool.length - 1];
      worker._taskCosts[taskID] = taskCost;
      worker._taskLoad += taskCost;
      return worker;
    });
  };

  _proto._releaseTask = function _releaseTask(worker, taskID) {
    worker._taskLoad -= worker._taskCosts[taskID];
    delete worker._callbacks[taskID];
    delete worker._taskCosts[taskID];
  };

  _proto.debug = function debug() {
    console.log('Task load: ', this.workerPool.map(function (worker) {
      return worker._taskLoad;
    }));
  };

  _proto.dispose = function dispose() {
    for (var i = 0; i < this.workerPool.length; ++i) {
      this.workerPool[i].terminate();
    }

    this.workerPool.length = 0;
    return this;
  };

  return DRACOLoader;
}(Loader$1);
/* WEB WORKER */


function DRACOWorker() {
  var decoderConfig;
  var decoderPending;

  onmessage = function onmessage(e) {
    var message = e.data;

    switch (message.type) {
      case 'init':
        decoderConfig = message.decoderConfig;
        decoderPending = new Promise(function (resolve
        /*, reject*/
        ) {
          decoderConfig.onModuleLoaded = function (draco) {
            // Module is Promise-like. Wrap before resolving to avoid loop.
            resolve({
              draco: draco
            });
          };

          DracoDecoderModule(decoderConfig); // eslint-disable-line no-undef
        });
        break;

      case 'decode':
        var buffer = message.buffer;
        var taskConfig = message.taskConfig;
        decoderPending.then(function (module) {
          var draco = module.draco;
          var decoder = new draco.Decoder();
          var decoderBuffer = new draco.DecoderBuffer();
          decoderBuffer.Init(new Int8Array(buffer), buffer.byteLength);

          try {
            var geometry = decodeGeometry(draco, decoder, decoderBuffer, taskConfig);
            var buffers = geometry.attributes.map(function (attr) {
              return attr.array.buffer;
            });
            if (geometry.index) buffers.push(geometry.index.array.buffer);
            self.postMessage({
              type: 'decode',
              id: message.id,
              geometry: geometry
            }, buffers);
          } catch (error) {
            console.error(error);
            self.postMessage({
              type: 'error',
              id: message.id,
              error: error.message
            });
          } finally {
            draco.destroy(decoderBuffer);
            draco.destroy(decoder);
          }
        });
        break;
    }
  };

  function decodeGeometry(draco, decoder, decoderBuffer, taskConfig) {
    var attributeIDs = taskConfig.attributeIDs;
    var attributeTypes = taskConfig.attributeTypes;
    var dracoGeometry;
    var decodingStatus;
    var geometryType = decoder.GetEncodedGeometryType(decoderBuffer);

    if (geometryType === draco.TRIANGULAR_MESH) {
      dracoGeometry = new draco.Mesh();
      decodingStatus = decoder.DecodeBufferToMesh(decoderBuffer, dracoGeometry);
    } else if (geometryType === draco.POINT_CLOUD) {
      dracoGeometry = new draco.PointCloud();
      decodingStatus = decoder.DecodeBufferToPointCloud(decoderBuffer, dracoGeometry);
    } else {
      throw new Error('THREE.DRACOLoader: Unexpected geometry type.');
    }

    if (!decodingStatus.ok() || dracoGeometry.ptr === 0) {
      throw new Error('THREE.DRACOLoader: Decoding failed: ' + decodingStatus.error_msg());
    }

    var geometry = {
      index: null,
      attributes: []
    }; // Gather all vertex attributes.

    for (var attributeName in attributeIDs) {
      var attributeType = self[attributeTypes[attributeName]];
      var attribute = void 0;
      var attributeID = void 0; // A Draco file may be created with default vertex attributes, whose attribute IDs
      // are mapped 1:1 from their semantic name (POSITION, NORMAL, ...). Alternatively,
      // a Draco file may contain a custom set of attributes, identified by known unique
      // IDs. glTF files always do the latter, and `.drc` files typically do the former.

      if (taskConfig.useUniqueIDs) {
        attributeID = attributeIDs[attributeName];
        attribute = decoder.GetAttributeByUniqueId(dracoGeometry, attributeID);
      } else {
        attributeID = decoder.GetAttributeId(dracoGeometry, draco[attributeIDs[attributeName]]);
        if (attributeID === -1) continue;
        attribute = decoder.GetAttribute(dracoGeometry, attributeID);
      }

      geometry.attributes.push(decodeAttribute(draco, decoder, dracoGeometry, attributeName, attributeType, attribute));
    } // Add index.


    if (geometryType === draco.TRIANGULAR_MESH) {
      geometry.index = decodeIndex(draco, decoder, dracoGeometry);
    }

    draco.destroy(dracoGeometry);
    return geometry;
  }

  function decodeIndex(draco, decoder, dracoGeometry) {
    var numFaces = dracoGeometry.num_faces();
    var numIndices = numFaces * 3;
    var byteLength = numIndices * 4;

    var ptr = draco._malloc(byteLength);

    decoder.GetTrianglesUInt32Array(dracoGeometry, byteLength, ptr);
    var index = new Uint32Array(draco.HEAPF32.buffer, ptr, numIndices).slice();

    draco._free(ptr);

    return {
      array: index,
      itemSize: 1
    };
  }

  function decodeAttribute(draco, decoder, dracoGeometry, attributeName, attributeType, attribute) {
    var numComponents = attribute.num_components();
    var numPoints = dracoGeometry.num_points();
    var numValues = numPoints * numComponents;
    var byteLength = numValues * attributeType.BYTES_PER_ELEMENT;
    var dataType = getDracoDataType(draco, attributeType);

    var ptr = draco._malloc(byteLength);

    decoder.GetAttributeDataArrayForAllPoints(dracoGeometry, attribute, dataType, byteLength, ptr);
    var array = new attributeType(draco.HEAPF32.buffer, ptr, numValues).slice();

    draco._free(ptr);

    return {
      name: attributeName,
      array: array,
      itemSize: numComponents
    };
  }

  function getDracoDataType(draco, attributeType) {
    switch (attributeType) {
      case Float32Array:
        return draco.DT_FLOAT32;

      case Int8Array:
        return draco.DT_INT8;

      case Int16Array:
        return draco.DT_INT16;

      case Int32Array:
        return draco.DT_INT32;

      case Uint8Array:
        return draco.DT_UINT8;

      case Uint16Array:
        return draco.DT_UINT16;

      case Uint32Array:
        return draco.DT_UINT32;
    }
  }
}var ModelModelComponent = /*#__PURE__*/function (_ModelEditableCompone) {
  _inheritsLoose(ModelModelComponent, _ModelEditableCompone);

  function ModelModelComponent() {
    return _ModelEditableCompone.apply(this, arguments) || this;
  }

  var _proto = ModelModelComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    _ModelEditableCompone.prototype.onInit.call(this);

    this.isPresenting = false;
    MenuService.active$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (active) {
      return _this.freezed = active;
    });
  };

  _proto.onChanges = function onChanges() {
    this.editing = this.item.selected;
  };

  _proto.onCreate = function onCreate(mount, dismount) {
    var _this2 = this;

    this.loadGlb(environment.getPath(this.item.asset.folder), this.item.asset.file, function (mesh, animations) {
      _this2.onGlbLoaded(mesh, animations, mount, dismount);
    });
  };

  _proto.loadGlb = function loadGlb(path, file, callback) {
    var renderer = this.host.renderer; // const roughnessMipmapper = new RoughnessMipmapper(renderer); // optional

    var progressRef = LoaderService.getRef(); // console.log('progressRef');

    var loader = new GLTFLoader().setPath(path); // Optional: Provide a DRACOLoader instance to decode compressed mesh data

    var decoderPath = environment.assets + "js/draco/"; // console.log(decoderPath);

    var dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(decoderPath);
    loader.setDRACOLoader(dracoLoader);
    loader.load(file, function (glb) {
      /*
      glb.scene.traverse((child) => {
      	if (child.isMesh) {
      		// roughnessMipmapper.generateMipmaps(child.material);
      	}
      });
      */
      if (typeof callback === 'function') {
        callback(glb.scene, glb.animations);
      }

      LoaderService.setProgress(progressRef, 1); // roughnessMipmapper.dispose();
    }, function (progressEvent) {
      LoaderService.setProgress(progressRef, progressEvent.loaded, progressEvent.total);
    });
  };

  _proto.onGlbLoaded = function onGlbLoaded(mesh, animations, mount, dismount) {
    var _this3 = this;

    // animations
    this.parseAnimations(mesh, animations); // scale

    var box = new THREE.Box3().setFromObject(mesh);
    var size = box.max.clone().sub(box.min);
    var max = Math.max(size.x, size.y, size.z);
    var scale = 1.7 / max;
    mesh.scale.set(scale, scale, scale); // repos

    var dummy;
    var view = this.view;
    var item = this.item;

    if (view.type.name === ViewType.Model.name) {
      // this.onUpdateVRSession(this.vrService.currentSession);
      dummy = new THREE.Group();
      dummy.add(mesh);
      box.setFromObject(dummy);
      var center = box.getCenter(new THREE.Vector3());
      dummy.position.set(mesh.position.x - center.x, mesh.position.y - center.y, mesh.position.z - center.z + (this.host.renderer.xr.isPresenting ? -2 : 0) // mesh.position.z - center.z,
      );
      var endY = dummy.position.y;
      var from = {
        tween: 1
      };

      var onUpdate = function onUpdate() {
        dummy.position.y = endY + 3 * from.tween;
        dummy.rotation.y = 0 + Math.PI * from.tween;
      };

      onUpdate();
      this.makeInteractive(mesh);
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
      this.freezed = MenuService.active;
    }
  };

  _proto.parseAnimations = function parseAnimations(mesh, animations) {
    // animations
    // console.log('ModelModelComponent.onGlbLoaded', 'animations', animations);
    var actionIndex = this.actionIndex = -1;
    var actions = this.actions = [];

    if (animations && animations.length) {
      var clock = this.clock = new THREE.Clock();
      var mixer = this.mixer = new THREE.AnimationMixer(mesh);
      mixer.timeScale = 1;
      animations.forEach(function (animation) {
        var action = mixer.clipAction(animation);
        action.enabled = true;
        action.setEffectiveTimeScale(1);
        action.setEffectiveWeight(1); // action.setLoop(THREE.LoopPingPong);

        action.setLoop(THREE.LoopRepeat); // action.clampWhenFinished = true; // pause on last frame

        actions.push(action);
      });
    }
  };

  _proto.onClipToggle = function onClipToggle() {
    var actionIndex;
    var actions = this.actions;

    if (actions.length === 1) {
      actionIndex = this.actionIndex === -1 ? 0 : -1;
      this.setSingleAction(actionIndex);
    } else if (actions.length > 1) {
      actionIndex = this.actionIndex + 1;

      if (actionIndex === actions.length) {
        actionIndex = -1;
      }

      this.setMultiAction(actionIndex);
    }

    this.play.next({
      itemId: this.item.id,
      actionIndex: actionIndex
    });
  };

  _proto.setSingleAction = function setSingleAction(actionIndex) {
    if (this.actionIndex !== actionIndex) {
      this.actionIndex = actionIndex;
      var action = this.actions[0];

      if (actionIndex === 0) {
        if (action.paused || action.timeScale === 0) {
          action.paused = false;
        } else {
          action.play();
        }
      } else if (actionIndex === -1) {
        action.halt(0.3);
      }
    }
  };

  _proto.setMultiAction = function setMultiAction(actionIndex) {
    if (this.actionIndex !== actionIndex) {
      var actions = this.actions;
      var previousClip = this.actionIndex > -1 ? actions[this.actionIndex] : null;
      this.actionIndex = actionIndex;

      if (previousClip) {
        previousClip.halt(0.3);
      } // console.log('setMultiAction', actionIndex, actions.length);


      if (actionIndex > -1) {
        var action = actions[actionIndex];

        if (action.paused) {
          action.paused = false;
        }

        if (action.timeScale === 0) {
          action.timeScale = 1;
        }

        action.play();
      }
    }
  };

  _proto.onMessage = function onMessage(message) {
    switch (message.type) {
      case MessageType.PlayModel:
        var actions = this.actions;

        if (actions.length === 1) {
          this.setSingleAction(message.actionIndex);
        } else if (actions.length > 1) {
          this.setMultiAction(message.actionIndex);
        }

        break;
    }
  };

  _proto.render = function render(time, tick) {
    var view = this.view;
    var item = this.item;
    var mesh = this.mesh;
    var isPresenting = this.host.renderer.xr.isPresenting;
    var group = this.group;

    if (mesh) {
      if (view.type.name === ViewType.Model.name) {
        if (this.isPresenting !== isPresenting) {
          this.isPresenting = isPresenting;

          if (isPresenting) {
            mesh.position.x = 0;
            mesh.position.y = 0;
            mesh.position.z = -2;
            mesh.rotation.y = 0;
          } else {
            mesh.position.x = 0;
            mesh.position.y = 0;
            mesh.position.z = 0;
            mesh.rotation.y = 0;
          }
        }

        if (isPresenting) {
          mesh.rotation.y -= Math.PI / 180 / 60 * 5;
        }
      } else {
        if (isPresenting) {
          mesh.rotation.y -= Math.PI / 180 / 60 * 5;
        }
      }
    }

    var mixer = this.mixer;
    var clock = this.clock;

    if (mixer) {
      var delta = clock.getDelta();
      mixer.update(delta);
    }
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
    this.loadGlb(environment.getPath(item.asset.folder), item.asset.file, function (mesh, animations) {
      _this4.onGlbLoaded(mesh, animations, function (mesh, item) {
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

  _proto.onDragMove = function onDragMove(position, normal, spherical) {
    // console.log('ModelModelComponent.onDragMove', position, normal, spherical);
    if (spherical) {
      position.normalize().multiplyScalar(4);
    }

    this.editing = true;
    var view = this.view;

    if (view.type.name !== ViewType.Model.name) {
      this.mesh.position.set(position.x, position.y, position.z); // this.mesh.lookAt(Host.origin);
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

  ModelModelComponent.getInteractiveDescriptors = function getInteractiveDescriptors() {
    var descriptors = ModelModelComponent.interactiveDescriptors;

    if (!descriptors) {
      var freezableDescriptors = Object.getOwnPropertyDescriptors(FreezableMesh.prototype);
      var emittableDescriptors = Object.getOwnPropertyDescriptors(EmittableMesh.prototype);
      var interactiveDescriptors = Object.getOwnPropertyDescriptors(InteractiveMesh.prototype);
      descriptors = Object.assign({}, freezableDescriptors, emittableDescriptors, interactiveDescriptors);
      ModelModelComponent.interactiveDescriptors = descriptors;
    }

    return descriptors;
  };

  _proto.makeInteractive = function makeInteractive(mesh) {
    var _this5 = this;

    var interactiveDescriptors = ModelModelComponent.getInteractiveDescriptors();
    mesh.traverse(function (child) {
      if (child.isMesh) {
        Object.keys(interactiveDescriptors).forEach(function (key) {
          if (key !== 'constructor') {
            Object.defineProperty(child, key, interactiveDescriptors[key]);
          }
        });
        child.freezed = false;
        child.events = {};
        child.depthTest = true;
        child.over_ = false;
        child.down_ = false;
        Interactive.items.push(child);
        child.on('down', function () {
          // console.log('ModelModelComponent.down', child);
          _this5.onClipToggle();

          _this5.down.next(_this5);
        });
      }
    });
  };

  _createClass(ModelModelComponent, [{
    key: "freezed",
    get: function get() {
      return this.freezed_;
    },
    set: function set(freezed) {
      if (this.freezed_ !== freezed) {
        this.freezed_ = freezed;
        var mesh = this.mesh;

        if (mesh) {
          mesh.traverse(function (child) {
            if (child.isInteractiveMesh) {
              child.freezed = freezed;
            }
          });
        }
      }
    }
  }]);

  return ModelModelComponent;
}(ModelEditableComponent);
ModelModelComponent.meta = {
  selector: '[model-model]',
  hosts: {
    host: WorldComponent
  },
  outputs: ['down', 'play'],
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
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _ModelEditableCompone.call.apply(_ModelEditableCompone, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "hidden_", false);

    return _this;
  }

  ModelNavComponent.getLoader = function getLoader() {
    return ModelNavComponent.loader || (ModelNavComponent.loader = new THREE.TextureLoader());
  };

  ModelNavComponent.getTexturePoint = function getTexturePoint() {
    return ModelNavComponent.texturePoint || (ModelNavComponent.texturePoint = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-point.png')));
  };

  ModelNavComponent.getTexturePointImportant = function getTexturePointImportant() {
    return ModelNavComponent.texturePointImportant || (ModelNavComponent.texturePointImportant = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-point-important.png')));
  };

  ModelNavComponent.getTextureMove = function getTextureMove() {
    return ModelNavComponent.textureMove || (ModelNavComponent.textureMove = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-more.png')));
  };

  ModelNavComponent.getTextureMoveImportant = function getTextureMoveImportant() {
    return ModelNavComponent.textureMoveImportant || (ModelNavComponent.textureMoveImportant = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-more-important.png')));
  };

  ModelNavComponent.getTextureInfo = function getTextureInfo() {
    return ModelNavComponent.textureInfo || (ModelNavComponent.textureInfo = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-info.png')));
  };

  ModelNavComponent.getTextureInfoImportant = function getTextureInfoImportant() {
    return ModelNavComponent.textureInfoImportant || (ModelNavComponent.textureInfoImportant = ModelNavComponent.getLoader().load(environment.getPath('textures/ui/nav-info-important.png')));
  };

  ModelNavComponent.getTexture = function getTexture(mode, important) {
    var texture;

    switch (mode) {
      case NavModeType.Move:
        texture = important ? this.getTextureMoveImportant() : this.getTextureMove();
        break;

      case NavModeType.Info:
        texture = important ? this.getTextureInfoImportant() : this.getTextureInfo();
        break;

      case NavModeType.Point:
      case NavModeType.Title:
        texture = important ? this.getTexturePointImportant() : this.getTexturePoint();
        break;
    }

    texture.disposable = false;
    texture.encoding = THREE.sRGBEncoding;
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
      ctx.font = "24px " + environment.fontFamily;
      var metrics = ctx.measureText(text);
      var w = metrics.width + 8;
      w = Math.pow(2, Math.ceil(Math.log(w) / Math.log(2)));
      var x = w / 2;
      var y = 16;
      canvas.width = w;
      ctx.font = "24px " + environment.fontFamily;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 6;
      ctx.lineJoin = 'round'; // Experiment with 'bevel' & 'round' for the effect you want!

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

  _proto.updateVisibility = function updateVisibility(visible) {
    this.mesh.visible = visible;
    this.sphere.freezed = !visible;

    if (!visible) {
      this.item.showPanel = false;
    }
  };

  _proto.setVisible = function setVisible(visible) {
    if (this.mesh) {
      this.mesh.visible = visible && !this.hidden_;
    }
  };

  _proto.onInit = function onInit() {
    _ModelEditableCompone.prototype.onInit.call(this);
  };

  _proto.onChanges = function onChanges() {
    this.mode = ModelNavComponent.getNavMode(this.item, this.view);
    this.editing = this.item.selected;
    this.hidden = this.isHidden;
  };

  _proto.onCreate = function onCreate(mount, dismount) {
    var _THREE$Vector,
        _this2 = this;

    // this.renderOrder = environment.renderOrder.nav;
    var mode = this.mode = ModelNavComponent.getNavMode(this.item, this.view);

    if (mode === NavModeType.None) {
      return;
    }

    var nav = new THREE.Group();

    var position = (_THREE$Vector = new THREE.Vector3()).set.apply(_THREE$Vector, this.item.position).normalize().multiplyScalar(ModelNavComponent.RADIUS);

    nav.position.set(position.x, position.y, position.z);
    this.onCreateSprites(nav);
    var geometry = Geometry.sphereGeometry;
    var sphere = this.sphere = new InteractiveMesh(geometry, new THREE.MeshBasicMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      opacity: 0.0,
      color: 0x00ffff
    }));
    sphere.name = "[nav] " + this.item.id; // sphere.lookAt(Host.origin); ??

    sphere.depthTest = false; // sphere.renderOrder = 0;

    nav.add(sphere);
    sphere.on('over', function () {
      // console.log('ModelNavComponent.over');

      /*
      if ((mode !== NavModeType.Move && mode !== NavModeType.Title) && !this.editing) {
      	this.over.next(this);
      }
      */
      _this2.over.next(_this2);

      var icon = _this2.icon;
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
      _this2.out.next(_this2);

      var icon = _this2.icon;
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
      _this2.down.next(_this2);
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
        _this2.materials.forEach(function (material) {
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

    var map = ModelNavComponent.getTexture(mode, this.item.important);
    var material = new THREE.SpriteMaterial({
      map: map,
      depthTest: false,
      depthWrite: false,
      transparent: true,
      sizeAttenuation: false,
      opacity: opacity // color: 0xff0000,

    });
    var materials = [material];
    var icon = this.icon = new THREE.Sprite(material);
    icon.renderOrder = environment.renderOrder.nav;
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

  _proto.onDragMove = function onDragMove(position, normal, spherical) {
    // console.log('ModelNavComponent.onDragMove', position, normal, spherical);
    if (spherical) {
      position.normalize().multiplyScalar(ModelNavComponent.RADIUS); // normal = cameraGroup?
    }

    this.editing = true;
    this.item.showPanel = false;
    this.mesh.position.set(position.x, position.y, position.z);
    this.updateHelper();
  } // called by WorldComponent
  ;

  _proto.onDragEnd = function onDragEnd() {
    this.item.position = new THREE.Vector3().copy(this.mesh.position).normalize().toArray();
    this.editing = false;
  };

  _createClass(ModelNavComponent, [{
    key: "hidden",
    get: function get() {
      return this.hidden_;
    },
    set: function set(hidden) {
      if (this.hidden_ !== hidden) {
        this.hidden_ = hidden;
        this.updateVisibility(!hidden);
      }
    }
  }, {
    key: "isHidden",
    get: function get() {
      return StateService.state.zoomedId != null || environment.flags.hideNavInfo && !this.editor && !StateService.state.showNavInfo && !(this.host.renderer.xr.isPresenting || StateService.state.role === RoleType.SelfService || StateService.state.role === RoleType.Embed) && this.mode === NavModeType.Info;
    }
  }]);

  return ModelNavComponent;
}(ModelEditableComponent);
ModelNavComponent.RADIUS = 100;
ModelNavComponent.meta = {
  selector: '[model-nav]',
  hosts: {
    host: WorldComponent
  },
  outputs: ['over', 'out', 'down'],
  inputs: ['item', 'view', 'editor']
};// import * as THREE from 'three';
var FreezableSprite = /*#__PURE__*/function (_THREE$Sprite) {
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
    key: "isInteractiveSprite",
    get: function get() {
      return true;
    }
  }, {
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
}(EmittableSprite);var ModelPanelComponent = /*#__PURE__*/function (_ModelComponent) {
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
            panel.lookAt(Host.origin);
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
    var selected = this.item.selected;
    this.editing = selected;

    if (this.mesh) {
      this.mesh.editing = selected;
    }
  };

  _proto.onCreate = function onCreate(mount, dismount) {
    var _this = this;

    var item = this.item;
    var view = this.view;
    var items = view.items;
    var geometry = Geometry.planeGeometry;
    this.onMeshDown = this.onMeshDown.bind(this);
    this.onMeshPlaying = this.onMeshPlaying.bind(this);
    this.onMeshZoomed = this.onMeshZoomed.bind(this);
    this.onMeshCurrentTime = this.onMeshCurrentTime.bind(this);
    var mesh;
    var subscription;
    MediaMesh.getStreamId$(item).pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (streamId) {
      // console.log('ModelPlaneComponent.onCreate.streamId', streamId);
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
          mesh = new MediaMesh(item, view, geometry, _this.host);
          mesh.updateFromItem(item);
          mesh.name = 'plane';
          mesh.load(function () {
            if (typeof mount === 'function') {
              mount(mesh, item);
            }

            subscription = mesh.events$().pipe(operators.takeUntil(_this.unsubscribe$)).subscribe(function () {});
          });

          _this.addMeshListeners(mesh);
        } else if (_this.mesh) {
          dismount(_this.mesh, item);
        } // console.log('streamId', streamId, mesh);

      }
    });
  };

  _proto.addMeshListeners = function addMeshListeners(mesh) {
    mesh.on('down', this.onMeshDown);
    mesh.on('playing', this.onMeshPlaying);
    mesh.on('zoomed', this.onMeshZoomed);
    mesh.on('currentTime', this.onMeshCurrentTime);
  };

  _proto.removeMeshListeners = function removeMeshListeners(mesh) {
    mesh.off('down', this.onMeshDown);
    mesh.off('playing', this.onMeshPlaying);
    mesh.off('zoomed', this.onMeshZoomed);
    mesh.off('currentTime', this.onMeshCurrentTime);
  };

  _proto.onMeshDown = function onMeshDown() {
    // console.log('ModelPanelComponent.onMeshDown');
    this.down.next(this);
  };

  _proto.onMeshPlaying = function onMeshPlaying(playing) {
    // console.log('ModelPanelComponent.playing', playing);
    this.play.next({
      itemId: this.item.id,
      playing: playing
    });
  };

  _proto.onMeshZoomed = function onMeshZoomed(zoomed) {
    // console.log('ModelPanelComponent.zoomed', zoomed);
    this.zoom.next({
      itemId: this.item.id,
      zoomed: zoomed
    });
  };

  _proto.onMeshCurrentTime = function onMeshCurrentTime(currentTime) {
    // console.log('ModelPanelComponent.playing', playing);
    this.currentTime.next({
      itemId: this.item.id,
      currentTime: currentTime
    });
  };

  _proto.onDestroy = function onDestroy() {
    // console.log('ModelPlaneComponent', this);
    _ModelEditableCompone.prototype.onDestroy.call(this);

    if (this.mesh) {
      this.removeMeshListeners(this.mesh);
      this.mesh.dispose();
    }
  } // called by UpdateViewItemComponent
  ;

  _proto.onUpdate = function onUpdate(item, mesh) {
    // console.log('ModelPlaneComponent.onUpdate', item);
    mesh.updateFromItem(item);
    this.updateHelper();
  } // called by UpdateViewItemComponent
  ;

  _proto.onUpdateAsset = function onUpdateAsset(item, mesh) {
    // console.log('ModelPlaneComponent.onUpdateAsset', item);
    mesh.updateByItem(item);
    MediaMesh.getStreamId$(item).pipe(operators.filter(function (streamId) {
      return streamId !== null;
    }), operators.take(1)).subscribe(function (streamId) {
      item.streamId = streamId;
      mesh.load(function () {// console.log('ModelPlaneComponent.mesh.load.complete');
      });
    });
  } // called by WorldComponent
  ;

  _proto.onDragMove = function onDragMove(position, normal, spherical) {
    // console.log('ModelPlaneComponent.onDragMove', position, normal, spherical);
    var item = this.item;
    var mesh = this.mesh;
    item.showPanel = false;
    this.editing = true;

    if (spherical) {
      position.normalize().multiplyScalar(20);
      mesh.position.set(position.x, position.y, position.z);
      mesh.lookAt(Host.origin);
    } else {
      mesh.position.set(0, 0, 0);
      mesh.lookAt(normal);
      mesh.position.set(position.x, position.y, position.z);
      mesh.position.add(normal.multiplyScalar(0.01));
    }

    this.updateHelper();
  } // called by WorldComponent
  ;

  _proto.onDragEnd = function onDragEnd() {
    // console.log('ModelPlaneComponent.onDragEnd');
    var item = this.item;
    var mesh = this.mesh;
    item.position = mesh.position.toArray();
    item.rotation = mesh.rotation.toArray();
    item.scale = mesh.scale.toArray();
    mesh.updateFromItem(item);
    this.editing = false;
  };

  return ModelPlaneComponent;
}(ModelEditableComponent);
ModelPlaneComponent.textures = {};
ModelPlaneComponent.meta = {
  selector: '[model-plane]',
  hosts: {
    host: WorldComponent
  },
  outputs: ['down', 'play', 'zoom', 'currentTime'],
  inputs: ['item', 'view']
};var LOADING_BANNER = {
  title: LabelPipe.transform('loading')
};
var WAITING_BANNER = {
  title: LabelPipe.transform('waiting_host')
};
var PANEL_RADIUS$1 = PANORAMA_RADIUS - 0.01;

var ModelProgressComponent = /*#__PURE__*/function (_ModelComponent) {
  _inheritsLoose(ModelProgressComponent, _ModelComponent);

  function ModelProgressComponent() {
    return _ModelComponent.apply(this, arguments) || this;
  }

  var _proto = ModelProgressComponent.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    this.title_ = '';
    this.visible_ = this.host.renderer.xr.isPresenting;

    _ModelComponent.prototype.onInit.call(this);

    var vrService = this.vrService = VRService.getService();
    vrService.session$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (session) {
      return _this.visible = session != null;
    }); // loose
    // this.progress = LoaderService.progress;
  };

  _proto.onCreate = function onCreate(mount, dismount) {
    var _this2 = this;

    // console.log('ModelProgressComponent.onCreate');
    this.getCanvasTexture().then(function (result) {
      var mesh = _this2.createMesh(result);

      if (typeof mount === 'function') {
        mount(mesh);
      }

      LoaderService.progress$.pipe(operators.takeUntil(_this2.unsubscribe$)).subscribe(function (progress) {
        if (progress.count) {
          _this2.title = progress.value === 0 ? LOADING_BANNER.title : progress.title;
        } else {
          _this2.title = _this2.getTitle();
        }
      });
    });
  };

  _proto.getTitle = function getTitle() {
    if (this.view && this.view.type.name === ViewType.WaitingRoom.name) {
      return WAITING_BANNER.title;
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
    this.mesh.remove(this.banner);
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
    var _this3 = this;

    this.getCanvasTexture().then(function (result) {
      // console.log('ModelProgressComponent.updateProgress', result);
      var arc = Math.PI / 180 * 360;
      var width = PANEL_RADIUS$1 * arc;
      var height = width / 360 * 2.4;
      var w = result.width * height / result.height;
      var repeat = width / w;
      _this3.texture.repeat.x = repeat;
    });
  };

  _proto.getCanvasTexture = function getCanvasTexture() {
    var _this4 = this;

    return new Promise(function (resolve, reject) {
      var MIN_W = 512;
      var W = MIN_W;
      var H = 64;
      var F = Math.floor(H * 0.75);
      var L = Math.floor(H * 0.05);
      var canvas;

      if (_this4.canvas) {
        canvas = _this4.canvas;
      } else {
        canvas = _this4.canvas = document.createElement('canvas'); // canvas.classList.add('canvas--debug');
        // document.querySelector('body').appendChild(canvas);
      }

      canvas.width = W;
      canvas.height = H;
      var text = _this4.title_; // console.log('ModelProgressComponent.getCanvasTexture', text);

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
      ctx.lineJoin = 'round'; // Experiment with 'bevel' & 'round' for the effect you want!

      ctx.miterLimit = 2;
      ctx.strokeText(text, W / 2, H / 2);
      ctx.fillStyle = 'white';
      ctx.fillText(text, W / 2, H / 2, W); // text.material.map.needsUpdate = true;

      var texture;

      if (_this4.texture) {
        texture = _this4.texture;
        texture.needsUpdate = true;
      } else {
        texture = _this4.texture = new THREE.CanvasTexture(canvas);
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

        if (title === WAITING_BANNER.title || title !== '' && this.visible_) {
          this.updateProgress();
          this.show();
        } else {
          this.hide();
        }
      }
    }
  }, {
    key: "visible",
    get: function get() {
      return this.visible_;
    },
    set: function set(visible) {
      if (this.visible_ !== visible) {
        this.visible_ = visible;

        if (visible && this.title_ !== '') {
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
    var _this = this;

    // console.log('ModelRoomComponent.onInit');
    _ModelComponent.prototype.onInit.call(this);

    this.isPresenting = false;
    MenuService.active$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (active) {
      return _this.freezed = active;
    });
  };

  _proto.onChanges = function onChanges() {
    this.editing = this.view.selected;
  };

  _proto.onCreate = function onCreate(mount, dismount) {
    var _this2 = this;

    // this.renderOrder = environment.renderOrder.room;
    this.loadGlb(environment.getPath(this.view.asset.folder), this.view.asset.file, function (mesh, animations) {
      _this2.onGlbLoaded(mesh, animations, mount, dismount);
    });
  } // onView() { const context = getContext(this); }
  // onChanges() {}
  ;

  _proto.loadGlb = function loadGlb(path, file, callback) {
    var renderer = this.host.renderer; // const roughnessMipmapper = new RoughnessMipmapper(renderer); // optional

    var progressRef = LoaderService.getRef(); // console.log('progressRef');

    var loader = new GLTFLoader().setPath(path); // Optional: Provide a DRACOLoader instance to decode compressed mesh data

    var decoderPath = environment.assets + "js/draco/"; // console.log(decoderPath);

    var dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(decoderPath);
    loader.setDRACOLoader(dracoLoader);
    loader.load(file, function (glb) {
      /*
      glb.scene.traverse((child) => {
      	if (child.isMesh) {
      		// roughnessMipmapper.generateMipmaps(child.material);
      	}
      });
      */
      if (typeof callback === 'function') {
        callback(glb.scene, glb.animations);
      } // console.log('ModelRoomComponent.loadGlb');


      LoaderService.setProgress(progressRef, 1); // roughnessMipmapper.dispose();
    }, function (progressEvent) {
      LoaderService.setProgress(progressRef, progressEvent.loaded, progressEvent.total);
    });
  };

  _proto.onGlbLoaded = function onGlbLoaded(mesh, animations, mount, dismount) {
    var _this3 = this;

    var view = this.view; // scale

    mesh.position.set(0, -1.76, 0); // nav

    var intersectObjects = [];
    mesh.traverse(function (child) {
      if (child.isMesh) {
        intersectObjects.push(child);
      }

      if (child.name === 'nav') {
        // child.parent.remove(child);
        view.navIntersectObjects = [child];

        _this3.makeTransparent(child);
      }
    });
    view.intersectObjects = intersectObjects; // animations

    var dummy;
    dummy = new THREE.Group();
    dummy.add(mesh);

    if (typeof mount === 'function') {
      mount(dummy, this.view);
    }
  };

  _proto.makeTransparent = function makeTransparent(object) {
    if (object.isMesh) {
      object.material = ModelRoomComponent.transparentMaterial;
    }

    object.traverse(function (child) {
      if (child.isMesh) {
        child.material = ModelRoomComponent.transparentMaterial;
      }
    });
  } // called by UpdateViewItemComponent
  ;

  _proto.onUpdateAsset = function onUpdateAsset(view, mesh) {
    var _this4 = this;

    // console.log('ModelRoomComponent.onUpdateAsset', view);
    this.loadGlb(environment.getPath(view.asset.folder), view.asset.file, function (mesh, animations) {
      _this4.onGlbLoaded(mesh, animations, function (mesh, view) {
        return _this4.onMount(mesh, view);
      }, function (mesh, view) {
        return _this4.onDismount(mesh, view);
      });
    });
  };

  _createClass(ModelRoomComponent, [{
    key: "freezed",
    get: function get() {
      return this.freezed_;
    },
    set: function set(freezed) {
      if (this.freezed_ !== freezed) {
        this.freezed_ = freezed;
        var mesh = this.mesh;

        if (mesh) {
          mesh.traverse(function (child) {
            if (child.isInteractiveMesh) {
              child.freezed = freezed;
            }
          });
        }
      }
    }
  }], [{
    key: "transparentMaterial",
    get: function get() {
      if (!this.transparentMaterial_) {
        this.transparentMaterial_ = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          transparent: true,
          opacity: 0 // side: THREE.DoubleSide

        });
      }

      return this.transparentMaterial_;
    }
  }]);

  return ModelRoomComponent;
}(ModelComponent);
ModelRoomComponent.meta = {
  selector: '[model-room]',
  hosts: {
    host: WorldComponent
  },
  inputs: ['view']
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
  declarations: [AccessCodeComponent, AccessComponent, AgoraChatComponent, AgoraCheckComponent, AgoraChecklistComponent, AgoraComponent, AgoraConfigureFirewallModalComponent, AgoraDeviceComponent, AgoraDevicePreviewComponent, AgoraLinkComponent, AgoraLoginComponent, AgoraNameComponent, AgoraStreamComponent, AssetPipe, ControlAssetComponent, ControlAssetsComponent, ControlCheckboxComponent, ControlCustomSelectComponent, ControlLinkComponent, ControlLocalizedAssetComponent, ControlMenuComponent, ControlModelComponent, ControlNumberComponent, ControlPasswordComponent, ControlRequestModalComponent, ControlsComponent, ControlSelectComponent, ControlTextareaComponent, ControlTextComponent, ControlVectorComponent, DisabledDirective, DropDirective, DropdownDirective, DropdownItemDirective, EnvPipe, ErrorsComponent, FlagPipe, HlsDirective, HtmlPipe, IdDirective, InputValueComponent, LabelPipe, LanguageComponent, LayoutComponent, LazyDirective, MediaPlayerComponent, ModalComponent, ModalOutletComponent, ModelBannerComponent, ModelComponent, ModelCurvedPlaneComponent, ModelDebugComponent, ModelGridComponent, ModelMenuComponent, ModelModelComponent, ModelNavComponent, ModelPanelComponent, ModelPictureComponent, ModelPlaneComponent, ModelProgressComponent, ModelRoomComponent, ModelTextComponent, SlugPipe, SvgIconStructure, TestComponent, TitleDirective, TryInARComponent, TryInARModalComponent, UploadItemComponent, ValueDirective, VirtualStructure, WorldComponent],
  bootstrap: AppComponent
};rxcomp.Browser.bootstrap(AppModule);})));