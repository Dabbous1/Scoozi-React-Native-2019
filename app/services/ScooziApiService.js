import Axios from 'axios';
import { secrets } from '../secrets';

export default class ScooziApiService {
    constructor(props) {
        this.client = Axios.create({
            baseURL: `${secrets.baseUrl}/api/v1`,
            timeout: 5000
        });
        this.client.interceptors.response.use(
            function(response) {
                console.log(response);
                return response.data;
            },
            function(error) {
                console.log(error.response);
                return Promise.reject(error.response.data);
            }
        );
    }

    setStore(store) {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.store = store;
        this.unsubscribe = store.subscribe(() => {
            const state = store.getState();
            this.publicAccessToken = state.publicAccessToken;
            this.privateAccessToken = state.privateAccessToken;
        });
    }

    makeRequest(method, url, params = {}) {
        return this.client[method](url, {
            ...params,
            access_token: this.privateAccessToken || this.publicAccessToken
        });
    }

    get(url, params) {
        return this.makeRequest('get', url, params);
    }

    post(url, params) {
        return this.makeRequest('post', url, params);
    }

    put(url, params) {
        return this.makeRequest('put', url, params);
    }

    delete(url, params) {
        return this.makeRequest('delete', url, params);
    }

    register(params) {
        return this.post(`/users`, params);
    }

    startRide(params) {
        return this.post(`/trips`, params);
    }

    endRide(params) {
        return this.put(`/trips/${params.trip_id}/end`, params);
    }
}
