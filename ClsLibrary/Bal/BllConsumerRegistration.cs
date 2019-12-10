using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
namespace ClsLibrary.Bal
{
    public class BllConsumerRegistration
    {
        /// <summary>
        /// This Method will be used to insert Consumer Data into Database
        /// </summary>
        /// <param name="objProperty"></param>
        /// <returns></returns>
        public string RecordInsert(PropConsumerRegistration objProperty)
        {
            DllConsumerRegistration objDal = new DllConsumerRegistration();
            try
            {
                return objDal.InsertData(objProperty);
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
        public string RecordUpdate(PropConsumerRegistration objProperty)
        {
            DllConsumerRegistration objDal = new DllConsumerRegistration();
            try
            {
                return objDal.UpdateData(objProperty);
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
        public string RecordSelect(int ID, string uname)
        {
            DllConsumerRegistration objconsumerRegistration = new DllConsumerRegistration();
            try
            {
                return objconsumerRegistration.SelectConsumerDetail(ID , uname);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objconsumerRegistration = null;
            }
        }
        public string UpdatePhote(PropConsumerRegistration objProperty)
        {
            DllConsumerRegistration objDal = new DllConsumerRegistration();
            try
            {
                return objDal.UpdateConsumerPhoto(objProperty);
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
        public string DeleteConsumer(PropConsumerRegistration objProperty)
        {
            DllConsumerRegistration objDal = new DllConsumerRegistration();
            try
            {
                return objDal.DeleteConsumer(objProperty);
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
        public string UpdateCompulsaryData(string Name, int ID, string uname)
        {
            DllConsumerRegistration objDal = new DllConsumerRegistration();
            try
            {
                return objDal.UpdateCompulsoryData(Name, ID, uname);
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
        public string CheckConsumerMobANDEmailExists(int ID)
        {
            DllConsumerRegistration objconsumerRegistration = new DllConsumerRegistration();
            try
            {
                return objconsumerRegistration.CheckConsumerMobANDEmailExists(ID);
            }
            catch (Exception info)
            {
                throw info;
            }
            finally
            {
                objconsumerRegistration = null;
            }
        }

        public string ConsumerSupport(int consumerID, string message, string uname)
        {
            DllConsumerRegistration objDal = new DllConsumerRegistration();
            try
            {
                return objDal.ConsumerSupport(consumerID, message, uname);
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


        public string AssociateSupport(int associateID, string message, string uname)
        {
            DllConsumerRegistration objDal = new DllConsumerRegistration();
            try
            {
                return objDal.AssociateSupport(associateID, message , uname);
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
