using System.Configuration;
using System.Data.SqlClient;
namespace ClsLibrary.Dal
{
    public class ConnectionClass
    {
        public SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["con"].ConnectionString);
        
    }
}
