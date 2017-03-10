<template>
    <div class="container-fluid content">
        <ul class="nav nav-tabs" style="background-color:#eee;margin-right:-15px">
          <li role="presentation" :class="{'active': active == 'new'}"><router-link :to="{name: 'statistic-patientnew'}">新增患者</router-link></li>
          <li role="presentation" :class="{'active': active == 'total'}"><router-link :to="{name: 'statistic-patienttotal'}">患者总数</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<style scoped>
</style>
<script>
    export default {
        data: function() {
            return {
                active: 'new',
            }
        },
        created: function() {
            var that = this
            Bus.$on('statistic-patient-tab-active', function(active) {
                console.log('...active', active)
                that.active = active
            })
        }
    }
</script>
