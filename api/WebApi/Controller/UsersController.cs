using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http;
using WebApi.Models.DTO.Requests;
using WebApi.Services;

namespace WebApi.Controller
{
    [ApiController]
    [Route("user")]
    public class UsersController : ControllerBase
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
                return BadRequest(new {message = "Incorrect username or password"});
            }

            return Ok(user);
        }
    }
}