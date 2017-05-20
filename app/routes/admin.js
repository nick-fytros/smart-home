const express = require('express');
const mongoose = require('mongoose');
const SecurityMiddleware = require('../middleware/security');

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
     */
    static bootstrap(app) {
        return new Admin(app);
    }

    /**
     * Creates an instance of Admin.
     * @param {Express.Application} app 
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
     */
    attach(pathToAttach = '/') {
        this.app.use(pathToAttach, this.router);
    }

    _addRootRoute() {
        this.router.get('/', (req, res) => {
            req.scope.addData({ user: req.session.user });
            this.MongooseUser.find().then((users) => {
                this.MongooseToken.find().then((tokens) => {
                    req.scope.addData({
                        users: users,
                        tokens: tokens,
                        csrfToken: req.csrfToken()
                    });
                    req.scope.addComponents(['userrow', 'tokenrow']);
                    res.render('admin/index', req.scope.getScope());
                }).catch((err) => {
                    res.status(500).send({ error: 'Tokens get failed' });
                });
            }).catch((err) => {
                res.status(500).send({ error: 'Users get failed' });
            });
        });
    }

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
                res.status(500).send({ error: 'Token generation failed' });
            });
        });
    }

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