using System.Threading.Tasks;
using AspNet.Security.OAuth.Validation;
using Idontknow.Domain.Service;
using Idontknow.Domain.ViewModels.Service.Blog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Idontknow.Api.Controllers
{
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    [Route("api/blogs")]
    public class BlogController : BaseController
    {
        private readonly IBloggingService _service;

        public BlogController(
            ILogger<BlogController> logger, 
            IBloggingService service) : base(logger)
        {
            _service = service;
        }
        
        //
        // Blogs
        
        [HttpGet]
        public async Task<IActionResult> GetBlogs([FromQuery] GetBlogsRequestViewModel viewModel) 
            => await HandleResultAsync(() => _service.GetBlogs(viewModel));

        [HttpPost]
        public async Task<IActionResult> AddBlog([FromBody] AddBlogRequestViewModel viewModel)
            => await HandleResultAsync(() => _service.CreateBlog(viewModel));
        
        //
        // Posts
        
        [HttpGet("{blogId:int}")]
        public async Task<IActionResult> GetPosts([FromQuery] int blogId, [FromQuery] GetPostsRequestViewModel viewModel) 
            => await HandleResultAsync(() => _service.GetPosts(blogId, viewModel));

        [HttpPost("{blogId:int}")]
        public async Task<IActionResult> AddPost([FromQuery] int blogId, [FromBody] AddPostRequestViewModel viewModel)
            => await HandleResultAsync(() => _service.CreatePost(blogId, viewModel));
    }
}