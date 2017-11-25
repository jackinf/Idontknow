using System.Linq;
using System.Threading.Tasks;
using Idontknow.DAL.Model;
using Idontknow.Domain.Extension;
using Idontknow.Domain.Repository;
using Idontknow.Domain.ViewModels.Result;
using Idontknow.Domain.ViewModels.Service.Blog;

namespace Idontknow.DAL.Repository
{
    public class BlogRepository : IBlogRepository
    {
        private readonly ApplicationDbContext _context;

        public BlogRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<PaginatedListResult<GetBlogsResponseViewModel>> GetBlogs(GetBlogsRequestViewModel viewModel)
        {
            var query = _context.Blogs
                .Where(b => b.Rating > viewModel.Rating)
                .OrderBy(b => b.Url)
                .Select(x => new GetBlogsResponseViewModel
                {
                    Id = x.BlogId,
                    Url = x.Url,
                    Rating = x.Rating
                });
            
            return await query.ToPaginatedListResultForViewModelAsync(viewModel);
        }

        public async Task<int> AddBlog(AddBlogRequestViewModel viewModel)
        {
            var newBlog = await _context.Blogs.AddAsync(new Blog { Url = viewModel.Url, Rating = viewModel.Rating });
            await _context.SaveChangesAsync();
            return newBlog.Entity.BlogId;
        }

        public async Task UpdateBlog(int blogId, UpdateBlogRequestViewModel viewModel)
        {
            var blog = _context.Blogs.Single(x => x.BlogId == blogId);
            blog.Url = viewModel.Url;
            blog.Rating = viewModel.Rating;
            await _context.SaveChangesAsync();
        }
    }
}