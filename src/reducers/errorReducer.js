import Constants from '../constants/ActionTypes';

const initialState = {
    googleKey: {},
    solar: {}
};

const reducer = function(state = initialState, action) {
    switch (action.type) {
        case Constants.SET_GOOGLE_KEY_ERROR:
            return { ...state, googleKey: action.data };
        case Constants.SET_SOLAR_ERROR:
            return { ...state, solar: action.data};
        case Constants.CLEAR_ERRORS_AND_RESULTS:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
