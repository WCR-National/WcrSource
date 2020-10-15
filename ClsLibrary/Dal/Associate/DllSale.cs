using System;
using ClsLibrary.PropertyLayer.Associate.Sale;
using System.Data;
using System.Data.SqlClient;
using ClsLibrary.Bal;
using WcrClassLibrary;
namespace ClsLibrary.Dal.Associate
{
    public class DllSale
    {
        readonly ConnectionClass objCon = new ConnectionClass();

        /// <summary>
        /// This Method is used to Post data into tbl_sale table
        /// </summary>
        /// <param name="objMemberShip">JobType,MemberShip Name,</param>
        /// <returns>1 for success and -1 for fail</returns>

        // public string InsertSale(PropSales objSale, string associateID, object FeatureID)
        public string InsertSale(PropSales objSale, string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_PostAdvertisement", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                try
                {
                    cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
                    cmd.Parameters.AddWithValue("@CategoryID", objSale.CategoryID);
                    cmd.Parameters.AddWithValue("@SubCategoryId", objSale.Subcategory);
                    cmd.Parameters.AddWithValue("@title", objSale.Title);
                    cmd.Parameters.AddWithValue("@feature", objSale.Features);
                    cmd.Parameters.AddWithValue("@address", objSale.Address);
                    //cmd.Parameters.AddWithValue("@email", objSale.Email);
                    cmd.Parameters.AddWithValue("@contactNo", objSale.ContactNo);
                    cmd.Parameters.AddWithValue("@description", objSale.Description);
                    cmd.Parameters.AddWithValue("@countryID", objSale.CountryID);
                    cmd.Parameters.AddWithValue("@StateID", objSale.StateID);
                    cmd.Parameters.AddWithValue("@cityID", objSale.CityID);
                    cmd.Parameters.AddWithValue("@zipcode", objSale.Zipcode);
                    cmd.Parameters.AddWithValue("@isFeatured", objSale.IsfeaturedID);
                    cmd.Parameters.AddWithValue("@jobtype", objSale.jobtype);
                    cmd.Parameters.AddWithValue("@amount", objSale.Amount);
                    cmd.Parameters.AddWithValue("@advPrice", objSale.AdvtPrice);
                    cmd.Parameters.AddWithValue("@Action", "Add");
                    int a = Convert.ToInt16(cmd.ExecuteScalar());
                    objCon.Con.Close();
                    if (a > 0)
                    {
                        //DataTable dt = new DataTable();
                        //dt.Columns.Add("featureID");
                        //dt.Columns.Add("advertisementID");
                        //string[] totalEmp = FeatureID.ToString().Split(',');
                        //for (int i = 0; i < totalEmp.Length; i++)
                        //{
                        //    DataRow dr = dt.NewRow();
                        //    dr["featureID"] = totalEmp[i];
                        //    dr["advertisementID"] = a;
                        //    dt.Rows.Add(dr);
                        //}
                        //SqlCommand cmdFeature = new SqlCommand("proc_AdvFeature", objCon.Con);
                        //cmdFeature.CommandType = CommandType.StoredProcedure;
                        //objCon.Con.Open();
                        //cmdFeature.Parameters.AddWithValue("@Details", dt);
                        //int b = cmdFeature.ExecuteNonQuery();
                        //objCon.Con.Close();
                        //if (b >= 1)
                        //{
                        return a.ToString();
                        //}
                        //else
                        //{
                        //    return ClsCommon.InactiveValue.ToString();
                        //}
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
            else
            {

                return "Not Valid";
            }
        }

        /// <summary>
        /// This Method is used to Update data into tbl_sale table
        /// </summary>
        /// <param name="objMemberShip">JobType,MemberShip Name,ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>      


        public string UpdateSale(PropSales objSale, string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_PostAdvertisement", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                //try
                //{
                // cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
                cmd.Parameters.AddWithValue("@CategoryID", objSale.CategoryID);
                cmd.Parameters.AddWithValue("@SubCategoryId", objSale.Subcategory);
                cmd.Parameters.AddWithValue("@title", objSale.Title);
                cmd.Parameters.AddWithValue("@feature", objSale.Features);
                cmd.Parameters.AddWithValue("@address", objSale.Address);
                // cmd.Parameters.AddWithValue("@email", objSale.Email);
                cmd.Parameters.AddWithValue("@contactNo", objSale.ContactNo);
                cmd.Parameters.AddWithValue("@description", objSale.Description);
                // cmd.Parameters.AddWithValue("@advMainImage", objSale.adv);
                cmd.Parameters.AddWithValue("@countryID", objSale.CountryID);
                cmd.Parameters.AddWithValue("@StateID", objSale.StateID);
                cmd.Parameters.AddWithValue("@cityID", objSale.CityID);
                cmd.Parameters.AddWithValue("@zipcode", objSale.Zipcode);
                //cmd.Parameters.AddWithValue("@isFeatured", objSale.IsfeaturedID);
                cmd.Parameters.AddWithValue("@amount", objSale.Amount);
                cmd.Parameters.AddWithValue("@advertisementID", objSale.ID);
                cmd.Parameters.AddWithValue("@Action", "Update");
                int a = Convert.ToInt16(cmd.ExecuteNonQuery());
                objCon.Con.Close();
                if (a > 0)
                {
                    //DataTable dt = new DataTable();
                    //dt.Columns.Add("featureID");
                    //dt.Columns.Add("advertisementID");
                    //string[] totalEmp = FeatureID.ToString().Split(',');
                    //for (int i = 0; i < totalEmp.Length; i++)
                    //{
                    //    DataRow dr = dt.NewRow();
                    //    dr["featureID"] = totalEmp[i];
                    //    dr["advertisementID"] = a;
                    //    dt.Rows.Add(dr);
                    //}
                    //SqlCommand cmdFeature = new SqlCommand("proc_AdvFeature", objCon.Con);
                    //cmdFeature.CommandType = CommandType.StoredProcedure;
                    //objCon.Con.Open();
                    //cmdFeature.Parameters.AddWithValue("@Details", dt);
                    //int b = cmdFeature.ExecuteNonQuery();
                    //objCon.Con.Close();
                    //if (b >= 1)
                    //{
                    return objSale.ID.ToString();
                    //}
                    //else
                    //{
                    //return ClsCommon.InactiveValue.ToString();
                    //}
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }
                //}
                //catch (Exception showError)
                //{
                //    throw showError;
                //}
                //finally
                //{
                //    cmd.Dispose();
                //    objCon.Con.Close();
                //    objCon.Con.Dispose();
                //}
            }
            else
            {

                return "Not Valid";
            }
        }

        /// <summary>
        /// This Method is used to Delete data into tbl_sale table
        /// </summary>
        /// <param name="objMemberShip">ID and Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        //public string DeleteMemberShip(PropMemberShipPlan objMemberShip, string userName)
        //{
        //    if (userName != null && userName != "")
        //    {
        //        SqlCommand cmd = new SqlCommand("proc_MembersipPlan", objCon.Con);
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        objCon.Con.Open();
        //        try
        //        {

        //            cmd.Parameters.AddWithValue("@ID", objMemberShip.membershipID);
        //            cmd.Parameters.AddWithValue("@Action", "Delete");
        //            return cmd.ExecuteNonQuery().ToString();
        //        }
        //        catch (Exception showError)
        //        {
        //            throw showError;
        //        }
        //        finally
        //        {
        //            cmd.Dispose();
        //            objCon.Con.Close();
        //            objCon.Con.Dispose();
        //        }
        //    }
        //    else
        //    {

        //        return "Not Valid";
        //    }
        //}
        /// <summary>
        /// This Method is used to Select data from tbl_sale table
        /// </summary>
        /// <param name="objMemberShip">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string SelectAdvertisement(string associateID, int jobType)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_PostAdvertisement", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "Select");
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
                cmd.Parameters.AddWithValue("@jobtype", jobType);
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
                adpt.Fill(ds, "ViewAdvertisment");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }
        }
        public string UpdateAdvertisementPics(string associateID, string ImgName, string Img1, string Img2, string Img3, int AdvertiseID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_PostAdvertisement", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", "imgUpdate");
                cmd.Parameters.AddWithValue("@advMainImage", ImgName);
                cmd.Parameters.AddWithValue("@advImage1", Img1);
                cmd.Parameters.AddWithValue("@advImage2", Img2);
                cmd.Parameters.AddWithValue("@advImage3", Img3);
                cmd.Parameters.AddWithValue("@advertisementID", AdvertiseID);
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
                adpt.Fill(ds, "UpdateAdvertisment");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }
        public string UpdateFeaturedAdv(PropSales objSale, string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_PostAdvertisement", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                //try
                //{
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
                cmd.Parameters.AddWithValue("@CategoryID", objSale.CategoryID);
                cmd.Parameters.AddWithValue("@SubCategoryId", objSale.Subcategory);
                cmd.Parameters.AddWithValue("@title", objSale.Title);
                cmd.Parameters.AddWithValue("@feature", objSale.Features);
                cmd.Parameters.AddWithValue("@address", objSale.Address);
                cmd.Parameters.AddWithValue("@email", objSale.Email);
                cmd.Parameters.AddWithValue("@contactNo", objSale.ContactNo);
                cmd.Parameters.AddWithValue("@description", objSale.Description);
                // cmd.Parameters.AddWithValue("@advMainImage", objSale.adv);
                cmd.Parameters.AddWithValue("@countryID", objSale.CountryID);
                cmd.Parameters.AddWithValue("@StateID", objSale.StateID);
                cmd.Parameters.AddWithValue("@cityID", objSale.CityID);
                cmd.Parameters.AddWithValue("@zipcode", objSale.Zipcode);
                cmd.Parameters.AddWithValue("@isFeatured", objSale.IsfeaturedID);
                cmd.Parameters.AddWithValue("@amount", objSale.Amount);
                cmd.Parameters.AddWithValue("@advertisementID", objSale.ID);
                cmd.Parameters.AddWithValue("@Action", "Update");
                int a = Convert.ToInt16(cmd.ExecuteNonQuery());
                objCon.Con.Close();
                if (a > 0)
                {
                    //DataTable dt = new DataTable();
                    //dt.Columns.Add("featureID");
                    //dt.Columns.Add("advertisementID");
                    //string[] totalEmp = FeatureID.ToString().Split(',');
                    //for (int i = 0; i < totalEmp.Length; i++)
                    //{
                    //    DataRow dr = dt.NewRow();
                    //    dr["featureID"] = totalEmp[i];
                    //    dr["advertisementID"] = a;
                    //    dt.Rows.Add(dr);
                    //}
                    //SqlCommand cmdFeature = new SqlCommand("proc_AdvFeature", objCon.Con);
                    //cmdFeature.CommandType = CommandType.StoredProcedure;
                    //objCon.Con.Open();
                    //cmdFeature.Parameters.AddWithValue("@Details", dt);
                    //int b = cmdFeature.ExecuteNonQuery();
                    //objCon.Con.Close();
                    //if (b >= 1)
                    //{
                    return a.ToString();
                    //}
                    //else
                    //{
                    //return ClsCommon.InactiveValue.ToString();
                    //}
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }
                //}
                //catch (Exception showError)
                //{
                //    throw showError;
                //}
                //finally
                //{
                //    cmd.Dispose();
                //    objCon.Con.Close();
                //    objCon.Con.Dispose();
                //}
            }
            else
            {

                return "Not Valid";
            }
        }
        public string InterestedConsumers(string associateID)
        {
            if (associateID != null && associateID != "")
            {
                WcrCryptography crypto = new WcrCryptography();
                SqlCommand cmd = new SqlCommand("proc_InterrestedCustomber", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", "Select");
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
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
                adpt.Fill(ds, "InterestedConsumer");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }
        }
        public string InterestedConsumersServices(string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_InterrestedCustomber", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", "ServicesSelect");
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
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
                adpt.Fill(ds, "InterestedConsumerser");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }
        public string InterestedConsumersCount(string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_InterrestedCustomber", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", "CountAllHits");
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
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
                adpt.Fill(ds, "TotalInterestedConsumer");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }
        public string AssociateCategoriesCount(string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_AllAssociateCategories", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", "CountAllCategories");
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
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
                adpt.Fill(ds, "AssocateCategories");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }
        }
        public string PurchasedZipcodeCount(string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_AllAssociateCategories", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", "CountPurchaseZipcode");
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
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
                adpt.Fill(ds, "ZipcodePurchased");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }
        /// <summary>
        /// This Method Will return number of click per advertisement
        /// </summary>
        /// <param name="associateID"></param>
        /// <returns></returns>
        public string VisitorsClick(string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_AdvertisementClick", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", "Select");
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
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
                adpt.Fill(ds, "ViewadvtsClick");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }
        public string BlockPostAdvertisements(PropSales objSale, string associateID, int activeV)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_PostAdvertisement", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
                cmd.Parameters.AddWithValue("@SubCategoryId", objSale.Subcategory);
                cmd.Parameters.AddWithValue("@flag", activeV);
                cmd.Parameters.AddWithValue("@Action", "BlockedAdvt");
                int a = Convert.ToInt16(cmd.ExecuteNonQuery());
                objCon.Con.Close();
                if (a > 0)
                {
                    return a.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }

            }
            else
            {

                return "Not Valid";
            }
        }
        public string SelectAllAdvertisement(string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_PostAdvertisement", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", "SelectAllAds");
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
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
                adpt.Fill(ds, "ViewAllAdvertisement");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }
        public string RemoveSaleRecord(PropSales objSale, string associateID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_PostAdvertisement", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();

                cmd.Parameters.AddWithValue("@advertisementID", objSale.ID);
                cmd.Parameters.AddWithValue("@Action", "DeleteRcd");
                int a = Convert.ToInt16(cmd.ExecuteNonQuery());
                objCon.Con.Close();
                if (a > 0)
                {
                    return a.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }

            }
            else
            {

                return "Not Valid";
            }
        }
        public string InterestedConsumersSalesCount(string associateID, int jobType)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_InterrestedCustomber", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@action", "CountsalesHits");
                cmd.Parameters.AddWithValue("@associateID", Convert.ToInt16(associateID));
                cmd.Parameters.AddWithValue("@JobType", jobType);
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
                adpt.Fill(ds, "TotalInterestedConsumers");
                objCon.Con.Close();
                return ds.GetXml();
            }
            else
            {
                return "Not Valid";
            }

        }
        public string UpdatePostAdvertisementsCost(string associateID, int advtsID, float amount)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_PostAdvertisement", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                cmd.Parameters.AddWithValue("@advertisementID", advtsID);
                cmd.Parameters.AddWithValue("@amount", amount);
                cmd.Parameters.AddWithValue("@action", "advsPrice");
                int a = Convert.ToInt16(cmd.ExecuteNonQuery());
                objCon.Con.Close();
                if (a > 0)
                {
                    return a.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }

            }
            else
            {

                return "Not Valid";
            }
        }
        public string DeleteInterestedRecord(string associateID, int ID)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_InterrestedCustomber", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                objCon.Con.Open();
                cmd.Parameters.AddWithValue("@ID", ID);
                cmd.Parameters.AddWithValue("@action", "DeleteRcd");
                int a = Convert.ToInt16(cmd.ExecuteNonQuery());
                objCon.Con.Close();
                if (a > 0)
                {
                    return a.ToString();
                }
                else
                { return ClsCommon.InactiveValue.ToString(); }

            }
            else
            {

                return "Not Valid";
            }
        }
        public string UpdateAdvertisementPicsSingle(string associateID, string ColName, string ImgName, int AdvertiseID, string actionName)
        {
            if (associateID != null && associateID != "")
            {
                SqlCommand cmd = new SqlCommand("proc_PostAdvertisement", objCon.Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Action", actionName);
                cmd.Parameters.AddWithValue(ColName, ImgName);
                cmd.Parameters.AddWithValue("@advertisementID", AdvertiseID);
                if (objCon.Con.State == ConnectionState.Open)
                { }
                else
                {
                    objCon.Con.Open();
                }
                int a = Convert.ToInt16(cmd.ExecuteNonQuery());
                objCon.Con.Close();

                return a.ToString();
            }
            else
            {
                return "Not Valid";
            }

        }



    }
}
