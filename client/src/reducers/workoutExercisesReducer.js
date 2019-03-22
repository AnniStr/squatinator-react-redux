/*Reducers specify how the application's state changes
* in response to actions sent to the store. 
* Remember that actions only describe what happened, 
* but don't describe how the application's state changes.*/

import { GET_WORKOUT, PUT_WORKOUT_EXERCISE, GET_WORKOUT_EXERCISES, ADD_WORKOUT_EXERCISE, DELETE_WORKOUT_EXERCISE} from '../actions/types';

const initialState = {
    workoutExercises : [], // current state of workouts
    exerciseWorkout: undefined,
    info: ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_WORKOUT:
            return {
                ...state, // Spread operator: expands an argument when several arguments are expected
                exerciseWorkout: action.payload
            };
        case GET_WORKOUT_EXERCISES:
            return {
                ...state, // Spread operator: expands an argument when several arguments are expected
                workoutExercises: action.payload
            };
        case DELETE_WORKOUT_EXERCISE:
            return {
                workoutExercises: state.workoutExercises.filter(workoutExercise => workoutExercise._id !== action.payload)
            };
        case ADD_WORKOUT_EXERCISE:
            return {
                ...state,
                workoutExercises: [action.payload, ...state.workoutExercises]
            };
        case PUT_WORKOUT_EXERCISE:
            return {
                ...state,
                workoutExercises: [...state.workoutExercises, action.payload],
                info: `Exercise has been updated.`
            };
        default:
            return state;
    }
};