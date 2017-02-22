import api from '../config/api.js';
import { Indicator } from 'mint-ui';
module.exports = {
    checkOpenid: function(queryString) {
        var openid = localStorage.getItem('_openid_');
        console.log(openid, 'openid');
        openid = openid == null? "": openid;
        if (openid == '') {
            $.ajax({
                url: api.get('index') + '&from_wx=' + queryString,
                type: 'POST',
                dataType: 'json',
                async: false,
                data: {},
            }).done(function(response){
                if (response.errno == 0) {
                    var data = response.data;
                    openid = data.openid;
                    localStorage.setItem('_openid_', openid);
                }
            })
        }
    },
    checkLoginAsync: function(f) {
        var openid = localStorage.getItem('_openid_');
        if (openid != '' && openid != null && typeof openid != 'undefined') {
            return true;
        }
        checkLoginFromServerAsync(f);
        return false;
    },
    checkLoginFromServerAsync: function(f) {
        $.ajax({
            url: api.get('user.islogin'),
            type: 'POST',
            dataType: 'json',
            data: {

            }
        }).done(function(response){
            if (response.errno == 0) {
                f();
            }
        })
    },
    checkLoginSync: function(queryString) {
        var isbind = localStorage.getItem('_isbind_');
        if (isbind == "1") {
            return true;
        }

        var openid = localStorage.getItem('_openid_');
        openid = openid == null ? '' : openid;
        var result = this.checkLoginFromServerSync(openid);

        if (result == true) {
            localStorage.setItem('_isbind_', 1);
        }
        return result;
    },
    getOpenidFromServer: function(queryString) {
        var openid = '';
        $.ajax({
            url: api.get('index'),
            type: 'POST',
            dataType: 'json',
            async: false,
            data: queryString,
        }).done(function(response){
            if (response.errno == 0) {
                var data = response.data;
                openid = data.openid;
            }
        })
        return openid;
    },
    checkLoginFromServerSync: function(openid) {
        var result = false;
        $.ajax({
            url: api.get('user.isbind'),
            type: 'POST',
            dataType: 'json',
            async: false,
            data: {
                openid: openid,
            }
        }).done(function(response){
            if (response.errno == 0) {
                var data = response.data;
                if ($.trim(data.isbind) == '1') {
                    result = true;
                }
            }else {
                result = false
            }
        });
        return result;
    },
    post: function(url, params, handleResponse, dataType = 'json', isneedloading = true, isAsync = true){
        if (isneedloading) {
            Indicator.open('正在加载...');
        }
        $.ajax({
            url: url,
            type: 'POST',
            dataType: dataType,
            data: params,
            async: isAsync,
        }).done(function(response){
            if (typeof handleResponse == "function") {
                handleResponse(response);
            }
        }).always(function(){
            Indicator.close();
        })
    }
}