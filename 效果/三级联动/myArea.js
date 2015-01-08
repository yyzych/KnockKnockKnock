function PosiInfo () {
	this.items={};
}
PosiInfo.prototype.addItem=function (id,array) {
	this.items[id]=array;
}
PosiInfo.prototype.exist=function (id) {
	if(typeof this.items[id]=="undefined")
		return false;
	return true;
}

function getPosiInfo () {
	var res=new PosiInfo();
	res.addItem("0",["北京市", "天津市","吉林省","江苏省", "浙江省"]);//所有省
	res.addItem("0_0",["北京市"]);
	res.addItem("0_0_0",["和平区", "河东区", "河西区", "南开区", "河北区"]);
	res.addItem("0_1",["天津市"]);
	res.addItem("0_1_0",["红桥区", "塘沽区", "汉沽区", "大港区", "东丽区"])
	res.addItem("0_2",["石家庄市", "张家口市", "承德市"]);
	res.addItem("0_2_0",["长安区", "桥东区", "桥西区", "新华区", "裕华区", "井陉矿区"])
	res.addItem("0_2_1",["长安区", "桥东区", "桥西区", "新华区", "裕华区", "井陉矿区"])
	res.addItem("0_2_2",["长安区", "桥东区", "桥西区", "新华区", "裕华区", "井陉矿区"])
	res.addItem("0_3",["太原市", "朔州市", "大同市"]);
	res.addItem("0_3_0",["杏花岭区", "小店区", "迎泽区", "尖草坪区"]);
	res.addItem("0_3_1",["朔城区", "平鲁区", "山阴县", "岱岳乡"]);
	res.addItem("0_3_2",["城区", "矿区", "南郊区", "新荣区"]);
	res.addItem("0_4",["杭州市","丽水市","温州市","宁波市"]);
	res.addItem("0_4_0",["拱墅区", "上城区", "下城区", "江干区"]);
	res.addItem("0_4_1",["莲都区", "松阳县", "遂昌县", "龙泉市"]);
	res.addItem("0_4_2",["吴兴区", "南浔区", "长兴县"]);
	res.addItem("0_4_3",["婺城区", "金东区", "兰溪市", "永康市", "义乌市"]);
	return res;
}

var posiInfo=getPosiInfo();
var ids = ["province", "city", "county"]; //三个select的name
var option_0=["-省-","-市-","-县-"];

function init () {
	for(var i=0;i<ids.length-1;i++){//最后一个不用change事件
		var select=document.getElementById(ids[i]);
		select.onchange=function (i) {
			return function () {
				selectChange(i+1);
			};
		}(i);
		//或
		// select.onchange=new Function("selectChange(" + (i + 1) + ")");//最后一个参数是函数体，即执行的代码
	}
	selectChange(0);//0表示没有选择要初始化第1个，1表示现在选择的是第1个要初始化第2个，2表示现在选择的是第2个要初始化第3个。
}
function selectChange (num) {
	var idStr="0";
	for(var i=0;i<num;i++){
		idStr+="_"+(document.getElementById(ids[i]).selectedIndex-1);
	}
	// var items=posiInfo[idStr];
	var theSelect=document.getElementById(ids[num]);
	with(theSelect){
		length=0;//要先清除原来的项。
		options[0]=new Option(option_0[num],option_0[num]);
		if((num>0&&document.getElementById(ids[num-1]).selectedIndex>0)||!num){//!num用于开始时初始化省份
			if(posiInfo.exist(idStr)){
				var items=posiInfo.items[idStr];
				for (var i = 0; i < items.length; i++) {
					options[1+i]=new Option(items[i],items[i]);
				}
				if(num){
					options[0].selected=true;
				}
			}
		}
		if(++num<ids.length){
			selectChange(num);
		}
	}
}
