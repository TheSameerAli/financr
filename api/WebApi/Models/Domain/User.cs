using System;

namespace WebApi.Models.Domain
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }

        public User(Guid id, string email, string token)
        {
            Id = id;
            Email = email;
            Token = token;
        }
    }
}