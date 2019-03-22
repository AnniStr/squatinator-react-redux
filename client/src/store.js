/* A store holds the whole state tree of your application.
*  The only way to change the state inside it is to dispatch an action on it.
*  A store is not a class. It's just an object with a few methods on it. 
* To create it, pass your root reducing function to createStore.*/

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // redux middleware
import rootReducer from './reducers';

const initialState = {};

// thunk allows you to write action creators that return a function instead of an action 
// and can be used to delay the dispatch of an action, 
// or to dispatch only if a certain condition is met
const middleware = [thunk]; 

const store = createStore(
    rootReducer, 
    initialState, 
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for redux devtools
    ) 
);

export default store;