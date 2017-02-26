/**
 * @class Security
 */
import {
    Request,
    Response,
    NextFunction
} from 'express';
import VueScope from '../models/vueScope';

export class Security {

    public static checkIfUserLoggedIn(req: Request, res: Response, next: NextFunction) {
        // exclude the login path
        if (req.session.user || req.path === '/auth/login' || req.path === '/') {
            next();
        } else {
            res.redirect('/');
        }
    }
}
