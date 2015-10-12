<%@ Page Language="C#" AutoEventWireup="true" CodeFile="comment.aspx.cs" Inherits="AdminView_comment" %>

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
            <li><a href="index.aspx">评论</a></li>
        </ul>
        <div class="main">
            <div class="container-fluid">
                <div class="row-fluid">
                    <div id="search_area">
                        <div>
                            <table>
                                <tr>
                                    <%--<td><asp:TextBox ID="keyword" placeholder="搜索关键词" runat="server"></asp:TextBox></td>--%>
                                    <th>内容ID：</th>
                                    <td>
                                        <asp:TextBox ID="acvitityId" runat="server"></asp:TextBox>
                                    </td>
                                    <th>用户名称：</th>
                                    <td>
                                        <asp:TextBox ID="userName" runat="server"></asp:TextBox>
                                    </td>
                                    <td>
                                        <asp:LinkButton CssClass="btn" ID="filter" runat="server" 
                                            onclick="filter_Click">筛选</asp:LinkButton>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div style="margin:10px 0;">
                            <asp:LinkButton CssClass="btn" OnClientClick="searchValidate()" ID="search" runat="server" onclick="search_Click" 
                                            >搜索</asp:LinkButton>
                            <asp:TextBox ID="searchText" runat="server"></asp:TextBox>
                        </div>
                    </div>
                    <div class="well">
                        <asp:GridView ID="ContentList" AllowPaging="True" DataKeyNames="CommentID" 
                            CssClass="table" runat="server" 
                            AutoGenerateColumns="False" 
                            onpageindexchanging="ContentList_PageIndexChanging" 
                            onrowdatabound="ContentList_RowDataBound" 
                            onrowdeleting="ContentList_RowDeleting" 
                            >
                            <Columns>
                                <asp:BoundField DataField="CommentID" HeaderText="评论ID" />
                                <asp:BoundField DataField="ActivityID" HeaderText="内容ID" />
                                <asp:BoundField HeaderText="用户名" DataField="UserName" />
                                <asp:BoundField HeaderText="内容" DataField="CommentContent" />
                                <asp:BoundField HeaderText="时间" DataField="CommentDate"  />
                                <asp:TemplateField>
                                    <ItemTemplate>
                                        <a target="_blank" href='<%# "../detailInfo.aspx?activityId="+Eval("ActivityID") %>''>查看该活动</a>
                                    </ItemTemplate>
                                    <ControlStyle Width="30px" />
                                </asp:TemplateField>
                                <asp:TemplateField>
                                    <ItemTemplate>
                                        <asp:LinkButton ID="LinkButton1" CommandArgument='<%# Eval("ActivityID") %>' CommandName="delete" runat="server">删除</asp:LinkButton>
                                    </ItemTemplate>
                                    <ControlStyle Width="30px" />
                                </asp:TemplateField>
                            </Columns>
                            
                        </asp:GridView>
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

        function searchValidate(event) {
            if ($('#' + '<%= searchText.ClientID %>').val() == "") {
                alert("请先输入关键词");
                event = event || window.event;
                event.preventDefault();
                return false;
            }
        }
    </script>
</body>
</html>
