<template>
<app-header active='checkup-export'>
</app-header>
<div class="container-fluid content">
    <div class="row">
        <div class="col-sm-6 col-lg-6">
            <div class="row mg-t-20">
                <div class="col-lg-12 col-sm-12" style="padding:0">
                    <div class="form-group">
                        <div class="input-group">
                          <div class="input-group-addon bg-primary" style="">选择疾病</div>
                          <select  class="form-control" v-model="diseaseid" @change="diseaseChange">
                              <option v-for="disease in diseases" value="{{disease.diseaseid}}">{{disease.name}}</option>
                          </select>
                        </div>
                      </div>
                    <div v-for="menu in menus" class="class1">
                        <div class="div-menu-title">
                            <!-- <span v-show="hasSubmenu(menu)" class="fa fa-plus-square-o" aria-hidden="true" _v-485257ce=""></span> -->
                            <div class="checkbox checkbox-inline checkbox-info menu-div" :data-ename="menu.link">
                                <input type="checkbox" id="inlineCheckbox{{menu.link}}" :name="name" :value='menu.link' v-model='checkedCheckups' @change="menuChange($event, menu)">
                                <label class="menu-label" for="inlineCheckbox{{menu.link}}">{{menu.name}}</label>
                            </div>
                            <!-- <span class="span-menu-name">{{menu.name}}</span> -->
                        </div>
                        <div v-if="hasSubmenu(menu)" class="div-content">
                            <ul class="export-ul">
                                <li class="list-unstyled li-submenu row" v-for="submenu in menu.submenus">
                                    <div class="checkbox checkbox-inline checkbox-info col-sm-3 col-lg-2">
                                        <input type="checkbox" id="inlineCheckbox{{submenu.link}}" :name="name" :value='submenu.link' v-model='checkedCheckups' @change="menuChange($event, submenu)">
                                        <label for="inlineCheckbox{{submenu.link}}">{{submenu.name}}</label>
                                    </div>
                                    <div class="div-question col-sm-8 col-lg-8">
                                        <div v-for="question in questions[submenu['link']]" class="checkbox checkbox-inline checkbox-info">
                                            <input type="checkbox" id="inlineCheckbox{{question.id}}" :name="name" :value='question.id' v-model='checkedQuestions'>
                                            <label for="inlineCheckbox{{question.id}}">{{question.name}}</label>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div v-else class="div-content">
                            <div class="div-question">
                                <div v-for="question in questions[menu['link']]" class="checkbox checkbox-inline checkbox-info">
                                    <input type="checkbox" id="inlineCheckbox{{question.id}}" :name="name" :value='question.id' v-model='checkedQuestions'>
                                    <label for="inlineCheckbox{{question.id}}">{{question.name}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-12 text-center">
                    <button type="" class="btn btn-primary" @click.prevent="clickCommit">&nbsp;&nbsp;提&nbsp;&nbsp;交&nbsp;&nbsp;</button>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-lg-6">
            <table class="table table-bordered mg-t-20">
                <tbody>
                    <tr class="light-tr"><th>任务id</th><th>创建时间</th><th>任完成时间</th><th>任务名称</th><th>任务进度</th><th>任务状态</th><th>下载地址</th></tr>
                    <template v-if="jobs.length == 0">
                        <tr><td class="text-center" colspan="5">暂无任务</td></tr>
                    </template>
                    <template v-else>
                        <tr v-for="job in jobs">
                            <td>{{job.id}}</td>
                            <td>{{job.createtime}}</td>
                            <td><span v-if="job.status == 3">{{job.updatetime}}</span></td>
                            <td>量表导出</td>
                            <td>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" aria-valuenow="{{job.progress}}"
                                        aria-valuemin="0" aria-valuemax="100" :style="progressStyle(job)">
                                        {{job.progress}}%
                                    </div>
                                </div>
                            </td>
                            <td>{{job.status | filterStatus}}</td>
                            <td><a v-if="job.status == 3" target="_blank" href="{{job.dl_url}}">下载</a></td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>

</div>
<app-footer></app-footer>
</template>
<style scoped>
.class1 {
    margin-bottom: 10px;
    display: block;
}

.div-menu-title {
    height: 40px;
    margin: 0;
    padding: 10px 10px;
    background: #eee;
    border: 1px solid #ddd;
}

.span-menu-name {
    padding-left: 5px;
}

.div-content {
    border: 1px solid #ddd;
    border-top: 0;
    background: #fff;
    padding: 10px 10px;
}

.export-ul {
    padding-left: 10px;
}

.export-ul li {
    background: #efefef;
    padding: 10px;
    border: 1px solid #dedede;
    margin-bottom: 5px;
}

.div-question {
    margin-left: 20px;
    display: inline-block;
    background: #fff;
    padding: 10px;
}

.checkbox.checkbox-inline {
    margin-right: 10px;
    margin-left: 0;
}
.li-submenu  {
    margin-right: 0;
}
progress {
    width: 160px;
    border: 1px solid #0064B4;
    background-color:#e6e6e6;
    color: #0064B4; /*IE10*/
}
</style>
<script>
import api from '../../config/api.js'
import util from '../../lib/util.js'
import cookie from '../../lib/cookie.js'
import common from '../../lib/common.js'
module.exports = {
    data: function() {
        return {
            menus: [],
            questions: [],
            checkedCheckups: [],
            checkedQuestions: [],
            connected: false,
            jobs: [],
            diseaseid: '',
        }
    },
    computed: {
        diseases: function() {
            return common.getDiseases()
        }
    },
    route: {
        data: function(transition) {
            let that = this
            this.fetchMenu(function() {
                //默认全部选中
                that.checkedCheckups = that.menus.map(function(menu) {
                    return menu.link
                })
                Object.keys(that.questions).map(function(ename) {
                    let questions = that.questions[ename]
                    questions.map(function(question) {
                        that.checkedQuestions.push(question.id)
                    })
                })
            });
            this.getJobList();
            this.diseaseid = common.getDiseaseId()
            transition.next();
        }
    },
    components: {
        'appHeader': require('../../components/Header.vue'), //头组件
        'appFooter': require('../../components/Footer.vue'), //尾组件
    },
    methods: {
        progressStyle: function(job) {
            return "width: " + job.progress + "%;"
        },
        hasSubmenu: function(menu) {
            return menu.hasOwnProperty('submenus') && menu['submenus'].length > 0
        },
        fetchMenu: function(f) {
            let that = this;
            $.ajax({
                url: api.get('doctor.simplemenu'),
                type: 'POST',
                dataType: 'json',
                data: {
                    diseaseid: this.diseaseid
                },
            }).done(function(d) {
                let menus = d.data["menus"] || []
                that.menus = menus.map(function(menu) {
                    menu.checked = false
                    return menu
                })
                that.questions = d.data["questions"]
                if (typeof f == 'function') {
                    f()
                }
            })
        },
        getJobList: function() {
            let that = this;
            $.ajax({
                url: api.get('export.joblist'),
                type: 'POST',
                dataType: 'json',
                data: {},
            }).done(function(d) {
                if (d.errno == 0) {
                    that.jobs = d.data;
                }
            })
        },
        diseaseChange: function() {
            this.fetchMenu()
        },
        menuChange: function(e, menu) {
            let that = this
            if (that.hasSubmenu(menu)) {
                if (util.inArray(that.checkedCheckups, menu.link)) {
                    menu.submenus.map(function(submenu) {
                        if (!util.inArray(that.checkedCheckups, submenu.link)) {
                            that.checkedCheckups.push(submenu.link)
                            let questions = that.questions[submenu.link]
                            questions.map(function(b) {
                                if (!util.inArray(that.checkedQuestions, b.id)) {
                                    that.checkedQuestions.push(b.id)
                                }
                            })
                        }
                    })
                } else {
                    menu.submenus.map(function(submenu) {
                        that.checkedCheckups.$remove(submenu.link)
                        let questions = that.questions[submenu.link]
                        questions.map(function(b) {
                            that.checkedQuestions.$remove(b.id)
                        })
                    })
                }
            } else {
                let questions = this.questions[menu.link] || []
                if (util.inArray(this.checkedCheckups, menu.link)) {
                    questions.map(function(b) {
                        if (!util.inArray(that.checkedQuestions, b.id)) {
                            that.checkedQuestions.push(b.id)
                        }
                    })
                } else {
                    questions.map(function(b) {
                        that.checkedQuestions.$remove(b.id)
                    })
                }
            }

        },
        clickCommit: function(e) {
            let that = this
            let data = {}
            this.checkedQuestions.map(function(questionid) {
                let ename = that.getCheckuptplEnameByQuestionid(questionid)
                if (!data.hasOwnProperty(ename)) {
                    data[ename] = [questionid]
                }
                data[ename].push(questionid)
            })
            if (util.inArray(this.checkedCheckups, "zhiliao")) {
                data["zhiliao"] = []
            }

            $.ajax({
                url: api.get('export.checkup'),
                type: 'POST',
                dataType: 'json',
                data: {
                    cnf: data
                },
            }).done(function(d) {
                if (d.errno != 0 && d.errno != -10) {
                    that.$dispatch('show-alert', d.errmsg);
                } else {
                    that.$dispatch('show-popup', '提交成功', function() {
                        that.getJobList()
                        document.documentElement.scrollTop = document.body.scrollTop =0;
                    })
                }
            })
        },
        // startExport: function(reqData) {
        //     // if (this.connected == true) {
        //     //     return
        //     // }
        //     let  host = '101.201.110.150'
        //     let wsServer = 'ws://' + host + ':9502';
        //     let websocket = new WebSocket(wsServer);
        //     let sid = cookie.get('_myuserid_');
        //     websocket.onopen = function(evt) {
        //         console.log("Connected to WebSocket server.");
        //         websocket.send(JSON.stringify({data: reqData, func: "exportcheckup", sid: sid}))
        //     };
        //
        //     websocket.onclose = function(evt) {
        //         console.log("Disconnected");
        //     };
        //
        //     websocket.onmessage = function(evt) {
        //         let d = JSON.parse(evt.data)
        //         console.log('Retrieved data from server: ', d.error, d.data);
        //     };
        //
        //     websocket.onerror = function(evt, e) {
        //         console.log('Error occured: ' + evt.data);
        //     };
        // },
        getCheckuptplEnameByQuestionid: function(questionid) {
            let enames = Object.keys(this.questions)
            for (let i = 0; i < enames.length; i++) {
                let ename = enames[i]
                let questions = this.questions[ename]
                for (let j = 0; j < questions.length; j++) {
                    let question = questions[j]
                    if (question.id == questionid) {
                        return ename
                    }
                }
            }
            return false
        }
    },
    watch: {
        checkedQuestions: function(newVal, oldVal) {
            let that = this
            let mymenus = []
            that.menus.map(function(menu) {
                if (that.hasSubmenu(menu)) {
                    menu.submenus.map(function(submenu) {
                        mymenus.push(submenu)
                    })
                } else {
                    mymenus.push(menu)
                }
            })
            //将选中问题的菜单项也同时选中
            //没有一个问题被选中的菜单项同时取消选中
            //特殊处理没有问题的菜单，比如：治疗
            for (let i=0;i<mymenus.length;i++) {
                let menu = mymenus[i]
                let flag = false
                let questions = that.questions[menu.link] || []
                //没有问题的菜单（量表）略过
                if (questions.length == 0) {
                    continue;
                }
                questions.map(function(question) {
                    if (util.inArray(that.checkedQuestions, question.id)) {
                        flag = true
                    }
                })
                if (flag === false) {
                    that.checkedCheckups.$remove(menu.link)
                } else {
                    if (!util.inArray(that.checkedCheckups, menu.link)) {
                        that.checkedCheckups.push(menu.link)
                    }
                }
            }
            that.menus.map(function(menu) {
                if (that.hasSubmenu(menu)) {
                    let flag = false
                    menu.submenus.map(function(submenu) {
                        if (util.inArray(that.checkedCheckups, submenu.link)) {
                            flag = true
                        }
                    })
                    if (flag === false) {
                        that.checkedCheckups.$remove(menu.link)
                    } else {
                        if (!util.inArray(that.checkedCheckups, menu.link)) {
                            that.checkedCheckups.push(menu.link)
                        }
                    }
                }
            })
        }
    },
    filters: {
        filterStatus: function(val) {
            let str = ''
            if (val == 0) {
                str = '新提交'
            } else if (val == 1) {
                str = '正在进行'
            } else if (val == 2) {
                str = '失败'
            } else if (val == 3) {
                str = '完成'
            } else if (val == 4) {
                str = '删除'
            }
            return str
        }
    },
    ready: function() {

    }
}
</script>
