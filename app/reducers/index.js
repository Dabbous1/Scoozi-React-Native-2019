import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import * as asyncReducers from './asyncReducers';
import * as commonReducers from './commonReducers';
import * as userReducers from './userReducers';
import thunk from 'redux-thunk';
import reduce from 'lodash/reduce';
function combineArrayReducers(reducers = []) {
    return function(state = {}, action) {
        return reduce(
            reducers,
            (acc, reducer) => {
                return reducer(acc, action);
            },
            state
        );
    };
}

const rootReducer = combineArrayReducers([
    combineReducers({
        ...commonReducers,
        ...userReducers,
        operations: combineReducers({ ...asyncReducers })
    })
]);

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['publicAccessToken', 'privateAccessToken']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = createStore(persistedReducer, applyMiddleware(thunk));

module.exports = { store };
