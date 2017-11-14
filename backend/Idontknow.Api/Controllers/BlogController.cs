﻿using AspNet.Security.OAuth.Validation;
using Idontknow.DAL.Domain.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Idontknow.Api.Controllers
{
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    [Route("api/blog")]
    public class BlogController : Controller
    {
        private readonly IBlogRepository _repository;

        public BlogController(IBlogRepository repository)
        {
            _repository = repository;
        }
        
        [HttpGet]
        public IActionResult GetAll(int rating)
        {
            var blogs = _repository.GetAll(rating);
            return Ok(blogs);
        }
        
        [HttpPost]
        public IActionResult Add([FromBody] string url)
        {
            _repository.Add(url);
            return Ok();
        }
    }
}