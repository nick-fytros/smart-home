const express = require('express');
const mongoose = require('mongoose');
const VueScope = require('../models/vueScope');

const User = require('../models/user');
const FlashService = require('../services/flashService');

/**
 * @export
 * @class Admin
 */
class Admin {

    /**
     * @static
     * @param {Express.Application} app 
     * @returns 
     * 
     * @memberOf Admin
     */
    static bootstrap(app) {
        return new Admin(app);
    }

    /**
     * Creates an instance of Admin.
     * @param {Express.Application} app 
     * 
     * @memberOf Admin
     */
    constructor(app) {
        this.app = app;
        this.router = express.Router();
        this.MongooseUser = mongoose.model('User');
        this._addRootRoute();
    }

    /**
     * @param {string} [pathToAttach='/'] 
     * 
     * @memberOf Admin
     */
    attach(pathToAttach = '/') {
        this.app.use(pathToAttach, this.router);
    }

    /**
     * @memberOf Admin
     */
    _addRootRoute() {
        this.router.get('/', (req, res) => {
            if (!(req.session.user && req.session.user.role === 'admin')) res.redirect('/');
            const vueScope = new VueScope();
            vueScope.addData({ user: req.session.user });
            this.MongooseUser.find().then((users) => {
                vueScope.addData({ users: users });
                res.render('admin/index', vueScope.getScope());
            }).catch((err) => {
                throw err;
            });
        });
    }

    /**
     * @memberOf Admin
     */
    _addLoginRoute() {
        this.router.post('/login', (req, res) => {
            if (!(req.session.user && req.session.user.role === 'admin')) res.redirect('/');
            this.MongooseUser.findOne({
                email: req.body.email
            }, (err, user) => {
                if (err) {
                    throw err;
                }
                if (user) {
                    user.comparePassword(req.body.password, (err, isMatch) => {
                        if (err) {
                            throw err;
                        }
                        if (isMatch) {
                            req.session.user = new User(user);
                            delete req.session.user.password;
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
            });
        });
    }

    /**
     * @memberOf Admin
     */
    _addSignupRoute() {
        this.router.get('/signup', (req, res) => {
            if (!(req.session.user && req.session.user.role === 'admin')) res.redirect('/');
            /* if user is logged in redirect to apps page */
            if (req.session.user) {
                res.redirect('/apps');
            } else {
                const vueScope = new VueScope();
                vueScope.addData({ title: 'Smart Home - Sign up' });
                res.render('Admin/signup', vueScope.getScope());
            }
        });

        this.router.post('/signup', (req, res) => {
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

}

module.exports = Admin;