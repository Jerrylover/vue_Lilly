import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.filter('booleanFormat', require('./filters/booleanFormatter'));
Vue.filter('percentageFormat', require('./filters/percentageFormatter'));
Vue.filter('byteFormat', require('./filters/byteFormatter'));
Vue.filter('visititem', function(value){
    var arr = value.split("<br />");
    return arr;
});
// Vue.filter('timestampFormat', require('./filters/timestampFormatter'));

require('./lib/string.js')
require('./vendor/font-awesome/css/font-awesome.min.css')
require('./vendor/font-awesome/css/awesome-bootstrap-checkbox.css');
require('./vendor/font-awesome/css/segment.css');

var common = require('./lib/common.js')
var router = new VueRouter();
//路由映射配置
var map = require('./config/map.js');
router.map(map);
router.redirect({ //定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
    '*': "/patient/list/" //重定向任意未匹配路径到/404页面
});

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
