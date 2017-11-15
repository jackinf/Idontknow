using AspNet.Security.OAuth.Validation;
using Idontknow.DAL.Domain.Repository;
using Idontknow.Domain.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Idontknow.Api.Controllers
{
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    [Route("api/blog")]
    public class BlogController : Controller
    {
        private readonly IBlogService _service;

        public BlogController(IBlogService service)
        {
            _service = service;
        }
        
        [HttpGet]
        public IActionResult GetBlogs(int rating)
        {
            var blogs = _service.GetBlogs(rating);
            return Ok(blogs);
        }
        
        [HttpPost]
        public IActionResult Add([FromBody] string url, [FromBody] int rating)
        {
            _service.CreateBlog(url, rating);
            return Ok();
        }
    }
}