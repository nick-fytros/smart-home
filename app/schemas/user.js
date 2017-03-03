const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

module.exports.bootstrap = () => {

    const UserSchema = new mongoose.Schema({
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            validate: {
                validator: (email) => {
                    return validator.isEmail(email);
                },
                message: '{VALUE} is not a valid email address!'
            },
            index: {
                unique: true
            }
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

    // MongoDB hash pass middleware
    UserSchema.pre('save', function (next) {
        const user = this;
        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) {
            return next();
        }
        // generate a salt
        bcrypt.genSalt(parseInt(process.env.SALT_FACTOR), (err, salt) => {
            if (err) {
                return next(err);
            }
            // hash the password using our new salt
            bcrypt.hash(user.password, salt, (err, hashedPassword) => {
                if (err) {
                    return next(err);
                }
                // override the cleartext password with the hashed one
                user.password = hashedPassword;
                next();
            });
        });
    });

    UserSchema.methods.comparePassword = function (candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    };

    mongoose.model('User', UserSchema);
};
