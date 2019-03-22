// this is a Container: Component dealing with redux
// it's a Modal that asks the user to put in a new Exercise

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
import { addExercise } from '../actions/exerciseActions';
import classnames from 'classnames';

// CSS
import './styles/Modal.css';

class ExerciseModal extends Component {
    userId = localStorage.getItem('userId');

    state = {
        emodal: false,
        name: '',
        errors: {},
        submitted: false
    }

    toggle = () => {
        this.setState({
            emodal: !this.state.emodal,
            errors: {},
          //  submitted: false
        });
    }

    onChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value,
            errors: {}
        }); // set whatever the name attr. is called to the input value
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newExercise = {
            name: this.state.name,
            userId: this.userId
        }

        this.setState({name:'',errors: {}, submitted: true});
        // Add exercise via addExercise action
        this.props.addExercise(newExercise);
       
    }
    
    static getDerivedStateFromProps(nextProps) {
        return ({
            errors: nextProps.errors
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.exercise.exercises.length > prevProps.exercise.exercises.length && this.state.submitted) {
            this.toggle();
        }
    }

    render() {
        const { errors } = this.state;
        return(
            <div>
                <Button
                    color="dark"
                    onClick={this.toggle}>
                        Add Exercise
                </Button>
                <Modal
                    isOpen={this.state.emodal}
                    toggle={this.toggle}>
                    <ModalHeader
                        className="mo-head" 
                        toggle={this.toggle}>
                            Add Exercise
                    </ModalHeader>
                    <ModalBody
                        className="mo-body" >
                        <Form 
                            onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">
                                    Name
                                </Label>
                                <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Exercise"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.name
                                })}
                                onChange={this.onChange}
                                value={ this.state.name }
                                />
                                {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                                <Button
                                    color="info"
                                    className="mt-2"
                                    block>
                                        Add Exercise
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
    exercise: state.exercise,
    errors: state.errors
});

export default connect(mapStateToProps, {addExercise})(ExerciseModal);
