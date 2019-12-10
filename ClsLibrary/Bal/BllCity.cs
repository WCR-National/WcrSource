using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
using System.Data;

namespace ClsLibrary.Bal
{
    public class BllCity
    {
        public string RecordInsert(PropCity objProperty, string UserName)
        {
            Dllcity objDal = new Dllcity();
            try
            {
                return objDal.InsertCity(objProperty , UserName);

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


        public string RecordUpdate(PropCity objProperty, string UserName)
        {
            Dllcity objDal = new Dllcity();
            try
            {
                return objDal.UpdateCity(objProperty, UserName);
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
        public string RecordDelete(PropCity objProperty, string UserName)
        {
            Dllcity objDal = new Dllcity();
            try
            {
                return objDal.DeleteCity(objProperty , UserName);
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
        public string RecordSelect(PropCity objProperty, string UserName)
        {
            Dllcity objDal = new Dllcity();
            try
            {
                return objDal.SelectCity(objProperty , UserName);
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




        public string StateWiseCities(PropCity objProperty)
        {
            Dllcity objDal = new Dllcity();
            try
            {
                return objDal.StateWiseCity(objProperty);
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
