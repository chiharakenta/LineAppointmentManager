var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); //連携中のスプレッドシートを取得
var CALENDER_ID = sheet.getRange(2,2).getValue(); //予定を入れたいGoogleカレンダーのID

var TOKEN = sheet.getRange(1,2).getValue(); //Lineのチャンネルアクセストークン
var CALENDER = CalendarApp.getCalendarById(CALENDER_ID); //予定を入れたいGoogleカレンダーを取得
var IMAGE_FILE_ID = sheet.getRange(3,2).getValue(); //リッチメニューに登録したい画像ファイルのID