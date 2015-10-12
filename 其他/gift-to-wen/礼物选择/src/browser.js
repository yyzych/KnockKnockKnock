define(function (require,exports,module) {
	(function () {
		var slice=Array.prototype.slice;
		var labelList=document.querySelectorAll("label.btn"),
			desList=document.querySelectorAll(".description"),
			saveBtn=null,
			conArr=["撕逼专用表情包一套","66块毛爷爷","个人营销页","一个承诺，不限时间"];
		labelList=slice.apply(labelList);
		desList=slice.apply(desList);
		labelList.forEach(function (item,index,arr) {
			item.addEventListener("click",function (e) {
				if(!saveBtn){
					saveBtn=document.createElement("a");
					saveBtn.id="save";
					saveBtn.appendChild(document.createTextNode("确定"));
					saveBtn.classList.add("save-btn");
					saveBtn.addEventListener("click",function (e) {
						var radios=document.querySelectorAll(".sel-radio");
						var index=-1;
						for (var i = 0; i < radios.length; i++) {
							radios[i].checked?index=i:radios[i].disabled="disabled";
						}
						if(index===-1) return;
						var nextSilbing=radios[index].nextElementSibling;
						nextSilbing.classList.add("z-active");
					});
					document.getElementsByClassName("wrap")[0].appendChild(saveBtn);
					setTimeout(function () {
						saveBtn.style.opacity=1;
					},200);
				}
			})
		});
		// 随机排序
		(function () {
			var len=4,
				i,
				elem,
				content;
			while(len--){
				i=Math.floor(Math.random()*(desList.length));
				elem=desList.splice(i,1);
				i=Math.floor(Math.random()*(conArr.length));
				content=conArr.splice(i,1);
				elem[0].innerHTML=content[0];
			}
		})();
	})();
})