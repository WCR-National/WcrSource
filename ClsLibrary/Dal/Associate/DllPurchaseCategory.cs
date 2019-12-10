using System.Data;
using System.Data.SqlClient;
using ClsLibrary.Bal;
using System;
using WcrClassLibrary.DataObjectsDeprecating;
using WcrVault;
using System.Net.Http;
using System.Web.Script.Serialization;
namespace ClsLibrary.Dal.Associate
{
    public class DllPurchaseCategory
    {
        readonly ConnectionClass objCon = new ConnectionClass();

        #region This method is no longer in used
        //public string InsertD(object subCategoryID, int PaymentPlan, int associateID, float Categoryamount, object zipcodeID)
        //{
        //    try
        //    {
        //        DataTable dt = new DataTable();
        //        dt.Columns.Add("zipcode");
        //        dt.Columns.Add("SubCategoryID");               
        //        dt.Columns.Add("PaymentPlan");
        //        dt.Columns.Add("associateID");
        //        dt.Columns.Add("amount");                
        //        string[] totalEmp = subCategoryID.ToString().Split(',');
        //        string[] zipcodes = zipcodeID.ToString().Split(',');
        //        for (int i = 0; i < totalEmp.Length; i++)
        //        {
        //            DataRow dr = dt.NewRow();
        //            dr["zipcode"] = zipcodes[i];                   
        //            dr["SubCategoryID"] = totalEmp[i];
        //             dr["PaymentPlan"] = PaymentPlan;
        //            dr["associateID"] = associateID;
        //            dr["amount"] = Categoryamount * PaymentPlan;                   
        //            dt.Rows.Add(dr);                    
        //        }
        //        SqlCommand cmd = new SqlCommand("proc_associateCategories", objCon.Con);
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        objCon.Con.Open();
        //        cmd.Parameters.AddWithValue("@Details", dt);
        //        int a = cmd.ExecuteNonQuery();
        //        objCon.Con.Close();
        //        if (a >= 1)
        //        {
        //            return ClsCommon.ActiveValue.ToString();
        //        }
        //        else
        //        {
        //            return ClsCommon.InactiveValue.ToString();
        //        }
        //    }
        //    catch
        //    {
        //        return "3";
        //    }
        //}

        #endregion

