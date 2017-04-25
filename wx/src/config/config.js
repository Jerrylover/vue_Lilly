var host = 'https://dwx.fangcunyisheng.com/api';
var dev = '?display=json';
var domain = 'fangcunyisheng.com';
if (process.env.NODE_ENV === 'development') {
    host = 'http://dwx.fangcunhulian.cn/api';
    dev = '?dev_user=xuzhe&display=json';
    // domain = '192.168.1.108';
    // domain = 'localhost';
    domain = '192.168.1.123';
}else if (process.env.NODE_ENV === 'testing') {
    host = 'http://dwx.fangcunhulian.com/api';
    domain = 'fangcunhulian.cn';
}

module.exports = {
    host: host,
    dev: dev,
    domain: domain,
}
