const list = `${topContext.api}ArticleType/list`;
export default {
    // 文章分类列表
    list (data , success , error) {
        return G.ajax({
            url: list ,
            method: 'post' ,
            success ,
            error
        });
    } ,
};