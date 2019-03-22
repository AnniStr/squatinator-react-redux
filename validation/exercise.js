const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExerciseInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Please enter a name for your Exercise';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}