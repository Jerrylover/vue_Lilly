var cookie = require('./cookie.js');
var api = require('../config/api.js')
var config = require('../config/config.js')
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
                data: { code: code },
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
    },
    'logout': function() {
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
        window.location.reload();
    },
    'getDiseases': function() {
        var diseasesString = localStorage.getItem('_diseases_');
        var diseases = JSON.parse(diseasesString);
        return diseases;
    },
    'getDiseaseId': function() {
        var diseaseid = localStorage.getItem('_diseaseid_');
        diseaseid = typeof diseaseid != 'undefined' ? diseaseid : '';
        if (!diseaseid) {
            var diseases = this.getDiseases();
            if (diseases.length > 0) {
                diseaseid = diseases[0].diseaseid;
                localStorage.setItem('_diseaseid_', diseaseid);
            }
        }
        return diseaseid;
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
    }
}
