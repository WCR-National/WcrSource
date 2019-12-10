using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.SessionState;

namespace WcrAssociate.ws
{
    /// <summary>
    /// Summary description for ShowSubcategoryIcon
    /// </summary>
    public class ShowSubcategoryIcon : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["con"].ConnectionString);

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "Select SubCategoryImage from tbl_SubCategory" + " where ID =@ID";
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.Connection = con;
                SqlParameter ImageID = new SqlParameter("@ID", System.Data.SqlDbType.VarChar);
                ImageID.Value = context.Request.QueryString["ID"];
                cmd.Parameters.Add(ImageID);
                con.Open();
                SqlDataReader dReader = cmd.ExecuteReader();
                dReader.Read();
                context.Response.BinaryWrite((byte[])dReader["SubCategoryImage"]);
                dReader.Close();
                con.Close();
            }
            catch { context.Response.Write("<h2>Image not found...</h2>"); }
            finally { }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}