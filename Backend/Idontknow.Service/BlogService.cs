using System.Collections.Generic;
using System.Threading.Tasks;
using Idontknow.DAL.Domain.Repository;
using Idontknow.Domain.Service;
using Idontknow.Domain.ViewModels.Blog;

namespace Idontknow.Service
{
    public class BlogService : IBlogService
    {
        private readonly IBlogRepository _repository;

        public BlogService(IBlogRepository repository)
        {
            _repository = repository;
        }
        
        public async Task<bool> CreateBlog(string url, int rating)
        {
            await _repository.AddBlog(url, rating);
            return true;
        }

        public async Task<bool> CreatePost(string title, string content, int blogId)
        {
            await _repository.AddPost(title, content, blogId);
            return true;
        }

        public async Task<List<GetBlogsViewModel>> GetBlogs(int rating)
        {
            var blogs = await _repository.GetBlogs(rating);
            return blogs;
        }

        public async Task<List<GetPostsViewModel>> GetPosts(int blogId)
        {
            var posts = await _repository.GetPosts(blogId);
            return posts;
        }
    }
}