using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
    public class DllPostComments
    {
        readonly ConnectionClass objCon = new ConnectionClass();
        public string InsertData(int AdvertisementID, string Comments, int ConsumerID, float rateforad)
        {
            SqlCommand cmd = new SqlCommand("proc_ConsumerComments", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            objCon.Con.Open();
            try
            {
                cmd.Parameters.AddWithValue("@advertisementID", AdvertisementID);
                cmd.Parameters.AddWithValue("@comments", Comments);
                cmd.Parameters.AddWithValue("@consumerID", ConsumerID);
                cmd.Parameters.AddWithValue("@rateForAdv", rateforad);
                cmd.Parameters.AddWithValue("@Action", "Add");
                int a = Convert.ToInt16(cmd.ExecuteNonQuery());
                objCon.Con.Close();
                if (a > 0)
                {
                    return a.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }
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


        public string GetCommentsDetail(int advertisementID)
        {
            SqlCommand cmd = new SqlCommand("proc_ConsumerComments", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@advertisementID", advertisementID);
            cmd.Parameters.AddWithValue("@Action", "Select");

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
            adpt.Fill(ds, "consumercomment");
            objCon.Con.Close();
            return ds.GetXml();

        }


        public string GetRating(int advertisementID)
        {
            SqlCommand cmd = new SqlCommand("GetRatingAverage", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@advertisementID", advertisementID);
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
            adpt.Fill(ds, "RatingComments");
            objCon.Con.Close();
            return ds.GetXml();

        }
        /// <summary>
        /// This Method Will be use to post Consumer Details when They will click on Contact button to know associate Detail
        /// </summary>
        /// <param name="AdvertisementID"></param>
        /// <param name="ConsumerID"></param>
        /// <param name="AssociateID"></param>
        /// <returns></returns>
        public string InsertConsumerInterest(int AdvertisementID, int ConsumerID, int AssociateID, int jobType, int zipcode)
        {
            SqlCommand cmd = new SqlCommand("proc_InterrestedCustomber", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            objCon.Con.Open();
            try
            {
                cmd.Parameters.AddWithValue("@AdvertisementID", AdvertisementID);
                cmd.Parameters.AddWithValue("@AssociateID", AssociateID);
                cmd.Parameters.AddWithValue("@consumerID", ConsumerID);
                cmd.Parameters.AddWithValue("@JobType", jobType);
                cmd.Parameters.AddWithValue("@Zipcode", zipcode);
                cmd.Parameters.AddWithValue("@Action", "Add");
                int a = Convert.ToInt16(cmd.ExecuteNonQuery());
                objCon.Con.Close();
                if (a > 0)
                {
                    return a.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }
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
        /// <summary>
        /// This Method will be use to count click of advertisement without knowledge of consumer, It will count numbers of click if user are registered or not
        /// </summary>
        /// <param name="AdvertisementID"></param>
        /// <param name="ConsumerID"></param>
        /// <param name="AssociateID"></param>
        /// <returns></returns>

        public string ClickPerAdvertisements(int AdvertisementID, int ConsumerID)
        {
            SqlCommand cmd = new SqlCommand("proc_AdvertisementClick", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            objCon.Con.Open();
            try
            {
                cmd.Parameters.AddWithValue("@AdvertisementID", AdvertisementID);
                cmd.Parameters.AddWithValue("@ConsumerID", ConsumerID);   
                cmd.Parameters.AddWithValue("@Action", "Add");
                int a = Convert.ToInt16(cmd.ExecuteNonQuery());
                objCon.Con.Close();
                if (a > 0)
                {
                    return a.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }
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



        public string SendConsumerDetail(int associateID, int advertisementID ,int consumerID, int jobtype, int zipcode, string username)
        {
            WcrCryptography crypto = new WcrCryptography();
            InterestNotificationObject sqlParams = new InterestNotificationObject();
            sqlParams.AssociateId = associateID;
            sqlParams.AdvertisementId = advertisementID;
            sqlParams.ConsumerId = consumerID;
            sqlParams.JobType = jobtype;
            sqlParams.ZipCode = zipcode;            
            HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            using (WcrHttpClient client = new WcrHttpClient(username))  
            {
                resp = client.PostAsJsonAsync("api/AssociateTransactions/SendInterestNotifications", sqlParams).Result;
                int Id = JsonConvert.DeserializeObject<int>(resp.Content.ReadAsStringAsync().Result);
                if (Id >= 0)
                {
                    return Id.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }

            }

            #region
            
            #endregion
        }





    }
}
