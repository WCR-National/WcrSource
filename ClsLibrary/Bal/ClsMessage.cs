using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClsLibrary.Bal
{
    public class ClsMessage
    {
        public static string Success(string Message)
        {
            string Str = string.Empty;
            Str += "<div role='alert' id='divSuccess' runat='server' class='alert alert-success'>";
            Str += Message;
            Str += "</div>";
            return Str;

        }

        public static string Failure(string Message)
        {
            string Str = string.Empty;
            Str += " <div role='alert' id='divFailure' runat='server' class='alert alert-danger'>";
            Str += " <strong>Oh snap!</strong> " + Message + " try Again.";
            Str += "</div>";
            return Str;

        }
    }
}
