using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActivityMDModel;

/// <summary>
///Manager 的摘要说明
/// </summary>
public class  Manager
{
	private ActivityMDEntities2 entitiesMC=new ActivityMDEntities2();
    private IEnumerable<tbManager> nullRes=new List<tbManager>();

	/// <summary>
    /// 根据ManagerID获得一个对象
    /// </summary>
    /// <param name="managerID"></param>
    /// <returns></returns>
    public tbManager GetManager(int managerID)
    {
        try
        {
            tbManager tbMan = entitiesMC.tbManager.Where(p => p.ManagerID == managerID).FirstOrDefault();
            return tbMan;
        }
        catch
        {
            return null;
        }
    }

    /// <summary>
    /// 根据Email和Pwd获得一个对象，管理员登入，返回之后要判断账号是否为注销状态
    /// </summary>
    /// <param name="email"></param>
    /// <param name="pwd"></param>
    /// <returns></returns>
    public tbManager GetManager(string email)
    {
        try
        {
            tbManager tbMan = (from p in entitiesMC.tbManager
                                where p.ManagerEmail == email
                                select p).FirstOrDefault();
            return tbMan;
        }
        catch (Exception err)
        {
            return null;
        }
    }

    /// <summary>
    /// 添加一个对像
    /// </summary>
    /// <param name="nManager"></param>
    /// <returns></returns>
    public bool AddManager(tbManager nManager)
    {
        try
        {
            entitiesMC.tbManager.AddObject(nManager);
            entitiesMC.SaveChanges();
            return true;
        }
        catch(Exception err)
        {
            string errmes = err.InnerException.ToString();
            return false;
        }
    }

    /// <summary>
    /// 注销一个对象，还要删除所有消息。不要用删除功能
    /// </summary>
    /// <param name="managerID"></param>
    /// <returns></returns>
    public bool DelManager(int managerID)
    {
        try
        {
            tbManager tbMan = GetManager(managerID);
            tbMan.ManagerStatus = 0;
            //if (tbMan == null)
            //    return true;
            //entitiesMC.tbManager.DeleteObject(tbMan);
            entitiesMC.SaveChanges();
            return UpdManager(tbMan);
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// 更新一个对象
    /// </summary>
    /// <param name="uManager"></param>
    /// <returns></returns>
    public bool UpdManager(tbManager uManager)
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
    /// 查询。管理员用户名，参数为""表示查询全部，返回null表示异常
    /// </summary>
    /// <param name="managerUserName"></param>
    /// <returns></returns>
    public IEnumerable<tbManager> Select(string managerUserName)
    {
        try
        {
            if (managerUserName != "")
            {
                var result = from p in entitiesMC.tbManager
                             where p.ManagerUserName.Contains(managerUserName)
                             select p;
                return result;
            }
            else
            {
                return entitiesMC.tbManager.Select(p => p);
            }
        }
        catch
        {
            return nullRes;
        }
    }

    /// <summary>
    /// 注册时验证邮箱唯一性
    /// </summary>
    /// <param name="ordinaryString"></param>
    /// <returns></returns>
    public static bool EmailUnion(string ordinaryString)
    {
        ActivityMDEntities2 entitiesMC = new ActivityMDEntities2();
        var results = from p in entitiesMC.tbManager
                      where p.ManagerEmail == ordinaryString
                      select p;
        int count = results.Count();
        if (count == 0)
            return true;
        else
            return false;
    }

    /// <summary>
    /// 注册时验证用户名唯一性
    /// </summary>
    /// <param name="ordinaryString"></param>
    /// <returns></returns>
    public static bool UsernameUnion(string ordinaryString)
    {
        ActivityMDEntities2 entitiesMC = new ActivityMDEntities2();
        var results = from p in entitiesMC.tbManager
                      where p.ManagerName == ordinaryString
                      select p;
        int count = results.Count();
        if (count == 0)
            return true;
        else
            return false;
    }
}