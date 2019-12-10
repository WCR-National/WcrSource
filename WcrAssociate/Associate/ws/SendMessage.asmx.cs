using System.Web.Services;
using ClsLibrary.Bal.Associate;
using ClsLibrary.PropertyLayer.Associate;
using System;

namespace WcrWebApplication.Associate.ws
{
    /// <summary>
    /// Summary description for SendMessage
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SendMessage : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public string SendMessages(string bodytext)
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {
                PropMessage proMessage = new PropMessage();
                proMessage.fromID = Convert.ToInt16(Session["associate"]);
                proMessage.toID=-1;
                //proMessage.subject=subject;
                proMessage.bodytext=bodytext;
                BllMessage objMessage=new BllMessage();                
                str = objMessage.RecordInsert(proMessage, Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }


        [WebMethod(EnableSession = true)]
        public string SelectSentMessages()
        {
            string str = string.Empty;
            if (Session["associate"].ToString() != "" || Session["associate"].ToString() != null)
            {

                BllMessage objMessage = new BllMessage();
                str = objMessage.SelectSentMessages(Session["associate"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

    }
}
