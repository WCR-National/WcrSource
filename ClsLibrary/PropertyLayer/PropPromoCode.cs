using System;
namespace ClsLibrary.PropertyLayer
{
    public class PropPromoCode
    {
        public int CategoryID { get; set; }
        public int SubCategoryID { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public float Discount { get; set; }
        public string PromoCode { get; set; }
        public int AssociateID { get; set; }
        public int ID { get; set; }


    }
}
