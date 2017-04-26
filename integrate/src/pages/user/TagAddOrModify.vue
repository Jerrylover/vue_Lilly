<template>
    <div class="container-fluid content">
        <bread-crumb :data = "breadCrumbData" :pagetitle="pageTitle"></bread-crumb>
        <div class="page-content">
            <div class="col-sm-6" style="padding:0">
                <div class="form-group">
                <label class="control-label" style="font-weight:normal">标签名称</label>
                    <input type="text" class="form-control"  placeholder="请输入标签名" v-model="name"/>
                </div>
                <div class="form-group">
                    <label class="control-label" style="font-weight:normal">标签描述</label>
                    <textarea class="form-control" rows="5" placeholder="请输入描述" v-model="content"></textarea>
                </div>
                <a href="javascript:" class="btn btn-default btn-success" @click="addormodifypost">提交</a>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js';
    export default {
        data: function() {
            return {
                isModify: false,
                breadCrumbData: [
                    {
                        name: '标签列表',
                        link: {name:'user-taglist'},
                    }
                ],

                name: '',
                content: '',
                patienttagtplid: '',
            }
        },
        methods: {
            fetchData: function() {
                var self = this;
                api.http({
                    url: 'patienttagtpl.one',
                    data: {
                        patienttagtplid: this.patienttagtplid,
                    },
                    successCallback: function(d) {
                        var data = d.data;
                        self.name = data.name;
                        self.content = data.content;

                    }
                })
            },
            addormodifypost: function() {
                if (this.isModify) {
                    this.modifypost();
                }else {
                    this.addpost();
                }
            },
            modifypost: function() {
                var self = this;
                api.http({
                    url: 'patienttagtpl.modifypost',
                    data: {
                        patienttagtplid: this.patienttagtplid,
                        name: this.name,
                        content: this.content,
                    },
                    successCallback: function(d) {
                        var data = d.data;
                        self.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                self.$router.push({
                                    name: 'user-taglist'
                                })
                            }
                        });
                    }
                })
            },
            addpost: function() {
                var self = this;
                api.http({
                    url: 'patienttagtpl.addpost',
                    data: {
                        name: this.name,
                        content: this.content,
                    },
                    successCallback: function(d) {
                        var data = d.data;
                        self.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                self.$router.push({name: 'user-taglist'});
                            }
                        })
                    }
                })
            }
        },
        computed: {
            pageTitle: function() {
                var str = '';
                if (this.isModify) {
                    str = "修改标签";
                }else {
                    str = "新建标签";
                }
                return str;
            }
        },
        created: function() {
            this.patienttagtplid = this.$route.query.patienttagtplid;
            if (this.$route.name == 'user-tagadd') {
                this.isModify = false;
            }else {
                this.isModify = true;
                this.fetchData();
            }
        },
        components: {
            'breadCrumb': require('../../components/BreadCrumb.vue')
        },
    }
</script>
