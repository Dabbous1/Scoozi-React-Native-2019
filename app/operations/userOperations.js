import { createAsyncAction } from '../redux/createAsyncAction';
import { actionTypes } from '../actions/actionTypes';
import { ScooziApiService, ScooziOauthService } from '../services';
import { setPublicAccessToken, setPrivateAccessToken } from '../actions/userActions';

export const getPublicAccessToken = createAsyncAction({
    type: actionTypes.GET_PUBLIC_ACCESS_TOKEN,
    operation: (payload, dispatch, getState) => {
        return ScooziOauthService.getPublicAccessToken(payload).then((accessToken) => {
            dispatch(setPublicAccessToken(accessToken));
            return accessToken;
        });
    }
});
export const logUserIn = createAsyncAction({
    type: actionTypes.LOG_USER_IN,
    operation: (payload, dispatch, getState) => {
        return ScooziOauthService.getPrivateAccessToken(payload).then((accessToken) => {
            dispatch(setPrivateAccessToken(accessToken));
            return accessToken;
        });
    }
});
