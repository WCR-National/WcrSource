using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using ClsLibrary.Bal.Associate;
using System.Web.SessionState;
using System.Drawing;


namespace WcrAssociate.Associate.ws
{
    /// <summary>
    /// Summary description for UpdateAdvertisementImges
    /// </summary>
    public class UpdateAdvertisementImges : IHttpHandler
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
                        
                            fname = Path.Combine(context.Server.MapPath("Adv_img/"), fname + "main" + ".png");
                            file.SaveAs(fname);
                            _mainImg = assId + "main" + ".png";
                        
                    }
                    BllSale objSale = new BllSale();
                    //string aa = context.Session["associate"].ToString();
                    objSale.UpdateSingleImage(context.Session["associate"].ToString(), "@advMainImage",_mainImg, Convert.ToInt32(assId), "Updatefimg");

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