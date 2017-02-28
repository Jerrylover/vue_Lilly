module.exports = {
    'dateUtilInit': function() {
        if (typeof Date.prototype.format != 'function') {
            Date.prototype.format = function(fmt) {
                var o = {
                    "M+": this.getMonth() + 1,
                    "D+": this.getDate(),
                    "h+": this.getHours(), 
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S": this.getMilliseconds()
                };
                
            }
        }
    }
}