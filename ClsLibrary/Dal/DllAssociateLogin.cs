using System.Data.SqlClient;
using ClsLibrary.PropertyLayer;
using System.Data;
using WcrClassLibrary;
using System.Net.Http;
using WcrClassLibrary.DataObjects.AssociateTransactions;
using Newtonsoft.Json;
using WcrClassLibrary.DataObjects.ConsumerTransactions;
using WcrClassLibrary.DataObjects;
namespace ClsLibrary.Dal
{
    public class DllAssociateLogin
    {
        readonly ConnectionClass objCon = new ConnectionClass();
        #region Select
        /// <summary>
        /// This Method is used to check authentication of associate
        /// </summary>
        /// <param name="objadmin">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string SelectAssociate(PropAssociateLogin objassociate)
        {
            WcrCryptography crypto = new WcrCryptography();
            AssociateLogInParameters sqlParams = new AssociateLogInParameters();
            sqlParams.Mob = crypto.EncryptUserName(objassociate.Mob.ToLower());
            sqlParams.Password = crypto.EncryptPassword(objassociate.Password);
            string ddd = WcrCryptography.SqlPassphrase;
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(objassociate.Mob))
            {
                resp = client.PostAsJsonAsync("api/AssociateTransactions/AssociateLogin", sqlParams).Result;
                AssociateLogin_ReturnDataModel returnModel = JsonConvert.DeserializeObject<AssociateLogin_ReturnDataModel>(resp.Content.ReadAsStringAsync().Result);
                if (returnModel == null)
                {
                    return "0";

                }
                else
                {
                    DataSet ds = new DataSet("dataSet");
                    DataTable table = ds.Tables.Add("associateLogin");
                    table.Columns.Add("AssociateId", typeof(int));
                    table.Columns.Add("Status", typeof(int));
                    table.Columns.Add("Mobile", typeof(string));
                    DataRow dr = table.NewRow();
                    dr["AssociateId"] = returnModel.AssociateId;
                    dr["Status"] = returnModel.Status;
                    dr["Mobile"] = returnModel.MobileNo;
                    table.Rows.Add(dr);
                    return ds.GetXml();
                    //if (Id > 0)
                    //{

                    //    return Id.ToString();
                    //}
                    //else
                    //{ return "-1"; }

                }
            }
            //try
            //{
            //    WcrCryptography cardEncrypt = new WcrCryptography();
            //    SqlCommand cmd = new SqlCommand("proc_AssociateLogin", objCon.Con);
            //    cmd.CommandType = CommandType.StoredProcedure;
            //    cmd.Parameters.AddWithValue("@Mob", objassociate.Mob);
            //    cmd.Parameters.AddWithValue("@Password", objassociate.Password);
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
            //    if (dt.Rows.Count > 0)
            //    {
            //        return dt.Rows[0]["AssociateID"].ToString();
            //    }
            //    else
            //    {
            //        return "-1";
            //    }

            //}
            //catch { return null; }
        }

