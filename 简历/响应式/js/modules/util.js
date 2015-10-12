/*
* util.js-通用函数类
*/

define(function (require,exports,module) {
	var util={
		getCss:function (elem,cssName,selectorText) {
			var res="";
			if(window.getComputedStyle){
				var cssRule=window.getComputedStyle(elem,null);
				res=cssRule[cssName];
				if(res){
					return res;
				}
			}else if(window.getMatchedCSSRules){
				var cssRuleList=getMatchedCSSRules(elem);
				for (var i = 0; i < cssRuleList.length; i++) {
					var cssList=cssRuleList[i];//一条样式规则
					if(selectorText){
						if(selectorText==cssList.selectorText){
							return cssList.style[cssName];
						}
					}else{
						return cssList.style[cssName];
					}
				};
			}
		},
		extend:function (defObj,curObj) {
			var res={};
			for(var name in defObj){
				if(curObj.hasOwnProperty(name)){
					res[name]=curObj[name];
				}else{
					res[name]=defObj[name];
				}
			}
			return res;
		},
		sleep:function (numberMillis) { 
		   var now = new Date();
		   var exitTime = now.getTime() + numberMillis;  
		   while (true) { 
		       now = new Date(); 
		       if (now.getTime() > exitTime)    return;
		    }
		},
		getTxtShadow:function (num,color) {
			var value="";
			for (var i = 1; i < num; i++) {
				value+=i+"px "+i+"px 0px "+color;
				if(i!=num-1){
					value+=", ";
				}
			}
			return value;
		},
		isMobile:function () {
			var userAgent=navigator.userAgent.toLowerCase();
			var sys={
				isIpad:/ipad/.test(userAgent),
				isIphone:/iphone/.test(userAgent),
				isAndroid:/android/.test(userAgent),
				isWinPhone:/win.+phone/.test(userAgent)
			};
			sys.isPhone=(sys.isIpad||sys.isIphone||sys.isAndroid||sys.isWinPhone)?true:false;
			return sys;
		},
		contains:function (elem1,elem2) {
			if(elem1===elem2){
				return true;
			}
			if(elem1.contains){
				return elem1.contains(elem2);
			}else if(elem1.compareDocumentPosition){
				return !!(elem1.compareDocumentPosition(elem2)&16);
			}else{
				var node=elem2.parentNode;
				do{
					if(node===elem1){
						return true;
					}else{
						node=elem2.parentNode;
					}
				}while(node!==null);
				return false;
			}
		}
	};

	module.exports=util;
})