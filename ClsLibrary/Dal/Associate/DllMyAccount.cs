using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
namespace ClsLibrary.Dal.Associate
{
    public class DllMyAccount
    {
        readonly ConnectionClass objCon = new ConnectionClass();
        /// <summary>
        /// This Method is used to get all purchased Category from Sales and Services
        /// </summary>
        /// <param name="associateID"></param>
        /// <returns></returns>
        public string SelectAdvertisement(string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_MyAccount", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
                cmd.Parameters.AddWithValue("@action", "view");
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
                adpt.Fill(ds, "MyCategories");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }

        public string SelectCurrentPurchasedZipCodes(string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_MyAccount", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
                cmd.Parameters.AddWithValue("@action", "view_services_current_purchase_zip_code");
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
                adpt.Fill(ds, "MyCategories");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }


        /// <summary>
        /// This Method is used to get all purchased Category either from Sales or Services
        /// </summary>
        /// <param name="associateID"></param>
        /// <param name="JobTypeID"></param>
        /// <returns></returns>
        public string SelectPurchasedCategory(string associateID, int JobTypeID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_PurchaseCategory", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
                cmd.Parameters.AddWithValue("@jobtypeID", JobTypeID);
                cmd.Parameters.AddWithValue("@action", "viewPurchasedCat");
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
                adpt.Fill(ds, "PurCategories");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }

        /// <summary>
        /// This is overload method  will get all the purchased categories from sales and services
        /// </summary>
        /// <param name="associateID"></param>
        /// <returns></returns>
        public string SelectPurchasedCategory(string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_PurchaseCategory", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
                cmd.Parameters.AddWithValue("@action", "viewAllPurchasedCat");
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
                adpt.Fill(ds, "AllPurCategories");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }


        public string DeleteCategory(string associateID, int ID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_MyAccount", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", ID);
                cmd.Parameters.AddWithValue("@action", "PermananetDelete");                
                if (objCon.Con.State == ConnectionState.Open)
                { }
                else
                {
                    objCon.Con.Open();
                }
                cmd.Connection = objCon.Con;
                int a = cmd.ExecuteNonQuery();
                objCon.Con.Close();
                if(a>=1)
                {
                    return a.ToString();
                }
                else
                {
                    return "0";
                }                
            }
            else
            {
                return "Not Valid";
            }

        }
        public string SelectPurchasedZipcode(string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_AssociateZipcode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
                cmd.Parameters.AddWithValue("@action", "all");
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
                adpt.Fill(ds, "Myzipcodes");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }
        public string CategoryWiseZipcode(string associateID, int categoryID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_AssociateZipcode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
                cmd.Parameters.AddWithValue("@categoryId", categoryID);
                cmd.Parameters.AddWithValue("@action", "AssociateCategory");
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
                adpt.Fill(ds, "Myzipcodes");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }
        public string UpdateAccount(int ID, string associateID, int activeV)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_UpdateAccount", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", ID);
                cmd.Parameters.AddWithValue("@activeValue", activeV); 
                if (objCon.Con.State == ConnectionState.Open)
                { }
                else
                {
                    objCon.Con.Open();
                }
                int a = cmd.ExecuteNonQuery();
                objCon.Con.Close();
                if (a >= 1)
                {
                    return a.ToString();
                }
                else
                {
                    return "0";
                }       
            }
            else
            {
                return "Not Valid";
            }
        }

    }
}
