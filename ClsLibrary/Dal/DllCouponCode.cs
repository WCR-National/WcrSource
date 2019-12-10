using System;
using System.Data.SqlClient;
using ClsLibrary.PropertyLayer.Associate;
using System.Data;

namespace ClsLibrary.Dal
{
    public class DllCouponCode
    {
        readonly ConnectionClass objCon = new ConnectionClass();
        public string SearchCouponcode(PropCouponCode objCouponCode)
        {
           
                SqlCommand cmd = new SqlCommand("proc_CouponCodeForRegistration", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "Apply");
                cmd.Parameters.AddWithValue("@CouponCode", objCouponCode.CouponCode);
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
                adpt.Fill(ds, "ccsign");
                objCon.Con.Close();
                return ds.GetXml();
        }
    }
}
