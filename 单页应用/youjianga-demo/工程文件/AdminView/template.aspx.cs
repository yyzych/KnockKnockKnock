using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ActivityMDModel;

public partial class AdminView_template : System.Web.UI.Page
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
                this.ManUserName.InnerText = tbMan.ManagerUserName;
            }
        }

    }

    protected void ManLogout_Click(object sender, EventArgs e)
    {
        Session["curManID"] = null;
        WriteManCookie(Request.Cookies["curMan"].Values["ManEmail"], "", false);
        Response.Redirect("login.aspx");
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
}