using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
using System.Data;
//using WcrClassLibrary.DataObjectsDeprecating;
namespace ClsLibrary.Bal
{
    public class BllAssociateRegistration
    {
        /// <summary>
        /// This Method is used to Insert data 
        /// </summary>
        /// <param name="objAssociateRegistration"></param>
        /// <returns>1 for success and -1 for fail</returns>
        /// 

        public string ResendActivationCode(string _Email)
        {
            DllAssociateRegistration objDal = new DllAssociateRegistration();
            try
            {
                return objDal.ResendActivationCode(_Email);
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

        public string RecordInsert(PropAssociateRegistration objProperty)
        {
            DllAssociateRegistration objDal = new DllAssociateRegistration();
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
        /// <summary>
        /// This Method is used to Insert data 
        /// </summary>
        /// <param name="objAssociateRegistration"></param>
        /// <returns>1 for success and -1 for fail</returns>
        // public string CardInsert(CardPaymentObj ObjCardPayment)
        public string CardInsert(PropAssociateRegistration objProperty)
        {
            DllAssociateRegistration objDal = new DllAssociateRegistration();
            try
            {
                return objDal.InsertCardData(objProperty);
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
        public string CardUpdate(PropAssociateRegistration objProperty, int cardID)
        {
            DllAssociateRegistration objDal = new DllAssociateRegistration();
            try
            {
                return objDal.UpdateCardData(objProperty, cardID);
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
        //public string LoadPaymentHistoryItem(CardPaymentObj objAssociateRegistration, int AssociateID, string description, int CardDataId)
        //{
        //    DllAssociateRegistration objDal = new DllAssociateRegistration();
        //    try
        //    {
        //        return objDal.LoadPaymentHistoryItem(objAssociateRegistration, AssociateID, description, CardDataId);
        //    }
        //    catch (Exception info)
        //    {
        //        throw info;
        //    }
        //    finally
        //    {
        //        objDal = null;
        //    }
        //}
        public string AssociateDetail(int advertisementID, string username)
        {
            DllAssociateRegistration objDal = new DllAssociateRegistration();
            try
            {
                return objDal.GetAssociateDetail(advertisementID ,username);
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
        public string AssociateBasicDetail(int associateID, string username)
        {
            DllAssociateRegistration objDal = new DllAssociateRegistration();
            try
            {
                return objDal.GetAssociateBasicDetail(associateID, username);
               
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
        public string TotalAdvts(int associateID, int jobtype)
        {
            DllAssociateRegistration objDal = new DllAssociateRegistration();
            try
            {
                return objDal.CountTotalAdvts(associateID, jobtype);
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


        public string CountTotalZipCodePurchased(int associateID)
        {
            DllAssociateRegistration objDal = new DllAssociateRegistration();
            try
            {
                return objDal.CountTotalZipCodePurchased(associateID);
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
        public string TotalAllAdvts(int associateID)
        {
            DllAssociateRegistration objDal = new DllAssociateRegistration();
            try
            {
                return objDal.CountTotalAllAdvts(associateID);
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
        public DataTable retcardData(int associateID, string inUserName)
        {
            DataTable d = new DataTable();
            DllAssociateRegistration objreg = new DllAssociateRegistration();
            d = objreg.retcardData(associateID, inUserName);
            return d;

        }
        public string GetCardRecord(int associateID, string inUserName)
        {
            DllAssociateRegistration objDal = new DllAssociateRegistration();
            try
            {
                return objDal.retcardData1(associateID, inUserName);
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


        public string UpdateAssociateProfile(PropAssociateRegistration objAssociateRegistration, string userName)
        {
            DllAssociateRegistration objDal = new DllAssociateRegistration();
            try
            {
                return objDal.UpdateAssociateProfile(objAssociateRegistration, userName);
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


        public string UpdateAssociatePic(PropAssociateRegistration objAssociateRegistration, string associateID, string userName)
        {
            DllAssociateRegistration objDal = new DllAssociateRegistration();
            try
            {
                return objDal.UpdateAssociatePic(objAssociateRegistration,associateID, userName);
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

        public string RecordExists(PropAssociateRegistration objProperty)
        {
            DllAssociateRegistration objDal = new DllAssociateRegistration();
            try
            {
                return objDal.RecordExistsOrNot(objProperty);
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


        public string RecordExistsForAssociate(PropAssociateRegistration objProperty)
        {
            DllAssociateRegistration objDal = new DllAssociateRegistration();
            try
            {
                return objDal.RecordExistsOrNotForAssociate(objProperty);
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

        public string RecordExistsForConsumer(PropAssociateRegistration objProperty)
        {
            DllAssociateRegistration objDal = new DllAssociateRegistration();
            try
            {
                return objDal.RecordExistsOrNotForConsumer(objProperty);
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
