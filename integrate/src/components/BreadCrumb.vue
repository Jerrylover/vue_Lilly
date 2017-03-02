<template>
    <div class="breadcrumbs">
        <ul class="breadcrumb">
            <li v-for="(one, index) in data">
                <a href="javascript:" @click.prevent="clickLink(one.link)">{{one.name}}</a>
                <!-- <span v-else :class="{'onlyone-active': data.length == 1}">{{one.name}}</span> -->
            </li>
            <li class="active"><span>{{pagetitle}}</span></li>
        </ul>
        <div style="display:inline-block">
            <slot name="other-content">
            </slot>
        </div>
    </div>

</template>
<style scoped>
.breadcrumb>.active {
    color: #333;
}
.breadcrumb>li+li:before {
    font-family: FontAwesome;
    font-size: 14px;
    content: "\f105";
    color: #b2b6bf;
    margin-right: 2px;
    padding: 0 5px 0 2px;
    position: relative;
    top: 1px;
}
.breadcrumb {
    background-color: transparent;
    display: inline-block;
    line-height: 24px;
    margin: 0 22px 0 20px;
    padding: 0;
    font-size: 13px;
    color: #333;
    border-radius: 0;
}
</style>
<script>
import Bus from '../lib/bus.js'
export default {
    data: function() {
        return {

        }
    },
    props: {
        data: {
            type: Array,
            require: false,
            default: function() {
                return []
            }
        },
        pagetitle: {
            type: String,
            require: true
        }
    },
    methods: {
        clickLink: function(link) {
            if (link.name == 'patient-list') {
                Bus.$emit('hide-patient-third-level-menu')
            }
            this.$router.push(link)
        }
    }
}

</script>
