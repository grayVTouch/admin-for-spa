<template>
    <div class="c-container">
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
            <div class="component-title">
                <div class="left">数据列表</div>
                <div class="right"></div>
            </div>
            <table class="line-tb">
                <thead>
                <tr>
                    <th class="th-cbox">选款</th>
                    <th class="th-id">ID</th>
                    <th class="th-name">名称</th>
                    <th class="th-id">上级ID</th>
                    <th class="th-time">时间</th>
                    <th class="th-opr">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>选款</td>
                    <td>1</td>
                    <td>资讯</td>
                    <td>顶级分类</td>
                    <td>2019-03-13 17:22:00</td>
                    <td>
                        <button type="button" class="btn-1">编辑</button>
                        <button type="button" class="btn-1">删除</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script src="./js/list.js"></script>
<style scoped src="./css/list.css"></style>