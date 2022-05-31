using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        /**
            Extension methods 
        */

        public static IServiceCollection AddIdentityServices (this IServiceCollection services, IConfiguration config)
        {
            
            //JWT Authentication
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
            });

            return services;
        }
    }
}