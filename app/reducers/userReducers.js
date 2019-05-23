import { actionTypes } from '../actions/actionTypes';

export const publicAccessToken = (state = null, action) => {
    switch (action.type) {
        case actionTypes.SET_PUBLIC_ACCESS_TOKEN:
            return action.accessToken;
        default:
            return state;
    }
};
