using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ClsLibrary.PropertyLayer.Associate.Service
{
    class PropService
    {

        private int id;
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
        protected string Name;
        protected string name
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
    //class S : PropService
    //{

    //    PropService d = new PropService();
    //    S dd = new S();
    //    public int ddd()
    //    {
    //        d.ID = 4;
    //        dd.Name = "Wcr";
    //        dd.ID = 5;
    //        return 0;
    //    }


    //}

}
