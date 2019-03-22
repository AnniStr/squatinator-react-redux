/*Reducers specify how the application's state changes
* in response to actions sent to the store. 
* Remember that actions only describe what happened, 
* but don't describe how the application's state changes.*/

import { GET_WORKOUTS, ADD_WORKOUT, DELETE_WORKOUT} from '../actions/types';

const initialState = {
    workouts : [] // current state of workouts
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_WORKOUTS:
            return {
                ...state, // Spread operator: expands an argument when several arguments are expected
                workouts: action.payload
            };
        case DELETE_WORKOUT:
            return {
                ...state,
                workouts: state.workouts.filter(workout => workout._id !== action.payload)
            };
        case ADD_WORKOUT:
            return {
                ...state,
                workouts: [...state.workouts, action.payload]
            };
        default:
            return state;
    }
};