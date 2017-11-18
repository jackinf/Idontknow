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
                    Url = x.Url,
                    Rating = x.Rating
                });
            
            return await query.ToPaginatedListResultForViewModelAsync(viewModel);
        }

        public async Task AddBlog(AddBlogRequestViewModel viewModel)
        {
            await _context.Blogs.AddAsync(new Blog { Url = viewModel.Url, Rating = viewModel.Rating });
            await _context.SaveChangesAsync();
        }


    }
}