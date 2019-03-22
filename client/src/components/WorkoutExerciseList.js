import React, { Component } from 'react';
import { Container, Jumbotron, ListGroup, ListGroupItem, Button, Form, Input} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux'; // get state from redux
import { getWorkoutExercises, deleteWorkoutExercise, putWorkoutExercise } from '../actions/workoutExerciseActions'; // => props
import PropTypes from 'prop-types'; // Formvalidation 

// Components
import WorkoutExerciseModal from './WorkoutExerciseModal';

// CSS
import './styles/Lists.css';

class WorkoutExercisesList extends Component {
    userId = localStorage.getItem('userId');
    state = {
        rptMax: null,
        rpt: null,
        sets: null,
        saveid: null
    }

    componentDidMount() {
        if ( !this.props.location.query ) {
            return RedirectIfReloaded();
        }
        const { workoutId } = this.props.location.query;
        this.props.getWorkoutExercises(workoutId, this.userId);
    };

    onDeleteClick = (wid,_id) => {
        this.props.deleteWorkoutExercise(wid,_id, this.userId);
    };  

    onChange = (_id, e) => {
        this.setState({ 
            saveid: _id,
            [e.target.name]: e.target.value
        }); // set whatever the name attr. is called to the input value
    }

    onSubmit = (wid, _id, e) => {
        e.preventDefault(); // prevent Form from submitting
        this.props.putWorkoutExercise(wid, _id, this.state.rptMax, this.state.rpt, this.state.sets, this.userId);
    }; 

    render() {
        if ( !this.props.location.query ) {
            return RedirectIfReloaded();
        }
        const { workoutName } = this.props.location.query;
        const { workoutId } = this.props.location.query;
        const { workoutExercises } = this.props.workoutExercise;
        const { info } = this.props.workoutExercise;
        /*if (workout) { with Sessions*/
        return (
            <div>
                <Jumbotron className="jumboList">
                    <Container>                            
                        <Link className="link" to={{ pathname: '/workouts' }}>
                            &nbsp;Back to List
                        </Link> 
                        <div><h1>{ workoutName }</h1></div>
                        <WorkoutExerciseModal workoutId={ workoutId }></WorkoutExerciseModal>
                        <ListGroup>
                            <p>{info}</p>
                            <TransitionGroup className="workoutExercise">{/* Transition is for Animation */} 
                            {workoutExercises.map(({ _id, exercise: {name}, rpt, rptMax, sets }) => (
                                    <CSSTransition key={_id} timeout={500} classNames="fade">
                                        <ListGroupItem className="listWE">
                                            <div className="head-row">
                                            <b>{name}</b><Button
                                                className="remove-btn"
                                                color="danger"
                                                size="sm"
                                                onClick={this.onDeleteClick.bind(this, workoutId, _id)}
                                                >&times;</Button> 
                                            </div>
                                            <Form onSubmit={this.onSubmit.bind(this, workoutId, _id)}>
                                                <Input
                                                    type="text"
                                                    name="sets"
                                                    id="sets"
                                                    placeholder={sets}
                                                    defaultValue={sets} 
                                                    onChange={this.onChange.bind(this, _id)}>
                                                </Input>&nbsp;Sets&nbsp;
                                                <span>&nbsp;X&nbsp;</span>
                                                <Input
                                                    className="inputWE"
                                                    type="text"
                                                    name="rpt"
                                                    id="rpt"
                                                    placeholder={rpt}
                                                    defaultValue={rpt} 
                                                    onChange={this.onChange.bind(this, _id)}>
                                                </Input>&nbsp;Reps
                                                <div className="pull-right">
                                                    <Input
                                                        type="text"
                                                        name="rptMax"
                                                        id="rptMax"
                                                        placeholder={rptMax}
                                                        defaultValue={rptMax} 
                                                        onChange={this.onChange.bind(this, _id)}>
                                                    </Input>&nbsp;kg
                                                </div>
                                                {(this.state.saveid === _id) && <SaveButton />}
                                            </Form>
                                        </ListGroupItem>
                                    </CSSTransition>
                                ))} 
                            </TransitionGroup>
                        </ListGroup>  
                    </Container>
                </Jumbotron>
            </div>
        );
    }
};

const RedirectIfReloaded = () => {
    return <Redirect to={{ pathname: '/Home' }}/>
}

const SaveButton = () => (
    <Button
        color="dark"
        className="mt-2"
        block>
            Update Exercise
    </Button> 
)

// Actions from Redux are going to be stored as a Props
WorkoutExercisesList.propTypes = {
    getWorkoutExercises: PropTypes.func.isRequired,
    putWorkoutExercise: PropTypes.func.isRequired,
    workoutExercise: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    workoutExercise: state.workoutExercise
});

export default connect(mapStateToProps, { 
    getWorkoutExercises, deleteWorkoutExercise, putWorkoutExercise 
})(WorkoutExercisesList);
