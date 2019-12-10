using System.Web.Services;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;

namespace WcrWebApplication.Admin.ws
{
    /// <summary>
    /// Summary description for MemberShip
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class MemberShip : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public string InsertMemberShip(string MemberShipP, float duration, float cost)
        {
            string str = string.Empty;
            if (Session["admin"] != "" || Session["admin"].ToString() != null)
            {
                PropMemberShipPlan propcat = new PropMemberShipPlan();
                propcat.planName = MemberShipP;
                propcat.duration = duration;
                propcat.cost = cost;
                BllMemberShip objMemberShip = new BllMemberShip();
                str = objMemberShip.RecordInsert(propcat, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        [WebMethod(EnableSession = true)]
        public string SelectMemberShip(int flag)
        {
            string str = string.Empty;
            if (Session["admin"] != "" || Session["admin"].ToString() != null)
            {
                PropMemberShipPlan propMemberShip = new PropMemberShipPlan();
                propMemberShip.status = flag;
                BllMemberShip objMemberShip = new BllMemberShip();
                str = objMemberShip.RecordSelect(propMemberShip);
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }


        [WebMethod(EnableSession = true)]
        public string UpdateMemberShip(string Name, float duration, float cost, int ID)
        {
            string str = string.Empty;
            if (Session["admin"] != "" || Session["admin"].ToString() != null)
            {
                PropMemberShipPlan propMemberShip = new PropMemberShipPlan();
                propMemberShip.planName = Name;
                propMemberShip.duration = duration;
                propMemberShip.cost = cost;
                propMemberShip.membershipID = ID;
                BllMemberShip objMemberShip = new BllMemberShip();
                str = objMemberShip.RecordUpdate(propMemberShip, Session["admin"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }



    }
}
