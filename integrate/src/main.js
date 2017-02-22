import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import ElMoment from 'el-moment'
import App from './App.vue'
import router from './router'

Vue.use(ElementUI)
Vue.use(ElMoment)

// Vue.filter('timestampFormat', require('./filters/timestampFormatter'));

import './lib/string.js'
import './vendor/font-awesome/css/font-awesome.min.css'
import './vendor/font-awesome/css/awesome-bootstrap-checkbox.css'
import './vendor/font-awesome/css/segment.css'

import common from './lib/common.js'

//自定义指令
Vue.directive('privilege', {
    bind: function() {
        // 准备工作
        // 例如，添加事件处理器或只需要运行一次的高耗任务
    },
    update: function(el, binding) {
        var privileges = binding.value.split('|');
        var flag = false;
        for (var i=0; i<privileges.length; i++) {
            if (common.hasPrivilege($.trim(privileges[i]))) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            $(el).remove();
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
    update: function(el, binding) {
        var self = this;
        var newValue = binding.value
        // console.log(self);
        // console.log('newValue', newValue);
        function hhh(dotype){
            // console.log(dotype);
            if ($.trim(dotype) == 'clearlink') {
                // console.log(str);
                self.vm.$nextTick(function() {
                    var str = $(el).html();
                    $(el).replaceWith("<span>" + str + "</span>");
                })
            } else {
                $(el).remove();
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

router.beforeEach((to, from, next) => {
    if (to.auth === true) {
        if (common.isLogin() === false) {
            next({
                path: '/login'
            });
        }
    }
    next();
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
