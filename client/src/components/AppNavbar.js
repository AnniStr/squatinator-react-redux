// This is the Component that prints out the Navbar

import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,// eslint-disable-next-line
    DropdownToggle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

// CSS
import './styles/AppNavbar.css';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        const authBrand = (
            <NavbarBrand href="/Home">
                <img src="Logo_squat_white.png" width="170" height="60" alt="Squatinator"></img>
            </NavbarBrand>
        )
        const guestBrand = (
            <NavbarBrand href="/">
                <img src="Logo_squat_white.png" width="170" height="60" alt="Squatinator"></img>
            </NavbarBrand>
        )
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/exercises">Exercises</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={this.onLogout.bind(this)}>Logout</Link>
                </li>
            </ul>
        )
     
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Sign In</Link>
                </li>
            </ul>
        )
        return (
        <div>
            <Navbar dark expand="sm" className="mb-5">
                <Container>
                    {isAuthenticated ? authBrand : guestBrand}
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {isAuthenticated ? authLinks : guestLinks}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(AppNavbar));