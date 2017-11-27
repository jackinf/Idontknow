using System;
using Idontknow.Api;
using Idontknow.DAL;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Idontknow.IntegrationTests.Utils
{
    public class ApiServerFixture
    {
        public static readonly ApiServerFixture Current = new ApiServerFixture();
        
        public TestServer Server { get; }
        
        private ApiServerFixture()
        {
            var builder = new WebHostBuilder()
                .ConfigureLogging(options => options.AddConsole())
                .UseStartup<Startup>()
                .ConfigureServices(collection => collection.AddDbContext<ApplicationDbContext>(options =>
                    {
                        options.UseSqlServer(DbContextHelper.TestConnectionString); // TODO: take from config file or use inmemory database
                        options.UseOpenIddict(); // There's no need to specify that
                    })
                );
            Server = new TestServer(builder);
        }

        public void DoDatabaseOperation(Action<ApplicationDbContext> action)
        {
            using (ApplicationDbContext db = new ApplicationDbContext(DbContextHelper.GetApplicationDbContext()))
            {
                action(db);
            }
        }

        ~ApiServerFixture()
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