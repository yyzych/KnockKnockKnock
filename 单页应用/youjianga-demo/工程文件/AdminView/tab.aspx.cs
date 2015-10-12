using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ActivityMDModel;

public partial class AdminView_tab : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            IfCanVisitedManView();

            this.ContentList.DataSource = GetData(0);
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

    //获得内容，0视频 1文章
    private IEnumerable<tbTag> GetData(int type)
    {
        Tag helpTag = new Tag();
        IEnumerable<tbTag> datas = helpTag.Select(type);
        return datas;
    }

    protected void ContentList_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        IEnumerable<tbTag> contentList = InitData();

        this.ContentList.DataSource = contentList;
        ContentList.PageIndex = e.NewPageIndex;
        this.ContentList.DataBind();
    }

    private IEnumerable<tbTag> InitData()
    {
        string contentype = this.ContentType.SelectedValue;
        IEnumerable<tbTag> contentList = new List<tbTag>();
        contentList = GetData(int.Parse(contentype));
        if (contentList == null)
        {
            contentList = new List<tbTag>();
        }
        return contentList;
    }

    protected void ContentList_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        //int row = e.RowIndex;
        int key = (int)e.Keys[0];
        Tag helpTag = new Tag();
        bool flag = helpTag.DelATag(key);
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
            if (e.Row.Cells[1].Text == "1")
            {
                e.Row.Cells[1].Text = "活动";
            }
            else if (e.Row.Cells[1].Text == "2")
            {
                e.Row.Cells[1].Text = "比赛";
            }
            else if (e.Row.Cells[1].Text == "3")
            {
                e.Row.Cells[1].Text = "个人";
            }

        }
    }

    protected void filter_Click(object sender, EventArgs e)
    {
        IEnumerable<tbTag> contentList = InitData();

        this.ContentList.DataSource = contentList;
        this.ContentList.DataBind();
    }
    protected void addTag_Click(object sender, EventArgs e)
    {
        Tag helpTag = new Tag();
        tbTag nTag = new tbTag();
        nTag.TagName = this.nTagName.Text;
        nTag.Type = int.Parse(this.nTagType.SelectedValue);
        bool flag = helpTag.AddATag(nTag);
    }
}