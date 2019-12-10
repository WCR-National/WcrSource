using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClsLibrary.PropertyLayer.Associate
{
 public   class PropSaveAdvertisements
    {
        public int ID { get; set; }
        public int ConsumerID { get; set; }
        public int AdvertisementID { get; set; }
        public DateTime SavedDate { get; set; }
       
    }
}
