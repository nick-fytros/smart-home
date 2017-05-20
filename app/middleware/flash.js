/**
 * @export
 * @class Flash
 */
class Flash {

    /**
     * @static
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @param {Function} next 
     * 
     * @memberOf Flash
     */
    static invalidateFlash(req, res, next) {
        if (req.session && req.session.flash && req.session.flashExpired === false) {
            req.session.flashExpired = true;
        } else if (req.session && req.session.flash && req.session.flashExpired === true) {
            req.session.flash = null;
        }
        next();
    }
}

module.exports = Flash;
