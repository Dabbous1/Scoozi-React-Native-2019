import { createAsyncAction } from '../redux/createAsyncAction';
import { actionTypes } from '../actions/actionTypes';
import { ScooziApiService, ScooziOauthService } from '../services';
import {
    setPublicAccessToken,
    setPrivateAccessToken,
    setCurrentRideId
} from '../actions/userActions';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';

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
            Actions.home();
            return accessToken;
        });
    }
});

export const registerUser = createAsyncAction({
    type: actionTypes.REGISTER_USER,
    operation: (payload, dispatch, getState) => {
        return ScooziApiService.register(payload).then((res) => {
            return dispatch(
                logUserIn.actionCreator({
                    login: payload.user.email,
                    password: payload.user.password
                })
            );
        });
    }
});

export const signInWithFacebook = createAsyncAction({
    type: actionTypes.SIGN_IN_WITH_FACEBOOK,
    operation: (payload, dispatch, getState) => {
        return LoginManager.logInWithReadPermissions(['public_profile']).then(
            (result) => {
                if (!result.isCancelled) {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        console.log(data);
                        return ScooziOauthService.signInWithFacebook({
                            accessToken: data.accessToken.toString()
                        }).then((accessToken) => {
                            dispatch(setPrivateAccessToken(accessToken));
                            return accessToken;
                        });
                    });
                }
            },
            (error) => {
                console.log('Login fail with error: ' + error);
            }
        );
    }
});

export const startRide = createAsyncAction({
    type: actionTypes.START_RIDE,
    schema: 'ride',
    operation: (payload, dispatch, getState) => {
        return ScooziApiService.startRide(payload).then((ride) => {
            dispatch(setCurrentRideId(ride.id));
            Actions.ride({ ride_id: ride.id });
            return ride;
        });
    }
});

export const endRide = createAsyncAction({
    type: actionTypes.END_RIDE,
    schema: 'ride',
    operation: (payload, dispatch, getState) => {
        return ScooziApiService.endRide(payload).then((ride) => {
            return ride;
        });
    }
});
