const   mongoose                = require('mongoose'),
        passportLocalMongoose   = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    name: String,
    city: String,
    address: String,
    email: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);