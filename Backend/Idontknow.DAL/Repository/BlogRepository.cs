using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Idontknow.DAL.Domain.Repository;
using Idontknow.DAL.Model;
using Idontknow.Domain.Extension;
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

        public async Task AddBlog(AddBlogRequestViewModel viewModel)
        {
            await _context.Blogs.AddAsync(new Blog { Url = viewModel.Url, Rating = viewModel.Rating });
            await _context.SaveChangesAsync();
        }

        public async Task AddPost(AddPostRequestViewModel viewModel)
        {
            await _context.Posts.AddAsync(new Post { Title = viewModel.Title, Content = viewModel.Content, BlogId = viewModel.BlogId });
            await _context.SaveChangesAsync();
        }
    }
}