var config = require('./config.js');
var cookie = require('../lib/cookie.js');

var urls = {
    'show': '/doctor/show',
    'pipe': {
        'listofday': '/pipe/listofday',
        'pipelist': '/pipe/list',
    },
    'patient': {
        'list': '/patient/list',
        'info': '/patient/info',
        'allinfo': '/patient/allinfo',
    },
    'doctor': {
        'info': '/doctor/info',
        'configpost': '/doctor/configpost',
        'statistic': '/doctor/statistic',
    },
    'paper': {
        'tpllist4onepatient': '/papertpl/list4onepatient',
        'list': '/paper/list',
        'one': '/paper/one',
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
