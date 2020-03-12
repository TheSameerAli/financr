using WebApi.Models.Domain;

namespace WebApi.Models.DTO.Requests
{
    public class CreateAccountRequest
    {
        public string Name { get; set; }
        public AccountType Type { get; set; }
        public double InitialAmount { get; set; }
    }
}