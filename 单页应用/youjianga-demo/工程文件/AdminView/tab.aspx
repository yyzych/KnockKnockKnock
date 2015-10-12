<%@ Page Language="C#" AutoEventWireup="true" CodeFile="tab.aspx.cs" Inherits="AdminView_tab" %>

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
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <ul class="breadcrumb">
            <li><a href="index.aspx">标签</a></li>
        </ul>
        <div class="main">
            <div class="container-fluid">
                <div class="row-fluid">
                    <div id="search_area">
                        <div>
                            <table>
                                <tr>
                                    <%--<td><asp:TextBox ID="keyword" placeholder="搜索关键词" runat="server"></asp:TextBox></td>--%>
                                    <th>类别：</th>
                                    <td>
                                        <asp:DropDownList CssClass="DropDownList" runat="server" ID="ContentType" runat="server">
                                            <asp:ListItem Value="0">全部</asp:ListItem>
                                            <asp:ListItem Value="1">活动</asp:ListItem>
                                            <asp:ListItem Value="2">比赛</asp:ListItem>
                                            <asp:ListItem Value="3">个人</asp:ListItem>
                                        </asp:DropDownList>
                                    </td>
                                    <td>
                                        <asp:LinkButton CssClass="btn" ID="filter" runat="server" 
                                            onclick="filter_Click">筛选</asp:LinkButton>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div style="margin:10px 0;">
                        </div>
                    </div>
                    <div class="well">
                        <asp:GridView ID="ContentList" AllowPaging="True" DataKeyNames="TagID" 
                            CssClass="table" runat="server" 
                            AutoGenerateColumns="False" 
                            onpageindexchanging="ContentList_PageIndexChanging" 
                            onrowdatabound="ContentList_RowDataBound" 
                            onrowdeleting="ContentList_RowDeleting" 
                            >
                            <Columns>
                                <asp:BoundField DataField="TagID" HeaderText="ID" />
                                <asp:BoundField DataField="Type" HeaderText="类别" />
                                <asp:BoundField HeaderText="名称" DataField="TagName" />
                                <asp:TemplateField>
                                    <ItemTemplate>
                                        <asp:LinkButton ID="LinkButton1" CommandArgument='<%# Eval("TagID") %>' CommandName="delete" runat="server">删除</asp:LinkButton>
                                    </ItemTemplate>
                                    <ControlStyle Width="30px" />
                                </asp:TemplateField>
                            </Columns>
                            
                        </asp:GridView>
                    </div>
                    <div style="background:#fff;padding:10px 15px;">
                        <div class="tabbable">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#tab1" data-toggle="tab">增加标签</a></li>
                            </ul>
                            <!-- <h3 class="nav-tabs">增加标签</h3> -->
                            <div class="tab-content">
                                <div class="tab-pane active" id="tab1">
                                    <label>标签名：
                                    <asp:TextBox ID="nTagName" CssClass="input-xlarge" runat="server"></asp:TextBox>
                                    </label>
                                    <label>类别：
                                    <asp:DropDownList ID="nTagType" runat="server">
                                        <asp:ListItem Value="1">活动</asp:ListItem>
                                        <asp:ListItem Value="2">比赛</asp:ListItem>
                                        <asp:ListItem Value="3">个人</asp:ListItem>
                                    </asp:DropDownList>
                                    </label>
                                    <p>
                                        <asp:Button ID="addTag" CssClass="btn" runat="server" Text="确定" 
                                            onclick="addTag_Click" />
                                    </p>
                                    
                                </div>
                            </div>
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
