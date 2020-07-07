'use strict';

/********************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date    *
 *                                                                                          *
 ********************************************************************************************/


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
   const data = new Date(value);
   return data;
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
   const data = new Date(value);
   return data;
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
   const data = date.getFullYear();
   if (data % 400 === 0 || (data % 4 === 0 && data % 100 !== 0)) { return true; }
   return false;
}


/**
 * Returns the string represention of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
   let hours = (endDate.getDay() - startDate.getDay()) * 24 + endDate.getHours() - startDate.getHours();
   if (hours < 10) hours = '0' + hours;
   let minutes = endDate.getMinutes() - startDate.getMinutes();
   if (minutes < 10) minutes = '0' + minutes;
   let seconds = endDate.getSeconds() - startDate.getSeconds();
   if (seconds < 10) seconds = '0' + seconds;
   let milsec = endDate.getMilliseconds() - startDate.getMilliseconds();
   if (milsec < 100 && milsec >= 10) milsec = '0' + milsec;
   if (milsec < 10) milsec = '00' + milsec;
   return `${hours}:${minutes}:${seconds}.${milsec}`;

//    let hours  = (endDate.getHours()- startDate.getHours()).toString();
//   if (hours.length < 2) hours = "0" + hours;

//   let minutes  = (endDate.getMinutes()- startDate.getMinutes()).toString();
//   if (minutes.length < 2) minutes = "0" + minutes;
//   let second = (endDate.getSeconds() - startDate.getSeconds()).toString();
//   if ( second.length < 2 )  second = "0" + second;

//    var milsec = (endDate.getMilliseconds() - startDate.getMilliseconds()).toString();
//    if (milsec.length == 1) milsec = "00" + milsec;
//    else if (milsec.length == 2) milsec = "0" + milsec;

//    return hours + ":" + minutes + ":" + second + "." + milsec; 
}


/**
 * Returns the angle (in radians) between the hands of an analog clock for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 * 
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
   const hour = date.getUTCHours() > 12 ? date.getUTCHours() - 12 : date.getUTCHours();
   const minutes = date.getUTCMinutes() * 6;
   const hours = 0.5 * (60 * hour + date.getUTCMinutes());
   const angle = hours - minutes > 180 ? hours - minutes - 180 : hours - minutes;
   return (Math.PI * Math.abs(angle)) / 180;
}


module.exports = {
    parseDataFromRfc2822: parseDataFromRfc2822,
    parseDataFromIso8601: parseDataFromIso8601,
    isLeapYear: isLeapYear,
    timeSpanToString: timeSpanToString,
    angleBetweenClockHands: angleBetweenClockHands
};
