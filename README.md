rfunc-mock
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![Code Climate][bd_codeclimate_shield_url]][bd_codeclimate_url]
[![Code Coverage][bd_codeclimate_coverage_shield_url]][bd_codeclimate_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/rfunc-labo/rfunc-mock
[bd_travis_url]: http://travis-ci.org/rfunc-labo/rfunc-mock
[bd_travis_shield_url]: http://img.shields.io/travis/rfunc-labo/rfunc-mock.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/rfunc-labo/rfunc-mock
[bd_travis_com_shield_url]: https://api.travis-ci.com/rfunc-labo/rfunc-mock.svg?token=
[bd_license_url]: https://github.com/rfunc-labo/rfunc-mock/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/rfunc-labo/rfunc-mock
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/rfunc-labo/rfunc-mock.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/rfunc-labo/rfunc-mock.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/rfunc-labo/rfunc-mock
[bd_gemnasium_shield_url]: https://gemnasium.com/rfunc-labo/rfunc-mock.svg
[bd_npm_url]: http://www.npmjs.org/package/rfunc-mock
[bd_npm_shield_url]: http://img.shields.io/npm/v/rfunc-mock.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Mock utility for rfunc.

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>



<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/01.Installation.md.hbs" Start -->

<a name="section-doc-guides-01-installation-md"></a>

Installation
-----

```bash
$ npm install rfunc-mock --save
```


<!-- Section from "doc/guides/01.Installation.md.hbs" End -->

<!-- Section from "doc/guides/02.Usage.md.hbs" Start -->

<a name="section-doc-guides-02-usage-md"></a>

Usage
---------

```javascript
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

```


<!-- Section from "doc/guides/02.Usage.md.hbs" End -->

<!-- Section from "doc/guides/03.Functions.md.hbs" Start -->

<a name="section-doc-guides-03-functions-md"></a>

Functions
---------

Available functions

| Signature | Description |
| ---- | ----------- |
| `.moduleProxy(module, options) -> Object` | Create a proxy for a module |


<!-- Section from "doc/guides/03.Functions.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/rfunc-labo/rfunc-mock/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------



<!-- Links End -->
