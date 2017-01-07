import { createStore } from 'redux';
import { combineForms } from 'react-redux-form';
import googleKey from './reducers/googleKeyReducer';
import solarAnalyzer from './reducers/solarAnalyzerReducer';
import error from './reducers/errorReducer';
import { routerReducer } from 'react-router-redux';

const reducers = combineForms({
    googleKey,
    solarAnalyzer,
    error,
    routing: routerReducer
});

export default createStore(reducers);