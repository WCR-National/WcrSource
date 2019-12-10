using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ClsLibrary.PropertyLayer
{
  public  class PropFeatures
    {

      private int SubcategoryID;
      private string Name;
        public int flag { get; set; }
        public int ID { get; set; }
        public int SubCategory
        {
            get
            {
                return SubcategoryID;
            }
            set
            {
                SubcategoryID = value;
            }
        }
        public string Features
        {
            get
            {
                return Name;
            }
            set
            {
                Name = value;

            }
        }
    }
}
