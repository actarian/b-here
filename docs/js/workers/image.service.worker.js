/**
 * @license b-here v1.0.0
 * (c) 2020 Luca Zampetti <lzampetti@gmail.com>
 * License: MIT
 */

(function(f){typeof define==='function'&&define.amd?define(f):f();}((function(){'use strict';var controllers = {};

function resize(src, blob, size) {
  if (!self.createImageBitmap || !self.OffscreenCanvas) {
    return response(src, blob);
  }

  self.createImageBitmap(blob).then(function (img) {
    var MAX_WIDTH = 320;
    var MAX_HEIGHT = 240;
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

    var canvas = new OffscreenCanvas(width, height);
    var ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    canvas.convertToBlob({
      type: 'image/jpeg',
      quality: 0.9
    }).then(function (resizedBlob) {
      response(src, resizedBlob);
    });
  });
}

function response(src, blob) {
  self.postMessage({
    src: src,
    blob: blob
  });
}

self.addEventListener('message', function (event) {
  var id = event.data.id;
  var src = event.data.src;
  var size = event.data.size;

  if (id && !src) {
    var controller = controllers[id];

    if (controller) {
      // console.log('Aborting', id);
      controller.abort();
    }

    return;
  }

  var options;

  if (typeof fetch === 'function') {
    if (self.AbortController) {
      var _controller = new AbortController();

      options = {
        signal: _controller.signal
      };
      controllers[id] = _controller; // console.log('AbortController', id);
    }

    var _response = fetch(src, options).then(function (response) {
      return response.blob();
    }, function (error) {
      console.log(error);
    }).then(function (blob) {
      delete controllers[id];

      if (typeof size === 'object') {
        resize(src, blob);
      } else {
        _response(src, blob);
      }
    }, function (error) {
      console.log(error);
    });
  } else {
    var request = new XMLHttpRequest();
    request.open('GET', src);
    request.responseType = 'blob';

    request.onload = function () {
      if (request.status < 300) {
        if (typeof size === 'object') {
          resize(src, blob);
        } else {
          response(src, blob);
        }
      }
    };

    request.onerror = function () {// new Error('There was a network error.');
    };

    request.send();
  }
});
/*
self.addEventListener('message', function(event) {
	// console.log(event);
	const src = event.data;
	const response = fetch(src).then(function(response) {
		return response.blob();
	}).then(function(blob) {
		// Send the image data to the UI thread!
		self.postMessage({
			src: src,
			blob: blob,
		});
	});
});
*/})));