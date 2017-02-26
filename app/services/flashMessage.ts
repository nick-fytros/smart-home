/**
 * @class FlashMessage
 */

import {
    Request
} from 'express';

export class FlashMessage {
    public static checkAndInvalidateFlash(req: Request) {
        if (req.session && req.session.flash && req.session.flashExpired === false) {
            req.session.flashExpired = true;
        }else if (req.session && req.session.flash && req.session.flashExpired === true) {
            req.session.flash = null;
        }
    }

    public static setFlashMessage(req: Request, flashMessage: object) {
        req.session.flash = flashMessage;
        req.session.flashExpired = false;
    }
}
