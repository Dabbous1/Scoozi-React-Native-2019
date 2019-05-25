import { onEnvironment } from './common/utils';

export const secrets = {
    baseUrl: 'http://localhost:3000',
    ...onEnvironment({
        staging: {
            clientId: 'eJqVa4yJNp_XWop-9BSl-k3f_A9O2MZcSoEatIj53Ig',
            clientSecret: 'vrThd2nubPBOdR4tjcAw1BI3Tqyya8EAbqNCMQGwXg8'
        }
    })
};
