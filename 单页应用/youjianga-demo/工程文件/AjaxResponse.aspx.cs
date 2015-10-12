using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ActivityMDModel;
using Newtonsoft.Json;
using System.Configuration;

public partial class AjaxResponse : System.Web.UI.Page
{
    private int selComNum = int.Parse(ConfigurationManager.AppSettings["selComNum"]);

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (Request.Params["activityId"] != null && Request.Params["email"] != null)
            {
                string email = (Request.Params["email"]);
                int activityId = int.Parse(Request.Params["activityId"]);
                AddSubscribe(activityId, email);
            }
            else if (Request.Params["activityId"] != null && Request.Params["skipNum"] != null)
            {
                int activityId = int.Parse(Request.Params["activityId"]);
                int skipNum = int.Parse(Request.Params["skipNum"]);
                GetMoreComments(activityId, skipNum);
            }
            //GetMoreComments(1, 8);
        }
        catch (Exception err)
        {
            string mes = err.InnerException.Message;
        }
    }

    private void AddSubscribe(int activityId,string email)
    {
        Subscribe helpSub = new Subscribe();
        if(helpSub.GetASubscribe(activityId,email)!=null){
            Response.Write("该邮箱已订阅");
            return;
        }
        tbSubscribe nSub = new tbSubscribe();
        nSub.ActivityID = activityId;
        nSub.UserEmail = email;
        nSub.Status = 0;
        bool flag = helpSub.AddASubscribe(nSub);
        if (flag)
        {
            Response.Write("true");
        }
    }

    private void GetMoreComments(int activityId,int skipNum)
    {
        Comment helpCom = new Comment();
        IEnumerable<_tbComment> commtents = helpCom.Select(activityId, selComNum, skipNum);//默认取8条
        //IEnumerable<_tbComment> commtents = helpCom.Select(activityId, skipNum);
        //转换为json
        string res = ObjectToJson(commtents);
        Response.Write(res);
    }

    private string ObjectToJson(object obj)
    {
        string str = JsonConvert.SerializeObject(obj);
        return str;
    }
}