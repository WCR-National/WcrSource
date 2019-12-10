using System.Web.Services;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;

namespace WcrWebApplication.Admin.ws
{
    /// <summary>
    /// Summary description for State
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class State : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public string InsertState(int CountryID, string State)
        {
            string str = string.Empty;
            if (Session["admin"].ToString() != "" || Session["admin"].ToString() != null)
            {
                PropState proState = new PropState();
                proState.StateName = State;
                proState.CountryId = CountryID;
                BllState objState = new BllState();
                str = objState.RecordInsert(proState, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        [WebMethod(EnableSession = true)]
        public string SelectState(int flag)
        {
            string str = string.Empty;
            if (Session["admin"].ToString() != "" || Session["admin"].ToString() != null)
            {
                PropState propState = new PropState();
                propState.flag = flag;
                BllState objState = new BllState();
                str = objState.RecordSelect(propState, Session["admin"].ToString());
                return str;
            }
            else
            {



                return "Error in Authentication";
            }
        }

        [WebMethod(EnableSession = true)]
        public string UpdateState(string Name, int ID, int CountryId)
        {
            string str = string.Empty;
            if (Session["admin"].ToString() != "" || Session["admin"].ToString() != null)
            {
                PropState proState = new PropState();
                proState.StateName = Name;
                proState.ID = ID;
                proState.CountryId = CountryId;
                BllState objState = new BllState();
                str = objState.RecordUpdate(proState, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        [WebMethod(EnableSession = true)]
        public string DeleteState(int ID, int Status)
        {
            string str = string.Empty;
            if (Session["admin"].ToString() != "" || Session["admin"].ToString() != null)
            {
                PropState proState = new PropState();
                proState.ID = ID;
                proState.flag = Status;
                BllState objState = new BllState();
                str = objState.RecordDelete(proState, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        /// <summary>
        /// note this method of webservice will be call from outside of admin so no need to authenticate for admin only
        /// </summary>
        /// <param name="Status"></param>
        /// <param name="CountryID"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string CountryWiseState(int Status, string CountryID)
        {


            string str = string.Empty;
            //if (Session["admin"] != "" || Session["admin"].ToString() != null)
            //{ 
            PropState proState = new PropState();
            proState.flag = Status;
            proState.StateName = CountryID;
            BllState objState = new BllState();
            str = objState.SelectStates(proState);
            return str;
            //}
            //else
            //{
            //    return "Error in Authentication";
            //}
        }



    }
}
