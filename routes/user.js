const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

// Register
router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation for all of our inputs
    if(!isValid) {
        return res.status(400).json(errors);
    }

    // Check if email already exists
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
            });
        //Create hash value of the password and save user in database    
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    });
});

// Login
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation for all of our inputs
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // checking for the email if not found error to client that user is not found
    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            // check password with bcrypt's compare method
            // if match is found jwt token gets generated
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email
                            };
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600000
                            }, (err, token) => {
                                if(err) {
                                    console.error('There is some error in token', err);
                                } 
                                else {                                    
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`,
                                        userId: user.id
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
});

router.get('/me', passport.authenticate('jwt', { session: true }), (req, res) => {
    return res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
    });
});

module.exports = router;