export default {
    list: {
        data: {
            data () {
                return {
                    page: {
                        total: 0 ,
                        page: 0 ,
                        per_page: 0 ,
                    } ,
                    form: {
                        page: 1
                    } ,
                    api: null ,
                    dom: null
                };
            } ,
        } ,
        page: {
            methods: {
                // 分页事件
                pageEvent (page) {
                    this.form.page = page;
                    this.getData();
                } ,
            } ,
        } ,
        filter: {
            methods: {
                // 用户提交
                submit () {
                    this.form.page = 1;
                    this.getData();
                } ,

                // 重置
                reset () {
                    this.submit();
                } ,
            }
        } ,
        get: {
            methods: {
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
            }
        } ,

        del: {
            mounted () {
                this.dom.tbody = G(this.$refs.tbody);
            } ,
            methods: {
                // 删除选中项
                del () {
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
                        this.idList = [];
                        this.$success('删除成功');
                        this.getData();
                    });
                } ,

                // 删除选中项
                delTarget (id) {
                    this.addId(id);
                    this.del();
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
            }
        } ,
    }
};