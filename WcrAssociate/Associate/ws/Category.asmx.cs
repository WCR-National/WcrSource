using System.Web.Services;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;
using System;
using System.Web;
using System.IO;
namespace WcrWebApplication.Admin.ws
{
    /// <summary>
    /// Summary description for Category
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Category : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        public string InsertCategory(int jobType, string CategoryName)
        {
            string str = string.Empty;
            if (Session["admin"].ToString() != "" || Session["admin"].ToString() != null)
            {
                PropCategory propcat = new PropCategory();
                propcat.CategoryNameValue = CategoryName;
                propcat.JobTypeValue = jobType;
                // propcat.CategoryImage = CateImage;
                BllJobCategory objCategory = new BllJobCategory();
                str = objCategory.RecordInsert(propcat, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        [WebMethod(EnableSession = true)]
        public string SelectCategory(int flag)
        {
            string str = string.Empty;
            if (Session["admin"].ToString() != "" || Session["admin"].ToString() != null)
            {
                PropCategory propCategory = new PropCategory();
                propCategory.Flag = flag;
                BllJobCategory objCategory = new BllJobCategory();
                str = objCategory.RecordSelect(propCategory, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

        /// <summary>
        /// This method is used to bind category according to job type
        /// </summary>
        /// <param name="flag">1</param>
        /// <param name="jobtype"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string JobtypeWiseCategory(int flag, int jobtype)
        {
            string str = string.Empty;
            PropCategory propCategory = new PropCategory();
            propCategory.Flag = flag;
            propCategory.JobTypeValue = jobtype;
            BllJobCategory objCategory = new BllJobCategory();
            str = objCategory.JobCategory(propCategory);
            return str;
        }
         [WebMethod(EnableSession = true)]
        public string AllJobtypeWiseCategory(int flag)
        {
            string str = string.Empty;
            PropCategory propCategory = new PropCategory();
            propCategory.Flag = flag;           
            BllJobCategory objCategory = new BllJobCategory();
            str = objCategory.AllJobCategory(propCategory);
            return str;
        }
        
        /// <summary>
        /// This method is used to bind category according to job type
        /// </summary>
        /// <param name="flag">1</param>
        /// <param name="category"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string AssociateCategory(int jobtype)
        {
            string str = string.Empty;
            PropAssociateRegistration PropAssociate = new PropAssociateRegistration();
            PropAssociate.AssociateID = Convert.ToInt32(Session["associate"].ToString());
            PropAssociate.JobType = jobtype;
            BllJobCategory objCategory = new BllJobCategory();
            str = objCategory.AssociateCategories(PropAssociate);
            return str;
        }
        
        /// <summary>
        /// This method is used to bind category according to job type
        /// </summary>
        /// <param name="flag">1</param>
        /// <param name="category"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string Associatezipcode(int jobtype)
        {
            string str = string.Empty;
            PropAssociateRegistration PropAssociate = new PropAssociateRegistration();
            PropAssociate.AssociateID = Convert.ToInt32(Session["associate"].ToString());
            PropAssociate.JobType = jobtype;
            BllJobCategory objCategory = new BllJobCategory();
            str = objCategory.AssociateCategories(PropAssociate);
            return str;
        }
        
        /// <summary>
        /// Availalbe Service Category
        /// </summary>
        /// <param name="jobtype"></param>
        /// <param name="zip"></param>
        /// <returns></returns>

        [WebMethod(EnableSession = true)]
        public string AvailableCategory(string jobtype, string zip)
        {
            try
            {
                BllJobCategory ObjJobCagegory = new BllJobCategory();
                string res = ObjJobCagegory.AvailalbeServiceCategories(jobtype, zip);                
                return res;
            }
            catch
            {
                return "";
            }
        }
                [WebMethod(EnableSession = true)]
        public string AvailableSalesCategory(string jobtype, string zip)
        {
            try
            {
                BllJobCategory ObjJobCagegory = new BllJobCategory();
                string res = ObjJobCagegory.AvailalbeSalesCategories(jobtype, zip,Convert.ToInt32(Session["associate"].ToString()));
                return res;
            }
            catch
            {
                return "";
            }
        }

        [WebMethod(EnableSession = true)]
        public string AvailableSalesCategorynew(string jobtype, string zip)
        {
            try
            {
                BllJobCategory ObjJobCagegory = new BllJobCategory();
                string res = ObjJobCagegory.AvailalbeSalesCategories1(jobtype, zip, Convert.ToInt32(Session["associate"].ToString()));
                return res;
            }
            catch
            {
                return "";
            }
        }
        
        [WebMethod(EnableSession = true)]
        public string UpdateCategory(string Name, int ID)
        {
            string str = string.Empty;
            if (Session["admin"] != "" || Session["admin"].ToString() != null)
            {
                PropCategory propCategory = new PropCategory();
                propCategory.CategoryNameValue = Name;
                propCategory.IdValue = ID;
                BllJobCategory objCategory = new BllJobCategory();
                str = objCategory.RecordUpdate(propCategory, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

        //public static string SaveImage(string Based64BinaryString)
        //{
        //    string result = "";
        //    try
        //    {
        //        string format = "";
        //        string path = HttpContext.Current.Server.MapPath("imageupload/");
        //        string name = DateTime.Now.ToString("hhmmss");

        //        if (Based64BinaryString.Contains("data:application/zip;base64,"))
        //        {
        //            format = "zip";
        //        }
        //        if (Based64BinaryString.Contains("data:;base64,"))
        //        {
        //            format = "zip";
        //        }
        //        if (Based64BinaryString.Contains("data:image/jpeg;base64,"))
        //        {
        //            format = "jpg";
        //        }
        //        if (Based64BinaryString.Contains("data:image/png;base64,"))
        //        {
        //            format = "png";
        //        }
        //        if (Based64BinaryString.Contains("data:text/plain;base64,"))
        //        {
        //            format = "txt";
        //        }

        //        string str = Based64BinaryString.Replace("data:image/jpeg;base64,", " ");//jpg check
        //        str = str.Replace("data:image/png;base64,", " ");//png check
        //        str = str.Replace("data:text/plain;base64,", " ");//text file check
        //        str = str.Replace("data:;base64,", " ");//zip file check
        //        str = str.Replace("data:application/zip;base64,", " ");//zip file check

        //        byte[] data = Convert.FromBase64String(str);

        //        //if (format == "zip")
        //        //{
        //        //    using (MemoryStream stream = new MemoryStream(data))
        //        //    {
        //        //        using (ZipFile zip = new ZipFile())
        //        //        {
        //        //            zip.AddEntry("mainContent.zip", stream);
        //        //            zip.Save(path + "/file" + name + ".zip");
        //        //            result = "file uploaded succesfully";
        //        //        }
        //        //    }
        //        //}
        //        //else
        //        //{
        //            MemoryStream ms = new MemoryStream(data, 0, data.Length);
        //            ms.Write(data, 0, data.Length);
        //            System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
        //            image.Save(path + "/Image" + name + ".jpg");
        //            result = "image uploaded successfully";
        //        //}
        //    }
        //    catch (Exception ex)
        //    {
        //        result = "Error : " + ex;
        //    }
        //    return result;
        //}

        //   [WebMethod(EnableSession = true)]
        //public string SelectCategory(int flag , int categoryID)
        //{
        //    string str = string.Empty;
        //    if (Session["admin"] != "" || Session["admin"].ToString() != null)
        //    {
        //        PropCategory propCategory = new PropCategory();
        //        propCategory.Flag = flag;
        //        BllJobCategory objCategory = new BllJobCategory();
        //        str = objCategory.RecordSelect(propCategory, Session["admin"].ToString());
        //        return str;
        //    }
        //    else
        //    {
        //        return "Error in Authentication";
        //    }
        //}

       /// <summary>
       /// This Method is used to bind all the available  category for specific Zipcode
       /// </summary>
       /// <param name="jobtype"></param>
       /// <param name="zip"></param>
       /// <returns></returns>

        [WebMethod(EnableSession = true)]
        public string AvailableCategoryzipCode(string jobtype, string zip)
        {
            try
            {
                BllJobCategory ObjJobCagegory = new BllJobCategory();
                string res = ObjJobCagegory.AvailalbeCategoriesZipWise(jobtype, zip);
                return res;
            }
            catch
            {
                return "";
            }
        }


        [WebMethod(EnableSession = true)]
        public string AvailableZipCodesForServices(string jobtype, string zip)
        {
            try
            {
                BllJobCategory ObjJobCagegory = new BllJobCategory();
                string res = ObjJobCagegory.AvailableZipCodesForServices(jobtype, zip);
                return res;
            }
            catch
            {
                return "";
            }
        }

        [WebMethod(EnableSession = true)]
        public string AvailableSubCategoryzipCode(string jobtype, string zip, int categoryID)
        {
            try
            {
                BllJobCategory ObjJobCagegory = new BllJobCategory();
                string res = ObjJobCagegory.AvailalbeSubCategoriesZipWise(jobtype, zip, categoryID);
                return res;
            }
            catch
            {
                return "";
            }
        }




        [WebMethod(EnableSession = true)]
        public string AssociatePurchasedCategory(int jobtype)
        {
            string str = string.Empty;
            PropCategory propCategory = new PropCategory();            
            propCategory.JobTypeValue = jobtype;
            BllJobCategory objCategory = new BllJobCategory();
            str = objCategory.AssociatePurchasedCategory(propCategory, Session["associate"].ToString());
            return str;
        }
    }
}
