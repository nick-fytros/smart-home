"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vueScope_1 = require("../models/vueScope");
var Security = (function () {
    function Security() {
    }
    Security.checkIfUserLoggedIn = function (req, res, next) {
        if (req.session.user || req.path === '/auth/login' || req.path === '/') {
            next();
        }
        else {
            var vueScope = new vueScope_1.default();
            res.redirect('/');
        }
    };
    return Security;
}());
exports.Security = Security;
