using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hbeauty.aspnetcore2.Models
{
    public class DatabaseContext:DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) :base(options)
        { }

        public DbSet<ServiceItem> ServiceItem { get; set; }
        public DbSet<ServiceItemImage> ServiceItemImage { get; set; }
        public DbSet<ServiceItemVideo> ServiceItemVideo { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ServiceItem>().HasKey(m => m.Id);
            builder.Entity<ServiceItemImage>().HasKey(m => m.Id);
            builder.Entity<ServiceItemVideo>().HasKey(m => m.Id);
            
            builder.Entity<ServiceItemImage>()
                .HasOne(o => o.ServiceItem)
                .WithMany(o => o.Images)
                .HasForeignKey(o => o.ServiceItemId);

            builder.Entity<ServiceItemVideo>()
                .HasOne(o => o.ServiceItem)
                .WithMany(o => o.Videos)
                .HasForeignKey(o => o.ServiceItemId);

            /*
            builder.Entity<ServiceItem>()
                .HasMany(p => p.Images)
                .WithOne(p => p.ServiceItem)
                .HasForeignKey(p => p.ServiceItemId);

            builder.Entity<ServiceItem>()
                .HasMany(p => p.Videos)
                .WithOne(p => p.ServiceItem)
                .HasForeignKey(p => p.ServiceItemId);
             */
            base.OnModelCreating(builder);
        }
    }
}
