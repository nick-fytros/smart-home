"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FlashMessage = (function () {
    function FlashMessage() {
    }
    FlashMessage.checkAndInvalidateFlash = function (req) {
        if (req.session && req.session.flash && req.session.flashExpired === false) {
            req.session.flashExpired = true;
        }
        else if (req.session && req.session.flash && req.session.flashExpired === true) {
            req.session.flash = null;
        }
    };
    FlashMessage.setFlashMessage = function (req, flashMessage) {
        req.session.flash = flashMessage;
        req.session.flashExpired = false;
    };
    return FlashMessage;
}());
exports.FlashMessage = FlashMessage;
