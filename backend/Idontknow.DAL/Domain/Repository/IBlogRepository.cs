using System.Collections.Generic;
using System.Threading.Tasks;
using Idontknow.Domain.ViewModels.Blog;

namespace Idontknow.DAL.Domain.Repository
{
    public interface IBlogRepository
    {
        Task<List<GetBlogsViewModel>> GetBlogs(int rating);
        
        Task<List<GetPostsViewModel>> GetPosts(int blogId);

        Task AddBlog(string url, int rating);
        
        Task AddPost(string title, string content, int blogId);
    }
}