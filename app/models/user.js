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
        this.email = user.email;
        this.password = user.password;
        this.createdOn = user.createdOn;
        this.lastLogin = user.lastLogin;
        this.role = user.role;
    }
}

module.exports = User;