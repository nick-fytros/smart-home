const mongoose = require('mongoose');
const randtoken = require('rand-token');

module.exports.bootstrap = () => {

    const TokenSchema = new mongoose.Schema({
        val: {
            type: String,
            unique: true
        },
        createdOn: {
            type: Date,
            default: Date.now
        },
        ttl: {
            type: Number,
            default: 60 * 60 * 1000 // 1 hour
        }
    });

    // MongoDB hash pass middleware
    TokenSchema.pre('save', function (next) {
        const token = this;
        // only add the token value if its a new token
        if (!token.isNew) {
            return next();
        }
        token.val = randtoken.generate(8);
        next();
    });

    TokenSchema.methods.hasExpired = function () {
        const now = new Date();
        return now.getTime() - this.createdOn.getTime() >= this.ttl;
    };

    mongoose.model('Token', TokenSchema);
};
