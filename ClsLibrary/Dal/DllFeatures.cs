using System;
using System.Data.SqlClient;
using ClsLibrary.PropertyLayer;
using System.Data;

namespace ClsLibrary.Dal
{
 public   class DllFeatures
    {


        readonly ConnectionClass objCon = new ConnectionClass();

        /// <summary>
        /// This Method is used to Post data into tbl_Features table
        /// </summary>
        /// <param name="objFeatures">JobType,Features Name,</param>
        /// <returns>1 for success and -1 for fail</returns>

        public string InsertFeatures(PropFeatures objFeatures, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_subCategoryFeatures", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@SubCategoryId", objFeatures.SubCategory);
                    cmd.Parameters.AddWithValue("@Name", objFeatures.Features);
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
        /// This Method is used to Update data into tbl_Features table
        /// </summary>
        /// <param name="objFeatures">JobType,Features Name,ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>      

        public string UpdateFeatures(PropFeatures objFeatures, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_subCategoryFeatures", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {                   
                    cmd.Parameters.AddWithValue("@SubCategoryId", objFeatures.SubCategory);
                    cmd.Parameters.AddWithValue("@Name", objFeatures.Features);
                    cmd.Parameters.AddWithValue("@ID", objFeatures.ID);
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
        /// This Method is used to Delete data into tbl_Features table
        /// </summary>
        /// <param name="objFeatures">ID and Action</param>
        /// <returns>1 for success and -1 for fail</returns>   

        public string DeleteFeatures(PropFeatures objFeatures, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_subCategoryFeatures", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {

                    cmd.Parameters.AddWithValue("@ID", objFeatures.ID);
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
        /// This Method is used to Select data from tbl_Features table
        /// </summary>
        /// <param name="objFeatures">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string SelectFeatures(PropFeatures objFeatures, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_subCategoryFeatures", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "Select");
                cmd.Parameters.AddWithValue("@status", objFeatures.flag);
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
                adpt.Fill(ds, "Features");
                objCon.Con.Close();
                return ds.GetXml();
            }

            else
            {

                return "Not Valid";
            }

        }




        /// <summary>
        /// This Method is used to Select data from tbl_Features table
        /// </summary>
        /// <param name="objFeatures">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string SubCategorywiseFeatures(PropFeatures objFeatures)
        {
           
                SqlCommand cmd = new SqlCommand("proc_subCategoryFeatures", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "Option");
                cmd.Parameters.AddWithValue("@status", objFeatures.flag);
                cmd.Parameters.AddWithValue("@SubCategoryId", objFeatures.SubCategory);
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
                adpt.Fill(ds, "SubcategoryFeatures");
                objCon.Con.Close();
                return ds.GetXml();
            

        }
    }
}
