var config = require('./config.js');
var cookie = require('../lib/cookie.js');
var urls = {
    'index': '/index/index',
    'user': {
        'isbind': '/bind/isbind',
    },
    'pipe': {
        'listofday': '/pipe/listofday',
        'pipelist': '/pipe/list',
    },
    'bind': {
        'binduserpost': '/bind/binduserpost',
    },
    'sickbed': {
        'refusejson': '/bedtkt/refusejson',
        'pass': '/bedtkt/pass',
        'passjson': '/bedtkt/passjson',
        'senddate': '/bedtkt/sendjson',
        // ''
    },
    'appointment': {
        'list': '/revisittkt/list',
        'schedulelist': '/revisittkt/schedulelist',
    },
}

export default {
    'get': function(str) {
        var params = str.split('.');
        var url = '';
        if (params.length == 1) {
            url = urls[params[0] + ''];
        }else if (params.length == 2) {
            url = urls[params[0] + ''][params[1] + ''];
        }else if (params.length == 3) {
            url = urls[params[0] + ''][params[1] + ''][params[2] + ''];
        }

        url = config.host + url + config.dev;
        return url;
    }
}