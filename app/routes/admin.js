const express = require('express');
const mongoose = require('mongoose');
const SecurityMiddleware = require('../middleware/security');
const VueScope = require('../models/vue-scope');

const User = require('../models/user');
const FlashService = require('../services/flash-service');

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
        this.MongooseToken = mongoose.model('Token');
        this._addRootRoute();
        this._addUserUpdateRoute();
        this._addUserDeleteRoute();
        this._addTokenGenerateRoute();
        this._addTokenDeleteRoute();
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
                this.MongooseToken.find().then((tokens) => {
                    vueScope.addData({
                        users: users,
                        tokens: tokens,
                        csrfToken: req.csrfToken()
                    });
                    vueScope.addComponent('userrow');
                    vueScope.addComponent('tokenrow');
                    res.render('admin/index', vueScope.getScope());
                }).catch((err) => {
                    res.status(500).send({ error: 'Tokens get failed' });
                });
            }).catch((err) => {
                res.status(500).send({ error: 'Users get failed' });
            });
        });
    }

    /**
     * @memberOf Admin
     */
    _addUserUpdateRoute() {
        this.router.post('/user/update', (req, res) => {
            // only role can be updated for now
            if (!req.body.update.role) res.status(400).send({ error: 'Wrong input data' });
            this.MongooseUser.findOneAndUpdate(
                { email: req.body.user.email },
                { $set: { role: req.body.update.role } },
                { new: true }
            ).then((user) => {
                if (user) {
                    res.status(200).send({ user: user });
                } else {
                    res.status(404).send({ error: 'User not found' });
                }
            }).catch((error) => {
                res.status(500).send({ error: 'User update failed' });
            });
        });
    }

    /**
     * @memberOf Admin
     */
    _addUserDeleteRoute() {
        this.router.post('/user/delete', (req, res) => {
            this.MongooseUser.findOneAndRemove(
                { email: req.body.user.email }
            ).then((user) => {
                if (user) {
                    res.status(200).send({ user: user });
                } else {
                    res.status(404).send({ error: 'User not found' });
                }
            }).catch((error) => {
                res.status(500).send({ error: 'User delete failed' });
            });
        });
    }

    /**
     * @memberOf Admin
     */
    _addTokenGenerateRoute() {
        this.router.post('/token/generate', (req, res) => {
            const newToken = new this.MongooseToken();
            newToken.save().then((token) => {
                if (token) {
                    res.status(200).send({ token: token });
                } else {
                    res.status(404).send({ error: 'Token not found' });
                }
            }).catch((error) => {
                console.log(error);
                res.status(500).send({ error: 'Token generation failed' });
            });
        });
    }

    /**
     * @memberOf Admin
     */
    _addTokenDeleteRoute() {
        this.router.post('/token/delete', (req, res) => {
            this.MongooseToken.findOneAndRemove(
                { val: req.body.token.val }
            ).then((token) => {
                if (token) {
                    res.status(200).send({ token: token });
                } else {
                    res.status(404).send({ error: 'Token not found' });
                }
            }).catch((error) => {
                res.status(500).send({ error: 'Token delete failed' });
            });
        });
    }

}

module.exports = Admin;