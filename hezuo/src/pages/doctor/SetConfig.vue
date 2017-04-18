<template>
    <div class="set-config">
        <div v-for="(group, parentIndex) in groups">
            <h3>{{group.groupstr}}</h3>
            <div class="config-item" v-for="(config, index) in group.configs">
                <div class="config-item-header">
                    <span style="display: inline-block;line-height: 2">{{config.title}}</span>
                    <div style="display: inline-block; float: right;">
                        <mt-switch v-model="config.statusValue" @change.native="clickCheckBox(config, index, parentIndex)"></mt-switch>
                    </div>
                    <span style="float: right; display: inline-block;line-height: 2;margin-right: 20px" :class="{'opendesc': config.status == 1, 'closedesc': config.status== '0'}">{{config.status | buttondesfilter}}</span>
                </div>
                <div class="config-item-content">
                    <span>说明:&nbsp;&nbsp;&nbsp;</span>
                    <span style="word-break: break-all">{{config.brief}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    module.exports = {
        data: function() {
            return {
                openid: '',
                groups: [
                ]
            }
        },
        methods: {
            'clickCheckBox': function(config, index, parentIndex) {
                var self = this;
                if (config.statusValue == true) {
                    config.status = "1";
                }else {
                    config.status = "0";
                }
                var url = api.get('doctor.configpost');
                var params = {
                    openid: this.openid,
                    doctorconfigid: config.id,
                    status: config.status,
                }
                common.post(url, params, function(response) {
                    if (response.errno == 0) {
                        let instance = self.$toast('设置成功');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    }else {
                        if (config.statusValue == true) {
                            config.statusValue = false;
                            config.status = "0";
                        }else {
                            config.statusValue = true;
                            config.status = "1";
                        }
                    }
                })
            },
            fetchData: function() {
                var self = this;
                var url = api.get('doctor.config');
                var params = {
                    openid: self.openid
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.groups = data.groups;
                        self.dataCorrect();
                    }else {

                    }
                })
            },
            dataCorrect: function() {
                for (var i = this.groups.length - 1; i >= 0; i--) {
                    for (var j = this.groups[i].configs.length-1; j >= 0; j--){
                        if (this.groups[i].configs[j].status == 0) {
                            this.groups[i].configs[j].statusValue = false;
                        }else {
                            this.groups[i].configs[j].statusValue = true;
                        }
                    }
                }
            }
        },
        created: function() {
            this.openid = localStorage.getItem('_openid_');
            this.fetchData();
        },
        filters: {
            'buttondesfilter': function(value) {
                if (value == '0') {
                    return '关闭';
                }else {
                    return '开启';
                }
            },
        },
    }
</script>
<style scoped>
    .set-config {
        margin-top: -41.3px;
        text-align: left;
    }
    .config-item {
        padding: 10px;
        margin-bottom: 5px;
        border: 1px solid #1996ea;
        border-radius: 4px;
    }
    .config-item-header {
        padding-bottom: 10px;
        border-bottom: 1px dashed #aaa;
    }
    .config-item-content {
        margin-top: 10px;
    }
    .opendesc {
        color: #1996ea;
    }
    .closedesc {
        color: #f06500;
    }
</style>