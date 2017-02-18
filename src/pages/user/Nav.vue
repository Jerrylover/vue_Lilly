<template>
<ul class="row nav nav-tabs" role="tablist">
  <li role="presentation" :class="{active: active == 'info'}"><router-link to="{name:'user-info'}">个人信息</router-link></li>
  <li role="presentation" :class="{active: active == 'modifypassword'}"><router-link to="{name:'user-modifypassword'}">修改密码</router-link></li>
</ul>
</template>
<style scoped>
</style>
<script>
    module.exports = {
        data: function() {
            return {

            }
        },
        props:['active']
    }
</script>
