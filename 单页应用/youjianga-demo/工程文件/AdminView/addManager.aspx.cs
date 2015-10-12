using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ActivityMDModel;

public partial class AdminView_addManager : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            IfCanVisitedManView();

            ListItem n1 = new ListItem("普通", "1");
            ListItem n2 = new ListItem("高级", "2");

            this.authority.Items.Add(n1);
            this.authority.Items.Add(n2);
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

    protected void Save_Click(object sender, EventArgs e)
    {
        int curManID = (int)Session["curManID"];

        Manager helpMan = new Manager();
        tbManager tbMan = helpMan.GetManager(curManID);
        if (tbMan.Authority < 2)
        {
            Response.Write("<script>alert('你没有权限添加管理员')</script>");
            return;
        }
        if (!Manager.EmailUnion(this.Email.Text))
        {
            Response.Write("<script>alert('该邮箱已被注册')</script>");
            return;
        }
        tbManager nMan = new tbManager();
        nMan.Authority = int.Parse(this.authority.SelectedValue);
        nMan.ManagerUserName = this.UserName.Text;
        nMan.ManagerName = this.NewName.Text;
        nMan.ManagerTel = this.NewName.Text;
        nMan.ManagerEmail = this.Email.Text;
        nMan.LastLoginTime = nMan.RegisterTime = DateTime.Now;
        nMan.ManagerStatus = 1;
        nMan.ManagerPwd = OrthersHelp.Encode(this.password1.Value);

        bool flag = helpMan.AddManager(nMan);
        if (flag == true)
        {
            Response.Write("<script>alert('添加成功')</script>");
            return;
        }
       
    }
}