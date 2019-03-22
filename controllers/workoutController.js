// Route: => localhost:5000/workouts/ via server.js

const express = require('express');
const router = express.Router();
const cors = require('cors');
const ObjectId = require('mongoose').Types.ObjectId;

const { Workout } = require('../models/workout_exercise'); 
const validateWorkoutInput = require('../validation/workout');

router.get('/:userId', cors(), (req, res) => { // GET request 
    Workout.find({userId: req.params.userId}, (err, docs) => {
        if (!err)
            res.send(docs); // retrive Workout: Workouts aus (Dokumenten-)Datenbank werden an Browser geschickt
        else
            console.log('Error in Retriving Workouts: ' + JSON.stringify(err, undefined, 2));
    });
});

router.get('/:userId/:wid', cors(), (req, res) => { // GET request 
    Workout.findOne({_id: req.params.wid, userId: req.params.userId}, (err, docs) => {
        if (!err)
            res.send(docs); // retrive Workout: Workouts aus (Dokumenten-)Datenbank werden an Browser geschickt
        else
            console.log('Error in Retriving Workouts: ' + JSON.stringify(err, undefined, 2));
    });
});

router.get('/', cors(), (req, res) => { // GET request 
    Workout.find((err, docs) => {
        if (!err)
            res.send(docs); // retrive Workout: Workouts aus (Dokumenten-)Datenbank werden an Browser geschickt
        else
            console.log('Error in Retriving Workouts: ' + JSON.stringify(err, undefined, 2));
    });
});

router.post('/', cors(), (req, res) => { // POST request
    const { errors, isValid } = validateWorkoutInput(req.body.workout);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    Workout.findOne({
        userId: req.body.workout.userId,
        name: req.body.workout.name
    }).then(workout => {
        if(workout) {
            return res.status(400).json({
                name: 'Workout already exists'
            });
        }
        else {
            var ex = new Workout({ // aus Usereingaben (request body Object)
                userId: req.body.workout.userId,
                name: req.body.workout.name
            }); 
            ex.save((err, doc) => {
                if(!err)
                    return res.send(doc);
                else
                    console.log('Error in Workout Save: ' + JSON.stringify(err, undefined, 2));
            })
        }
    });
});

router.delete('/:userId/:wid', (req,res) => { // DELETE Workout mit 'id'(übergeben als Parameter)
    if(!ObjectId.isValid(req.params.wid)) // checkt ob id existiert
        return res.status(400).send(`No record with given id : ${req.params.wid}`);

        Workout.findOneAndDelete( {userId: req.params.userId, _id: req.params.wid}, (err,doc) => { // Workout ist ein Mongoose Model und findByIdAndRemove eine Funktion aus mongoose
        if (!err)
            res.send(doc); 
        else
            console.log('Error in Deleting Workout: ' + JSON.stringify(err, undefined, 2));
    });
});

var { WorkoutExercise } = require('../models/workout_exercise'); 

router.get('/:userId/:wid/exercises', cors(), (req, res) => { // GET request 
    WorkoutExercise.find({userId: req.params.userId, 'workout._id': req.params.wid },(err, docs) => {
        if (!err)
            res.send(docs); // retrive WorkoutExercise: WorkoutExercise aus (Dokumenten-)Datenbank werden an Browser geschickt
        else
            console.log('Error in Retriving WorkoutExercise: ' + JSON.stringify(err, undefined, 2));
    });
});

router.post('/:userId/:wid/exercises', cors(), (req, res) => { // POST to WORKOUT with _id:wid and user:userId
    Workout.findOne({userId: req.params.userId, _id:req.params.wid}, (err,doc) => {
        if (!err) {
            var workout = new Workout(doc);
            var ex = new WorkoutExercise({ // aus Usereingaben (request body Object)
                name: req.body.woexercise.name,
                workout: workout,
                userId: req.params.userId,
                exercise: {
                    _id: req.body.woexercise.exercise._id,
                    name: req.body.woexercise.exercise.name
                },
                woexId: req.body.woexercise.woexId,
                rpt: req.body.woexercise.rpt,
                sets: req.body.woexercise.sets,
                rptMax: req.body.woexercise.rptMax
            });
            ex.save((err, doc) => {
                if (!err) 
                    res.send(doc);
                else
                    console.log('Error in WorkoutExercise Save: ' + JSON.stringify(err, undefined, 2)); 
            }); // mongoose -> speichern 
        }
        else
            console.log('Error in Retriving Workout: ' + JSON.stringify(err, undefined, 2));
    });

});

router.get('/:userId/:wid/exercises/:id', cors(), (req,res) => {
    WorkoutExercise.findOne({userId: req.params.userId, _id: req.params.id, 'workout._id': req.params.wid},(err, docs) => {
        if (!err)
            res.send(docs); // retrive WorkoutExercise: WorkoutExercise aus (Dokumenten-)Datenbank werden an Browser geschickt
        else
            console.log('Error in Retriving WorkoutExercise: ' + JSON.stringify(err, undefined, 2));
    });
});

router.put('/:userId/:wid/exercises/:id', cors(), (req,res) => { // UPDATE WorkoutExercise mit 'id'(übergeben als Parameter)
    if(!ObjectId.isValid(req.params.id)) // checkt ob id existiert
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    let updateObj = {};

    if (req.body.rptMax) updateObj.rptMax = req.body.rptMax;
    if (req.body.rpt) updateObj.rpt = req.body.rpt;
    if (req.body.sets) updateObj.sets = req.body.sets;  

    WorkoutExercise.findOneAndUpdate({userId: req.params.userId, _id: req.params.id, 'workout._id': req.params.wid}, 
    { $set: updateObj }, 
        (err, doc) => {
            if (!err) 
                res.send(doc);
            else
                console.log('Error in WorkoutExercise Put: ' + JSON.stringify(err, undefined, 2)); 
        }
    );


});

router.delete('/:userId/:wid/exercises/:id', cors(), (req,res) => { // DELETE WorkoutExercise mit 'id'(übergeben als Parameter)
    if(!ObjectId.isValid(req.params.id)) // checkt ob id existiert
        return res.status(400).send(`No record with given id: ${req.params.id}`);

        WorkoutExercise.deleteOne( {userId: req.params.userId, _id: req.params.id, 'workout._id': req.params.wid} , (err,doc) => { // WorkoutExercise ist ein Mongoose Model und findByIdAndRemove eine Funktion aus mongoose
        if (!err)
            res.send(doc); 
        else
            console.log('Error in Deleting WorkoutExercise:' + JSON.stringify(err, undefined, 2));
    });
});

module.exports = router;