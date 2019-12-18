var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    // fullname: {type: String, unique: true},
    username: {type: String, unique: true},
    email: { type: String, unique: true},
    password: String,
    admin: Boolean
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);