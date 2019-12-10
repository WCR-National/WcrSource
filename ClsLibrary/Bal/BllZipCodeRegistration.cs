using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
using System.Data;
namespace ClsLibrary.Bal
{
    public class BllZipCodeRegistration
    {
        public string RecordInsert(PropzipCode objProperty, string UserName)
        {
            DllZipcodeRegis objDal = new DllZipcodeRegis();
            try
            {
                return objDal.InsertzipCode(objProperty, UserName);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;

            }
        }
        public string RecordUpdate(PropzipCode objProperty, string UserName)
        {
            DllZipcodeRegis objDal = new DllZipcodeRegis();
            try
            {
                return objDal.UpdatezipCode(objProperty, UserName);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }
        public string RecordDelete(PropzipCode objProperty, string UserName)
        {
            DllZipcodeRegis objDal = new DllZipcodeRegis();
            try
            {
                return objDal.DeletezipCode(objProperty, UserName);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }
        public string RecordSelect(PropzipCode objProperty, string UserName)
        {
            DllZipcodeRegis objDal = new DllZipcodeRegis();
            try
            {
                return objDal.SelectzipCode(objProperty, UserName);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }

        public string ZipCodeExists(string ZipCode, string UserName)
        {
            DllZipcodeRegis objDal = new DllZipcodeRegis();
            try
            {
                return objDal.ZipCodeExists(ZipCode, UserName);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }

        public string SelectLatitute(PropzipCode objProperty)
        {
            DllZipcodeRegis objDal = new DllZipcodeRegis();
            try
            {
                return objDal.SelectzipCode(objProperty);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }


        public string PurchaseZipCode(string userName)
        {
            DllZipcodeRegis objDal = new DllZipcodeRegis();
            try
            {
                return objDal.PurchaseZipCode(userName);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }


        public string StateWiseZipCode(string StateID,string CityID, string userName)
        {
            DllZipcodeRegis objDal = new DllZipcodeRegis();
            try
            {
                return objDal.ZipCodeStateWise(StateID, CityID, userName);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }

        public string CityWiseStates(string CityID, string userName)
        {
            DllZipcodeRegis objDal = new DllZipcodeRegis();
            try
            {
                return objDal.CiyWiseState(CityID, userName);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objDal = null;
            }
        }

    }
}
