using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http;
using WebApi.Controller.Base;
using WebApi.Models.DTO.Requests;
using WebApi.Services;

namespace WebApi.Controller
{
    [ApiController]
    [Authorize]
    [Route("user")]
    public class UsersController : BaseController
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticationRequest request)
        {
            var user = _userService.Authenticate(request.Email, request.Password);
            if (user == null)
            {
                return BadRequest(new {message = "Invalid email address or password. Please try again."});
            }

            return Ok(user);
        }

        [HttpPatch("change-currency")]
        public async Task<IActionResult> ChangeCurrency([FromBody] SetCurrencyRequest request)
        {
            return Ok(await _userService.ChangeCurrency(request.Currency, UserId));
        }

        [HttpGet("preferences")]
        public async Task<IActionResult> GetUserPreferences()
        {
            return Ok(await _userService.GetPreferences(UserId));
        }
    }
}