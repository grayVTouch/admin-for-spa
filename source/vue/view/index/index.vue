<template>
    <div class="container" ref="container">
        <!-- left -->
        <div class="left">
            <div class="top">
                <div class="logo">
                    <div class="left"><img src="/static/image/avatar.jpg" class="image"></div>
                    <div class="right">通迅后台系统</div>
                </div>
                <div class="user">
                    <div class="top">
                        <div class="image-container"><img src="/static/image/avatar.jpg" class="image"></div>
                    </div>
                    <div class="btm">grayVTouch</div>
                </div>
                <div class="block">
                    <!-- 水平 -->
                    <div class="horizontal">
                        <div class="in">
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                    </div>

                    <!-- 垂直 -->
                    <div class="vertical hide">
                        <div class="in">
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mid" ref="infinite-classification">
                <v-menu></v-menu>
            </div>
            <div class="btm">通迅后台系统</div>
        </div>
        <!-- right -->
        <div class="right">
            <div class="top">
                <div class="c-top">
                    <div class="left"></div>
                    <div class="right">

                        <!--用户控制-->
                        <div class="user" @mouseenter="showUserCtrl" @mouseleave="hideUserCtrl">
                            <div class="ctrl">
                                <div class="avatar">
                                    <div class="image-container"><img src="/static/image/avatar.jpg" class="image"></div>
                                </div>
                                <div class="username">grayVTouch</div>
                            </div>
                            <div class="functions hide" ref="functions-for-user">
                                <div class="function" @click="logout">
                                    <div class="left"><img src="./image/logout.png" class="image"></div>
                                    <div class="right">注销</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="c-btm" ref="multiple-tab">
                    <!--多标签-->
                    <div class="multiple-tab">
                        <!-- 项列表 -->
                        <div class="tabs"></div>
                    </div>
                </div>
            </div>
            <div class="btm">
                <div class="dynamic">
                    <div class="in" ref="con"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./js/index.js"></script>
<style scoped src="./css/index.css"></style>