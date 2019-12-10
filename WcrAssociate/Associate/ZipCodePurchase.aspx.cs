using System;
using ClsLibrary.Bal;
using ClsLibrary.Bal.Associate;
using System.Data;
using WcrClassLibrary;
using ClsLibrary.PropertyLayer;
using System.Xml;

namespace WcrAssociate.Associate
{
    public partial class ZipCodePurchase : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

                WcrCryptography cardEncrypt = new WcrCryptography();
                BllAssociateRegistration d = new BllAssociateRegistration();
                DataTable dt = new DataTable();
                dt = d.retcardData(Convert.ToInt32(Session["associate"].ToString()), Session["userName"].ToString());
                if (dt != null && dt.Rows.Count > 0)
                {

                    string _crdID = dt.Rows[0]["CardDataId"].ToString();
                    string _crd = cardEncrypt.WcrDecryptCardNumber(dt.Rows[0]["CardNumber"].ToString());
                    string _fstName = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_FirstName"].ToString());
                    string _sndName = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_LastName"].ToString());
                    string _Address = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_Address"].ToString());
                    string _city = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_City"].ToString());
                    string _state = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_State"].ToString());
                    string _zip = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_Zip"].ToString());
                    string _country = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_Country"].ToString());
                    string _cvv = cardEncrypt.WcrDecrypt(dt.Rows[0]["CVV"].ToString());
                    string _months = cardEncrypt.WcrDecrypt(dt.Rows[0]["ExpMonth"].ToString());
                    string _year = cardEncrypt.WcrDecrypt(dt.Rows[0]["ExpYear"].ToString());
                    string _crdType = cardEncrypt.WcrDecrypt(dt.Rows[0]["CardType"].ToString());

                    txtCreditCard.Text = _crd.TrimStart('0');
                    txtCvv.Text = _cvv;
                    cardFname.Text = _fstName;
                    cardLastname.Text = _sndName;
                    Cardaddress.Text = _Address;
                    cardCity.Text = _city;
                    BindState();
                    cardState.Text = _state;
                    cardCountry.Text = _country;
                    BindStateWiseZipCode();
                    cardzipcode.Text = _zip;
                    ddlMonth.Text = _months;
                    ddlYear.Text = _year;
                    CardID.Value = _crdID;
                    //hidCardID.Text = _crdID;
                    //string a = _crd.Substring(0, 1);
                    string a = _crd.TrimStart('0').Substring(0, 1);
                    if (a == "3")
                    {
                        CheckBox1.Checked = false;
                        CheckBox2.Checked = false;
                        CheckBox3.Checked = true;
                        CheckBox4.Checked = false;
                    }
                    else if (a == "6")
                    {
                        CheckBox1.Checked = false;
                        CheckBox2.Checked = false;
                        CheckBox3.Checked = false;
                        CheckBox4.Checked = true;
                    }
                    else if (a == "5")
                    {
                        CheckBox1.Checked = false;
                        CheckBox2.Checked = true;
                        CheckBox3.Checked = false;
                        CheckBox4.Checked = false;
                    }
                    else if (a == "4")
                    {
                        CheckBox1.Checked = true;
                        CheckBox2.Checked = false;
                        CheckBox3.Checked = false;
                        CheckBox4.Checked = false;
                    }
                    else
                    {
                        CheckBox1.Checked = false;
                        CheckBox2.Checked = false;
                        CheckBox3.Checked = true;
                        CheckBox4.Checked = false;
                    }

                }
                else { }
            }
        }

        private void BindState()
        {
            DataSet dsresult = new DataSet();
            XmlDocument doc = new XmlDocument();
            BllState objState = new BllState();
            PropState proState = new PropState();
            proState.flag = 1;
            proState.StateName = "US";
            doc.LoadXml(objState.SelectStates(proState));
            XmlElement exelement = doc.DocumentElement;
            if (exelement.IsEmpty == false)
            {
                XmlNodeReader nodereader = new XmlNodeReader(exelement);
                dsresult.ReadXml(nodereader, XmlReadMode.Auto);
                cardState.DataSource = dsresult;
                cardState.DataTextField = "stateid";
                cardState.DataValueField = "stateid";
                cardState.DataBind();
            }
        }

        private void BindStateWiseZipCode()
        {
            DataSet dsresult = new DataSet();
            XmlDocument doc = new XmlDocument();
            BllZipCodeRegistration objPurchasecategory = new BllZipCodeRegistration();
            doc.LoadXml(objPurchasecategory.StateWiseZipCode(cardState.SelectedItem.ToString(), cardCity.Text, Session["associate"].ToString()));
            XmlElement exelement = doc.DocumentElement;
            if (exelement.IsEmpty == false)
            {
                XmlNodeReader nodereader = new XmlNodeReader(exelement);
                dsresult.ReadXml(nodereader, XmlReadMode.Auto);
                cardzipcode.DataSource = dsresult;
                cardzipcode.DataTextField = "zipcode";
                cardzipcode.DataValueField = "zipcode";
                cardzipcode.DataBind();
            }
        }
    }
}