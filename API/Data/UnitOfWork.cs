using System.Threading.Tasks;
using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    ///<summary> Creates instancies of the repositories passing what they have in their constructor </summary>
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //Each Repository must have their own getter method
        public IUserRepository UserRepository => new UserRepository(_context, _mapper);

        public IMessageRepository MessageRepository => new MessageRepository(_context, _mapper);

        public ILikesRepository LikesRepository => new LikesRepository(_context);

        ///<summary> Saves all changes the EF has tracked in any repository</summary>
        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        ///<summary> Returns true if there are changes EF has tracked </summary>
        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}