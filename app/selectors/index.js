import * as commonSelectors from './commonSelectors';
import * as userSelectors from './userSelectors';

module.exports = {
    ...commonSelectors,
    ...userSelectors
};
