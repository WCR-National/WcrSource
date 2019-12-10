using System.Web.Services;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;

namespace WcrWebApplication.Admin.ws
{
    /// <summary>
    /// Summary description for Country
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Country : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        public string InsertCountry(string Country)
        {
            string str = string.Empty;
            if (Session["admin"].ToString() != "" || Session["admin"].ToString() != null)
            {
                PropCountry procountry = new PropCountry();
                procountry.CountryName = Country;
                BllCountry objCountry = new BllCountry();
                str = objCountry.RecordInsert(procountry, Session["admin"].ToString());

                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        [WebMethod(EnableSession = true)]
        public string SelectCountry(int flag)
        {
            string str = string.Empty;
            //if (Session["admin"] != "" || Session["admin"].ToString() != null || Session["associate"] != "" || Session["associate"].ToString() != null)
            //{
                PropCountry propCountry = new PropCountry();
                propCountry.Flag = flag;
                BllCountry objCountry = new BllCountry();
               // str = objCountry.RecordSelect(propCountry, Session["admin"].ToString());
                str = objCountry.RecordSelect(propCountry);
                return str;
            //}
            //else
            //{
            //    return "Error in Authentication";
            //}
        }


        [WebMethod(EnableSession = true)]
        public string UpdateCountry(string Name, int ID)
        {
            string str = string.Empty;
            if (Session["admin"].ToString() != "" || Session["admin"].ToString() != null)
            {
                PropCountry proCountry = new PropCountry();
                proCountry.CountryName = Name;
                proCountry.ID = ID;
                BllCountry objCountry = new BllCountry();
                str = objCountry.RecordUpdate(proCountry, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        [WebMethod(EnableSession = true)]
        public string DeleteCountry(int ID , int Status)
        {
            string str = string.Empty;
            if (Session["admin"].ToString() != "" || Session["admin"].ToString() != null)
            {
                PropCountry proCountry = new PropCountry();              
                proCountry.ID = ID;
                proCountry.Flag = Status;
                BllCountry objCountry = new BllCountry();
                str = objCountry.RecordDelete(proCountry, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

    }
}
