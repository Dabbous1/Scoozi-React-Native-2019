import * as operations from '../operations';
import each from 'lodash/each';
let asyncActions = {};

each(operations, (operation, name) => {
    asyncActions[name] = operation.actionCreator;
});

module.exports = asyncActions;
