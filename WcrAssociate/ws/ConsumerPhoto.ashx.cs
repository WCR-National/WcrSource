using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using ClsLibrary.Bal.Associate;
using System.Web.SessionState;
using System.Drawing;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;
namespace WcrAssociate.ws
{
    /// <summary>
    /// Summary description for ConsumerPhoto
    /// </summary>
    public class ConsumerPhoto : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            if (context.Request.Files.Count > 0)
            {
                string str=string.Empty;
                string assId = string.Empty;
                string _mainImg = string.Empty;

                HttpFileCollection files = context.Request.Files;
                for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFile file = files[i];
                    string fname;

                    string m = string.Empty;
                    if (HttpContext.Current.Request.Browser.Browser.ToUpper() == "IE" || HttpContext.Current.Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                    {
                        string[] testfiles = file.FileName.Split(new char[] { '\\' });
                        fname = testfiles[testfiles.Length - 1];
                    }
                    else
                    {
                        fname = file.FileName;
                        assId = fname;
                    }
                    if (i == 0)
                    {
                        fname = Path.Combine(context.Server.MapPath("../ConsumerPhoto/"), Convert.ToInt16(context.Session["consumer"]).ToString() + ".png");
                        file.SaveAs(fname);
                        _mainImg = Convert.ToInt16(context.Session["consumer"]).ToString() + ".png";
                        BllConsumerRegistration objUpdatePic = new BllConsumerRegistration();
                       PropConsumerRegistration objConsumerRegistration=new PropConsumerRegistration();
                        objConsumerRegistration.Photo=_mainImg;
                        objConsumerRegistration.ID= Convert.ToInt16(context.Session["consumer"]);
                        str = objUpdatePic.UpdatePhote(objConsumerRegistration);
                        context.Response.Write(str);
                       
                    }

                }
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}