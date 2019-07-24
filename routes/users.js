const auth = require('../middleware/auth');

const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

// register user and send token, user data after successful registration for auto login
router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    const token = user.generateAuthToken();

    res
        .header('x-auth-token', token)
        .send(_.pick(user, ['name', 'email']));
});

router.get('/me', auth, async (req, res) => {

    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).send("User not found");
    res.send(user);
});

/*
router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error)  return res.status(404).send(error.details[0].message);
    
    const id = req.params.id;

    const customer = await Customer.findByIdAndUpdate(id, 
        { 
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }, 
        {new: true}
    );

    if(!customer) return res.status(404).send("Customer not found");

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const customer = await Customer.findByIdAndRemove(id);

    if(!customer) return res.status(404).send("Customer not found");

    res.send(customer);
});
*/

module.exports = router;