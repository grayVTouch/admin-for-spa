<template>
    <div class="module-container">
        <module-nav :topRoute="topRoute" :pos="pos"></module-nav>

        <div class="module-content">
            <!-- 数据筛选 -->
            <form @submit.prevent="submit" @reset="reset">
                <div class="component-title">
                    <div class="left">筛选</div>
                    <div class="right"></div>
                </div>
                <div class="filter-options">
                    <div class="option">
                        <div class="field">ID：</div>
                        <div class="value"><input type="text" v-model="form.id" class="form-text"></div>
                    </div>
                    <div class="option">
                        <div class="field"></div>
                        <div class="value">
                            <button type="submit" class="btn-1">提交</button>
                            <button type="reset" class="btn-1">重置</button>
                        </div>
                    </div>
                </div>
            </form>
            <!--数据列表-->
            <div class="list">
                <div class="data">
                    <div class="component-title">
                        <div class="left">数据列表</div>
                        <div class="right">
                            <button type="button" class="btn-1" @click="location('/articleType/add' , {mode: 'add'})">添加</button>
                        </div>
                    </div>
                    <table class="line-tb">
                        <thead>
                        <tr>
                            <th class="th-cbox">
                                <input type="checkbox" class="form-cbox select-all">
                            </th>
                            <th class="th-id">ID</th>
                            <th class="th-name">标题</th>
                            <th class="th-name">来源</th>
                            <th class="th-name">分类</th>
                            <th class="th-weight">权重</th>
                            <th class="th-status">是否隐藏</th>
                            <th class="th-time">创建时间</th>
                            <th class="th-time">更新时间</th>
                            <th class="th-opr">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="v in data" :key="v.id">
                            <td>
                                <input type="checkbox" class="form-cbox">
                            </td>
                            <td>{{ v.id }}</td>
                            <td>{{ v.title }}</td>
                            <td>{{ v.source }}</td>
                            <td>{{ v.article_type ? v.article_type.name : '无' }}</td>
                            <td>{{ v.weight }}</td>
                            <td>{{ v.hidden }}</td>
                            <td>{{ v.create_time }}</td>
                            <td>{{ v.update_time }}</td>
                            <td>
                                <button type="button" class="btn-1" @click="location('/article/edit' , {id: v.id , mode: 'edit'})">编辑</button>
                                <button type="button" class="btn-1">删除</button>
                            </td>
                        </tr>
                        <tr v-if="data.length == 0">
                            <td colspan="6">没有相关数据</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="page">
                    <Page :total="page.total" size="small" show-elevator show-sizer />
                </div>
            </div>
        </div>
        <v-loading ref="loading"></v-loading>
    </div>
</template>

<style scoped src="../public/css/public.css"></style>
<style scoped src="../public/css/list.css"></style>
<style scoped src="./css/list.css"></style>
<script src="./js/list.js"></script>