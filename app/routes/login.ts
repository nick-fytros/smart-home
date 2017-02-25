/**
 * @class Login
 * @extends Router Interface
 */
import * as express from 'express';
import * as interfaces from '../interfaces/router';
import VueScope from '../models/vueScope';
import User from '../models/user';

export class Login implements interfaces.IRouter {

    public static bootstrap(app: express.Application) {
        return new Login(app);
    }

    public app: express.Application;
    public router: express.Router;

    constructor(app: express.Application) {
        this.app = app;
        this.router = express.Router();
        this.addLoginRoute();
    }

    public attach(pathToAttach ?: string): void {
        if (pathToAttach) {
            this.app.use(pathToAttach, this.router);
        } else {
            this.app.use('/', this.router);
        }
    }

    private addLoginRoute(): void {
        const vueScope = new VueScope();

        this.router.post('/login', (req: express.Request, res: express.Response) => {
            User.findOne({
                email: req.body.email
            }, (err, user) => {
                if (err) {
                    throw err;
                }
                if (user) {
                    user.comparePassword(req.session.password, (err: Error, isMatch: boolean) => {
                        if (err) {
                            throw err;
                        }
                        if (isMatch) {
                            req.session.user = {
                                email: user.get('email'),
                                createdAt: user.get('createdAt'),
                                lastLogin: user.get('lastLogin')
                            };
                            vueScope.addData({
                                user: req.session.user
                            });
                            res.render('main/welcome', vueScope.getScope());
                        }
                    });
                }
                vueScope.addData({
                    error: {
                        status: 401,
                        message: 'Sorry, the credentials you provided are wrong'
                    },
                });
                res.render('main/main', vueScope.getScope());
            });
        });
    }

    private addLogoutRoute(): void {
        const vueScope = new VueScope();

        this.router.post('/logout', (req: express.Request, res: express.Response) => {
            req.session = null;
            res.render('main/main', vueScope.getScope());
        });
    }
}
