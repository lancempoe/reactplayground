import Constants from '../constants/ActionTypes';

const initialState = {
    data: {}
};

const reducer = function(state = initialState, action) {
    switch (action.type) {
        case Constants.SET_GOOGLE_KEY_DATA:
            return { ...state, data: action.data };
        default:
            return state;
    }
};

export default reducer;
