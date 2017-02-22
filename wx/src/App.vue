<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
module.exports = {
  name: 'app',
  mounted: function() {
    var self = this;
    $(document).ajaxSuccess(function(event, xhr, settings){
      if (xhr.responseJSON.errno == '1002') {
        localStorage.setItem('_openid_', '');
        localStorage.setItem('_isbind_', '');
        let instance = self.$toast('授权失效,请重新进入本页面.');
        setTimeout(() => {
          instance.close();
          WeixinJSBridge.call('closeWindow');
        }, 2000);
      }else if(xhr.responseJSON.errno == '1001') {
        localStorage.setItem('_openid_', '');
        localStorage.setItem('_isbind_', '');
        let instance = self.$toast('用户未绑定,请前往绑定页面进行绑定');
        setTimeout(() => {
          instance.close();
          WeixinJSBridge.call('closeWindow');
        }, 2000);
      }
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  margin-top: 60px;
}
 .cn-btn-cancel {
  color: #fff;
  background-color: #f06500;
 }
 .cn-btn-confirm {
  color: #fff;
  background-color: #4aa0ff;
 }
</style>
