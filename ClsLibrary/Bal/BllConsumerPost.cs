using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
using System.Web;

namespace ClsLibrary.Bal
{
 public   class BllConsumerPost
    {
     public string RecordInsert(int AdvertisementID, string Comments, int ConsumerID, float rateforad)
     {
         DllPostComments objDal = new DllPostComments();
         try
         {
             return objDal.InsertData(AdvertisementID, Comments, ConsumerID, rateforad);
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

     public string RecordSelect(int advertisementID)
     {
         DllPostComments objViewComments = new DllPostComments();
         try
         {
             return objViewComments.GetCommentsDetail(advertisementID);
         }
         catch (Exception info)
         {
             throw info;
         }
         finally
         {
             objViewComments = null;
         }
     }

     public string GetRatingRecord(int advertisementID)
     {
         DllPostComments objViewComments = new DllPostComments();
         try
         {
             return objViewComments.GetRating(advertisementID);
         }
         catch (Exception info)
         {
             throw info;
         }
         finally
         {
             objViewComments = null;
         }
     }

     public string InsertConsumerInterest(int AdvertisementID, int ConsumerID, int AssociateID, int jobType, int zipcode)
     {
         DllPostComments objDal = new DllPostComments();
         try
         {
             return objDal.InsertConsumerInterest(AdvertisementID, ConsumerID, AssociateID, jobType , zipcode);
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


     public string ClickPerAdvertisements(int AdvertisementID, int ConsumerID)
     {
         DllPostComments objDal = new DllPostComments();
         try
         {
             return objDal.ClickPerAdvertisements(AdvertisementID, ConsumerID);
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



     public string SendConsumerDetail(int associateID, int advertisementID, int consumerID, int jobtype, int zipcode, string username)
     {
         DllPostComments objDal = new DllPostComments();
         try
         {
             return objDal.SendConsumerDetail(associateID, advertisementID, consumerID, jobtype ,zipcode ,username);
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
