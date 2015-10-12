using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ActivityMDModel;

public partial class AdminView_login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Request.UrlReferrer != null && Request.UrlReferrer.ToString().IndexOf("login.aspx") == -1)
            {
                string str = Request.UrlReferrer.ToString();
            }
            if (Request.Cookies["curMan"] != null)
            {
                string manPwd = Request.Cookies["curMan"].Values["ManPwd"];
                string manName = Request.Cookies["curMan"].Values["ManEmail"];
                if (manPwd == "")
                {
                    this.ManUserName.Value = manName;
                    return;
                }
                int res = JudgeMan(manName, manPwd);
                if (res == 1)
                {
                    Response.Redirect("template.aspx");
                }
                else
                {
                    //清除cookie
                    HttpCookie delcookie = new HttpCookie("curMan");
                    delcookie.Expires = DateTime.Now.AddMinutes(-1);
                    Response.Cookies.Add(delcookie);
                }
            }
        }
    }

    protected void ManLogin_Click(object sender, EventArgs e)
    {
        string manName = this.ManUserName.Value;//邮箱
        string manPwd = OrthersHelp.Encode(this.ManPwd.Value);
        bool tag = this.IfRememberMe.Checked;
        int res = JudgeMan(manName, manPwd);
        if (res == 1)
        {
            WriteManCookie(manName, manPwd, tag);
            Response.Redirect("Template.aspx");
        }
        else if (res == 2)
        {
            Response.Write("<script>alert('密码错误请重新输入');</script>");
        }
        else if (res == -1)
        {
            Response.Write("<script>alert('没有该帐户');</script>");
        }
        else
        {
            Response.Write("<script>alert('账户已注销，请先开通');</script>");
        }
    }

    private void WriteManCookie(string manName, string manPwd, bool tag)
    {
        HttpCookie objCookie = new HttpCookie("curMan");
        objCookie.Expires = DateTime.Now.AddMinutes(30);
        objCookie.Values["ManEmail"] = manName;
        if (tag == true)
        {
            objCookie.Values["ManPwd"] = manPwd;
        }
        else
        {
            objCookie.Values["ManPwd"] = "";
        }
        //Session["curMemID"] = CurMemberID;
        Response.Cookies.Add(objCookie);
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