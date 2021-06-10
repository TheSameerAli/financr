using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using WebApi.Context;
using WebApi.Services;

namespace WebApi.Configuration
{
    public static class StartupServices
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, ApplicationDbContext>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IAccountCategoryService, AccountCategoryService>();
            services.AddScoped<ITransactionService, TransactionService>();
            services.AddScoped<IFinancialHealthService, FinancialHealthService>();
            services.AddScoped<IDashboardService, DashboardService>();
            services.AddScoped<IRecurringTransactionsService, RecurringTransactionsService>();
            services.AddScoped<IChartingService, ChartingService>();
            services.AddScoped<IReportService, ReportService>();
            services.AddScoped<ICurrencyConversionService, CurrencyConversionService>();
            return services;
        }

        public static IServiceCollection AddAuthenticationService(this IServiceCollection services, byte[] key)
        {
            services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            return services;
        }

        public static IServiceCollection AddMvcService(this IServiceCollection services)
        {
            services.AddMvc()
                .AddJsonOptions(options => {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            return services;
        }
    }
}