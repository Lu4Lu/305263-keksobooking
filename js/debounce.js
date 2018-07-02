'use strict';
(function () {

  var DEBOUNCE_INTERVAL = 500;

  function debounce(fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  }
  window.debounce = debounce;
})();

