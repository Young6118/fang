import ls from 'store2';
class Cache {
    constructor ({
        duration = 1 * 3600 * 1000 // 默认一小时有效 (单位毫秒)
    } = {}) {
        this.duration = duration;
    }
    set (key, val) {
        ls.set(key, {
            time: Date.now(),
            val
        })
    }
    get (key) {
        let data = ls.get(key) || {};
        let time = data.time || 0;
        if (Date.now() - time > this.duration) {
            return null
        }
        return data.val
    }
}
export default Cache;
