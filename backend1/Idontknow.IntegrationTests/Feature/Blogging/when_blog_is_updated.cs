using System.Collections.Generic;
using System.Linq;
using Idontknow.DAL.Model;
using Idontknow.Domain.ViewModels.Result;
using Idontknow.Domain.ViewModels.Service.Blog;
using Idontknow.IntegrationTests.Utils;
using Xunit;

namespace Idontknow.IntegrationTests.Feature.Blogging
{
    public class when_blog_is_updated
    {
        private int _updatedBlogId;
        private const string RequestUri = "/api/blogs";
        
        public when_blog_is_updated()
        {
            // arrange
            ApiServerFixture.Current.DoDatabaseOperation(context =>
            {
                var blog = context.Blogs.Add(new Blog {Url = "test", Rating = 3});
                context.SaveChanges();
                _updatedBlogId = blog.Entity.BlogId;
            });
            
            // act
            ApiClientFixture.Current.HttpPutJson<ServiceResult<bool>>(
                RequestUri, 
                new UpdateBlogRequestViewModel
                {
                    Rating = 6,
                    Url = "www.test6.com"
                }, 
                new Dictionary<string, string> {{"blogId", _updatedBlogId.ToString()}}
            ).Wait();
        }
        
        [Fact]
        public void then_blog_should_be_in_database()
        {
            // assert
            ApiServerFixture.Current.DoDatabaseOperation(context =>
            {
                var updatedBlog = context.Blogs.SingleOrDefault(blog => blog.BlogId == _updatedBlogId);
                Assert.NotNull(updatedBlog);
                Assert.Equal(6, updatedBlog.Rating);
                Assert.Equal("www.test6.com", updatedBlog.Url);
            });
        }
    }
}