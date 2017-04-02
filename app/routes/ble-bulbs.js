const express = require('express');
const VueScope = require('../models/vue-scope');
const PeripheralService = require('../services/peripheral-service');

/**
 * @export
 * @class BleBulbs
 */
class BleBulbs {

    /**
     * @static
     * @param {Express.Application} app 
     * @returns 
     * 
     * @memberOf BleBulbs
     */
    static bootstrap(app) {
        return new BleBulbs(app);
    }

    /**
     * Creates an instance of BleBulbs.
     * @param {Express.Application} app 
     * 
     * @memberOf BleBulbs
     */
    constructor(app) {
        this.app = app;
        this.router = express.Router();
        this._addRootRoute();
        this._addScanRoute();
        this._addDiscoveredBulbsRoute();
    }

    /**
     * @param {string} [pathToAttach='/'] 
     * 
     * @memberOf BleBulbs
     */
    attach(pathToAttach = '/') {
        if (pathToAttach) {
            this.app.use(pathToAttach, this.router);
        } else {
            this.app.use('/', this.router);
        }
    }

    /**
     * @memberOf BleBulbs
     */
    _addRootRoute() {
        this.router.get('/', (req, res) => {
            const vueScope = new VueScope();
            vueScope.addData({
                user: req.session.user,
                csrfToken: req.csrfToken()
            });
            res.render('blebulbs/index', vueScope.getScope());
        });
    }

    /**
     * @memberOf BleBulbs
     */
    _addScanRoute() {
        this.router.post('/scan', (req, res) => {
            if (req.app.locals.peripheralService) {
                res.status(200).send('ok');
            } else {
                try {
                    req.app.locals.peripheralService = new PeripheralService(req);
                    res.status(200).send('ok');
                } catch (error) {
                    res.status(200).send({ error: error.message });
                }
            }
        });
    }

    /**
     * @memberOf BleBulbs
     */
    _addDiscoveredBulbsRoute() {
        this.router.get('/discovered', (req, res) => {
            if (req.app.locals.peripheralService) {
                const discoveredBulbsData = req.app.locals.peripheralService.getDiscoveredBleBulbPeripherals();
                res.status(200).send({ bulbs: discoveredBulbsData });
            } else {
                res.status(200).send({ error: 'err' });
            }

        });
    }

    /**
     * @memberOf BleBulbs
     */
    _addLampColorRoute() {
        this.router.get('/color/:color', (req, res) => {
            //peripheralService.setLampColor(peripheralService.getConnectedPeripherals()[0], req.params.color);
            res.end('ok');
        });
    }
}

module.exports = BleBulbs;
