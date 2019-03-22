const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ExerciseSchema = new Schema({ // erstellt für Tabelle 'exercises' (Plural!) in mongoDB
    name: { type: String, required: [true, 'Please Enter a Name for your Exercise']},
    userId: { type: String }
}, { emitIndexErrors: true });

var WorkoutSchema = new Schema({ // erstellt für Tabelle 'workouts' (Plural!) in mongoDB
    name: { type: String, required: [true, 'Please Enter a Name for your Workout']},
    userId: { type: String }
}, { emitIndexErrors: true });

var WorkoutExerciseSchema = new Schema({ // erstellt für Tabelle 'workoutExercises' (Plural!) in mongoDB
    workout: WorkoutSchema,
    exercise: ExerciseSchema,
    woexId: { type: String, required: [true, 'Please select an exercise'] },
    rpt: { type: Number },
    sets: { type: Number },
    rptMax: { type: Number },
    userId: { type: String }
}, { emitIndexErrors: true });

var Workout = mongoose.model('workout', WorkoutSchema);
var WorkoutExercise = mongoose.model('workoutExercise', WorkoutExerciseSchema);
var Exercise = mongoose.model('exercise', ExerciseSchema); 

module.exports = { WorkoutExercise, Exercise, Workout }; // WorkoutExercise kann im ganzen Projekt genutzt werden via require (siehe exerciseController) 