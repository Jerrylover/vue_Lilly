// var host = '//admin.fangcunyisheng.com';
// var hostUCenter = '//www.fangcunyisheng.com';
var host = '//doctor.fangcunyisheng.com/api';
var dev = '?display=json';
var domain = 'fangcunyisheng.com';
if (process.env.NODE_ENV === 'development') {
    host = '//admin.fangcunhulian.cn';

    dev = '?dev_user=fanghanwen&display=json';
    domain = 'localhost';
    // domain = '192.168.1.25'
} else if (process.env.NODE_ENV == 'testing') {
    host = '//doctor.fangcunhulian.cn/api';
    domain = 'fangcunhulian.cn'
}

export default {
    host: host,
    dev: dev,
    domain: domain
}
