using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    ///<summary> DbContext corresponding to the Database </summary>
    public class DataContext : IdentityDbContext<AppUser, AppRole, int, 
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>, 
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        //? NOT NEEDED WHILE USING IdentityDbContext
        ///<summary> DbSet corresponding to the Users table</summary>
        // The method name will be the table name when running "dotnet ef migrations add <migration name>"
        // public DbSet<AppUser> Users { get; set; }

        ///<summary> DbSet corresponding to the Likes table</summary>
        public DbSet<UserLike> Likes { get; set; }

        ///<summary> DbSet corresponding to the Messages table</summary>
        public DbSet<Message> Messages { get; set; }

        ///<summary> Overridden method from DbContext to configure the relationship between liked and liking users.
        ///The DbContext class has a method called OnModelCreating that takes an instance of ModelBuilder as a parameter. This method is called by the framework when your context is first created to build the model and its mappings in memory. 
        ///</summary>
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //defines the user side of the relationship
            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();
            
            //defines the role side of the relationship
            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

            builder.Entity<UserLike>()
                .HasKey(k => new { k.SourceUserId, k.LikedUserId });

            //* A sourceUser can like many users and on user delete the relate entities should also be deleted (DeleteBehavior.Cascade) 
            builder.Entity<UserLike>()
                .HasOne(s => s.SourceUser)
                .WithMany(l => l.LikedUsers)
                .HasForeignKey(s => s.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserLike>()
                .HasOne(s => s.LikedUser)
                .WithMany(l => l.LikedByUsers)
                .HasForeignKey(s => s.LikedUserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Message>()
                .HasOne(u => u.Recipient)
                .WithMany(m => m.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
            // HasOne returns objects of the entity placed in the <Type>
                .HasOne(u => u.Sender)
            // WithMany returns objects of the <type> from the HasOne (AppUser Sender)
                .WithMany(m => m.MessagesSent)
            // Restrict doean't allow delete from all tables if one has deleted
                .OnDelete(DeleteBehavior.Restrict);
        }


    }
}