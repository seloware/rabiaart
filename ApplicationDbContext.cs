using Microsoft.EntityFrameworkCore;
using RabiaArt.Models;

namespace RabiaArt.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Admin> Admins { get; set; }
        public DbSet<Artwork> Artworks { get; set; }
        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Admin tablosu için seed data
            modelBuilder.Entity<Admin>().HasData(
                new Admin
                {
                    Id = 1,
                    Username = "admin",
                    Email = "dogruozrabia98@gmail.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("admin123") // Gerçek uygulamada daha güçlü bir şifre kullanın
                }
            );

            // Artwork tablosu için indexler
            modelBuilder.Entity<Artwork>()
                .HasIndex(a => a.Category);

            modelBuilder.Entity<Artwork>()
                .HasIndex(a => a.CreatedAt);

            // Contact tablosu için indexler
            modelBuilder.Entity<Contact>()
                .HasIndex(c => c.IsRead);

            modelBuilder.Entity<Contact>()
                .HasIndex(c => c.CreatedAt);
        }
    }
} 