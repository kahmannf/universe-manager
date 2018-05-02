require('dotenv').load();

const server = require('./server');
const sqlite = require('./sqlite');


module.exports = {
    server,
    sqlite
}