"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var validator = require("validator");
var PersistentUser = (function () {
    function PersistentUser() {
        var UserSchema = new mongoose.Schema({
            email: {
                type: String,
                required: [true, 'Email is required'],
                lowercase: true,
                validate: {
                    validator: function (email) {
                        return validator.isEmail(email);
                    },
                    message: '{VALUE} is not a valid email address!'
                },
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
            role: {
                type: String,
                enum: ['user', 'admin'],
                default: 'user'
            }
        });
        UserSchema.pre('save', function (next) {
            var user = this;
            if (!user.isModified('password')) {
                return next();
            }
            bcrypt.genSalt(parseInt(process.env.SALT_FACTOR), function (err, salt) {
                if (err) {
                    return next(err);
                }
                bcrypt.hash(user.password, salt, function (err, hashedPassword) {
                    if (err) {
                        return next(err);
                    }
                    user.password = hashedPassword;
                    next();
                });
            });
        });
        UserSchema.methods.comparePassword = function (candidatePassword, cb) {
            bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
                if (err) {
                    return cb(err);
                }
                cb(null, isMatch);
            });
        };
        this.user = mongoose.model('User', UserSchema);
    }
    PersistentUser.bootstrap = function () {
        return new PersistentUser();
    };
    PersistentUser.prototype.getUserModel = function () {
        return this.user;
    };
    return PersistentUser;
}());
var persistentUser = PersistentUser.bootstrap().getUserModel();
exports.default = persistentUser;
