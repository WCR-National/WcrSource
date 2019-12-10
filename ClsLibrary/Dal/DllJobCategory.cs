using System;
using System.Data.SqlClient;
using ClsLibrary.PropertyLayer;
using System.Data;
namespace ClsLibrary.Dal
{
    public class DllJobCategory
    {
        readonly ConnectionClass objCon = new ConnectionClass();

        /// <summary>
        /// This Method is used to Post data into tbl_category table
        /// </summary>
        /// <param name="objCategory">JobType,Category Name,</param>
        /// <returns>1 for success and -1 for fail</returns>

        public string InsertCategory(PropCategory objCategory, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_Category", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@jobtypeID", objCategory.JobTypeValue);
                    cmd.Parameters.AddWithValue("@CategoryName", objCategory.CategoryNameValue);
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
        /// This Method is used to Update data into tbl_category table
        /// </summary>
        /// <param name="objCategory">JobType,Category Name,ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>      
        public string UpdateCategory(PropCategory objCategory, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_Category", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    //cmd.Parameters.AddWithValue("@JobType", objCategory.JobTypeValue);
                    cmd.Parameters.AddWithValue("@CategoryName", objCategory.CategoryNameValue);
                    cmd.Parameters.AddWithValue("@ID", objCategory.IdValue);
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
        /// This Method is used to Delete data into tbl_category table
        /// </summary>
        /// <param name="objCategory">ID and Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string DeleteCategory(PropCategory objCategory, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_Category", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {

                    cmd.Parameters.AddWithValue("@ID", objCategory.IdValue);
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
        /// This Method is used to Select data from tbl_category table
        /// </summary>
        /// <param name="objCategory">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string SelectCategory(PropCategory objCategory, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_Category", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "View");
                cmd.Parameters.AddWithValue("@status", objCategory.Flag);
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
                adpt.Fill(ds, "Categories");
                objCon.Con.Close();
                return ds.GetXml();
            }

            else
            {

                return "Not Valid";
            }

        }

