using System.Net.Http;
using Microsoft.AspNetCore.TestHost;
using Xunit;

namespace Idontknow.IntegrationTests.Feature.Blogging
{
    public class when_blog_is_added
    {
        private TestServer _server;
        private HttpClient _client;

        public when_blog_is_added()
        {
            // TODO: post
        }
        
        [Fact]
        public void then_blog_should_be_in_database()
        {
            // TODO: get
        }
    }
}