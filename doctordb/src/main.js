import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.filter('booleanFormat', require('./filters/booleanFormatter'));
Vue.filter('percentageFormat', require('./filters/percentageFormatter'));
Vue.filter('byteFormat', require('./filters/byteFormatter'));

require('./lib/string.js')
require('./vendor/font-awesome/css/font-awesome.min.css')
require('./vendor/font-awesome/css/awesome-bootstrap-checkbox.css');
require('./vendor/font-awesome/css/segment.css');

var common = require('./lib/common.js')

//自定义指令
Vue.directive('privilege', {
    bind: function() {
        // 准备工作
        // 例如，添加事件处理器或只需要运行一次的高耗任务
    },
    update: function(newValue, oldValue) {
        var privileges = newValue.split('|');
        var flag = false;
        for (var i=0; i<privileges.length; i++) {
            if (common.hasPrivilege($.trim(privileges[i]))) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            $(this.el).remove();
        }
    },
    unbind: function() {
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
    }
})
//医生集团权限指令
Vue.directive('dg-privilege', {
    bind: function() {
        // 准备工作
        // 例如，添加事件处理器或只需要运行一次的高耗任务
    },
    update: function(newValue, oldValue) {
        var self = this;
        // console.log(self);
        // console.log('newValue', newValue);
        function hhh(dotype){
            // console.log(dotype);
            if ($.trim(dotype) == 'clearlink') {
                // console.log(str);
                self.vm.$nextTick(function() {
                    var str = $(self.el).html();
                    $(self.el).replaceWith("<span>" + str + "</span>");
                })
            } else {
                $(self.el).remove();
            }
        }
        if (newValue.indexOf('-') == 0) {
            return ;
        }
        var privileges = newValue.split('|');
        var flag = false;
        var roles = localStorage.getItem('_project_role_');
        roles = JSON.parse(roles);
        for (var i = 0; i < privileges.length; i++) {
            if (privileges[i].indexOf('-') == -1) {
                continue ;
            }
            privileges[i] = privileges[i].split('-');
            if (privileges[i].indexOf('-') == 0 || privileges[i][0] == 'undefined') {
                return ;
            }
        }
        //privileges[0] 代表项目负责人
        //privileges[1] 代表中心负责人
        var projectid = $.trim(privileges[0][0]);
        var need_project_role = $.trim(privileges[0][1]);
        if (roles[projectid].project_role == $.trim(need_project_role)) {
            return ;
        }
        if (typeof privileges[1] != 'object') {
            hhh(privileges[privileges.length-1]);
            return ;
        }
        var centerid = $.trim(privileges[1][0]);
        var need_center_role =$.trim(privileges[1][1]);
        // console.log(privileges);
        if ((roles[projectid]['center_roles'][centerid] && $.trim(need_center_role) == 'x' ) ||
            roles[projectid]['center_roles'][centerid] == $.trim(need_center_role)) {
            return ;
        }
        hhh(privileges[privileges.length-1]);
    },
    unbind: function() {
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
    }
})

var router = new VueRouter();
//路由映射配置
var map = require('./config/map.js');
router.map(map);
router.redirect({ //定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
    '*': "/patient/list" //重定向任意未匹配路径到/404页面
});

// console.log(process.env.NODE_ENV)
router.beforeEach(function(transition) {
    if (transition.to.auth === true) {
        if (common.isLogin() === false) {
            transition.redirect({
                path: '/login'
            });
        }
    }
    transition.next();
})

router.start(App, '#app');
