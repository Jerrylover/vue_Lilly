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
    
    var queryString = window.location.search;
    queryString = encodeURIComponent(queryString);
    common.checkOpenid(queryString);
    if (to.meta.requireBind === true) {
        var status = common.checkLoginSync(queryString);
        if (status === true) {
            next();
        }else {
            next('/bind');
        }
    }else {
        next();
    }
})
new Vue({
  router,
  template: '<app/>',
  components: {App}
}).$mount('#app')

