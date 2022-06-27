using System.Threading.Tasks;

namespace API.Interfaces
{
    ///<summary> Creates instancies of the repositories passing what they have in their constructor </summary>
    public interface IUnitOfWork
    {
        IUserRepository UserRepository {get; }
        IMessageRepository MessageRepository {get;}
        ILikesRepository LikesRepository {get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}