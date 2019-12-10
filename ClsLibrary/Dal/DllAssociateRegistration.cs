using System;
using ClsLibrary.PropertyLayer;
using System.Data;
using System.Data.SqlClient;
using ClsLibrary.Bal;
using WcrClassLibrary;
using ClsLibrary.Dal.Associate;
using System.Net.Http;
using WcrClassLibrary.DataObjects.AssociateTransactions;
using Newtonsoft.Json;

namespace ClsLibrary.Dal
{
    public class DllAssociateRegistration
    {

        readonly ConnectionClass objCon = new ConnectionClass();
        /// <summary>
        /// This Method is used to Post data into tbl_sale table
        /// </summary>
        /// <param name="objAssociateRegistration"></param>
        /// <returns>1 for success and -1 for fail</returns>

        public string ResendActivationCode(string _Email)
        {
            WcrCryptography crypto = new WcrCryptography();
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            WcrClassLibrary.DataObjects.EmailAddress sqlParams = new WcrClassLibrary.DataObjects.EmailAddress();
            sqlParams.Email = crypto.WcrSimpleEncrypt(_Email);
            using (WcrHttpClient client = new WcrHttpClient(WcrVault.Gateway.getwcrusername, WcrVault.Gateway.getwcrpassword))
            {
                resp = client.PutAsJsonAsync("api/AccountCreation/ResendActivationCode", sqlParams).Result;
                int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                if (Id > 0)
                {
                    return Id.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }

            }
        }
        public string InsertData(PropAssociateRegistration objAssociateRegistration)
        {
            WcrCryptography crypto = new WcrCryptography();
            AssociateRegistrationParameters sqlParams = new AssociateRegistrationParameters();
            sqlParams.FullName = crypto.WcrSimpleEncrypt(objAssociateRegistration.FullName);
            sqlParams.LastName = crypto.WcrSimpleEncrypt(objAssociateRegistration.LastName);
            sqlParams.EmailId = crypto.EncryptUserName(objAssociateRegistration.EmailID.ToLower());
            //string ssss = crypto.WcrSimpleEncrypt(objAssociateRegistration.EmailID);
            sqlParams.Password = crypto.EncryptPassword(objAssociateRegistration.Password);
            sqlParams.MobileNo = crypto.WcrSimpleEncrypt(objAssociateRegistration.MobileNo);
            sqlParams.ZipCode = crypto.WcrSimpleEncrypt(objAssociateRegistration.ZipCode);
            sqlParams.Photo = "0.png";
            sqlParams.LicenseState = crypto.WcrSimpleEncrypt(objAssociateRegistration.LicenseState);
            sqlParams.LicenseId = crypto.WcrSimpleEncrypt(objAssociateRegistration.LicenseID);
            sqlParams.ForMonths = "1";
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(WcrVault.Gateway.getwcrusername, WcrVault.Gateway.getwcrpassword))  //using (WcrHttpClient client = new WcrHttpClient(objAssociateRegistration.EmailID, objAssociateRegistration.Password))
            {
                resp = client.PostAsJsonAsync("api/AccountCreation/AssociateRegistrationAdd", sqlParams).Result;
                int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                if (Id > 0)
                {
                    return Id.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }

            }

