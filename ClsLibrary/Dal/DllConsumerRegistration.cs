using System;
using ClsLibrary.PropertyLayer;
using System.Data;
using System.Data.SqlClient;
using ClsLibrary.Bal;
using WcrClassLibrary;
using System.Net.Http;
using WcrClassLibrary.DataObjects.ConsumerTransactions;
using Newtonsoft.Json;
namespace ClsLibrary.Dal
{
    public class DllConsumerRegistration
    {
        readonly ConnectionClass objCon = new ConnectionClass();

        /// <summary>
        /// This Method is used to Post data into tbl_sale table
        /// </summary>
        /// <param name="objAssociateRegistration"></param>
        /// <returns>1 for success and -1 for fail</returns>

        public string InsertData(PropConsumerRegistration objConsumerRegistration)
        {
            WcrCryptography crypto = new WcrCryptography();
            ConsumersParameters sqlParams = new ConsumersParameters();
            sqlParams.Name = crypto.WcrSimpleEncrypt(objConsumerRegistration.Name);
            sqlParams.EmailId = crypto.EncryptUserName(objConsumerRegistration.EmailID.ToLower());
            sqlParams.Password = crypto.EncryptPassword(objConsumerRegistration.Password);
            sqlParams.Address = crypto.WcrSimpleEncrypt(objConsumerRegistration.Address);
            sqlParams.ZipCode = crypto.WcrSimpleEncrypt(objConsumerRegistration.ZipCode);
            sqlParams.Mob = crypto.WcrSimpleEncrypt(objConsumerRegistration.MobileNo);
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(WcrVault.Gateway.getwcrusername, WcrVault.Gateway.getwcrpassword))
            {
                resp = client.PostAsJsonAsync("api/AccountCreation/ConsumersAdd", sqlParams).Result;
                int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                if (Id > 0)
                {
                    return Id.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }

            }
            #region
            //SqlCommand cmd = new SqlCommand("proc_Consumers", objCon.Con);
            //cmd.CommandType = CommandType.StoredProcedure;
            //objCon.Con.Open();           
            //cmd.Parameters.AddWithValue("@Name", objConsumerRegistration.Name);           
            //cmd.Parameters.AddWithValue("@EmailID", objConsumerRegistration.EmailID);
            //cmd.Parameters.AddWithValue("@Password", objConsumerRegistration.Password);
            //cmd.Parameters.AddWithValue("@address", objConsumerRegistration.Address);
            //cmd.Parameters.AddWithValue("@ZipCode", objConsumerRegistration.ZipCode);           
            //cmd.Parameters.AddWithValue("@Action", "Add");
            //cmd.Parameters.AddWithValue("@Passphrase", WcrCryptography.SqlPassphrase);
            //int a = Convert.ToInt16(cmd.ExecuteScalar());
            //objCon.Con.Close();
            //if (a > 0)
            //{
            //    return a.ToString();
            //}
            //else
            //{ return ClsCommon.InactiveValue.ToString(); }
            #endregion
        }
        /// <summary>
        /// This Methos will be used to update consumer detail
        /// </summary>
        /// <param name="objConsumerRegistration"></param>
        /// <returns></returns>
        public string UpdateData(PropConsumerRegistration objConsumerRegistration)
        {
            WcrCryptography crypto = new WcrCryptography();
            ConsumersParameters sqlParams = new ConsumersParameters();
            sqlParams.Name = crypto.WcrSimpleEncrypt(objConsumerRegistration.Name);
            sqlParams.Address = crypto.WcrSimpleEncrypt(objConsumerRegistration.Address);
            sqlParams.Mob = crypto.WcrSimpleEncrypt(objConsumerRegistration.MobileNo);
            sqlParams.UserName = crypto.WcrSimpleEncrypt(objConsumerRegistration.UserName);
            sqlParams.EmailId = crypto.EncryptUserName(objConsumerRegistration.EmailID);
            sqlParams.Password = crypto.EncryptPassword(objConsumerRegistration.Password);
            sqlParams.ZipCode = crypto.WcrSimpleEncrypt(objConsumerRegistration.ZipCode);
            sqlParams.LastName = crypto.WcrSimpleEncrypt(objConsumerRegistration.LastName);
            sqlParams.Unit_Apt = crypto.WcrSimpleEncrypt(objConsumerRegistration.Unit_Apt);
            sqlParams.City = crypto.WcrSimpleEncrypt(objConsumerRegistration.City);
            sqlParams.StateId = crypto.WcrSimpleEncrypt(objConsumerRegistration.StateID);
            sqlParams.Id = Convert.ToInt32(objConsumerRegistration.ID);
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(objConsumerRegistration.EmailID))
            {
                resp = client.PostAsJsonAsync("api/ConsumerTransactions/ConsumersEditConsumer", sqlParams).Result;
                int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                if (Id > 0)
                {
                    return Id.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }

            }
            //SqlCommand cmd = new SqlCommand("proc_Consumers", objCon.Con);
            //cmd.CommandType = CommandType.StoredProcedure;
            //objCon.Con.Open();
            //cmd.Parameters.AddWithValue("@Name", objConsumerRegistration.Name);
            //cmd.Parameters.AddWithValue("@address", objConsumerRegistration.Address);
            //cmd.Parameters.AddWithValue("@mob", objConsumerRegistration.MobileNo);
            //cmd.Parameters.AddWithValue("@userName", objConsumerRegistration.UserName);
            //cmd.Parameters.AddWithValue("@password", objConsumerRegistration.Password);
            //cmd.Parameters.AddWithValue("@emailID", objConsumerRegistration.EmailID);
            //cmd.Parameters.AddWithValue("@ZipCode", objConsumerRegistration.ZipCode);
            //cmd.Parameters.AddWithValue("@lastName", objConsumerRegistration.LastName);
            //cmd.Parameters.AddWithValue("@Unit_Apt", objConsumerRegistration.Unit_Apt);
            //cmd.Parameters.AddWithValue("@city", objConsumerRegistration.City);
            //cmd.Parameters.AddWithValue("@stateID", objConsumerRegistration.StateID);
            //cmd.Parameters.AddWithValue("@id", objConsumerRegistration.ID);
            //cmd.Parameters.AddWithValue("@Action", "EditConsumer");
            //cmd.Parameters.AddWithValue("@Passphrase", WcrCryptography.SqlPassphrase);
            //int a = cmd.ExecuteNonQuery();
            //objCon.Con.Close();
            //if (a > 0)
            //{
            //    return a.ToString();
            //}
            //else
            //{ return ClsCommon.InactiveValue.ToString(); }

        }
        public string SelectConsumerDetail(int ID , string uname)
        {
            WcrCryptography crypto = new WcrCryptography();
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(uname))
            {

                resp = client.GetAsync(string.Format("api/ConsumerTransactions/consumerDetail?inConsumerId={0}", ID)).Result;
                ConsumerDetail_ReturnDataModel returnModel = JsonConvert.DeserializeObject<ConsumerDetail_ReturnDataModel>(resp.Content.ReadAsStringAsync().Result);
                if (returnModel == null)
                {
                    return null;
                }
                else
                {
                    returnModel.Name = crypto.DecryptUserName(returnModel.Name);
                    returnModel.Address = crypto.WcrSimpleDecrypt(returnModel.Address);
                    returnModel.Mob = crypto.WcrSimpleDecrypt(returnModel.Mob);
                    returnModel.UserName = crypto.WcrSimpleDecrypt(returnModel.UserName);
                    returnModel.EmailId = crypto.DecryptUserName(returnModel.EmailId);
                    returnModel.Password = crypto.DecryptPassword(returnModel.Password);
                    returnModel.ZipCode = crypto.WcrSimpleDecrypt(returnModel.ZipCode);
                    returnModel.ConsumerPhoto = returnModel.ConsumerPhoto;
                    returnModel.LastName = crypto.WcrSimpleDecrypt(returnModel.LastName);
                    returnModel.Unit_Apt = crypto.WcrSimpleDecrypt(returnModel.Unit_Apt);
                    returnModel.City = crypto.WcrSimpleDecrypt(returnModel.City);
                    returnModel.StateId = crypto.WcrSimpleDecrypt(returnModel.StateId);

                    DataSet ds = new DataSet("dataSet");
                    DataTable table = ds.Tables.Add("ConsumerDetail");
                    table.Columns.Add("Id", typeof(int));
                    table.Columns.Add("Name", typeof(string));
                    table.Columns.Add("Address", typeof(string));
                    table.Columns.Add("Mob", typeof(string));
                    table.Columns.Add("UserName", typeof(string));
                    table.Columns.Add("EmailId", typeof(string));
                    table.Columns.Add("Password", typeof(string));
                    table.Columns.Add("ZipCode", typeof(string));
                    table.Columns.Add("ConsumerPhoto", typeof(string));
                    table.Columns.Add("LastName", typeof(string));
                    table.Columns.Add("Unit_Apt", typeof(string));
                    table.Columns.Add("City", typeof(string));
                    table.Columns.Add("StateId", typeof(string));
                    DataRow dr = table.NewRow();
                    dr["Id"] = ID;
                    dr["Name"] = returnModel.Name;
                    dr["Address"] = returnModel.Address;
                    dr["Mob"] = returnModel.Mob;
                    dr["UserName"] = returnModel.UserName;
                    dr["EmailId"] = returnModel.EmailId;
                    dr["Password"] = returnModel.Password;
                    dr["ZipCode"] = returnModel.ZipCode;
                    dr["ConsumerPhoto"] = returnModel.ConsumerPhoto;
                    dr["LastName"] = returnModel.LastName;
                    dr["Unit_Apt"] = returnModel.Unit_Apt;
                    dr["City"] = returnModel.City;
                    dr["StateId"] = returnModel.StateId;
                    table.Rows.Add(dr);
                    return ds.GetXml();
                }
                ////SqlCommand cmd = new SqlCommand("proc_ConsumerDetail", objCon.Con);
                ////cmd.CommandType = CommandType.StoredProcedure;
                ////cmd.Parameters.AddWithValue("@ID", ID);
                ////cmd.Parameters.AddWithValue("@Passphrase", WcrCryptography.SqlPassphrase);
                ////SqlDataAdapter adpt = new SqlDataAdapter();
                ////DataSet ds = new DataSet();
                ////if (objCon.Con.State == ConnectionState.Open)
                ////{ }
                ////else
                ////{
                ////    objCon.Con.Open();
                ////}
                ////cmd.Connection = objCon.Con;
                ////adpt.SelectCommand = cmd;
                ////adpt.Fill(ds, "ConsumerDetail");
                ////objCon.Con.Close();
                ////return ds.GetXml();
            }
        }
        public string UpdateConsumerPhoto(PropConsumerRegistration objConsumerRegistration)
        {
            WcrCryptography crypto = new WcrCryptography();
            ConsumersParameters sqlParams = new ConsumersParameters();
            sqlParams.ConPhoto = objConsumerRegistration.Photo;
            sqlParams.Id = objConsumerRegistration.ID;
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(objConsumerRegistration.EmailID))
            {
                resp = client.PostAsJsonAsync("api/ConsumerTransactions/ConsumersUpdatePhoto", sqlParams).Result;
                int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                if (Id > 0)
                {
                    return Id.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }

            }


            //SqlCommand cmd = new SqlCommand("proc_Consumers", objCon.Con);
            //cmd.CommandType = CommandType.StoredProcedure;
            //objCon.Con.Open();
            //cmd.Parameters.AddWithValue("@ConPhoto", objConsumerRegistration.Photo);
            //cmd.Parameters.AddWithValue("@id", objConsumerRegistration.ID);
            //cmd.Parameters.AddWithValue("@Action", "UpdatePhoto");
            //int a = cmd.ExecuteNonQuery();
            //objCon.Con.Close();
            //if (a > 0)
            //{
            //    return a.ToString();
            //}
            //else
            //{ return ClsCommon.InactiveValue.ToString(); }

        }
        public string DeleteConsumer(PropConsumerRegistration objConsumerRegistration)
        {
            WcrCryptography crypto = new WcrCryptography();
            ConsumersParameters sqlParams = new ConsumersParameters();
            sqlParams.Id = objConsumerRegistration.ID;
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(objConsumerRegistration.EmailID))
            {
                resp = client.PostAsJsonAsync("api/ConsumerTransactions/ConsumersDeleteAccount", sqlParams).Result;
                int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                if (Id > 0)
                {
                    return Id.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }

            }

            //SqlCommand cmd = new SqlCommand("proc_Consumers", objCon.Con);
            //cmd.CommandType = CommandType.StoredProcedure;
            //objCon.Con.Open();
            //cmd.Parameters.AddWithValue("@id", objConsumerRegistration.ID);
            //cmd.Parameters.AddWithValue("@Action", "DeleteAccount");
            //int a = cmd.ExecuteNonQuery();
            //objCon.Con.Close();
            //if (a > 0)
            //{
            //    return a.ToString();
            //}
            //else
            //{ return ClsCommon.InactiveValue.ToString(); }

        }
        public string UpdateCompulsoryData(string Name, int ID , string uname)
        {
            WcrCryptography crypto = new WcrCryptography();
            ConsumersParameters sqlParams = new ConsumersParameters();
            sqlParams.Name = Name;
            sqlParams.Id = ID;
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(uname))
            {
                resp = client.PostAsJsonAsync("api/ConsumerTransactions/ConsumersUConsumerRcd", sqlParams).Result;
                int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                if (Id > 0)
                {
                    return Id.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }

            }
            //SqlCommand cmd = new SqlCommand("proc_Consumers", objCon.Con);
            //cmd.CommandType = CommandType.StoredProcedure;
            //objCon.Con.Open();
            //cmd.Parameters.AddWithValue("@name", Name);            
            //cmd.Parameters.AddWithValue("@id", ID);
            //cmd.Parameters.AddWithValue("@action", "uconsumerRcd");
            //int a = cmd.ExecuteNonQuery();
            //objCon.Con.Close();
            //if (a > 0)
            //{
            //    return a.ToString();
            //}
            //else
            //{ return ClsCommon.InactiveValue.ToString(); }

        }
        public string CheckConsumerMobANDEmailExists(int ID)
        {
            SqlCommand cmd = new SqlCommand("proc_Consumers", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            objCon.Con.Open();
            cmd.Parameters.AddWithValue("@id", ID);
            cmd.Parameters.AddWithValue("@action", "chkmobEmail");
            string mob = Convert.ToString(cmd.ExecuteScalar());
            objCon.Con.Close();
            if (!string.IsNullOrEmpty(mob))
            {
                return mob;
            }
            else
            { return ClsCommon.InactiveValue.ToString(); }

        }



        public string ConsumerSupport(int consumerID, string message , string uname)
        {
            int consumerId = consumerID;
            string sMsg = message;
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(uname))
            {
                resp = client.PutAsJsonAsync(string.Format("api/EmailServices/WcrConsumerSupport?inConsumerId={0}&inMessage={1}", consumerId, sMsg), string.Empty).Result;
                int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                if (Id == 0)
                {
                    return Id.ToString();
                }
                else
                {
                    return ClsCommon.InactiveValue.ToString();
                }
            }

        }


        public string AssociateSupport(int associateID, string message, string uname)
        {
            int associateId = associateID;
            string sMsg = message;
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(uname))
            {
                resp = client.PutAsJsonAsync(string.Format("api/EmailServices/WcrAssociateSupport?inAssociateId={0}&inMessage={1}", associateId, sMsg), string.Empty).Result;
                int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                if (Id == 0)
                {
                    return Id.ToString();
                }
                else
                {
                    return ClsCommon.InactiveValue.ToString();
                }
            }

        }
        
    }
}
