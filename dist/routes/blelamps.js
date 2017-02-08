'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.bleLamps = undefined;

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

router.get('/', function (req, res) {
	try {
		peripheralService.startScanAndConnectToBleLamps();
	} catch (err) {
		console.warn(err);
		res.send('error' + err.message);
	}
	res.render('index', { title: 'bleLamps' });
});

router.get('/color/:color', function (req, res) {
	res.send();
});

exports.bleLamps = router;