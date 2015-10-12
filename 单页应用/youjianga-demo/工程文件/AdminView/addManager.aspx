<%@ Page Language="C#" AutoEventWireup="true" CodeFile="addManager.aspx.cs" Inherits="AdminView_addManager" %>

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
            <li class="active">添加管理员</li>
        </ul>
        <h5>请确定你拥有添加新管理员的权限</h5>
        <div class="main">
            <div class="container-fluid">
                <div class="row-fluid">
                    <div class="well">
                        <ul class="nav nav-tabs">
                          <li class="active"><a href="#home" data-toggle="tab">基本信息</a></li>
                        </ul>
                        <div id="myTabContent" class="tab-content">
                          <div class="tab-pane active in" id="home">
                                <div id="tab">
                                    <label>用户名</label>
                                    <asp:TextBox ID="UserName" CssClass="input-xlarge" runat="server"></asp:TextBox>
                                    <asp:RequiredFieldValidator ControlToValidate="UserName" ID="RequiredFieldValidator2" runat="server" ErrorMessage="RequiredFieldValidator">*</asp:RequiredFieldValidator>
                                    <label>邮箱</label>
                                    <asp:TextBox ID="Email" CssClass="input-xlarge" runat="server"></asp:TextBox>
                                    <asp:RequiredFieldValidator  ControlToValidate="Email" ID="RequiredFieldValidator1" runat="server" ErrorMessage="RequiredFieldValidator">*</asp:RequiredFieldValidator>
                                    <asp:RegularExpressionValidator ValidationExpression=".*@.{2,}\..{2,}" ControlToValidate="Email" ID="RegularExpressionValidator1" runat="server" ErrorMessage="RegularExpressionValidator">邮箱形式不正确</asp:RegularExpressionValidator>
                                    <label>姓名</label>
                                    <asp:TextBox ID="NewName" CssClass="input-xlarge" runat="server"></asp:TextBox>
                                    <asp:RequiredFieldValidator  ControlToValidate="NewName" ID="RequiredFieldValidator3" runat="server" ErrorMessage="RequiredFieldValidator">*</asp:RequiredFieldValidator>
                                    <label>手机</label>
                                    <asp:TextBox ID="NewPhone" CssClass="input-xlarge" runat="server"></asp:TextBox>
                                    <asp:RequiredFieldValidator  ControlToValidate="NewPhone" ID="RequiredFieldValidator4" runat="server" ErrorMessage="RequiredFieldValidator">*</asp:RequiredFieldValidator>
                                    <label>权限</label>
                                    <asp:DropDownList ID="authority" runat="server">
                                    </asp:DropDownList>
                                    <label>新密码</label>
                                    <input type="password" runat="server" id="password1" class="input-xlarge" />
                                    <asp:RequiredFieldValidator  ControlToValidate="password1" ID="RequiredFieldValidator5" runat="server" ErrorMessage="RequiredFieldValidator">*</asp:RequiredFieldValidator>
                                    <label>确认密码</label>
                                    <input type="password" runat="server" id="password2" class="input-xlarge" />
                                    <asp:CompareValidator ID="CompareValidator1" ControlToCompare="password1" ControlToValidate="password2" runat="server" ErrorMessage="CompareValidator">两次密码不一致</asp:CompareValidator>
                                </div>
                          </div>
                          
                      </div>
                    </div>

                     <div class="btn-toolbar">
                        <asp:LinkButton ID="Save" CssClass="btn btn-primary" runat="server" 
                            onclick="Save_Click"><i class="icon-save"></i>保存</asp:LinkButton>
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
