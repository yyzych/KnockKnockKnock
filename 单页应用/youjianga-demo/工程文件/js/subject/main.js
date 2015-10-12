/*
* main--入口
*/
// detailInfo.aspx页面的函数
function createNode(option) {
    var data = extend({
        tagName: "div",
        className: "",
        parent: document.body
    }, option);
    var elem = document.createElement(data.tagName);
    elem.className = data.className;
    data.parent.appendChild(elem);
    return elem;
}
function extend(oldData, newData) {
    var res = {};
    for (var propItem in oldData) {
        if (newData.hasOwnProperty(propItem)) {
            res[propItem] = newData[propItem];
        } else {
            res[propItem] = oldData[propItem];
        }
    }
    return res;
}
function initSubscribe() {
    var self = this;
    if ($(self).text() != "订阅") {
        return;
    }
    this.style.display = "none";
    var subscribePane = document.getElementById("subscribePane");

    var div = createNode({
        tagName: "div",
        parent: subscribePane
    });
    var send = createNode({
        tagName: "a",
        className: "btn-launch",
        parent: div
    });
    send.innerHTML = "确定";
    send.id = "send";
    var cancel = createNode({
        tagName: "a",
        className: "btn-launch",
        parent: div
    });
    cancel.innerHTML = "取消";
    cancel.id = "cancel";
    var input = createNode({
        tagName: "input",
        parent: subscribePane
    });
    input.placeholder = "请输入邮箱地址";
    input.type = "text";

    cancel.onclick = function() {
        subscribePane.style.display = "none";
        $(div).remove();
        $(input).remove();
        self.style.display = "";
    }
    send.onclick = function() {
        var activityId = window.location.href.split("activityId=")[1];
        if (activityId == null || activityId == "") {
            alert("出错了");
            return false;
        }
        if (/.*@.{2,}\..{2,}/.test(input.value)) {
            $.post("AjaxResponse.aspx", {
                activityId: activityId + "",
                email: input.value + ""
            }, function(data) {
                if (data == "true") {
                    alert("订阅成功");
                    subscribePane.style.display = "none";
                    $(div).remove();
                    $(input).remove();
                    self.style.display = "";
                    self.innerHTML = "已订阅";
                    self.setAttribute("disabled", true); //disabled="disabled"
                } else {
                    alert(data);
                }
            });
        } else {
            alert("邮箱格式不正确");
        }
    }
    subscribePane.style.height = "0" + "px";
    subscribePane.style.display = "block";
    $(subscribePane).animate({
        height: "85px"
    }, "slow");
}
function randomHeadImg() {
    var random = Math.floor(Math.random() * 9 + 1);
    var src = "img/photos/head" + random + ".jpg";
    var img = document.getElementById('headImg');
    img.src = src;
    return src;
}
function GetMoreComment() {
    var self = this;
    var activityId = window.location.href.split("activityId=")[1];
    if (activityId == null || activityId == "") {
        alert("出错了");
        return false;
    }
    var comments = document.getElementById("comments").children[0]; //div
    var aleadryComs = comments.children.length;
    if (aleadryComs >= 8) {
        this.removeAttribute("disabled");

        $.post("AjaxResponse.aspx", {
            activityId: activityId + "",
            skipNum: aleadryComs + ""
        }, function(data) {
            var jsonObj = JSON.parse(data);
            if (jsonObj.length == 0) {
                self.innerHTML = "没有了";
                self.setAttribute("disabled", true); //disabled="disabled"
            }
            for (var i = 0; i < jsonObj.length; i++) {
                var item = jsonObj[i];
                addComment({
                    usrname: item.UserName,
                    headsrc: item.UserAvatar,
                    comtext: item.CommentContent,
                    timeStr: item.CommentDate.replace('-0', '-').split('T')[0].replace('-0', '-')
                });
            };
        });

    } else {
        return false;
    }
}
function commentTemplate(option) {
    var res = "<div><img src='" + option.headsrc + "'><span>" + option.usrname + "</span><span class='comment-date'>" + option.timeStr + "</span></div><div class='comment-content'><p>" + option.comtext + "</p></div>";
    return res;
}
function addComment(option) {
    var comments = document.getElementById("comments").children[0]; //div
    var nocomment = document.getElementById("noComment");
    if (nocomment) {
        nocomment.innerHTML = "";
    }
    var div = document.createElement("div");
    div.className = "a-comment";
    div.innerHTML = commentTemplate(option);
    comments.appendChild(div);
}

