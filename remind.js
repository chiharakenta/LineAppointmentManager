/* リマインド */
function remindAppointment() {
  var now = new Date();
  var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  var events = CALENDER.getEventsForDay(tomorrow);
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
    'Authorization': 'Bearer ' + TOKEN,
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
