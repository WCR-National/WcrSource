using System;
using System.Web;
using System.IO;
using ClsLibrary.Bal.Associate;

namespace WcrAssociate.Associate
{
    /// <summary>
    /// Summary description for UpdateThirdImg
    /// </summary>
    public class UpdateThirdImg : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                context.Response.ContentType = "text/plain";
                if (context.Request.Files.Count > 0)
                {
                    string assId = string.Empty;
                    string _secondImg = string.Empty;
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

                        fname = Path.Combine(context.Server.MapPath("Adv_img/"), fname + "second" + ".png");
                        file.SaveAs(fname);
                        _secondImg = assId + "second" + ".png";

                    }
                    BllSale objSale = new BllSale();
                    string aa = context.Session["associate"].ToString();
                    objSale.UpdateSingleImage(context.Session["associate"].ToString(), "@advImage2", _secondImg, Convert.ToInt32(assId), "Updatethimg");

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