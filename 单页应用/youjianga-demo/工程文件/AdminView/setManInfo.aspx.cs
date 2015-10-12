using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ActivityMDModel;

public partial class AdminView_setManInfo : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            IfCanVisitedManView();

            int curManID = (int)Session["curManID"];
            Manager helpMan = new Manager();
            tbManager tbMan = helpMan.GetManager(curManID);
            this.NewName.Text = tbMan.ManagerName;
            this.NewPhone.Text = tbMan.ManagerTel;
            this.UserName.Text = tbMan.ManagerUserName;
            this.Email.Text = tbMan.ManagerEmail;
            Status.Text = tbMan.ManagerStatus == 1 ? "正常" : "注销";
            SignTime.Text = tbMan.RegisterTime.ToString();
            LastTime.Text = tbMan.LastLoginTime.ToString();
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

        tbMan.ManagerName = this.NewName.Text;
        tbMan.ManagerTel = this.NewPhone.Text;
        bool flag = helpMan.UpdManager(tbMan);
    }

    protected void UpdatePwd_Click(object sender, EventArgs e)
    {
        int curManID = (int)Session["curManID"];
        Manager helpMan = new Manager();
        tbManager tbMan = helpMan.GetManager(curManID);
        string manPwd = OrthersHelp.Encode(this.oldPwd.Value);//无法保存值是因为又在一个form里，没有action指定个哪个页面
        if (tbMan.ManagerPwd == manPwd)
        {
            tbMan.ManagerPwd = OrthersHelp.Encode(this.newPwd.Value); ;
            bool flag = helpMan.UpdManager(tbMan);
            if (flag)
            {
                Response.Write("<script>alert('成功');</script>");
            }
        }
        else
        {
            Response.Write("<script>alert('原密码输入错误');</script>");
        }
       
    }

    private int JudgeMan(string manName, string manPwd)
    {
        Manager helpMan = new Manager();
        tbManager tbMan = helpMan.GetManager(manName);
        if (tbMan == null)
            return -1;
        if (tbMan.ManagerStatus != 0)
        {
            if (tbMan.ManagerPwd == manPwd)
            {
                Session["curManID"] = tbMan.ManagerID;
                return 1;
            }
            else
                return 2;
        }
        else
            return 0;
    }
}