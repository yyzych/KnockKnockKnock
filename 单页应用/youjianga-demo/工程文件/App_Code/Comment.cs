using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActivityMDModel;

/// <summary>
///Comment 的摘要说明
/// </summary>
public class Comment
{
	private ActivityMDEntities2 entitiesMC=new ActivityMDEntities2();
	private IEnumerable<tbComment> nullRes=new List<tbComment>();

	public	tbComment GetAComment(int commentId)
	{
		try{
			var theCom=(from p in entitiesMC.tbComment
						where p.CommentID==commentId
						select p).FirstOrDefault();
			return theCom;
		}
		catch{
			return null;
		}
	}

	public bool AddAComment(tbComment nCom)
	{
		try{
			entitiesMC.tbComment.AddObject(nCom);
			entitiesMC.SaveChanges();
			return true;
		}
		catch{
			return false;
		}
	}

    /// <summary>
    /// 根据commentId删除一条记录
    /// </summary>
    /// <param name="commentId"></param>
    /// <returns></returns>
	public bool DelAComment(int commentId)
    {
		try{
			tbComment delCom=GetAComment(commentId);
            entitiesMC.tbComment.DeleteObject(delCom);
            entitiesMC.SaveChanges();
			return true;
		}
		catch{
			return false;
		}
	}

    /// <summary>
    /// 根据activityId删除一个活动的所有评论
    /// </summary>
    /// <param name="activityId"></param>
    /// <returns></returns>
    public bool DelComments(int activityId)
    {
        try
        {
            IEnumerable<tbComment> delComs = Select(activityId,"");
            if (delComs != null)
            {
                foreach (var item in delComs)
                {
                    entitiesMC.tbComment.DeleteObject(item);
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

	public IEnumerable<tbComment> Select(int? activityId,string username)
	{
		try{
            if (activityId != null)
            {
                if (username != "")
                {
                    var res = from p in entitiesMC.tbComment
                              where p.ActivityID == activityId && p.UserName == username
                              orderby p.CommentDate descending
                              select p;
                    return res;
                }
                else
                {
                    var res = from p in entitiesMC.tbComment
                              where p.ActivityID == activityId
                              orderby p.CommentDate descending
                              select p;
                    return res;
                }
            }
            else
            {
                if (username != "")
                {
                    var res = from p in entitiesMC.tbComment
                              where p.UserName == username
                              orderby p.CommentDate descending
                              select p;
                    return res;
                }
                else
                {
                    var res = from p in entitiesMC.tbComment
                              orderby p.CommentDate descending
                              select p;
                    return res;
                }
            }
            
		}
		catch{
			return nullRes;
		}
	}

    public IEnumerable<tbComment> Search(string word)
    {
        try
        {
            if (word != "")
            {
                var res = from p in entitiesMC.tbComment
                          where p.CommentContent.Contains(word)
                          orderby p.CommentDate
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

    /// <summary>
    /// tbComment还有些其他的信息，_tbComment去掉了那些属性，使序列化的时候变短了
    /// </summary>
    /// <param name="activityId"></param>
    /// <param name="selectNum"></param>
    /// <param name="skipNum"></param>
    /// <returns></returns>
    public IEnumerable<_tbComment> Select(int activityId, int selectNum=8, int skipNum = 0)
    {
        try
        {
            var res = (from p in entitiesMC.tbComment
                       where p.ActivityID == activityId
                       orderby p.CommentDate
                       select new _tbComment() { UserName = p.UserName, ActivityID = p.ActivityID, CommentID = p.CommentID, CommentDate = p.CommentDate, UserAvatar = p.UserAvatar, CommentContent = p.CommentContent }).Skip(skipNum).Take(selectNum);//LINQ to Entities 仅支持无参数构造函数和初始值设定项。
            return res;
        }
        catch
        {
            return new List<_tbComment>();
        }
    }

    public int GetCommentCount(int activityId)
    {
        try
        {
            var res = (from p in entitiesMC.tbComment
                       where p.ActivityID == activityId
                       select p).Count();
            return res;
        }
        catch
        {
            return 0;
        }
    }
}

public class _tbComment
{
    public string UserName { get; set; }
    public int ActivityID { get; set; }
    public int CommentID { get; set; }
    public DateTime CommentDate { get; set; }
   
    public string UserAvatar { get; set; }
    public string CommentContent { get; set; }
}