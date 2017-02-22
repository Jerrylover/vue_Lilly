module.exports = {
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
    setDiseaseid: function(patientid, diseaseid) {
        var json = sessionStorage.getItem(patientid);
        var obj = {};
        if (json == undefined || json.indexOf('{') == -1) {
            obj = {'diseaseid': diseaseid};
        } else {
            obj = JSON.parse(json);
            obj.diseaseid = diseaseid;
        }
        json = JSON.stringify(obj);
        sessionStorage.setItem(patientid, json);
    }

}
