var mongoose = require('mongoose');

var UserSchema = mongoose.Schema(
    {
        name: String,
        device: String,
        email: String,
        password: String,
    },
    {
        collection: 'user'
    });

var UserModel = mongoose.model('user', UserSchema);

module.exports = {
    UserSchema,
    UserModel
};
