/*
関数概要：リッチメニューを初期化する
*/
function handleMenu() {
  deleteAllRichMenus();
  var createRichMenuResponse = createRichMenu();
  var richMenuId = JSON.parse(createRichMenuResponse).richMenuId;
  var uploadRichMenuImageResponse = uploadRichMenuImage(richMenuId);
  var setDefaultRichMenuResponse = setDefaultRichMenu(richMenuId);
  
  Logger.log(createRichMenuResponse);
  Logger.log(uploadRichMenuImageResponse);
  Logger.log(setDefaultRichMenuResponse);
}

/*
関数概要：LINE上で動作するリッチメニューを作成
戻り値：LineMessagingAPIからのレスポンス、ステータスコード200とリッチメニューIDを返す
参考：https://developers.line.biz/ja/reference/messaging-api/#create-rich-menu
*/
function createRichMenu() {
  var url = "https://api.line.me/v2/bot/richmenu";
  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + TOKEN,
  };
  var postData = {
    "size": {
      "width": 2500,
      "height": 1686
    },
    "selected": false,
    "name": "default",
    "chatBarText": "面談開始時間を選択",
    "areas": [
      {
        "bounds": {
          "x": 0,
          "y": 0,
          "width": 2500,
          "height": 1686
        },
        "action": {
          "type":"datetimepicker",
          "label":"面談開始時間を選択",
          "data": "appointment",
          "mode":"datetime"
        }
      }
    ]
  };
  var options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  return UrlFetchApp.fetch(url, options);
}

/*
関数概要：リッチメニューで使用するボタンのアップロード
引数：richMenuId リッチメニューを識別するid
戻り値：LineMessagingAPIからのレスポンス、成功時ステータスコード200と空のJSONオブジェクトを返す
参考：https://developers.line.biz/ja/reference/messaging-api/#upload-rich-menu-image
*/
function uploadRichMenuImage(richMenuId) {
  var url = "https://api.line.me/v2/bot/richmenu/" + richMenuId + "/content";
  var headers = {
    "Content-Type": "image/png",
    'Authorization': 'Bearer ' + TOKEN,
  };
  var imageFile = DriveApp.getFileById(IMAGE_FILE_ID).getBlob();
  
  var options = {
    "method": "post",
    "headers": headers,
    "payload": imageFile
  };
  return UrlFetchApp.fetch(url, options);
}


/*
関数概要：作成したリッチメニューをBotで利用するよう設定
引数：richMenuId リッチメニューを識別するid
戻り値：LineMessagingAPIからのレスポンス
参考：https://developers.line.biz/ja/reference/messaging-api/#set-default-rich-menu
*/
function setDefaultRichMenu(richMenuId){
  var url = "https://api.line.me/v2/bot/user/all/richmenu/" + richMenuId;
  var headers = {
    'Authorization': 'Bearer ' + TOKEN
  }
  var options = {
    "method": "post",
    "headers": headers
  }
  return UrlFetchApp.fetch(url, options);
}


/*
関数概要：現在作成されている全てのリッチメニューを削除
*/
function deleteAllRichMenus() {
  var richMenus = JSON.parse(getMenuList()).richmenus;
  var length = richMenus.length;
  for(var i = 0; i<length; i++) {
    var richMenuId = richMenus[i].richMenuId;
    deleteRichMenuById(richMenuId);
  }
}

/*
関数概要：現在作成されているリッチメニューを全て取得
戻り値：menus 全てのリッチメニューの情報をJSON形式で返す
参考：https://developers.line.biz/ja/reference/messaging-api/#set-default-rich-menu
*/
function getMenuList() {
  var url = "https://api.line.me/v2/bot/richmenu/list";
  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + TOKEN,
  };
  var options = {
    "headers": headers
  };
  var menus = UrlFetchApp.fetch(url, options);
  return menus;
}


/*
関数概要：IDを元にリッチメニューを削除
引数：richMenuId リッチメニューを識別するid
戻り値：LineMessagingAPIからのレスポンス、ステータスコード200と空のJSONオブジェクトを返す
参考：https://developers.line.biz/ja/reference/messaging-api/#unlink-rich-menu-from-user
*/
function deleteRichMenuById(richMenuId) {
  var url = "https://api.line.me/v2/bot/richmenu/" + richMenuId;
  var headers = {
    'Authorization': 'Bearer ' + TOKEN,
    "Content-Type": "image/png",
  };
  var options = {
    "method": "delete",
    "headers": headers
  };
  return UrlFetchApp.fetch(url, options);
}
