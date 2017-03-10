import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Bus from './lib/bus.js'
window.Bus = Bus
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import ElMoment from 'el-moment'
import FcDate from './modules/FcDate.js'
Vue.use(FcDate)

import {Select, Message, MessageBox, DatePicker, Option, Menu, MenuItem, MenuItemGroup, Submenu, Tooltip, Tabs, TabPane} from 'element-ui'
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Tooltip)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;


// Vue.use(ElementUI)
// Vue.use(ElMoment)


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
    // bind: function() {
    //     // 准备工作
    //     // 例如，添加事件处理器或只需要运行一次的高耗任务
    // },
    inserted: function(el, binding, vnode) {
        var self = vnode.componentInstance;
        var newValue = binding.value
        // console.log('newValue', newValue)


        function hhh(dotype){
            if ($.trim(dotype) == 'clearlink') {
                // console.log(str);
                // self.$nextTick(function() {
                    setTimeout(function() {
                        var str = $(self.$el).get(0).innerHTML
                        // console.log('+++++++++++++++++str', str)
                        $(el).replaceWith("<span>" + str + "</span>");
                    }, 500)

                // })
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
    if (to.meta.auth === true) {
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
