var userModel = require('../models/User');
var errorCodes = require('../utils/errorCodes').errorCodes;
var appConstants = require('../utils/appConstants').appConstants;
var User = userModel.User;
class UserController {
    
    constructor() {
        //this.User = require('../models/User').User;
    }

    login(reqBody, callback) {
        if(!reqBody.hasOwnProperty('password') && !reqBody.hasOwnProperty('email')) {
           console.log('BODY is undefined');
            var err = errorCodes.generalErrors.reqBodyUndefined;
            var response = {
                user: null,
                status: false,
                msg: appConstants.messages.request.bodyNull,
                err: err
            }
            return callback(response);
        }else {
            console.log('ELSE');    
        }
        console.log('Below IF');
        var loginObj = {
            email: reqBody.email,
            password: reqBody.password
        }

        User.authenticate(loginObj.email, loginObj.password, function(error, message, status, user) {
            console.log('ERROR AUTH: ' + JSON.stringify(error) + ' USER: ' + user);
            var response = {
                user: user,
                status: status,
                msg: message,
                err: error
            }
            callback(response);
        });
    }

    signup(reqBody, response) {
        var userObj = {
            email: reqBody.email,
            username: reqBody.username,
            password: reqBody.password,
            passwordConf: reqBody.passwordConf
        }
        console.log(reqBody.email + ' ' + reqBody.username + ' ' + reqBody.password + ' ' +reqBody.passwordConf);
        this.saveUserToDB(userObj, function(result) {
            response(result);
        });
        //return result;
    }

    saveUserToDB(userObj, result) {
        User.create(userObj, function(err, user) {
            var response;
            if(err) {
                console.log('Err: ' + err);
                var error;
                if(err.code == 11000) {
                    error = errorCodes.authErrors.duplicateUser;
                }else {
                    error = err;
                }
                response = {
                    user: undefined,
                    status: false,
                    msg: appConstants.messages.signup.errorSavingUser,
                    err: error
                }
            }else {
                console.log('No Err');
                response = {
                    user: user,
                    status: true,
                    msg: appConstants.messages.signup.signupSuccess,
                    err: undefined
                }
            }
            //return result;
            //console.log('Response: ' + response);
            result(response);
        });
    }

    checkIfLoggedIn(req, callback) {
        if(req.session && req.session.userId) {
            return callback(null);
        }else {
            var err = errorCodes.authErrors.notLoggedIn;
            return callback(err);
        }
    }

    logout(req, callback) {
        this.checkIfLoggedIn(req, function(err) {
            var response;
            if(err) {
                console.log('ERR');
                response = {
                    status: false,
                    msg: appConstants.messages.logout.usserNotLoggedIn,
                    err: err
                }
                return callback(response);
            }else {
                console.log('NO ERR');
                req.session.destroy(function(err) {
                    if(err) {
                        console.log('DESTROY ERR');
                        var err = errorCodes.authErrors.errorInLogout;
                        response = {
                            status: false,
                            msg: appConstants.messages.logout.errInLogout,
                            err: err
                        }
                    }else {
                        console.log('DESTROY NO ERR');
                        response = {
                            status: true,
                            msg: appConstants.messages.logout.loggedOut,
                            err: null
                        }
                    }
                    return callback(response);
                });
            }
            
        });
    }
}

exports.userController = new UserController();