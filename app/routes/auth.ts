/**
 * @class Auth
 * @extends Router Interface
 */
import * as express from 'express';
import * as interfaces from '../interfaces/router';
import VueScope from '../models/vueScope';
import persistentUser from '../models/persistentUser';
import {
    FlashMessage
} from '../services/flashMessage';

export class Auth implements interfaces.IRouter {

    public static bootstrap(app: express.Application) {
        return new Auth(app);
    }

    public app: express.Application;
    public router: express.Router;

    constructor(app: express.Application) {
        this.app = app;
        this.router = express.Router();
        this.addLoginRoute();
        this.addLogoutRoute();
    }

    public attach(pathToAttach ?: string): void {
        if (pathToAttach) {
            this.app.use(pathToAttach, this.router);
        } else {
            this.app.use('/', this.router);
        }
    }

    private addLoginRoute(): void {
        this.router.post('/login', (req: express.Request, res: express.Response) => {
            persistentUser.findOne({
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
                            res.redirect('/welcome');
                        }
                    });
                }
                FlashMessage.setFlashMessage(req, {
                    error: {
                        status: 401,
                        message: 'Sorry, the credentials you provided are wrong'
                    }
                });
                res.redirect('/');
            });
        });
    }

    private addLogoutRoute(): void {
        this.router.post('/logout', (req: express.Request, res: express.Response) => {
            req.session.user = null;
            FlashMessage.setFlashMessage(req, {
                success: {
                    status: 200,
                    message: 'You have successfully logged out.'
                }
            });
            res.redirect('/');
        });
    }
}
