var schedule = require('node-schedule');

schedule.scheduleJob('10 * * * * *', function(){
    console.log('This job was supposed to run at , but actually ran at')
  }); 