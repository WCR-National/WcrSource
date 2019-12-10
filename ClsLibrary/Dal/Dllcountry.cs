using System.Data.SqlClient;
using ClsLibrary.PropertyLayer;
using System.Data;
using System;
namespace ClsLibrary.Dal
{
    public class Dllcountry
    {
        readonly ConnectionClass objCon = new ConnectionClass();

        #region Insert
        /// <summary>
        /// This Method will be  used to Post data into tbl_country table
        /// </summary>
        /// <param name="objsubCategory">CountryName</param>
        /// <returns>1 for success and -1 for fail</returns>
        public string Insertcountry(PropCountry objcountry, string userName)
        {
            if (userName != null && userName != "")
            {
                //proc_country is the stored procedure name which will be used to Insert data into the table
                SqlCommand cmd = new SqlCommand("proc_country", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (objCon.Con.State == ConnectionState.Open)
                { }
                else
                {
                    objCon.Con.Open();
                }
                cmd.Parameters.AddWithValue("@Name", objcountry.CountryName);
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
        /// This Method is used to Update data into tbl_country table
        /// </summary>
        /// <param name="objCategory"> Name,ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>      

        public string UpdateCountry(PropCountry objcountry, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_country", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@Name", objcountry.CountryName);
                    cmd.Parameters.AddWithValue("@ID", objcountry.ID);
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
        /// <param name="objCategory">ID and Action</param>
        /// <returns>1 for success and -1 for fail</returns>   

        public string Deletecountry(PropCountry objcountry, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_country", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@ID", objcountry.ID);
                    cmd.Parameters.AddWithValue("@status", objcountry.Flag);
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
        /// This Method is used to Select data from tbl_country table
        /// </summary>
        /// <param name="objCategory">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string Selectcountry(PropCountry objcountry)
        {
           
                SqlCommand cmd = new SqlCommand("proc_country", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "View");
                cmd.Parameters.AddWithValue("@status", objcountry.Flag);
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
                adpt.Fill(ds, "Countries");
                objCon.Con.Close();
                return ds.GetXml();
           

        }

        #endregion



    }
}

