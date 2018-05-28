!function(win){
  "use strict";
  var Cal = function(){
  	var args = arguments[0];
		for(var i in args) {
			this[i] = args[i]; //一种快捷的初始化配置
		}
		//直接进行函数初始化，表示生成实例对象就会执行初始化
		this.init();
  }
  Cal.prototype = {
  		constructor: Cal,
  		init:function(){
  			var iYear = this.iYear || new Date().getFullYear();
  			var iMonth = this.iMonth || (new Date().getMonth()+1);
  			var iDay = this.iDay || new Date().getDate();
  			var str = this.drawCal(iYear,iMonth,iDay,this.signList);
  			document.getElementById(this.wrapId).innerHTML = str;
  		},
  		getDaysInmonth: function(iMonth, iYear) {
					var dPrevDate = new Date(iYear, iMonth, 0);
					return dPrevDate.getDate();
				},
			bulidCal: function(iYear, iMonth) {
				  var aMonth = new Array();
					aMonth[0] = new Array(7);
					aMonth[1] = new Array(7);
					aMonth[2] = new Array(7);
					aMonth[3] = new Array(7);
					aMonth[4] = new Array(7);
					aMonth[5] = new Array(7);
					aMonth[6] = new Array(7);
					var dCalDate = new Date(iYear, iMonth - 1, 1);
					var iDayOfFirst = dCalDate.getDay();
					var iDaysInMonth = this.getDaysInmonth(iMonth, iYear);
					var lastMonthDay = this.getDaysInmonth(iMonth-1, iYear);
					var iVarDate = 1,nextVarDate = 1;
					var d, w;
					aMonth[0][0] = "日";
					aMonth[0][1] = "一";
					aMonth[0][2] = "二";
					aMonth[0][3] = "三";
					aMonth[0][4] = "四";
					aMonth[0][5] = "五";
					aMonth[0][6] = "六";
					for(d =0;d<iDayOfFirst;d++){
						aMonth[1][d] = {day:lastMonthDay-(iDayOfFirst - (d+1)),isnow:false};
					}
					for(d = iDayOfFirst; d < 7; d++) {
						aMonth[1][d] = {day:iVarDate,isnow:true};
						iVarDate++;
					}
					for(w = 2; w < 7; w++) {
						for(d = 0; d < 7; d++) {
							if(iVarDate <= iDaysInMonth) {
								aMonth[w][d] = {day:iVarDate,isnow:true};
								iVarDate++;
							}else{
								aMonth[w][d] = {day:nextVarDate,isnow:false};;
								nextVarDate++
							}
						}
					}
					return aMonth;
				},
				ifHasSigned: function(signList, day) {
					var signed = false;
					for(var i =0;i<signList.length;i++){
						var date = new Date(signList[i].signDate);
						if(date.getDate() == day) {
							signed = true;
							return false;
						}
					}
					return signed;
				},
				drawCal: function(iYear, iMonth,iDay,signList) {
					var currentYearMonth = iYear + "-" + iMonth + "-"+iDay;
					var myMonth = this.bulidCal(iYear, iMonth);
					var htmls = new Array();
					htmls.push("<div class='sign_main' id='sign_layer'>");
					htmls.push("<div class='sign_succ_calendar_title'>");
					htmls.push("<a class='sign_succ_calendar_close'>");
					htmls.push("</a>");
					htmls.push("<div class='sign_succ_calendar_bg'>");
					htmls.push("</div>");
					htmls.push("<div class='calendar_month_span'>" + currentYearMonth + "</div>");
					htmls.push("</div>");
					htmls.push("<div class='sign' id='sign_cal'>");
					htmls.push("<table class='table'>");
					htmls.push("<thead><tr>");
					htmls.push("<th>" + myMonth[0][0] + "</th>");
					htmls.push("<th>" + myMonth[0][1] + "</th>");
					htmls.push("<th>" + myMonth[0][2] + "</th>");
					htmls.push("<th>" + myMonth[0][3] + "</th>");
					htmls.push("<th>" + myMonth[0][4] + "</th>");
					htmls.push("<th>" + myMonth[0][5] + "</th>");
					htmls.push("<th>" + myMonth[0][6] + "</th>");
					htmls.push("</tr></thead>");
					var d, w,ifHasSigned;
					for(w = 1; w < 7; w++) {
						htmls.push("<tr>");
						for(d = 0; d < 7; d++) {
							if(signList){
								ifHasSigned	= this.ifHasSigned(signList, myMonth[w][d].day);
							}
							if(ifHasSigned) {
								htmls.push("<td class='on'><div class='day_wrap'>" + (!isNaN(myMonth[w][d].day) ? myMonth[w][d].day : " ") + "</div></td>");
							} else {
								htmls.push("<td><div class='day_wrap'>" + (!isNaN(myMonth[w][d].day) ? myMonth[w][d].day : " ") + "</div></td>");
							}
						}
						htmls.push("</tr>");
					}
					htmls.push("</table>");
					htmls.push("</div>");
					htmls.push("</div>");
					return htmls.join('');
				}
  };
  win.Cal = Cal;
}(window);