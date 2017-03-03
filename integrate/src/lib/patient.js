export default {
    getPatientName: function(patientid) {
        var json = sessionStorage.getItem(patientid);
        if (json == undefined || json.indexOf('{') == -1) {
            return '';
        }
        var obj = JSON.parse(json);
        return obj.name;
    },
    setPatientName: function(patientid, patientname) {
        var json = sessionStorage.getItem(patientid);
        var obj = {};
        if (json == undefined || json.indexOf('{') == -1) {
            obj = {'name': patientname};
        } else {
            obj = JSON.parse(json);
            obj.name = patientname;
        }
        json = JSON.stringify(obj);
        sessionStorage.setItem(patientid, json);
    },
    getDiseaseId: function(patientid) {
        var json = sessionStorage.getItem(patientid);
        if (json == undefined || json.indexOf('{') == -1) {
            return '';
        }
        var obj = JSON.parse(json);
        return obj.diseaseid;
    },
    getDiseaseName: function(patientid) {
        var json = sessionStorage.getItem(patientid);
        if (json == undefined || json.indexOf('{') == -1) {
            return '';
        }
        var obj = JSON.parse(json);
        return obj.diseaseid;
    },
    setDisease: function(patientid, diseaseid, diseasename) {
        var json = sessionStorage.getItem(patientid);
        var obj = {};
        if (json == undefined || json.indexOf('{') == -1) {
            obj = {'diseaseid': diseaseid, 'diseasename': diseasename};
        } else {
            obj = JSON.parse(json);
            obj.diseaseid = diseaseid;
            obj.diseasename = diseasename;
        }
        json = JSON.stringify(obj);
        sessionStorage.setItem(patientid, json);
    }

}
