// 视频控制模块
// 用单例对象来管理不方便，但也没有必要抽象为一个类
define(function (require,exports,module) {
	var appAudio=require("./appAudio");

	var proto={
		createVideo:function (src,posterUrl) {
			var opt={
				src:src,
				width:"100%",
				height:"460px",
				controls:"controls"
			};
			posterUrl&&(opt.poster=posterUrl);
			return $("<video>",opt);
		},
		init:function ($page,posterUrl) {
			var that=this,
				audioStatus;
			var btnPlay=$page.find(".btn-play"),
				videoBox=$page.find(".video-box"),
				mask=$page.find(".mask-layer");

			btnPlay.on("tap",function () {
				mask.removeClass("z-hide");
				btnPlay.css("display","none");
				that.video=that.createVideo(videoBox.get(0).dataset.src,posterUrl||"");
				videoBox.append(that.video);
				audioStatus=appAudio.status;
				appAudio.pause();
			});

			$page.find(".maskLayer-close").on("tap",function () {
				mask.addClass("z-hide");
				btnPlay.css("display","block");
				that.video.remove();
				audioStatus==="on"?(appAudio.play()):(appAudio.pause());
			});
		}
	};

	function create () {
		var res=Object.create(proto);
		res.video=null;
		return res;
	}

	module.exports=create();
});