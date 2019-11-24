import axios from 'axios';

export default class BaseApi {
  constructor(baseURL, config = {}) {
    this.axios = axios.create(baseURL, { ...config });
    this.axios.interceptors.response
      .use((res) => {
        console.log(res);
      }, (err) => {
        console.error(err);
      });
  }

  get(endpoint = '', params = {}) {
    return this.axios.get(endpoint, { params });
  }
}
