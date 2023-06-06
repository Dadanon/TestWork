using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace TestWork.Models
{
    public class TestWorkContext : DbContext
    {
        public TestWorkContext(DbContextOptions<TestWorkContext> options) : base(options) { }
        public DbSet<Drink> Drinks { get; set; }
        public DbSet<Coin> Coins { get; set; }
    }
}
