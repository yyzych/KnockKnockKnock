<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="AdminView_index" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="stylesheets/theme.css">
    <link rel="stylesheet" href="lib/font-awesome/css/font-awesome.css">
    <script src="lib/jquery-1.7.2.min.js" type="text/javascript"></script>
</head>
<body>
   <form id="form1" runat="server">
    <div>
        <ul class="breadcrumb">
            <li><a href="Index.aspx">首页</a></li>
        </ul>
        <div style="position:relative;">
            <div style="">
                <h1 style="color:#444;">欢迎你管理员</h1>
            </div>
            <div style="text-align:center; margin-top:50px;">
                <span>明日活动订阅人数：<asp:label ID="troSubscribeNum" runat="server" Font-Size="28px" ForeColor="Blue" Text="0" />人</span>
            </div>
            <div style="text-align:center; margin-top:50px;">
                <span>网站昨日访问量：<asp:label ID="yesMemberNum" runat="server" Font-Size="28px" ForeColor="Blue" Text="0" />人</span>
            </div>
            
        </div>
    </div>
    </form>
    <script src="lib/bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript">
        $("[rel=tooltip]").tooltip();
        $(function () {
            $('.demo-cancel-click').click(function () { return false; });
        });
    </script>
</body>
</html>
