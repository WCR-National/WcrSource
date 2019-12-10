using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
using System.Data;
namespace ClsLibrary.Bal
{
 public   class BllAssociateLogin
    {

        /// <summary>
        /// This Method is used to Select get data for associate login 
        /// </summary>
        /// <param name="objCountry">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string RecordSelect(PropAssociateLogin objAssociate)
        {
            DllAssociateLogin objDal = new DllAssociateLogin();
            try
            {
                return objDal.SelectAssociate(objAssociate);
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


        public string AssociateAccountExists(string Email)
        {
            DllAssociateLogin objDal = new DllAssociateLogin();
            try
            {
                return objDal.AssociateAccountExists(Email);
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

        public string ConsumerAccountExists(string Email)
        {
            DllAssociateLogin objDal = new DllAssociateLogin();
            try
            {
                return objDal.ConsumerAccountExists(Email);
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


        public string SelectActivationCode(string username)
        {
            DllAssociateLogin objDal = new DllAssociateLogin();
            try
            {
                return objDal.GetActivationCode(username);
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


        public string VerifiedAccount(string username)
        {
            DllAssociateLogin objDal = new DllAssociateLogin();
            try
            {
                return objDal.VerifiedAccount(username);
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

        public string ChkAssociateStatus(string username)
        {
            DllAssociateLogin objDal = new DllAssociateLogin();
            try
            {
                return objDal.ChkAssociateStatus(username);
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



        /// <summary>
        /// This Method is used to Select get data for consumer login 
        /// </summary>
        /// <param name="objCountry">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string Selectconsumer(PropConsumerRegistration objConsumer)
        {
            DllAssociateLogin objDal = new DllAssociateLogin();
            try
            {
                return objDal.SelectConsumer(objConsumer);
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
        /// <summary>
        /// This Method is used to Select full detail of a consumer
        /// </summary>
        /// <param name="objCountry">Action</param>
        /// <returns>1 for success and -1 for fail</returns>  
        /// 
        public string GetConsumerDetail(int ID)
        {
            DllAssociateLogin objDal = new DllAssociateLogin();
            try
            {
                return objDal.GetConsumerDetail(ID);
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


        public string ResetAssociatePass(PropAssociateRegistration objAssociate)
        {
            DllAssociateLogin objDal = new DllAssociateLogin();
            try
            {
                return objDal.ResetAssociatePass(objAssociate);
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
        public string ResetAssociatePassNew(PropAssociateRegistration objAssociate)
        {
            DllAssociateLogin objDal = new DllAssociateLogin();
            try
            {
                return objDal.SendAssociatePassonEmail(objAssociate);
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
        public string ResetConsumerPassNew(PropConsumerRegistration objConsumer)
        {
            DllAssociateLogin objDal = new DllAssociateLogin();
            try
            {
                return objDal.SendConsumerPassonEmail(objConsumer);
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
        public string ResetConsumerPass(PropConsumerRegistration objConsumer)
        {
            DllAssociateLogin objDal = new DllAssociateLogin();
            try
            {
                return objDal.ResetConsumerPass(objConsumer);
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


        public string SelectConsumerActivationCode(string username)
        {
            DllAssociateLogin objDal = new DllAssociateLogin();
            try
            {
                return objDal.GetConsumerActivationCode(username);
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


        public string VerifiedConsumerAccount(string username)
        {
            DllAssociateLogin objDal = new DllAssociateLogin();
            try
            {
                return objDal.ConsumerVerifiedAccount(username);
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

        public string ChkConsumerStatus(string username)
        {
            DllAssociateLogin objDal = new DllAssociateLogin();
            try
            {
                return objDal.ChkConsumerStatus(username);
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
