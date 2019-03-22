import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Jumbotron, Button } from 'reactstrap';

// CSS
import './styles/Home.css'
class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Jumbotron className="jumboHome">
                    <Container>
                        <h3>Welcome to Squatinator</h3>
                        <p>Now you can start creating your own and super indivdual training.</p>
                        <p>First you can create your favorite exercises and the workouts you want to do. In the second step add your exercises to the workout and set how many repetitions you wanna do in one set and how many sets you wanna do in your training. Also you can set the repetition maximum.</p>
                        <h5>Don't wait, start now!</h5>
                        <Button
                            href="/workouts"
                            className="nav-btn"
                            color="warning"
                            block>
                            Workouts
                        </Button>
                        <Button
                            href="/exercises"
                            className="nav-btn"
                            color="warning"
                            block>
                            Exercises
                        </Button>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default Home;
