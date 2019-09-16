var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
var calenderId = sheet.getRange(2,2).getValue();

var TOKEN = sheet.getRange(1,2).getValue();
var CALENDER = CalendarApp.getCalendarById(calenderId);
var IMAGE_FILE_ID = sheet.getRange(3,2).getValue();