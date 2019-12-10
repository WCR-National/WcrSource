using System.Web.UI;
using System.Web.UI.WebControls;

namespace ClsLibrary.Bal
{
    public class Resetall
    {
        public static void ResetControls(ControlCollection pagecontrols, bool txtbox, bool dropdownlist, bool label)
        {
            foreach (Control cntrl in pagecontrols)
            {
                foreach (Control mycontrols in cntrl.Controls)
                {
                    if (txtbox)
                    {
                        if (mycontrols is TextBox)
                        {
                            (mycontrols as TextBox).Text = string.Empty;
                        }
                    }
                    if (dropdownlist)
                    {
                        if (mycontrols is DropDownList)
                        {
                            (mycontrols as DropDownList).SelectedIndex = 0;
                        }
                    }
                    if (label)
                    {
                        if (mycontrols is Label)
                        {
                            (mycontrols as Label).Text = string.Empty;
                        }
                    }
                }
            }
        }


        public static void ResetControls(Control parent)
        {
            foreach (Control c in parent.Controls)
            {
                if (c.Controls.Count > 0)
                {
                    ResetControls(c);
                }
                else
                {
                    switch (c.GetType().ToString())
                    {
                        case "System.Web.UI.WebControls.TextBox":
                            ((TextBox)c).Text = "";
                            break;
                        case "System.Web.UI.WebControls.CheckBox":
                            ((CheckBox)c).Checked = false;
                            break;
                        case "System.Web.UI.WebControls.RadioButton":
                            ((RadioButton)c).Checked = false;
                            break;
                        
                    }
                }
            }
        }
    }
}
