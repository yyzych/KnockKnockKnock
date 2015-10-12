using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActivityMDModel;

/// <summary>
///Subscribe_Activity 的摘要说明
/// </summary>
public class Subscribe_Activity
{
    private ActivityMDEntities2 entitiesMC = new ActivityMDEntities2();
    private IEnumerable<viSubscribe> nullRes = new List<viSubscribe>();


    /// <summary>
    /// 查询当天的活动。whatDate:表示当天的活动，从0点开始.status=0/1
    /// </summary>
    /// <param name="activityId"></param>
    /// <param name="whatDate"></param>
    /// <returns></returns>
    public IEnumerable<viSubscribe> Select(int? activityId,DateTime? whatDate,int status=0)
    {
        try
        {
            if (activityId != null)
            {
                if (whatDate != null)
                {
                    DateTime next = (DateTime)whatDate;
                    next = next.AddDays(1);
                    var res = from p in entitiesMC.viSubscribe
                              where p.ActivityID == activityId && whatDate <= p.BeginTime && p.BeginTime < next && p.Status==status
                              select p;
                    return res;
                }
                else
                {
                    var res = from p in entitiesMC.viSubscribe
                              where p.ActivityID == activityId && p.Status == status
                              select p;
                    return res;
                }
            }
            else
            {
                if (whatDate != null)
                {
                    DateTime next = (DateTime)whatDate;
                    next = next.AddDays(1);
                    var res = from p in entitiesMC.viSubscribe
                              where whatDate <= p.BeginTime && p.BeginTime < next && p.Status == status
                              select p;
                    return res;
                }
                else
                {
                    var res = from p in entitiesMC.viSubscribe
                              where p.Status==status
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
    /// 查询最近times的所有未发送邮件的活动.单位为分钟。默认为30
    /// </summary>
    /// <param name="times"></param>
    /// <returns></returns>
    public IEnumerable<viSubscribe> Select(int times=30)
    {
        try
        {
            DateTime now = DateTime.Now;
            DateTime next = now.AddMinutes(times);
            var res = from p in entitiesMC.viSubscribe
                      where p.BeginTime < next && p.BeginTime >= now &&p.Status==0
                      select p;
            return res;
        }
        catch
        {
            return nullRes;
        }
    }
}