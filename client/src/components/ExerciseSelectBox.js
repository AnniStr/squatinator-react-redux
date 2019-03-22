import React, { Component } from 'react';
import { FormGroup, Input} from 'reactstrap';
import { connect } from 'react-redux'; // get state from redux
import { getExercises } from '../actions/exerciseActions'; // => props
import PropTypes from 'prop-types'; // Formvalidation 

class ExerciseSelectBox extends Component {
    userId = localStorage.getItem('userId');

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.getExercises(this.userId);
    };

    handleChange(e) {
        const key = e.target.value;
        const id = this.props.exercise.exercises[key]._id;
        const name = this.props.exercise.exercises[key].name;
        this.props.onChange(id, name);
    }

    componentDidUpdate(prevProps) {
        if (this.props.exercise.exercises.length > prevProps.exercise.exercises.length) {
            this.props.getExercises(this.userId);
        }
    }


    render() {
        const { label } = this.props;
        const { exercises } = this.props.exercise;
        return(
            <FormGroup>
                <Input type="select" name={label} defaultValue='' className="form-control" id={label} onChange={this.handleChange}>
                    <option value='' disabled>{this.props.text}</option>
                    {exercises.map(({ _id, name }, index) => (
                    <option key={_id} value={index}>{name}</option>
                    ))}
                </Input>        
            </FormGroup>
        );
    }
};

// Actions from Redux are going to be stored as Props
ExerciseSelectBox.propTypes = {
    getExercises: PropTypes.func.isRequired,
    exercise: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    exercise: state.exercise
});

export default connect(mapStateToProps, { 
    getExercises
})(ExerciseSelectBox);
