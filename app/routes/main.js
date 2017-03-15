const express = require('express');
const VueScope = require('../models/vueScope');
const FlashMessage = require('../services/flashMessage');

/**
 * @export
 * @class Main
 */
class Main {

    /**
     * @static
     * @param {Express.Application} app 
     * @returns 
     * 
     * @memberOf Main
     */
    static bootstrap(app) {
        return new Main(app);
    }

    /**
     * Creates an instance of Main.
     * @param {Express.Application} app 
     * 
     * @memberOf Main
     */
    constructor(app) {
        this.app = app;
        this.router = express.Router();
        this._addRootRoute();
        this._addWelcomeRoute();
    }

    /**
     * @param {string} [pathToAttach='/'] 
     * 
     * @memberOf Main
     */
    attach(pathToAttach = '/') {
        this.app.use(pathToAttach, this.router);
    }

    /**
     * @memberOf Main
     */
    _addRootRoute() {
        this.router.get('/', (req, res) => {
            const vueScope = new VueScope();
            FlashMessage.checkAndInvalidateFlash(req);
            if (req.session && req.session.flash) {
                vueScope.addData({ flash: req.session.flash });
            }
            /* if a user is already logged in redirect to welcome page */
            if (req.session.user) {
                res.redirect('/welcome');
            } else {
                vueScope.addData({ title: 'Smart Home - Sign in' });
                res.render('main/index', vueScope.getScope());
            }
        });
    }

    /**
     * @memberOf Main
     */
    _addWelcomeRoute() {
        this.router.get('/welcome', (req, res) => {
            const vueScope = new VueScope();
            FlashMessage.checkAndInvalidateFlash(req);
            vueScope.addData({
                user: req.session.user,
                applications: req.app.locals.applications
            });
            res.render('main/welcome', vueScope.getScope());
        });
    }
}

module.exports = Main;
