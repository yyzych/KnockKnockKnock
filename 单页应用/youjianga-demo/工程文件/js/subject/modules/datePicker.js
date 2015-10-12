/*
* 日期插件
*/
(function ($) {
	//可以在这里定义变量，函数

	//使用$或jQuery都可以，jQuery是全局的。也可以引用------如何做到的？？
	$.fn.picker=function (options) {
		//也可以在这里定义默认参数。各有好坏，自己斟酌
		options=$.extend($.fn.picker.defaultOpts, options);
		var datePicker=document.getElementById(options.datePickerId);//就是this啊！！
		var selectYear=datePicker.getElementsByTagName('select')[0];//getElementById();没有定义？？
		var selectMonth=datePicker.getElementsByTagName('select')[1];

		function initSelect (beginYear,endYear,elem) {
			// var selectYear=elem.getElementsByTagName('select')[0];//getElementById();没有定义？？
			// var selectMonth=elem.getElementsByTagName('select')[1];
			var curYear=(new Date()).getFullYear();
			var curMon=(new Date()).getMonth()+1;
			with(selectYear){
				length=0;
				for (var i = endYear,j=0; i >=beginYear; i--,j++) {
					options[j]=new Option(i,i);
					if(i==curYear){
						options[j].selected=true;
					}
				};
			};
			with(selectMonth){
				length=0;
				for (var i = 1; i <= 12; i++) {
					options[i-1]=new Option(i,i);
					if(i==curMon){
						options[i-1].selected=true;
					}
				};
			}

			selectYear.onchange=function (event) {
				var year=selectYear.options[selectYear.selectedIndex].value;
				var month=selectMonth.options[selectMonth.selectedIndex].value;
				initAMonthDay(year,month,elem);
			};
			selectMonth.onchange=function (event) {
				var year=selectYear.options[selectYear.selectedIndex].value;
				var month=selectMonth.options[selectMonth.selectedIndex].value;
				initAMonthDay(year,month,elem);
			};

			initAMonthDay(curYear,curMon,elem);
		}

		function initAMonthDay (year,month,elem) {//month是从1开始的
			var tbody=elem.getElementsByTagName("tbody")[0];
			tbody.innerHTML="<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>"
			var theMon=new Date(year,month-1);
			var days=(new Date(year,month,0)).getDate();//总共几天
			var firDay=theMon.getDay();//从0开始,0是星期日，1是星期一
			var num=1,
				flag=false,
				curYear=(new Date()).getFullYear(),
				curMon=(new Date()).getMonth()+1;
			for (var i = 1; i <= 6; i++) {
				tbody.insertRow(i);
				for (var j = 0; j < 7; j++) {
					tbody.rows[i].insertCell(j);
					if(i==1&&j<firDay){
						continue;
					}
					tbody.rows[i].cells[j].appendChild(document.createTextNode(num));
					if(year==curYear&&month==curMon){
						var day=(new Date()).getDate();//从1开始
						if(day==num){
							tbody.rows[i].cells[j].className="today";
						}
					}
					num++;
					if(num>days){
						flag=true;
						j++;
						while(j<7){
							tbody.rows[i].insertCell(j);
							j++;
						}
						break;
					}
				};
				if(flag==true)break;
			};
		}
		
		initSelect(options.beginYear,options.endYear,datePicker);

		datePicker.onclick=function (event) {
			var target=event.target;
			if(target.nodeName.toLowerCase()==="td"&&target.lastChild.nodeValue!=""){
				var year=selectYear.options[selectYear.selectedIndex].value;
				var month=selectMonth.options[selectMonth.selectedIndex].value;
				var day=$(target).text();
				$("#"+options.inputTextId).val(year+options.splitChar+month+options.splitChar+day);//
			}
			event.stopPropagation();
		}

	};
	$.fn.picker.defaultOpts={
		left:0,
		top:0,
		splitChar:'-',
		beginYear:1994,
		endYear:new Date().getFullYear(),
		datePickerId:"",
		inputTextId:""
	}
})(jQuery);