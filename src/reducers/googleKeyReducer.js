import Constants from '../constants/ActionTypes';

const initialState = {
    data: {
        key: 'AIzaSyCWWmmzsGOwuupxU0vr73nXA_d3z8UUPLk',
    }
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
