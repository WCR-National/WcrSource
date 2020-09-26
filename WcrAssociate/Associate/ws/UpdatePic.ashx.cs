using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;
using System.Web.SessionState;
using System.IO;
namespace WcrAssociate.Associate.ws
{
    /// <summary>
    /// Summary description for UpdatePic
    /// </summary>
    public class UpdatePic : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                context.Response.ContentType = "text/plain";
                if (context.Request.Files.Count > 0)
                {
                    string assId = string.Empty;
                    string _associateImg = string.Empty;
                    
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

                        BllAssociateRegistration bllass = new BllAssociateRegistration();
                        string str = bllass.AssociateBasicDetail(Convert.ToInt16(context.Session["associate"].ToString()), context.Session["userName"].ToString());
                        if (!(string.IsNullOrEmpty(str)) && (str.Contains(".png") || str.Contains(".jpg") || str.Contains(".tiff") || str.Contains(".jpeg") ))
                        {
                            if (str.IndexOf("<Photo>") != -1)
                            {
                                int index = str.IndexOf("<Photo>");
                                int lastIndex = str.IndexOf("</Photo>");
                                str = str.Substring(index + 7, lastIndex - (index + 7));
                            }
                            fname = Path.Combine(context.Server.MapPath("../../AssociatePhoto/"), str);
                            File.Delete(fname);
                        }

                        string guid = Guid.NewGuid().ToString();
                        string nfileName = guid + "_" + context.Session["associate"].ToString() + ".png";
                        fname = Path.Combine(context.Server.MapPath("../../AssociatePhoto/"), nfileName);
                        file.SaveAs(fname);
                           // _associateImg = assId + ".png";
                        _associateImg = nfileName;               
                    }

                    BllAssociateRegistration objAssociate = new BllAssociateRegistration();
                    PropAssociateRegistration objAssociateRegistration = new PropAssociateRegistration();
                    objAssociateRegistration.Photo = _associateImg;
                    objAssociateRegistration.AssociateID =  Convert.ToInt16(context.Session["associate"].ToString());
                    //objAssociate.UpdateAssociatePic(context.Session["associate"].ToString(), _associateImg, Convert.ToInt32(assId));
                    objAssociate.UpdateAssociatePic(objAssociateRegistration, context.Session["associate"].ToString(), context.Session["userName"].ToString());
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