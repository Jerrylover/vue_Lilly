<template>
    <div class="statisticinfo">
		<mt-header fixed :title="title" style="height: 60px; font-size: 20px;">
		</mt-header>
		<div class="active-block">
			<img src="../../assets/user.png" style="width: 100px; height: 100px;">
			<div class="item">活跃患者</div>
			<div class="item-num">{{count.active_rate}} 人</div>
		</div>
		<div class="new-block">
			<img src="../../assets/user.png" style="width: 100px; height: 100px;">
			<div class="item">新增入组患者</div>
			<div class="item-num">{{count.total}} 人</div>
		</div>

    </div>
</template>
<script>
import api from '../../config/api.js';
import common from '../../lib/common.js'
module.exports = {
    data: function() {
        return {
            title: "",
            count: [
            ]
        }
    },
    created: function() {
        var self = this;
        var url = api.get('show');
        common.post(url, {}, function(response) {
            if (response.errno == 0) {
                var data = response.data;
                self.title = data.title;
                self.count = data.count;
            }
        })
    },
    mounted: function() {
        document.title = "患者列表";
    }
}
</script>
<style scoped>
.statisticinfo{
    margin-bottom: 100px;
}
.active-block{
	display: block;
	margin: 80px 10px 20px 10px;
	padding: 10px;
	border-radius: 5px;
	background-color: #2bd4be;
}
.new-block{
	display: block;
	margin: 20px 10px;
	padding: 10px;
	border-radius: 5px;
	background-color: #6bb7ef;
}
.item{
	font-size: 20px;
	color: white;
}
.item-num{
	margin: 10px auto 20px auto;
	font-size: 20px;
	color: white;
}
</style>
