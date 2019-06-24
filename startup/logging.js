const winston = require('winston'); // default logger
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {

    // if some error occurs which is not handled in any catch block in application
    // however it works only for synchronous code
    process.on('uncaughtException', (ex) => {
        console.log('uncaughtException');
        new winston.transports.File({ filename: 'uncaughtExceptions.log' });
        winston.error(ex.message, ex);
        //process.exit(1);
    });

    process.on('unhandledRejection', (ex) => {
        console.log('unhandledRejection');
        new winston.transports.File({ filename: 'unhandledRejection.log' });
        winston.error(ex.message, ex);
        process.exit(1);
    });

    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/videly' }));

    //throw new Error('Something failed during startup'); // uncought exception

    // any asynchonous code like a call to db or remote https service (routs), etc. gives promise rejection
    // then we need to handle this error
    // const p = Promise.reject(new Error('Something failed miserably'));
    // p.then(() => console.log('Done'));

}
