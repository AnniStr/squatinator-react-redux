import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    Container,
    Jumbotron
} from 'reactstrap';

// CSS
import './styles/Welcome.css';

class Welcome extends Component {
    
    render() {
        return (
            <div className="Welcome">
            <Jumbotron fluid className="jumbo">
                <Container className="container">
                    <h2>Welcome to Squatinator!</h2>
                    <p>The fitness app to create your own individual workoutplans.</p>
                    <Button 
                        className="login-btn" 
                        color="warning" 
                        size="lg" 
                        href="/login" 
                        block>
                        Login
                    </Button>
                    <Button 
                        className="login-btn" 
                        color="warning" 
                        size="lg" 
                        href="/register" 
                        block>
                        Register now
                    </Button>
                </Container>
            </Jumbotron> 
            </div>
        );
    }
}

export default Welcome;
