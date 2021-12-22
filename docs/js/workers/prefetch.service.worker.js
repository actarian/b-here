/**
 * @license b-here v1.0.0
 * (c) 2021 Luca Zampetti <lzampetti@gmail.com>
 * License: MIT
 */

(function(f){typeof define==='function'&&define.amd?define(f):f();}((function(){'use strict';function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}var PrefetchServiceWorkerEvent = {
  Progress: 'progress',
  Complete: 'complete'
};
var prefetched = {};
var controllers = {};

function sendMessage(type, assets, data) {
  self.postMessage({
    type: type,
    assets: assets,
    data: data
  });
}

function onMessage(event) {
  var id = event.data.id;
  var assets = event.data.assets; // console.log('PrefetchServiceWorker.onMessage', id, assets);

  if (!id) {
    return;
  }

  if (id && !assets) {
    var controller = controllers[id];

    if (controller) {
      // console.log('PrefetchServiceWorker.Aborting', id);
      controller.abort();
    }

    return;
  }

  if (!assets.length) {
    return;
  }

  if (typeof Promise === 'undefined') {
    return;
  }

  if (typeof fetch !== 'function') {
    return;
  }

  var options = {
    mode: 'cors' // no-cors, *cors, same-origin

  };

  if (self.AbortController) {
    var _controller = new AbortController();

    options.signal = _controller.signal;
    controllers[id] = _controller; // console.log('AbortController', id);
  }

  return PromiseAllProgress(assets.map(function (url) {
    return Prefetch(url, options);
  }), function (progress) {
    // console.log('PrefetchServiceWorker.onMessage.Progress', progress);
    sendMessage(PrefetchServiceWorkerEvent.Progress, assets, progress);
  }).then(function (_) {
    delete controllers[id]; // console.log('PrefetchServiceWorker.onMessage.Complete', assets);

    sendMessage(PrefetchServiceWorkerEvent.Complete, assets);
  }).catch(function (error) {
    console.log('PrefetchServiceWorker.onMessage.error', error);
  });
}

self.addEventListener('message', onMessage);

function Prefetch(url, options) {
  return new Promise(function (resolve, reject) {
    var resolved = prefetched[url];

    if (resolved) {
      resolve(url);
    } else {
      fetch(url, options).then(function (_) {
        prefetched[url] = true;
        resolve(url);
      }, function (error) {
        // console.log('PrefetchServiceWorker.Prefetch.error', error);
        reject(error);
      });
    }
  });
}

function PromiseAllProgress(promises, onProgress) {
  var total = promises.length;
  var loaded = 0;

  if (typeof onProgress === 'function') {
    onProgress({
      loaded: loaded,
      total: total
    });
  }

  for (var _iterator = _createForOfIteratorHelperLoose(promises), _step; !(_step = _iterator()).done;) {
    var promise = _step.value;
    promise.then(function () {
      loaded++;

      if (typeof onProgress === 'function') {
        onProgress({
          loaded: loaded,
          total: total
        });
      }
    });
  }

  return Promise.all(promises);
}})));