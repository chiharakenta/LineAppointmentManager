var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
var token = ss.getRange(1,2).getValue();
var calenderId = ss.getRange(2,2).getValue();
var calender = CalendarApp.getCalendarById(calenderId);
var imageFileId = ss.getRange(3,2).getValue();