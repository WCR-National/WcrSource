
namespace ClsLibrary.PropertyLayer
{
    public class PropSubcategory
    {
        private int categoryID;
        private string subCategoryName;
        public int flag { get; set; }
        public int ID { get; set; }
        public int CategoryIDValue
        {
            get
            {
                return categoryID;
            }
            set
            {
                categoryID = value;
            }
        }
        public string SubCategoryNameValue
        {
            get
            {
                return subCategoryName;
            }
            set
            {
                subCategoryName = value;

            }
        }

    }
}
