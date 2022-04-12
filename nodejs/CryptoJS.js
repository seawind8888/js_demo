let CryptoJS = require('crypto-js');
// let moment = require('moment');

// const username = 'haifeng.wang'
// const secret = '7ujhYTRfvDE3wSXc';

// const accountName = 'yys'


// let expireTime = moment().add(15, 'm').format('x');
// let sign = CryptoJS.MD5(`${username}${secret}${expireTime}${accountName}`);



// console.log(`/single_sign_on_check?kfxt_appkey=KFXT&kfxt_member_name=${username}&kfxt_sign=${sign}&kfxt_time=${expireTime}&kfxt_user_name=${accountName}`)
const sign = CryptoJS.MD5('数云食堂:惠思彤8.06202818d80bea8003daf3bf7efhj7518930c2eeffd913561849722037').toString()
console.log(sign)