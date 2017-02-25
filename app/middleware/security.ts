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
        if (req.session.user) {
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
