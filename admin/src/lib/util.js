module.exports = {
    'appendUrl': function(url, param, value) {
        if (url.indexOf('?') > -1) {
            url += '&';
        } else {
            url += '?';
        }
        url += param + '=' + value;
        return url;
    },
    'isObject': function(obj) {
        return typeof obj === 'object' && Array.isArray(obj) === false;
    },
    'isArray': function(arr) {
        return typeof arr === 'object' && Array.isArray(arr) === true;
    },
    'inArray': function(arr, value) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == value) {
                return true;
            }
        }
        return false;
    },
    'inArray2': function(arr, key, value) { //二维数组
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][key] == value) {
                return true;
            }
        }
        return false;
    },
    getArrayIndex: function(arr, value) {
        for (var i in arr) {
            if (arr[i] == value) {
                return i; //i就是下标
            }
        }
        return false;
    },
    getFormatDate: function(hms) {
        var date = new Date();
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },
    getFormatDateTime: function(hms) {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
        return currentdate;
    },
    getFormJson: function(form) {
        var o = {};
        var a = $(form).serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    },
    isObjectValueEqual: function(a, b) {
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        console.log(aProps);
        console.log(bProps);

        if (aProps.length != bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];

            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        return true;
    },
    url2Obj: function(url) {
        if (url == undefined || url == '') {
            return {};
        }
        var arr = url.split('&');
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            var d = arr[i];
            var e = d.split('=');
            obj[e[0]] = e[1];
        }
        return obj;
    },
    getAllFormData: function() {
        var obj = {};
        $('input[type="text"][name!=""], input[type="number"][name!=""], select, textarea').each(function() {
            if ($(this).attr('name') != undefined && $(this).attr('name') != '') {
                obj[$(this).attr('name')] = $(this).val();
            }
        });

        $('input[type="checkbox"]').each(function() {
            if ($(this).is(':checked')) {
                if (obj[$(this).attr('name')] == undefined || obj[$(this).attr('name')] == '') {
                    obj[$(this).attr('name')] = $(this).val();
                } else {
                    obj[$(this).attr('name')] += ',' + $(this).val();
                }
            } else {
                if (obj[$(this).attr('name')] == undefined) {
                    obj[$(this).attr('name')] = '';
                }
            }
        })
        $('input[type="radio"]').each(function() {
            if ($(this).is(':checked')) {
                obj[$(this).attr('name')] = $(this).val();
            } else {
                if (obj[$(this).attr('name')] == undefined) {
                    obj[$(this).attr('name')] = '';
                }
            }
        })
        return obj;
    },
    getMaxOfArray: function(arr) {
        return Math.max.apply(null, arr)
    },
    getMinOfArray: function(arr) {
        return Math.min.apply(null, arr)
    }
}
