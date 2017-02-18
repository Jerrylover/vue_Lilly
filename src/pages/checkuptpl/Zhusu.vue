<template>
    <div>
        <div class="question-content container-fluid">
            <form class="form-horizontal">
                <div class="form-group question-group">
                    <label for="inputEmail3" class="col-lg-1 col-sm-2 control-label question-label">就诊日期</label>
                    <div class="col-sm-6">
                        <div :class="{'has-error has-feedback': iserror, 'has-feedback': !iserror}">
                            <input class="form-control controls" type="text" @click="showCalendar" v-model="value" placeholder="请输入日期" :disabled='ismodify' name='_date' :value="value">
                            <span :class="{'no-error fa fa-calendar-check-o fa-lg form-control-feedback': !iserror, 'glyphicon glyphicon-remove form-control-feedback': iserror}" style="right:0"></span>
                            <span class="help-block" v-show="iserror">日期已存在</span>
                            <calendar :show="show" :value="value" :x="x" :y="y" :begin="begin" :end="end" :range="range"></calendar>
                        </div>
                    </div>
                </div>
                <div class="form-group question-group">
                    <label for="inputPassword3" class="col-lg-1 col-sm-2 control-label question-label">主诉</label>
                    <div class="col-sm-6">
                        <textarea class="form-control" rows="10" name='_content' v-model='content'></textarea>
                    </div>
                </div>
                <div class="form-group" style="margin-top:10px">
                    <div class="col-lg-6 col-lg-offset-1 col-sm-offset-2 col-sm-6">
                        <button v-privilege="'数据库-量表-添加和修改'" :disabled='iserror' type="submit" class="btn btn-success btn-save" @click="save($event)">保存</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="history">
            <div class='header'>
                历史记录
            </div>
            <div class='div-table'>
                <table class="table table-bordered table-hover mytable">
                    <thead>
                        <tr>
                            <th>就诊日期</th>
                            <th>主诉</th>
                            <th>操作</th>
                        </tr>
                        <tbody>
                            <tr v-for="item in revisitRecords">
                                <td>{{item.date}}</td>
                                <td width="80%">{{item.content}}</td>
                                <td><a v-privilege="'数据库-量表-添加和修改'" href="javascript:" @click="modify(item, $event)">修改</a></td>
                            </tr>
                        </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<style scoped>
.div-table {
    padding: 0;
}

.header {
    margin-top: 20px;
    background-color: #F5F6FA;
    font-weight: bold;
    line-height: 1.4285;
    padding: 8px;
    border: 1px solid #ddd;
    border-bottom: 0;
}

.table th {
    font-weight: normal;
    border-bottom: 0;
}

.fa {
    padding: 10px;
    color: #008DB9;
}

.no-error {
    top: 0 !important;
}

.btn-save {
    width: 100px;
}
</style>
<script>
import api from '../../config/api.js'
import util from '../../lib/util.js'
export default {
    data: function() {
        return {
            showPopup: false,
            ismodify: false,
            revisitrecordid: '',
            revisitrecord: '',
            error: true,
            revisitRecords: [],
            content: '',
            show: false,
            type: "date", //date datetime
            value: "", //日期
            begin: "",
            x: 0,
            y: 0,
            range: false, //是否多选
        }
    },
    props: ['patientid', 'ename', 'action'],
    computed: {
        'selected': function() {
            if (this.revisitRecords.length > 0) {
                return this.revisitRecords[0].revisitrecordid;
            }
        },
        'patientid': function() {
            return this.$route.params.patientid;
        },
        'iserror': function() {
            return this.error && !this.ismodify;
        },
        date: function() {
            return this.$route.query.date;
        }
    },
    components: {
        'calendar': function(resolve) {
            require(['../../components/calendar.vue'], resolve);
        }
    },
    methods: {
        showCalendar: function(e) {
            if (this.ismodify) {
                return;
            }
            var that = this;
            that.show = true;
            that.x = e.target.offsetLeft;
            that.y = e.target.offsetTop + e.target.offsetHeight + 8;
            var bindHide = function(event) {
                if (event.target == e.target) {
                    return;
                }
                event.stopPropagation();
                that.show = false;
                document.removeEventListener('click', bindHide, false);
                document.removeEventListener('touchstart', bindHide, false);
            };
            setTimeout(function() {
                document.addEventListener('click', bindHide, false);
                document.addEventListener('touchstart', bindHide, false);
            }, 500);
        },
        'save': function(e) {
            e.preventDefault();
            var self = this;
            var url = '';
            if (self.ismodify) {
                url = api.get('revisitrecord.modify');
            } else {
                url = api.get('revisitrecord.addzhusu');
            }
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: {
                    date: self.value,
                    content: self.content,
                    patientid: self.patientid,
                    revisitrecordid: self.revisitrecordid
                }
            }).done(function(d) {
                self.action = '添加';
                if (d.errno != 0 && d.errno != -10) {
                    self.$emit('show-alert', d.errmsg);
                } else {
                    self.$emit('show-popup', '保存成功', function() {
                        self.$router.push({
                            query: {
                                date: self.value
                            }
                        })
                    })

                    self.fetchData(self.value);
                    $(e.target).blur();
                }
            })
        },
        modify: function(item, e) {
            var self = this;
            this.ismodify = true;
            this.action = '修改';
            this.value = item.date;
            this.content = item.content;
            this.revisitrecordid = item.revisitrecordid;
            window.scrollTo(0, 0);
        },
        fetchData: function(newdate) {
            var self = this;
            //获取
            $.ajax({
                url: api.get('revisitrecord.list'),
                type: 'post',
                dataType: 'json',
                data: {
                    patientid: self.patientid,
                    // zhusu: 1
                }
            }).done(function(d) {
                var mydate = self.date;
                if (newdate != undefined && newdate != '') {
                    mydate = newdate;
                }
                self.revisitRecords = d.data;
                var r = '';
                if (mydate) {
                    for (var i = 0; i < self.revisitRecords.length; i++) {
                        var revisitrecord = self.revisitRecords[i];
                        if (revisitrecord.date == mydate) {
                            r = revisitrecord;
                            break;
                        }
                    }
                }
                if (!r) {
                    r = self.revisitRecords[0];
                }
                if (r != undefined && r != '') {
                    self.ismodify = true;
                    self.value = r.date;
                    self.content = r.content;
                    self.revisitrecordid = r.revisitrecordid;
                }
            })
        }
    },
    watch: {
        'value': function(val, oldVal) {
            if (util.inArray2(this.revisitRecords, 'date', val)) {
                this.error = true;
            } else {
                this.error = false;
            }
        },
        revisitRecords: function(val, oldVal) {
            if (util.inArray2(this.revisitRecords, 'date', this.value)) {
                this.error = true;
            } else {
                this.error = false;
            }
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            this.action = '修改';
            this.value = util.getFormatDate();
            this.fetchData();

            var self = this;
            //存储表单快照
            setTimeout(function() {
                // var obj = util.getAllFormData();
                var obj = {
                    '_content': self.content
                }
                sessionStorage.setItem('form-snap', '{}');
            }, 1000)
        })
    }
}
</script>
