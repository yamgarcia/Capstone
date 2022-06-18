using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string KnownAs { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;

        public DateTime LastActive { get; set; } = DateTime.Now;

        public string Gender { get; set; }

        public string Introduction { get; set; }

        public string LookingFor { get; set; }

        public string Skills { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public ICollection<Photo> Photos { get; set; }

        ///<summary> Collection of who has liked the currently logged in user  </summary>
        public ICollection<UserLike> LikedByUsers { get; set; }

        ///<summary> Collection of users liked by the currently logged in user </summary>
        public ICollection<UserLike> LikedUsers { get; set; }

        ///<summary> Collection of messages sent BY the current user </summary>
        public ICollection<Message> MessagesSent { get; set; }

        ///<summary> Collection of messages sent TO the current user </summary>
        public ICollection<Message> MessagesReceived { get; set; }

        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}