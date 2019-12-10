using System.Data.SqlClient;
using ClsLibrary.PropertyLayer;

namespace ClsLibrary.Dal
{
    public class DllPaymentPlan
    {
        readonly ConnectionClass objCon = new ConnectionClass();
        #region Insert
        /// <summary>
        /// This Method will be  used to Post data into tbl_paymentPlan table
        /// </summary>
        /// <param name="objPaymentPlan">Plan Name,Cost,Duration</param>
        /// <returns>1 for success and -1 for fail</returns>
        public int InsertPaymentPlan(PropPaymentPlan objPaymentPlan)
        {
            //proc_PaymentPlan is the stored procedure name which will be used to Insert data into the table
            SqlCommand cmd = new SqlCommand("proc_PaymentPlan", objCon.Con);
            return cmd.ExecuteNonQuery();
        }
        #endregion


        #region Update
        /// <summary>
        /// This Method will be used to Update data into the table
        /// </summary>
        /// <param name="objPaymentPlan">Plan Name,Cost,Duration,Action,ID</param>
        /// <returns>1 for success and -1 for fail</returns>      
        public int UpdatePaymentPlan(PropPaymentPlan objPaymentPlan)
        {
            //proc_UDS_PaymentPlan is the stored procedure name which will be used to Update data into the table
            SqlCommand cmd = new SqlCommand("proc_UDS_PaymentPlan", objCon.Con);
            return cmd.ExecuteNonQuery();
        }
        #endregion

        #region Delete
        /// <summary>
        /// This Method will be used to Delete data from the table
        /// </summary>
        /// <param name="objPaymentPlan">ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>  
        public int DeletePaymentPlan(PropPaymentPlan objPaymentPlan)
        {
            //proc_UDS_PaymentPlan is the stored procedure name which will be used to delete data from the table
            SqlCommand cmd = new SqlCommand("proc_UDS_PaymentPlan", objCon.Con);
            return cmd.ExecuteNonQuery();
        }
        #endregion
        #region Select
        /// <summary>
        /// This Method will be used to Select data from tbl_subCategory table
        /// </summary>
        /// <param name="objPaymentPlan">ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>  
        public int SelectRecord(PropPaymentPlan objPaymentPlan)
        {

            //proc_UDS_PaymentPlan is the stored procedure name which will be used to select data from the table
            SqlCommand cmd = new SqlCommand("proc_UDS_PaymentPlan", objCon.Con);
            return cmd.ExecuteNonQuery();
        }
        #endregion

    }
}
