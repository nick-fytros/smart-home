/**
 * @class Auth
 */
import * as express from 'express';
import * as mongoose from 'mongoose';
import {
    IUser
} from '../interfaces/user';
import VueScope from '../models/vueScope';
import User from '../models/user';
import {
    FlashMessage
} from '../services/flashMessage';

export class Auth {

    public static bootstrap(app: express.Application) {
        return new Auth(app);
    }

    private app: express.Application;
    private router: express.Router;
    private MongooseUser: mongoose.Model < IUser > ;

    constructor(app: express.Application) {
        this.app = app;
        this.router = express.Router();
        this.MongooseUser = mongoose.model < IUser > ('User');
        this.addLoginRoute();
        this.addLogoutRoute();
        this.addSignupRoute();
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
            this.MongooseUser.findOne({
                email: req.body.email
            }, (err, user: IUser) => {
                if (err) {
                    throw err;
                }
                if (user) {
                    user.comparePassword(req.session.password, (err: Error, isMatch: boolean) => {
                        if (err) {
                            throw err;
                        }
                        if (isMatch) {
                            req.session.user = new User(user);
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

    private addSignupRoute(): void {
        this.router.get('/signup', (req: express.Request, res: express.Response) => {
            const vueScope = new VueScope();
            vueScope.addData({
                title: 'Smart Home - Sign up'
            });
            res.render('auth/signup', vueScope);
        });
        this.router.post('/signup', (req: express.Request, res: express.Response) => {
            const newUser = new this.MongooseUser({
                email: req.body.email,
                password: req.body.password
            });
            newUser.save().then((user) => {
                req.session.user = new User(user);
                res.redirect('/welcome');
            }).catch((err) => {
                FlashMessage.setFlashMessage(req, {
                    error: {
                        status: 401,
                        message: err.message
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
