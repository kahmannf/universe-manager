const sqlite = require('sqlite3');
const config = require('../config');


module.exports = new sqlite.Database(config.sqlite.dbfilename);