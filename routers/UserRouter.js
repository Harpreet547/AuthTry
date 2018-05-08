var express = require('express');
var router = express.Router();

var userController = require('../controllers/UserController').userController;

router.post('/signup', function(req, res) {
    var reqBody = req.body;
    console.log(reqBody.email + ' ' + reqBody.username + ' ' + reqBody.password + ' ' +reqBody.passwordConf);
    userController.signup(req.body, function(result) {
        res.send(result);
    });
});

router.post('/login', function(req, res) {
    
    var reqBody = req.body;
    console.log('req.body: ' + JSON.stringify(reqBody));
    userController.login(reqBody, function(response) {
        if(response.user) {
            console.log(response.user._id);
            req.session.userId = response.user._id;
            console.log(req.session.userId);
        }
        console.log(JSON.stringify(response));
        res.send(response);
    });
});

router.post('/logout', function(req, res) {
    userController.logout(req, function(response) {
        console.log('Logout Response: ' + response.status);
        res.send(response);
    });
});

router.get('/check', function(req, res) {
    console.log('Session ID: ' + req.session.userId);
    res.send({
        sessionID: req.session.userId
    });
});

exports.userRouter = router;