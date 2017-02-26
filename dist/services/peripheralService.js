"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var noble = require("noble");
var nobleError_1 = require("../models/nobleError");
var PeripheralService = (function () {
    function PeripheralService() {
        var _this = this;
        this.connectedPeripherals = [];
        noble.stopScanning();
        noble.on('stateChange', function (state) {
            if (state === 'poweredOn') {
                console.log('Noble started scanning');
                noble.startScanning();
            }
            else {
                noble.stopScanning();
            }
        });
        noble.on('discover', function (peripheral) {
            if (typeof peripheral.advertisement.localName !== 'undefined' &&
                peripheral.advertisement.localName.includes('LEDBLE-')) {
                noble.stopScanning();
                _this.connectToPeripheralAndInit(peripheral);
            }
        });
    }
    PeripheralService.prototype.getConnectedPeripherals = function () {
        return this.connectedPeripherals;
    };
    PeripheralService.prototype.startScanAndConnectToBleLamps = function () {
        noble.stopScanning();
        this.connectedPeripherals = [];
        if (noble.state === 'poweredOn') {
            noble.startScanning();
            console.log('Noble started scanning');
        }
        else {
            throw new nobleError_1.default("Noble state is " + noble.state + " and can't start scanning.");
        }
    };
    PeripheralService.prototype.setLampColor = function (peripheral, color) {
        var _this = this;
        var colorCommand = '56' + color + '00f0aa';
        var peripheralIndex = this.connectedPeripherals.findIndex(function (obj) {
            return obj.id === peripheral.id;
        });
        if (peripheralIndex < 0) {
            throw new nobleError_1.default("Peripheral " + peripheral.advertisement.localName + " is not connected");
        }
        peripheral.colorCharecteristic.write(new Buffer(colorCommand, 'hex'), true, function (error) {
            if (error) {
                console.warn(error);
                throw new nobleError_1.default(error.message);
            }
            console.log('set color ' + color);
            _this.connectedPeripherals[peripheralIndex].currentColor = color;
            console.log('final connected peripherals array is ' + _this.connectedPeripherals.length);
        });
    };
    PeripheralService.prototype.connectToPeripheralAndInit = function (peripheral) {
        var _this = this;
        peripheral.connect(function (error) {
            if (error) {
                console.warn(error);
                return null;
            }
            console.log('connected to lamp ' + peripheral.advertisement.localName);
            peripheral.discoverServices(['ffe5'], function (error, services) {
                if (error) {
                    console.warn(error);
                    return null;
                }
                var colorService = services[0];
                console.log('discovered service ' + colorService);
                colorService.discoverCharacteristics(['ffe9'], function (error, characteristics) {
                    if (error) {
                        console.warn(error);
                        return null;
                    }
                    var colorCharecteristic = characteristics[0];
                    console.log('discovered characteristic ' + colorCharecteristic);
                    _this.connectedPeripherals.push({
                        'peripheral': peripheral,
                        'colorCharecteristic': colorCharecteristic,
                        'currentColor': ''
                    });
                    peripheral.once('disconnect', function () {
                        console.log('peripheral disconnected...');
                        var peripheralIndex = _this.connectedPeripherals.findIndex(function (obj) {
                            return obj.id === peripheral.id;
                        });
                        if (peripheralIndex >= 0) {
                            _this.connectedPeripherals.splice(peripheralIndex, 1);
                        }
                        _this.connectToPeripheralAndInit(peripheral);
                    });
                });
            });
        });
    };
    return PeripheralService;
}());
exports.default = PeripheralService;
