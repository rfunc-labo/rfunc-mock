/**
 * Create a proxy for a module
 * @function moduleProxy
 * @param {Object} module - RFunc module configuration.
 * @param {Object} [options] - Optional settings
 * @returns {Object} - Proxy
 */
'use strict'

const co = require('co')

const callAll = (handlers, ...args) => co(function * () {
  for (let handler of handlers.filter(Boolean)) {
    yield Promise.resolve(handler.call(...args))
  }
})

/** @lends moduleProxy */
function moduleProxy (module, options = {}) {
  let {
    before = [],
    after = [],
    ctx = {}
  } = options
  module = Object.assign({ ctx }, ctx, module)
  let instance = new Proxy({ ctx }, {
    get (target, name) {
      if (name in module) {
        let isMethod = typeof module[ name ] === 'function'
        if (isMethod) {
          return function methodWrap (...params) {
            return co(function * () {
              yield callAll([].concat(before, module.$before), instance, name, params)
              let returns = yield Promise.resolve(module[ name ](...params))
              yield callAll([].concat(after, module.$after), instance, name, params, returns)
              return returns
            })
          }
        }
        return module[ name ]
      }
      if (name in ctx) {
        return ctx[ name ]
      }
      return target[ name ]
    },
    has (target, name) {
      return (name in target) || (name in module) || (name in ctx)
    },
    set (target, name, value) {
      module[ name ] = value
      return true
    }
  })
  return instance
}

module.exports = moduleProxy
