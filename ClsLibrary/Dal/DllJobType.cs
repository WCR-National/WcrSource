using System.Data.SqlClient;
using ClsLibrary.PropertyLayer;
using System.Data;
using ClsLibrary.Bal;
using System;
namespace ClsLibrary.Dal
{
    public class DllJobType
    {
        readonly ConnectionClass objCon = new ConnectionClass();
        public string InsertJobType(string jName)
        {
            SqlCommand cmd = new SqlCommand("proc_JobType", objCon.Con);
            if (objCon.Con.State == ConnectionState.Open)
            { }
            else
            {
                objCon.Con.Open();

            }
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@JobName", jName);
            cmd.Parameters.AddWithValue("@Action", "Add");
            int a = cmd.ExecuteNonQuery();
            objCon.Con.Close();
            if (a >= 1)
            {
                return ClsCommon.ActiveValue.ToString();
            }
            else if (a == -1)
            {
                return ClsCommon.DuplicateValue.ToString();
            }
            else
            {
                return ClsCommon.NotSuccess.ToString();
            }
        }
        public int UpdateJobType(PropJobType objJobType)
        {
            SqlCommand cmd = new SqlCommand("proc_JobType", objCon.Con);
            return cmd.ExecuteNonQuery();
        }
        public int DeleteJobType(PropJobType objJobType)
        {
            SqlCommand cmd = new SqlCommand("proc_JobType", objCon.Con);
            return cmd.ExecuteNonQuery();
        }
        public string SelectJobType(int flag)
        {
            SqlCommand cmd = new SqlCommand("proc_JobType", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Action", "View");
            cmd.Parameters.AddWithValue("@flagValue", flag);
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
            adpt.Fill(ds, "JobType");
            objCon.Con.Close();
            return ds.GetXml();

        }

    }
}
