using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using ActivityMDModel;
using System.Text.RegularExpressions;

public partial class publish : System.Web.UI.Page
{
    public string personImgDir = ConfigurationManager.AppSettings["personImgDir"];
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            InitTagData();
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

    public void InitTagData()
    {
        Tag helpTag = new Tag();
        IEnumerable<tbTag> tags = helpTag.Select(3);
        this.tagSelect.Items.Add(new ListItem("选择类别"));
        foreach (tbTag item in tags)
        {
            ListItem lt = new ListItem(item.TagName, item.TagID.ToString());
            this.tagSelect.Items.Add(lt);
        }
    }

    protected void search_Click(object sender, EventArgs e)
    {
        string searchText = this.searchText.Text;
        if (searchText != "")
        {
            Response.Redirect("activity.aspx?searchText=" + searchText);
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
            nAct.Type = 3;
            if (this.tagSelect.SelectedIndex == 0)
                return;
            nAct.TagID = int.Parse(this.tagSelect.SelectedValue);
            nAct.RewardIntro = this.rewardIntro.Value;
            nAct.Header = this.headerText.Value;
            nAct.Keyword = this.keyword.Value != "" ? this.keyword.Value : nAct.Header;
            nAct.ActivityIntro = this.activityIntro.Value;
            nAct.OutLink = this.outlink.Value != "" ? this.outlink.Value : "";
            string[] btime=this.beginTime.Value.Split('-');
            nAct.BeginTime = new DateTime(int.Parse(btime[0]), int.Parse(btime[1]), int.Parse(btime[2]), this.bHours.SelectedIndex, this.bMinute.SelectedIndex,0);
            string[] ebtime = this.endTime.Value.Split('-');
            nAct.EndTime = new DateTime(int.Parse(ebtime[0]), int.Parse(ebtime[1]), int.Parse(ebtime[2]), this.eHours.SelectedIndex, this.eMinute.SelectedIndex, 0);
            nAct.Seetimes = 0;
            string imgDir = "";
            if (this.FileUpload1.HasFile == true)
            {
                imgDir = uploadImg();
            }
            if (imgDir != "")
            {
                nAct.ActivityImg = imgDir;
            }
            bool falg = helpAct.AddAActivity(nAct);
            if (falg == true)
            {
                Response.Write("上传成功移步查看");
                Response.Redirect("detailInfo.aspx?activityId=" + nAct.ActivityID);
            }
            else
            {
                Response.Write("出错了，请稍后重试");
            }

        }
        catch
        {
            Response.Write("出错了，请稍后重试");
        }
    }
    public string GetExtension(string fileName)
    {
        int i = fileName.LastIndexOf(".") + 1;
        string Name = fileName.Substring(i);
        return Name;
    }
    private string uploadImg()
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
            string saveName = personImgDir + Regex.Replace(DateTime.Now.ToString(), @"\D+", "") + "." + exte;
            string dir = Server.MapPath(saveName);
            this.FileUpload1.SaveAs(dir);
            return saveName;
        }
        catch(Exception err)
        {
            string mes=err.Message;
            return "";
        }
    }
    protected void Button1_Click(object sender, EventArgs e)
    {

    }
}