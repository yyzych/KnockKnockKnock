<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="index" %>

<!doctype html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
    <meta name="apple-mobile-web-app-capable" content="yes">
	<title>index</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/public.css">
	<link rel="stylesheet" href="css/main.css">
	<!--[if lt IE 9]>
	  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script src="js/libs/jquery-2.0.2.min.js"></script>
	<script src="js/bootstrap/bootstrap.min.js"></script>
	<style>
		.notices{
			margin-bottom: 10px;
			height: 20px;
			line-height: 20px;
			font-size: 12px;
		}
		.notices a{
			color: #1F8902;
			margin-left: 3px;
			margin-right: 3px;
		}
		.notices span{
			margin-left: 5px;
		}
	</style>
</head>
<body id="index">
    <form id="form1" runat="server">
    <div id="header">
		<div class="navbar">
			<div id="navbar-inner">
				<div class="container">
					<a href="index.aspx" class="brand" id="logo">有奖网</a>
					<ul class="nav">
						<li class="border-highlight"><a href="index.aspx">每日推荐</a></li>
						<li class="dropdown">
							<a class="dropdown-toggle" data-toggle="dropdown" href="#">发现 <span class="caret"></span></a>
							<ul class="dropdown-menu"><!-- 必须要有类dropdown-menu，且为a标签的兄弟节点 -->
								<li><a href="activity.aspx?type=1">有奖活动</a></li>
								<li><a href="activity.aspx?type=2">技能比赛</a></li>
								<li><a href="activity.aspx?type=3">个人发起</a></li>
							</ul>
						</li>
					</ul>
					<div class="navbar-search pull-right hidden-xs hidden-sm">
						<div class="input-append">
                            <%--<input type="text" class="search-query" name="" id="Text1">--%>
                            <asp:TextBox ID="searchText" CssClass="search-query" runat="server"></asp:TextBox>
                            <asp:LinkButton ID="search" CssClass="add-on" runat="server" 
                                onclick="search_Click"></asp:LinkButton>
							<%--<input type="text" class="search-query" name="" id=""><a href="" class="add-on"></a>--%>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    <div class="main" id="main">
		<div class="content">
            <div class="topadver">
                <img src="img/adver/adver2.jpg" alt="Alternate Text" />
            </div>
			<div id="notices">
				<%--<div class="notices">
					<p>通告：<a href="">XX活动</a>即将开始<span>还有34分钟</span></p>
				</div>--%>
			</div>
			<div class="banner wrap">
				<div id="slideBanner">
					<div class="left">
                        <asp:Repeater ID="fiveTop" runat="server" >
                            <ItemTemplate>
                                <div class="item">
                                    <%--只要用Eval绑定数据就得用#号--%>
							        <a href='<%# "detailInfo.aspx?activityId=" + Eval("ActivityID") %>' target="_blank"><img src='<%# Eval("ActivityImg") %>' alt="" width="480" height="260"></a>
							        <div class="intro">
								        <a href='<%# "detailInfo.aspx?activityId=" + Eval("ActivityID") %>' target="_blank"><h3><%#Eval("Header") %></h3></a>
								        <h5>
									        <a href='<%# Eval("OutLink") %>' target="_blank">查看源</a>
								        </h5>
								        <p><%# ReduceText(Eval("ActivityIntro"))%></p>
								        <div class="bottom">
									        <span>时间：</span><span><%# ifExpired(Eval("BeginTime"), Eval("EndTime"))%></span></div>
							        </div>
						        </div>
                            </ItemTemplate>
                        </asp:Repeater>
						<%--<div class="item">
							<a href=""><img src="img/banner/banner1.png" alt="" width="480" height="260"></a>
							<div class="intro">
								<a href="detailInfo.aspx"><h3>Maker《创客时代》：独立纪录片露天电影展映</h3></a>
								<h5>
									源于花瓣网
								</h5>
								<p>“新蕾杯”旨在为热爱文学的追梦青年搭建一个展示自我的舞台，您的支持会让更多青春的文字在书中随心舞动！</p>
								<div class="bottom">
									<span>时间：</span><span>2014.4.5-2014.7.31</span>
								</div>
							</div>
						</div>--%>
					</div>
					<div class="right">
						<ul class="list-block">
							<li class="active"><a href="javascript:void(0);">最好玩</a></li>
							<li><a href="javascript:void(0);">有价值</a></li>
							<li><a href="javascript:void(0);">真土豪</a></li>
							<li><a href="javascript:void(0);">太没劲</a></li>
							<li><a href="javascript:void(0);">扯蛋啊</a></li>
						</ul>
					</div>
				</div>
			</div>
			
			<div class="left-side pull-left">
				<div class="activity">
					<h2 class="brand-header">活动<a href="activity.aspx?type=1">更多</a></h2>
                    <asp:Repeater runat="server" ID="activity" >
                        <ItemTemplate>
                            <div class="wrap content-card">
						        <div>
                                    <%--<img class="card-img" src='<%# Eval("ActivityImg") %>' alt="">--%>
                                    <%# DetectHaveImg(Eval("ActivityImg")) %>
                                </div>
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
									        <span>浏览：</span><span><%# Eval("Seetimes")%></span>
                                            <span style="margin-left:10px;">时间：</span><span><%# ifExpired(Eval("BeginTime"), Eval("EndTime"))%></span>
								        </div>
							        </div>
						        </div>
					        </div>
                        </ItemTemplate>
                    </asp:Repeater>
					<%--<div class="wrap content-card">
						<div><img class="card-img" src="img/content/content1.png" alt=""></div>
						<div>
							<a href="">
								<h2 class="card-header">
									百度产品论坛 运营者联盟招新开启
								</h2>
							</a>
							<div class="card-textintro">
								<!-- <img src="img/content/content1.png" alt=""> -->
								<p>百度的支付产品（跟支付宝差不多的那位），我们的理念是打造“随身随付”的“有折扣的钱包”，将百度旗下的产品（文库、视频、音乐、糯米等等等）及海量商户（比如国美一分钱买啤酒，联通买手机理财等）以优惠的方式 ...</p>
							</div>
							<div class="card-info">
								<div>
									<span>浏览：</span><span>2228</span>
									<span style="margin-left:10px;">时间：</span><span>2014.4.5-2014.7.31</span>
								</div>
							</div>
						</div>
					</div>--%>
				</div>
				<div class="match">
					<h2 class="brand-header">比赛<a href="activity.aspx?type=2">更多</a></h2>
                    <asp:Repeater runat="server" ID="match" >
                        <ItemTemplate>
                            <div class="wrap content-card">
						        <div><img class="card-img" src='<%# Eval("ActivityImg") %>' alt=""></div>
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
									        <span>浏览：</span><span><%# Eval("Seetimes")%></span>
									        <span style="margin-left:10px;">时间：</span><span><%# ifExpired(Eval("BeginTime"), Eval("EndTime"))%></span>
								        </div>
							        </div>
						        </div>
					        </div>
                        </ItemTemplate>
                    </asp:Repeater>
				</div>
			</div>

			<div class="right-side pull-right">
				<div class="personal">
					<h2 class="brand-header">个人发起<a href="activity.aspx?type=3">更多</a></h2>
                    <asp:Repeater ID="personal" runat="server">
                        <ItemTemplate>
                            <div class="wrap content-card"><a href='<%# "detailInfo.aspx?activityId=" + Eval("ActivityID") %>' target="_blank"><%#Eval("Header") %></a></div>
                        </ItemTemplate>
                    </asp:Repeater>
					<%--<div class="wrap content-card"><a href="">6.20来给卫士庆生吧！送出您的祝福吧</a></div>--%>
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
    </form>
    <script>
    	(function () {
    		function init () {
    			var slideBanner=document.getElementById('slideBanner');
    			var items=slideBanner.children[0].children;
    			var lis=slideBanner.children[1].getElementsByTagName('li');
    			for (var i = 0; i < lis.length; i++) {
    				lis[i].onmouseover=function (i) {
    					return function () {
    						for (var j = 0; j < items.length; j++) {
    							items[j].style.display="none";
    							lis[j].className="";
    						};
    						items[i].style.display="block";
    						lis[i].className="active"
    					}
    				}(i);
    			};
    		}

    		init();
    	})();
    </script>
</body>
</html>
