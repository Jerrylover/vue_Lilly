<template>
<div class="container-fluid content">
    <breadcrumb :data="breadcrumbData" pagetitle="权限管理">
        <div slot="other-content">
        </div>
    </breadcrumb>
    <div class="page-content">
        <div class="row">
            <div class="col-sm-12 col-lg-6">
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
        <div class="mg-t-10">
            <div class="col-lg-6 col-sm-12 div-privilege">
                <div v-for="privilege in filteredPrivileges" class="checkbox checkbox-inline checkbox-info">
                    <input type="checkbox" :id="'inlineCheckbox' + privilege.id" :value='privilege.id' v-model='privilegeids'>
                    <label :for="'inlineCheckbox' + privilege.id">{{privilege.name}}</label>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
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
export default {
    data: function() {
        return {
            breadcrumbData: [
                {
                    name: '助理账号列表',
                    link: {name: 'manager'}
                }
            ],
            name: '',
            assistantid: '',
            privilegeids: [],
            allprivileges: [],
            word: '',
        }
    },
    computed: {
        filteredPrivileges: function() {
            var that = this
            return that.allprivileges.filter(function (privilege) {
                return privilege.name.indexOf(that.word) !== -1
            })
        }
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
        'breadcrumb': require('../../components/BreadCrumb.vue'),
    },
    methods: {
        fetchPrivileges: function() {
            var that = this;
            api.http({
              url: 'assistant.privileges',
              data: {
                  assistantid: that.assistantid,
              },
              successCallback: function(d) {
                  if (d.data) {
                      var data = d.data;
                      that.name = data.assistant.name;
                      that.allprivileges = data.allprivileges;
                      that.privileges = data.privileges;
                      that.privileges.forEach(function(privilege) {
                          that.privilegeids.push(privilege.id);
                      })
                  }
              }
            })
        },
        clickSearch: function() {

        },
        clickSelectAll: function() {
            var ids = [];
            var that = this;
            that.allprivileges.forEach(function(privilege) {
                ids.push(privilege.id);
            })
            that.privilegeids = ids;
        },
        clickResetAll: function() {
            this.privilegeids = [];
        },
        clickSave: function() {
            var that = this;
            var privilegeids = [];

            api.http({
              url: 'assistant.modifyprivilege',
              data: {
                  assistantid: that.assistantid,
                  privilegeids: that.privilegeids,
              },
              successCallback: function(d) {
                  that.$message({
                      showClose: true,
                      type: 'success',
                      message: '保存成功',
                      onClose: function() {
                          that.$router.push({
                              name: 'manager'
                          })
                      }
                  })
              }
            })
        },
        initPage: function() {
            Bus.$emit('make-menu-mini')
            this.assistantid = this.$route.query.assistantid;
            if (this.assistantid != undefined && this.assistantid != '') {
                this.fetchPrivileges();
            }
        }
    },
    created: function() {
        this.initPage()
    },
    watch: {
        '$route': function(to, from) {
            this.initPage()
        }
    }
}
</script>
