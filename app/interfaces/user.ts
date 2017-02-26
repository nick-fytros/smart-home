/**
 * @interface IUser
 */
import {
    Document
} from 'mongoose';

export const enum userAccess {
    ADMIN,
    USER
}

export interface IUser extends Document {
    email ?: string;
    password ?: string;
    createdOn ?: Date;
    lastLogin ?: Date;
    userAccess ?: userAccess;

    comparePassword(candidatePassword: string, cb: Function): void;
}
