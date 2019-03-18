export default {
    name: "v-list" ,
    data () {
        return {
            form: {
                id: '',
                order: '',
                page: 1
            },
            page: {
                total: 1
            } ,
            // 数据列表
            data: [],
            ins: {} ,
            idList: [] ,
            api: articleApi ,
            dom: {} ,
            type: ['头条' , '社会' , '国内' , '国际' , '娱乐' , '体育' , '军事' , '科技' , '财经' , '时尚']
        };
    } ,
    mounted () {
        this.dom.tbody = G(this.$refs.tbody);
        // 最高优先级：加载层
        this.ins.loading = new Loading(this.$refs.loading.$el , {
            status: 'hide' ,
            type: 'line-scale'
        });

        this.initialize();
    } ,
    methods: {
        initialize () {
            this.getData();
        } ,
        getData () {
            this.ins.loading.show();
            // 用户列表
            this.api.list(this.form , (res) => {
                this.ins.loading.hide();
                if (res.code != 200) {
                    this.$msg(res.data);
                }
                let data = res.data;
                this.data = data.data;
                delete data.data;
                this.page = data;
            });
        } ,
        // 分页事件
        pageEvent (page) {
            this.form.page = page;
            this.getData();
        } ,
        // 用户提交
        submit () {
            this.form.page = 1;
            this.getData();
        } ,

        // 重置
        reset () {
            this.submit();
        } ,
        // 删除选中项
        del (idList , fn) {
            if (this.idList.length < 1) {
                this.$error('您尚未选择待删除的项！');
                return ;
            }
            if (this.isRunning) {
                layer.alert('请求中...请耐心等待');
                return ;
            }
            this.ins.loading.show();
            this.api.del({
                id_list: G.jsonEncode(this.idList)
            } , (res) => {
                this.isRunning = false;
                this.ins.loading.hide();
                if (res.code != 200) {
                    this.$error(res.data);
                    return ;
                }
                this.$success('删除成功');
                this.getData();
                if (G.isFunction(fn)) {
                    fn();
                }
            });
        } ,

        // 删除选中项
        delTarget (id) {
            this.del([id] , () => {
                this.delId(id);
            });
        } ,

        delSelected () {
            this.del(this.idList , () => {
                this.idList = [];
            });
        } ,

        // 选择事件
        selectEvent (e) {
            let tar = G(e.currentTarget);
            let id = tar.data('id');
            let cbox = G('.c-box' , tar.get(0));
            let checked = cbox.native('checked');
            if (checked) {
                this.unselectedLine(id);
            } else {
                this.selectedLine(id);
            }
        } ,

        // 选中所有
        selectAllEvent (e) {
            let tar = G(e.currentTarget);
            let checked = tar.native('checked');
            let trs = this.dom.tbody.children();
            trs.each((dom) => {
                dom = G(dom);
                let id = dom.data('id');
                if (checked) {
                    this.selectedLine(id);
                } else {
                    this.unselectedLine(id);
                }
            });
        } ,

        // 选中行
        selectedLine (id) {
            let trs = this.dom.tbody.children({
                tagName: 'tr'
            });
            for (let i = 0; i < trs.length; ++i)
            {
                let cur = trs.jump(i , true);
                if (cur.data('id') == id) {
                    cur.addClass('focus');
                    let cbox = G('.c-box' , cur.get(0)).native('checked' , true);
                    this.addId(id);
                }
            }
        } ,

        // 取消选中
        unselectedLine (id) {
            let trs = this.dom.tbody.children({
                tagName: 'tr'
            });
            for (let i = 0; i < trs.length; ++i)
            {
                let cur = trs.jump(i , true);
                if (cur.data('id') == id) {
                    cur.removeClass('focus');
                    let cbox = G('.c-box' , cur.get(0)).native('checked' , false);
                    this.delId(id);
                }
            }
        } ,

        // 添加
        addId (id) {
            if (this.idList.indexOf(id) != -1) {
                return ;
            }
            this.idList.push(id);
        } ,

        // 删除
        delId (id) {
            let index = -1;
            if ((index = this.idList.indexOf(id)) == -1) {
                return ;
            }
            this.idList.splice(index , 1);
        } ,
        // 抓取文章
        capture () {
            let option = {
                btn: [...this.type , '取消'] ,
            };
            for (let i = 0; i < this.type.length; ++i)
            {
                let cur = this.type[i];
                option['btn' + i + 1] = (index) => {
                    layer.close(index);
                    this.api.capture({
                        type: cur
                    } , (res) => {
                        if (res.code != 200) {
                            this.$error(res.data);
                            return ;
                        }
                        let data = res.data;
                        let msg = `总记录数：${data.total}\n成功记录数：${data.success}\n失败记录数：${data.error}\n重复记录数：${data.repeat}`;
                    });
                };
            }
            option[this.type.length + 1] = (index) => {
                layer.close(index);
            };
            layer.alert('请选择要抓取的文章类型' , btn);
        } ,
    } ,
}