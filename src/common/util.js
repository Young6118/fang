/*
 * @Descriptions: 工具类
 * @Author: HuangLingPeng
 * @Date: 2019-09-19 15:00:56
 * @LastEditors: HuangLingPeng
 * @LastEditTime: 2019-10-10 11:59:40
 */
/**
 * 返回 querystring 对象
 * @param url
 * @return {Object} 对象
 */
export function queryParse (url) {
    let dic = {};
    url = url || location.search.slice(1);
    let array = url.split('&');
    for (let i = 0, len = array.length; i < len; i++) {
        let params = array[i].split('=');
        if (params[0]) {
            dic[decodeURIComponent(params[0])] = decodeURIComponent(params[1])
        }
    }
    return dic;
}

/**
 * 根据key返回url中的value
 * @param {string} key
 * @param {string} [url]
 * @returns {string}
 */
export function query (key, url) {
    return queryParse(url)[key];
}

/**
 * 节流防止连续点击触发
 * @param {fun} func
 * @param {number} wait
 */
export function debounce (func, wait = 200) {
    let timeout;
    return function (event) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.call(this, event)
        }, wait);
    }
}

/**
 * 设置window.name属性
 */
export function setWindowName (key, val) {
    try {
        JSON.parse(window.name);
    } catch {
        window.name = '{}';
    }
    let data = JSON.parse(window.name);
    data[key] = val;
    window.name = JSON.stringify(data);
}

/**
 * 读取window.name属性
 */
export function getWindowName (key, pop = false) {
    try {
        JSON.parse(window.name);
    } catch {
        return;
    }
    let data = JSON.parse(window.name);
    let res = data[key];
    if (pop) {
        delete data[key];
        window.name = JSON.stringify(data);
    }
    return res;
}