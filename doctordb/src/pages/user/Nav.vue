<template>
<ul class="row nav nav-tabs" role="tablist">
  <li role="presentation" :class="{active: active == 'info'}"><a v-link="{name:'user-info'}" href="javascript:">个人信息</a></li>
  <li role="presentation" :class="{active: active == 'modifypassword'}"><a v-link="{name:'user-modifypassword'}" href="javascript:">修改密码</a></li>
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
