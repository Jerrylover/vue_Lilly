import { Indicator } from 'mint-ui';
module.exports = {
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
