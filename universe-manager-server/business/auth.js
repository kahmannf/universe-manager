const config = require('../config');
const busi_user = require('./user');
const security = require('./security');
const jwt = require('jsonwebtoken');

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {*} callback callback(successful, token)
 */
const validateLoginData = (email, password, callback) => {
    busi_user.getByEmailFull(email, (err, user) => {
        if(err) {
            callback(false, undefined);
        }
        else {
            var hash = security.getHashedPassword(password, user.salt);

            if(areHashsEqual(user.hash, hash)) {
                user.hash = undefined;
                user.salt = undefined;
                var token = jwt.sign(user, config.security.secret, { expiresIn: config.security.tokenttl});
                callback(true, token);
            }
            else {
                callback(false, undefined);
            }
        }
    });
};

/**
 * compares two string values and doesnst return early when they dont match
 * @function
 * @param {string} hash1 
 * @param {string} hash2 
 * @returns {boolean} equal or not
 */
const areHashsEqual = (hash1, hash2) => {
    if(hash1.length != hash2.length) {
        return false;
    }

    var valid = true;

    for(var i = 0; i < hash1.length; i++) {
        if(hash1[i] != hash2[i]) {
            valid = false;
        }
    }

    return valid;
}

module.exports = {
    validateLoginData
}