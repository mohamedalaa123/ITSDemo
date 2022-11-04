using ITSDemo.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ITSDemo.Configuration
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(a => a.Class).HasMaxLength(1).IsRequired();
            builder.Property(b => b.Name).HasMaxLength(200).IsRequired();
            builder.Property(b => b.Comment).HasMaxLength(500).IsRequired();
            builder.Property(b => b.Email).HasMaxLength(100).IsRequired();

            builder.Property(b => b.Phone).HasMaxLength(11).IsRequired();


        }
    }
}
