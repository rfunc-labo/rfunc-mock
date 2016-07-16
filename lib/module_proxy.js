/**
 * Create a proxy for a module
 * @function moduleProxy
 * @param {Object} module - RFunc module configuration.
 * @param {Object} [options] - Optional settings
 * @returns {Object} - Proxy
 */
'use strict'

const co = require('co')

/** @lends moduleProxy */
function moduleProxy (module, options = {}) {
  let ctx = options.ctx || {}
  let instance = new Proxy({ ctx }, {
    get (target, name) {
      if (module.hasOwnProperty(name)) {
        let isMethod = typeof module[ name ] === 'function'
        if (isMethod) {
          let { $before, $after } = module
          return function methodWrap (...params) {
            return co(function * () {
              if ($before) {
                yield Promise.resolve($before.call(instance, name, params))
              }
              let returns = yield Promise.resolve(module[ name ].call(instance, ...params))
              if ($after) {
                yield Promise.resolve($after.call(instance, name, params, returns))
              }
              return returns
            })
          }
        }
        return module[ name ]
      }
      return ctx[ name ]
    }
  })
  return instance
}

module.exports = moduleProxy
