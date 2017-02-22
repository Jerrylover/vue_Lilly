<template>
    <ul v-if="totalPage > 1" class="pagination">
        <li v-if="totalPage <= 1"><a href="javascript:">&laquo;</a></li>
        <li v-else><a @click="pageClick(cur-1)">&laquo;</a></li>
        <li v-for="index in indexs" track-by="$index" v-bind:class="{ active: cur == index, disabled: index == '...'}">
            <span v-if="index == cur">{{index}}</span>
            <template v-else>
                <span v-if="index == '...'">{{index}}</span>
                <a v-else @click="pageClick(index)">{{index}}</a>
            </template>
        </li>
        <li v-if="cur >= totalPage"><a href="javascript:" style="border-top-right-radius: 4px; border-bottom-right-radius: 4px">&raquo;</a></li>
        <li v-else><a @click="pageClick(cur+1)" style="border-top-right-radius: 4px; border-bottom-right-radius: 4px">&raquo;</a></li>
        <li><span class="text" style="border: none;line-height: 1.8;margin-left: 5px;">共{{total}}条记录</span></li>
    </ul>
</template>
<style scoped>
a:hover {
    cursor: pointer;
}
li.active > span {
    background-color: #008DB9;
}
span.text:hover {
    background-color: #fff;
    color: #337ab7;
}
</style>
<script>
module.exports = {
    props: ['cur', 'pagesize', 'total', 'path'],
    data: function() {
        return {
            boundary: 7,
            frontRange: 1,
            midRange: 5,
            rearRange: 1,
        }
    },
    computed: {
        totalPage: function() {
            return Math.ceil(this.total / this.pagesize);
        },
        indexs: function() {
            this.cur -= '';
            this.pagesize -= '';
            this.total -= '';
            var totalPage = Math.ceil(this.total / this.pagesize);
            var pagination = [];
            var currentPage = (this.cur > totalPage) ? totalPage : this.cur;
            if (totalPage <= this.boundary) {
                for (var i = 1; i <= totalPage; i++) {
                    pagination.push(i);
                }
            } else {
                var frontEnd = this.frontRange;
                var midStart = currentPage - Math.ceil((this.midRange - 1) / 2);
                var midEnd = currentPage + (this.midRange - 1) - Math.ceil((this.midRange - 1) / 2);
                var rearStart = totalPage - this.rearRange + 1;
                while (midStart <= 1) {
                    if (midStart < 1) {
                        midEnd += 1;
                    }
                    midStart += 1;
                }
                while (midEnd >= totalPage) {
                    if (midEnd > totalPage) {
                        midStart -= 1;
                    }
                    midEnd -= 1;
                }
                for (var i = 1; i <= totalPage; i++) {
                    if (i <= frontEnd || (i >= midStart && i <= midEnd) || i >= rearStart) {
                        var _j = pagination.length < 1 ? 0 : pagination[pagination.length - 1];
                        if (i - _j > 1) {
                            pagination.push('...');
                        }
                        pagination.push(i);
                    }
                }

            }
            return pagination;
        }
    },
    methods: {
        pageClick: function(page) {
            if (page != this.cur) {
                this.cur = page
                this.$dispatch('page-click', page)
                this.$route.query.pagenum = page;

                this.$route.router.go({
                    path: this.path,
                    query: this.$route.query
                });
            }
        },
    }
}
</script>
