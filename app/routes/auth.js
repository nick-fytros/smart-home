const express = require('express');
const mongoose = require('mongoose');
const VueScope = require('../models/vueScope');

const User = require('../models/user');
const FlashMessage = require('../services/flashMessage');

/**
 * @export
 * @class Auth
 */
class Auth {

    /**
     * @static
     * @param {Express.Application} app 
     * @returns 
     * 
     * @memberOf Auth
     */
    static bootstrap(app) {
        return new Auth(app);
    }

    /**
     * Creates an instance of Auth.
     * @param {Express.Application} app 
     * 
     * @memberOf Auth
     */
    constructor(app) {
        this.app = app;
        this.router = express.Router();
        this.MongooseUser = mongoose.model('User');
        this._addLoginRoute();
        this._addLogoutRoute();
        this._addSignupRoute();
    }

    /**
     * @param {string} [pathToAttach='/'] 
     * 
     * @memberOf Auth
     */
    attach(pathToAttach = '/') {
        this.app.use(pathToAttach, this.router);
    }

    /**
     * @memberOf Auth
     */
    _addLoginRoute() {
        this.router.post('/login', (req, res) => {
            this.MongooseUser.findOne({
                email: req.body.email
            }, (err, user) => {
                if (err) {
                    throw err;
                }
                if (user) {
                    user.comparePassword(req.session.password, (err, isMatch) => {
                        if (err) {
                            throw err;
                        }
                        if (isMatch) {
                            req.session.user = new User(user);
                            res.redirect('/welcome');
                        }
                    });
                }
                FlashMessage.setFlashMessage(req, {
                    error: {
                        status: 401,
                        message: 'Sorry, the credentials you provided are wrong'
                    }
                });
                res.redirect('/');
            });
        });
    }

    /**
     * @memberOf Auth
     */
    _addSignupRoute() {
        this.router.get('/signup', (req, res) => {
            const vueScope = new VueScope();
            vueScope.addData({
                title: 'Smart Home - Sign up'
            });
            res.render('auth/signup', vueScope);
        });
        this.router.post('/signup', (req, res) => {
            const newUser = new this.MongooseUser({
                email: req.body.email,
                password: req.body.password
            });
            newUser.save().then((user) => {
                req.session.user = new User(user);
                res.redirect('/welcome');
            }).catch((err) => {
                FlashMessage.setFlashMessage(req, {
                    error: {
                        status: 401,
                        message: err.message
                    }
                });
                res.redirect('/');
            });
        });
    }

    /**
     * @memberOf Auth
     */
    _addLogoutRoute() {
        this.router.post('/logout', (req, res) => {
            req.session.user = null;
            FlashMessage.setFlashMessage(req, {
                success: {
                    status: 200,
                    message: 'You have successfully logged out.'
                }
            });
            res.redirect('/');
        });
    }
}

module.exports = Auth;