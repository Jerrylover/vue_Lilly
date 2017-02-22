<template>
<ul v-if="totalPage > 1" class="pagination">
  <li v-if="totalPage <= 1"><a href="javascript:">&laquo;</a></li>
  <li v-else>
    <a v-if="myCur > 1" @click="pageClick(myCur-1)">&laquo;</a>
    <a v-else href="javascript:">&laquo;</a>
  </li>
  <li v-for="(item, index) in items" :key="index" v-bind:class="{ active: myCur == item, disabled: item == '...'}">
    <span v-if="item == myCur">{{item}}</span>
    <template v-else>
                <span v-if="item == '...'">{{item}}</span>
                <a v-else @click="pageClick(item)">{{item}}</a>
</template>
        </li>
        <li v-if="myCur >= totalPage"><a href="javascript:" style="border-top-right-radius: 4px; border-bottom-right-radius: 4px">&raquo;</a></li>
        <li v-else><a @click="pageClick(myCur+1)" style="border-top-right-radius: 4px; border-bottom-right-radius: 4px">&raquo;</a></li>
        <li><span class="text" style="border: none;line-height: 1.8;margin-left: 5px;">共{{total}}条记录</span></li>
    </ul>
</template>
<style scoped>
a:hover {
  cursor: pointer;
}

li.active>span {
  background-color: #008DB9;
}

span.text:hover {
  background-color: #fff;
  color: #337ab7;
}
</style>
<script>
import Bus from '../lib/bus.js'
export default {
  props: {
    cur: {
      type: Number,
      required: false,
      default: 1
    },
    pagesize: {
      type: Number,
      required: false,
      default: 20
    },
    total: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    }
  },
  data: function() {
    return {
      boundary: 7,
      frontRange: 1,
      midRange: 5,
      rearRange: 1,
      myCur: this.cur,
    }
  },
  watch: {

  },
  computed: {
    totalPage: function() {
      return Math.ceil(this.total / this.pagesize);
    },
    items: function() {
      // this.myCur -= '';
      // this.pagesize -= '';
      // this.total -= '';
      var totalPage = Math.ceil(this.total / this.pagesize);
      var pagination = [];
      var currentPage = (this.myCur > totalPage) ? totalPage : this.myCur;
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
      if (page != this.myCur) {
        this.myCur = page
        Bus.$emit('page-click', page)
        var query = {}
        for (var i in this.$route.query) {
          query[i] = this.$route.query[i]
        }
        query.pagenum = page;
        console.log(this.path, query)
        this.$router.push({
          path: this.path,
          query: query
        });
      }
    },
  }
}
</script>
