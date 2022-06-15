namespace API.Entities
{
    public class Message
    {
        public int Id { get; set; }

        public int SenderId { get; set; }

        public string SenderUsername { get; set; }

        public AppUser Sender { get; set; }

        public int RecipientId { get; set; }

        public string RecipientUsername { get; set; }

        public AppUser Recipient { get; set; }

        public string Content { get; set; }

        ///Null if the message hasn't been read
        public DateTime? DateRead { get; set; }

        public DateTime MessageSent { get; set; } = DateTime.Now;

        //Sender and Receiipient must delete a message before it's deleted from the server
        public bool SenderDeleted { get; set; }

        public bool RecipientDeleted { get; set; }
    }
}