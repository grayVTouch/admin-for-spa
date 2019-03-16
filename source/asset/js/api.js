/**
 * ***********************
 * api 设置
 * ***********************
 */
import userApi from '../../api/user.js';
import articleTypeApi from '../../api/articleType.js';
import articleApi from '../../api/article.js';
import announcementApi from '../../api/announcement.js';
import appApi from '../../api/app.js';

Object.assign(window , {
    userApi ,
    articleTypeApi ,
    articleApi ,
    announcementApi ,
    appApi ,
});