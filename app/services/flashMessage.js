/**
 * @export
 * @class FlashMessage
 */
class FlashMessage {
    /**
     * @static
     * @param {Express.Request} req 
     * 
     * @memberOf FlashMessage
     */
    static checkAndInvalidateFlash(req) {
        if (req.session && req.session.flash && req.session.flashExpired === false) {
            req.session.flashExpired = true;
        } else if (req.session && req.session.flash && req.session.flashExpired === true) {
            req.session.flash = null;
        }
    }

    /**
     * 
     * 
     * @static
     * @param {Express.Request} req 
     * @param {Object} flashMessage 
     * 
     * @memberOf FlashMessage
     */
    static setFlashMessage(req, flashMessage) {
        req.session.flash = flashMessage;
        req.session.flashExpired = false;
    }
}

module.exports = FlashMessage;
