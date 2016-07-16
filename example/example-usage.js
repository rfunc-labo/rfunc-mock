'use strict'

const co = require('co')
const { moduleProxy } = require('rfunc-mock')

co(function * () {
// Create api mock
  {
    let api = moduleProxy({
      $before () {
        /* ... */
        console.log('calling the method...')
      },
      doSomething () {
        /* ... */
        return Promise.resolve('done!')
      }
    })
    yield api.doSomething()
  }
}).catch((err) => console.error(err))
