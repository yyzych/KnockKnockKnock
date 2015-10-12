<%@ Page Language="C#" AutoEventWireup="true" CodeFile="managers.aspx.cs" Inherits="AdminView_managers" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="stylesheets/theme.css">
    <link rel="stylesheet" href="lib/font-awesome/css/font-awesome.css">
    <script src="lib/jquery-1.7.2.min.js" type="text/javascript"></script>
    <style>
        #search_area input
        {
            margin:0px;
            margin-right:25px;
        }
        .DropDownList
        {
            margin:0px;
            margin-right:25px;
        }
        #mask
        {
            position:fixed;
            display:none;
            top:0px;
            left:0px;
            z-index:999;
            height:100%;
            width:100%;
            background-color: rgba(37, 36, 36, 0.61);
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <ul class="breadcrumb">
            <li><a href="Index.aspx">管理员管理</a></li>
        </ul>
        <div class="main">
            <div class="container-fluid">
                <div class="row-fluid">
                    <div id="search_area">
                        <div>
                            <table>
                                <tr>
                                    <th>用户名：</th>
                                    <td><input id="MemName" runat="server" type="text" /></td>
                                    <td>
                                        <asp:LinkButton CssClass="btn" ID="search" runat="server" 
                                            onclick="search_Click">搜索</asp:LinkButton>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="btn-toolbar">
                        <a id="AddManager" href="addManager.aspx" class="btn btn-primary"><i class="icon-plus"></i>添加</a>
                        <div class="btn-group">
                        </div>
                    </div>
                    <div class="well">
                        <asp:GridView ID="ContentList" PageSize="10" AllowPaging="True" DataKeyNames="ManagerID" 
                            CssClass="table" runat="server" 
                            AutoGenerateColumns="False" 
                            onpageindexchanging="ContentList_PageIndexChanging" 
                            onrowdeleting="ContentList_RowDeleting">
                            <Columns>
                                <asp:BoundField DataField="ManagerUserName" HeaderText="用户名" />
                                <asp:BoundField HeaderText="邮箱" DataField="ManagerEmail" />
                                <asp:BoundField HeaderText="姓名" DataField="ManagerName" />
                                <asp:BoundField HeaderText="手机号" DataField="ManagerTel"  />
                                <asp:BoundField HeaderText="权限" DataField="Authority"  />
                                <asp:BoundField HeaderText="状态" DataField="ManagerStatus"  />
                                <asp:BoundField HeaderText="上次登入时间" DataField="LastLoginTime" />
                                <asp:CommandField ShowDeleteButton="True" DeleteText="注销" >
                                <ControlStyle Width="30px" />
                                </asp:CommandField>
                            </Columns>
                        </asp:GridView>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
    <div id="mask"></div>
    </form>
    <script src="lib/bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript">
        $("[rel=tooltip]").tooltip();
        $(function () {
            $('.demo-cancel-click').click(function () { return false; });
        });

        function openMask() {
            var mask = document.getElementById("mask");
            var content = document.getElementById("myModal");
            mask.style.display = "block";
            content.style.display = "block";

        }
    </script>
</body>
</html>
