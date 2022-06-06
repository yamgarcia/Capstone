using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    //* DbContext corresponds to a Database
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        //* DbSet corresponds to each table in context 
        public DbSet<AppUser> Users { get; set; }
    }
}