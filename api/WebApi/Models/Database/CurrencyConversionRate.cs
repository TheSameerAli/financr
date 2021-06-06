using WebApi.Models.Database.Base;

namespace WebApi.Models.Database
{
    public class CurrencyConversionRate : BaseModel
    {
        public string Pair { get; set; }
        public double Rate { get; set; }

        public CurrencyConversionRate(string pair, double rate)
        {
            Pair = pair;
            Rate = rate;
        }
        
        public CurrencyConversionRate() {}
    }
}