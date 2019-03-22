// this is a Container: Component dealing with redux
// it's a Modal that asks the user to put in a new Workout

import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addWorkout } from '../actions/workoutActions';
import classnames from 'classnames';

// CSS
import './styles/Modal.css';

class WorkoutModal extends Component {
    
    userId = localStorage.getItem('userId');

    state = {
        modal: false,
        errors: {},
        name: '', 
        submitted: false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            errors: {},
            submitted: false
        });
    }

    onChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value,
            errors: {}
        }); // set whatever the name attr. is called to the input value
    }

    onSubmit = (e) => {
        e.preventDefault(); // prevent Form from submitting
        const newWorkout = {
            name: this.state.name,
            userId: this.userId
        }
        this.setState({errors: {}, name: '', submitted: true});
        this.props.addWorkout(newWorkout);
    }

    static getDerivedStateFromProps(nextProps) {
        return ({
            errors: nextProps.errors
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.workout.workouts.length > prevProps.workout.workouts.length && this.state.submitted) {
            this.toggle();
        }
    }

    render() {
        const { errors } = this.state;
        return(
            <div>
                <Button
                    color="dark"
                    onClick={this.toggle}
                    >
                        Add Workout
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader 
                        className="mo-head"
                        toggle={this.toggle}>
                            Add Workout
                    </ModalHeader>
                    <ModalBody
                        className="mo-body">
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label 
                                    for="name">
                                        Name:
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="workout"
                                    placeholder="Workout"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.name
                                    })}
                                    onChange={this.onChange}
                                    value={ this.state.name }
                                />
                                {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                                <Button
                                    color="info"
                                    className="add-btn"
                                    block>
                                        Add Workout
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    workout: state.workout,
    errors: state.errors
});

export default connect(mapStateToProps, {addWorkout})(WorkoutModal);