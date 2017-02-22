<template>
    <div>
        <router-view></router-view>
        <modal :show.sync="showModal" width="300px">
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
                <div>如果您的浏览器没有自动跳转，请<a v-link="{path: '/login'}" @click="showModal = false">点击这里</a></div>
            </div>
        </modal>
        <div class="modal-mask" id="modal-loading" style="display:none;">
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw modal-wrapper"></i>
            <span class="sr-only">Loading...</span>
        </div>
        <popup :show.sync="showPopup" :msg="popupMsg" type="right"></popup>
        <alert :show.sync="showAlert" :msg="alertMsg" :type="alertType"></alert>
        <prompt :show.sync="showPrompt" :msg="promptMsg"></prompt>
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
module.exports = {
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
        }
    },
    ready: function() {
        var common = require('./lib/common.js')
        var self = this;
        $(document).ajaxSuccess(function(event, xhr, settings) {
            if (xhr.responseJSON.errno == 0) {
                if (xhr.responseJSON.hasOwnProperty('privileges')) {
                    localStorage.setItem('_privileges_', JSON.stringify(xhr.responseJSON.privileges));
                }
            } else if (xhr.responseJSON.errno == -10) {
                self.showModal = true;
                self.msg = '您的会话已过期，请重新登录';
                var timer = window.setInterval(function() {
                    if (self.sec == 0) {
                        clearInterval(timer);
                        window.setTimeout(function() {
                            self.sec = 5;
                        }, 3000)
                        self.$route.router.go({
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
                        self.$route.router.go({
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
                        self.$route.router.go({
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
    },
    components: {
        'modal': function(resolve) {
            require(['./components/Modal.vue'], resolve);
        },
        'popup': function(resolve) {
            require(['./components/Popup.vue'], resolve);
        },
        'alert': function(resolve) {
            require(['./components/Alert.vue'], resolve);
        },
        'prompt': function(resolve) {
            require(['./components/Prompt.vue'], resolve);
        }
    },
    events: {
        'hide-loading-modal': function() {
            this.showModal = false;
        },
        'show-popup': function(msg, f, timeout) {
            this.showModal = false;
            this.showAlert = false;
            this.showPrompt = false;
            this.showPopup = true;
            this.popupMsg = msg;
            var self = this;
            if (timeout == undefined || timeout == '' || timeout == null) {
                timeout = 800;
            }
            setTimeout(function() {
                self.showPopup = false;
                if (typeof f == 'function') {
                    f();
                }
            }, timeout)
        },
        'show-alert': function(msg, f, type) {
            this.showModal = false;
            this.showPopup = false;
            this.showPrompt = false;
            this.showAlert = true;
            this.alertMsg = msg;
            this.alertCallback = function() {};
            if (type != undefined) {
                this.alertType = type;
            }
            if (typeof f == 'function') {
                this.alertCallback = f;
            }
        },
        'show-prompt': function(msg, f1, f2) {
            this.showModal = false;
            this.showPopup = false;
            this.showAlert = false;
            this.showPrompt = true;
            this.promptMsg = msg;
            this.promptOKCallback = function() {};
            if (typeof f1 == 'function') {
                this.promptOKCallback = f1;
            }
            if (typeof f2 == 'function') { //取消回调
                this.promptCancelCallback = f2;
            }
        },
        'alert-close-click': function(event) {
            (this.alertCallback)();
        },
        'prompt-ok-click': function(event) {
            console.log('callback');
            (this.promptOKCallback)();
        },
        'prompt-cancel-click': function(event) {
            if (typeof this.promptCancelCallback == 'function') {
                (this.promptCancelCallback)();
            }
        }
    }
}
</script>
