/**
 * Test case for moduleProxy.
 * Runs with mocha.
 */
'use strict'

const moduleProxy = require('../lib/module_proxy.js')
const assert = require('assert')
const co = require('co')

describe('module-proxy', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Module proxy', () => co(function * () {
    let api = moduleProxy({
      $before () {
        const s = this
        let { state } = s
        assert.equal(state.foo, 'This is foo')
        state.bar = 'This is bar'
      },
      $after () {
        const s = this
        assert.equal(s.state.bar, 'This is bar')
      },
      sayHi () {
        return 'hi'
      }
    }, {
      ctx: {
        state: { foo: 'This is foo' }
      }
    })
    let hi = yield api.sayHi()
    assert.equal(hi, 'hi')
  }))
})

/* global describe, before, after, it */
