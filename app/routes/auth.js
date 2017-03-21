const express = require('express');
const mongoose = require('mongoose');
const VueScope = require('../models/vueScope');

const User = require('../models/user');
const FlashService = require('../services/flashService');

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
            }).then((user) => {
                if (user) {
                    user.comparePassword(req.body.password, (err, isMatch) => {
                        if (err) {
                            throw err;
                        }
                        if (isMatch) {
                            req.session.user = new User(user);
                            delete req.session.user.password;
                            user.lastLogin = Date.now();
                            user.save();
                            res.redirect('/apps');
                        }
                    });
                } else {
                    FlashService.setFlashData(req, {
                        error: {
                            status: 401,
                            message: 'Sorry, the credentials you provided are wrong'
                        }
                    });
                    res.redirect('/');
                }
            }).catch((error) => {
                throw error;
            });
        });
    }

    /**
     * @memberOf Auth
     */
    _addSignupRoute() {
        this.router.get('/signup', (req, res) => {
            /* if user is logged in redirect to apps page */
            if (req.session.user) {
                res.redirect('/apps');
            } else {
                const vueScope = new VueScope();
                vueScope.addData({ csrfToken: req.csrfToken() });
                res.render('auth/signup', vueScope.getScope());
            }
        });

        this.router.post('/signup', (req, res) => {
            const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(req.body.email) || req.body.password === '' || req.body.password !== req.body.repeatpassword ){
                FlashService.setFlashData(req, {
                    error: {
                        status: 422,
                        message: 'The info you provided are not following the rules.'
                    }
                });
                res.redirect('/auth/signup');
            }
            const newUser = new this.MongooseUser({
                email: req.body.email,
                password: req.body.password
            });
            newUser.save().then((user) => {
                req.session.user = new User(user);
                delete req.session.user.password;
                res.redirect('/apps');
            }).catch((err) => {
                FlashService.setFlashData(req, {
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
        this.router.get('/logout', (req, res) => {
            req.session.user = null;
            FlashService.setFlashData(req, {
                success: {
                    status: 200,
                    message: 'You have successfully signed out.'
                }
            });
            res.redirect('/');
        });
    }
}

module.exports = Auth;