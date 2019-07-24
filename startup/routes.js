const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/errors');
const indexController = require('../controllers/indexController');
const errorController = require('../controllers/errorController');

module.exports = function (app) {

    app.use(express.json()); // use middleware to read json from input request, parse this json and create request.body in json format
    app.use(express.urlencoded({extended : true})); // use middleware to read form input and create request.body in json format
    app.use(express.static('public'));
    app.use('/api/genres/', genres); // for any route that starts with /api/genres, use genres router
    app.use('/api/customers/', customers);
    app.use('/api/movies/', movies);
    app.use('/api/rentals/', rentals);
    app.use('/api/users/', users);
    app.use('/api/auth/', auth);

    app.get('/dashboard', indexController.dashboard);
    app.get('/', indexController.index);
    app.use('/', errorController.pageNotFound);

    app.use(error);

}
