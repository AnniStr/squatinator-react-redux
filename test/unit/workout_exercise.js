var expect = require('chai').expect;
var Exercise = require('../../models/workout_exercise').Exercise;
var Workout = require('../../models/workout_exercise').Workout;
var WorkoutExercise = require('../../models/workout_exercise').WorkoutExercise;

describe('Exercise Schema', function() {

    it('should be valid if name is existinng', function(done) {
        var newExercise = new Exercise( 
            {
                name: 'situps'
            }
        );
        newExercise.validate(function() {
            expect(newExercise.name).to.exist;
            done();
        });
    });

    it('should be valid if name is not empty', function(done) {
        var newExercise = new Exercise( 
            {
                name: 'Situps'
            }
        );
        newExercise.validate(function() {
            expect(newExercise.name).to.be.not.empty;
            done();
        });
    });

    it('should be invalid if name is empty', function(done) {
        var newExercise = new Exercise( 
            {
                name: ''
            }
        );
        newExercise.validate(function(err) {
            expect(err.errors.name).to.be.not.empty;
            done();
        });
    });

});

describe('Workout Schema', function() {

    it('should be valid if name is existinng', function(done) {
        var newWorkout = new Workout( 
            {
                name: 'situps'
            }
        );
        newWorkout.validate(function() {
            expect(newWorkout.name).to.exist;
            done();
        });
    });

    it('should be valid if name is not empty', function(done) {
        var newWorkout = new Workout( 
            {
                name: 'Legs'
            }
        );
        newWorkout.validate(function() {
            expect(newWorkout.name).to.be.not.empty;
            done();
        });
    });

    it('should be invalid if name is empty', function(done) {
        var newWorkout = new Workout( 
            {
                name: ''
            }
        );
        newWorkout.validate(function(err) {
            expect(err.errors.name).to.be.not.empty;
            done();
        });
    });

});

describe('Workout Exercise Schema', function() {
});