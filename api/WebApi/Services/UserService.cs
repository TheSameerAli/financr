using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApi.Configuration;
using WebApi.Context;
using WebApi.Models.Domain;
using WebApi.Utilities.Hasher;

namespace WebApi.Services
{
    public interface IUserService
    {
        User Authenticate(string email, string password);
    }
    public class UserService : IUserService
    {
        private DbSet<Models.Database.User> _users;
        private IUnitOfWork _uow;
        public UserService(IUnitOfWork uow)
        {
            _uow = uow;
            _users = _uow.Set<Models.Database.User>();
        }
        
        public User Authenticate(string email, string password)
        {
            var pwdHasher = new PasswordHasher();
            var user = _users.SingleOrDefault(x => x.Email == email);
            if (user == null)
            {
                return null;
            }
            (bool verified, bool needsUpgrade) = pwdHasher.Check(user.Password, password);
            if (!verified)
            {
                return null;
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(AppSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            tokenDescriptor.Expires = DateTime.UtcNow.AddDays(7);
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var userToReturn = new User(user.Id, user.Email, tokenHandler.WriteToken(token));
            return userToReturn;
        }
    }
}