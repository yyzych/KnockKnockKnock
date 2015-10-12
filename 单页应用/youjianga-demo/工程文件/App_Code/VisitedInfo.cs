using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActivityMDModel;

/// <summary>
///VisitedInfo 的摘要说明
/// </summary>
public class VisitedInfo
{
    private ActivityMDEntities2 entitiesMC = new ActivityMDEntities2();
    private IEnumerable<tbVisitedInfo> nullRes = new List<tbVisitedInfo>();

    /// <summary>
    /// 属性少，直接传入参数
    /// </summary>
    /// <param name="ads"></param>
    /// <param name="src"></param>
    /// <param name="time"></param>
    /// <returns></returns>
    public bool AddAVisitedInfo(string ads,string src,DateTime time)
    {
        try
        {
            tbVisitedInfo nVis = new tbVisitedInfo();
            nVis.IP_Address = ads;
            nVis.IP_Src = src;
            nVis.IP_DateTime = time;
            entitiesMC.tbVisitedInfo.AddObject(nVis);
            entitiesMC.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool DelAVisitedInfo(string ipads)
    {
        try
        {
            tbVisitedInfo delVis = Select(ipads).FirstOrDefault();
            if (delVis != null)
            {
                entitiesMC.tbVisitedInfo.DeleteObject(delVis);
                entitiesMC.SaveChanges();
            }
            return true;
        }
        catch
        {
            return false;
        }
    }

    public IEnumerable<tbVisitedInfo> Select(string ipads)
    {
        try
        {
            if (ipads != "")
            {
                var res = from p in entitiesMC.tbVisitedInfo
                          where p.IP_Address==ipads
                          orderby p.IP_DateTime descending
                          select p;
                return res;
            }
            else
            {
                var res = from p in entitiesMC.tbVisitedInfo
                          orderby p.IP_DateTime descending
                          select p;
                return res;
            }
            
        }
        catch
        {
            return nullRes;
        }
    }
}