using System.Web.Services;
using ClsLibrary.Bal;
using ClsLibrary.PropertyLayer;
using System;
using System.Web;
using System.IO;

namespace WcrAssociate.Associate.ws
{
    /// <summary>
    /// Summary description for ConsumerComments
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ConsumerComments : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public string InsertComments(int AdvertisementID, string Comments, float rateforad)
        {
            string str = string.Empty;
            if (Session["consumer"].ToString() != "" || Session["consumer"].ToString() != null)
            {

                BllConsumerPost objConsumerPost = new BllConsumerPost();
                str = objConsumerPost.RecordInsert(AdvertisementID, Comments, Convert.ToInt16(Session["consumer"].ToString()), rateforad);
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }
        [WebMethod(EnableSession = true)]
        public string ViewComments(int advertisementID)
        {
            string str = string.Empty;
            BllConsumerPost objComments = new BllConsumerPost();
            str = objComments.RecordSelect(advertisementID);
            return str;
        }

        [WebMethod(EnableSession = true)]
        public string ViewRating(int advertisementID)
        {
            string str = string.Empty;
            BllConsumerPost objComments = new BllConsumerPost();
            str = objComments.GetRatingRecord(advertisementID);
            return str;
        }

        /// <summary>
        /// This Method Will save records of associateExchange table when consumer will click on Contact Associate Button
        /// </summary>
        /// <param name="AdvertisementID"></param>
        /// <param name="AssociateID"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public string InsertConsumerInterest(int AdvertisementID, int AssociateID, int jobType, int zipcode)
        {
            string str = string.Empty;
            BllConsumerPost objComments = new BllConsumerPost();
            str = objComments.InsertConsumerInterest(AdvertisementID, Convert.ToInt16(Session["consumer"].ToString()), AssociateID, jobType ,zipcode);
            return str;
        }
        
        [WebMethod(EnableSession = true)]
        public string InsertAdvertisementClick(int AdvertisementID)
        {
            string str = string.Empty;
            BllConsumerPost objComments = new BllConsumerPost();
            int _consumerID;
            if (Session["consumer"].ToString() == "" || Session["consumer"].ToString() == " ")
            {
                _consumerID = 0;
            }
            else
            {
                _consumerID = Convert.ToInt16(Session["consumer"].ToString());
            }
            str = objComments.ClickPerAdvertisements(AdvertisementID,_consumerID);
            return str;
        }


        [WebMethod(EnableSession = true)]
        public string SendConsumerDetail(int associateID, int advertisementID,  int jobtype, int zipcode)
        {
            string str = string.Empty;
            if (Session["consumer"].ToString() != "" || Session["consumer"].ToString() != null)
            {

                BllConsumerPost objConsumerPost = new BllConsumerPost();
                str = objConsumerPost.SendConsumerDetail(associateID, advertisementID, Convert.ToInt16(Session["consumer"].ToString()), jobtype, zipcode, Session["userName"].ToString());
                return str;
            }
            else
            {
                return "Error in Authentication";
            }
        }

    }
}
