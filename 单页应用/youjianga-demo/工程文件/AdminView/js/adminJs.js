//函数其实也是一种对象。addLoadEvent：在页面加载完毕时执行的函数。
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    }
    else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}



function checkHaveImg(elemID) {
    var elems = document.getElementsByClassName(elemID);
    if (elems == null) return;
    for (var j = 0; j < elems.length; j++) {
        var imgs = elems[j].getElementsByTagName("img");
        if (imgs.length == 0) continue;
        for (var i = imgs.length - 1; i >= 0; i--) {
            var $img = $(imgs[i]);
            $img.remove();
        }
    }
}

function openmask() {
    var mask = document.getElementById("mask");
    var content = document.getElementById("editorContainer");
    mask.style.display = "block";
    content.style.display = "block";
}
function closemask() {
    var mask = document.getElementById("mask");
    var content = document.getElementById("editorContainer");
    var frame = document.getElementById("Editor").contentWindow ;
    var frameson = frame.document.getElementById("HtmlEditor").contentWindow;
    frameson.document.body.innerHTML = "";
    //document.getElementById('<%= Header.ClientID%>').value = "";
    //document.getElementById("TagNameList").value = "";
    mask.style.display = "none";
    content.style.display = "none";
}

function init() {
    var array = $(".li-MemMenu");
    $.each(array, function (i, val) {
        $(this).mouseover(function () {
            $(this).css("background-color", "#6bc30d");
        });
        $(this).mouseout(function () {
            $(this).css("background-color", "transparent");
        });
    });

    $("#memMenu").mouseleave(function () {
        $(this).css("display", "none");
    });
    $("#lookupMenu").mouseleave(function () {
        $(this).css("display", "none");
    });

    if (document.getElementsByClassName) {
        var contentImgs = document.getElementsByClassName("div-contentImgOrText");
        if (!contentImgs)
            return;
        for (var i = 0; i < contentImgs.length; i++) {
            var img = contentImgs[i].getElementsByTagName("img")[0];
            if (img != null) {
                imgBindEvent(img);
            }
        }
    }
}

function imgBindEvent(img) {
    $(img).error(function () {
        $(this).css("display", "none");
    });
    $(img).mouseover(function () {
        //this是普通的dom img对象要包装为jquery对象
        var $next = $(this).parent().parent().next();
        $next.css("display", "block");
        $next.mouseleave(function () {
            $(this).css("display", "none");
        });
    });
}

function isLogin(argus) {
    if (argus == "True") {
        $("#div-right").css("display", "none");//登入注册
        $("#div-member").css("display", "block");
        //var publishComment = $(".div-publishComment").css("display", "block");
        $(".div-publishComment").css("display", "block");
        $(".div-notLogin").css("display", "none");
    }
    else {
        $("#div-right").css("display", "block");
        $("#div-member").css("display", "none");
        $(".div-publishComment").css("display", "none");
        $(".div-notLogin").css("display", "block");
    }
}

function displayMenu(argus) {
    var menu = $("#" + argus);
    menu.css("display", "block");
}

function sildeHotTag(dierection) {
    $("#silde_div_hotTag").stop();
    if (dierection == "left") {
        var left = document.getElementById("silde_div_hotTag").offsetLeft;
        //alert(left + '  jquery的position不能用啊  '+typeof(left));
        if (left == -2048) {
        }
        else {
            if (left > -1024) {
                $("#silde_div_hotTag").animate({ left: '-1024px' });
            }
            else {
                $("#silde_div_hotTag").animate({ left: '-2048px' });
            }
        }
        //sildeHotTagUniformly("left");
    }
    else {
        var left = document.getElementById("silde_div_hotTag").offsetLeft;
        if (left == 0) {
        }
        else {
            if (left >= -1024) {
                $("#silde_div_hotTag").animate({ left: '0px' });
            }
            else {
                $("#silde_div_hotTag").animate({ left: '-1024px' });
            }
            //$("#silde_div_hotTag").animate({ left: '+=1024px' });
            //div_HotTag.animate({ left: '-=1024px' });
        }
        //sildeHotTagUniformly("right");
    }
}

function sildeHotTagUniformly(dierection) {
    if (dierection == "left") {
        $("#silde_div_hotTag").animate({ left: '-2048px' },15000);
    }
    else {
        $("#silde_div_hotTag").animate({ left: '0px' }, 15000);
        //for (var i = leftPosition; i < 0; i++) {
            //$("#silde_div_hotTag").animate({ left: '+=1px' });
        //}
    }
}

//追加类
function addClass(elem, value) {
    if (!elem.className) {
        elem.className = value;
    }
    else {
        newClass = elem.className;
        newClass += " ";
        newClass += value;
        elem.className = newClass;
    }
}

function stopSildeHotTag() {
    $("#silde_div_hotTag").stop();
}


//关注某人Ajax
var xHRObject = false;
if (window.XMLHttpRequest) {
    xHRObject = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
    xHRObject = new ActiveXObject("Microsoft.XMLHTTP");
}
var fouseimg;
function fouse(elem,memID) {
    if (islog == "False") {
        alert("请先登入");
        window.location = "Login.aspx"
    }
    fouseimg = elem.getElementsByTagName("*")[0];
    var re = new RegExp("cancelfouse", "g");
    if (!re.test(fouseimg.src)) {
        //关注
        sendRequest("fouse|" + memID.toString());
    }
    else {
        //取消关注
        sendRequest("cancelfouse|" + memID.toString());
    }
}
function sendRequest(data) {
    var body = getBody(data);
    xHRObject.open("POST", "AjaxOperate.aspx", true);
    xHRObject.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xHRObject.onreadystatechange = getData;
    xHRObject.send(body);
}

function getBody(data) {
    var argument = "fouseOrcancel=";
    argument += encodeURIComponent(data);
    return argument;
}
function getData() {
    if (xHRObject.readyState == 4 && xHRObject.status == 200) {
        var serverText = xHRObject.responseText;
        element = serverText.split('|');
        if (element[0] == "fouse" && element[1] == "true") {
            //var fouseimg = document.getElementById("fouseImg");
            fouseimg.src = "../../Images/Img_Orthers/cancelfouse.jpg";
        }
        else if (element[0] == "cancelfouse" && element[1] == "true") {
            //var fouseimg = document.getElementById("fouseImg");
            fouseimg.src = "../../Images/Img_Orthers/guanzhu.jpg";
        }
    }
}


//-------------------------------------------------------------------------------------
addLoadEvent(init);