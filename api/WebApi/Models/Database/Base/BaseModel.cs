using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Database.Base
{
    public class BaseModel
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
    }
}