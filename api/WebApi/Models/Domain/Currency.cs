using WebApi.Configuration;

namespace WebApi.Models.Domain
{
    public class Currency
    {
        public string Symbol { get; set; }
        public string Name { get; set; }
        public string SymbolNative { get; set; }
        public int DecimalDigits { get; set; }
        public double Rounding { get; set; }
        public string Code { get; set; }
        public string NamePlural { get; set; }

        public Currency(string symbol, string name, string symbolNative, int decimalDigits, double rounding, string code,
            string namePlural)
        {
            Symbol = symbol;
            Name = name;
            SymbolNative = symbolNative;
            DecimalDigits = decimalDigits;
            Rounding = rounding;
            Code = code;
            NamePlural = namePlural;
        }
    }
}