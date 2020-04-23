/*
 * @Descriptions:
 * @Author: HuangLingPeng
 * @Date: 2019-09-19 15:00:56
 * @LastEditors: HuangLingPeng
 * @LastEditTime: 2019-09-25 16:25:15
 */
import axios from 'axios'
import qs from 'qs'
import Cache from '../common/cache.js'
import { query } from '../common/util.js';

class BaseAjax {
    /**
     * 构造器
     * @constructor
     * @param {object} [config={}] axios.create参数
     */
    constructor ({
        type = 1, // 1 正常请求不带 token
        ...config
    } = {}) {
        this._branch = query('dev') || process.env.NODE_ENV;
        this._http = this._createHttp(Object.assign({
            baseURL: this._getBaseURL(),
            timeout: 60000
        }, config));
        // 该cache 改造之 store2.js, 只缓存一个小时
        this._cache = new Cache(); 
        this._type = type;
    }
    /**
     * 获取基础URL
     * @returns {string}
     * @private
     */
    _getBaseURL () {
        return ''
    }
    /**
     * 基础参数
     * @returns {object}
     * @private
     */
    async _defaultParams () {
        return {
        }
    }
    /**
     * 创建Axios实例
     * @param config
     * @returns {AxiosInstance}
     * @private
     */
    _createHttp (config) {
        let http = axios.create(config);
        http.interceptors.request.use(async (config) => {
            if (this._type === 3) {
                const headers = config.headers;
                config.headers = {
                    ...headers
                }
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        http.interceptors.response.use((response) => {
            return response.data;
        }, (error) => {
            return Promise.reject(error);
        });

        return http
    }
    /**
     * 是否增加一些参数
     * @param res
     * @returns {*}
     */
    async _addParams (params) {
        if (this._type === 2) {
            params = Object.assign(await this._defaultParams(), params);
        }
        return params;
    }
    /**
     * 处理请求结果
     * @param res
     * @returns {*}
     */
    _handleResult (res) {
        if (res.code !== 0) {
            throw res
        }
        return res.data;
    }
    /**
     * GET请求
     * @param url
     * @param params
     * @returns {PromiseLike<T> | Promise<T>}
     */
    async get (url, params = {}) {
        params = await this._addParams(params)
        return this._http({
            method: 'get',
            url,
            params
        }).then(this._handleResult);
    }

    /**
     * POST请求
     * @param url
     * @param data
     * @returns {PromiseLike<T> | Promise<T>}
     */
    async post (url, data) {
        data = await this._addParams(data)
        return this._http({
            method: 'post',
            url,
            data
        }).then(this._handleResult);
    }
    /**
     * POST form data
     * @param url
     * @param data
     * @returns {PromiseLike<T> | Promise<T>}
     */
    async postForm (url, data) {
        data = await this._addParams(data)
        return this._http({
            method: 'post',
            url,
            data: qs.stringify(data),
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then(this._handleResult);
    }

    async postFormData (url, data) {
        
        data = await this._addParams(data)
        return this._http({
            method: 'post',
            url,
            data,
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(this._handleResult);
    }

    async axios (config) {
        return this._http(config).then(this._handleResult);
    }
}

export default BaseAjax;
