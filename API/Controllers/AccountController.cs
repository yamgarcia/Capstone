using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;

        public AccountController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(string username, string password){
            // "using" is used to sign an object that must be disposed after it's purpose is fulfilled.
            // It calls a method inside the instantiated class that properly dispose it. 
           using var hmac = new HMACSHA512(); 
           var user = new AppUser{
               UserName = username,
               PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
               PasswordSalt = hmac.Key
           };
            // "Add " method doesn't add to the DB but to he tracking in place
            _context.Users.Add(user);

           await _context.SaveChangesAsync();

           return user;
        }
    }
}