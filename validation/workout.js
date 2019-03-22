const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateWorkoutInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Please enter a name for your Workout';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}