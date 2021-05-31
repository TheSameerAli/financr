using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebApi.Models.Domain;

namespace WebApi.Configuration
{
    public class Currencies
    {
        public static List<Currency> GetCurrencies()
        {
            var currencyListFilePath = Directory.GetCurrentDirectory() + "/currencies.json";
            var fileText = File.ReadAllText(currencyListFilePath);
            return JsonConvert.DeserializeObject<List<Currency>>(fileText);
        }

        public static bool IsValid(string currency)
        {
            return GetCurrencies().Any(c => c.Symbol == currency);
        }
    }
}