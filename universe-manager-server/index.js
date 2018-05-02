const express = require('express');
const bodyparser = require('body-parser');

const routes = require('./routes');
const logger = require('./logger');
const config = require('./config');

const app = express();

app.use(bodyparser.json());

app.use(logger.log_incomming);

app.use(routes);

app.listen(config.server.port, () => logger.log('Server listening on port ' + config.server.port));