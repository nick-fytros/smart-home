/**
 * @interface IUser
 */
import {
    Document
} from 'mongoose';

export interface IUser extends Document {
    email ?: string;
    password ?: string;
    createdOn ?: Date;
    lastLogin ?: Date;
}
