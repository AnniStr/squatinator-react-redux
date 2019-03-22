/* actions only describe what happened, 
* but don't describe how the application's state changes.*/

import axios from 'axios'; // HTTP client
import { GET_WORKOUT, PUT_WORKOUT_EXERCISE, GET_WORKOUT_EXERCISES, GET_WORKOUT_EXERCISE, ADD_WORKOUT_EXERCISE, DELETE_WORKOUT_EXERCISE} from './types';

export const getWorkoutExercises = (wid, userId) => dispatch => {
    axios
        .get(`workouts/${userId}/${wid}/exercises`)
        .then(res => 
            dispatch({ // sending ActionType and payload to state->Reducer
                type: GET_WORKOUT_EXERCISES,
                payload: res.data
            })
        );
};

export const getWorkout = (wid, userId) => dispatch => {
    axios
        .get(`workouts/${userId}/${wid}`)
        .then(res => 
            dispatch({ 
                type: GET_WORKOUT,
                payload: res.data
            })
        );
};

export const getWorkoutExercise = (wid, _id, userId) => dispatch => {
    axios
        .get(`workouts/${userId}/${wid}/exercises/${_id}/`)
        .then(res => 
            dispatch({ 
                type: GET_WORKOUT_EXERCISE,
                payload: res.data
            })
        );
};

export const putWorkoutExercise = (wid, _id, rptMax, rpt, sets, userId) => dispatch => {
    axios
        .put(`workouts/${userId}/${wid}/exercises/${_id}`, {rptMax: rptMax, rpt: rpt, sets: sets})
        .then(res => {
            dispatch({ 
                type: PUT_WORKOUT_EXERCISE,
                payload: res.data
            })
        });
};

export const addWorkoutExercise = (wid, woexercise, userId) => dispatch => {
    axios
        .post(`workouts/${userId}/${wid}/exercises`, {woexercise: woexercise})
        .then(res => 
            dispatch({
                type: ADD_WORKOUT_EXERCISE,
                payload: res.data
            })
        );
};

export const deleteWorkoutExercise = (wid, _id, userId) => dispatch => {
    axios
        .delete(`workouts/${userId}/${wid}/exercises/${_id}`)
        .then(res => 
            dispatch({
                type: DELETE_WORKOUT_EXERCISE,
                payload: _id
            })
        );
};





