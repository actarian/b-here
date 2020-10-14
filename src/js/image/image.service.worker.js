const controllers = {};

function resize(src, blob, size) {
	if (!self.createImageBitmap || !self.OffscreenCanvas) {
		return response(src, blob);
	}
	self.createImageBitmap(blob).then(function(img) {
		const MAX_WIDTH = 320;
		const MAX_HEIGHT = 240;
		let width = img.width;
		let height = img.height;
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
		const canvas = new OffscreenCanvas(width, height);
		const ctx = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;
		ctx.drawImage(img, 0, 0, width, height);
		canvas.convertToBlob({ type: 'image/jpeg', quality: 0.9 }).then(function(resizedBlob) {
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

self.addEventListener('message', function(event) {
	const id = event.data.id;
	const src = event.data.src;
	const size = event.data.size;
	if (id && !src) {
		const controller = controllers[id];
		if (controller) {
			// console.log('Aborting', id);
			controller.abort();
		}
		return;
	}
	let options;
	if (typeof fetch === 'function') {
		if (self.AbortController) {
			const controller = new AbortController();
			options = {
				signal: controller.signal,
			};
			controllers[id] = controller;
			// console.log('AbortController', id);
		}
		const response = fetch(src, options)
			.then(function(response) {
				return response.blob();
			}, function(error) {
				console.log(error);
			})
			.then(function(blob) {
				delete controllers[id];
				if (typeof size === 'object') {
					resize(src, blob, size);
				} else {
					response(src, blob);
				}
			}, function(error) {
				console.log(error);
			});
	} else {
		const request = new XMLHttpRequest();
		request.open('GET', src);
		request.responseType = 'blob';
		request.onload = function() {
			if (request.status < 300) {
				if (typeof size === 'object') {
					resize(src, blob, size);
				} else {
					response(src, blob);
				}
			} else {
				// new Error('Image didn\'t load successfully; error code:' + request.statusText);
			}
		};
		request.onerror = function() {
			// new Error('There was a network error.');
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
*/
