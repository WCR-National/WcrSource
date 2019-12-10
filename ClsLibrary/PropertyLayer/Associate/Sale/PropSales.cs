using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ClsLibrary.PropertyLayer.Associate.Sale
{
    public class PropSales
    {
        private int id;

        public int CategoryID { get; set; }
        public int jobtype { get; set; }
        private int subcategoryId;
        private string name;
        private string features;
        private string contactNo;
        private string address;
        private string email;
        private string description;
        private string countryId;
        private string stateId;
        private string cityId;
        private int isfeatured;
        private string zipcode;
        private int associateId;
        private double amount;
        private string _mainImg;
        private double advtPrice;



        public double AdvtPrice
        {
            get
            {
                return advtPrice;
            }
            set
            {
                advtPrice = value;
            }
        }


        public double Amount
        {
            get
            {
                return amount;
            }
            set
            {
                amount = value;
            }
        }
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
        public int Subcategory
        {
            get
            {
                return subcategoryId;
            }
            set
            {
                subcategoryId = value;

            }
        }
        public string Title
        {
            get
            {
                return name;
            }
            set
            {
                name = value;

            }
        }
        public string Features
        {
            get
            {
                return features;
            }
            set
            {

                features = value;
            }

        }
        public string ContactNo
        {
            get
            {
                return contactNo;
            }
            set
            {

                contactNo = value;
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
        public string Email
        {
            get
            {
                return email;
            }
            set
            {
                email = value;
            }
        }
        public string Description
        {
            get
            {
                return description;
            }
            set
            {
                description = value;
            }
        }
        public string CountryID
        {
            get
            {
                return countryId;
            }
            set
            {
                countryId = value;
            }
        }
        public string StateID
        {
            get
            {
                return stateId;
            }
            set
            {
                stateId = value;
            }
        }
        public string CityID
        {
            get
            {
                return cityId;
            }
            set
            {
                cityId = value;
            }
        }
        public int IsfeaturedID
        {
            get
            {
                return isfeatured;
            }
            set
            {
                isfeatured = value;
            }
        }
        public string Zipcode
        {
            get
            {
                return zipcode;
            }
            set
            {
                zipcode = value;
            }
        }
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
        public string MainImg
        {
            get
            {
                return _mainImg;
            }
            set
            {
                _mainImg = value;
            }
        }


        public string CityName
        {
            get;
            set;
        }
        public string StateName
        {
            get;
            set;
        }
        
    }
}
