using System.Text;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        /**
            Extension methods 
        */

        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            //Identity.EntityFrameworkCore Setup
            services.AddIdentityCore<AppUser>(opt =>
             {
                 opt.Password.RequireNonAlphanumeric = false;
             })
                 .AddRoles<AppRole>()
                 .AddRoleManager<RoleManager<AppRole>>()
                 .AddSignInManager<SignInManager<AppUser>>()
                 .AddRoleValidator<RoleValidator<AppRole>>()
                 .AddEntityFrameworkStores<DataContext>();


            //JWT Authentication Setup
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
                    //API server
                    ValidateIssuer = false,
                    //Angular application
                    ValidateAudience = false
                };

                options.Events = new JwtBearerEvents
                {
                    //Allows the client to send the token as a query string
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];

                        var path = context.HttpContext.Request.Path;

                        // "/hubs" matches on Startup MapHub configuration for SignalR
                        if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
                        {
                            context.Token = accessToken;
                        };

                        return Task.CompletedTask;
                    }
                };
            });

            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
                opt.AddPolicy("ModeratePhotoRole", policy => policy.RequireRole("Admin", "Moderator"));
            });

            return services;
        }
    }
}