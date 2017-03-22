const mongoose = require('mongoose');
const randtoken = require('rand-token');

module.exports.bootstrap = () => {

    const TokenSchema = new mongoose.Schema({
        val: {
            type: String,
            default: randtoken.generate(8),
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

    TokenSchema.methods.hasExpired = function () {
        const now = new Date();
        return now.getTime() - this.createdOn.getTime() >= this.ttl;
    };

    mongoose.model('Token', TokenSchema);
};
