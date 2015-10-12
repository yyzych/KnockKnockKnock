using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ActivityMDModel;

public partial class AdminView_content : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            IfCanVisitedManView();

            this.ContentList.DataSource = GetData(0,null);
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
    private IEnumerable<tbActivity> GetData(int type, DateTime? limite)
    {
        Activity helpAct = new Activity();
        IEnumerable<tbActivity> datas = helpAct.Select(type, limite);
        return datas;
    }

    protected void ContentList_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        IEnumerable<tbActivity> contentList = InitData();
        
        this.ContentList.DataSource = contentList;
        ContentList.PageIndex = e.NewPageIndex;
        this.ContentList.DataBind();
    }

    private IEnumerable<tbActivity> InitData()
    {
        string tiemLimite = this.tiemLimite.Checked == true ? "1" : "0";//1表示已过期，有时间限制
        string contentype = this.ContentType.SelectedValue;
        IEnumerable<tbActivity> contentList = new List<tbActivity>();
        if (tiemLimite == "0")//全部
        {
            if (contentype == "0")
            {
                contentList = GetData(0, null);
            }
            else
            {
                contentList = GetData(int.Parse(contentype), null);
            }
        }
        else
        {
            if (contentype == "0")
            {
                contentList = GetData(0, DateTime.Now);
            }
            else
            {
                contentList = GetData(int.Parse(contentype), DateTime.Now);
            }
        }
        if (contentList == null)
        {
            contentList = new List<tbActivity>();
        }
        return contentList;
    }

    protected void ContentList_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        //int row = e.RowIndex;
        int key = (int)e.Keys[0];
        Activity helpAct = new Activity();
        bool flag = helpAct.DelAActivity(key);
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
            //Activity helpAct = new Activity();
            //tbActivity tbAct = helpAct.GetAActivity(int.Parse(e.Row.Cells[0].Text));
            //if (tbAct == null)
            //    return;

            if (e.Row.Cells[3].Text == "1")
            {
                e.Row.Cells[3].Text = "活动";
            }
            else if (e.Row.Cells[3].Text == "2")
            {
                e.Row.Cells[3].Text = "比赛";
            }
            else if (e.Row.Cells[3].Text == "3")
            {
                e.Row.Cells[3].Text = "个人";
            }

        }
    }

    protected void filter_Click(object sender, EventArgs e)
    {
        this.searchText.Text = "";
        IEnumerable<tbActivity> contentList = InitData();
        
        this.ContentList.DataSource = contentList;
        this.ContentList.DataBind();
    }
    protected void search_Click(object sender, EventArgs e)
    {
        this.tiemLimite.Text = "";
        this.ContentType.SelectedIndex = 0;
        string searchText = this.searchText.Text;
        if (searchText != "")
        {
            GetSearchData(searchText);
        }
    }

    private void GetSearchData(string searchText)
    {
        Activity helpAct = new Activity();
        IEnumerable<tbActivity> datas = helpAct.Search(searchText);
        this.ContentList.DataSource = datas;
        this.ContentList.DataBind();
    }
    protected void ContentList_RowCommand(object sender, GridViewCommandEventArgs e)
    {

    }
}