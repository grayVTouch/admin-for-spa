<template>
    <div class="container">
        <form class="form" @submit.prevent="submit">
            <div class="top">
                <div class="image-container"><img src="/static/image/avatar.jpg" class="image"></div>
            </div>
            <div class="btm">
                <div class="line field">
                    <div class="top">
                        <div class="left"><input type="text" v-model="form.username" @input="error.username = ''" class="input" placeholder="请输入用户名"></div>
                        <div class="right"><img src="./image/user.png" class="image"></div>
                    </div>
                    <div class="btm" :class="getClass(error.username)">{{ error.username }}</div>
                </div>
                <div class="line field">
                    <div class="top">
                        <div class="left"><input type="password" v-model="form.password" @input="error.password = ''" placeholder="请输入密码" class="input"></div>
                        <div class="right"><img src="./image/password.png" class="image"></div>
                    </div>
                    <div class="btm" :class="getClass(error.password)">{{ error.password }}</div>
                </div>

                <!--
                    todo 后期如果要加 验证码 + 记住密码的时候在放开注释
                    <div class="line field code">
                        <div class="top">
                            <div class="left"><input type="text" v-model="form.code" @input="error.code = ''" placeholder="请输入验证码" class="input"></div>
                            <div class="right"><img :src="code" @click="getCode" class="image"></div>
                        </div>
                        <div class="btm" :class="getClass(error.code)">{{ error.code }}</div>
                    </div>
                    <div class="line function">
                        记住密码：
                        <i-switch size="large" v-model="remember">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </div>
                -->

                <div class="line btns">
                    <button type="submit" class="btn-2">提交</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script src="./js/login.js"></script>
<style scoped src="./css/login.css"></style>