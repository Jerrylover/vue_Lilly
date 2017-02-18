var cookie = require('./cookie.js');
var api = require('../config/api.js')
var config = require('../config/config.js')
var util = require('../lib/util.js')
require('./base64.js');
module.exports = {
    'isLogin': function() {
        var code = cookie.get('_myuserid_');
        if (!code) {
            return false;
        }

        var self = this;
        if (!this.getUserName()) {
            $.ajax({
                url: api.get('user.islogin'),
                type: 'POST',
                dataType: 'json',
                async: false,
                data: {
                    code: code
                },
            }).done(function(d) {
                if (d.errno == 0) {
                    // isLogin = d.data.islogin;
                    self.login(d.data);
                }
            });
        }
        return true;
    },
    'getUserName': function() {
        return localStorage.getItem('_username_');
    },
    'getName': function() {
        return localStorage.getItem('_name_');
    },
    'getHospitalId': function() {
        return localStorage.getItem('_hospitalid_');
    },
    'getHospital': function() {
        return localStorage.getItem('_hospital_');
    },
    'login': function(data) {
        cookie.set('_myuserid_', data.code, {
            expires: 1,
            domain: config.domain,
            path: '/'
        });
        localStorage.setItem('_username_', data.username);
        localStorage.setItem('_name_', data.name);
        localStorage.setItem('_hospitalid_', data.hospitalid);
        localStorage.setItem('_hospital_', data.hospital);
        localStorage.setItem('_diseases_', JSON.stringify(data.diseases))
        localStorage.setItem('_privileges_', JSON.stringify(data.privileges));
    },
    'logout': function(vue) {
        cookie.set('_myuserid_', '', {
            expires: -1,
            domain: config.domain,
            path: '/'
        });
        cookie.set('_myuserid_', '', {
            expires: -1,
            domain: '.fangcunhulian.cn',
            path: '/'
        });
        cookie.set('_myuserid_', '', {
            expires: -1,
            domain: '.fangcunyisheng.com',
            path: '/'
        });
        cookie.set('_diseaseid_', '', {
            expires: -1,
            domain: config.domain,
            path: '/'
        });
        cookie.set('_diseaseid_', '', {
            expires: -1,
            domain: '.fangcunhulian.cn',
            path: '/'
        });
        cookie.set('_diseaseid_', '', {
            expires: -1,
            domain: '.fangcunyisheng.com',
            path: '/'
        });
        localStorage.clear();
        // window.location.reload();
        vue.$route.router.push({
            name: 'login'
        })
    },
    'getDiseases': function() {
        var diseasesString = localStorage.getItem('_diseases_');
        var diseases = JSON.parse(diseasesString);
        if (!$.isArray(diseases)) {
            diseases = [];
        }
        return diseases;
    },
    'getDiseaseId': function() {
        var diseaseid = localStorage.getItem('_diseaseid_');
        diseaseid = typeof diseaseid != 'undefined' ? diseaseid : '';
        var diseases = this.getDiseases();
        if (diseases.length > 0) {
            if (!diseaseid || !util.inArray2(diseases, 'diseaseid', diseaseid)) {
                diseaseid = diseases[0].diseaseid;
                localStorage.setItem('_diseaseid_', diseaseid);
            }
        }
        return diseaseid;
    },
    getDiseaseName: function(diseaseid) {
        var diseases = this.getDiseases();
        var diseaseName = '';
        $.each(diseases, function(index, disease) {
            if (disease.diseaseid == diseaseid) {
                diseaseName = disease.name;
                return false; //break;
            }
        })
        return diseaseName;
    },
    'getSitePreName': function() {
        var siteprename = localStorage.getItem('_siteprename_');
        if (typeof siteprename == 'undefined' || !siteprename) {
            var diseases = this.getDiseases();
            if (diseases.length > 0) {
                siteprename = diseases[0].shortname;
                if (typeof siteprename == 'undefined' || !siteprename) {
                    siteprename = '方寸医生';
                }
            } else {
                siteprename = '方寸医生';
            }
            localStorage.setItem('_siteprename_', siteprename);

        }
        return siteprename;
    },
    setState: function(val) {
        localStorage.setItem('_state_', val);
    },
    getState: function() {
        return localStorage.getItem('_state_') != undefined ? localStorage.getItem('_state_') : 1;
    },
    isCancerDisease: function(diseaseid) {
        return diseaseid == 8 || diseaseid == 15 || diseaseid == 19;
    },
    isLungCancer: function(diseaseid) {
        return diseaseid == 8;
    },
    isGastricCancer: function(diseaseid) {
        return diseaseid == 15;
    },
    isOtherCancer: function(diseaseid) {
        return diseaseid == 19;
    },
    getAllPrivileges: function() {
        var privilegeString = localStorage.getItem('_privileges_');
        if (privilegeString == 'undefined') {
            return [];
        }
        var privileges = JSON.parse(privilegeString);
        if (!$.isArray(privileges)) {
            privileges = [];
        }
        return privileges;
    },
    hasPrivilege: function(privilege) {
        var allPrivileges = this.getAllPrivileges();
        return $.inArray(privilege, allPrivileges) > -1;
    }
}
