using System.Data.SqlClient;
using ClsLibrary.PropertyLayer;
using System.Data;
using System;
using ClsLibrary.Bal;
namespace ClsLibrary.Dal
{
    public class DllPromoCode
    {
        readonly ConnectionClass objCon = new ConnectionClass();
        public string InsertPromoCode(PropPromoCode objPromocode)
        {
            SqlCommand cmd = new SqlCommand("proc_PromoCode", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            objCon.Con.Open();
            try
            {
                cmd.Parameters.AddWithValue("@categoryID", objPromocode.CategoryID);
                cmd.Parameters.AddWithValue("@SubCategoryID", objPromocode.SubCategoryID);
                cmd.Parameters.AddWithValue("@fromDate", objPromocode.FromDate);
                cmd.Parameters.AddWithValue("@toDate", objPromocode.ToDate);
                cmd.Parameters.AddWithValue("@discount", objPromocode.Discount);
                cmd.Parameters.AddWithValue("@promoCode", objPromocode.PromoCode);
                cmd.Parameters.AddWithValue("@associateID", objPromocode.AssociateID);
                cmd.Parameters.AddWithValue("@action", "Add");
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
        public int UpdatePromoCode(PropPromoCode objPromocode)
        {
            SqlCommand cmd = new SqlCommand("proc_UDS_PromoCodeRegistration", objCon.Con);
            return cmd.ExecuteNonQuery();
        }
        public int DeletePromoCode(PropPromoCode objPromocode)
        {
            SqlCommand cmd = new SqlCommand("proc_UDS_PromoCodeRegistration", objCon.Con);
            return cmd.ExecuteNonQuery();
        }
        public string SelectPromoCode(string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_PromoCode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "Select");
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
                adpt.Fill(ds, "PromoCode");
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
