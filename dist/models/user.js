"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var User = (function () {
    function User() {
        var UserSchema = new mongoose.Schema({
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
                default: 1
            }
        });
        UserSchema.pre('save', function (next) {
            var user = this;
            if (!user.isModified('password')) {
                return next();
            }
            bcrypt.genSalt(process.env.SALT_FACTOR, function (err, salt) {
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
    User.bootstrap = function () {
        return new User();
    };
    User.prototype.getUserModel = function () {
        return this.user;
    };
    return User;
}());
var userActions = User.bootstrap().getUserModel();
exports.default = userActions;
