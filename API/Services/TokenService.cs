using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(AppUser user)
        {
            // Adding claims
            // *Claims added with JWT can be seen taking the token and passing to https://jwt.io/
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
            };
            //Creating Credentials 
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
            //Describe how the token should look
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds

            };
            //Innitialize Handler for token creation
            var tokenHandler = new JwtSecurityTokenHandler();
            //Create Token
            var token = tokenHandler.CreateToken(tokenDescriptor);
            //Return it Written
            return tokenHandler.WriteToken(token);
        }
    }
}