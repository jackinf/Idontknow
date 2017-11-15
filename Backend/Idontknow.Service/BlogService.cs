using System.Collections.Generic;
using System.Threading.Tasks;
using Idontknow.DAL.Domain.Repository;
using Idontknow.Domain.Factory;
using Idontknow.Domain.Service;
using Idontknow.Domain.ViewModels.Result;
using Idontknow.Domain.ViewModels.Service.Blog;

namespace Idontknow.Service
{
    public class BlogService : IBlogService
    {
        private readonly IBlogRepository _repository;

        public BlogService(IBlogRepository repository)
        {
            _repository = repository;
        }
        
        //
        // Blogs
        
        public async Task<ServiceResult<List<GetBlogsResponseViewModel>>> GetBlogs(GetBlogsRequestViewModel viewModel)
        {
            var paginatedListResult = await _repository.GetBlogs(viewModel);
            return ServiceResultFactory.SuccessWithPaginator(paginatedListResult);
        }
        
        public async Task<ServiceResult<bool>> CreateBlog(AddBlogRequestViewModel viewModel)
        {
            await _repository.AddBlog(viewModel);
            return ServiceResultFactory.Success(true);
        }
        
        //
        // Posts
        
        public async Task<ServiceResult<List<GetPostsResultViewModel>>> GetPosts(GetPostsRequestViewModel viewModel)
        {
            var posts = await _repository.GetPosts(viewModel);
            return ServiceResultFactory.SuccessWithPaginator(posts);
        }

        public async Task<ServiceResult<bool>> CreatePost(AddPostRequestViewModel viewModel)
        {
            await _repository.AddPost(viewModel);
            return ServiceResultFactory.Success(true);
        }
    }
}