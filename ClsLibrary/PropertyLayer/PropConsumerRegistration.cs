using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ClsLibrary.PropertyLayer
{
    public class PropConsumerRegistration
    {
        private int Id;
        private string name;
        private string emailId;
        private string address;
        private string mob;    
        private string passWord;
        private string zipCode;
        private string photo;
        private string userName;
        private string lastName;

        private string unit_Apt;
        private string city;
        private string stateID;

        public int ID
        {
            get
            {
                return Id;
            }
            set
            {
                Id = value;
            }

        }


        public string Unit_Apt
        {
            get { return unit_Apt; }
            set { unit_Apt = value; }
        }


        public string City
        {
            get { return city; }
            set { city = value; }
        }

        public string StateID
        {
            get { return stateID; }
            set { stateID = value; }
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        public string LastName
        {
            get { return lastName; }
            set { lastName = value; }
        }
        public string UserName
        {
            get { return userName; }
            set { userName = value; }
        }
        public string Name
        {
            get { return name; }
            set { name = value; }
        }
        public string EmailID
        {
            get
            {
                return emailId;
            }
            set
            {
                emailId = value;
            }

        }
        public string Address
        {
            get
            {
                return address;
            }
            set
            {
                address = value;
            }

        }
        public string MobileNo
        {
            get
            {
                return mob;
            }
            set
            {
                mob = value;
            }

        }     
        public string Password
        {
            get
            {
                return passWord;
            }
            set
            {
                passWord = value;
            }

        }

        public string ZipCode
        {
            get
            {
                return zipCode;
            }
            set
            {
                zipCode = value;
            }

        }
     
        public string Photo
        {
            get
            {
                return photo;
            }
            set
            {
                photo = value;
            }

        }
    }
}
