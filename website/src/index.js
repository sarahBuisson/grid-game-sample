import React from "react";
import ReactDOM from "react-dom";
import {mu} from "kotlin-logging";

import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/App.jsx';

import rootReducer from './reducers';

console.log(mu.KotlinLoggingConfiguration);

console.log(mu.KotlinLoggingConfiguration.LOG_LEVEL);
mu.KotlinLoggingConfiguration.LOG_LEVEL = mu.KotlinLoggingLevel.ERROR;

console.log(mu.KotlinLoggingConfiguration.LOG_LEVEL);
console.log("hello web");
// use applyMiddleware to add the thunk middleware to the store

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);

const store = createStore(rootReducer, {}, enhancer );

const wrapper = document.getElementById("my-app");
console.log(wrapper)
wrapper ? ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>, wrapper) : false;
