/**
 * 微信统一调用接口
 * 通过meta来获取微信分享的内容
 */
(function() {
	// 获取微信设置信息
	var meta, metas = document.getElementsByTagName('meta');
	for (var i = 0,
			len = metas.length; i < len; i++) {
		if (metas[i].getAttribute('name') == 'sharecontent') {
			meta = metas[i];
		}
	}

	// 判断是否有输出标间，并配置分享
	if (!meta) {
		return;
	}

	// 默认图片
	var imgs = document.getElementsByTagName('img'),
		shareImg,
		isImgUrl = /(^data:.*?;base64)|(\.(jpg|png|gif)$)/;
	for (var i = 0, len = imgs.length; i < len; i++) {
		if (isImgUrl.test(imgs[i].getAttribute('src'))) {
			shareImg = imgs[i].getAttribute('src');
			break;
		} else {
			continue;
		}
	}

	// shareImg = document.getElementById('app-logo').getAttribute('value');
	// 分享给朋友设置
	var link = window.location.href;
	var opt_msg = {
		"img_url": meta.dataset.msgImg,
		"link": link,
		"desc": meta.dataset.msgContent || document.title + '，敬请访问！',
		"title": meta.dataset.msgTitle || document.title
	};
	var free = document.body.getAttribute('free');
	if (free == 1) {
		opt_msg.title = '【LiveApp】' + opt_msg.title;
	}
	var handler_msg = {
		"urlCall": meta.dataset.msgCallback || '',
		callback: function(res) {
			if (res[0].err_msg.indexOf('cancel') == -1) {
				if (window.BI_weixin) {
					//传递opts对象,用于
					opt_msg.link = BI_weixin.save_openid_uid(opt_msg);
					//这里传递回调的链接参数...
					BI_weixin.wxcallback(opt_msg);
				} else {
					if (handler_line.urlCall) {
						window.location.href = handler_msg.urlCall;
					}
				}
			}
		}
	};

	// 朋友圈分享设置
	var opt_line = {
		"img_url": meta.dataset.lineImg || "http://" + window.location.host + shareImg,
		"link": link,
		"desc": meta.dataset.lineTitle || document.title + '，敬请访问！',
		"title": meta.dataset.lineTitle || document.title + '，敬请访问！'
	};
	if (free == 1) {
		opt_line.title = '【LiveApp】' + opt_line.title;
	}
	var handler_line = {
		"urlCall": meta.dataset.lineCallback || '',
		callback: function(res) {
			if (res[0].err_msg.indexOf('cancel') == -1) {
				if (window.BI_weixin) {
					//opts用于将对象传递进来...
					opt_line.link = BI_weixin.save_openid_uid(opt_line);
					//这里传递回调的链接参数...
					BI_weixin.wxcallback(opt_line);
				} else {
					if (handler_line.urlCall) {
						window.location.href = handler_msg.urlCall;
					}
				}
			}
		}
	}

	function loadConfig() {
		var xmlhttp;
		if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else { // code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

				var data = eval('(' + xmlhttp.responseText + ')');

				data = data.data;
				//data.debug =true;
				data.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'];
				//通过config接口注入权限验证配置
				//console.log(data);
				wx.config(data);

				//通过ready接口处理成功验证
				wx.ready(function() {
					//alert(meta.dataset.msgImg);
					//console.log(meta.dataset);
					//分享到朋友圈
					wx.onMenuShareTimeline({
						title: meta.dataset.lineTitle || document.title + '，敬请访问！',
						// 分享标题
						link: link,
						// 分享链接
						imgUrl: meta.dataset.lineImg || "http://" + window.location.host + '/images/admin/common/logo.jpg',
						// 分享图标
						success: function() {
							if (meta.dataset.lineCallback) {
								window.location.href = meta.dataset.lineCallback;
							}
						},
						cancel: function() {}
					});
					//分享给朋友
					wx.onMenuShareAppMessage({
						title: meta.dataset.msgTitle || document.title,
						// 分享标题
						desc: meta.dataset.msgContent || document.title + '，敬请访问！',
						// 分享描述
						link: link,
						// 分享链接
						imgUrl: meta.dataset.msgImg || "http://" + window.location.host + '/images/admin/common/logo.jpg',
						// 分享图标
						type: '',
						// 分享类型,music、video或link，不填默认为link
						dataUrl: '',
						// 如果type是music或video，则要提供数据链接，默认为空
						success: function() {
							if (meta.dataset.msgCallback) {
								window.location.href = meta.dataset.msgCallback;
							}
						},
						cancel: function() {}
					});

				});
				wx.error(function(res) {
					//alert(res);
					//alert("error");
				});
			}
		}
		xmlhttp.open("GET", document.body.getAttribute('data-form-host') + "/open/interface/get_jsconfig?url=" + location.href, true);
		xmlhttp.send();
	}
	loadConfig();
})();