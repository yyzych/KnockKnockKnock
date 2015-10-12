using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActivityMDModel;

/// <summary>
///Activity 的摘要说明
/// </summary>
public class Activity
{
    private ActivityMDEntities2 entitiesMC = new ActivityMDEntities2();
    private IEnumerable<tbActivity> nullRes = new List<tbActivity>();

    public tbActivity GetAActivity(int activityId)
    {
        try
        {
            var tbAct = (from p in entitiesMC.tbActivity
                         where p.ActivityID == activityId
                         select p).FirstOrDefault();
            return tbAct;
        }
        catch
        {
            return null;
        }
    }

    /// <summary>
    /// 获取最近一个小时的所有活动，比赛，个人
    /// </summary>
    /// <returns></returns>
    public IEnumerable<tbActivity> GetRecentActivity(int times)
    {
        try
        {
            DateTime now = DateTime.Now;
            DateTime rent = DateTime.Now;
            rent = rent.AddHours(times);
            var tbAct = from p in entitiesMC.tbActivity
                        where now < p.BeginTime && p.BeginTime < rent
                        select p;
            return tbAct;
        }
        catch
        {
            return null;
        }
    }

    /// <summary>
    /// 某一项最大，有可能会重复
    /// </summary>
    /// <returns></returns>
    public IEnumerable<tbActivity> GetFiveTop()
    {
        try
        {
            List<tbActivity> res = new List<tbActivity>();
            DateTime curTime=DateTime.Now;
            //string[] props = { "Haowan", "Jiazhi", "Tuhao", "Meijin", "chedan" };
            //foreach (string pItem in props)
            //{
            //    var item = (from p in entitiesMC.tbActivity
            //                join t in entitiesMC.tbStatistics on p.ActivityID equals t.ActivityID
            //                where p.EndTime < curTime && (double)GetPropertyValue(t, pItem) == entitiesMC.tbStatistics.Max(q => (double)GetPropertyValue(q, pItem))        //好玩最大，并且没有过期的
            //                select p).FirstOrDefault();
            //    res.Add(item);
            //}
            //return res;
            //var haowan = (from p in entitiesMC.tbActivity
            //              join t in entitiesMC.tbStatistics on p.ActivityID equals t.ActivityID
            //              where p.EndTime > curTime
            //              let val=t.Haowan/t.C_Haowan
            //              where val == entitiesMC.tbStatistics.Max(q => q.Haowan/q.C_Haowan)
            //              select p).FirstOrDefault();
            var haowan = (from p in entitiesMC.tbActivity
                          join t in entitiesMC.tbStatistics on p.ActivityID equals t.ActivityID
                          where t.Haowan == entitiesMC.tbStatistics.Max(q => q.Haowan)        //某一项最大，并且没有过期的--不是求比率
                          orderby p.EndTime descending
                          select p).FirstOrDefault();
            res.Add(haowan);
            var jiazhi = (from p in entitiesMC.tbActivity
                          join t in entitiesMC.tbStatistics on p.ActivityID equals t.ActivityID
                          where t.Jiazhi == entitiesMC.tbStatistics.Max(q => q.Jiazhi)        
                          orderby p.EndTime descending
                          select p).FirstOrDefault();
            res.Add(jiazhi);
            var tuhao = (from p in entitiesMC.tbActivity
                          join t in entitiesMC.tbStatistics on p.ActivityID equals t.ActivityID
                          where t.Tuhao == entitiesMC.tbStatistics.Max(q => q.Tuhao)        
                          orderby p.EndTime descending
                          select p).FirstOrDefault();
            res.Add(tuhao);
            var meijin = (from p in entitiesMC.tbActivity
                          join t in entitiesMC.tbStatistics on p.ActivityID equals t.ActivityID
                          where t.Meijin == entitiesMC.tbStatistics.Max(q => q.Meijin)        
                          orderby p.EndTime descending
                          select p).FirstOrDefault();
            res.Add(meijin);
            var chedan = (from p in entitiesMC.tbActivity
                          join t in entitiesMC.tbStatistics on p.ActivityID equals t.ActivityID
                          where t.Chedan == entitiesMC.tbStatistics.Max(q => q.Chedan)        
                          orderby p.EndTime descending
                          select p).FirstOrDefault();
            res.Add(chedan);
            return res;
        }
        catch(Exception err)
        {
            string errStr = err.InnerException.ToString();
            return nullRes;
        }
    }
    //返回属性的值
    private static object GetPropertyValue(object obj, string property)
    {
        System.Reflection.PropertyInfo propertyInfo = obj.GetType().GetProperty(property);
        return propertyInfo.GetValue(obj, null);
    }

