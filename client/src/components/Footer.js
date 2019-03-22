
import React, { Component } from 'react';
import {
    Container,
    Navbar
} from 'reactstrap';

// CSS 
import './styles/Footer.css'

class Footer extends Component {

    render() {
        return (
        <div className="Footer">
        <Navbar className="mb-foot" fixed="bottom">
            <Container>
                © Copyright 2019 Squatinator - All rights reserved.
            </Container>
            </Navbar>
        </div>    
        );
    }
}

export default Footer;
