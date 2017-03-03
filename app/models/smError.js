/**
 * @export
 * @class SmError
 * @extends {Error}
 */
class SmError extends Error {

    /**
     * Creates an instance of SmError.
     * @param {string} message 
     * @param {number} status 
     * 
     * @memberOf SmError
     */
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports = SmError;