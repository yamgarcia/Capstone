namespace API.DTOs
{
    /**
        Data transfer object - A DTO is helpful whenever you need to group values in ad hoc structures for passing data around. 
        From a pure design perspective, DTOs are a solution really close to perfection. 
        DTOs help to further decouple presentation from the service layer and the domain model.
    */
    public class UserDto
    {
        public string Username { get; set; }

        public string Token { get; set; }

        public string PhotoUrl { get; set; }

        public string knownAs { get; set; }

        public string Gender { get; set; }
    }
}