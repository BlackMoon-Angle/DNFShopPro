/**
 * 封装ajax请求
 * fetch(url,options)
 */
/*
    process.env.NODE_ENV，分为
        开发环境：development
        生成环境：production
    运行npm start时，默认process.env.NODE_ENV === 'development'
    运行npm run build时，会修改成process.env.NODE_ENV === 'production'
*/

let baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:27000' : 'http://120.79.50.148:27005'

export async function request(url, data = {}, options = {}) {
    if (options.baseUrl) {
        baseUrl = options.baseUrl;
    }

    url = baseUrl + url;
    if (options.method) {
        options.method = options.method.toLowerCase();
    }
    if (options.method === 'get' || options.get === undefined) {
        const params = []
        for (const key in data) {
            params.push(`${key}=${data[key]}`)
        }
        url = url + (url.includes('?') ? '&' : '?') + params.join('&')
    } else if (['post', 'put', 'patch'].includes(options.method)) {
        data = JSON.stringify(data);
        options.headers['content-type'] = 'application/json';
    }

    return await fetch(url, {
        ...options,
        data,

    }).then(res => res.json());

}

export function get(url, data, options) {
    return request(url, data, options)
}


export function post(url, data, options = { method: 'post' }) {
    return request(url, data, options)
}

export function remove(url, data, options = { method: 'delete' }) {
    return request(url, data, options)
}

export function put(url, data, options = { method: 'put' }) {
    return request(url, data, options)
}

export function patch(url, data, options = { method: 'patch' }) {
    return request(url, data, options)
}

export default {
    request,
    get,
    post,
    put,
    patch,
    remove
}