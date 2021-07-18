using System;
using ClsLibrary.PropertyLayer;
using System.Data;
using System.Data.SqlClient;
using ClsLibrary.Bal;
using System.Net;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using System.Net.Http;
using WcrClassLibrary;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ClsLibrary.Dal
{
    public class DllTopSearch
    {
        readonly ConnectionClass objCon = new ConnectionClass();
        readonly bool DebugEvironment = System.Configuration.ConfigurationManager.AppSettings["Debug"].ToString().Equals("Yes") ? true : false;

        public string SelectTopSearch(int zipCode)
        {
            SqlCommand cmd = new SqlCommand("Usp_topSearch", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@zipCode", zipCode);
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
            adpt.Fill(ds, "topSearch");
            objCon.Con.Close();
            return ds.GetXml();
        }

        /// <summary>
        /// This Function is used to get data on the basis of zipcode
        /// </summary>
        /// <param name="zipCode"></param>
        /// <returns></returns>
        public string SelectAdvanceSearch(int zipCode)
        {
            SqlCommand cmd = new SqlCommand("proc_SearchingSalesAdvts", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@zipCode", zipCode);
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
            adpt.Fill(ds, "GetCategoriesinfo");
            objCon.Con.Close();
            return ds.GetXml();
        }

        /// <summary>
        /// This Function is used to get data on the basis of Category and zipcode basis
        /// </summary>
        /// <param name="zipCode"></param>
        /// <param name="SubCategory"></param>
        /// <returns></returns>
        public string SelectAdvanceSearch1(int zipCode, int SubCategory)
        {
            SqlCommand cmd = new SqlCommand("proc_SearchingSalesAdvtsNew2", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@zipCode", zipCode);
            cmd.Parameters.AddWithValue("@subCategoryID", SubCategory);
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
            adpt.Fill(ds, "GetCategoriesinfo1");
            objCon.Con.Close();
            return ds.GetXml();
        }



        public string SelectAdvanceSearchSalesCityWise(string State, string City, int SubCategory)
        {
           // SqlCommand cmd = new SqlCommand("proc_SearchingSalesAdvtsCityWise", objCon.Con);
            SqlCommand cmd = new SqlCommand("proc_SearchingSalesAdvtsCityWise1", objCon.Con);            
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@State", State);
            cmd.Parameters.AddWithValue("@City", City);
            cmd.Parameters.AddWithValue("@subCategoryID", SubCategory);
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
            adpt.Fill(ds, "GetCategoriesinfoCity");
            objCon.Con.Close();
            return ds.GetXml();
        }

        

        /// <summary>
        /// This Function is used to get data on the basis of Category and zipcode  for services
        /// </summary>
        /// <param name="zipCode"></param>
        /// <param name="SubCategory"></param>
        /// <returns></returns>
        //public string SelectAdvanceSearchForServices(int zipCode, int Category)
        //{
        //    SqlCommand cmd = new SqlCommand("proc_SearchingServiceAdvtsNew2", objCon.Con);
        //    cmd.CommandType = CommandType.StoredProcedure;
        //    cmd.Parameters.AddWithValue("@zipCode", zipCode);
        //    cmd.Parameters.AddWithValue("@CategoryID", Category);
        //    SqlDataAdapter adpt = new SqlDataAdapter();
        //    DataSet ds = new DataSet();
        //    if (objCon.Con.State == ConnectionState.Open)
        //    { }
        //    else
        //    {
        //        objCon.Con.Open();
        //    }
        //    cmd.Connection = objCon.Con;
        //    adpt.SelectCommand = cmd;
        //    adpt.Fill(ds, "GetCategoriesinfoservices");
        //    objCon.Con.Close();
        //    return ds.GetXml();
        //}


        /// <summary>
        /// This Function is used to get data on the basis of Category and zipcode  for services
        /// </summary>
        /// <param name="zipCode"></param>
        /// <param name="SubCategory"></param>
        /// <returns></returns>
        public string SelectAdvanceSearchForServices(int zipCode, int Category)
        {
            SqlCommand cmd = new SqlCommand("proc_SearchingServiceAdvtsLatest", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@zipCode", zipCode);
            cmd.Parameters.AddWithValue("@subcategoryid", Category);
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
            adpt.Fill(ds, "GetCategoriesinfoservices");
            objCon.Con.Close();
            return ds.GetXml();
        }

        public string SelectAdvanceSearchForServicesCityWise(string State, string City, int Category)
        {
            SqlCommand cmd = new SqlCommand("proc_SearchingServicesAdvtsCityWise", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@State", State);
            cmd.Parameters.AddWithValue("@City", City);
            cmd.Parameters.AddWithValue("@subcategoryid", Category);
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
            adpt.Fill(ds, "GetsubCategoriesinfoservices");
            objCon.Con.Close();
            return ds.GetXml();
        }












        /// <summary>
        /// This Function is used to get Data of ServiceList Page
        /// </summary>
        /// <param name="zipCode"></param>
        /// <param name="Category"></param>
        /// <returns></returns>

        public string SelectServicesListData(int zipCode, int Category)
        {
            SqlCommand cmd = new SqlCommand("proc_GetServicesListRecord", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@zipCode", zipCode);
            cmd.Parameters.AddWithValue("@CategoryID", Category);
            cmd.Parameters.AddWithValue("@Passphrase", WcrCryptography.SqlPassphrase);
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
            adpt.Fill(ds, "GetServicesList");
            objCon.Con.Close();
            return ds.GetXml();
        }


        public string GetZipCodeID(string ipAddress)
        {

            string _APiKey = "4f51c53799b89021ffdfd3d4b23b91993b3cd05d9279b44d8fba183a6ceeedd4";

            string url = string.Format("http://api.ipinfodb.com/v3/ip-city/?key={0}&ip={1}&format=json", _APiKey, ipAddress);
            using (WebClient client = new WebClient())
            {
                string json = client.DownloadString(url);
                Location location = new JavaScriptSerializer().Deserialize<Location>(json);
                //List<Location> locations = new List<Location>();
                //locations.Add(location);
                return location.ZipCode;
                   
            }         
        }

        public async Task<ServiceAdvertisementObject> GetServiceAdvertisementByZipcode(int inConsumerId, int inZipCode, int inCategoryId)
        {
            ServiceAdvertisementObject returnObject;

            using (WcrHttpClient client = new WcrHttpClient(DebugEvironment, WcrVault.Gateway.getwcrusername, WcrVault.Gateway.getwcrpassword))
            {
                HttpResponseMessage resp = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
                string wcrApiEndpoint = string.Format("api/ConsumerServices/GetServiceAdvertisementByZipcode?inConsumerId={0}&inZipCode={1}&inCategoryId={2}", inConsumerId, inZipCode, inCategoryId);

                resp = await client.GetAsync(wcrApiEndpoint);

                if (resp.IsSuccessStatusCode)
                {
                    return returnObject = JsonConvert.DeserializeObject<ServiceAdvertisementObject>(resp.Content.ReadAsStringAsync().Result);
                }
                else
                {
                    throw new Exception("ERROR: DllTopSearch.cs - GetServiceAdvertisementByZipcode(...) Error");
                }
            }

            return null;
        }
    }
    public class Location
    {
        public string IPAddress { get; set; }
        public string CountryName { get; set; }
        public string CountryCode { get; set; }
        public string CityName { get; set; }
        public string RegionName { get; set; }
        public string ZipCode { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string TimeZone { get; set; }
    }
}
