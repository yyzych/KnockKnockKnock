<%@ Application Language="C#" %>

<script runat="server">

    void Application_Start(object sender, EventArgs e) 
    {
        // 在应用程序启动时运行的代码 
        //int count = 0;
        //System.IO.StreamReader srd;
        ////取得文件的实际路径 
        //string file_path = Server.MapPath("~/orther/counter.txt");
        ////打开文件进行读取 
        //srd = System.IO.File.OpenText(file_path);
        //while (srd.Peek() != -1)
        //{
        //    string str = srd.ReadLine();
        //    count = int.Parse(str);

        //}
        //srd.Close();
        //object obj = count;
        ////将从文件中读取的网站访问量存放在Application对象中 
        //Application["counter"] = obj; 

    }
    
    void Application_End(object sender, EventArgs e) 
    {
        //  在应用程序关闭时运行的代码 
        //try
        //{
        //    int Stat = 0;
        //    Stat = (int)Application["counter"];
        //    string file_path = Server.MapPath("~/orther/counter.txt");//有问题
        //    System.IO.StreamWriter srw = new System.IO.StreamWriter(file_path, false);
        //    srw.WriteLine(Stat);
        //    srw.Close();
        //}
        //catch(Exception err)
        //{
        //    string mes = err.InnerException.Message;
        //}

    }
        
    void Application_Error(object sender, EventArgs e) 
    { 
        //在出现未处理的错误时运行的代码

    }

    void Session_Start(object sender, EventArgs e) 
    {
        // 在新会话启动时运行的代码 
        //string ipAddress = Request.ServerVariables["REMOTE_ADDR"];
        //string ipSrc;
        //if (Request.UrlReferrer == null)
        //{
        //    ipSrc = "";
        //}
        //else
        //{
        //    ipSrc = Request.UrlReferrer.ToString();   
        //}
        //DateTime ipDateTime = DateTime.Now;
        //VisitedInfo cont = new VisitedInfo();
        //cont.AddAVisitedInfo(ipAddress, ipSrc, ipDateTime);
        //string pageurl = Request.Url.ToString();
        //if (pageurl.EndsWith("index.aspx"))
        //{
        //    Application.Lock();
        //    Application["StatCount"] = int.Parse(Application["StatCount"].ToString()) + 1;
        //    Application.UnLock();

        //}
        //Session.Timeout = 20;//设定超时时间
        //Application.Lock();
        //Application["countSession"] = Convert.ToInt32(Application["countSession"]) + 1;//访问总人数＋１   
        //Application["onlineWhx"] = (int)Application["onlineWhx"] + 1; //在线人数加＋１   
        //Session["login_name"] = null;
        //Application.UnLock();   
        
        //Application.Lock();
        ////数据累加 
        //int Stat = 0;
        ////获取Application对象中保存的网站总访问量 
        //Stat = (int)Application["counter"];
        //Stat += 1;
        //object obj = Stat;
        //Application["counter"] = obj;
        ////将数据记录写入文件 -------这个时候为什么要写入文件里？？
        ////string file_path = Server.MapPath("counter.txt");
        ////System.IO.StreamWriter srw = new System.IO.StreamWriter(file_path, false);
        ////srw.WriteLine(Stat);
        ////srw.Close();
        //Application.UnLock(); 

    }

    void Session_End(object sender, EventArgs e) 
    {
        //在会话结束时运行的代码。 
        // 注意: 只有在 Web.config 文件中的 sessionstate 模式设置为
        // InProc 时，才会引发 Session_End 事件。如果会话模式 
        //设置为 StateServer 或 SQLServer，则不会引发该事件。
        //Application.Lock();
        //Application["onlineWhx"] = (int)Application["onlineWhx"] - 1; //在线人数减－１   
        //Session["login_name"] = null;
        //Application.UnLock();  
    }
       
</script>