        /// <summary>
        /// 
        /// </summary>
        /// <param name="subCategoryID"></param>
        /// <param name="PaymentPlan"></param>
        /// <param name="associateID"></param>
        /// <param name="Categoryamount"></param>
        /// <param name="zipcodeID"></param>
        /// <returns></returns>
        public string InsertD(object CategoryID, object subCategoryID, int PaymentPlan, int associateID, object Categoryamount, object zipcodeID, string Couponcode, int Discount, int Duration)
        {
            try
            {
                DataTable dt = new DataTable();
                dt.Columns.Add("zipcode");
                dt.Columns.Add("CategoryID");
                dt.Columns.Add("SubCategoryID");
                dt.Columns.Add("PaymentPlan");
                dt.Columns.Add("associateID");
                dt.Columns.Add("amount");
                dt.Columns.Add("couponCode");
                dt.Columns.Add("discount");
                dt.Columns.Add("duration");

                string[] catID = CategoryID.ToString().Split(',');
                string[] totalEmp = subCategoryID.ToString().Split(',');
                string[] zipcodes = zipcodeID.ToString().Split(',');
                string[] Price = Categoryamount.ToString().Split(',');
                for (int i = 0; i < totalEmp.Length; i++)
                {
                    DataRow dr = dt.NewRow();
                    dr["CategoryID"] = catID[i];
                    dr["zipcode"] = zipcodes[i];
                    dr["SubCategoryID"] = totalEmp[i];
                    dr["PaymentPlan"] = PaymentPlan;
                    dr["associateID"] = associateID;
                    dr["amount"] = Convert.ToDouble(Price[i]) * PaymentPlan;
                    dr["couponCode"] = Couponcode;
                    dr["discount"] = Discount;
                    dr["duration"] = Duration;
                    dt.Rows.Add(dr);
                }
                SqlCommand cmd = new SqlCommand("proc_associateCategories", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                cmd.Parameters.AddWithValue("@Details", dt);
                int a = cmd.ExecuteNonQuery();
                objCon.Con.Close();
                if (a >= 1)
                {
                    return ClsCommon.ActiveValue.ToString();
                }
                else
                {
                    return ClsCommon.InactiveValue.ToString();
                }
            }
            catch
            {
                return "3";
            }
        }
                public string InsertCatgoryPostAds(int CategoryID, int subCategoryID, int PaymentPlan, int associateID, int Categoryamount, int zipcodeID, string Couponcode, int Discount, int Duration)
        {
            try
            {
               
                SqlCommand cmd = new SqlCommand("proc_SaveAssociateCategories", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                cmd.Parameters.AddWithValue("@categoryID", CategoryID);
                cmd.Parameters.AddWithValue("@zipcode", zipcodeID);
                cmd.Parameters.AddWithValue("@subCategoryID", subCategoryID);
                cmd.Parameters.AddWithValue("@paymentPlanID", PaymentPlan);
                cmd.Parameters.AddWithValue("@associateID", associateID);
                cmd.Parameters.AddWithValue("@amount", Categoryamount);
                cmd.Parameters.AddWithValue("@couponCode", Couponcode);
                cmd.Parameters.AddWithValue("@discount", Discount);
                cmd.Parameters.AddWithValue("@duration", Duration);
                int a = cmd.ExecuteNonQuery();
                objCon.Con.Close();
                if (a >= 1)
                {
                    return ClsCommon.ActiveValue.ToString();
                }
                else
                {
                    return ClsCommon.InactiveValue.ToString();
                }
            }
            catch
            {
                return "3";
            }
        }

        public string LoadCardData(int associateID, string toalAmount, string inUserName, string Description)
        {
            try
            {
                int x = RetrieveCardByAssociateID(associateID, inUserName);
                if (x == 0)
                {
                    SqlCommand cmd = new SqlCommand("proc_RetrieveCardDataByAssociateID", objCon.Con);
                    if (objCon.Con.State == ConnectionState.Open)
                    { }
                    else
                    {
                        objCon.Con.Open();
                    }
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@AssociateId", associateID);
                    //int a = cmd.ExecuteNonQuery();
                    SqlDataReader dr = cmd.ExecuteReader();
                    DataTable dt = new DataTable();
                    dt.Load(dr);
                    objCon.Con.Close();
                    if (dt.Rows.Count >= 1)
                    {
                        int y = ExecuteCardCharge(dt.Rows[0]["CardDataId"].ToString(), toalAmount, inUserName, Description);
                        if (y == 0)
                        {
                            return ClsCommon.ActiveValue.ToString();
                        }
                        else
                        {
                            return ClsCommon.NotSuccess.ToString();
                        }
                    }

                    else
                    {
                        return ClsCommon.NotSuccess.ToString();
                    }
                }
                else
                {
                    return ClsCommon.NotSuccess.ToString();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Execution error in LoadCardData function of ClsLibrary.Dal.Associate.DllPurchaseCategory.cs - Exception Message: " + ex.Message);
            }
        }

        #region WebAPI Calls
        /// <summary>
        /// RetrieveCardByAssociateID
        /// Fires the call to the WebAPI to prepare retrieval of all cards for associate ID
        /// </summary>
        /// <param name="associateId"></param>
        /// <returns></returns>
        /// 
        public int RetrieveCardByAssociateID(int associateId ,string inUserName)
        {
            int rc = -1;

            WcrClassLibrary.WcrHttpClient client = new WcrClassLibrary.WcrHttpClient(inUserName);
            HttpResponseMessage resp = client.GetAsync(Gateway.apiroute_retrievebyassociateid + Gateway.getkey_subscriberid + "/" + associateId.ToString()).GetAwaiter().GetResult();

            if (resp.IsSuccessStatusCode)
            {
                rc = Convert.ToInt32(resp.Content.ReadAsStringAsync().GetAwaiter().GetResult());
            }

            return rc;
        }
         public int ExecuteCardCharge(string cnum, string amount , string userName, string description)
        {
            string cardid = string.Empty, amt = string.Empty, desc = string.Empty, oMsg = string.Empty;
            cardid = cnum;
            amt = amount;
            desc = description;// "For Purchasing Categories";
            int rc = -1;

            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            var jsonBody = jsSerializer.Serialize("");

            WcrClassLibrary.WcrHttpClient client = new WcrClassLibrary.WcrHttpClient(userName);
            HttpResponseMessage resp = client.PostAsync(Gateway.apiroute_immediatecharge + Gateway.getkey_subscriberid + "/" + cardid + "/" + amt + "/" + desc,
                new StringContent(jsonBody)).GetAwaiter().GetResult();

            if (resp.IsSuccessStatusCode)
            {
                oMsg = resp.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                if (!oMsg.Contains("EXCEPTION"))
                {
                    rc = 0;
                }
            }

            return rc;
        }
        
        #endregion

        public string GetAssociateDetail(int associateID, string toalAmount , string userName , string Description)
        {
            string str = string.Empty;
            string message = string.Empty;
            objCon.Con.Open();
            SqlCommand cmd = new SqlCommand("proc_LoadAssociateInfo", objCon.Con);
            SqlDataAdapter sda = new SqlDataAdapter(cmd);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@associateID", associateID);
            DataTable dt = new DataTable();
            sda.Fill(dt);
            objCon.Con.Close();
            if (dt != null)
            {
                CardPaymentObj ObjCardPayment = new CardPaymentObj();
                ObjCardPayment.Total = toalAmount;
                ObjCardPayment.SubTotal = toalAmount;
                ObjCardPayment.Email = "k";
                ObjCardPayment.City = dt.Rows[0]["Cardholder_City"].ToString();
                ObjCardPayment.Country = dt.Rows[0]["Cardholder_Country"].ToString();
                ObjCardPayment.Address = dt.Rows[0]["Cardholder_Address"].ToString();
                ObjCardPayment.ZipCode = dt.Rows[0]["Cardholder_Zip"].ToString();
                ObjCardPayment.State = dt.Rows[0]["Cardholder_State"].ToString();
                ObjCardPayment.CVV = dt.Rows[0]["CVV"].ToString();
                ObjCardPayment.ExpMM = dt.Rows[0]["ExpMonth"].ToString();
                ObjCardPayment.ExpYYYY = dt.Rows[0]["ExpYear"].ToString();
                ObjCardPayment.FirstName = dt.Rows[0]["Cardholder_FirstName"].ToString();
                ObjCardPayment.LastName = dt.Rows[0]["Cardholder_LastName"].ToString();
                ObjCardPayment.CardNumber = dt.Rows[0]["CardNumber"].ToString();
                string a = dt.Rows[0]["CardNumber"].ToString().Substring(0, 1);
                if (a == "3")
                {
                    ObjCardPayment.CardType = "American Express";
                }
                else if (a == "6")
                {
                    ObjCardPayment.CardType = "Discover";
                }
                else if (a == "5")
                {
                    ObjCardPayment.CardType = "Mastercard";
                }
                else if (a == "4")
                {
                    ObjCardPayment.CardType = "Visa";
                }
                int y = ExecuteCardCharge(ObjCardPayment.CardNumber, ObjCardPayment.SubTotal, userName, Description);
                if (y == 0)
                {
                    return a;
                }
                else
                {
                    return null;
                }
                //if (oMsg == "PAYMENT APPROVED")
                //{
                //    return "a";//this is temp used 
                //}
                //else
                //{
                //    return null;
                //}
            }
            else
            {
                return null;
            }
        }
        public string DropAssociateFromDropCardData(int associateID)
        {
            SqlCommand cmd = new SqlCommand("proc_DropCardData", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            objCon.Con.Open();
            try
            {
                cmd.Parameters.AddWithValue("@AssociateID", associateID);
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
        public string SetFeaturedAdvD(object advertisementID, int PaymentPlan, int AssociateID)
        {
            try
            {
                DataTable dt = new DataTable();
                dt.Columns.Add("AdvID");
                int TotalAmount = 0;
                string[] totalEmp = advertisementID.ToString().Split(',');
                for (int i = 0; i < totalEmp.Length; i++)
                {
                    TotalAmount += 5;
                    DataRow dr = dt.NewRow();
                    dr["AdvID"] = totalEmp[i];
                    dt.Rows.Add(dr);
                }
                SqlCommand cmd = new SqlCommand("proc_UpdateFeaturedAdv", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                cmd.Parameters.AddWithValue("@MembershipID", PaymentPlan);
                cmd.Parameters.AddWithValue("@AdvID", dt);
                cmd.Parameters.AddWithValue("@action", "Add");
                int a = cmd.ExecuteNonQuery();
                objCon.Con.Close();
                if (a >= 1)
                {
                    // LoadCardData(AssociateID,TotalAmount.ToString());
                    return ClsCommon.ActiveValue.ToString();
                }
                else
                {
                    return ClsCommon.InactiveValue.ToString();
                }
            }
            catch
            {
                return "3";
            }
        }
        public string AssociateCardExists(string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("usp_ExistsAssociateCard", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@associateId", Convert.ToInt16(associateID));
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
                adpt.Fill(ds, "CheckAssoCard");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }
        public string UnFeaturedFeaturedAdvD(object advertisementID)
        {
            try
            {
                DataTable dt = new DataTable();
                dt.Columns.Add("AdvID");
                string[] totalEmp = advertisementID.ToString().Split(',');
                for (int i = 0; i < totalEmp.Length; i++)
                {
                    DataRow dr = dt.NewRow();
                    dr["AdvID"] = totalEmp[i];
                    dt.Rows.Add(dr);
                }
                SqlCommand cmd = new SqlCommand("proc_UpdateFeaturedAdv", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                cmd.Parameters.AddWithValue("@AdvID", dt);
                cmd.Parameters.AddWithValue("@action", "Remove");
                int a = cmd.ExecuteNonQuery();
                objCon.Con.Close();
                if (a >= 1)
                {
                    return ClsCommon.ActiveValue.ToString();
                }
                else
                {
                    return ClsCommon.InactiveValue.ToString();
                }
            }
            catch
            {
                return "3";
            }
        }
        public int AssociateCardExists1(string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("usp_ExistsAssociateCard", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@associateId", Convert.ToInt16(associateID));
                if (objCon.Con.State == ConnectionState.Open)
                { }
                else
                {
                    objCon.Con.Open();
                }
                cmd.Connection = objCon.Con;
                int a = Convert.ToInt16(cmd.ExecuteScalar());
                objCon.Con.Close();
                if (a >= 1)
                {
                    return a;
                }
                else
                {
                    return 0;
                }
            }
            else
            {
                return 0;
            }

        }
        /// <summary>
        /// This Method will get Price of SubCategory on the basis of zipCode population
        /// </summary>
        /// <param name="associateID"></param>
        /// <param name="zipCode"></param>
        /// <param name="subCategoryID"></param>
        /// <returns></returns>

        public string SubCategoryPrice(string associateID, int zipCode, int subCategoryID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_ZipCodePrice", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@associateId", Convert.ToInt32(associateID));
                cmd.Parameters.AddWithValue("@zipCode", zipCode);
                cmd.Parameters.AddWithValue("@subCategoryID", subCategoryID);                
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
                adpt.Fill(ds, "GetPrice");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }

        public string CountAssociateAdvertisements(string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("Proc_AssociateAdvertisement", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
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
                adpt.Fill(ds, "AssociateAdvertisements");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }



        public string PostAdvertisementPrice(string associateID, int zipCode, int subCategoryID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_PostAdvertisementPrice", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@associateId", Convert.ToInt32(associateID));
                cmd.Parameters.AddWithValue("@zipCode", zipCode);
                cmd.Parameters.AddWithValue("@subCategoryID", subCategoryID);                
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
                adpt.Fill(ds, "GetPricePostAdvts");
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
