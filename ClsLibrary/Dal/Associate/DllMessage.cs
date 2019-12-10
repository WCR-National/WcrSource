using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClsLibrary.PropertyLayer.Associate;
using System.Data;
using System.Data.SqlClient;
using ClsLibrary.Bal;

namespace ClsLibrary.Dal.Associate
{
  public  class DllMessage
    {

        readonly ConnectionClass objCon = new ConnectionClass();

        public string InsertD(PropMessage objMessage, string associateID)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("proc_Messages", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                cmd.Parameters.AddWithValue("@fromID", objMessage.fromID);
                cmd.Parameters.AddWithValue("@toID", objMessage.toID);
                //cmd.Parameters.AddWithValue("@subject", objMessage.subject);
                cmd.Parameters.AddWithValue("@bodytext", objMessage.bodytext);
                cmd.Parameters.AddWithValue("@action","Add");
                return cmd.ExecuteScalar().ToString();
            }
            catch
            {
                return "Not Valid";
            }
        }
        public string GetSentMessages(string associateID)
        {
            try
            {
                if (associateID != null && associateID != "")
                {
                    SqlCommand cmd = new SqlCommand("proc_Messages", objCon.Con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@action", "select");
                    cmd.Parameters.AddWithValue("@fromID", Convert.ToInt16(associateID));
                    SqlDataAdapter adpt = new SqlDataAdapter();
                    DataSet ds = new DataSet();
                    if (objCon.Con.State == ConnectionState.Open)
                    { }
                    else
                    {
                        objCon.Con.Open();
                    }
                    cmd.Connection = objCon.Con;
                    adpt.SelectCommand = cmd;
                    adpt.Fill(ds, "ViewSentMessages");
                    objCon.Con.Close();
                    return ds.GetXml();
                }
                else
                {
                    return "Not Valid";
                }
            }
            catch
            {
                return "Not Valid";
            }

        }
    }
}
