/*Reducers specify how the application's state changes
* in response to actions sent to the store. 
* Remember that actions only describe what happened, 
* but don't describe how the application's state changes.*/

import { GET_EXERCISES, ADD_EXERCISE, DELETE_EXERCISE } from '../actions/types';

const initialState = {
    exercises : [], // current state of exercises
    info: ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_EXERCISES:
            return {
                ...state, // Spread operator: expands an argument when several arguments are expected
                exercises: action.payload
            };
        case DELETE_EXERCISE:
            return {
                ...state,
                exercises: state.exercises.filter(exercise => exercise._id !== action.payload),
            };
        case ADD_EXERCISE:
            return {
                ...state,
                exercises: [action.payload, ...state.exercises],
                info:  `${action.payload.name} was added and can now be selected below.`
            };
        default:
            return state;
    }
};