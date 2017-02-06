'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.bleLamps = undefined;

var _noble = require('noble');

var _noble2 = _interopRequireDefault(_noble);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var connectedPeripherals = [];
var changeColorCharecteristic = void 0;

router.get('/', function (req, res) {
	_noble2.default.on('stateChange', function (state) {
		// possible state values: "unknown", "resetting", "unsupported", "unauthorized", "poweredOff", "poweredOn"
		if (state === 'poweredOn') {
			_noble2.default.startScanning();
		} else {
			_noble2.default.stopScanning();
		}
	});
	if (_noble2.default.state === 'poweredOn') {
		_noble2.default.startScanning();
	}
	_noble2.default.on('discover', function (peripheral) {
		if (peripheral.advertisement.localName === 'LEDBLE-7860485E') {
			_noble2.default.stopScanning();
			connectedPeripherals.push(peripheral);
			peripheral.connect(function (error) {
				if (error) {
					console.log(error);
				}
				/* discover the only writable service */
				peripheral.discoverServices(['ffe5'], function (error, services) {
					if (error) {
						console.log(error);
					}
					var changeColorService = services[0];
					/* discover the only writable characteristic */
					changeColorService.discoverCharacteristics(['ffe9'], function (error, characteristics) {
						if (error) {
							console.log(error);
						}
						changeColorCharecteristic = characteristics[0];
					});
				});
			});
			peripheral.once('disconnect', function () {
				console.log('peripheral disconnected...');
				peripheral.connect(function (error) {
					if (error) {
						console.log(error);
					}
					/* discover the only writable service */
					peripheral.discoverServices(['ffe5'], function (error, services) {
						if (error) {
							console.log(error);
						}
						var changeColorService = services[0];
						/* discover the only writable characteristic */
						changeColorService.discoverCharacteristics(['ffe9'], function (error, characteristics) {
							if (error) {
								console.log(error);
							}
							console.log('peripheral reconnected');
							changeColorCharecteristic = characteristics[0];
						});
					});
				});
			});
		}
	});
	res.send('ok');
});

router.get('/color/:color', function (req, res) {
	var colorCommand = '56' + req.params.color + '00f0aa';
	changeColorCharecteristic.write(new Buffer(colorCommand, 'hex'), true, function (error) {
		if (error) {
			console.log(error);
		}
		/* color set */
	});
	res.send('done');
});

exports.bleLamps = router;