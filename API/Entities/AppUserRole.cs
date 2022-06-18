using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    ///<summary> This class act as a join table for the AppUser and the AppRole </summary>
    public class AppUserRole : IdentityUser<int>
    {
        public AppUser User { get; set; }   

        public AppRole Role { get; set; }
    }
}