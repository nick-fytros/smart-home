/**
 * Persistent User Model
 * User
 */
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import {
    IUser,
    userAccess
} from '../interfaces/user';

class PersistentUser {

    public static bootstrap() {
        return new PersistentUser();
    }

    public user: mongoose.Model <IUser>;

    constructor() {
        const UserSchema = new mongoose.Schema({
            email: {
                type: String,
                required: [true, 'Email is required'],
                lowercase: true
            },
            password: {
                type: String,
                required: [true, 'Password is required']
            },
            createdOn: {
                type: Date,
                default: Date.now
            },
            lastLogin: {
                type: Date,
                default: Date.now
            },
            userAccess: {
                type: Number,
                required: true,
                default: userAccess.USER
            }
        });

        // MongoDB hash pass middleware
        UserSchema.pre('save', function(next) {
            const user = this;
            // only hash the password if it has been modified (or is new)
            if (!user.isModified('password')) {
                return next();
            }
            // generate a salt
            bcrypt.genSalt(process.env.SALT_FACTOR, (err: Error, salt: string) => {
                if (err) {
                    return next(err);
                }
                // hash the password using our new salt
                bcrypt.hash(user.password, salt, (err: Error, hashedPassword: string) => {
                    if (err) {
                        return next(err);
                    }
                    // override the cleartext password with the hashed one
                    user.password = hashedPassword;
                    next();
                });
            });
        });

        UserSchema.methods.comparePassword = function(candidatePassword: string, cb: Function) {
            bcrypt.compare(candidatePassword, this.password, (err: Object, isMatch: boolean) => {
                if (err) {
                    return cb(err);
                }
                cb(null, isMatch);
            });
        };

        this.user = mongoose.model<IUser>('User', UserSchema);
    }

    public getUserModel(): mongoose.Model <IUser> {
        return this.user;
    }
}

const persistentUser = PersistentUser.bootstrap().getUserModel();

export default persistentUser;
