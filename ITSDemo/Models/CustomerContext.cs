using ITSDemo.Configuration;
using Microsoft.EntityFrameworkCore;

namespace ITSDemo.Models
{
    public class CustomerContext : DbContext
    {
        public CustomerContext(DbContextOptions<CustomerContext> dbContext):base(dbContext)
        {

        }


        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CustomerConfiguration());
            base.OnModelCreating(modelBuilder);
        }
    }
}
