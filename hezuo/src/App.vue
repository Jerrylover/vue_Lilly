<template>
  <div id="app">
    <router-view></router-view>
    <!-- 底栏菜单 -->
    <navmenu></navmenu>
  </div>
</template>

<script>
module.exports = {
    name: 'app',
    components: {
        'navmenu': require('./components/NavMenu.vue'),
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
  margin-bottom: 80px;
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
