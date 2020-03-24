using System;
using ClsLibrary.Bal;
using ClsLibrary.Bal.Associate;
using System.Data;
using WcrClassLibrary;
using ClsLibrary.PropertyLayer;
using System.Xml;

namespace WcrAssociate.Associate
{
    public partial class CreditCard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                try
                {
                    BllPurchaseCategory objp = new BllPurchaseCategory();
                    int s = objp.CardExistsOrNot1(Session["associate"].ToString());
                    if (s >= 1)
                    {
                        WcrCryptography cardEncrypt = new WcrCryptography();
                        BllAssociateRegistration d = new BllAssociateRegistration();
                        DataTable dt = new DataTable();
                        dt = d.retcardData(Convert.ToInt32(Session["associate"].ToString()), Session["userName"].ToString());
                        if (dt != null && dt.Rows.Count > 0)
                        {
                            Button1.Visible = false;
                            divCardEntry.Visible = false;
                            divViewCardInfo.Visible = true;
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
                            txtcity.Text = _city;
                            cardState.Text = _state;
                            cardCountry.Text = _country;
                            cardzipcode.Text = _zip;
                            ddlMonth.Text = _months;
                            ddlYear.Text = _year;
                            CardID.Value = _crdID;
                            //hidCardID.Text = _crdID;
                            //string a = _crd.Substring(0, 1);
                            string a = _crd.TrimStart('0').Substring(0, 1);
                            if (a == "3")
                            {
                                chkAmex.Checked = true;
                                chkAmex.Enabled = false;
                                chkDiscoverry.Enabled = false;
                                chkMasterCard.Enabled = false;
                                crdVisa.Enabled = false;
                            }
                            else if (a == "6")
                            {
                                chkAmex.Enabled = false;
                                chkDiscoverry.Checked = true;
                                chkDiscoverry.Enabled = false;
                                chkMasterCard.Enabled = false;
                                crdVisa.Enabled = false;
                            }
                            else if (a == "5")
                            {
                                chkAmex.Enabled = false;
                                chkDiscoverry.Enabled = false;
                                chkMasterCard.Checked = true;
                                chkMasterCard.Enabled = false;
                                crdVisa.Enabled = false;
                            }
                            else if (a == "4")
                            {
                                chkAmex.Enabled = false;
                                chkDiscoverry.Enabled = false;
                                chkMasterCard.Enabled = false;
                                crdVisa.Checked = true;
                                crdVisa.Enabled = false;
                            }
                            else
                            {
                                chkAmex.Checked = true;
                                chkAmex.Enabled = false;
                                chkDiscoverry.Enabled = false;
                                chkMasterCard.Enabled = false;
                                crdVisa.Enabled = false;
                            }
                            lblCardNumber.Text = _crd.TrimStart('0'); ;
                            lblExpMonth.Text = _months;
                            lblExpYear.Text = _year;
                            lblCvvCode.Text = _cvv;
                            lblFstName.Text = _fstName;
                            lblLastName.Text = _sndName;
                            lblStreetAddress.Text = _Address;
                            lblCity.Text = _city;
                            lblState.Text = _state;
                            lblCountry.Text = _country;
                            lblZipCode.Text = _zip;
                        }
                        else
                        {
                            pnlAdd.Visible = true;
                            Button1.Visible = false;
                            divCardEntry.Visible = true;
                            divViewCardInfo.Visible = false;
                        }
                    }
                    else
                    {
                        BindState();
                        Button1.Visible = false;
                        pnlAdd.Visible = true;
                        divCardEntry.Visible = true;
                        divViewCardInfo.Visible = false;
                    }
                }
                catch { }
            }

        }

        protected void btnreset_Click(object sender, EventArgs e)
        {
            BindRecords();
        }

        private void BindRecords()
        {
            try
            {
                BindState();

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
                        pnlupdate.Visible = true;
                        pnlAdd.Visible = false;
                        divCardEntry.Visible = true;
                        divViewCardInfo.Visible = false;
                        string _state = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_State"].ToString());
                        cardState.Text = _state;
                        cardState.SelectedValue = _state;
                        string _crdID = dt.Rows[0]["CardDataId"].ToString();
                        string _crd = cardEncrypt.WcrDecryptCardNumber(dt.Rows[0]["CardNumber"].ToString());
                        string _fstName = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_FirstName"].ToString());
                        string _sndName = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_LastName"].ToString());
                        string _Address = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_Address"].ToString());
                        string _city = cardEncrypt.WcrDecrypt(dt.Rows[0]["Cardholder_City"].ToString());

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
                        txtcity.Text = _city;
                        BindStateWiseZipCode();
                        ddlMonth.Text = _months;
                        ddlYear.Text = _year;
                        //hidCardID.Text = _crdID;
                        CardID.Value = _crdID;
                        // string a = _crd.Substring(0, 1);
                        string a = _crd.TrimStart('0').Substring(0, 1);
                        if (a == "3")
                        {
                            CheckBox3.Checked = true;
                        }
                        else if (a == "6")
                        {
                            CheckBox4.Checked = true;
                        }
                        else if (a == "5")
                        {
                            CheckBox2.Checked = true;
                        }
                        else if (a == "4")
                        {
                            CheckBox1.Checked = true;
                        }
                        else
                        {
                            CheckBox3.Checked = true;
                        }
                        cardzipcode.Text = _zip;
                        cardzipcode.SelectedValue = _zip;


                    }
                    else
                    {
                        pnlupdate.Visible = false;
                        pnlAdd.Visible = true;
                        divCardEntry.Visible = true;
                        divViewCardInfo.Visible = false;

                    }
                }
                else
                {
                    pnlupdate.Visible = false;
                    pnlAdd.Visible = true;
                    divCardEntry.Visible = true;
                    divViewCardInfo.Visible = false;
                    txtCreditCard.Text = "";
                    cardFname.Text = "";
                    cardLastname.Text = "";
                    Cardaddress.Text = "";
                    txtCvv.Text = "";
                    cardzipcode.Text = "";
                    txtcity.Text = "";
                    cardState.Text = "0";

                }
            }
            catch
            { }
        }

        protected void btnedit_Click(object sender, EventArgs e)
        {

            BindRecords();
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
            doc.LoadXml(objPurchasecategory.StateWiseZipCode(cardState.SelectedItem.ToString(), txtcity.Text, Session["associate"].ToString()));
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

        //protected void btnCancel_Click(object sender, EventArgs e)
        //{
        //    BindRecords();
        //}
    }
}