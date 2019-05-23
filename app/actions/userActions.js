import { actionTypes } from './actionTypes';

export const setPublicAccessToken = (accessToken) => ({
    type: actionTypes.SET_PUBLIC_ACCESS_TOKEN,
    accessToken
});
