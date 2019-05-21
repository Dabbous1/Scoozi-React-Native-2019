import * as operations from '../operations';
import each from 'lodash/each';
let asyncReducers = {};

each(operations, (operation, name) => {
    asyncReducers[name] = operation.reducer;
});

module.exports = asyncReducers;
