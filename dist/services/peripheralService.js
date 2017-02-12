'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _noble = require('noble');

var _noble2 = _interopRequireDefault(_noble);

var _nobleError = require('../models/nobleError');

var _nobleError2 = _interopRequireDefault(_nobleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PeripheralService = function () {
    function PeripheralService() {
        var _this = this;

        _classCallCheck(this, PeripheralService);

        this.connectedPeripherals = [];
        _noble2.default.stopScanning();
        _noble2.default.on('stateChange', function (state) {
            // possible state values: "unknown", "resetting", "unsupported", "unauthorized", "poweredOff", "poweredOn"
            if (state === 'poweredOn') {
                console.log('Noble started scanning');
                _noble2.default.startScanning();
            } else {
                _noble2.default.stopScanning();
            }
        });
        _noble2.default.on('discover', function (peripheral) {
            /* find and connect to all the Ble lamps */
            if (typeof peripheral.advertisement.localName !== 'undefined' && peripheral.advertisement.localName.includes('LEDBLE-')) {
                _noble2.default.stopScanning();
                _this._connectToPeripheralAndInit(peripheral);
            }
        });
    }

    /* TODO handle errors */


    _createClass(PeripheralService, [{
        key: '_connectToPeripheralAndInit',
        value: function _connectToPeripheralAndInit(peripheral) {
            var _this2 = this;

            peripheral.connect(function (error) {
                if (error) {
                    console.warn(error);
                    return null;
                }
                console.log('connected to lamp ' + peripheral.advertisement.localName);
                /* discover the only writable service */
                peripheral.discoverServices(['ffe5'], function (error, services) {
                    if (error) {
                        console.warn(error);
                        return null;
                    }
                    var colorService = services[0];
                    console.log('discovered service ' + colorService);
                    /* discover the only writable characteristic */
                    colorService.discoverCharacteristics(['ffe9'], function (error, characteristics) {
                        if (error) {
                            console.warn(error);
                            return null;
                        }
                        var colorCharecteristic = characteristics[0];
                        console.log('discovered characteristic ' + colorCharecteristic);
                        /* save the connected peripheral with its writable characteristic */
                        _this2.connectedPeripherals.push({
                            'peripheral': peripheral,
                            'colorCharecteristic': colorCharecteristic,
                            'currentColor': ''
                        });
                        /* on peripheral disconnect, reconnect */
                        peripheral.once('disconnect', function () {
                            console.log('peripheral disconnected...');
                            var peripheralIndex = _this2.connectedPeripherals.findIndex(function (obj) {
                                return obj.id === peripheral.id;
                            });
                            if (peripheralIndex >= 0) _this2.connectedPeripherals.splice(peripheralIndex, 1);
                            _this2._connectToPeripheralAndInit(peripheral);
                        });
                    });
                });
            });
        }
    }, {
        key: 'getConnectedPeripherals',
        value: function getConnectedPeripherals() {
            return this.connectedPeripherals;
        }
    }, {
        key: 'startScanAndConnectToBleLamps',
        value: function startScanAndConnectToBleLamps() {
            _noble2.default.stopScanning();
            /* reset the connected peripherals array */
            this.connectedPeripherals = [];
            if (_noble2.default.state === 'poweredOn') {
                _noble2.default.startScanning();
                console.log('Noble started scanning');
            } else {
                throw new _nobleError2.default('Noble state is ' + _noble2.default.state + ' and can\'t start scanning.');
            }
        }
    }, {
        key: 'setLampColor',
        value: function setLampColor(peripheral, color) {
            var _this3 = this;

            var colorCommand = '56' + color + '00f0aa';
            var peripheralIndex = this.connectedPeripherals.findIndex(function (obj) {
                return obj.id === peripheral.id;
            });
            if (peripheralIndex < 0) {
                throw new _nobleError2.default('Peripheral ' + peripheral.advertisement.localName + ' is not connected');
            }
            peripheral.colorCharecteristic.write(new Buffer(colorCommand, 'hex'), true, function (error) {
                if (error) {
                    console.warn(error);
                    throw new _nobleError2.default(error.message);
                }
                console.log('set color ' + color);
                /* save color set to the peripheral it belongs */
                _this3.connectedPeripherals[peripheralIndex].currentColor = color;
                console.log('final connected peripherals array is ' + _this3.connectedPeripherals.length);
            });
        }
    }]);

    return PeripheralService;
}();

exports.default = PeripheralService;