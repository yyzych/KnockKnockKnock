<%@ Page Language="C#" AutoEventWireup="true" CodeFile="subscribe.aspx.cs" Inherits="AdminView_subscribe" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="stylesheets/theme.css">
    <link rel="stylesheet" href="lib/font-awesome/css/font-awesome.css">
    <link rel="stylesheet" href="../js/subject/modules/datepicker.css">
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
            <li><a href="index.aspx">订阅管理</a></li>
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
                                        <asp:TextBox ID="activityId" runat="server"></asp:TextBox>
                                    </td>
                                    <td>
                                        <label>时间：<asp:TextBox ID="timeLimite" placeholder="某一日的订阅活动" runat="server"></asp:TextBox></label>
                                    </td>
                                    <td>
                                        <asp:LinkButton CssClass="btn" ID="filter" runat="server" 
                                            onclick="filter_Click">筛选</asp:LinkButton>
                                    </td>
                                </tr>
                            </table>
                        </div>
                       
                    </div>
                    <div class="well">
                        <asp:GridView ID="ContentList" AllowPaging="True" PageSize="10" DataKeyNames="SubscribeID" 
                            CssClass="table" runat="server" 
                            AutoGenerateColumns="False" 
                            onpageindexchanging="ContentList_PageIndexChanging" 
                            onrowdatabound="ContentList_RowDataBound" 
                            onrowdeleting="ContentList_RowDeleting" 
                            >
                            <Columns>
                                <asp:BoundField DataField="SubscribeID" HeaderText="订阅ID" />
                                <asp:BoundField DataField="UserEmail" HeaderText="用户邮箱" />
                                <asp:BoundField HeaderText="活动ID" DataField="ActivityID" />
                                <asp:BoundField HeaderText="开始时间" DataField="BeginTime" />
                                <asp:BoundField HeaderText="状态" DataField="Status" />
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
                        <div style="text-align:right;">
                            <label style="display:inline-block; margin-right:15px; float:left;">已发送 
                                <asp:CheckBox ID="ifHaveSend" AutoPostBack="true" style="vertical-align:top;" runat="server" 
                                oncheckedchanged="ifHaveSend_CheckedChanged" />
                            </label>
                            <asp:Button ID="deleateAll" CssClass="btn" runat="server" Text="一键删除" 
                                onclick="deleateAll_Click" />
                        </div>
                    </div>
                    <p style="border-top:1px solid #333;padding-top:15px;">
                        <strong>最近一段时间内所有订阅活动</strong>
                    </p>
                    <div>
                        <label>最近：
                            <asp:DropDownList AutoPostBack="true" ID="recentTimeSpan" runat="server" 
                            onselectedindexchanged="recentTimeSpan_SelectedIndexChanged">
                            </asp:DropDownList>
                        </label>
                    </div>
                    <div class="well">
                        <asp:GridView ID="recentTimeConList" AllowPaging="True" PageSize="10" DataKeyNames="SubscribeID" 
                            CssClass="table" runat="server" 
                            AutoGenerateColumns="False" 
                            onpageindexchanging="recentTimeConList_PageIndexChanging" onrowcommand="recentTimeConList_RowCommand" 
                            >
                            <Columns>
                                <asp:BoundField DataField="SubscribeID" HeaderText="订阅ID" />
                                <asp:BoundField DataField="UserEmail" HeaderText="用户邮箱" />
                                <asp:BoundField HeaderText="活动ID" DataField="ActivityID" />
                                <asp:BoundField HeaderText="开始时间" DataField="BeginTime" />
                                <asp:BoundField HeaderText="状态" DataField="Status" />
                                <asp:TemplateField>
                                    <ItemTemplate>
                                        <asp:LinkButton ID="LinkButton1" CommandName="sendEmail" CommandArgument='<%# Eval("ActivityID")+","+ Eval("UserEmail") %>' runat="server">发送邮件</asp:LinkButton>
                                    </ItemTemplate>
                                    <ControlStyle Width="30px" />
                                </asp:TemplateField>
                            </Columns>
                            
                        </asp:GridView>
                        <label>
                            <asp:Button ID="sendAll" CssClass="btn" runat="server" Text="一键发送" 
                            onclick="sendAll_Click" />
                        </label>
                    </div>

                     <div>
                        <p>
                            <a href="#">自动发送邮件</a> <small>(此功能需要电脑不能关机)</small>
                       </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>
    <script src="lib/bootstrap/js/bootstrap.js"></script>
    <script src="../js/subject/modules/bootstrap-datepicker.js"></script>
    <script type="text/javascript">
        $("[rel=tooltip]").tooltip();
        $(function () {
            $('.demo-cancel-click').click(function () { return false; });
        });
        $('#timeLimite').datepicker({
            format: 'yyyy-mm-dd'
        });
    </script>
</body>
</html>
