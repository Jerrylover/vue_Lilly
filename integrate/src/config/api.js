// import '../../config'
import config from './config.js'
import util from '../lib/util.js'
import cookie from '../lib/cookie.js'
import common from '../lib/common.js'
import Bus from '../lib/bus.js'
import md5 from 'md5'

var urls = {
    'user': {
        'info': '/user/info',
        'modifypassword': '/user/modifypassword',
        'login': '/login/loginpostjson',
        'islogin': '/login/isloginjson'
    },
    'patient': {
        'list': '/patient/list',
        'patientinfo': '/patient/patientinfo',
        'baseinfo': '/patient/baseinfo',
        'revisitrecordlist': '/patient/revisitrecordlist',
        'addpost': '/patient/addpost',
        'checkuphistory': '/revisitrecord/list4onepatient',
        'modifypost': '/patient/modifypost',
        'pipelist': '/pipe/listhtml',
        'getwxuser': '/patient/getwxuser',
        'getunbindwxusers': '/patient/getunbindwxusers',
        'searchwxusers': '/patient/searchwxusers',
        'bindwxuser': '/patient/bindwxuser',
        'auditpass': '/patient/auditpass',
        'auditrefuse': '/patient/auditrefuse',
        'delete': '/patient/delete',
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
        'paperone': '/paper/one',
        'updatepatienttagpost': '/patient/updatepatienttagpost',
        'updateremarkdoctorpost': '/patient/updateremarkdoctorpost',
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
  'schedule': {
      list: '/schedule/list',
      openjson: '/schedule/openjson',
      closejson: '/schedule/closejson',
      addjson: '/schedule/addjson',
      appointmentcanlendar: '/schedule/schedulecandeler',
      revisittktlist: '/schedule/showschedulerevisittkts',
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
  'common': {
      'changenewjson': '/common/changenewjson',
      'uploadimage': '/picture/uploadimagepost',
      'uploadcase': '/common/wxpicmsgbatuploadcasepost',
  },
  'statistic': {
      'newcnt': '/statistic/newcnt',
      'totalcnt': '/statistic/totalcnt',
      'survival': '/statistic/survive',
      'pfs': '/statistic/pfs',
      'effect': '/statistic/effect',
      'os': '/statistic/os',
  },
  'patienttagtpl': {
    'list': '/patienttagtpl/list',
    'addpost': '/patienttagtpl/addpost',
    'modifypost': '/patienttagtpl/modifypost',
    'one': '/patienttagtpl/modify',
    'deletepost': '/patienttagtpl/deletepost',
    'posmodifypost': '/patienttagtpl/posmodifypost',
  }
}

export default {
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
            code = cookie.get('_myuserid_') || '';
            url = util.appendUrl(url, '_code_', code);
        }
        diseaseid = common.getDiseaseId()
        url = util.appendUrl(url, '_diseaseid_', diseaseid);

        var state = localStorage.getItem('_state_');
        state = typeof state == 'undefined' ? 1 : state;
        var issimple = state == 2 ? 1 : 0;
        url = util.appendUrl(url, 'issimple', issimple);

        return url;
    },
    http: function(obj) {
        if (typeof obj != 'object') {
            return false
        }
        var url = obj.url || ''
        var data = obj.data || {}
        var successCallback = obj.successCallback || ''
        var errorCallback = obj.errorCallback || ''
        var type =  obj.type || 'POST'
        var dataType = obj.dataType || 'json'
        var fasync = obj.async || true
        var contentType = obj.contentType || 'application/x-www-form-urlencoded; charset=UTF-8'
        var processData = obj.processData || true
        var failCallback = obj.failCallback || ''
        var alwaysCallback = obj.alwaysCallback || ''

        if (url == '') {
            return false
        }
        var urlString = this.get(url)

        //为每次提交添加一个随机值，防止CSRF攻击
        var fc_token = cookie.get('fc_token') || ''
        if (!fc_token) {
            fc_token = md5(Math.random())
            var d = new Date()
            var hour = new Date(d.getTime() + 3600 * 1000).getHours()
            var s = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + hour + ':' + d.getMinutes() + ':' + d.getSeconds()

            cookie.set('fc_token', fc_token, {
                expires: s,
                domain: config.domain,
                path: '/'
            })
        }
        data.fc_token = fc_token

        $.ajax({
            url: urlString,
            type: type,
            dataType: dataType,
            async: fasync,
            data: data,
            contentType: contentType,
            processData: processData,
            beforeSend: function() {
                Bus.$emit('show-loading-modal', true)
            }
        }).fail(function(){
            if (typeof failCallback == 'function') {
                failCallback(d)
            }
            Bus.$emit('show-loading-modal', false)
        }).always(function() {
            if (typeof alwaysCallback == 'function') {
                alwaysCallback(d)
            }
            Bus.$emit('show-loading-modal', false)
        }).done(function(d) {
            if (d.errno == 0) {
                if (d.hasOwnProperty('privileges')) {
                    localStorage.setItem('_privileges_', JSON.stringify(d.privileges));
                }
                if (typeof successCallback == 'function') {
                    successCallback(d)
                }
            } else if (d.errno == -10) {//登录过期
                Bus.$emit('login-expire', d.errmsg)
            } else if (d.errno == -11 && url != 'user.login') {//账号锁定
                Bus.$emit('account-lock', d.errmsg)
            } else if (d.errno == -12 && url != 'user.login') {//只有医生和助理才能登录
                Bus.$emit('doctor-limited', d.errmsg)
            } else {
                if (typeof errorCallback == 'function') {
                    errorCallback(d)
                } else {
                    Bus.$emit('ajax-error', d.errmsg)
                }
            }
        });
    }
};
