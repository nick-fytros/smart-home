"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Security = (function () {
    function Security() {
    }
    Security.checkIfUserLoggedIn = function (req, res, next) {
        if (req.session.user || req.path === '/auth/login' || req.path === '/auth/signup' || req.path === '/') {
            next();
        }
        else {
            res.redirect('/');
        }
    };
    return Security;
}());
exports.Security = Security;
