import Axios from 'axios';
import { secrets } from '../secrets';
import { getAccessToken, getContent } from './ServiceUtils';

export default class ScooziApiService {
    constructor(props) {
        this.client = Axios.create({
            baseURL: `${secrets.baseUrl}`,
            timeout: 5000
        });
    }

    setStore(store) {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.store = store;
        this.unsubscribe = store.subscribe(() => {
            const state = store.getState();
            this.publicAccessToken = state.publicAccessToken;
            this.currentUserAccessToken = state.currentUserAccessToken;
        });
    }

    makeRequest(method, url, params = {}) {
        return this.client[method](url, params).then(getContent);
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

    logUserIn(params) {
        return this.post('/login', params);
    }
}
