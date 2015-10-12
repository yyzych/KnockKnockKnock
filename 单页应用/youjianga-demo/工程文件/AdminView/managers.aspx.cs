using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ActivityMDModel;

public partial class AdminView_managers : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Session["curManID"] == null)
            {
                Response.Redirect("login.aspx");
                return;
            }
            int curManID = (int)Session["curManID"];
            Manager helpMan = new Manager();
            tbManager tbMan = helpMan.GetManager(curManID);
            if (tbMan != null)
            {
                ViewState["Authority"] = tbMan.Authority;
            }

            this.ContentList.DataSource = GetData("");
            this.ContentList.DataBind();
        }
    }

    private IEnumerable<tbManager> GetData(string memname)
    {
        Manager helpMem = new Manager();
        IEnumerable<tbManager> membersList = helpMem.Select(memname);
        return membersList;
    }

    protected void ContentList_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        string memname = this.MemName.Value;
        IEnumerable<tbManager> contentList = new List<tbManager>();
        if (memname == "")
        {
            contentList = GetData("");
        }
        else
        {
            contentList = GetData(memname);
        }
        if (contentList == null)
        {
            contentList = new List<tbManager>();
        }
        this.ContentList.DataSource = contentList;
        ContentList.PageIndex = e.NewPageIndex;
        this.ContentList.DataBind();
    }

    protected void ContentList_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        if (ViewState["Authority"] == null)
        {
            Response.Write("<script>alert('无法删除')</script>");
            return;
        }
        int authority = (int) ViewState["Authority"];
        if (authority < 2)
        {
            Response.Write("<script>alert('你没有权限删除')</script>");
            return;
        }
        //int row = e.RowIndex;
        int key = (int)e.Keys[0];
        Manager helpCon = new Manager();
        bool flag = helpCon.DelManager(key);
        if (flag == false)
        {
            Response.Write("<script>alert('删除失败')</script>");
            return;
        }
        this.ContentList.DataSource = GetData("");
        this.ContentList.DataBind();
    }

    protected void search_Click(object sender, EventArgs e)
    {
        string memname = this.MemName.Value;
        IEnumerable<tbManager> contentList = new List<tbManager>();
        if (memname == "")
        {
            contentList = GetData("");
        }
        else
        {
            contentList = GetData(memname);
        }
        if (contentList == null)
        {
            contentList = new List<tbManager>();
        }
        this.ContentList.DataSource = contentList;
        this.ContentList.DataBind();
    }
}