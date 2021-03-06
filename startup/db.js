const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    mongoose.set('useCreateIndex', true);
    
    mongoose.connect('mongodb://localhost/videly',  { useNewUrlParser: true })
    .then(() => winston.info('Connected to mongo db...'));
}