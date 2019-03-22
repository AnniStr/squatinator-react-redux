import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Container } from 'reactstrap';


import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser } from './actions/authentication'
import { PrivateRoute } from './helpers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import AppNavbar from './components/AppNavbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Workouts from './components/Workouts';
import Exercises from './components/Exercises';
import WorkoutExerciseList from './components/WorkoutExerciseList';
import Footer from './components/Footer';


if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>{/*--use Redux in Components*/}
        <Router>
          <div className="App">
            <AppNavbar />
            <Container>
                <Route exact path = "" component = { Welcome }></Route>
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login }/>
                <PrivateRoute exact path="/home" component={ Home}/>
                <PrivateRoute exact path="/workouts" component={ Workouts } />
                <PrivateRoute exact path="/workoutexercises" component={ WorkoutExerciseList } />
                <PrivateRoute exact path="/exercises" component={ Exercises } />
              </Container> 
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
};

export default App;
