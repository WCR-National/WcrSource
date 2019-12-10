using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WcrAssociate.Associate
{
    public partial class Master1 : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetNoStore();

            if (Session["associate"].ToString() == null || Session["associate"].ToString() == "")
            {

                Response.Redirect("../index.html", false);
            }
            else
            {
                if (!IsPostBack)
                {

                }
            }

        }
    }
}