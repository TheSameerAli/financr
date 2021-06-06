using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApi.Configuration;
using WebApi.Context;
using WebApi.Models.Database;
using WebApi.Utilities.Hasher;
using User = WebApi.Models.Domain.User;

namespace WebApi.Services
{
    public interface IUserService
    {
        User Authenticate(string email, string password);
        Task<UserPreferences> ChangeCurrency(string currencyCode, Guid userId);
        Task<UserPreferences> GetPreferences(Guid userId);
    }
    public class UserService : IUserService
    {
        private DbSet<Models.Database.User> _users;
        private DbSet<UserPreferences> _userPreferences;
        private IUnitOfWork _uow;
        public UserService(IUnitOfWork uow)
        {
            _uow = uow;
            _users = _uow.Set<Models.Database.User>();
            _userPreferences = _uow.Set<UserPreferences>();
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

        public async Task<UserPreferences> ChangeCurrency(string currencyCode, Guid userId)
        {
            var userPreferences = await _userPreferences.FirstOrDefaultAsync(u => u.UserId == userId);
            if (userPreferences == null)
            {
                throw new InvalidDataException("Unable to change user preferences for this user");
            }

            if (!Currencies.IsValid(currencyCode))
            {
                throw new InvalidDataException("Invalid Currency Provided");
            }

            userPreferences.Currency = currencyCode;
            await _uow.SaveChangesAsync();
            return userPreferences;
        }

        public async Task<UserPreferences> GetPreferences(Guid userId)
        {
            return await _userPreferences.FirstOrDefaultAsync(u => u.UserId == userId);
        }
    }
}