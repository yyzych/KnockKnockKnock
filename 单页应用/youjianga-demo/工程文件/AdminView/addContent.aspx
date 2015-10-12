<%@ Page Language="C#" AutoEventWireup="true" CodeFile="addContent.aspx.cs" Inherits="AdminView_addContent" %>

<!doctype html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta charset="UTF-8">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
    <meta name="apple-mobile-web-app-capable" content="yes">
	<title>index</title>
	<link rel="stylesheet" href="../css/bootstrap.min.css">
	<link rel="stylesheet" href="../css/public.css">
	<link rel="stylesheet" href="../css/main.css">
	<link rel="stylesheet" href="../js/subject/modules/datepicker.css">
	<!--[if lt IE 9]>
	  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script src="../js/libs/jquery-2.0.2.min.js"></script>
	<script src="../js/bootstrap/bootstrap.min.js"></script>
	<script src="../js/subject/modules/bootstrap-datepicker.js"></script>
</head>
<body id="publish">
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" EnablePartialRendering="true" runat="server">
    </asp:ScriptManager>
    <ul class="breadcrumb">
            <li class="active">添加内容</li>
    </ul>
	<div class="main" id="main">
        
		<div class="content">
			<div class="wrap form">
				<div>
					<div class="control-group">
						<div class="control-label">
							<label class="input" for="">邮箱： 
                                <input type="text" id="userEmail" name="" runat="server" />
                                <asp:RegularExpressionValidator ID="RegularExpressionValidator1" ControlToValidate="userEmail" runat="server" ValidationExpression=".*@.{2,}\..{2,}" CssClass="help-inline" ErrorMessage="RegularExpressionValidator">请输入正确的邮箱地址</asp:RegularExpressionValidator>
                            </label>
						</div>
						<div class="control-label">
							<label class="input" for="">标题：
                                <input type="text" id="headerText" name="" runat="server" placeholder="标题小于16个字" />
                                </label>
						</div>
                       
						<div class="control-label">
							<label style="margin-right: 5px;" class="input" for="">开始时间(<a id="ifTimeAccurate1">精确到分,可选</a>)： 
                            	<input type="text" readonly id="beginTime" name="" runat="server" placeholder="开始时间" /> 
                            </label>
                            <label id="timeAccurate1" class="input hourAndminitue" for=""> 
                            	<asp:DropDownList name="" runat="server" ID="bHours">
                            	</asp:DropDownList>
                            	<asp:DropDownList name="" runat="server" ID="bMinute">
                            	</asp:DropDownList>
                            </label>
						</div>
						<div class="control-label">
							<label class="input" for="">结束时间(<a id="ifTimeAccurate2">精确到分,可选</a>)： 
                            	<input readonly type="text"  runat="server" id="endTime" name="" placeholder="结束时间" /><p id="checkTime" class="help-inline"></p>
                            </label>
                            <label id="timeAccurate2" class="input hourAndminitue" for=""> 
                            	<asp:DropDownList name="" runat="server" ID="eHours">
                            	</asp:DropDownList>
                            	<asp:DropDownList name="" runat="server" ID="eMinute">
                            	</asp:DropDownList>
                            </label>
						</div>
						<div style="margin-top:3px;" class="control-label">
							<label class="input" for="">简要介绍： 
                            <textarea name="" id="activityIntro" runat="server" cols="30" rows="10"></textarea>
                            </label>
						</div>
                        <div class="control-label">
                            <div>
                                <asp:FileUpload ID="FileUpload1" onchange="CheckImgCss(this, 'tempImg');" style="display:none;" runat="server" />
                                <input type="button" onclick="uploadImgClient()" style="vertical-align: bottom;" class="btn" value="上传相关图片"/>
                                <span>可选</span>
                            </div>
                            <div class="activityImg-div">
                                <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                                    <ContentTemplate>
                                        <img id="activityImg" />
                                    </ContentTemplate>
                                </asp:UpdatePanel>
                            </div>
					    </div>
						<div class="special">
							<div class="control-label">
								<label class="input" for="">关键字： <input type="text" runat="server" id="keyword" name="" placeholder="默认与关键字相同" /><p class="help-inline"></p></label>
							</div>
                            <div class="control-label">
								<label class="input" for="">类别：
                                    <asp:DropDownList AutoPostBack="true" ID="typeSelect" runat="server" 
                                    onselectedindexchanged="typeSelect_SelectedIndexChanged">
                                        
                                    </asp:DropDownList>
								</label>
							</div>
							<div class="control-label">
								<label class="input" for="">选择一个标签：
                                    <asp:DropDownList  ID="tagSelect" runat="server">
                                        
                                    </asp:DropDownList>
								</label>
							</div>
							<div style="margin-top:3px;" class="control-label">
								<label class="input" for="">外链：  <input runat="server" id="outlink" type="text" name="" /></label>
							</div>
							<div class="control-label">
							    <label class="input" for="">奖品介绍： 
                                <!-- <input type="checkbox" name="" runat="server" id="ifReward">  -->
                                <input type="text" name="" placeholder="用一句话秀出最好的奖励" runat="server" id="rewardIntro"/>

                                </label>
						    </div>
						</div>
					</div>
                   
					<div class="form-actions" style="text-align:right;">
						<%--<input type="button" class="my-btn" value="发布">--%>
                        <asp:Button ID="save" CssClass="my-btn"  runat="server" Text="发布" 
                            onclick="save_Click" />
					</div>
				</div>
			</div>
		</div>
	</div>
    </form>
	<script>
	    var flag = false,
			timeTag1 = true,
			timeTag2 = true;
	    $(document).ready(function (argument) {

	        $('#beginTime').datepicker({
	            format: 'yyyy-mm-dd'
	        });
	        $('#endTime').datepicker({
	            format: 'yyyy-mm-dd'
	        });

	        initHoursAndMinitue();

	        document.getElementById("form1").onsubmit = validate;
	    });

	    function initHoursAndMinitue() {
	        var ifTimeAccurate1 = document.getElementById("ifTimeAccurate1");
	        ifTimeAccurate1.onclick = function () {
	            if (timeTag1) {
	                var ta1 = document.getElementById("timeAccurate1");

	                ta1.style.display = "inline";
	                timeTag1 = false;
	            } else {
	                document.getElementById("timeAccurate1").style.display = "none";
	                timeTag1 = true;
	            }
	        }
	        var ifTimeAccurate2 = document.getElementById("ifTimeAccurate2");
	        ifTimeAccurate2.onclick = function () {
	            if (timeTag2) {
	                var ta2 = document.getElementById("timeAccurate2");

	                ta2.style.display = "inline";
	                timeTag2 = false;
	            } else {
	                document.getElementById("timeAccurate2").style.display = "none";
	                timeTag2 = true;
	            }
	        }
	    }
	    function uploadImgClient() {
	        var uploadImage = document.getElementById('<%=FileUpload1.ClientID %>');
	        uploadImage.click();
	    }
	    function CheckImgCss(elem, img) {
	        if (!/\.((jpg)|(bmp)|(gif)|(png))$/ig.test(elem.value)) {
	            alert('只能上传jpg,bmp,gif,png格式图片!');
	            //elem.outerHTML = elem.outerHTML;
	            return false;
	        } else {
	            var uploadImage = document.getElementById('<%=FileUpload1.ClientID %>');
	            uploadImage.parentNode.getElementsByTagName('span')[0].innerHTML = uploadImage.value;
	        }
	    }

	    function validate(event) {
	        var beginTime = document.getElementById("beginTime"),
	    		endTime = document.getElementById("endTime"),
	    		message = document.getElementById("checkTime");
	        if (beginTime.value == "" || endTime.value == "") {
	            // message.innerHTML="请输入时间";
	            tag = false;
	        }
	        var tag = true;
	        var tag1 = /[^-\d+]/.test(beginTime.value);
	        var arr1 = beginTime.value.split("-");
	        if (arr1.length != 3 || tag1 == true) {
	            // message.innerHTML="请正确的时间";
	            tag = false;
	        }
	        var tag2 = /[^-\d+]/.test(endTime.value);
	        var arr2 = endTime.value.split("-");
	        if (arr2.length != 3 || tag2 == true) {
	            // message.innerHTML="请正确的时间";
	            tag = false;
	        }
	        var ta1 = document.getElementById("timeAccurate1");
	        var selects1 = ta1.getElementsByTagName("select");
	        var ta2 = document.getElementById("timeAccurate2");
	        var selects2 = ta2.getElementsByTagName("select");

	        var beginT = new Date(arr1[0], arr1[1], arr1[2], selects1[0].selectedIndex, selects1[1].selectedIndex); //第一项为0可以用的
	        var endT = new Date(arr2[0], arr2[1], arr2[2], selects2[0].selectedIndex, selects2[1].selectedIndex);
	        if (beginT > endT) {
	            // message.innerHTML="开始时间不能大于结束时间";
	            tag = false;
	        }
	        if (tag == false) {
	            beginTime.style.outline = "1px solid #FF4A4A";
	            endTime.style.outline = "1px solid #FF4A4A";
	        } else {
	            beginTime.style.outline = "";
	            endTime.style.outline = "";
	        }

	        //检测其他是否为null
	        var rewardIntro = document.getElementById("rewardIntro");
	        if (rewardIntro.value == "") {
	            rewardIntro.style.outline = "1px solid #FF4A4A";
	            tag = false;
	        } else {
	            rewardIntro.style.outline = "";
	        }
	        var email = document.getElementById("userEmail");
	        if (email.value == "") {
	            email.style.outline = "1px solid #FF4A4A";
	            tag = false;
	        } else {
	            email.style.outline = "";
	        }
	        var header = document.getElementById("headerText");
	        if (header.value == "") {
	            header.style.outline = "1px solid #FF4A4A";
	            tag = false;
	        } else {
	            header.style.outline = "";
	        }
	        var intro = document.getElementById("activityIntro");
	        if (intro.value == "") {
	            intro.style.outline = "1px solid #FF4A4A";
	            tag = false;
	        } else {
	            intro.style.outline = "";
	        }
	        var select = document.getElementById('<%= tagSelect.ClientID %>');
	        if (select.selectedIndex == 0) {
	            select.style.outline = "1px solid #FF4A4A";
	            tag = false;
	        } else {
	            select.style.outline = "";
	        }

	        if (tag == false) {
	            event = event || window.event;
	            event.preventDefault();
	            return false;
	        }

	        return true;
	    }

	   
	</script>
</body>
</html>
