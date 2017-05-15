const express = require('express');
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
     */
    static bootstrap(app) {
        return new BleBulbs(app);
    }

    /**
     * Creates an instance of BleBulbs.
     * @param {Express.Application} app 
     */
    constructor(app) {
        this.app = app;
        this.router = express.Router();
        this._addRootRoute();
        this._addScanRoute();
        this._addDiscoveredBulbsRoute();
        this._addConnectToBulbRoute();
    }

    /**
     * @param {string} [pathToAttach='/'] 
     */
    attach(pathToAttach = '/') {
        if (pathToAttach) {
            this.app.use(pathToAttach, this.router);
        } else {
            this.app.use('/', this.router);
        }
    }

    _addRootRoute() {
        this.router.get('/', (req, res) => {
            req.scope.addData({
                user: req.session.user,
                csrfToken: req.csrfToken()
            });
            res.render('blebulbs/index', req.scope.getScope());
        });
    }

    _addScanRoute() {
        this.router.post('/scan', (req, res) => {
            if (req.app.locals.peripheralService) {
                res.status(200).send('ok');
            } else {
                try {
                    req.app.locals.peripheralService = new PeripheralService(req);
                    res.status(200).send('ok');
                } catch (error) {
                    res.status(200).json({ error: error.message });
                }
            }
        });
    }

    _addDiscoveredBulbsRoute() {
        this.router.get('/discovered', (req, res) => {
            if (req.app.locals.peripheralService) {
                const discoveredBulbsData = req.app.locals.peripheralService.getDiscoveredBleBulbPeripherals();
                res.status(200).json({ bulbs: discoveredBulbsData });
            } else {
                res.status(200).json({ error: 'Please run scan again' });
            }

        });
    }

    _addConnectToBulbRoute() {
        this.router.post('/connect', (req, res) => {
            const bublId = req.body.bulbId;
            if (req.app.locals.peripheralService) {
                const discoveredBulbPeripherals = req.app.locals.peripheralService.getDiscoveredPeripherals();
                req.app.locals.peripheralService.connectToPeripheralAndInit(discoveredBulbPeripherals[bublId]).then((connectedBulbs) => {
                    console.log(connectedBulbs);
                    res.status(200).json({ bulbs: connectedBulbs });
                }).catch((error) => {
                    res.status(200).json({ error: error.message });
                });
            } else {
                res.status(200).json({ error: 'Please run scan again' });
            }

        });
    }

    _addLampColorRoute() {
        this.router.get('/color/:color', (req, res) => {
            //peripheralService.setLampColor(peripheralService.getConnectedPeripherals()[0], req.params.color);
            res.end('ok');
        });
    }
}

module.exports = BleBulbs;
