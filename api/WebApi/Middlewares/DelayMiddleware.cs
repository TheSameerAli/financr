using System.Globalization;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace WebApi.Middlewares
{
    public class DelayMiddleware
    {
        private readonly RequestDelegate _next;

        public DelayMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            Thread.Sleep(1000);

            // Call the next delegate/middleware in the pipeline
            await _next(context);
        }
    }
}