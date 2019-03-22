/*Reducers specify how the application's state changes
* in response to actions sent to the store. 
* Remember that actions only describe what happened, 
* but don't describe how the application's state changes.*/

import { combineReducers } from 'redux';
import exerciseReducer from './exerciseReducer';
import workoutsReducer from './workoutsReducer';
import workoutExercisesReducer from './workoutExercisesReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    exercise: exerciseReducer,
    workout: workoutsReducer,
    exerciseWorkout: workoutExercisesReducer,
    workoutExercise: workoutExercisesReducer,
    errors: errorReducer,
    auth: authReducer
})