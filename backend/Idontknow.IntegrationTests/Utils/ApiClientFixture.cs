using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Idontknow.Api;
using Idontknow.DAL;
using Idontknow.Domain.Dtos;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Idontknow.IntegrationTests.Utils
{
    public sealed class ApiClientFixture
    {
        public static readonly ApiClientFixture Current = new ApiClientFixture();

        public HttpClient Client { get; }
        
        private ApiClientFixture()
        {
            Client = ApiServerFixture.Current.Server.CreateClient();
            
            // Register
            var email = $"test{Guid.NewGuid()}@test.com";
            var requestDataOne = new { Email = email, Password = "123456aA!" };
            var contentOne = new StringContent(JsonConvert.SerializeObject(requestDataOne), Encoding.UTF8, "application/json");
            var resultOne = Client.PostAsync("/Account/Register", contentOne).Result;
            resultOne.EnsureSuccessStatusCode();
            
            // Login
            var requestDataTwo = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("grant_type", "password"),
                new KeyValuePair<string, string>("username", email),
                new KeyValuePair<string, string>("password", "123456aA!")
            };
            var contentTwo = new FormUrlEncodedContent(requestDataTwo);
            var resultTwo = Client.PostAsync("/connect/token", contentTwo).Result;
            resultTwo.EnsureSuccessStatusCode();
            string responseContentStr = resultTwo.Content.ReadAsStringAsync().Result;
            var responseContent = JsonConvert.DeserializeObject<OpenIddictSignInResult>(responseContentStr);
            
            Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(responseContent.TokenType, responseContent.AccessToken);
        }
        
        public async Task<TResult> HttpGet<TResult>(string requestUri, Dictionary<string, string> parameters = null)
        {
            if (parameters != null)
                requestUri = Microsoft.AspNetCore.WebUtilities.QueryHelpers.AddQueryString(requestUri, parameters);

            var httpResult = await Client.GetAsync(requestUri);
            httpResult.EnsureSuccessStatusCode();
            var serializedResult = await httpResult.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<TResult>(serializedResult);
            return result;
        }

        public async Task<TResult> HttpPostJson<TResult>(string requestUri, object value)
        {
            var contentOne = new StringContent(JsonConvert.SerializeObject(value), Encoding.UTF8, "application/json");
            var httpResult = await Client.PostAsync(requestUri, contentOne);
            httpResult.EnsureSuccessStatusCode();
            
            var serializedResult = await httpResult.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<TResult>(serializedResult);
            return result;
        }

        ~ApiClientFixture()
        {
            Dispose();
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);

            // Run at end
        }        
    }
}