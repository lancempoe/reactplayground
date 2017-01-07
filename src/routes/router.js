import React from 'react'; // eslint-disable-line no-unused-vars
import { Route, IndexRoute } from 'react-router'; // eslint-disable-line no-unused-vars
import _ from 'lodash';
import App from '../components/App';
import GoogleKeyPage from '../container/GoogleKeyPage';
import SolarAnalyzer from '../container/SolarAnalyzerPage';

export default (store) => {
    const authRequired = (nextState, replace) => {
        const state = store.getState();
        if (!_.has(state, 'googleKey.data.key')) {
            replace('/login');
        }
    };

    return (
        <Route path="/" component={App}>
            <IndexRoute component={GoogleKeyPage} />
            <Route path="solaranalyzer" component={SolarAnalyzer} onEnter={authRequired}/>
            <Route path="login" component={GoogleKeyPage} />
        </Route>
    );
};