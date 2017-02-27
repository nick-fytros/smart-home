"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(user) {
        this._email = user.email;
        this._password = user.password;
        this._createdOn = user.createdOn;
        this._lastLogin = user.lastLogin;
        this._role = user.role;
    }
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        get: function () {
            return this._password;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "createdOn", {
        get: function () {
            return this._createdOn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "lastLogin", {
        get: function () {
            return this._lastLogin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "role", {
        get: function () {
            return this._role;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports.default = User;