            #region
            ////WcrCryptography cardEncrypt = new WcrCryptography();
            ////SqlCommand cmd = new SqlCommand("proc_AssociateRegistration", objCon.Con);
            ////cmd.CommandType = CommandType.StoredProcedure;
            ////objCon.Con.Open();
            ////try
            ////{
            ////    cmd.Parameters.AddWithValue("@FullName", objAssociateRegistration.FullName);
            ////    cmd.Parameters.AddWithValue("@LastName", objAssociateRegistration.LastName);
            ////    cmd.Parameters.AddWithValue("@EmailId", objAssociateRegistration.EmailID);
            ////    cmd.Parameters.AddWithValue("@Password", objAssociateRegistration.Password);
            ////    cmd.Parameters.AddWithValue("@MobileNo", objAssociateRegistration.MobileNo);
            ////    cmd.Parameters.AddWithValue("@ZipCode", objAssociateRegistration.ZipCode);
            ////    cmd.Parameters.AddWithValue("@Photo", "0.png");
            ////    cmd.Parameters.AddWithValue("@LicenseState", objAssociateRegistration.LicenseState);
            ////    cmd.Parameters.AddWithValue("@LicenseId", objAssociateRegistration.LicenseID);
            ////    //cmd.Parameters.AddWithValue("@ReferralID", objAssociateRegistration.ReferralID);
            ////    //cmd.Parameters.AddWithValue("@CouponCode", objAssociateRegistration.CouponCode);
            ////    //string ActivationCode = System.Guid.NewGuid().ToString().Substring(0, 7);
            ////    //cmd.Parameters.AddWithValue("@ActivateCode", ActivationCode);
            ////    // cmd.Parameters.AddWithValue("@Discount", objAssociateRegistration.Discount);
            ////    cmd.Parameters.AddWithValue("@ForMonths", 1);
            ////    cmd.Parameters.AddWithValue("@Passphrase", WcrCryptography.SqlPassphrase);
            ////    cmd.Parameters.AddWithValue("@Action", "Add");
            ////    int a = Convert.ToInt16(cmd.ExecuteScalar());
            ////    objCon.Con.Close();
            ////    if (a > 0)
            ////    {
            ////        return a.ToString();
            ////    }
            ////    else
            ////    { return ClsCommon.InactiveValue.ToString(); }
            //}
            //catch (Exception showError)
            //{
            //    throw showError;
            //}
            //finally
            //{
            //    cmd.Dispose();
            //    objCon.Con.Close();
            //    objCon.Con.Dispose();
            //}
            #endregion
        }
        public string InsertCardData(PropAssociateRegistration objAssociateRegistration)
        {
            WcrCryptography cardEncrypt = new WcrCryptography();
            SqlCommand cmd = new SqlCommand("proc_NewUserCardDataLoad", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            objCon.Con.Open();
            try
            {
                cmd.Parameters.AddWithValue("@AssociateID", objAssociateRegistration.AssociateID);
                cmd.Parameters.AddWithValue("@CardNumber", cardEncrypt.WcrEncryptCardNumber(objAssociateRegistration.CardNumber));
                cmd.Parameters.AddWithValue("@FirstName", cardEncrypt.WcrEncrypt(objAssociateRegistration.Cardholder_FirstName));
                cmd.Parameters.AddWithValue("@LastName", cardEncrypt.WcrEncrypt(objAssociateRegistration.Cardholder_LastName));
                cmd.Parameters.AddWithValue("@Address", cardEncrypt.WcrEncrypt(objAssociateRegistration.Cardholder_Address));
                cmd.Parameters.AddWithValue("@Country", cardEncrypt.WcrEncrypt(objAssociateRegistration.Cardholder_Country));
                cmd.Parameters.AddWithValue("@State", cardEncrypt.WcrEncrypt(objAssociateRegistration.Cardholder_State));
                cmd.Parameters.AddWithValue("@City", cardEncrypt.WcrEncrypt(objAssociateRegistration.Cardholder_City));
                cmd.Parameters.AddWithValue("@Zip", cardEncrypt.WcrEncrypt(objAssociateRegistration.Cardholder_Zip));
                cmd.Parameters.AddWithValue("@CVV", cardEncrypt.WcrEncrypt(objAssociateRegistration.CVV));
                cmd.Parameters.AddWithValue("@ExpMonth", cardEncrypt.WcrEncrypt(objAssociateRegistration.ExpMonth));
                cmd.Parameters.AddWithValue("@ExpYear", cardEncrypt.WcrEncrypt(objAssociateRegistration.ExpYear));
                cmd.Parameters.AddWithValue("@CardType", cardEncrypt.WcrEncrypt(objAssociateRegistration.CardType));
                //SqlParameter sqlParam = new SqlParameter("@oId", DbType.Int16);
                //sqlParam.Direction = ParameterDirection.Output;
                //cmd.Parameters.Add(sqlParam);
                int a = Convert.ToInt16(cmd.ExecuteScalar());
                objCon.Con.Close();
                if (a > 0)
                {
                    return ClsCommon.InactiveValue.ToString();
                }
                else
                {
                    return a.ToString();
                }
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
        public string UpdateCardData(PropAssociateRegistration objAssociateRegistration, int cardID)
        {
            WcrCryptography cardEncrypt = new WcrCryptography();
            SqlCommand cmd = new SqlCommand("proc_UpdateCardInfo", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            objCon.Con.Open();
            try
            {
                cmd.Parameters.AddWithValue("@CardDataId", cardID);
                cmd.Parameters.AddWithValue("@associateID", objAssociateRegistration.AssociateID);
                cmd.Parameters.AddWithValue("@CardNumber", cardEncrypt.WcrEncryptCardNumber(objAssociateRegistration.CardNumber));
                cmd.Parameters.AddWithValue("@CardNumberNew", cardEncrypt.WcrEncryptCardNumber(objAssociateRegistration.CardNumber));
                cmd.Parameters.AddWithValue("@Cardholder_FirstName", cardEncrypt.WcrEncrypt(objAssociateRegistration.Cardholder_FirstName));
                cmd.Parameters.AddWithValue("@Cardholder_LastName", cardEncrypt.WcrEncrypt(objAssociateRegistration.Cardholder_LastName));
                cmd.Parameters.AddWithValue("@Cardholder_Address", cardEncrypt.WcrEncrypt(objAssociateRegistration.Cardholder_Address));
                cmd.Parameters.AddWithValue("@Cardholder_Country", cardEncrypt.WcrEncrypt(objAssociateRegistration.Cardholder_Country));
                cmd.Parameters.AddWithValue("@Cardholder_State", cardEncrypt.WcrEncrypt(objAssociateRegistration.Cardholder_State));
                cmd.Parameters.AddWithValue("@Cardholder_City", cardEncrypt.WcrEncrypt(objAssociateRegistration.Cardholder_City));
                cmd.Parameters.AddWithValue("@Cardholder_Zip", cardEncrypt.WcrEncrypt(objAssociateRegistration.Cardholder_Zip));
                cmd.Parameters.AddWithValue("@CVV", cardEncrypt.WcrEncrypt(objAssociateRegistration.CVV));
                cmd.Parameters.AddWithValue("@ExpMonth", cardEncrypt.WcrEncrypt(objAssociateRegistration.ExpMonth));
                cmd.Parameters.AddWithValue("@ExpYear", cardEncrypt.WcrEncrypt(objAssociateRegistration.ExpYear));
                cmd.Parameters.AddWithValue("@CardType", cardEncrypt.WcrEncrypt(objAssociateRegistration.CardType));
                int a = Convert.ToInt16(cmd.ExecuteScalar());
                objCon.Con.Close();
                if (a > 0)
                {
                    return ClsCommon.InactiveValue.ToString();
                }
                else
                {
                    return a.ToString();
                }
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
        //public string LoadPaymentHistoryItem(CardPaymentObj objAssociateRegistration, int AssociateID, string description, int CardDataId)
        //{
        //    SqlCommand cmd = new SqlCommand("proc_LoadPaymentHistoryItem", objCon.Con);
        //    cmd.CommandType = CommandType.StoredProcedure;
        //    objCon.Con.Open();
        //    try
        //    {    
        //        cmd.Parameters.AddWithValue("@PaymentID", objAssociateRegistration.PaymentID);
        //        cmd.Parameters.AddWithValue("@PaymentAmt", objAssociateRegistration.Total);
        //        cmd.Parameters.AddWithValue("@PaymentDate", System.DateTime.Now.ToString());
        //        cmd.Parameters.AddWithValue("@PaymentDesc", description);
        //        cmd.Parameters.AddWithValue("@CardDataId", CardDataId);
        //        cmd.Parameters.AddWithValue("@AssociateID", AssociateID);
        //        cmd.Parameters.AddWithValue("@CardNumber", objAssociateRegistration.CardNumber);
        //        int a = Convert.ToInt16(cmd.ExecuteScalar());
        //        objCon.Con.Close();
        //        if (a > 0)
        //        {
        //            return a.ToString();
        //        }
        //        else
        //        { return ClsCommon.InactiveValue.ToString(); }
        //    }
        //    catch (Exception showError)
        //    {
        //        throw showError;
        //    }
        //    finally
        //    {
        //        cmd.Dispose();
        //        objCon.Con.Close();
        //        objCon.Con.Dispose();
        //    }
        //}
        /// <summary>
        /// This Method will get associate detail on the basis of AdvertismentID
        /// </summary>
        /// <param name="AdvertismentID"></param>
        /// <returns></returns>
        public string GetAssociateDetail(int AdvertismentID, string userName)
        {
            WcrCryptography crypto = new WcrCryptography();
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);

            using (WcrHttpClient client = new WcrHttpClient(userName))
            {
                resp = client.PostAsJsonAsync("api/AssociateTransactions/GetAssociateDetail", AdvertismentID).Result;
                // DataSet ds = new DataSet();

                GetAssociateDetail_ReturnDataModel returnModel = JsonConvert.DeserializeObject<GetAssociateDetail_ReturnDataModel>(resp.Content.ReadAsStringAsync().Result);
                returnModel.Email = crypto.DecryptUserName(returnModel.Email);
                returnModel.FullName = crypto.WcrSimpleDecrypt(returnModel.FullName);
                returnModel.MobileNo = crypto.WcrSimpleDecrypt(returnModel.MobileNo);

                SqlDataAdapter adpt = new SqlDataAdapter();
                DataSet ds = new DataSet();
                DataTable dt = new DataTable();
                DataRow dr = dt.NewRow();
                dr["Email"] = returnModel.Email;
                dr["FullName"] = returnModel.FullName;
                dr["MobileNo"] = returnModel.MobileNo;
                dr["AssociateId"] = returnModel.AssociateId;
                ds.Tables.Add(dt);
                adpt.Fill(ds, "ViewAssociateDetail");
                return ds.GetXml();

            }
            //SqlCommand cmd = new SqlCommand("Usp_GetassociateDetail", objCon.Con);
            //cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.AddWithValue("@advertismentID", AdvertismentID);
            //SqlDataAdapter adpt = new SqlDataAdapter();
            //DataSet ds = new DataSet();
            //if (objCon.Con.State == ConnectionState.Open)
            //{ }
            //else
            //{
            //    objCon.Con.Open();
            //}
            //cmd.Connection = objCon.Con;
            //adpt.SelectCommand = cmd;
            //adpt.Fill(ds, "ViewAssociateDetail");
            //objCon.Con.Close();
            //return ds.GetXml();

        }
        /// <summary>
        /// This Method will get associate detail on the basis of associateID
        /// </summary>
        /// <param name="AdvertismentID"></param>
        /// <returns></returns>
        public string GetAssociateBasicDetail(int associateID, string userName)
        {

            WcrCryptography crypto = new WcrCryptography();
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(userName))
            {
                //resp = client.GetAsync($"api/AssociateTransactions/AssociateRegistrationView?inAssociateId={associateID}").Result;
                resp = client.GetAsync(string.Format("api/AssociateTransactions/AssociateRegistrationView?inAssociateId={0}", associateID)).Result;
                AssociateRegistrationView_ReturnDataModel returnModel = JsonConvert.DeserializeObject<AssociateRegistrationView_ReturnDataModel>(resp.Content.ReadAsStringAsync().Result);

                returnModel.Email = crypto.DecryptUserName(returnModel.Email);
                returnModel.FullName = crypto.WcrSimpleDecrypt(returnModel.FullName);
                returnModel.LastName = crypto.WcrSimpleDecrypt(returnModel.LastName);
                returnModel.LicenseId = crypto.WcrSimpleDecrypt(returnModel.LicenseId);
                returnModel.LicenseState = crypto.WcrSimpleDecrypt(returnModel.LicenseState);
                returnModel.MobileNo = crypto.WcrSimpleDecrypt(returnModel.MobileNo);
                returnModel.Password = crypto.DecryptPassword(returnModel.Password);
                returnModel.Photo = returnModel.Photo;
                returnModel.UserName = crypto.WcrSimpleDecrypt(returnModel.UserName);
                returnModel.ZipCode = crypto.WcrSimpleDecrypt(returnModel.ZipCode);
                DataSet ds = new DataSet("dataSet");
                DataTable table = ds.Tables.Add("ViewAssociateBasicDetail");
                table.Columns.Add("AssociateId", typeof(int));
                table.Columns.Add("Email", typeof(string));
                table.Columns.Add("FullName", typeof(string));
                table.Columns.Add("LastName", typeof(string));
                table.Columns.Add("LicenseId", typeof(string));
                table.Columns.Add("LicenseState", typeof(string));
                table.Columns.Add("MobileNo", typeof(string));
                table.Columns.Add("Password", typeof(string));
                table.Columns.Add("Photo", typeof(string));
                table.Columns.Add("UserName", typeof(string));
                table.Columns.Add("ZipCode", typeof(string));
                DataRow dr = table.NewRow();
                dr["AssociateId"] = associateID;
                dr["Email"] = returnModel.Email;
                dr["FullName"] = returnModel.FullName;
                dr["LastName"] = returnModel.LastName;
                dr["LicenseId"] = returnModel.LicenseId;
                dr["LicenseState"] = returnModel.LicenseState;
                dr["MobileNo"] = returnModel.MobileNo;
                dr["Password"] = returnModel.Password;
                dr["Photo"] = returnModel.Photo;
                dr["UserName"] = returnModel.UserName;
                dr["ZipCode"] = returnModel.ZipCode;
                table.Rows.Add(dr);
                return ds.GetXml();




                //ds.Tables.Add(dt);
                //adpt.Fill(ds, "ViewAssociateBasicDetail");
                //return ds.GetXml();

                //DataSet ds = new DataSet();
                //SqlDataAdapter adpt = new SqlDataAdapter();
                //ds = JsonConvert.DeserializeObject<DataSet>(resp.Content.ReadAsStringAsync().Result);
                //adpt.Fill(ds, "ViewAssociateBasicDetail");
                //return ds.GetXml();

            }

            //SqlCommand cmd = new SqlCommand("proc_AssociateRegistration", objCon.Con);
            //cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.AddWithValue("@associateID", associateID);
            //cmd.Parameters.AddWithValue("@action", "View");
            //cmd.Parameters.AddWithValue("@Passphrase", WcrCryptography.SqlPassphrase);
            //SqlDataAdapter adpt = new SqlDataAdapter();
            //DataSet ds = new DataSet();
            //if (objCon.Con.State == ConnectionState.Open)
            //{ }
            //else
            //{
            //    objCon.Con.Open();
            //}
            //cmd.Connection = objCon.Con;
            //adpt.SelectCommand = cmd;
            //adpt.Fill(ds, "ViewAssociateBasicDetail");
            //objCon.Con.Close();
            //return ds.GetXml();

        }
        //public string GetAssociateBasicDetailnew(int associateID)
        //{
        //    WcrCryptography crypt = new WcrCryptography();
        //    SqlCommand cmd = new SqlCommand("proc_AssociateRegistration", objCon.Con);
        //    cmd.CommandType = CommandType.StoredProcedure;
        //    cmd.Parameters.AddWithValue("@associateID", associateID);
        //    cmd.Parameters.AddWithValue("@action", "View");
        //    cmd.Parameters.AddWithValue("@Passphrase", WcrCryptography.SqlPassphrase);
        //    if (objCon.Con.State == ConnectionState.Open)
        //    { }
        //    else
        //    {
        //        objCon.Con.Open();
        //    }
        //    SqlDataReader dr = cmd.ExecuteReader();
        //    DataTable dt = new DataTable();
        //    dt.Load(dr);
        //    objCon.Con.Close();
        //    DataTable dt1 = new DataTable();
        //    for (int i = 0; i <= dt.Rows.Count; i++)
        //    {
        //        DataRow drr = dt1.NewRow();

        //        drr["Email"] = crypt.DecryptUserName(dt.Rows[i]["Email"].ToString());
        //        drr["Pass"] = crypt.DecryptPassword(dt.Rows[i]["Pass"].ToString());
        //        drr["AssociateId"] = dt.Rows[i]["AssociateId"].ToString();
        //        drr["FullName"] = dt.Rows[i]["FullName"].ToString();
        //        drr["LastName"] = dt.Rows[i]["LastName"].ToString();
        //        drr["MobileNo"] = dt.Rows[i]["MobileNo"].ToString();
        //        drr["ZipCode"] = dt.Rows[i]["ZipCode"].ToString();
        //        drr["UserName"] = dt.Rows[i]["UserName"].ToString();
        //        drr["LicenseState"] = dt.Rows[i]["LicenseState"].ToString();
        //        drr["LicenseId"] = dt.Rows[i]["LicenseId"].ToString();
        //        dt1.Rows.Add(drr);
        //    }            
        //    SqlDataAdapter adpt = new SqlDataAdapter();
        //    DataSet ds = new DataSet();
        //    ds.Tables.Add(dt);
        //    adpt.Fill(ds, "ViewAssociateBasicDetail");
        //    return ds.GetXml();
        //}
        public string CountTotalZipCodePurchased(int associateID)
        {
            SqlCommand cmd = new SqlCommand("proc_AllAssociateCategories", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@associateID", associateID); ;
            cmd.Parameters.AddWithValue("@action", "CountPurchasedZip");
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
            adpt.Fill(ds, "TotalZipCode");
            objCon.Con.Close();
            return ds.GetXml();

        }
        public string CountTotalAdvts(int associateID, int jobtype)
        {
            SqlCommand cmd = new SqlCommand("proc_AllAssociateCategories", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@associateID", associateID);
            cmd.Parameters.AddWithValue("@jobType", jobtype);
            cmd.Parameters.AddWithValue("@action", "CountAdvts");
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
            adpt.Fill(ds, "TotalAds");
            objCon.Con.Close();
            return ds.GetXml();

        }
        public string CountTotalAllAdvts(int associateID)
        {
            SqlCommand cmd = new SqlCommand("proc_AllAssociateCategories", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@associateID", associateID);
            cmd.Parameters.AddWithValue("@action", "CountAllAdvts");
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
            adpt.Fill(ds, "TotalAllAds");
            objCon.Con.Close();
            return ds.GetXml();

        }
        public DataTable retcardData(int associateID, string inUserName)
        {
            DllPurchaseCategory hh = new DllPurchaseCategory();
            // hh.RetrieveCardByAssociateID(associateID).Wait();
            int x = hh.RetrieveCardByAssociateID(associateID, inUserName);
            if (x == 0)
            {
                SqlCommand cmd = new SqlCommand("proc_RetrieveCardDataByAssociateID", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@AssociateId", associateID);
                if (objCon.Con.State == ConnectionState.Open)
                { }
                else
                {
                    objCon.Con.Open();
                }
                SqlDataReader dr = cmd.ExecuteReader();
                DataTable dt = new DataTable();
                dt.Load(dr);
                objCon.Con.Close();
                return dt;
            }
            else
            {
                return null;
            }
        }
        public string retcardData1(int associateID, string inUserName)
        {
            DllPurchaseCategory hh = new DllPurchaseCategory();
            int x = hh.RetrieveCardByAssociateID(associateID, inUserName);
            if (x == 0)
            {
                SqlCommand cmd = new SqlCommand("proc_RetrieveCardDataByAssociateID", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@AssociateId", associateID);
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
                adpt.Fill(ds, "GtCardDetail");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return null;
            }

        }
        public string UpdateAssociateProfile(PropAssociateRegistration objAssociateRegistration, string userName)
        {
            if (userName != null && userName != "")
            {
                WcrCryptography crypto = new WcrCryptography();
                AssociateRegistrationParameters sqlParams = new AssociateRegistrationParameters();
                sqlParams.FullName = crypto.WcrSimpleEncrypt(objAssociateRegistration.FullName);
                sqlParams.LastName = crypto.WcrSimpleEncrypt(objAssociateRegistration.LastName);
                sqlParams.EmailId = crypto.EncryptUserName(objAssociateRegistration.EmailID);
                sqlParams.Password = crypto.EncryptPassword(objAssociateRegistration.Password);
                sqlParams.MobileNo = crypto.WcrSimpleEncrypt(objAssociateRegistration.MobileNo);
                sqlParams.ZipCode = crypto.WcrSimpleEncrypt(objAssociateRegistration.ZipCode);
                sqlParams.LicenseState = crypto.WcrSimpleEncrypt(objAssociateRegistration.LicenseState);
                sqlParams.LicenseId = crypto.WcrSimpleEncrypt(objAssociateRegistration.LicenseID);
                sqlParams.AssociateId = Convert.ToInt32(userName);

                string currentEmailID = GetEmailIdByAssociateId(Convert.ToInt32(userName));

                if (!currentEmailID.Equals(objAssociateRegistration.EmailID))
                {
                    string strReturn = this.RecordExistsOrNotForAssociate(new PropAssociateRegistration() { EmailID = objAssociateRegistration.EmailID });
                    if (!ClsCommon.InactiveValue.ToString().Equals(strReturn))
                    {
                        return "InValid Email ID";
                    }

                    strReturn = this.RecordExistsOrNotForConsumer(new PropAssociateRegistration() { EmailID = objAssociateRegistration.EmailID });
                    if (!ClsCommon.InactiveValue.ToString().Equals(strReturn))
                    {
                        return "InValid Email ID";
                    }
                }

                HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
                using (WcrHttpClient client = new WcrHttpClient(currentEmailID))
                {
                    resp = client.PostAsJsonAsync("api/AssociateTransactions/AssociateRegistrationEditRcd", sqlParams).Result;
                    int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                    if (Id > 0)
                    {
                        return Id.ToString();
                    }
                    else
                    {
                        return ClsCommon.InactiveValue.ToString();
                    }
                }
            }
            else
            {
                return "Not Valid";
            }
        }
        public string UpdateAssociatePic(PropAssociateRegistration objAssociateRegistration, string associateID, string userName)
        {
            if (userName != null && userName != "")
            {
                WcrCryptography crypto = new WcrCryptography();
                AssociateRegistrationParameters sqlParams = new AssociateRegistrationParameters();
                sqlParams.Photo = objAssociateRegistration.Photo;
                sqlParams.AssociateId = Convert.ToInt32(associateID);
                HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
                using (WcrHttpClient client = new WcrHttpClient(userName))
                {
                    resp = client.PostAsJsonAsync("api/AssociateTransactions/AssociateRegistrationEditPic", sqlParams).Result;
                    int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                    if (Id > 0)
                    {
                        return Id.ToString();
                    }
                    else
                    { return ClsCommon.InactiveValue.ToString(); }

                }
            }
            else
            {

                return "Not Valid";
            }
        }
        public string RecordExistsOrNot(PropAssociateRegistration objAssociateRegistration)
        {
            WcrCryptography crypto = new WcrCryptography();
            AssociateRegistrationParameters sqlParams = new AssociateRegistrationParameters();
            sqlParams.EmailId = crypto.EncryptUserName(objAssociateRegistration.EmailID);
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            //using (WcrHttpClient client = new WcrHttpClient(objAssociateRegistration.EmailID))  //using (WcrHttpClient client = new WcrHttpClient(objAssociateRegistration.EmailID))
            using (WcrHttpClient client = new WcrHttpClient(WcrVault.Gateway.getwcrusername, WcrVault.Gateway.getwcrpassword))
            {
                resp = client.PostAsJsonAsync("api/AssociateTransactions/AssociateRegistrationRecordExists", sqlParams).Result;

                int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                if (Id > 0)
                {
                    return Id.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }

            }
            //SqlCommand cmd = new SqlCommand("proc_AssociateRegistration", objCon.Con);
            //cmd.CommandType = CommandType.StoredProcedure;
            //objCon.Con.Open();
            //try
            //{
            //    cmd.Parameters.AddWithValue("@EmailID", objAssociateRegistration.EmailID);
            //    cmd.Parameters.AddWithValue("@Passphrase", WcrCryptography.SqlPassphrase);
            //    cmd.Parameters.AddWithValue("@Action", "RecordExists");
            //    int a = Convert.ToInt16(cmd.ExecuteScalar());
            //    objCon.Con.Close();
            //    if (a > 0)
            //    {
            //        return a.ToString();
            //    }
            //    else
            //    { return ClsCommon.InactiveValue.ToString(); }
            //}
            //catch (Exception showError)
            //{
            //    throw showError;
            //}
            //finally
            //{
            //    cmd.Dispose();
            //    objCon.Con.Close();
            //    objCon.Con.Dispose();
            //}
        }
        public string RecordExistsOrNotForAssociate(PropAssociateRegistration objAssociateRegistration)
        {
            WcrCryptography crypto = new WcrCryptography();
            AssociateAccountExistsParameters sqlParams = new AssociateAccountExistsParameters();
            //sqlParams.EmailId = crypto.EncryptUserName(objAssociateRegistration.EmailID);
            sqlParams.EmailId = crypto.WcrSimpleEncrypt(objAssociateRegistration.EmailID);
            sqlParams.Action = "associate";
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(WcrVault.Gateway.getwcrusername, WcrVault.Gateway.getwcrpassword))
            {
                resp = client.PostAsJsonAsync("api/AccountCreation/AssociateAccountExists", sqlParams).Result;

                if (resp.IsSuccessStatusCode != true)
                {
                    return ClsCommon.InactiveValue.ToString();
                }

                WcrClassLibrary.DataObjects.UserAccountStatus returnModel = JsonConvert.DeserializeObject<WcrClassLibrary.DataObjects.UserAccountStatus>(resp.Content.ReadAsStringAsync().Result);
                if (returnModel == null)
                {
                    return ClsCommon.InactiveValue.ToString();
                }
                else
                {
                    if (returnModel.AssociateID < 1)
                    {
                        return ClsCommon.InactiveValue.ToString();
                    }
                    else
                    {
                        return returnModel.AssociateID.ToString();
                    }
                }
            }

        }
        public string RecordExistsOrNotForConsumer(PropAssociateRegistration objAssociateRegistration)
        {
            WcrCryptography crypto = new WcrCryptography();
            AssociateAccountExistsParameters sqlParams = new AssociateAccountExistsParameters();
            //sqlParams.EmailId = crypto.EncryptUserName(objAssociateRegistration.EmailID);
            sqlParams.EmailId = crypto.WcrSimpleEncrypt(objAssociateRegistration.EmailID);
            sqlParams.Action = "consumer";
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(WcrVault.Gateway.getwcrusername, WcrVault.Gateway.getwcrpassword))
            {
                resp = client.PostAsJsonAsync("api/AccountCreation/ConsumerAccountExists", sqlParams).Result;
                if (resp.IsSuccessStatusCode != true)
                {
                    return ClsCommon.InactiveValue.ToString();
                }

                WcrClassLibrary.DataObjects.UserAccountStatus returnModel = JsonConvert.DeserializeObject<WcrClassLibrary.DataObjects.UserAccountStatus>(resp.Content.ReadAsStringAsync().Result);
                if (returnModel == null)
                {
                    return ClsCommon.InactiveValue.ToString();
                }
                else
                {
                    if (returnModel.ConsumerID < 1)
                    {
                        return ClsCommon.InactiveValue.ToString();
                    }
                    else
                    {
                        return returnModel.ConsumerID.ToString();
                    }
                }
            }

        }

        #region Private functions
        public string GetEmailIdByAssociateId(int inAssociateId)
        {
            string oStr = string.Empty;

            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(WcrVault.Gateway.getwcrusername, WcrVault.Gateway.getwcrpassword))
            {
                string endpoint = "api/AccountCreation/GetAssociateEmailById?inAssociateId=" + inAssociateId.ToString();
                resp = client.GetAsync(endpoint).Result;
                oStr = JsonConvert.DeserializeObject<string>(resp.Content.ReadAsStringAsync().Result);
            }
            WcrCryptography crypt = new WcrCryptography();
            oStr = crypt.WcrSimpleDecrypt(oStr);

            return oStr;
        }
        #endregion

    }
}
