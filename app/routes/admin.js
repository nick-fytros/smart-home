const express = require('express');
const mongoose = require('mongoose');
const SecurityMiddleware = require('../middleware/security');
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
        this.router.use(SecurityMiddleware.checkIfUserIsAdmin);
        this.MongooseUser = mongoose.model('User');
        this._addRootRoute();
        this._addUserUpdateRoute();
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
            const vueScope = new VueScope();
            vueScope.addData({ user: req.session.user });
            this.MongooseUser.find().then((users) => {
                vueScope.addData({
                    users: users,
                    csrfToken: req.csrfToken()
                });
                vueScope.addComponent('userrow');
                res.render('admin/index', vueScope.getScope());
            }).catch((err) => {
                throw err;
            });
        });
    }

    /**
     * @memberOf Admin
     */
    _addUserUpdateRoute() {
        this.router.post('/update/user', (req, res) => {
            this.MongooseUser.findOne({
                email: req.body.user.email
            }).then((user) => {
                // only role can be updated for now
                if (!req.body.update.role) res.status(400).send({ error: 'Wrong input data'});
                user.role = req.body.update.role;
                user.save().then((user) => {
                    res.status(200).send({ user: user });
                }).catch((error) => {
                    res.status(500).send({ error: 'Server error'});
                });
            }).catch((error) => {
                res.status(404).send({ error: 'User not found'});
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