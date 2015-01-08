﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <input type="button" value="ajax-by-get" id="getBtn">
	    <input type="button" value="ajax-by-post" id="postBtn">
	    <div id="myDiv"></div>
	    <div>
		    <blockquote>
				    <h3>下面是 XMLHttpRequest 对象的三个重要的属性：</h3>
				    <ul>
					    <li>onreadystatechange	存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。---即事件处理程序</li>
					    <li>readyState	
						    存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
						    0: 请求未初始化
						    1: 服务器连接已建立
						    2: 请求已接收
						    3: 请求处理中
						    4: 请求已完成，且响应已就绪
					    </li>
					    <li>status	200: "OK"  404: 未找到页面</li>
				    </ul>
		    </blockquote>
	    </div>
    </div>
    </form>
    <script>
        var getBtn = document.getElementById('getBtn'),
			postBtn = document.getElementById('postBtn');
        getBtn.onclick = function (event) {
            var xmlObject = getAjaxObject();
            // xmlObject.open("GET","data.txt",true);//url:open() 方法的 url 参数是服务器上文件的地址。可以用来传递参数  async:异步 - True 或 False？
            //因为使用Get方式有可能获得的是缓存的文件，可以在url末尾加一个唯一的ID

            xmlObject.onreadystatechange = function (event) {//文档或元素的加载状态事件
                if (xmlObject.readyState == 4 && xmlObject.status == 200) {
                    document.getElementById("myDiv").innerHTML = xmlObject.resposeText + " --- get";
                }
            }
            xmlObject.open("GET", "Default2.aspx", true);
            xmlObject.send();
        };
        postBtn.onclick = function (event) {
            var xmlObject = getAjaxObject();
            xmlObject.open("POST", "Default2.aspx", true);
            /*默认情况下Ajax以 Content-Type: text/plain 提交数据，此时服务器将忽略POST实体部分的数据，所以服务端程序无法获取POST数据
            指定为Content-Type: application/x-www-form-urlencoded才行	结合博客里的一篇文章理解更深点
            */
            xmlObject.setRequestHeader("Content-type", "pplication/x-www-form-urlencoded")//向请求添加 HTTP 头。名称，值
            xmlObject.onreadystatechange = function () {//加载状态事件。每当 readyState 改变时，就会触发 onreadystatechange 事件。
                if (xmlObject.readyState == 4 && xmlObject.status == 200) {
                    document.getElementById("myDiv").innerHTML = xmlObject.resposeText + " --- post";
                    //如果响应的是resposeXml，则可以使用DOM的方法操作，因为DOM也适用XML文档
                }
            }
            
            xmlObject.send("fname=Bill&lname=Gates"); //post使用send传递数据
        }
        function getAjaxObject() {
            var xmlObject;
            if (window.XMLHttpRequest) {
                xmlObject = new XMLHttpRequest();
            } else if (window.ActiveXObject) {//for ie早期版本
                xmlObject = new ActiveXObject("Microsoft.XMLHTTP");
            } else {
                return null;
            }
            return xmlObject;
        }
	</script>
</body>
</html>
