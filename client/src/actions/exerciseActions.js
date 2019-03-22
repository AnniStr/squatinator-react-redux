/* actions only describe what happened, 
* but don't describe how the application's state changes.*/

import axios from 'axios'; // HTTP client
import { GET_EXERCISES, ADD_EXERCISE, DELETE_EXERCISE, GET_ERRORS } from './types';

export const getExercises = (userId) => dispatch => {
    axios
        .get(`/exercises/${userId}`)
        .then(res => 
            dispatch({ // sending ActionType and payload to state->Reducer
                type: GET_EXERCISES,
                payload: res.data
            })
        );
};

export const addExercise = (exercise) => dispatch => {
    axios
        .post('/exercises/', {exercise: exercise})
        .then(res => 
            dispatch({
                type: ADD_EXERCISE,
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

export const deleteExercise = (_id, userId) => dispatch => {
    axios
        .delete(`/exercises/${userId}/${_id}`)
        .then(res => 
            dispatch({
                type: DELETE_EXERCISE,
                payload: _id
            })
        );
};





