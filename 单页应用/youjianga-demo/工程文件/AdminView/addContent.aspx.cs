using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ActivityMDModel;
using System.Text.RegularExpressions;
using System.Configuration;

public partial class AdminView_addContent : System.Web.UI.Page
{
    public string matchImgDir = ConfigurationManager.AppSettings["matchImgDir"];
    public string activityImgDir =ConfigurationManager.AppSettings["activityImgDir"];
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            IfCanVisitedManView();

            InitTagData(1);

            ListItem al = new ListItem("活动", "1");
            ListItem ml = new ListItem("比赛", "2");
            ListItem pl = new ListItem("个人", "3");
            this.typeSelect.Items.Add(al);
            this.typeSelect.Items.Add(ml);
            this.typeSelect.Items.Add(pl);

            ListItem fh = new ListItem("时", "0");
            this.bHours.Items.Add(fh);
            this.eHours.Items.Add(fh);
            for (int i = 1; i < 24; i++)
            {
                ListItem n = new ListItem(i.ToString(), i.ToString());
                this.bHours.Items.Add(n);
                this.eHours.Items.Add(n);
            }
            ListItem fm = new ListItem("分", "0");
            this.bMinute.Items.Add(fm);
            this.eMinute.Items.Add(fm);
            for (int i = 1; i < 60; i++)
            {
                ListItem n = new ListItem(i.ToString(), i.ToString());
                this.bMinute.Items.Add(n);
                this.eMinute.Items.Add(n);
            }
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

    public void InitTagData(int type)
    {
        Tag helpTag = new Tag();
        IEnumerable<tbTag> tags = helpTag.Select(type);
        this.tagSelect.Items.Clear();
        this.tagSelect.Items.Add(new ListItem("选择标签"));
        foreach (tbTag item in tags)
        {
            ListItem lt = new ListItem(item.TagName, item.TagID.ToString());
            this.tagSelect.Items.Add(lt);
        }
    }

    protected void save_Click(object sender, EventArgs e)
    {
        try
        {
            this.Validate();
            tbActivity nAct = new tbActivity();
            Activity helpAct = new Activity();
            nAct.UserEmail = this.userEmail.Value;
            nAct.Type = int.Parse(this.typeSelect.SelectedValue);
            if (this.tagSelect.SelectedIndex == 0)
                return;
            nAct.TagID = int.Parse(this.tagSelect.SelectedValue);
            nAct.RewardIntro = this.rewardIntro.Value;
            nAct.Header = this.headerText.Value;
            nAct.Keyword = this.keyword.Value != "" ? this.keyword.Value : nAct.Header;
            nAct.ActivityIntro = this.activityIntro.Value;
            nAct.OutLink = this.outlink.Value != "" ? this.outlink.Value : "";
            string[] btime = this.beginTime.Value.Split('-');
            nAct.BeginTime = new DateTime(int.Parse(btime[0]), int.Parse(btime[1]), int.Parse(btime[2]), this.bHours.SelectedIndex, this.bMinute.SelectedIndex, 0);
            string[] ebtime = this.endTime.Value.Split('-');
            nAct.EndTime = new DateTime(int.Parse(ebtime[0]), int.Parse(ebtime[1]), int.Parse(ebtime[2]), this.eHours.SelectedIndex, this.eMinute.SelectedIndex, 0);
            nAct.Seetimes = 0;
            string imgDir = "";
            if (this.FileUpload1.HasFile == true)
            {
                if (int.Parse(this.typeSelect.SelectedValue) == 1)
                {
                    imgDir = uploadImg(activityImgDir);
                }
                else
                {
                    imgDir = uploadImg(matchImgDir);
                }
                
            }
            if (imgDir != "")
            {
                nAct.ActivityImg = imgDir;
            }
            bool falg = helpAct.AddAActivity(nAct);
            if (falg == true)
            {
                Response.Write("<script>alert('添加成功');</script>");
            }
            else
            {
                Response.Write("<script>alert('出错了，请稍后重试');</script>");
            }

        }
        catch
        {
            Response.Write("<script>alert('出错了，请稍后重试');</script>");
        }
    }
    public string GetExtension(string fileName)
    {
        int i = fileName.LastIndexOf(".") + 1;
        string Name = fileName.Substring(i);
        return Name;
    }
    private string uploadImg(string path)
    {
        try
        {
            string fileName = this.FileUpload1.FileName;
            string exte = GetExtension(fileName);
            if (exte != "jpg" && exte != "png" && exte != "gif")
            {
                Response.Write("<script>alert('不支持该类型')</script>");
                return "";
            }
            string saveName = path + Regex.Replace(DateTime.Now.ToString(), @"\D+", "") + "." + exte;
            string dir = Server.MapPath("../" + saveName);
            this.FileUpload1.SaveAs(dir);
            return saveName;
        }
        catch (Exception err)
        {
            string mes = err.Message;
            return "";
        }
    }
    protected void typeSelect_SelectedIndexChanged(object sender, EventArgs e)
    {
        int type = int.Parse(this.typeSelect.SelectedValue);
        InitTagData(type);
    }
}