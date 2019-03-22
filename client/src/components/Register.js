
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Container, 
    Jumbotron
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// CSS
import './styles/Register.css'

class Register extends Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
    
        }
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state;
        return(
        <div>
            <Jumbotron className="jumbo">
                <Container>
                    <Form onSubmit={ this.handleSubmit }>
                        <h2>Registration</h2>
                        <FormGroup className="formReg">
                            <Input
                                type="text"
                                placeholder="First Name"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.firstName
                                })}
                                name="firstName"
                                onChange={ this.handleInputChange }
                                value={ this.state.firstName }
                            />
                            {errors.firstName && (<div className="invalid-feedback">{errors.firstName}</div>)}
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="text"
                                placeholder="Last Name"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.lastName
                                })}
                                name="lastName"
                                onChange={ this.handleInputChange }
                                value={ this.state.lastName }
                            />
                            {errors.lastName && (<div className="invalid-feedback">{errors.lastName}</div>)}
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="email"
                                placeholder="Email"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.email
                                })}
                                name="email"
                                onChange={ this.handleInputChange }
                                value={ this.state.email }
                            />
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="password"
                                placeholder="Password"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.password
                                })}
                                name="password"
                                onChange={ this.handleInputChange }
                                value={ this.state.password }
                            />
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                        </FormGroup>
                        <FormGroup>
                            <Button
                                type="submit" 
                                className="btn btn-primary"
                                size="lg"
                                color="warning">
                                Sign Up
                            </Button>
                        </FormGroup>
                    </Form>
                </Container>
            </Jumbotron>
        </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))
