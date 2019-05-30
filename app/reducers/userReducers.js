import { actionTypes } from '../actions/actionTypes';

export const publicAccessToken = (state = null, action) => {
    switch (action.type) {
        case actionTypes.SET_PUBLIC_ACCESS_TOKEN:
            return action.accessToken;
        default:
            return state;
    }
};

export const privateAccessToken = (state = null, action) => {
    switch (action.type) {
        case actionTypes.SET_PRIVATE_ACCESS_TOKEN:
            return action.accessToken;
        default:
            return state;
    }
};

export const currentRideId = (state = null, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_RIDE_ID:
            return action.id;
        default:
            return state;
    }
};
