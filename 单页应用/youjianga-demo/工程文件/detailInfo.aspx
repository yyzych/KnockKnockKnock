<%@ Page Language="C#" AutoEventWireup="true" CodeFile="detailInfo.aspx.cs" Inherits="detailInfo" %>

<!doctype html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta charset="UTF-8">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
    <meta name="apple-mobile-web-app-capable" content="yes">
	<title>详情页</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/public.css">
	<link rel="stylesheet" href="css/main.css">
	<!--[if lt IE 9]>
	  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script src="js/libs/jquery-2.0.2.min.js"></script>
	<script src="js/bootstrap/bootstrap.min.js"></script>
</head>
<body id="detailInfo">
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" EnablePartialRendering="true" EnablePageMethods="true" runat="server">
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
			<div class="left-side pull-left">
                <asp:Repeater ID="content" runat="server" 
                    onitemdatabound="content_ItemDataBound">
                    <ItemTemplate>
                        <div class="content-card">
					        <%# DetectHaveImg(Eval("ActivityImg")) %>
					        <div class="wrap">
						        <h2 class="card-header">
							         <%#Eval("Header") %>
						        </h2>
						        <div class="card-textintro">
							        <p><%# Eval("ActivityIntro")%></p>
						        </div>
						        <div style="margin-bottom: 15px;">
							        <blockquote>
								        详细请戳：<a class="link-out" href='<%# Eval("OutLink")%>'><%# ReduceText(Eval("OutLink"))%></a></blockquote>
						        </div>
						        <div class="card-info">
							        <div>
								        <span>浏览：</span><span><%# Eval("Seetimes")%></span><span style="margin-left:10px;">评论：</span><asp:Label
                                            ID="commentCount" runat="server" Text="Label"></asp:Label>
							        </div>
						        </div>
					        </div>
				        </div>
                    </ItemTemplate>
                </asp:Repeater>
				
				<div class="comment-area">
					<div class="comment wrap">
						<img runat="server" id="headImg" src="img/photos/head6.jpg" alt=""/>
						<input type="text" runat="server" id="realHeadImg" height="0" style="display:none;"/>
						<div>
							<textarea name="" id="comText" runat="server" cols="30" placeholder="发表新评论" rows="10"></textarea>
							<div><input type="text" name="" runat="server" placeholder="给自己取个昵称" id="userName"/></div>
                            <asp:UpdatePanel ID="UpdatePanel1" ChildrenAsTriggers="false" UpdateMode="Conditional" runat="server">
                                <ContentTemplate>
							        <%--<a class="btn" id="publish" href="">评论</a>--%>
                                    <asp:LinkButton ID="publish" CssClass="btn" runat="server" 
                                        onclick="publish_Click">评论</asp:LinkButton>
                                </ContentTemplate>
                        </asp:UpdatePanel>
						</div>
					</div>
                    <div id="comments" class="comments wrap">
                    	<div>
	                        <asp:Repeater ID="comments" runat="server">
	                            <ItemTemplate>
	                                <div class="a-comment">
								        <div>
									        <img src='<%# Eval("UserAvatar")%>' alt="">
									        <span><%# Eval("UserName")%></span>
	                                        <%--可以直接在<% %>里写代码的--%>
									        <span class="comment-date"><%# DateTime.Parse(Eval("CommentDate").ToString()).ToShortDateString().Replace('/','-')%></span>
	                                        <%--<span class="comment-date"><%# Eval("CommentDate")%></span>--%>
								        </div>
								        <div class="comment-content">
									        <p>
										        <%# Eval("CommentContent")%>
									        </p>
								        </div>
							        </div>
	                            </ItemTemplate>
	                        </asp:Repeater>
                    	</div>
                        <span id="noComment" runat="server"></span>
					</div>
					<a class="btn morecomment" id="moreComment" runat="server" href="">更多</a>
				</div>
			</div>
			<div class="right-side pull-right">
				<div class="launch margin-bottom">
					<div class="wrap">
						<p style="margin-bottom:10px;"><span style="font-size:14px;">订阅:</span> <small>我们会在活动开始前一个小时发送邮件告知于你,让你抢占先机,快人一步</small></p>
						<a runat="server" id="subscribe" style="background:#16C942;" class="btn-launch">订阅</a>
						<div id="subscribePane">
							<!-- <div>
								<a id="send" class="btn-launch">确定</a>
								<a id="cancel" class="btn-launch">取消</a>
							</div>
							<input type="text" placeholder="请输入邮箱地址" id="subscribeEmail"> -->
						</div>
					</div>
				</div>

				<div class="content-info margin-bottom">
					<div class="wrap">
						<h3>统计信息</h3>
						<ul class="list-block">
                            <asp:Repeater ID="conInfo" runat="server">
                                <ItemTemplate>
                                    <li><span>类别：</span><span><%# whichType(Eval("Type"))%></span></li>
							        <li><span>最好奖品：</span><span><%# Eval("RewardIntro")%></span></li>
							        <li><span>关键字：</span><span><%# Eval("Keyword")%></span></li>
                                    <li><span>时间范围：</span><span><%# ifExpired(Eval("BeginTime"), Eval("EndTime"))%></span></li>
                                </ItemTemplate>
                            </asp:Repeater>
							
						</ul>
						<div class="graph">
                        <asp:UpdatePanel ID="UpdatePanel3" ChildrenAsTriggers="false" UpdateMode="Conditional" runat="server">
                            <ContentTemplate>
							    <h5>好玩</h5>
							    <div class="progress">
								    <div id="haowan" runat="server" class="progress-bar" style="width:0%;">0</div>
							    </div>
							    <h5>价值</h5>
							    <div class="progress">
								    <div id="jiazhi" runat="server" class="progress-bar progress-bar-waring" style="width:0%;">0</div>
							    </div>
							    <h5>土豪</h5>
							    <div class="progress">
								    <div id="tuhao" runat="server" class="progress-bar progress-bar-danger" style="width:0%;">0</div>
							    </div>
							    <h5>没劲</h5>
							    <div class="progress">
								    <div id="meijin" runat="server" class="progress-bar progress-bar-success" style="width:0%;">0</div>
							    </div>
							    <h5>扯蛋</h5>
							    <div class="progress">
								    <div id="chedan" runat="server" class="progress-bar progress-bar-inverse" style="width:0%;">0</div>
							    </div>
                            </ContentTemplate>
                            <Triggers>
                                <asp:AsyncPostBackTrigger ControlID="sureStatics" EventName="Click" />
                            </Triggers>
                        </asp:UpdatePanel>
						</div>
						<div style="text-align:center">
							<a href="#evaluatePane" data-toggle="modal" id="evaluate">你也来评一下吧</a>
						</div>
					</div>
				</div>
				
				<div class="launch margin-bottom">
					<div class="wrap">
						<h5>告诉别人你的活动也有奖品！！！</h5>
						<a href="publish.aspx" class="btn-launch">我要发起</a>
					</div>
				</div>
				<div class="adver margin-bottom">
					<div class="wrap">
						<img src="img/adver/adver1.jpg" alt="">
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
	<div class="modal hide fade" id="evaluatePane">
			<div class="modal-header">
				<a href="#" data-dismiss="modal" class="close">X</a>
				<h3>点评一下 <small></small></h3>
			</div>
			<div class="modal-body">
				<form action="" class="form-horizontal">
                
					<div class="control-group">
						<label class="control-label input">好玩吗 
                            <asp:CheckBox ID="ifhaowan" runat="server" /></label>
						<label class="control-label input">有价值 
                            <asp:CheckBox ID="ifjiazhi" runat="server" /></label>
						<label class="control-label input">土豪不 
                            <asp:CheckBox ID="iftuhao" runat="server" /></label>
					</div>
					<div class="control-group">
						<label class="control-label input">没劲显 
                            <asp:CheckBox ID="ifmeijin" runat="server" /></label>
						<label class="control-label input">太扯蛋了吧 
                            <asp:CheckBox ID="ifchedan" runat="server" /></label>
					</div>
                    
				</form>
			</div>
			<div class="modal-footer">
                 <asp:Button ID="sureStatics" CssClass="btn btn-primary"  runat="server" Text="确定" onclick="sureStatics_Click" />
			</div>
		</div>
    </form>
    <script type="text/javascript" src="js/subject/main.js"></script>
    <script type="text/javascript">
    	window.onload = function() {
    	    var src = randomHeadImg();

    	    document.getElementById("moreComment").onclick = GetMoreComment;

    	    document.getElementById("sureStatics").onclick = function() {
    	        $('.close').click();
    	        $("#evaluate").remove();
    	    }

    	    document.getElementById("publish").onclick = function() {
    	        var activityId = window.location.href.split("activityId=")[1];
    	        if (activityId == null || activityId == "") {
    	            alert("出错无法评论");
    	            return false;
    	        }
    	        var comText = document.getElementById("comText"),
    	            userName = document.getElementById("userName"),
    	            headImg = document.getElementById("headImg");
    	        if (comText.value == "" || userName.value == "") {
    	            alert("请填写完整");
    	            return false;
    	        } else {
    	            var data = comText.value,
    	                name = userName.value,
    	                headsrc = headImg.src; //包括了服务器名
    	            var datetime = new Date();
    	            var timeStr = datetime.getFullYear() + "-" + (datetime.getMonth() + 1) + "-" + datetime.getDate();

    	            document.getElementById("realHeadImg").value = src;

    	            addComment({
    	                usrname: name,
    	                headsrc: src,
    	                comtext: data,
    	                timeStr: timeStr
    	            });
    	        }
    	    }

    	    var subscribe = document.getElementById('subscribe');
    	    if ($(subscribe).text() == "订阅") {
    	        subscribe.onclick = initSubscribe;
    	    }
    	}();
    </script>
</body>
</html>
