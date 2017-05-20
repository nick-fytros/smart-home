const express = require('express');
const FlashService = require('../services/flash-service');

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
        this._addAppsRoute();
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
            if (req.session && req.session.flash) {
                req.scope.addData({ flash: req.session.flash });
            }
            /* if a user is already logged in redirect to apps page */
            if (req.session.user) {
                res.redirect('/apps');
            } else {
                req.scope.addData({ csrfToken: req.csrfToken() });
                res.render('main/index', req.scope.getScope());
            }
        });
    }

    /**
     * @memberOf Main
     */
    _addAppsRoute() {
        this.router.get('/apps', (req, res) => {
            req.scope.addData({
                user: req.session.user,
                applications: req.app.locals.applications
            });
            res.render('main/apps', req.scope.getScope());
        });
    }
}

module.exports = Main;
