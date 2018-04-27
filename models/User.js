var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var errorCodes = require('../utils/errorCodes').errorCodes;
var appConstants = require('../utils/appConstants').appConstants;

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    passwordConf: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if(err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({email: email}).exec(function(err, user) {
        if(err) {
            console.log('Error: ' + err);
            var error = errorCodes.generalErrors.serverError;
            callback(error, appConstants.messages.login, false, null);
        }else if(!user) {
            var error = errorCodes.authErrors.userNotFound;
            callback(error, appConstants.messages.login.userNotFound, false, null);
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if(result === true) {
                user.password = undefined;
                console.log('Password Delete Test: ' + JSON.stringify(user));
                callback(null, appConstants.messages.login.loginSuccess, true, user);
            }else {
                var error = errorCodes.authErrors.wrongPassword;
                callback(error, appConstants.messages.login.wrongPassword, false, null)
            }
        });
    });
}

var User = mongoose.model('User', UserSchema);
exports.User = User;