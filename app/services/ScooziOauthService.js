import Axios from 'axios';
import { getAccessToken } from './ServiceUtils';
import { secrets } from '../secrets';

export default class ScooziOauthService {
    constructor() {
        this.client = Axios.create({
            baseURL: `${secrets.baseUrl}`,
            timeout: 5000
        });
        this.client.interceptors.response.use(
            function(response) {
                console.log(response);
                return response;
            },
            function(error) {
                console.log(error.response);
                return Promise.reject(error.response.data);
            }
        );
    }

    getPublicAccessToken(params) {
        return this.client
            .post('/oauth/token', {
                grant_type: 'client_credentials',
                client_id: secrets.clientId,
                client_secret: secrets.clientSecret
            })
            .then(getAccessToken);
    }

    getPrivateAccessToken(user) {
        return this.client
            .post('/oauth/token', {
                grant_type: 'password',
                login: user.login,
                password: user.password,
                client_id: secrets.client_id,
                client_secret: secrets.client_secret
            })
            .then(getAccessToken);
    }
}
