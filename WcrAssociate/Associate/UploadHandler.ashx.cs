using System;
using System.Web;
using System.IO;
using ClsLibrary.Bal.Associate;
using ClsLibrary.Bal;

namespace WcrAssociate.Associate
{
    /// <summary>
    /// Summary description for UploadHandler
    /// </summary>
    public class UploadHandler : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {

                string str = string.Empty;
                string assId = HttpContext.Current.Request.Form["assId"];
                
                //BllinnerPage objInnerpage = new BllinnerPage();
                //str = objInnerpage.SelectFullDetail(Convert.ToInt32(assId));


                context.Response.ContentType = "text/plain";
                if (context.Request.Files.Count > 0)
                {
                    string _mainImg = null;
                    string _firstImg = null;
                    string _secondImg = null;
                    string _thirdImg = null;
                    HttpFileCollection files = context.Request.Files;


                    string deletePic1 = HttpContext.Current.Request.Form["deletePic1"];
                    string deletePic2 = HttpContext.Current.Request.Form["deletePic2"];
                    string deletePic3 = HttpContext.Current.Request.Form["deletePic3"];
                    string deletePic4 = HttpContext.Current.Request.Form["deletePic4"];
                    string imageId = string.Empty;
                    string fname = string.Empty;
                    HttpPostedFile file = null;
                    for (int i = 0; i < 4; i++)
                    {
                        if ( i < files.Count )
                        {
                            file = files[i];
                            string m = string.Empty;
                            if (HttpContext.Current.Request.Browser.Browser.ToUpper() == "IE" || HttpContext.Current.Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                            {
                                string[] testfiles = file.FileName.Split(new char[] { '\\' });
                                fname = testfiles[testfiles.Length - 1];
                            }
                            else
                            {
                                fname = file.FileName;
                                assId = fname.Split(',')[1];
                                imageId = fname.Split(',')[0];
                            }
                        }
                        
                       
                        if (Convert.ToInt32(imageId)  == 0)
                        {
                            if (deletePic1 != "Deleted")
                            {
                                Guid guid = Guid.NewGuid();
                                fname = Path.Combine(context.Server.MapPath("Adv_img/"), assId + "_" + guid.ToString() + "main" + ".png");
                                file.SaveAs(fname);
                                _mainImg = assId + "_" + guid + "main" + ".png";
                            }
                            else
                            {
                                _mainImg = "";
                                //Remove existing image code
                            }
                            imageId = "5";

                        }
                        else if (1 == Convert.ToInt32(imageId))
                        {
                            if (deletePic2 != "Deleted")
                            {
                                Guid guid = Guid.NewGuid();
                                fname = Path.Combine(context.Server.MapPath("Adv_img/"), assId + "_" + guid.ToString() + "first" + ".png");
                                file.SaveAs(fname);
                                _firstImg = assId + "_" + guid.ToString() + "first" + ".png";
                            }
                            else
                            {
                                _firstImg = "";
                                //Remove existing image code
                            }
                            imageId = "5";

                        }
                        else if (2 == Convert.ToInt32(imageId))
                        {
                            if (deletePic3 != "Deleted")
                            {
                                Guid guid = Guid.NewGuid();

                                fname = Path.Combine(context.Server.MapPath("Adv_img/"), assId + "_"+ guid.ToString() + "second" + ".png");
                                file.SaveAs(fname);
                                _secondImg = assId + "_" + guid.ToString() + "second" + ".png";
                            }
                            else
                            {
                                _secondImg = "";
                                //Remove existing image code
                            }
                            imageId = "5";

                        }
                        else if (3 == Convert.ToInt32(imageId))
                        {
                            if (deletePic4 != "Deleted")
                            {
                                Guid guid = Guid.NewGuid();
                                fname = Path.Combine(context.Server.MapPath("Adv_img/"), assId + "_" + guid.ToString() + "third" + ".png");
                                file.SaveAs(fname);
                                _thirdImg = assId + "_" + guid.ToString() + "third" + ".png";
                            }
                            else
                            {
                                _thirdImg = "";
                                //Remove existing image code
                            }
                            imageId = "5";

                        }
                    }

                    if (deletePic1 == "Deleted")
                    {
                        _mainImg = "";
                    }
                    if (deletePic2 == "Deleted")
                    {
                        _firstImg = "";
                    }
                    if (deletePic3 == "Deleted")
                    {
                        _secondImg = "";
                    }
                    if (deletePic4 == "Deleted")
                    {
                        _thirdImg = "";
                    }

                    BllSale objSale = new BllSale();
                    string aa = context.Session["associate"].ToString();
                    objSale.RecordUpdate(context.Session["associate"].ToString(), _mainImg, _firstImg, _secondImg, _thirdImg, Convert.ToInt32(assId));
                }
                else
                {
                    string deletePic1 = HttpContext.Current.Request.Form["deletePic1"];
                    string deletePic2 = HttpContext.Current.Request.Form["deletePic2"];
                    string deletePic3 = HttpContext.Current.Request.Form["deletePic3"];
                    string deletePic4 = HttpContext.Current.Request.Form["deletePic4"];
                    string _mainImg = null;
                    string _firstImg = null;
                    string _secondImg = null;
                    string _thirdImg = null;

                    if (deletePic1 == "Deleted")
                    {
                        _mainImg = "";
                    }
                    if (deletePic2 == "Deleted")
                    {
                        _firstImg = "";
                    }
                    if (deletePic3 == "Deleted")
                    {
                        _secondImg = "";
                    }
                    if (deletePic4 == "Deleted")
                    {
                        _thirdImg = "";
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