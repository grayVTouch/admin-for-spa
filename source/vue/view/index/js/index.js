import menu from '../../public/menu.vue';
import moduleNav from '../../public/moduleNav.vue';
import routeForVue from '../../../router/routes.js';

export default {
    name: "v-index" ,
    data () {
        return {
            dom: {} ,
            ins: {} ,
            field: {
                id: 'id' ,
                p_id: 'p_id'
            }
        };
    } ,
    mounted () {
        this.dom.functions = G(this.$refs['functions-for-user']);
        this.dom.con = G(this.$refs.con);

        this.initialize();
    } ,
    components: {
        'v-menu': menu
    } ,
    methods: {
        // 初始化
        initialize () {
            new Promise((resolve , reject) => {
                this.info(resolve , reject);
            }).then(() => {
                this.$nextTick(() => {
                    // DOM 渲染完成
                    this.initTab();
                    this.initMenu();
                });
            });
        } ,

        initTab () {
            let self = this;
            this.ins.tab = new MultipleTab(this.$refs['multiple-tab'] , {
                ico: '/plugin/MultipleTab/image/icon.ico' ,
                created (id) {
                    // 路由参数
                    let param = this.attr(id , 'param');
                    param = G.isValid(param) ? G.jsonDecode(param) : {};
                    self.create(this , id , param);
                } ,
                deleted (id) {
                    self.delete(id);
                } ,
                click (id) {
                    self.switch(id);
                }
            });
        } ,
        initMenu () {
            const self = this;
            this.ins.ic = new InfiniteClassification(this.$refs['infinite-classification'] , {
                // 菜单展开动画过渡时间
                time: 300 ,
                // 次要的图标类型，new || number || switch
                icon: 'switch' ,
                // 标识符，展开的项；1. 在元素里面设置 data-focus='y' +
                id: [2] ,
                // 初始状态，spread || shrink
                status: 'shrink' ,
                // 层级视觉显示效果
                amount: 12 ,
                // 同层级是否互斥
                exclution: false ,
                // 是否菜单也可被选中
                menuFocus: true ,
                // 点击项后是否选中
                focus: false ,
                // 是否选中顶级菜单
                topFocus: false ,
                // 子级项点击后回调
                child (id) {
                    let topRoute = self.topRoute(id);
                    let route = self.findRouteById(id);
                    let text = self.genTabName(topRoute , route);
                    self.open(text , {
                        route: route.route
                    });
                }
            });
        } ,
        // 显示
        showUserCtrl () {
            this.dom.functions.removeClass('hide');
            this.dom.functions.animate({
                opacity: 1 ,
                bottom: '0px'
            });
        } ,
        // 隐藏
        hideUserCtrl () {
            this.dom.functions.animate({
                opacity: 0 ,
                bottom: '-10px'
            } , () => {
                this.dom.functions.addClass('hide');
            });
        } ,

        // 新开标签页
        open (text , attr , ico = null) {
            this.ins.tab.create({
                ico ,
                text ,
                attr
            });
        } ,

        // 创建内容
        create (tab , id , param) {
            var route = tab.attr(id , 'route');
            var div = document.createElement('div');
                div = G(div);
                div.data('id' , id);
            var render = document.createElement('div');
                div.append(render);
            this.dom.con.append(div.get(0));
            this.mount(render , id , route , param);
            div.highlight('hide' , div.parent().children().get() , true);
        } ,

        // 删除内容
        delete (id) {
            this.dom.con.remove(this.item(id));
        } ,

        // 查找给定的项
        item (id) {
            let items = this.dom.con.children();
            for (let i = 0; i < items.length; ++i)
            {
                let cur = items.jump(i , true);
                if (cur.data('id') == id) {
                    // 删除节点
                    return cur.get(0);
                }
            }
            throw new Error('未找到给定节点');
        },

        // 标签切换
        switch (id) {
            G(this.item(id)).highlight('hide' , this.dom.con.children().get() , true);
        } ,

        // 组件
        component (route , param , id) {
            for (let i = 0; i < routeForVue.length; ++i)
            {
                let v = routeForVue[i];
                if (v.path == route) {
                    return this.newComponent(v.component , route , param , id);
                }
            }
            throw new Error('未找到 route：' + route + '对应的路由');
        } ,

        // 挂载组建
        mount (container , id , route , param) {
            let compClass = this.component(route , param , id);
            new compClass().$mount(container);
        } ,

        // 生成标签名称
        genTabName (topRoute , curRoute) {
            return `${topRoute.name}-${curRoute.name}`;
        } ,

        // 重新渲染
        reRender (id , route , param) {
            let curRoute = this.findRouteByRoute(route);
            let topRoute = this.topRoute(curRoute.id);
            let title = this.genTabName(topRoute , curRoute);
            this.ins.tab.title(id , title);
            // 更新标签内容
            // 重新渲染元素内容
            let container = this.item(id);
                container = G(container);
            // 清空内容
            container.html('');
            let div = document.createElement('div');
            container.append(div);
            this.mount(div , id , route , param);
        } ,

        // 新开一个标签页
        createTab (route , param = {}) {
            let curRoute = this.findRouteByRoute(route);
            let topRoute = this.topRoute(curRoute.id);
            let title = this.genTabName(topRoute , curRoute);
            this.open(title , {
                route: curRoute.route ,
                param: G.jsonEncode(param)
            });
        } ,

        // 实例化 vue 组件
        newComponent (component , route , param , id) {
            let self = this;
            route = this.findRouteByRoute(route);
            let topRoute = this.topRoute(route.id);
            return Vue.extend({
                ...component ,
                // 混入一些组件通用方法
                mixins: [
                    {
                        data () {
                            return {
                                // 当前组件的标识符
                                id ,
                                param ,
                                route ,
                                topRoute ,
                                pos: []
                            };
                        } ,
                        created () {
                            this.pos = self.curPos(route.id);
                        } ,
                        methods: {
                            // 也跳跳转方法
                            location (route , param , type = '_self') {
                                // 目前仅有两种类型
                                // _self 页面内重载
                                // _blank 打开新的标签页
                                let typeRange = ['_self' , '_blank'];
                                if (type == '_self') {
                                    return self.reRender(id , route , param);
                                }
                                if (type == '_blank') {
                                    // 新开一个标签页
                                    return self.createTab(route , param);
                                }
                                // ...预留的内容
                            } ,
                        } ,
                        components: {
                            'module-nav': moduleNav
                        }
                    }
                ] ,
            });
        } ,

        // 获取菜单数据
        getMenuData (priv) {
            let menu = [];
            let count = 0;
            let filter = (data , res) => {
                if (count > 1000) {
                    console.log('死循环');
                    return ;
                }
                count++;
                for (let i = 0; i < data.length; ++i)
                {
                    let v = data[i];
                    if (v.menu != 'y') {
                        continue ;
                    }
                    let _v = {...v};
                    res.push(_v);
                    if (v.children.length > 0) {
                        _v.children = [];
                        filter(v.children , _v.children);
                    }
                }
            };
            filter(priv , menu);
            return menu;
        } ,

        // 获取用户相关数据
        info (resolve , reject) {
            userApi.info((res) => {
                if (res.code != 200) {
                    this.$Message.error(res.data);
                    reject();
                    return ;
                }
                let data = res.data;
                // 针对 data 做一些数据过滤
                const menu = this.getMenuData(data.user.role.priv);
                this.$store.commit('menu' , menu);
                this.$store.commit('priv' , data.user.role.priv);
                this.$store.commit('route' , data.route);

                resolve();
            });
        } ,

        // 获取当前路由 by id
        findRouteById (id) {
            let routes = this.$store.state.route;
            let route = G.t.current(id , routes , this.field);
            if (G.isNull(route)) {
                throw new Error('未找到当前 id：' + id + ' 对应路由！');
            }
            return route;
        } ,

        // 获取当前路由，by route
        findRouteByRoute (route) {
            let routes = this.$store.state.route;
            for (let i = 0; i < routes.length; ++i)
            {
                let cur = routes[i];
                if (cur.route == route) {
                    return cur;
                }
            }
            throw new Error('未找到给定路由：' + route + '！');
        } ,

        // 获取顶级路由
        topRoute (id) {
            let route = this.$store.state.route;
            let parents = G.t.parents(id , route , this.field , true , true);
            return parents;
        } ,

        // 获取当前位置
        curPos (id) {
            let route = this.$store.state.route;
            return G.t.parents(id , route , this.field , true , false);
        } ,
    } ,
}