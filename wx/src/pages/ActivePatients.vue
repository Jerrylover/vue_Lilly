<template>
    <div class="vertical-container">
        <mt-header fixed title="今日活跃患者">
            <mt-button icon="back" @click="close">返回</mt-button>
        </mt-header>
        <div class="body">
            <div v-for="item in items" style="border: 1px solid #ccc; padding: 5px;border-radius: 0px; margin: 5px;" @click="goPipe(item)">
                <div style="text-align: left; margin: 5px 0px">
                    <h3 style="margin: 0px 0px 0px 0px; font-weight: bold; display: inline-block">{{item.patient.name}}&nbsp;&nbsp;{{item.patient.sexstr}}&nbsp;&nbsp;{{item.patient.agestr}}</h3>
                    <span style="float: right; font-size: 16px">患者消息</span>
                </div>
                <div class="patient-message">
                    <!-- <div style="text-align: left">
                        <span>患者消息:</span>
                    </div> -->
                    <!-- <div style="width:80%; padding: 5px 10px; margin: auto; text-align: left">
                        <template v-for="pipe in item.pipes">
                            <span>{{pipe.content}}</span><br/>
                        </template>
                    </div> -->
                    <div style="padding: 5px 0px; margin: auto; text-align: left">
                        <template v-for="pipe in item.pipes">
                            <span>{{pipe.content}}</span><br/>
                        </template>
                    </div>
                    <div style="clear: both"></div>
                </div>
            </div>
            <div style="position: none;margin-top: 200px">
                <span v-if="items.length == 0" style="margin-top:400px;width:80%; background-color: #fcf8e3; padding: 15px">{{thedate}}无活跃患者</span>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../config/api.js';
    module.exports = {
        data: function() {
            return {
                thedate: '',
                items: [
                ],
            }
        },
        methods: {
            goPipe: function(item) {
                var self = this;
                this.$router.push({
                    name: 'pipelist',
                    params: {
                        patientid: item.patient.patientid,
                    },
                    query: {
                        thedate: self.thedate, 
                    }
                })
            },
            close: function() {
                WeixinJSBridge.call('closeWindow');
            }
        },
        beforeRouteEnter(to, from, next) {
            var self = this;
            var openid = localStorage.getItem('_openid_');
            var thedate = to.query.thedate;
            $.ajax({
                url: api.get('pipe.listofday'),
                type: 'post',
                dataType: 'json',
                data: {
                    openid: openid,
                    thedate: thedate,
                }
            }).done(function(response){
                if (response.errno == "0") {
                    var data = response.data;
                    next(function(vm){
                        vm.items = data.items;
                        vm.thedate = thedate;
                    });
                }else if(response.errno == 1001){
                    next('/bind');
                }
            })
        },
    }
</script>
<style scoped>
    
</style>