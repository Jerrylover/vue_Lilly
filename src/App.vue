<template>
    <div class="row">
        <router-view></router-view>
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
        <div class="modal-mask" id="modal-loading" style="display:none;">
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw modal-wrapper"></i>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>
<style scoped>

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
export default {
    data: function() {
        return {
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
        }
    },
    mounted: function() {
        this.$nextTick(function() {

            var self = this;
            $(document).ajaxSuccess(function(event, xhr, settings) {
                if (xhr.responseJSON.errno == 0) {
                    if (xhr.responseJSON.hasOwnProperty('privileges')) {
                        localStorage.setItem('_privileges_', JSON.stringify(xhr.responseJSON.privileges));
                    }
                } else if (xhr.responseJSON.errno == -10) {
                    self.showModal = true;
                    self.msg = '您的会话已过期，请重新登录';
                    self.timer = window.setInterval(function() {
                        if (self.sec == 0) {
                            clearInterval(self.timer);
                            window.setTimeout(function() {
                                self.sec = 5;
                            }, 3000)
                            self.$router.push({
                                path: '/login'
                            })
                            self.showModal = false;
                        } else {
                            self.sec -= 1;
                        }
                    }, 1000)
                } else if (xhr.responseJSON.errno == -11 && self.$route.name != 'login') {
                    self.showModal = true;
                    self.msg = '账号被锁定，请联系所属医生';
                    var timer = window.setInterval(function() {
                        if (self.sec == 0) {
                            clearInterval(timer);
                            window.setTimeout(function() {
                                self.sec = 5;
                            }, 3000)
                            self.$router.push({
                                path: '/login'
                            })
                            self.showModal = false;
                        } else {
                            self.sec -= 1;
                        }
                    }, 1000)
                } else if (xhr.responseJSON.errno == -12 && self.$route.name != 'login') {
                    self.showModal = true;
                    self.msg = xhr.responseJSON.errmsg;
                    var timer = window.setInterval(function() {
                        if (self.sec == 0) {
                            clearInterval(timer);
                            window.setTimeout(function() {
                                self.sec = 5;
                            }, 3000)
                            self.$router.push({
                                path: '/login'
                            })
                            self.showModal = false;
                        } else {
                            self.sec -= 1;
                        }
                    }, 1000)
                }
            });
            $.ajaxSetup({
                beforeSend: function() {
                    $('#modal-loading').show();
                    // $('body').addClass('no-scroll');
                },
                complete: function() {
                    $('#modal-loading').hide();
                    // $('body').removeClass('no-scroll');
                },
                error: function() {
                    $('#modal-loading').hide();
                    // $('body').removeClass('no-scroll');
                }
            });
        })
    },
    components: {
        'modal': function(resolve) {
            require(['./components/Modal.vue'], resolve);
        },
    },
    methods: {
        goLogin: function() {
            clearInterval(this.timer);
            this.showModal = false
            this.$router.push({
                name: 'login'
            })

        }
    }
}
</script>
