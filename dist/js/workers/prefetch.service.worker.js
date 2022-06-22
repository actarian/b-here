/**
 * @license beta-bhere-development v1.0.13
 * (c) 2022 Luca Zampetti <lzampetti@gmail.com>
 * License: MIT
 */

(function(f){typeof define==='function'&&define.amd?define(f):f();})((function(){'use strict';const PrefetchServiceWorkerEvent = {
  Progress: 'progress',
  Complete: 'complete'
};
const prefetched = {};
const controllers = {};

function sendMessage(type, assets, data) {
  self.postMessage({
    type: type,
    assets: assets,
    data: data
  });
}

function onMessage(event) {
  const id = event.data.id;
  const assets = event.data.assets; // console.log('PrefetchServiceWorker.onMessage', id, assets);

  if (!id) {
    return;
  }

  if (id && !assets) {
    const controller = controllers[id];

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

  const options = {
    mode: 'cors' // no-cors, *cors, same-origin

  };

  if (self.AbortController) {
    const controller = new AbortController();
    options.signal = controller.signal;
    controllers[id] = controller; // console.log('AbortController', id);
  }

  return PromiseAllProgress(assets.map(url => Prefetch(url, options)), function (progress) {
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
  return new Promise((resolve, reject) => {
    const resolved = prefetched[url];

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
  const total = promises.length;
  let loaded = 0;

  if (typeof onProgress === 'function') {
    onProgress({
      loaded,
      total
    });
  }

  for (const promise of promises) {
    promise.then(() => {
      loaded++;

      if (typeof onProgress === 'function') {
        onProgress({
          loaded,
          total
        });
      }
    });
  }

  return Promise.all(promises);
}}));