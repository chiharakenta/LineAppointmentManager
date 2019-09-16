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