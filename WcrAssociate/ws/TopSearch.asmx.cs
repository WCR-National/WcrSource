using System;
using System.Collections.Generic;
using System.Web.Services;
using ClsLibrary.Bal;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Data.SqlClient;
using System.Configuration;
using ClsLibrary.PropertyLayer.Associate.Sale;
using System.Data;
using ClsLibrary.PropertyLayer;
//using System.Net;
//using System.Collections.Generic;
//using System.Web.Script.Serialization;

namespace WcrAssociate.Associate.ws
{
    /// <summary>
    /// Summary description for TopSearch
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class TopSearch : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        public string ViewSearchingCategories(int jobtype, string zipcode, string _action)
        {
            string str = string.Empty;
            BllSearchingCategories objInnerpage = new BllSearchingCategories();
            PropCategory objProperty = new PropCategory();
            objProperty.JobTypeValue = jobtype;
            str = objInnerpage.SearchSalesCategory(objProperty, zipcode, _action);
            return str;
        }

        [WebMethod(EnableSession = true)]
        public string ViewTopRecords(int zipcode)
        {
            string str = string.Empty;
            BllTopSearch objInnerpage = new BllTopSearch();
            str = objInnerpage.RecordTopSearch(zipcode);
            return str;
        }
        [WebMethod(EnableSession = true)]
        public string ViewAdvanceSearch(int zipcode)
        {
            string str = string.Empty;
            BllTopSearch objInnerpage = new BllTopSearch();
            str = objInnerpage.AdvanceSearch(zipcode);
            return str;
        }





        [WebMethod(EnableSession = true)]
        public string ViewAdvanceSearch1(int zipcode, int SubCategory)
        {
            string str = string.Empty;
            BllTopSearch objInnerpage = new BllTopSearch();
            str = objInnerpage.AdvanceSearch1(zipcode, SubCategory);
            return str;
        }

        [WebMethod(EnableSession = true)]
        public string ViewAdvanceSearchCityStateWise(string State, string City, int SubCategory)
        {
            string str = string.Empty;
            BllTopSearch objInnerpage = new BllTopSearch();
            str = objInnerpage.AdvanceSearchCityWise(State,City, SubCategory);
            return str;
        }












        [WebMethod(EnableSession = true)]
        public string ViewAdvanceSearchServicesCityStateWise(string State, string City, int Category)
        {
            string str = string.Empty;
            BllTopSearch objInnerpage = new BllTopSearch();
            str = objInnerpage.AdvanceSearchServicesCityWise(State,City, Category);
            return str;
        }


        [WebMethod(EnableSession = true)]
        public string ViewAdvanceSearchForServices(int zipcode, int Category)
        {
            string str = string.Empty;
            BllTopSearch objInnerpage = new BllTopSearch();
            str = objInnerpage.AdvanceSearchServices(zipcode, Category);
            return str;
        }

        [WebMethod(EnableSession = true)]
        public string GetZipCodeIpAddress(string _IpAddress)
        {
            string str = string.Empty;
            BllTopSearch objInnerpage = new BllTopSearch();
            str = objInnerpage.GetZipCodeIDFromIp(_IpAddress);
            return str;
        }

        //[WebMethod(EnableSession = true)]
        //public static string[] GetCustomers(string prefix)
        //{
        //     List<string> customers = new List<string>();
        //    using (SqlConnection conn = new SqlConnection())
        //    {
        //        SqlConnection strconnection = new SqlConnection("Data Source=.;Integrated Security=True;initial catalog=db_wcrNational");
        //        using (SqlCommand cmd = new SqlCommand())
        //        {
        //            cmd.CommandText = "select id, zipcode ,countryid from tbl_zipcode where zipcode like @SearchText + '%'";
        //            cmd.Parameters.AddWithValue("@SearchText", prefix);
        //            cmd.Connection = strconnection;
        //            conn.Open();
        //            using (SqlDataReader sdr = cmd.ExecuteReader())
        //            {
        //                while (sdr.Read())
        //                {
        //                    customers.Add(string.Format("{0}-{1}", sdr["zipcode"], sdr["countryid"]));
        //                }
        //            }
        //            conn.Close();
        //        }
        //    }
        //    return customers.ToArray();
        //}


        //[WebMethod]
        //public static List<string> LoadCountry(string input)
        //{
        //    return GetCountries().FindAll(item => item.ToLower().Contains(input.ToLower()));

        //}

        //public static List<string> GetCountries()
        //{
        //    List<string> CountryInformation = new List<string>();
        //    CountryInformation.Add("India");
        //    CountryInformation.Add("United States");
        //    CountryInformation.Add("United Kingdom");
        //    CountryInformation.Add("Canada");
        //    CountryInformation.Add("South Korea");
        //    CountryInformation.Add("France");
        //    CountryInformation.Add("Mexico");
        //    CountryInformation.Add("Russia");
        //    CountryInformation.Add("Australia");
        //    CountryInformation.Add("Turkey");
        //    CountryInformation.Add("Kenya");
        //    CountryInformation.Add("New Zealand");
        //    return CountryInformation;
        //}



        [WebMethod(EnableSession = true)]
        public string SelectServicesListData(int zipcode, int Category)
        {
            string str = string.Empty;
            BllTopSearch objInnerpage = new BllTopSearch();
            str = objInnerpage.SelectServicesListData(zipcode, Category);
            return str;
        }
    }
}
