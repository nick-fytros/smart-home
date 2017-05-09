const VueScope = require('../models/vue-scope');

/**
 * @export
 * @class Scope
 */
class Scope {

    /**
     * @static
     * @param {Express.Request} req 
     * @param {Express.Response} res 
     * @param {Function} next 
     * 
     * @memberOf Scope
     */
    static setScope(req, res, next) {
		const vueScope = new VueScope();
        req.scope = vueScope;
        next();
    }
}

module.exports = Scope;
