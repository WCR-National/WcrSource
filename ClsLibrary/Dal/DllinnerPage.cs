using System.Data;
using System.Data.SqlClient;
using ClsLibrary.PropertyLayer.Associate;
using System;
using ClsLibrary.Bal;
using WcrClassLibrary;
namespace ClsLibrary.Dal
{
    public class DllinnerPage
    {
        readonly ConnectionClass objCon = new ConnectionClass();
        /// <summary>
        /// This Method is used to display all advertisment on the behalf of zipcode and subcategory id
        /// </summary>
        /// <param name="zipcode"></param>
        /// <param name="subCategoryID"></param>
        /// <returns>string</returns>
        public string SelectAdvertisement(string zipcode, int subCategoryID)
        {
            SqlCommand cmd = new SqlCommand("proc_DisplayAdvertisements", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Action", "SubcategoryWise");
            cmd.Parameters.AddWithValue("@ZipCode", zipcode);
            cmd.Parameters.AddWithValue("@subCategoryID", subCategoryID);
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
            adpt.Fill(ds, "ViewAdvertisments");
            objCon.Con.Close();
            return ds.GetXml();
        }
        public string SelectHomePageAdvertisement(int subCategoryID)
        {
            SqlCommand cmd = new SqlCommand("proc_DisplayAdvertisements", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Action", "HomePage");
            cmd.Parameters.AddWithValue("@subCategoryID", subCategoryID);
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
            adpt.Fill(ds, "HViewAdvertisments");
            objCon.Con.Close();
            return ds.GetXml();
        }
        /// <summary>
        /// This Method is used to count total advertisment on the basis of zipcode
        /// </summary>
        /// <param name="zipcode"></param>
        /// <param name="subCategoryID"></param>
        /// <returns>string</returns>
        public string TotalAdvertisement(string zipcode, int subCategoryID)
        {
            SqlCommand cmd = new SqlCommand("proc_DisplayAdvertisements", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Action", "TotalAdvertisements");
            cmd.Parameters.AddWithValue("@ZipCode", zipcode);
            cmd.Parameters.AddWithValue("@subCategoryID", subCategoryID);
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
            adpt.Fill(ds, "TotalAdvertisments");
            objCon.Con.Close();
            return ds.GetXml();
        }
        /// <summary>
        /// Total Advertisement Count
        /// </summary>
        /// <param name="subCategoryID"></param>
        /// <returns></returns>
        public string TotalAdvertisementHome(int subCategoryID)
        {
            SqlCommand cmd = new SqlCommand("proc_DisplayAdvertisements", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Action", "TotalAdvertisementsHome");
            cmd.Parameters.AddWithValue("@subCategoryID", subCategoryID);
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
            adpt.Fill(ds, "CountAdvertismentsH");
            objCon.Con.Close();
            return ds.GetXml();
        }
        /// <summary>
        /// This method will get count of Total Advertisemnts saved by consumer
        /// </summary>
        /// <param name="ConsumerID"></param>
        /// <returns></returns>
        public string TotalAdvertisementConsumerSaved(int ConsumerID)
        {
            SqlCommand cmd = new SqlCommand("proc_SaveAdvertisements", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@action", "CountAdv");
            cmd.Parameters.AddWithValue("@ConsumerID", ConsumerID);
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
            adpt.Fill(ds, "CountAdvertismentsConsumer");
            objCon.Con.Close();
            return ds.GetXml();
        }
        /// <summary>
        /// This method will display complete detail of an advertisment
        /// </summary>
        /// <param name="advertismentID"></param>
        /// <returns></returns>
        public string AdvertisementDetail(int advertismentID, int consumerId = 0)
        {
            SqlCommand cmd = new SqlCommand("proc_DisplayAdvertisements", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Action", "FullDetails");
            cmd.Parameters.AddWithValue("@advertisementID", advertismentID);
            cmd.Parameters.AddWithValue("@consumerId", consumerId);

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
            adpt.Fill(ds, "FullDetailsAdvertisments");
            objCon.Con.Close();
            return ds.GetXml();
        }
        /// <summary>
        /// This method is used to show features about the particular advertisment
        /// </summary>
        /// <param name="advertismentID"></param>
        /// <returns></returns>
        public string ShowFeaturesAdvertisment(int advertismentID)
        {
            SqlCommand cmd = new SqlCommand("proc_DisplayAdvertisements", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Action", "ShowAdvertisementFeatures");
            cmd.Parameters.AddWithValue("@advertisementID", advertismentID);
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
            adpt.Fill(ds, "FullDetailsAdvertisments");
            objCon.Con.Close();
            return ds.GetXml();
        }
        /// <summary>
        /// This Method is used to save advertisements by Consumer for future references
        /// </summary>
        /// <param name="objAdvSaved"></param>
        /// <returns></returns>
        public string InsertSaveAdvertisement(PropSaveAdvertisements objAdvSaved, int zipCode, int jtype)
        {
            SqlCommand cmd = new SqlCommand("proc_SaveAdvertisements", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            objCon.Con.Open();
            try
            {
                cmd.Parameters.AddWithValue("@ConsumerID", objAdvSaved.ConsumerID);
                cmd.Parameters.AddWithValue("@AdvertisementID", objAdvSaved.AdvertisementID);
                cmd.Parameters.AddWithValue("@Zipcode", zipCode);
                cmd.Parameters.AddWithValue("@jobType", jtype);
                cmd.Parameters.AddWithValue("@action", "Add");
                int a = cmd.ExecuteNonQuery();
                objCon.Con.Close();
                if (a > 0)
                {
                    return a.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }
            }
            catch (Exception showError)
            {
                throw showError;
            }
            finally
            {
                cmd.Dispose();
                objCon.Con.Close();
                objCon.Con.Dispose();
            }

        }



        public string DeleteSavedAdvertisement(PropSaveAdvertisements objAdvSaved)
        {
            SqlCommand cmd = new SqlCommand("proc_SaveAdvertisements", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            objCon.Con.Open();
            try
            {
                cmd.Parameters.AddWithValue("@ID", objAdvSaved.ID);
                cmd.Parameters.AddWithValue("@action", "DeleteRecord");
                int a = cmd.ExecuteNonQuery();
                objCon.Con.Close();
                if (a > 0)
                {
                    return a.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }
            }
            catch (Exception showError)
            {
                throw showError;
            }
            finally
            {
                cmd.Dispose();
                objCon.Con.Close();
                objCon.Con.Dispose();
            }

        }

        /// <summary>
        /// This Method will get all the saved advertisemets of consumer from db
        /// </summary>
        /// <param name="ConsumerID"></param>
        /// <returns></returns>
        public string ConsumerSavedAdvertisements(int ConsumerID)
        {
            SqlCommand cmd = new SqlCommand("proc_SaveAdvertisements", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@action", "View");
            cmd.Parameters.AddWithValue("@ConsumerID", ConsumerID);
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
            adpt.Fill(ds, "ConsumerAdvertisments");
            objCon.Con.Close();
            return ds.GetXml();
        }

        /// <summary>
        /// Bind Bookmaradvertisemnts
        /// </summary>
        /// <param name="zipcode"></param>
        /// <param name="catID"></param>
        /// <returns></returns>

        public string ConsumerSavedBookAdvertisementsForServices(int ConsumerID)
        {
            SqlCommand cmd = new SqlCommand("proc_SaveAdvertisements", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@action", "ViewBookMarkAd");
            cmd.Parameters.AddWithValue("@ConsumerID", ConsumerID);
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
            adpt.Fill(ds, "ConsumerBookAdvertisments");
            objCon.Con.Close();
            return ds.GetXml();
        }


        /// <summary>
        /// This Method will get data of associate and advertisements for whome consumer contated before
        /// </summary>
        /// <param name="ConsumerID"></param>
        /// <returns></returns>
        public string ViewAssociateContactedDetail(int ConsumerID)
        {
            SqlCommand cmd = new SqlCommand("proc_SaveAdvertisements", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@action", "ViewContactAssociateData");
            cmd.Parameters.AddWithValue("@ConsumerID", ConsumerID);
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
            adpt.Fill(ds, "ViewAssociateContactedDetails");
            objCon.Con.Close();
            return ds.GetXml();
        }


        public string SelectHomePageAdvertisementWithSearching(int subCategoryID, string param)
        {
            SqlCommand cmd = new SqlCommand("proc_DisplayAdvertisements", objCon.Con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Action", "HomePagewithZipcode");
            cmd.Parameters.AddWithValue("@subCategoryID", subCategoryID);
            cmd.Parameters.AddWithValue("@ZipCode", param);
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
            adpt.Fill(ds, "HViewAdvertismentsWithParam");
            objCon.Con.Close();
            return ds.GetXml();
        }


    }
}
