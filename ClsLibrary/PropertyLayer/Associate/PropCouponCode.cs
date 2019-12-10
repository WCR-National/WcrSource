using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ClsLibrary.PropertyLayer.Associate
{
   public class PropCouponCode
    {
        public int ID { get; set; }
        public string CouponCode { get; set; }
        public int Discount { get; set; }
        public int  Duration { get; set; }
    }
}
