using System;
using Idontknow.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Idontknow.IntegrationTests.Utils
{
    public class DbContextHelper
    {
        public static string TestConnectionString { get; } = "Server=.;Database=Idontknow_test;Trusted_Connection=True;";
                
        public static DbContextOptions<ApplicationDbContext> GetApplicationDbContext()
        {
            DbContextOptions<ApplicationDbContext> options = 
                new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseSqlServer(TestConnectionString)
                .Options;
            return options;
        }
    }
}