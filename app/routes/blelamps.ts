/**
 * @class BleLamps
 * @extends Router Interface
 */
import * as express from 'express';
import VueScope from '../models/vueScope';
import PeripheralService from '../services/peripheralService';

// initialize PeripheralService
// TODO initialize elsewhere
const peripheralService = new PeripheralService();
try {
    peripheralService.startScanAndConnectToBleLamps();
} catch (err) {
    console.warn(err.message);
}

export class BleLamps {

    public static bootstrap(app: express.Application) {
        return new BleLamps(app);
    }

    public app: express.Application;
    public router: express.Router;

    constructor(app: express.Application) {
        this.app = app;
        this.router = express.Router();
        this.addHomeRoute();
    }

    public attach(pathToAttach ?: string): void {
        if (pathToAttach) {
            this.app.use(pathToAttach, this.router);
        } else {
            this.app.use('/', this.router);
        }
    }

    private addHomeRoute(): void {
        this.router.get('/', (req: express.Request, res: express.Response) => {
            res.end('ok');
        });

    }

    private addLampColorRoute(): void {
        this.router.get('/color/:color', (req: express.Request, res: express.Response) => {
            peripheralService.setLampColor(peripheralService.getConnectedPeripherals()[0], req.params.color);
            res.end('ok');
        });
    }
}
