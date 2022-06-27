using API.DTOs;
using API.Entities;
using API.Helpers;

/**
    🔶 Repository pattern helps reducion tight coupling. 
    Implementation of NHibernate or other ORMs should be simplified

    🔶 Reduces code duplication

    🔶 When controllers depend on abstractions testing becomes easier

    The repository is a layer between the controller and the EF (DbContext)
    Controller => Repository => EF => SQLite

    It's usually created one per entity but inherit from the same interface
*/
namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);

        // transfered to UnitOfWork
        // Task<bool> SaveAllAsync();

        Task<IEnumerable<AppUser>> GetUsersAsync();

        Task<AppUser> GetUserByIdAsync(int id);

        Task<AppUser> GetUserByUsernameAsync(string username);

        Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);

        Task<MemberDto> GetMemberAsync(string username);

         Task<string> GetUserGender(string username);
    }
}