using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
namespace ClsLibrary.Bal
{
    public class BllTopSearch
    {
        public string RecordTopSearch(int zipCode)
        {
            DllTopSearch objTopSearch = new DllTopSearch();
            try
            {
                return objTopSearch.SelectTopSearch(zipCode);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objTopSearch = null;
            }
        }

        public string AdvanceSearch(int zipCode)
        {
            DllTopSearch objTopSearch = new DllTopSearch();
            try
            {
                return objTopSearch.SelectAdvanceSearch(zipCode);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objTopSearch = null;
            }
        }


        public string AdvanceSearch1(int zipCode, int SubCategory)
        {
            DllTopSearch objTopSearch = new DllTopSearch();
            try
            {
                return objTopSearch.SelectAdvanceSearch1(zipCode, SubCategory);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objTopSearch = null;
            }
        }
        public string AdvanceSearchCityWise(string State, string City, int SubCategory)
        {
            DllTopSearch objTopSearch = new DllTopSearch();
            try
            {
                return objTopSearch.SelectAdvanceSearchSalesCityWise(State,City, SubCategory);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objTopSearch = null;
            }
        }

        public string AdvanceSearchServicesCityWise(string State, string City, int Category)
        {
            DllTopSearch objTopSearch = new DllTopSearch();
            try
            {
                return objTopSearch.SelectAdvanceSearchForServicesCityWise(State,City, Category);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objTopSearch = null;
            }
        }

        public string AdvanceSearchServices(int zipCode, int Category)
        {
            DllTopSearch objTopSearch = new DllTopSearch();
            try
            {
                return objTopSearch.SelectAdvanceSearchForServices(zipCode, Category);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objTopSearch = null;
            }
        }




        public string SelectServicesListData(int zipCode, int Category)
        {
            DllTopSearch objTopSearch = new DllTopSearch();
            try
            {
                return objTopSearch.SelectServicesListData(zipCode, Category);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objTopSearch = null;
            }
        }


        public string GetZipCodeIDFromIp(string ipAddress)
        {
            DllTopSearch objTopSearch = new DllTopSearch();
            try
            {
                return objTopSearch.GetZipCodeID(ipAddress);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objTopSearch = null;
            }
        }

        public ServiceAdvertisementObject GetServiceAdvertisementByZipcode(int inConsumerId, int inZipCode, int inCategoryId) {
            DllTopSearch dllTopSearch = new DllTopSearch();
            try
            {
                return dllTopSearch.GetServiceAdvertisementByZipcode(inConsumerId, inZipCode, inCategoryId).Result;
            }
            catch (Exception exc)
            {
                throw new Exception("FAILURE:::BllTopSearch - GetServiceAdvertisementByZipcode Error Msg: " + exc.Message);
            }
            finally
            {
                dllTopSearch = null;
            }

        }
    }
}
