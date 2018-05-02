//log to console for now
const log = (message) => console.log(message);
const error = (error) => console.error(error);

const log_incomming = (req, res, next) => {
    log('INCOMMING HTTP ' + req.httpVersion + ' ' + req.method + ' ' + req.url);
    next();
}

module.exports = {
    error,
    log,
    log_incomming
}
