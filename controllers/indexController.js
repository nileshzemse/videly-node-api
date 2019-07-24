const {Genre, validate} = require('../models/genre');

exports.index = async(req, res) => {
    //const genres = [{name:'Action'}, {name:'Drama'}];
    const genres = await Genre.find().sort('name');
    res.render('index', {
        pageTitle: 'Vidly App',
        genres: genres,
        path: '/'
    });
}

exports.dashboard = async(req, res) => {
    //some data from database...
    const genres = await Genre.find().sort('name');
    res.render('dashboard', {
       pageTitle: 'Vidly App - Dashboard',
       genres: genres,
       path: '/dashboard' 
    });
}