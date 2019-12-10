using System.Web.Services;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;

namespace WcrWebApplication.Admin.ws
{
    /// <summary>
    /// Summary description for SubCategory
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SubCategory : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public string SelectCatSubCategory(int flag, int Categoryid)
        {
            string str = string.Empty;
            PropSubcategory propSubCategory = new PropSubcategory();
            propSubCategory.flag = flag;
            propSubCategory.CategoryIDValue = Categoryid;
            BllSubCategory objSubCategory = new BllSubCategory();
            str = objSubCategory.CateSubcategory(propSubCategory);
            return str;

        }

        [WebMethod(EnableSession = true)]
        public string AssociateSubCategory(int Categoryid)
        {
            string str = string.Empty;
            PropSubcategory propSubCategory = new PropSubcategory();
            propSubCategory.CategoryIDValue = Categoryid;
            BllSubCategory objSubCategory = new BllSubCategory();
            str = objSubCategory.AssociateSubCategory(propSubCategory, Session["associate"].ToString());
            return str;

        }

        [WebMethod(EnableSession = true)]
        public string SubCategoryWisePrice(int id)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                PropSubcategory propSubCategory = new PropSubcategory();
                propSubCategory.ID = id;
                propSubCategory.flag = 1;
                BllSubCategory objSubCategory = new BllSubCategory();
                str = objSubCategory.SubCategoryWisePrice(propSubCategory, Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }



        [WebMethod(EnableSession = true)]
        public string AssociateCategoryExistsOrNot()
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {

                BllSubCategory objSubCategory = new BllSubCategory();
                str = objSubCategory.AssociateCategoryExistsOrNot(Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }


        [WebMethod(EnableSession = true)]
        public string CategoryWiseSubCategoryOfAssociate(int Categoryid)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                PropSubcategory propSubCategory = new PropSubcategory();
                propSubCategory.CategoryIDValue = Categoryid;
                BllSubCategory objSubCategory = new BllSubCategory();
                str = objSubCategory.CategoryWiseSubCategoryofAssociate(propSubCategory, Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }




        [WebMethod(EnableSession = true)]
        public string SubCategories(int Categoryid)
        {
            string str = string.Empty;
            PropSubcategory propSubCategory = new PropSubcategory();
            propSubCategory.CategoryIDValue = Categoryid;
            BllSubCategory objSubCategory = new BllSubCategory();
            str = objSubCategory.GetSubCategories(propSubCategory);
            return str;

        }


    }
}
