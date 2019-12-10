
namespace ClsLibrary.PropertyLayer
{
    public class PropPaymentPlan
    {
        private int id;
        private string planName;
        private double cost;
        private int duration;
        public int IDValue
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
        public string PlanName
        {
            get
            {
                return planName;
            }
            set
            {
                planName = value;

            }
        }

        public double Cost
        {
            get
            {
                return cost;
            }
            set
            {
                cost = value;
            }
        }
        public int Duration
        {
            get
            {
                return duration;
            }
            set
            {
                duration = value;

            }
        }
    }
}
