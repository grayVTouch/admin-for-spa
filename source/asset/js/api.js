/**
 * ***********************
 * api 设置
 * ***********************
 */
import userApi from '../../api/user.js';
import articleTypeApi from '../../api/articleType.js';
import articleApi from '../../api/article.js';

Object.assign(window , {
    userApi ,
    articleTypeApi ,
    articleApi ,
});