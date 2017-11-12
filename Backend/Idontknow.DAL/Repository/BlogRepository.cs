using System.Collections.Generic;
using System.Linq;
using Idontknow.DAL.Model;
using Microsoft.EntityFrameworkCore;

namespace Idontknow.DAL.Repository
{
    public class BlogRepository
    {
        public List<Blog> GetAll(int rating)
        {
            using (var db = new ApplicationDbContext())
            {
                return db.Blogs
                    .Where(b => b.Rating > rating)
                    .OrderBy(b => b.Url)
                    .ToList();
            }
        }

        public void Add(string url)
        {
            using (var db = new ApplicationDbContext())
            {
                var blog = new Blog { Url = url };
                db.Blogs.Add(blog);
                db.SaveChanges();
            }
        }
    }
}