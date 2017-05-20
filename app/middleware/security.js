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
            if (req.xhr) {
                res.status(401).send('Not authorized');
            } else {
                res.redirect('/');
            }
        }
    }

    static checkIfUserIsAdmin(req, res, next) {
        if (req.session && req.session.user && req.session.user.role === 'admin') {
            next();
        } else {
            if (req.xhr) {
                res.status(401).send('Not authorized');
            } else {
                res.redirect('/');
            }
        }
    }
}

module.exports = Security;