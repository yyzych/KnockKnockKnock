using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using System.Net.Mail;

public class OrthersHelp
{
    /// <summary>
    /// md5加密，16位加密
    /// </summary>
    /// <param name="ConvertString"></param>
    /// <returns></returns>
    public static string Encode(string ConvertString)
    {
        MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
        string t2 = BitConverter.ToString(md5.ComputeHash(UTF8Encoding.Default.GetBytes(ConvertString)), 4, 8);
        t2 = t2.Replace("-", "");
        t2 = t2.ToLower();
        return t2;
    }

    public static string ModifierContentText(object contentText)
    {
        string conText = (string)contentText;
        //string res = Regex.Replace(conText, "<img[^>]+>", "");//匹配内容的文字，如果有图片就删掉
        string res = Regex.Replace(conText, "[^\u4E00-\u9FA5]", "");
        return res;
    }


    /// <summary>
    /// 发邮件
    /// </summary>
    /// <param name="host">服务器</param>
    /// <param name="from">发件人邮箱</param>
    /// <param name="fromName">发件人名称</param>
    /// <param name="password">发件人邮箱密码</param>
    /// <param name="to">收件人邮箱</param>
    /// <param name="subject">邮件标题</param>
    /// <param name="body">邮件内容</param>
    /// <param name="isBodyHtml">邮件内容是否为html</param>
    /// <param name="attachments">要上传的附件本地路径</param>
    /// <param name="errorMsg">异常提示捕获</param>
    /// <returns></returns>
    public static bool SendMail(string host, string from, string fromName, string password, string to, string subject, string body, bool isBodyHtml, string[] attachments)
    {
        try
        {
            MailMessage mm = new MailMessage();
            if (attachments != null)
            {
                foreach (string path in attachments)
                {
                    mm.Attachments.Add(new Attachment(path));
                }
            }
            mm.Body = body;
            mm.IsBodyHtml = isBodyHtml;
            mm.BodyEncoding = System.Text.Encoding.UTF8;//正文编码
            mm.Priority = MailPriority.Normal;//优先级
            mm.From = new MailAddress(from, fromName);
            mm.Subject = subject;
            mm.SubjectEncoding = System.Text.Encoding.UTF8;
            mm.To.Add(new MailAddress(to));
            mm.Sender = new MailAddress(from);
            SmtpClient client = new SmtpClient();
            client.DeliveryMethod = SmtpDeliveryMethod.Network;//指定电子邮件发送方式
            client.Host = host;
            client.Credentials = new System.Net.NetworkCredential(from, password);
            client.Send(mm);
            //errorMsg = null;
            return true;
        }
        catch (Exception ex)
        {
            //errorMsg = ex.Message;
            string err = ex.Message;
            return false;
        }
    }
}
