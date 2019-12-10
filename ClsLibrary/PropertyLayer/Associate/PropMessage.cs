using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ClsLibrary.PropertyLayer.Associate
{
    public class PropMessage
    {
        public int ID { get; set; }
        public int fromID { get; set; }
        public int toID { get; set; }
        public string subject { get; set; }
        public string bodytext { get; set; }
    }
}
