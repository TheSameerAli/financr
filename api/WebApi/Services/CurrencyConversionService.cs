using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using WebApi.Context;
using WebApi.Models.Database;

namespace WebApi.Services
{
    public interface ICurrencyConversionService
    {
        Task<double> Convert(string pair, double value);
    }
    public class CurrencyConversionService : ICurrencyConversionService
    {
        private readonly IUnitOfWork _uow;
        private readonly IConfiguration _configuration;
        private readonly DbSet<CurrencyConversionRate> _currencyConversionRates;
        public CurrencyConversionService(IUnitOfWork uow, IConfiguration configuration)
        {
            _uow = uow;
            _currencyConversionRates = _uow.Set<CurrencyConversionRate>();
            _configuration = configuration;
        }
        public async Task<double> Convert(string pair, double value)
        {
            var pairValue = await GetPairValue(pair);
            return Math.Round(value * pairValue, 2);
        }

        private async Task<double> GetPairValue(string pair)
        {
            var foundPairRate = await _currencyConversionRates
                .Where(ccr => ccr.Pair == pair && ccr.CreatedAt.Date == DateTime.Now.Date).FirstOrDefaultAsync();
            if (foundPairRate == null)
            {
                return await RequestPairValue(pair);
            }

            return foundPairRate.Rate;
        }

        private async Task AddPairValue(string pair, double value)
        {
            var pairValue = new CurrencyConversionRate(pair, value);
            await _currencyConversionRates.AddAsync(pairValue);
            await _uow.SaveChangesAsync();
        }

        private async Task<double> RequestPairValue(string pair)
        {
            // Call the api to retrieve pair value
            var client = new HttpClient();
            var apiKey = _configuration["CurrencyConverter:API_KEY"];
            var apiCall = await client.GetAsync(
                $"https://free.currconv.com/api/v7/convert?q={pair}&compact=ultra&apiKey={apiKey}"); 
            var jsonObj = await apiCall.Content.ReadAsStringAsync(); 
            var value = JsonConvert.DeserializeObject<IDictionary<string, double>>(jsonObj);
            await AddPairValue(pair, value.Values.FirstOrDefault());
            return value.Values.FirstOrDefault();        
        }
    }
}