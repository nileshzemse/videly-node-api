const mongoose = require('mongoose');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {type: String, required:true, minlength: 5, maxlength: 50 },
            phone: {type: String, required:true, minlength: 10, maxlength: 50}
        }), 
        required:true 
    },
    movie: {
        type: new mongoose.Schema({
            title: {type: String, required:true, minlength: 5, maxlength: 50, trim: true },
            dailyRentalRate: {type: Number, required:true, default: 0, min:0, max: 255}
        }), 
        required:true 
    },
    dateOut: {type: Date, required:true, default: Date.now},
    dateReturned: {type: Date},
    rentalFee: {type: Number, min: 0}
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    // validate input to api
    const schema = {
        "customerId" : Joi.objectId().required(),
        "movieId": Joi.objectId().required()
    };

    return Joi.validate(rental, schema);
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;