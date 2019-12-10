using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace WcrAssociate
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {

        }

        protected void Session_Start(object sender, EventArgs e)
        {
            //HttpContext.Current.Session["associate"] = "false";
            //HttpContext.Current.Session["consumer"] = "false";
            Session["associate"] = "";
            Session["consumer"] = "";
            Session["userName"] = "";
            Session["upass"] = "";            
               
          
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        
        {


        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {
            //HttpContext.Current.Session["associate"] = "false";
            //HttpContext.Current.Session["consumer"] = "false";
            Session["associate"] = "";
            Session["consumer"] = "";
            Session["userName"] = "";
            Session["upass"] = "";
         //   HttpCookie cookie1 = new HttpCookie(FormsAuthentication.FormsCookieName, "");
         //   cookie1.Expires = DateTime.Now.AddYears(-1);
         //HttpContext.Current.Response.Cookies.Add(cookie1);
        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}