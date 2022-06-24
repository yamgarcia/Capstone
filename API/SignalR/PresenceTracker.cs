namespace API.SignalR
{
    ///<summary> Maintains a disctionary of all the users that are online (their connections). Users are allowed to have multiple connections</summary>
    public class PresenceTracker
    {
        //` Generally a good idea to lock dictionaries before accessing it
        private static readonly Dictionary<string, List<string>> OnlineUsers =
           new Dictionary<string, List<string>>();

        public Task<bool> UserConnected(string username, string connectionId)
        {
            //` Locked blocks cannot be updated simultaneously by two threads
            bool isOnline = false;
            lock (OnlineUsers)
            {
                if (OnlineUsers.ContainsKey(username))
                {
                    OnlineUsers[username].Add(connectionId);
                }
                else
                {
                    OnlineUsers.Add(username, new List<string> { connectionId });
                    isOnline = true;
                }
            }
            return Task.FromResult(isOnline);
        }

        public Task<bool> UserDisconnected(string username, string connectionId)
        {
            bool isOffline = false;
            //` The Lock statement is used in threading, that limit the number of threads that can perform some activity or execute a portion of code at a time.
            //` Always lock dictionaries before invoking them
            lock (OnlineUsers)
            {
                if (!OnlineUsers.ContainsKey(username)) return Task.FromResult(isOffline);

                OnlineUsers[username].Remove(connectionId);
                if (OnlineUsers[username].Count == 0)
                {
                    OnlineUsers.Remove(username);
                    isOffline = true;
                }
            }
            return Task.FromResult(isOffline);
        }

        public Task<string[]> GetOnlineUsers()
        {
            string[] onlineUsers;
            lock (OnlineUsers)
            {
                onlineUsers = OnlineUsers.OrderBy(k => k.Key).Select(k => k.Key).ToArray();
            }
            return Task.FromResult(onlineUsers);
        }

        ///<summary> Returns a list of connections for a particular user stored in the dictionary</summary>
        public Task<List<string>> GetConnectionsForUser(string username)
        {
            List<string> connectionIds;
            lock (OnlineUsers)
            {
                connectionIds = OnlineUsers.GetValueOrDefault(username);
            }
            return Task.FromResult(connectionIds);
        }
    }
}