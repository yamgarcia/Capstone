using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using API.SignalR;
using DatingApp.API.Helpers;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            //`Bringing these services here inserts them into String and allow their use in the controllers
            services.AddSingleton<PresenceTracker>();
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            //`Repositories not needed when UnitOfWork takes place :
            // services.AddScoped<IUserRepository, UserRepository>();
            // services.AddScoped<ILikesRepository, LikesRepository>();
            // services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<LogUserActivity>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options =>
            {
                AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
                options.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}