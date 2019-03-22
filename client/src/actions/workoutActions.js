/* actions only describe what happened, 
* but don't describe how the application's state changes.*/

import axios from 'axios'; // HTTP client
import { GET_WORKOUTS, ADD_WORKOUT, DELETE_WORKOUT, GET_ERRORS } from './types';

export const getWorkouts = (userId) => dispatch => {
    axios
        .get(`workouts/${userId}`)
        .then(res => 
            dispatch({ // sending ActionType and payload to state->Reducer
                type: GET_WORKOUTS,
                payload: res.data
            })
        );
};

export const addWorkout = (workout) => dispatch => {
    axios
        .post('workouts/', {workout: workout})
        .then(res => 
            dispatch({
                type: ADD_WORKOUT,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch({ // sending ActionType and payload to state->Reducer
                type: GET_ERRORS,
                payload: err.response.data
            })   
        });
};

export const deleteWorkout = (wid, userId) => dispatch => {
    axios
        .delete(`workouts/${userId}/${wid}`)
        .then(res => 
            dispatch({
                type: DELETE_WORKOUT,
                payload: wid
            })
        );
};






