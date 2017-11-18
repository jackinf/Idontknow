using System.Threading.Tasks;
using Idontknow.Domain.ViewModels.Result;
using Idontknow.Domain.ViewModels.Service.Blog;

namespace Idontknow.Domain.Repository
{
    public interface IPostRepository
    {
        Task<PaginatedListResult<GetPostsResultViewModel>> GetPosts(int blogId, GetPostsRequestViewModel viewModel);
        
        Task AddPost(int blogId, AddPostRequestViewModel viewModel);

    }
}