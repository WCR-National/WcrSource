using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ClsLibrary.PropertyLayer.Associate.Sale
{
    class PropAdvImages
    {
        private int id;
        private int advID;
        private string advImage;
        public int ID
        {
            get
            {
                return id;
            }
            set
            {
                id = value;
            }
        }
        public int AdvertisementID
        {
            get
            {
                return advID;
            }
            set
            {
                advID = value;
            }
        }
        public string AdvImage
        {
            get
            {
                return advImage;
            }
            set
            {
                advImage = value;
            }
        }

    }
}
