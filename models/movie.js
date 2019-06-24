const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');

const movieSchema = new mongoose.Schema({
    title: {type: String, required:true, minlength: 5, maxlength: 50, trim: true },
    numberInStock: {type: Number, required:true, default: 0, min:0, max: 255},
    dailyRentalRate: {type: Number, required:true, default: 0, min:0, max: 255},
    genre: {type: genreSchema, required:true}
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    // validate input to api
    const schema = {
        "title" : Joi.string().min(5).max(50).required(),
        "numberInStock" : Joi.number().min(0).max(255).required(),
        "dailyRentalRate" : Joi.number().min(0).max(255).required(),
        "genreId": Joi.string().required()
    };

    return Joi.validate(movie, schema);
}

module.exports.movieSchema = movieSchema;
module.exports.Movie = Movie;
module.exports.validate = validateMovie;