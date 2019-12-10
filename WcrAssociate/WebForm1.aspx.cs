using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;


namespace WcrAssociate
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["con"].ConnectionString);
        protected void Page_Load(object sender, EventArgs e)
        {

            if (!IsPostBack)
            {
                string str = string.Empty;
                int x = 1;
                for (int i = 1; i <= 100; )
                {
                   
                        str += x + " a <br>";
                        x++;
                        str += x + "  b <br> ";
                        x++;
                        str += x + "c <br>";
                        x++;
                        i = i + 3;
                    }
               
                Label2.Text = str;
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            #region Reverse Number
            ////int n = Convert.ToInt16(TextBox1.Text);
            ////int remender = 1;
            ////int reverse=0;
            ////while(n>=1)
            ////{
            ////    remender = n % 10;
            ////    reverse = reverse * 10 + remender;
            ////    n = n / 10;

            ////}
            /////TextBox18.Text = reverse.ToString();
            #endregion
            #region greatest number without any condition
            /*  int x = 17;
            int y = 18;
            int z = ((x + y) + (y - x)) / 2;
            TextBox18.Text = z.ToString(); */
            #endregion

            //int num = Convert.ToInt16(TextBox1.Text);
            //int []s=;
            //int cnt = 0;
            //while(num>0)
            //{
            //    s[cnt] = num % 2;
            //    num = num / 2;
            //    cnt++;
            //}


            //////if (string.IsNullOrEmpty(TextBox1.Text))
            //////{
            //////    TextBox1.Text = "Can not null!!!";
            //////}
            //////else
            //////{
            //////    SqlCommand cmd = new SqlCommand("proc_SearchingSalesAdvtsNew2", Con);
            //////    cmd.CommandType = CommandType.StoredProcedure;
            //////    cmd.Parameters.AddWithValue("@zipcode", Convert.ToInt64(TextBox1.Text));
            //////    cmd.Parameters.AddWithValue("@subCategoryID", Convert.ToInt64(TextBox18.Text));
            //////    if (Con.State == ConnectionState.Open)
            //////    { }
            //////    else
            //////    {
            //////        Con.Open();
            //////    }
            //////    cmd.Connection = Con;
            //////    SqlDataReader dr = cmd.ExecuteReader();
            //////    DataTable dt = new DataTable();

            //////    dt.Load(dr);
            //////    Con.Close();
            //////    if (dt.Rows.Count > 0)
            //////    {
            //////        GridView1.DataSource = dt;
            //////        GridView1.DataBind();
            //////    }
            //////}

        }

        protected void Button2_Click(object sender, EventArgs e)
        {
            //int[,] arr = new int[4, 4];
            //for (int i = 0; i <= 3; i++)
            //{
            //    for (int j = 0; j <= 3; j++)
            //    {
            //        arr[i, j]=j;
            //        Response.Write(arr[i,j]);
            //    }
            //    Response.Write("<br/>");
            //}


            #region For Long
            ////long[,] arr = new long[5, 4] { { 1, 2, 3, 4 }, { 1, 1, 1, 1 }, { 2, 2, 2, 2 }, { 3, 3, 3, 3 }, { 4, 4, 4, 4 } };

            ////int rowLength = arr.GetLength(0);
            ////int colLength = arr.GetLength(1);

            ////for (int i = 0; i < rowLength; i++)
            ////{
            ////    for (int j = 0; j < colLength; j++)
            ////    {
            ////        Response.Write(string.Format("{0} ", arr[i, j]));
            ////    }
            ////    Response.Write("<br/>");
            ////}
            #endregion

            #region For String

            string[,] arr = new string[4, 4]; //{ { "1", "2", "3", "4" }, { "5", "1", "1", "1" }, { "1", "1", "1", "1" }, { "1", "1", "1", "1" } };

            int rowLength = arr.GetLength(0);
            int colLength = arr.GetLength(1);

            //Writng Values to array
            for (int i = 0; i < rowLength; i++)
            {
                for (int j = 0; j < colLength; j++)
                {
                    #region For First Element
                    if (i == 0 && j == 0)
                    {
                        arr[i, j] = TextBox2.Text;

                    }
                    else if (i == 0 && j == 1)
                    {
                        arr[i, j] = TextBox3.Text;
                    }
                    else if (i == 0 && j == 2)
                    {
                        arr[i, j] = TextBox4.Text;
                    }
                    else if (i == 0 && j == 3)
                    {
                        arr[i, j] = TextBox5.Text;
                    }
                    #endregion

                    #region For Second Row
                    else if (i == 1 && j == 0)
                    {
                        arr[i, j] = TextBox6.Text;

                    }
                    else if (i == 1 && j == 1)
                    {
                        arr[i, j] = TextBox7.Text;
                    }
                    else if (i == 1 && j == 2)
                    {
                        arr[i, j] = TextBox8.Text;
                    }
                    else if (i == 1 && j == 3)
                    {
                        arr[i, j] = TextBox9.Text;
                    }
                    #endregion


                    #region For Third Row
                    else if (i == 2 && j == 0)
                    {
                        arr[i, j] = TextBox10.Text;

                    }
                    else if (i == 2 && j == 1)
                    {
                        arr[i, j] = TextBox11.Text;
                    }
                    else if (i == 2 && j == 2)
                    {
                        arr[i, j] = TextBox12.Text;
                    }
                    else if (i == 2 && j == 3)
                    {
                        arr[i, j] = TextBox13.Text;
                    }
                    #endregion


                    #region For Fourth Row
                    else if (i == 3 && j == 0)
                    {
                        arr[i, j] = TextBox14.Text;

                    }
                    else if (i == 3 && j == 1)
                    {
                        arr[i, j] = TextBox15.Text;
                    }
                    else if (i == 3 && j == 2)
                    {
                        arr[i, j] = TextBox16.Text;
                    }
                    else if (i == 3 && j == 3)
                    {
                        arr[i, j] = TextBox17.Text;
                    }
                    #endregion






                }

            }

            for (int i = 0; i < rowLength; i++)
            {
                for (int j = 0; j < colLength; j++)
                {
                    Response.Write(string.Format("{0} ", arr[i, j]));
                }
                Response.Write("<br/>");
            }
            #endregion
        }






















        //////// int i, j, m, n;
        //////// //Response.Write("Enter the Number of Rows and Columns : ");
        //////// m = 2;// Convert.ToInt32(Console.ReadLine());
        //////// n = 2;// Convert.ToInt32(Console.ReadLine());
        //////// int[,] a = new int[m, n];
        //////// //Console.WriteLine("Enter the First Matrix");
        //////// for (i = 0; i < m; i++)
        //////// {
        ////////     for (j = 0; j < n; j++)
        ////////     {
        ////////         a[i, j] = j;// int.Parse(Console.ReadLine());
        ////////     }
        //////// }
        //////// //Console.WriteLine("First matrix is:");
        //////// for (i = 0; i < m; i++)
        //////// {
        ////////     for (j = 0; j < n; j++)
        ////////     {
        ////////         Response.Write(a[i, j] + "\t");
        ////////     }
        ////////     //Console.WriteLine();
        //////// }
        //////// int[,] b = new int[m, n];
        ////////// Console.WriteLine("Enter the Second Matrix");
        //////// for (i = 0; i < m; i++)
        //////// {
        ////////     for (j = 0; j < n; j++)
        ////////     {
        ////////         b[i, j] = j;// int.Parse(Console.ReadLine());
        ////////     }
        //////// }
        ////////// Console.WriteLine("Second Matrix is :");
        //////// for (i = 0; i < 2; i++)
        //////// {
        ////////     for (j = 0; j < 2; j++)
        ////////     {
        ////////         Response.Write(b[i, j] + "\t");
        ////////     }
        ////////   //  Console.WriteLine();
        //////// }
        //////// //Console.WriteLine("Matrix Multiplication is :");
        //////// int[,] c = new int[m, n];
        //////// for (i = 0; i < m; i++)
        //////// {
        ////////     for (j = 0; j < n; j++)
        ////////     {
        ////////         c[i, j] = 0;
        ////////         for (int k = 0; k < 2; k++)
        ////////         {
        ////////             c[i, j] += a[i, k] * b[k, j];
        ////////         }
        ////////     }
        //////// }
        //////// for (i = 0; i < m; i++)
        //////// {
        ////////     for (j = 0; j < n; j++)
        ////////     {
        ////////         Response.Write(c[i, j] + "\t");
        ////////     }
        ////////    // Console.WriteLine();
        //////// }

        // Console.ReadKey();



        protected void Button3_Click(object sender, EventArgs e)
        {
            //Reading value from Array



        }

        protected void Button4_Click(object sender, EventArgs e)
        {
            string s = string.Empty;
            for (int i = 0; i < CheckBoxList1.Items.Count; i++)
            {
                if (CheckBoxList1.Items[i].Selected == true)
                {
                    s += CheckBoxList1.Items[i].Text;
                }

            }
            Label1.Text = s;
        }

    }
}