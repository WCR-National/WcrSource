using System.Web.Services;
using ClsLibrary.Bal;
using System.Web.Services.Protocols;
using System.Data;
using System;
namespace WcrWebApplication.Admin.ws
{
    /// <summary>
    /// Summary description for JobType
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class JobType : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public string InsertJtype(string Jname)
        {
            string str = string.Empty;
            if (Session["admin"].ToString() != "" || Session["admin"].ToString() != null)
            {
                BllJobType ObjjobType = new BllJobType();
                str = ObjjobType.RecordInsert(Jname);//ObjjobType.RecordInsert(ObjProp.JobName);
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        [WebMethod(EnableSession = true)]
        public string SelectJtype(int flag)
        {
            string str = string.Empty;
            
                BllJobType ObjjobType = new BllJobType();
                str = ObjjobType.RecordSelect(flag);   //ObjjobType.RecordInsert(ObjProp.JobName);
                return str;
            
        }
    }
}

