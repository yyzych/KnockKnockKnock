<%@ Page Language="C#" AutoEventWireup="true" CodeFile="login.aspx.cs" Inherits="AdminView_login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="stylesheets/theme.css"/>
    <link rel="stylesheet" href="lib/font-awesome/css/font-awesome.css"/>
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
                    </ul>
                    <a class="brand"><span class="first">有奖</span> <span class="second">后台管理系统</span></a>
            </div>
        </div> 
        <div class="row-fluid">
            <div class="dialog">
                <div class="block">
                    <p class="block-heading">登 入</p>
                    <div class="block-body">
                        <label>用户名</label>
                        <input type="text" id="ManUserName" runat="server" class="span12"/>
                        <label>密码</label>
                        <input type="password" id="ManPwd" runat="server" class="span12" />
                        <%--<a href="index.html" class="btn btn-primary pull-right">登 入</a>--%>
                        <asp:LinkButton ID="ManLogin" CssClass="btn btn-primary pull-right" 
                            runat="server" onclick="ManLogin_Click">登 入</asp:LinkButton>
                        <label class="remember-me"><input runat="server" id="IfRememberMe" type="checkbox"> 记住我</label>
                        <div class="clearfix"></div>
                    </div>
                </div>
                <%--<p class="pull-right" style=""><a href="http://www.portnine.com" target="blank">Theme by Portnine</a></p>--%>
                <p><a href="../index.aspx" target="_blank">前台首页</a></p>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
