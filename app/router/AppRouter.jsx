import React from 'react';
import {Route, Router, useRouterHistory, IndexRoute} from 'react-router';
import {createHashHistory} from 'history';
import Plan from '../Plan.jsx';

const appHistory = useRouterHistory(createHashHistory)({queryKey: false});

export default class AppRouter extends React.Component {
    render() {
        return (
    	<div>
            <Router history={appHistory}>
                <Route path="/">
                    <IndexRoute component={Plan} />
                    <Route path="plan" component={Plan}>
                    </Route>

                    <Route path="*" component={NoMatch}/>
                </Route>
            </Router>
        </div>);
    }
}

class NoMatch extends React.Component {
    render() {
        return <div>404</div>
    }
}