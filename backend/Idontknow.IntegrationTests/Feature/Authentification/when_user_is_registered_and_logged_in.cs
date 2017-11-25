using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Idontknow.Api;
using Idontknow.DAL;
using Idontknow.Domain.Dtos;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Xunit;

namespace Idontknow.IntegrationTests.Feature.Authentification
{
    public class when_user_is_registered : prepare_database
    {
        private readonly HttpClient _client;

        public when_user_is_registered()
        {
            var builder = new WebHostBuilder()
                .ConfigureLogging(options => options.AddConsole())
                .UseStartup<Startup>()
                .ConfigureServices(collection => collection.AddDbContext<ApplicationDbContext>(DefineDbContextOptions)
            );
            var server = new TestServer(builder);
            _client = server.CreateClient();
            
            // Register
            var email = $"test{Guid.NewGuid()}@test.com";
            var requestDataOne = new { Email = email, Password = "123456aA!" };
            var contentOne = new StringContent(JsonConvert.SerializeObject(requestDataOne), Encoding.UTF8, "application/json");
            var resultOne = _client.PostAsync("/Account/Register", contentOne).Result;
            resultOne.EnsureSuccessStatusCode();
            
            // Login
            var requestDataTwo = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("grant_type", "password"),
                new KeyValuePair<string, string>("username", email),
                new KeyValuePair<string, string>("password", "123456aA!")
            };
            var contentTwo = new FormUrlEncodedContent(requestDataTwo);
            var resultTwo = _client.PostAsync("/connect/token", contentTwo).Result;
            resultTwo.EnsureSuccessStatusCode();
            string responseContentStr = resultTwo.Content.ReadAsStringAsync().Result;
            var responseContent = JsonConvert.DeserializeObject<OpenIddictSignInResult>(responseContentStr);
            
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(responseContent.TokenType, responseContent.AccessToken);
        }

        [Fact]
        public void user_should_be_able_to_access_restricted_paths()
        {
            var resultThree = _client.GetAsync("/api/blogs").Result;
            resultThree.EnsureSuccessStatusCode();
        }
    }

    public abstract class prepare_database
    {
        private const string TestConnectionString = "Server=.;Database=Idontknow_test;Trusted_Connection=True;"; // TODO: take from config file or use inmemory database
        
        protected static readonly Action<DbContextOptionsBuilder> DefineDbContextOptions = options =>
        {
            options.UseSqlServer(TestConnectionString);
            options.UseOpenIddict(); // There's no need to specify that
        };
    }
}