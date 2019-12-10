using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
namespace WcrAssociate.Associate
{
    public partial class sale : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            { }
        }

        protected void btnImgUpload_Click(object sender, EventArgs e)
        {
            //string ImageExtension = Path.GetExtension(FileUpload1.FileName.ToLower());
            //if (ImageExtension.ToString() == ".jpeg" || ImageExtension.ToString() == ".jpg" || ImageExtension.ToString() == ".gif" || ImageExtension.ToString() == ".bmp" || ImageExtension.ToString() == ".png")
            //{
            //    string UniqueCode = System.Guid.NewGuid().ToString().Substring(0, 4);
            //    string result = subc.InsertSubCategory(Convert.ToInt16(Category.SelectedValue), txtSubCategory.Text, "" + UniqueCode + "_" + flupload.FileName + "");
            //    if (result == "1")
            //    {
            //        string path = Server.MapPath("CatImage");
            //        flupload.SaveAs(path + "/" + UniqueCode + "_" + flupload.FileName);
            //        lblMessage.Visible = true;
            //        lblMessage.Text = "Submitted Successfully";
            //    }
            //}
        }
    }
}