using System;
using ClsLibrary.Bal;
using ClsLibrary.Bal.Associate;
using System.Data;
using WcrClassLibrary;
namespace WcrAssociate.Associate
{
    public partial class UpdateCard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                BllPurchaseCategory objp = new BllPurchaseCategory();
                int s = objp.CardExistsOrNot1(Session["associate"].ToString());
                if(s>=1)
                {
                    WcrCryptography cardEncrypt = new WcrCryptography();
                    BllAssociateRegistration d = new BllAssociateRegistration();
                    DataTable dt = new DataTable();
                    dt = d.retcardData(Convert.ToInt32(Session["associate"].ToString()), Session["userName"].ToString());
                    if (dt.Rows.Count > 0)
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
                        txtCreditCard.Text = _crd;
                        txtCvv.Text = _cvv;
                        cardFname.Text = _fstName;
                        cardLastname.Text = _sndName;
                        Cardaddress.Text = _Address;
                        txtcity.Text = _city;                        
                        cardState.Text = _state;
                        cardzipcode.Text = _zip;
                        ddlMonth.Text = _months;
                        ddlYear.Text = _year;
                        hidCardID.Value = _crdID;                        
                    }
                    else
                    { }
                }
                else
                {

                }
            
            
            }
        }

        protected void btnreset_Click(object sender, EventArgs e)
        {
            
            BllPurchaseCategory objp = new BllPurchaseCategory();
                int s = objp.CardExistsOrNot1(Session["associate"].ToString());
                if (s >= 1)
                {
                    WcrCryptography cardEncrypt = new WcrCryptography();
                    BllAssociateRegistration d = new BllAssociateRegistration();
                    DataTable dt = new DataTable();
                    dt = d.retcardData(Convert.ToInt32(Session["associate"].ToString()), Session["userName"].ToString());
                    if (dt.Rows.Count > 0)
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
                        txtCreditCard.Text = _crd;
                        txtCvv.Text = _cvv;
                        cardFname.Text = _fstName;
                        cardLastname.Text = _sndName;
                        Cardaddress.Text = _Address;
                        txtcity.Text = _city;
                        cardState.Text = _state;
                        cardzipcode.Text = _zip;                        
                        ddlMonth.Text = _months;
                        ddlYear.Text = _year;
                        hidCardID.Value = _crdID;
                    }
                    else
                    { }
                }
                else
                {
                    txtCreditCard.Text = "";
                    cardFname.Text = "";
                    cardLastname.Text = "";
                    Cardaddress.Text = "";
                    txtCvv.Text = "";
                    cardzipcode.Text = ""; 
                    txtcity.Text = ""; 

                    cardState.Text = "0";                    
                    //ddlMonth.Text = _months;
                    //ddlYear.Text = _year;
                   

                //    ContentPlaceHolder1_txtCreditCard.value = "";
                //ContentPlaceHolder1_cardFname.value = "";
                //ContentPlaceHolder1_cardLastname.value = "";
                //ContentPlaceHolder1_Cardaddress.value = "";
                //ContentPlaceHolder1_txtCvv.value = "";
                //ContentPlaceHolder1_cardzipcode.value = "";
                //ContentPlaceHolder1_txtcity.value = "";

                //$('#ContentPlaceHolder1_cardState').val('Select State');
                //$('#ContentPlaceHolder1_ddlMonth').val('Month');
                //$('#ContentPlaceHolder1_ddlYear').val('Year');

                }

          
        }

        
    }
}