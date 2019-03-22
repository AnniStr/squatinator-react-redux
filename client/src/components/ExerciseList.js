// shows the List of available Exercises

import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux'; // get state from redux
import { getExercises, deleteExercise } from '../actions/exerciseActions'; // => props
import PropTypes from 'prop-types'; // Formvalidation 

// CSS
import './styles/Lists.css';

class ExercisesList extends Component {

    userId = localStorage.getItem('userId');

    componentDidMount() {
        this.props.getExercises(this.userId);
    };

    onDeleteClick = (_id) => {
        this.props.deleteExercise(_id, this.userId);
    }; 

    componentDidUpdate(prevProps) {
        if (this.props.exercise.exercises.length > prevProps.exercise.exercises.length) {
            this.props.getExercises(this.userId);
        }
    }

    render() {
        const { exercises } = this.props.exercise;
        return (
            <Container className="con">
                <ListGroup>
                    <TransitionGroup className="exercises">{/* Transition is for Animation */}
                        {exercises.map(({ _id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem className="list">
                                {name}
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                        >&times;</Button>                      
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup> 
            </Container>
        );
    }
};

// Actions from Redux are going to be stored as a Props
ExercisesList.propTypes = {
    getExercises: PropTypes.func.isRequired,
    exercise: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    exercise: state.exercise
});

export default connect(mapStateToProps, { 
    getExercises, deleteExercise 
})(ExercisesList);
