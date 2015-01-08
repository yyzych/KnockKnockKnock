/*
 * 游戏场景类
 * 通过判断每张图片的位置是否与原来一样来判断是否拼图完成
 * 依赖于Tool和DragDrop模块
 */

define(function (require,exports,module) {
	var Tool=require("./Tool");
	var DragDrop=require("./DragDrop");

	var PlaySecen = function() {
	    var $ = Tool.$;
	    var canvas = null,
	    	stepElem=null,
	    	step = 0,//当前关卡
	        corretImgPosi = [],//存储元素及正确的位置
	        imgArray = [],//存储元素---用于随机布局时用
	        posArray = [],//存储元素位置---用于随机布局时用
	        nearElemCss="";

	    function init (opt) {
	        canvas=$(opt.wrap);
	        stepElem=$(opt.step);
	        nearElemCss=opt.nearElemCss;
	    }
	    //图像初始化
	    function renderImg(url) {
	    	//更新、清除数据
	    	step++;
	    	corretImgPosi = [],//存储元素及正确的位置
	    	imgArray = [],//存储元素---用于随机布局时用
	    	posArray = [];//存储元素位置---用于随机布局时用

	        var img = new Image();
	        var near=null,
	        	draggingPosi={},
	            mouseHasMove=false;

	        img.onload = function() {
	            var boxImgHei = Math.floor(img.height / 4),
	                boxImgWid = Math.floor(img.width / 4);
	            canvas.style.width = img.width + "px";
	            canvas.style.height = img.height + "px";
	            canvas.innerHTML = "";

	            var fragment = document.createDocumentFragment();
	            for (var i = 0; i < 4; i++) {
	                for (var j = 0; j < 4; j++) {
	                    var e = Tool.createElement({
	                        tagName: "div",
	                        className: "draggable",
	                        text: ""
	                    });
	                    var bImgLeft = -(j * boxImgWid),
	                        bImgTop = -(i * boxImgHei);
	                    with(e.style) {
	                        width = boxImgWid + "px";
	                        height = boxImgHei + "px";
	                        backgroundImage = "url(" + url + ")";
	                        backgroundPosition = bImgLeft + "px " + bImgTop + "px";
	                        left = -bImgLeft + "px";
	                        top = -bImgTop + "px";
	                    }
	                    e.isMove = false; //表示对象是否在移动中
	                    imgArray.push({
	                        elem: e,
	                        x: -bImgLeft,
	                        y: -bImgTop
	                    });
	                    posArray.push({
	                        x: -bImgLeft,
	                        y: -bImgTop
	                    });
	                    
	                    fragment.appendChild(e);
	                }
	            }

	            //绑定事件
	            DragDrop.init({
	                boundry:{left:0,right:img.width,top:0,bottom:img.height},
	                itemSize:{height:boxImgHei,width:boxImgWid},
	                dragstart:function (event) {
	                    //skip
	                    var dragging=event.target;
	                    dragging.style.zIndex="9";
	                    draggingPosi={
	                        left:parseInt(dragging.style.left),
	                        top:parseInt(dragging.style.top)
	                    };
	                },
	                dragend:function (event) {
	                    var dragging=event.target;
	                    if(mouseHasMove){
	                        var nearElemPosi={
	                            left:parseInt(near.style.left),
	                            top:parseInt(near.style.top)
	                        };
	                        Tool.removeClass(near,nearElemCss);
	                        startMove(near,draggingPosi.left,draggingPosi.top,10);
	                        startMove(dragging,nearElemPosi.left,nearElemPosi.top,10);
	                        // dragging.style.zIndex="1";
	                    }
	                    mouseHasMove=false;
	                },
	                drag:function (event) {
	                    var dragging=event.target;
	                    // Tool.setOpacity(dragging,80);
	                    near=checkMeet(dragging);//获取离拖动元素最近的元素
	                    for (var i = 0; i < corretImgPosi.length; i++) {
	                        Tool.removeClass(corretImgPosi[i].elem,nearElemCss);
	                    };
	                    Tool.addClass(near,nearElemCss);
	                    mouseHasMove=true;
	                }
	            });

	            canvas.appendChild(fragment);
	            corretImgPosi = imgArray.concat(); //保存正确的位置

	            prepareMask();
	        };
	        img.src = url;
	        stepElem.innerHTML=step;
	    }

	    function prepareMask() {
	        var mask = document.createElement("div");
	        mask.id = "mask";
	        mask.style.width = "100%";
	        mask.style.height = "100%";
	        mask.backgroundColor = "#000";
	        Tool.setOpacity(mask, 80);

	        var playBtn = Tool.createElement({
	            className: "btn"
	        });
	        playBtn.onclick = function(event) {
	            canvas.removeChild(mask);
	            playBtn.onclick = null;
	            canvas.removeChild(playBtn);
	            //开始游戏
	            start();
	        };
	        canvas.appendChild(mask);
	        canvas.appendChild(playBtn);
	    }

	    function start() {
	    	var _imgArray=imgArray.concat();
	    	var _posArray=posArray.concat();
	        while (_imgArray.length > 0) {
	            var item = _imgArray.splice(Tool.random(0, _imgArray.length), 1);
	            var css = _posArray.splice(Tool.random(0, _posArray.length), 1);
	            startMove(item[0].elem, css[0].x, css[0].y, 10);
	        }
	    }

	    function startMove(obj, x, y, interval) {
	    	obj.style.zIndex="9";
	        clearInterval(obj.timerId);
	        if (!obj.timerId) {
	            obj.timerId = setInterval(function() {
	                move(obj, x, y);
	            }, interval);
	        }
	    }

	    function move(obj, finalX, finalY) {
	        obj.isMove = true; //什么用？

	        var curX = parseInt(obj.style.left),
	            curY = parseInt(obj.style.top);
	        // 为了让它的值不能在-1~1之间
	        var distX = (curX < finalX ? Math.ceil : Math.floor)((finalX - curX) / 10),
	            distY = (curY < finalY ? Math.ceil : Math.floor)((finalY - curY) / 10);
	        obj.style.left = (curX + distX) + "px";
	        obj.style.top = (curY + distY) + "px";
	        if ((curX == finalX) && (curY == finalY)) {
	            clearInterval(obj.timerId);
	            obj.isMove = false;
	            obj.timerId = null;

	            if (check()) {
	            	if(step>=2){
	            		//自定义图片
	            		alert("拼图成功，第三关可自定义图片");
	            		
	            	}else{
	            		sucessEffect();
	            	}
	            }
	            obj.style.zIndex="1";
	        }
	    }

	    function sucessEffect () {
	    	alert("拼图成功");
	    	var i=0,interval=900;
	    	setTimeout(function () {
	    		start();
	    		i++;
	    		if(i<3){
	    			setTimeout(arguments.callee,interval);
	    		}else{
	    			setTimeout(function () {
	    				renderImg("http://sandbox.runjs.cn/uploads/rs/213/mnpxtazc/02.jpg");
	    			},interval);
	    		}
	    	},10);
	    }

	    // 检验拼图是否完成
	    function check () {
	        for (var i = 0; i < corretImgPosi.length; i++) {
	            var elem=corretImgPosi[i].elem;
	            var curLeft=parseInt(elem.style.left);
	            var curTop=parseInt(elem.style.top);
	            if(curLeft!=corretImgPosi[i].x){
	                return false;
	            }
	            if(curTop!=corretImgPosi[i].y){
	                return false;
	            }
	        }
	        return true;
	    }

	    // 检测与谁相交,判断对象的中心点的距离最近即相交
	    function checkMeet (dragging) {
	        var maxVal=1000000,index=-1;
	        for (var i = 0; i < corretImgPosi.length; i++) {
	            var elem=corretImgPosi[i].elem;
	            if(elem!=dragging){
	                var dist=getDistance(dragging,elem);
	                if(dist<maxVal){
	                    maxVal=dist;
	                    index=i;
	                }
	            }
	        }
	        return corretImgPosi[index].elem;
	    }

	    function getDistance (obj1,obj2) {
	        var a = (obj1.offsetLeft + obj1.offsetWidth / 2) - (obj2.offsetLeft + obj2.offsetWidth / 2);
	        var b = (obj1.offsetTop + obj1.offsetHeight / 2) - (obj2.offsetTop + obj2.offsetHeight / 2);
	        return Math.ceil(Math.sqrt(a * a + b * b));
	    }

	    return {
	        init:function (opt) {
	            init(opt);
	        },
	        run:function (url) {
	            renderImg(url);
	        }
	    }
	}();

	module.exports=PlaySecen;
})