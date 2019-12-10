using System;
using ClsLibrary.PropertyLayer;
using ClsLibrary.Dal;
namespace ClsLibrary.Bal
{
    public class BllSearchingCategories
    {
        public string SearchSalesCategory(PropCategory objProperty, string zipcode, string _action)
        {
            DllSearchingCategories objDal = new DllSearchingCategories();
            try
            {
                return objDal.SearchSalesCategory(objProperty, zipcode, _action);
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
