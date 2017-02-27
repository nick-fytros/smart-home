/**
 * @class User
 */
import {
    IUser
} from '../interfaces/user';

export default class User {
    private _email: string;
    private _password: string;
    private _createdOn: Date;
    private _lastLogin: Date;
    private _role: string;

    constructor(user: IUser) {
        this._email = user.email;
        this._password = user.password;
        this._createdOn = user.createdOn;
        this._lastLogin = user.lastLogin;
        this._role = user.role;
    }

    get email(): string {
        return this._email;
    }
    get password(): string {
        return this._password;
    }
    get createdOn(): Date {
        return this._createdOn;
    }
    get lastLogin(): Date {
        return this._lastLogin;
    }
    get role(): string {
        return this._role;
    }
}
