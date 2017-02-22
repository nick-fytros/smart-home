'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _noble = require('noble');

var _noble2 = _interopRequireDefault(_noble);

var _peripheralService = require('../services/peripheralService');

var _peripheralService2 = _interopRequireDefault(_peripheralService);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// initialize PeripheralService
// TODO initialize elsewhere
var peripheralService = new _peripheralService2.default();
try {
    peripheralService.startScanAndConnectToBleLamps();
} catch (err) {
    console.warn(err.message);
}

router.get('/', function (req, res) {
    res.end('ok');
});

router.get('/color/:color', function (req, res) {
    peripheralService.setLampColor(peripheralService.getConnectedPeripherals()[0], req.params.color);
    res.end('ok');
});

exports.default = router;