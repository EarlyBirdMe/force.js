;void function(window, document, undefined) {
  "use strict";

  var head = document.getElementsByTagName('head')[0];
  var modules = {};
  var injects = {};
  var callbacks = {};
  var anonymous = 0;

  function registerModule(id, callback, args) {
    var deps;
    var key;
    var i;
    var l;

    if(!modules[id]) {
      modules[id] = callback.apply(null, args);
      delete(callbacks[id]);
    }

    loop: for(key in callbacks) {
      deps = [];

      for(i = 2, l = callbacks[key].length; i < l; i++) {
        if(modules[callbacks[key][i]]) {
          deps.push(modules[callbacks[key][i]]);
        } else {
          continue loop;
        }
      }

      if(callbacks[key][0]) {
        registerModule(key, callbacks[key][1], deps);
      } else {
        callbacks[key][1].apply(null, deps);
        delete(callbacks[key]);
      }
    }
  };

  function injectModule(id) {
    var node;

    if(!injects[id]) {
      node = document.createElement('script');
      node.type = 'text/javascript';
      node.async = 'true';
      node.src = id + '.js';
      node.onload = function() {
        head.removeChild(node);
      };
      injects[id] = true;
      head.appendChild(node);
    }
  };

  function defineModule(id, dependencies, callback) {
    var l = dependencies.length;
    var i;

    for(i = 0; i < l; i++) {
      if(!modules[dependencies[i]]) {
        callbacks[id] = [true, callback].concat(dependencies);
        for(i = 0; i < l; i++) {
          injectModule(dependencies[i]);
        }
        return;
      }
    }

    registerModule(id, callback, []);
  };

  function requireModule(dependencies, callback) {
    var l = dependencies.length;
    var i;
    var id;

    for(i = 0; i < l; i++) {
      if(!modules[dependencies[i]]) {
        id = 'require/' + (anonymous++);
        callbacks[id] = [false, callback].concat(dependencies);
        for(i = 0; i < l; i++) {
          injectModule(dependencies[i]);
        }
        return;
      }
    }

    callback();
  };

  function init() {
    var config = document.createElement('script');

    window.define = defineModule;
    window.require = requireModule;
    config.type = 'text/javascript';
    config.async = 'true';
    config.src = document.getElementsByTagName('script')[0].getAttribute('data-main') + '.js';
    config.onload = function() {
      head.removeChild(config);
    };
    head.appendChild(config);
  };

  init();

}(window, document);