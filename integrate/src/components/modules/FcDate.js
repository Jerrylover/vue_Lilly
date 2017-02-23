'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * @link https://github.com/vuejs/vue/blob/dev/src/core/vdom/hFcpers/index.js
 */
function getChild (children) {
  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
}

var FcDate$1 = {
  name: 'FcDate',

  abstract: true,

  props: ['value', 'format'],

  render: function render (h) {
    var vnode = getChild(this.$slots.default);
    if (!vnode) { return }

    var opts = vnode.componentOptions;
    var ctx = this.$vnode.componentOptions;

    if (ctx.listeners && ctx.listeners.input) {
      opts.propsData.value = ctx.propsData.value;
      opts.listeners = opts.listeners || {};

      opts.listeners.input = function (val) {
        ctx.listeners.input.fn(val ? val.Format("yyyy-MM-dd hh:mm:ss") : val);
        // ctx.listeners.input.fn('你好');

      };
    }

    return vnode
  }
};

FcDate$1.install = function (Vue) {
  Vue.component(FcDate$1.name, FcDate$1);
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(FcDate$1);
}

export default FcDate$1;
