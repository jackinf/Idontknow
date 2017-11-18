using System.Linq;
using System.Threading.Tasks;
using Idontknow.DAL.Model;
using Idontknow.Domain.Extension;
using Idontknow.Domain.Repository;
using Idontknow.Domain.ViewModels.Result;
using Idontknow.Domain.ViewModels.Service.Blog;

namespace Idontknow.DAL.Repository
{
    public class PostRepository : IPostRepository
    {
        private readonly ApplicationDbContext _context;

        public PostRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<PaginatedListResult<GetPostsResultViewModel>> GetPosts(GetPostsRequestViewModel viewModel)
        {
            var query = _context.Posts
                .Where(x => x.BlogId == viewModel.BlogId)
                .Select(x => new GetPostsResultViewModel
                {
                    PostId = x.PostId,
                    Title = x.Title,
                    Content = x.Content
                });
            
            return await query.ToPaginatedListResultForViewModelAsync(viewModel);
        }
        
        public async Task AddPost(AddPostRequestViewModel viewModel)
        {
            await _context.Posts.AddAsync(new Post { Title = viewModel.Title, Content = viewModel.Content, BlogId = viewModel.BlogId });
            await _context.SaveChangesAsync();
        }
    }
}