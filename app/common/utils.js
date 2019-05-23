import isFunction from 'lodash/isFunction';
export function onEnvironment({ staging, production }) {
    if (__DEV__) {
        return isFunction(staging) ? staging() : staging;
    } else {
        return isFunction(production) ? production() : production;
    }
}
