using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    ///<summary> This class act as a join table for the AppUser and the AppRole. IdentityUserRole represeents the link between user and role</summary>
    public class AppUserRole : IdentityUserRole<int>
    {
        public AppUser User { get; set; }

        public AppRole Role { get; set; }
    }
}