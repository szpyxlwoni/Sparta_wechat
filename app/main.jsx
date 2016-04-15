import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import SpartaApp from './reducers/Reducers.jsx';
import AppRouter from './router/AppRouter.jsx';
import 'bootstrap/dist/css/bootstrap.css';

const finalCreateStore = compose(
    applyMiddleware(thunk)
)(createStore);

const store = finalCreateStore(SpartaApp);

const app = (
    <div>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </div>
);

ReactDOM.render(app, document.getElementById('app'));