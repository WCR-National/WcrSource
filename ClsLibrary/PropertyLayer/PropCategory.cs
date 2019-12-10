

namespace ClsLibrary.PropertyLayer
{
    public class PropCategory
    {
        private int jobType;
        private string categoryName;
        private int id;
        private int flag;
        private string categoryImage;
        /// <summary>
        /// This Property is used to get and set the value of Job type (e.g sales or Service etc.)
        /// </summary>
        public int JobTypeValue
        {
            get
            {
                return jobType;

            }
            set
            {

                jobType = value;
            }

        }
        /// <summary>
        /// This Property is used to get and set the value of Category Name (e.g Automative,realestate etc.)
        /// </summary>
        public string CategoryNameValue
        {

            get { return categoryName; }
            set { categoryName = value; }
        }
        public int IdValue
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
        public int Flag
        {
            get
            {
                return flag;
            }
            set
            {
                flag = value;
            }

        }

        public string CategoryImage
        {
            get
            {
                return categoryImage;
            }
            set
            {
                categoryImage = value;
            }

        }
    }
}
