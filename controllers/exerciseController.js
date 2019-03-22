// Route: => localhost:5000/exercise/ via server.js

const express = require('express');
var router = express.Router();
const cors = require('cors');
var ObjectId = require('mongoose').Types.ObjectId;

var { Exercise } = require('../models/workout_exercise'); // Speichert exportierte Exercise aus dem Model
const validateExerciseInput = require('../validation/exercise');

router.get('/:userId', cors(), (req, res) => { // GET request 
    Exercise.find({userId: req.params.userId}, (err, docs) => {
        if (!err)
            res.send(docs); // retrive Exercise: Exercises aus (Dokumenten-)Datenbank werden an Browser geschickt
        else
            console.log('Error in Retriving Exercises : ' + JSON.stringify(err, undefined, 2));
    });
});

router.get('/', cors(), (req, res) => { // GET request 
    Exercise.find((err, docs) => {
        if (!err)
            res.send(docs); // retrive Exercise: Exercises aus (Dokumenten-)Datenbank werden an Browser geschickt
        else
            console.log('Error in Retriving Exercises : ' + JSON.stringify(err, undefined, 2));
    });
});

router.post('/', cors(), (req, res) => { // POST request
    const { errors, isValid } = validateExerciseInput(req.body.exercise);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    Exercise.findOne({
        name: req.body.exercise.name,
        userId: req.body.exercise.userId
    }).then(exercise => { // only add Exercise if not Exists
        if(exercise) {
            return res.status(400).json({
                name: 'Exercise already exists'
            });
        }
        else{
            var ex = new Exercise({ // aus Usereingaben (request body Object)
                name: req.body.exercise.name,
                userId: req.body.exercise.userId
            }); 
            ex.save((err, doc) => {
                if(!err)
                    return res.send(doc);
                else
                    console.log('Error in Exercise Save: ' + JSON.stringify(err, undefined, 2));
            })
        }
    });
});

router.delete('/:userId/:id', cors(), (req,res) => { // DELETE exercise mit 'id'(übergeben als Parameter)
    if(!ObjectId.isValid(req.params.id)) // checkt ob id existiert
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Exercise.findOneAndDelete( {userId: req.params.userId, _id: req.params.id}, (err,doc) => { // Exercise ist ein Mongoose Model und findByIdAndRemove eine Funktion aus mongoose
        if (!err)
            res.send(doc); 
        else
            console.log('Error in Deleting Exercise :' + JSON.stringify(err, undefined, 2));
    });
});

module.exports = router;