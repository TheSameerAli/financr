using System;
using WebApi.Models.Database;

namespace WebApi.Models.DTO.Requests
{
    public class CreateAccountCategoryRequest
    {
        public string Name { get; set; }
        public AccountCategoryType Type { get; set; } 
    }
}