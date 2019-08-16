var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
var token = ss.getRange(1,2).getValue();
var calenderId = ss.getRange(2,2).getValue();
var calender = CalendarApp.getCalendarById(calenderId);


/* リマインド */
function remindAppointment() {
  var now = new Date();
  var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  var events = calender.getEventsForDay(tomorrow);
  
  var length = events.length;
  
  for(var i=0; i<length; i++) {
    var event = events[i];
    var title = event.getTitle();
    var start = event.getStartTime();
    var end = event.getEndTime();
    
    var userId = event.getDescription();
    
    var userName = title.split(' ')[0];
    var startTime = start.getHours() + ':' + ('0' + start.getMinutes()).slice(-2);
    var endTime = end.getHours() + ':' + ('0' + end.getMinutes()).slice(-2);
    var message = '明日' + startTime + '~' + endTime + 'に面談よろしくお願い致します！';
    pushMessage(userId, message);
  }
}

function pushMessage(userId, message) {
  var url = "https://api.line.me/v2/bot/message/push";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + token,
  };
  var postData = {
    "to": userId,
    "messages":[
        {
            "type":"text",
            "text": message
        }
    ]
  };
  var options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(postData)
  };
  return UrlFetchApp.fetch(url, options);
}
/* リマインド終わり */


/* 予定作成 */
function doPost(e) {
  var params = JSON.parse(e.postData.getDataAsString());
  var event = params.events[0];
  var storeId = event.postback.data.replace('storeId=', '');
  if(storeId == '12345') {
    var userId = event.source.userId
    var userName = getUserName(userId);
    var dateTime = event.postback.params.datetime;
    createAppointment(userId, userName, dateTime);
  }
}

function getUserName(userId) {
  var url = 'https://api.line.me/v2/bot/profile/' + userId;
  var options = {
    "headers": {
      "Authorization" : "Bearer " + token
    }
  }
  var response = UrlFetchApp.fetch(url, options);
  var userName = JSON.parse(response).displayName;
  return userName
}

function createAppointment(userId, userName, dateTime) {
  var title = userName + ' 面談';
  var startTime = new Date(dateTime);
  var endTime = new Date(dateTime);
  endTime.setHours(endTime.getHours() + 1);;
  var options = {
    "description": userId
  }
  calender.createEvent(title, startTime, endTime, options);
}

/* 予定作成終わり */
