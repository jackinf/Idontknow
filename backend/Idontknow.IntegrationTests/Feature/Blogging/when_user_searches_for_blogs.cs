using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Idontknow.DAL.Model;
using Idontknow.Domain.ViewModels.Result;
using Idontknow.Domain.ViewModels.Service.Blog;
using Idontknow.IntegrationTests.Utils;
using Xunit;

namespace Idontknow.IntegrationTests.Feature.Blogging
{
    public class when_user_searches_for_blogs
    {
        private const string RequestUri = "/api/blogs";
        private Blog blog1;
        private Blog blog2;
        private Blog blog3;
        private Blog blog4;
        private Blog blog5;
        
        public when_user_searches_for_blogs()
        {
            // arrange
            ApiServerFixture.Current.DoDatabaseOperation(context =>
            {
                context.Blogs.RemoveRange(context.Blogs);
                blog1 = context.Blogs.Add(new Blog {Rating = 1, Url = "www.test1.com"}).Entity;
                blog2 = context.Blogs.Add(new Blog {Rating = 2, Url = "www.test2.com"}).Entity;
                blog3 = context.Blogs.Add(new Blog {Rating = 3, Url = "www.test3.com"}).Entity;
                blog4 = context.Blogs.Add(new Blog {Rating = 4, Url = "www.test4.com"}).Entity;
                blog5 = context.Blogs.Add(new Blog {Rating = 5, Url = "www.test5.com"}).Entity;
                context.SaveChanges();
            });
        }
        
        [Fact]
        public async Task user_should_be_able_to_get_blogs_without_filters()
        {
            // act
            var result = await ApiClientFixture.Current.GetApiResult<ServiceResult<List<GetBlogsResponseViewModel>>>(
                RequestUri);
            
            // assert
            Assert.True(result.IsSuccessful);
            Assert.NotNull(result.Payload.SingleOrDefault(viewModel => viewModel.Id == blog1.BlogId));
            Assert.NotNull(result.Payload.SingleOrDefault(viewModel => viewModel.Id == blog2.BlogId));
            Assert.NotNull(result.Payload.SingleOrDefault(viewModel => viewModel.Id == blog3.BlogId));
            Assert.NotNull(result.Payload.SingleOrDefault(viewModel => viewModel.Id == blog4.BlogId));
            Assert.NotNull(result.Payload.SingleOrDefault(viewModel => viewModel.Id == blog5.BlogId));
        }
        
        [Fact]
        public async Task  user_should_be_able_to_find_blogs_by_rating()
        {
            // act
            var result = await ApiClientFixture.Current.GetApiResult<ServiceResult<List<GetBlogsResponseViewModel>>>(
                RequestUri, 
                new Dictionary<string, string> { { nameof(GetBlogsRequestViewModel.Rating), "3" } });
            
            // assert
            Assert.True(result.IsSuccessful);
            Assert.NotNull(result.Payload.SingleOrDefault(viewModel => viewModel.Id == blog4.BlogId));
            Assert.NotNull(result.Payload.SingleOrDefault(viewModel => viewModel.Id == blog5.BlogId));
        }
    }
}