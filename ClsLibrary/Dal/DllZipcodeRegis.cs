using System.Data.SqlClient;
using ClsLibrary.PropertyLayer;
using System.Data;
using System;

namespace ClsLibrary.Dal
{
    public class DllZipcodeRegis
    {
        readonly ConnectionClass objCon = new ConnectionClass();
        #region Insert
        /// <summary>
        /// This Method will be  used to Post data into tbl_zipcode table
        /// </summary>
        /// <param name="objzipCode">Name</param>
        /// <returns>1 for success and -1 for fail</returns>
        public string InsertzipCode(PropzipCode objzipCode, string userName)
        {
            if (userName != null && userName != "")
            {
                //proc_zipCode is the stored procedure name which will be used to Insert data into the table
                SqlCommand cmd = new SqlCommand("proc_zipCode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (objCon.Con.State == ConnectionState.Open)
                { }
                else
                {
                    objCon.Con.Open();
                }
                cmd.Parameters.AddWithValue("@zipcode", objzipCode.ZipCode);
                cmd.Parameters.AddWithValue("@CityId", objzipCode.CityId);
                cmd.Parameters.AddWithValue("@StateId", objzipCode.StateID);
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
        /// This Method is used to Update data into tbl_zipcode table
        /// </summary>
        /// <param name="objzipCode"> Name,ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>      

        public string UpdatezipCode(PropzipCode objzipCode, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_zipCode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@zipcode", objzipCode.ZipCode);
                    cmd.Parameters.AddWithValue("@ID", objzipCode.ID);
                    cmd.Parameters.AddWithValue("@CityId", objzipCode.CityId);
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
        /// This Method is used to Delete data into tbl_zipcode table
        /// </summary>
        /// <param name="objzipCode">ID and Action</param>
        /// <returns>1 for success and -1 for fail</returns>   

        public string DeletezipCode(PropzipCode objzipCode, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_zipCode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@ID", objzipCode.ID);
                    cmd.Parameters.AddWithValue("@status", objzipCode.flag);
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
        /// This Method is used to Select data from tbl_zipcode table
        /// </summary>
        /// <param name="objzipCode">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string SelectzipCode(PropzipCode objzipCode, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_zipCode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "Select");
                cmd.Parameters.AddWithValue("@status", objzipCode.flag);
                cmd.Parameters.AddWithValue("@StateId", objzipCode.StateID);
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
                adpt.Fill(ds, "zipcodes");
                objCon.Con.Close();
                return ds.GetXml();
            }

            else
            {

                return "Not Valid";
            }

        }

        #endregion
        public string ZipCodeExists(string zipcode, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_ZipCode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "ExistsZipcode");
                cmd.Parameters.AddWithValue("@zipcode", zipcode);
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
                adpt.Fill(ds, "ZipcodeExists");
                objCon.Con.Close();
                return ds.GetXml();
            }

            else
            {

                return "Not Valid";
            }

        }

        #region Get Latitute and longitute value
        /// <summary>
        /// This Method is used to Get Latitute and longitute value from tbl_zipcode table
        /// </summary>
        /// <param name="objzipCode">zipcode</param>
        /// <returns>latitute and longitute</returns>   
        public string SelectzipCode(PropzipCode objzipCode)
        {

            SqlCommand cmd = new SqlCommand("proc_zipCode", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Action", "SelectLatLongValue");
            cmd.Parameters.AddWithValue("@zipcode", objzipCode.ZipCode);
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
            adpt.Fill(ds, "LatituteLong");
            objCon.Con.Close();
            return ds.GetXml();
        }

        #endregion
        public string PurchaseZipCode(string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_AssociateZipcode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "all");
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt32(userName));
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
                adpt.Fill(ds, "PurchaseZip");
                objCon.Con.Close();
                return ds.GetXml();
            }

            else
            {

                return "Not Valid";
            }

        }

        public string ZipCodeStateWise(string StateID, string CityID, string userName)
        {
            if (userName != null || userName == "")
            {
                SqlCommand cmd = new SqlCommand("proc_ZipCode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "citywisezipcode");
                cmd.Parameters.AddWithValue("@StateName", StateID);
                cmd.Parameters.AddWithValue("@CityName", CityID);   
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
                adpt.Fill(ds, "CityWiseZip");
                objCon.Con.Close();
                return ds.GetXml();
            }

            else
            {

                return "Not Valid";
            }

        }


        public string CiyWiseState(string CityID, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_ZipCode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "citywiseState");
                 cmd.Parameters.AddWithValue("@CityName", CityID);
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
                adpt.Fill(ds, "CityWiseStates");
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
