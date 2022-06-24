namespace API.Entities
{
    public class Connection
    {
        public Connection()
        {
        }

        // Giving the name and ID the EF will automatically set as the primary key
        public Connection(string connectionId, string username)
        {
            ConnectionId = connectionId;
            Username = username;
        }

        public string ConnectionId { get; set; }
        public string Username { get; set; }
    }
}