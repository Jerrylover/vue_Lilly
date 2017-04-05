module.exports = {
    'getNoWDate': function(formatstring = 'YYYY-MM-DD') {
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,
                "D+": this.getDate(),
                "h+": this.getHours(), 
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S": this.getMilliseconds()
            };
            if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
        }
        var date = new Date();
        date = date.Format(formatstring);
        return date;
    },
    'formatDate': function(date, formatstring = 'YYYY-MM-DD') {
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,
                "D+": this.getDate(),
                "h+": this.getHours(), 
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S": this.getMilliseconds()
            };
            if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
        }
        date = date.Format(formatstring);
        return date;
    },
    'getDayOffsetDate': function(offsetValue) {
        var date = new Date();
        var day = date.getDate();
    },
    'getMonthOffsetDate': function() {

    },
    'isLeapYear': function(year) {
        // var value = Number(year);
        // if (value ) {}
    },
    contentHandle: function(content) {
        if (typeof content != 'undefined' && content != null) {
            return content.replace(/\n/g, '<br/>');
        }
    }
}