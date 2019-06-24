const winston = require('winston');

module.exports = function (err, req, res, next) {

    //Log exceptions
    winston.error(err.message, err);
    //error
    //warn
    //info
    //verbose
    //silly 

    // console.log('Something went wrong.');
    res.status(500).send('Something went wrong.');
}