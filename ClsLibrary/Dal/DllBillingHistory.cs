using System;
using ClsLibrary.PropertyLayer.Associate.Sale;
using System.Data;
using System.Data.SqlClient;
using ClsLibrary.Bal;

namespace ClsLibrary.Dal
{
    public class DllBillingHistory
    {
        readonly ConnectionClass objCon = new ConnectionClass();
        public string GetBillingHistoryReferences(string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_GetBillingHistoryReferences", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@AssociateId", Convert.ToInt16(associateID));
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
                adpt.Fill(ds, "Billinghist");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }
        }
        public string GetBillingHistoryPurchaseCategory(int ReferenceId)
        {
            SqlCommand cmd = new SqlCommand("proc_GetBillingHistoryCategorySubcategoryCharges", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@inBillingHistoryReferenceId", ReferenceId);
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
            adpt.Fill(ds, "BillingCategoryhistory");
            objCon.Con.Close();
            return ds.GetXml();

        }
        public string GetBillingHistoryPostedSalesAdvertisements(int ReferenceId)
        {
            SqlCommand cmd = new SqlCommand("proc_GetBillingHistoryPostedAdvertisementCharges", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@inBillingHistoryReferenceId", ReferenceId);
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
            adpt.Fill(ds, "BillinghistoryPostedAdts");
            objCon.Con.Close();
            return ds.GetXml();


        }


        public string GetBillingHistoryPurchasedZipcodes(int ReferenceId)
        {
            SqlCommand cmd = new SqlCommand("proc_GetBillingHistoryZipCodeCharges", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@inBillingHistoryReferenceId", ReferenceId);
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
            adpt.Fill(ds, "BillinghistoryPurchasedZipCodes");
            objCon.Con.Close();
            return ds.GetXml();
        }      


    }
}
