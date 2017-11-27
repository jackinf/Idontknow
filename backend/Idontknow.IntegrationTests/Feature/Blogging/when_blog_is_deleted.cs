using System.Collections.Generic;
using System.Linq;
using Idontknow.DAL.Model;
using Idontknow.Domain.ViewModels.Result;
using Idontknow.Domain.ViewModels.Service.Blog;
using Idontknow.IntegrationTests.Utils;
using Xunit;

namespace Idontknow.IntegrationTests.Feature.Blogging
{
    public class when_blog_is_deleted
    {
        private int _deletedBlogId;
        private const string RequestUri = "/api/blogs";
        
        public when_blog_is_deleted()
        {
            // arrange
            ApiServerFixture.Current.DoDatabaseOperation(context =>
            {
                var blog = context.Blogs.Add(new Blog {Url = "test", Rating = 3});
                context.SaveChanges();
                _deletedBlogId = blog.Entity.BlogId;
            });
            
            // act
            ApiClientFixture.Current.HttpDelete<ServiceResult<bool>>(
                RequestUri, 
                new Dictionary<string, string> {{"blogId", _deletedBlogId.ToString()}}
            ).Wait();
        }
        
        [Fact]
        public void then_blog_should_be_in_database()
        {
            // assert
            ApiServerFixture.Current.DoDatabaseOperation(context =>
            {
                var updatedBlog = context.Blogs.SingleOrDefault(blog => blog.BlogId == _deletedBlogId);
                Assert.Null(updatedBlog);
            });
        }
    }
}