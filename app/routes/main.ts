/**
 * @class Main
 * @extends Router Interface
 */
import * as express from 'express';
import {
    FlashMessage
} from '../services/flashMessage';
import VueScope from '../models/vueScope';

export class Main {

    public static bootstrap(app: express.Application) {
        return new Main(app);
    }

    public app: express.Application;
    public router: express.Router;

    constructor(app: express.Application) {
        this.app = app;
        this.router = express.Router();
        this.addHomeRoute();
        this.addWelcomeRoute();
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
            const vueScope = new VueScope();
            FlashMessage.checkAndInvalidateFlash(req);
            vueScope.addData({
                flash: req.session.flash
            });
            res.render('main/main', vueScope.getScope());
        });
    }

    private addWelcomeRoute(): void {
        this.router.get('/welcome', (req: express.Request, res: express.Response) => {
            const vueScope = new VueScope();
            FlashMessage.checkAndInvalidateFlash(req);
            vueScope.addData({
                user: req.session.user
            });
            res.render('main/welcome', vueScope.getScope());
        });
    }
}
