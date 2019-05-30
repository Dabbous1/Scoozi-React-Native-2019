import { actionTypes } from './actionTypes';

export const setPublicAccessToken = (accessToken) => ({
    type: actionTypes.SET_PUBLIC_ACCESS_TOKEN,
    accessToken
});

export const setPrivateAccessToken = (accessToken) => ({
    type: actionTypes.SET_PRIVATE_ACCESS_TOKEN,
    accessToken
});

export const setCurrentRideId = (id) => ({
    type: actionTypes.SET_CURRENT_RIDE_ID,
    id
});
