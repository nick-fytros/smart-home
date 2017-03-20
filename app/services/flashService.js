/**
 * @export
 * @class FlashService
 */
class FlashService {
    /**
     * @static
     * @param {Express.Request} req 
     * @param {Object} flashData 
     * 
     * @memberOf FlashService
     */
    static setFlashData(req, flashData) {
        req.session.flash = flashData;
        req.session.flashExpired = false;
    }
}

module.exports = FlashService;
