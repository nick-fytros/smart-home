/**
 * @export
 * @class User
 */
class User {

    /**
     * Creates an instance of User.
     * @param {Object} user 
     * 
     * @memberOf User
     */
    constructor(user) {
        this._email = user.email;
        this._password = user.password;
        this._createdOn = user.createdOn;
        this._lastLogin = user.lastLogin;
        this._role = user.role;
    }

    get email(){
        return this._email;
    }
    get password() {
        return this._password;
    }
    get createdOn() {
        return this._createdOn;
    }
    get lastLogin() {
        return this._lastLogin;
    }
    get role() {
        return this._role;
    }
}

module.exports = User;