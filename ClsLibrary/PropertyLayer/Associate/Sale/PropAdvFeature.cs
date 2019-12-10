using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ClsLibrary.PropertyLayer.Associate.Sale
{
    class PropAdvFeature
    {


        private int id;
        private int featureid;
        private int advertisementid;


        public int ID
        {
            get { return id; }
            set { id = value; }
        }

        public int FeatureID
        {
            get { return featureid; }
            set { featureid = value; }
        }

        public int AdvertisementID
        {
            get { return advertisementid; }
            set { advertisementid = value; }
        }


    }
}
