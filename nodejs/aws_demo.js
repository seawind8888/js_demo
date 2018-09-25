const AWS = require('aws-sdk/global');
const path = require('path')

const myBucket = 'media.dailycoinworld.com';
const myKey = path.resolve('.nuxt/dist');
var creds = new AWS.SharedIniFileCredentials();
console.log('creds',creds)
AWS.config.credentials = creds;
// AWS.config.update({
//     region: 'ap-southeast-1',
//     credentials: new AWS.SharedIniFileCredentials({profile: 'work-account'})
// });

const s3 = new AWS.S3();




let params = {
  Bucket: myBucket
  // Key: myKey,
  // Body: 'Hello!'
};
s3.getBucketAcl(params, function (err, data) {
  console.log('getBucketAcl', err, data);
});
// let aws = s3.putObject(params, function (err, data) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("Successfully uploaded data to myBucket/myKey");
//   }
// });
// module.exports = aws