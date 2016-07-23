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
    let api01 = moduleProxy({
      $before () {
        const s = this
        let { state } = s
        assert.equal(state.foo, 'This is foo')
        state.bar = 'This is bar'
        s.hoge = 'This is hoge'
      },
      $after () {
        const s = this
        assert.equal(s.state.bar, 'This is bar')
      },
      sayHi () {
        assert.equal(this.hoge, 'This is hoge')
        return 'hi'
      }
    }, {
      ctx: {
        state: { foo: 'This is foo' }
      }
    })
    let hi = yield api01.sayHi()
    assert.equal(hi, 'hi')
    assert.equal(api01.hoge, 'This is hoge')
  }))
})

/* global describe, before, after, it */
