/*
関数概要：Googleカレンダー上で明日アポがあるユーザー全員にリマインドを送信
*/
function remindAppointment() {

  //Googleカレンダーから明日の予定を取得
  var now = new Date();
  var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  var events = CALENDER.getEventsForDay(tomorrow); //配列として予定を取得
  var length = events.length; //予定の数を取得
  
  //予定のある人全員にリマインドメッセージを送信
  for(var i=0; i<length; i++) {
    var event = events[i];
    var start = event.getStartTime();
    var end = event.getEndTime();
    
    var userId = event.getDescription(); //ユーザーIDをカレンダーの説明文に記録しているため、それを呼び出し
    var startTime = start.getHours() + ':' + ('0' + start.getMinutes()).slice(-2); //取得した時間を'13:00'のような表記に変更
    var endTime = end.getHours() + ':' + ('0' + end.getMinutes()).slice(-2); //取得した時間を'14:00'のような表記に変更
    var message = '明日' + startTime + '~' + endTime + 'に面談よろしくお願い致します！'; //例：'明日13:00~14:00に面談よろしくお願い致します！'
    pushMessage(userId, message); //メッセージ送信
  }
}

/*
関数概要：ユーザーにLINEでメッセージ送信
引数：userId: LINEのユーザーID, message: 送信したいメッセージ
戻り値：LineMessagingAPIからのレスポンス、ステータスコード200と空のJSONオブジェクトを返す
参考：https://developers.line.biz/ja/reference/messaging-api/#send-push-message
*/
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
