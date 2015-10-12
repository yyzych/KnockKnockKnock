<%@ Page Language="C#" AutoEventWireup="true" CodeFile="activity.aspx.cs" Inherits="activity" %>

<!doctype html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta charset="UTF-8">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
    <meta name="apple-mobile-web-app-capable" content="yes">
	<title>发现</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/public.css">
	<link rel="stylesheet" href="css/main.css">
	<!--[if lt IE 9]>
	  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script src="js/libs/jquery-2.0.2.min.js"></script>
	<script src="js/bootstrap/bootstrap.min.js"></script>
</head>
<body id="activity">
    <form id="form1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" EnablePartialRendering="true" runat="server">
    </asp:ScriptManager>
    <div id="header">
		<!-- <div class="top">
			<img src="img/topbanner.png" alt="">
		</div> -->
		<div class="navbar">
			<div id="navbar-inner">
				<div class="container">
					<a href="index.aspx" class="brand" id="logo">有奖网</a>
					<ul class="nav">
						<li><a href="index.aspx">每日推荐</a></li>
						<li class="dropdown border-highlight">
							<a class="dropdown-toggle" data-toggle="dropdown" href="#">发现 <span class="caret"></span></a>
							<ul class="dropdown-menu"><!-- 必须要有类dropdown-menu，且为a标签的兄弟节点 -->
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
				<div class="activity">
                    <asp:UpdatePanel UpdateMode="Conditional" ID="UpdatePanel1" runat="server">
                        <ContentTemplate>
                            <asp:GridView ID="contents" GridLines="None" ShowHeader="False" 
                                AllowPaging="True" PageSize="10" CellPadding="0" runat="server" 
                                AutoGenerateColumns="False" onpageindexchanging="contents_PageIndexChanging">
                                <Columns>
                                    <asp:TemplateField>
                                        <ItemTemplate>
                                            <div class="wrap content-card">
						                        <div> <%# DetectHaveImg(Eval("ActivityImg")) %></div>
						                        <div>
							                        <a href='<%# "detailInfo.aspx?activityId=" + Eval("ActivityID") %>' target="_blank">
								                        <h2 class="card-header">
									                        <%#Eval("Header") %>
								                        </h2>
							                        </a>
							                        <div class="card-textintro">
								                        <!-- <img src="img/content/content1.png" alt=""> -->
								                        <p><%# ReduceText(Eval("ActivityIntro"))%></p>
							                        </div>
							                        <div class="card-info">
								                        <div>
									                        <span>浏览：</span><span><%# Eval("Seetimes")%></span><span style="margin-left:10px;">时间：</span><span><%# ifExpired(Eval("BeginTime"), Eval("EndTime"))%></span></div>
							                        </div>
						                        </div>
					                        </div>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                </Columns>
                                <PagerSettings Mode="Numeric" PageButtonCount="5" LastPageText=">" />
                            </asp:GridView>
                        </ContentTemplate>
                    </asp:UpdatePanel>
				</div>
			</div>
			<div class="right-side pull-right">
				<div class="category">
					<div class="wrap">
						<!-- <h3>分类</h3> -->
						<div class="tabbable"><!-- 这里的div不是必须的 -->
                            <asp:UpdatePanel ID="UpdatePanel2" ChildrenAsTriggers="false" UpdateMode="Conditional" runat="server">
                                <ContentTemplate>
                                    <ul class="nav nav-tabs">
								        <li><a href="#tab1" data-toggle="tab" id="activityTab" runat="server">有奖活动</a></li>
								        <li><a href="#tab2" data-toggle="tab" runat="server" id="matchTab">技能比赛</a></li>
								        <li><a href="#tab3" data-toggle="tab" runat="server" id="personalTab">个人发起</a></li>
							        </ul>
							        <div class="tab-content">
								        <div class="tab-pane" id="tab1">
									        <ul class="web-tag list-inline">
										        <li>
                                                    <asp:LinkButton ID="activityAll" OnClick="activityTag_Click" CommandArgument='0' runat="server">全部</asp:LinkButton>
                                                </li>
                                                <asp:Repeater ID="activityPane" runat="server">
                                                    <ItemTemplate>
                                                        <li>
                                                            <asp:LinkButton ID="LinkButton1" OnClick="activityTag_Click" CommandArgument='<%# Eval("TagID") %>' runat="server"><%# Eval("TagName") %></asp:LinkButton>
                                                        </li>
                                                    </ItemTemplate>
                                                </asp:Repeater>
										
									        </ul>
								        </div>
								        <div class="tab-pane" id="tab2">
									        <ul class="web-tag list-inline">
										        <li>
                                                    <asp:LinkButton ID="matchAll" OnClick="matchTab_Click" CommandArgument='0' runat="server">全部</asp:LinkButton>
                                                </li>
                                                <asp:Repeater ID="matchPane" runat="server">
                                                    <ItemTemplate>
                                                        <li>
                                                            <asp:LinkButton ID="LinkButton1" OnClick="matchTab_Click" CommandArgument='<%# Eval("TagID") %>' runat="server"><%# Eval("TagName") %></asp:LinkButton>
                                                        </li>
                                                    </ItemTemplate>
                                                </asp:Repeater>
										
									        </ul>
								        </div>
								        <div class="tab-pane" id="tab3">
									        <ul class="web-tag list-inline">
										        <li>
                                                    <%--<a href="">全部</a>--%>
                                                    <asp:LinkButton ID="personalAll" OnClick="personalTab_Click" CommandArgument='0' runat="server">全部</asp:LinkButton>
                                                </li>
                                                <asp:Repeater ID="personalPane" runat="server">
                                                    <ItemTemplate>
                                                        <li>
                                                            <asp:LinkButton ID="LinkButton1" OnClick="personalTab_Click" CommandArgument='<%# Eval("TagID") %>' runat="server"><%# Eval("TagName") %></asp:LinkButton>
                                                        </li>
                                                    </ItemTemplate>
                                                </asp:Repeater>
										
									        </ul>
								        </div>
							        </div>
                                </ContentTemplate>
                            </asp:UpdatePanel>
                                    
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
    <%--<asp:UpdateProgress ID="UpdateProgress1" AssociatedUpdatePanelID="UpdatePanel1" runat="server">
        <ProgressTemplate>
        </ProgressTemplate>
    </asp:UpdateProgress>--%>
    </form>
    <script>
    	(function () {
    		window.onload=function () {
    		    init();

    		    var searchInput = document.getElementById('<%= searchText.ClientID %>');
    		    searchInput.onkeydown = function (event) {
    		        event = event || window.event;
    		        var keycode = event.keyCode;
    		        if (keycode == 13) {
    		            var searchBtn = document.getElementById('<%= search.ClientID %>');
    		            searchBtn.click();
    		        }
    		    }
    		}
    		function init () {
    			var urlArgs = window.location.href.split('?')[1]||"type=1";
    			
    			if(urlArgs!=""){
    				var key=urlArgs.split('=')[0];
    				var value = urlArgs.split('=')[1];
    				if(key=="type"){
    					var tabId;
    					switch(value){
    						case "1": tabId="activityTab";
    							break;
    						case "2": tabId="matchTab";
    							break;
    						case "3": tabId="personalTab";
    							break;
    						default : tabId="activityTab";
    							break;
    					}
    					setActiveTab(tabId);
    				}else if(key=="searchText"){
                        setActiveTab("activityTab");

                        var matchTab=document.getElementById("matchTab"),
                            personalTab=document.getElementById("personalTab");

                        var tabPane1=document.getElementById(matchTab.href.split('#')[1]);
                        var allTag1=tabPane1.getElementsByTagName('li')[0];
                        allTag1.className="active";

                        var tabPane2=document.getElementById(personalTab.href.split('#')[1]);
                        var allTag2=tabPane2.getElementsByTagName('li')[0];
                        allTag2.className="active";
                    }
    			}

    			var tabPane1=document.getElementById("tab1"),
    				tabPane2=document.getElementById("tab2"),
    				tabPane3=document.getElementById("tab3");
    			tabPane1.onclick=tabPane2.onclick=tabPane3.onclick=function (event) {
    				event=event||window.event;
    				var tar=event.target;
    				if(tar.tagName.toLowerCase()=="a"){
    					var lis1=tabPane1.getElementsByTagName("li"),
    						lis2=tabPane2.getElementsByTagName("li"),
    						lis3=tabPane3.getElementsByTagName("li");
    					for (var i = 0; i < lis1.length; i++) {
    						lis1[i].className="";
    					};
    					for (var i = 0; i < lis2.length; i++) {
    						lis2[i].className="";
    					};
    					for (var i = 0; i < lis3.length; i++) {
    						lis3[i].className="";
    					};
    					tar.parentNode.className="active";
    				}
    			};
    		}
    		function setActiveTab (elemId) {
    			var elem=document.getElementById(elemId);
    			if(elem){
    			    var parUl = elem.parentNode.parentNode;
    				var tabPane=document.getElementById(elem.href.split('#')[1]);
    				var allTag=tabPane.getElementsByTagName('li')[0];
    				allTag.className="active";
    				$(elem).click();
    			}
    		}
    	})();
    </script>
</body>
</html>
