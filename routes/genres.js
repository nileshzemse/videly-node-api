// const asyncMiddleware = require('../middleware/asyncMiddleware');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    //throw new Error('Could not get genres.');
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', auth, async (req, res) => {
    
    const {error} = validate(req.body);
    if(error)  return res.status(404).send(error.details[0].message);
    
    let genre = new Genre({ name: req.body.name });
    
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
    const {error} = validate(req.body);
    if(error)  return res.status(404).send(error.details[0].message);
    
    const id = req.params.id;

    const genre = await Genre.findByIdAndUpdate(id, 
        { name: req.body.name }, 
        {new: true}
    );

    if(!genre) return res.status(404).send("Genre not found");

    res.send(genre);
});

router.delete('/:id', [auth,admin], async (req, res) => {
    const id = req.params.id;
    const genre = await Genre.findByIdAndRemove(id);

    if(!genre) return res.status(404).send("Genre not found");

    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const genre = await Genre.findById(id);
    if(!genre) return res.status(404).send("Genre not found");
    res.send(genre);
});

module.exports = router;