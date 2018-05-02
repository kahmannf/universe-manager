const db = require('./db');
const security = require('./security');
const config = require('../config');

const logger = require('../logger');

/**
 * creates a new user
 * @function
 * @param {string} email 
 * @param {string} password 
 * @param {string} alias 
 * @param {*} callback callback(successful, message)
 */
const createNew = (email, password, alias, callback) => {
    //check if email already exists
    getByEmail(email, (err, email_user) => {
        if(err) {
            if(config.server.loglevel >= 500) {
                logger.error(err);
            }
            callback(false, 'Unknown Error.');
        }
        else if(email_user) {
            callback(false, 'Email already in use!');
        }
        else {
            //check if alias alread exists
            getByAlias(alias, (err, alias_user) => {
                if(err) {
                    if(config.server.loglevel >= 500) {
                        logger.error(err);
                    }
                    callback(false, 'Unknown Error.');
                }
                else if(alias_user) {
                    callback(false, 'Alias already in use!');
                }
                else {
                    var salt = security.getRandomString(config.security.saltLength);
                    var hash = security.getHashedPassword(password, salt);

                    var sql = 'insert into user(email, alias, hash, salt) values ($email, $alias, $hash, $salt)';
                    var params = {
                        $email: email,
                        $alias: alias,
                        $hash: hash,
                        $salt: salt
                    }

                    db.run(sql, params, err => {
                        if(err) {
                            if(config.server.loglevel >= 500) {
                                logger.error(err);
                            }
                            callback(false, 'Unknown error.');
                        }
                        else {
                            callback(true, 'User created!');
                        }
                    });
                }
            })
        }
    });
};

/**
 * 
 * @param {string} email 
 * @param {*} callback callback(err, user) 
 */
const getByEmail = (email, callback) => {
    getByEmail(email, (err, user) => {
        if(!err) {
            user.hash = undefined;
            user.salt = undefined;
            callback(err, user);
        }
        else {
            if(config.server.loglevel >= 500) {
                logger.error(err);
            }

            callback(err, undefined);
        }
    });
}

/**
 * will retrieve a full user from the database.
 * CAUTION: THIS DOES INCLUDE HASH AND SALT
 * @function
 * @param {string} email 
 * @param {*} callback callback(err, user)
 */
const getByEmailFull = (email, callback) => {
    var sql = 'select * from user where email like ?';
    var params = [email];

    db.get(sql, params, (err, row) => {
        if(err && config.server.loglevel >= 500) {
            logger.error(err);
        }
        callback(err, row);
    });
}

/**
 * will retrieve a user from the database.
 * @function
 * @param {string} alias 
 * @param {*} callback callback(err, user)
 */
const getByAlias = (alias, callback) => {
    var sql = 'select * from user where alias like ?';
    var params = [alias];

    db.get(sql, params, (err, row) => {
        if(err && config.server.loglevel >= 500) {
            logger.error(err);
        }
        callback(err, row);
    });
}

module.exports = {
    createNew,
    getByEmail,
    getByEmailFull
};