using System.Data.SqlClient;
using ClsLibrary.PropertyLayer;
using System;
using System.Data;

namespace ClsLibrary.Dal
{
    public class DllAssociateSubscription
    {
        readonly ConnectionClass objCon = new ConnectionClass();

        /// <summary>
        /// This Method is used to Post data into tbl_MemberShip table
        /// </summary>
        /// <param name="objMemberShip">JobType,MemberShip Name,</param>
        /// <returns>1 for success and -1 for fail</returns>

        public string Insertsubscription(PropAssociateMembership objMemberShip, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_AssociateMembership", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@associateID", objMemberShip.associateID);
                    cmd.Parameters.AddWithValue("@subscriptionID", objMemberShip.subscriptionID);
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
        /// This Method is used to Update data into tbl_MemberShip table
        /// </summary>
        /// <param name="objMemberShip">JobType,MemberShip Name,ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>      

        public string Updatesubscription(PropAssociateMembership objMemberShip, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_AssociateMembership", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@associateID", objMemberShip.ID);
                    cmd.Parameters.AddWithValue("@subscriptionID", objMemberShip.subscriptionID);
                    cmd.Parameters.AddWithValue("@ID", objMemberShip.ID);
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
        /// This Method is used to Delete data into tbl_MemberShip table
        /// </summary>
        /// <param name="objMemberShip">ID and Action</param>
        /// <returns>1 for success and -1 for fail</returns>   

        public string DeleteMemberShip(PropAssociateMembership objMemberShip, string userName)
        {
            if (userName != null && userName != "")
            {
                SqlCommand cmd = new SqlCommand("proc_AssociateMembership", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@ID", objMemberShip.ID);
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
        /// This Method is used to Select data from tbl_MemberShip table
        /// </summary>
        /// <param name="objMemberShip">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string SelectMemberShip(string userName)
        {
            if (userName != null && userName != "")
            {

                SqlCommand cmd = new SqlCommand("proc_AssociateMembership", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "View");
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(userName));
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
                adpt.Fill(ds, "AssSubscription");
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
