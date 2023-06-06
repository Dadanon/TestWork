using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace TestWork.Models
{
    public class Coin
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public int Denomination { get; set; }
        public bool IsBlocked { get; set; } = false;
    }
}
