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
    [Route("api/blog")]
    public class BlogController : BaseController
    {
        private readonly IBlogService _service;

        public BlogController(IBlogService service, ILogger logger) : base(logger)
        {
            _service = service;
        }
        
        [HttpGet("get-blogs")]
        public async Task<IActionResult> GetBlogs(GetBlogsRequestViewModel viewModel) 
            => await HandleResultAsync(() => _service.GetBlogs(viewModel));

        [HttpPost("add-blogs")]
        public async Task<IActionResult> AddBlog(AddBlogRequestViewModel viewModel)
            => await HandleResultAsync(() => _service.CreateBlog(viewModel));
    }
}