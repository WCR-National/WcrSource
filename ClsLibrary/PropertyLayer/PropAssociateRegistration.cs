using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace ClsLibrary.PropertyLayer
{
    public class PropAssociateRegistration
    {
        //UserName,Photo,LicenceState,LicenceID,ReferralID

        private int associateId;
        private string fullName;
        private string lastName;
        private string emailId;
        private string passWord;
        private string mobileNo;
        private string zipCode;
        private string userName;
        private string photo;
        private string licenceState;
        private string licenceID;
        private int referralID;
        private int status;
        private int jobtype;

        public int AssociateID
        {
            get
            {
                return associateId;
            }
            set
            {
                associateId = value;
            }

        }
        public string FullName
        {
            get { return fullName; }
            set { fullName = value; }
        }
        public string LastName
        {
            get { return lastName; }
            set { lastName = value; }
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
        public string MobileNo
        {
            get
            {
                return mobileNo;
            }
            set
            {
                mobileNo = value;
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
        public string UserName
        {
            get
            {
                return userName;
            }
            set
            {
                userName = value;
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
        public string LicenseState
        {
            get
            {
                return licenceState;
            }
            set
            {
                licenceState = value;
            }

        }
        public string LicenseID
        {
            get
            {
                return licenceID;
            }
            set
            {
                licenceID = value;
            }

        }
        public int Status
        {
            get
            {
                return status;
            }
            set
            {
                status = value;
            }

        }
        public int ReferralID
        {
            get
            {
                return referralID;
            }
            set
            {
                referralID = value;
            }

        }
        public int JobType
        {
            get
            {
                return jobtype;
            }
            set
            {
                jobtype = value;
            }

        }

        // Below Properties for card Data


        private string cardNumber;
        private string cardholder_firstName;
        private string cardholder_lastName;
        private string cardholder_address;
        //private int cardholder_country;
        //private int cardholder_state;
        //private int cardholder_city;


        private string  cardholder_country;
        private string  cardholder_state;
        private string  cardholder_city;
        private string cardholder_zip;
        private string cVV;
        private string expMonth;
        private string expYear;
        private string cardType;


        private string couponCode;
        private int duration;
        private int discount;


        public string CardNumber
        {
            get { return cardNumber; }
            set { cardNumber = value; }
        }
        public string Cardholder_FirstName
        {
            get
            {
                return cardholder_firstName;
            }
            set
            {
                cardholder_firstName = value;
            }

        }
        public string Cardholder_LastName
        {
            get
            {
                return cardholder_lastName;
            }
            set
            {
                cardholder_lastName = value;
            }

        }
        public string Cardholder_Address
        {
            get
            {
                return cardholder_address;
            }
            set
            {
                cardholder_address = value;
            }

        }
        public string  Cardholder_Country
        {
            get
            {
                return cardholder_country;
            }
            set
            {
                cardholder_country = value;
            }

        }
        public string  Cardholder_State
        {
            get
            {
                return cardholder_state;
            }
            set
            {
                cardholder_state = value;
            }

        }
        public string  Cardholder_City
        {
            get
            {
                return cardholder_city;
            }
            set
            {
                cardholder_city = value;
            }

        }
        public string Cardholder_Zip
        {
            get
            {
                return cardholder_zip;
            }
            set
            {
                cardholder_zip = value;
            }

        }
        public string CVV
        {
            get
            {
                return cVV;
            }
            set
            {
                cVV = value;
            }

        }
        public string ExpMonth
        {
            get
            {
                return expMonth;
            }
            set
            {
                expMonth = value;
            }

        }
        public string ExpYear
        {
            get
            {
                return expYear;
            }
            set
            {
                expYear = value;
            }

        }
        public string CardType
        {
            get
            {
                return cardType;
            }
            set
            {
                cardType = value;
            }

        }


        public string CouponCode
        {
            get
            {
                return couponCode;
            }
            set
            {
                couponCode = value;
            }

        }

        public int Duration
        {
            get
            {
                return duration;
            }
            set
            {
                duration = value;
            }

        }


        public int Discount
        {
            get
            {
                return discount;
            }
            set
            {
                discount = value;
            }

        }
       









































    }
}
