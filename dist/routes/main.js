"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var vueScope_1 = require("../models/vueScope");
var Main = (function () {
    function Main(app) {
        this.app = app;
        this.router = express.Router();
        this.addHomeRoute();
    }
    Main.bootstrap = function (app) {
        return new Main(app);
    };
    Main.prototype.attach = function (pathToAttach) {
        if (pathToAttach) {
            this.app.use(pathToAttach, this.router);
        }
        else {
            this.app.use('/', this.router);
        }
    };
    Main.prototype.addHomeRoute = function () {
        this.router.get('/', function (req, res) {
            var vueScope = new vueScope_1.default();
            vueScope.addData({
                title: 'Smart Home',
                subtitle: 'Grünerløkka, Oslo'
            });
            res.render('main/main', vueScope.getScope());
        });
    };
    return Main;
}());
exports.Main = Main;
