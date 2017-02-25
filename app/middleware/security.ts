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
        if (req.session.user || req.path === '/auth/login') {
            next();
        } else {
            const vueScope = new VueScope();
            vueScope.addData({
                title: 'Smart Home - Login',
                subtitle: 'Grünerløkka, Oslo'
            });
            res.render('main/main', vueScope.getScope());
        }
    }
}
