using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Idontknow.Api;
using Idontknow.Domain.ViewModels.Service.Account;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Xunit;

namespace Idontknow.IntegrationTests.Feature.Authentification
{
    public class when_user_is_registered
    {
        private TestServer _server;
        private HttpClient _client;

        public when_user_is_registered()
        {
            _server = new TestServer(new WebHostBuilder()
                .ConfigureLogging(options => options.AddConsole())
                .UseStartup<Startup>());
            _client = _server.CreateClient();
            
            // Register
            var requestDataOne = new { Email = "test1@test.com", Password = "123456aA!" };
            var contentOne = new StringContent(JsonConvert.SerializeObject(requestDataOne), Encoding.UTF8, "application/json");
            var resultOne = _client.PostAsync("/Account/Register", contentOne).Result;
            resultOne.EnsureSuccessStatusCode();
            
            // Login
            var requestDataTwo = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("grant_type", "password"),
                new KeyValuePair<string, string>("username", "test@test.com"),
                new KeyValuePair<string, string>("password", "123456aA!")
            };
            var contentTwo = new FormUrlEncodedContent(requestDataTwo);
            var resultTwo = _client.PostAsync("/connect/token", contentTwo).Result;
            resultTwo.EnsureSuccessStatusCode();
            var responseContent = resultTwo.Content.ReadAsStringAsync().Result;
            var token = requestDataOne;
            
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", $"Bearer {token}");
        }
        
        [Fact]
        public void user_should_be_able_to_access_restricted_paths()
        {
            var resultThree = _client.GetAsync("/api/blogs").Result;
            resultThree.EnsureSuccessStatusCode();
        }
    }
}