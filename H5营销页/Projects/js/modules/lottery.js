/*
* lottery.js-canvas擦除效果js
*/

define(function (require,exports,module) {
	var getElemById=document.getElementById,
		slice=Array.prototype.slice,
		doc=document;

	function Lottery (opt) {
		this.lottery=opt.lottery||"";
		this.lotteryType=opt.lotteryType||"image";
		this.height=opt.height||0;
		this.width=opt.width||0;
		this.ctx=null;
		this.canvas=null;
		this.conWrap=null;
		this.enable=!0;
		this.complate=opt.complate||function(){};
		
		this.init();
	}
	Lottery.prototype={
		init:function () {
			var that=this;
			if(that.lotteryType==="image"&&that.lottery===""){
				that.enable=!1;
				return;
			}
			that.conWrap=that.createElement("section",{className:"app-canvas-wrap"});
			that.canvas=that.createElement("canvas",{className:"app-canvas",width:that.width,height:that.height,innerHTML:"你的浏览器不支持canvas"});
			that.canvas.style.cssText="background-color:transparent;height:100%";
			that.canvas&&that.conWrap&&that.conWrap.appendChild(that.canvas),doc.body.appendChild(that.conWrap);
			that.ctx=that.canvas.getContext("2d");
			that.lotteryType==="image"?that.drawImage():that.drawColor();
			that.bindEvent();
		},
		createElement:function (type,attrs) {
			var res=doc.createElement(type);
			for(var prop in attrs){
				if(attrs.hasOwnProperty(prop)){
					res[prop]=attrs[prop];
				}
			}
			return res;
		},
		drawColor:function () {
			var that=this,
				ctx=that.ctx;
			ctx.clearRect(0,0,that.width,that.height);
			ctx.fillStyle=that.lottery||"#000";
			ctx.fillRect(0,0,that.width,that.height);
			ctx.globalCompositeOperation="destination-out";
		},
		drawImage:function () {
			var that=this;
			var img=new Image();
			img.onload=function () {
				that.ctx.clearRect(0,0,that.width,that.height);
				that.ctx.drawImage(img,0,0,this.width,this.height,0,0,that.width,that.height);
				that.ctx.globalCompositeOperation="destination-out";
			}
			img.src=that.lottery;
		},
		bindEvent:function () {
			var that=this;
			var startX=0,
				startY=0,
				lastX=0,
				lastY=0,
				firstTouch=!1,
				isStart=!1;
			that.canvas.addEventListener("touchstart",function (e) {
				if(!that.enable) return;
				isStart=!0;
				startX=lastX=e.touches[0].pageX,startY=startY=e.touches[0].pageY;
				that.drawPoint({x:startX,y:startY});
			});
			that.canvas.addEventListener("touchmove",function (e) {
				if(isStart){
					that.drawLine({x:e.touches[0].pageX, y:e.touches[0].pageY});
					lastX=e.touches[0].pageX;
					lastY=e.touches[0].pageY;
				}
			});
			that.canvas.addEventListener("touchend",function (e) {
				isStart=!1;
				lastX=0,lastY=0;
				if(that.getAlphaPrecent()){
					that.hide();
				}
			});

			window.addEventListener("resize",function (e) {
				that.resize(doc.body.clientWidth,doc.body.clientHeight);
			});
		},
		drawPoint:function (point) {
			var ctx=this.ctx;
			ctx.beginPath();
			ctx.arc(point.x,point.y,30,0,2*Math.PI);
			ctx.closePath();
			ctx.fill();
			ctx.beginPath();//这句不能少！？不然会把画的圆也给stroke的
			ctx.fillStyle="white";
			ctx.strokeStyle="white";
			ctx.lineWidth="60";
			ctx.lineCap="round";
			ctx.lineJoin="round";
			ctx.lineTo(point.x,point.y);//这句去掉效果不好，lineTo是接上一点的，这里要先画一个
			// ctx.stroke();
		},
		drawLine:function (curPoint,firstTouch) {
			var ctx=this.ctx;
			ctx.lineTo(curPoint.x,curPoint.y);
			ctx.stroke();;
		},
		resize:function (width,height) {
			this.ctx.clearRect(0,0,this.height,this.width);
			this.height=height;
			this.width=width;
			this.canvas.height=height;
			this.canvas.width=width;
			this.lotteryType==="image"?this.drawImage():this.drawColor();
		},
		getAlphaPrecent:function () {
			var imgData=this.ctx.getImageData(0,0,this.width,this.height).data;
			var total=0;
			for (var i = 3; i < imgData.length; i+=4) {
				if(imgData[i]<1){
					total++;
				}
			};
			if(total*4/imgData.length>0.5) return true;
			return false;
		},
		hide:function () {
			var that=this;
			that.conWrap.style.webkitTransition="opacity .5s linear";
			that.conWrap.style.opacity="0";
			setTimeout(function () {
				that.conWrap.classList.add("z-hide");
				that.complate();		
			},500);
		}
	}

	module.exports=Lottery;
})