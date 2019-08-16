var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
var token = ss.getRange(1,2).getValue();
var imageFileId = ss.getRange(3,2).getValue();

function handleMenu() {
  deleteAllRichMenus();
  var createRichMenuResponse = createRichMenu();
  var richMenuId = JSON.parse(createRichMenuResponse).richMenuId;
  var uploadImageResponse = uploadImage(richMenuId);
  var setDefaultRichMenuResponse = setDefaultRichMenu(richMenuId);
  
  Logger.log(createRichMenuResponse);
  Logger.log(uploadImageResponse);
  Logger.log(setDefaultRichMenuResponse);
}


function createRichMenu() {
  var url = "https://api.line.me/v2/bot/richmenu";
  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + token,
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
          "data": "storeId=12345",
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

function uploadImage(richMenuId) {
  var url = "https://api.line.me/v2/bot/richmenu/" + richMenuId + "/content";
  var headers = {
    "Content-Type": "image/png",
    'Authorization': 'Bearer ' + token,
  };
  var imageFile = DriveApp.getFileById(imageFileId).getBlob();
  
  var options = {
    "method": "post",
    "headers": headers,
    "payload": imageFile
  };
  return UrlFetchApp.fetch(url, options);
}

function setDefaultRichMenu(richMenuId){
  var url = "https://api.line.me/v2/bot/user/all/richmenu/" + richMenuId;
  var headers = {
    'Authorization': 'Bearer ' + token
  }
  var options = {
    "method": "post",
    "headers": headers
  }
  return UrlFetchApp.fetch(url, options);
}


function deleteAllRichMenus() {
  var richMenus = JSON.parse(getMenuList()).richmenus;
  var length = richMenus.length;
  for(var i = 0; i<length; i++) {
    var richMenuId = richMenus[i].richMenuId;
    deleteRichMenu(richMenuId);
  }
}


function getMenuList() {
  var url = "https://api.line.me/v2/bot/richmenu/list";
  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + token,
  };
  var options = {
    "headers": headers
  };
  return UrlFetchApp.fetch(url, options);
}


function deleteRichMenu(richMenuId) {
  var url = "https://api.line.me/v2/bot/richmenu/" + richMenuId;
  var headers = {
    'Authorization': 'Bearer ' + token,
    "Content-Type": "image/png",
  };
  var options = {
    "method": "delete",
    "headers": headers
  };
  return UrlFetchApp.fetch(url, options);
}