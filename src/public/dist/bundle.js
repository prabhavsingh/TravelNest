// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer,
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
        ? self
        : typeof window !== 'undefined'
          ? window
          : typeof global !== 'undefined'
            ? global
            : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject,
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = { __esModule: true };
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})(
  {
    lA1mH: [
      function (require, module, exports, __globalThis) {
        var HMR_HOST = null;
        var HMR_PORT = 1234;
        var HMR_SERVER_PORT = 1234;
        var HMR_SECURE = false;
        var HMR_ENV_HASH = 'cd78353694394c72';
        var HMR_USE_SSE = false;
        module.bundle.HMR_BUNDLE_ID = '9b1f54735c616a00';
        ('use strict');
        /* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
        var OldModule = module.bundle.Module;
        function Module(moduleName) {
          OldModule.call(this, moduleName);
          this.hot = {
            data: module.bundle.hotData[moduleName],
            _acceptCallbacks: [],
            _disposeCallbacks: [],
            accept: function (fn) {
              this._acceptCallbacks.push(fn || function () {});
            },
            dispose: function (fn) {
              this._disposeCallbacks.push(fn);
            },
          };
          module.bundle.hotData[moduleName] = undefined;
        }
        module.bundle.Module = Module;
        module.bundle.hotData = {};
        var checkedAssets /*: {|[string]: boolean|} */,
          disposedAssets /*: {|[string]: boolean|} */,
          assetsToDispose /*: Array<[ParcelRequire, string]> */,
          assetsToAccept /*: Array<[ParcelRequire, string]> */,
          bundleNotFound = false;
        function getHostname() {
          return (
            HMR_HOST ||
            (typeof location !== 'undefined' &&
            location.protocol.indexOf('http') === 0
              ? location.hostname
              : 'localhost')
          );
        }
        function getPort() {
          return (
            HMR_PORT ||
            (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT)
          );
        }
        // eslint-disable-next-line no-redeclare
        let WebSocket = globalThis.WebSocket;
        if (!WebSocket && typeof module.bundle.root === 'function')
          try {
            // eslint-disable-next-line no-global-assign
            WebSocket = module.bundle.root('ws');
          } catch {
            // ignore.
          }
        var hostname = getHostname();
        var port = getPort();
        var protocol =
          HMR_SECURE ||
          (typeof location !== 'undefined' &&
            location.protocol === 'https:' &&
            !['localhost', '127.0.0.1', '0.0.0.0'].includes(hostname))
            ? 'wss'
            : 'ws';
        // eslint-disable-next-line no-redeclare
        var parent = module.bundle.parent;
        if (!parent || !parent.isParcelRequire) {
          // Web extension context
          var extCtx =
            typeof browser === 'undefined'
              ? typeof chrome === 'undefined'
                ? null
                : chrome
              : browser;
          // Safari doesn't support sourceURL in error stacks.
          // eval may also be disabled via CSP, so do a quick check.
          var supportsSourceURL = false;
          try {
            (0, eval)('throw new Error("test"); //# sourceURL=test.js');
          } catch (err) {
            supportsSourceURL = err.stack.includes('test.js');
          }
          var ws;
          if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
          else
            try {
              // If we're running in the dev server's node runner, listen for messages on the parent port.
              let { workerData, parentPort } = module.bundle.root(
                'node:worker_threads',
              ); /*: any*/
              if (
                workerData !== null &&
                workerData !== void 0 &&
                workerData.__parcel
              ) {
                parentPort.on('message', async (message) => {
                  try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                  } catch {
                    parentPort.postMessage('restart');
                  }
                });
                // After the bundle has finished running, notify the dev server that the HMR update is complete.
                queueMicrotask(() => parentPort.postMessage('ready'));
              }
            } catch {
              if (typeof WebSocket !== 'undefined')
                try {
                  ws = new WebSocket(
                    protocol +
                      '://' +
                      hostname +
                      (port ? ':' + port : '') +
                      '/',
                  );
                } catch (err) {
                  // Ignore cloudflare workers error.
                  if (
                    err.message &&
                    !err.message.includes(
                      'Disallowed operation called within global scope',
                    )
                  )
                    console.error(err.message);
                }
            }
          if (ws) {
            // $FlowFixMe
            ws.onmessage = async function (event /*: {data: string, ...} */) {
              var data /*: HMRMessage */ = JSON.parse(event.data);
              await handleMessage(data);
            };
            if (ws instanceof WebSocket) {
              ws.onerror = function (e) {
                if (e.message) console.error(e.message);
              };
              ws.onclose = function () {
                console.warn(
                  '[parcel] \uD83D\uDEA8 Connection to the HMR server was lost',
                );
              };
            }
          }
        }
        async function handleMessage(data /*: HMRMessage */) {
          checkedAssets = {} /*: {|[string]: boolean|} */;
          disposedAssets = {} /*: {|[string]: boolean|} */;
          assetsToAccept = [];
          assetsToDispose = [];
          bundleNotFound = false;
          if (data.type === 'reload') fullReload();
          else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets;
            // Handle HMR Update
            let handled = assets.every((asset) => {
              return (
                asset.type === 'css' ||
                (asset.type === 'js' &&
                  hmrAcceptCheck(
                    module.bundle.root,
                    asset.id,
                    asset.depsByBundle,
                  ))
              );
            });
            // Dispatch a custom event in case a bundle was not found. This might mean
            // an asset on the server changed and we should reload the page. This event
            // gives the client an opportunity to refresh without losing state
            // (e.g. via React Server Components). If e.preventDefault() is not called,
            // we will trigger a full page reload.
            if (
              handled &&
              bundleNotFound &&
              assets.some((a) => a.envHash !== HMR_ENV_HASH) &&
              typeof window !== 'undefined' &&
              typeof CustomEvent !== 'undefined'
            )
              handled = !window.dispatchEvent(
                new CustomEvent('parcelhmrreload', {
                  cancelable: true,
                }),
              );
            if (handled) {
              console.clear();
              // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
              if (
                typeof window !== 'undefined' &&
                typeof CustomEvent !== 'undefined'
              )
                window.dispatchEvent(new CustomEvent('parcelhmraccept'));
              await hmrApplyUpdates(assets);
              hmrDisposeQueue();
              // Run accept callbacks. This will also re-execute other disposed assets in topological order.
              let processedAssets = {};
              for (let i = 0; i < assetsToAccept.length; i++) {
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                  hmrAccept(assetsToAccept[i][0], id);
                  processedAssets[id] = true;
                }
              }
            } else fullReload();
          }
          if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi) {
              let stack = ansiDiagnostic.codeframe
                ? ansiDiagnostic.codeframe
                : ansiDiagnostic.stack;
              console.error(
                '\uD83D\uDEA8 [parcel]: ' +
                  ansiDiagnostic.message +
                  '\n' +
                  stack +
                  '\n\n' +
                  ansiDiagnostic.hints.join('\n'),
              );
            }
            if (typeof document !== 'undefined') {
              // Render the fancy html overlay
              removeErrorOverlay();
              var overlay = createErrorOverlay(data.diagnostics.html);
              // $FlowFixMe
              document.body.appendChild(overlay);
            }
          }
        }
        function removeErrorOverlay() {
          var overlay = document.getElementById(OVERLAY_ID);
          if (overlay) {
            overlay.remove();
            console.log('[parcel] \u2728 Error resolved');
          }
        }
        function createErrorOverlay(diagnostics) {
          var overlay = document.createElement('div');
          overlay.id = OVERLAY_ID;
          let errorHTML =
            '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
          for (let diagnostic of diagnostics) {
            let stack = diagnostic.frames.length
              ? diagnostic.frames.reduce((p, frame) => {
                  return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
                }, '')
              : diagnostic.stack;
            errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint) => '<div>\uD83D\uDCA1 ' + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
          }
          errorHTML += '</div>';
          overlay.innerHTML = errorHTML;
          return overlay;
        }
        function fullReload() {
          if (typeof location !== 'undefined' && 'reload' in location)
            location.reload();
          else if (
            typeof extCtx !== 'undefined' &&
            extCtx &&
            extCtx.runtime &&
            extCtx.runtime.reload
          )
            extCtx.runtime.reload();
          else
            try {
              let { workerData, parentPort } = module.bundle.root(
                'node:worker_threads',
              ); /*: any*/
              if (
                workerData !== null &&
                workerData !== void 0 &&
                workerData.__parcel
              )
                parentPort.postMessage('restart');
            } catch (err) {
              console.error(
                '[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.',
              );
            }
        }
        function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
          var modules = bundle.modules;
          if (!modules) return [];
          var parents = [];
          var k, d, dep;
          for (k in modules)
            for (d in modules[k][1]) {
              dep = modules[k][1][d];
              if (
                dep === id ||
                (Array.isArray(dep) && dep[dep.length - 1] === id)
              )
                parents.push([bundle, k]);
            }
          if (bundle.parent)
            parents = parents.concat(getParents(bundle.parent, id));
          return parents;
        }
        function updateLink(link) {
          var href = link.getAttribute('href');
          if (!href) return;
          var newLink = link.cloneNode();
          newLink.onload = function () {
            if (link.parentNode !== null)
              // $FlowFixMe
              link.parentNode.removeChild(link);
          };
          newLink.setAttribute(
            'href', // $FlowFixMe
            href.split('?')[0] + '?' + Date.now(),
          );
          // $FlowFixMe
          link.parentNode.insertBefore(newLink, link.nextSibling);
        }
        var cssTimeout = null;
        function reloadCSS() {
          if (cssTimeout || typeof document === 'undefined') return;
          cssTimeout = setTimeout(function () {
            var links = document.querySelectorAll('link[rel="stylesheet"]');
            for (var i = 0; i < links.length; i++) {
              // $FlowFixMe[incompatible-type]
              var href /*: string */ = links[i].getAttribute('href');
              var hostname = getHostname();
              var servedFromHMRServer =
                hostname === 'localhost'
                  ? new RegExp(
                      '^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' +
                        getPort(),
                    ).test(href)
                  : href.indexOf(hostname + ':' + getPort());
              var absolute =
                /^https?:\/\//i.test(href) &&
                href.indexOf(location.origin) !== 0 &&
                !servedFromHMRServer;
              if (!absolute) updateLink(links[i]);
            }
            cssTimeout = null;
          }, 50);
        }
        function hmrDownload(asset) {
          if (asset.type === 'js') {
            if (typeof document !== 'undefined') {
              let script = document.createElement('script');
              script.src = asset.url + '?t=' + Date.now();
              if (asset.outputFormat === 'esmodule') script.type = 'module';
              return new Promise((resolve, reject) => {
                var _document$head;
                script.onload = () => resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null ||
                  _document$head === void 0 ||
                  _document$head.appendChild(script);
              });
            } else if (typeof importScripts === 'function') {
              // Worker scripts
              if (asset.outputFormat === 'esmodule')
                return import(asset.url + '?t=' + Date.now());
              else
                return new Promise((resolve, reject) => {
                  try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                  } catch (err) {
                    reject(err);
                  }
                });
            }
          }
        }
        async function hmrApplyUpdates(assets) {
          global.parcelHotUpdate = Object.create(null);
          let scriptsToRemove;
          try {
            // If sourceURL comments aren't supported in eval, we need to load
            // the update from the dev server over HTTP so that stack traces
            // are correct in errors/logs. This is much slower than eval, so
            // we only do it if needed (currently just Safari).
            // https://bugs.webkit.org/show_bug.cgi?id=137297
            // This path is also taken if a CSP disallows eval.
            if (!supportsSourceURL) {
              let promises = assets.map((asset) => {
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null ||
                  _hmrDownload === void 0
                  ? void 0
                  : _hmrDownload.catch((err) => {
                      // Web extension fix
                      if (
                        extCtx &&
                        extCtx.runtime &&
                        extCtx.runtime.getManifest().manifest_version == 3 &&
                        typeof ServiceWorkerGlobalScope != 'undefined' &&
                        global instanceof ServiceWorkerGlobalScope
                      ) {
                        extCtx.runtime.reload();
                        return;
                      }
                      throw err;
                    });
              });
              scriptsToRemove = await Promise.all(promises);
            }
            assets.forEach(function (asset) {
              hmrApply(module.bundle.root, asset);
            });
          } finally {
            delete global.parcelHotUpdate;
            if (scriptsToRemove)
              scriptsToRemove.forEach((script) => {
                if (script) {
                  var _document$head2;
                  (_document$head2 = document.head) === null ||
                    _document$head2 === void 0 ||
                    _document$head2.removeChild(script);
                }
              });
          }
        }
        function hmrApply(bundle /*: ParcelRequire */, asset /*:  HMRAsset */) {
          var modules = bundle.modules;
          if (!modules) return;
          if (asset.type === 'css') reloadCSS();
          else if (asset.type === 'js') {
            let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
            if (deps) {
              if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for (let dep in oldDeps)
                  if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                  }
              }
              if (supportsSourceURL)
                // Global eval. We would use `new Function` here but browser
                // support for source maps is better with eval.
                (0, eval)(asset.output);
              // $FlowFixMe
              let fn = global.parcelHotUpdate[asset.id];
              modules[asset.id] = [fn, deps];
            }
            // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
            // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
            if (bundle.parent) hmrApply(bundle.parent, asset);
          }
        }
        function hmrDelete(bundle, id) {
          let modules = bundle.modules;
          if (!modules) return;
          if (modules[id]) {
            // Collect dependencies that will become orphaned when this module is deleted.
            let deps = modules[id][1];
            let orphans = [];
            for (let dep in deps) {
              let parents = getParents(module.bundle.root, deps[dep]);
              if (parents.length === 1) orphans.push(deps[dep]);
            }
            // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
            delete modules[id];
            delete bundle.cache[id];
            // Now delete the orphans.
            orphans.forEach((id) => {
              hmrDelete(module.bundle.root, id);
            });
          } else if (bundle.parent) hmrDelete(bundle.parent, id);
        }
        function hmrAcceptCheck(
          bundle /*: ParcelRequire */,
          id /*: string */,
          depsByBundle /*: ?{ [string]: { [string]: string } }*/,
        ) {
          checkedAssets = {};
          if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
          // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
          let parents = getParents(module.bundle.root, id);
          let accepted = false;
          while (parents.length > 0) {
            let v = parents.shift();
            let a = hmrAcceptCheckOne(v[0], v[1], null);
            if (a)
              // If this parent accepts, stop traversing upward, but still consider siblings.
              accepted = true;
            else if (a !== null) {
              // Otherwise, queue the parents in the next level upward.
              let p = getParents(module.bundle.root, v[1]);
              if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
              }
              parents.push(...p);
            }
          }
          return accepted;
        }
        function hmrAcceptCheckOne(
          bundle /*: ParcelRequire */,
          id /*: string */,
          depsByBundle /*: ?{ [string]: { [string]: string } }*/,
        ) {
          var modules = bundle.modules;
          if (!modules) return;
          if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
            // If we reached the root bundle without finding where the asset should go,
            // there's nothing to do. Mark as "accepted" so we don't reload the page.
            if (!bundle.parent) {
              bundleNotFound = true;
              return true;
            }
            return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
          }
          if (checkedAssets[id]) return null;
          checkedAssets[id] = true;
          var cached = bundle.cache[id];
          if (!cached) return true;
          assetsToDispose.push([bundle, id]);
          if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
            assetsToAccept.push([bundle, id]);
            return true;
          }
          return false;
        }
        function hmrDisposeQueue() {
          // Dispose all old assets.
          for (let i = 0; i < assetsToDispose.length; i++) {
            let id = assetsToDispose[i][1];
            if (!disposedAssets[id]) {
              hmrDispose(assetsToDispose[i][0], id);
              disposedAssets[id] = true;
            }
          }
          assetsToDispose = [];
        }
        function hmrDispose(bundle /*: ParcelRequire */, id /*: string */) {
          var cached = bundle.cache[id];
          bundle.hotData[id] = {};
          if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
          if (cached && cached.hot && cached.hot._disposeCallbacks.length)
            cached.hot._disposeCallbacks.forEach(function (cb) {
              cb(bundle.hotData[id]);
            });
          delete bundle.cache[id];
        }
        function hmrAccept(bundle /*: ParcelRequire */, id /*: string */) {
          // Execute the module.
          bundle(id);
          // Run the accept callbacks in the new version of the module.
          var cached = bundle.cache[id];
          if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
            let assetsToAlsoAccept = [];
            cached.hot._acceptCallbacks.forEach(function (cb) {
              let additionalAssets = cb(function () {
                return getParents(module.bundle.root, id);
              });
              if (Array.isArray(additionalAssets) && additionalAssets.length)
                assetsToAlsoAccept.push(...additionalAssets);
            });
            if (assetsToAlsoAccept.length) {
              let handled = assetsToAlsoAccept.every(function (a) {
                return hmrAcceptCheck(a[0], a[1]);
              });
              if (!handled) return fullReload();
              hmrDisposeQueue();
            }
          }
        }
      },
      {},
    ],
    '5HOeo': [
      function (require, module, exports, __globalThis) {
        /*eslint-disable*/ var _esRegexpFlagsJs = require('core-js/modules/es.regexp.flags.js');
        var _regeneratorRuntime = require('regenerator-runtime');
        var _login = require('./login.js');
        var _updateSettings = require('./updateSettings.js');
        var _stripeJs = require('./stripe.js');
        var _mapJs = require('./map.js');
        const mapTiler = document.getElementById('map');
        const loginForm = document.querySelector('.form--login');
        const logOutBtn = document.querySelector('.nav__el--logout');
        const userDataForm = document.querySelector('.form-user-data');
        const userPasswordForm = document.querySelector('.form-user-password');
        const bookBtn = document.getElementById('book-tour');
        const signupForm = document.querySelector('.form--signup');
        const forgotPasswordForm = document.querySelector(
          '.form--forgot--password',
        );
        const resetPasswordForm = document.querySelector(
          '.form--reset--password',
        );
        if (mapTiler) {
          const locations = JSON.parse(mapTiler.dataset.locations);
          (0, _mapJs.displayMap)(locations);
        }
        if (loginForm)
          loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            (0, _login.login)(email, password);
          });
        if (logOutBtn) logOutBtn.addEventListener('click', (0, _login.logout));
        if (forgotPasswordForm)
          forgotPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const resetBtn = document.querySelector('.btn--reset');
            resetBtn.disabled = true;
            resetBtn.textContent = 'Processing...';
            const email = document.getElementById('email').value;
            try {
              await (0, _login.forgotPassword)(email);
              let time = 60;
              const countdown = setInterval(() => {
                time--;
                document.querySelector('.btn--reset').textContent =
                  `Try Again in ${time} sec`;
                if (time === 0) {
                  clearInterval(countdown);
                  resetBtn.disabled = false;
                  resetBtn.textContent = `Reset Password`;
                }
              }, 1000);
            } catch (error) {
              resetBtn.disabled = false;
              resetBtn.textContent = `Reset Password`;
            }
          });
        if (resetPasswordForm)
          resetPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const resetBtn = document.querySelector('.btn--reset');
            resetBtn.textContent = 'Updating...';
            const password = document.getElementById('password').value;
            const passwordConfirm =
              document.getElementById('password-confirm').value;
            const resetToken = resetBtn.dataset.resetToken;
            try {
              await (0, _login.resetPassword)(
                password,
                passwordConfirm,
                resetToken,
              );
              resetBtn.textContent = `Done`;
            } catch (error) {
              resetBtn.disabled = false;
              resetBtn.textContent = 'Save Password';
            }
          });
        if (signupForm)
          signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const passwordConfirm =
              document.getElementById('password-confirm').value;
            (0, _login.signup)(name, email, password, passwordConfirm);
          });
        if (userDataForm)
          userDataForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const form = new FormData();
            form.append('name', document.getElementById('name').value);
            form.append('email', document.getElementById('email').value);
            form.append('photo', document.getElementById('photo').files[0]);
            // console.log('form', [...form]);
            (0, _updateSettings.updateSettings)(form, 'data');
          });
        if (userPasswordForm)
          userPasswordForm.addEventListener('submit', async (e) => {
            document.querySelector('.btn--save-password').textContent =
              'Updating...';
            e.preventDefault();
            const passwordCurrent =
              document.getElementById('password-current').value;
            const password = document.getElementById('password').value;
            const passwordConfirm =
              document.getElementById('password-confirm').value;
            await (0, _updateSettings.updateSettings)(
              {
                passwordCurrent,
                password,
                passwordConfirm,
              },
              'password',
            );
            document.querySelector('.btn--save-password').textContent =
              'SAVE PASSWORD';
            document.getElementById('password-current').value = '';
            document.getElementById('password').value = '';
            document.getElementById('password-confirm').value = '';
          });
        if (bookBtn)
          bookBtn.addEventListener('click', (e) => {
            e.target.textContent = 'Processing...';
            const { tourId } = e.target.dataset;
            (0, _stripeJs.bookTour)(tourId);
          });
      },
      {
        'core-js/modules/es.regexp.flags.js': '47wCA',
        'regenerator-runtime': 'regenerator-runtime',
        './login': 'bQhka',
        './updateSettings': 'g29u6',
        './stripe.js': 'aGnSy',
        './map.js': 'dqoc8',
      },
    ],
    '47wCA': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var DESCRIPTORS = require('32574bd865b8e6e5');
        var defineBuiltInAccessor = require('ba3ead2b02aa5c9b');
        var regExpFlagsDetection = require('96553d00a5729583');
        var regExpFlagsGetterImplementation = require('67e6b6bed174b69b');
        // `RegExp.prototype.flags` getter
        // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
        if (DESCRIPTORS && !regExpFlagsDetection.correct) {
          defineBuiltInAccessor(RegExp.prototype, 'flags', {
            configurable: true,
            get: regExpFlagsGetterImplementation,
          });
          regExpFlagsDetection.correct = true;
        }
      },
      {
        '32574bd865b8e6e5': '8cznx',
        ba3ead2b02aa5c9b: 'fEBtW',
        '96553d00a5729583': 'jnY4D',
        '67e6b6bed174b69b': 'gJReE',
      },
    ],
    '8cznx': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var fails = require('735b783268fd06c0');
        // Detect IE8's incomplete defineProperty implementation
        module.exports = !fails(function () {
          // eslint-disable-next-line es/no-object-defineproperty -- required for testing
          return (
            Object.defineProperty({}, 1, {
              get: function () {
                return 7;
              },
            })[1] !== 7
          );
        });
      },
      { '735b783268fd06c0': '9S7uI' },
    ],
    '9S7uI': [
      function (require, module, exports, __globalThis) {
        'use strict';
        module.exports = function (exec) {
          try {
            return !!exec();
          } catch (error) {
            return true;
          }
        };
      },
      {},
    ],
    fEBtW: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var makeBuiltIn = require('5bd1cd8472955124');
        var defineProperty = require('1413185c6323bbbc');
        module.exports = function (target, name, descriptor) {
          if (descriptor.get)
            makeBuiltIn(descriptor.get, name, {
              getter: true,
            });
          if (descriptor.set)
            makeBuiltIn(descriptor.set, name, {
              setter: true,
            });
          return defineProperty.f(target, name, descriptor);
        };
      },
      { '5bd1cd8472955124': '8EcBZ', '1413185c6323bbbc': 'ljmsG' },
    ],
    '8EcBZ': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var uncurryThis = require('ca84677f1ebd1804');
        var fails = require('13360f2842eba261');
        var isCallable = require('103e488c0928755a');
        var hasOwn = require('cbf9b0e0779cc368');
        var DESCRIPTORS = require('3f2eb7efeae2f72b');
        var CONFIGURABLE_FUNCTION_NAME =
          require('548b10f284264c72').CONFIGURABLE;
        var inspectSource = require('358f00f3103bd55b');
        var InternalStateModule = require('9b2ce14119fd2412');
        var enforceInternalState = InternalStateModule.enforce;
        var getInternalState = InternalStateModule.get;
        var $String = String;
        // eslint-disable-next-line es/no-object-defineproperty -- safe
        var defineProperty = Object.defineProperty;
        var stringSlice = uncurryThis(''.slice);
        var replace = uncurryThis(''.replace);
        var join = uncurryThis([].join);
        var CONFIGURABLE_LENGTH =
          DESCRIPTORS &&
          !fails(function () {
            return (
              defineProperty(function () {}, 'length', {
                value: 8,
              }).length !== 8
            );
          });
        var TEMPLATE = String(String).split('String');
        var makeBuiltIn = (module.exports = function (value, name, options) {
          if (stringSlice($String(name), 0, 7) === 'Symbol(')
            name =
              '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
          if (options && options.getter) name = 'get ' + name;
          if (options && options.setter) name = 'set ' + name;
          if (
            !hasOwn(value, 'name') ||
            (CONFIGURABLE_FUNCTION_NAME && value.name !== name)
          ) {
            if (DESCRIPTORS)
              defineProperty(value, 'name', {
                value: name,
                configurable: true,
              });
            else value.name = name;
          }
          if (
            CONFIGURABLE_LENGTH &&
            options &&
            hasOwn(options, 'arity') &&
            value.length !== options.arity
          )
            defineProperty(value, 'length', {
              value: options.arity,
            });
          try {
            if (
              options &&
              hasOwn(options, 'constructor') &&
              options.constructor
            ) {
              if (DESCRIPTORS)
                defineProperty(value, 'prototype', {
                  writable: false,
                });
            } else if (value.prototype) value.prototype = undefined;
          } catch (error) {}
          var state = enforceInternalState(value);
          if (!hasOwn(state, 'source'))
            state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
          return value;
        });
        // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
        // eslint-disable-next-line no-extend-native -- required
        Function.prototype.toString = makeBuiltIn(function toString() {
          return (
            (isCallable(this) && getInternalState(this).source) ||
            inspectSource(this)
          );
        }, 'toString');
      },
      {
        ca84677f1ebd1804: '3irWI',
        '13360f2842eba261': '9S7uI',
        '103e488c0928755a': '2SpJA',
        cbf9b0e0779cc368: 'dB2o8',
        '3f2eb7efeae2f72b': '8cznx',
        '548b10f284264c72': '8BT3y',
        '358f00f3103bd55b': 'ghc92',
        '9b2ce14119fd2412': 'afnsD',
      },
    ],
    '3irWI': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var NATIVE_BIND = require('829dd7a4e960cf9e');
        var FunctionPrototype = Function.prototype;
        var call = FunctionPrototype.call;
        // eslint-disable-next-line es/no-function-prototype-bind -- safe
        var uncurryThisWithBind =
          NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
        module.exports = NATIVE_BIND
          ? uncurryThisWithBind
          : function (fn) {
              return function () {
                return call.apply(fn, arguments);
              };
            };
      },
      { '829dd7a4e960cf9e': 'bYKk6' },
    ],
    bYKk6: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var fails = require('2642aa7619056f20');
        module.exports = !fails(function () {
          // eslint-disable-next-line es/no-function-prototype-bind -- safe
          var test = function () {}.bind();
          // eslint-disable-next-line no-prototype-builtins -- safe
          return typeof test != 'function' || test.hasOwnProperty('prototype');
        });
      },
      { '2642aa7619056f20': '9S7uI' },
    ],
    '2SpJA': [
      function (require, module, exports, __globalThis) {
        'use strict';
        // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
        var documentAll = typeof document == 'object' && document.all;
        // `IsCallable` abstract operation
        // https://tc39.es/ecma262/#sec-iscallable
        // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
        module.exports =
          typeof documentAll == 'undefined' && documentAll !== undefined
            ? function (argument) {
                return (
                  typeof argument == 'function' || argument === documentAll
                );
              }
            : function (argument) {
                return typeof argument == 'function';
              };
      },
      {},
    ],
    dB2o8: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var uncurryThis = require('f5dcaa60a713971f');
        var toObject = require('ab17c4f45fcf0841');
        var hasOwnProperty = uncurryThis({}.hasOwnProperty);
        // `HasOwnProperty` abstract operation
        // https://tc39.es/ecma262/#sec-hasownproperty
        // eslint-disable-next-line es/no-object-hasown -- safe
        module.exports =
          Object.hasOwn ||
          function hasOwn(it, key) {
            return hasOwnProperty(toObject(it), key);
          };
      },
      { f5dcaa60a713971f: '3irWI', ab17c4f45fcf0841: '6EWNy' },
    ],
    '6EWNy': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var requireObjectCoercible = require('f45a7b5dcdc4a410');
        var $Object = Object;
        // `ToObject` abstract operation
        // https://tc39.es/ecma262/#sec-toobject
        module.exports = function (argument) {
          return $Object(requireObjectCoercible(argument));
        };
      },
      { f45a7b5dcdc4a410: '9MERL' },
    ],
    '9MERL': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var isNullOrUndefined = require('74607922ed30019f');
        var $TypeError = TypeError;
        // `RequireObjectCoercible` abstract operation
        // https://tc39.es/ecma262/#sec-requireobjectcoercible
        module.exports = function (it) {
          if (isNullOrUndefined(it))
            throw new $TypeError("Can't call method on " + it);
          return it;
        };
      },
      { '74607922ed30019f': 'hLgr3' },
    ],
    hLgr3: [
      function (require, module, exports, __globalThis) {
        'use strict';
        // we can't use just `it == null` since of `document.all` special case
        // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
        module.exports = function (it) {
          return it === null || it === undefined;
        };
      },
      {},
    ],
    '8BT3y': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var DESCRIPTORS = require('8ad2bacb0e20b95c');
        var hasOwn = require('4eabfd8f83afc9d5');
        var FunctionPrototype = Function.prototype;
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
        var EXISTS = hasOwn(FunctionPrototype, 'name');
        // additional protection from minified / mangled / dropped function names
        var PROPER = EXISTS && function something() {}.name === 'something';
        var CONFIGURABLE =
          EXISTS &&
          (!DESCRIPTORS ||
            (DESCRIPTORS &&
              getDescriptor(FunctionPrototype, 'name').configurable));
        module.exports = {
          EXISTS: EXISTS,
          PROPER: PROPER,
          CONFIGURABLE: CONFIGURABLE,
        };
      },
      { '8ad2bacb0e20b95c': '8cznx', '4eabfd8f83afc9d5': 'dB2o8' },
    ],
    ghc92: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var uncurryThis = require('26e26db98367212e');
        var isCallable = require('40ed9a4f6ae66648');
        var store = require('485d48d6f4c6739e');
        var functionToString = uncurryThis(Function.toString);
        // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
        if (!isCallable(store.inspectSource))
          store.inspectSource = function (it) {
            return functionToString(it);
          };
        module.exports = store.inspectSource;
      },
      {
        '26e26db98367212e': '3irWI',
        '40ed9a4f6ae66648': '2SpJA',
        '485d48d6f4c6739e': 'jE8ol',
      },
    ],
    jE8ol: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var IS_PURE = require('7b43004672b1879f');
        var globalThis = require('bc8329e77dc2c1cc');
        var defineGlobalProperty = require('dfb72a1d809f7b02');
        var SHARED = '__core-js_shared__';
        var store = (module.exports =
          globalThis[SHARED] || defineGlobalProperty(SHARED, {}));
        (store.versions || (store.versions = [])).push({
          version: '3.49.0',
          mode: IS_PURE ? 'pure' : 'global',
          copyright:
            '\xa9 2013\u20132025 Denis Pushkarev (zloirock.ru), 2025\u20132026 CoreJS Company (core-js.io). All rights reserved.',
          license: 'https://github.com/zloirock/core-js/blob/v3.49.0/LICENSE',
          source: 'https://github.com/zloirock/core-js',
        });
      },
      {
        '7b43004672b1879f': 'fv9ir',
        bc8329e77dc2c1cc: 'k0NSR',
        dfb72a1d809f7b02: '73gc8',
      },
    ],
    fv9ir: [
      function (require, module, exports, __globalThis) {
        'use strict';
        module.exports = false;
      },
      {},
    ],
    k0NSR: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var check = function (it) {
          return it && it.Math === Math && it;
        };
        // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
        module.exports = // eslint-disable-next-line es/no-global-this -- safe
          check(typeof globalThis == 'object' && globalThis) ||
          check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
          check(typeof self == 'object' && self) ||
          check(typeof global == 'object' && global) ||
          check(typeof this == 'object' && this) || // eslint-disable-next-line no-new-func -- fallback
          (function () {
            return this;
          })() ||
          Function('return this')();
      },
      {},
    ],
    '73gc8': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var globalThis = require('2d1c29655635b9ea');
        // eslint-disable-next-line es/no-object-defineproperty -- safe
        var defineProperty = Object.defineProperty;
        module.exports = function (key, value) {
          try {
            defineProperty(globalThis, key, {
              value: value,
              configurable: true,
              writable: true,
            });
          } catch (error) {
            globalThis[key] = value;
          }
          return value;
        };
      },
      { '2d1c29655635b9ea': 'k0NSR' },
    ],
    afnsD: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var NATIVE_WEAK_MAP = require('d3f0c9f3327b2fd6');
        var globalThis = require('28c3574d0c39fe7e');
        var isObject = require('f82e6cc0ac249fa5');
        var createNonEnumerableProperty = require('c0ae163eea4ef97');
        var hasOwn = require('6dea7358344877bb');
        var shared = require('3e035a1241da2f0');
        var sharedKey = require('88d6ccc27e779e5a');
        var hiddenKeys = require('d40b9b3abdbb956e');
        var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
        var TypeError = globalThis.TypeError;
        var WeakMap = globalThis.WeakMap;
        var set, get, has;
        var enforce = function (it) {
          return has(it) ? get(it) : set(it, {});
        };
        var getterFor = function (TYPE) {
          return function (it) {
            var state;
            if (!isObject(it) || (state = get(it)).type !== TYPE)
              throw new TypeError(
                'Incompatible receiver, ' + TYPE + ' required',
              );
            return state;
          };
        };
        if (NATIVE_WEAK_MAP || shared.state) {
          var store = shared.state || (shared.state = new WeakMap());
          /* eslint-disable no-self-assign -- prototype methods protection */ store.get =
            store.get;
          store.has = store.has;
          store.set = store.set;
          /* eslint-enable no-self-assign -- prototype methods protection */ set =
            function (it, metadata) {
              if (store.has(it))
                throw new TypeError(OBJECT_ALREADY_INITIALIZED);
              metadata.facade = it;
              store.set(it, metadata);
              return metadata;
            };
          get = function (it) {
            return store.get(it) || {};
          };
          has = function (it) {
            return store.has(it);
          };
        } else {
          var STATE = sharedKey('state');
          hiddenKeys[STATE] = true;
          set = function (it, metadata) {
            if (hasOwn(it, STATE))
              throw new TypeError(OBJECT_ALREADY_INITIALIZED);
            metadata.facade = it;
            createNonEnumerableProperty(it, STATE, metadata);
            return metadata;
          };
          get = function (it) {
            return hasOwn(it, STATE) ? it[STATE] : {};
          };
          has = function (it) {
            return hasOwn(it, STATE);
          };
        }
        module.exports = {
          set: set,
          get: get,
          has: has,
          enforce: enforce,
          getterFor: getterFor,
        };
      },
      {
        d3f0c9f3327b2fd6: 'fghzX',
        '28c3574d0c39fe7e': 'k0NSR',
        f82e6cc0ac249fa5: 'dFxJ3',
        c0ae163eea4ef97: '4bM1G',
        '6dea7358344877bb': 'dB2o8',
        '3e035a1241da2f0': 'jE8ol',
        '88d6ccc27e779e5a': '3dbjj',
        d40b9b3abdbb956e: '9xq0k',
      },
    ],
    fghzX: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var globalThis = require('8b1a8c1dbfd18eb5');
        var isCallable = require('aa77fff8d5ef0565');
        var WeakMap = globalThis.WeakMap;
        module.exports =
          isCallable(WeakMap) && /native code/.test(String(WeakMap));
      },
      { '8b1a8c1dbfd18eb5': 'k0NSR', aa77fff8d5ef0565: '2SpJA' },
    ],
    dFxJ3: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var isCallable = require('f87cee1cb79cbcca');
        module.exports = function (it) {
          return typeof it == 'object' ? it !== null : isCallable(it);
        };
      },
      { f87cee1cb79cbcca: '2SpJA' },
    ],
    '4bM1G': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var DESCRIPTORS = require('a8753383ef98ee18');
        var definePropertyModule = require('189ab650b8f71085');
        var createPropertyDescriptor = require('1168c8162aa30435');
        module.exports = DESCRIPTORS
          ? function (object, key, value) {
              return definePropertyModule.f(
                object,
                key,
                createPropertyDescriptor(1, value),
              );
            }
          : function (object, key, value) {
              object[key] = value;
              return object;
            };
      },
      {
        a8753383ef98ee18: '8cznx',
        '189ab650b8f71085': 'ljmsG',
        '1168c8162aa30435': '1QUaS',
      },
    ],
    ljmsG: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var DESCRIPTORS = require('ca50eb9163928400');
        var IE8_DOM_DEFINE = require('d482f9e5478795e8');
        var V8_PROTOTYPE_DEFINE_BUG = require('b6ad7537efb06f4b');
        var anObject = require('16365a73399e7fe7');
        var toPropertyKey = require('fab1d366c47796d9');
        var $TypeError = TypeError;
        // eslint-disable-next-line es/no-object-defineproperty -- safe
        var $defineProperty = Object.defineProperty;
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        var ENUMERABLE = 'enumerable';
        var CONFIGURABLE = 'configurable';
        var WRITABLE = 'writable';
        // `Object.defineProperty` method
        // https://tc39.es/ecma262/#sec-object.defineproperty
        exports.f = DESCRIPTORS
          ? V8_PROTOTYPE_DEFINE_BUG
            ? function defineProperty(O, P, Attributes) {
                anObject(O);
                P = toPropertyKey(P);
                anObject(Attributes);
                if (
                  typeof O === 'function' &&
                  P === 'prototype' &&
                  'value' in Attributes &&
                  WRITABLE in Attributes &&
                  !Attributes[WRITABLE]
                ) {
                  var current = $getOwnPropertyDescriptor(O, P);
                  if (current && current[WRITABLE]) {
                    O[P] = Attributes.value;
                    Attributes = {
                      configurable:
                        CONFIGURABLE in Attributes
                          ? Attributes[CONFIGURABLE]
                          : current[CONFIGURABLE],
                      enumerable:
                        ENUMERABLE in Attributes
                          ? Attributes[ENUMERABLE]
                          : current[ENUMERABLE],
                      writable: false,
                    };
                  }
                }
                return $defineProperty(O, P, Attributes);
              }
            : $defineProperty
          : function defineProperty(O, P, Attributes) {
              anObject(O);
              P = toPropertyKey(P);
              anObject(Attributes);
              if (IE8_DOM_DEFINE)
                try {
                  return $defineProperty(O, P, Attributes);
                } catch (error) {}
              if ('get' in Attributes || 'set' in Attributes)
                throw new $TypeError('Accessors not supported');
              if ('value' in Attributes) O[P] = Attributes.value;
              return O;
            };
      },
      {
        ca50eb9163928400: '8cznx',
        d482f9e5478795e8: 'bpt4b',
        b6ad7537efb06f4b: 'bBxay',
        '16365a73399e7fe7': 'k06hA',
        fab1d366c47796d9: '9V61Z',
      },
    ],
    bpt4b: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var DESCRIPTORS = require('9b4278b13c076bf');
        var fails = require('8aee5d88a5f9b6b5');
        var createElement = require('1db4d60148afcf21');
        // Thanks to IE8 for its funny defineProperty
        module.exports =
          !DESCRIPTORS &&
          !fails(function () {
            // eslint-disable-next-line es/no-object-defineproperty -- required for testing
            return (
              Object.defineProperty(createElement('div'), 'a', {
                get: function () {
                  return 7;
                },
              }).a !== 7
            );
          });
      },
      {
        '9b4278b13c076bf': '8cznx',
        '8aee5d88a5f9b6b5': '9S7uI',
        '1db4d60148afcf21': '4v1HN',
      },
    ],
    '4v1HN': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var globalThis = require('845bcece0e6d354');
        var isObject = require('824df78b2e007250');
        var document = globalThis.document;
        // typeof document.createElement is 'object' in old IE
        var EXISTS = isObject(document) && isObject(document.createElement);
        module.exports = function (it) {
          return EXISTS ? document.createElement(it) : {};
        };
      },
      { '845bcece0e6d354': 'k0NSR', '824df78b2e007250': 'dFxJ3' },
    ],
    bBxay: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var DESCRIPTORS = require('b22a5a2de93e3ad2');
        var fails = require('249a5b857c2dfccd');
        // V8 ~ Chrome 36-
        // https://bugs.chromium.org/p/v8/issues/detail?id=3334
        module.exports =
          DESCRIPTORS &&
          fails(function () {
            // eslint-disable-next-line es/no-object-defineproperty -- required for testing
            return (
              Object.defineProperty(function () {}, 'prototype', {
                value: 42,
                writable: false,
              }).prototype !== 42
            );
          });
      },
      { b22a5a2de93e3ad2: '8cznx', '249a5b857c2dfccd': '9S7uI' },
    ],
    k06hA: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var isObject = require('2b6c6258a0a6082f');
        var $String = String;
        var $TypeError = TypeError;
        // `Assert: Type(argument) is Object`
        module.exports = function (argument) {
          if (isObject(argument)) return argument;
          throw new $TypeError($String(argument) + ' is not an object');
        };
      },
      { '2b6c6258a0a6082f': 'dFxJ3' },
    ],
    '9V61Z': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var toPrimitive = require('53a3a67ac381c4e8');
        var isSymbol = require('b992ca9cdcf7937b');
        // `ToPropertyKey` abstract operation
        // https://tc39.es/ecma262/#sec-topropertykey
        module.exports = function (argument) {
          var key = toPrimitive(argument, 'string');
          return isSymbol(key) ? key : key + '';
        };
      },
      { '53a3a67ac381c4e8': '8Fbgz', b992ca9cdcf7937b: '7zGj9' },
    ],
    '8Fbgz': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var call = require('70235907dc93b4b0');
        var isObject = require('46fb53dace408c8e');
        var isSymbol = require('677bdc4d74d2f983');
        var getMethod = require('80395bcde336a28b');
        var ordinaryToPrimitive = require('49552a7324952190');
        var wellKnownSymbol = require('aea01c71276624bf');
        var $TypeError = TypeError;
        var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
        // `ToPrimitive` abstract operation
        // https://tc39.es/ecma262/#sec-toprimitive
        module.exports = function (input, pref) {
          if (!isObject(input) || isSymbol(input)) return input;
          var exoticToPrim = getMethod(input, TO_PRIMITIVE);
          var result;
          if (exoticToPrim) {
            if (pref === undefined) pref = 'default';
            result = call(exoticToPrim, input, pref);
            if (!isObject(result) || isSymbol(result)) return result;
            throw new $TypeError("Can't convert object to primitive value");
          }
          if (pref === undefined) pref = 'number';
          return ordinaryToPrimitive(input, pref);
        };
      },
      {
        '70235907dc93b4b0': '3dDXd',
        '46fb53dace408c8e': 'dFxJ3',
        '677bdc4d74d2f983': '7zGj9',
        '80395bcde336a28b': 'kHtNM',
        '49552a7324952190': 'eo5ee',
        aea01c71276624bf: '9FuCK',
      },
    ],
    '3dDXd': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var NATIVE_BIND = require('44e025d030d66023');
        var call = Function.prototype.call;
        // eslint-disable-next-line es/no-function-prototype-bind -- safe
        module.exports = NATIVE_BIND
          ? call.bind(call)
          : function () {
              return call.apply(call, arguments);
            };
      },
      { '44e025d030d66023': 'bYKk6' },
    ],
    '7zGj9': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var getBuiltIn = require('6b6c481cdfb7df35');
        var isCallable = require('2af44fcbdbf14c83');
        var isPrototypeOf = require('76e903e830c40e7c');
        var USE_SYMBOL_AS_UID = require('7e2fe930b3598e22');
        var $Object = Object;
        module.exports = USE_SYMBOL_AS_UID
          ? function (it) {
              return typeof it == 'symbol';
            }
          : function (it) {
              var $Symbol = getBuiltIn('Symbol');
              return (
                isCallable($Symbol) &&
                isPrototypeOf($Symbol.prototype, $Object(it))
              );
            };
      },
      {
        '6b6c481cdfb7df35': 'lV4ro',
        '2af44fcbdbf14c83': '2SpJA',
        '76e903e830c40e7c': '5iT3z',
        '7e2fe930b3598e22': '14K6w',
      },
    ],
    lV4ro: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var globalThis = require('e057fc33d60763c1');
        var isCallable = require('f1d62079325906cb');
        var aFunction = function (argument) {
          return isCallable(argument) ? argument : undefined;
        };
        module.exports = function (namespace, method) {
          return arguments.length < 2
            ? aFunction(globalThis[namespace])
            : globalThis[namespace] && globalThis[namespace][method];
        };
      },
      { e057fc33d60763c1: 'k0NSR', f1d62079325906cb: '2SpJA' },
    ],
    '5iT3z': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var uncurryThis = require('83f14842ef67e16a');
        module.exports = uncurryThis({}.isPrototypeOf);
      },
      { '83f14842ef67e16a': '3irWI' },
    ],
    '14K6w': [
      function (require, module, exports, __globalThis) {
        'use strict';
        /* eslint-disable es/no-symbol -- required for testing */ var NATIVE_SYMBOL = require('da4a972af0214ea0');
        module.exports =
          NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';
      },
      { da4a972af0214ea0: '82OsU' },
    ],
    '82OsU': [
      function (require, module, exports, __globalThis) {
        'use strict';
        /* eslint-disable es/no-symbol -- required for testing */ var V8_VERSION = require('53b951dfb9de4d22');
        var fails = require('b37df495bcdc1d99');
        var globalThis = require('e5929e9affd2affc');
        var $String = globalThis.String;
        // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
        module.exports =
          !!Object.getOwnPropertySymbols &&
          !fails(function () {
            var symbol = Symbol('symbol detection');
            // Chrome 38 Symbol has incorrect toString conversion
            // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
            // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
            // of course, fail.
            return (
              !$String(symbol) ||
              !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
              (!Symbol.sham && V8_VERSION && V8_VERSION < 41)
            );
          });
      },
      {
        '53b951dfb9de4d22': '5SPMz',
        b37df495bcdc1d99: '9S7uI',
        e5929e9affd2affc: 'k0NSR',
      },
    ],
    '5SPMz': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var globalThis = require('d049c1c2aa0eee5b');
        var userAgent = require('4eb5796bbafe334d');
        var process = globalThis.process;
        var Deno = globalThis.Deno;
        var versions = (process && process.versions) || (Deno && Deno.version);
        var v8 = versions && versions.v8;
        var match, version;
        if (v8) {
          match = v8.split('.');
          // in old Chrome, versions of V8 isn't V8 = Chrome / 10
          // but their correct versions are not interesting for us
          version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
        }
        // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
        // so check `userAgent` even if `.v8` exists, but 0
        if (!version && userAgent) {
          match = userAgent.match(/Edge\/(\d+)/);
          if (!match || match[1] >= 74) {
            match = userAgent.match(/Chrome\/(\d+)/);
            if (match) version = +match[1];
          }
        }
        module.exports = version;
      },
      { d049c1c2aa0eee5b: 'k0NSR', '4eb5796bbafe334d': 'fkYvq' },
    ],
    fkYvq: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var globalThis = require('888bcb4c75dc4ad');
        var navigator = globalThis.navigator;
        var userAgent = navigator && navigator.userAgent;
        module.exports = userAgent ? String(userAgent) : '';
      },
      { '888bcb4c75dc4ad': 'k0NSR' },
    ],
    kHtNM: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var aCallable = require('bbfed17b24e215f4');
        var isNullOrUndefined = require('492a86e2970f6a26');
        // `GetMethod` abstract operation
        // https://tc39.es/ecma262/#sec-getmethod
        module.exports = function (V, P) {
          var func = V[P];
          return isNullOrUndefined(func) ? undefined : aCallable(func);
        };
      },
      { bbfed17b24e215f4: 'asHzj', '492a86e2970f6a26': 'hLgr3' },
    ],
    asHzj: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var isCallable = require('4094667126ecac05');
        var tryToString = require('fce2a7573db493fa');
        var $TypeError = TypeError;
        // `Assert: IsCallable(argument) is true`
        module.exports = function (argument) {
          if (isCallable(argument)) return argument;
          throw new $TypeError(tryToString(argument) + ' is not a function');
        };
      },
      { '4094667126ecac05': '2SpJA', fce2a7573db493fa: 'bN6C6' },
    ],
    bN6C6: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var $String = String;
        module.exports = function (argument) {
          try {
            return $String(argument);
          } catch (error) {
            return 'Object';
          }
        };
      },
      {},
    ],
    eo5ee: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var call = require('abe9ca006f56626e');
        var isCallable = require('c96b3a89fec6248a');
        var isObject = require('551615fda0214f1b');
        var $TypeError = TypeError;
        // `OrdinaryToPrimitive` abstract operation
        // https://tc39.es/ecma262/#sec-ordinarytoprimitive
        module.exports = function (input, pref) {
          var fn, val;
          if (
            pref === 'string' &&
            isCallable((fn = input.toString)) &&
            !isObject((val = call(fn, input)))
          )
            return val;
          if (
            isCallable((fn = input.valueOf)) &&
            !isObject((val = call(fn, input)))
          )
            return val;
          if (
            pref !== 'string' &&
            isCallable((fn = input.toString)) &&
            !isObject((val = call(fn, input)))
          )
            return val;
          throw new $TypeError("Can't convert object to primitive value");
        };
      },
      {
        abe9ca006f56626e: '3dDXd',
        c96b3a89fec6248a: '2SpJA',
        '551615fda0214f1b': 'dFxJ3',
      },
    ],
    '9FuCK': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var globalThis = require('ad5ef4474219c101');
        var shared = require('6a2cda01df6b4c79');
        var hasOwn = require('dccc28ffa5beeb54');
        var uid = require('48d6af1225853d44');
        var NATIVE_SYMBOL = require('9f762329148684');
        var USE_SYMBOL_AS_UID = require('1ce268781e409df2');
        var Symbol = globalThis.Symbol;
        var WellKnownSymbolsStore = shared('wks');
        var createWellKnownSymbol = USE_SYMBOL_AS_UID
          ? Symbol['for'] || Symbol
          : (Symbol && Symbol.withoutSetter) || uid;
        module.exports = function (name) {
          if (!hasOwn(WellKnownSymbolsStore, name))
            WellKnownSymbolsStore[name] =
              NATIVE_SYMBOL && hasOwn(Symbol, name)
                ? Symbol[name]
                : createWellKnownSymbol('Symbol.' + name);
          return WellKnownSymbolsStore[name];
        };
      },
      {
        ad5ef4474219c101: 'k0NSR',
        '6a2cda01df6b4c79': 'iC53L',
        dccc28ffa5beeb54: 'dB2o8',
        '48d6af1225853d44': '3gF3V',
        '9f762329148684': '82OsU',
        '1ce268781e409df2': '14K6w',
      },
    ],
    iC53L: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var store = require('84eeed9891aafe14');
        module.exports = function (key, value) {
          return store[key] || (store[key] = value || {});
        };
      },
      { '84eeed9891aafe14': 'jE8ol' },
    ],
    '3gF3V': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var uncurryThis = require('5da0fe4507da20a3');
        var id = 0;
        var postfix = Math.random();
        var toString = uncurryThis((1.1).toString);
        module.exports = function (key) {
          return (
            'Symbol(' +
            (key === undefined ? '' : key) +
            ')_' +
            toString(++id + postfix, 36)
          );
        };
      },
      { '5da0fe4507da20a3': '3irWI' },
    ],
    '1QUaS': [
      function (require, module, exports, __globalThis) {
        'use strict';
        module.exports = function (bitmap, value) {
          return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value: value,
          };
        };
      },
      {},
    ],
    '3dbjj': [
      function (require, module, exports, __globalThis) {
        'use strict';
        var shared = require('dbc8182adeb8c92f');
        var uid = require('90b4ffb58508a6e5');
        var keys = shared('keys');
        module.exports = function (key) {
          return keys[key] || (keys[key] = uid(key));
        };
      },
      { dbc8182adeb8c92f: 'iC53L', '90b4ffb58508a6e5': '3gF3V' },
    ],
    '9xq0k': [
      function (require, module, exports, __globalThis) {
        'use strict';
        module.exports = {};
      },
      {},
    ],
    jnY4D: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var globalThis = require('e604b58e4400a5a9');
        var fails = require('c7e788cbac482e2');
        // babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
        var RegExp = globalThis.RegExp;
        var FLAGS_GETTER_IS_CORRECT = !fails(function () {
          var INDICES_SUPPORT = true;
          try {
            RegExp('.', 'd');
          } catch (error) {
            INDICES_SUPPORT = false;
          }
          var O = {};
          // modern V8 bug
          var calls = '';
          var expected = INDICES_SUPPORT ? 'dgimsy' : 'gimsy';
          var addGetter = function (key, chr) {
            // eslint-disable-next-line es/no-object-defineproperty -- safe
            Object.defineProperty(O, key, {
              get: function () {
                calls += chr;
                return true;
              },
            });
          };
          var pairs = {
            dotAll: 's',
            global: 'g',
            ignoreCase: 'i',
            multiline: 'm',
            sticky: 'y',
          };
          if (INDICES_SUPPORT) pairs.hasIndices = 'd';
          for (var key in pairs) addGetter(key, pairs[key]);
          // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
          var result = Object.getOwnPropertyDescriptor(
            RegExp.prototype,
            'flags',
          ).get.call(O);
          return result !== expected || calls !== expected;
        });
        module.exports = {
          correct: FLAGS_GETTER_IS_CORRECT,
        };
      },
      { e604b58e4400a5a9: 'k0NSR', c7e788cbac482e2: '9S7uI' },
    ],
    gJReE: [
      function (require, module, exports, __globalThis) {
        'use strict';
        var anObject = require('136abace0aec2b5c');
        // `RegExp.prototype.flags` getter implementation
        // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
        module.exports = function () {
          var that = anObject(this);
          var result = '';
          if (that.hasIndices) result += 'd';
          if (that.global) result += 'g';
          if (that.ignoreCase) result += 'i';
          if (that.multiline) result += 'm';
          if (that.dotAll) result += 's';
          if (that.unicode) result += 'u';
          if (that.unicodeSets) result += 'v';
          if (that.sticky) result += 'y';
          return result;
        };
      },
      { '136abace0aec2b5c': 'k06hA' },
    ],
    bQhka: [
      function (require, module, exports, __globalThis) {
        /*eslint-disable*/ var parcelHelpers = require('@parcel/transformer-js/src/esmodule-helpers.js');
        parcelHelpers.defineInteropFlag(exports);
        parcelHelpers.export(exports, 'login', () => login);
        parcelHelpers.export(exports, 'logout', () => logout);
        parcelHelpers.export(exports, 'signup', () => signup);
        parcelHelpers.export(exports, 'forgotPassword', () => forgotPassword);
        parcelHelpers.export(exports, 'resetPassword', () => resetPassword);
        var _axios = require('axios');
        var _axiosDefault = parcelHelpers.interopDefault(_axios);
        var _alerts = require('./alerts.js');
        const login = async (email, password) => {
          try {
            const res = await (0, _axiosDefault.default)({
              method: 'POST',
              url: '/api/v1/users/login',
              data: {
                email,
                password,
              },
            });
            if (res.data.status === 'success') {
              (0, _alerts.showAlert)('success', 'Logged in successfully');
              window.setTimeout(() => {
                location.assign('/');
              }, 500);
            }
          } catch (error) {
            (0, _alerts.showAlert)('error', error.response.data.message);
          }
        };
        const logout = async () => {
          try {
            const res = await (0, _axiosDefault.default)({
              method: 'GET',
              url: '/api/v1/users/logout',
            });
            if (res.data.status === 'success') {
              (0, _alerts.showAlert)('success', 'Logged out successfully');
              window.setTimeout(() => {
                location.assign('/');
              }, 500);
            }
          } catch (error) {
            (0, _alerts.showAlert)('error', 'Error logging out! Try again.');
          }
        };
        const signup = async (name, email, password, passwordConfirm) => {
          try {
            const res = await (0, _axiosDefault.default)({
              method: 'POST',
              url: '/api/v1/users/signup',
              data: {
                name,
                email,
                password,
                passwordConfirm,
              },
            });
            if (res.data.status === 'success') {
              (0, _alerts.showAlert)('success', 'Account Created Successfully');
              window.setTimeout(() => {
                location.assign('/');
              }, 500);
            }
          } catch (error) {
            (0, _alerts.showAlert)('error', error.response.data.message);
          }
        };
        const forgotPassword = async (email) => {
          try {
            const res = await (0, _axiosDefault.default)({
              method: 'POST',
              url: '/api/v1/users/forgotPassword',
              data: {
                email,
              },
            });
            if (res.data.status === 'success')
              (0, _alerts.showAlert)(
                'success',
                'Reset Password Link sent to Email Successfully',
              );
          } catch (error) {
            (0, _alerts.showAlert)('error', error.response.data.message);
            throw error;
          }
        };
        const resetPassword = async (password, passwordConfirm, resetToken) => {
          try {
            const res = await (0, _axiosDefault.default)({
              method: 'PATCH',
              url: `/api/v1/users/resetPassword/${resetToken}`,
              data: {
                password,
                passwordConfirm,
              },
            });
            if (res.data.status === 'success') {
              (0, _alerts.showAlert)('success', 'Password Reset Successfully!');
              window.setTimeout(() => {
                location.assign('/');
              }, 500);
            }
          } catch (error) {
            (0, _alerts.showAlert)('error', error.response.data.message);
            throw error;
          }
        };
      },
      {
        axios: 'axios',
        './alerts': '3Oqff',
        '@parcel/transformer-js/src/esmodule-helpers.js': 'cNpXt',
      },
    ],
    '3Oqff': [
      function (require, module, exports, __globalThis) {
        /*eslint-disable*/ var parcelHelpers = require('@parcel/transformer-js/src/esmodule-helpers.js');
        parcelHelpers.defineInteropFlag(exports);
        parcelHelpers.export(exports, 'hideAlert', () => hideAlert);
        parcelHelpers.export(exports, 'showAlert', () => showAlert);
        const hideAlert = () => {
          const el = document.querySelector('.alert');
          if (el) el.parentElement.removeChild(el);
        };
        const showAlert = (type, msg) => {
          hideAlert();
          const markup = `<div class="alert alert--${type}">${msg}</div>`;
          document
            .querySelector('body')
            .insertAdjacentHTML('afterbegin', markup);
          window.setTimeout(hideAlert, 2000);
        };
      },
      { '@parcel/transformer-js/src/esmodule-helpers.js': 'cNpXt' },
    ],
    cNpXt: [
      function (require, module, exports, __globalThis) {
        exports.interopDefault = function (a) {
          return a && a.__esModule
            ? a
            : {
                default: a,
              };
        };
        exports.defineInteropFlag = function (a) {
          Object.defineProperty(a, '__esModule', {
            value: true,
          });
        };
        exports.exportAll = function (source, dest) {
          Object.keys(source).forEach(function (key) {
            if (
              key === 'default' ||
              key === '__esModule' ||
              Object.prototype.hasOwnProperty.call(dest, key)
            )
              return;
            Object.defineProperty(dest, key, {
              enumerable: true,
              get: function () {
                return source[key];
              },
            });
          });
          return dest;
        };
        exports.export = function (dest, destName, get) {
          Object.defineProperty(dest, destName, {
            enumerable: true,
            get: get,
          });
        };
      },
      {},
    ],
    g29u6: [
      function (require, module, exports, __globalThis) {
        /*eslint-disable*/ var parcelHelpers = require('@parcel/transformer-js/src/esmodule-helpers.js');
        parcelHelpers.defineInteropFlag(exports);
        parcelHelpers.export(exports, 'updateSettings', () => updateSettings);
        var _axios = require('axios');
        var _axiosDefault = parcelHelpers.interopDefault(_axios);
        var _alerts = require('./alerts.js');
        const updateSettings = async (data, type) => {
          try {
            const url =
              type === 'password'
                ? '/api/v1/users/updateMyPassword'
                : '/api/v1/users/updateMe';
            const res = await (0, _axiosDefault.default)({
              method: 'PATCH',
              url,
              data,
            });
            if (res.data.status === 'success') {
              (0, _alerts.showAlert)(
                'success',
                `${type.toUpperCase()} updated successfully!`,
              );
              location.reload(true);
            }
          } catch (error) {
            (0, _alerts.showAlert)('error', error.response.data.message);
          }
        };
      },
      {
        axios: 'axios',
        './alerts': '3Oqff',
        '@parcel/transformer-js/src/esmodule-helpers.js': 'cNpXt',
      },
    ],
    aGnSy: [
      function (require, module, exports, __globalThis) {
        /* eslint-disable*/ var parcelHelpers = require('@parcel/transformer-js/src/esmodule-helpers.js');
        parcelHelpers.defineInteropFlag(exports);
        parcelHelpers.export(exports, 'bookTour', () => bookTour);
        var _axios = require('axios');
        var _axiosDefault = parcelHelpers.interopDefault(_axios);
        var _alerts = require('./alerts.js');
        const stripe = Stripe(
          'pk_test_51R56DdLAZKL0DGwrQO1XeV13xcGKydXGICNPAfpgiuz9quZqSOmUuY8V8EDj76DYxPrM3a10vqmvkMOrNGZvzv0O00I01Ctxpe',
        );
        const bookTour = async (tourId) => {
          try {
            // get checkout session from API
            const session = await (0, _axiosDefault.default)(
              `/api/v1/bookings/checkout-session/${tourId}`,
            );
            //   console.log('session', session);
            //create checkout form + charge credit card
            await stripe.redirectToCheckout({
              sessionId: session.data.session.id,
            });
          } catch (error) {
            //   console.log(error);
            (0, _alerts.showAlert)('error', error);
          }
        };
      },
      {
        axios: 'axios',
        './alerts': '3Oqff',
        '@parcel/transformer-js/src/esmodule-helpers.js': 'cNpXt',
      },
    ],
    dqoc8: [
      function (require, module, exports, __globalThis) {
        /*eslint-disable*/ var parcelHelpers = require('@parcel/transformer-js/src/esmodule-helpers.js');
        parcelHelpers.defineInteropFlag(exports);
        parcelHelpers.export(exports, 'displayMap', () => displayMap);
        const displayMap = (locations) => {
          maptilersdk.config.apiKey = 'fg20SJA60q3aBa9vCkZv';
          const map = new maptilersdk.Map({
            container: 'map',
            style: 'bright-v2',
            scrollZoom: false,
          });
          const bounds = new maptilersdk.LngLatBounds();
          locations.forEach((loc) => {
            // create marker
            const el = document.createElement('div');
            el.className = 'marker';
            new maptilersdk.Marker({
              element: el,
              anchor: 'bottom',
            })
              .setLngLat(loc.coordinates)
              .addTo(map);
            new maptilersdk.Popup({
              offset: 30,
              focusAfterOpen: false,
            })
              .setLngLat(loc.coordinates)
              .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
              .addTo(map);
            bounds.extend(loc.coordinates);
          });
          setTimeout(() => {
            map.fitBounds(bounds, {
              padding: {
                top: 200,
                bottom: 150,
                left: 100,
                right: 100,
              },
            });
          }, 1000);
        };
      },
      { '@parcel/transformer-js/src/esmodule-helpers.js': 'cNpXt' },
    ],
  },
  ['lA1mH', '5HOeo'],
  '5HOeo',
  'parcelRequire33f5',
  {},
);
