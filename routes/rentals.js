const Fawn = require('fawn');
const {Rental, validate} = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    
    const {error} = validate(req.body);
    if(error)  return res.status(404).send(error.details[0].message);
    
    const customer = await Customer.findById(req.body.customerId);
    if(!customer)  return res.status(400).send('Invalid Customer');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie)  return res.status(400).send('Invalid Movie');

    if(movie.numberInStock === 0) return res.status(400).send('Movie out of stock');

    const rental = new Rental({ 
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    
    try {
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', {_id: movie._id}, {
                $inc: { numberInStock: -1 }
            })
        .run();

        res.send(rental);
    }
    catch(ex) {
        return res.status(500).send('Something failed');
    }
    
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