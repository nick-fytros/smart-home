const VueScope = require('../models/vueScope');

/**
 * @export
 * @class Security
 */
class Security {

    /**
     * @static
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @param {Function} next 
     * 
     * @memberOf Security
     */
    static checkIfUserIsLoggedIn(req, res, next) {
        // exclude the login path
        if (req.session.user || req.path === '/auth/login' || req.path === '/auth/signup' || req.path === '/') {
            next();
        } else {
            res.redirect('/');
        }
    }
}

module.exports = Security;
