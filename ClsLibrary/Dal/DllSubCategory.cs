using System.Data.SqlClient;
using ClsLibrary.PropertyLayer;
using System.Data;
using System.Web.UI.WebControls;
using System;
namespace ClsLibrary.Dal
{
    public class DllSubCategory
    {

        readonly ConnectionClass objCon = new ConnectionClass();

        #region Insert
        /// <summary>
        /// This Method will be  used to Post data into proc_subCategory table
        /// </summary>
        /// <param name="objsubCategory">Name</param>
        /// <returns>1 for success and -1 for fail</returns>
        public string InsertSubCategory(PropSubcategory objsubCategory, string userName)
        {
            if (userName != null && userName != "")
            {
                //proc_subCategory is the stored procedure name which will be used to Insert data into the table
                SqlCommand cmd = new SqlCommand("proc_subCategory", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (objCon.Con.State == ConnectionState.Open)
                { }
                else
                {
                    objCon.Con.Open();

                }
                cmd.Parameters.AddWithValue("@SubCategory", objsubCategory.SubCategoryNameValue);
                cmd.Parameters.AddWithValue("@categoryId", objsubCategory.CategoryIDValue);
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
        /// This Method is used to Update data into proc_subCategory table
        /// </summary>
        /// <param name="objsubCategory"> Name,ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>      

        public string UpdateSubCategory(PropSubcategory objsubCategory, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_subCategory", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@SubCategory", objsubCategory.SubCategoryNameValue);
                    cmd.Parameters.AddWithValue("@ID", objsubCategory.ID);
                    cmd.Parameters.AddWithValue("@categoryID", objsubCategory.CategoryIDValue);
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
        /// <param name="objsubCategory">ID and Action</param>
        /// <returns>1 for success and -1 for fail</returns>   

        public string DeleteSubCategory(PropSubcategory objsubCategory, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_subCategory", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@ID", objsubCategory.ID);
                    cmd.Parameters.AddWithValue("@status", objsubCategory.flag);
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
        /// This Method is used to Select data from proc_subCategory table
        /// </summary>
        /// <param name="objsubCategory">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string SelectSubCategory(PropSubcategory objsubCategory, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_subCategory", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "Select");
                cmd.Parameters.AddWithValue("@status", objsubCategory.flag);
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
                adpt.Fill(ds, "SubCategories");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }
        }
        #endregion
        #region SubCategory wise Select
        /// <summary>
        /// This Method is used to Select data from proc_subCategory table
        /// </summary>
        /// <param name="objsubCategory">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string CategorywiseSubCategory(PropSubcategory objsubCategory)
        {

            SqlCommand cmd = new SqlCommand("proc_subCategory", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Action", "DropDown");
            cmd.Parameters.AddWithValue("@status", objsubCategory.flag);
            cmd.Parameters.AddWithValue("@categoryId", objsubCategory.CategoryIDValue);
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
            adpt.Fill(ds, "CatSubCategories");
            objCon.Con.Close();
            return ds.GetXml();


        }

        #endregion

        public string AssociateSubCategory(PropSubcategory objsubCategory, string userName)
        {

            SqlCommand cmd = new SqlCommand("proc_subCategory", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Action", "AvailableCategory");
            cmd.Parameters.AddWithValue("@associateID", userName);
            cmd.Parameters.AddWithValue("@categoryId", objsubCategory.CategoryIDValue);
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
            adpt.Fill(ds, "associateCategories");
            objCon.Con.Close();
            return ds.GetXml();


        }
        public string GetSubCategoryPrice(PropSubcategory objsubCategory, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_subCategory", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "GetSubCategoryPrice");
                cmd.Parameters.AddWithValue("@status", objsubCategory.flag);
                cmd.Parameters.AddWithValue("@id", objsubCategory.ID);
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
                adpt.Fill(ds, "SubCategoryPrice");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }
        }
        public string CategoryWiseSubCategoryofAssociate(PropSubcategory objsubCategory, string userName)
        {
            SqlCommand cmd = new SqlCommand("proc_subCategory", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Action", "AssoSubCategory");
            cmd.Parameters.AddWithValue("@associateID", userName);
            cmd.Parameters.AddWithValue("@categoryId", objsubCategory.CategoryIDValue);
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
            adpt.Fill(ds, "associatesubCategories");
            objCon.Con.Close();
            return ds.GetXml();


        }
        public string SubCategories(PropSubcategory objsubCategory)
        {
            SqlCommand cmd = new SqlCommand("proc_subCategory", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Action", "HomePageSubCat");
            cmd.Parameters.AddWithValue("@categoryId", objsubCategory.CategoryIDValue);
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
            adpt.Fill(ds, "subCategories");
            objCon.Con.Close();
            return ds.GetXml();
        }
        public string AssociateCategoryExistsOrNot(string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_subCategory", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "AssociateCatExists");
                cmd.Parameters.AddWithValue("@associateID", userName);                
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
                adpt.Fill(ds, "CatExists");
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
