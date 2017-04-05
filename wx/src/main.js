// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)
/* eslint-disable no-new */

var common = require('./lib/common.js')

router.push({
    '*': '/bind',
})
router.beforeEach((to, from, next) => {
    var openid = to.query.openid;
    // console.log(openid);
    if (typeof openid != 'undefined' &&  openid != null && openid != '') {
        localStorage.setItem('_openid_', openid);
    }
    // var queryString = window.location.search;
    // queryString = encodeURIComponent(queryString);
    // common.checkOpenid(queryString);
    // if (to.meta.requireBind === true) {
    //     console.log('22222');
    //     var status = common.checkLoginSync(queryString);
    //     if (status === true) {
    //         next();
    //     }else {
    //         console.log('test');
    //         next({name: 'doctor-bind'});
    //     }
    // }else {
    //     next();
    // }
    next();
})
new Vue({
  router,
  template: '<app/>',
  components: {App}
}).$mount('#app')

