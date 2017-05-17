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
        this._addBulbColorRoute();
        this._addBulbCustomNameRoute();
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
                csrfToken: req.csrfToken(),
                connectedBubls: []
            });
            req.scope.addComponents(['bulb']);
            if (req.app.locals.peripheralService) {
                const connectedBubls = req.app.locals.peripheralService.getConnectedBleBulbPeripheralsData();
                if (connectedBubls.length > 0){
                    req.scope.addData({
                        connectedBubls: connectedBubls
                    });
                }
            }
            res.render('blebulbs/index', req.scope.getScope());
        });
    }

    _addScanRoute() {
        this.router.post('/scan', (req, res) => {
            if (req.app.locals.peripheralService) {
                res.send('ok');
            } else {
                try {
                    req.app.locals.peripheralService = new PeripheralService(req);
                    res.send('ok');
                } catch (error) {
                    res.json({ error: error.message });
                }
            }
        });
    }

    _addDiscoveredBulbsRoute() {
        this.router.get('/discovered', (req, res) => {
            if (req.app.locals.peripheralService) {
                const discoveredBulbsData = req.app.locals.peripheralService.getDiscoveredBleBulbPeripheralsData();
                res.json({ bulbs: discoveredBulbsData });
            } else {
                res.json({ error: 'Please run scan again' });
            }

        });
    }

    _addConnectToBulbRoute() {
        this.router.post('/connect', (req, res) => {
            const bublId = req.body.bulbId;
            if (req.app.locals.peripheralService) {
                const discoveredBulbPeripherals = req.app.locals.peripheralService.getDiscoveredPeripherals();
                req.app.locals.peripheralService.connectToPeripheralAndInit(discoveredBulbPeripherals[bublId]).then((connectedBulbs) => {
                    res.json({ bulbs: connectedBulbs });
                }).catch((error) => {
                    res.json({ error: error.message });
                });
            } else {
                res.json({ error: 'Please run scan again' });
            }

        });
    }

    _addBulbColorRoute() {
        this.router.post('/color', (req, res) => {
            const bulbId = req.body.bulbId;
            const color = req.body.color;
            req.app.locals.peripheralService.setBulbColor(req.app.locals.peripheralService.getConnectedPeripherals()[bulbId], color).then((bulbs) => {
                res.json({bulbs: bulbs});
            }).catch((error) => {
                res.json({error: error.message});
            });
        });
    }

    _addBulbCustomNameRoute() {
        this.router.post('/name', (req, res) => {
            const bulbId = req.body.bulbId;
            const customName = req.body.customName;
            req.app.locals.peripheralService.setBulbCustomName(req.app.locals.peripheralService.getConnectedPeripherals()[bulbId], customName);
            res.json();
        });
    }
}

module.exports = BleBulbs;
