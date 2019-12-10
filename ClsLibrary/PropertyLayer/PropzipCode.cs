namespace ClsLibrary.PropertyLayer
{
    public class PropzipCode
    {
        public int ID { get; set; }
        public string ZipCode { get; set; }
        public string Name { get; set; }
        public string email { get; set; }
        public string IsSoldOut { get; set; }
        public int associateID { get; set; }
        public int StateID { get; set; }
        public int CityId { get; set; }
        public int CountryID { get; set; }

        public int flag { get; set; }
    }
}
