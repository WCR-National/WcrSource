using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
using System.Data;
using System.Web.UI.WebControls;
namespace ClsLibrary.Bal
{
    public class BllSubCategory
    {
        #region Insert

        /// <summary>
        /// This Method is used to Insert data 
        /// </summary>
        /// <param name="objCategory">Category Value and SubCategory Name</param>
        /// <returns>1 for success and -1 for fail</returns>
        public string RecordInsert(PropSubcategory objProperty, string UserName)
        {
            DllSubCategory objDal = new DllSubCategory();
            try
            {
                return objDal.InsertSubCategory(objProperty, UserName).ToString();
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
        #region Update
        /// <summary>
        /// This Method is used to Update data 
        /// </summary>
        /// <param name="objCategory">Category value, SubCategory Name,ID,Action</param>
        /// <returns>1 for success and -1 for fail</returns>    
        public string RecordUpdate(PropSubcategory objProperty, string UserName)
        {
            DllSubCategory objDal = new DllSubCategory();
            try
            {
                return objDal.UpdateSubCategory(objProperty, UserName);
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

        #region Delete
        /// <summary>
        /// This Method is used to Delete data 
        /// </summary>
        /// <param name="objCategory">ID and Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string RecordDelete(PropSubcategory objProperty, string UserName)
        {
            DllSubCategory objDal = new DllSubCategory();
            try
            {
                return objDal.DeleteSubCategory(objProperty, UserName);
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
        #region Select
        /// <summary>
        /// This Method is used to Select data 
        /// </summary>
        /// <param name="objCategory">Action</param>
        /// <returns>1 for success and -1 for fail</returns>   
        public string RecordSelect(PropSubcategory objProperty, string UserName)
        {

            DllSubCategory objDal = new DllSubCategory();

            try
            {
                return objDal.SelectSubCategory(objProperty, UserName);
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
        public string AssociateCategoryExistsOrNot(string UserName)
        {

            DllSubCategory objDal = new DllSubCategory();
            try
            {
                return objDal.AssociateCategoryExistsOrNot(UserName);
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
        public string SubCategoryWisePrice(PropSubcategory objProperty, string UserName)
        {

            DllSubCategory objDal = new DllSubCategory();
            try
            {
                return objDal.GetSubCategoryPrice(objProperty, UserName);
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
        public string AssociateSubCategory(PropSubcategory objProperty, string UserName)
        {
            DllSubCategory objDal = new DllSubCategory();
            try
            {
                return objDal.AssociateSubCategory(objProperty, UserName);
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


        public string CateSubcategory(PropSubcategory objProperty)
        {

            DllSubCategory objDal = new DllSubCategory();

            try
            {
                return objDal.CategorywiseSubCategory(objProperty);
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
        public string CategoryWiseSubCategoryofAssociate(PropSubcategory objProperty, string UserName)
        {
            DllSubCategory objDal = new DllSubCategory();
            try
            {
                return objDal.CategoryWiseSubCategoryofAssociate(objProperty, UserName);
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
        public string GetSubCategories(PropSubcategory objProperty)
        {
            DllSubCategory objDal = new DllSubCategory();
            try
            {
                return objDal.SubCategories(objProperty);
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
    }
}
