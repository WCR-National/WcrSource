using System;
using System.Data.SqlClient;
using System.Data;
namespace ClsLibrary.Dal
{
 public   class DllCouponCodeForCategory
    {
        readonly ConnectionClass objCon = new ConnectionClass();
        public string SelectCouponCodeCategory(string associateID)
        {
            try
            {
                if (associateID != null && associateID != "")
                {
                    SqlCommand cmd = new SqlCommand("proc_CouponCodeForAssociateCategory", objCon.Con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Action", "Apply");
                    cmd.Parameters.AddWithValue("@AssociateID", Convert.ToInt16(associateID));
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
                    adpt.Fill(ds, "ViewCouponCodeCat");
                    objCon.Con.Close();
                    return ds.GetXml();
                }
                else
                {
                    return "Not Valid";
                }
            }
            catch
            {
                return "Not Valid";
            }

        }
    }
}