// publish.aspx页面的函数
function initHoursAndMinitue () {
    var ifTimeAccurate1=document.getElementById("ifTimeAccurate1");
    ifTimeAccurate1.onclick=function () {
        if(timeTag1){
            var ta1=document.getElementById("timeAccurate1");
            
            ta1.style.display="inline";
            timeTag1=false;
        }else{
            document.getElementById("timeAccurate1").style.display="none";
            timeTag1=true;
        }
    }
    var ifTimeAccurate2=document.getElementById("ifTimeAccurate2");
    ifTimeAccurate2.onclick=function () {
        if(timeTag2){
            var ta2=document.getElementById("timeAccurate2");
            
            ta2.style.display="inline";
            timeTag2=false;
        }else{
            document.getElementById("timeAccurate2").style.display="none";
            timeTag2=true;
        }
    }
}
function uploadImgClient() {
    var uploadImage = document.getElementById(fileUpload1Id);
    uploadImage.click();
}
function CheckImgCss(elem, img) {
    if (!/\.((jpg)|(bmp)|(gif)|(png))$/ig.test(elem.value)) {
        alert('只能上传jpg,bmp,gif,png格式图片!');
        //elem.outerHTML = elem.outerHTML;
        return false;
    }else{
        var uploadImage = document.getElementById(fileUpload1Id);
        uploadImage.parentNode.getElementsByTagName('span')[0].innerHTML=uploadImage.value;
    }
}
function validate (event) {
    var beginTime=document.getElementById("beginTime"),
        endTime=document.getElementById("endTime"),
        message=document.getElementById("checkTime");
    if(beginTime.value==""||endTime.value==""){
        // message.innerHTML="请输入时间";
        tag=false;
    }
    var tag=true;
    var tag1=/[^-\d+]/.test(beginTime.value);
    var arr1=beginTime.value.split("-");
    if(arr1.length!=3||tag1==true){
        // message.innerHTML="请正确的时间";
        tag=false;
    }
    var tag2=/[^-\d+]/.test(endTime.value);
    var arr2=endTime.value.split("-");
    if(arr2.length!=3||tag2==true){
        // message.innerHTML="请正确的时间";
        tag=false;
    }
    var ta1=document.getElementById("timeAccurate1");
    var selects1=ta1.getElementsByTagName("select");
    var ta2=document.getElementById("timeAccurate2");
    var selects2=ta2.getElementsByTagName("select");

    var beginT=new Date(arr1[0],arr1[1],arr1[2],selects1[0].selectedIndex,selects1[1].selectedIndex);//第一项为0可以用的
    var endT=new Date(arr2[0],arr2[1],arr2[2],selects2[0].selectedIndex,selects2[1].selectedIndex);
    if(beginT>endT){
        // message.innerHTML="开始时间不能大于结束时间";
        tag=false;
    }
    if(tag==false){
        beginTime.style.outline="1px solid #FF4A4A";
        endTime.style.outline="1px solid #FF4A4A";
    }else{
        beginTime.style.outline="";
        endTime.style.outline="";
    }

    //检测其他是否为null
    var rewardIntro=document.getElementById("rewardIntro");
    if(rewardIntro.value==""){
        rewardIntro.style.outline="1px solid #FF4A4A";
        tag=false;
    }else{
        if(rewardIntro.value.length>25){
            // rewardIntro.style.outline="1px solid #FF4A4A";
            tag=false;
            // alert("奖品介绍字数不能超过255个字")
        }else{
            rewardIntro.style.outline="";
        }
        
    }
    var email=document.getElementById("userEmail");
    if(email.value==""){
        email.style.outline="1px solid #FF4A4A";
        tag=false;
    }else{
        email.style.outline="";
    }
    var header=document.getElementById("headerText");
    if(header.value==""){
        header.style.outline="1px solid #FF4A4A";
        tag=false;
    }else{
        if(header.value.length>25){
            // header.style.outline="1px solid #FF4A4A";
            tag=false;
            // alert("标题字数不能超过25个字")
        }else{
            header.style.outline="";
        }
        
    }
    var intro=document.getElementById("activityIntro");
    if(intro.value==""){
        intro.style.outline="1px solid #FF4A4A";
        tag=false;
    }else{
        if(intro.value>255){
            intro.style.outline="1px solid #FF4A4A";
            tag=false;
            alert("活动介绍字数不能超过255个字")
        }else{
            intro.style.outline="";
        }
        
    }
    var select=document.getElementById(tagSelectId);
    if(select.selectedIndex==0){
        select.style.outline="1px solid #FF4A4A";
        tag=false;
    }else{
        select.style.outline="";
    }
    var keyword=document.getElementById('keyword');
    if(keyword.value.length>25){
        // keyword.style.outline="1px solid #FF4A4A";
        tag=false;
        // alert("关键字字数不能超过25个字")
    }else{
        keyword.style.outline="";
    }

    if(tag==false){
        event=event||window.event;
        event.preventDefault();
        return false;
    }
        
    return true;
}