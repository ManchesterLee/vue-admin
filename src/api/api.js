import axios from 'axios';

let base = '';

export const requestLogin = params => {
    return axios.post(`${base}/login`, params).then(res => res.data);
};

export const getFiltersPage = params => {
    return axios.get(`${base}/filter/page`, {params: params});
};

export const saveFilter = params => {
    return axios.post(`${base}/filter`, params).then(res => res.data);
};

export const getConfigMappingsPage = params => {
    return axios.get(`${base}/config-mappings/page`, {params: params});
};