using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClsLibrary.PropertyLayer
{
    class ConsumerServicesObjects
    {
    }

    public class ServiceAdvertisementObject
    {
        public int AssociateId { get; set; }
        public int ZipCode { get; set; }
        public string FirstName { get; set; }
        public string LicenseState { get; set; }
        public string LicenseId { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PhotoFileName { get; set; }
        public int ConsumerId { get; set; }
    }

}
