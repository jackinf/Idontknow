using System;
using AspNet.Security.OpenIdConnect.Primitives;
using Idontknow.DAL;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Idontknow.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        
        public IConfiguration Configuration { get; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            // TODO: use IConfiguration
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables()
                .Build();
            
            services.AddCors();
            services.AddMvc();    

            services.AddDbContext<ApplicationDbContext>(options =>
            {
                // Configure the context to use Microsoft SQL Server.
                var cs = configuration.GetConnectionString("DefaultConnection");
//                var cs = Configuration.GetConnectionString("DefaultConnection");
                options.UseSqlServer(cs);

                // Register the entity sets needed by OpenIddict.
                // Note: use the generic overload if you need
                // to replace the default OpenIddict entities.
                options.UseOpenIddict();
            });

            // Register the Identity services.
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Configure Identity to use the same JWT claims as OpenIddict instead
            // of the legacy WS-Federation claims it uses by default (ClaimTypes),
            // which saves you from doing the mapping in your authorization controller.
            services.Configure<IdentityOptions>(options =>
            {
                options.ClaimsIdentity.UserNameClaimType = OpenIdConnectConstants.Claims.Name;
                options.ClaimsIdentity.UserIdClaimType = OpenIdConnectConstants.Claims.Subject;
                options.ClaimsIdentity.RoleClaimType = OpenIdConnectConstants.Claims.Role;
            });

            // Register the OpenIddict services.
            services.AddOpenIddict(options =>
            {
                // Register the Entity Framework stores.
                options.AddEntityFrameworkCoreStores<ApplicationDbContext>();

                // Register the ASP.NET Core MVC binder used by OpenIddict.
                // Note: if you don't call this method, you won't be able to
                // bind OpenIdConnectRequest or OpenIdConnectResponse parameters.
                options.AddMvcBinders();

                // Enable the token endpoint.
                options.EnableTokenEndpoint("/connect/token");

                // Enable the password flow.
                options.AllowPasswordFlow();

                // During development, you can disable the HTTPS requirement.
                options.DisableHttpsRequirement();

                // Note: to use JWT access tokens instead of the default
                // encrypted format, the following lines are required:
                //
                // options.UseJsonWebTokens();
                // options.AddEphemeralSigningKey();
            });

            services.AddAuthentication()
                .AddOAuthValidation();

            // If you prefer using JWT, don't forget to disable the automatic
            // JWT -> WS-Federation claims mapping used by the JWT middleware:
            //
            // JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            // JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap.Clear();
            //
            // services.AddAuthentication()
            //     .AddJwtBearer(options =>
            //     {
            //         options.Authority = "http://localhost:58795/";
            //         options.Audience = "resource_server";
            //         options.RequireHttpsMetadata = false;
            //         options.TokenValidationParameters = new TokenValidationParameters
            //         {
            //             NameClaimType = OpenIdConnectConstants.Claims.Subject,
            //             RoleClaimType = OpenIdConnectConstants.Claims.Role
            //         };
            //     });

            // Alternatively, you can also use the introspection middleware.
            // Using it is recommended if your resource server is in a
            // different application/separated from the authorization server.
            //
            // services.AddAuthentication()
            //     .AddOAuthIntrospection(options =>
            //     {
            //         options.Authority = new Uri("http://localhost:58795/");
            //         options.Audiences.Add("resource_server");
            //         options.ClientId = "resource_server";
            //         options.ClientSecret = "875sqd4s5d748z78z7ds1ff8zz8814ff88ed8ea4z4zzd";
            //         options.RequireHttpsMetadata = false;
            //     });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, RoleManager<IdentityRole> roleManager)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseAuthentication();

            app.UseMvcWithDefaultRoute();

            app.UseWelcomePage();
            
            InitializeRoles(roleManager);
        }
        
        private void InitializeRoles(RoleManager<IdentityRole> roleManager)
        {
            try
            {
                string[] roles = new[] { "User", "Manager", "Administrator" };
                foreach (var role in roles)
                {
                    var roleExists = roleManager.RoleExistsAsync(role).Result;
                    if (!roleExists)
                    {
                        var newRole = new IdentityRole(role);
                        var res = roleManager.CreateAsync(newRole).Result;
                        // In the real world, there might be claims associated with roles
                        // _roleManager.AddClaimAsync(newRole, new )
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
