/*
* slidePlugin.js-水平滑动插件
*/

define(function (require,exports,module) {
	var util=require("./util");
	
	var slidePlugin=function () {
		var defOpt={
			leftTrigger:"",
			rightTrigger:"",
			triggerType:"click",
			parElem:"",
			showNum:3,
			tarElem:"",
			titCell: "", //鼠标触发对象
			duration:200,
			callback:function (){}
		};

		var tarElem=null,
			width=0,
			parElem=null,
			maxLeftNum=0,
			curLeftNum=0;

		function slide (opt) {
			var curOpt=util.extend(defOpt,opt);
			tarElem=$(curOpt.tarElem);
			if(!curOpt.leftTrigger||!tarElem) return;
			if(!curOpt.parElem){
				var ans=tarElem.parent;
				var wrap=document.createElement("div");
				wrap.className="slideBox";
				wrap.appendChild(tarElem);
				ans.appendChild(wrap);
				parElem=$(wrap);
			}else{
				parElem=$(curOpt.parElem)||null;
			}
			init(opt);
			bindTrigger(curOpt);
		}

		function init (opt) {
			var lis=$(opt.titCell);
			if(lis){
				var titWidth=lis[0].offsetWidth||null,
					titHeight=lis[0].offsetHeight||null;
				var marLeft=util.getCss(lis[0],"marginLeft");
				if(typeof titWidth =="number"){
					titWidth+=2*parseInt(marLeft);
					// tarElem.style.width=titWidth*lis.length+"px";
					tarElem.css({
						width:titWidth*lis.length
					});
					width=titWidth;
				}
				parElem.css({
					height:titHeight,
					overflow:"hidden",
					position:"relative"
				});
				maxLeftNum=(lis.length-opt.showNum)<0?0:lis.length-opt.showNum
			}
		}

		function bindTrigger (opt) {
			switch(opt.triggerType){
				case "mouseover":
					break;
				case "click":
				default:
					$(opt.leftTrigger).click(function (e) {
						handler(e||null,opt,"left");
					});
					$(opt.rightTrigger).click(function (e) {
						handler(e||null,opt,"right");
					});
			}
		}

		function handler (e,opt,direction) {
			var str="";
			if(direction=="left"&&curLeftNum>0){
				str="+="+width+"px"
				curLeftNum--;
			}else if(direction=="right"&&curLeftNum<maxLeftNum){
				str="-="+width+"px";
				curLeftNum++;
			}
			if(str){
				$(tarElem).animate({
					left:str
				},opt.duration,opt.callback);
			}
		}


		return {
			slide:slide
		};
	}();
	module.exports=slidePlugin;
})