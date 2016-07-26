/**
 * Mock utility for rfunc.
 * @module rfunc-mock
 */

'use strict';

var d = function d(module) {
  return module.default || module;
};

module.exports = {
  get moduleProxy() {
    return d(require('./module_proxy'));
  }
};
//# sourceMappingURL=data:application/json;base64,bnVsbA==