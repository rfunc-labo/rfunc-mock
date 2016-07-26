/**
 * Create a proxy for a module
 * @function moduleProxy
 * @param {Object} module - RFunc module configuration.
 * @param {Object} [options] - Optional settings
 * @returns {Object} - Proxy
 */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var co = require('co');

/** @lends moduleProxy */
function moduleProxy(module) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var ctx = options.ctx || {};
  module = Object.assign({ ctx: ctx }, ctx, module);
  var instance = new Proxy({ ctx: ctx }, {
    get: function get(target, name) {
      if (name in module) {
        var isMethod = typeof module[name] === 'function';
        if (isMethod) {
          var _ret = function () {
            var _module = module;
            var $before = _module.$before;
            var $after = _module.$after;

            return {
              v: function methodWrap() {
                for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                  params[_key] = arguments[_key];
                }

                return co(regeneratorRuntime.mark(function _callee() {
                  var _module2;

                  var returns;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!$before) {
                            _context.next = 3;
                            break;
                          }

                          _context.next = 3;
                          return Promise.resolve($before.call(instance, name, params));

                        case 3:
                          _context.next = 5;
                          return Promise.resolve((_module2 = module)[name].apply(_module2, params));

                        case 5:
                          returns = _context.sent;

                          if (!$after) {
                            _context.next = 9;
                            break;
                          }

                          _context.next = 9;
                          return Promise.resolve($after.call(instance, name, params, returns));

                        case 9:
                          return _context.abrupt('return', returns);

                        case 10:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));
              }
            };
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
        return module[name];
      }
      if (name in ctx) {
        return ctx[name];
      }
      return target[name];
    },
    has: function has(target, name) {
      return name in target || name in module || name in ctx;
    },
    set: function set(target, name, value) {
      module[name] = value;
      return true;
    }
  });
  return instance;
}

module.exports = moduleProxy;
//# sourceMappingURL=data:application/json;base64,bnVsbA==