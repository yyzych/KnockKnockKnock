using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ActivityMDModel;

public partial class AdminView_comment : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            IfCanVisitedManView();

            this.ContentList.DataSource = GetData(null, "");
            this.ContentList.DataBind();
        }
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

    private IEnumerable<tbComment> GetData(int? activityId, string username)
    {
        Comment helpAct = new Comment();
        IEnumerable<tbComment> datas = helpAct.Select(activityId, username);
        return datas;
    }

    protected void ContentList_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        IEnumerable<tbComment> contentList = InitData();

        this.ContentList.DataSource = contentList;
        ContentList.PageIndex = e.NewPageIndex;
        this.ContentList.DataBind();
    }

    private IEnumerable<tbComment> InitData()
    {
        string usename = this.userName.Text;
        string activityId = this.acvitityId.Text;
        IEnumerable<tbComment> contentList = new List<tbComment>();
        if (usename == "")
        {
            if (activityId == "")
            {
                contentList = GetData(null, "");
            }
            else
            {
                contentList = GetData(int.Parse(activityId), "");
            }
        }
        else
        {
            if (activityId == "")
            {
                contentList = GetData(null, usename);
            }
            else
            {
                contentList = GetData(int.Parse(activityId), usename);
            }
        }
        if (contentList == null)
        {
            contentList = new List<tbComment>();
        }
        return contentList;
    }

    protected void ContentList_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        //int row = e.RowIndex;
        int key = (int)e.Keys[0];
        Comment helpCom = new Comment();
        bool flag = helpCom.DelAComment(key);
        if (flag == false)
        {
            Response.Write("<script>alert('删除失败')</script>");
        }
        this.ContentList.DataSource = InitData();
        this.ContentList.DataBind();
    }

    public string ReduceText(string content)
    {
        string info = (string)content;
        if (info.Length > 120)
        {
            info = info.Substring(0, 120) + "...";
        }
        return info;
    }
    protected void ContentList_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            e.Row.Cells[2].Text = ReduceText(e.Row.Cells[2].Text);
        }
    }

    protected void filter_Click(object sender, EventArgs e)
    {
        this.searchText.Text = "";
        IEnumerable<tbComment> contentList = InitData();

        this.ContentList.DataSource = contentList;
        this.ContentList.DataBind();
    }
    protected void search_Click(object sender, EventArgs e)
    {
        this.userName.Text = "";
        this.acvitityId.Text = "";
        string searchText = this.searchText.Text;
        if (searchText != "")
        {
            GetSearchData(searchText);
        }
    }

    private void GetSearchData(string searchText)
    {
        Comment helpCom = new Comment();
        IEnumerable<tbComment> datas = helpCom.Search(searchText);
        this.ContentList.DataSource = datas;
        this.ContentList.DataBind();
    }
}