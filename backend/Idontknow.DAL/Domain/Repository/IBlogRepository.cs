using System.Collections.Generic;
using System.Threading.Tasks;
using Idontknow.Domain.ViewModels.Result;
using Idontknow.Domain.ViewModels.Service.Blog;

namespace Idontknow.DAL.Domain.Repository
{
    public interface IBlogRepository
    {
        Task<PaginatedListResult<GetBlogsResponseViewModel>> GetBlogs(GetBlogsRequestViewModel viewModel);
        
        Task<PaginatedListResult<GetPostsResultViewModel>> GetPosts(GetPostsRequestViewModel viewModel);

        Task AddBlog(AddBlogRequestViewModel viewModel);
        
        Task AddPost(AddPostRequestViewModel viewModel);
    }
}