using System;
using ClsLibrary.PropertyLayer.Associate;
using ClsLibrary.Dal.Associate;
using System.Data;

namespace ClsLibrary.Bal.Associate
{
    public class BllMessage
    {
        public string RecordInsert(PropMessage objProperty, string associateID)
        {
            DllMessage objDal = new DllMessage();
            try
            {
                return objDal.InsertD(objProperty, associateID);
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

        public string SelectSentMessages(string associateID)
        {
            DllMessage objDal = new DllMessage();
            try
            {
                return objDal.GetSentMessages(associateID);
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
