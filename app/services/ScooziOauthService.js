import Axios from 'axios';
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
                return response.data.access_token;
            },
            function(error) {
                console.log(error.response);
                return Promise.reject(error.response.data);
            }
        );
    }

    getPublicAccessToken() {
        return this.client.post('/oauth/token', {
            grant_type: 'client_credentials',
            client_id: secrets.clientId,
            client_secret: secrets.clientSecret
        });
    }

    getPrivateAccessToken(user) {
        return this.client.post('/oauth/token', {
            grant_type: 'password',
            login: user.login,
            password: user.password,
            client_id: secrets.client_id,
            client_secret: secrets.client_secret
        });
    }

    signInWithFacebook(data) {
        return this.client.post('/oauth/token', {
            grant_type: 'password',
            facebook_token: data.accessToken,
            client_id: secrets.client_id,
            client_secret: secrets.client_secret
        });
    }
}
