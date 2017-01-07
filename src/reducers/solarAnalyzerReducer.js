import Constants from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = {
    location: {},
    solarResults: []
};

const reducer = function(state = initialState, action) {
    switch (action.type) {
        case Constants.SET_SOLAR_LOCATION:
            return { ...state, location: action.data };
        case Constants.ADD_SOLAR_RESULTS: {
            const solarResults = [...state['solarResults'], ...action.data];
            const orderedSolarResults = _.orderBy(solarResults, ['sunrise'], ['desc']);
            return {...state, solarResults: orderedSolarResults};
        }
        case Constants.CLEAR_ERRORS_AND_RESULTS:
            return { ...state, solarResults: initialState.solarResults };
        default:
            return state;
    }
};

export default reducer;
