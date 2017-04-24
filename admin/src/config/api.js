require('../../config');
var config = require('./config.js');
var util = require('../lib/util.js')
var cookie = require('../lib/cookie.js');

var urls = {
    'user': {
        'login': '/login/loginpostjson',
        'islogin': '/login/isloginjson',
        'info': '/user/info',
        'modifypwd': '/user/modifypassword',
    },
    'schedule': {
        list: '/schedule/list',
        openjson: '/schedule/openjson',
        closejson: '/schedule/closejson',
        addjson: '/schedule/addjson',
        'appointmentcanlendar': '/schedule/schedulecandeler',
        'revisittktlist': '/schedule/showschedulerevisittkts',
    },
    'patient': {
        'list': '/patient/list4admin',
        'baseinfo': '/patient/baseinfo',
        'revisitrecordlist': '/patient/revisitrecordlist',
        'addpost': '/patient/addpost',
        'checkuphistory': '/revisitrecord/list4onepatient',
        'pipelist': '/pipe/listhtml',
        'modifypost': '/patient/modifypost',
        'getwxuser': '/patient/getwxuser',
        'getunbindwxusers': '/patient/getunbindwxusers',
        'searchwxusers': '/patient/searchwxusers',
        'bindwxuser': '/patient/bindwxuser',

        'prescription': '/patientmedicinepkg/list',
        // 'addmodify': '/patientmedicinepkg/addandmodifyhtml',
        'addmodifymedicinepost': '/patientmedicinepkg/addandmodifypost',
        'deletemedicinepost': '/patientmedicinepkg/deletepost',
        'sendmsgmedicinepost': '/patientmedicinepkg/sendmsgpost',
        'addormodifyappointment': '/revisittkt/addormodify',
        'addormodifyappointmentjson': '/revisittkt/addormodifyjson',
        'addmedicine': '/doctormedicineref/addpost',
        'addmedicinehtml': '/doctormedicineref/addhtml',

        'deletemedicalpic': '/common/wxpicmsgremovejson',
        'addtag': '/common/wxpicmsgaddtagrefjson',
        'removetag': '/common/wxpicmsgremovetagrefjson',
        'medicalpic': '/common/wxpicmsglist',
        'paperlist': '/paper/list',
        'paperone': '/paper/one'
    },
    'pipe': {
        'pushmsg': '/pipe/pushmsgbyopenidjson',
    },
    'sickbedorder': {
        'tktlist': '/bedtkt/list',
        'pass': '/bedtkt/doctorpass',
        'refuse': '/bedtkt/doctorrefuse',

        'operatehistorylist': '/bedtkt/historylist', 
    },
    'revisitrecord': {
        'addzhusu': '/revisitrecord/addzhusu',
        'add': '/revisitrecord/add',
        'modify': '/revisitrecord/modify',
        'datelist': '/revisitrecord/datelist',
        'list': '/revisitrecord/list',
        'delete': '/revisitrecord/delete'

    },
    'doctor': {
        'menu': '/menu/one',
    },
    'checkuptpl': {
        'one': '/checkuptpl/one',
    },
    'checkup': {
        'add': '/checkup/add',
        'modify': '/checkup/modify',
        'list': '/checkup/list',
    },
    'common': {
        'changenewjson': '/common/changenewjson',
        'uploadimage': '/picture/uploadimagepost',
        'uploadcase': '/common/wxpicmsgbatuploadcasepost',
    },
    'doctormemo': {
        'addpost': '/doctormemo/addpost',
        'list': '/doctormemo/list',
    }
}

module.exports = {
    'get': function(str) {
        var params = str.split('.');
        var url = '';
        if (params.length == 1) {
            url = urls[params[0] + ''];
        } else if (params.length == 2) {
            url = urls[params[0] + ''][params[1] + '']
        } else if (params.length == 3) {
            url = urls[params[0] + ''][params[1] + ''][params[2] + '']
        }

        url = config.host + url + config.dev;

        var code = '';
        var diseaseid = '';
        if (process.env.NODE_ENV === 'development') {
            code = cookie.get('_myuserid_');
            code = typeof code == 'undefined' ? '' : code;
            url = util.appendUrl(url, '_code_', code);
        }
        diseaseid = localStorage.getItem('_diseaseid_');
        diseaseid = typeof diseaseid == 'undefined' ? '' : diseaseid;
        url = util.appendUrl(url, '_diseaseid_', diseaseid);

        return url;
    }
};
