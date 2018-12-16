var async = require('async');

var diaryEntries = [];

class DiaryEntry {
  constructor( date, waterinlitter, efficiency, healthy, mood, sleepinhour) {
    this.november = {};
    this.november.S = "entry"; //primary key has to be string because I select string when create table. 
    this.date = {}; 
    this.date.S = new Date(date).toDateString();
    this.waterinlitter = {}; 
    this.waterinlitter.N = waterinlitter.toString();
    this.efficiency = {};
    this.efficiency.S = efficiency;
    this.healthy = {};
    this.healthy.BOOL = healthy; 
    this.mood = {};
    this.mood.S = mood; 
    this.sleepinhour = {};
    this.sleepinhour.N = sleepinhour.toString(); //this transfer number to string.
  }
}


diaryEntries.push(new DiaryEntry("October 13, 2018", "1", "low", false, "Met Enjung for group project and feeling relax in a Saturday, but did not finish much work. feeling down", "8"));
diaryEntries.push(new DiaryEntry("October 14, 2018", "0.48", "media", true, "Busy Sunday, have to catch up all homework for the new week", "5"));
diaryEntries.push(new DiaryEntry("October 15, 2018", "0.78", "high", true, "It's a cold day and hot water is perfect. In good mood today because I finished work and drank a lot of water" , "6.5"));
diaryEntries.push(new DiaryEntry("October 16, 2018", "1.5", "high", true, "It's a cold day and hot water is perfect. In good mood today because I finished work and drank a lot of water", "6"));
diaryEntries.push(new DiaryEntry("October 17, 2018", "0.75", "high", true, "Feeling tired because it's a super busy day and I was in rush the whole day. Almost no time for water", "6"));
diaryEntries.push(new DiaryEntry("October 18, 2018", "0.75", "medium", false, "Sleep little today but have lots of task. Feeling dizzy and thirsty", "4.5"));
diaryEntries.push(new DiaryEntry("October 19, 2018", "1.5", "high", true, "A very busy day. I decide to increase my daily water consumption to see what's the difference", "6"));
diaryEntries.push(new DiaryEntry("October 20, 2018", "1.5", "high", true, "A nice Saturday. Went to the gym and finished my daily tasks. Drank more water after working out.", "8"));
diaryEntries.push(new DiaryEntry("October 21, 2018", "0.5", "low", false, "Not feeling so well and slept a long time. Not an efficient day.Bad mood.", "10"));
diaryEntries.push(new DiaryEntry("October 22, 2018", "0.8", "high", false, "Not feeling so well and slept a long time. Not an efficient day.Bad mood.", "5"));
diaryEntries.push(new DiaryEntry("October 23, 2018", "1.8", "high", true, "It's a cold day and hot water is perfect. In good mood today because I finished work and drank a lot of water", "6"));
diaryEntries.push(new DiaryEntry("October 24, 2018", "1.2", "medium", true, "Nothing special today", "6.5"));
diaryEntries.push(new DiaryEntry("October 25, 2018", "0.5", "high", true, "Nothing special today", "6"));
diaryEntries.push(new DiaryEntry("October 26, 2018", "1", "high", true, "It's my sister's birthday and had a great party. Too excited to sleep", "4"));
diaryEntries.push(new DiaryEntry("October 27, 2018", "1.2", "high", true, "Relaxing Saturday. Read some book. Stay at home", "8"));
diaryEntries.push(new DiaryEntry("October 28, 2018", "0.5", "high", false, "Homeworks. A lot of homework. Did laundry and housekeepingm busy.Very tired.", "6"));
diaryEntries.push(new DiaryEntry("October 29, 2018", "1", "high", true, "Went to dentist after class. Nothing special", "5.5"));
diaryEntries.push(new DiaryEntry("October 30, 2018", "0.75", "high", true, "Stay up late to finish design work. Shoud drink more water", "5"));
diaryEntries.push(new DiaryEntry("October 31, 2018", "1.2", "high", true, "Did not dress up for Halloween, but joined the Parade. Happy.", "6"));
diaryEntries.push(new DiaryEntry("December 1, 2018", "0.8", "low", true, "Relax at home and did some housekeeping. I found I generally drink less water at home","7"));
diaryEntries.push(new DiaryEntry("December 2, 2018", "1.5", "high", true, "Finished lots of work and then went to the design museum. Have fun.  ","6"));

 var AWS = require('aws-sdk');
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = process.env.IAM_ID;
    AWS.config.secretAccessKey = process.env.IAM_KEY;
    AWS.config.region = "us-east-2"; //are in ohio

var dynamodb = new AWS.DynamoDB();

//Part3
async.eachSeries(diaryEntries, function(value, callback) { //loop and call back;
    var params = {};
    params.Item = value; 
    params.TableName = "DearDiaryFinal";

    dynamodb.putItem(params, function (err) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log("Item inserted!");           // successful response, check weather or not data is imput successfully. Specify primary key so I know which one is successful.
    });
  

  setTimeout(callback, 2000);
});
