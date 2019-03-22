//  the List of Workouts

import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux'; // get state from redux
import { getWorkouts, deleteWorkout } from '../actions/workoutActions'; // => props
import PropTypes from 'prop-types'; // Formvalidation 

import './styles/Lists.css';

class WorkoutsList extends Component {
    userId = localStorage.getItem('userId');
    
    state = {
        workoutSelected: false,
        workoutName: ''
    }

    componentDidMount() {
        this.props.getWorkouts(this.userId);
    };

    onDeleteClick = (_id) => {
        this.props.deleteWorkout(_id, this.userId);
    }; 

    render() {  
        const { workouts } = this.props.workout;
        return (
            <Container className="con">
                <ListGroup>
                    <TransitionGroup className="workouts">
                        {workouts.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem className="list">
                                    <Link className="link" to={{ pathname: 'workoutexercises', query: { workoutId: _id, workoutName: name } }}>
                                        {name}
                                    </Link>
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
WorkoutsList.propTypes = {
    getWorkouts: PropTypes.func.isRequired,
    workout: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    workout: state.workout
});

export default connect(mapStateToProps, { 
    getWorkouts, deleteWorkout
})(WorkoutsList);

