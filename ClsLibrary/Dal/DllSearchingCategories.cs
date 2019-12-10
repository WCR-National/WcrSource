using System;
using System.Data.SqlClient;
using ClsLibrary.PropertyLayer;
using System.Data;
namespace ClsLibrary.Dal
{
   public class DllSearchingCategories
    {
       readonly ConnectionClass objCon = new ConnectionClass();
       public string SearchSalesCategory(PropCategory objCategory, string zipcode, string _action)
       {
           SqlCommand cmd = new SqlCommand("proc_GetSearchingCategory", objCon.Con);
           cmd.CommandType = CommandType.StoredProcedure;
           cmd.Parameters.AddWithValue("@Action", _action);
           cmd.Parameters.AddWithValue("@jobType", objCategory.JobTypeValue);
           cmd.Parameters.AddWithValue("@zipCode", zipcode);
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
           adpt.Fill(ds, "SearchCategories");
           objCon.Con.Close();
           return ds.GetXml();
       }
    }
}
