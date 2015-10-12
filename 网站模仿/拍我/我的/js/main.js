/*
* main.js
*/

(function (global) {
	global.ajax=function (option) {
		var xHRObj=new AjaxObj(option);
		xHRObj.ajax();
	}

	function nextPageHandle () {
		var curPage=parseInt($(".photos").data("curPage"));
		global.ajax({
			type:"get",
			data:curPage+1,
			url:"data.json",
			callback:function (resData) {
				var nHtml="";
				if (resData.imgList.length>0) {
					for (var i = 0; i < resData.imgList.length; i++) {
						nHtml+='<div class="item">'+
									'<a href=""><img src="'+resData.imgList[i]+'" alt=""></a>'+
									'<div class="fix_box">'+
										'<a href="">叶喽喽</a>'+
										'<a class="icon like" href=""></a>'+
										'<a class="icon collect" href=""></a>'+
									'</div>'+
									'<div class="hover_box">'+
										'<span class="share_box">'+
											'<a class="douban"><img src="img/share_douban.png"></a>'+
											'<a class="qzone"><img src="img/share_qzone.png"></a>'+
											'<a class="renren"><img src="img/share_renren.png"></a>'+
											'<a class="weibo"><img src="img/share_weibo.png"></a>'+
											'<a class="share">'+
												'<i class="icon"></i>'+
											'</a>'+
										'</span>'+
										'<a class="comment" href="">'+
											'<i class="icon"></i>'+
										'</a>'+
									'</div>'+
								'</div>';
					};
					creatEvent();
					$(".photos").data({curPage:resData.curPage}).html(nHtml);
					$("html,body").animate({
						scrollTop: $("body").offset().top
					})
				}else{
					alert("没有更多了");
				}
			}
		});
	}
	function prevPageHandle () {
		var curPage=parseInt($(".photos").data("curPage"));
		global.ajax({
			type:"get",
			data:curPage-1,
			url:"data.json",
			callback:function (resData) {
				var nHtml="";
				if (resData.imgList.length>0) {
					for (var i = 0; i < resData.imgList.length; i++) {
						nHtml+='<div class="item">'+
									'<a href=""><img src="'+resData.imgList[i]+'" alt=""></a>'+
									'<div class="fix_box">'+
										'<a href="">叶喽喽</a>'+
										'<a class="icon like" href=""></a>'+
										'<a class="icon collect" href=""></a>'+
									'</div>'+
									'<div class="hover_box">'+
										'<span class="share_box">'+
											'<a class="douban"><img src="img/share_douban.png"></a>'+
											'<a class="qzone"><img src="img/share_qzone.png"></a>'+
											'<a class="renren"><img src="img/share_renren.png"></a>'+
											'<a class="weibo"><img src="img/share_weibo.png"></a>'+
											'<a class="share">'+
												'<i class="icon"></i>'+
											'</a>'+
										'</span>'+
										'<a class="comment" href="">'+
											'<i class="icon"></i>'+
										'</a>'+
									'</div>'+
								'</div>';
					};
					creatEvent();
					$(".photos").data({curPage:resData.curPage}).html(nHtml);
					$("html,body").animate({
						scrollTop: $("body").offset().top
					})
				}else{
					alert("没有更多了");
				}
			}
		});
	}
	function creatEvent () {
		var items=$(".photos .item");
		// hover:参数1：移入  参数2：移出
		items.hover(function () {
			$(this).children(".hover_box").toggle();
		},function () {
			$(this).children(".hover_box").toggle();
		})
		items.find(".share_box").hover(function () {
			$(this).children(".qzone").css("display","inline-block");
			$(this).children(".douban").css("display","inline-block");
			$(this).children(".renren").css("display","inline-block");
			$(this).children(".weibo").css("display","inline-block");
		},function () {
			$(this).children(".qzone").toggle();
			$(this).children(".douban").toggle();
			$(this).children(".renren").toggle();
			$(this).children(".weibo").toggle();
		})
	}

	global.addEventListener("load",function () {
		$(".photos").data({curPage:1});//设置当前页面的初始值
		creatEvent();
	})
	var $nextPage=$("#nextPage"),
		$prevPage=$("#prevPage");
	$nextPage.click(nextPageHandle);
	$prevPage.click(prevPageHandle);

})(window);

function AjaxObj (option) {
	this.requestObj=this.createXHR();
	this.option=option||null;
}
AjaxObj.prototype={
	createXHR:function () {
		if(typeof XMLHttpRequest !="undefined"){
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject !="undefined"){
			if(!arguments.callee.version){
				var vers=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"];
				for (var i = 0; i < vers.length; i++) {
					try{
						new ActiveXObject(vers[i]);
						arguments.callee.version=vers[i];
						break;
					}catch(err){
						//do nothing
					}
				};
			}
			return new ActiveXObject(arguments.callee.version);
		}else{
			alert("no XHR object can use");
		}
	},
	ajax:function () {
		var xhr=this.requestObj,
			opt=this.option;
		if (opt.type==="get") {
			xhr.onreadystatechange=function () {
				if(xhr.readyState==4){
					if(xhr.status==200){
						var res=JSON.parse(xhr.responseText);
						opt.callback(res);
					}
				}
			};
			var ndata=this.encodeData(opt.data);
			xhr.open("get",ndata!=""?opt.url+"?"+ndata:opt.url,true);
			xhr.send(null);
		}else{
			xhr.onreadystatechange=function () {
				if(xhr.readyState==4){
					if(xhr.status==200){
						var res=JSON.parse(xhr.responseText);
						opt.callback(res);
					}
				}
			};
			var ndata=this.encodeData(opt.data);
			xhr.open("POST",opt.url,true);
			xhr.setRequestHeader("Content-type","pplication/x-www-form-urlencoded");
			xhr.send(ndata);
		}
	},
	encodeData:function (data) {
		if(!data){
			return "";
		}else{
			var n=encodeURIComponent(data);
			return n;
		}
	}
}