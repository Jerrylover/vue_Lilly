// var host = '//admin.fangcunyisheng.com';
// var hostUCenter = '//www.fangcunyisheng.com';
var host = '//admin.fangcunyisheng.com/api';
var hostUCenter = '//www.fangcunyisheng.com';
var dev = '?display=json';
var domain = 'fangcunyisheng.com';
if (process.env.NODE_ENV === 'development') {
    host = '//admin.fangcunhulian.cn';
    hostUCenter = '//www.fangcunhulian.cn';

    dev = '?dev_user=chenshigang&display=json';
    domain = 'localhost';
} else if (process.env.NODE_ENV == 'testing') {
    host = '//admin.fangcunhulian.cn/api';
    hostUCenter = '//www.fangcunhulian.cn';
    domain = 'fangcunhulian.cn'
}

module.exports = {
    host: host,
    hostUCenter: hostUCenter,
    dev: dev,
    domain: domain
}
