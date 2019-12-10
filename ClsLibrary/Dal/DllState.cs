using System.Data.SqlClient;
using ClsLibrary.PropertyLayer;
using System.Data;
using System;

namespace ClsLibrary.Dal
{
    public class DllState
    {
        readonly ConnectionClass objCon = new ConnectionClass();






        #region Insert
        /// <summary>
        /// This Method will be  used to Post data into tbl_state table
        /// </summary>
        /// <param name="objState">Name</param>
        /// <returns>1 for success and -1 for fail</returns>
        public string InsertState(PropState objState, string userName)
        {
            if (userName != null && userName != "")
            {
                //proc_state is the stored procedure name which will be used to Insert data into the table
                SqlCommand cmd = new SqlCommand("proc_state", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (objCon.Con.State == ConnectionState.Open)
                { }
                else
                {
                    objCon.Con.Open();

                }
                cmd.Parameters.AddWithValue("@Name", objState.StateName);
                cmd.Parameters.AddWithValue("@CountryId", objState.CountryId);
                cmd.Parameters.AddWithValue("@Action", "Add");
                return cmd.ExecuteNonQuery().ToString();
            }
            else
            {
                return "Not Valid";
            }
        }
        #endregion


        #region  update
        /// <summary>
        /// This Method is used to Update data into tbl_state table
        /// </summary>
        /// <param name="objState"> Name,ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>      

        public string UpdateState(PropState objState, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_state", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@Name", objState.StateName);
                    cmd.Parameters.AddWithValue("@ID", objState.ID);
                    cmd.Parameters.AddWithValue("@CountryId", objState.CountryId);
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
        #endregion

        #region Delete
        /// <summary>
        /// This Method is used to Delete data into tbl_category table
        /// </summary>
        /// <param name="objState">ID and Action</param>
        /// <returns>1 for success and -1 for fail</returns>   

        public string DeleteState(PropState objState, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_state", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@ID", objState.ID);
                    cmd.Parameters.AddWithValue("@status", objState.flag);
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
        #endregion


        #region Select
        /// <summary>
        /// This Method is used to Select data from tbl_state table
        /// </summary>
        /// <param name="objState">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string SelectState(PropState objState, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_state", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "Select");
                cmd.Parameters.AddWithValue("@status", objState.flag);
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
                adpt.Fill(ds, "States");
                objCon.Con.Close();
                return ds.GetXml();
            }

            else
            {

                return "Not Valid";
            }

        }

        #endregion


        #region Select
        /// <summary>
        /// This Method is used to Select data from tbl_state table on the behalf of country
        /// </summary>
        /// <param name="objState">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string CountryWiseState(PropState objState)
        {
            //if (userName != null && userName != "")
            //{
                SqlCommand cmd = new SqlCommand("proc_state", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "Dropdown");
                cmd.Parameters.AddWithValue("@name", objState.StateName);
                //cmd.Parameters.AddWithValue("@status", objState.flag);
                //cmd.Parameters.AddWithValue("@CountryId", objState.CountryId);
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
                adpt.Fill(ds, "States1");
                objCon.Con.Close();
                return ds.GetXml();
            //}

            //else
            //{

            //    return "Not Valid";
            //}

        }

        #endregion













    }
}
