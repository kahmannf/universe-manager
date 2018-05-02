const crypto = require('crypto');
const config = require('../config');


/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
const getRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
const getHashedPassword = (password, salt) => {
    var hash = crypto.createHmac(config.security.hashArlgorithm, salt); /** Hashing algorithm sha512 */
    hash.update(password);
    return hash.digest('hex');
};

module.exports = {
    getHashedPassword,
    getRandomString
}