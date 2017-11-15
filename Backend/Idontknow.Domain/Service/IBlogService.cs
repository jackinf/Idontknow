using System.Collections.Generic;
using System.Threading.Tasks;
using Idontknow.Domain.ViewModels.Blog;

namespace Idontknow.Domain.Service
{
    public interface IBlogService
    {
        Task<bool> CreateBlog(string url, int rating);

        Task<bool> CreatePost(string title, string content, int blogId);

        Task<List<GetBlogsViewModel>> GetBlogs(int rating);

        Task<List<GetPostsViewModel>> GetPosts(int blogId);
    }
}