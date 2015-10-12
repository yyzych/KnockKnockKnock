/*
* slidePlugin.js-水平滑动
*/

define(function (require,exports,module) {
	var util=require("./util");

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
	
	function Slide (opt) {
		this.tarElem=null;
		this.width=0;
		this.parElem=null;
		this.maxLeftNum=0;
		this.curLeftNum=0;

		this.lis=null;
	}
	Slide.prototype.slide=function (opt) {
		var that=this;
		var curOpt=util.extend(defOpt,opt);
		that.tarElem=$(curOpt.tarElem);
		if(!curOpt.leftTrigger||!that.tarElem) return;
		if(!curOpt.parElem){
			var ans=that.tarElem.parent;
			var wrap=document.createElement("div");
			wrap.className="slideBox";
			wrap.appendChild(tarElem);
			ans.appendChild(wrap);
			that.parElem=$(wrap);
		}else{
			that.parElem=$(curOpt.parElem)||null;
		}
		that.init(opt);
		that.bindTrigger(curOpt);
	}
	Slide.prototype.init=function (opt) {
		var lis=$(opt.titCell);
		this.lis=lis;
		if(lis){
			var titWidth=lis[0].offsetWidth||null,
				titHeight=lis[0].offsetHeight||null;
			var marLeft=util.getCss(lis[0],"marginLeft");
			if(typeof titWidth =="number"){
				titWidth+=2*parseInt(marLeft);
				this.tarElem.css({
					width:titWidth*lis.length
				});
				this.width=titWidth;
			}
			this.parElem.css({
				height:titHeight,
				overflow:"hidden",
				position:"relative"
			});
			this.maxLeftNum=(lis.length-opt.showNum)<0?0:lis.length-opt.showNum
		}
	}
	Slide.prototype.reload=function () {
		var lis=this.lis;
		if(lis){
			var titWidth=lis[0].offsetWidth||null,
				titHeight=lis[0].offsetHeight||null;
			var marLeft=util.getCss(lis[0],"marginLeft");
			if(typeof titWidth =="number"){
				titWidth+=2*parseInt(marLeft);
				this.tarElem.css({
					width:titWidth*lis.length,
					left:0
				});
				this.curLeftNum=0;
				this.width=titWidth;
			}
			this.parElem.css({
				height:titHeight
			});
			// this.maxLeftNum=(lis.length-opt.showNum)<0?0:lis.length-opt.showNum
		}
	}
	Slide.prototype.bindTrigger=function (opt) {
		var that=this;
		switch(opt.triggerType){
			case "mouseover":
				break;
			case "click":
			default:
				$(opt.leftTrigger).click(function (e) {
					that.handler(e||null,opt,"left");
				});
				$(opt.rightTrigger).click(function (e) {
					that.handler(e||null,opt,"right");
				});
		}
	}
	Slide.prototype.handler=function (e,opt,direction) {
		var str="";
		if(direction=="left"&&this.curLeftNum>0){
			str="+="+this.width+"px"
			this.curLeftNum--;
		}else if(direction=="right"&&this.curLeftNum<this.maxLeftNum){
			str="-="+this.width+"px";
			this.curLeftNum++;
		}
		if(str){
			$(this.tarElem).animate({
				left:str
			},opt.duration,opt.callback);
		}
	}

	module.exports=Slide;
})