using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);

        void DeleteMessage(Message message);

        Task<Message> GetMessage(int id);

        ///<summary> Returns a paged list of messages </summary>
        Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams);

        ///<summary> Returns a Message Thread between two users </summary>
        Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername);

        Task<bool> SaveAllAsync();
    }
}