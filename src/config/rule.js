module.exports = {
    checkPhone: function(number){
        if(!(/^1[3|4|5|7|8]\d{9}$/.test(number))){
            return false;
        }else{
            return true;
        }
    },
    checkEmail: function(email){
        if(!(/[a-zA-Z0-9]{1,100}@[a-zA-Z0-9]{1,10}\.[a-zA-Z0-9]{1,5}/.test(email))){
            return false;
        }else{
            return true;
        }
    },
    checkIDcard: function(IDcard){
        if (!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(IDcard))) {
            return false;
        }else {
            return true;
        }
    }
}