    public bool AddAActivity(tbActivity nAct)
    {
        try
        {
            entitiesMC.tbActivity.AddObject(nAct);
            entitiesMC.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool DelAActivity(int activityId)
    {
        try
        {
            tbActivity delAct = GetAActivity(activityId);
            Comment helpCom = new Comment();
            helpCom.DelComments(delAct.ActivityID);//要删掉评论
            entitiesMC.tbActivity.DeleteObject(delAct);
            entitiesMC.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool UpdAActivity(tbActivity uAct)
    {
        try
        {
            entitiesMC.SaveChanges();
            return true;
        }
        catch(Exception err)
        {
            string str = err.InnerException.Message;
            return false;
        }
    }

    /// <summary>
    /// 根据类别，标签id(等于0表示选择全部)选择.按照开始时间越来越临近了的排
    /// </summary>
    /// <param name="type"></param>
    /// <param name="tagId"></param>
    /// <returns></returns>
    public IEnumerable<tbActivity> Select(int type, int tagId,int selectNum)
    {
        try
        {
            if (type != 0)
            {
                if (tagId != 0)
                {
                    var res = (from p in entitiesMC.tbActivity
                               where p.Type == type && p.TagID == tagId
                               orderby p.BeginTime descending
                               select p).Take(selectNum);
                    return res;
                }
                else
                {
                    var res = (from p in entitiesMC.tbActivity
                               where p.Type == type
                               orderby p.BeginTime descending
                               select p).Take(selectNum);
                    return res;
                }
            }
            else
            {
                if (tagId != 0)
                {
                    var res = (from p in entitiesMC.tbActivity
                               where p.TagID == tagId
                               orderby p.BeginTime descending
                               select p).Take(selectNum);
                    return res;
                }
                else
                {
                    //最好能根据活动开始日期排序--时间越晚排前面
                    var res = (from p in entitiesMC.tbActivity
                               orderby p.BeginTime descending
                               select p).Take(selectNum);
                    return res;
                }
            }
        }
        catch
        {
            return nullRes;
        }
    }
    public IEnumerable<tbActivity> Select(int type, int tagId)
    {
        try
        {
            if (type != 0)
            {
                if (tagId != 0)
                {
                    var res = from p in entitiesMC.tbActivity
                               where p.Type == type && p.TagID == tagId
                               orderby p.BeginTime descending
                               select p;
                    return res;
                }
                else
                {
                    var res = from p in entitiesMC.tbActivity
                               where p.Type == type
                               orderby p.BeginTime descending
                               select p;
                    return res;
                }
            }
            else
            {
                if (tagId != 0)
                {
                    var res = from p in entitiesMC.tbActivity
                               where p.TagID == tagId
                               orderby p.BeginTime descending
                               select p;
                    return res;
                }
                else
                {
                    //最好能根据活动开始日期排序--时间越晚排前面
                    var res = from p in entitiesMC.tbActivity
                               orderby p.BeginTime descending
                               select p;
                    return res;
                }
            }
        }
        catch
        {
            return nullRes;
        }
    }
    public IEnumerable<tbActivity> Select(int type, DateTime? limite)
    {
        try
        {
            if (type != 0)
            {
                if (limite != null)
                {
                    var res = from p in entitiesMC.tbActivity
                              where p.Type == type && p.EndTime < limite
                              orderby p.BeginTime descending        //最近时间（即最新）的开始排序
                              select p;
                    return res;
                }
                else
                {
                    var res = from p in entitiesMC.tbActivity
                              where p.Type == type
                              orderby p.BeginTime descending
                              select p;
                    return res;
                }
            }
            else
            {
                if (limite != null)
                {
                    var res = from p in entitiesMC.tbActivity
                              where p.EndTime < limite
                              orderby p.BeginTime descending
                              select p;
                    return res;
                }
                else
                {
                    //最好能根据活动开始日期排序--时间越晚排前面
                    var res = from p in entitiesMC.tbActivity
                              orderby p.BeginTime descending
                              select p;
                    return res;
                }
            }
        }
        catch
        {
            return nullRes;
        }
    }

    /// <summary>
    /// 搜索标题，关键字
    /// </summary>
    /// <param name="word"></param>
    /// <returns></returns>
    public IEnumerable<tbActivity> Search(string word)
    {
        try
        {
            if (word != "")
            {
                var res = from p in entitiesMC.tbActivity
                          where p.Header.Contains(word) || p.Keyword.Contains(word)
                          orderby p.BeginTime
                          select p;
                return res;
            }
            else
            {
                return nullRes;
            }
        }
        catch
        {
            return nullRes;
        }
    }
}

public class _tbActivity
{
    /// <summary>
    /// true:没有过期
    /// </summary>
    private bool isExpired;
    public bool IsExpired{ get; set; }

    private tbActivity activity;
    public tbActivity Activity 
    {
        get
        {
            return Activity;
        }
        set
        {
            DateTime endTime = value.EndTime;
            isExpired = IfExpired(endTime);
            activity = value;
        }
    }

    private bool IfExpired(DateTime time)
    {
        DateTime curTime = DateTime.Now;
        if (time < curTime)
        {
            return false;
        }
        return true;
    }
}