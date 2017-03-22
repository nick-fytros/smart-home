/**
 * @export
 * @class AppError
 * @extends {Error}
 */
class AppError extends Error {

    /**
     * Creates an instance of AppError.
     * @param {string} message 
     * @param {number} status 
     * 
     * @memberOf AppError
     */
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports = AppError;