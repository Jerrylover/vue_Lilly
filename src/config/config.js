// var host = '//admin.fangcunyisheng.com';
// var hostUCenter = '//www.fangcunyisheng.com';
var host = '//doctordb.fangcunyisheng.com/api';
var hostUCenter = '//www.fangcunyisheng.com';
var dev = '?display=json';
var domain = 'fangcunyisheng.com';
if (process.env.NODE_ENV === 'development') {
    host = '//admin.fangcunhulian.cn';
    hostUCenter = '//www.fangcunhulian.cn';

    dev = '?dev_user=chenshigang&display=json';
    domain = 'localhost';
    // domain = '192.168.1.25'
} else if (process.env.NODE_ENV == 'testing') {
    host = '//doctordb.fangcunhulian.cn/api';
    hostUCenter = '//www.fangcunhulian.cn';
    domain = 'fangcunhulian.cn'
}

module.exports = {
    host: host,
    hostUCenter: hostUCenter,
    dev: dev,
    domain: domain
}
