// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)
/* eslint-disable no-new */

// var common = require('./lib/common.js')

router.beforeEach((to, from, next) => {
    var openid = to.query.openid;

    //兼容ios8以下 #后会被截掉的BUG
    var queryString = window.location.search;
    var fcqxurltemp = queryString.substring(1, queryString.length);
    var queryArr = [];
    queryArr = fcqxurltemp.split('&');
    var obj = {};
    queryArr = queryArr.map(function(one){
        var arr = one.split('=');
        obj[arr[0]] = arr[1];
    })
    if (obj['fcqxtargeturl'] != undefined && to.name == 'empty') {
        next({path: obj['fcqxtargeturl']});
    }

    sessionStorage.setItem('_href_', window.location.href);
    queryString = encodeURIComponent(queryString);
    //common.checkOpenid(queryString);
    if (to.meta.requireBind === true) {
        var status = common.checkLoginSync(queryString);
        if (status === false) {
            console.log('test');
            next({name: 'doctor-bind'});
        }
    }
    console.log('test1');
    next();
})
new Vue({
  router,
  template: '<app/>',
  components: {App}
}).$mount('#app')
