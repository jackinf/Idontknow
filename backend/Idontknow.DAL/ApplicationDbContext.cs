using System;
using Idontknow.DAL.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Idontknow.DAL
{
    public class Role : IdentityRole<string> { }
    public class ApplicationUser : IdentityUser<string>{ }

    /// <summary>
    /// Custom names possible thanks to this https://github.com/aspnet/Identity/issues/892
    /// </summary>
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, Role, string>, IEquatable<ApplicationDbContext>
    {
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Post> Posts { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {            
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=.;Database=Idontknow;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>().ToTable("User");
            builder.Entity<Role>().ToTable("Role");
            builder.Entity<IdentityUserRole<string>>().ToTable("UserRole");
            builder.Entity<IdentityUserClaim<string>>().ToTable("UserClaim");
            builder.Entity<IdentityUserLogin<string>>().ToTable("UserLogin");
            builder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaim");
            builder.Entity<IdentityUserToken<string>>().ToTable("UserToken");
        }

        public bool Equals(ApplicationDbContext other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return Equals(Blogs, other.Blogs) && Equals(Posts, other.Posts);
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((ApplicationDbContext) obj);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                return ((Blogs != null ? Blogs.GetHashCode() : 0) * 397) ^ (Posts != null ? Posts.GetHashCode() : 0);
            }
        }
    }
}