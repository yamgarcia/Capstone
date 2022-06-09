namespace API.DTOs
{
    //* Most DTOs need to be mapped into an entity (Use AutoMapper)
    public class MemberUpdateDto
    {
        public string Introduction { get; set; }

        public string LookingFor { get; set; }

        public string Skills { get; set; }

        public string City { get; set; }

        public string Country { get; set; }
    }
}