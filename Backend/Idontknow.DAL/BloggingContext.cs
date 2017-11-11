using Idontknow.DAL.Model;
using Microsoft.EntityFrameworkCore;

namespace Idontknow.DAL
{
    public class BloggingContext : DbContext
    {
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Post> Posts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=.;Database=Idontknow;Trusted_Connection=True;");
        }
    }
}