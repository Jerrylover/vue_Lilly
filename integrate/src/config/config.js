// var host = '//admin.fangcunyisheng.com';
// var hostUCenter = '//www.fangcunyisheng.com';
var host = '//doctor.fangcunyisheng.com/api';
var dev = '?display=json';
var domain = 'fangcunyisheng.com';
if (process.env.NODE_ENV === 'development') {
    host = '//admin.fangcunhulian.cn';

    dev = '?dev_user=chenshigang&display=json';
    domain = 'localhost';
    // domain = '192.168.1.108'
    // domain = '192.168.1.111'
} else if (process.env.NODE_ENV == 'testing') {
    host = '//doctor.fangcunhulian.cn/api';
    domain = 'fangcunhulian.cn'
}

export default {
    host: host,
    dev: dev,
    domain: domain
}
