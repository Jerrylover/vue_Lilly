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
        'unbindpost': '/bind/unbindpost',
    },
    'sickbed': {
        'list': '/bedtkt/list',
        'refuse': '/bedtkt/refuse',
        'refusejson': '/bedtkt/refusejson',
        'pass': '/bedtkt/pass',
        'passjson': '/bedtkt/passjson',
        'senddate': '/bedtkt/sendjson',
        'historylist': '/bedtkt/historylist',
        // ''
    },
    'bedtkt': {
        'info': '/bedtkt/info',
        'history4onepatient': '/bedtkt/history4onepatient',
    },
    'appointment': {
        'list': '/revisittkt/list',
        'schedulelist': '/revisittkt/schedulelist',
    },
    'patient': {
        'list': '/patient/list',
        'info': '/patient/info',
        'allinfo': '/patient/allinfo', 
    },
    'doctor': {
        'config': '/doctor/config',
        'info': '/doctor/info',
        'modifypwdjson': '/doctor/modifypwdjson',
        'configpost': '/doctor/configpost',
    }
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