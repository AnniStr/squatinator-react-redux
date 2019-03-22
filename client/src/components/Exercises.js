import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';

// Components
import ExerciseModal from './ExerciseModal';
import ExercisesList from './ExerciseList';

// CSS
import './styles/Exercises.css'

class Exercises extends Component {
    render() {
        return (
            <div className="Exercises">
                <Container className="modal-con">
                    <ExerciseModal />
                </Container>
                <Container className="list-con">
                    <ExercisesList />
                </Container>
            </div>
        );
    }
}

export default Exercises;
