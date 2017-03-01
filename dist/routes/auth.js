"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var vueScope_1 = require("../models/vueScope");
var user_1 = require("../models/user");
var flashMessage_1 = require("../services/flashMessage");
var Auth = (function () {
    function Auth(app) {
        this.app = app;
        this.router = express.Router();
        this.MongooseUser = mongoose.model('User');
        this.addLoginRoute();
        this.addLogoutRoute();
        this.addSignupRoute();
    }
    Auth.bootstrap = function (app) {
        return new Auth(app);
    };
    Auth.prototype.attach = function (pathToAttach) {
        if (pathToAttach) {
            this.app.use(pathToAttach, this.router);
        }
        else {
            this.app.use('/', this.router);
        }
    };
    Auth.prototype.addLoginRoute = function () {
        var _this = this;
        this.router.post('/login', function (req, res) {
            _this.MongooseUser.findOne({
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
                            req.session.user = new user_1.default(user);
                            res.redirect('/welcome');
                        }
                    });
                }
                flashMessage_1.FlashMessage.setFlashMessage(req, {
                    error: {
                        status: 401,
                        message: 'Sorry, the credentials you provided are wrong'
                    }
                });
                res.redirect('/');
            });
        });
    };
    Auth.prototype.addSignupRoute = function () {
        var _this = this;
        this.router.get('/signup', function (req, res) {
            var vueScope = new vueScope_1.default();
            vueScope.addData({
                title: 'Smart Home - Sign up'
            });
            res.render('auth/signup', vueScope);
        });
        this.router.post('/signup', function (req, res) {
            var newUser = new _this.MongooseUser({
                email: req.body.email,
                password: req.body.password
            });
            newUser.save().then(function (user) {
                req.session.user = new user_1.default(user);
                res.redirect('/welcome');
            }).catch(function (err) {
                flashMessage_1.FlashMessage.setFlashMessage(req, {
                    error: {
                        status: 401,
                        message: err.message
                    }
                });
                res.redirect('/');
            });
        });
    };
    Auth.prototype.addLogoutRoute = function () {
        this.router.post('/logout', function (req, res) {
            req.session.user = null;
            flashMessage_1.FlashMessage.setFlashMessage(req, {
                success: {
                    status: 200,
                    message: 'You have successfully logged out.'
                }
            });
            res.redirect('/');
        });
    };
    return Auth;
}());
exports.Auth = Auth;
