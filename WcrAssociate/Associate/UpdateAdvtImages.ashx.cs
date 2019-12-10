using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using ClsLibrary.Bal.Associate;
using System.Web.SessionState;
using System.Drawing;

namespace WcrAssociate.Associate
{
    /// <summary>
    /// Summary description for UpdateAdvtImages
    /// </summary>
    public class UpdateAdvtImages : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            try
            {
                context.Response.ContentType = "text/plain";
                if (context.Request.Files.Count > 0)
                {
                    string assId = string.Empty;
                    string _mainImg = string.Empty;
                    string _firstImg = string.Empty;
                    string _secondImg = string.Empty;
                    string _thirdImg = string.Empty;
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
                            fname = Path.Combine(context.Server.MapPath("Adv_img/"), fname + "main" + ".png");
                            file.SaveAs(fname);
                            _mainImg = assId + "main" + ".png";
                        }
                        else if (i == 1)
                        {
                            fname = Path.Combine(context.Server.MapPath("Adv_img/"), fname + "first" + ".png");
                            file.SaveAs(fname);
                            _firstImg = assId + "first" + ".png";
                        }
                        else if (i == 2)
                        {
                            fname = Path.Combine(context.Server.MapPath("Adv_img/"), fname + "second" + ".png");
                            file.SaveAs(fname);
                            _secondImg = assId + "second" + ".png";
                        }
                        else if (i == 3)
                        {
                            fname = Path.Combine(context.Server.MapPath("Adv_img/"), fname + "third" + ".png");
                            file.SaveAs(fname);
                            _thirdImg = assId + "third" + ".png";
                        }
                    }
                    BllSale objSale = new BllSale();
                    string aa = context.Session["associate"].ToString();
                    objSale.RecordUpdate(context.Session["associate"].ToString(), _mainImg, _firstImg, _secondImg, _thirdImg, Convert.ToInt32(assId));                   
                   
                }
                context.Response.Write("");
            }
            catch { }
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