        #region SubCategory wise Select
        /// <summary>
        /// This Method is used to Select data from proc_subCategory table
        /// </summary>
        /// <param name="objsubCategory">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string JobtypewiseCategory(PropCategory objCategory)
        {
            SqlCommand cmd = new SqlCommand("proc_Category", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Action", "DropDown");
            cmd.Parameters.AddWithValue("@status", objCategory.Flag);
            cmd.Parameters.AddWithValue("@jobtypeID", objCategory.JobTypeValue);
            //cmd.Parameters.AddWithValue("@Action", "View");
            //cmd.Parameters.AddWithValue("@status", objCategory.Flag);           
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
            adpt.Fill(ds, "JobCategories");
            objCon.Con.Close();
            return ds.GetXml();
        }
        #endregion
        public string JobCategoryAll(PropCategory objCategory)
        {

            SqlCommand cmd = new SqlCommand("proc_Category", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.AddWithValue("@Action", "DropDown");
            //cmd.Parameters.AddWithValue("@status", objCategory.Flag);
            //cmd.Parameters.AddWithValue("@jobtypeID", objCategory.JobTypeValue);
            cmd.Parameters.AddWithValue("@Action", "View");
            cmd.Parameters.AddWithValue("@status", objCategory.Flag);
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
            adpt.Fill(ds, "JobCategoriesA");
            objCon.Con.Close();
            return ds.GetXml();
        }
        #region Associate wise Category
        /// <summary>
        /// This Method is used to Select data from proc_subCategory table
        /// </summary>
        /// <param name="objsubCategory">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string AssociateCategory(PropAssociateRegistration objAssociateRegistration)
        {

            SqlCommand cmd = new SqlCommand("proc_SelectAssociateCategories", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@associateID", objAssociateRegistration.AssociateID);
            cmd.Parameters.AddWithValue("@jobtype", objAssociateRegistration.JobType);
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
            adpt.Fill(ds, "AssociateCategories");
            objCon.Con.Close();
            return ds.GetXml();
        }
        #endregion

        /// <summary>
        /// Availalbe Service category under the zipcode
        /// </summary>
        /// <param name="jobtype"></param>
        /// <param name="zip"></param>
        /// <returns></returns>
        public string AvailableServiceCategory(string jobtype, string zip)
        {
            SqlCommand cmd = new SqlCommand("proc_AvailableCategory", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@jobtypeID", jobtype);
            cmd.Parameters.AddWithValue("@zipCode", zip);
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
            adpt.Fill(ds, "AvailCategories");
            objCon.Con.Close();
            return ds.GetXml();
        }
        public string AvailableSalesCategory(string jobtype, string zip, int associateID)
        {
            SqlCommand cmd = new SqlCommand("proc_AvailableSalesCategory", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@jobtypeID", jobtype);
            cmd.Parameters.AddWithValue("@zipCode", zip);
            cmd.Parameters.AddWithValue("@associateID", associateID);
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
            adpt.Fill(ds, "AvailSalesCategories");
            objCon.Con.Close();
            return ds.GetXml();
        }
        public string AvailableSalesCategoryNew(string jobtype, string zip, int associateID)
        {
            SqlCommand cmd = new SqlCommand("proc_AvailableSalesCategoryNew", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@jobtypeID", jobtype);
            cmd.Parameters.AddWithValue("@zipCode", zip);
            cmd.Parameters.AddWithValue("@associateID", associateID);
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
            adpt.Fill(ds, "AvailSalesCategories1");
            objCon.Con.Close();
            return ds.GetXml();
        }
        /// <summary>
        /// This Method is used to bind all the available  category for specific Zipcode
        /// </summary>
        /// <param name="jobtype"></param>
        /// <param name="zip"></param>
        /// <returns></returns>
        public string AvailableCategoryZipwise(string jobtype, string zip)
        {
            SqlCommand cmd = new SqlCommand("proc_AvailableServiceCategoryZipcode", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@jobtypeID", jobtype);
            cmd.Parameters.AddWithValue("@zipCode", zip);
            cmd.Parameters.AddWithValue("@action", "VCategory");
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
            adpt.Fill(ds, "AvailCategories");
            objCon.Con.Close();
            return ds.GetXml();
        }

        public string AvailableZipCodesForServices(string jobtype, string zip)
        {
            SqlCommand cmd = new SqlCommand("Proc_AvailableZipcodesForServices", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@jobtypeID", jobtype);
            cmd.Parameters.AddWithValue("@zipCode", zip);            
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
            adpt.Fill(ds, "AvailZipCodes");
            objCon.Con.Close();
            return ds.GetXml();
        }

        /// <summary>
        /// This Method is used to bind all the available Sub category for specific Zipcode on the basis of category
        /// </summary>
        /// <param name="jobtype"></param>
        /// <param name="zip"></param>
        /// <param name="categoryID"></param>
        /// <returns></returns>
        public string AvailableSubCategoryZipwise(string jobtype, string zip, int categoryID)
        {
            SqlCommand cmd = new SqlCommand("proc_AvailableServiceCategoryZipcode", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@jobtypeID", jobtype);
            cmd.Parameters.AddWithValue("@zipCode", zip);
            cmd.Parameters.AddWithValue("@categoryID", categoryID);                       
            cmd.Parameters.AddWithValue("@action", "VSubCategory");
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
            adpt.Fill(ds, "AvailSubCategories");
            objCon.Con.Close();
            return ds.GetXml();
        }


        /// <summary>
        /// This method will get associate Purchased Categories on the basis of jobtype
        /// </summary>
        /// <param name="objCategory"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        public string AssociatePurchasedCategory(PropCategory objCategory, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_AllAssociateCategories", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "PurchasedCat");
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt32(userName));
                cmd.Parameters.AddWithValue("@jobType", objCategory.JobTypeValue);
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
                adpt.Fill(ds, "AssociateCategories");
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
