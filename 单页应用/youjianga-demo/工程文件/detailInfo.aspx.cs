using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ActivityMDModel;
using System.Web.Services;
using System.Configuration;

public partial class detailInfo : System.Web.UI.Page
{
    private int selComNum = int.Parse(ConfigurationManager.AppSettings["selComNum"]);
    private int recentTimeSpan = 1;

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (string.IsNullOrEmpty(Request.QueryString["activityId"]))
            {
                Response.Redirect("activity.aspx");
            }
            int activityID = int.Parse(Request.QueryString["activityId"]);
            InitData(activityID);
            ViewState["activityId"] = activityID;
            Page.DataBind();
        }
    }

    protected void search_Click(object sender, EventArgs e)
    {
        string searchText = this.searchText.Text;
        if (searchText != "")
        {
            Response.Redirect("activity.aspx?searchText=" + searchText);
        }
    }

    private void InitData(int activityID)
    {
        List<tbActivity> theCon = new List<tbActivity>();
        //内容绑定
        Activity helpActivity=new Activity();
        tbActivity con = helpActivity.GetAActivity(activityID);
        con.Seetimes++;
        helpActivity.UpdAActivity(con);
        theCon.Add(con);
        this.content.DataSource = theCon;
        this.content.DataBind();

        //信息绑定
        this.conInfo.DataSource = theCon;
        this.conInfo.DataBind();

        //评论绑定
        Comment helpCom = new Comment();
        IEnumerable<_tbComment> comments = helpCom.Select(activityID, selComNum);
        this.moreComment.Disabled = true;
        if (comments.Count() > 0)
        {
            this.comments.DataSource = comments;
            this.comments.DataBind();
            if (comments.Count() >= selComNum)
            {
                this.moreComment.Disabled = false;
            }
        }
        else
        {
            this.noComment.InnerText = "没有评论";
        }

        //统计信息绑定
        Statistics helpSta=new Statistics();
        tbStatistics tbsta = helpSta.GetAStatistics(activityID);
        if (tbsta == null)
            return;
        setStatics(tbsta);
    }
    public string DetectHaveImg(object img)
    {
        if (img == null)
        {
            return "";
        }
        else
        {
            string path = (string)img;
            string res = "<img class='card-img' src='" + path + "' >";
            return res;
        }
    }
    private string getStatics(int son,int marter)
    {
        if (son == 0 || marter == 0)
            return "0";
        float res = (float)son / (float)marter*100;
        return res.ToString("0.0");
    }
    private void updateStatics(int activityId, bool ifhaowan, bool ifchedan, bool ifjiazhi, bool iftuhao, bool ifmeijin)
    {
        Statistics helpSta = new Statistics();
        tbStatistics tbSta = helpSta.GetAStatistics(activityId);
        bool tag = false;
        if (tbSta == null)
        {
            tbSta = new tbStatistics();
            tbSta.Haowan = tbSta.Jiazhi = tbSta.Meijin = tbSta.Tuhao = tbSta.Chedan = 0;
            tbSta.C_Haowan = tbSta.C_Jiazhi = tbSta.C_Meijin = tbSta.C_Tuhao = tbSta.C_Chedan = 0;
            tag = true;
        }
        if (ifhaowan)
        {
            tbSta.Haowan++;
            tbSta.C_Haowan++;
        }
        else
        {
            tbSta.C_Haowan++;
        }

        if (ifchedan)
        {
            tbSta.Chedan++;
            tbSta.C_Chedan++;
        }
        else
        {
            tbSta.C_Chedan++;
        }

        if (ifjiazhi)
        {
            tbSta.Jiazhi++;
            tbSta.C_Jiazhi++;
        }
        else
        {
            tbSta.C_Jiazhi++;
        }

        if (iftuhao)
        {
            tbSta.Tuhao++;
            tbSta.C_Tuhao++;
        }
        else
        {
            tbSta.C_Tuhao++;
        }

        if (ifmeijin)
        {
            tbSta.Meijin++;
            tbSta.C_Meijin++;
        }
        else
        {
            tbSta.C_Meijin++;
        }

        if (tag == true)
        {
            tbSta.ActivityID = activityId;
            bool flag = helpSta.AddAStatistics(tbSta);
        }
        else
        {
            bool flag = helpSta.UpdAStatistics(tbSta);
        }

        setStatics(tbSta);
    }
    private void setStatics(tbStatistics tbSta)
    {
        string haowan = getStatics(tbSta.Haowan,tbSta.C_Haowan) + "%";
        string jiazhi = getStatics(tbSta.Jiazhi, tbSta.C_Jiazhi) + "%";
        string meijin = getStatics(tbSta.Meijin, tbSta.C_Meijin) + "%";
        string chedan = getStatics(tbSta.Chedan, tbSta.C_Chedan) + "%";
        string tuhao = getStatics(tbSta.Tuhao, tbSta.C_Tuhao) + "%";
        
        this.haowan.Style.Add("width",haowan);
        this.haowan.InnerText = haowan;
        this.jiazhi.Style.Add("width", jiazhi);
        this.jiazhi.InnerText = jiazhi;
        this.meijin.Style.Add("width", meijin);
        this.meijin.InnerText = meijin;
        this.chedan.Style.Add("width", chedan);
        this.chedan.InnerText = chedan;
        this.tuhao.Style.Add("width", tuhao);
        this.tuhao.InnerText = tuhao;
    }

    public string ReduceText(object activityInfo)
    {
        string info = (string)activityInfo;
        if (info.Length > 130)
        {
            info = info.Substring(0, 130) + "...";
        }
        return info;
    }
    public string ifExpired(object beginTime, object endTime)
    {
        DateTime endT = (DateTime)endTime;
        DateTime beginT = (DateTime)beginTime;
        DateTime now = DateTime.Now;
        if (endT < now)
        {
            this.subscribe.InnerText = "已过订阅期";
            this.subscribe.Disabled = true;
            return "已过期";
        }
        now = now.AddHours(recentTimeSpan);
        if (beginT < now)
        {
            this.subscribe.InnerText = "已过订阅期";
            this.subscribe.Disabled = true;
        }
        string endTStr = endT.ToShortDateString();
        endTStr = endTStr.Replace('/', '.') + " "+endT.ToShortTimeString(); ;
        string beginTStr = beginT.ToShortDateString();
        beginTStr = beginTStr.Replace('/', '.') + " " + beginT.ToShortTimeString();
        return beginTStr + " - " + endTStr;
    }
    public string whichType(object type)
    {
        int t = (int)type;
        string res = "";
        switch (t)
        {
            case 1: res = "活动";
                break;
            case 2: res = "比赛";
                break;
            case 3: res = "个人";
                break;
            default: res = "不知道";
                break;
        }
        return res;
    }

    protected void content_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
        {
            //var span = e.Item.FindControl("comments");//也有用，不是ASP.NET控件也没关系的
            Label label = (Label)e.Item.FindControl("commentCount");
            int activityId = (int)DataBinder.Eval(e.Item.DataItem, "ActivityID");
            Comment helpCom = new Comment();
            label.Text = helpCom.GetCommentCount(activityId).ToString();
        }
    }

    protected void publish_Click(object sender, EventArgs e)
    {
        if (string.IsNullOrEmpty(Request.QueryString["activityId"]))
        {
            Response.Redirect("activity.aspx");
        }
        int activityID = int.Parse(Request.QueryString["activityId"]);
        string comtext = this.comText.Value;
        string headImg = this.realHeadImg.Value;
        string username = this.userName.Value;        if(comtext == "" || headImg == "" || username == "")
            return;
        Comment helpCom = new Comment();
        tbComment ncom = new tbComment();
        ncom.ActivityID = activityID;
        ncom.CommentContent = comtext;
        ncom.UserAvatar = headImg;
        ncom.UserName = username;
        ncom.CommentDate = DateTime.Now;
        bool flag = helpCom.AddAComment(ncom);
    }

    protected void sureStatics_Click(object sender, EventArgs e)
    {
        if (ViewState["activityId"] != null)
        {
            int activityId = (int)ViewState["activityId"];
            

            bool ifhaowan = this.ifhaowan.Checked;
            bool ifchedan = this.ifchedan.Checked;
            bool ifjiazhi = this.ifjiazhi.Checked;
            bool iftuhao = this.iftuhao.Checked;
            bool ifmeijin = this.ifmeijin.Checked;

            updateStatics(activityId, ifhaowan, ifchedan, ifjiazhi, iftuhao, ifmeijin);

            this.UpdatePanel3.Update();
        }
    }
}