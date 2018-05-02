const express = require('express');
const router = express.Router();

const busi_user = require('../business/user');
const busi_auth = require('../business/auth');

router.post('/register', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var alias = req.body.alias;

    if(email && password && alias) {
        busi_user.createNew(email, password, alias, (success, message) => {
            res.end(JSON.stringify({
                success: success,
                message: message
            }));
        });
    }
    else {
        //Bad Request
        res.sendStatus(400);
    }
});

router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    if(email && password) {
        busi_auth.validateLoginData(email, password, (success, token) => {
            res.end(JSON.stringify({
                success: success,
                message: token
            }));
        });
    }
    else {
        //Bad Request
        res.sendStatus(400);
    }
});

module.exports = router;