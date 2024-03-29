﻿using System.Collections.Generic;
using System.Xml.Schema;
using WebApi.Models.Database.Base;

namespace WebApi.Models.Database
{
    public class User : BaseModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        
        public virtual List<Account.Account> Accounts { get; set; }
        public virtual UserPreferences Preferences { get; set; }
        
        public User() {}

        public User(string email, string password)
        {
            Email = email;
            Password = password;
        }
    }
}