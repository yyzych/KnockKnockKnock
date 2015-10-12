<%@ Page Language="C#" AutoEventWireup="true" CodeFile="template.aspx.cs" Inherits="AdminView_template" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="stylesheets/theme.css">
    <link rel="stylesheet" href="lib/font-awesome/css/font-awesome.css">
    <script src="lib/jquery-1.7.2.min.js" type="text/javascript"></script>
    <style type="text/css">
        #line-chart {
            height:300px;
            width:800px;
            margin: 0px auto;
            margin-top: 1em;
        }
        .brand { font-family: georgia, serif; }
        .brand .first {
            color: #ccc;
            font-style: italic;
        }
        .brand .second {
            color: #fff;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div class="navbar">
            <div class="navbar-inner">
                    <ul class="nav pull-right">
                        <li>
                            <%--<a href="SetManInfo.aspx" target="content" class="hidden-phone visible-tablet visible-desktop" role="button">设置</a>--%>
                        </li>
                        <li id="fat-menu" class="dropdown">
                            <a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="icon-user"></i> <span id="ManUserName" runat="server">叶陈辉</span>
                                <i class="icon-caret-down"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a tabindex="-1" target="mainFrame" href="setManInfo.aspx">我的账户</a></li>
                                <li class="divider"></li>
                                <li><a tabindex="-1" class="visible-phone" href="#">设置</a></li>
                                <li class="divider visible-phone"></li>
                                <li>
                                    <%--<a tabindex="-1" href="sign-in.html">退出</a>--%>
                                    <asp:LinkButton ID="ManLogout" tabindex="-1" runat="server" 
                                        onclick="ManLogout_Click">退出</asp:LinkButton>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <a class="brand"><span class="first">有奖</span> <span class="second">后台管理系统</span></a>
            </div>
        </div>  
        <div class="sidebar-nav">
            <a href="#dashboard-menu" class="nav-header" data-toggle="collapse"><i class="icon-dashboard"></i>管理</a>
            <ul id="dashboard-menu" class="nav nav-list collapse in">
                <li ><a target="mainFrame" href="index.aspx">首页</a></li>
                <li ><a target="mainFrame" href="content.aspx">内容管理</a></li>
                <li ><a target="mainFrame" href="subscribe.aspx">订阅管理</a></li>
                <li ><a target="mainFrame" href="comment.aspx">评论管理</a></li>
                <li ><a target="mainFrame" href="tab.aspx">标签管理</a></li>
            </ul>

            <a href="#accounts-menu" class="nav-header" data-toggle="collapse"><i class="icon-briefcase"></i>其他</a>
            <ul id="accounts-menu" class="nav nav-list collapse">
                <li ><a target="mainFrame" href="managers.aspx">管理员管理</a></li>
                <%--<li ><a target="mainFrame" href="sign-up.html">网站信息</a></li>--%>
            </ul>

            <a href="#error-menu" class="nav-header collapsed" data-toggle="collapse"><i class="icon-exclamation-sign"></i>错误页面<i class="icon-chevron-up"></i></a>
            <ul id="error-menu" class="nav nav-list collapse">
                <li ><a target="mainFrame" href="errors/403.html">403 page</a></li>
                <li ><a target="mainFrame" href="errors/404.html">404 page</a></li>
                <li ><a target="mainFrame" href="errors/500.html">500 page</a></li>
                <li ><a target="mainFrame" href="errors/503.html">503 page</a></li>
            </ul>
        </div>
        <div style="height:300px;" class="content">
            <iframe marginheight="0" id="mainFrame" name="mainFrame" marginwidth="0" frameborder="0" src="index.aspx" scrolling="auto" width="100%" height="100%">
            </iframe>
        </div>
    </div>
    </form>
    <script src="js/adminJs.js"></script>
    <script src="lib/bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript">
        $("[rel=tooltip]").tooltip();
        $(function () {
            $('.demo-cancel-click').click(function () { return false; });
        });
    </script>
</body>
</html>
