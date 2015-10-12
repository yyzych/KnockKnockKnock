using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ActivityMDModel;

public partial class index : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            InitData();
            GetRecentAct();
        }

    }

    private void GetRecentAct()
    {
        Activity helpActivity = new Activity();
        IEnumerable<tbActivity> res = helpActivity.GetRecentActivity(1);//小时单位
        //IEnumerable<tbActivity> res = helpActivity.GetFiveTop();
        if (res.Count()!=0)
        {
            int length = res.Count();
            Random r=new Random();
            int randomNum = r.Next(0,length);
            tbActivity tbAct=res.ToList()[randomNum];
            //注册javascript
            string url="detailInfo.aspx?activityId="+tbAct.ActivityID;
            string type = "";
            if (tbAct.Type == 1)
            {
                type = "活动之";
            }
            else if (tbAct.Type == 2)
            {
                type = "比赛之";
            }
            else
            {
                type = "个人发起之";
            }
            TimeSpan havetime = (tbAct.BeginTime - DateTime.Now);
            string innerHtml = "\"<div class='notices'><p>通告：" + type + " <a target='_blank' href='" + url + "'>" + tbAct.Header + "</a> 即将开始<span>还有" + havetime.Minutes + "分钟</span></p></div>\"";
            string script = @"<script>
                                function rencentActivity(){
                                    var notices=document.getElementById('notices');
                                    notices.innerHTML="+innerHtml+ @"
                                }
                                rencentActivity();
                            </script>";
            Page.ClientScript.RegisterStartupScript(this.GetType(), "ifRecentActivity", script);
        }
    }
    private void InitData()
    {
        string[] datas = { "","","","","" };

        Activity helpActivity = new Activity();

        //banner fiveTop
        IEnumerable<tbActivity> fiveTop = helpActivity.GetFiveTop();
        this.fiveTop.DataSource=fiveTop;

        //activity
        IEnumerable<tbActivity> activitys = helpActivity.Select(1, 0, 5);
        this.activity.DataSource = activitys;

        //match
        IEnumerable<tbActivity> matchs = helpActivity.Select(2, 0, 5);
        this.match.DataSource = matchs;

        //personal
        IEnumerable<tbActivity> personals = helpActivity.Select(3, 0, 8);
        this.personal.DataSource = personals;

        //match

        Page.DataBind();
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
    public string ReduceText(object activityInfo)
    {
        string info = (string)activityInfo;
        if (info.Length > 130)
        {
            info = info.Substring(0, 130) + "...";
        }
        return info;
    }
    public string ifExpired(object beginTime,object endTime)
    {
        DateTime endT = (DateTime)endTime;
        DateTime beginT = (DateTime)beginTime;
        DateTime now = DateTime.Now;
        if (endT < now)
            return "已过期";
        string endTStr = endT.ToShortDateString();
        endTStr = endTStr.Replace('/', '.');
        string beginTStr = beginT.ToShortDateString();
        beginTStr = beginTStr.Replace('/', '.');
        return beginTStr + "-" + endTStr;
    }

    protected void search_Click(object sender, EventArgs e)
    {
        string searchText = this.searchText.Text;
        if (searchText != "")
        {
            Response.Redirect("activity.aspx?searchText=" + searchText);
        }
    }
}