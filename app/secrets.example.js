import { onEnvironment } from './common';

export const secrets = {
    baseUrl: '',
    ...onEnvironment({
        staging: {
            clientId: '',
            clientSecret: ''
        }
    })
};
