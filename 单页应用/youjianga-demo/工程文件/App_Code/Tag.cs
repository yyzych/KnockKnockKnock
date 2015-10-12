using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActivityMDModel;

/// <summary>
///Tag 的摘要说明
/// </summary>
public class Tag
{
	private ActivityMDEntities2 entitiesMC=new ActivityMDEntities2();
	private IEnumerable<tbTag> nullRes=new List<tbTag>();

	public tbTag GetATag(int tagId)
	{
		try{
			var theTag=(from p in entitiesMC.tbTag
						where p.TagID==tagId
						select p).FirstOrDefault();
			return theTag;
		}
		catch{
			return null;
		}
	}

	public bool AddATag(tbTag nTag)
	{
		try{
            tbTag temp = Select(nTag.Type,nTag.TagName);
            if(temp!=null)
                return true;
			entitiesMC.tbTag.AddObject(nTag);
			entitiesMC.SaveChanges();
			return true;
		}
		catch{
			return false;
		}
	}

	public bool DelATag(int tagId)
	{
		try{
			tbTag delTag=GetATag(tagId);
            entitiesMC.tbTag.DeleteObject(delTag);
            entitiesMC.SaveChanges();
			return true;
		}
		catch{
			return false;
		}
	}

    /// <summary>
    /// type=0表示查询全部
    /// </summary>
    /// <param name="type"></param>
    /// <returns></returns>
	public IEnumerable<tbTag> Select(int type)
    {
		try{
			if(type==0){
				var res=from p in entitiesMC.tbTag
						select p;
				return res;
			}
			else{
				var res=from p in entitiesMC.tbTag
						where p.Type==type
						select p;
                return res;
			}
		}
		catch{
			return nullRes;
		}
	}

    public tbTag Select(int type, string name)
    {
        try
        {
            var res = (from p in entitiesMC.tbTag
                       where p.Type == type && p.TagName == name
                       select p).FirstOrDefault();
            return res;
        }
        catch
        {
            return null;
        }
    }
}