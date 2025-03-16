const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
});

userSchema.plugin(passportLocalMongoose); // WE use here the plugin because this can automatically add the username,salt and hashfunction

module.exports = mongoose.model('User', userSchema);