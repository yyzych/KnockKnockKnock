using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActivityMDModel;

/// <summary>
///Subscribe 的摘要说明
/// </summary>
public class Subscribe
{
    private ActivityMDEntities2 entitiesMC = new ActivityMDEntities2();
    private IEnumerable<tbSubscribe> nullRes = new List<tbSubscribe>();

    public tbSubscribe GetASubscribe(int subId)
    {
        try
        {
            var theSub = (from p in entitiesMC.tbSubscribe
                          where p.SubscribeID == subId
                          select p).FirstOrDefault();
            return theSub;
        }
        catch
        {
            return null;
        }
    }

    public tbSubscribe GetASubscribe(int activityId, string email)
    {
        try
        {
            var theSub = (from p in entitiesMC.tbSubscribe
                          where p.ActivityID == activityId && p.UserEmail == email
                          select p).FirstOrDefault();
            return theSub;
        }
        catch
        {
            return null;
        }
    }


    public bool AddASubscribe(tbSubscribe nSub)
    {
        try
        {
            entitiesMC.tbSubscribe.AddObject(nSub);
            entitiesMC.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool UpdASubscribe(tbSubscribe uSub)
    {
        try
        {
            entitiesMC.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// 根据SubscribeId删除一条记录
    /// </summary>
    /// <param name="SubscribeId"></param>
    /// <returns></returns>
    public bool DelASubscribe(int SubscribeId)
    {
        try
        {
            tbSubscribe delSub = GetASubscribe(SubscribeId);
            entitiesMC.tbSubscribe.DeleteObject(delSub);
            entitiesMC.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// 根据activityId删除一个活动的所有评论
    /// </summary>
    /// <param name="activityId"></param>
    /// <returns></returns>
    public bool DelSubscribes(int activityId)
    {
        try
        {
            IEnumerable<tbSubscribe> delSubs = Select(activityId);
            if (delSubs != null)
            {
                foreach (var item in delSubs)
                {
                    entitiesMC.tbSubscribe.DeleteObject(item);
                }
            }
            entitiesMC.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }

    public IEnumerable<tbSubscribe> Select(int subscribeId)
    {
        try
        {
            var res = from p in entitiesMC.tbSubscribe
                      where p.SubscribeID == subscribeId
                      select p;
            return res;
               
        }
        catch
        {
            return nullRes;
        }
    }

}