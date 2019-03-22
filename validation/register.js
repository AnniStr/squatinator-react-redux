// validator function to check the input values 
// and based on the values, if the values are empty 
// or not formatted correctly, or length is not 
// defined in the rules then, it fills 
// an error object and sends back to the client

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isLength(data.firstName, { min: 2, max: 30})) {
        errors.firstName = 'First name must be between 2 to 30 charcters';
    }
    if(Validator.isEmpty(data.firstName)) {
        errors.firstname = 'First name field is required';
    }
    if(!Validator.isLength(data.lastName, { min: 2, max: 30})) {
        errors.lastName = 'Last name must be between 2 to 30 charcters';
    }
    if(Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name field is required';
    }
    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if(Validator.isEmpty(data.email)) {
        errors.name = 'Email is required';
    }
    if(!Validator.isLength(data.password, { min: 6, max: 30})) {
        errors.password= 'Password must be between 6 to 30 charcters';
    }
    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

