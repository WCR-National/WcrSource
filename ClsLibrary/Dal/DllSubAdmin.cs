using System.Data.SqlClient;
using ClsLibrary.PropertyLayer;
using System.Data;
using System;
namespace ClsLibrary.Dal
{
    public class DllSubAdmin
    {
        readonly ConnectionClass objCon = new ConnectionClass();

        /// <summary>
        /// This Method is used to Post data into tbl_Subadmin table
        /// </summary>
        /// <param name="objSubadmin">JobType,Subadmin Name,</param>
        /// <returns>1 for success and -1 for fail</returns>

        public string InsertSubadmin(PropSubAdmin objSubadmin, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_Subadmin", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@Name", objSubadmin.name);
                    cmd.Parameters.AddWithValue("@Mobile", objSubadmin.mobile);
                    cmd.Parameters.AddWithValue("@EmailID", objSubadmin.email);
                    cmd.Parameters.AddWithValue("@UserName", objSubadmin.username);
                    cmd.Parameters.AddWithValue("@Password", objSubadmin.password);                
                    cmd.Parameters.AddWithValue("@Action", "Add");
                    return cmd.ExecuteNonQuery().ToString();

                }
                catch (Exception showError)
                {
                    throw showError;
                }
                finally
                {
                    cmd.Dispose();
                    objCon.Con.Close();
                    objCon.Con.Dispose();
                }
            }
            else
            {

                return "Not Valid";
            }
        }

        /// <summary>
        /// This Method is used to Update data into tbl_Subadmin table
        /// </summary>
        /// <param name="objSubadmin">JobType,Subadmin Name,ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>      

        public string UpdateSubadmin(PropSubAdmin objSubadmin, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_Subadmin", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@Name", objSubadmin.name);
                    cmd.Parameters.AddWithValue("@Mobile", objSubadmin.mobile);
                    cmd.Parameters.AddWithValue("@EmailID", objSubadmin.email);
                    cmd.Parameters.AddWithValue("@UserName", objSubadmin.username);
                    cmd.Parameters.AddWithValue("@Password", objSubadmin.password);
                    cmd.Parameters.AddWithValue("@ID", objSubadmin.iD);
                    cmd.Parameters.AddWithValue("@Action", "Edit");
                    return cmd.ExecuteNonQuery().ToString();
                }
                catch (Exception showError)
                {
                    throw showError;
                }
                finally
                {
                    cmd.Dispose();
                    objCon.Con.Close();
                    objCon.Con.Dispose();

                }
            }
            else
            {

                return "Not Valid";
            }
        }

        /// <summary>
        /// This Method is used to Delete data into tbl_Subadmin table
        /// </summary>
        /// <param name="objSubadmin">ID and Action</param>
        /// <returns>1 for success and -1 for fail</returns>   

        public string DeleteSubadmin(PropSubAdmin objSubadmin, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_Subadmin", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {

                    cmd.Parameters.AddWithValue("@ID", objSubadmin.iD);
                    cmd.Parameters.AddWithValue("@Action", "Delete");
                    return cmd.ExecuteNonQuery().ToString();
                }
                catch (Exception showError)
                {
                    throw showError;
                }
                finally
                {
                    cmd.Dispose();
                    objCon.Con.Close();
                    objCon.Con.Dispose();
                }
            }
            else
            {

                return "Not Valid";
            }
        }
        /// <summary>
        /// This Method is used to Select data from tbl_Subadmin table
        /// </summary>
        /// <param name="objSubadmin">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string SelectSubadmin(PropSubAdmin objSubadmin, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_Subadmin", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "View");
                cmd.Parameters.AddWithValue("@status", objSubadmin.status);
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
                adpt.Fill(ds, "Subadmin");
                objCon.Con.Close();
                return ds.GetXml();
            }

            else
            {

                return "Not Valid";
            }

        }
        
        
    }
}
