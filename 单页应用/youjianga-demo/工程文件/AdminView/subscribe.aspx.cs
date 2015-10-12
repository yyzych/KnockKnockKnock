using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ActivityMDModel;

public partial class AdminView_subscribe : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            IfCanVisitedManView();

            ListItem t30 = new ListItem("30分", "30");
            ListItem t60 = new ListItem("60分", "60");
            ListItem t90 = new ListItem("90分", "90");
            ListItem t120 = new ListItem("120分", "120");
            this.recentTimeSpan.Items.Add(t30);
            this.recentTimeSpan.Items.Add(t60);
            this.recentTimeSpan.Items.Add(t90);
            this.recentTimeSpan.Items.Add(t120);


            this.ContentList.DataSource = GetData(null, null);

            this.recentTimeConList.DataSource = GetRecentData(30);

            Page.DataBind();
        }
    }

    private IEnumerable<viSubscribe> GetRecentData(int times)
    {
        Subscribe_Activity helpSubAct = new Subscribe_Activity();
        IEnumerable<viSubscribe> datas = helpSubAct.Select(times);
        return datas;
    }

    private void IfCanVisitedManView()
    {
        try
        {
            if (Session["curManID"] == null)
            {
                Response.Redirect("login.aspx");
            }
        }
        catch
        {
            Response.Redirect("login.aspx");
        }
    }

    private IEnumerable<viSubscribe> GetData(int? avtivityId, DateTime? limite,int status=0)
    {
        Subscribe_Activity helpSubAct = new Subscribe_Activity();
        IEnumerable<viSubscribe> datas = helpSubAct.Select(avtivityId, limite, status);
        return datas;
    }

    protected void ContentList_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        IEnumerable<viSubscribe> contentList = InitData();

        this.ContentList.DataSource = contentList;
        ContentList.PageIndex = e.NewPageIndex;
        this.ContentList.DataBind();
    }

    private IEnumerable<viSubscribe> InitData()
    {
        string tiemLimite = this.timeLimite.Text;
        string activityId = this.activityId.Text;
        int status = this.ifHaveSend.Checked == true ? 1 : 0;
        IEnumerable<viSubscribe> contentList = new List<viSubscribe>();
        if (tiemLimite == "")//全部
        {
            if (activityId == "")
            {
                contentList = GetData(null, null, status);
            }
            else
            {
                contentList = GetData(int.Parse(activityId), null, status);
            }
        }
        else
        {
            if (activityId == "")
            {
                contentList = GetData(null, DateTime.Parse(tiemLimite), status);
            }
            else
            {
                contentList = GetData(int.Parse(activityId), DateTime.Parse(tiemLimite), status);
            }
        }
        if (contentList == null)
        {
            contentList = new List<viSubscribe>();
        }
        return contentList;
    }

    protected void ContentList_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        //int row = e.RowIndex;
        int key = (int)e.Keys[0];
        Subscribe helpSub = new Subscribe();
        bool flag = helpSub.DelASubscribe(key);
        if (flag == false)
        {
            Response.Write("<script>alert('删除失败')</script>");
        }
        this.ContentList.DataSource = InitData();
        this.ContentList.DataBind();
    }

    protected void ContentList_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            

        }
    }

    protected void filter_Click(object sender, EventArgs e)
    {
        IEnumerable<viSubscribe> contentList = InitData();

        this.ContentList.DataSource = contentList;
        this.ContentList.DataBind();
    }

    protected void recentTimeSpan_SelectedIndexChanged(object sender, EventArgs e)
    {
        int time = int.Parse(this.recentTimeSpan.SelectedValue);
        this.recentTimeConList.DataSource = GetRecentData(time);
        this.recentTimeConList.DataBind();
    }

    protected void recentTimeConList_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        int times = int.Parse(this.recentTimeSpan.SelectedValue);
        IEnumerable<viSubscribe> contentList = GetRecentData(times);

        this.recentTimeConList.DataSource = contentList;
        recentTimeConList.PageIndex = e.NewPageIndex;
        this.recentTimeConList.DataBind();
    }

    protected void recentTimeConList_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        if (e.CommandName == "sendEmail")
        {
            int activityId = int.Parse(e.CommandArgument.ToString().Split(',')[0]);
            string email = e.CommandArgument.ToString().Split(',')[1];
            if (activityId != null && email != "")
            {
                Activity helpAct = new Activity();
                tbActivity tbAct = helpAct.GetAActivity(activityId);
                if (tbAct != null)
                {
                    string[] arr = { };
                    //string body = "<div>你订阅的活动：“<a href='http://www.baidu.com" + tbAct.ActivityID + "'>" + tbAct.Header + "</a>”马上就要开始了,快快准备把</div>";
                    string body = "<div>你订阅的活动：<a href='http://www.youjianga.com/detailInfo?activityId=" + tbAct.ActivityID + "'>“" + tbAct.Header + "”</a>马上就要开始了,快快准备把</div>";
                    bool flag = OrthersHelp.SendMail("smtp.qq.com", "932241741@qq.com", "恶人", "/*ye2012liJYJY*/", email, "有奖订阅回复", body, true, arr);
                    if (flag)
                    {
                        Subscribe helpSub = new Subscribe();
                        //int subscribeId = int.Parse(e.CommandArgument.ToString().Split(',')[1]);
                        Subscribe help = new Subscribe();
                        tbSubscribe tbSub = help.GetASubscribe(activityId, email);
                        if (tbSub != null)
                        {
                            tbSub.Status = 1;
                            bool tag = help.UpdASubscribe(tbSub);
                        }

                        int times = int.Parse(this.recentTimeSpan.SelectedValue);
                        IEnumerable<viSubscribe> contentList = GetRecentData(times);
                        this.recentTimeConList.DataSource = contentList;
                        this.recentTimeConList.DataBind();
                    }
                }
            }
        }
    }

    protected void deleateAll_Click(object sender, EventArgs e)
    {
        IEnumerable<viSubscribe> contentList = InitData();
        foreach (viSubscribe item in contentList)
        {
            Subscribe help=new Subscribe();
            int subId = item.SubscribeID;
            //tbSubscribe tbsub = help.GetASubscribe(subId);
            help.DelASubscribe(subId);
        }

        IEnumerable<viSubscribe> contentList2 = InitData();

        this.ContentList.DataSource = contentList;
        this.ContentList.DataBind();
    }

    protected void sendAll_Click(object sender, EventArgs e)
    {
        int times = int.Parse(this.recentTimeSpan.SelectedValue);
        IEnumerable<viSubscribe> res = GetRecentData(times);
        foreach (viSubscribe item in res)
        {
            int activityId = item.ActivityID;
            string email = item.UserEmail;

            Activity helpAct = new Activity();
            tbActivity tbAct = helpAct.GetAActivity(activityId);
            if (tbAct != null)
            {
                string[] arr = { };
                //string body = "你订阅的活动：“" + tbAct.Header + "”马上就要开始了,快快准备把";//要转化为html，链接到该活动
                string body = "<div>你订阅的活动：<a href='http://www.youjianga.com/detailInfo?activityId=" + tbAct.ActivityID + "'>“" + tbAct.Header + "”</a>马上就要开始了,快快准备把</div>";
                bool flag = OrthersHelp.SendMail("smtp.qq.com", "932241741@qq.com", "恶人", "/*ye2012liJYJY*/", email, "有奖订阅回复", body, true, arr);
                if (flag)
                {
                    Subscribe helpSub = new Subscribe();
                    //int subscribeId = int.Parse(e.CommandArgument.ToString().Split(',')[1]);
                    Subscribe help = new Subscribe();
                    tbSubscribe tbSub = help.GetASubscribe(activityId, email);
                    tbSub.Status = 1;
                    bool tag = help.UpdASubscribe(tbSub);
                }
            }
        }
        IEnumerable<viSubscribe> contentList = GetRecentData(times);
        this.recentTimeConList.DataSource = contentList;
        this.recentTimeConList.DataBind();
    }

    protected void ifHaveSend_CheckedChanged(object sender, EventArgs e)
    {
        IEnumerable<viSubscribe> contentList = InitData();

        this.ContentList.DataSource = contentList;
        this.ContentList.DataBind();
    }
}