import { createAsyncAction } from '../redux/createAsyncAction';
import { actionTypes } from '../actions/actionTypes';

export const logUserIn = createAsyncAction({
    type: actionTypes.LOG_USER_IN,
    operation: (payload, dispatch, getState) => {
        return Promise.resolve({});
    }
});
