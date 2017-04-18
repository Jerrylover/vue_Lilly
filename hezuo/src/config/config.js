var host = '//hezuo.fangcunyisheng.com/api';
var dev = '?display=json';
var domain = 'fangcunyisheng.com';
if (process.env.NODE_ENV === 'development') {
    host = '//hezuo.fangcunyisheng.com/api';
    dev = '?dev_user=taoxiaojin&display=json';
    domain = '192.168.1.135';
    // domain = 'localhost';
    // domain = '192.168.1.111';
}else if (process.env.NODE_ENV === 'testing') {
    host = '//dwx.fangcunhulian.com/api';
    domain = 'fangcunhulian.cn';
}

module.exports = {
    host: host,
    dev: dev,
    domain: domain,
}
