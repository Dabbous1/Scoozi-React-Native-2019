import Axios from 'axios';
import { secrets } from '../secrets';

export default class OgraApiService {
    constructor(props) {
        this.client = Axios.create({
            baseURL: `${secrets.baseUrl}/api`,
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
        });
    }

    makeRequest(method, url, params = {}) {
        return this.client[method](url, params);
    }

    get(url, params) {
        console.log(url);
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
