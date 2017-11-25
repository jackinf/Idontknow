using System.Linq;
using Idontknow.Domain.ViewModels.Result;
using Idontknow.Domain.ViewModels.Service.Blog;
using Idontknow.IntegrationTests.Utils;
using Xunit;

namespace Idontknow.IntegrationTests.Feature.Blogging
{
    public class when_blog_is_added
    {
        private readonly int _newBlogId;
        private const string RequestUri = "/api/blogs";
        
        public when_blog_is_added()
        {
            _newBlogId = ApiClientFixture.Current.HttpPostJson<ServiceResult<int>>(RequestUri, new AddBlogRequestViewModel
            {
                Rating = 4,
                Url = "www.test.com"
            }).Result.Payload;
        }
        
        [Fact]
        public void then_blog_should_be_in_database()
        {
            ApiServerFixture.Current.DoDatabaseOperation(context =>
            {
                Assert.True(context.Blogs.SingleOrDefault(blog => blog.BlogId == _newBlogId) != null);
            });
        }
    }
}