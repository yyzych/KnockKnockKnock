using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ActivityMDModel;

public partial class activity : System.Web.UI.Page
{
    private Activity helpActivity = new Activity();

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            GetTagData();
            if (!string.IsNullOrEmpty(Request.QueryString["type"]))
            {
                int type = int.Parse(Request.QueryString["type"]);
                GetContentData(type, 0);
            }
            else if (!string.IsNullOrEmpty(Request.QueryString["searchText"]))
            {
                string searchText = Request.QueryString["searchText"];
                GetSearchData(searchText);
            }
            else
            {
                GetContentData(1, 0);//默认显示活动类别的
            }
            
            Page.DataBind();
        }
    }

    protected void search_Click(object sender, EventArgs e)
    {
        string searchText = this.searchText.Text;
        if (searchText != "")
        {
            GetSearchData(searchText);
        }
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
    private void GetTagData()
    {
        Tag helpTag = new Tag();
        this.activityPane.DataSource = helpTag.Select(1);
        this.matchPane.DataSource = helpTag.Select(2);
        this.personalPane.DataSource = helpTag.Select(3);
    }
    private void GetContentData(int type, int tagId)
    {
        IEnumerable<tbActivity> datas = helpActivity.Select(type, tagId);
        this.contents.DataSource = datas;
        this.contents.DataBind();
    }
    private void GetSearchData(string searchText)
    {
        IEnumerable<tbActivity> datas = helpActivity.Search(searchText);
        this.contents.DataSource = datas;
        this.contents.DataBind();
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
            return "已过期";
        string endTStr = endT.ToShortDateString();
        endTStr = endTStr.Replace('/', '.');
        string beginTStr = beginT.ToShortDateString();
        beginTStr = beginTStr.Replace('/', '.');
        return beginTStr + "-" + endTStr;
    }

    protected void contents_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        int type = 1, tagId = 0;
        if (ViewState["Type"] != null)
            type = (int)ViewState["Type"];
        if (ViewState["TagId"] != null)
            tagId = int.Parse((string)ViewState["TagId"]);
        IEnumerable<tbActivity> datas = helpActivity.Select(type, tagId);
        this.contents.PageIndex = e.NewPageIndex;
        this.contents.DataSource = datas;
        this.contents.DataBind();
    }

    protected void activityTag_Click(object sender, EventArgs e)
    {
        LinkButton lb = (LinkButton)sender;
        string tagId = lb.CommandArgument;
        ViewState["Type"] = 1;
        ViewState["TagId"] = tagId;
        GetContentData(1, int.Parse(tagId));
        this.UpdatePanel1.Update();
        //Response.Write("<script>alert('" + tagId + "');</script>");
    }
    protected void matchTab_Click(object sender, EventArgs e)
    {
        LinkButton lb = (LinkButton)sender;
        string tagId = lb.CommandArgument;
        ViewState["Type"] = 2;
        ViewState["TagId"] = tagId;
        GetContentData(2, int.Parse(tagId));
        this.UpdatePanel1.Update();
        //Response.Write("<script>alert('" + tagId + "');</script>");
    }
    protected void personalTab_Click(object sender, EventArgs e)
    {
        LinkButton lb = (LinkButton)sender;
        string tagId = lb.CommandArgument;
        ViewState["Type"] = 3;
        ViewState["TagId"] = tagId;
        GetContentData(3, int.Parse(tagId));
        this.UpdatePanel1.Update();
        //Response.Write("<script>alert('" + tagId + "');</script>");
    }
}