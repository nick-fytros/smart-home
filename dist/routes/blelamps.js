"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var peripheralService_1 = require("../services/peripheralService");
var peripheralService = new peripheralService_1.default();
try {
    peripheralService.startScanAndConnectToBleLamps();
}
catch (err) {
    console.warn(err.message);
}
var BleLamps = (function () {
    function BleLamps(app) {
        this.app = app;
        this.router = express.Router();
        this.addHomeRoute();
    }
    BleLamps.bootstrap = function (app) {
        return new BleLamps(app);
    };
    BleLamps.prototype.attach = function (pathToAttach) {
        if (pathToAttach) {
            this.app.use(pathToAttach, this.router);
        }
        else {
            this.app.use('/', this.router);
        }
    };
    BleLamps.prototype.addHomeRoute = function () {
        this.router.get('/', function (req, res) {
            res.end('ok');
        });
    };
    BleLamps.prototype.addLampColorRoute = function () {
        this.router.get('/color/:color', function (req, res) {
            peripheralService.setLampColor(peripheralService.getConnectedPeripherals()[0], req.params.color);
            res.end('ok');
        });
    };
    return BleLamps;
}());
exports.BleLamps = BleLamps;
