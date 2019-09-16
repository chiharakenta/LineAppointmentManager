/*
関数概要：LINEのメニューから予定が入れられた時にカレンダーに予定を作成
引数：e postメソッドで送られてきた値
*/
function doPost(e) {
  var params = JSON.parse(e.postData.getDataAsString());
  var event = params.events[0];
  var data = event.postback.data; //LINEから送られてきたイベントの種類を識別するデータ

  //受け取ったイベントがリッチメニューからの時間送信だった場合実行
  if(data == 'appointment') {
    var userId = event.source.userId
    var userName = getUserNameById(userId);
    var dateTime = event.postback.params.datetime;
    Logger.log(createAppointment(userId, userName, dateTime));
  }
}


/*
関数概要：IDを元にLINEのユーザー名を取得
引数：userId LINEのユーザーID
戻り値：userName LINEのユーザー名
参考：https://developers.line.biz/ja/reference/messaging-api/#get-profile
*/
function getUserNameById(userId) {
  var url = 'https://api.line.me/v2/bot/profile/' + userId;
  var options = {
    "headers": {
      "Authorization" : "Bearer " + TOKEN
    }
  }
  var response = UrlFetchApp.fetch(url, options);
  var userName = JSON.parse(response).displayName;
  return userName
}


/*
関数概要：Googleカレンダーにアポイントの予定を作成
引数：userId LINEのユーザーID, userName LINEのユーザー名, dateTime LINEのリッチメニューから送られてきた時刻
戻り値：GASのcreateEvent関数のレスポンス、成功時に'calenderEvent'を返す
参考：https://developers.google.com/apps-script/reference/calendar/calendar#createEvent(String,Date,Date,Object)
*/
function createAppointment(userId, userName, dateTime) {
  var title = userName + ' 面談'; //例： '山田太郎 面談'
  var startTime = new Date(dateTime);
  var endTime = new Date(dateTime);
  endTime.setHours(endTime.getHours() + 1); //面談が1時間のため、開始時刻から１時間後の時間をセット
  
  var options = {
    "description": userId //予定の説明文にユーザーIDを記録
  }
  return CALENDER.createEvent(title, startTime, endTime, options);
}