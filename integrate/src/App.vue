<template>
    <div class="row">
        <app-header v-if="showHeader()"></app-header>
        <navmenu v-if="showMenu()"></navmenu>
        <transition name="fade">
        <div class="app-container" :class="getAppContainerClass" v-if="!isLoginPage">
            <router-view></router-view>
        </div>
        <router-view v-else></router-view>
        </transition>
        <app-footer v-if="showFooter()"></app-footer>
        <modal :show="showModal" width="300px">
            <div slot="header">
                <span class="header-span">提示信息</span>
            </div>
            <div slot="body">
                <span style="">
                <i class="fa fa-info-circle" style="color:#42b983"></i>&nbsp;&nbsp;{{msg}}
                </span>
                <div class="text-center" style="padding-top:20px"><span style="color:#eb4f38">{{sec}}</span> 秒后自动跳转</div>
            </div>
            <div slot="footer">
                <div>如果您的浏览器没有自动跳转，请<a href="javascript:" @click.stop.prevent="goLogin">点击这里</a>
            </div>
        </modal>
        <div class="modal-mask" id="modal-loading" v-show="showLoadingModal">
            <div class='modal-wrapper' style="text-align:center">
                <i class="fa fa-spinner  fa-spin fa-3x fa-fw"></i>
                <!-- <span class="">Loading...</span> -->
            </div>

        </div>
    </div>
</template>
<style scoped>
/*.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}*/
.app-container {
    padding-left: 120px;
    transition: padding-left .2s;
}
.app-container.menu-mini {
    padding-left: 45px;
}

.app-container.menu-thirdlevel {
    padding-left: 245px;
}

.app-container.menu-submenu {
    padding-left: 245px;
}
.app-container.menu-submenu.menu-mini {
    padding-left: 170px;
}
.app-container.menu-mini.menu-thirdlevel {
    padding-left: 170px;
}
.app-container.fullscreen {
    margin-top:38px;
    padding-left: 0 !important;
}


.header-span {
    color: #fff;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(1, 1, 1, 0);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    width: auto;
    color: #008DB9;
}
</style>
<script>
import common from './lib/common.js'
import Bus from './lib/bus.js'
export default {
    data: function() {
        return {
            slideName: 'slide-right',
            showModal: false,
            showPopup: false,
            showAlert: false,
            showPrompt: false,
            popupMsg: '保存成功',
            alertMsg: '操作成功',
            promptMsg: '',
            sec: 5,
            alertCallback: '',
            promptOKCallback: '',
            promptCancelCallback: '',
            msg: '',
            alertType: 'error',
            timer: '',
            showLoadingModal: false,
            ismenumini: false,
            isShowSubMenu: false,
            showThirdLevelMenu: false,
            isfullscreen: false,
        }
    },
    computed: {
        isLoginPage: function() {
            return this.$route.name == 'login'
        },
        getAppContainerClass: function() {
            var appclass = ''
            if (this.ismenumini) {
                appclass += ' menu-mini'
            }
            if (this.isShowSubMenu) {
                appclass += ' menu-submenu'
            }
            if (this.showThirdLevelMenu) {
                appclass += ' menu-thirdlevel'
            }
            if (this.isfullscreen) {
                appclass += ' fullscreen'
            }
            return appclass
        }
    },
    mounted: function() {

    },
    components: {
        'navmenu': require('./components/NavMenu.vue'),
        'appHeader': require('./components/Header.vue'),
        'appFooter': require('./components/Footer.vue'), //尾组件
        'modal': function(resolve) {
            require(['./components/Modal.vue'], resolve);
        },
    },
    methods: {
        showMenu: function() {
            if (this.isLoginPage) {
                return false
            }
            return true
        },
        showHeader: function() {
            if (this.isLoginPage) {
                return false
            }
            return true
        },
        showFooter: function() {
            if (this.isLoginPage) {
                return false
            }
            return true
        },
        loginExpire: function(msg) {
            this.showModal = true;
            this.msg = '您的会话已过期，请重新登录';
            var that = this
            this.timer = window.setInterval(function() {
                if (that.sec == 0) {
                    clearInterval(that.timer);
                    window.setTimeout(function() {
                        that.sec = 5;
                    }, 3000)
                    that.$router.push({
                        path: '/login'
                    })
                    that.showModal = false;
                } else {
                    that.sec -= 1;
                }
            }, 1000)
        },
        accountLock: function(msg) {
            var that = this
            that.showModal = true;
            that.msg = '账号被锁定，请联系所属医生';
            var timer = window.setInterval(function() {
                if (that.sec == 0) {
                    clearInterval(timer);
                    window.setTimeout(function() {
                        that.sec = 5;
                    }, 3000)
                    that.$router.push({
                        path: '/login'
                    })
                    that.showModal = false;
                } else {
                    that.sec -= 1;
                }
            }, 1000)
        },
        doctorLimited: function(msg) {
            var that = this
            that.showModal = true
            that.msg = msg
            var timer = window.setInterval(function() {
                if (that.sec == 0) {
                    clearInterval(timer);
                    window.setTimeout(function() {
                        that.sec = 5;
                    }, 3000)
                    that.$router.push({
                        path: '/login'
                    })
                    that.showModal = false;
                } else {
                    that.sec -= 1;
                }
            }, 1000)
        },
        showHideLoadingModal: function(data) {
            this.showLoadingModal = data
        },
        showErrorMsg: function(errmsg) {
            if (errmsg == '量表模板不存在') {
                return
            }
            this.$message({
                type: 'error',
                message: errmsg
            })
        },
        goLogin: function() {
            clearInterval(this.timer);
            this.showModal = false
            this.$router.push({
                name: 'login'
            })

        }
    },
    created: function() {
        Bus.$on('login-expire', this.loginExpire)
        Bus.$on('account-lock', this.accountLock)
        Bus.$on('doctor-limited', this.doctorLimited)
        Bus.$on('show-loading-modal', this.showHideLoadingModal)
        Bus.$on('ajax-error', this.showErrorMsg)
        var that = this
        Bus.$on('menu-mini', function(data) {
            console.log('....收到消息啦--- ismini', data.ismini, 'isShowSubMenu', data.isShowSubMenu, 'showThirdLevelMenu', data.showThirdLevelMenu)
            that.isShowSubMenu = data.isShowSubMenu
            that.ismenumini = data.ismini
            that.showThirdLevelMenu = data.showThirdLevelMenu
        })
        Bus.$on('let-fullscreen', function(isfullscreen) {
            that.isfullscreen = isfullscreen
        })
    },
    watch: {
    //   '$route' (to, from) {
    //     const toDepth = to.path.split('/').length
    //     const fromDepth = from.path.split('/').length
    //     this.slideName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    //   }
  }
}
</script>
