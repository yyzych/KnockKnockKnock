<%@ Page Language="C#" AutoEventWireup="true" CodeFile="setManInfo.aspx.cs" Inherits="AdminView_setManInfo" %>

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
            <li><a>主页</a></li>
            <li class="active">设置</li>
        </ul>
        <div class="main">
            <div class="container-fluid">
                <div class="row-fluid">
                    <div class="btn-toolbar">
                        <asp:LinkButton ID="Save" CssClass="btn btn-primary" runat="server" 
                            onclick="Save_Click"><i class="icon-save"></i>保存</asp:LinkButton>
                      <div class="btn-group">
                      </div>
                    </div>
                    <div class="well">
                        <ul class="nav nav-tabs">
                          <li class="active"><a href="#home" data-toggle="tab">基本信息</a></li>
                          <li><a href="#profile" data-toggle="tab">修改密码</a></li>
                        </ul>
                        <div id="myTabContent" class="tab-content">
                          <div class="tab-pane active in" id="home">
                        <div id="tab">
                            <label>用户名</label>
                            <asp:TextBox ID="UserName" CssClass="input-xlarge" Enabled="false" runat="server"></asp:TextBox>
                            <label>邮箱</label>
                            <asp:TextBox ID="Email" CssClass="input-xlarge" Enabled="false" runat="server"></asp:TextBox>
                            <label>姓名</label>
                            <asp:TextBox ID="NewName" CssClass="input-xlarge" runat="server"></asp:TextBox>
                            <label>手机</label>
                            <asp:TextBox ID="NewPhone" CssClass="input-xlarge" runat="server"></asp:TextBox>
                            <label>账户状态</label>
                            <asp:Label ID="Status" runat="server" Text="Label"></asp:Label>
                            <label>注册时间</label>
                            <asp:Label ID="SignTime" runat="server" Text="Label"></asp:Label>
                            <label>上传登入时间</label>
                            <asp:Label ID="LastTime" runat="server" Text="Label"></asp:Label>
                        </div>
                          </div>
                          <div class="tab-pane fade" id="profile">
                        <div id="tab2">
                                <label>旧密码</label><input type="password" runat="server" id="oldPwd" class="input-xlarge" />
                                <label>新密码</label><input type="password" runat="server" id="newPwd" class="input-xlarge" />
                            <div>
                                <asp:LinkButton CssClass="btn btn-primary" ID="UpdatePwd" runat="server" 
                                    onclick="UpdatePwd_Click">更新</asp:LinkButton>
                            </div>
                        </div>
                          </div>
                      </div>
                    </div>
                    <div class="modal small hide fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h3 id="myModalLabel">Delete Confirmation</h3>
                      </div>
                      <div class="modal-body">
    
                        <p class="error-text"><i class="icon-warning-sign modal-icon"></i>Are you sure you want to delete the user?</p>
                      </div>
                      <div class="modal-footer">
                        <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
                        <button class="btn btn-danger" data-dismiss="modal">Delete</button>
                      </div>
                    </div>
                </div>
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
