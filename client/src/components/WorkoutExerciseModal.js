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
import { addWorkoutExercise, getWorkout } from '../actions/workoutExerciseActions';
import PropTypes from 'prop-types'; // Formvalidation 
import ExerciseSelectBox from './ExerciseSelectBox';
import ExerciseModal from './ExerciseModal';

// CSS
import './styles/Modal.css';

class WorkoutExerciseModal extends Component {
    userId = localStorage.getItem('userId');
    constructor(props) {
        super(props);
        this.state = {
            _id: undefined,
            name: '',
            rpt: undefined,
            sets: undefined,
            rptMax: undefined,
            workout: undefined,
            modal: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChange = (id, name, rpt, sets, rptMax) => {
        this.setState({
            _id: id,
            name: name,
            rpt: rpt,
            sets: sets,
            rptMax: rptMax
        }); 
    }

    onChange = (e) => {
        this.setState({ 
            [e.target.name]: e.target.value,
        }); // set whatever the name attr. is called to the input value
    }

    onSubmitWE = (e) => {
        console.log('submitted');
        e.preventDefault(); // prevent Form from submitting
        const {workoutId} = this.props;
        const woexId = `${workoutId}${this.state._id}`;

        const newWorkoutExercise = {
            name: this.state.name,
            exercise: {
                _id: this.state._id,
                name: this.state.name
            },
            woexId: woexId, 
            rpt: this.state.rpt,
            sets: this.state.sets,
            rptMax: this.state.rptMax,
            userId: this.userId
        }

        this.props.addWorkoutExercise(workoutId, newWorkoutExercise, this.userId);

        //Close modal
        this.toggle();
    }

    render() {
        const { info } = this.props.exercise;
        return(
            <div>
                <Button
                className="btn"
                color="info"
                size="sm"
                onClick={this.toggle}
                >
                Add Exercise to Workout</Button> 
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader 
                        className="mo-head"
                        toggle={this.togglel}>
                            Add Exercise to Workout
                    </ModalHeader>
                    <ModalBody
                        className="mo-body">
                        <ExerciseModal />
                        <Form onSubmit={this.onSubmitWE}>
                            <FormGroup>
                                <span className="success">{info}</span><br/>                       
                                <Label for="exercise" className="label">
                                    Exercise
                                </Label>
                                <ExerciseSelectBox text="choose Exercise" onChange={this.handleChange} label='exercisesSelect'></ExerciseSelectBox>
                                <Label 
                                    for="rpt" className="label">
                                        Repetitions
                                </Label>
                                <Input
                                    type="text"
                                    name="rpt"
                                    id="rpt"
                                    placeholder="Repetitions"
                                    onChange={this.onChange}>
                                </Input>
                                <Label 
                                    for="sets" className="label">
                                        Sets
                                </Label>
                                <Input
                                    type="text"
                                    name="sets"
                                    id="sets"
                                    placeholder="Sets"
                                    onChange={this.onChange}>
                                </Input>
                                <Label 
                                    for="rptMax" className="label">
                                        Repetition Maximum until now
                                </Label>
                                <Input
                                    type="text"
                                    name="rptMax"
                                    id="rptMax"
                                    placeholder="repetition Maximum"
                                    onChange={this.onChange}>
                                </Input>
                                <Button
                                    color="info"
                                    className="add-btn"
                                    block>
                                        Add Workout Exercise
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

WorkoutExerciseModal.propTypes = {
    getWorkout: PropTypes.func.isRequired,
    workout: PropTypes.object.isRequired,
    exercise: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    workout: state.workout,
    exercise: state.exercise
});

export default connect(mapStateToProps, {addWorkoutExercise, getWorkout})(WorkoutExerciseModal);