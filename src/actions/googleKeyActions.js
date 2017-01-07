import constants from '../constants/ActionTypes';
import store from '../store';
import { browserHistory } from 'react-router';

const GoogleKeyActions = {

    setGoogleApiKey(data) {
        store.dispatch({
            type: constants.SET_GOOGLE_KEY_DATA,
            data
        });
        browserHistory.push('/solaranalyzer');
    }
};

export default GoogleKeyActions;
