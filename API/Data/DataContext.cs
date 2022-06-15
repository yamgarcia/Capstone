using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    ///<summary> DbContext corresponding to the Database </summary>
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        ///<summary> DbSet corresponding to the Users table</summary>
        // The method name will be the table name when running "dotnet ef migrations add <migration name>"
        public DbSet<AppUser> Users { get; set; }

        ///<summary> DbSet corresponding to the Likes table</summary>
        public DbSet<UserLike> Likes { get; set; }

        ///<summary> Overridden method from DbContext to configure the relationship between liked and liking users.
        ///The DbContext class has a method called OnModelCreating that takes an instance of ModelBuilder as a parameter. This method is called by the framework when your context is first created to build the model and its mappings in memory. 
        ///</summary>
        protected override void OnModelCreating(ModelBuilder builder){
            base.OnModelCreating(builder);

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

        }


    }
}