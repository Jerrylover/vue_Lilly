<template>
<app-header active='manager'>
</app-header>
<div class="container-fluid content">
    <div class="row table-header" style="border-bottom:1px solid #ccc;">
        <page-header :pagetitle="'权限管理 '+name"></page-header>
    </div>
    <div class="row mg-t-20">
        <div class="col-lg-6 col-sm-12">
            <div class="row">
                <div class="col-sm-6 text-left" style="padding:0">
                    <div class="input-group">
                        <input class="input-search form-inline form-control" type="text" placeholder="输入权限名称" v-model='word'>
                        <span class="input-group-btn" style="width: 1%;">
                            <button class="btn btn-primary" type="submit" @click="clickSearch">
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                        </button>
                        </span>
                    </div>
                </div>
                <div class="col-sm-6 text-right" style="padding:0">
                    <a href="javascript:" class="mg-r-10" @click="clickSelectAll">全选</a>
                    <a href="javascript:" class="mg-r-20" @click="clickResetAll">不选</a>
                    <a href="javascript:" class="btn btn-success" @click="clickSave">保存</a>
                </div>
            </div>
        </div>

    </div>
    <div class="row mg-t-10">
        <div class="col-lg-6 col-sm-12 div-privilege">
            <div v-for="privilege in allprivileges | filterBy word in 'name'" class="checkbox checkbox-inline checkbox-info">
                <input type="checkbox" id="inlineCheckbox{{privilege.id}}" :value='privilege.id' v-model='privilegeids'>
                <label for="inlineCheckbox{{privilege.id}}">{{privilege.name}}</label>
            </div>
        </div>
    </div>
</div>
<app-footer></app-footer>
</template>
<style scoped>
h4 {
    float: left;
    padding-left: 10px;
    border-left: 3px solid #008db9;
}

.control-label {
    font-weight: normal;
}
.div-privilege {
    min-height:150px;
    border: 1px solid #ccc;
    padding:10px;
}
.checkbox-inline {
    margin: 0 15px 15px 0 !important;
}
</style>
<script>
import api from '../../config/api.js'
module.exports = {
    data: function() {
        return {
            name: '',
            assistantid: '',
            privilegeids: [],
            allprivileges: [],
            word: '',
        }
    },
    computed: {
    },
    route: {
        data: function(transition) {
            this.assistantid = transition.to.query.assistantid;
            if (this.assistantid != undefined && this.assistantid != '') {
                this.fetchPrivileges();
            }

            transition.next();
        }
    },
    components: {
        'appHeader': require('../../components/Header.vue'), //头组件
        'appFooter': require('../../components/Footer.vue'), //尾组件
        'pageHeader': require('./Header.vue'),
    },
    methods: {
        fetchPrivileges: function() {
            var that = this;
            $.ajax({
                url: api.get('assistant.privileges'),
                type: 'POST',
                dataType: 'json',
                data: {
                    assistantid: that.assistantid
                },
            }).done(function(d) {
                if (d.data) {
                    var data = d.data;
                    that.name = data.assistant.name;
                    that.allprivileges = data.allprivileges;
                    that.privileges = data.privileges;
                    $.each(that.privileges, function(index, privilege) {
                        that.privilegeids.push(privilege.id);
                    })
                }
            })
        },
        clickSearch: function() {

        },
        clickSelectAll: function() {
            var ids = [];
            var that = this;
            $.each(that.allprivileges, function(index, privilege) {
                ids.push(privilege.id);
            })
            that.privilegeids = ids;
        },
        clickResetAll: function() {
            this.privilegeids = [];
        },
        clickSave: function() {
            var that = this;
            var url = api.get('assistant.modifyprivilege');
            var privilegeids = [];

            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: {
                    assistantid: that.assistantid,
                    privilegeids: that.privilegeids,
                }
            }).done(function(d) {
                if (d.errno != 0 && d.errno != -10) {
                    that.$dispatch('show-alert', d.errmsg);
                } else {
                    that.$dispatch('show-popup', '保存成功', function() {
                        that.$route.router.go({
                            name: 'manager'
                        })
                    });
                }
            })
        }
    }
}
</script>
