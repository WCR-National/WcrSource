using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.UI.WebControls;
using System.Collections;
namespace ClsLibrary.Bal
{
    public class clsDropDown
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["con"].ConnectionString);

        public CheckBoxList BindCheckBoxList(string TableName, string FieldName, string ValueID, string condition, CheckBoxList chk)
        {
            try
            {

                SqlCommand cmd = new SqlCommand("select " + FieldName + "," + ValueID + " from " + TableName + " where " + condition + "", conn);
                if (conn.State != ConnectionState.Open)
                {
                    conn.Open();
                }
                SqlDataReader dr = cmd.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                conn.Close();
                if (dt.Rows.Count > 0)
                {
                    chk.Items.Clear();
                    chk.DataTextField = FieldName;
                    chk.DataValueField = ValueID;
                    chk.DataSource = dt;
                    chk.DataBind();

                    return chk;
                }
                else
                {
                    chk.Items.Clear();
                    return null;
                }
            }
            catch
            {
                return null;
            }

        }
        public DropDownList BindMultidropn(string TableName, string FieldName, string ValueID, string condition, DropDownList ddl)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("select " + FieldName + "," + ValueID + " from " + TableName + " where " + condition + "", conn);
                if (conn.State != ConnectionState.Open)
                {
                    conn.Open();
                }
                SqlDataReader dr = cmd.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                conn.Close();
                if (dt.Rows.Count > 0)
                {
                    ddl.Items.Clear();
                    ddl.DataTextField = FieldName;
                    ddl.DataValueField = ValueID;
                    ddl.DataSource = dt;
                    ddl.DataBind();
                    ddl.Items.Insert(0, "Select");
                    return ddl;
                }
                else
                {
                    ddl.Items.Clear();
                    return null;
                }
            }
            catch
            {
                return null;
            }
        }
        public ListBox BindMultiListBox(string TableName, string FieldName, string ValueID, string condition, ListBox ddl)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("select " + FieldName + "," + ValueID + " from " + TableName + " where " + condition + "", conn);
                if (conn.State != ConnectionState.Open)
                {
                    conn.Open();
                }
                SqlDataReader dr = cmd.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                conn.Close();
                if (dt.Rows.Count > 0)
                {
                    ddl.Items.Clear();
                    ddl.DataTextField = FieldName;
                    ddl.DataValueField = ValueID;
                    ddl.DataSource = dt;
                    ddl.DataBind();
                    ddl.Items.Insert(0, "Select");
                    return ddl;
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }
        }



        public DropDownList BindMultidropn(string Query, string FieldName, string ValueID, DropDownList ddl)
        {
            try
            {
                SqlCommand cmd = new SqlCommand(Query, conn);
                if (conn.State != ConnectionState.Open)
                {
                    conn.Open();
                }
                SqlDataReader dr = cmd.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                conn.Close();
                if (dt.Rows.Count > 0)
                {
                    ddl.Items.Clear();
                    ddl.DataTextField = FieldName;
                    ddl.DataValueField = ValueID;
                    ddl.DataSource = dt;
                    ddl.DataBind();
                    ddl.Items.Insert(0, "Select");
                    return ddl;
                }
                else
                {
                    ddl.Items.Clear();
                    return null;
                }
            }
            catch
            {
                return null;
            }
        }
    }
}
