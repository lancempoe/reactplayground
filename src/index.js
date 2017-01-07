import React from 'react'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux';  // eslint-disable-line no-unused-vars
import { Router, browserHistory } from 'react-router'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import store from './store';
import routes from './routes/router';
import { syncHistoryWithStore } from 'react-router-redux';
require('es6-promise').polyfill();

// Provider is a top-level component that wraps our entire application, including
// the Router. We pass it a reference to the store so we can use react-redux's
// connect() method for Component Containers.

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={ history }>
            { routes(store) }
        </Router>
    </Provider>,
    document.getElementById('root')
);
