"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vueScope_1 = require("../models/vueScope");
var Security = (function () {
    function Security() {
    }
    Security.checkIfUserLoggedIn = function (req, res, next) {
        if (req.session.user) {
            next();
        }
        else {
            var vueScope = new vueScope_1.default();
            vueScope.addData({
                title: 'Smart Home - Login',
                subtitle: 'Grünerløkka, Oslo'
            });
            res.render('main/main', vueScope.getScope());
        }
    };
    return Security;
}());
exports.Security = Security;
