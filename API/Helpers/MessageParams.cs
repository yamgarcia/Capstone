namespace API.Helpers
{
    /// Derives from PaginationParams so it can be paginated 
    ///<summary> Config params for the /message endpoints </summary>
    public class MessageParams : PaginationParams
    {
        public string Username { get; set; }

        //todo: Set up enum
        /// <summary> "Unread" is the default value. Other possible values are "Inbbox" and "Outbox"</summary>
        public string Container { get; set; } = "Unread";
    }
}