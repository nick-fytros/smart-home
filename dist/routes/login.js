"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var vueScope_1 = require("../models/vueScope");
var user_1 = require("../models/user");
var Login = (function () {
    function Login(app) {
        this.app = app;
        this.router = express.Router();
        this.addLoginRoute();
    }
    Login.bootstrap = function (app) {
        return new Login(app);
    };
    Login.prototype.attach = function (pathToAttach) {
        if (pathToAttach) {
            this.app.use(pathToAttach, this.router);
        }
        else {
            this.app.use('/', this.router);
        }
    };
    Login.prototype.addLoginRoute = function () {
        this.router.post('/login', function (req, res) {
            user_1.default.findOne({
                email: req.body.email
            }, function (err, user) {
                if (err) {
                    throw err;
                }
                if (user) {
                    user.comparePassword(req.session.password, function (err, isMatch) {
                        if (err) {
                            throw err;
                        }
                        if (isMatch) {
                            req.session.user = {
                                email: user.get('email'),
                                createdAt: user.get('createdAt'),
                                lastLogin: user.get('lastLogin')
                            };
                            res.redirect('/welcome');
                        }
                    });
                }
                req.session.flash = {
                    error: {
                        status: 401,
                        message: 'Sorry, the credentials you provided are wrong'
                    }
                };
                res.redirect('/');
            });
        });
    };
    Login.prototype.addLogoutRoute = function () {
        var vueScope = new vueScope_1.default();
        this.router.post('/logout', function (req, res) {
            req.session = null;
            res.redirect('/');
        });
    };
    return Login;
}());
exports.Login = Login;
