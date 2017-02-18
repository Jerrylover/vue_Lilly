<template>
    <li>
        <div :class="{bold: !ischild, active: model.link== ename}" @click="toggle($event)">
            <i v-show="isFolder" class="fa-li fa" :class="{'fa-folder-open-o': isOpen == 1, 'fa-folder-o': isOpen == 2}"></i> {{model.name}}
            <!--<span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
 --></div>
        <ul class="list-unstyled" v-show="open" v-if="isFolder">
            <menu class="item" v-for="model in model.submenus" :model="model" :ischild='true' :ename='ename' :patientid='patientid'>
            </menu>
            <li @click="addChild" class="collapse">+</li>
        </ul>
    </li>
</template>
<style scoped>
div {
    padding-right: 2px;
}

.active {
    border-right: 2px solid #008DB9;
    color: #008DB9 !important;
}

.bold {
    color: #4A4A4A;
    font-weight: bold;
    position: relative;
}

.list-unstyled {
    padding-left: 5%;
}

li {
    padding: 5px 0 5px 0;
}

li:hover {
    cursor: default;
}
</style>
<script>
import Vue from 'vue'
import util from '../lib/util.js'
export default {
    props: {
        model: Object,
        ischild: false,
        patientid: '',
        ename: ''
    },
    data: function() {
        return {
            open: false
        }
    },
    computed: {
        isFolder: function() {
            return this.model.submenus &&
                this.model.submenus.length
        },
        isOpen: function() {
            if (!this.isFolder) {
                return -1;
            } else if (this.open) {
                return 1;
            } else {
                return 2;
            }
        }
    },
    methods: {
        toggle: function(e) {
            if (this.model.link == 'kaiyongyao') {
                var childWindow = window.open('_blank', 'child'+Math.random());
                childWindow.location = '//admin.fangcunyisheng.com/patientmedicinepkgmgr/list?patientid=' + this.patientid;
                return;
            } else if (this.model.link == 'yuefuzhen') {
                var childWindow = window.open('_blank', 'child'+Math.random());
                childWindow.location = '//admin.fangcunyisheng.com/revisittktmgr/addOrModify?patientid=' + this.patientid;
                return;
            }
            var criticalClick = false;
            var d = new Date();
            var t = d.getTime();
            var lastClickTime = Number(sessionStorage.getItem('clickTime'));
            if (t - lastClickTime < 1000) { //暴击
                criticalClick = true;
                // console.log('暴击间隔', t - lastClickTime);
            }
            sessionStorage.setItem('clickTime', t);
            var obj = util.getAllFormData();
            var formSnap = sessionStorage.getItem('form-snap');
            var objSnap = JSON.parse(formSnap);
            var hasChange = false;

            for (var i in objSnap) {
                //修改后的表单不会比快照表单缺少元素项，之所以undefined是因为点击太快了，而这种情况下不考虑
                if (obj[i] != undefined && objSnap[i] != obj[i]) {
                    hasChange = true;
                    console.log('snap ', i, objSnap[i], 'change', i, obj[i])
                    break;
                }
            }
            if (!criticalClick && !this.isFolder && hasChange) {
                var that = this;
                // this.$emit('show-prompt', '有数据未保存，确定要离开吗？', function() {
                    if (that.isFolder) {
                        that.open = !that.open
                    }
                    $('div').each(function() {
                        $(this).removeClass('active');
                    })
                    $(e.target).addClass('active');
                    var ename = that.model.link;
                    if (ename) {
                        window.scrollTo(0, 0);
                        that.$router.push({
                            name: 'checkuptpl-child',
                            params: {
                                'patientid': that.patientid,
                                'ename': ename,
                                'name': that.model.name
                            }
                        })
                    }
                // })
            } else {
                if (this.isFolder) {
                    this.open = !this.open
                }
                var self = this;
                $('div').each(function() {
                    $(this).removeClass('active');
                })
                $(e.target).addClass('active');
                var ename = this.model.link;
                if (ename) {
                    window.scrollTo(0, 0);
                    this.$router.push({
                        name: 'checkuptpl-child',
                        params: {
                            'patientid': self.patientid,
                            'ename': ename,
                            'name': this.model.name
                        }
                    })
                }
            }
        },
        changeType: function() {
            if (!this.isFolder) {
                Vue.set(this.model, 'submenus', [])
                this.addChild()
                this.open = true
            }
        },
        addChild: function() {
            this.model.submenus.push({
                name: 'new stuff'
            })
        }
    },
    components: {
        'menu': function(resolve) {
            require(['./Menu.vue'], resolve);
        }
    },
    beforeRouteEnter: function(done) {
        if (this.model.hasOwnProperty('submenus')) {
            for (var i = 0; i < this.model.submenus.length; i++) {
                if (this.model.submenus[i].link == this.ename) {
                    this.open = true;
                    break;
                }
            }
        }
        done();

    }
}
</script>
