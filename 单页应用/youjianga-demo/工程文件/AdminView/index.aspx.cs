using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ActivityMDModel;

public partial class AdminView_index : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            IfCanVisitedManView();

            int curVisitedCount = Convert.ToInt32(Application["counter"]);
            this.yesMemberNum.Text = curVisitedCount.ToString();

            Subscribe_Activity helpSubAct = new Subscribe_Activity();
            DateTime now = DateTime.Now;

            IEnumerable<viSubscribe> datas = helpSubAct.Select(null, new DateTime(now.Year,now.Month,now.Day+1));//时间为明天

            this.troSubscribeNum.Text = datas.Count().ToString();
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
}