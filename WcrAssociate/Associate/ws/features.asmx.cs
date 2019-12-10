using System.Web.Services;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;

namespace WcrWebApplication.Admin.ws
{
    /// <summary>
    /// Summary description for features
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class features : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public string InsertFeatures(int SubCategoryID, string Features)
        {
            string str = string.Empty;
            if (Session["admin"] != "" || Session["admin"].ToString() != null)
            {
                PropFeatures proFeatures = new PropFeatures();
                proFeatures.Features = Features;
                proFeatures.SubCategory = SubCategoryID;
                BllFeatures objFeatures = new BllFeatures();
                str = objFeatures.RecordInsert(proFeatures, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }


        [WebMethod(EnableSession = true)]
        public string SelectFeatures(int flag)
        {
            string str = string.Empty;
            if (Session["admin"] != "" || Session["admin"].ToString() != null)
            {
                PropFeatures propFeatures = new PropFeatures();
                propFeatures.flag = flag;
                BllFeatures objFeatures = new BllFeatures();
                str = objFeatures.RecordSelect(propFeatures, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

        [WebMethod(EnableSession = true)]
        public string UpdateFeatures(string Name, int ID, int SubCategoryID)
        {
            string str = string.Empty;
            if (Session["admin"] != "" || Session["admin"].ToString() != null)
            {
                PropFeatures proFeatures = new PropFeatures();
                proFeatures.Features = Name;
                proFeatures.ID = ID;
                proFeatures.SubCategory = SubCategoryID;
                BllFeatures objFeatures = new BllFeatures();
                str = objFeatures.RecordUpdate(proFeatures, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        [WebMethod(EnableSession = true)]
        public string DeleteFeatures(int ID, int Status)
        {
            string str = string.Empty;
            if (Session["admin"] != "" || Session["admin"].ToString() != null)
            {
                PropFeatures proFeatures = new PropFeatures();

                proFeatures.ID = ID;
                proFeatures.flag = Status;
                BllFeatures objFeatures = new BllFeatures();
                str = objFeatures.RecordDelete(proFeatures, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }



        [WebMethod(EnableSession = true)]
        public string SelectCatFeatures(int flag, int SubCategoryid)
        {
            string str = string.Empty;
           
                PropFeatures propFeatures = new PropFeatures();
                propFeatures.flag = flag;
                propFeatures.SubCategory = SubCategoryid;
                BllFeatures objFeatures = new BllFeatures();
                str = objFeatures.subCategoryWiseSelect(propFeatures);
                return str;
            
        }
    }
}
