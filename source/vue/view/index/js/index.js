import menu from '../../public/menu.vue';
import userApi from 'api/user.js';
import routeForVue from '_vue/router/routes.js';

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
                created (tab) {
                    self.create(this , tab);
                } ,
                deleted (tab) {

                } ,
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
                id: [5] ,
                // 初始状态，spread || shrink
                status: 'shrink' ,
                // 层级视觉显示效果
                amount: 12 ,
                // 同层级是否互斥
                exclution: true ,
                // 是否菜单也可被选中
                menuFocus: true ,
                // 点击项后是否选中
                focus: false ,
                // 是否选中顶级菜单
                topFocus: false ,
                // 子级项点击后回调
                child (id) {
                    let topRoute = self.topRoute(id);
                    let route = self.route(id);
                    self.ins.tab.create({
                        text: `${topRoute.name}-${route.name}` ,
                        attr: {
                            route: route.route
                        }
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
        // 创建内容
        create (tabIns , tab) {
            tab = G(tab);
            var route = tab.data('route');
            var div = document.createElement('div');
                div = G(div);
                div.data('id' , tab.data('id'));
            var render = document.createElement('div');
                div.append(render);
            this.dom.con.append(div.get(0));
            this.mount(render , route);
            div.highlight('hide' , div.parent().children().get() , true);
        } ,

        // 删除内容
        delete () {

        } ,

        // 组件
        component (route) {
            for (let i = 0; i < routeForVue.length; ++i)
            {
                let v = routeForVue[i];
                if (v.path == route) {
                    return Vue.extend(v.component);
                }
            }
            throw new Error('未找到 route：' + route + '对应的路由');
        } ,

        // 挂载组建
        mount (container , route) {
            let compClass = this.component(route);
            new compClass().$mount(container);
        } ,

        // 获取顶级项

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
                data = res.data;
                // 针对 data 做一些数据过滤
                const menu = this.getMenuData(data.user.role.priv);
                this.$store.commit('menu' , menu);
                this.$store.commit('priv' , data.user.role.priv);
                this.$store.commit('route' , data.route);
                resolve();
            });
        } ,

        // 获取当前路由
        route (id) {
            let routes = this.$store.state.route;
            let route = G.t.current(id , routes , this.field);
            if (G.isNull(route)) {
                throw new Error('未找到当前 id 对应数据');
            }
            return route;
        } ,

        // 获取顶级路由
        topRoute (id) {
            let routes = this.$store.state.route;
            let parents = G.t.parents(id , routes , this.field , true , true);
            return parents;
        } ,
    } ,
}