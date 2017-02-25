/**
 * @class Main
 * @extends Router Interface
 */
import * as express from 'express';
import * as interfaces from '../interfaces/router';
import VueScope from '../models/vueScope';

export class Main implements interfaces.IRouter {

    public static bootstrap(app: express.Application) {
        return new Main(app);
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
            const vueScope = new VueScope();
            vueScope.addData({
                title: 'Smart Home',
                subtitle: 'Grünerløkka, Oslo'
            });
            res.render('main/main', vueScope.getScope());
        });
    }
}
