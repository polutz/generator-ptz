# generator-ptz

[![Build Status](https://travis-ci.org/polutz/generator-ptz-domain.svg)](https://travis-ci.org/polutz/generator-ptz-domain)
[![codecov.io](http://codecov.io/github/polutz/generator-ptz-domain/coverage.svg)](http://codecov.io/github/polutz/generator-ptz-domain)
[![Dependency Status](https://gemnasium.com/polutz/generator-ptz-domain.svg)](https://gemnasium.com/polutz/generator-ptz-domain)
[![bitHound Score](https://www.bithound.io/github/gotwarlost/istanbul/badges/score.svg)](https://www.bithound.io/github/polutz/generator-ptz-domain)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Yeoman base generator to create polutz modules.

## Install
You can remove 'yo typings' if you already have them installed
```
    npm install -g generator-ptz yo typings
```

## Create your project
Go to your project folder and run:
```    
    yo ptz && typings install
```

## Create an Entity class
replace 'EntityName' with your class name, using first letter as upercase
```    
    yo ptz-domain:entity EntityName
```
