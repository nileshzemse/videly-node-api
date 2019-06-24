const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

router.post('/', async (req, res) => {
    
    const {error} = validate(req.body);
    if(error)  return res.status(404).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if(!genre)  return res.status(400).send('Invalid Genre');

    let movie = new Movie({ 
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id: genre._id,
            name: genre.name
        }
    });
    
    movie = await movie.save();
    res.send(movie);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error)  return res.status(404).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if(!genre)  return res.status(400).send('Invalid Genre');

    const id = req.params.id;

    const movie = await Movie.findByIdAndUpdate(id, 
        { 
            title: req.body.title,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
            genre: {
                _id: genre._id,
                name: genre.name
            }
        }, 
        {new: true}
    );

    if(!movie) return res.status(404).send("Movie not found");

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const movie = await Movie.findByIdAndRemove(id);

    if(!movie) return res.status(404).send("Movie not found");

    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if(!movie) return res.status(404).send("Movie not found");
    res.send(movie);
});

module.exports = router;