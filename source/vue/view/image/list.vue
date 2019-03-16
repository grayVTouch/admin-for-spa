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
                            <button type="button" class="btn-1" @click="location('/image/add' , {mode: 'add'})">添加</button>
                        </div>
                    </div>
                    <table class="line-tb">
                        <thead>
                        <tr>
                            <th class="th-id">ID</th>
                            <th class="th-name">位置</th>
                            <th class="th-name">平台</th>
                            <th class="th-name">图片</th>
                            <th class="th-weight">权重</th>
                            <th class="th-time">创建时间</th>
                            <th class="th-opr">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="v in data" :key="v.id">
                            <td class="multiple-rows">
                                <div class="row">{{ v.id }}</div>
                                <div class="row"><img :src="v.url" class="image"></div>
                            </td>
                            <td>{{ v.pos }}</td>
                            <td>{{ v.platform_id }}</td>
                            <td class="multiple-rows">
                                <div class="row">【名称】{{ v.name }}</div>
                                <div class="row">【mime】{{ v.mime }}</div>
                                <div class="row">【size】{{ v.size }}</div>
                            </td>
                            <td>{{ v.weight }}</td>
                            <td>{{ v.create_time }}</td>
                            <td>
                                <button type="button" class="btn-1" @click="location('/image/edit' , {id: v.id , mode: 'edit'})">编辑</button>
                                <button type="button" class="btn-1" @click="del(v.id)">删除</button>
                            </td>
                        </tr>
                        <tr v-if="data.length == 0">
                            <td colspan="7">没有相关数据</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="page">
                    <Page :total="page.total" :page-size="1" size="small" show-total show-elevator @on-change="pageEvent" />
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