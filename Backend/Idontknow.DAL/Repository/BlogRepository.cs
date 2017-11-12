using System;
using System.Collections.Generic;
using System.Linq;
using Idontknow.DAL.Domain.Repository;
using Idontknow.DAL.Model;
using Microsoft.EntityFrameworkCore;

namespace Idontknow.DAL.Repository
{
    public class BlogRepository : IBlogRepository
    {
        private readonly ApplicationDbContext _context;

        public BlogRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public List<Blog> GetAll(int rating)
        {
            return _context.Blogs
                .Where(b => b.Rating > rating)
                .OrderBy(b => b.Url)
                .ToList();
        }

        public void Add(string url)
        {
            var blog = new Blog { Url = url, Rating = new Random().Next(1, 5) };
            _context.Blogs.Add(blog);
            _context.SaveChanges();
        }
    }
}