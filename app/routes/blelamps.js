const express = require('express');
const VueScope = require('../models/vueScope');
const FlashMessage = require('../services/flashMessage');
// const PeripheralService = require('../services/peripheralService');

/*initialize PeripheralService
TODO initialize elsewhere*/
// const peripheralService = new PeripheralService();
// try {
//     peripheralService.startScanAndConnectToBleLamps();
// } catch (err) {
//     console.warn(err.message);
// }

/**
 * @export
 * @class BleLamps
 */
class BleLamps {

    /**
     * @static
     * @param {Express.Application} app 
     * @returns 
     * 
     * @memberOf BleLamps
     */
    static bootstrap(app) {
        return new BleLamps(app);
    }

    /**
     * Creates an instance of BleLamps.
     * @param {Express.Application} app 
     * 
     * @memberOf BleLamps
     */
    constructor(app) {
        this.app = app;
        this.router = express.Router();
        this._addRootRoute();
    }

    /**
     * @param {string} [pathToAttach='/'] 
     * 
     * @memberOf BleLamps
     */
    attach(pathToAttach = '/') {
        if (pathToAttach) {
            this.app.use(pathToAttach, this.router);
        } else {
            this.app.use('/', this.router);
        }
    }

    /**
     * @memberOf BleLamps
     */
    _addRootRoute() {
        this.router.get('/', (req, res) => {
            const vueScope = new VueScope();
            vueScope.addData({ user: req.session.user });
            res.render('blelamps/index', vueScope.getScope());
        });
    }

    /**
     * @memberOf BleLamps
     */
    _addLampColorRoute() {
        this.router.get('/color/:color', (req, res) => {
            //peripheralService.setLampColor(peripheralService.getConnectedPeripherals()[0], req.params.color);
            res.end('ok');
        });
    }
}

module.exports = BleLamps;
