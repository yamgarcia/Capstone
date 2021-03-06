namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        //Uses the Main Photo
        public string PhotoUrl { get; set; }

        //* AutoMapper recognizes field with the same name but populates this specific prop based on the other class defined in the profile
        //* It uses AppUser.GetAge() to populates this prop. Note: names must follow convention (Get)  
        public int Age { get; set; }

        public string KnownAs { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }

        public string Gender { get; set; }

        public string Introduction { get; set; }

        public string LookingFor { get; set; }

        public string Skills { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public ICollection<PhotoDto> Photos { get; set; }
    }
}