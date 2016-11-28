/**
 * Mock utility for rfunc.
 * @module rfunc-mock
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get moduleProxy () { return d(require('./module_proxy')) }
}
