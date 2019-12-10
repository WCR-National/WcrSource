using System.Data.SqlClient;
using ClsLibrary.PropertyLayer;
using System.Data;
using System;

namespace ClsLibrary.Dal
{
  public  class Dllcity
    {
        readonly ConnectionClass objCon = new ConnectionClass();
        #region Insert
        /// <summary>
        /// This Method will be  used to Post data into tbl_City table
        /// </summary>
        /// <param name="objCity">Name</param>
        /// <returns>1 for success and -1 for fail</returns>
        public string InsertCity(PropCity objCity, string userName)
        {
            if (userName != null && userName != "")
            {
                //proc_City is the stored procedure name which will be used to Insert data into the table
                SqlCommand cmd = new SqlCommand("proc_City", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (objCon.Con.State == ConnectionState.Open)
                { }
                else
                {
                    objCon.Con.Open();
                }
                cmd.Parameters.AddWithValue("@Name", objCity.CityName);
                cmd.Parameters.AddWithValue("@StateId", objCity.StateId);
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
        /// This Method is used to Update data into tbl_City table
        /// </summary>
        /// <param name="objCity"> Name,ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>      

        public string UpdateCity(PropCity objCity, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_City", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@Name", objCity.CityName);
                    cmd.Parameters.AddWithValue("@ID", objCity.ID);
                    cmd.Parameters.AddWithValue("@StateId", objCity.StateId);
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
        /// <param name="objCity">ID and Action</param>
        /// <returns>1 for success and -1 for fail</returns>   

        public string DeleteCity(PropCity objCity, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_City", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@ID", objCity.ID);
                    cmd.Parameters.AddWithValue("@status", objCity.flag);
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
        /// This Method is used to Select data from tbl_City table
        /// </summary>
        /// <param name="objCity">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string SelectCity(PropCity objCity, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_City", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "Select");
                cmd.Parameters.AddWithValue("@status", objCity.flag);
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
                adpt.Fill(ds, "Cities");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }

        #endregion



        #region State wise city
        /// <summary>
        /// This Method is used to Select data from tbl_City table
        /// </summary>
        /// <param name="objCity">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string StateWiseCity(PropCity objCity)
        {
            //if (userName != null && userName != "")
            //{
                SqlCommand cmd = new SqlCommand("proc_City", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "Dropdown");
                //cmd.Parameters.AddWithValue("@status", objCity.flag);
                cmd.Parameters.AddWithValue("@name", objCity.CityName);
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
                adpt.Fill(ds, "StateWiseCities");
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
