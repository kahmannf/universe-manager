require('dotenv').load();

const security = require('./security');
const server = require('./server');
const sqlite = require('./sqlite');


module.exports = {
    security,
    server,
    sqlite
}