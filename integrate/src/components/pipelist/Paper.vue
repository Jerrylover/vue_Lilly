<template>
    <div>
        <div v-if="obj.detail.tb_data != undefined">
            <span>总得分:&nbsp;&nbsp;&nbsp;{{obj.scores}}&nbsp;&nbsp;&nbsp;(无: 0, 偶尔:1, 常常:2, 总是:3)</span><br/>
            <table class="table table-bordered">
                <tr>
                    <th></th>
                    <td>无+偶尔</td>
                    <td>常常+总是</td>
                </tr>
                <tr>
                    <td>注意</td>
                    <td>{{obj.detail.tb_data.cell1}}</td>
                    <td>{{obj.detail.tb_data.cell2}}</td>
                </tr>
                <tr>
                    <td>多动+冲动</td>
                    <td>{{obj.detail.tb_data.cell3}}</td>
                    <td>{{obj.detail.tb_data.cell4}}</td>
                </tr>
            </table>
        </div>
        <div v-if="obj.detail.last_answer != ''">
            <p>用户关心的其他问题:</p>
            <div>{{obj.detail.last_answer}}</div>
        </div>
        <div v-if="obj.detail.tasks != undefined">
            <a href="javascript:" class="btn btn-warning btn-sm" @click="clickbtn" v-html="filterBtnDesc(btndiscribe)"></a>
            <span>(writer: {{obj.detail.writer}})</span> <a class="btn btn-danger btn-sm" href="javascript:" @click="modifyAnswer(obj.detail.xanswersheetid)">修改答卷</a>
            <div v-if="showlist" style="margin-top:5px">
                <div v-for="task in obj.detail.tasks">
                    <span style="background-color: #e6e6fb; padding: 5px">{{task.pos}}.{{task.xquestionname}}</span><br/>
                    <div v-if="task.xquestionname == 'Radio'" style="padding: 5px">
                        <span>选择:&nbsp;&nbsp;&nbsp;</span>
                        <span v-for='option in task.options'>{{option}}&nbsp;&nbsp;&nbsp;</span>
                    </div>
                    <div v-else style="padding: 5px">
                        <span>答:&nbsp;&nbsp;&nbsp;</span>
                        <span>{{task.content}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                btndiscribe: "展开",
                showlist: false,
            }
        },
        props:['obj'],
        methods: {
            clickbtn: function() {
                if (this.btndiscribe == '展开') {
                    this.btndiscribe = "收起";
                    this.showlist = true;
                }else if(this.btndiscribe == "收起") {
                    this.btndiscribe = "展开";
                    this.showlist = false;
                }
            },
            modifyAnswer: function(xanswersheetid) {
                if (document.domain == 'localhost') {
                    var url = "http://admin.fangcunhulian.cn/xanswersheetmgr/modify?xanswersheetid=" + xanswersheetid;
                }else {
                    var url = '/api/xanswersheetmgr/modify?xanswersheetid' + xanswersheetid;
                }
                window.open(url);
            },
            filterBtnDesc: function(value) {
                var str = value;
                if (value == '展开') {
                    str += " <i class='fa fa-caret-down'></i>";
                } else {
                    str += " <i class='fa fa-caret-up'></i>";
                }
                return str;
            }
        },
        filters: {

        }
    }
</script>
