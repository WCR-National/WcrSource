using System.Web;
namespace ClsLibrary.Bal
{
    public class BllLogout
    {

        public void LogOut()
        {
            HttpContext.Current.Session.Abandon();

        }

    }
}
