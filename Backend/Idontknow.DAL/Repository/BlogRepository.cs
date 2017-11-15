using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Idontknow.DAL.Domain.Repository;
using Idontknow.DAL.Model;
using Idontknow.Domain.ViewModels.Blog;
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

        public void Add(string url, int rating)
        {
            var blog = new Blog { Url = url, Rating = rating };
            _context.Blogs.Add(blog);
            _context.SaveChanges();
        }

        public async Task<List<GetBlogsViewModel>> GetBlogs(int rating)
        {
            return await _context.Blogs
                .Where(b => b.Rating > rating)
                .OrderBy(b => b.Url)
                .Select(x => new GetBlogsViewModel
                {
                    Url = x.Url,
                    Rating = x.Rating
                })
                .ToListAsync();
        }

        public async Task<List<GetPostsViewModel>> GetPosts(int blogId)
        {
            return await _context.Posts
                .Where(x => x.BlogId == blogId)
                .Select(x => new GetPostsViewModel
                {
                    PostId = x.PostId,
                    Title = x.Title,
                    Content = x.Content
                })
                .ToListAsync();
        }

        public async Task AddBlog(string url, int rating)
        {
            await _context.Blogs.AddAsync(new Blog { Url = url, Rating = rating });
            await _context.SaveChangesAsync();
        }

        public async Task AddPost(string title, string content, int blogId)
        {
            await _context.Posts.AddAsync(new Post { Title = title, Content = content, BlogId = blogId });
            await _context.SaveChangesAsync();
        }
    }
}