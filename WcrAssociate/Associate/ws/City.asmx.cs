using System.Web.Services;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;

namespace WcrWebApplication.Admin.ws
{
    /// <summary>
    /// Summary description for City
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class City : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public string InsertCity(int StateID, string City)
        {
            string str = string.Empty;
            if (Session["admin"] != "" || Session["admin"].ToString() != null)
            {
                PropCity proCity = new PropCity();
                proCity.CityName = City;
                proCity.StateId = StateID;
                BllCity objCity = new BllCity();
                str = objCity.RecordInsert(proCity, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        [WebMethod(EnableSession = true)]
        public string SelectCity(int flag)
        {
            string str = string.Empty;
            if (Session["admin"] != "" || Session["admin"].ToString() != null)
            {
                PropCity propCity = new PropCity();
                propCity.flag = flag;
                BllCity objCity = new BllCity();
                str = objCity.RecordSelect(propCity, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

        [WebMethod(EnableSession = true)]
        public string UpdateCity(string Name, int ID, int StateID)
        {
            string str = string.Empty;
            if (Session["admin"] != "" || Session["admin"].ToString() != null)
            {
                PropCity proCity = new PropCity();
                proCity.CityName = Name;
                proCity.ID = ID;
                proCity.StateId = StateID;
                BllCity objCity = new BllCity();
                str = objCity.RecordUpdate(proCity, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        [WebMethod(EnableSession = true)]
        public string DeleteCity(int ID, int Status)
        {
            string str = string.Empty;
            if (Session["admin"] != "" || Session["admin"].ToString() != null)
            {
                PropCity proCity = new PropCity();
                proCity.ID = ID;
                proCity.flag = Status;
                BllCity objCity = new BllCity();
                str = objCity.RecordDelete(proCity, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

        [WebMethod(EnableSession = true)]
        public string StateWisecity(int Status, int StateID)
        {
            string str = string.Empty;
            //if (Session["admin"] != "" || Session["admin"].ToString() != null)
            //{
            PropCity proCity = new PropCity();
            proCity.flag = Status;
            proCity.StateId = StateID;
            BllCity objcity = new BllCity();
            str = objcity.StateWiseCities(proCity);
            return str;
            //}
            //else
            //{
            //    return "Error in Authentication";
            //}
        }

    }
}
