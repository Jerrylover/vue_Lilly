require('../../config');
var config = require('./config.js');
var util = require('../lib/util.js')
var cookie = require('../lib/cookie.js');
var common = require('../lib/common.js')

var urls = {
    'user': {
        'info': '/user/info',
        'modifypassword': '/user/modifypassword',
        'login': '/login/loginpostjson',
        'islogin': '/login/isloginjson'
    },
    'patient': {
        'list': '/patient/list',
        'baseinfo': '/patient/patientinfo',
        'addpost': '/patient/addpost',
        'checkuphistory': '/revisitrecord/list4onepatient',
        'modifypost': '/patient/modifypost',
        'getwxuser': '/patient/getwxuser',
        'getunbindwxusers': '/patient/getunbindwxusers',
        'searchwxusers': '/patient/searchwxusers',
        'bindwxuser': '/patient/bindwxuser',
        'auditpass': '/patient/auditpass',
        'auditrefuse': '/patient/auditrefuse',
        'delete': '/patient/delete',
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
        'simplemenu': '/menu/simple'
    },
    'checkuptpl': {
        'one': '/checkuptpl/one',
    },
    'checkup': {
        'add': '/checkup/add',
        'modify': '/checkup/modify',
        'list': '/checkup/list',
        'delete': '/checkup/delete'
    },
    'chemo': {
      'add': '/chemo/add',
      'modify': '/chemo/modify',
      'delete': '/chemo/delete',
      'list': '/chemo/list',
      'search': '/chemo/searchmedicine',
      'medicineuse': '/chemo/medicineuse',
      'one': '/chemo/one',
  },
  'assistant': {
      'list': '/assistant/list',
      'one': '/assistant/one',
      'add': '/assistant/add',
      'modify': '/assistant/modify',
      'forcemodifypassword': '/assistant/forcemodifypassword',
      'lock': '/assistant/lock',
      'unlock': '/assistant/unlock',
      'delete': '/assistant/delete',
      'modifyprivilege': '/assistant/modifyprivilege',
      'privileges': '/assistant/privileges',
  },
  'doctordboplog': {
      'list': '/doctordboplog/list',
  },
  'doctorgroup': {
      'dg_projectlist': '/dg_project/list',
      'dg_projectadd': '/dg_project/addpost',
      'dg_projectmodify': '/dg_project/modifypost',
      'dg_projectone': '/dg_project/one',

      'dg_centeradd': '/dg_center/addpost',
      'dg_centerone': '/dg_center/one',
      'dg_centermodify': '/dg_center/modifypost',
      'dg_centerlist': '/dg_center/list',

      'dg_memberlist': '/dg_member/list',
      'dg_memberadd': '/dg_member/addpost',
      'dg_membersearch': '/dg_member/searchmember',
      'dg_membersetprojectmaster': '/dg_member/setprojectmaster',
      'dg_memberremoveprojectmaster': '/dg_member/removeprojectmaster',
      'dg_membersetcentermaster': '/dg_member/setcentermaster',
      'dg_memberremovecentermaster': '/dg_member/removecentermaster',

      'dg_patientlist': '/dg_patient/list',
      'dg_patientimportpatients': '/dg_patient/bataddpatientlist',
      'dg_patientimportpost': '/dg_patient/bataddpost',
      'dg_patientremovepost': '/dg_patient/batremovepost',
  },
  export: {
      checkup: '/export/checkup',
      joblist: '/export_job/list',
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

        var state = localStorage.getItem('_state_');
        state = typeof state == 'undefined' ? 1 : state;
        var issimple = state == 2 ? 1 : 0;
        url = util.appendUrl(url, 'issimple', issimple);

        return url;
    }
};
