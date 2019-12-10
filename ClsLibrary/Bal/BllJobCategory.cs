using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
namespace ClsLibrary.Bal
{
    public class BllJobCategory
    {
        /// <summary>
        /// This Method is used to Insert data 
        /// </summary>
        /// <param name="objCategory">JobType,Category Name,</param>
        /// <returns>1 for success and -1 for fail</returns>
        public string RecordInsert(PropCategory objProperty, string UserName)
        {

            DllJobCategory objDal = new DllJobCategory();
            try
            {
                return objDal.InsertCategory(objProperty, UserName);
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
        /// This Method is used to Update data 
        /// </summary>
        /// <param name="objCategory">JobType,Category Name,ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>    
        public string RecordUpdate(PropCategory objProperty, string UserName)
        {
            DllJobCategory objDal = new DllJobCategory();
            try
            {
                return objDal.UpdateCategory(objProperty, UserName);
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
        /// This Method is used to Delete data 
        /// </summary>
        /// <param name="objCategory">ID and Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string RecordDelete(PropCategory objProperty, string UserName)
        {
            DllJobCategory objDal = new DllJobCategory();
            try
            {
                return objDal.DeleteCategory(objProperty, UserName);
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
        /// This Method is used to Select data 
        /// </summary>
        /// <param name="objCategory">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string RecordSelect(PropCategory objProperty, string UserName)
        {
            DllJobCategory objDal = new DllJobCategory();
            try
            {
                return objDal.SelectCategory(objProperty, UserName);
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
        #region Select
        /// <summary>
        /// This Method is used to Select data 
        /// </summary>
        /// <param name="objCategory">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string JobCategory(PropCategory objProperty)
        {
            DllJobCategory objDal = new DllJobCategory();
            try
            {
                return objDal.JobtypewiseCategory(objProperty);
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
        #endregion
        public string AllJobCategory(PropCategory objProperty)
        {
            DllJobCategory objDal = new DllJobCategory();
            try
            {
                return objDal.JobCategoryAll(objProperty);
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
        #region Select Associate Categories
        /// <summary>
        /// This Method is used to Select data 
        /// </summary>
        /// <param name="objCategory">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string AssociateCategories(PropAssociateRegistration objProperty)
        {

            DllJobCategory objDal = new DllJobCategory();

            try
            {
                return objDal.AssociateCategory(objProperty);
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
        #endregion
        public string AvailalbeServiceCategories(string jobtype, string zip)
        {
            DllJobCategory objDal = new DllJobCategory();
            try
            {
                return objDal.AvailableServiceCategory(jobtype, zip);
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
        public string AvailalbeSalesCategories(string jobtype, string zip, int associateID)
        {

            DllJobCategory objDal = new DllJobCategory();
            try

            {
                return objDal.AvailableSalesCategory(jobtype, zip, associateID);
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
        public string AvailalbeSalesCategories1(string jobtype, string zip, int associateID)
        {

            DllJobCategory objDal = new DllJobCategory();

            try
            {
                return objDal.AvailableSalesCategoryNew(jobtype, zip, associateID);
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
        /// This Method is used to bind all the available  category for specific Zipcode
        /// </summary>
        /// <param name="jobtype"></param>
        /// <param name="zip"></param>
        /// <returns></returns>
        public string AvailalbeCategoriesZipWise(string jobtype, string zip)
        {
            DllJobCategory objDal = new DllJobCategory();
            try
            {
                return objDal.AvailableCategoryZipwise(jobtype, zip);
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
        public string AvailableZipCodesForServices(string jobtype, string zip)
        {
            DllJobCategory objDal = new DllJobCategory();
            try
            {
                return objDal.AvailableZipCodesForServices(jobtype, zip);
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
        /// This Method is used to bind all the available Sub category for specific Zipcode on the basis of category
        /// </summary>
        /// <param name="jobtype"></param>
        /// <param name="zip"></param>
        /// <param name="categoryID"></param>
        /// <returns></returns>
        public string AvailalbeSubCategoriesZipWise(string jobtype, string zip, int categoryID)
        {
            DllJobCategory objDal = new DllJobCategory();
            try
            {
                return objDal.AvailableSubCategoryZipwise(jobtype, zip, categoryID);
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
        /// This method will get associate Purchased Categories on the basis of jobtype
        /// </summary>
        /// <param name="objProperty"></param>
        /// <param name="UserName"></param>
        /// <returns></returns>
         public string AssociatePurchasedCategory(PropCategory objProperty, string UserName)
        {
            DllJobCategory objDal = new DllJobCategory();
            try
            {
                return objDal.AssociatePurchasedCategory(objProperty, UserName);
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
