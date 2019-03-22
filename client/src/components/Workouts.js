import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';

// Components
import WorkoutsList from './WorkoutsList';
import WorkoutModal from './WorkoutModal';

// CSS
import './styles/Workouts.css'

class Workouts extends Component {
    render() {
        return (
            <div className="Workouts">
                <Container className="modal-con">
                    <WorkoutModal />
                </Container>
                <Container className="list-con">
                    <WorkoutsList />
                </Container>
            </div>
        );
    }
}

export default Workouts;
