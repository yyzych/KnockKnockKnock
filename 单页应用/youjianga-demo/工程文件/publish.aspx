<%@ Page Language="C#" AutoEventWireup="true" CodeFile="publish.aspx.cs" Inherits="publish" %>

<!doctype html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta charset="UTF-8">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
    <meta name="apple-mobile-web-app-capable" content="yes">
	<title>index</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/public.css">
	<link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="js/subject/modules/datepicker.css">
	<!--[if lt IE 9]>
	  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script src="js/libs/jquery-2.0.2.min.js"></script>
	<script src="js/bootstrap/bootstrap.min.js"></script>
	<script src="js/subject/modules/bootstrap-datepicker.js"></script>
</head>
<body id="publish">
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" EnablePartialRendering="true" runat="server">
    </asp:ScriptManager>
    <div id="header">
		<div class="navbar">
			<div id="navbar-inner">
				<div class="container">
					<a href="index.aspx" class="brand" id="logo">有奖网</a>
					<ul class="nav">
						<li><a href="index.aspx">每日推荐</a></li>
						<!-- <li>
							<a href="#">发现</a>
						</li> -->
						<li class="dropdown">
							<a class="dropdown-toggle" data-toggle="dropdown" href="#">发现 <span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li><a href="activity.aspx?type=1">有奖活动</a></li>
								<li><a href="activity.aspx?type=2">技能比赛</a></li>
								<li><a href="activity.aspx?type=3">个人发起</a></li>
							</ul>
						</li>
					</ul>
					<div class="navbar-search pull-right hidden-xs hidden-sm">
						<!-- <input type="text" class="search-query"> -->
						<div class="input-append">
							<asp:TextBox ID="searchText" CssClass="search-query" runat="server"></asp:TextBox>
                            <asp:LinkButton ID="search" CssClass="add-on" runat="server" 
                                onclick="search_Click"></asp:LinkButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="main" id="main">
		<div class="content">
			<div class="accordion-group">
				<div class="accordion-heading">
					<!-- <a class="accordion-toggle" href="#collapse1" data-toggle="collapse">请查看说明 <span class="caret"></span></a> -->
					<a id="lookNote" class="accordion-toggle">请查看说明 <span class="caret"></span></a>
				</div>
				<div class="collapse in" id="collapse1">
					<div class="accordion-inner">
						<ul class="list-block">
							<li>
								你可以使用此平台为你的活动打广告，当然，你的活动没有奖品没有意思，那就对不起了啊
							</li>
							<li>
								你也可以将你发现的有意思的活动，比赛发布于此，小伙伴们会感谢你的分享
							</li>
						</ul>
					</div>
				</div>
			</div>
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
                                <input type="text" maxlength="25" id="headerText" name="" runat="server" placeholder="标题小于16个字" />
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
								<label class="input" for="">关键字： <input maxlength="25" type="text" runat="server" id="keyword" name="" placeholder="默认与关键字相同" /><p class="help-inline"></p></label>
							</div>
							<div class="control-label">
								<label class="input" for="">类别：
                                    <asp:DropDownList ID="tagSelect" runat="server">
                                        
                                    </asp:DropDownList>
								</label>
							</div>
							<div style="margin-top:3px;" class="control-label">
								<label class="input" for="">外链：  <input runat="server" id="outlink" type="text" name="" /></label>
							</div>
							<div class="control-label">
							    <label class="input" for="">奖品介绍： 
                                <!-- <input type="checkbox" name="" runat="server" id="ifReward">  -->
                                <input type="text" maxlength="25" name="" placeholder="用一句话秀出最好的奖励" runat="server" id="rewardIntro"/>

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
	<div class="footer">
		<div>
			<ul class="list-inline">
				<li><a href="webInfo.html">关于有奖</a></li>
				<li><a href="webInfo.html">加入我们</a></li>
				<li><a href="webInfo.html">意见反馈</a></li>
			</ul>
			<p>©2014 最美应用 京ICP备11031713号-2</p>
		</div>
	</div>
    </form>
    <script type="text/javascript" src="js/subject/main.js"></script>
	<script>
		var flag=false,
			timeTag1=true,
			timeTag2=true,
			fileUpload1Id='<%=FileUpload1.ClientID %>',
			tagSelectId='<%= tagSelect.ClientID %>';
	    $(document).ready(function (argument) {

	    	$('#beginTime').datepicker({
	    			format: 'yyyy-mm-dd'
	    	});
	    	$('#endTime').datepicker({
	    			format: 'yyyy-mm-dd'
	    	});

	        document.getElementById("lookNote").onclick=function () {
	        	if(flag){
	        		document.getElementById("collapse1").style.display="block";
	        		flag=false;
	        	}else{
	        		document.getElementById("collapse1").style.display="none";
	        		flag=true;
	        	}
	        }

	        initHoursAndMinitue();

	        document.getElementById("form1").onsubmit=validate;
	    });
	   
	</script>
</body>
</html>