        #endregion
        #region AssociateExists
        public string AssociateAccountExists(string Email)
        {
            string _Email = Email.ToLower();
            WcrCryptography crypto = new WcrCryptography();
            AssociateAccountExistsParameters sqlParams = new AssociateAccountExistsParameters();
            sqlParams.EmailId = crypto.WcrSimpleEncrypt(_Email);
            sqlParams.Action = "associate";
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(WcrVault.Gateway.getwcrusername, WcrVault.Gateway.getwcrpassword))
            {
                resp = client.PostAsJsonAsync("api/AccountCreation/AssociateAccountExists", sqlParams).Result;
                UserAccountStatus returnModel = JsonConvert.DeserializeObject<UserAccountStatus>(resp.Content.ReadAsStringAsync().Result);
                if (returnModel == null)
                {
                    return "-1";
                }
                else
                {
                    DataSet ds = new DataSet("dataSet");
                    DataTable table = ds.Tables.Add("associateExists");
                    table.Columns.Add("AccountId", typeof(int));
                    table.Columns.Add("Status", typeof(int));
                    table.Columns.Add("IsEmailVerified", typeof(int));
                    DataRow dr = table.NewRow();
                    dr["AccountId"] = returnModel.AssociateID;
                    dr["Status"] = returnModel.Status;
                    dr["IsEmailVerified"] = returnModel.IsEmailVerified;

                    table.Rows.Add(dr);
                    return ds.GetXml();
                }
            }
        }
        #endregion
        #region ConsumerExists
        public string ConsumerAccountExists(string Email)
        {
            string _Email = Email.ToLower();
            WcrCryptography crypto = new WcrCryptography();
            ConsumerAccountExistsParameters sqlParams = new ConsumerAccountExistsParameters();
            sqlParams.EmailId = crypto.WcrSimpleEncrypt(_Email);
            sqlParams.Action = "consumer";
            string ddd = WcrCryptography.SqlPassphrase;
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(WcrVault.Gateway.getwcrusername, WcrVault.Gateway.getwcrpassword))
            {
                resp = client.PostAsJsonAsync("api/AccountCreation/ConsumerAccountExists", sqlParams).Result;
                UserAccountStatus returnModel = JsonConvert.DeserializeObject<UserAccountStatus>(resp.Content.ReadAsStringAsync().Result);
                if (returnModel == null)
                {
                    return "-1";

                }
                else
                {
                    DataSet ds = new DataSet("dataSet");
                    DataTable table = ds.Tables.Add("consumerExists");
                    table.Columns.Add("AccountId", typeof(int));
                    table.Columns.Add("Status", typeof(int));
                    table.Columns.Add("IsEmailVerified", typeof(int));
                    DataRow dr = table.NewRow();
                    dr["AccountId"] = returnModel.ConsumerID;
                    dr["Status"] = returnModel.Status;
                    dr["IsEmailVerified"] = returnModel.IsEmailVerified;
                    table.Rows.Add(dr);
                    return ds.GetXml();
                }
            }
        }

        #endregion
        public string GetActivationCode(string username)
        {
            try
            {
                WcrCryptography cardEncrypt = new WcrCryptography();
                SqlCommand cmd = new SqlCommand("proc_GetVerificationCode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", username);
                cmd.Parameters.AddWithValue("@Passphrase", WcrCryptography.SqlPassphrase);
                cmd.Parameters.AddWithValue("@action", "GetVerificationCode");
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
                if (dt.Rows.Count > 0)
                {
                    return dt.Rows[0]["ActivationCode"].ToString();
                }
                else
                {
                    return "-1";
                }

            }
            catch { return null; }
        }
        #region This code is no longer in use
        //public string VerifiedAccount(string username)
        //{
        //    try
        //    {
        //        WcrCryptography cardEncrypt = new WcrCryptography();
        //        SqlCommand cmd = new SqlCommand("proc_GetVerificationCode", objCon.Con);
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.Parameters.AddWithValue("@username", username);
        //        cmd.Parameters.AddWithValue("@Passphrase", WcrCryptography.SqlPassphrase);
        //        cmd.Parameters.AddWithValue("@action", "verified");
        //        if (objCon.Con.State == ConnectionState.Open)
        //        { }
        //        else
        //        {
        //            objCon.Con.Open();
        //        }
        //        int a = cmd.ExecuteNonQuery();
        //        if (a >= 1)
        //        {
        //            return "1";
        //        }
        //        else
        //        {
        //            return "0";
        //        }

        //    }
        //    catch { return null; }
        //}

        #endregion
        public string VerifiedAccount(string username)
        {
            try
            {
                WcrCryptography cardEncrypt = new WcrCryptography();
                SqlCommand cmd = new SqlCommand("proc_GetVerificationCode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", username);
                cmd.Parameters.AddWithValue("@Passphrase", WcrCryptography.SqlPassphrase);
                cmd.Parameters.AddWithValue("@action", "verified");
                if (objCon.Con.State == ConnectionState.Open)
                { }
                else
                {
                    objCon.Con.Open();
                }
                int a = cmd.ExecuteNonQuery();
                if (a >= 1)
                {
                    WcrCryptography crypt = new WcrCryptography();
                    AssociateLogInParameters dataContent = new AssociateLogInParameters();
                    dataContent.Mob = crypt.WcrSimpleEncrypt(username);
                    HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
                    using (WcrHttpClient client = new WcrHttpClient(WcrVault.Gateway.getwcrusername, WcrVault.Gateway.getwcrpassword))
                    {
                        resp = client.PostAsJsonAsync("api/AccountCreation/AssociateActivation", dataContent).Result;
                        int rc = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                        if (rc < 0)
                        {
                            // do we handle the error?
                        }
                    }
                    return "1";
                }
                else
                {
                    return "0";
                }

            }
            catch { return null; }
        }
        public string ChkAssociateStatus(string username)
        {
            try
            {
                WcrCryptography cardEncrypt = new WcrCryptography();
                SqlCommand cmd = new SqlCommand("proc_GetVerificationCode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", username);
                cmd.Parameters.AddWithValue("@Passphrase", WcrCryptography.SqlPassphrase);
                cmd.Parameters.AddWithValue("@action", "chkVerified");
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
                if (dt.Rows.Count > 0)
                {
                    return dt.Rows[0]["status"].ToString();
                }
                else
                {
                    return "-1";
                }

            }
            catch { return null; }
        }
        #region Select
        /// <summary>
        /// This Method is used to check authentication of Consumer
        /// </summary>
        /// <param name="objadmin">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string SelectConsumer(PropConsumerRegistration objConsumer)
        {
            WcrCryptography crypto = new WcrCryptography();
            ConsumerLoginParameters sqlParams = new ConsumerLoginParameters();
            string _Email = objConsumer.MobileNo.ToLower();
            // sqlParams.Mob = crypto.EncryptUserName(objConsumer.MobileNo);
            sqlParams.Mob = crypto.EncryptUserName(_Email);
            sqlParams.Password = crypto.EncryptPassword(objConsumer.Password);
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(objConsumer.MobileNo))
            {
                resp = client.PostAsJsonAsync("api/ConsumerTransactions/ConsumerLogin", sqlParams).Result;
                ConsumerLogin_ReturnDataModel returnModel = JsonConvert.DeserializeObject<ConsumerLogin_ReturnDataModel>(resp.Content.ReadAsStringAsync().Result);
                DataSet ds = new DataSet("dataSet");
                DataTable table = ds.Tables.Add("consumerLogin");
                table.Columns.Add("Id", typeof(int));
                table.Columns.Add("Flag", typeof(int));
                DataRow dr = table.NewRow();
                dr["Id"] = returnModel.Id;
                dr["Flag"] = returnModel.Flag;
                table.Rows.Add(dr);
                return ds.GetXml();

            }

        }

        #endregion
        #region Select
        /// <summary>
        /// This Method is used to get consumer detail
        /// </summary>
        /// <param name="objadmin">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string GetConsumerDetail(int ID)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("proc_ConsumerDetail", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", ID);
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
                adpt.Fill(ds, "FullConsumerDetail");
                objCon.Con.Close();
                return ds.GetXml();

            }
            catch { return null; }
        }
        #endregion
        #region This WEP API endpoint method is used to send  associate password on Mail
        /// <summary>
        /// This Method is used to check authentication of associate
        /// </summary>
        /// <param name="objadmin">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string SendAssociatePassonEmail(PropAssociateRegistration objassociate)
        {
            WcrCryptography crypto = new WcrCryptography();
            ChangeAssociatePasswordParameters sqlParams = new ChangeAssociatePasswordParameters();
            sqlParams.Email = crypto.EncryptUserName(objassociate.EmailID);
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(objassociate.EmailID))
            {
                resp = client.PostAsJsonAsync("api/AssociateTransactions/SendPasswordResetEmail", sqlParams).Result;
                int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                if (Id >= 0)
                {
                    return Id.ToString();
                }
                else
                { return "-1"; }
            }
        }

        #endregion
        #region This WEP API endpoint method is used to send  Consumer password on Mail
        /// <summary>
        /// This Method is used to check authentication of associate
        /// </summary>
        /// <param name="objadmin">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string SendConsumerPassonEmail(PropConsumerRegistration objConsumer)
        {
            WcrCryptography crypto = new WcrCryptography();
            ChangeConsumerPasswordParameters sqlParams = new ChangeConsumerPasswordParameters();
            sqlParams.Email = crypto.EncryptUserName(objConsumer.EmailID);
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(objConsumer.EmailID))
            {
                resp = client.PostAsJsonAsync("api/ConsumerTransactions/SendPasswordResetEmail", sqlParams).Result;
                int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                if (Id >= 0)
                {
                    return Id.ToString();
                }
                else
                { return "-1"; }
            }
        }

        #endregion
        #region This WEP API endpoint method is used to reset associate password
        /// <summary>
        /// This Method is used to check authentication of associate
        /// </summary>
        /// <param name="objadmin">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string ResetAssociatePass(PropAssociateRegistration objassociate)
        {
            WcrCryptography crypto = new WcrCryptography();
            ChangeAssociatePasswordParameters sqlParams = new ChangeAssociatePasswordParameters();
            sqlParams.Email = crypto.EncryptUserName(objassociate.EmailID);
            sqlParams.Password = crypto.EncryptPassword(objassociate.Password);
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(objassociate.EmailID))
            {
                resp = client.PostAsJsonAsync("api/AssociateTransactions/ChangeAssociatePassword", sqlParams).Result;
                int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                if (Id >= 1)
                {
                    return Id.ToString();
                }
                else
                { return "-1"; }
            }
        }

        #endregion
        #region This WEP API endpoint method is used to reset consumer password
        /// <summary>        
        /// </summary>
        /// <param name="objadmin">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string ResetConsumerPass(PropConsumerRegistration objassociate)
        {
            WcrCryptography crypto = new WcrCryptography();
            ChangeConsumerPasswordParameters sqlParams = new ChangeConsumerPasswordParameters();
            sqlParams.Email = crypto.EncryptUserName(objassociate.EmailID);
            sqlParams.Password = crypto.EncryptPassword(objassociate.Password);
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(objassociate.EmailID))
            {
                resp = client.PostAsJsonAsync("api/ConsumerTransactions/ChangeAssociatePassword", sqlParams).Result;
                int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                if (Id >= 1)
                {
                    return Id.ToString();
                }
                else
                { return "-1"; }
            }
        }

        #endregion
        public string GetConsumerActivationCode(string username)
        {
            try
            {
                WcrCryptography cardEncrypt = new WcrCryptography();
                SqlCommand cmd = new SqlCommand("proc_GetConsumerVerificationCode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", username);
                cmd.Parameters.AddWithValue("@Passphrase", WcrCryptography.SqlPassphrase);
                cmd.Parameters.AddWithValue("@action", "GetVerificationCode");
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
                if (dt.Rows.Count > 0)
                {
                    return dt.Rows[0]["ActivationCode"].ToString();
                }
                else
                {
                    return "-1";
                }

            }
            catch { return null; }
        }
        public string ConsumerVerifiedAccount(string username)
        {
            try
            {
                WcrCryptography cardEncrypt = new WcrCryptography();
                SqlCommand cmd = new SqlCommand("proc_GetConsumerVerificationCode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", username);
                cmd.Parameters.AddWithValue("@Passphrase", WcrCryptography.SqlPassphrase);
                cmd.Parameters.AddWithValue("@action", "verified");
                if (objCon.Con.State == ConnectionState.Open)
                { }
                else
                {
                    objCon.Con.Open();
                }
                int a = cmd.ExecuteNonQuery();
                if (a >= 1)
                {
                    return "1";
                }
                else
                {
                    return "0";
                }

            }
            catch { return null; }
        }
        public string ChkConsumerStatus(string username)
        {
            try
            {
                WcrCryptography cardEncrypt = new WcrCryptography();
                SqlCommand cmd = new SqlCommand("proc_GetVerificationCode", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", username);
                cmd.Parameters.AddWithValue("@Passphrase", WcrCryptography.SqlPassphrase);
                cmd.Parameters.AddWithValue("@action", "chkVerified");
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
                if (dt.Rows.Count > 0)
                {
                    return dt.Rows[0]["Flag"].ToString();
                }
                else
                {
                    return "-1";
                }

            }
            catch { return null; }
        }
        public string AssociateResetPassword(PropAssociateRegistration objassociate)
        {
            WcrCryptography crypto = new WcrCryptography();
            ChangeAssociatePasswordParameters sqlParams = new ChangeAssociatePasswordParameters();
            sqlParams.Email = crypto.EncryptUserName(objassociate.EmailID);
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(objassociate.EmailID))
            {
                resp = client.PostAsJsonAsync("api/AssociateTransactions/SendPasswordResetEmail", sqlParams).Result;
                int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                if (Id >= 1)
                {
                    return Id.ToString();
                }
                else
                { return "-1"; }
            }
        }
    }
}
