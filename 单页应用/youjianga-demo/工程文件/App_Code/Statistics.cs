using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActivityMDModel;

/// <summary>
///Statistics 的摘要说明
/// </summary>
public class Statistics
{
	private ActivityMDEntities2 entitiesMC=new ActivityMDEntities2();
	private IEnumerable<tbStatistics> nullRes=new List<tbStatistics>();

    /// <summary>
    /// 根据ActivityId获得一条数据
    /// </summary>
    /// <param name="activityId"></param>
    /// <returns></returns>
	public	tbStatistics GetAStatistics(int activityId)
	{
		try{
			var theSta=(from p in entitiesMC.tbStatistics
						where p.ActivityID==activityId
						select p).FirstOrDefault();
			return theSta;
		}
		catch{
			return null;
		}
	}

	public bool AddAStatistics(tbStatistics nSta)
	{
		try{
			entitiesMC.tbStatistics.AddObject(nSta);
			entitiesMC.SaveChanges();
			return true;
		}
		catch{
			return false;
		}
	}

    public bool UpdAStatistics(tbStatistics uSta)
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
    /// 根据ActivityId获得一条数据
    /// </summary>
    /// <param name="activityId"></param>
    /// <returns></returns>
	public bool DelAStatistics(int activityId)
	{
		try{
			tbStatistics delSta=GetAStatistics(activityId);
	        entitiesMC.tbStatistics.DeleteObject(delSta);
			return true;
		}
		catch{
			return false;
		}
	}

	public IEnumerable<tbStatistics> Select()
	{
		try{
			var res=from p in entitiesMC.tbStatistics
					select p;
			return res;
		}
		catch{
			return nullRes;
		}
	}
}