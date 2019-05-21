import { normalize } from 'normalizr';
import { schemas } from '../models';
import union from 'lodash/union';
const initialState = {
    loaded: false
};

export const createAsyncAction = ({ type, operation, schema = null, paginator = null }) => {
    const [SUCCESS, FAILED, LOAD_MORE] = [`${type}_SUCCESS`, `${type}_FAILED`, `${type}_LOAD_MORE`];
    return {
        actionCreator: (payload) => {
            return (dispatch, getState) => {
                if (paginator && payload[paginator] > 1) {
                    dispatch({ type: LOAD_MORE, payload });
                } else {
                    dispatch({ type, payload });
                }
                return operation(payload, dispatch, getState)
                    .then((result) => {
                        const { entities = {}, result: ids = [] } = schema
                            ? normalize(result.data, schemas[schema])
                            : {};
                        return dispatch({
                            type: SUCCESS,
                            result,
                            success: true,
                            ids,
                            entities
                        });
                    })
                    .catch((error) => {
                        return dispatch({
                            type: FAILED,
                            result: null,
                            error,
                            success: false
                        });
                    });
            };
        },
        reducer: (state = initialState, action) => {
            switch (action.type) {
                case type:
                    return {
                        ...state,
                        loading: true,
                        loadingMore: false,
                        ids: []
                    };
                case LOAD_MORE:
                    return {
                        ...state,
                        loaded: true,
                        loading: false,
                        loadingMore: true,
                        error: null,
                        result: action.result
                    };
                case SUCCESS:
                    let ids = state.ids || [];
                    return {
                        ...state,
                        loaded: true,
                        loading: false,
                        loadingMore: false,
                        error: null,
                        result: action.result,
                        ids: union(ids, action.ids)
                    };
                case FAILED:
                    return {
                        ...state,
                        error: action.error,
                        loaded: true,
                        loading: false,
                        loadingMore: false
                    };
                default:
                    return state;
            }
        }
    };
};
