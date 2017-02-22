'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _vueScope = require('../models/vueScope');

var _vueScope2 = _interopRequireDefault(_vueScope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET home page. */
router.get('/', function (req, res) {
    var vueScope = new _vueScope2.default();
    vueScope.addData({
        title: 'Smart Home',
        subtitle: 'Grünerløkka, Oslo'
    });
    res.render('main/main', vueScope.getScope());
});

exports.default = router;