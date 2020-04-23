import BaseAjax from './base-ajax';
import config from './config.js';
import { query } from '../common/util.js';
class API extends BaseAjax {
    _getBaseURL () {
        let branch = query('dev') || process.env.NODE_ENV;
        return config[branch] || config.development;
    }
    getArticleList (params) {
        return this.get('/wp/v2/posts', params);
    }
    check (params) {
        return this.get('questionnaire/check', params);
    }
    submit (params) {
        return this.postForm('questionnaire/sub', params);
    }
}

export default API;
