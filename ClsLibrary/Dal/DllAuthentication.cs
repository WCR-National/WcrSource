using System;
using System.Data.SqlClient;
using ClsLibrary.PropertyLayer;
namespace ClsLibrary.Dal
{
    public class DllAuthentication
    {
        readonly ConnectionClass objCon = new ConnectionClass();
        public int Validate(PropClsLogin objLogin)
        {
            SqlCommand cmd = new SqlCommand("proc_authentication", objCon.Con);
            return cmd.ExecuteNonQuery();
        }
    }
}
