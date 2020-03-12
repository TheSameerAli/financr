using System;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.JsonWebTokens;
using WebApi.Models.Database;

namespace WebApi.Controller.Base
{
    public class BaseController : Microsoft.AspNetCore.Mvc.Controller
    {
        protected Guid UserId { get; set; }

        public BaseController()
        {
        }
        
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var userId = context.HttpContext.User.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Name);
            UserId = userId != null ? Guid.Parse(userId.Value) : Guid.Empty;
            base.OnActionExecuting(context);
        }
    }
}