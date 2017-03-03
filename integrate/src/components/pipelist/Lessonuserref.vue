<template>
    <div>
    <div>
        <a href="javascript:" class="btn btn-warning btn-sm" @click="clickbtn($event)" v-html="filterBtnDesc(btndiscribe)"></a>
    </div>
    <div v-show="showlist">
        <div v-if="obj.detail.improves != undefined">
            <span>课堂巩固</span><br/>
            <div v-for="(improve, index) in obj.detail.improves">
                <span>{{index+1}}. {{improve.xquestionname}}</span>
                <div>
                    <span v-if="improve.xquestiontype == 'Radio'">&nbsp;&nbsp;&nbsp;选择&nbsp;&nbsp;&nbsp;</span>
                    <span v-if="improve.content !=undefined">{{improve.content}}&nbsp;&nbsp;&nbsp;</span>
                    <span v-for="option in improve.options">{{option.content}}&nbsp;&nbsp;&nbsp;</span>
                </div>
            </div>
        </div>
        <div v-if="obj.detail.tasks != undefined">
            <span>课堂作业</span><br/>
            <div v-for="task in obj.detail.tasks">
                <span>{{index+1}}. {{task.xquestionname}}</span>
                <div>
                    <span v-if="task.xquestiontype == 'Radio'">&nbsp;&nbsp;&nbsp;选择&nbsp;&nbsp;&nbsp;</span>
                    <span v-if="task.content != undefined">{{task.content}}&nbsp;&nbsp;&nbsp;</span>
                    <span v-for="option in task.options">{{option.content}}&nbsp;&nbsp;&nbsp;</span>
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
        props: ['obj'],
        methods: {
            clickbtn: function(e) {
                e.preventDefault();
                if (this.btndiscribe == "展开") {
                    this.btndiscribe = "收起";
                    this.showlist = true;
                }else if (this.btndiscribe == "收起") {
                    this.btndiscribe = "展开";
                    this.showlist = false;
                }
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
